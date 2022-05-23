import { camelCase } from '../../utils/camel-case';

export const underscoreParser = {
    nestifyPattern: `__`,
    keyTransformer: camelCase,
};
