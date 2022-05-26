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

// TODO: move to tests
// const configurationSources = [
//     {
//         value: require(`dotenv`).config().parsed,
//     },
//     {
//         value: utils.pick(process.env, [`MODULE__VARIABLE2`, `MODULE__VARIABLE3`]),
//     },
//     {
//         value: require(`minimist`)(process.argv.slice(2)),
//         parser: parsers.dashParser,
//     },
// ];

// console.log(`configurationSources`, configurationSources);

// const unifiedConfig = unifyConfigurations(configurationSources);

// console.log(`unifiedConfig`, unifiedConfig);
