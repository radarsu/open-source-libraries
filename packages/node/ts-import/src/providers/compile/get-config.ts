import * as path from 'path';
import * as tsc from 'typescript';

import { LoadCompileOptions, LoadOptions } from '../../load.interfaces';

import { defaults } from 'options-defaults';

const getDefaultOutDir = () => {
    const defaultOutDir = path.resolve(__dirname, `..`, `..`, `..`, `cache`);

    if (process.platform === `win32`) {
        const driveLetter = process.cwd().charAt(0);
        return path.join(defaultOutDir, driveLetter);
    }

    return defaultOutDir;
};

export const getConfig = (options: Partial<LoadOptions>) => {
    const defaultCompileOptions: LoadCompileOptions['compileOptions'] & { compilerOptions: { outDir: string } } = {
        // invalidateOnChanges: boolean;
        compilerOptions: {
            outDir: getDefaultOutDir(),
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
