import * as inquirer from 'inquirer';

import { Template } from '../../../shared/interfaces.js';

export const selectTemplate = async (templates: Template[]): Promise<Template & { path: string }> => {
    const choices = templates.map((template) => {
        return {
            name: template.name,
            value: template,
        };
    });

    const name = `template`;
    const answers = await inquirer.default.prompt([
        {
            message: `Select template:`,
            name,
            type: `list`,
            choices,
        },
    ]);

    return answers[name];
};
