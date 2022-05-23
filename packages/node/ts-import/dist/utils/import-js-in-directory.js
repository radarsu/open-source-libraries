"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importJsInDirectory = void 0;
const importJsInDirectory = async (cwd, jsPath, importDirectory) => {
    process.chdir(importDirectory);
    const compiled = await Promise.resolve().then(() => require(jsPath));
    process.chdir(cwd);
    return compiled;
};
exports.importJsInDirectory = importJsInDirectory;
//# sourceMappingURL=import-js-in-directory.js.map