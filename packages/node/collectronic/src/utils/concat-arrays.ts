import * as _ from 'lodash';

export const concatArrays = (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }

    return;
};
