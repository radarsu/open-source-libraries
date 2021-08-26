import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { MainContext } from '../interfaces/main-context';

const copyTemplateDirectory = async (options: MainContext) => {
    const { selectedTemplate, targetDirectoryPath } = options;

    await fsExtra.copy(selectedTemplate.path, targetDirectoryPath);
    await fs.promises.unlink(`${targetDirectoryPath}/_decree.ts`);
};

export { copyTemplateDirectory };
