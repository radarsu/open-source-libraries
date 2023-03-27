import * as inquirer from 'inquirer';

export interface Template {
    name?: string;
    path?: string;
    patternsToRender?: string[];
    askQuestions?: (inquirer: inquirer.QuestionCollection) => Promise<any>;
    afterRender?: (directoryPath: string) => Promise<void>;
}
