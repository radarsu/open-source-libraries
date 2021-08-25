import * as enquirer from 'enquirer';

import { Template } from '../interfaces/template.interface';

export const selectTemplate = async (templates: Template[]) => {
    const answers: any = await enquirer.prompt([
        {
            message: `Template:`,
            name: `templateName`,
            type: `select`,
            choices: templates.map((template) => {
                return {
                    name: template.name,
                    value: template.name,
                };
            }),
        },
    ]);

    const selectedTemplate = templates.find((template) => {
        return template.name === answers.templateName;
    });

    return selectedTemplate as Template;
};
