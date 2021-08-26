import * as modules from './modules';
import * as path from 'path';

import { MainContext } from './interfaces/main-context';

const main = async () => {
    // Find templates.
    const templates = await modules.findTemplates();

    if (!templates.length) {
        console.log(`Could not find directories matching pattern "_template_\${name}".`);
        return;
    }

    // Select template.
    const selectedTemplate = await modules.selectTemplate(templates);

    // Ask additional questions.
    const responses = await modules.askQuestions(selectedTemplate);

    // Create context.
    const targetDirectoryPath = path.resolve(selectedTemplate.path, `..`, responses.directoryName);

    const context: MainContext = {
        responses,
        selectedTemplate,
        targetDirectoryPath,
    };

    // Copy template directory and remove decree.
    await modules.copyTemplateDirectory(context);

    // Render file contents.
    await modules.renderFileContents(context);

    // Render file and directory names and remove extensions.
    await modules.renderFileAndDirectoryNames(context);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
