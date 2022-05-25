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
export declare const timeout: (milliseconds?: number) => TimeoutPromise<void>;
