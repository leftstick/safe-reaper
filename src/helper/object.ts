export function isEmpty(obj: any): boolean {
  return obj === null || obj === undefined
}

export function getWithDefault<T extends object>(obj: T, property: string, defaultVal: any): any {
  const val = obj[property]
  return isEmpty(val) ? defaultVal : val
}

export function trimRounded(str: string, depth: number = 1) {
  return str.substring(depth, str.length - depth)
}
