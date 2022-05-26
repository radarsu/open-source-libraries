import * as confederation from '../src/main';

import { describe, expect, test } from '@jest/globals';

describe(`Given 3 configuration sources`, () => {
    test(`It should merge all sources into unified object`, () => {
        const configurationSources = [
            {
                value: {
                    MODULE__VARIABLE1: `first-source`,
                    MODULE__VARIABLE2: `first-source`,
                    FLAT_VARIABLE: `flat-variable`,
                },
            },
            {
                value: {
                    MODULE__VARIABLE2: `second-source`,
                    MODULE__VARIABLE3: `second-source`,
                },
            },
            {
                value: {
                    'module--variable3': `third-source`,
                },
                parser: confederation.parsers.dashParser,
            },
        ];

        const unifiedConfig = confederation.unifyConfigurations(configurationSources);

        expect(unifiedConfig).toStrictEqual({
            module: {
                variable1: `first-source`,
                variable2: `second-source`,
                variable3: `third-source`,
            },
            flatVariable: `flat-variable`,
        });
    });
});
