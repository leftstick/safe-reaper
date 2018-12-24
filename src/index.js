import { isPathValid, parse } from './helper/path'
import { isEmpty } from './helper/object'

export function reap(obj, path, defaultVal = null, extraHandler) {
  if (isEmpty(obj)) {
    return defaultVal
  }

  if (isEmpty(path)) {
    throw new Error('[path] must not be null/undefined')
  }

  if (!isPathValid(path)) {
    throw new Error(
      'invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression'
    )
  }

  const value = parse(obj, path, defaultVal)

  if (!extraHandler || typeof extraHandler !== 'function') {
    return value
  }

  return extraHandler(value)
}
