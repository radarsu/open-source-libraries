import * as childProcess from 'child_process';
import * as fs from 'fs';

import { TMP_DIR } from '../../../shared/constants';
import { getTemplatesFromLocal } from './get-templates-from-local';

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
