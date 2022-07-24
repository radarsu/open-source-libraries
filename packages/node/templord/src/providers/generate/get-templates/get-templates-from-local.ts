import * as fastGlob from 'fast-glob';

import { Template } from '../../../shared/interfaces.js';

export const getTemplatesFromLocal = async (searchPath: string) => {
    const templatePaths = await fastGlob.default([searchPath], {
        onlyDirectories: true,
    });

    const templates: Template[] = templatePaths.map((templatePath) => {
        return {
            name: templatePath.split(`_`)[2] ?? `undefined`,
            path: templatePath,
        };
    });

    return templates;
};
