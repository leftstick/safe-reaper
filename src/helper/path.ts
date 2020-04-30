import { isEmpty, trimRounded } from './object'

//learn from vue: https://github.com/vuejs/vue/blob/1.1/src/parsers/expression.js#L28
const DOT_NOTATION_PROPERTY_EXPRESSION = /^[A-Za-z_$][\w$]*$/
const BRACKET_NOTATION_PROPERTY_EXPRESSION = /^(\['.*?'\]|\[".*?"\]|\[\d+\])$/

const dotNotation = trimRounded(DOT_NOTATION_PROPERTY_EXPRESSION.source)
const bracketNotation = trimRounded(BRACKET_NOTATION_PROPERTY_EXPRESSION.source, 2)

// Final expression:
// /^([A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])*$/;
const PATH_EXPRESSION = new RegExp(
  '^(' + dotNotation + '|' + bracketNotation + ')(?:\\.' + dotNotation + '|' + bracketNotation + ')*$'
)

export function isPathValid(path: string) {
  return PATH_EXPRESSION.test(path)
}

export function parse<T extends object, K>(obj: T, path: string, defaultVal: K): K {
  try {
    // eslint-disable-next-line no-new-func
    const result = new Function('obj', `return obj${path.startsWith('[') ? '' : '.'}${path};`)(obj)
    if (!isEmpty(result)) {
      return result
    }
    return isEmpty(defaultVal) ? result : defaultVal
  } catch (error) {
    return defaultVal
  }
}
