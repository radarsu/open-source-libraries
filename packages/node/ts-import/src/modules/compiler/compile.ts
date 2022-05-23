import * as fs from 'fs';
import * as path from 'path';
import * as tsc from 'typescript';

export interface CompileOptions {
    tsPath: string;
    jsPath: string;
}

export const compile = async (options: CompileOptions) => {
    const ts = await fs.promises.readFile(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), {
        compilerOptions: {
            rootDir: `/`,
            downlevelIteration: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            module: tsc.ModuleKind.CommonJS,
            resolveJsonModule: true,
            skipLibCheck: true,
            target: tsc.ScriptTarget.ES2015,
        },
    });

    await fs.promises.mkdir(path.dirname(options.jsPath), {
        recursive: true,
    });

    await fs.promises.writeFile(options.jsPath, tsTranspiled.outputText);
};
