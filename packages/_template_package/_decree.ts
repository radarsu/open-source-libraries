import type * as Enquirer from 'enquirer';

const getDecree = async (enquirer: Enquirer) => {
    const responses = await enquirer.prompt([
        {
            message: `Name:`,
            name: `name`,
            type: `input`,
        },
    ]);

    return responses;
};

export default getDecree;
