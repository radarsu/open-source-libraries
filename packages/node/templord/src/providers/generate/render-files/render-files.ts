import * as ejs from 'ejs';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

export const renderFiles = async (targetPath: string, patternsToRender: string[], data: any) => {
    const targetPaths = patternsToRender.map((patternToRender) => {
        return `${targetPath}/${patternToRender}`;
    });

    const filesToRender = await fastGlob.default(targetPaths);

    const renderingFiles = filesToRender.map(async (fileToRender) => {
        const rendered = await ejs.renderFile(fileToRender, data, {});

        await fs.promises.writeFile(fileToRender, rendered);
    });

    const templateScriptPath = path.join(targetPath, `_template.ts`);
    renderingFiles.push(fs.promises.rm(templateScriptPath));

    await Promise.all(renderingFiles);
};
