"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpileSync = exports.transpile = void 0;
const fs = require("fs");
const path = require("path");
const tsc = require("typescript");
const transpile = async (options) => {
    const ts = await fs.promises.readFile(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), options.transpileOptions);
    await fs.promises.mkdir(path.dirname(options.jsPath), {
        recursive: true,
    });
    await fs.promises.writeFile(options.jsPath, tsTranspiled.outputText);
};
exports.transpile = transpile;
const transpileSync = (options) => {
    const ts = fs.readFileSync(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), options.transpileOptions);
    fs.mkdirSync(path.dirname(options.jsPath), {
        recursive: true,
    });
    fs.writeFileSync(options.jsPath, tsTranspiled.outputText);
};
exports.transpileSync = transpileSync;
//# sourceMappingURL=transpile.js.map