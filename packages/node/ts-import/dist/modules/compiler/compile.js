"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSync = exports.compile = void 0;
const fs = require("fs");
const path = require("path");
const tsc = require("typescript");
const compile = async (options) => {
    const ts = await fs.promises.readFile(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), options.transpileOptions);
    await fs.promises.mkdir(path.dirname(options.jsPath), {
        recursive: true,
    });
    await fs.promises.writeFile(options.jsPath, tsTranspiled.outputText);
};
exports.compile = compile;
const compileSync = (options) => {
    const ts = fs.readFileSync(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), options.transpileOptions);
    fs.mkdirSync(path.dirname(options.jsPath), {
        recursive: true,
    });
    fs.writeFileSync(options.jsPath, tsTranspiled.outputText);
};
exports.compileSync = compileSync;
//# sourceMappingURL=compile.js.map