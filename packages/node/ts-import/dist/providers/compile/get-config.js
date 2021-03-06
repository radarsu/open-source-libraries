"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path = require("path");
const tsc = require("typescript");
const options_defaults_1 = require("options-defaults");
const getDefaultCompilerOptions = () => {
    const defaultsForPlatform = {
        outDir: path.resolve(__dirname, `..`, `..`, `..`, `cache`),
    };
    if (process.platform === `win32`) {
        const driveLetter = process.cwd().charAt(0);
        defaultsForPlatform.outDir = path.join(defaultsForPlatform.outDir, driveLetter);
        defaultsForPlatform.rootDir = `${driveLetter}:/`;
    }
    else {
        defaultsForPlatform.rootDir = `/`;
    }
    return defaultsForPlatform;
};
const getConfig = (options) => {
    const defaultCompileOptions = {
        compilerOptions: Object.assign(Object.assign({}, getDefaultCompilerOptions()), { downlevelIteration: true, emitDecoratorMetadata: true, experimentalDecorators: true, module: tsc.ModuleKind.CommonJS, resolveJsonModule: true, skipLibCheck: true, target: tsc.ScriptTarget.ES2015 }),
    };
    const compileOptions = (0, options_defaults_1.defaults)(defaultCompileOptions, options);
    return compileOptions;
};
exports.getConfig = getConfig;
//# sourceMappingURL=get-config.js.map