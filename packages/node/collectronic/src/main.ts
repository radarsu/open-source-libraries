#!/usr/bin/env node

import * as _ from 'lodash';
import * as commentParser from 'comment-parser';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import * as tsImport from 'ts-import';

import { concatArrays } from './utils/concat-arrays';
import { defaults } from 'options-defaults';

interface CollectronicConfig {
    inputs: string[];
    tag?: string;
    hooks?: {
        beforePrint?: (collectedData: any) => any;
    };
}

const collect = async () => {
    const configPath = path.join(process.cwd(), `.config/collectronic.ts`);
    const localConfig = (await tsImport.load(configPath)).default;

    const config: CollectronicConfig = defaults(
        {
            tag: `metadata`,
        },
        localConfig,
    );

    const filePaths = await fastGlob(config.inputs);

    const findingComments = filePaths.map(async (filePath) => {
        const fileContent = await fs.promises.readFile(filePath, `utf-8`);

        const comments = commentParser.parse(fileContent);

        const jsons = comments
            .map((comment) => {
                const metadataTags = comment.tags.filter((tag) => {
                    return tag.tag === config.tag;
                });

                const metadataJsons = metadataTags.map((metadataTag) => {
                    return JSON.parse(metadataTag.description);
                });

                return metadataJsons;
            })
            .flat();

        return jsons;
    });

    const foundJsonsInComments = await Promise.all(findingComments);
    const foundJsons = foundJsonsInComments.flat();

    let output = _.mergeWith({}, ...foundJsons, concatArrays);
    output = config.hooks?.beforePrint?.(output);

    const collectedData = JSON.stringify(output, undefined, 4);

    console.log(collectedData);
};

void collect().catch((err) => {
    console.error(`An error occurred`, err);
});

export type { CollectronicConfig };
export { collect };
