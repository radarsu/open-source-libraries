import * as fs from 'node:fs';

import { TMP_DIR } from '../../../shared/constants.js';

export const cleanup = async () => {
    await fs.promises.rm(TMP_DIR, {
        force: true,
        recursive: true,
    });
};
