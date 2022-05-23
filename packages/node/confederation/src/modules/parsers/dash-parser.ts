import { camelCase } from '../../utils/camel-case';

export const dashParser = {
    nestifyPattern: `--`,
    keyTransformer: camelCase,
};
