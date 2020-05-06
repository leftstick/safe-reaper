export function isEmpty(obj: any): boolean {
  return obj === null || obj === undefined
}

export function trimRounded(str: string, depth: number = 1) {
  return str.substring(depth, str.length - depth)
}
