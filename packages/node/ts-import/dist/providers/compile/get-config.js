"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const path = require("path");
const tsc = require("typescript");
const options_defaults_1 = require("options-defaults");
const getDefaultOutDir = () => {
    const defaultOutDir = path.resolve(__dirname, `..`, `..`, `..`, `cache`);
    if (process.platform === `win32`) {
        const driveLetter = process.cwd().charAt(0);
        return path.join(defaultOutDir, driveLetter);
    }
    return defaultOutDir;
};
const getConfig = (options) => {
    const defaultCompileOptions = {
        compilerOptions: {
            outDir: getDefaultOutDir(),
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
    const compileOptions = (0, options_defaults_1.defaults)(defaultCompileOptions, options);
    return compileOptions;
};
exports.getConfig = getConfig;
//# sourceMappingURL=get-config.js.map