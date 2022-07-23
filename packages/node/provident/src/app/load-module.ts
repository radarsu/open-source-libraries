import * as path from 'path';
import * as url from 'url';

export interface Module {
    askForProviders(): Promise<string[]>;
    start(...args: any[]): Promise<void>;
}

export type OnMissingProviderOrder = ReplaceOrder;

export interface ReplaceOrder {
    replaceWith: any;
}

export interface LoadModuleOptions {
    providers: Map<string, any>;
    onMissingProvider?: (requestedProvider: string) => Promise<OnMissingProviderOrder>;
}

const onMissingProviderOrderHandler = (order: OnMissingProviderOrder) => {
    if ('replaceWith' in order) {
        return order.replaceWith;
    }

    return;
};

export const loadModule = async (modulePath: string, options: LoadModuleOptions) => {
    if (modulePath.startsWith(`./`)) {
        const dirname = url.fileURLToPath(new URL('.', import.meta.url));
        // TODO: Adjust when moved to node_modules.
        modulePath = path.resolve(dirname, `..`, modulePath);
    }

    const loadedModule: Module = await import(modulePath);
    const requestedProviders = await loadedModule.askForProviders();

    const gettingActualProviders = requestedProviders.map(async (requestedProvider) => {
        const providerGetter = options.providers.get(requestedProvider);
        if (!providerGetter) {
            const order = await options.onMissingProvider?.(requestedProvider);

            if (order) {
                return onMissingProviderOrderHandler(order);
            }

            return;
        }

        const provider = await providerGetter();
        return provider;
    });

    const actualProvidersOrUndefined = await Promise.all(gettingActualProviders);
    const actualProviders = actualProvidersOrUndefined.filter(Boolean);

    loadedModule.start(...actualProviders);
};
