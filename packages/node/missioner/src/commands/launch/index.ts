import * as launch from '../../providers/launch';
import * as path from 'path';
import * as rollup from 'rollup';
import * as rollupCommonJS from '@rollup/plugin-commonjs';
import * as rollupJson from '@rollup/plugin-json';
import * as rollupNodeResolve from '@rollup/plugin-node-resolve';
import * as ssh from '../../providers/ssh';

import { Command, Flags } from '@oclif/core';

import { nanoid } from 'nanoid';

export default class Launch extends Command {
    static description = `Launch missions on specified hosts.`;

    static flags = {
        // missions: Flags.string({
        //     name: `missions`,
        //     description: `Which missions you wish to launch.`,
        // }),
        // tags: Flags.string({
        //     name: `tags`,
        //     description: `On hosts with which tags you wish to launch missions.`,
        // }),
    };

    async run() {
        const { flags } = await this.parse(Launch);
        const cwd = process.cwd();

        const { host, missionName } = await launch.getMissionDetails({ cwd });
        const uniqueMissionId = nanoid();

        this.log(`Preparing mission "${missionName}" for host "${host.name}" (id: ${uniqueMissionId})...`);

        const missionJsPath = await launch.prepareMissionJs({
            cwd,
            missionName,
            uniqueMissionId,
        });

        let binaryPath = missionJsPath;

        if (host.useBuiltInNode) {
            const build = await rollup.rollup({
                input: missionJsPath,
                plugins: [
                    rollupCommonJS.default(),
                    rollupNodeResolve.default({
                        moduleDirectories: [path.resolve(__dirname, `../../../node_modules`), `node_modules`],
                    }),
                    rollupJson.default(),
                ],
            });

            binaryPath = `./dist-bin/test-mission.launcher.js`;

            await build.write({
                exports: `auto`,
                file: binaryPath,
                format: `commonjs`,
            });
        } else {
            binaryPath = await launch.prepareMissionBinary({
                missionJsPath,
                uniqueMissionId,
            });
        }

        this.log(`Landing on "${host.name}"...`);
        const sshConnection = await ssh.createSSHConnection(host.connection.ssh);

        this.log(`Landed successfully. Deploying mission...`);
        const remoteMissionPath = `./.missioner/missions/${uniqueMissionId}`;
        await sshConnection.putFile(binaryPath, `${remoteMissionPath}/bin`);

        this.log(`Mission deployed to host. Starting the mission...`);

        let nodeCommand = ``;

        if (typeof host.useBuiltInNode === `boolean`) {
            nodeCommand = `node `;
        } else if (typeof host.useBuiltInNode === `string`) {
            nodeCommand = `${host.useBuiltInNode} `;
        }

        const sshCommand = `chmod +x ${remoteMissionPath}/bin && ${nodeCommand}${remoteMissionPath}/bin`;

        await sshConnection.execCommand(sshCommand, {
            async onStdout(chunk) {
                const log = chunk.toString();
                console.log(`[mission]`, log);
            },
            async onStderr(chunk) {
                const log = chunk.toString();
                console.error(`[mission]`, log);
            },
        });

        sshConnection.dispose();

        this.log(`Mission finished.`);
    }
}
