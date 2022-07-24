import * as childProcess from 'child_process';
import * as fs from 'fs';

import { findTemplates } from '../../../shared/find-templates';

export const getTemplatesFromRemote = async (url: string) => {
    await fs.promises.rm(`./.templord`, {
        force: true,
        recursive: true,
    });

    await fs.promises.mkdir(`./.templord`, {
        recursive: true,
    });

    childProcess.execSync(`git clone ${url} ./.templord`, {
        stdio: `inherit`,
    });

    const templates = await findTemplates(`./.templord/**/_template_*`);

    return templates;
};
