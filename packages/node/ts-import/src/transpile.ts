import * as compiler from './modules/compiler';
import * as crossPlatform from './modules/cross-platform';
import * as fs from 'fs';
import * as path from 'path';
import * as tsc from 'typescript';
import * as utils from './utils';

import { defaults } from 'options-defaults';

export interface TranspileOptions {
    cache: {
        dir: string;
        // invalidateOnTranspileOptionChanges: boolean;
    };
    transpileOptions: tsc.TranspileOptions;
}

export let defaultLoadOptions = {
    transpileOptions: {},
};

export const transpile = async (tsRelativePath: string, options?: Partial<TranspileOptions>) => {
    const config = defaults(defaultLoadOptions, options);

    const cwd = process.cwd();
    const cacheDir = config.cache?.dir ?? path.resolve(__dirname, `..`, `cache`);

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

    await compiler.transpile({
        tsPath,
        jsPath,
        transpileOptions: config.transpileOptions,
    });

    const loaded = await import(jsPath);
    return loaded;
};

export const transpileSync = (tsRelativePath: string, options?: Partial<TranspileOptions>) => {
    const config = defaults(defaultLoadOptions, options);

    const cwd = process.cwd();
    const cacheDir = config.cache?.dir ?? path.resolve(__dirname, `..`, `cache`);

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

    compiler.transpileSync({
        tsPath,
        jsPath,
        transpileOptions: config.transpileOptions,
    });

    const loaded = require(jsPath);
    return loaded;
};
