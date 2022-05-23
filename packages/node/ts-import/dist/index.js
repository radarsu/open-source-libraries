"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsImport = exports.Compiler = void 0;
const childProcessExtra = require("child-process-extra");
const fs = require("fs");
const path = require("path");
const utils_1 = require("./utils");
const options_defaults_1 = require("options-defaults");
console.log(`ASDF`);
class Compiler {
    constructor(options) {
        if (process.platform === `win32`) {
            const driveLetter = process.cwd().charAt(0);
            Compiler.defaults.compilerOptions.outDir = path.resolve(Compiler.defaults.compilerOptions.outDir, driveLetter);
            Compiler.defaults.compilerOptions.rootDir = `${driveLetter}:/`;
        }
        this.options = (0, options_defaults_1.defaults)(Compiler.defaults, options);
    }
    async compile(relativeTsPath = ``, cwd = process.cwd()) {
        const tsPath = path.resolve(cwd, relativeTsPath);
        if (!fs.existsSync(tsPath)) {
            throw new Error(`File ${tsPath} not found to compile.`);
        }
        const tsDir = path.dirname(tsPath);
        const ctx = {
            cwd,
            tsPath,
            tsDir,
        };
        return this.compileOrFail(ctx);
    }
    async compileOrFail(ctx) {
        var _a, _b, _c, _d, _e, _f, _g;
        const { logger } = this.options;
        const { tsPath, tsDir, cwd } = ctx;
        const tsFileName = path.basename(tsPath);
        const jsFileName = tsFileName.replace(/\.[^/.]+$/u, `.js`);
        const tsDirWithoutDriveLetter = tsDir.replace(/^(?<driveLetter>[a-zA-Z]):/u, ``);
        const cacheDir = path.resolve(this.options.compilerOptions.outDir, `.${tsDirWithoutDriveLetter}`);
        const jsPath = path.resolve(cacheDir, jsFileName);
        (_a = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _a === void 0 ? void 0 : _a.call(logger, `Looking for cached file at ${jsPath}`);
        if (fs.existsSync(jsPath)) {
            const tsWasModified = await (0, utils_1.wasFileModified)(tsPath, jsPath);
            if (!tsWasModified) {
                (_b = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _b === void 0 ? void 0 : _b.call(logger, `File ${tsPath} was not modified, importing.`);
                return (0, utils_1.importJsInDirectory)(cwd, jsPath, tsDir);
            }
            (_c = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _c === void 0 ? void 0 : _c.call(logger, `File was modified, building and importing.`);
            const buildError = await this.buildCache(tsPath).catch((err) => {
                var _a, _b;
                (_a = logger === null || logger === void 0 ? void 0 : logger.warn) === null || _a === void 0 ? void 0 : _a.call(logger, `Building ${tsPath} failed.`);
                (_b = logger === null || logger === void 0 ? void 0 : logger.debug) === null || _b === void 0 ? void 0 : _b.call(logger, err);
                return err;
            });
            if (!this.options.fallback && buildError instanceof Error) {
                throw buildError;
            }
            (_d = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _d === void 0 ? void 0 : _d.call(logger, `Caching successfull.`);
            return (0, utils_1.importJsInDirectory)(cwd, jsPath, tsDir);
        }
        if (!fs.existsSync(cacheDir)) {
            (_e = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _e === void 0 ? void 0 : _e.call(logger, `Creating cache directory.`);
            fs.mkdirSync(cacheDir, {
                recursive: true,
            });
        }
        (_f = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _f === void 0 ? void 0 : _f.call(logger, `File was not cached, caching...`);
        await this.buildCache(tsPath);
        (_g = logger === null || logger === void 0 ? void 0 : logger.verbose) === null || _g === void 0 ? void 0 : _g.call(logger, `Caching successfull.`);
        return (0, utils_1.importJsInDirectory)(cwd, jsPath, tsDir);
    }
    async buildCache(absoluteTsPath) {
        var _a, _b;
        const { logger } = this.options;
        const tmpTsConfigPath = path.join(this.options.compilerOptions.outDir, path.dirname(absoluteTsPath).replace(/^(?<driveLetter>[a-zA-Z]):/u, ``), `tsconfig-${path.basename(absoluteTsPath)}.tmp.json`);
        await fs.promises.writeFile(tmpTsConfigPath, JSON.stringify({
            compilerOptions: this.options.compilerOptions,
            include: [absoluteTsPath],
        }, undefined, 4));
        console.log(`WOOHOO`);
        const compileCommand = `npx -p typescript tsc --project "${tmpTsConfigPath}"`;
        (_a = logger === null || logger === void 0 ? void 0 : logger.info) === null || _a === void 0 ? void 0 : _a.call(logger, `Compiling ${absoluteTsPath}`);
        (_b = logger === null || logger === void 0 ? void 0 : logger.debug) === null || _b === void 0 ? void 0 : _b.call(logger, `Command: ${compileCommand}`);
        const out = await childProcessExtra
            .exec([compileCommand], {
            logger: logger,
        })
            .catch(async (err) => {
            return err;
        });
        await fs.promises.rm(tmpTsConfigPath);
        if (out instanceof Error) {
            throw out;
        }
        return out;
    }
}
exports.Compiler = Compiler;
Compiler.defaults = {
    fallback: false,
    compilerOptions: {
        downlevelIteration: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: `commonjs`,
        outDir: path.resolve(__dirname, `../cache`),
        resolveJsonModule: true,
        rootDir: `/`,
        skipLibCheck: true,
        target: `es2015`,
    },
};
exports.tsImport = new Compiler();
//# sourceMappingURL=index.js.map