import { createProviders, loadModule } from './lib/lib.js';

export const copy = async (from: string, to: string) => {
    const providers = createProviders();

    providers.set(`args`, () => Promise.resolve([from, to]));
    providers.set(`token`, () => Promise.resolve(`secret`));

    await loadModule(`./app/app.module.js`, {
        providers,
        async onMissingProvider(requestedProvider: string) {
            console.error(`Exiting due to missing provider "${requestedProvider}".`);
            process.exit(1);
        },
    });
};

await copy(`./from`, `./to`);
