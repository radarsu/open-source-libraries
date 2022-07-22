import { storage } from './storage.js';

export const Provide = (getProviders: (...args: any[]) => any) => {
    return (target: any, methodName: string, descriptor: any) => {
        storage.set(descriptor.value, {
            getProviders,
        });
    };
};
