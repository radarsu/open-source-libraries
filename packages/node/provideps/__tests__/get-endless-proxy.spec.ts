import { describe, expect, jest, test } from '@jest/globals';

import { createEndlessProxy } from '../src/public-api.js';

describe(`when instantiated endlessProxy`, () => {
    test(`is endless`, async () => {
        const endlessProxy = createEndlessProxy();

        expect(endlessProxy.test.very.long.call()).toHaveBeenCalled();
    }, 60000);
});
