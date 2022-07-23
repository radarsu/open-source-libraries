/* eslint-disable class-methods-use-this */
import { Provide, START, getEndlessProxy } from 'provident';

export class ItemsService {
    @Provide(async () => {
        const endlessProxy = getEndlessProxy();
        const providers = new Map();
        providers.set(ItemsService, endlessProxy);
        providers.set(LoggerService, endlessProxy);
        providers.set(Object, endlessProxy);
        return providers;
    })
    async [START](argsService: any, itemsService: any, loggerService: any) {
        argsService.anythig = 5;
        itemsService.asdf();
        console.log(`WORKS`);
    }
}
