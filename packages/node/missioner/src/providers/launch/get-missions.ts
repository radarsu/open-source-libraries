import * as path from 'path';
import * as tsImport from 'ts-import';

export const getMissions = async (cwd: string) => {
    const missionsDir = path.join(cwd, `missions`, `index.ts`);

    const missionsModule = await tsImport.load(missionsDir, {
        mode: tsImport.LoadMode.Compile,
    });

    const missions = await missionsModule.getMissions(cwd);

    return missions as string[];
};
