import * as ejs from 'ejs';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { TEMPLATE_FILE_NAME } from '../../../shared/constants';

export const renderFiles = async (targetPath: string, patternsToRender: string[], data: any) => {
    const targetPaths = patternsToRender.map((patternToRender) => {
        return `${targetPath}/${patternToRender}`;
    });

    const filesToRender = await fastGlob.default(targetPaths);

    const renderingFiles = filesToRender.map(async (fileToRender) => {
        const renderedPath = ejs.render(fileToRender, data);
        const renderedContent = await ejs.renderFile(fileToRender, data, {});

        await fs.promises.writeFile(renderedPath, renderedContent);
    });

    const templateScriptPath = path.join(targetPath, TEMPLATE_FILE_NAME);
    renderingFiles.push(fs.promises.rm(templateScriptPath));

    await Promise.all(renderingFiles);
};
