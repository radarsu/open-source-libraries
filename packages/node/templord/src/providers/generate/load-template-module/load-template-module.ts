import * as tsImport from 'ts-import';

import { Template } from '../../../shared/interfaces.js';

export const loadTemplateModule = async (template: Template) => {
    const tsPath = `${template.path}/_template.ts`;
    const templateModule = await tsImport.load(tsPath, {
        allowConfigurationWithComments: true,
    });

    return templateModule;
};
