import * as inquirer from 'inquirer';

import { Host } from '../../shared/interfaces';
import { getHosts } from './get-hosts';
import { getMissions } from './get-missions';

export interface GetMissionDetailsOptions {
    cwd: string;
}

export interface MissionDetails {
    host: Host;
    missionName: string;
}

export const getMissionDetails = async (options: GetMissionDetailsOptions): Promise<MissionDetails> => {
    const [hosts, missions] = await Promise.all([getHosts(options.cwd), getMissions(options.cwd)]);

    const missionChoices = await inquirer.prompt([
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
                    name: mission,
                    value: mission,
                };
            }),
        },
    ]);

    const confirmationChoices = await inquirer.prompt([
        {
            name: `confirmation`,
            message: `Launching mission "${missionChoices.missionName}" for host "${missionChoices.host.name}". Confirm?`,
            type: `confirm`,
        },
    ]);

    if (!confirmationChoices.confirmation) {
        console.error(`Mission aborted.`);
        process.exit(1);
    }

    return missionChoices;
};
