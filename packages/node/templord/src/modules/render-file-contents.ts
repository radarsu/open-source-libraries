import * as ejs from 'ejs';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { MainContext } from '../interfaces/main-context';

const renderFileContents = async (options: MainContext) => {
    const { responses, targetDirectoryPath } = options;

    const renderPaths = path.resolve(targetDirectoryPath, `**/*.ejs`);

    const sourcePaths = await fastGlob([renderPaths]);

    const promises = sourcePaths.map(async (sourcePath) => {
        const rendered: string = await ejs.renderFile(sourcePath, responses);
        await fs.promises.writeFile(sourcePath, rendered);
    });

    await Promise.all(promises);
};

export { renderFileContents };
