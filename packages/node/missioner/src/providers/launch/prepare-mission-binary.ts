import * as pkg from 'pkg';

export interface PrepareMissionBinaryOptions {
    missionJsPath: string;
    uniqueMissionId: string;
}

export const prepareMissionBinary = async (options: PrepareMissionBinaryOptions) => {
    const outPath = `./dist-bin/${options.uniqueMissionId}`;

    await pkg.exec([options.missionJsPath, `--output=${outPath}`, `--targets=node16-linux-x64`]);

    return outPath;
};
