import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { Template } from '../interfaces/template.interface';

interface CopyDirectoriesOptions {
    selectedTemplate: Template;
    responses: any;
}

export const copyDirectories = async (options: CopyDirectoriesOptions) => {
    const { selectedTemplate, responses } = options;

    const copyPaths = path.resolve(selectedTemplate.path, `./**/*`);
    const targetDirectoryPath = path.resolve(selectedTemplate.path, `..`, responses.directoryName);

    const sourcePaths = await fastGlob([copyPaths], {
        onlyDirectories: true,
    });

    const promises = sourcePaths.map(async (sourcePath) => {
        console.log(`source`, sourcePath);

        const pathRelativeToTemplate = path.relative(selectedTemplate.path, sourcePath);
        const targetPath = `${targetDirectoryPath}/${pathRelativeToTemplate}`;
        await fs.promises.mkdir(targetPath);
    });

    await Promise.all(promises);
};
