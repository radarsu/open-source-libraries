import { START } from './constants.js';
import { storage } from './storage.js';

export const bootstrap = async (classConstructor: any, globalProviders?: any[]) => {
    const instance = new classConstructor();

    const expectedProviders = Reflect.getMetadata(`design:paramtypes`, instance, START);

    const methodMetadata = storage.get(instance[START]);

    if (!methodMetadata) {
        console.error(`Method "${START}" requires @Provide decorator.`);
        return;
    }

    const providers = await methodMetadata.getProviders();
    globalProviders?.forEach((globalProvider) => {
        providers.set(globalProvider.type, globalProvider.value);
    });

    const sortedProviders = expectedProviders.map((expectedProvider: any) => {
        const foundProvider = providers.get(expectedProvider);

        if (typeof foundProvider === `undefined`) {
            throw new Error(`Provider "${expectedProvider.name}" not found.`);
        }

        return foundProvider;
    });

    await instance[START](...sortedProviders);
};
