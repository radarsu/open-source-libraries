"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSync = exports.load = exports.defaultLoadOptions = void 0;
const compiler = require("./modules/compiler");
const crossPlatform = require("./modules/cross-platform");
const path = require("path");
const utils = require("./utils");
const options_defaults_1 = require("options-defaults");
exports.defaultLoadOptions = {
    transpileOptions: {},
};
const load = async (tsRelativePath, options) => {
    const config = (0, options_defaults_1.defaults)(exports.defaultLoadOptions, options);
    const cwd = process.cwd();
    const cacheDir = path.resolve(__dirname, `..`, `cache`);
    const tsPath = path.resolve(cwd, tsRelativePath);
    let jsAfterCachePath = crossPlatform.getJsAfterCachePath(tsPath);
    const jsPath = path.join(cacheDir, jsAfterCachePath).replace(/\.[^/.]+$/u, `.js`);
    const [tsFileExists, jsFileExists] = await Promise.all([
        utils.checkIfFileExists(tsPath),
        utils.checkIfFileExists(jsPath).catch((err) => {
        }),
    ]);
    if (jsFileExists && !utils.isFileNewer(tsFileExists, jsFileExists)) {
        const loaded = await Promise.resolve().then(() => require(jsPath));
        return loaded;
    }
    await compiler.compile({
        tsPath,
        jsPath,
        transpileOptions: config.transpileOptions,
    });
    const loaded = await Promise.resolve().then(() => require(jsPath));
    return loaded;
};
exports.load = load;
const loadSync = (tsRelativePath, options) => {
    const config = (0, options_defaults_1.defaults)(exports.defaultLoadOptions, options);
    const cwd = process.cwd();
    const cacheDir = path.resolve(__dirname, `..`, `cache`);
    const tsPath = path.resolve(cwd, tsRelativePath);
    let jsAfterCachePath = crossPlatform.getJsAfterCachePath(tsPath);
    const jsPath = path.join(cacheDir, jsAfterCachePath).replace(/\.[^/.]+$/u, `.js`);
    const tsFileExists = utils.checkIfFileExistsSync(tsPath);
    let jsFileExists;
    try {
        jsFileExists = utils.checkIfFileExistsSync(jsPath);
    }
    catch (err) {
    }
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
exports.loadSync = loadSync;
//# sourceMappingURL=main.js.map