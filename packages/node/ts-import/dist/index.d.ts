export interface Logger {
    verbose: (message?: any, ...optionalParams: any[]) => void;
    debug: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
    time: (label?: string) => void;
    timeEnd: (label?: string) => void;
}
export interface CompilerOptions {
    fallback?: boolean;
    compilerOptions?: CompilerOptions;
    logger?: Partial<Logger>;
}
export interface CompilationContext {
    cwd: string;
    tsPath: string;
    tsDir: string;
}
export declare class Compiler {
    static defaults: {
        fallback: boolean;
        compilerOptions: {
            downlevelIteration: boolean;
            emitDecoratorMetadata: boolean;
            experimentalDecorators: boolean;
            module: string;
            outDir: string;
            resolveJsonModule: boolean;
            rootDir: string;
            skipLibCheck: boolean;
            target: string;
        };
    };
    options: CompilerOptions & typeof Compiler.defaults;
    constructor(options?: CompilerOptions);
    compile(relativeTsPath?: string, cwd?: string): Promise<any>;
    private compileOrFail;
    private buildCache;
}
export declare const tsImport: Compiler;
