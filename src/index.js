import {isPathValid, parse} from './helper/path';
import {isEmpty} from './helper/object';

export function reap(obj, path, defaultVal = null) {
    if (isEmpty(obj)) {
        return defaultVal;
    }

    if (isEmpty(path)) {
        throw new Error('[path] must not be null/undefined');
    }

    if (!isPathValid(path)) {
        throw new Error('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');
    }

    return parse(obj, path, defaultVal);
}

