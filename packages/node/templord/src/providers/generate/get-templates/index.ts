import { Template } from '../../../shared/find-templates.js';
import { getTemplatesFromLocal } from './get-templates-from-local';
import { getTemplatesFromRemote } from './get-templates-from-remote';

export const getTemplates = async (from?: string) => {
    let templates: Template[] = [];

    if (from) {
        templates = await getTemplatesFromRemote(from);
    } else {
        templates = await getTemplatesFromLocal();
    }

    return templates;
};