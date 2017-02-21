import {isEmpty, trimStartEnd, getWithDefault} from './object';

const JUST_NUMBER = /^\d+$/;

//learn from vue: https://github.com/vuejs/vue/blob/1.1/src/parsers/expression.js#L28
const DOT_NOTATION_PROPERTY_EXPRESSION = /^[A-Za-z_$][\w$]*$/;
const BRACKET_NOTATION_PROPERTY_EXPRESSION = /^\['.*?'\]|\[".*?"\]|\[\d+\]$/;

const dotNotation = trimStartEnd(DOT_NOTATION_PROPERTY_EXPRESSION.source);
const bracketNotation = trimStartEnd(BRACKET_NOTATION_PROPERTY_EXPRESSION.source);

//Final expression: /^([A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])*$/;
const PATH_EXPRESSION = new RegExp('^(' + dotNotation + '|' + bracketNotation + ')(?:\\.' + dotNotation + '|' + bracketNotation + ')*$');

export function isPathValid(path) {
    return PATH_EXPRESSION.test(path);
}

export function parse(obj, path, defaultVal) {
    if (DOT_NOTATION_PROPERTY_EXPRESSION.test(path) || BRACKET_NOTATION_PROPERTY_EXPRESSION.test(path)) {
        console.log('here?', path);
        return getSimpleValue(obj, path, defaultVal);
    }

    const matchedKey = path.match(PATH_EXPRESSION)[1];

    let nextObj = getSimpleValue(obj, matchedKey);

    console.log(matchedKey, nextObj);

    if (isEmpty(nextObj)) {
        return defaultVal;
    }

    return parse(nextObj, getNextPath(path, matchedKey), defaultVal);
}


function getNextPath(path, previousMatched) {
    const rawNextPath = path.substring(previousMatched.length);
    return rawNextPath.startsWith('.') ? rawNextPath.substring(1) : rawNextPath;
}

function getSimpleValue(obj, property, defaultVal) {
    if (DOT_NOTATION_PROPERTY_EXPRESSION.test(property)) {
        return getWithDefault(obj, property, defaultVal);
    }
    const rawKey = trimStartEnd(property);
    return JUST_NUMBER.test(rawKey) ? getWithDefault(obj, +rawKey, defaultVal) : getWithDefault(obj, trimStartEnd(rawKey), defaultVal);
}
