import * as compiler from './modules/compiler';
import * as crossPlatform from './modules/cross-platform';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from './utils';

import { LoadMode, LoadOptions } from './load.interfaces';

import { defaults } from 'options-defaults';
import { providersMap } from './providers/providers';

export const defaultLoadOptions = {
    mode: LoadMode.Transpile,
};

export const load = async (tsRelativePath: string, options?: Partial<LoadOptions>) => {
    const loadConfig = defaults(defaultLoadOptions, options);
    const providers = providersMap[loadConfig.mode];
    const config = providers.getConfig(loadConfig);

    const cwd = process.cwd();
    const cacheDir = providers.getCacheDir(config);
    const tsPath = path.resolve(cwd, tsRelativePath);

    let jsAfterCachePath = crossPlatform.getJsAfterCachePath(tsPath);
    const jsPath = path.join(cacheDir, jsAfterCachePath).replace(/\.[^/.]+$/u, `.js`);

    const [tsFileExists, jsFileExists] = await Promise.all([
        utils.checkIfFileExists(tsPath),
        utils.checkIfFileExists(jsPath).catch((err) => {
            // * Ignore non-existent cache.
        }),
    ]);

    // Load from cache.
    if (jsFileExists && !utils.isFileNewer(tsFileExists, jsFileExists)) {
        const loaded = await import(jsPath);
        return loaded;
    }

    await providers.load({
        tsPath,
        jsPath,
        ...config,
    });

    const loaded = await import(jsPath);
    return loaded;
};

export const loadSync = (tsRelativePath: string, options?: Partial<LoadOptions>) => {
    const loadConfig = defaults(defaultLoadOptions, options);
    const providers = providersMap[loadConfig.mode];
    const config = providers.getConfig(loadConfig);

    const cwd = process.cwd();
    const cacheDir = providers.getCacheDir(config);
    const tsPath = path.resolve(cwd, tsRelativePath);

    let jsAfterCachePath = crossPlatform.getJsAfterCachePath(tsPath);
    const jsPath = path.join(cacheDir, jsAfterCachePath).replace(/\.[^/.]+$/u, `.js`);

    const tsFileExists = utils.checkIfFileExistsSync(tsPath);
    let jsFileExists: fs.Stats | undefined;

    try {
        jsFileExists = utils.checkIfFileExistsSync(jsPath);
    } catch (err) {
        // * Ignore non-existent cache.
    }

    // Load from cache.
    if (jsFileExists && !utils.isFileNewer(tsFileExists, jsFileExists)) {
        const loaded = require(jsPath);
        return loaded;
    }

    providers.loadSync({
        tsPath,
        jsPath,
        ...config,
    });

    const loaded = require(jsPath);
    return loaded;
};