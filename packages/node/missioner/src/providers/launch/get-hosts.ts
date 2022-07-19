import * as path from 'path';
import * as tsImport from 'ts-import';

import { Host } from '../../shared/interfaces';

export const getHosts = async (cwd: string) => {
    const hostsDir = path.join(cwd, `hosts`, `index.ts`);

    const hostsModule = await tsImport.load(hostsDir, {
        mode: tsImport.LoadMode.Compile,
    });

    const hosts = await hostsModule.getHosts();

    return hosts as Host[];
};
