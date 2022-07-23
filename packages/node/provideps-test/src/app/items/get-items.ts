export const name = `GetItems`;

export const askForProviders = async () => {
    return [`token`];
};

export const getItems = async (token: string) => {
    console.log(`Items received providers:`, token);

    return [1, 2, 3];
};
