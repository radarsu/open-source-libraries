import * as tsImport from '../src/main';

import { describe, expect, test } from '@jest/globals';

describe(`library-using`, () => {
    test(`library-using`, async () => {
        const loaded = await tsImport.load(`${__dirname}/../__tests-utils__/library-using/library-using.ts`);

        expect(loaded.result).toBeTruthy();
    }, 60000);
});
