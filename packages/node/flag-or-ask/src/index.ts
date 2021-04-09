import * as inquirer from 'inquirer';

export const getFromFlagOrAsk = async (
    flags: Record<string, string | undefined>,
    names: string[],
    type: inquirer.QuestionTypeName,
) => {
    for (const name of names) {
        const value = flags[name.toLowerCase()];
        if (value) {
            return value;
        }
    }

    const [nameQuestion] = names;
    const nameAnswer = await inquirer.prompt({
        name: nameQuestion,
        type,
    });

    return nameAnswer[nameQuestion] as any;
};
