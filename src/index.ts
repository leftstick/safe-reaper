import { isPathValid, parse } from './helper/path'
import { isEmpty } from './helper/object'

interface IExtraHandler<K, V> {
  (val: K): V
}

export function reap<K>(obj: object, path: string): K

export function reap<K>(obj: object, path: string, defaultVal: K): K

export function reap<K, V>(obj: object, path: string, defaultVal: K, extraHandler: IExtraHandler<K, V>): V

export function reap<K, V>(obj: object, path: string, defaultVal?: K, extraHandler?: IExtraHandler<K, V>): K | V {
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
