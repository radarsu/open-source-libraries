import * as path from 'path';
import * as tsc from 'typescript';

import { LoadCompileOptions, LoadOptions } from '../../load.interfaces';

import { defaults } from 'options-defaults';

export const getConfig = (options: Partial<LoadOptions>) => {
    const defaultCompileOptions: LoadCompileOptions['compileOptions'] & { compilerOptions: { outDir: string } } = {
        // invalidateOnChanges: boolean;
        compilerOptions: {
            outDir: path.resolve(__dirname, `..`, `..`, `..`, `cache`),
            downlevelIteration: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            module: tsc.ModuleKind.CommonJS,
            resolveJsonModule: true,
            rootDir: `/`,
            skipLibCheck: true,
            target: tsc.ScriptTarget.ES2015,
        },
    };

    const compileOptions = defaults(defaultCompileOptions, options);
    return compileOptions;
};
