import * as inquirer from 'inquirer';
import * as providers from '../providers/generate/index';

import { Command, Flags } from '@oclif/core';

export default class Generate extends Command {
    static description = `Launch missions on specified hosts.`;

    static args = [
{
        name: `name`,
    },
];

    static flags = {
        from: Flags.string({
            name: `from`,
            description: `Remote repository url to pull templates from instead of local one.`,
        }),
        to: Flags.string({
            name: `to`,
            description: `Directory where to put rendered template.`,
        }),
    };

    async run() {
        const { flags, args } = await this.parse(Generate);

        const templates = await providers.getTemplates(flags.from);
        const selectedTemplate = await providers.selectTemplate(templates);

        args.name = args.name ?? selectedTemplate.name;

        const templateModule = await providers.loadTemplateModule(selectedTemplate);
        const responses = await templateModule.askQuestions(inquirer);

        responses.name = responses.name ?? args.name;

        const targetPath = args.name;
        const copyingEffect = await providers.copyTemplate(selectedTemplate, targetPath, {
            onExistingFile: async () => {
                this.log(`File already exists.`);
                return {
                    continue: false,
                };
            },
        });

        if (copyingEffect?.continue === false) {
            return;
        }

        await providers.renderFiles(targetPath, templateModule.patternsToRender, responses);

        await providers.cleanup();
    }
}
