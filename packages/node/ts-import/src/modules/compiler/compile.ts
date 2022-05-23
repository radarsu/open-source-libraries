import * as fs from 'fs';
import * as path from 'path';
import * as tsc from 'typescript';

export interface CompileOptions {
    tsPath: string;
    jsPath: string;
    transpileOptions: tsc.TranspileOptions;
}

export const compile = async (options: CompileOptions) => {
    const ts = await fs.promises.readFile(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), options.transpileOptions);

    await fs.promises.mkdir(path.dirname(options.jsPath), {
        recursive: true,
    });

    await fs.promises.writeFile(options.jsPath, tsTranspiled.outputText);
};

export const compileSync = (options: CompileOptions) => {
    const ts = fs.readFileSync(options.tsPath);
    const tsTranspiled = tsc.transpileModule(ts.toString(), options.transpileOptions);

    fs.mkdirSync(path.dirname(options.jsPath), {
        recursive: true,
    });

    fs.writeFileSync(options.jsPath, tsTranspiled.outputText);
};
