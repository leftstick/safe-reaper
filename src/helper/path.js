import {isEmpty, trimRounded} from './object';
import {startsWith} from './string';

//learn from vue: https://github.com/vuejs/vue/blob/1.1/src/parsers/expression.js#L28
const DOT_NOTATION_PROPERTY_EXPRESSION = /^[A-Za-z_$][\w$]*$/;
const BRACKET_NOTATION_PROPERTY_EXPRESSION = /^(\['.*?'\]|\[".*?"\]|\[\d+\])$/;

const dotNotation = trimRounded(DOT_NOTATION_PROPERTY_EXPRESSION.source);
const bracketNotation = trimRounded(BRACKET_NOTATION_PROPERTY_EXPRESSION.source, 2);

//Final expression: /^([A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])*$/;
const PATH_EXPRESSION = new RegExp('^(' + dotNotation + '|' + bracketNotation + ')(?:\\.' + dotNotation + '|' + bracketNotation + ')*$');

export function isPathValid(path) {
    return PATH_EXPRESSION.test(path);
}

export function parse(obj, path, defaultVal) {
    try {
        const result = new Function('obj', `return obj${startsWith(path, '[') ? '' : '.'}${path};`)(obj);
        return isEmpty(result) ? defaultVal : result;
    } catch (error) {
        return defaultVal;
    }
}
