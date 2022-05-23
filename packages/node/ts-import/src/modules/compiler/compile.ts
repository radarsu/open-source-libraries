import * as fs from 'fs';
import * as path from 'path';
import * as tsc from 'typescript';

export interface CompileOptions {
    tsPath: string;
    jsPath: string;
}

export const compile = async (options: CompileOptions) => {
    const ts = await fs.promises.readFile(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), {});

    await fs.promises.mkdir(path.dirname(options.jsPath), {
        recursive: true,
    });

    await fs.promises.writeFile(options.jsPath, tsTranspiled.outputText);
};

export const compileSync = (options: CompileOptions) => {
    const ts = fs.readFileSync(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), {});

    fs.mkdirSync(path.dirname(options.jsPath), {
        recursive: true,
    });

    fs.writeFileSync(options.jsPath, tsTranspiled.outputText);
};
