export class TimeoutPromise<T> extends Promise<T> {
    clear!: () => void;

    reject!: () => void;

    resolve!: () => void;
}

export interface TimeoutPromiseScope {
    timeout?: any;
    resolve?: (value?: any) => void;
    reject?: (value?: any) => void;
}

/**
 * Returns a promise that is resolved after timeout. Promise can be cleared, resolved and rejected on demand.
 */
export const timeout = async (milliseconds = 0): TimeoutPromise<void> => {
    const scope: TimeoutPromiseScope = {};

    const promise = new TimeoutPromise<void>((resolve, reject) => {
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
        (scope as any).reject();
    };

    promise.resolve = () => {
        clearTimeout(scope.timeout);
        (scope as any).resolve();
    };

    return promise;
};
