import * as fs from 'fs';

export const cleanup = async () => {
    await fs.promises.rm(`./.templord`, {
        recursive: true,
    });
};
