import {
    OnMissingMethodOrder,
    OnMissingProviderOrder,
    onMissingMethodOrderHandler,
    onMissingProviderOrderHandler,
} from './order-handlers.js';

import { Module } from './module.js';
import { defaults } from 'options-defaults';
import { getModuleName } from '../shared/get-module-name.js';

export interface LoadModuleOptions {
    providers: Map<string, any>;
    onMissingProvider?: (requestedProvider: string) => Promise<OnMissingProviderOrder>;
    onMissingMethod?: (loadedModule: any, requestedMethod: string) => Promise<OnMissingMethodOrder>;
    onMoreProvidersThanExpected?: (loadedModule: any, requestedMethod: string) => Promise<void>;
}

export const loadModuleDefaults = {
    async onMissingProvider(loadedModule: any, requestedProvider: string) {
        const moduleName = getModuleName(loadedModule);
        console.error(`Module ${moduleName} lacks provider "${requestedProvider}".`);
        process.exit(1);
    },
    async onMissingMethod(loadedModule: any, requestedMethod: string) {
        const moduleName = loadedModule?.name ? `"${loadedModule.name}"` : `without name`;
        console.error(`Module ${moduleName} lacks implementation of method "${requestedMethod}".`);
        process.exit(1);
    },
    async onMoreProvidersThanExpected(
        loadedModule: any,
        requestedMethod: string,
        providers: any,
        requestedProviders: any[],
    ) {
        const moduleName = loadedModule?.name ? `"${loadedModule.name}"` : `without name`;
        console.error(
            `Module ${moduleName} received more providers (${providers.size}) than expected (${requestedProviders.length}).`,
        );
        process.exit(1);
    },
};

export const loadModule = async (
    requestedMethod: string,
    gettingModule: Promise<Module>,
    options: LoadModuleOptions,
) => {
    const config = defaults(options, loadModuleDefaults);
    const loadedModule = await gettingModule;
    const requestedProviders = await loadedModule.askForProviders();

    if (config.providers.size > requestedProviders.length) {
        await config.onMoreProvidersThanExpected(loadedModule, requestedMethod, config.providers, requestedProviders);
    }

    const gettingActualProviders = requestedProviders.map(async (requestedProvider) => {
        const providerGetter = config.providers.get(requestedProvider);
        if (!providerGetter) {
            const order = await config.onMissingProvider(loadedModule, requestedProvider);

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

    if (!(requestedMethod in loadedModule)) {
        const order = await config.onMissingMethod(loadedModule, requestedMethod);

        if (order) {
            return onMissingMethodOrderHandler(order, actualProviders);
        }
    }

    return (loadedModule as any)[requestedMethod](...actualProviders);
};
