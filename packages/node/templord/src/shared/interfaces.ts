import * as inquirer from 'inquirer';

export interface FoundTemplate {
    name: string;
    path: string;
}

export interface Template {
    name?: string;
    patternsToRender?: string[];
    askQuestions?: (inquirer: inquirer.Inquirer) => Promise<any>;
    afterRender?: (directoryPath: string) => Promise<void>;
}
