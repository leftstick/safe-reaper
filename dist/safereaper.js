(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})((typeof window !== 'undefined' ? window : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/helper/object.js
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
// CONCATENATED MODULE: ./src/helper/string.js
function startsWith(src, searchString) {
  return src.substr(0, searchString.length) === searchString;
}
// CONCATENATED MODULE: ./src/helper/path.js

 //learn from vue: https://github.com/vuejs/vue/blob/1.1/src/parsers/expression.js#L28

var DOT_NOTATION_PROPERTY_EXPRESSION = /^[A-Za-z_$][\w$]*$/;
var BRACKET_NOTATION_PROPERTY_EXPRESSION = /^(\['.*?'\]|\[".*?"\]|\[\d+\])$/;
var dotNotation = trimRounded(DOT_NOTATION_PROPERTY_EXPRESSION.source);
var bracketNotation = trimRounded(BRACKET_NOTATION_PROPERTY_EXPRESSION.source, 2); //Final expression: /^([A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\])*$/;

var PATH_EXPRESSION = new RegExp('^(' + dotNotation + '|' + bracketNotation + ')(?:\\.' + dotNotation + '|' + bracketNotation + ')*$');
function isPathValid(path) {
  return PATH_EXPRESSION.test(path);
}
function parse(obj, path, defaultVal) {
  try {
    var result = new Function('obj', "return obj".concat(startsWith(path, '[') ? '' : '.').concat(path, ";"))(obj);
    return isEmpty(result) ? defaultVal : result;
  } catch (error) {
    return defaultVal;
  }
}
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reap", function() { return reap; });


function reap(obj, path) {
  var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var extraHandler = arguments.length > 3 ? arguments[3] : undefined;

  if (isEmpty(obj)) {
    return defaultVal;
  }

  if (isEmpty(path)) {
    throw new Error('[path] must not be null/undefined');
  }

  if (!isPathValid(path)) {
    throw new Error('invalid path, check out: https://github.com/leftstick/safe-reaper/blob/master/README.md#accept-expression');
  }

  var value = parse(obj, path, defaultVal);

  if (!extraHandler || typeof extraHandler !== 'function') {
    return value;
  }

  return extraHandler(value);
}

/***/ })
/******/ ]);
});