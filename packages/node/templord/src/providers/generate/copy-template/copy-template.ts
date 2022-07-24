import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { Template } from '../../../shared/find-templates.js';

export interface CopyTemplateHandlers {
    onExistingFile: () => Promise<OnExistingFileOrder>;
}

export type OnExistingFileOrder = ContinueOrder;

export interface ContinueOrder {
    continue: boolean;
}

const handleOrder = async (order: OnExistingFileOrder, template: Template, to: string) => {
    if (order.continue) {
        await fsExtra.copy(template.path, to, {
            recursive: true,
        });
    }

    return order;
};

export const copyTemplate = async (template: Template, to: string, handlers: CopyTemplateHandlers) => {
    const fileExists = await fs.promises.access(to).catch(() => {
        return false;
    }) ?? true;

    if (fileExists) {
        const order = await handlers.onExistingFile();

        if (order) {
            return handleOrder(order, template, to);
        }

        return;
    }

    await fsExtra.copy(template.path, to, {
        recursive: true,
    });
};