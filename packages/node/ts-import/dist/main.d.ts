import { LoadMode, LoadOptions } from './load.interfaces';
export declare const defaultLoadOptions: {
    mode: LoadMode;
};
export declare const load: (tsRelativePath: string, options?: LoadOptions) => Promise<any>;
export declare const loadSync: (tsRelativePath: string, options?: LoadOptions) => any;
export * from './load.interfaces';
