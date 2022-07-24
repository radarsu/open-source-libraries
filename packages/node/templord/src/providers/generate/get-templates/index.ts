import { TEMPLATE_FILE_NAME } from '../../../shared/constants';
import { Template } from '../../../shared/interfaces.js';
import { getTemplatesFromLocal } from './get-templates-from-local';
import { getTemplatesFromRemote } from './get-templates-from-remote';

export const getTemplates = async (from?: string) => {
    let templates: (Template & { path: string })[] = [];

    const templatePattern = `**/${TEMPLATE_FILE_NAME}`;

    if (from) {
        templates = await getTemplatesFromRemote(from, templatePattern);
    } else {
        templates = await getTemplatesFromLocal(templatePattern);
    }

    return templates;
};
