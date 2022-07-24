import { FoundTemplate } from '../../../shared/interfaces.js';
import { getTemplatesFromLocal } from './get-templates-from-local';
import { getTemplatesFromRemote } from './get-templates-from-remote';

export const getTemplates = async (from?: string) => {
    let templates: FoundTemplate[] = [];

    const templatePattern = `**/_template.ts`;

    if (from) {
        templates = await getTemplatesFromRemote(from, templatePattern);
    } else {
        templates = await getTemplatesFromLocal(templatePattern);
    }

    return templates;
};
