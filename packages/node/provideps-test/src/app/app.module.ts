// This is AppModule.

import * as path from 'path';
import * as url from 'url';

import { loadModule } from '../lib/lib.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const providers = new Map<string, () => Promise<any>>();

export const askForProviders = async () => {
    return [`token`, `args`];
};

export const start = async (token: string, args: any[]) => {
    const itemsModulePath = path.resolve(__dirname, `items`, `items.module.js`);
    const itemsModule = await loadModule(itemsModulePath, { providers });

    console.log(`App received:`, token, args);
};
