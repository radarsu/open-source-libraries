import * as fastGlob from 'fast-glob';
import * as path from 'node:path';
import * as tsImport from 'ts-import';

import { TMP_DIR } from '../../../shared/constants.js';
import { Template } from '../../../shared/interfaces.js';

export const getTemplatesFromLocal = async (searchPath: string): Promise<(Template & { path: string })[]> => {
    const templatePaths = await fastGlob.default([searchPath], {
        suppressErrors: true,
    });

    const gettingTemplates = templatePaths.map(async (templatePath) => {
        const templateModule = await tsImport.load(templatePath, {
            allowConfigurationWithComments: true,
        });

        const template: Template = templateModule.default;

        let inferredName = path.basename(path.dirname(templatePath));

        if (TMP_DIR.includes(inferredName)) {
            inferredName = `(whole repo)`;
        }

        return {
            name: inferredName,
            path: templatePath,
            ...template,
        };
    });

    const templates = await Promise.all(gettingTemplates);

    return templates;
};
