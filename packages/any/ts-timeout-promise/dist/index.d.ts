export declare class TimeoutPromise<T> extends Promise<T> {
    clear: () => void;
    reject: () => void;
    resolve: () => void;
}
export interface TimeoutPromiseScope {
    timeout?: any;
    resolve?: (value?: any) => void;
    reject?: (value?: any) => void;
}
/**
 * Returns a promise that is resolved after timeout. Promise can be cleared, resolved and rejected on demand.
 */
export declare const timeout: (milliseconds?: number) => TimeoutPromise<void>;
