import * as tsc from 'typescript';
export interface LoadOptions {
    cacheDir: string;
    transpileOptions: tsc.TranspileOptions;
}
export declare let defaultLoadOptions: {
    transpileOptions: {};
};
export declare const load: (tsRelativePath: string, options?: Partial<LoadOptions> | undefined) => Promise<any>;
export declare const loadSync: (tsRelativePath: string, options?: Partial<LoadOptions> | undefined) => any;
