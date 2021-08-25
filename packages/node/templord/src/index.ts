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

    // Ask questions.
    const responses = await modules.askQuestions(selectedTemplate);

    const targetDirectoryPath = path.resolve(selectedTemplate.path, `..`, responses.directoryName);

    const context: MainContext = {
        responses,
        selectedTemplate,
        targetDirectoryPath,
    };

    // Render ejs templates.
    await modules.renderEjsTemplates(context);

    // Copy directories.
    await modules.copyDirectories(context);

    // Copy files.
    await modules.copyFiles(context);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
