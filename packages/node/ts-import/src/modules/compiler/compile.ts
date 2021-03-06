import * as tsc from 'typescript';

export interface CompileOptions {
    tsPath: string;
    compilerOptions: tsc.CompilerOptions;
}

export const compile = (options: CompileOptions) => {
    const program = tsc.createProgram({
        rootNames: [options.tsPath],
        options: options.compilerOptions,
    });

    program.emit();
};
