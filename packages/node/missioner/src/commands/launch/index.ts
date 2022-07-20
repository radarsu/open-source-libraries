import * as ejs from 'ejs';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as launch from '../../providers/launch';
import * as path from 'path';
import * as pkg from 'pkg';
import * as ssh from '../../providers/ssh';
import * as tsImport from 'ts-import';

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
        const [hosts, missions] = await Promise.all([launch.getHosts(cwd), launch.getMissions(cwd)]);

        const choices = await inquirer.prompt([
            {
                name: `host`,
                message: `Choose host to launch mission`,
                type: `list`,
                choices: hosts.map((host) => {
                    return {
                        name: host.name,
                        value: host,
                    };
                }),
            },
            {
                name: `missionName`,
                message: `Choose mission to launch`,
                type: `list`,
                choices: missions.map((mission) => {
                    return {
                        name: mission.name,
                        value: mission.name,
                    };
                }),
            },
        ]);

        const { host, missionName } = choices;

        // this.log(`Launching missions ... for hosts ... Confirm?`);
        const uniqueMissionId = nanoid();

        this.log(`Preparing mission "${missionName}" for host "${host.name}" (id: ${uniqueMissionId})...`);

        const missionLauncherPath = path.resolve(__dirname, `../../assets/mission-launcher.ts.ejs`);
        const rendered = await ejs.renderFile(missionLauncherPath, {
            missionName,
        });

        await fs.promises.writeFile(`./.tmp/${missionName}.launcher.ts`, rendered);

        console.log(`rendered`, rendered);

        if (true as any) {
            return;
        }

        const compiledMissionPath = `${cwd}/node_modules/ts-import/cache/${cwd}/missions/${missions[0]?.name}.js`;

        await pkg.exec([compiledMissionPath, `--output=./dist-bin/${uniqueMissionId}`, `--targets=node16-linux-x64`]);

        this.log(`Landing on "${host.name}"...`);
        const sshConnection = await ssh.createSSHConnection(host.connection.ssh);

        this.log(`Landed successfully. Deploying mission...`);
        const remoteMissionPath = `./.missioner/missions/${uniqueMissionId}`;
        await sshConnection.putFile(`./dist-bin/${uniqueMissionId}`, `${remoteMissionPath}/bin`);

        this.log(`Mission deployed to host. Starting the mission...`);

        await sshConnection.execCommand(`${remoteMissionPath}/bin`);

        sshConnection.dispose();
    }
}
