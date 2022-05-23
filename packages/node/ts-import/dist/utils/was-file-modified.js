"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wasFileModified = void 0;
const fs = require("fs");
const wasFileModified = async (tsFilePath, jsFilePath) => {
    const [tsFileStat, jsFileStat] = await Promise.all([fs.promises.stat(tsFilePath), fs.promises.stat(jsFilePath)]);
    return tsFileStat.mtimeMs > jsFileStat.mtimeMs;
};
exports.wasFileModified = wasFileModified;
//# sourceMappingURL=was-file-modified.js.map