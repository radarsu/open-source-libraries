import * as app from './app/app.js';

export const copy = async (from: string, to: string) => {
    const providers = {
        logger: console,
    };

    await app.start(providers, from, to);
};

await copy(`./from`, `./to`);
