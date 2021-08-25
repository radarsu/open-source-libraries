import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { Template } from '../interfaces/template.interface';

interface CopyFilesOptions {
    selectedTemplate: Template;
    responses: any;
}

export const copyFiles = async (options: CopyFilesOptions) => {
    const { selectedTemplate, responses } = options;

    const copyPaths = path.resolve(selectedTemplate.path, `./**/*`);
    const decreePath = path.resolve(selectedTemplate.path, `_decree.ts`);
    const renderPaths = path.resolve(selectedTemplate.path, `./**/*.ejs`);
    const targetDirectoryPath = path.resolve(selectedTemplate.path, `..`, responses.directoryName);

    const sourcePaths = await fastGlob([copyPaths], {
        markDirectories: true,
        onlyFiles: false,
        ignore: [decreePath, renderPaths],
    });

    const promises = sourcePaths.map(async (sourcePath) => {
        const pathRelativeToTemplate = path.relative(selectedTemplate.path, sourcePath);
        const targetPath = `${targetDirectoryPath}/${pathRelativeToTemplate}`;
        await fs.promises.copyFile(sourcePath, targetPath);
    });

    await Promise.all(promises);
};
