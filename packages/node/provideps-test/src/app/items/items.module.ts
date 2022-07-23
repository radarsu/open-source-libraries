// This is ItemsModule.

export const askForProviders = async () => {
    return [`args`, `logger`];
};

export const start = async (token: string, logger: string) => {
    console.log(`Items received providers:`, token);
};
