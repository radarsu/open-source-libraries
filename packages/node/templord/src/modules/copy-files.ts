import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { MainContext } from '../interfaces/main-context';

export const copyFiles = async (options: MainContext) => {
    const { selectedTemplate, targetDirectoryPath } = options;

    const copyPaths = path.resolve(selectedTemplate.path, `./**/*`);
    const decreePath = path.resolve(selectedTemplate.path, `_decree.ts`);
    const renderPaths = path.resolve(selectedTemplate.path, `./**/*.ejs`);

    const sourcePaths = await fastGlob([copyPaths], {
        markDirectories: true,
        onlyFiles: false,
        ignore: [decreePath, renderPaths],
    });

    const promises = sourcePaths.map(async (sourcePath) => {
        const pathRelativeToTemplate = path.relative(selectedTemplate.path, sourcePath);
        const targetPath = `${targetDirectoryPath}/${pathRelativeToTemplate}`;

        // Handle "copying" directories.
        if (sourcePath.endsWith(`/`)) {
            await fs.promises.mkdir(targetPath);
            return;
        }

        await fs.promises.copyFile(sourcePath, targetPath);
    });

    await Promise.all(promises);
};
