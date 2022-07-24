import * as inquirer from 'inquirer';

export interface Template {
    name?: string;
    path?: string;
    patternsToRender?: string[];
    askQuestions?: (inquirer: inquirer.Inquirer) => Promise<any>;
    afterRender?: (directoryPath: string) => Promise<void>;
}
