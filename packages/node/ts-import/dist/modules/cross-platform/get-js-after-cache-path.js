"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsAfterCachePath = void 0;
const getJsAfterCachePath = (tsPath) => {
    let jsAfterCachePath = tsPath;
    if (process.platform === `win32`) {
        jsAfterCachePath = tsPath.substring(0, 1) + tsPath.substring(2, tsPath.length);
    }
    return jsAfterCachePath;
};
exports.getJsAfterCachePath = getJsAfterCachePath;
//# sourceMappingURL=get-js-after-cache-path.js.map