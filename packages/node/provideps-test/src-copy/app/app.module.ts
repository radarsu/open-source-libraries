/* eslint-disable class-methods-use-this */
import { Provide, START, getEndlessProxy } from 'provident';

import { ArgsService } from './args.service.js';
import { ItemsService } from './items/items.service.js';
import { LoggerService } from './logger/logger.service.js';

export class AppModule {
    @Provide(async () => {
        const endlessProxy = getEndlessProxy();
        const providers = new Map();
        providers.set(ItemsService, endlessProxy);
        providers.set(LoggerService, endlessProxy);
        providers.set(Object, endlessProxy);
        return providers;
    })
    async [START](argsService: any, itemsService: any, loggerService: any) {
        itemsService[START]();
        console.log(`WORKS`);
    }
}

// Level 2 function.
const getItem = {
    myDependenciesPlease: [PickupService],
    run(pickupService: PickupService) {
        return pickupService.pickItem();
    },
};

const packItemDependencies = [getItem];

// Level 1 function.
const packItem = (...dependencies: any[]) => {};

// Main function.
const mainDependencies = [packItem];
const mainFunc = (...dependencies: any[]) => {};

mainFunc(...packItemDependencies);

const main = async () => {
    const appModule = await import(`./app/app.module.js`);

    // Ask appModule what it needs.
    const requestedProviders = await appModule.askForProviders();

    const actualProviders = requestedProviders.map(() => {
        return endlessProxy;
    });

    appModule.start(requestedProviders);
};

const root = {
    main,
    modules: [],
};
