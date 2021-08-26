import * as ejs from 'ejs';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { MainContext } from '../interfaces/main-context';
import { removeExtensionFromPath } from '../utils/remove-extension-from-path';

const renderFileAndDirectoryNames = async (options: MainContext) => {
    const { responses, targetDirectoryPath } = options;

    const renderPaths = path.resolve(targetDirectoryPath, `**/*.ejs`);

    const sourcePaths = await fastGlob([renderPaths], {
        onlyFiles: false,
    });

    const promises = sourcePaths.map(async (sourcePath) => {
        const baseName = removeExtensionFromPath(path.basename(sourcePath));
        const renderedName: string = ejs.render(baseName, responses);
        const targetPath = path.resolve(sourcePath, `..`, renderedName);
        await fs.promises.rename(sourcePath, targetPath);
    });

    await Promise.all(promises);
};

export { renderFileAndDirectoryNames };
