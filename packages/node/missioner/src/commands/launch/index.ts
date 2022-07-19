import * as inquirer from 'inquirer';
import * as pkg from 'pkg';
import * as providers from '../../providers/launch';

import { Command, Flags } from '@oclif/core';

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
        const [hosts, missions] = await Promise.all([providers.getHosts(cwd), providers.getMissions(cwd)]);

        console.log(`Hosts`, hosts);
        console.log(`Missions`, missions);

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
                name: `mission`,
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

        console.log(`choices`, choices.host);

        // this.log(`Launching missions ... for hosts ... Confirm?`);

        // -----
        this.log(`Preparing mission...`);
        const compiledMissionPath = `${cwd}/node_modules/ts-import/cache/${cwd}/missions/${missions[0]?.name}.js`;
        await pkg.exec([compiledMissionPath, `--output=./dist/test-pkg`, `--targets=node16-linux-x64`]);

        this.log(`Landing on target host...`);

        this.log(`Mission deployed to host. Starting the mission...`);
    }
}
