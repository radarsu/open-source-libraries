import * as inquirer from 'inquirer';
export declare const getFromFlagOrAsk: (flags: Record<string, string | undefined>, names: string[], type: inquirer.QuestionTypeName) => Promise<any>;
