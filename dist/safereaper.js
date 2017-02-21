(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isEmpty;
/* unused harmony export getWithDefault */
/* harmony export (immutable) */ __webpack_exports__["b"] = trimRounded;

function isEmpty(obj) {
    return obj === null || obj === undefined;
}

function getWithDefault(obj, property, defaultVal) {
    var val = obj[property];
    return isEmpty(val) ? defaultVal : val;
}

function trimRounded(str) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return str.substring(depth, str.length - depth);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = isPathValid;
/* harmony export (immutable) */ __webpack_exports__["b"] = parse;


//learn from vue: https://github.com/vuejs/vue/blob/1.1/src/parsers/expression.js#L28
var DOT_NOTATION_PROPERTY_EXPRESSION = /^[A-Za-z_$][\w$]*$/;
var BRACKET_NOTATION_PROPERTY_EXPRESSION = /^(\['.*?'\]|\[".*?"\]|\[\d+\])$/;

var dotNotation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__object__["b" /* trimRounded */])(DOT_NOTATION_PROPERTY_EXPRESSION.source);
var bracketNotation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__object__["b" /* trimRounded */])(BRACKET_NOTATION_PROPERTY_EXPRESSION.source, 2);

//Final expression: /^([A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])*$/;
var PATH_EXPRESSION = new RegExp('^(' + dotNotation + '|' + bracketNotation + ')(?:\\.' + dotNotation + '|' + bracketNotation + ')*$');

function isPathValid(path) {
    return PATH_EXPRESSION.test(path);
}

function parse(obj, path, defaultVal) {
    try {
        var result = new Function('obj', 'return obj' + (path.startsWith('[') ? '' : '.') + path + ';')(obj);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__object__["a" /* isEmpty */])(result) ? defaultVal : result;
    } catch (error) {
        return defaultVal;
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_path__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_object__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["reap"] = reap;



function reap(obj, path) {
    var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper_object__["a" /* isEmpty */])(obj)) {
        return defaultVal;
    }

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helper_object__["a" /* isEmpty */])(path)) {
        throw new Error('[path] must not be null/undefined');
    }

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_path__["a" /* isPathValid */])(path)) {
        throw new Error('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');
    }

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__helper_path__["b" /* parse */])(obj, path, defaultVal);
}

/***/ })
/******/ ]);
});