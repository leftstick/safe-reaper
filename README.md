safe-reaper
================

[![NPM version][npm-image]][npm-url]
![][travis-url]
![][david-url]
![][dt-url]
![][license-url]

Retrieve property value by specifying an expression but without any null/undefined reference concern

## Install ##

### npm ###

```bash
npm install --save safe-reaper
```

### bower ###

```bash
bower install --save safe-reaper
```

## Import ##

### ES2015 ###

```javascript
import {reap} from 'safe-reaper';
```

### CommonJS ###

```javascript
const {reap} = require('safe-reaper');
```

### script ###

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>DEMO</title>
</head>
<body>

    <script type="text/javascript" src="node_modules/safe-reaper/dist/safereaper.min.js"></script>
    <script type="text/javascript">
        var reap = window.reap;
    </script>
</body>
</html>
```

## Usage ##

```javascript
reap(null, 'user.age'); //null
reap(null, 'user.age', 38); //38


const obj = {
    user: {
        name: 'HanMeimei'
    }
};

reap(obj, 'user.name'); //Hanmeimei
reap(obj, 'user.age'); //null
reap(obj, 'user.age', 33); //33
reap(obj, null, 33); //Error occurs


const users = [{
    name: 'LiLei'
}];

reap(users, '[0].name'); //LiLei
reap(users, '[0]["name"]'); //LiLei
```

### reap(source, pathExpression[, defaultValue]) ###

- `source`: object you are going to use
- `pathExpression`: the path leads to the result in specifying `source`
- `defaultValue`: will be used if `source` is `null`/`undefined`, or any intermediate value evaluated in `pathExpression`


## LICENSE ##

[GPL v3 License](https://raw.githubusercontent.com/leftstick/safe-reaper/master/LICENSE)


[npm-url]: https://npmjs.org/package/safe-reaper
[npm-image]: https://badge.fury.io/js/safe-reaper.png
[travis-url]:https://api.travis-ci.org/leftstick/safe-reaper.svg?branch=master
[david-url]: https://david-dm.org/leftstick/safe-reaper.png
[dt-url]:https://img.shields.io/npm/dt/safe-reaper.svg
[license-url]:https://img.shields.io/npm/l/safe-reaper.svg