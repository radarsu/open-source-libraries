import * as tsc from 'typescript';
import { LoadOptions } from '../../load.interfaces';
export declare const getConfig: (options: Partial<LoadOptions>) => {
    compilerOptions: tsc.CompilerOptions;
} & {
    compilerOptions: {
        outDir: string;
    };
} & Partial<LoadOptions>;
