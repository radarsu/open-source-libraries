import * as compiler from './modules/compiler';
import * as crossPlatform from './modules/cross-platform';
import * as fs from 'fs';
import * as path from 'path';
import * as tsc from 'typescript';
import * as utils from './utils';

import { defaults } from 'options-defaults';

export interface CompileOptions {
    compilerOptions: tsc.CompilerOptions;
}

export let defaultCompileOptions = {
    // invalidateOnCompileOptionChanges: boolean;
    compilerOptions: {
        outDir: path.resolve(__dirname, `..`, `cache`),
        downlevelIteration: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: tsc.ModuleKind.CommonJS,
        resolveJsonModule: true,
        rootDir: `/`,
        skipLibCheck: true,
        target: tsc.ScriptTarget.ES2015,
    },
};

export const compile = async (tsRelativePath: string, options?: Partial<CompileOptions>) => {
    const config = defaults(defaultCompileOptions, options);

    const cwd = process.cwd();
    const cacheDir = config.compilerOptions.outDir;

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

    compiler.compile({
        tsPath,
        compilerOptions: config.compilerOptions,
    });

    const loaded = await import(jsPath);
    return loaded;
};

export const compileSync = (tsRelativePath: string, options?: Partial<CompileOptions>) => {
    const config = defaults(defaultCompileOptions, options);

    const cwd = process.cwd();
    const cacheDir = config.compilerOptions.outDir;

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

    compiler.compile({
        tsPath,
        compilerOptions: config.compilerOptions,
    });

    const loaded = require(jsPath);
    return loaded;
};
