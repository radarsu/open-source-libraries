import * as tsc from 'typescript';
export interface LoadOptions {
    compilerOptions: tsc.CompilerOptions;
}
export declare let defaultLoadOptions: {
    compilerOptions: {
        outDir: string;
        downlevelIteration: boolean;
        emitDecoratorMetadata: boolean;
        experimentalDecorators: boolean;
        module: tsc.ModuleKind;
        resolveJsonModule: boolean;
        rootDir: string;
        skipLibCheck: boolean;
        target: tsc.ScriptTarget;
    };
};
export declare const load: (tsRelativePath: string, options?: Partial<LoadOptions>) => Promise<any>;
export declare const loadSync: (tsRelativePath: string, options?: Partial<LoadOptions>) => any;
