import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        // moduleFileExtensions: ['mjs', 'js'],
        // testMatch: [`**/*.spec.ts`],
    };
};
