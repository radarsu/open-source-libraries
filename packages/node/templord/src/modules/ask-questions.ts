import * as enquirer from 'enquirer';
import * as path from 'path';

import { Template } from '../interfaces/template.interface';
import { tsImport } from 'ts-import';

export const askQuestions = async (selectedTemplate: Template) => {
    const initialQuestion: any = await enquirer.prompt([
        {
            message: `Directory name:`,
            name: `directoryName`,
            type: `input`,
        },
    ]);

    const decreePath = path.resolve(selectedTemplate.path, `_decree.ts`);
    const decree = await tsImport.compile(decreePath);
    const responses = await decree.default(enquirer);
    responses.directoryName = initialQuestion.directoryName;

    return responses;
};
