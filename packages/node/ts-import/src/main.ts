import * as compiler from './modules/compiler';
import * as crossPlatform from './modules/cross-platform';
import * as fs from 'fs';
import * as path from 'path';
import * as tsc from 'typescript';
import * as utils from './utils';

import { defaults } from 'options-defaults';

export interface LoadOptions {
    cacheDir: string;
    transpileOptions: tsc.TranspileOptions;
}

export let defaultLoadOptions = {
    transpileOptions: {},
};

export const load = async (tsRelativePath: string, options?: Partial<LoadOptions>) => {
    const config = defaults(defaultLoadOptions, options);

    const cwd = process.cwd();
    const cacheDir = path.resolve(__dirname, `..`, `cache`);

    const tsPath = path.resolve(cwd, tsRelativePath);

    let jsAfterCachePath = crossPlatform.getJsAfterCachePath(tsPath);
    const jsPath = path.join(cacheDir, jsAfterCachePath).replace(/\.[^/.]+$/u, `.js`);

    const [tsFileExists, jsFileExists] = await Promise.all([
        utils.checkIfFileExists(tsPath),
        utils.checkIfFileExists(jsPath).catch((err) => {
            // * Ignore non-existant cache.
        }),
    ]);

    // Load from cache.
    if (jsFileExists && !utils.isFileNewer(tsFileExists, jsFileExists)) {
        const loaded = await import(jsPath);
        return loaded;
    }

    await compiler.compile({
        tsPath,
        jsPath,
        transpileOptions: config.transpileOptions,
    });

    const loaded = await import(jsPath);
    return loaded;
};

export const loadSync = (tsRelativePath: string, options?: Partial<LoadOptions>) => {
    const config = defaults(defaultLoadOptions, options);

    const cwd = process.cwd();
    const cacheDir = path.resolve(__dirname, `..`, `cache`);

    const tsPath = path.resolve(cwd, tsRelativePath);

    let jsAfterCachePath = crossPlatform.getJsAfterCachePath(tsPath);
    const jsPath = path.join(cacheDir, jsAfterCachePath).replace(/\.[^/.]+$/u, `.js`);

    const tsFileExists = utils.checkIfFileExistsSync(tsPath);
    let jsFileExists: fs.Stats | undefined;

    try {
        jsFileExists = utils.checkIfFileExistsSync(jsPath);
    } catch (err) {
        // * Ignore non-existant cache.
    }

    // Load from cache.
    if (jsFileExists && !utils.isFileNewer(tsFileExists, jsFileExists)) {
        const loaded = require(jsPath);
        return loaded;
    }

    compiler.compileSync({
        tsPath,
        jsPath,
        transpileOptions: config.transpileOptions,
    });

    const loaded = require(jsPath);
    return loaded;
};
