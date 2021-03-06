"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfFileExistsSync = exports.checkIfFileExists = void 0;
const fs = require("fs");
const checkIfFileExists = async (filePath) => {
    return fs.promises.stat(filePath);
};
exports.checkIfFileExists = checkIfFileExists;
const checkIfFileExistsSync = (filePath) => {
    return fs.statSync(filePath);
};
exports.checkIfFileExistsSync = checkIfFileExistsSync;
//# sourceMappingURL=check-if-file-exists.js.map