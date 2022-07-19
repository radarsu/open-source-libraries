import * as path from 'path';
import * as tsImport from 'ts-import';

import { Mission } from '../../shared/interfaces';

export const getMissions = async (cwd: string) => {
    const missionsDir = path.join(cwd, `missions`, `index.ts`);

    const missionsModule = await tsImport.load(missionsDir, {
        mode: tsImport.LoadMode.Compile,
    });

    const missions = await missionsModule.getMissions();

    return missions as Mission[];
};
