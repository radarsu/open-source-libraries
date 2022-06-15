import * as _ from 'lodash';
import * as commentParser from 'comment-parser';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import * as tsImport from 'ts-import';

import { concatArrays } from './utils/concat-arrays';

export interface CollectronicConfig {
    filePatterns: string[];
}

const collect = async () => {
    const configPath = path.join(process.cwd(), `.config/collectronic.ts`);
    const config: CollectronicConfig = (await tsImport.load(configPath)).default;

    const filePaths = await fastGlob(config.filePatterns);

    const findingComments = filePaths.map(async (filePath) => {
        const fileContent = await fs.promises.readFile(filePath, `utf-8`);

        const comments = commentParser.parse(fileContent);

        const jsons = comments.map((comment) => {
            const metadataTags = comment.tags.filter((tag) => {
                return tag.tag === `metadata`;
            });

            const metadataJsons = metadataTags.map((metadataTag) => {
                return JSON.parse(metadataTag.description);
            });

            return metadataJsons;
        }).flat();

        return jsons;
    });

    const foundJsonsInComments = await Promise.all(findingComments);
    const foundJsons = foundJsonsInComments.flat();

    const output = _.mergeWith({}, ...foundJsons, concatArrays);
    const jsonOutput = JSON.stringify(output, undefined, 4);
    console.log(jsonOutput);
};

void collect().catch((err) => {
    console.error(`An error occurred`, err);
});

export { collect };
