import * as inquirer from 'inquirer';

import { FoundTemplate } from '../../../shared/interfaces.js';

export const selectTemplate = async (templates: FoundTemplate[]): Promise<FoundTemplate> => {
    const choices = templates.map((template) => {
        return {
            name: template.name,
            value: template,
        };
    });

    const name = `template`;
    const answers = await inquirer.prompt([
        {
            message: `Select template:`,
            name,
            type: `list`,
            choices,
        },
    ]);

    return answers[name];
};
