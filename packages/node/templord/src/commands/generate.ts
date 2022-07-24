import * as inquirer from 'inquirer';
import * as providers from '../providers/generate/index';

import { Command, Flags } from '@oclif/core';

import { Template } from '../shared/interfaces.js';

export default class Generate extends Command {
    static description = `Generate files from selected template.`;

    static args = [
        {
            name: `directoryName`,
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

        if (templates.length === 0) {
            this.log(`No "_template.ts" files found.`);
            return;
        }

        const selectedTemplate = await providers.selectTemplate(templates);

        if (!args.directoryName) {
            const nameOfDirectoryResponse = await inquirer.prompt([
                {
                    message: `Name directory:`,
                    name: `directoryName`,
                    type: `input`,
                },
            ]);
            args.directoryName = nameOfDirectoryResponse.directoryName;
        }

        const templateModule = await providers.loadTemplateModule(selectedTemplate);
        const template: Template = templateModule.default;

        const responses = await template.askQuestions?.(inquirer) ?? {};

        responses.directoryName = args.directoryName;

        const copyingEffect = await providers.copyTemplate(selectedTemplate, responses.directoryName, {
            onExistingFile: async () => {
                this.log(`File "${responses.directoryName}" already exists.`);
                return {
                    continue: false,
                };
            },
        });

        if (copyingEffect?.continue === false) {
            return;
        }

        if (template.patternsToRender?.length) {
            await providers.renderFiles(responses.directoryName, template.patternsToRender, responses);
        }

        await template.afterRender?.(responses.directoryName);

        await providers.cleanup();

        this.log(`Created a directory named "${args.directoryName}" from "${selectedTemplate.name}" template.`);
    }
}
