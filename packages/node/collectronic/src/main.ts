import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

import { TSDocConfiguration, TSDocParser } from '@microsoft/tsdoc';

import { TSDocConfigFile } from '@microsoft/tsdoc-config';
import { concatArrays } from './utils/concat-arrays';

const main = async () => {
    const comment = await fs.promises.readFile(`./__tests-utils__/test-file.ts`, `utf-8`);

    const tsdocConfigFile = TSDocConfigFile.loadForFolder(path.dirname(`./__tests-utils__/test-file.ts`));

    const tsdocConfiguration = new TSDocConfiguration();
    tsdocConfigFile.configureParser(tsdocConfiguration);

    const tsdocParser = new TSDocParser(tsdocConfiguration);

    // Analyze the input doc comment
    const parserContext = tsdocParser.parseString(comment);
    const allComments = parserContext.commentRange.buffer.toString();

    const comments = allComments.split(`@metadata`);
    comments.shift();

    if (comments.length === 0) {
        console.log(`No @metadata comments found in file.`);
        return;
    }

    const jsObjectRegex = /(?<json>\{(.*)\})/u;

    const jsons = comments.map((comment) => {
        const metadataCommentJsons = comment.match(jsObjectRegex);
        return JSON.parse(metadataCommentJsons?.groups?.json as string);
    });

    const merged = _.mergeWith({}, ...jsons, concatArrays);

    console.log(`merged`, merged);
};

void main().catch((err) => {
    console.error(`An error occurred`, err);
});

export { main };
