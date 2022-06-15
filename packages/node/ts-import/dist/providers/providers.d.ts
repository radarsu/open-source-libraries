import * as compiler from '../modules/compiler';
import { LoadCompileOptions, LoadMode, LoadOptions, LoadTranspileOptions } from '../load.interfaces';
export interface Providers {
    getCacheDir: (options: LoadTranspileOptions[`transpileOptions`] | LoadCompileOptions[`compileOptions`]) => string;
    getConfig: (options: Partial<LoadOptions>) => LoadTranspileOptions['transpileOptions'] | LoadCompileOptions['compileOptions'];
    load: (options: compiler.CompileOptions | compiler.TranspileOptions) => Promise<void>;
    loadSync: (options: compiler.CompileOptions | compiler.TranspileOptions) => void;
}
export declare const providersMap: Record<LoadMode, Providers>;
