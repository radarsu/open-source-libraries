import * as modules from './modules';

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

    // Render ejs templates.
    await modules.renderEjsTemplates({
        responses,
        selectedTemplate,
    });

    // Copy other files.
    await modules.copyFiles(selectedTemplate);
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
