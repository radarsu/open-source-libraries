import { createProviders, loadModule } from 'provideps';

const callContext: any = {};

export const call: {
    [key: string]: <T>(...args: any[]) => T;
} = new Proxy(() => {}, {
    apply(target, thisArg, args) {
        console.flatLog({ args });
        return (loadModule as any)(callContext.property, ...args);
    },
    get: (target, property) => {
        callContext.property = property;
        return call;
    },
}) as any;

export const askForProviders = async () => {
    return [`token`, `args`];
};

export const start = async (token: string, args: any[]) => {
    const providers = createProviders();
    providers.set(`token`, () => `secret`);

    // await loadModule(import(`./items/get-items.js`), { providers });

    const getItemsModule = await import(`./items/get-items.js`);

    const items = await call[`getItems`]!<number[]>(getItemsModule, { providers });

    const items2 = getItemsModule.getItems(token);

    console.log(`App received:`, token, args, items, items2);
};
