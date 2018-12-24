interface extraHandlerFunc {
  (value: object): object
}

interface reap {
  (
    obj: object,
    path: string,
    defaultVal: object,
    extraHandler: extraHandlerFunc
  ): object
}

export const reap: reap
