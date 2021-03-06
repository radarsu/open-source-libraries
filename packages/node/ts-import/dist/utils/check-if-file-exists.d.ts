/// <reference types="node" />
import * as fs from 'fs';
export declare const checkIfFileExists: (filePath: string) => Promise<fs.Stats>;
export declare const checkIfFileExistsSync: (filePath: string) => fs.Stats;
