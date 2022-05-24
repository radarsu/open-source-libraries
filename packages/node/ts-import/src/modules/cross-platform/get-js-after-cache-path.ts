export const getJsAfterCachePath = (tsPath: string) => {
    let jsAfterCachePath = tsPath;
    if (process.platform === `win32`) {
        jsAfterCachePath = tsPath.substring(0, 1) + tsPath.substring(2, tsPath.length);
    }

    return jsAfterCachePath;
};
