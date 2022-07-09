"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const compiler = require("../../modules/compiler");
const load = async (options) => {
    return compiler.compile(options);
};
exports.load = load;
//# sourceMappingURL=load.js.map