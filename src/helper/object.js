
export function isEmpty(obj) {
    return obj === null || obj === undefined;
}


export function getWithDefault(obj, property, defaultVal) {
    const val = obj[property];
    return isEmpty(val) ? defaultVal : val;
}

export function trimRounded(str, depth = 1) {
    return str.substring(depth, str.length - depth);
}
