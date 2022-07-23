import { createProviders, loadModule } from 'provideps';

export const copy = async (from: string, to: string) => {
    const providers = createProviders();
    providers.set(`args`, () => [from, to]);
    providers.set(`token`, () => `secret`);

    const app = await loadModule(`start`, import(`./app/app.js`), {
        providers,
    });
};

await copy(`./from`, `./to`);
