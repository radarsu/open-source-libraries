import * as parsers from './modules/parsers';
import * as utils from './utils';

import { NestKeyValuesOptions } from './utils';
import { defaults } from 'options-defaults';

interface UnifyConfiguration {
    value: any;
    parser?: NestKeyValuesOptions;
}

const unifyConfigurations = <T>(configurations: UnifyConfiguration[]) => {
    const unifiedConfigs = configurations.map((configuration) => {
        return utils.nestKeyValues(configuration.value, configuration.parser ?? parsers.underscoreParser);
    }) as [any, ...any];

    const config: T = defaults({}, ...unifiedConfigs);

    return config;
};

export type { UnifyConfiguration, NestKeyValuesOptions };
export { defaults, unifyConfigurations, utils, parsers };
