# safe-reaper

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
![][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
![][david-url]
![][dt-url]
[![code style: prettier][prettier-image]][prettier-url]
![][license-url]

Retrieve property value by specifying an expression but without any null/undefined reference concern

## Install

### npm

```bash
npm install --save safe-reaper
```

### bower

```bash
bower install --save safe-reaper
```

## Import

### ES2015

```typescript
import { reap } from 'safe-reaper'
```

### CommonJS

```javascript
const { reap } = require('safe-reaper')
```

### script

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>DEMO</title>
  </head>
  <body>
    <script type="text/javascript" src="node_modules/safe-reaper/dist/safereaper.js"></script>
    <script type="text/javascript">
      var reap = window.reap
    </script>
  </body>
</html>
```

## Usage

```typescript
reap(null, 'user.age') // undefined
reap(null, 'user.age', 38) // 38

const obj = {
  user: {
    name: 'HanMeimei'
  }
}

reap<string>(obj, 'user.name') // Hanmeimei
reap<undefined>(obj, 'user.age') // undefined
reap<number>(obj, 'user.age', 33) // 33
reap<any>(obj, null, 33) // Error occurs
reap<string, string>(obj, 'user.name', '', val => `Hello ${val}`) // Hello HanMeimei

const users = [
  {
    name: 'LiLei'
  }
]

reap<string>(users, '[0].name') // LiLei
reap<string>(users, '[0]["name"]') // LiLei
reap<number>(users, '[0]["age"]', 99) // 99
```

### reap(source, pathExpression[, defaultValue, extraHandler])

- `source`: object you are going to use
- `pathExpression`: the path leads to the result in specifying `source`
- `defaultValue`: will be used if `source` is `null`/`undefined`, or any intermediate value evaluated in `pathExpression`
- `extraHandler`: a function will be called to evaluate the final return

### accept-expression

Dot notation - `a`, `a.b`, `a.b.c`

Bracket notation - `a['b']`, `a[0]`, `a[0].c`, `a[0]['c']`

Hybrid - `a.b[0]`, `a[0].b`

## LICENSE

[GPL v3 License](https://raw.githubusercontent.com/leftstick/safe-reaper/master/LICENSE)

[npm-url]: https://npmjs.org/package/safe-reaper
[npm-image]: https://badge.fury.io/js/safe-reaper.png
[travis-image]: https://www.travis-ci.org/leftstick/safe-reaper.svg?branch=master
[travis-url]: https://travis-ci.com/leftstick/safe-reaper
[coverage-image]: https://coveralls.io/repos/github/leftstick/safe-reaper/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/leftstick/safe-reaper
[david-url]: https://david-dm.org/leftstick/safe-reaper.png
[dt-url]: https://img.shields.io/npm/dt/safe-reaper.svg
[license-url]: https://img.shields.io/npm/l/safe-reaper.svg
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
