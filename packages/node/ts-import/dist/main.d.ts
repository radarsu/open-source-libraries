import * as tsc from 'typescript';
export interface LoadOptions {
    cache: {
        dir: string;
    };
    transpileOptions: tsc.TranspileOptions;
}
export declare let defaultLoadOptions: {
    transpileOptions: {};
};
export declare const load: (tsRelativePath: string, options?: Partial<LoadOptions>) => Promise<any>;
export declare const loadSync: (tsRelativePath: string, options?: Partial<LoadOptions>) => any;
