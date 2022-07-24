import * as inquirer from 'inquirer';

import { Template } from '../../../shared/interfaces.js';

export const selectTemplate = async (templates: Template[]) => {
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

    return answers[name] as Template;
};
