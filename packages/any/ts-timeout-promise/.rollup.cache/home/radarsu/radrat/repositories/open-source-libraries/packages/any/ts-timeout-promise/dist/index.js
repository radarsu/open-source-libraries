export class TimeoutPromise extends Promise {
}
export const timeout = async (milliseconds = 0) => {
    const scope = {};
    const promise = new TimeoutPromise((resolve, reject) => {
        scope.resolve = resolve;
        scope.reject = reject;
        scope.timeout = setTimeout(() => {
            resolve();
        }, milliseconds);
    });
    promise.clear = () => {
        clearTimeout(scope.timeout);
    };
    promise.reject = () => {
        clearTimeout(scope.timeout);
        scope.reject();
    };
    promise.resolve = () => {
        clearTimeout(scope.timeout);
        scope.resolve();
    };
    return promise;
};
//# sourceMappingURL=index.js.map