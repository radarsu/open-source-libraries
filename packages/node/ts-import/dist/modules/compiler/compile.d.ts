import * as tsc from 'typescript';
export interface CompileOptions {
    tsPath: string;
    jsPath: string;
    transpileOptions: tsc.TranspileOptions;
}
export declare const compile: (options: CompileOptions) => Promise<void>;
export declare const compileSync: (options: CompileOptions) => void;
