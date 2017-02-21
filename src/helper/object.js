
export function isEmpty(obj) {
    return obj === null || obj === undefined;
}


export function getWithDefault(obj, property, defaultVal) {
    const val = obj[property];
    return isEmpty(val) ? defaultVal : val;
}

export function trimStartEnd(str) {
    return str.substring(1, str.length - 1);
}
