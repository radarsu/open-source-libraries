import * as childProcess from 'node:child_process';
import * as fs from 'node:fs';

import { TMP_DIR } from '../../../shared/constants.js';
import { getTemplatesFromLocal } from './get-templates-from-local.js';

export const getTemplatesFromRemote = async (url: string, templatePattern: string) => {
    await fs.promises.rm(TMP_DIR, {
        force: true,
        recursive: true,
    });

    await fs.promises.mkdir(TMP_DIR, {
        recursive: true,
    });

    childProcess.execSync(`git clone ${url} ${TMP_DIR}`, {
        stdio: `inherit`,
    });

    const templates = await getTemplatesFromLocal(`${TMP_DIR}/${templatePattern}`);
    return templates;
};
