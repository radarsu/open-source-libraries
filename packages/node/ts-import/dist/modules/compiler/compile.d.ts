import * as tsc from 'typescript';
export interface CompileOptions {
    tsPath: string;
    compilerOptions: tsc.CompilerOptions;
}
export declare const compile: (options: CompileOptions) => void;
