import * as tsc from 'typescript';

export enum LoadMode {
    Transpile = `transpile`,
    Compile = `compile`,
}

export interface LoadTranspileOptions {
    mode: LoadMode.Transpile;
    transpileOptions: {
        cache: {
            dir: string;
            // invalidateOnChanges: boolean;
        };
        transpileOptions: tsc.TranspileOptions;
    };
}

export interface LoadCompileOptions {
    mode: LoadMode.Compile;
    compileOptions: {
        // cache: {
        //     invalidateOnChanges: boolean;
        // };
        compilerOptions: tsc.CompilerOptions;
    };
}

export type LoadOptions = LoadTranspileOptions | LoadCompileOptions;
