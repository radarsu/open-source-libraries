import * as tsImport from 'ts-import';

import { FoundTemplate } from '../../../shared/interfaces.js';

export const loadTemplateModule = async (template: FoundTemplate) => {
    const tsPath = `${template.path}/_template.ts`;
    const templateModule = await tsImport.load(tsPath, {
        allowConfigurationWithComments: true,
    });

    return templateModule;
};
