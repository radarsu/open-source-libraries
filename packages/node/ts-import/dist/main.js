"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSync = exports.load = exports.defaultLoadOptions = void 0;
const tslib_1 = require("tslib");
const crossPlatform = require("./modules/cross-platform");
const path = require("path");
const utils = require("./utils");
const load_interfaces_1 = require("./load.interfaces");
const options_defaults_1 = require("options-defaults");
const providers_1 = require("./providers/providers");
exports.defaultLoadOptions = {
    mode: load_interfaces_1.LoadMode.Transpile,
};
const load = async (tsRelativePath, options) => {
    const loadConfig = (0, options_defaults_1.defaults)(exports.defaultLoadOptions, options);
    const providers = providers_1.providersMap[loadConfig.mode];
    const config = providers.getConfig(loadConfig);
    const cwd = process.cwd();
    const cacheDir = providers.getCacheDir(config);
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
    await providers.load(Object.assign({ tsPath,
        jsPath }, config));
    const loaded = await Promise.resolve().then(() => require(jsPath));
    return loaded;
};
exports.load = load;
const loadSync = (tsRelativePath, options) => {
    const loadConfig = (0, options_defaults_1.defaults)(exports.defaultLoadOptions, options);
    const providers = providers_1.providersMap[loadConfig.mode];
    const config = providers.getConfig(loadConfig);
    const cwd = process.cwd();
    const cacheDir = providers.getCacheDir(config);
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
    providers.loadSync(Object.assign({ tsPath,
        jsPath }, config));
    const loaded = require(jsPath);
    return loaded;
};
exports.loadSync = loadSync;
tslib_1.__exportStar(require("./load.interfaces"), exports);
//# sourceMappingURL=main.js.map