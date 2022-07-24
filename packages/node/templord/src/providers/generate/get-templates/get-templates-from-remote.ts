import * as childProcess from 'child_process';
import * as fs from 'fs';

import { getTemplatesFromLocal } from './get-templates-from-local';

export const getTemplatesFromRemote = async (url: string, templatePattern: string) => {
    const tmpDir = `./.templord`;

    await fs.promises.rm(tmpDir, {
        force: true,
        recursive: true,
    });

    await fs.promises.mkdir(tmpDir, {
        recursive: true,
    });

    childProcess.execSync(`git clone ${url} ${tmpDir}`, {
        stdio: `inherit`,
    });

    const templates = await getTemplatesFromLocal(`${tmpDir}/${templatePattern}`);

    return templates;
};
