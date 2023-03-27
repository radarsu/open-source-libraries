import * as inquirer from 'inquirer';
import * as path from 'node:path';
import * as providers from '../providers/generate/index.js';

import { Args, Command, Flags } from '@oclif/core';

import { TEMPLATE_FILE_NAME } from '../shared/constants.js';

export default class Generate extends Command {
    static description = `Generate files from selected template.`;

    static args = {
        directoryName: Args.string(),
    };

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
            this.log(`No "${TEMPLATE_FILE_NAME}" files found.`);
            return;
        }

        const selectedTemplate = await providers.selectTemplate(templates);

        if (!args.directoryName) {
            const nameOfDirectoryResponse = await inquirer.default.prompt([
                {
                    message: `Name directory:`,
                    name: `directoryName`,
                    type: `input`,
                },
            ]);
            args.directoryName = nameOfDirectoryResponse.directoryName;
        }

        const responses = (await selectedTemplate.askQuestions?.(inquirer)) ?? {};

        responses.directoryName = args.directoryName;

        const templateDirectoryPath = path.dirname(selectedTemplate.path);
        const copyingEffect = await providers.copy(templateDirectoryPath, responses.directoryName, {
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

        if (selectedTemplate.patternsToRender?.length) {
            await providers.renderFiles(responses.directoryName, selectedTemplate.patternsToRender, responses);
        }

        await selectedTemplate.afterRender?.(responses.directoryName);

        await providers.cleanup();

        this.log(`Created a directory named "${args.directoryName}" from "${selectedTemplate.name}" template.`);
    }
}
