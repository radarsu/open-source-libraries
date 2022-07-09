import { LoadOptions } from '../../load.interfaces';
export declare const getConfig: (options: Partial<LoadOptions>) => {
    cache: {
        dir: string;
    };
    transpileOptions: import("typescript").TranspileOptions;
} & Partial<LoadOptions>;
