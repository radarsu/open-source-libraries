import * as fastGlob from 'fast-glob';

import { FoundTemplate } from '../../../shared/interfaces.js';

export const getTemplatesFromLocal = async (searchPath: string) => {
    const templatePaths = await fastGlob.default([searchPath]);

    const templates: FoundTemplate[] = templatePaths.map((templatePath) => {
        return {
            name: templatePath.split(`_`)[2] ?? `undefined`,
            path: templatePath,
        };
    });

    return templates;
};
