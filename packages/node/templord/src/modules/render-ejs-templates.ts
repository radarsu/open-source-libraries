import * as ejs from 'ejs';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

import { Template } from '../interfaces/template.interface';

interface RenderEjsTemplatesOptions {
    selectedTemplate: Template;
    responses: any;
}

const renderEjsTemplates = async (options: RenderEjsTemplatesOptions) => {
    const { selectedTemplate, responses } = options;

    const renderPaths = path.resolve(selectedTemplate.path, `./**/*.ejs`);
    const targetDirectoryPath = path.resolve(selectedTemplate.path, `..`, responses.directoryName);

    const pathsToRender = await fastGlob([renderPaths], {
        markDirectories: true,
        onlyFiles: false,
    });

    await fs.promises.mkdir(targetDirectoryPath);

    const promises = pathsToRender.map(async (pathToRenderSource) => {
        const pathRelativeToTemplate = path.relative(selectedTemplate.path, pathToRenderSource);
        let targetPath = `${targetDirectoryPath}/${pathRelativeToTemplate}`;

        // Handle rendering directory names.
        if (pathToRenderSource.endsWith(`/`)) {
            const renderedDirectoryName = ejs.render(path.basename(pathToRenderSource), responses);
            const renderedDirectoryNameWithoutExtension = path.parse(renderedDirectoryName).name;
            targetPath = path.resolve(targetPath, `../${renderedDirectoryNameWithoutExtension}`);

            await fs.promises.mkdir(targetPath, {
                recursive: true,
            });
            return;
        }

        const rendered: string = await ejs.renderFile(pathToRenderSource, responses);
        await fs.promises.writeFile(targetPath, rendered);
    });

    await Promise.all(promises);
};

export { RenderEjsTemplatesOptions, renderEjsTemplates };
