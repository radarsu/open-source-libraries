import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { Template } from '../../../shared/find-templates.js';

interface CopyTemplateHandlers {
    onExistingFile: () => Promise<ContinueOrder | undefined>;
}

interface ContinueOrder {
    continue: boolean;
}

const copyTemplate = async (template: Template, to: string, handlers: CopyTemplateHandlers) => {
    const fileExists = await fs.promises.access(to).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    if (fileExists) {
        const order = await handlers.onExistingFile();

        if (!order?.continue) {
            return order;
        }
    }

    await fsExtra.copy(template.path, to, {
        recursive: true,
    });
};

export type { ContinueOrder, CopyTemplateHandlers };
export { copyTemplate };
