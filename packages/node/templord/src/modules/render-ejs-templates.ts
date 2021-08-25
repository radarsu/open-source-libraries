import * as ejs from 'ejs';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import { MainContext } from '../interfaces/main-context';

import { removeExtensionFromPath } from '../utils/remove-extension-from-path';

const renderEjsTemplates = async (options: MainContext) => {
    const { selectedTemplate, responses, targetDirectoryPath } = options;

    const renderPaths = path.resolve(selectedTemplate.path, `./**/*.ejs`);

    const [sourcePaths] = await Promise.all([
        fastGlob([renderPaths], {
            markDirectories: true,
            onlyFiles: false,
        }),
        fs.promises.mkdir(targetDirectoryPath),
    ]);

    const promises = sourcePaths.map(async (sourcePath) => {
        const renderedName = ejs.render(path.basename(sourcePath), responses);
        const relativePathWithExtension = path.relative(selectedTemplate.path, sourcePath);
        const relativePath = removeExtensionFromPath(relativePathWithExtension);

        const renderedRelativePath = path.resolve(targetDirectoryPath, relativePath, `../${renderedName}`);

        const targetPath = path.resolve(targetDirectoryPath, renderedRelativePath);

        console.log({ renderedName, relativePathWithExtension, relativePath, renderedRelativePath, targetPath });

        // Handle rendering directory names.
        if (sourcePath.endsWith(`/`)) {
            await fs.promises.mkdir(targetPath, {
                recursive: true,
            });
            return;
        }

        const rendered: string = await ejs.renderFile(sourcePath, responses);
        await fs.promises.writeFile(targetPath, rendered);
    });

    await Promise.all(promises);
};

export { RenderEjsTemplatesOptions, renderEjsTemplates };
