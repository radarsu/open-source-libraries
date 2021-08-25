import * as fastGlob from 'fast-glob';

import { Template } from '../interfaces/template.interface';

export const findTemplates = async () => {
    const templatePaths = await fastGlob([`./**/_template_*`], {
        onlyDirectories: true,
        ignore: [`./**/node_modules`],
    });

    const templates: Template[] = templatePaths.map((templatePath) => {
        return {
            name: templatePath.split(`_`)[2] ?? `undefined`,
            path: templatePath,
        };
    });

    return templates;
};
