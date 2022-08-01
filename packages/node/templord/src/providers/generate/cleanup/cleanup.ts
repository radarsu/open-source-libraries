import * as fs from 'fs';

import { TMP_DIR } from '../../../shared/constants';

export const cleanup = async () => {
    await fs.promises.rm(TMP_DIR, {
        force: true,
        recursive: true,
    });
};
