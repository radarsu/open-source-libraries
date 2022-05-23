import * as compiler from './modules/compiler';
import * as path from 'path';
import * as utils from './utils';

export interface LoadOptions {
    cacheDir: string;
}

let defaultLoadOptions: LoadOptions = {
    cacheDir: path.resolve(__dirname, `../cache`),
};

export const load = async (tsRelativePath: string, options = defaultLoadOptions) => {
    const cwd = process.cwd();
    const tsPath = path.resolve(cwd, tsRelativePath);
    const jsPath = path.join(options.cacheDir, tsPath).replace(/\.[^/.]+$/u, `.js`);

    const [tsFileExists, jsFileExists] = await Promise.all([
        utils.checkIfFileExists(tsPath),
        utils.checkIfFileExists(jsPath).catch((err) => {
            // * Ignore non-existant cache.
        }),
    ]);

    // Load from cache.
    if (jsFileExists) {
        const tsFileIsNewer = await utils.isFileNewer(tsFileExists, jsFileExists);
        if (!tsFileIsNewer) {
            // process.chdir(path.dirname(tsPath));
            const loaded = await import(jsPath);
            // process.chdir(cwd);
            return loaded;
        }
    }

    await compiler.compile({
        tsPath,
        jsPath,
    });

    // process.chdir(path.dirname(tsPath));
    const loaded = await import(jsPath);
    // process.chdir(cwd);
    return loaded;
};
