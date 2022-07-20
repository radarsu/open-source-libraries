import * as tsc from 'typescript';

export interface PrepareMissionJsOptions {
    cwd: string;
    missionName: string;
    uniqueMissionId: string;
}

export const prepareMissionJs = async (options: PrepareMissionJsOptions) => {
    const tsPath = `${options.cwd}/missions/${options.missionName}`;
    const program = tsc.createProgram({
        rootNames: [tsPath],
        options: {
            outDir: `./.tmp`,
        },
    });

    program.emit();

    const missionJsPath = `${options.cwd}/.tmp/${options.missionName}.js`;

    return missionJsPath;
};
