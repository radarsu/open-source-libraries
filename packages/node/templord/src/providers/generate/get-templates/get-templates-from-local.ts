import * as fastGlob from 'fast-glob';
import * as path from 'path';
import * as tsImport from 'ts-import';

import { TMP_DIR } from '../../../shared/constants';
import { Template } from '../../../shared/interfaces';

export const getTemplatesFromLocal = async (searchPath: string): Promise<(Template & { path: string })[]> => {
    const templatePaths = await fastGlob.default([searchPath]);

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
