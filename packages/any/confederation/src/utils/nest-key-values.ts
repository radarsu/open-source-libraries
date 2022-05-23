import { camelCase } from './camel-case';
import { set } from './set';

export interface NestKeyValuesOptions {
    nestifyPattern: string;
    keyTransformer: (text: string) => string;
}

export const nestKeyValues = (
    object: Record<string, any>,
    options = {
        nestifyPattern: `__`,
        keyTransformer: camelCase,
    },
) => {
    const config: any = {};

    for (const [key, value] of Object.entries(object)) {
        if (key.includes(options.nestifyPattern)) {
            const parts = key.split(options.nestifyPattern).map(options.keyTransformer);

            set(config, parts.join(`.`), value);
        } else {
            config[options.keyTransformer(key)] = value;
        }
    }

    return config;
};
