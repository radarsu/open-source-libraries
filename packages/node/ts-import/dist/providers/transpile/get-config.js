"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path = require("path");
const options_defaults_1 = require("options-defaults");
const getConfig = (options) => {
    const defaultTranspileOptions = {
        cache: {
            dir: path.resolve(__dirname, `..`, `..`, `..`, `cache`),
        },
        transpileOptions: {},
    };
    const transpileOptions = (0, options_defaults_1.defaults)(defaultTranspileOptions, options);
    return transpileOptions;
};
exports.getConfig = getConfig;
//# sourceMappingURL=get-config.js.map