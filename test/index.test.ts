import { reap } from '@/src'

describe('verification', function() {
  describe('obj is empty', function() {
    it('without default value', function() {
      expect(reap(null, 'name')).toBeUndefined()
    })

    it('without default value', function() {
      expect(reap(undefined, 'name')).toBeUndefined()
    })

    it('with default value', function() {
      expect(reap(null, 'name', 'hello')).toBe('hello')
    })

    it('with default value', function() {
      expect(reap(undefined, 'name', 'world')).toBe('world')
    })

    it('with default value is undefined', function() {
      expect(reap(undefined, 'name', undefined)).toBeUndefined()
    })
  })

  describe('path is empty', function() {
    it('null', function() {
      expect(function() {
        reap({}, null, 'name')
      }).toThrow('[path] must not be null/undefined')
    })

    it('undefined', function() {
      expect(function() {
        reap({}, undefined, 'name')
      }).toThrow('[path] must not be null/undefined')
    })
  })

  describe('path is not empty, but invalid', function() {
    it('ends with .', function() {
      expect(function() {
        reap({}, '.')
      }).toThrow(
        'invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression'
      )
    })

    it('half-baked [/]', function() {
      expect(function() {
        reap({}, 'name[')
      }).toThrow(
        'invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression'
      )

      expect(function() {
        reap({}, 'name]')
      }).toThrow(
        'invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression'
      )
    })

    it('misplaced [/]', function() {
      expect(function() {
        reap({}, 'na[0]me')
      }).toThrow(
        'invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression'
      )

      expect(function() {
        reap({}, '["na"]me')
      }).toThrow(
        'invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression'
      )
    })
  })

  describe('path is not empty, and valid', function() {
    it('just dot notation property', function() {
      const obj = {
        name: 'hello'
      }

      expect(reap<string>(obj, 'name')).toBe('hello')
      expect(reap<undefined>(obj, 'age')).toBeUndefined()
    })

    it('with empty value', function() {
      interface User {
        grade: String
      }
      const obj: User = {
        grade: null
      }

      expect(reap<undefined>(obj, 'grade')).toBeNull()
      expect(reap<string>(obj, 'grade', 'A')).toBe('A')
      expect(reap<undefined>(obj, 'grade', undefined)).toBeNull()
      expect(reap<undefined>(obj, 'grade', null)).toBeNull()
      expect(reap<number>(obj, 'grade', 0)).toBe(0)
      expect(reap<boolean>(obj, 'grade', false)).toBe(false)
      expect(reap<string>(obj, 'grade', '0')).toBe('0')
    })

    it('just bracket notation property, string index', function() {
      const obj = {
        name: 'hello'
      }
      expect(reap<string>(obj, '["name"]')).toBe('hello')
      expect(reap<undefined>(obj, '["age"]')).toBeUndefined()
    })

    it('just bracket notation property, string index', function() {
      const users = [
        {
          name: 'LiLei'
        }
      ]
      expect(reap<string>(['hello', 'world'], '[1]')).toBe('world')
      expect(reap<string>(['hello', 'world'], '[2]')).toBeUndefined()
      expect(reap<string>(users, '[0].name')).toBe('LiLei')
      expect(reap<string>(users, '[0]["name"]')).toBe('LiLei')
      expect(reap<number>(users, '[0]["age"]', 99)).toBe(99)
    })

    it('dot/bracket mix', function() {
      const obj = {
        user: {
          friends: [
            {
              name: 'LiLei'
            }
          ]
        }
      }
      expect(reap<string>(obj, 'user.friends[0].name')).toBe('LiLei')
      expect(reap<string>(obj, '["user"]["friends"][0].name')).toBe('LiLei')
      expect(reap<string>(obj, '["user"]["friends"][0]["name"]')).toBe('LiLei')
      expect(reap<string>(obj, '["user"]["friends"]["0"]["name"]')).toBe('LiLei')
      expect(reap<string>(obj, '["user"]["fri" + "ends"][0]["name"]')).toBe('LiLei')
      expect(reap<string>(obj, '["user"].friends[0]["name"]')).toBe('LiLei')
      expect(reap<string>(obj, '["user"].friends[0]["age"]')).toBeUndefined()
      expect(reap<number>(obj, '["user"].friends[0]["age"]', 99)).toBe(99)
    })

    it('path not exist', function() {
      const obj = {
        name: 'hello'
      }
      expect(reap<undefined>(obj, 'user.friends[0].name')).toBeUndefined()
      expect(reap<string>(obj, 'user.friends[0].name', 'hello')).toBe('hello')
    })
  })

  describe('with extraHandler', function() {
    it('invalid extraHandler', function() {
      const obj = {
        name: 'hello'
      }

      expect(reap<string>(obj, 'name', null)).toBe('hello')
      expect(reap<number>(obj, 'age', 9)).toBe(9)
    })

    it('valid extraHandler', function() {
      const obj = {
        name: 'hello'
      }

      expect(reap<string, string>(obj, 'name', null, val => val + ' world!')).toBe('hello world!')
      expect(reap<number, string>(obj, 'age', 9, val => val + ' world!')).toBe('9 world!')
    })
  })
})
