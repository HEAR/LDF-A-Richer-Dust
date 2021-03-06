/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var ctx = __webpack_require__(18);
var hide = __webpack_require__(7);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(28)('wks');
var uid = __webpack_require__(17);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(19);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(42);
var toPrimitive = __webpack_require__(30);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(23);
var defined = __webpack_require__(22);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(9);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(17)('meta');
var isObject = __webpack_require__(2);
var has = __webpack_require__(6);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(9)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(22);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(40);
var enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(41);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(6);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(28)('keys');
var uid = __webpack_require__(17);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(34);
var wksExt = __webpack_require__(32);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(46);
var enumBugKeys = __webpack_require__(29);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(43)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(75).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(18);
var IObject = __webpack_require__(23);
var toObject = __webpack_require__(14);
var toLength = __webpack_require__(25);
var asc = __webpack_require__(125);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(128);
var isArrayIter = __webpack_require__(129);
var anObject = __webpack_require__(11);
var toLength = __webpack_require__(25);
var getIterFn = __webpack_require__(130);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(63)(false);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(9)(function () {
  return Object.defineProperty(__webpack_require__(43)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(5);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(31);
var META = __webpack_require__(13).KEY;
var $fails = __webpack_require__(9);
var shared = __webpack_require__(28);
var setToStringTag = __webpack_require__(20);
var uid = __webpack_require__(17);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(32);
var wksDefine = __webpack_require__(33);
var enumKeys = __webpack_require__(74);
var isArray = __webpack_require__(45);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(2);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(30);
var createDesc = __webpack_require__(19);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(47);
var $GOPD = __webpack_require__(49);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(15);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(48).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(21).f = $propertyIsEnumerable;
  __webpack_require__(35).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(34)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(15);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10);
var gOPN = __webpack_require__(48).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(40);
var hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(21);
var createDesc = __webpack_require__(19);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(30);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(42);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(14);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(34);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(31);
var hide = __webpack_require__(7);
var has = __webpack_require__(6);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(82);
var setToStringTag = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(50);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
var global = __webpack_require__(4);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports) {



/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(21);
var toObject = __webpack_require__(14);
var IObject = __webpack_require__(23);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(9)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(39);

var _keys2 = _interopRequireDefault(_keys);

var _prototypo = __webpack_require__(65);

var _prototypo2 = _interopRequireDefault(_prototypo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ports = [];
var exportPorts = [];
var font = void 0;
var originSubset = {};
var currValues = void 0;
var currName = void 0;
var currSubset = [];
var arrayBufferMap = {};
var worker = self;
var fontsMap = {};

function translateSubset() {
	if (!currSubset.length) {
		return;
	}

	font.subset = currSubset.map(function (glyph) {
		return font.charMap[glyph.ot.unicode];
	}).filter(Boolean);

	currSubset = font.subset;
};

function subset(eData) {
	var set = eData.data,
	    add = eData.add,
	    origin = eData.origin || 'native';

	var prevGlyphs = currSubset.map(function (glyph) {
		return glyph.name;
	});

	if (add) {
		originSubset[origin] = set + originSubset[origin];
	} else {
		originSubset[origin] = set;
	}

	if (origin) {
		var currentStringSubset = (0, _keys2.default)(originSubset).map(function (key) {
			return originSubset[key];
		}).join('');

		font.subset = currentStringSubset + set;
	} else {
		font.subset = set;
	}
	currSubset = font.subset;

	if (!currValues) {
		return true;
	}

	// search for glyphs *added* to the subset
	currSubset.filter(function (glyph) {
		return prevGlyphs.indexOf(glyph.name) === -1;
	}

	// update those glyphs
	).forEach(function (glyph) {
		glyph.update(currValues);
		glyph.updateOTCommands();
	});

	// Recreate the correct font.ot.glyphs.glyphs object, without
	// touching the ot commands
	font.updateOT({ set: undefined });
	return font.toArrayBuffer();
}

var handlers = {};

_prototypo2.default.paper.setup({
	width: 1024,
	height: 1024
});

// mini router
self.addEventListener('message', function (e) {
	var result = void 0;

	if (e.data.type && e.data.type in handlers) {
		result = handlers[e.data.type](e.data);

		if (result === null) {
			return;
		}

		arrayBufferMap[currName] = result;

		self.postMessage(result);
	}
});

handlers.font = function (eData) {
	var fontSource = eData.data,
	    templateName = eData.name,
	    name = eData.db;

	// reset currValues to avoid using old values stored in the shared worker
	currValues = undefined;

	// TODO: this should be done using a memoizing table of limited size
	currName = name;
	/* if ( templateName in fontsMap ) {
 font = fontsMap[templateName];
 font.resetComponents();
 translateSubset();
 	return {
 	solvingOrders: null,
 	handler: 'font',
 };
 }*/

	var fontObj = JSON.parse(fontSource);

	font = _prototypo2.default.parametricFont(fontObj);
	fontsMap[templateName] = font;

	translateSubset();

	var solvingOrders = {};

	(0, _keys2.default)(font.glyphMap).forEach(function (key) {
		solvingOrders[key] = font.glyphMap[key].solvingOrder;
	});

	return {
		solvingOrders: solvingOrders,
		handler: 'font'
	};
};

handlers.update = function (eData) {
	var params = eData.data;

	currValues = params;
	font.update(currValues);
	font.updateOTCommands();
	var result = font.toArrayBuffer();

	return result;
};

handlers.getGlyphsProperties = function (eData) {
	var result = null;

	if (eData.data) {
		var names = font.subset.map(function (glyph) {
			return glyph.name;
		});
		var properties = eData.data.properties;

		result = {};

		font.glyphs.forEach(function (glyph) {
			if (names.indexOf(glyph.name) !== -1) {
				if (!result[glyph.unicode]) {
					result[glyph.unicode] = {};
				}

				if (typeof properties === 'string') {
					result[glyph.unicode][properties] = glyph[properties];
				} else if (Array.isArray(properties)) {
					properties.forEach(function (property) {
						result[glyph.unicode][property] = glyph[property];
					});
				}
			}
		});
	}

	return {
		type: 'props',
		result: result
	};
};

handlers.soloAlternate = function (params) {
	font.setAlternatesFor(params.unicode, params.glyphName);

	if (!currValues) {
		return true;
	}

	font.subset = font.subset.map(function (glyph) {
		return String.fromCharCode(glyph.unicode);
	}).join('');

	var altGlyph = font.glyphMap[params.glyphName];

	font.subset.forEach(function (glyph) {
		if (altGlyph.src.relatedGlyphs && altGlyph.src.relatedGlyphs.indexOf(glyph.name) !== -1 || glyph.name === altGlyph.name) {
			glyph.update(currValues);
		}
	});
	altGlyph.updateOTCommands();

	// Recreate the correct font.ot.glyphs.glyphs object, without
	// touching the ot commands
	font.updateOT({ set: undefined });
	return font.toArrayBuffer();
};

handlers.alternate = function (eData) {
	var params = eData.data;

	if (params.altList) {
		(0, _keys2.default)(params.altList).forEach(function (unicode) {
			handlers.soloAlternate({
				unicode: unicode,
				glyphName: params.altList[unicode]
			});
		});
	} else {
		handlers.soloAlternate(params);
	}
};

handlers.subset = subset;

function fillOs2Values(fontOt, values) {
	var weightChooser = [{ test: 20, value: 'THIN' }, { test: 40, value: 'EXTRA_LIGHT' }, { test: 60, value: 'LIGHT' }, { test: 90, value: 'NORMAL' }, { test: 110, value: 'MEDIUM' }, { test: 130, value: 'SEMI_BOLD' }, { test: 150, value: 'BOLD' }, { test: 170, value: 'EXTRA_BOLD' }, { test: 190, value: 'BLACK' }];

	var widthChooser = [{ test: 0.5, value: 'ULTRA_CONDENSED' }, { test: 0.625, value: 'EXTRA_CONDENSED' }, { test: 0.75, value: 'CONDENSED' }, { test: 0.875, value: 'SEMI_CONDENSED' }, { test: 1, value: 'MEDIUM' }, { test: 1.125, value: 'SEMI_EXPANDED' }, { test: 1.25, value: 'EXPANDED' }, { test: 1.50, value: 'EXTRA_EXPANDED' }, { test: 2, value: 'ULTRA_CONDENSED' }];

	weightChooser.forEach(function (weightObj) {
		if (values.thickness > weightObj.test) {
			fontOt.tables.os2.weightClass = fontOt.usWeightClasses[weightObj.value];
		}
	});

	widthChooser.forEach(function (widthObj) {
		if (values.width > widthObj.test) {
			fontOt.tables.os2.widthClass = fontOt.usWidthClasses[widthObj.value];
		}
	});

	var fsSel = 0;

	if (values.slant > 0) {
		fsSel |= fontOt.fsSelectionValues.ITALIC;
	}

	if (fontOt.tables.os2.weightClass > fontOt.usWeightClasses.NORMAL) {
		fsSel |= fontOt.fsSelectionValues.BOLD;
	}

	if (fsSel === 0) {
		fsSel = fontOt.fsSelectionValues.REGULAR;
	}

	fontOt.tables.os2.fsSelection = fsSel;
}

handlers.otfFont = function (eData) {
	var data = eData.data;
	// force-update of the whole font, ignoring the current subset
	var allChars = font.getGlyphSubset(false);
	var fontValues = data && data.values || currValues;

	font.update(fontValues, allChars);

	font.updateOTCommands(allChars, data && data.merged || false);

	var family = font.ot.names.fontFamily.en;
	var style = font.ot.names.fontSubfamily.en;
	var fullName = font.ot.names.fullName.en;
	var names = font.ot.names;

	// TODO: understand why we need to save the familyName and
	// and set them back into the font.ot for it to be able to
	// export multiple font
	var variantName = (data && data.style ? data.style.toLowerCase() : 'regular').replace(/^./, function (a) {
		return a.toUpperCase();
	});

	names.fontFamily.en = data && data.family || 'Prototypo';
	names.fontSubfamily.en = variantName;
	names.preferredFamily = names.fontFamily;
	names.preferredSubfamily = names.fontSubFamily;
	names.postScriptName.en = names.fontFamily.en + '-' + names.fontSubfamily.en;
	names.uniqueID = { en: 'Prototypo: ' + names.fontFamily.en + ' ' + names.fontSubfamily.en + ':2016' };
	names.fullName.en = names.fontFamily.en + ' ' + names.fontSubfamily.en;
	names.version.en = 'Version 1.0';
	fillOs2Values(font.ot, fontValues);

	var result = font.toArrayBuffer();

	names.fontFamily.en = family;
	names.fontSubfamily.en = style;
	names.fullName.en = fullName;

	return result;
};

handlers.changeCursorsToManual = function (eData) {
	var cursors = eData.cursors;
	var glyphUnicode = eData.glyphUnicode;

	font.changeCursorsToManual(glyphUnicode, cursors);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14);
var $keys = __webpack_require__(15);

__webpack_require__(12)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(25);
var toAbsoluteIndex = __webpack_require__(64);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _getOwnPropertySymbols=__webpack_require__(72);var _getOwnPropertySymbols2=_interopRequireDefault(_getOwnPropertySymbols);var _getPrototypeOf=__webpack_require__(76);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _iterator=__webpack_require__(51);var _iterator2=_interopRequireDefault(_iterator);var _symbol=__webpack_require__(54);var _symbol2=_interopRequireDefault(_symbol);var _defineProperties=__webpack_require__(89);var _defineProperties2=_interopRequireDefault(_defineProperties);var _getOwnPropertyNames=__webpack_require__(92);var _getOwnPropertyNames2=_interopRequireDefault(_getOwnPropertyNames);var _log=__webpack_require__(95);var _log2=_interopRequireDefault(_log);var _assign=__webpack_require__(98);var _assign2=_interopRequireDefault(_assign);var _getOwnPropertyDescriptor=__webpack_require__(101);var _getOwnPropertyDescriptor2=_interopRequireDefault(_getOwnPropertyDescriptor);var _stringify=__webpack_require__(104);var _stringify2=_interopRequireDefault(_stringify);var _preventExtensions=__webpack_require__(106);var _preventExtensions2=_interopRequireDefault(_preventExtensions);var _freeze=__webpack_require__(109);var _freeze2=_interopRequireDefault(_freeze);var _trunc=__webpack_require__(112);var _trunc2=_interopRequireDefault(_trunc);var _sign=__webpack_require__(115);var _sign2=_interopRequireDefault(_sign);var _create=__webpack_require__(119);var _create2=_interopRequireDefault(_create);var _keys=__webpack_require__(39);var _keys2=_interopRequireDefault(_keys);var _weakMap=__webpack_require__(122);var _weakMap2=_interopRequireDefault(_weakMap);var _defineProperty=__webpack_require__(137);var _defineProperty2=_interopRequireDefault(_defineProperty);var _typeof3=__webpack_require__(140);var _typeof4=_interopRequireDefault(_typeof3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':(0,_typeof4.default)(exports))==='object'&&( false?'undefined':(0,_typeof4.default)(module))==='object')module.exports=factory();else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if((typeof exports==='undefined'?'undefined':(0,_typeof4.default)(exports))==='object')exports["prototypo"]=factory();else root["prototypo"]=factory();})(undefined,function(){return(/******/function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******//******/// The require function
/******/function __webpack_require__(moduleId){/******//******/// Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/i:moduleId,/******/l:false,/******/exports:{}/******/};/******//******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Flag the module as loaded
/******/module.l=true;/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******//******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******//******/// identity function for calling harmony imports with the correct context
/******/__webpack_require__.i=function(value){return value;};/******//******/// define getter function for harmony exports
/******/__webpack_require__.d=function(exports,name,getter){/******/if(!__webpack_require__.o(exports,name)){/******/(0,_defineProperty2.default)(exports,name,{/******/configurable:false,/******/enumerable:true,/******/get:getter/******/});/******/}/******/};/******//******/// getDefaultExport function for compatibility with non-harmony modules
/******/__webpack_require__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__webpack_require__.d(getter,'a',getter);/******/return getter;/******/};/******//******/// Object.prototype.hasOwnProperty.call
/******/__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******//******/// __webpack_public_path__
/******/__webpack_require__.p="";/******//******/// Load entry module and return exports
/******/return __webpack_require__(__webpack_require__.s=131);/******/}(/************************************************************************//******/[/* 0 *//***/function(module,exports,__webpack_require__){var freeGlobal=__webpack_require__(29);/** Detect free variable `self`. */var freeSelf=(typeof self==='undefined'?'undefined':(0,_typeof4.default)(self))=='object'&&self&&self.Object===Object&&self;/** Used as a reference to the global object. */var root=freeGlobal||freeSelf||Function('return this')();module.exports=root;/***/},/* 1 *//***/function(module,exports){/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */var isArray=Array.isArray;module.exports=isArray;/***/},/* 2 *//***/function(module,exports,__webpack_require__){var baseIsNative=__webpack_require__(63),getValue=__webpack_require__(83);/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */function getNative(object,key){var value=getValue(object,key);return baseIsNative(value)?value:undefined;}module.exports=getNative;/***/},/* 3 *//***/function(module,exports,__webpack_require__){var _Symbol=__webpack_require__(7),getRawTag=__webpack_require__(80),objectToString=__webpack_require__(107);/** `Object#toString` result references. */var nullTag='[object Null]',undefinedTag='[object Undefined]';/** Built-in value references. */var symToStringTag=_Symbol?_Symbol.toStringTag:undefined;/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */function baseGetTag(value){if(value==null){return value===undefined?undefinedTag:nullTag;}return symToStringTag&&symToStringTag in Object(value)?getRawTag(value):objectToString(value);}module.exports=baseGetTag;/***/},/* 4 *//***/function(module,exports){/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */function isObjectLike(value){return value!=null&&(typeof value==='undefined'?'undefined':(0,_typeof4.default)(value))=='object';}module.exports=isObjectLike;/***/},/* 5 *//***/function(module,exports,__webpack_require__){(function webpackUniversalModuleDefinition(root,factory){if(true)module.exports=factory();else if(typeof define==='function'&&define.amd)define([],factory);else if((typeof exports==='undefined'?'undefined':(0,_typeof4.default)(exports))==='object')exports["plumin"]=factory();else root["plumin"]=factory();})(this,function(){return(/******/function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******//******/// The require function
/******/function __webpack_require__(moduleId){/******//******/// Check if module is in cache
/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******//******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******//******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******//******/// Flag the module as loaded
/******/module.loaded=true;/******//******/// Return the exports of the module
/******/return module.exports;/******/}/******//******//******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******//******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******//******/// __webpack_public_path__
/******/__webpack_require__.p="";/******//******/// Load entry module and return exports
/******/return __webpack_require__(0);/******/}(/************************************************************************//******/[/* 0 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(1);/***/},/* 1 *//***/function(module,exports,__webpack_require__){var opentype=__webpack_require__(2);var paper=__webpack_require__(4);var Font=__webpack_require__(7);var Glyph=__webpack_require__(8);var Outline=__webpack_require__(9);var Path=__webpack_require__(11);var Node=__webpack_require__(12);paper.PaperScope.prototype.Font=Font;paper.PaperScope.prototype.Glyph=Glyph;paper.PaperScope.prototype.Outline=Outline;paper.PaperScope.prototype.Path=Path;paper.PaperScope.prototype.Node=Node;paper.opentype=opentype;module.exports=paper;/***/},/* 2 *//***/function(module,exports,__webpack_require__){/**
	 * https://opentype.js.org v0.7.3 | (c) Frederik De Bleser and other contributors | MIT License | Uses tiny-inflate by Devon Govett
	 */(function(global,factory){true?factory(exports):typeof define==='function'&&define.amd?define(['exports'],factory):factory(global.opentype=global.opentype||{});})(this,function(exports){'use strict';var TINF_OK=0;var TINF_DATA_ERROR=-3;function Tree(){this.table=new Uint16Array(16);/* table of code length counts */this.trans=new Uint16Array(288);/* code -> symbol translation table */}function Data(source,dest){this.source=source;this.sourceIndex=0;this.tag=0;this.bitcount=0;this.dest=dest;this.destLen=0;this.ltree=new Tree();/* dynamic length/symbol tree */this.dtree=new Tree();/* dynamic distance tree */}/* --------------------------------------------------- *
	 * -- uninitialized global data (static structures) -- *
	 * --------------------------------------------------- */var sltree=new Tree();var sdtree=new Tree();/* extra bits and base tables for length codes */var length_bits=new Uint8Array(30);var length_base=new Uint16Array(30);/* extra bits and base tables for distance codes */var dist_bits=new Uint8Array(30);var dist_base=new Uint16Array(30);/* special ordering of code length codes */var clcidx=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);/* used by tinf_decode_trees, avoids allocations every call */var code_tree=new Tree();var lengths=new Uint8Array(288+32);/* ----------------------- *
	 * -- utility functions -- *
	 * ----------------------- *//* build extra bits and base tables */function tinf_build_bits_base(bits,base,delta,first){var i,sum;/* build bits table */for(i=0;i<delta;++i){bits[i]=0;}for(i=0;i<30-delta;++i){bits[i+delta]=i/delta|0;}/* build base table */for(sum=first,i=0;i<30;++i){base[i]=sum;sum+=1<<bits[i];}}/* build the fixed huffman trees */function tinf_build_fixed_trees(lt,dt){var i;/* build fixed length tree */for(i=0;i<7;++i){lt.table[i]=0;}lt.table[7]=24;lt.table[8]=152;lt.table[9]=112;for(i=0;i<24;++i){lt.trans[i]=256+i;}for(i=0;i<144;++i){lt.trans[24+i]=i;}for(i=0;i<8;++i){lt.trans[24+144+i]=280+i;}for(i=0;i<112;++i){lt.trans[24+144+8+i]=144+i;}/* build fixed distance tree */for(i=0;i<5;++i){dt.table[i]=0;}dt.table[5]=32;for(i=0;i<32;++i){dt.trans[i]=i;}}/* given an array of code lengths, build a tree */var offs=new Uint16Array(16);function tinf_build_tree(t,lengths,off,num){var i,sum;/* clear code length count table */for(i=0;i<16;++i){t.table[i]=0;}/* scan symbol lengths, and sum code length counts */for(i=0;i<num;++i){t.table[lengths[off+i]]++;}t.table[0]=0;/* compute offset table for distribution sort */for(sum=0,i=0;i<16;++i){offs[i]=sum;sum+=t.table[i];}/* create code->symbol translation table (symbols sorted by code) */for(i=0;i<num;++i){if(lengths[off+i]){t.trans[offs[lengths[off+i]]++]=i;}}}/* ---------------------- *
	 * -- decode functions -- *
	 * ---------------------- *//* get one bit from source stream */function tinf_getbit(d){/* check if tag is empty */if(!d.bitcount--){/* load next tag */d.tag=d.source[d.sourceIndex++];d.bitcount=7;}/* shift bit out of tag */var bit=d.tag&1;d.tag>>>=1;return bit;}/* read a num bit value from a stream and add base */function tinf_read_bits(d,num,base){if(!num){return base;}while(d.bitcount<24){d.tag|=d.source[d.sourceIndex++]<<d.bitcount;d.bitcount+=8;}var val=d.tag&0xffff>>>16-num;d.tag>>>=num;d.bitcount-=num;return val+base;}/* given a data stream and a tree, decode a symbol */function tinf_decode_symbol(d,t){while(d.bitcount<24){d.tag|=d.source[d.sourceIndex++]<<d.bitcount;d.bitcount+=8;}var sum=0,cur=0,len=0;var tag=d.tag;/* get more bits while code value is above sum */do{cur=2*cur+(tag&1);tag>>>=1;++len;sum+=t.table[len];cur-=t.table[len];}while(cur>=0);d.tag=tag;d.bitcount-=len;return t.trans[sum+cur];}/* given a data stream, decode dynamic trees from it */function tinf_decode_trees(d,lt,dt){var hlit,hdist,hclen;var i,num,length;/* get 5 bits HLIT (257-286) */hlit=tinf_read_bits(d,5,257);/* get 5 bits HDIST (1-32) */hdist=tinf_read_bits(d,5,1);/* get 4 bits HCLEN (4-19) */hclen=tinf_read_bits(d,4,4);for(i=0;i<19;++i){lengths[i]=0;}/* read code lengths for code length alphabet */for(i=0;i<hclen;++i){/* get 3 bits code length (0-7) */var clen=tinf_read_bits(d,3,0);lengths[clcidx[i]]=clen;}/* build code length tree */tinf_build_tree(code_tree,lengths,0,19);/* decode code lengths for the dynamic trees */for(num=0;num<hlit+hdist;){var sym=tinf_decode_symbol(d,code_tree);switch(sym){case 16:/* copy previous code length 3-6 times (read 2 bits) */var prev=lengths[num-1];for(length=tinf_read_bits(d,2,3);length;--length){lengths[num++]=prev;}break;case 17:/* repeat code length 0 for 3-10 times (read 3 bits) */for(length=tinf_read_bits(d,3,3);length;--length){lengths[num++]=0;}break;case 18:/* repeat code length 0 for 11-138 times (read 7 bits) */for(length=tinf_read_bits(d,7,11);length;--length){lengths[num++]=0;}break;default:/* values 0-15 represent the actual code lengths */lengths[num++]=sym;break;}}/* build dynamic trees */tinf_build_tree(lt,lengths,0,hlit);tinf_build_tree(dt,lengths,hlit,hdist);}/* ----------------------------- *
	 * -- block inflate functions -- *
	 * ----------------------------- *//* given a stream and two trees, inflate a block of data */function tinf_inflate_block_data(d,lt,dt){while(1){var sym=tinf_decode_symbol(d,lt);/* check for end of block */if(sym===256){return TINF_OK;}if(sym<256){d.dest[d.destLen++]=sym;}else{var length,dist,offs;var i;sym-=257;/* possibly get more bits from length code */length=tinf_read_bits(d,length_bits[sym],length_base[sym]);dist=tinf_decode_symbol(d,dt);/* possibly get more bits from distance code */offs=d.destLen-tinf_read_bits(d,dist_bits[dist],dist_base[dist]);/* copy match */for(i=offs;i<offs+length;++i){d.dest[d.destLen++]=d.dest[i];}}}}/* inflate an uncompressed block of data */function tinf_inflate_uncompressed_block(d){var length,invlength;var i;/* unread from bitbuffer */while(d.bitcount>8){d.sourceIndex--;d.bitcount-=8;}/* get length */length=d.source[d.sourceIndex+1];length=256*length+d.source[d.sourceIndex];/* get one's complement of length */invlength=d.source[d.sourceIndex+3];invlength=256*invlength+d.source[d.sourceIndex+2];/* check length */if(length!==(~invlength&0x0000ffff)){return TINF_DATA_ERROR;}d.sourceIndex+=4;/* copy block */for(i=length;i;--i){d.dest[d.destLen++]=d.source[d.sourceIndex++];}/* make sure we start next block on a byte boundary */d.bitcount=0;return TINF_OK;}/* inflate stream from source to dest */function tinf_uncompress(source,dest){var d=new Data(source,dest);var bfinal,btype,res;do{/* read final block flag */bfinal=tinf_getbit(d);/* read block type (2 bits) */btype=tinf_read_bits(d,2,0);/* decompress block */switch(btype){case 0:/* decompress uncompressed block */res=tinf_inflate_uncompressed_block(d);break;case 1:/* decompress block with fixed huffman trees */res=tinf_inflate_block_data(d,sltree,sdtree);break;case 2:/* decompress block with dynamic huffman trees */tinf_decode_trees(d,d.ltree,d.dtree);res=tinf_inflate_block_data(d,d.ltree,d.dtree);break;default:res=TINF_DATA_ERROR;}if(res!==TINF_OK){throw new Error('Data error');}}while(!bfinal);if(d.destLen<d.dest.length){if(typeof d.dest.slice==='function'){return d.dest.slice(0,d.destLen);}else{return d.dest.subarray(0,d.destLen);}}return d.dest;}/* -------------------- *
	 * -- initialization -- *
	 * -------------------- *//* build fixed huffman trees */tinf_build_fixed_trees(sltree,sdtree);/* build extra bits and base tables */tinf_build_bits_base(length_bits,length_base,4,3);tinf_build_bits_base(dist_bits,dist_base,2,1);/* fix a special case */length_bits[28]=0;length_base[28]=258;var index=tinf_uncompress;// The Bounding Box object
function derive(v0,v1,v2,v3,t){return Math.pow(1-t,3)*v0+3*Math.pow(1-t,2)*t*v1+3*(1-t)*Math.pow(t,2)*v2+Math.pow(t,3)*v3;}/**
	 * A bounding box is an enclosing box that describes the smallest measure within which all the points lie.
	 * It is used to calculate the bounding box of a glyph or text path.
	 *
	 * On initialization, x1/y1/x2/y2 will be NaN. Check if the bounding box is empty using `isEmpty()`.
	 *
	 * @exports opentype.BoundingBox
	 * @class
	 * @constructor
	 */function BoundingBox(){this.x1=Number.NaN;this.y1=Number.NaN;this.x2=Number.NaN;this.y2=Number.NaN;}/**
	 * Returns true if the bounding box is empty, that is, no points have been added to the box yet.
	 */BoundingBox.prototype.isEmpty=function(){return isNaN(this.x1)||isNaN(this.y1)||isNaN(this.x2)||isNaN(this.y2);};/**
	 * Add the point to the bounding box.
	 * The x1/y1/x2/y2 coordinates of the bounding box will now encompass the given point.
	 * @param {number} x - The X coordinate of the point.
	 * @param {number} y - The Y coordinate of the point.
	 */BoundingBox.prototype.addPoint=function(x,y){if(typeof x==='number'){if(isNaN(this.x1)||isNaN(this.x2)){this.x1=x;this.x2=x;}if(x<this.x1){this.x1=x;}if(x>this.x2){this.x2=x;}}if(typeof y==='number'){if(isNaN(this.y1)||isNaN(this.y2)){this.y1=y;this.y2=y;}if(y<this.y1){this.y1=y;}if(y>this.y2){this.y2=y;}}};/**
	 * Add a X coordinate to the bounding box.
	 * This extends the bounding box to include the X coordinate.
	 * This function is used internally inside of addBezier.
	 * @param {number} x - The X coordinate of the point.
	 */BoundingBox.prototype.addX=function(x){this.addPoint(x,null);};/**
	 * Add a Y coordinate to the bounding box.
	 * This extends the bounding box to include the Y coordinate.
	 * This function is used internally inside of addBezier.
	 * @param {number} y - The Y coordinate of the point.
	 */BoundingBox.prototype.addY=function(y){this.addPoint(null,y);};/**
	 * Add a Bézier curve to the bounding box.
	 * This extends the bounding box to include the entire Bézier.
	 * @param {number} x0 - The starting X coordinate.
	 * @param {number} y0 - The starting Y coordinate.
	 * @param {number} x1 - The X coordinate of the first control point.
	 * @param {number} y1 - The Y coordinate of the first control point.
	 * @param {number} x2 - The X coordinate of the second control point.
	 * @param {number} y2 - The Y coordinate of the second control point.
	 * @param {number} x - The ending X coordinate.
	 * @param {number} y - The ending Y coordinate.
	 */BoundingBox.prototype.addBezier=function(x0,y0,x1,y1,x2,y2,x,y){var this$1=this;// This code is based on http://nishiohirokazu.blogspot.com/2009/06/how-to-calculate-bezier-curves-bounding.html
// and https://github.com/icons8/svg-path-bounding-box
var p0=[x0,y0];var p1=[x1,y1];var p2=[x2,y2];var p3=[x,y];this.addPoint(x0,y0);this.addPoint(x,y);for(var i=0;i<=1;i++){var b=6*p0[i]-12*p1[i]+6*p2[i];var a=-3*p0[i]+9*p1[i]-9*p2[i]+3*p3[i];var c=3*p1[i]-3*p0[i];if(a===0){if(b===0){continue;}var t=-c/b;if(0<t&&t<1){if(i===0){this$1.addX(derive(p0[i],p1[i],p2[i],p3[i],t));}if(i===1){this$1.addY(derive(p0[i],p1[i],p2[i],p3[i],t));}}continue;}var b2ac=Math.pow(b,2)-4*c*a;if(b2ac<0){continue;}var t1=(-b+Math.sqrt(b2ac))/(2*a);if(0<t1&&t1<1){if(i===0){this$1.addX(derive(p0[i],p1[i],p2[i],p3[i],t1));}if(i===1){this$1.addY(derive(p0[i],p1[i],p2[i],p3[i],t1));}}var t2=(-b-Math.sqrt(b2ac))/(2*a);if(0<t2&&t2<1){if(i===0){this$1.addX(derive(p0[i],p1[i],p2[i],p3[i],t2));}if(i===1){this$1.addY(derive(p0[i],p1[i],p2[i],p3[i],t2));}}}};/**
	 * Add a quadratic curve to the bounding box.
	 * This extends the bounding box to include the entire quadratic curve.
	 * @param {number} x0 - The starting X coordinate.
	 * @param {number} y0 - The starting Y coordinate.
	 * @param {number} x1 - The X coordinate of the control point.
	 * @param {number} y1 - The Y coordinate of the control point.
	 * @param {number} x - The ending X coordinate.
	 * @param {number} y - The ending Y coordinate.
	 */BoundingBox.prototype.addQuad=function(x0,y0,x1,y1,x,y){var cp1x=x0+2/3*(x1-x0);var cp1y=y0+2/3*(y1-y0);var cp2x=cp1x+1/3*(x-x0);var cp2y=cp1y+1/3*(y-y0);this.addBezier(x0,y0,cp1x,cp1y,cp2x,cp2y,x,y);};// Geometric objects
/**
	 * A bézier path containing a set of path commands similar to a SVG path.
	 * Paths can be drawn on a context using `draw`.
	 * @exports opentype.Path
	 * @class
	 * @constructor
	 */function Path(){this.commands=[];this.fill='black';this.stroke=null;this.strokeWidth=1;}/**
	 * @param  {number} x
	 * @param  {number} y
	 */Path.prototype.moveTo=function(x,y){this.commands.push({type:'M',x:x,y:y});};/**
	 * @param  {number} x
	 * @param  {number} y
	 */Path.prototype.lineTo=function(x,y){this.commands.push({type:'L',x:x,y:y});};/**
	 * Draws cubic curve
	 * @function
	 * curveTo
	 * @memberof opentype.Path.prototype
	 * @param  {number} x1 - x of control 1
	 * @param  {number} y1 - y of control 1
	 * @param  {number} x2 - x of control 2
	 * @param  {number} y2 - y of control 2
	 * @param  {number} x - x of path point
	 * @param  {number} y - y of path point
	 *//**
	 * Draws cubic curve
	 * @function
	 * bezierCurveTo
	 * @memberof opentype.Path.prototype
	 * @param  {number} x1 - x of control 1
	 * @param  {number} y1 - y of control 1
	 * @param  {number} x2 - x of control 2
	 * @param  {number} y2 - y of control 2
	 * @param  {number} x - x of path point
	 * @param  {number} y - y of path point
	 * @see curveTo
	 */Path.prototype.curveTo=Path.prototype.bezierCurveTo=function(x1,y1,x2,y2,x,y){this.commands.push({type:'C',x1:x1,y1:y1,x2:x2,y2:y2,x:x,y:y});};/**
	 * Draws quadratic curve
	 * @function
	 * quadraticCurveTo
	 * @memberof opentype.Path.prototype
	 * @param  {number} x1 - x of control
	 * @param  {number} y1 - y of control
	 * @param  {number} x - x of path point
	 * @param  {number} y - y of path point
	 *//**
	 * Draws quadratic curve
	 * @function
	 * quadTo
	 * @memberof opentype.Path.prototype
	 * @param  {number} x1 - x of control
	 * @param  {number} y1 - y of control
	 * @param  {number} x - x of path point
	 * @param  {number} y - y of path point
	 */Path.prototype.quadTo=Path.prototype.quadraticCurveTo=function(x1,y1,x,y){this.commands.push({type:'Q',x1:x1,y1:y1,x:x,y:y});};/**
	 * Closes the path
	 * @function closePath
	 * @memberof opentype.Path.prototype
	 *//**
	 * Close the path
	 * @function close
	 * @memberof opentype.Path.prototype
	 */Path.prototype.close=Path.prototype.closePath=function(){this.commands.push({type:'Z'});};/**
	 * Add the given path or list of commands to the commands of this path.
	 * @param  {Array} pathOrCommands - another opentype.Path, an opentype.BoundingBox, or an array of commands.
	 */Path.prototype.extend=function(pathOrCommands){if(pathOrCommands.commands){pathOrCommands=pathOrCommands.commands;}else if(pathOrCommands instanceof BoundingBox){var box=pathOrCommands;this.moveTo(box.x1,box.y1);this.lineTo(box.x2,box.y1);this.lineTo(box.x2,box.y2);this.lineTo(box.x1,box.y2);this.close();return;}Array.prototype.push.apply(this.commands,pathOrCommands);};/**
	 * Calculate the bounding box of the path.
	 * @returns {opentype.BoundingBox}
	 */Path.prototype.getBoundingBox=function(){var this$1=this;var box=new BoundingBox();var startX=0;var startY=0;var prevX=0;var prevY=0;for(var i=0;i<this.commands.length;i++){var cmd=this$1.commands[i];switch(cmd.type){case'M':box.addPoint(cmd.x,cmd.y);startX=prevX=cmd.x;startY=prevY=cmd.y;break;case'L':box.addPoint(cmd.x,cmd.y);prevX=cmd.x;prevY=cmd.y;break;case'Q':box.addQuad(prevX,prevY,cmd.x1,cmd.y1,cmd.x,cmd.y);prevX=cmd.x;prevY=cmd.y;break;case'C':box.addBezier(prevX,prevY,cmd.x1,cmd.y1,cmd.x2,cmd.y2,cmd.x,cmd.y);prevX=cmd.x;prevY=cmd.y;break;case'Z':prevX=startX;prevY=startY;break;default:throw new Error('Unexpected path command '+cmd.type);}}if(box.isEmpty()){box.addPoint(0,0);}return box;};/**
	 * Draw the path to a 2D context.
	 * @param {CanvasRenderingContext2D} ctx - A 2D drawing context.
	 */Path.prototype.draw=function(ctx){var this$1=this;ctx.beginPath();for(var i=0;i<this.commands.length;i+=1){var cmd=this$1.commands[i];if(cmd.type==='M'){ctx.moveTo(cmd.x,cmd.y);}else if(cmd.type==='L'){ctx.lineTo(cmd.x,cmd.y);}else if(cmd.type==='C'){ctx.bezierCurveTo(cmd.x1,cmd.y1,cmd.x2,cmd.y2,cmd.x,cmd.y);}else if(cmd.type==='Q'){ctx.quadraticCurveTo(cmd.x1,cmd.y1,cmd.x,cmd.y);}else if(cmd.type==='Z'){ctx.closePath();}}if(this.fill){ctx.fillStyle=this.fill;ctx.fill();}if(this.stroke){ctx.strokeStyle=this.stroke;ctx.lineWidth=this.strokeWidth;ctx.stroke();}};/**
	 * Convert the Path to a string of path data instructions
	 * See http://www.w3.org/TR/SVG/paths.html#PathData
	 * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
	 * @return {string}
	 */Path.prototype.toPathData=function(decimalPlaces){var this$1=this;decimalPlaces=decimalPlaces!==undefined?decimalPlaces:2;function floatToString(v){if(Math.round(v)===v){return''+Math.round(v);}else{return v.toFixed(decimalPlaces);}}function packValues(){var arguments$1=arguments;var s='';for(var i=0;i<arguments.length;i+=1){var v=arguments$1[i];if(v>=0&&i>0){s+=' ';}s+=floatToString(v);}return s;}var d='';for(var i=0;i<this.commands.length;i+=1){var cmd=this$1.commands[i];if(cmd.type==='M'){d+='M'+packValues(cmd.x,cmd.y);}else if(cmd.type==='L'){d+='L'+packValues(cmd.x,cmd.y);}else if(cmd.type==='C'){d+='C'+packValues(cmd.x1,cmd.y1,cmd.x2,cmd.y2,cmd.x,cmd.y);}else if(cmd.type==='Q'){d+='Q'+packValues(cmd.x1,cmd.y1,cmd.x,cmd.y);}else if(cmd.type==='Z'){d+='Z';}}return d;};/**
	 * Convert the path to an SVG <path> element, as a string.
	 * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
	 * @return {string}
	 */Path.prototype.toSVG=function(decimalPlaces){var svg='<path d="';svg+=this.toPathData(decimalPlaces);svg+='"';if(this.fill&&this.fill!=='black'){if(this.fill===null){svg+=' fill="none"';}else{svg+=' fill="'+this.fill+'"';}}if(this.stroke){svg+=' stroke="'+this.stroke+'" stroke-width="'+this.strokeWidth+'"';}svg+='/>';return svg;};/**
	 * Convert the path to a DOM element.
	 * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
	 * @return {SVGPathElement}
	 */Path.prototype.toDOMElement=function(decimalPlaces){var temporaryPath=this.toPathData(decimalPlaces);var newPath=document.createElementNS('http://www.w3.org/2000/svg','path');newPath.setAttribute('d',temporaryPath);return newPath;};// Run-time checking of preconditions.
function fail(message){throw new Error(message);}// Precondition function that checks if the given predicate is true.
// If not, it will throw an error.
function argument(predicate,message){if(!predicate){fail(message);}}var check={fail:fail,argument:argument,assert:argument};// Data types used in the OpenType font file.
// All OpenType fonts use Motorola-style byte ordering (Big Endian)
var LIMIT16=32768;// The limit at which a 16-bit number switches signs == 2^15
var LIMIT32=2147483648;// The limit at which a 32-bit number switches signs == 2 ^ 31
/**
	 * @exports opentype.decode
	 * @class
	 */var decode={};/**
	 * @exports opentype.encode
	 * @class
	 */var encode={};/**
	 * @exports opentype.sizeOf
	 * @class
	 */var sizeOf={};// Return a function that always returns the same value.
function constant(v){return function(){return v;};}// OpenType data types //////////////////////////////////////////////////////
/**
	 * Convert an 8-bit unsigned integer to a list of 1 byte.
	 * @param {number}
	 * @returns {Array}
	 */encode.BYTE=function(v){check.argument(v>=0&&v<=255,'Byte value should be between 0 and 255.');return[v];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.BYTE=constant(1);/**
	 * Convert a 8-bit signed integer to a list of 1 byte.
	 * @param {string}
	 * @returns {Array}
	 */encode.CHAR=function(v){return[v.charCodeAt(0)];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.CHAR=constant(1);/**
	 * Convert an ASCII string to a list of bytes.
	 * @param {string}
	 * @returns {Array}
	 */encode.CHARARRAY=function(v){var b=[];for(var i=0;i<v.length;i+=1){b[i]=v.charCodeAt(i);}return b;};/**
	 * @param {Array}
	 * @returns {number}
	 */sizeOf.CHARARRAY=function(v){return v.length;};/**
	 * Convert a 16-bit unsigned integer to a list of 2 bytes.
	 * @param {number}
	 * @returns {Array}
	 */encode.USHORT=function(v){return[v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.USHORT=constant(2);/**
	 * Convert a 16-bit signed integer to a list of 2 bytes.
	 * @param {number}
	 * @returns {Array}
	 */encode.SHORT=function(v){// Two's complement
if(v>=LIMIT16){v=-(2*LIMIT16-v);}return[v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.SHORT=constant(2);/**
	 * Convert a 24-bit unsigned integer to a list of 3 bytes.
	 * @param {number}
	 * @returns {Array}
	 */encode.UINT24=function(v){return[v>>16&0xFF,v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.UINT24=constant(3);/**
	 * Convert a 32-bit unsigned integer to a list of 4 bytes.
	 * @param {number}
	 * @returns {Array}
	 */encode.ULONG=function(v){return[v>>24&0xFF,v>>16&0xFF,v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.ULONG=constant(4);/**
	 * Convert a 32-bit unsigned integer to a list of 4 bytes.
	 * @param {number}
	 * @returns {Array}
	 */encode.LONG=function(v){// Two's complement
if(v>=LIMIT32){v=-(2*LIMIT32-v);}return[v>>24&0xFF,v>>16&0xFF,v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.LONG=constant(4);encode.FIXED=encode.ULONG;sizeOf.FIXED=sizeOf.ULONG;encode.FWORD=encode.SHORT;sizeOf.FWORD=sizeOf.SHORT;encode.UFWORD=encode.USHORT;sizeOf.UFWORD=sizeOf.USHORT;/**
	 * Convert a 32-bit Apple Mac timestamp integer to a list of 8 bytes, 64-bit timestamp.
	 * @param {number}
	 * @returns {Array}
	 */encode.LONGDATETIME=function(v){return[0,0,0,0,v>>24&0xFF,v>>16&0xFF,v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.LONGDATETIME=constant(8);/**
	 * Convert a 4-char tag to a list of 4 bytes.
	 * @param {string}
	 * @returns {Array}
	 */encode.TAG=function(v){check.argument(v.length===4,'Tag should be exactly 4 ASCII characters.');return[v.charCodeAt(0),v.charCodeAt(1),v.charCodeAt(2),v.charCodeAt(3)];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.TAG=constant(4);// CFF data types ///////////////////////////////////////////////////////////
encode.Card8=encode.BYTE;sizeOf.Card8=sizeOf.BYTE;encode.Card16=encode.USHORT;sizeOf.Card16=sizeOf.USHORT;encode.OffSize=encode.BYTE;sizeOf.OffSize=sizeOf.BYTE;encode.SID=encode.USHORT;sizeOf.SID=sizeOf.USHORT;// Convert a numeric operand or charstring number to a variable-size list of bytes.
/**
	 * Convert a numeric operand or charstring number to a variable-size list of bytes.
	 * @param {number}
	 * @returns {Array}
	 */encode.NUMBER=function(v){if(v>=-107&&v<=107){return[v+139];}else if(v>=108&&v<=1131){v=v-108;return[(v>>8)+247,v&0xFF];}else if(v>=-1131&&v<=-108){v=-v-108;return[(v>>8)+251,v&0xFF];}else if(v>=-32768&&v<=32767){return encode.NUMBER16(v);}else{return encode.NUMBER32(v);}};/**
	 * @param {number}
	 * @returns {number}
	 */sizeOf.NUMBER=function(v){return encode.NUMBER(v).length;};/**
	 * Convert a signed number between -32768 and +32767 to a three-byte value.
	 * This ensures we always use three bytes, but is not the most compact format.
	 * @param {number}
	 * @returns {Array}
	 */encode.NUMBER16=function(v){return[28,v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.NUMBER16=constant(3);/**
	 * Convert a signed number between -(2^31) and +(2^31-1) to a five-byte value.
	 * This is useful if you want to be sure you always use four bytes,
	 * at the expense of wasting a few bytes for smaller numbers.
	 * @param {number}
	 * @returns {Array}
	 */encode.NUMBER32=function(v){return[29,v>>24&0xFF,v>>16&0xFF,v>>8&0xFF,v&0xFF];};/**
	 * @constant
	 * @type {number}
	 */sizeOf.NUMBER32=constant(5);/**
	 * @param {number}
	 * @returns {Array}
	 */encode.REAL=function(v){var value=v.toString();// Some numbers use an epsilon to encode the value. (e.g. JavaScript will store 0.0000001 as 1e-7)
// This code converts it back to a number without the epsilon.
var m=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);if(m){var epsilon=parseFloat('1e'+((m[2]?+m[2]:0)+m[1].length));value=(Math.round(v*epsilon)/epsilon).toString();}var nibbles='';for(var i=0,ii=value.length;i<ii;i+=1){var c=value[i];if(c==='e'){nibbles+=value[++i]==='-'?'c':'b';}else if(c==='.'){nibbles+='a';}else if(c==='-'){nibbles+='e';}else{nibbles+=c;}}nibbles+=nibbles.length&1?'f':'ff';var out=[30];for(var i$1=0,ii$1=nibbles.length;i$1<ii$1;i$1+=2){out.push(parseInt(nibbles.substr(i$1,2),16));}return out;};/**
	 * @param {number}
	 * @returns {number}
	 */sizeOf.REAL=function(v){return encode.REAL(v).length;};encode.NAME=encode.CHARARRAY;sizeOf.NAME=sizeOf.CHARARRAY;encode.STRING=encode.CHARARRAY;sizeOf.STRING=sizeOf.CHARARRAY;/**
	 * @param {DataView} data
	 * @param {number} offset
	 * @param {number} numBytes
	 * @returns {string}
	 */decode.UTF8=function(data,offset,numBytes){var codePoints=[];var numChars=numBytes;for(var j=0;j<numChars;j++,offset+=1){codePoints[j]=data.getUint8(offset);}return String.fromCharCode.apply(null,codePoints);};/**
	 * @param {DataView} data
	 * @param {number} offset
	 * @param {number} numBytes
	 * @returns {string}
	 */decode.UTF16=function(data,offset,numBytes){var codePoints=[];var numChars=numBytes/2;for(var j=0;j<numChars;j++,offset+=2){codePoints[j]=data.getUint16(offset);}return String.fromCharCode.apply(null,codePoints);};/**
	 * Convert a JavaScript string to UTF16-BE.
	 * @param {string}
	 * @returns {Array}
	 */encode.UTF16=function(v){var b=[];for(var i=0;i<v.length;i+=1){var codepoint=v.charCodeAt(i);b[b.length]=codepoint>>8&0xFF;b[b.length]=codepoint&0xFF;}return b;};/**
	 * @param {string}
	 * @returns {number}
	 */sizeOf.UTF16=function(v){return v.length*2;};// Data for converting old eight-bit Macintosh encodings to Unicode.
// This representation is optimized for decoding; encoding is slower
// and needs more memory. The assumption is that all opentype.js users
// want to open fonts, but saving a font will be comparatively rare
// so it can be more expensive. Keyed by IANA character set name.
//
// Python script for generating these strings:
//
//     s = u''.join([chr(c).decode('mac_greek') for c in range(128, 256)])
//     print(s.encode('utf-8'))
/**
	 * @private
	 */var eightBitMacEncodings={'x-mac-croatian':// Python: 'mac_croatian'
'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø'+'¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ','x-mac-cyrillic':// Python: 'mac_cyrillic'
'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњ'+'јЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю','x-mac-gaelic':// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/GAELIC.TXT
'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæø'+'ṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ','x-mac-greek':// Python: 'mac_greek'
'Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩ'+'\u03AC\u039D\xAC\u039F\u03A1\u2248\u03A4\xAB\xBB\u2026\xA0\u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xF7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xAD','x-mac-icelandic':// Python: 'mac_iceland'
'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø'+'¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ','x-mac-inuit':// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/INUIT.TXT
'ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗ'+'ᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł','x-mac-ce':// Python: 'mac_latin2'
'ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅ'+'ņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ',macintosh:// Python: 'mac_roman'
'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø'+'¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ','x-mac-romanian':// Python: 'mac_romanian'
'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș'+'¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ','x-mac-turkish':// Python: 'mac_turkish'
'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø'+'¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ'};/**
	 * Decodes an old-style Macintosh string. Returns either a Unicode JavaScript
	 * string, or 'undefined' if the encoding is unsupported. For example, we do
	 * not support Chinese, Japanese or Korean because these would need large
	 * mapping tables.
	 * @param {DataView} dataView
	 * @param {number} offset
	 * @param {number} dataLength
	 * @param {string} encoding
	 * @returns {string}
	 */decode.MACSTRING=function(dataView,offset,dataLength,encoding){var table=eightBitMacEncodings[encoding];if(table===undefined){return undefined;}var result='';for(var i=0;i<dataLength;i++){var c=dataView.getUint8(offset+i);// In all eight-bit Mac encodings, the characters 0x00..0x7F are
// mapped to U+0000..U+007F; we only need to look up the others.
if(c<=0x7F){result+=String.fromCharCode(c);}else{result+=table[c&0x7F];}}return result;};// Helper function for encode.MACSTRING. Returns a dictionary for mapping
// Unicode character codes to their 8-bit MacOS equivalent. This table
// is not exactly a super cheap data structure, but we do not care because
// encoding Macintosh strings is only rarely needed in typical applications.
var macEncodingTableCache=typeof _weakMap2.default==='function'&&new _weakMap2.default();var macEncodingCacheKeys;var getMacEncodingTable=function getMacEncodingTable(encoding){// Since we use encoding as a cache key for WeakMap, it has to be
// a String object and not a literal. And at least on NodeJS 2.10.1,
// WeakMap requires that the same String instance is passed for cache hits.
if(!macEncodingCacheKeys){macEncodingCacheKeys={};for(var e in eightBitMacEncodings){/*jshint -W053 */// Suppress "Do not use String as a constructor."
macEncodingCacheKeys[e]=new String(e);}}var cacheKey=macEncodingCacheKeys[encoding];if(cacheKey===undefined){return undefined;}// We can't do "if (cache.has(key)) {return cache.get(key)}" here:
// since garbage collection may run at any time, it could also kick in
// between the calls to cache.has() and cache.get(). In that case,
// we would return 'undefined' even though we do support the encoding.
if(macEncodingTableCache){var cachedTable=macEncodingTableCache.get(cacheKey);if(cachedTable!==undefined){return cachedTable;}}var decodingTable=eightBitMacEncodings[encoding];if(decodingTable===undefined){return undefined;}var encodingTable={};for(var i=0;i<decodingTable.length;i++){encodingTable[decodingTable.charCodeAt(i)]=i+0x80;}if(macEncodingTableCache){macEncodingTableCache.set(cacheKey,encodingTable);}return encodingTable;};/**
	 * Encodes an old-style Macintosh string. Returns a byte array upon success.
	 * If the requested encoding is unsupported, or if the input string contains
	 * a character that cannot be expressed in the encoding, the function returns
	 * 'undefined'.
	 * @param {string} str
	 * @param {string} encoding
	 * @returns {Array}
	 */encode.MACSTRING=function(str,encoding){var table=getMacEncodingTable(encoding);if(table===undefined){return undefined;}var result=[];for(var i=0;i<str.length;i++){var c=str.charCodeAt(i);// In all eight-bit Mac encodings, the characters 0x00..0x7F are
// mapped to U+0000..U+007F; we only need to look up the others.
if(c>=0x80){c=table[c];if(c===undefined){// str contains a Unicode character that cannot be encoded
// in the requested encoding.
return undefined;}}result[i]=c;// result.push(c);
}return result;};/**
	 * @param {string} str
	 * @param {string} encoding
	 * @returns {number}
	 */sizeOf.MACSTRING=function(str,encoding){var b=encode.MACSTRING(str,encoding);if(b!==undefined){return b.length;}else{return 0;}};// Helper for encode.VARDELTAS
function isByteEncodable(value){return value>=-128&&value<=127;}// Helper for encode.VARDELTAS
function encodeVarDeltaRunAsZeroes(deltas,pos,result){var runLength=0;var numDeltas=deltas.length;while(pos<numDeltas&&runLength<64&&deltas[pos]===0){++pos;++runLength;}result.push(0x80|runLength-1);return pos;}// Helper for encode.VARDELTAS
function encodeVarDeltaRunAsBytes(deltas,offset,result){var runLength=0;var numDeltas=deltas.length;var pos=offset;while(pos<numDeltas&&runLength<64){var value=deltas[pos];if(!isByteEncodable(value)){break;}// Within a byte-encoded run of deltas, a single zero is best
// stored literally as 0x00 value. However, if we have two or
// more zeroes in a sequence, it is better to start a new run.
// Fore example, the sequence of deltas [15, 15, 0, 15, 15]
// becomes 6 bytes (04 0F 0F 00 0F 0F) when storing the zero
// within the current run, but 7 bytes (01 0F 0F 80 01 0F 0F)
// when starting a new run.
if(value===0&&pos+1<numDeltas&&deltas[pos+1]===0){break;}++pos;++runLength;}result.push(runLength-1);for(var i=offset;i<pos;++i){result.push(deltas[i]+256&0xff);}return pos;}// Helper for encode.VARDELTAS
function encodeVarDeltaRunAsWords(deltas,offset,result){var runLength=0;var numDeltas=deltas.length;var pos=offset;while(pos<numDeltas&&runLength<64){var value=deltas[pos];// Within a word-encoded run of deltas, it is easiest to start
// a new run (with a different encoding) whenever we encounter
// a zero value. For example, the sequence [0x6666, 0, 0x7777]
// needs 7 bytes when storing the zero inside the current run
// (42 66 66 00 00 77 77), and equally 7 bytes when starting a
// new run (40 66 66 80 40 77 77).
if(value===0){break;}// Within a word-encoded run of deltas, a single value in the
// range (-128..127) should be encoded within the current run
// because it is more compact. For example, the sequence
// [0x6666, 2, 0x7777] becomes 7 bytes when storing the value
// literally (42 66 66 00 02 77 77), but 8 bytes when starting
// a new run (40 66 66 00 02 40 77 77).
if(isByteEncodable(value)&&pos+1<numDeltas&&isByteEncodable(deltas[pos+1])){break;}++pos;++runLength;}result.push(0x40|runLength-1);for(var i=offset;i<pos;++i){var val=deltas[i];result.push(val+0x10000>>8&0xff,val+0x100&0xff);}return pos;}/**
	 * Encode a list of variation adjustment deltas.
	 *
	 * Variation adjustment deltas are used in ‘gvar’ and ‘cvar’ tables.
	 * They indicate how points (in ‘gvar’) or values (in ‘cvar’) get adjusted
	 * when generating instances of variation fonts.
	 *
	 * @see https://www.microsoft.com/typography/otspec/gvar.htm
	 * @see https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6gvar.html
	 * @param {Array}
	 * @return {Array}
	 */encode.VARDELTAS=function(deltas){var pos=0;var result=[];while(pos<deltas.length){var value=deltas[pos];if(value===0){pos=encodeVarDeltaRunAsZeroes(deltas,pos,result);}else if(value>=-128&&value<=127){pos=encodeVarDeltaRunAsBytes(deltas,pos,result);}else{pos=encodeVarDeltaRunAsWords(deltas,pos,result);}}return result;};// Convert a list of values to a CFF INDEX structure.
// The values should be objects containing name / type / value.
/**
	 * @param {Array} l
	 * @returns {Array}
	 */encode.INDEX=function(l){//var offset, offsets, offsetEncoder, encodedOffsets, encodedOffset, data,
//    i, v;
// Because we have to know which data type to use to encode the offsets,
// we have to go through the values twice: once to encode the data and
// calculate the offsets, then again to encode the offsets using the fitting data type.
var offset=1;// First offset is always 1.
var offsets=[offset];var data=[];for(var i=0;i<l.length;i+=1){var v=encode.OBJECT(l[i]);Array.prototype.push.apply(data,v);offset+=v.length;offsets.push(offset);}if(data.length===0){return[0,0];}var encodedOffsets=[];var offSize=1+Math.floor(Math.log(offset)/Math.log(2))/8|0;var offsetEncoder=[undefined,encode.BYTE,encode.USHORT,encode.UINT24,encode.ULONG][offSize];for(var i$1=0;i$1<offsets.length;i$1+=1){var encodedOffset=offsetEncoder(offsets[i$1]);Array.prototype.push.apply(encodedOffsets,encodedOffset);}return Array.prototype.concat(encode.Card16(l.length),encode.OffSize(offSize),encodedOffsets,data);};/**
	 * @param {Array}
	 * @returns {number}
	 */sizeOf.INDEX=function(v){return encode.INDEX(v).length;};/**
	 * Convert an object to a CFF DICT structure.
	 * The keys should be numeric.
	 * The values should be objects containing name / type / value.
	 * @param {Object} m
	 * @returns {Array}
	 */encode.DICT=function(m){var d=[];var keys=(0,_keys2.default)(m);var length=keys.length;for(var i=0;i<length;i+=1){// Object.keys() return string keys, but our keys are always numeric.
var k=parseInt(keys[i],0);var v=m[k];// Value comes before the key.
d=d.concat(encode.OPERAND(v.value,v.type));d=d.concat(encode.OPERATOR(k));}return d;};/**
	 * @param {Object}
	 * @returns {number}
	 */sizeOf.DICT=function(m){return encode.DICT(m).length;};/**
	 * @param {number}
	 * @returns {Array}
	 */encode.OPERATOR=function(v){if(v<1200){return[v];}else{return[12,v-1200];}};/**
	 * @param {Array} v
	 * @param {string}
	 * @returns {Array}
	 */encode.OPERAND=function(v,type){var d=[];if(Array.isArray(type)){for(var i=0;i<type.length;i+=1){check.argument(v.length===type.length,'Not enough arguments given for type'+type);d=d.concat(encode.OPERAND(v[i],type[i]));}}else{if(type==='SID'){d=d.concat(encode.NUMBER(v));}else if(type==='offset'){// We make it easy for ourselves and always encode offsets as
// 4 bytes. This makes offset calculation for the top dict easier.
d=d.concat(encode.NUMBER32(v));}else if(type==='number'){d=d.concat(encode.NUMBER(v));}else if(type==='real'){d=d.concat(encode.REAL(v));}else{throw new Error('Unknown operand type '+type);// FIXME Add support for booleans
}}return d;};encode.OP=encode.BYTE;sizeOf.OP=sizeOf.BYTE;// memoize charstring encoding using WeakMap if available
var wmm=typeof _weakMap2.default==='function'&&new _weakMap2.default();/**
	 * Convert a list of CharString operations to bytes.
	 * @param {Array}
	 * @returns {Array}
	 */encode.CHARSTRING=function(ops){// See encode.MACSTRING for why we don't do "if (wmm && wmm.has(ops))".
if(wmm){var cachedValue=wmm.get(ops);if(cachedValue!==undefined){return cachedValue;}}var d=[];var length=ops.length;for(var i=0;i<length;i+=1){var op=ops[i];d=d.concat(encode[op.type](op.value));}if(wmm){wmm.set(ops,d);}return d;};/**
	 * @param {Array}
	 * @returns {number}
	 */sizeOf.CHARSTRING=function(ops){return encode.CHARSTRING(ops).length;};// Utility functions ////////////////////////////////////////////////////////
/**
	 * Convert an object containing name / type / value to bytes.
	 * @param {Object}
	 * @returns {Array}
	 */encode.OBJECT=function(v){var encodingFunction=encode[v.type];check.argument(encodingFunction!==undefined,'No encoding function for type '+v.type);return encodingFunction(v.value);};/**
	 * @param {Object}
	 * @returns {number}
	 */sizeOf.OBJECT=function(v){var sizeOfFunction=sizeOf[v.type];check.argument(sizeOfFunction!==undefined,'No sizeOf function for type '+v.type);return sizeOfFunction(v.value);};/**
	 * Convert a table object to bytes.
	 * A table contains a list of fields containing the metadata (name, type and default value).
	 * The table itself has the field values set as attributes.
	 * @param {opentype.Table}
	 * @returns {Array}
	 */encode.TABLE=function(table){var d=[];var length=table.fields.length;var subtables=[];var subtableOffsets=[];for(var i=0;i<length;i+=1){var field=table.fields[i];var encodingFunction=encode[field.type];check.argument(encodingFunction!==undefined,'No encoding function for field type '+field.type+' ('+field.name+')');var value=table[field.name];if(value===undefined){value=field.value;}var bytes=encodingFunction(value);if(field.type==='TABLE'){subtableOffsets.push(d.length);d=d.concat([0,0]);subtables.push(bytes);}else{d=d.concat(bytes);}}for(var i$1=0;i$1<subtables.length;i$1+=1){var o=subtableOffsets[i$1];var offset=d.length;check.argument(offset<65536,'Table '+table.tableName+' too big.');d[o]=offset>>8;d[o+1]=offset&0xff;d=d.concat(subtables[i$1]);}return d;};/**
	 * @param {opentype.Table}
	 * @returns {number}
	 */sizeOf.TABLE=function(table){var numBytes=0;var length=table.fields.length;for(var i=0;i<length;i+=1){var field=table.fields[i];var sizeOfFunction=sizeOf[field.type];check.argument(sizeOfFunction!==undefined,'No sizeOf function for field type '+field.type+' ('+field.name+')');var value=table[field.name];if(value===undefined){value=field.value;}numBytes+=sizeOfFunction(value);// Subtables take 2 more bytes for offsets.
if(field.type==='TABLE'){numBytes+=2;}}return numBytes;};encode.RECORD=encode.TABLE;sizeOf.RECORD=sizeOf.TABLE;// Merge in a list of bytes.
encode.LITERAL=function(v){return v;};sizeOf.LITERAL=function(v){return v.length;};// Table metadata
/**
	 * @exports opentype.Table
	 * @class
	 * @param {string} tableName
	 * @param {Array} fields
	 * @param {Object} options
	 * @constructor
	 */function Table(tableName,fields,options){var this$1=this;for(var i=0;i<fields.length;i+=1){var field=fields[i];this$1[field.name]=field.value;}this.tableName=tableName;this.fields=fields;if(options){var optionKeys=(0,_keys2.default)(options);for(var i$1=0;i$1<optionKeys.length;i$1+=1){var k=optionKeys[i$1];var v=options[k];if(this$1[k]!==undefined){this$1[k]=v;}}}}/**
	 * Encodes the table and returns an array of bytes
	 * @return {Array}
	 */Table.prototype.encode=function(){return encode.TABLE(this);};/**
	 * Get the size of the table.
	 * @return {number}
	 */Table.prototype.sizeOf=function(){return sizeOf.TABLE(this);};/**
	 * @private
	 */function ushortList(itemName,list,count){if(count===undefined){count=list.length;}var fields=new Array(list.length+1);fields[0]={name:itemName+'Count',type:'USHORT',value:count};for(var i=0;i<list.length;i++){fields[i+1]={name:itemName+i,type:'USHORT',value:list[i]};}return fields;}/**
	 * @private
	 */function tableList(itemName,records,itemCallback){var count=records.length;var fields=new Array(count+1);fields[0]={name:itemName+'Count',type:'USHORT',value:count};for(var i=0;i<count;i++){fields[i+1]={name:itemName+i,type:'TABLE',value:itemCallback(records[i],i)};}return fields;}/**
	 * @private
	 */function recordList(itemName,records,itemCallback){var count=records.length;var fields=[];fields[0]={name:itemName+'Count',type:'USHORT',value:count};for(var i=0;i<count;i++){fields=fields.concat(itemCallback(records[i],i));}return fields;}// Common Layout Tables
/**
	 * @exports opentype.Coverage
	 * @class
	 * @param {opentype.Table}
	 * @constructor
	 * @extends opentype.Table
	 */function Coverage(coverageTable){if(coverageTable.format===1){Table.call(this,'coverageTable',[{name:'coverageFormat',type:'USHORT',value:1}].concat(ushortList('glyph',coverageTable.glyphs)));}else{check.assert(false,'Can\'t create coverage table format 2 yet.');}}Coverage.prototype=(0,_create2.default)(Table.prototype);Coverage.prototype.constructor=Coverage;function ScriptList(scriptListTable){Table.call(this,'scriptListTable',recordList('scriptRecord',scriptListTable,function(scriptRecord,i){var script=scriptRecord.script;var defaultLangSys=script.defaultLangSys;check.assert(!!defaultLangSys,'Unable to write GSUB: script '+scriptRecord.tag+' has no default language system.');return[{name:'scriptTag'+i,type:'TAG',value:scriptRecord.tag},{name:'script'+i,type:'TABLE',value:new Table('scriptTable',[{name:'defaultLangSys',type:'TABLE',value:new Table('defaultLangSys',[{name:'lookupOrder',type:'USHORT',value:0},{name:'reqFeatureIndex',type:'USHORT',value:defaultLangSys.reqFeatureIndex}].concat(ushortList('featureIndex',defaultLangSys.featureIndexes)))}].concat(recordList('langSys',script.langSysRecords,function(langSysRecord,i){var langSys=langSysRecord.langSys;return[{name:'langSysTag'+i,type:'TAG',value:langSysRecord.tag},{name:'langSys'+i,type:'TABLE',value:new Table('langSys',[{name:'lookupOrder',type:'USHORT',value:0},{name:'reqFeatureIndex',type:'USHORT',value:langSys.reqFeatureIndex}].concat(ushortList('featureIndex',langSys.featureIndexes)))}];})))}];}));}ScriptList.prototype=(0,_create2.default)(Table.prototype);ScriptList.prototype.constructor=ScriptList;/**
	 * @exports opentype.FeatureList
	 * @class
	 * @param {opentype.Table}
	 * @constructor
	 * @extends opentype.Table
	 */function FeatureList(featureListTable){Table.call(this,'featureListTable',recordList('featureRecord',featureListTable,function(featureRecord,i){var feature=featureRecord.feature;return[{name:'featureTag'+i,type:'TAG',value:featureRecord.tag},{name:'feature'+i,type:'TABLE',value:new Table('featureTable',[{name:'featureParams',type:'USHORT',value:feature.featureParams}].concat(ushortList('lookupListIndex',feature.lookupListIndexes)))}];}));}FeatureList.prototype=(0,_create2.default)(Table.prototype);FeatureList.prototype.constructor=FeatureList;/**
	 * @exports opentype.LookupList
	 * @class
	 * @param {opentype.Table}
	 * @param {Object}
	 * @constructor
	 * @extends opentype.Table
	 */function LookupList(lookupListTable,subtableMakers){Table.call(this,'lookupListTable',tableList('lookup',lookupListTable,function(lookupTable){var subtableCallback=subtableMakers[lookupTable.lookupType];check.assert(!!subtableCallback,'Unable to write GSUB lookup type '+lookupTable.lookupType+' tables.');return new Table('lookupTable',[{name:'lookupType',type:'USHORT',value:lookupTable.lookupType},{name:'lookupFlag',type:'USHORT',value:lookupTable.lookupFlag}].concat(tableList('subtable',lookupTable.subtables,subtableCallback)));}));}LookupList.prototype=(0,_create2.default)(Table.prototype);LookupList.prototype.constructor=LookupList;// Record = same as Table, but inlined (a Table has an offset and its data is further in the stream)
// Don't use offsets inside Records (probable bug), only in Tables.
var table={Table:Table,Record:Table,Coverage:Coverage,ScriptList:ScriptList,FeatureList:FeatureList,LookupList:LookupList,ushortList:ushortList,tableList:tableList,recordList:recordList};// Parsing utility functions
// Retrieve an unsigned byte from the DataView.
function getByte(dataView,offset){return dataView.getUint8(offset);}// Retrieve an unsigned 16-bit short from the DataView.
// The value is stored in big endian.
function getUShort(dataView,offset){return dataView.getUint16(offset,false);}// Retrieve a signed 16-bit short from the DataView.
// The value is stored in big endian.
function getShort(dataView,offset){return dataView.getInt16(offset,false);}// Retrieve an unsigned 32-bit long from the DataView.
// The value is stored in big endian.
function getULong(dataView,offset){return dataView.getUint32(offset,false);}// Retrieve a 32-bit signed fixed-point number (16.16) from the DataView.
// The value is stored in big endian.
function getFixed(dataView,offset){var decimal=dataView.getInt16(offset,false);var fraction=dataView.getUint16(offset+2,false);return decimal+fraction/65535;}// Retrieve a 4-character tag from the DataView.
// Tags are used to identify tables.
function getTag(dataView,offset){var tag='';for(var i=offset;i<offset+4;i+=1){tag+=String.fromCharCode(dataView.getInt8(i));}return tag;}// Retrieve an offset from the DataView.
// Offsets are 1 to 4 bytes in length, depending on the offSize argument.
function getOffset(dataView,offset,offSize){var v=0;for(var i=0;i<offSize;i+=1){v<<=8;v+=dataView.getUint8(offset+i);}return v;}// Retrieve a number of bytes from start offset to the end offset from the DataView.
function getBytes(dataView,startOffset,endOffset){var bytes=[];for(var i=startOffset;i<endOffset;i+=1){bytes.push(dataView.getUint8(i));}return bytes;}// Convert the list of bytes to a string.
function bytesToString(bytes){var s='';for(var i=0;i<bytes.length;i+=1){s+=String.fromCharCode(bytes[i]);}return s;}var typeOffsets={byte:1,uShort:2,short:2,uLong:4,fixed:4,longDateTime:8,tag:4};// A stateful parser that changes the offset whenever a value is retrieved.
// The data is a DataView.
function Parser(data,offset){this.data=data;this.offset=offset;this.relativeOffset=0;}Parser.prototype.parseByte=function(){var v=this.data.getUint8(this.offset+this.relativeOffset);this.relativeOffset+=1;return v;};Parser.prototype.parseChar=function(){var v=this.data.getInt8(this.offset+this.relativeOffset);this.relativeOffset+=1;return v;};Parser.prototype.parseCard8=Parser.prototype.parseByte;Parser.prototype.parseUShort=function(){var v=this.data.getUint16(this.offset+this.relativeOffset);this.relativeOffset+=2;return v;};Parser.prototype.parseCard16=Parser.prototype.parseUShort;Parser.prototype.parseSID=Parser.prototype.parseUShort;Parser.prototype.parseOffset16=Parser.prototype.parseUShort;Parser.prototype.parseShort=function(){var v=this.data.getInt16(this.offset+this.relativeOffset);this.relativeOffset+=2;return v;};Parser.prototype.parseF2Dot14=function(){var v=this.data.getInt16(this.offset+this.relativeOffset)/16384;this.relativeOffset+=2;return v;};Parser.prototype.parseULong=function(){var v=getULong(this.data,this.offset+this.relativeOffset);this.relativeOffset+=4;return v;};Parser.prototype.parseFixed=function(){var v=getFixed(this.data,this.offset+this.relativeOffset);this.relativeOffset+=4;return v;};Parser.prototype.parseString=function(length){var dataView=this.data;var offset=this.offset+this.relativeOffset;var string='';this.relativeOffset+=length;for(var i=0;i<length;i++){string+=String.fromCharCode(dataView.getUint8(offset+i));}return string;};Parser.prototype.parseTag=function(){return this.parseString(4);};// LONGDATETIME is a 64-bit integer.
// JavaScript and unix timestamps traditionally use 32 bits, so we
// only take the last 32 bits.
// + Since until 2038 those bits will be filled by zeros we can ignore them.
Parser.prototype.parseLongDateTime=function(){var v=getULong(this.data,this.offset+this.relativeOffset+4);// Subtract seconds between 01/01/1904 and 01/01/1970
// to convert Apple Mac timestamp to Standard Unix timestamp
v-=2082844800;this.relativeOffset+=8;return v;};Parser.prototype.parseVersion=function(){var major=getUShort(this.data,this.offset+this.relativeOffset);// How to interpret the minor version is very vague in the spec. 0x5000 is 5, 0x1000 is 1
// This returns the correct number if minor = 0xN000 where N is 0-9
var minor=getUShort(this.data,this.offset+this.relativeOffset+2);this.relativeOffset+=4;return major+minor/0x1000/10;};Parser.prototype.skip=function(type,amount){if(amount===undefined){amount=1;}this.relativeOffset+=typeOffsets[type]*amount;};///// Parsing lists and records ///////////////////////////////
// Parse a list of 16 bit unsigned integers. The length of the list can be read on the stream
// or provided as an argument.
Parser.prototype.parseOffset16List=Parser.prototype.parseUShortList=function(count){if(count===undefined){count=this.parseUShort();}var offsets=new Array(count);var dataView=this.data;var offset=this.offset+this.relativeOffset;for(var i=0;i<count;i++){offsets[i]=dataView.getUint16(offset);offset+=2;}this.relativeOffset+=count*2;return offsets;};// Parses a list of 16 bit signed integers.
Parser.prototype.parseShortList=function(count){var list=new Array(count);var dataView=this.data;var offset=this.offset+this.relativeOffset;for(var i=0;i<count;i++){list[i]=dataView.getInt16(offset);offset+=2;}this.relativeOffset+=count*2;return list;};// Parses a list of bytes.
Parser.prototype.parseByteList=function(count){var list=new Array(count);var dataView=this.data;var offset=this.offset+this.relativeOffset;for(var i=0;i<count;i++){list[i]=dataView.getUint8(offset++);}this.relativeOffset+=count;return list;};/**
	 * Parse a list of items.
	 * Record count is optional, if omitted it is read from the stream.
	 * itemCallback is one of the Parser methods.
	 */Parser.prototype.parseList=function(count,itemCallback){var this$1=this;if(!itemCallback){itemCallback=count;count=this.parseUShort();}var list=new Array(count);for(var i=0;i<count;i++){list[i]=itemCallback.call(this$1);}return list;};/**
	 * Parse a list of records.
	 * Record count is optional, if omitted it is read from the stream.
	 * Example of recordDescription: { sequenceIndex: Parser.uShort, lookupListIndex: Parser.uShort }
	 */Parser.prototype.parseRecordList=function(count,recordDescription){var this$1=this;// If the count argument is absent, read it in the stream.
if(!recordDescription){recordDescription=count;count=this.parseUShort();}var records=new Array(count);var fields=(0,_keys2.default)(recordDescription);for(var i=0;i<count;i++){var rec={};for(var j=0;j<fields.length;j++){var fieldName=fields[j];var fieldType=recordDescription[fieldName];rec[fieldName]=fieldType.call(this$1);}records[i]=rec;}return records;};// Parse a data structure into an object
// Example of description: { sequenceIndex: Parser.uShort, lookupListIndex: Parser.uShort }
Parser.prototype.parseStruct=function(description){var this$1=this;if(typeof description==='function'){return description.call(this);}else{var fields=(0,_keys2.default)(description);var struct={};for(var j=0;j<fields.length;j++){var fieldName=fields[j];var fieldType=description[fieldName];struct[fieldName]=fieldType.call(this$1);}return struct;}};Parser.prototype.parsePointer=function(description){var structOffset=this.parseOffset16();if(structOffset>0){// NULL offset => return undefined
return new Parser(this.data,this.offset+structOffset).parseStruct(description);}return undefined;};/**
	 * Parse a list of offsets to lists of 16-bit integers,
	 * or a list of offsets to lists of offsets to any kind of items.
	 * If itemCallback is not provided, a list of list of UShort is assumed.
	 * If provided, itemCallback is called on each item and must parse the item.
	 * See examples in tables/gsub.js
	 */Parser.prototype.parseListOfLists=function(itemCallback){var this$1=this;var offsets=this.parseOffset16List();var count=offsets.length;var relativeOffset=this.relativeOffset;var list=new Array(count);for(var i=0;i<count;i++){var start=offsets[i];if(start===0){// NULL offset
list[i]=undefined;// Add i as owned property to list. Convenient with assert.
continue;}this$1.relativeOffset=start;if(itemCallback){var subOffsets=this$1.parseOffset16List();var subList=new Array(subOffsets.length);for(var j=0;j<subOffsets.length;j++){this$1.relativeOffset=start+subOffsets[j];subList[j]=itemCallback.call(this$1);}list[i]=subList;}else{list[i]=this$1.parseUShortList();}}this.relativeOffset=relativeOffset;return list;};///// Complex tables parsing //////////////////////////////////
// Parse a coverage table in a GSUB, GPOS or GDEF table.
// https://www.microsoft.com/typography/OTSPEC/chapter2.htm
// parser.offset must point to the start of the table containing the coverage.
Parser.prototype.parseCoverage=function(){var this$1=this;var startOffset=this.offset+this.relativeOffset;var format=this.parseUShort();var count=this.parseUShort();if(format===1){return{format:1,glyphs:this.parseUShortList(count)};}else if(format===2){var ranges=new Array(count);for(var i=0;i<count;i++){ranges[i]={start:this$1.parseUShort(),end:this$1.parseUShort(),index:this$1.parseUShort()};}return{format:2,ranges:ranges};}throw new Error('0x'+startOffset.toString(16)+': Coverage format must be 1 or 2.');};// Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
// https://www.microsoft.com/typography/OTSPEC/chapter2.htm
Parser.prototype.parseClassDef=function(){var startOffset=this.offset+this.relativeOffset;var format=this.parseUShort();if(format===1){return{format:1,startGlyph:this.parseUShort(),classes:this.parseUShortList()};}else if(format===2){return{format:2,ranges:this.parseRecordList({start:Parser.uShort,end:Parser.uShort,classId:Parser.uShort})};}throw new Error('0x'+startOffset.toString(16)+': ClassDef format must be 1 or 2.');};///// Static methods ///////////////////////////////////
// These convenience methods can be used as callbacks and should be called with "this" context set to a Parser instance.
Parser.list=function(count,itemCallback){return function(){return this.parseList(count,itemCallback);};};Parser.recordList=function(count,recordDescription){return function(){return this.parseRecordList(count,recordDescription);};};Parser.pointer=function(description){return function(){return this.parsePointer(description);};};Parser.tag=Parser.prototype.parseTag;Parser.byte=Parser.prototype.parseByte;Parser.uShort=Parser.offset16=Parser.prototype.parseUShort;Parser.uShortList=Parser.prototype.parseUShortList;Parser.struct=Parser.prototype.parseStruct;Parser.coverage=Parser.prototype.parseCoverage;Parser.classDef=Parser.prototype.parseClassDef;///// Script, Feature, Lookup lists ///////////////////////////////////////////////
// https://www.microsoft.com/typography/OTSPEC/chapter2.htm
var langSysTable={reserved:Parser.uShort,reqFeatureIndex:Parser.uShort,featureIndexes:Parser.uShortList};Parser.prototype.parseScriptList=function(){return this.parsePointer(Parser.recordList({tag:Parser.tag,script:Parser.pointer({defaultLangSys:Parser.pointer(langSysTable),langSysRecords:Parser.recordList({tag:Parser.tag,langSys:Parser.pointer(langSysTable)})})}));};Parser.prototype.parseFeatureList=function(){return this.parsePointer(Parser.recordList({tag:Parser.tag,feature:Parser.pointer({featureParams:Parser.offset16,lookupListIndexes:Parser.uShortList})}));};Parser.prototype.parseLookupList=function(lookupTableParsers){return this.parsePointer(Parser.list(Parser.pointer(function(){var lookupType=this.parseUShort();check.argument(1<=lookupType&&lookupType<=8,'GSUB lookup type '+lookupType+' unknown.');var lookupFlag=this.parseUShort();var useMarkFilteringSet=lookupFlag&0x10;return{lookupType:lookupType,lookupFlag:lookupFlag,subtables:this.parseList(Parser.pointer(lookupTableParsers[lookupType])),markFilteringSet:useMarkFilteringSet?this.parseUShort():undefined};})));};var parse={getByte:getByte,getCard8:getByte,getUShort:getUShort,getCard16:getUShort,getShort:getShort,getULong:getULong,getFixed:getFixed,getTag:getTag,getOffset:getOffset,getBytes:getBytes,bytesToString:bytesToString,Parser:Parser};// The `cmap` table stores the mappings from characters to glyphs.
// https://www.microsoft.com/typography/OTSPEC/cmap.htm
function parseCmapTableFormat12(cmap,p){//Skip reserved.
p.parseUShort();// Length in bytes of the sub-tables.
cmap.length=p.parseULong();cmap.language=p.parseULong();var groupCount;cmap.groupCount=groupCount=p.parseULong();cmap.glyphIndexMap={};for(var i=0;i<groupCount;i+=1){var startCharCode=p.parseULong();var endCharCode=p.parseULong();var startGlyphId=p.parseULong();for(var c=startCharCode;c<=endCharCode;c+=1){cmap.glyphIndexMap[c]=startGlyphId;startGlyphId++;}}}function parseCmapTableFormat4(cmap,p,data,start,offset){// Length in bytes of the sub-tables.
cmap.length=p.parseUShort();cmap.language=p.parseUShort();// segCount is stored x 2.
var segCount;cmap.segCount=segCount=p.parseUShort()>>1;// Skip searchRange, entrySelector, rangeShift.
p.skip('uShort',3);// The "unrolled" mapping from character codes to glyph indices.
cmap.glyphIndexMap={};var endCountParser=new parse.Parser(data,start+offset+14);var startCountParser=new parse.Parser(data,start+offset+16+segCount*2);var idDeltaParser=new parse.Parser(data,start+offset+16+segCount*4);var idRangeOffsetParser=new parse.Parser(data,start+offset+16+segCount*6);var glyphIndexOffset=start+offset+16+segCount*8;for(var i=0;i<segCount-1;i+=1){var glyphIndex=void 0;var endCount=endCountParser.parseUShort();var startCount=startCountParser.parseUShort();var idDelta=idDeltaParser.parseShort();var idRangeOffset=idRangeOffsetParser.parseUShort();for(var c=startCount;c<=endCount;c+=1){if(idRangeOffset!==0){// The idRangeOffset is relative to the current position in the idRangeOffset array.
// Take the current offset in the idRangeOffset array.
glyphIndexOffset=idRangeOffsetParser.offset+idRangeOffsetParser.relativeOffset-2;// Add the value of the idRangeOffset, which will move us into the glyphIndex array.
glyphIndexOffset+=idRangeOffset;// Then add the character index of the current segment, multiplied by 2 for USHORTs.
glyphIndexOffset+=(c-startCount)*2;glyphIndex=parse.getUShort(data,glyphIndexOffset);if(glyphIndex!==0){glyphIndex=glyphIndex+idDelta&0xFFFF;}}else{glyphIndex=c+idDelta&0xFFFF;}cmap.glyphIndexMap[c]=glyphIndex;}}}// Parse the `cmap` table. This table stores the mappings from characters to glyphs.
// There are many available formats, but we only support the Windows format 4 and 12.
// This function returns a `CmapEncoding` object or null if no supported format could be found.
function parseCmapTable(data,start){var cmap={};cmap.version=parse.getUShort(data,start);check.argument(cmap.version===0,'cmap table version should be 0.');// The cmap table can contain many sub-tables, each with their own format.
// We're only interested in a "platform 3" table. This is a Windows format.
cmap.numTables=parse.getUShort(data,start+2);var offset=-1;for(var i=cmap.numTables-1;i>=0;i-=1){var platformId=parse.getUShort(data,start+4+i*8);var encodingId=parse.getUShort(data,start+4+i*8+2);if(platformId===3&&(encodingId===0||encodingId===1||encodingId===10)){offset=parse.getULong(data,start+4+i*8+4);break;}}if(offset===-1){// There is no cmap table in the font that we support.
throw new Error('No valid cmap sub-tables found.');}var p=new parse.Parser(data,start+offset);cmap.format=p.parseUShort();if(cmap.format===12){parseCmapTableFormat12(cmap,p);}else if(cmap.format===4){parseCmapTableFormat4(cmap,p,data,start,offset);}else{throw new Error('Only format 4 and 12 cmap tables are supported (found format '+cmap.format+').');}return cmap;}function addSegment(t,code,glyphIndex){t.segments.push({end:code,start:code,delta:-(code-glyphIndex),offset:0});}function addTerminatorSegment(t){t.segments.push({end:0xFFFF,start:0xFFFF,delta:1,offset:0});}function makeCmapTable(glyphs){var t=new table.Table('cmap',[{name:'version',type:'USHORT',value:0},{name:'numTables',type:'USHORT',value:1},{name:'platformID',type:'USHORT',value:3},{name:'encodingID',type:'USHORT',value:1},{name:'offset',type:'ULONG',value:12},{name:'format',type:'USHORT',value:4},{name:'length',type:'USHORT',value:0},{name:'language',type:'USHORT',value:0},{name:'segCountX2',type:'USHORT',value:0},{name:'searchRange',type:'USHORT',value:0},{name:'entrySelector',type:'USHORT',value:0},{name:'rangeShift',type:'USHORT',value:0}]);t.segments=[];for(var i=0;i<glyphs.length;i+=1){var glyph=glyphs.get(i);for(var j=0;j<glyph.unicodes.length;j+=1){addSegment(t,glyph.unicodes[j],i);}t.segments=t.segments.sort(function(a,b){return a.start-b.start;});}addTerminatorSegment(t);var segCount;segCount=t.segments.length;t.segCountX2=segCount*2;t.searchRange=Math.pow(2,Math.floor(Math.log(segCount)/Math.log(2)))*2;t.entrySelector=Math.log(t.searchRange/2)/Math.log(2);t.rangeShift=t.segCountX2-t.searchRange;// Set up parallel segment arrays.
var endCounts=[];var startCounts=[];var idDeltas=[];var idRangeOffsets=[];var glyphIds=[];for(var i$1=0;i$1<segCount;i$1+=1){var segment=t.segments[i$1];endCounts=endCounts.concat({name:'end_'+i$1,type:'USHORT',value:segment.end});startCounts=startCounts.concat({name:'start_'+i$1,type:'USHORT',value:segment.start});idDeltas=idDeltas.concat({name:'idDelta_'+i$1,type:'SHORT',value:segment.delta});idRangeOffsets=idRangeOffsets.concat({name:'idRangeOffset_'+i$1,type:'USHORT',value:segment.offset});if(segment.glyphId!==undefined){glyphIds=glyphIds.concat({name:'glyph_'+i$1,type:'USHORT',value:segment.glyphId});}}t.fields=t.fields.concat(endCounts);t.fields.push({name:'reservedPad',type:'USHORT',value:0});t.fields=t.fields.concat(startCounts);t.fields=t.fields.concat(idDeltas);t.fields=t.fields.concat(idRangeOffsets);t.fields=t.fields.concat(glyphIds);t.length=14+// Subtable header
endCounts.length*2+2+// reservedPad
startCounts.length*2+idDeltas.length*2+idRangeOffsets.length*2+glyphIds.length*2;return t;}var cmap={parse:parseCmapTable,make:makeCmapTable};// Glyph encoding
var cffStandardStrings=['.notdef','space','exclam','quotedbl','numbersign','dollar','percent','ampersand','quoteright','parenleft','parenright','asterisk','plus','comma','hyphen','period','slash','zero','one','two','three','four','five','six','seven','eight','nine','colon','semicolon','less','equal','greater','question','at','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','bracketleft','backslash','bracketright','asciicircum','underscore','quoteleft','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','braceleft','bar','braceright','asciitilde','exclamdown','cent','sterling','fraction','yen','florin','section','currency','quotesingle','quotedblleft','guillemotleft','guilsinglleft','guilsinglright','fi','fl','endash','dagger','daggerdbl','periodcentered','paragraph','bullet','quotesinglbase','quotedblbase','quotedblright','guillemotright','ellipsis','perthousand','questiondown','grave','acute','circumflex','tilde','macron','breve','dotaccent','dieresis','ring','cedilla','hungarumlaut','ogonek','caron','emdash','AE','ordfeminine','Lslash','Oslash','OE','ordmasculine','ae','dotlessi','lslash','oslash','oe','germandbls','onesuperior','logicalnot','mu','trademark','Eth','onehalf','plusminus','Thorn','onequarter','divide','brokenbar','degree','thorn','threequarters','twosuperior','registered','minus','eth','multiply','threesuperior','copyright','Aacute','Acircumflex','Adieresis','Agrave','Aring','Atilde','Ccedilla','Eacute','Ecircumflex','Edieresis','Egrave','Iacute','Icircumflex','Idieresis','Igrave','Ntilde','Oacute','Ocircumflex','Odieresis','Ograve','Otilde','Scaron','Uacute','Ucircumflex','Udieresis','Ugrave','Yacute','Ydieresis','Zcaron','aacute','acircumflex','adieresis','agrave','aring','atilde','ccedilla','eacute','ecircumflex','edieresis','egrave','iacute','icircumflex','idieresis','igrave','ntilde','oacute','ocircumflex','odieresis','ograve','otilde','scaron','uacute','ucircumflex','udieresis','ugrave','yacute','ydieresis','zcaron','exclamsmall','Hungarumlautsmall','dollaroldstyle','dollarsuperior','ampersandsmall','Acutesmall','parenleftsuperior','parenrightsuperior','266 ff','onedotenleader','zerooldstyle','oneoldstyle','twooldstyle','threeoldstyle','fouroldstyle','fiveoldstyle','sixoldstyle','sevenoldstyle','eightoldstyle','nineoldstyle','commasuperior','threequartersemdash','periodsuperior','questionsmall','asuperior','bsuperior','centsuperior','dsuperior','esuperior','isuperior','lsuperior','msuperior','nsuperior','osuperior','rsuperior','ssuperior','tsuperior','ff','ffi','ffl','parenleftinferior','parenrightinferior','Circumflexsmall','hyphensuperior','Gravesmall','Asmall','Bsmall','Csmall','Dsmall','Esmall','Fsmall','Gsmall','Hsmall','Ismall','Jsmall','Ksmall','Lsmall','Msmall','Nsmall','Osmall','Psmall','Qsmall','Rsmall','Ssmall','Tsmall','Usmall','Vsmall','Wsmall','Xsmall','Ysmall','Zsmall','colonmonetary','onefitted','rupiah','Tildesmall','exclamdownsmall','centoldstyle','Lslashsmall','Scaronsmall','Zcaronsmall','Dieresissmall','Brevesmall','Caronsmall','Dotaccentsmall','Macronsmall','figuredash','hypheninferior','Ogoneksmall','Ringsmall','Cedillasmall','questiondownsmall','oneeighth','threeeighths','fiveeighths','seveneighths','onethird','twothirds','zerosuperior','foursuperior','fivesuperior','sixsuperior','sevensuperior','eightsuperior','ninesuperior','zeroinferior','oneinferior','twoinferior','threeinferior','fourinferior','fiveinferior','sixinferior','seveninferior','eightinferior','nineinferior','centinferior','dollarinferior','periodinferior','commainferior','Agravesmall','Aacutesmall','Acircumflexsmall','Atildesmall','Adieresissmall','Aringsmall','AEsmall','Ccedillasmall','Egravesmall','Eacutesmall','Ecircumflexsmall','Edieresissmall','Igravesmall','Iacutesmall','Icircumflexsmall','Idieresissmall','Ethsmall','Ntildesmall','Ogravesmall','Oacutesmall','Ocircumflexsmall','Otildesmall','Odieresissmall','OEsmall','Oslashsmall','Ugravesmall','Uacutesmall','Ucircumflexsmall','Udieresissmall','Yacutesmall','Thornsmall','Ydieresissmall','001.000','001.001','001.002','001.003','Black','Bold','Book','Light','Medium','Regular','Roman','Semibold'];var cffStandardEncoding=['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','space','exclam','quotedbl','numbersign','dollar','percent','ampersand','quoteright','parenleft','parenright','asterisk','plus','comma','hyphen','period','slash','zero','one','two','three','four','five','six','seven','eight','nine','colon','semicolon','less','equal','greater','question','at','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','bracketleft','backslash','bracketright','asciicircum','underscore','quoteleft','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','braceleft','bar','braceright','asciitilde','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','exclamdown','cent','sterling','fraction','yen','florin','section','currency','quotesingle','quotedblleft','guillemotleft','guilsinglleft','guilsinglright','fi','fl','','endash','dagger','daggerdbl','periodcentered','','paragraph','bullet','quotesinglbase','quotedblbase','quotedblright','guillemotright','ellipsis','perthousand','','questiondown','','grave','acute','circumflex','tilde','macron','breve','dotaccent','dieresis','','ring','cedilla','','hungarumlaut','ogonek','caron','emdash','','','','','','','','','','','','','','','','','AE','','ordfeminine','','','','','Lslash','Oslash','OE','ordmasculine','','','','','','ae','','','','dotlessi','','','lslash','oslash','oe','germandbls'];var cffExpertEncoding=['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','space','exclamsmall','Hungarumlautsmall','','dollaroldstyle','dollarsuperior','ampersandsmall','Acutesmall','parenleftsuperior','parenrightsuperior','twodotenleader','onedotenleader','comma','hyphen','period','fraction','zerooldstyle','oneoldstyle','twooldstyle','threeoldstyle','fouroldstyle','fiveoldstyle','sixoldstyle','sevenoldstyle','eightoldstyle','nineoldstyle','colon','semicolon','commasuperior','threequartersemdash','periodsuperior','questionsmall','','asuperior','bsuperior','centsuperior','dsuperior','esuperior','','','isuperior','','','lsuperior','msuperior','nsuperior','osuperior','','','rsuperior','ssuperior','tsuperior','','ff','fi','fl','ffi','ffl','parenleftinferior','','parenrightinferior','Circumflexsmall','hyphensuperior','Gravesmall','Asmall','Bsmall','Csmall','Dsmall','Esmall','Fsmall','Gsmall','Hsmall','Ismall','Jsmall','Ksmall','Lsmall','Msmall','Nsmall','Osmall','Psmall','Qsmall','Rsmall','Ssmall','Tsmall','Usmall','Vsmall','Wsmall','Xsmall','Ysmall','Zsmall','colonmonetary','onefitted','rupiah','Tildesmall','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','exclamdownsmall','centoldstyle','Lslashsmall','','','Scaronsmall','Zcaronsmall','Dieresissmall','Brevesmall','Caronsmall','','Dotaccentsmall','','','Macronsmall','','','figuredash','hypheninferior','','','Ogoneksmall','Ringsmall','Cedillasmall','','','','onequarter','onehalf','threequarters','questiondownsmall','oneeighth','threeeighths','fiveeighths','seveneighths','onethird','twothirds','','','zerosuperior','onesuperior','twosuperior','threesuperior','foursuperior','fivesuperior','sixsuperior','sevensuperior','eightsuperior','ninesuperior','zeroinferior','oneinferior','twoinferior','threeinferior','fourinferior','fiveinferior','sixinferior','seveninferior','eightinferior','nineinferior','centinferior','dollarinferior','periodinferior','commainferior','Agravesmall','Aacutesmall','Acircumflexsmall','Atildesmall','Adieresissmall','Aringsmall','AEsmall','Ccedillasmall','Egravesmall','Eacutesmall','Ecircumflexsmall','Edieresissmall','Igravesmall','Iacutesmall','Icircumflexsmall','Idieresissmall','Ethsmall','Ntildesmall','Ogravesmall','Oacutesmall','Ocircumflexsmall','Otildesmall','Odieresissmall','OEsmall','Oslashsmall','Ugravesmall','Uacutesmall','Ucircumflexsmall','Udieresissmall','Yacutesmall','Thornsmall','Ydieresissmall'];var standardNames=['.notdef','.null','nonmarkingreturn','space','exclam','quotedbl','numbersign','dollar','percent','ampersand','quotesingle','parenleft','parenright','asterisk','plus','comma','hyphen','period','slash','zero','one','two','three','four','five','six','seven','eight','nine','colon','semicolon','less','equal','greater','question','at','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','bracketleft','backslash','bracketright','asciicircum','underscore','grave','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','braceleft','bar','braceright','asciitilde','Adieresis','Aring','Ccedilla','Eacute','Ntilde','Odieresis','Udieresis','aacute','agrave','acircumflex','adieresis','atilde','aring','ccedilla','eacute','egrave','ecircumflex','edieresis','iacute','igrave','icircumflex','idieresis','ntilde','oacute','ograve','ocircumflex','odieresis','otilde','uacute','ugrave','ucircumflex','udieresis','dagger','degree','cent','sterling','section','bullet','paragraph','germandbls','registered','copyright','trademark','acute','dieresis','notequal','AE','Oslash','infinity','plusminus','lessequal','greaterequal','yen','mu','partialdiff','summation','product','pi','integral','ordfeminine','ordmasculine','Omega','ae','oslash','questiondown','exclamdown','logicalnot','radical','florin','approxequal','Delta','guillemotleft','guillemotright','ellipsis','nonbreakingspace','Agrave','Atilde','Otilde','OE','oe','endash','emdash','quotedblleft','quotedblright','quoteleft','quoteright','divide','lozenge','ydieresis','Ydieresis','fraction','currency','guilsinglleft','guilsinglright','fi','fl','daggerdbl','periodcentered','quotesinglbase','quotedblbase','perthousand','Acircumflex','Ecircumflex','Aacute','Edieresis','Egrave','Iacute','Icircumflex','Idieresis','Igrave','Oacute','Ocircumflex','apple','Ograve','Uacute','Ucircumflex','Ugrave','dotlessi','circumflex','tilde','macron','breve','dotaccent','ring','cedilla','hungarumlaut','ogonek','caron','Lslash','lslash','Scaron','scaron','Zcaron','zcaron','brokenbar','Eth','eth','Yacute','yacute','Thorn','thorn','minus','multiply','onesuperior','twosuperior','threesuperior','onehalf','onequarter','threequarters','franc','Gbreve','gbreve','Idotaccent','Scedilla','scedilla','Cacute','cacute','Ccaron','ccaron','dcroat'];/**
	 * This is the encoding used for fonts created from scratch.
	 * It loops through all glyphs and finds the appropriate unicode value.
	 * Since it's linear time, other encodings will be faster.
	 * @exports opentype.DefaultEncoding
	 * @class
	 * @constructor
	 * @param {opentype.Font}
	 */function DefaultEncoding(font){this.font=font;}DefaultEncoding.prototype.charToGlyphIndex=function(c){var code=c.charCodeAt(0);var glyphs=this.font.glyphs;if(glyphs){for(var i=0;i<glyphs.length;i+=1){var glyph=glyphs.get(i);for(var j=0;j<glyph.unicodes.length;j+=1){if(glyph.unicodes[j]===code){return i;}}}}return null;};/**
	 * @exports opentype.CmapEncoding
	 * @class
	 * @constructor
	 * @param {Object} cmap - a object with the cmap encoded data
	 */function CmapEncoding(cmap){this.cmap=cmap;}/**
	 * @param  {string} c - the character
	 * @return {number} The glyph index.
	 */CmapEncoding.prototype.charToGlyphIndex=function(c){return this.cmap.glyphIndexMap[c.charCodeAt(0)]||0;};/**
	 * @exports opentype.CffEncoding
	 * @class
	 * @constructor
	 * @param {string} encoding - The encoding
	 * @param {Array} charset - The character set.
	 */function CffEncoding(encoding,charset){this.encoding=encoding;this.charset=charset;}/**
	 * @param  {string} s - The character
	 * @return {number} The index.
	 */CffEncoding.prototype.charToGlyphIndex=function(s){var code=s.charCodeAt(0);var charName=this.encoding[code];return this.charset.indexOf(charName);};/**
	 * @exports opentype.GlyphNames
	 * @class
	 * @constructor
	 * @param {Object} post
	 */function GlyphNames(post){var this$1=this;switch(post.version){case 1:this.names=standardNames.slice();break;case 2:this.names=new Array(post.numberOfGlyphs);for(var i=0;i<post.numberOfGlyphs;i++){if(post.glyphNameIndex[i]<standardNames.length){this$1.names[i]=standardNames[post.glyphNameIndex[i]];}else{this$1.names[i]=post.names[post.glyphNameIndex[i]-standardNames.length];}}break;case 2.5:this.names=new Array(post.numberOfGlyphs);for(var i$1=0;i$1<post.numberOfGlyphs;i$1++){this$1.names[i$1]=standardNames[i$1+post.glyphNameIndex[i$1]];}break;case 3:this.names=[];break;default:this.names=[];break;}}/**
	 * Gets the index of a glyph by name.
	 * @param  {string} name - The glyph name
	 * @return {number} The index
	 */GlyphNames.prototype.nameToGlyphIndex=function(name){return this.names.indexOf(name);};/**
	 * @param  {number} gid
	 * @return {string}
	 */GlyphNames.prototype.glyphIndexToName=function(gid){return this.names[gid];};/**
	 * @alias opentype.addGlyphNames
	 * @param {opentype.Font}
	 */function addGlyphNames(font){var glyph;var glyphIndexMap=font.tables.cmap.glyphIndexMap;var charCodes=(0,_keys2.default)(glyphIndexMap);for(var i=0;i<charCodes.length;i+=1){var c=charCodes[i];var glyphIndex=glyphIndexMap[c];glyph=font.glyphs.get(glyphIndex);glyph.addUnicode(parseInt(c));}for(var i$1=0;i$1<font.glyphs.length;i$1+=1){glyph=font.glyphs.get(i$1);if(font.cffEncoding){if(font.isCIDFont){glyph.name='gid'+i$1;}else{glyph.name=font.cffEncoding.charset[i$1];}}else if(font.glyphNames.names){glyph.name=font.glyphNames.glyphIndexToName(i$1);}}}// Drawing utility functions.
// Draw a line on the given context from point `x1,y1` to point `x2,y2`.
function line(ctx,x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}var draw={line:line};// The `glyf` table describes the glyphs in TrueType outline format.
// http://www.microsoft.com/typography/otspec/glyf.htm
// Parse the coordinate data for a glyph.
function parseGlyphCoordinate(p,flag,previousValue,shortVectorBitMask,sameBitMask){var v;if((flag&shortVectorBitMask)>0){// The coordinate is 1 byte long.
v=p.parseByte();// The `same` bit is re-used for short values to signify the sign of the value.
if((flag&sameBitMask)===0){v=-v;}v=previousValue+v;}else{//  The coordinate is 2 bytes long.
// If the `same` bit is set, the coordinate is the same as the previous coordinate.
if((flag&sameBitMask)>0){v=previousValue;}else{// Parse the coordinate as a signed 16-bit delta value.
v=previousValue+p.parseShort();}}return v;}// Parse a TrueType glyph.
function parseGlyph(glyph,data,start){var p=new parse.Parser(data,start);glyph.numberOfContours=p.parseShort();glyph._xMin=p.parseShort();glyph._yMin=p.parseShort();glyph._xMax=p.parseShort();glyph._yMax=p.parseShort();var flags;var flag;if(glyph.numberOfContours>0){// This glyph is not a composite.
var endPointIndices=glyph.endPointIndices=[];for(var i=0;i<glyph.numberOfContours;i+=1){endPointIndices.push(p.parseUShort());}glyph.instructionLength=p.parseUShort();glyph.instructions=[];for(var i$1=0;i$1<glyph.instructionLength;i$1+=1){glyph.instructions.push(p.parseByte());}var numberOfCoordinates=endPointIndices[endPointIndices.length-1]+1;flags=[];for(var i$2=0;i$2<numberOfCoordinates;i$2+=1){flag=p.parseByte();flags.push(flag);// If bit 3 is set, we repeat this flag n times, where n is the next byte.
if((flag&8)>0){var repeatCount=p.parseByte();for(var j=0;j<repeatCount;j+=1){flags.push(flag);i$2+=1;}}}check.argument(flags.length===numberOfCoordinates,'Bad flags.');if(endPointIndices.length>0){var points=[];var point;// X/Y coordinates are relative to the previous point, except for the first point which is relative to 0,0.
if(numberOfCoordinates>0){for(var i$3=0;i$3<numberOfCoordinates;i$3+=1){flag=flags[i$3];point={};point.onCurve=!!(flag&1);point.lastPointOfContour=endPointIndices.indexOf(i$3)>=0;points.push(point);}var px=0;for(var i$4=0;i$4<numberOfCoordinates;i$4+=1){flag=flags[i$4];point=points[i$4];point.x=parseGlyphCoordinate(p,flag,px,2,16);px=point.x;}var py=0;for(var i$5=0;i$5<numberOfCoordinates;i$5+=1){flag=flags[i$5];point=points[i$5];point.y=parseGlyphCoordinate(p,flag,py,4,32);py=point.y;}}glyph.points=points;}else{glyph.points=[];}}else if(glyph.numberOfContours===0){glyph.points=[];}else{glyph.isComposite=true;glyph.points=[];glyph.components=[];var moreComponents=true;while(moreComponents){flags=p.parseUShort();var component={glyphIndex:p.parseUShort(),xScale:1,scale01:0,scale10:0,yScale:1,dx:0,dy:0};if((flags&1)>0){// The arguments are words
if((flags&2)>0){// values are offset
component.dx=p.parseShort();component.dy=p.parseShort();}else{// values are matched points
component.matchedPoints=[p.parseUShort(),p.parseUShort()];}}else{// The arguments are bytes
if((flags&2)>0){// values are offset
component.dx=p.parseChar();component.dy=p.parseChar();}else{// values are matched points
component.matchedPoints=[p.parseByte(),p.parseByte()];}}if((flags&8)>0){// We have a scale
component.xScale=component.yScale=p.parseF2Dot14();}else if((flags&64)>0){// We have an X / Y scale
component.xScale=p.parseF2Dot14();component.yScale=p.parseF2Dot14();}else if((flags&128)>0){// We have a 2x2 transformation
component.xScale=p.parseF2Dot14();component.scale01=p.parseF2Dot14();component.scale10=p.parseF2Dot14();component.yScale=p.parseF2Dot14();}glyph.components.push(component);moreComponents=!!(flags&32);}if(flags&0x100){// We have instructions
glyph.instructionLength=p.parseUShort();glyph.instructions=[];for(var i$6=0;i$6<glyph.instructionLength;i$6+=1){glyph.instructions.push(p.parseByte());}}}}// Transform an array of points and return a new array.
function transformPoints(points,transform){var newPoints=[];for(var i=0;i<points.length;i+=1){var pt=points[i];var newPt={x:transform.xScale*pt.x+transform.scale01*pt.y+transform.dx,y:transform.scale10*pt.x+transform.yScale*pt.y+transform.dy,onCurve:pt.onCurve,lastPointOfContour:pt.lastPointOfContour};newPoints.push(newPt);}return newPoints;}function getContours(points){var contours=[];var currentContour=[];for(var i=0;i<points.length;i+=1){var pt=points[i];currentContour.push(pt);if(pt.lastPointOfContour){contours.push(currentContour);currentContour=[];}}check.argument(currentContour.length===0,'There are still points left in the current contour.');return contours;}// Convert the TrueType glyph outline to a Path.
function getPath(points){var p=new Path();if(!points){return p;}var contours=getContours(points);for(var contourIndex=0;contourIndex<contours.length;++contourIndex){var contour=contours[contourIndex];var prev=null;var curr=contour[contour.length-1];var next=contour[0];if(curr.onCurve){p.moveTo(curr.x,curr.y);}else{if(next.onCurve){p.moveTo(next.x,next.y);}else{// If both first and last points are off-curve, start at their middle.
var start={x:(curr.x+next.x)*0.5,y:(curr.y+next.y)*0.5};p.moveTo(start.x,start.y);}}for(var i=0;i<contour.length;++i){prev=curr;curr=next;next=contour[(i+1)%contour.length];if(curr.onCurve){// This is a straight line.
p.lineTo(curr.x,curr.y);}else{var prev2=prev;var next2=next;if(!prev.onCurve){prev2={x:(curr.x+prev.x)*0.5,y:(curr.y+prev.y)*0.5};p.lineTo(prev2.x,prev2.y);}if(!next.onCurve){next2={x:(curr.x+next.x)*0.5,y:(curr.y+next.y)*0.5};}p.lineTo(prev2.x,prev2.y);p.quadraticCurveTo(curr.x,curr.y,next2.x,next2.y);}}p.closePath();}return p;}function buildPath(glyphs,glyph){if(glyph.isComposite){for(var j=0;j<glyph.components.length;j+=1){var component=glyph.components[j];var componentGlyph=glyphs.get(component.glyphIndex);// Force the ttfGlyphLoader to parse the glyph.
componentGlyph.getPath();if(componentGlyph.points){var transformedPoints=void 0;if(component.matchedPoints===undefined){// component positioned by offset
transformedPoints=transformPoints(componentGlyph.points,component);}else{// component positioned by matched points
if(component.matchedPoints[0]>glyph.points.length-1||component.matchedPoints[1]>componentGlyph.points.length-1){throw Error('Matched points out of range in '+glyph.name);}var firstPt=glyph.points[component.matchedPoints[0]];var secondPt=componentGlyph.points[component.matchedPoints[1]];var transform={xScale:component.xScale,scale01:component.scale01,scale10:component.scale10,yScale:component.yScale,dx:0,dy:0};secondPt=transformPoints([secondPt],transform)[0];transform.dx=firstPt.x-secondPt.x;transform.dy=firstPt.y-secondPt.y;transformedPoints=transformPoints(componentGlyph.points,transform);}glyph.points=glyph.points.concat(transformedPoints);}}}return getPath(glyph.points);}// Parse all the glyphs according to the offsets from the `loca` table.
function parseGlyfTable(data,start,loca,font){var glyphs=new glyphset.GlyphSet(font);// The last element of the loca table is invalid.
for(var i=0;i<loca.length-1;i+=1){var offset=loca[i];var nextOffset=loca[i+1];if(offset!==nextOffset){glyphs.push(i,glyphset.ttfGlyphLoader(font,i,parseGlyph,data,start+offset,buildPath));}else{glyphs.push(i,glyphset.glyphLoader(font,i));}}return glyphs;}var glyf={getPath:getPath,parse:parseGlyfTable};// The Glyph object
function getPathDefinition(glyph,path){var _path=path||{commands:[]};return{configurable:true,get:function get(){if(typeof _path==='function'){_path=_path();}return _path;},set:function set(p){_path=p;}};}/**
	 * @typedef GlyphOptions
	 * @type Object
	 * @property {string} [name] - The glyph name
	 * @property {number} [unicode]
	 * @property {Array} [unicodes]
	 * @property {number} [xMin]
	 * @property {number} [yMin]
	 * @property {number} [xMax]
	 * @property {number} [yMax]
	 * @property {number} [advanceWidth]
	 */// A Glyph is an individual mark that often corresponds to a character.
// Some glyphs, such as ligatures, are a combination of many characters.
// Glyphs are the basic building blocks of a font.
//
// The `Glyph` class contains utility methods for drawing the path and its points.
/**
	 * @exports opentype.Glyph
	 * @class
	 * @param {GlyphOptions}
	 * @constructor
	 */function Glyph(options){// By putting all the code on a prototype function (which is only declared once)
// we reduce the memory requirements for larger fonts by some 2%
this.bindConstructorValues(options);}/**
	 * @param  {GlyphOptions}
	 */Glyph.prototype.bindConstructorValues=function(options){this.index=options.index||0;// These three values cannot be deferred for memory optimization:
this.name=options.name||null;this.unicode=options.unicode||undefined;this.unicodes=options.unicodes||options.unicode!==undefined?[options.unicode]:[];// But by binding these values only when necessary, we reduce can
// the memory requirements by almost 3% for larger fonts.
if(options.xMin){this.xMin=options.xMin;}if(options.yMin){this.yMin=options.yMin;}if(options.xMax){this.xMax=options.xMax;}if(options.yMax){this.yMax=options.yMax;}if(options.advanceWidth){this.advanceWidth=options.advanceWidth;}// The path for a glyph is the most memory intensive, and is bound as a value
// with a getter/setter to ensure we actually do path parsing only once the
// path is actually needed by anything.
Object.defineProperty(this,'path',getPathDefinition(this,options.path));};/**
	 * @param {number}
	 */Glyph.prototype.addUnicode=function(unicode){if(this.unicodes.length===0){this.unicode=unicode;}this.unicodes.push(unicode);};/**
	 * Calculate the minimum bounding box for this glyph.
	 * @return {opentype.BoundingBox}
	 */Glyph.prototype.getBoundingBox=function(){return this.path.getBoundingBox();};/**
	 * Convert the glyph to a Path we can draw on a drawing context.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {Object=} options - xScale, yScale to stretch the glyph.
	 * @param  {opentype.Font} if hinting is to be used, the font
	 * @return {opentype.Path}
	 */Glyph.prototype.getPath=function(x,y,fontSize,options,font){x=x!==undefined?x:0;y=y!==undefined?y:0;fontSize=fontSize!==undefined?fontSize:72;var commands;var hPoints;if(!options){options={};}var xScale=options.xScale;var yScale=options.yScale;if(options.hinting&&font&&font.hinting){// in case of hinting, the hinting engine takes care
// of scaling the points (not the path) before hinting.
hPoints=this.path&&font.hinting.exec(this,fontSize);// in case the hinting engine failed hPoints is undefined
// and thus reverts to plain rending
}if(hPoints){commands=glyf.getPath(hPoints).commands;x=Math.round(x);y=Math.round(y);// TODO in case of hinting xyScaling is not yet supported
xScale=yScale=1;}else{commands=this.path.commands;var scale=1/this.path.unitsPerEm*fontSize;if(xScale===undefined){xScale=scale;}if(yScale===undefined){yScale=scale;}}var p=new Path();for(var i=0;i<commands.length;i+=1){var cmd=commands[i];if(cmd.type==='M'){p.moveTo(x+cmd.x*xScale,y+-cmd.y*yScale);}else if(cmd.type==='L'){p.lineTo(x+cmd.x*xScale,y+-cmd.y*yScale);}else if(cmd.type==='Q'){p.quadraticCurveTo(x+cmd.x1*xScale,y+-cmd.y1*yScale,x+cmd.x*xScale,y+-cmd.y*yScale);}else if(cmd.type==='C'){p.curveTo(x+cmd.x1*xScale,y+-cmd.y1*yScale,x+cmd.x2*xScale,y+-cmd.y2*yScale,x+cmd.x*xScale,y+-cmd.y*yScale);}else if(cmd.type==='Z'){p.closePath();}}return p;};/**
	 * Split the glyph into contours.
	 * This function is here for backwards compatibility, and to
	 * provide raw access to the TrueType glyph outlines.
	 * @return {Array}
	 */Glyph.prototype.getContours=function(){var this$1=this;if(this.points===undefined){return[];}var contours=[];var currentContour=[];for(var i=0;i<this.points.length;i+=1){var pt=this$1.points[i];currentContour.push(pt);if(pt.lastPointOfContour){contours.push(currentContour);currentContour=[];}}check.argument(currentContour.length===0,'There are still points left in the current contour.');return contours;};/**
	 * Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
	 * @return {Object}
	 */Glyph.prototype.getMetrics=function(){var commands=this.path.commands;var xCoords=[];var yCoords=[];for(var i=0;i<commands.length;i+=1){var cmd=commands[i];if(cmd.type!=='Z'){xCoords.push(cmd.x);yCoords.push(cmd.y);}if(cmd.type==='Q'||cmd.type==='C'){xCoords.push(cmd.x1);yCoords.push(cmd.y1);}if(cmd.type==='C'){xCoords.push(cmd.x2);yCoords.push(cmd.y2);}}var metrics={xMin:Math.min.apply(null,xCoords),yMin:Math.min.apply(null,yCoords),xMax:Math.max.apply(null,xCoords),yMax:Math.max.apply(null,yCoords),leftSideBearing:this.leftSideBearing};if(!isFinite(metrics.xMin)){metrics.xMin=0;}if(!isFinite(metrics.xMax)){metrics.xMax=this.advanceWidth;}if(!isFinite(metrics.yMin)){metrics.yMin=0;}if(!isFinite(metrics.yMax)){metrics.yMax=0;}metrics.rightSideBearing=this.advanceWidth-metrics.leftSideBearing-(metrics.xMax-metrics.xMin);return metrics;};/**
	 * Draw the glyph on the given context.
	 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {Object=} options - xScale, yScale to stretch the glyph.
	 */Glyph.prototype.draw=function(ctx,x,y,fontSize,options){this.getPath(x,y,fontSize,options).draw(ctx);};/**
	 * Draw the points of the glyph.
	 * On-curve points will be drawn in blue, off-curve points will be drawn in red.
	 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 */Glyph.prototype.drawPoints=function(ctx,x,y,fontSize){function drawCircles(l,x,y,scale){var PI_SQ=Math.PI*2;ctx.beginPath();for(var j=0;j<l.length;j+=1){ctx.moveTo(x+l[j].x*scale,y+l[j].y*scale);ctx.arc(x+l[j].x*scale,y+l[j].y*scale,2,0,PI_SQ,false);}ctx.closePath();ctx.fill();}x=x!==undefined?x:0;y=y!==undefined?y:0;fontSize=fontSize!==undefined?fontSize:24;var scale=1/this.path.unitsPerEm*fontSize;var blueCircles=[];var redCircles=[];var path=this.path;for(var i=0;i<path.commands.length;i+=1){var cmd=path.commands[i];if(cmd.x!==undefined){blueCircles.push({x:cmd.x,y:-cmd.y});}if(cmd.x1!==undefined){redCircles.push({x:cmd.x1,y:-cmd.y1});}if(cmd.x2!==undefined){redCircles.push({x:cmd.x2,y:-cmd.y2});}}ctx.fillStyle='blue';drawCircles(blueCircles,x,y,scale);ctx.fillStyle='red';drawCircles(redCircles,x,y,scale);};/**
	 * Draw lines indicating important font measurements.
	 * Black lines indicate the origin of the coordinate system (point 0,0).
	 * Blue lines indicate the glyph bounding box.
	 * Green line indicates the advance width of the glyph.
	 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 */Glyph.prototype.drawMetrics=function(ctx,x,y,fontSize){var scale;x=x!==undefined?x:0;y=y!==undefined?y:0;fontSize=fontSize!==undefined?fontSize:24;scale=1/this.path.unitsPerEm*fontSize;ctx.lineWidth=1;// Draw the origin
ctx.strokeStyle='black';draw.line(ctx,x,-10000,x,10000);draw.line(ctx,-10000,y,10000,y);// This code is here due to memory optimization: by not using
// defaults in the constructor, we save a notable amount of memory.
var xMin=this.xMin||0;var yMin=this.yMin||0;var xMax=this.xMax||0;var yMax=this.yMax||0;var advanceWidth=this.advanceWidth||0;// Draw the glyph box
ctx.strokeStyle='blue';draw.line(ctx,x+xMin*scale,-10000,x+xMin*scale,10000);draw.line(ctx,x+xMax*scale,-10000,x+xMax*scale,10000);draw.line(ctx,-10000,y+-yMin*scale,10000,y+-yMin*scale);draw.line(ctx,-10000,y+-yMax*scale,10000,y+-yMax*scale);// Draw the advance width
ctx.strokeStyle='green';draw.line(ctx,x+advanceWidth*scale,-10000,x+advanceWidth*scale,10000);};// The GlyphSet object
// Define a property on the glyph that depends on the path being loaded.
function defineDependentProperty(glyph,externalName,internalName){(0,_defineProperty2.default)(glyph,externalName,{get:function get(){// Request the path property to make sure the path is loaded.
glyph.path;// jshint ignore:line
return glyph[internalName];},set:function set(newValue){glyph[internalName]=newValue;},enumerable:true,configurable:true});}/**
	 * A GlyphSet represents all glyphs available in the font, but modelled using
	 * a deferred glyph loader, for retrieving glyphs only once they are absolutely
	 * necessary, to keep the memory footprint down.
	 * @exports opentype.GlyphSet
	 * @class
	 * @param {opentype.Font}
	 * @param {Array}
	 */function GlyphSet(font,glyphs){var this$1=this;this.font=font;this.glyphs={};if(Array.isArray(glyphs)){for(var i=0;i<glyphs.length;i++){this$1.glyphs[i]=glyphs[i];}}this.length=glyphs&&glyphs.length||0;}/**
	 * @param  {number} index
	 * @return {opentype.Glyph}
	 */GlyphSet.prototype.get=function(index){if(typeof this.glyphs[index]==='function'){this.glyphs[index]=this.glyphs[index]();}return this.glyphs[index];};/**
	 * @param  {number} index
	 * @param  {Object}
	 */GlyphSet.prototype.push=function(index,loader){this.glyphs[index]=loader;this.length++;};/**
	 * @alias opentype.glyphLoader
	 * @param  {opentype.Font} font
	 * @param  {number} index
	 * @return {opentype.Glyph}
	 */function glyphLoader(font,index){return new Glyph({index:index,font:font});}/**
	 * Generate a stub glyph that can be filled with all metadata *except*
	 * the "points" and "path" properties, which must be loaded only once
	 * the glyph's path is actually requested for text shaping.
	 * @alias opentype.ttfGlyphLoader
	 * @param  {opentype.Font} font
	 * @param  {number} index
	 * @param  {Function} parseGlyph
	 * @param  {Object} data
	 * @param  {number} position
	 * @param  {Function} buildPath
	 * @return {opentype.Glyph}
	 */function ttfGlyphLoader(font,index,parseGlyph,data,position,buildPath){return function(){var glyph=new Glyph({index:index,font:font});glyph.path=function(){parseGlyph(glyph,data,position);var path=buildPath(font.glyphs,glyph);path.unitsPerEm=font.unitsPerEm;return path;};defineDependentProperty(glyph,'xMin','_xMin');defineDependentProperty(glyph,'xMax','_xMax');defineDependentProperty(glyph,'yMin','_yMin');defineDependentProperty(glyph,'yMax','_yMax');return glyph;};}/**
	 * @alias opentype.cffGlyphLoader
	 * @param  {opentype.Font} font
	 * @param  {number} index
	 * @param  {Function} parseCFFCharstring
	 * @param  {string} charstring
	 * @return {opentype.Glyph}
	 */function cffGlyphLoader(font,index,parseCFFCharstring,charstring){return function(){var glyph=new Glyph({index:index,font:font});glyph.path=function(){var path=parseCFFCharstring(font,glyph,charstring);path.unitsPerEm=font.unitsPerEm;return path;};return glyph;};}var glyphset={GlyphSet:GlyphSet,glyphLoader:glyphLoader,ttfGlyphLoader:ttfGlyphLoader,cffGlyphLoader:cffGlyphLoader};// The `CFF` table contains the glyph outlines in PostScript format.
// https://www.microsoft.com/typography/OTSPEC/cff.htm
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/cff.pdf
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/type2.pdf
// Custom equals function that can also check lists.
function equals(a,b){if(a===b){return true;}else if(Array.isArray(a)&&Array.isArray(b)){if(a.length!==b.length){return false;}for(var i=0;i<a.length;i+=1){if(!equals(a[i],b[i])){return false;}}return true;}else{return false;}}// Subroutines are encoded using the negative half of the number space.
// See type 2 chapter 4.7 "Subroutine operators".
function calcCFFSubroutineBias(subrs){var bias;if(subrs.length<1240){bias=107;}else if(subrs.length<33900){bias=1131;}else{bias=32768;}return bias;}// Parse a `CFF` INDEX array.
// An index array consists of a list of offsets, then a list of objects at those offsets.
function parseCFFIndex(data,start,conversionFn){var offsets=[];var objects=[];var count=parse.getCard16(data,start);var objectOffset;var endOffset;if(count!==0){var offsetSize=parse.getByte(data,start+2);objectOffset=start+(count+1)*offsetSize+2;var pos=start+3;for(var i=0;i<count+1;i+=1){offsets.push(parse.getOffset(data,pos,offsetSize));pos+=offsetSize;}// The total size of the index array is 4 header bytes + the value of the last offset.
endOffset=objectOffset+offsets[count];}else{endOffset=start+2;}for(var i$1=0;i$1<offsets.length-1;i$1+=1){var value=parse.getBytes(data,objectOffset+offsets[i$1],objectOffset+offsets[i$1+1]);if(conversionFn){value=conversionFn(value);}objects.push(value);}return{objects:objects,startOffset:start,endOffset:endOffset};}// Parse a `CFF` DICT real value.
function parseFloatOperand(parser){var s='';var eof=15;var lookup=['0','1','2','3','4','5','6','7','8','9','.','E','E-',null,'-'];while(true){var b=parser.parseByte();var n1=b>>4;var n2=b&15;if(n1===eof){break;}s+=lookup[n1];if(n2===eof){break;}s+=lookup[n2];}return parseFloat(s);}// Parse a `CFF` DICT operand.
function parseOperand(parser,b0){var b1;var b2;var b3;var b4;if(b0===28){b1=parser.parseByte();b2=parser.parseByte();return b1<<8|b2;}if(b0===29){b1=parser.parseByte();b2=parser.parseByte();b3=parser.parseByte();b4=parser.parseByte();return b1<<24|b2<<16|b3<<8|b4;}if(b0===30){return parseFloatOperand(parser);}if(b0>=32&&b0<=246){return b0-139;}if(b0>=247&&b0<=250){b1=parser.parseByte();return(b0-247)*256+b1+108;}if(b0>=251&&b0<=254){b1=parser.parseByte();return-(b0-251)*256-b1-108;}throw new Error('Invalid b0 '+b0);}// Convert the entries returned by `parseDict` to a proper dictionary.
// If a value is a list of one, it is unpacked.
function entriesToObject(entries){var o={};for(var i=0;i<entries.length;i+=1){var key=entries[i][0];var values=entries[i][1];var value=void 0;if(values.length===1){value=values[0];}else{value=values;}if(o.hasOwnProperty(key)&&!isNaN(o[key])){throw new Error('Object '+o+' already has key '+key);}o[key]=value;}return o;}// Parse a `CFF` DICT object.
// A dictionary contains key-value pairs in a compact tokenized format.
function parseCFFDict(data,start,size){start=start!==undefined?start:0;var parser=new parse.Parser(data,start);var entries=[];var operands=[];size=size!==undefined?size:data.length;while(parser.relativeOffset<size){var op=parser.parseByte();// The first byte for each dict item distinguishes between operator (key) and operand (value).
// Values <= 21 are operators.
if(op<=21){// Two-byte operators have an initial escape byte of 12.
if(op===12){op=1200+parser.parseByte();}entries.push([op,operands]);operands=[];}else{// Since the operands (values) come before the operators (keys), we store all operands in a list
// until we encounter an operator.
operands.push(parseOperand(parser,op));}}return entriesToObject(entries);}// Given a String Index (SID), return the value of the string.
// Strings below index 392 are standard CFF strings and are not encoded in the font.
function getCFFString(strings,index){if(index<=390){index=cffStandardStrings[index];}else{index=strings[index-391];}return index;}// Interpret a dictionary and return a new dictionary with readable keys and values for missing entries.
// This function takes `meta` which is a list of objects containing `operand`, `name` and `default`.
function interpretDict(dict,meta,strings){var newDict={};var value;// Because we also want to include missing values, we start out from the meta list
// and lookup values in the dict.
for(var i=0;i<meta.length;i+=1){var m=meta[i];if(Array.isArray(m.type)){var values=[];values.length=m.type.length;for(var j=0;j<m.type.length;j++){value=dict[m.op]!==undefined?dict[m.op][j]:undefined;if(value===undefined){value=m.value!==undefined&&m.value[j]!==undefined?m.value[j]:null;}if(m.type[j]==='SID'){value=getCFFString(strings,value);}values[j]=value;}newDict[m.name]=values;}else{value=dict[m.op];if(value===undefined){value=m.value!==undefined?m.value:null;}if(m.type==='SID'){value=getCFFString(strings,value);}newDict[m.name]=value;}}return newDict;}// Parse the CFF header.
function parseCFFHeader(data,start){var header={};header.formatMajor=parse.getCard8(data,start);header.formatMinor=parse.getCard8(data,start+1);header.size=parse.getCard8(data,start+2);header.offsetSize=parse.getCard8(data,start+3);header.startOffset=start;header.endOffset=start+4;return header;}var TOP_DICT_META=[{name:'version',op:0,type:'SID'},{name:'notice',op:1,type:'SID'},{name:'copyright',op:1200,type:'SID'},{name:'fullName',op:2,type:'SID'},{name:'familyName',op:3,type:'SID'},{name:'weight',op:4,type:'SID'},{name:'isFixedPitch',op:1201,type:'number',value:0},{name:'italicAngle',op:1202,type:'number',value:0},{name:'underlinePosition',op:1203,type:'number',value:-100},{name:'underlineThickness',op:1204,type:'number',value:50},{name:'paintType',op:1205,type:'number',value:0},{name:'charstringType',op:1206,type:'number',value:2},{name:'fontMatrix',op:1207,type:['real','real','real','real','real','real'],value:[0.001,0,0,0.001,0,0]},{name:'uniqueId',op:13,type:'number'},{name:'fontBBox',op:5,type:['number','number','number','number'],value:[0,0,0,0]},{name:'strokeWidth',op:1208,type:'number',value:0},{name:'xuid',op:14,type:[],value:null},{name:'charset',op:15,type:'offset',value:0},{name:'encoding',op:16,type:'offset',value:0},{name:'charStrings',op:17,type:'offset',value:0},{name:'private',op:18,type:['number','offset'],value:[0,0]},{name:'ros',op:1230,type:['SID','SID','number']},{name:'cidFontVersion',op:1231,type:'number',value:0},{name:'cidFontRevision',op:1232,type:'number',value:0},{name:'cidFontType',op:1233,type:'number',value:0},{name:'cidCount',op:1234,type:'number',value:8720},{name:'uidBase',op:1235,type:'number'},{name:'fdArray',op:1236,type:'offset'},{name:'fdSelect',op:1237,type:'offset'},{name:'fontName',op:1238,type:'SID'}];var PRIVATE_DICT_META=[{name:'subrs',op:19,type:'offset',value:0},{name:'defaultWidthX',op:20,type:'number',value:0},{name:'nominalWidthX',op:21,type:'number',value:0}];// Parse the CFF top dictionary. A CFF table can contain multiple fonts, each with their own top dictionary.
// The top dictionary contains the essential metadata for the font, together with the private dictionary.
function parseCFFTopDict(data,strings){var dict=parseCFFDict(data,0,data.byteLength);return interpretDict(dict,TOP_DICT_META,strings);}// Parse the CFF private dictionary. We don't fully parse out all the values, only the ones we need.
function parseCFFPrivateDict(data,start,size,strings){var dict=parseCFFDict(data,start,size);return interpretDict(dict,PRIVATE_DICT_META,strings);}// Returns a list of "Top DICT"s found using an INDEX list.
// Used to read both the usual high-level Top DICTs and also the FDArray
// discovered inside CID-keyed fonts.  When a Top DICT has a reference to
// a Private DICT that is read and saved into the Top DICT.
//
// In addition to the expected/optional values as outlined in TOP_DICT_META
// the following values might be saved into the Top DICT.
//
//    _subrs []        array of local CFF subroutines from Private DICT
//    _subrsBias       bias value computed from number of subroutines
//                      (see calcCFFSubroutineBias() and parseCFFCharstring())
//    _defaultWidthX   default widths for CFF characters
//    _nominalWidthX   bias added to width embedded within glyph description
//
//    _privateDict     saved copy of parsed Private DICT from Top DICT
function gatherCFFTopDicts(data,start,cffIndex,strings){var topDictArray=[];for(var iTopDict=0;iTopDict<cffIndex.length;iTopDict+=1){var topDictData=new DataView(new Uint8Array(cffIndex[iTopDict]).buffer);var topDict=parseCFFTopDict(topDictData,strings);topDict._subrs=[];topDict._subrsBias=0;var privateSize=topDict.private[0];var privateOffset=topDict.private[1];if(privateSize!==0&&privateOffset!==0){var privateDict=parseCFFPrivateDict(data,privateOffset+start,privateSize,strings);topDict._defaultWidthX=privateDict.defaultWidthX;topDict._nominalWidthX=privateDict.nominalWidthX;if(privateDict.subrs!==0){var subrOffset=privateOffset+privateDict.subrs;var subrIndex=parseCFFIndex(data,subrOffset+start);topDict._subrs=subrIndex.objects;topDict._subrsBias=calcCFFSubroutineBias(topDict._subrs);}topDict._privateDict=privateDict;}topDictArray.push(topDict);}return topDictArray;}// Parse the CFF charset table, which contains internal names for all the glyphs.
// This function will return a list of glyph names.
// See Adobe TN #5176 chapter 13, "Charsets".
function parseCFFCharset(data,start,nGlyphs,strings){var sid;var count;var parser=new parse.Parser(data,start);// The .notdef glyph is not included, so subtract 1.
nGlyphs-=1;var charset=['.notdef'];var format=parser.parseCard8();if(format===0){for(var i=0;i<nGlyphs;i+=1){sid=parser.parseSID();charset.push(getCFFString(strings,sid));}}else if(format===1){while(charset.length<=nGlyphs){sid=parser.parseSID();count=parser.parseCard8();for(var i$1=0;i$1<=count;i$1+=1){charset.push(getCFFString(strings,sid));sid+=1;}}}else if(format===2){while(charset.length<=nGlyphs){sid=parser.parseSID();count=parser.parseCard16();for(var i$2=0;i$2<=count;i$2+=1){charset.push(getCFFString(strings,sid));sid+=1;}}}else{throw new Error('Unknown charset format '+format);}return charset;}// Parse the CFF encoding data. Only one encoding can be specified per font.
// See Adobe TN #5176 chapter 12, "Encodings".
function parseCFFEncoding(data,start,charset){var code;var enc={};var parser=new parse.Parser(data,start);var format=parser.parseCard8();if(format===0){var nCodes=parser.parseCard8();for(var i=0;i<nCodes;i+=1){code=parser.parseCard8();enc[code]=i;}}else if(format===1){var nRanges=parser.parseCard8();code=1;for(var i$1=0;i$1<nRanges;i$1+=1){var first=parser.parseCard8();var nLeft=parser.parseCard8();for(var j=first;j<=first+nLeft;j+=1){enc[j]=code;code+=1;}}}else{throw new Error('Unknown encoding format '+format);}return new CffEncoding(enc,charset);}// Take in charstring code and return a Glyph object.
// The encoding is described in the Type 2 Charstring Format
// https://www.microsoft.com/typography/OTSPEC/charstr2.htm
function parseCFFCharstring(font,glyph,code){var c1x;var c1y;var c2x;var c2y;var p=new Path();var stack=[];var nStems=0;var haveWidth=false;var open=false;var x=0;var y=0;var subrs;var subrsBias;var defaultWidthX;var nominalWidthX;if(font.isCIDFont){var fdIndex=font.tables.cff.topDict._fdSelect[glyph.index];var fdDict=font.tables.cff.topDict._fdArray[fdIndex];subrs=fdDict._subrs;subrsBias=fdDict._subrsBias;defaultWidthX=fdDict._defaultWidthX;nominalWidthX=fdDict._nominalWidthX;}else{subrs=font.tables.cff.topDict._subrs;subrsBias=font.tables.cff.topDict._subrsBias;defaultWidthX=font.tables.cff.topDict._defaultWidthX;nominalWidthX=font.tables.cff.topDict._nominalWidthX;}var width=defaultWidthX;function newContour(x,y){if(open){p.closePath();}p.moveTo(x,y);open=true;}function parseStems(){var hasWidthArg;// The number of stem operators on the stack is always even.
// If the value is uneven, that means a width is specified.
hasWidthArg=stack.length%2!==0;if(hasWidthArg&&!haveWidth){width=stack.shift()+nominalWidthX;}nStems+=stack.length>>1;stack.length=0;haveWidth=true;}function parse$$1(code){var b1;var b2;var b3;var b4;var codeIndex;var subrCode;var jpx;var jpy;var c3x;var c3y;var c4x;var c4y;var i=0;while(i<code.length){var v=code[i];i+=1;switch(v){case 1:// hstem
parseStems();break;case 3:// vstem
parseStems();break;case 4:// vmoveto
if(stack.length>1&&!haveWidth){width=stack.shift()+nominalWidthX;haveWidth=true;}y+=stack.pop();newContour(x,y);break;case 5:// rlineto
while(stack.length>0){x+=stack.shift();y+=stack.shift();p.lineTo(x,y);}break;case 6:// hlineto
while(stack.length>0){x+=stack.shift();p.lineTo(x,y);if(stack.length===0){break;}y+=stack.shift();p.lineTo(x,y);}break;case 7:// vlineto
while(stack.length>0){y+=stack.shift();p.lineTo(x,y);if(stack.length===0){break;}x+=stack.shift();p.lineTo(x,y);}break;case 8:// rrcurveto
while(stack.length>0){c1x=x+stack.shift();c1y=y+stack.shift();c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x+stack.shift();y=c2y+stack.shift();p.curveTo(c1x,c1y,c2x,c2y,x,y);}break;case 10:// callsubr
codeIndex=stack.pop()+subrsBias;subrCode=subrs[codeIndex];if(subrCode){parse$$1(subrCode);}break;case 11:// return
return;case 12:// flex operators
v=code[i];i+=1;switch(v){case 35:// flex
// |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 dx6 dy6 fd flex (12 35) |-
c1x=x+stack.shift();// dx1
c1y=y+stack.shift();// dy1
c2x=c1x+stack.shift();// dx2
c2y=c1y+stack.shift();// dy2
jpx=c2x+stack.shift();// dx3
jpy=c2y+stack.shift();// dy3
c3x=jpx+stack.shift();// dx4
c3y=jpy+stack.shift();// dy4
c4x=c3x+stack.shift();// dx5
c4y=c3y+stack.shift();// dy5
x=c4x+stack.shift();// dx6
y=c4y+stack.shift();// dy6
stack.shift();// flex depth
p.curveTo(c1x,c1y,c2x,c2y,jpx,jpy);p.curveTo(c3x,c3y,c4x,c4y,x,y);break;case 34:// hflex
// |- dx1 dx2 dy2 dx3 dx4 dx5 dx6 hflex (12 34) |-
c1x=x+stack.shift();// dx1
c1y=y;// dy1
c2x=c1x+stack.shift();// dx2
c2y=c1y+stack.shift();// dy2
jpx=c2x+stack.shift();// dx3
jpy=c2y;// dy3
c3x=jpx+stack.shift();// dx4
c3y=c2y;// dy4
c4x=c3x+stack.shift();// dx5
c4y=y;// dy5
x=c4x+stack.shift();// dx6
p.curveTo(c1x,c1y,c2x,c2y,jpx,jpy);p.curveTo(c3x,c3y,c4x,c4y,x,y);break;case 36:// hflex1
// |- dx1 dy1 dx2 dy2 dx3 dx4 dx5 dy5 dx6 hflex1 (12 36) |-
c1x=x+stack.shift();// dx1
c1y=y+stack.shift();// dy1
c2x=c1x+stack.shift();// dx2
c2y=c1y+stack.shift();// dy2
jpx=c2x+stack.shift();// dx3
jpy=c2y;// dy3
c3x=jpx+stack.shift();// dx4
c3y=c2y;// dy4
c4x=c3x+stack.shift();// dx5
c4y=c3y+stack.shift();// dy5
x=c4x+stack.shift();// dx6
p.curveTo(c1x,c1y,c2x,c2y,jpx,jpy);p.curveTo(c3x,c3y,c4x,c4y,x,y);break;case 37:// flex1
// |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 d6 flex1 (12 37) |-
c1x=x+stack.shift();// dx1
c1y=y+stack.shift();// dy1
c2x=c1x+stack.shift();// dx2
c2y=c1y+stack.shift();// dy2
jpx=c2x+stack.shift();// dx3
jpy=c2y+stack.shift();// dy3
c3x=jpx+stack.shift();// dx4
c3y=jpy+stack.shift();// dy4
c4x=c3x+stack.shift();// dx5
c4y=c3y+stack.shift();// dy5
if(Math.abs(c4x-x)>Math.abs(c4y-y)){x=c4x+stack.shift();}else{y=c4y+stack.shift();}p.curveTo(c1x,c1y,c2x,c2y,jpx,jpy);p.curveTo(c3x,c3y,c4x,c4y,x,y);break;default:console.log('Glyph '+glyph.index+': unknown operator '+1200+v);stack.length=0;}break;case 14:// endchar
if(stack.length>0&&!haveWidth){width=stack.shift()+nominalWidthX;haveWidth=true;}if(open){p.closePath();open=false;}break;case 18:// hstemhm
parseStems();break;case 19:// hintmask
case 20:// cntrmask
parseStems();i+=nStems+7>>3;break;case 21:// rmoveto
if(stack.length>2&&!haveWidth){width=stack.shift()+nominalWidthX;haveWidth=true;}y+=stack.pop();x+=stack.pop();newContour(x,y);break;case 22:// hmoveto
if(stack.length>1&&!haveWidth){width=stack.shift()+nominalWidthX;haveWidth=true;}x+=stack.pop();newContour(x,y);break;case 23:// vstemhm
parseStems();break;case 24:// rcurveline
while(stack.length>2){c1x=x+stack.shift();c1y=y+stack.shift();c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x+stack.shift();y=c2y+stack.shift();p.curveTo(c1x,c1y,c2x,c2y,x,y);}x+=stack.shift();y+=stack.shift();p.lineTo(x,y);break;case 25:// rlinecurve
while(stack.length>6){x+=stack.shift();y+=stack.shift();p.lineTo(x,y);}c1x=x+stack.shift();c1y=y+stack.shift();c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x+stack.shift();y=c2y+stack.shift();p.curveTo(c1x,c1y,c2x,c2y,x,y);break;case 26:// vvcurveto
if(stack.length%2){x+=stack.shift();}while(stack.length>0){c1x=x;c1y=y+stack.shift();c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x;y=c2y+stack.shift();p.curveTo(c1x,c1y,c2x,c2y,x,y);}break;case 27:// hhcurveto
if(stack.length%2){y+=stack.shift();}while(stack.length>0){c1x=x+stack.shift();c1y=y;c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x+stack.shift();y=c2y;p.curveTo(c1x,c1y,c2x,c2y,x,y);}break;case 28:// shortint
b1=code[i];b2=code[i+1];stack.push((b1<<24|b2<<16)>>16);i+=2;break;case 29:// callgsubr
codeIndex=stack.pop()+font.gsubrsBias;subrCode=font.gsubrs[codeIndex];if(subrCode){parse$$1(subrCode);}break;case 30:// vhcurveto
while(stack.length>0){c1x=x;c1y=y+stack.shift();c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x+stack.shift();y=c2y+(stack.length===1?stack.shift():0);p.curveTo(c1x,c1y,c2x,c2y,x,y);if(stack.length===0){break;}c1x=x+stack.shift();c1y=y;c2x=c1x+stack.shift();c2y=c1y+stack.shift();y=c2y+stack.shift();x=c2x+(stack.length===1?stack.shift():0);p.curveTo(c1x,c1y,c2x,c2y,x,y);}break;case 31:// hvcurveto
while(stack.length>0){c1x=x+stack.shift();c1y=y;c2x=c1x+stack.shift();c2y=c1y+stack.shift();y=c2y+stack.shift();x=c2x+(stack.length===1?stack.shift():0);p.curveTo(c1x,c1y,c2x,c2y,x,y);if(stack.length===0){break;}c1x=x;c1y=y+stack.shift();c2x=c1x+stack.shift();c2y=c1y+stack.shift();x=c2x+stack.shift();y=c2y+(stack.length===1?stack.shift():0);p.curveTo(c1x,c1y,c2x,c2y,x,y);}break;default:if(v<32){console.log('Glyph '+glyph.index+': unknown operator '+v);}else if(v<247){stack.push(v-139);}else if(v<251){b1=code[i];i+=1;stack.push((v-247)*256+b1+108);}else if(v<255){b1=code[i];i+=1;stack.push(-(v-251)*256-b1-108);}else{b1=code[i];b2=code[i+1];b3=code[i+2];b4=code[i+3];i+=4;stack.push((b1<<24|b2<<16|b3<<8|b4)/65536);}}}}parse$$1(code);glyph.advanceWidth=width;return p;}function parseCFFFDSelect(data,start,nGlyphs,fdArrayCount){var fdSelect=[];var fdIndex;var parser=new parse.Parser(data,start);var format=parser.parseCard8();if(format===0){// Simple list of nGlyphs elements
for(var iGid=0;iGid<nGlyphs;iGid++){fdIndex=parser.parseCard8();if(fdIndex>=fdArrayCount){throw new Error('CFF table CID Font FDSelect has bad FD index value '+fdIndex+' (FD count '+fdArrayCount+')');}fdSelect.push(fdIndex);}}else if(format===3){// Ranges
var nRanges=parser.parseCard16();var first=parser.parseCard16();if(first!==0){throw new Error('CFF Table CID Font FDSelect format 3 range has bad initial GID '+first);}var next;for(var iRange=0;iRange<nRanges;iRange++){fdIndex=parser.parseCard8();next=parser.parseCard16();if(fdIndex>=fdArrayCount){throw new Error('CFF table CID Font FDSelect has bad FD index value '+fdIndex+' (FD count '+fdArrayCount+')');}if(next>nGlyphs){throw new Error('CFF Table CID Font FDSelect format 3 range has bad GID '+next);}for(;first<next;first++){fdSelect.push(fdIndex);}first=next;}if(next!==nGlyphs){throw new Error('CFF Table CID Font FDSelect format 3 range has bad final GID '+next);}}else{throw new Error('CFF Table CID Font FDSelect table has unsupported format '+format);}return fdSelect;}// Parse the `CFF` table, which contains the glyph outlines in PostScript format.
function parseCFFTable(data,start,font){font.tables.cff={};var header=parseCFFHeader(data,start);var nameIndex=parseCFFIndex(data,header.endOffset,parse.bytesToString);var topDictIndex=parseCFFIndex(data,nameIndex.endOffset);var stringIndex=parseCFFIndex(data,topDictIndex.endOffset,parse.bytesToString);var globalSubrIndex=parseCFFIndex(data,stringIndex.endOffset);font.gsubrs=globalSubrIndex.objects;font.gsubrsBias=calcCFFSubroutineBias(font.gsubrs);var topDictArray=gatherCFFTopDicts(data,start,topDictIndex.objects,stringIndex.objects);if(topDictArray.length!==1){throw new Error('CFF table has too many fonts in \'FontSet\' - count of fonts NameIndex.length = '+topDictArray.length);}var topDict=topDictArray[0];font.tables.cff.topDict=topDict;if(topDict._privateDict){font.defaultWidthX=topDict._privateDict.defaultWidthX;font.nominalWidthX=topDict._privateDict.nominalWidthX;}if(topDict.ros[0]!==undefined&&topDict.ros[1]!==undefined){font.isCIDFont=true;}if(font.isCIDFont){var fdArrayOffset=topDict.fdArray;var fdSelectOffset=topDict.fdSelect;if(fdArrayOffset===0||fdSelectOffset===0){throw new Error('Font is marked as a CID font, but FDArray and/or FDSelect information is missing');}fdArrayOffset+=start;var fdArrayIndex=parseCFFIndex(data,fdArrayOffset);var fdArray=gatherCFFTopDicts(data,start,fdArrayIndex.objects,stringIndex.objects);topDict._fdArray=fdArray;fdSelectOffset+=start;topDict._fdSelect=parseCFFFDSelect(data,fdSelectOffset,font.numGlyphs,fdArray.length);}var privateDictOffset=start+topDict.private[1];var privateDict=parseCFFPrivateDict(data,privateDictOffset,topDict.private[0],stringIndex.objects);font.defaultWidthX=privateDict.defaultWidthX;font.nominalWidthX=privateDict.nominalWidthX;if(privateDict.subrs!==0){var subrOffset=privateDictOffset+privateDict.subrs;var subrIndex=parseCFFIndex(data,subrOffset);font.subrs=subrIndex.objects;font.subrsBias=calcCFFSubroutineBias(font.subrs);}else{font.subrs=[];font.subrsBias=0;}// Offsets in the top dict are relative to the beginning of the CFF data, so add the CFF start offset.
var charStringsIndex=parseCFFIndex(data,start+topDict.charStrings);font.nGlyphs=charStringsIndex.objects.length;var charset=parseCFFCharset(data,start+topDict.charset,font.nGlyphs,stringIndex.objects);if(topDict.encoding===0){// Standard encoding
font.cffEncoding=new CffEncoding(cffStandardEncoding,charset);}else if(topDict.encoding===1){// Expert encoding
font.cffEncoding=new CffEncoding(cffExpertEncoding,charset);}else{font.cffEncoding=parseCFFEncoding(data,start+topDict.encoding,charset);}// Prefer the CMAP encoding to the CFF encoding.
font.encoding=font.encoding||font.cffEncoding;font.glyphs=new glyphset.GlyphSet(font);for(var i=0;i<font.nGlyphs;i+=1){var charString=charStringsIndex.objects[i];font.glyphs.push(i,glyphset.cffGlyphLoader(font,i,parseCFFCharstring,charString));}}// Convert a string to a String ID (SID).
// The list of strings is modified in place.
function encodeString(s,strings){var sid;// Is the string in the CFF standard strings?
var i=cffStandardStrings.indexOf(s);if(i>=0){sid=i;}// Is the string already in the string index?
i=strings.indexOf(s);if(i>=0){sid=i+cffStandardStrings.length;}else{sid=cffStandardStrings.length+strings.length;strings.push(s);}return sid;}function makeHeader(){return new table.Record('Header',[{name:'major',type:'Card8',value:1},{name:'minor',type:'Card8',value:0},{name:'hdrSize',type:'Card8',value:4},{name:'major',type:'Card8',value:1}]);}function makeNameIndex(fontNames){var t=new table.Record('Name INDEX',[{name:'names',type:'INDEX',value:[]}]);t.names=[];for(var i=0;i<fontNames.length;i+=1){t.names.push({name:'name_'+i,type:'NAME',value:fontNames[i]});}return t;}// Given a dictionary's metadata, create a DICT structure.
function makeDict(meta,attrs,strings){var m={};for(var i=0;i<meta.length;i+=1){var entry=meta[i];var value=attrs[entry.name];if(value!==undefined&&!equals(value,entry.value)){if(entry.type==='SID'){value=encodeString(value,strings);}m[entry.op]={name:entry.name,type:entry.type,value:value};}}return m;}// The Top DICT houses the global font attributes.
function makeTopDict(attrs,strings){var t=new table.Record('Top DICT',[{name:'dict',type:'DICT',value:{}}]);t.dict=makeDict(TOP_DICT_META,attrs,strings);return t;}function makeTopDictIndex(topDict){var t=new table.Record('Top DICT INDEX',[{name:'topDicts',type:'INDEX',value:[]}]);t.topDicts=[{name:'topDict_0',type:'TABLE',value:topDict}];return t;}function makeStringIndex(strings){var t=new table.Record('String INDEX',[{name:'strings',type:'INDEX',value:[]}]);t.strings=[];for(var i=0;i<strings.length;i+=1){t.strings.push({name:'string_'+i,type:'STRING',value:strings[i]});}return t;}function makeGlobalSubrIndex(){// Currently we don't use subroutines.
return new table.Record('Global Subr INDEX',[{name:'subrs',type:'INDEX',value:[]}]);}function makeCharsets(glyphNames,strings){var t=new table.Record('Charsets',[{name:'format',type:'Card8',value:0}]);for(var i=0;i<glyphNames.length;i+=1){var glyphName=glyphNames[i];var glyphSID=encodeString(glyphName,strings);t.fields.push({name:'glyph_'+i,type:'SID',value:glyphSID});}return t;}function glyphToOps(glyph){var ops=[];var path=glyph.path;ops.push({name:'width',type:'NUMBER',value:glyph.advanceWidth});var x=0;var y=0;for(var i=0;i<path.commands.length;i+=1){var dx=void 0;var dy=void 0;var cmd=path.commands[i];if(cmd.type==='Q'){// CFF only supports bézier curves, so convert the quad to a bézier.
var _13=1/3;var _23=2/3;// We're going to create a new command so we don't change the original path.
cmd={type:'C',x:cmd.x,y:cmd.y,x1:_13*x+_23*cmd.x1,y1:_13*y+_23*cmd.y1,x2:_13*cmd.x+_23*cmd.x1,y2:_13*cmd.y+_23*cmd.y1};}if(cmd.type==='M'){dx=Math.round(cmd.x-x);dy=Math.round(cmd.y-y);ops.push({name:'dx',type:'NUMBER',value:dx});ops.push({name:'dy',type:'NUMBER',value:dy});ops.push({name:'rmoveto',type:'OP',value:21});x=Math.round(cmd.x);y=Math.round(cmd.y);}else if(cmd.type==='L'){dx=Math.round(cmd.x-x);dy=Math.round(cmd.y-y);ops.push({name:'dx',type:'NUMBER',value:dx});ops.push({name:'dy',type:'NUMBER',value:dy});ops.push({name:'rlineto',type:'OP',value:5});x=Math.round(cmd.x);y=Math.round(cmd.y);}else if(cmd.type==='C'){var dx1=Math.round(cmd.x1-x);var dy1=Math.round(cmd.y1-y);var dx2=Math.round(cmd.x2-cmd.x1);var dy2=Math.round(cmd.y2-cmd.y1);dx=Math.round(cmd.x-cmd.x2);dy=Math.round(cmd.y-cmd.y2);ops.push({name:'dx1',type:'NUMBER',value:dx1});ops.push({name:'dy1',type:'NUMBER',value:dy1});ops.push({name:'dx2',type:'NUMBER',value:dx2});ops.push({name:'dy2',type:'NUMBER',value:dy2});ops.push({name:'dx',type:'NUMBER',value:dx});ops.push({name:'dy',type:'NUMBER',value:dy});ops.push({name:'rrcurveto',type:'OP',value:8});x=Math.round(cmd.x);y=Math.round(cmd.y);}// Contours are closed automatically.
}ops.push({name:'endchar',type:'OP',value:14});return ops;}function makeCharStringsIndex(glyphs){var t=new table.Record('CharStrings INDEX',[{name:'charStrings',type:'INDEX',value:[]}]);for(var i=0;i<glyphs.length;i+=1){var glyph=glyphs.get(i);var ops=glyphToOps(glyph);t.charStrings.push({name:glyph.name,type:'CHARSTRING',value:ops});}return t;}function makePrivateDict(attrs,strings){var t=new table.Record('Private DICT',[{name:'dict',type:'DICT',value:{}}]);t.dict=makeDict(PRIVATE_DICT_META,attrs,strings);return t;}function makeCFFTable(glyphs,options){var t=new table.Table('CFF ',[{name:'header',type:'RECORD'},{name:'nameIndex',type:'RECORD'},{name:'topDictIndex',type:'RECORD'},{name:'stringIndex',type:'RECORD'},{name:'globalSubrIndex',type:'RECORD'},{name:'charsets',type:'RECORD'},{name:'charStringsIndex',type:'RECORD'},{name:'privateDict',type:'RECORD'}]);var fontScale=1/options.unitsPerEm;// We use non-zero values for the offsets so that the DICT encodes them.
// This is important because the size of the Top DICT plays a role in offset calculation,
// and the size shouldn't change after we've written correct offsets.
var attrs={version:options.version,fullName:options.fullName,familyName:options.familyName,weight:options.weightName,fontBBox:options.fontBBox||[0,0,0,0],fontMatrix:[fontScale,0,0,fontScale,0,0],charset:999,encoding:0,charStrings:999,private:[0,999]};var privateAttrs={};var glyphNames=[];var glyph;// Skip first glyph (.notdef)
for(var i=1;i<glyphs.length;i+=1){glyph=glyphs.get(i);glyphNames.push(glyph.name);}var strings=[];t.header=makeHeader();t.nameIndex=makeNameIndex([options.postScriptName]);var topDict=makeTopDict(attrs,strings);t.topDictIndex=makeTopDictIndex(topDict);t.globalSubrIndex=makeGlobalSubrIndex();t.charsets=makeCharsets(glyphNames,strings);t.charStringsIndex=makeCharStringsIndex(glyphs);t.privateDict=makePrivateDict(privateAttrs,strings);// Needs to come at the end, to encode all custom strings used in the font.
t.stringIndex=makeStringIndex(strings);var startOffset=t.header.sizeOf()+t.nameIndex.sizeOf()+t.topDictIndex.sizeOf()+t.stringIndex.sizeOf()+t.globalSubrIndex.sizeOf();attrs.charset=startOffset;// We use the CFF standard encoding; proper encoding will be handled in cmap.
attrs.encoding=0;attrs.charStrings=attrs.charset+t.charsets.sizeOf();attrs.private[1]=attrs.charStrings+t.charStringsIndex.sizeOf();// Recreate the Top DICT INDEX with the correct offsets.
topDict=makeTopDict(attrs,strings);t.topDictIndex=makeTopDictIndex(topDict);return t;}var cff={parse:parseCFFTable,make:makeCFFTable};// The `head` table contains global information about the font.
// https://www.microsoft.com/typography/OTSPEC/head.htm
// Parse the header `head` table
function parseHeadTable(data,start){var head={};var p=new parse.Parser(data,start);head.version=p.parseVersion();head.fontRevision=Math.round(p.parseFixed()*1000)/1000;head.checkSumAdjustment=p.parseULong();head.magicNumber=p.parseULong();check.argument(head.magicNumber===0x5F0F3CF5,'Font header has wrong magic number.');head.flags=p.parseUShort();head.unitsPerEm=p.parseUShort();head.created=p.parseLongDateTime();head.modified=p.parseLongDateTime();head.xMin=p.parseShort();head.yMin=p.parseShort();head.xMax=p.parseShort();head.yMax=p.parseShort();head.macStyle=p.parseUShort();head.lowestRecPPEM=p.parseUShort();head.fontDirectionHint=p.parseShort();head.indexToLocFormat=p.parseShort();head.glyphDataFormat=p.parseShort();return head;}function makeHeadTable(options){// Apple Mac timestamp epoch is 01/01/1904 not 01/01/1970
var timestamp=Math.round(new Date().getTime()/1000)+2082844800;var createdTimestamp=timestamp;if(options.createdTimestamp){createdTimestamp=options.createdTimestamp+2082844800;}return new table.Table('head',[{name:'version',type:'FIXED',value:0x00010000},{name:'fontRevision',type:'FIXED',value:0x00010000},{name:'checkSumAdjustment',type:'ULONG',value:0},{name:'magicNumber',type:'ULONG',value:0x5F0F3CF5},{name:'flags',type:'USHORT',value:0},{name:'unitsPerEm',type:'USHORT',value:1000},{name:'created',type:'LONGDATETIME',value:createdTimestamp},{name:'modified',type:'LONGDATETIME',value:timestamp},{name:'xMin',type:'SHORT',value:0},{name:'yMin',type:'SHORT',value:0},{name:'xMax',type:'SHORT',value:0},{name:'yMax',type:'SHORT',value:0},{name:'macStyle',type:'USHORT',value:0},{name:'lowestRecPPEM',type:'USHORT',value:0},{name:'fontDirectionHint',type:'SHORT',value:2},{name:'indexToLocFormat',type:'SHORT',value:0},{name:'glyphDataFormat',type:'SHORT',value:0}],options);}var head={parse:parseHeadTable,make:makeHeadTable};// The `hhea` table contains information for horizontal layout.
// https://www.microsoft.com/typography/OTSPEC/hhea.htm
// Parse the horizontal header `hhea` table
function parseHheaTable(data,start){var hhea={};var p=new parse.Parser(data,start);hhea.version=p.parseVersion();hhea.ascender=p.parseShort();hhea.descender=p.parseShort();hhea.lineGap=p.parseShort();hhea.advanceWidthMax=p.parseUShort();hhea.minLeftSideBearing=p.parseShort();hhea.minRightSideBearing=p.parseShort();hhea.xMaxExtent=p.parseShort();hhea.caretSlopeRise=p.parseShort();hhea.caretSlopeRun=p.parseShort();hhea.caretOffset=p.parseShort();p.relativeOffset+=8;hhea.metricDataFormat=p.parseShort();hhea.numberOfHMetrics=p.parseUShort();return hhea;}function makeHheaTable(options){return new table.Table('hhea',[{name:'version',type:'FIXED',value:0x00010000},{name:'ascender',type:'FWORD',value:0},{name:'descender',type:'FWORD',value:0},{name:'lineGap',type:'FWORD',value:0},{name:'advanceWidthMax',type:'UFWORD',value:0},{name:'minLeftSideBearing',type:'FWORD',value:0},{name:'minRightSideBearing',type:'FWORD',value:0},{name:'xMaxExtent',type:'FWORD',value:0},{name:'caretSlopeRise',type:'SHORT',value:1},{name:'caretSlopeRun',type:'SHORT',value:0},{name:'caretOffset',type:'SHORT',value:0},{name:'reserved1',type:'SHORT',value:0},{name:'reserved2',type:'SHORT',value:0},{name:'reserved3',type:'SHORT',value:0},{name:'reserved4',type:'SHORT',value:0},{name:'metricDataFormat',type:'SHORT',value:0},{name:'numberOfHMetrics',type:'USHORT',value:0}],options);}var hhea={parse:parseHheaTable,make:makeHheaTable};// The `hmtx` table contains the horizontal metrics for all glyphs.
// https://www.microsoft.com/typography/OTSPEC/hmtx.htm
// Parse the `hmtx` table, which contains the horizontal metrics for all glyphs.
// This function augments the glyph array, adding the advanceWidth and leftSideBearing to each glyph.
function parseHmtxTable(data,start,numMetrics,numGlyphs,glyphs){var advanceWidth;var leftSideBearing;var p=new parse.Parser(data,start);for(var i=0;i<numGlyphs;i+=1){// If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
if(i<numMetrics){advanceWidth=p.parseUShort();leftSideBearing=p.parseShort();}var glyph=glyphs.get(i);glyph.advanceWidth=advanceWidth;glyph.leftSideBearing=leftSideBearing;}}function makeHmtxTable(glyphs){var t=new table.Table('hmtx',[]);for(var i=0;i<glyphs.length;i+=1){var glyph=glyphs.get(i);var advanceWidth=glyph.advanceWidth||0;var leftSideBearing=glyph.leftSideBearing||0;t.fields.push({name:'advanceWidth_'+i,type:'USHORT',value:advanceWidth});t.fields.push({name:'leftSideBearing_'+i,type:'SHORT',value:leftSideBearing});}return t;}var hmtx={parse:parseHmtxTable,make:makeHmtxTable};// The `ltag` table stores IETF BCP-47 language tags. It allows supporting
// languages for which TrueType does not assign a numeric code.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6ltag.html
// http://www.w3.org/International/articles/language-tags/
// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
function makeLtagTable(tags){var result=new table.Table('ltag',[{name:'version',type:'ULONG',value:1},{name:'flags',type:'ULONG',value:0},{name:'numTags',type:'ULONG',value:tags.length}]);var stringPool='';var stringPoolOffset=12+tags.length*4;for(var i=0;i<tags.length;++i){var pos=stringPool.indexOf(tags[i]);if(pos<0){pos=stringPool.length;stringPool+=tags[i];}result.fields.push({name:'offset '+i,type:'USHORT',value:stringPoolOffset+pos});result.fields.push({name:'length '+i,type:'USHORT',value:tags[i].length});}result.fields.push({name:'stringPool',type:'CHARARRAY',value:stringPool});return result;}function parseLtagTable(data,start){var p=new parse.Parser(data,start);var tableVersion=p.parseULong();check.argument(tableVersion===1,'Unsupported ltag table version.');// The 'ltag' specification does not define any flags; skip the field.
p.skip('uLong',1);var numTags=p.parseULong();var tags=[];for(var i=0;i<numTags;i++){var tag='';var offset=start+p.parseUShort();var length=p.parseUShort();for(var j=offset;j<offset+length;++j){tag+=String.fromCharCode(data.getInt8(j));}tags.push(tag);}return tags;}var ltag={make:makeLtagTable,parse:parseLtagTable};// The `maxp` table establishes the memory requirements for the font.
// We need it just to get the number of glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/maxp.htm
// Parse the maximum profile `maxp` table.
function parseMaxpTable(data,start){var maxp={};var p=new parse.Parser(data,start);maxp.version=p.parseVersion();maxp.numGlyphs=p.parseUShort();if(maxp.version===1.0){maxp.maxPoints=p.parseUShort();maxp.maxContours=p.parseUShort();maxp.maxCompositePoints=p.parseUShort();maxp.maxCompositeContours=p.parseUShort();maxp.maxZones=p.parseUShort();maxp.maxTwilightPoints=p.parseUShort();maxp.maxStorage=p.parseUShort();maxp.maxFunctionDefs=p.parseUShort();maxp.maxInstructionDefs=p.parseUShort();maxp.maxStackElements=p.parseUShort();maxp.maxSizeOfInstructions=p.parseUShort();maxp.maxComponentElements=p.parseUShort();maxp.maxComponentDepth=p.parseUShort();}return maxp;}function makeMaxpTable(numGlyphs){return new table.Table('maxp',[{name:'version',type:'FIXED',value:0x00005000},{name:'numGlyphs',type:'USHORT',value:numGlyphs}]);}var maxp={parse:parseMaxpTable,make:makeMaxpTable};// The `name` naming table.
// https://www.microsoft.com/typography/OTSPEC/name.htm
// NameIDs for the name table.
var nameTableNames=['copyright',// 0
'fontFamily',// 1
'fontSubfamily',// 2
'uniqueID',// 3
'fullName',// 4
'version',// 5
'postScriptName',// 6
'trademark',// 7
'manufacturer',// 8
'designer',// 9
'description',// 10
'manufacturerURL',// 11
'designerURL',// 12
'license',// 13
'licenseURL',// 14
'reserved',// 15
'preferredFamily',// 16
'preferredSubfamily',// 17
'compatibleFullName',// 18
'sampleText',// 19
'postScriptFindFontName',// 20
'wwsFamily',// 21
'wwsSubfamily'// 22
];var macLanguages={0:'en',1:'fr',2:'de',3:'it',4:'nl',5:'sv',6:'es',7:'da',8:'pt',9:'no',10:'he',11:'ja',12:'ar',13:'fi',14:'el',15:'is',16:'mt',17:'tr',18:'hr',19:'zh-Hant',20:'ur',21:'hi',22:'th',23:'ko',24:'lt',25:'pl',26:'hu',27:'es',28:'lv',29:'se',30:'fo',31:'fa',32:'ru',33:'zh',34:'nl-BE',35:'ga',36:'sq',37:'ro',38:'cz',39:'sk',40:'si',41:'yi',42:'sr',43:'mk',44:'bg',45:'uk',46:'be',47:'uz',48:'kk',49:'az-Cyrl',50:'az-Arab',51:'hy',52:'ka',53:'mo',54:'ky',55:'tg',56:'tk',57:'mn-CN',58:'mn',59:'ps',60:'ks',61:'ku',62:'sd',63:'bo',64:'ne',65:'sa',66:'mr',67:'bn',68:'as',69:'gu',70:'pa',71:'or',72:'ml',73:'kn',74:'ta',75:'te',76:'si',77:'my',78:'km',79:'lo',80:'vi',81:'id',82:'tl',83:'ms',84:'ms-Arab',85:'am',86:'ti',87:'om',88:'so',89:'sw',90:'rw',91:'rn',92:'ny',93:'mg',94:'eo',128:'cy',129:'eu',130:'ca',131:'la',132:'qu',133:'gn',134:'ay',135:'tt',136:'ug',137:'dz',138:'jv',139:'su',140:'gl',141:'af',142:'br',143:'iu',144:'gd',145:'gv',146:'ga',147:'to',148:'el-polyton',149:'kl',150:'az',151:'nn'};// MacOS language ID → MacOS script ID
//
// Note that the script ID is not sufficient to determine what encoding
// to use in TrueType files. For some languages, MacOS used a modification
// of a mainstream script. For example, an Icelandic name would be stored
// with smRoman in the TrueType naming table, but the actual encoding
// is a special Icelandic version of the normal Macintosh Roman encoding.
// As another example, Inuktitut uses an 8-bit encoding for Canadian Aboriginal
// Syllables but MacOS had run out of available script codes, so this was
// done as a (pretty radical) "modification" of Ethiopic.
//
// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
var macLanguageToScript={0:0,// langEnglish → smRoman
1:0,// langFrench → smRoman
2:0,// langGerman → smRoman
3:0,// langItalian → smRoman
4:0,// langDutch → smRoman
5:0,// langSwedish → smRoman
6:0,// langSpanish → smRoman
7:0,// langDanish → smRoman
8:0,// langPortuguese → smRoman
9:0,// langNorwegian → smRoman
10:5,// langHebrew → smHebrew
11:1,// langJapanese → smJapanese
12:4,// langArabic → smArabic
13:0,// langFinnish → smRoman
14:6,// langGreek → smGreek
15:0,// langIcelandic → smRoman (modified)
16:0,// langMaltese → smRoman
17:0,// langTurkish → smRoman (modified)
18:0,// langCroatian → smRoman (modified)
19:2,// langTradChinese → smTradChinese
20:4,// langUrdu → smArabic
21:9,// langHindi → smDevanagari
22:21,// langThai → smThai
23:3,// langKorean → smKorean
24:29,// langLithuanian → smCentralEuroRoman
25:29,// langPolish → smCentralEuroRoman
26:29,// langHungarian → smCentralEuroRoman
27:29,// langEstonian → smCentralEuroRoman
28:29,// langLatvian → smCentralEuroRoman
29:0,// langSami → smRoman
30:0,// langFaroese → smRoman (modified)
31:4,// langFarsi → smArabic (modified)
32:7,// langRussian → smCyrillic
33:25,// langSimpChinese → smSimpChinese
34:0,// langFlemish → smRoman
35:0,// langIrishGaelic → smRoman (modified)
36:0,// langAlbanian → smRoman
37:0,// langRomanian → smRoman (modified)
38:29,// langCzech → smCentralEuroRoman
39:29,// langSlovak → smCentralEuroRoman
40:0,// langSlovenian → smRoman (modified)
41:5,// langYiddish → smHebrew
42:7,// langSerbian → smCyrillic
43:7,// langMacedonian → smCyrillic
44:7,// langBulgarian → smCyrillic
45:7,// langUkrainian → smCyrillic (modified)
46:7,// langByelorussian → smCyrillic
47:7,// langUzbek → smCyrillic
48:7,// langKazakh → smCyrillic
49:7,// langAzerbaijani → smCyrillic
50:4,// langAzerbaijanAr → smArabic
51:24,// langArmenian → smArmenian
52:23,// langGeorgian → smGeorgian
53:7,// langMoldavian → smCyrillic
54:7,// langKirghiz → smCyrillic
55:7,// langTajiki → smCyrillic
56:7,// langTurkmen → smCyrillic
57:27,// langMongolian → smMongolian
58:7,// langMongolianCyr → smCyrillic
59:4,// langPashto → smArabic
60:4,// langKurdish → smArabic
61:4,// langKashmiri → smArabic
62:4,// langSindhi → smArabic
63:26,// langTibetan → smTibetan
64:9,// langNepali → smDevanagari
65:9,// langSanskrit → smDevanagari
66:9,// langMarathi → smDevanagari
67:13,// langBengali → smBengali
68:13,// langAssamese → smBengali
69:11,// langGujarati → smGujarati
70:10,// langPunjabi → smGurmukhi
71:12,// langOriya → smOriya
72:17,// langMalayalam → smMalayalam
73:16,// langKannada → smKannada
74:14,// langTamil → smTamil
75:15,// langTelugu → smTelugu
76:18,// langSinhalese → smSinhalese
77:19,// langBurmese → smBurmese
78:20,// langKhmer → smKhmer
79:22,// langLao → smLao
80:30,// langVietnamese → smVietnamese
81:0,// langIndonesian → smRoman
82:0,// langTagalog → smRoman
83:0,// langMalayRoman → smRoman
84:4,// langMalayArabic → smArabic
85:28,// langAmharic → smEthiopic
86:28,// langTigrinya → smEthiopic
87:28,// langOromo → smEthiopic
88:0,// langSomali → smRoman
89:0,// langSwahili → smRoman
90:0,// langKinyarwanda → smRoman
91:0,// langRundi → smRoman
92:0,// langNyanja → smRoman
93:0,// langMalagasy → smRoman
94:0,// langEsperanto → smRoman
128:0,// langWelsh → smRoman (modified)
129:0,// langBasque → smRoman
130:0,// langCatalan → smRoman
131:0,// langLatin → smRoman
132:0,// langQuechua → smRoman
133:0,// langGuarani → smRoman
134:0,// langAymara → smRoman
135:7,// langTatar → smCyrillic
136:4,// langUighur → smArabic
137:26,// langDzongkha → smTibetan
138:0,// langJavaneseRom → smRoman
139:0,// langSundaneseRom → smRoman
140:0,// langGalician → smRoman
141:0,// langAfrikaans → smRoman
142:0,// langBreton → smRoman (modified)
143:28,// langInuktitut → smEthiopic (modified)
144:0,// langScottishGaelic → smRoman (modified)
145:0,// langManxGaelic → smRoman (modified)
146:0,// langIrishGaelicScript → smRoman (modified)
147:0,// langTongan → smRoman
148:6,// langGreekAncient → smRoman
149:0,// langGreenlandic → smRoman
150:0,// langAzerbaijanRoman → smRoman
151:0// langNynorsk → smRoman
};// While Microsoft indicates a region/country for all its language
// IDs, we omit the region code if it's equal to the "most likely
// region subtag" according to Unicode CLDR. For scripts, we omit
// the subtag if it is equal to the Suppress-Script entry in the
// IANA language subtag registry for IETF BCP 47.
//
// For example, Microsoft states that its language code 0x041A is
// Croatian in Croatia. We transform this to the BCP 47 language code 'hr'
// and not 'hr-HR' because Croatia is the default country for Croatian,
// according to Unicode CLDR. As another example, Microsoft states
// that 0x101A is Croatian (Latin) in Bosnia-Herzegovina. We transform
// this to 'hr-BA' and not 'hr-Latn-BA' because Latin is the default script
// for the Croatian language, according to IANA.
//
// http://www.unicode.org/cldr/charts/latest/supplemental/likely_subtags.html
// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
var windowsLanguages={0x0436:'af',0x041C:'sq',0x0484:'gsw',0x045E:'am',0x1401:'ar-DZ',0x3C01:'ar-BH',0x0C01:'ar',0x0801:'ar-IQ',0x2C01:'ar-JO',0x3401:'ar-KW',0x3001:'ar-LB',0x1001:'ar-LY',0x1801:'ary',0x2001:'ar-OM',0x4001:'ar-QA',0x0401:'ar-SA',0x2801:'ar-SY',0x1C01:'aeb',0x3801:'ar-AE',0x2401:'ar-YE',0x042B:'hy',0x044D:'as',0x082C:'az-Cyrl',0x042C:'az',0x046D:'ba',0x042D:'eu',0x0423:'be',0x0845:'bn',0x0445:'bn-IN',0x201A:'bs-Cyrl',0x141A:'bs',0x047E:'br',0x0402:'bg',0x0403:'ca',0x0C04:'zh-HK',0x1404:'zh-MO',0x0804:'zh',0x1004:'zh-SG',0x0404:'zh-TW',0x0483:'co',0x041A:'hr',0x101A:'hr-BA',0x0405:'cs',0x0406:'da',0x048C:'prs',0x0465:'dv',0x0813:'nl-BE',0x0413:'nl',0x0C09:'en-AU',0x2809:'en-BZ',0x1009:'en-CA',0x2409:'en-029',0x4009:'en-IN',0x1809:'en-IE',0x2009:'en-JM',0x4409:'en-MY',0x1409:'en-NZ',0x3409:'en-PH',0x4809:'en-SG',0x1C09:'en-ZA',0x2C09:'en-TT',0x0809:'en-GB',0x0409:'en',0x3009:'en-ZW',0x0425:'et',0x0438:'fo',0x0464:'fil',0x040B:'fi',0x080C:'fr-BE',0x0C0C:'fr-CA',0x040C:'fr',0x140C:'fr-LU',0x180C:'fr-MC',0x100C:'fr-CH',0x0462:'fy',0x0456:'gl',0x0437:'ka',0x0C07:'de-AT',0x0407:'de',0x1407:'de-LI',0x1007:'de-LU',0x0807:'de-CH',0x0408:'el',0x046F:'kl',0x0447:'gu',0x0468:'ha',0x040D:'he',0x0439:'hi',0x040E:'hu',0x040F:'is',0x0470:'ig',0x0421:'id',0x045D:'iu',0x085D:'iu-Latn',0x083C:'ga',0x0434:'xh',0x0435:'zu',0x0410:'it',0x0810:'it-CH',0x0411:'ja',0x044B:'kn',0x043F:'kk',0x0453:'km',0x0486:'quc',0x0487:'rw',0x0441:'sw',0x0457:'kok',0x0412:'ko',0x0440:'ky',0x0454:'lo',0x0426:'lv',0x0427:'lt',0x082E:'dsb',0x046E:'lb',0x042F:'mk',0x083E:'ms-BN',0x043E:'ms',0x044C:'ml',0x043A:'mt',0x0481:'mi',0x047A:'arn',0x044E:'mr',0x047C:'moh',0x0450:'mn',0x0850:'mn-CN',0x0461:'ne',0x0414:'nb',0x0814:'nn',0x0482:'oc',0x0448:'or',0x0463:'ps',0x0415:'pl',0x0416:'pt',0x0816:'pt-PT',0x0446:'pa',0x046B:'qu-BO',0x086B:'qu-EC',0x0C6B:'qu',0x0418:'ro',0x0417:'rm',0x0419:'ru',0x243B:'smn',0x103B:'smj-NO',0x143B:'smj',0x0C3B:'se-FI',0x043B:'se',0x083B:'se-SE',0x203B:'sms',0x183B:'sma-NO',0x1C3B:'sms',0x044F:'sa',0x1C1A:'sr-Cyrl-BA',0x0C1A:'sr',0x181A:'sr-Latn-BA',0x081A:'sr-Latn',0x046C:'nso',0x0432:'tn',0x045B:'si',0x041B:'sk',0x0424:'sl',0x2C0A:'es-AR',0x400A:'es-BO',0x340A:'es-CL',0x240A:'es-CO',0x140A:'es-CR',0x1C0A:'es-DO',0x300A:'es-EC',0x440A:'es-SV',0x100A:'es-GT',0x480A:'es-HN',0x080A:'es-MX',0x4C0A:'es-NI',0x180A:'es-PA',0x3C0A:'es-PY',0x280A:'es-PE',0x500A:'es-PR',// Microsoft has defined two different language codes for
// “Spanish with modern sorting” and “Spanish with traditional
// sorting”. This makes sense for collation APIs, and it would be
// possible to express this in BCP 47 language tags via Unicode
// extensions (eg., es-u-co-trad is Spanish with traditional
// sorting). However, for storing names in fonts, the distinction
// does not make sense, so we give “es” in both cases.
0x0C0A:'es',0x040A:'es',0x540A:'es-US',0x380A:'es-UY',0x200A:'es-VE',0x081D:'sv-FI',0x041D:'sv',0x045A:'syr',0x0428:'tg',0x085F:'tzm',0x0449:'ta',0x0444:'tt',0x044A:'te',0x041E:'th',0x0451:'bo',0x041F:'tr',0x0442:'tk',0x0480:'ug',0x0422:'uk',0x042E:'hsb',0x0420:'ur',0x0843:'uz-Cyrl',0x0443:'uz',0x042A:'vi',0x0452:'cy',0x0488:'wo',0x0485:'sah',0x0478:'ii',0x046A:'yo'};// Returns a IETF BCP 47 language code, for example 'zh-Hant'
// for 'Chinese in the traditional script'.
function getLanguageCode(platformID,languageID,ltag){switch(platformID){case 0:// Unicode
if(languageID===0xFFFF){return'und';}else if(ltag){return ltag[languageID];}break;case 1:// Macintosh
return macLanguages[languageID];case 3:// Windows
return windowsLanguages[languageID];}return undefined;}var utf16='utf-16';// MacOS script ID → encoding. This table stores the default case,
// which can be overridden by macLanguageEncodings.
var macScriptEncodings={0:'macintosh',// smRoman
1:'x-mac-japanese',// smJapanese
2:'x-mac-chinesetrad',// smTradChinese
3:'x-mac-korean',// smKorean
6:'x-mac-greek',// smGreek
7:'x-mac-cyrillic',// smCyrillic
9:'x-mac-devanagai',// smDevanagari
10:'x-mac-gurmukhi',// smGurmukhi
11:'x-mac-gujarati',// smGujarati
12:'x-mac-oriya',// smOriya
13:'x-mac-bengali',// smBengali
14:'x-mac-tamil',// smTamil
15:'x-mac-telugu',// smTelugu
16:'x-mac-kannada',// smKannada
17:'x-mac-malayalam',// smMalayalam
18:'x-mac-sinhalese',// smSinhalese
19:'x-mac-burmese',// smBurmese
20:'x-mac-khmer',// smKhmer
21:'x-mac-thai',// smThai
22:'x-mac-lao',// smLao
23:'x-mac-georgian',// smGeorgian
24:'x-mac-armenian',// smArmenian
25:'x-mac-chinesesimp',// smSimpChinese
26:'x-mac-tibetan',// smTibetan
27:'x-mac-mongolian',// smMongolian
28:'x-mac-ethiopic',// smEthiopic
29:'x-mac-ce',// smCentralEuroRoman
30:'x-mac-vietnamese',// smVietnamese
31:'x-mac-extarabic'// smExtArabic
};// MacOS language ID → encoding. This table stores the exceptional
// cases, which override macScriptEncodings. For writing MacOS naming
// tables, we need to emit a MacOS script ID. Therefore, we cannot
// merge macScriptEncodings into macLanguageEncodings.
//
// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
var macLanguageEncodings={15:'x-mac-icelandic',// langIcelandic
17:'x-mac-turkish',// langTurkish
18:'x-mac-croatian',// langCroatian
24:'x-mac-ce',// langLithuanian
25:'x-mac-ce',// langPolish
26:'x-mac-ce',// langHungarian
27:'x-mac-ce',// langEstonian
28:'x-mac-ce',// langLatvian
30:'x-mac-icelandic',// langFaroese
37:'x-mac-romanian',// langRomanian
38:'x-mac-ce',// langCzech
39:'x-mac-ce',// langSlovak
40:'x-mac-ce',// langSlovenian
143:'x-mac-inuit',// langInuktitut
146:'x-mac-gaelic'// langIrishGaelicScript
};function getEncoding(platformID,encodingID,languageID){switch(platformID){case 0:// Unicode
return utf16;case 1:// Apple Macintosh
return macLanguageEncodings[languageID]||macScriptEncodings[encodingID];case 3:// Microsoft Windows
if(encodingID===1||encodingID===10){return utf16;}break;}return undefined;}// Parse the naming `name` table.
// FIXME: Format 1 additional fields are not supported yet.
// ltag is the content of the `ltag' table, such as ['en', 'zh-Hans', 'de-CH-1904'].
function parseNameTable(data,start,ltag){var name={};var p=new parse.Parser(data,start);var format=p.parseUShort();var count=p.parseUShort();var stringOffset=p.offset+p.parseUShort();for(var i=0;i<count;i++){var platformID=p.parseUShort();var encodingID=p.parseUShort();var languageID=p.parseUShort();var nameID=p.parseUShort();var property=nameTableNames[nameID]||nameID;var byteLength=p.parseUShort();var offset=p.parseUShort();var language=getLanguageCode(platformID,languageID,ltag);var encoding=getEncoding(platformID,encodingID,languageID);if(encoding!==undefined&&language!==undefined){var text=void 0;if(encoding===utf16){text=decode.UTF16(data,stringOffset+offset,byteLength);}else{text=decode.MACSTRING(data,stringOffset+offset,byteLength,encoding);}if(text){var translations=name[property];if(translations===undefined){translations=name[property]={};}translations[language]=text;}}}var langTagCount=0;if(format===1){// FIXME: Also handle Microsoft's 'name' table 1.
langTagCount=p.parseUShort();}return name;}// {23: 'foo'} → {'foo': 23}
// ['bar', 'baz'] → {'bar': 0, 'baz': 1}
function reverseDict(dict){var result={};for(var key in dict){result[dict[key]]=parseInt(key);}return result;}function makeNameRecord(platformID,encodingID,languageID,nameID,length,offset){return new table.Record('NameRecord',[{name:'platformID',type:'USHORT',value:platformID},{name:'encodingID',type:'USHORT',value:encodingID},{name:'languageID',type:'USHORT',value:languageID},{name:'nameID',type:'USHORT',value:nameID},{name:'length',type:'USHORT',value:length},{name:'offset',type:'USHORT',value:offset}]);}// Finds the position of needle in haystack, or -1 if not there.
// Like String.indexOf(), but for arrays.
function findSubArray(needle,haystack){var needleLength=needle.length;var limit=haystack.length-needleLength+1;loop:for(var pos=0;pos<limit;pos++){for(;pos<limit;pos++){for(var k=0;k<needleLength;k++){if(haystack[pos+k]!==needle[k]){continue loop;}}return pos;}}return-1;}function addStringToPool(s,pool){var offset=findSubArray(s,pool);if(offset<0){offset=pool.length;var i=0;var len=s.length;for(;i<len;++i){pool.push(s[i]);}}return offset;}function makeNameTable(names,ltag){var nameID;var nameIDs=[];var namesWithNumericKeys={};var nameTableIds=reverseDict(nameTableNames);for(var key in names){var id=nameTableIds[key];if(id===undefined){id=key;}nameID=parseInt(id);if(isNaN(nameID)){throw new Error('Name table entry "'+key+'" does not exist, see nameTableNames for complete list.');}namesWithNumericKeys[nameID]=names[key];nameIDs.push(nameID);}var macLanguageIds=reverseDict(macLanguages);var windowsLanguageIds=reverseDict(windowsLanguages);var nameRecords=[];var stringPool=[];for(var i=0;i<nameIDs.length;i++){nameID=nameIDs[i];var translations=namesWithNumericKeys[nameID];for(var lang in translations){var text=translations[lang];// For MacOS, we try to emit the name in the form that was introduced
// in the initial version of the TrueType spec (in the late 1980s).
// However, this can fail for various reasons: the requested BCP 47
// language code might not have an old-style Mac equivalent;
// we might not have a codec for the needed character encoding;
// or the name might contain characters that cannot be expressed
// in the old-style Macintosh encoding. In case of failure, we emit
// the name in a more modern fashion (Unicode encoding with BCP 47
// language tags) that is recognized by MacOS 10.5, released in 2009.
// If fonts were only read by operating systems, we could simply
// emit all names in the modern form; this would be much easier.
// However, there are many applications and libraries that read
// 'name' tables directly, and these will usually only recognize
// the ancient form (silently skipping the unrecognized names).
var macPlatform=1;// Macintosh
var macLanguage=macLanguageIds[lang];var macScript=macLanguageToScript[macLanguage];var macEncoding=getEncoding(macPlatform,macScript,macLanguage);var macName=encode.MACSTRING(text,macEncoding);if(macName===undefined){macPlatform=0;// Unicode
macLanguage=ltag.indexOf(lang);if(macLanguage<0){macLanguage=ltag.length;ltag.push(lang);}macScript=4;// Unicode 2.0 and later
macName=encode.UTF16(text);}var macNameOffset=addStringToPool(macName,stringPool);nameRecords.push(makeNameRecord(macPlatform,macScript,macLanguage,nameID,macName.length,macNameOffset));var winLanguage=windowsLanguageIds[lang];if(winLanguage!==undefined){var winName=encode.UTF16(text);var winNameOffset=addStringToPool(winName,stringPool);nameRecords.push(makeNameRecord(3,1,winLanguage,nameID,winName.length,winNameOffset));}}}nameRecords.sort(function(a,b){return a.platformID-b.platformID||a.encodingID-b.encodingID||a.languageID-b.languageID||a.nameID-b.nameID;});var t=new table.Table('name',[{name:'format',type:'USHORT',value:0},{name:'count',type:'USHORT',value:nameRecords.length},{name:'stringOffset',type:'USHORT',value:6+nameRecords.length*12}]);for(var r=0;r<nameRecords.length;r++){t.fields.push({name:'record_'+r,type:'RECORD',value:nameRecords[r]});}t.fields.push({name:'strings',type:'LITERAL',value:stringPool});return t;}var _name={parse:parseNameTable,make:makeNameTable};// The `OS/2` table contains metrics required in OpenType fonts.
// https://www.microsoft.com/typography/OTSPEC/os2.htm
var unicodeRanges=[{begin:0x0000,end:0x007F},// Basic Latin
{begin:0x0080,end:0x00FF},// Latin-1 Supplement
{begin:0x0100,end:0x017F},// Latin Extended-A
{begin:0x0180,end:0x024F},// Latin Extended-B
{begin:0x0250,end:0x02AF},// IPA Extensions
{begin:0x02B0,end:0x02FF},// Spacing Modifier Letters
{begin:0x0300,end:0x036F},// Combining Diacritical Marks
{begin:0x0370,end:0x03FF},// Greek and Coptic
{begin:0x2C80,end:0x2CFF},// Coptic
{begin:0x0400,end:0x04FF},// Cyrillic
{begin:0x0530,end:0x058F},// Armenian
{begin:0x0590,end:0x05FF},// Hebrew
{begin:0xA500,end:0xA63F},// Vai
{begin:0x0600,end:0x06FF},// Arabic
{begin:0x07C0,end:0x07FF},// NKo
{begin:0x0900,end:0x097F},// Devanagari
{begin:0x0980,end:0x09FF},// Bengali
{begin:0x0A00,end:0x0A7F},// Gurmukhi
{begin:0x0A80,end:0x0AFF},// Gujarati
{begin:0x0B00,end:0x0B7F},// Oriya
{begin:0x0B80,end:0x0BFF},// Tamil
{begin:0x0C00,end:0x0C7F},// Telugu
{begin:0x0C80,end:0x0CFF},// Kannada
{begin:0x0D00,end:0x0D7F},// Malayalam
{begin:0x0E00,end:0x0E7F},// Thai
{begin:0x0E80,end:0x0EFF},// Lao
{begin:0x10A0,end:0x10FF},// Georgian
{begin:0x1B00,end:0x1B7F},// Balinese
{begin:0x1100,end:0x11FF},// Hangul Jamo
{begin:0x1E00,end:0x1EFF},// Latin Extended Additional
{begin:0x1F00,end:0x1FFF},// Greek Extended
{begin:0x2000,end:0x206F},// General Punctuation
{begin:0x2070,end:0x209F},// Superscripts And Subscripts
{begin:0x20A0,end:0x20CF},// Currency Symbol
{begin:0x20D0,end:0x20FF},// Combining Diacritical Marks For Symbols
{begin:0x2100,end:0x214F},// Letterlike Symbols
{begin:0x2150,end:0x218F},// Number Forms
{begin:0x2190,end:0x21FF},// Arrows
{begin:0x2200,end:0x22FF},// Mathematical Operators
{begin:0x2300,end:0x23FF},// Miscellaneous Technical
{begin:0x2400,end:0x243F},// Control Pictures
{begin:0x2440,end:0x245F},// Optical Character Recognition
{begin:0x2460,end:0x24FF},// Enclosed Alphanumerics
{begin:0x2500,end:0x257F},// Box Drawing
{begin:0x2580,end:0x259F},// Block Elements
{begin:0x25A0,end:0x25FF},// Geometric Shapes
{begin:0x2600,end:0x26FF},// Miscellaneous Symbols
{begin:0x2700,end:0x27BF},// Dingbats
{begin:0x3000,end:0x303F},// CJK Symbols And Punctuation
{begin:0x3040,end:0x309F},// Hiragana
{begin:0x30A0,end:0x30FF},// Katakana
{begin:0x3100,end:0x312F},// Bopomofo
{begin:0x3130,end:0x318F},// Hangul Compatibility Jamo
{begin:0xA840,end:0xA87F},// Phags-pa
{begin:0x3200,end:0x32FF},// Enclosed CJK Letters And Months
{begin:0x3300,end:0x33FF},// CJK Compatibility
{begin:0xAC00,end:0xD7AF},// Hangul Syllables
{begin:0xD800,end:0xDFFF},// Non-Plane 0 *
{begin:0x10900,end:0x1091F},// Phoenicia
{begin:0x4E00,end:0x9FFF},// CJK Unified Ideographs
{begin:0xE000,end:0xF8FF},// Private Use Area (plane 0)
{begin:0x31C0,end:0x31EF},// CJK Strokes
{begin:0xFB00,end:0xFB4F},// Alphabetic Presentation Forms
{begin:0xFB50,end:0xFDFF},// Arabic Presentation Forms-A
{begin:0xFE20,end:0xFE2F},// Combining Half Marks
{begin:0xFE10,end:0xFE1F},// Vertical Forms
{begin:0xFE50,end:0xFE6F},// Small Form Variants
{begin:0xFE70,end:0xFEFF},// Arabic Presentation Forms-B
{begin:0xFF00,end:0xFFEF},// Halfwidth And Fullwidth Forms
{begin:0xFFF0,end:0xFFFF},// Specials
{begin:0x0F00,end:0x0FFF},// Tibetan
{begin:0x0700,end:0x074F},// Syriac
{begin:0x0780,end:0x07BF},// Thaana
{begin:0x0D80,end:0x0DFF},// Sinhala
{begin:0x1000,end:0x109F},// Myanmar
{begin:0x1200,end:0x137F},// Ethiopic
{begin:0x13A0,end:0x13FF},// Cherokee
{begin:0x1400,end:0x167F},// Unified Canadian Aboriginal Syllabics
{begin:0x1680,end:0x169F},// Ogham
{begin:0x16A0,end:0x16FF},// Runic
{begin:0x1780,end:0x17FF},// Khmer
{begin:0x1800,end:0x18AF},// Mongolian
{begin:0x2800,end:0x28FF},// Braille Patterns
{begin:0xA000,end:0xA48F},// Yi Syllables
{begin:0x1700,end:0x171F},// Tagalog
{begin:0x10300,end:0x1032F},// Old Italic
{begin:0x10330,end:0x1034F},// Gothic
{begin:0x10400,end:0x1044F},// Deseret
{begin:0x1D000,end:0x1D0FF},// Byzantine Musical Symbols
{begin:0x1D400,end:0x1D7FF},// Mathematical Alphanumeric Symbols
{begin:0xFF000,end:0xFFFFD},// Private Use (plane 15)
{begin:0xFE00,end:0xFE0F},// Variation Selectors
{begin:0xE0000,end:0xE007F},// Tags
{begin:0x1900,end:0x194F},// Limbu
{begin:0x1950,end:0x197F},// Tai Le
{begin:0x1980,end:0x19DF},// New Tai Lue
{begin:0x1A00,end:0x1A1F},// Buginese
{begin:0x2C00,end:0x2C5F},// Glagolitic
{begin:0x2D30,end:0x2D7F},// Tifinagh
{begin:0x4DC0,end:0x4DFF},// Yijing Hexagram Symbols
{begin:0xA800,end:0xA82F},// Syloti Nagri
{begin:0x10000,end:0x1007F},// Linear B Syllabary
{begin:0x10140,end:0x1018F},// Ancient Greek Numbers
{begin:0x10380,end:0x1039F},// Ugaritic
{begin:0x103A0,end:0x103DF},// Old Persian
{begin:0x10450,end:0x1047F},// Shavian
{begin:0x10480,end:0x104AF},// Osmanya
{begin:0x10800,end:0x1083F},// Cypriot Syllabary
{begin:0x10A00,end:0x10A5F},// Kharoshthi
{begin:0x1D300,end:0x1D35F},// Tai Xuan Jing Symbols
{begin:0x12000,end:0x123FF},// Cuneiform
{begin:0x1D360,end:0x1D37F},// Counting Rod Numerals
{begin:0x1B80,end:0x1BBF},// Sundanese
{begin:0x1C00,end:0x1C4F},// Lepcha
{begin:0x1C50,end:0x1C7F},// Ol Chiki
{begin:0xA880,end:0xA8DF},// Saurashtra
{begin:0xA900,end:0xA92F},// Kayah Li
{begin:0xA930,end:0xA95F},// Rejang
{begin:0xAA00,end:0xAA5F},// Cham
{begin:0x10190,end:0x101CF},// Ancient Symbols
{begin:0x101D0,end:0x101FF},// Phaistos Disc
{begin:0x102A0,end:0x102DF},// Carian
{begin:0x1F030,end:0x1F09F// Domino Tiles
}];function getUnicodeRange(unicode){for(var i=0;i<unicodeRanges.length;i+=1){var range=unicodeRanges[i];if(unicode>=range.begin&&unicode<range.end){return i;}}return-1;}// Parse the OS/2 and Windows metrics `OS/2` table
function parseOS2Table(data,start){var os2={};var p=new parse.Parser(data,start);os2.version=p.parseUShort();os2.xAvgCharWidth=p.parseShort();os2.usWeightClass=p.parseUShort();os2.usWidthClass=p.parseUShort();os2.fsType=p.parseUShort();os2.ySubscriptXSize=p.parseShort();os2.ySubscriptYSize=p.parseShort();os2.ySubscriptXOffset=p.parseShort();os2.ySubscriptYOffset=p.parseShort();os2.ySuperscriptXSize=p.parseShort();os2.ySuperscriptYSize=p.parseShort();os2.ySuperscriptXOffset=p.parseShort();os2.ySuperscriptYOffset=p.parseShort();os2.yStrikeoutSize=p.parseShort();os2.yStrikeoutPosition=p.parseShort();os2.sFamilyClass=p.parseShort();os2.panose=[];for(var i=0;i<10;i++){os2.panose[i]=p.parseByte();}os2.ulUnicodeRange1=p.parseULong();os2.ulUnicodeRange2=p.parseULong();os2.ulUnicodeRange3=p.parseULong();os2.ulUnicodeRange4=p.parseULong();os2.achVendID=String.fromCharCode(p.parseByte(),p.parseByte(),p.parseByte(),p.parseByte());os2.fsSelection=p.parseUShort();os2.usFirstCharIndex=p.parseUShort();os2.usLastCharIndex=p.parseUShort();os2.sTypoAscender=p.parseShort();os2.sTypoDescender=p.parseShort();os2.sTypoLineGap=p.parseShort();os2.usWinAscent=p.parseUShort();os2.usWinDescent=p.parseUShort();if(os2.version>=1){os2.ulCodePageRange1=p.parseULong();os2.ulCodePageRange2=p.parseULong();}if(os2.version>=2){os2.sxHeight=p.parseShort();os2.sCapHeight=p.parseShort();os2.usDefaultChar=p.parseUShort();os2.usBreakChar=p.parseUShort();os2.usMaxContent=p.parseUShort();}return os2;}function makeOS2Table(options){return new table.Table('OS/2',[{name:'version',type:'USHORT',value:0x0003},{name:'xAvgCharWidth',type:'SHORT',value:0},{name:'usWeightClass',type:'USHORT',value:0},{name:'usWidthClass',type:'USHORT',value:0},{name:'fsType',type:'USHORT',value:0},{name:'ySubscriptXSize',type:'SHORT',value:650},{name:'ySubscriptYSize',type:'SHORT',value:699},{name:'ySubscriptXOffset',type:'SHORT',value:0},{name:'ySubscriptYOffset',type:'SHORT',value:140},{name:'ySuperscriptXSize',type:'SHORT',value:650},{name:'ySuperscriptYSize',type:'SHORT',value:699},{name:'ySuperscriptXOffset',type:'SHORT',value:0},{name:'ySuperscriptYOffset',type:'SHORT',value:479},{name:'yStrikeoutSize',type:'SHORT',value:49},{name:'yStrikeoutPosition',type:'SHORT',value:258},{name:'sFamilyClass',type:'SHORT',value:0},{name:'bFamilyType',type:'BYTE',value:0},{name:'bSerifStyle',type:'BYTE',value:0},{name:'bWeight',type:'BYTE',value:0},{name:'bProportion',type:'BYTE',value:0},{name:'bContrast',type:'BYTE',value:0},{name:'bStrokeVariation',type:'BYTE',value:0},{name:'bArmStyle',type:'BYTE',value:0},{name:'bLetterform',type:'BYTE',value:0},{name:'bMidline',type:'BYTE',value:0},{name:'bXHeight',type:'BYTE',value:0},{name:'ulUnicodeRange1',type:'ULONG',value:0},{name:'ulUnicodeRange2',type:'ULONG',value:0},{name:'ulUnicodeRange3',type:'ULONG',value:0},{name:'ulUnicodeRange4',type:'ULONG',value:0},{name:'achVendID',type:'CHARARRAY',value:'XXXX'},{name:'fsSelection',type:'USHORT',value:0},{name:'usFirstCharIndex',type:'USHORT',value:0},{name:'usLastCharIndex',type:'USHORT',value:0},{name:'sTypoAscender',type:'SHORT',value:0},{name:'sTypoDescender',type:'SHORT',value:0},{name:'sTypoLineGap',type:'SHORT',value:0},{name:'usWinAscent',type:'USHORT',value:0},{name:'usWinDescent',type:'USHORT',value:0},{name:'ulCodePageRange1',type:'ULONG',value:0},{name:'ulCodePageRange2',type:'ULONG',value:0},{name:'sxHeight',type:'SHORT',value:0},{name:'sCapHeight',type:'SHORT',value:0},{name:'usDefaultChar',type:'USHORT',value:0},{name:'usBreakChar',type:'USHORT',value:0},{name:'usMaxContext',type:'USHORT',value:0}],options);}var os2={parse:parseOS2Table,make:makeOS2Table,unicodeRanges:unicodeRanges,getUnicodeRange:getUnicodeRange};// The `post` table stores additional PostScript information, such as glyph names.
// https://www.microsoft.com/typography/OTSPEC/post.htm
// Parse the PostScript `post` table
function parsePostTable(data,start){var post={};var p=new parse.Parser(data,start);post.version=p.parseVersion();post.italicAngle=p.parseFixed();post.underlinePosition=p.parseShort();post.underlineThickness=p.parseShort();post.isFixedPitch=p.parseULong();post.minMemType42=p.parseULong();post.maxMemType42=p.parseULong();post.minMemType1=p.parseULong();post.maxMemType1=p.parseULong();switch(post.version){case 1:post.names=standardNames.slice();break;case 2:post.numberOfGlyphs=p.parseUShort();post.glyphNameIndex=new Array(post.numberOfGlyphs);for(var i=0;i<post.numberOfGlyphs;i++){post.glyphNameIndex[i]=p.parseUShort();}post.names=[];for(var i$1=0;i$1<post.numberOfGlyphs;i$1++){if(post.glyphNameIndex[i$1]>=standardNames.length){var nameLength=p.parseChar();post.names.push(p.parseString(nameLength));}}break;case 2.5:post.numberOfGlyphs=p.parseUShort();post.offset=new Array(post.numberOfGlyphs);for(var i$2=0;i$2<post.numberOfGlyphs;i$2++){post.offset[i$2]=p.parseChar();}break;}return post;}function makePostTable(){return new table.Table('post',[{name:'version',type:'FIXED',value:0x00030000},{name:'italicAngle',type:'FIXED',value:0},{name:'underlinePosition',type:'FWORD',value:0},{name:'underlineThickness',type:'FWORD',value:0},{name:'isFixedPitch',type:'ULONG',value:0},{name:'minMemType42',type:'ULONG',value:0},{name:'maxMemType42',type:'ULONG',value:0},{name:'minMemType1',type:'ULONG',value:0},{name:'maxMemType1',type:'ULONG',value:0}]);}var post={parse:parsePostTable,make:makePostTable};// The `GSUB` table contains ligatures, among other things.
// https://www.microsoft.com/typography/OTSPEC/gsub.htm
var subtableParsers=new Array(9);// subtableParsers[0] is unused
// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#SS
subtableParsers[1]=function parseLookup1(){var start=this.offset+this.relativeOffset;var substFormat=this.parseUShort();if(substFormat===1){return{substFormat:1,coverage:this.parsePointer(Parser.coverage),deltaGlyphId:this.parseUShort()};}else if(substFormat===2){return{substFormat:2,coverage:this.parsePointer(Parser.coverage),substitute:this.parseOffset16List()};}check.assert(false,'0x'+start.toString(16)+': lookup type 1 format must be 1 or 2.');};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#MS
subtableParsers[2]=function parseLookup2(){var substFormat=this.parseUShort();check.argument(substFormat===1,'GSUB Multiple Substitution Subtable identifier-format must be 1');return{substFormat:substFormat,coverage:this.parsePointer(Parser.coverage),sequences:this.parseListOfLists()};};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#AS
subtableParsers[3]=function parseLookup3(){var substFormat=this.parseUShort();check.argument(substFormat===1,'GSUB Alternate Substitution Subtable identifier-format must be 1');return{substFormat:substFormat,coverage:this.parsePointer(Parser.coverage),alternateSets:this.parseListOfLists()};};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#LS
subtableParsers[4]=function parseLookup4(){var substFormat=this.parseUShort();check.argument(substFormat===1,'GSUB ligature table identifier-format must be 1');return{substFormat:substFormat,coverage:this.parsePointer(Parser.coverage),ligatureSets:this.parseListOfLists(function(){return{ligGlyph:this.parseUShort(),components:this.parseUShortList(this.parseUShort()-1)};})};};var lookupRecordDesc={sequenceIndex:Parser.uShort,lookupListIndex:Parser.uShort};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#CSF
subtableParsers[5]=function parseLookup5(){var start=this.offset+this.relativeOffset;var substFormat=this.parseUShort();if(substFormat===1){return{substFormat:substFormat,coverage:this.parsePointer(Parser.coverage),ruleSets:this.parseListOfLists(function(){var glyphCount=this.parseUShort();var substCount=this.parseUShort();return{input:this.parseUShortList(glyphCount-1),lookupRecords:this.parseRecordList(substCount,lookupRecordDesc)};})};}else if(substFormat===2){return{substFormat:substFormat,coverage:this.parsePointer(Parser.coverage),classDef:this.parsePointer(Parser.classDef),classSets:this.parseListOfLists(function(){var glyphCount=this.parseUShort();var substCount=this.parseUShort();return{classes:this.parseUShortList(glyphCount-1),lookupRecords:this.parseRecordList(substCount,lookupRecordDesc)};})};}else if(substFormat===3){var glyphCount=this.parseUShort();var substCount=this.parseUShort();return{substFormat:substFormat,coverages:this.parseList(glyphCount,Parser.pointer(Parser.coverage)),lookupRecords:this.parseRecordList(substCount,lookupRecordDesc)};}check.assert(false,'0x'+start.toString(16)+': lookup type 5 format must be 1, 2 or 3.');};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#CC
subtableParsers[6]=function parseLookup6(){var start=this.offset+this.relativeOffset;var substFormat=this.parseUShort();if(substFormat===1){return{substFormat:1,coverage:this.parsePointer(Parser.coverage),chainRuleSets:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(lookupRecordDesc)};})};}else if(substFormat===2){return{substFormat:2,coverage:this.parsePointer(Parser.coverage),backtrackClassDef:this.parsePointer(Parser.classDef),inputClassDef:this.parsePointer(Parser.classDef),lookaheadClassDef:this.parsePointer(Parser.classDef),chainClassSet:this.parseListOfLists(function(){return{backtrack:this.parseUShortList(),input:this.parseUShortList(this.parseShort()-1),lookahead:this.parseUShortList(),lookupRecords:this.parseRecordList(lookupRecordDesc)};})};}else if(substFormat===3){return{substFormat:3,backtrackCoverage:this.parseList(Parser.pointer(Parser.coverage)),inputCoverage:this.parseList(Parser.pointer(Parser.coverage)),lookaheadCoverage:this.parseList(Parser.pointer(Parser.coverage)),lookupRecords:this.parseRecordList(lookupRecordDesc)};}check.assert(false,'0x'+start.toString(16)+': lookup type 6 format must be 1, 2 or 3.');};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#ES
subtableParsers[7]=function parseLookup7(){// Extension Substitution subtable
var substFormat=this.parseUShort();check.argument(substFormat===1,'GSUB Extension Substitution subtable identifier-format must be 1');var extensionLookupType=this.parseUShort();var extensionParser=new Parser(this.data,this.offset+this.parseULong());return{substFormat:1,lookupType:extensionLookupType,extension:subtableParsers[extensionLookupType].call(extensionParser)};};// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#RCCS
subtableParsers[8]=function parseLookup8(){var substFormat=this.parseUShort();check.argument(substFormat===1,'GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1');return{substFormat:substFormat,coverage:this.parsePointer(Parser.coverage),backtrackCoverage:this.parseList(Parser.pointer(Parser.coverage)),lookaheadCoverage:this.parseList(Parser.pointer(Parser.coverage)),substitutes:this.parseUShortList()};};// https://www.microsoft.com/typography/OTSPEC/gsub.htm
function parseGsubTable(data,start){start=start||0;var p=new Parser(data,start);var tableVersion=p.parseVersion();check.argument(tableVersion===1,'Unsupported GSUB table version.');return{version:tableVersion,scripts:p.parseScriptList(),features:p.parseFeatureList(),lookups:p.parseLookupList(subtableParsers)};}// GSUB Writing //////////////////////////////////////////////
var subtableMakers=new Array(9);subtableMakers[1]=function makeLookup1(subtable){if(subtable.substFormat===1){return new table.Table('substitutionTable',[{name:'substFormat',type:'USHORT',value:1},{name:'coverage',type:'TABLE',value:new table.Coverage(subtable.coverage)},{name:'deltaGlyphID',type:'USHORT',value:subtable.deltaGlyphId}]);}else{return new table.Table('substitutionTable',[{name:'substFormat',type:'USHORT',value:2},{name:'coverage',type:'TABLE',value:new table.Coverage(subtable.coverage)}].concat(table.ushortList('substitute',subtable.substitute)));}check.fail('Lookup type 1 substFormat must be 1 or 2.');};subtableMakers[3]=function makeLookup3(subtable){check.assert(subtable.substFormat===1,'Lookup type 3 substFormat must be 1.');return new table.Table('substitutionTable',[{name:'substFormat',type:'USHORT',value:1},{name:'coverage',type:'TABLE',value:new table.Coverage(subtable.coverage)}].concat(table.tableList('altSet',subtable.alternateSets,function(alternateSet){return new table.Table('alternateSetTable',table.ushortList('alternate',alternateSet));})));};subtableMakers[4]=function makeLookup4(subtable){check.assert(subtable.substFormat===1,'Lookup type 4 substFormat must be 1.');return new table.Table('substitutionTable',[{name:'substFormat',type:'USHORT',value:1},{name:'coverage',type:'TABLE',value:new table.Coverage(subtable.coverage)}].concat(table.tableList('ligSet',subtable.ligatureSets,function(ligatureSet){return new table.Table('ligatureSetTable',table.tableList('ligature',ligatureSet,function(ligature){return new table.Table('ligatureTable',[{name:'ligGlyph',type:'USHORT',value:ligature.ligGlyph}].concat(table.ushortList('component',ligature.components,ligature.components.length+1)));}));})));};function makeGsubTable(gsub){return new table.Table('GSUB',[{name:'version',type:'ULONG',value:0x10000},{name:'scripts',type:'TABLE',value:new table.ScriptList(gsub.scripts)},{name:'features',type:'TABLE',value:new table.FeatureList(gsub.features)},{name:'lookups',type:'TABLE',value:new table.LookupList(gsub.lookups,subtableMakers)}]);}var gsub={parse:parseGsubTable,make:makeGsubTable};// The `GPOS` table contains kerning pairs, among other things.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm
// Parse the metadata `meta` table.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6meta.html
function parseMetaTable(data,start){var p=new parse.Parser(data,start);var tableVersion=p.parseULong();check.argument(tableVersion===1,'Unsupported META table version.');p.parseULong();// flags - currently unused and set to 0
p.parseULong();// tableOffset
var numDataMaps=p.parseULong();var tags={};for(var i=0;i<numDataMaps;i++){var tag=p.parseTag();var dataOffset=p.parseULong();var dataLength=p.parseULong();var text=decode.UTF8(data,start+dataOffset,dataLength);tags[tag]=text;}return tags;}function makeMetaTable(tags){var numTags=(0,_keys2.default)(tags).length;var stringPool='';var stringPoolOffset=16+numTags*12;var result=new table.Table('meta',[{name:'version',type:'ULONG',value:1},{name:'flags',type:'ULONG',value:0},{name:'offset',type:'ULONG',value:stringPoolOffset},{name:'numTags',type:'ULONG',value:numTags}]);for(var tag in tags){var pos=stringPool.length;stringPool+=tags[tag];result.fields.push({name:'tag '+tag,type:'TAG',value:tag});result.fields.push({name:'offset '+tag,type:'ULONG',value:stringPoolOffset+pos});result.fields.push({name:'length '+tag,type:'ULONG',value:tags[tag].length});}result.fields.push({name:'stringPool',type:'CHARARRAY',value:stringPool});return result;}var meta={parse:parseMetaTable,make:makeMetaTable};// The `sfnt` wrapper provides organization for the tables in the font.
// It is the top-level data structure in a font.
// https://www.microsoft.com/typography/OTSPEC/otff.htm
// Recommendations for creating OpenType Fonts:
// http://www.microsoft.com/typography/otspec140/recom.htm
function log2(v){return Math.log(v)/Math.log(2)|0;}function computeCheckSum(bytes){while(bytes.length%4!==0){bytes.push(0);}var sum=0;for(var i=0;i<bytes.length;i+=4){sum+=(bytes[i]<<24)+(bytes[i+1]<<16)+(bytes[i+2]<<8)+bytes[i+3];}sum%=Math.pow(2,32);return sum;}function makeTableRecord(tag,checkSum,offset,length){return new table.Record('Table Record',[{name:'tag',type:'TAG',value:tag!==undefined?tag:''},{name:'checkSum',type:'ULONG',value:checkSum!==undefined?checkSum:0},{name:'offset',type:'ULONG',value:offset!==undefined?offset:0},{name:'length',type:'ULONG',value:length!==undefined?length:0}]);}function makeSfntTable(tables){var sfnt=new table.Table('sfnt',[{name:'version',type:'TAG',value:'OTTO'},{name:'numTables',type:'USHORT',value:0},{name:'searchRange',type:'USHORT',value:0},{name:'entrySelector',type:'USHORT',value:0},{name:'rangeShift',type:'USHORT',value:0}]);sfnt.tables=tables;sfnt.numTables=tables.length;var highestPowerOf2=Math.pow(2,log2(sfnt.numTables));sfnt.searchRange=16*highestPowerOf2;sfnt.entrySelector=log2(highestPowerOf2);sfnt.rangeShift=sfnt.numTables*16-sfnt.searchRange;var recordFields=[];var tableFields=[];var offset=sfnt.sizeOf()+makeTableRecord().sizeOf()*sfnt.numTables;while(offset%4!==0){offset+=1;tableFields.push({name:'padding',type:'BYTE',value:0});}for(var i=0;i<tables.length;i+=1){var t=tables[i];check.argument(t.tableName.length===4,'Table name'+t.tableName+' is invalid.');var tableLength=t.sizeOf();var tableRecord=makeTableRecord(t.tableName,computeCheckSum(t.encode()),offset,tableLength);recordFields.push({name:tableRecord.tag+' Table Record',type:'RECORD',value:tableRecord});tableFields.push({name:t.tableName+' table',type:'RECORD',value:t});offset+=tableLength;check.argument(!isNaN(offset),'Something went wrong calculating the offset.');while(offset%4!==0){offset+=1;tableFields.push({name:'padding',type:'BYTE',value:0});}}// Table records need to be sorted alphabetically.
recordFields.sort(function(r1,r2){if(r1.value.tag>r2.value.tag){return 1;}else{return-1;}});sfnt.fields=sfnt.fields.concat(recordFields);sfnt.fields=sfnt.fields.concat(tableFields);return sfnt;}// Get the metrics for a character. If the string has more than one character
// this function returns metrics for the first available character.
// You can provide optional fallback metrics if no characters are available.
function metricsForChar(font,chars,notFoundMetrics){for(var i=0;i<chars.length;i+=1){var glyphIndex=font.charToGlyphIndex(chars[i]);if(glyphIndex>0){var glyph=font.glyphs.get(glyphIndex);return glyph.getMetrics();}}return notFoundMetrics;}function average(vs){var sum=0;for(var i=0;i<vs.length;i+=1){sum+=vs[i];}return sum/vs.length;}// Convert the font object to a SFNT data structure.
// This structure contains all the necessary tables and metadata to create a binary OTF file.
function fontToSfntTable(font){var xMins=[];var yMins=[];var xMaxs=[];var yMaxs=[];var advanceWidths=[];var leftSideBearings=[];var rightSideBearings=[];var firstCharIndex;var lastCharIndex=0;var ulUnicodeRange1=0;var ulUnicodeRange2=0;var ulUnicodeRange3=0;var ulUnicodeRange4=0;for(var i=0;i<font.glyphs.length;i+=1){var glyph=font.glyphs.get(i);var unicode=glyph.unicode|0;if(isNaN(glyph.advanceWidth)){throw new Error('Glyph '+glyph.name+' ('+i+'): advanceWidth is not a number.');}if(firstCharIndex>unicode||firstCharIndex===undefined){// ignore .notdef char
if(unicode>0){firstCharIndex=unicode;}}if(lastCharIndex<unicode){lastCharIndex=unicode;}var position=os2.getUnicodeRange(unicode);if(position<32){ulUnicodeRange1|=1<<position;}else if(position<64){ulUnicodeRange2|=1<<position-32;}else if(position<96){ulUnicodeRange3|=1<<position-64;}else if(position<123){ulUnicodeRange4|=1<<position-96;}else{throw new Error('Unicode ranges bits > 123 are reserved for internal usage');}// Skip non-important characters.
if(glyph.name==='.notdef'){continue;}var metrics=glyph.getMetrics();xMins.push(metrics.xMin);yMins.push(metrics.yMin);xMaxs.push(metrics.xMax);yMaxs.push(metrics.yMax);leftSideBearings.push(metrics.leftSideBearing);rightSideBearings.push(metrics.rightSideBearing);advanceWidths.push(glyph.advanceWidth);}var globals={xMin:Math.min.apply(null,xMins),yMin:Math.min.apply(null,yMins),xMax:Math.max.apply(null,xMaxs),yMax:Math.max.apply(null,yMaxs),advanceWidthMax:Math.max.apply(null,advanceWidths),advanceWidthAvg:average(advanceWidths),minLeftSideBearing:Math.min.apply(null,leftSideBearings),maxLeftSideBearing:Math.max.apply(null,leftSideBearings),minRightSideBearing:Math.min.apply(null,rightSideBearings)};globals.ascender=font.ascender;globals.descender=font.descender;var headTable=head.make({flags:3,// 00000011 (baseline for font at y=0; left sidebearing point at x=0)
unitsPerEm:font.unitsPerEm,xMin:globals.xMin,yMin:globals.yMin,xMax:globals.xMax,yMax:globals.yMax,lowestRecPPEM:3,createdTimestamp:font.createdTimestamp});var hheaTable=hhea.make({ascender:globals.ascender,descender:globals.descender,advanceWidthMax:globals.advanceWidthMax,minLeftSideBearing:globals.minLeftSideBearing,minRightSideBearing:globals.minRightSideBearing,xMaxExtent:globals.maxLeftSideBearing+(globals.xMax-globals.xMin),numberOfHMetrics:font.glyphs.length});var maxpTable=maxp.make(font.glyphs.length);var os2Table=os2.make({xAvgCharWidth:Math.round(globals.advanceWidthAvg),usWeightClass:font.tables.os2.usWeightClass,usWidthClass:font.tables.os2.usWidthClass,usFirstCharIndex:firstCharIndex,usLastCharIndex:lastCharIndex,ulUnicodeRange1:ulUnicodeRange1,ulUnicodeRange2:ulUnicodeRange2,ulUnicodeRange3:ulUnicodeRange3,ulUnicodeRange4:ulUnicodeRange4,fsSelection:font.tables.os2.fsSelection,// REGULAR
// See http://typophile.com/node/13081 for more info on vertical metrics.
// We get metrics for typical characters (such as "x" for xHeight).
// We provide some fallback characters if characters are unavailable: their
// ordering was chosen experimentally.
sTypoAscender:globals.ascender,sTypoDescender:globals.descender,sTypoLineGap:0,usWinAscent:globals.yMax,usWinDescent:Math.abs(globals.yMin),ulCodePageRange1:1,// FIXME: hard-code Latin 1 support for now
sxHeight:metricsForChar(font,'xyvw',{yMax:Math.round(globals.ascender/2)}).yMax,sCapHeight:metricsForChar(font,'HIKLEFJMNTZBDPRAGOQSUVWXY',globals).yMax,usDefaultChar:font.hasChar(' ')?32:0,// Use space as the default character, if available.
usBreakChar:font.hasChar(' ')?32:0// Use space as the break character, if available.
});var hmtxTable=hmtx.make(font.glyphs);var cmapTable=cmap.make(font.glyphs);var englishFamilyName=font.getEnglishName('fontFamily');var englishStyleName=font.getEnglishName('fontSubfamily');var englishFullName=englishFamilyName+' '+englishStyleName;var postScriptName=font.getEnglishName('postScriptName');if(!postScriptName){postScriptName=englishFamilyName.replace(/\s/g,'')+'-'+englishStyleName;}var names={};for(var n in font.names){names[n]=font.names[n];}if(!names.uniqueID){names.uniqueID={en:font.getEnglishName('manufacturer')+':'+englishFullName};}if(!names.postScriptName){names.postScriptName={en:postScriptName};}if(!names.preferredFamily){names.preferredFamily=font.names.fontFamily;}if(!names.preferredSubfamily){names.preferredSubfamily=font.names.fontSubfamily;}var languageTags=[];var nameTable=_name.make(names,languageTags);var ltagTable=languageTags.length>0?ltag.make(languageTags):undefined;var postTable=post.make();var cffTable=cff.make(font.glyphs,{version:font.getEnglishName('version'),fullName:englishFullName,familyName:englishFamilyName,weightName:englishStyleName,postScriptName:postScriptName,unitsPerEm:font.unitsPerEm,fontBBox:[0,globals.yMin,globals.ascender,globals.advanceWidthMax]});var metaTable=font.metas&&(0,_keys2.default)(font.metas).length>0?meta.make(font.metas):undefined;// The order does not matter because makeSfntTable() will sort them.
var tables=[headTable,hheaTable,maxpTable,os2Table,nameTable,cmapTable,postTable,cffTable,hmtxTable];if(ltagTable){tables.push(ltagTable);}// Optional tables
if(font.tables.gsub){tables.push(gsub.make(font.tables.gsub));}if(metaTable){tables.push(metaTable);}var sfntTable=makeSfntTable(tables);// Compute the font's checkSum and store it in head.checkSumAdjustment.
var bytes=sfntTable.encode();var checkSum=computeCheckSum(bytes);var tableFields=sfntTable.fields;var checkSumAdjusted=false;for(var i$1=0;i$1<tableFields.length;i$1+=1){if(tableFields[i$1].name==='head table'){tableFields[i$1].value.checkSumAdjustment=0xB1B0AFBA-checkSum;checkSumAdjusted=true;break;}}if(!checkSumAdjusted){throw new Error('Could not find head table with checkSum to adjust.');}return sfntTable;}var sfnt={make:makeSfntTable,fontToTable:fontToSfntTable,computeCheckSum:computeCheckSum};// The Layout object is the prototype of Substitution objects, and provides
// utility methods to manipulate common layout tables (GPOS, GSUB, GDEF...)
function searchTag(arr,tag){/* jshint bitwise: false */var imin=0;var imax=arr.length-1;while(imin<=imax){var imid=imin+imax>>>1;var val=arr[imid].tag;if(val===tag){return imid;}else if(val<tag){imin=imid+1;}else{imax=imid-1;}}// Not found: return -1-insertion point
return-imin-1;}function binSearch(arr,value){/* jshint bitwise: false */var imin=0;var imax=arr.length-1;while(imin<=imax){var imid=imin+imax>>>1;var val=arr[imid];if(val===value){return imid;}else if(val<value){imin=imid+1;}else{imax=imid-1;}}// Not found: return -1-insertion point
return-imin-1;}/**
	 * @exports opentype.Layout
	 * @class
	 */function Layout(font,tableName){this.font=font;this.tableName=tableName;}Layout.prototype={/**
	     * Binary search an object by "tag" property
	     * @instance
	     * @function searchTag
	     * @memberof opentype.Layout
	     * @param  {Array} arr
	     * @param  {string} tag
	     * @return {number}
	     */searchTag:searchTag,/**
	     * Binary search in a list of numbers
	     * @instance
	     * @function binSearch
	     * @memberof opentype.Layout
	     * @param  {Array} arr
	     * @param  {number} value
	     * @return {number}
	     */binSearch:binSearch,/**
	     * Get or create the Layout table (GSUB, GPOS etc).
	     * @param  {boolean} create - Whether to create a new one.
	     * @return {Object} The GSUB or GPOS table.
	     */getTable:function getTable(create){var layout=this.font.tables[this.tableName];if(!layout&&create){layout=this.font.tables[this.tableName]=this.createDefaultTable();}return layout;},/**
	     * Returns all scripts in the substitution table.
	     * @instance
	     * @return {Array}
	     */getScriptNames:function getScriptNames(){var layout=this.getTable();if(!layout){return[];}return layout.scripts.map(function(script){return script.tag;});},/**
	     * Returns the best bet for a script name.
	     * Returns 'DFLT' if it exists.
	     * If not, returns 'latn' if it exists.
	     * If neither exist, returns undefined.
	     */getDefaultScriptName:function getDefaultScriptName(){var layout=this.getTable();if(!layout){return;}var hasLatn=false;for(var i=0;i<layout.scripts.length;i++){var name=layout.scripts[i].tag;if(name==='DFLT'){return name;}if(name==='latn'){hasLatn=true;}}if(hasLatn){return'latn';}},/**
	     * Returns all LangSysRecords in the given script.
	     * @instance
	     * @param {string} [script='DFLT']
	     * @param {boolean} create - forces the creation of this script table if it doesn't exist.
	     * @return {Object} An object with tag and script properties.
	     */getScriptTable:function getScriptTable(script,create){var layout=this.getTable(create);if(layout){script=script||'DFLT';var scripts=layout.scripts;var pos=searchTag(layout.scripts,script);if(pos>=0){return scripts[pos].script;}else if(create){var scr={tag:script,script:{defaultLangSys:{reserved:0,reqFeatureIndex:0xffff,featureIndexes:[]},langSysRecords:[]}};scripts.splice(-1-pos,0,scr);return scr.script;}}},/**
	     * Returns a language system table
	     * @instance
	     * @param {string} [script='DFLT']
	     * @param {string} [language='dlft']
	     * @param {boolean} create - forces the creation of this langSysTable if it doesn't exist.
	     * @return {Object}
	     */getLangSysTable:function getLangSysTable(script,language,create){var scriptTable=this.getScriptTable(script,create);if(scriptTable){if(!language||language==='dflt'||language==='DFLT'){return scriptTable.defaultLangSys;}var pos=searchTag(scriptTable.langSysRecords,language);if(pos>=0){return scriptTable.langSysRecords[pos].langSys;}else if(create){var langSysRecord={tag:language,langSys:{reserved:0,reqFeatureIndex:0xffff,featureIndexes:[]}};scriptTable.langSysRecords.splice(-1-pos,0,langSysRecord);return langSysRecord.langSys;}}},/**
	     * Get a specific feature table.
	     * @instance
	     * @param {string} [script='DFLT']
	     * @param {string} [language='dlft']
	     * @param {string} feature - One of the codes listed at https://www.microsoft.com/typography/OTSPEC/featurelist.htm
	     * @param {boolean} create - forces the creation of the feature table if it doesn't exist.
	     * @return {Object}
	     */getFeatureTable:function getFeatureTable(script,language,feature,create){var langSysTable=this.getLangSysTable(script,language,create);if(langSysTable){var featureRecord;var featIndexes=langSysTable.featureIndexes;var allFeatures=this.font.tables[this.tableName].features;// The FeatureIndex array of indices is in arbitrary order,
// even if allFeatures is sorted alphabetically by feature tag.
for(var i=0;i<featIndexes.length;i++){featureRecord=allFeatures[featIndexes[i]];if(featureRecord.tag===feature){return featureRecord.feature;}}if(create){var index=allFeatures.length;// Automatic ordering of features would require to shift feature indexes in the script list.
check.assert(index===0||feature>=allFeatures[index-1].tag,'Features must be added in alphabetical order.');featureRecord={tag:feature,feature:{params:0,lookupListIndexes:[]}};allFeatures.push(featureRecord);featIndexes.push(index);return featureRecord.feature;}}},/**
	     * Get the lookup tables of a given type for a script/language/feature.
	     * @instance
	     * @param {string} [script='DFLT']
	     * @param {string} [language='dlft']
	     * @param {string} feature - 4-letter feature code
	     * @param {number} lookupType - 1 to 8
	     * @param {boolean} create - forces the creation of the lookup table if it doesn't exist, with no subtables.
	     * @return {Object[]}
	     */getLookupTables:function getLookupTables(script,language,feature,lookupType,create){var featureTable=this.getFeatureTable(script,language,feature,create);var tables=[];if(featureTable){var lookupTable;var lookupListIndexes=featureTable.lookupListIndexes;var allLookups=this.font.tables[this.tableName].lookups;// lookupListIndexes are in no particular order, so use naive search.
for(var i=0;i<lookupListIndexes.length;i++){lookupTable=allLookups[lookupListIndexes[i]];if(lookupTable.lookupType===lookupType){tables.push(lookupTable);}}if(tables.length===0&&create){lookupTable={lookupType:lookupType,lookupFlag:0,subtables:[],markFilteringSet:undefined};var index=allLookups.length;allLookups.push(lookupTable);lookupListIndexes.push(index);return[lookupTable];}}return tables;},/**
	     * Returns the list of glyph indexes of a coverage table.
	     * Format 1: the list is stored raw
	     * Format 2: compact list as range records.
	     * @instance
	     * @param  {Object} coverageTable
	     * @return {Array}
	     */expandCoverage:function expandCoverage(coverageTable){if(coverageTable.format===1){return coverageTable.glyphs;}else{var glyphs=[];var ranges=coverageTable.ranges;for(var i=0;i<ranges.length;i++){var range=ranges[i];var start=range.start;var end=range.end;for(var j=start;j<=end;j++){glyphs.push(j);}}return glyphs;}}};// The Substitution object provides utility methods to manipulate
// the GSUB substitution table.
/**
	 * @exports opentype.Substitution
	 * @class
	 * @extends opentype.Layout
	 * @param {opentype.Font}
	 * @constructor
	 */function Substitution(font){Layout.call(this,font,'gsub');}// Check if 2 arrays of primitives are equal.
function arraysEqual(ar1,ar2){var n=ar1.length;if(n!==ar2.length){return false;}for(var i=0;i<n;i++){if(ar1[i]!==ar2[i]){return false;}}return true;}// Find the first subtable of a lookup table in a particular format.
function getSubstFormat(lookupTable,format,defaultSubtable){var subtables=lookupTable.subtables;for(var i=0;i<subtables.length;i++){var subtable=subtables[i];if(subtable.substFormat===format){return subtable;}}if(defaultSubtable){subtables.push(defaultSubtable);return defaultSubtable;}return undefined;}Substitution.prototype=Layout.prototype;/**
	 * Create a default GSUB table.
	 * @return {Object} gsub - The GSUB table.
	 */Substitution.prototype.createDefaultTable=function(){// Generate a default empty GSUB table with just a DFLT script and dflt lang sys.
return{version:1,scripts:[{tag:'DFLT',script:{defaultLangSys:{reserved:0,reqFeatureIndex:0xffff,featureIndexes:[]},langSysRecords:[]}}],features:[],lookups:[]};};/**
	 * List all single substitutions (lookup type 1) for a given script, language, and feature.
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 * @param {string} feature - 4-character feature name ('aalt', 'salt', 'ss01'...)
	 * @return {Array} substitutions - The list of substitutions.
	 */Substitution.prototype.getSingle=function(feature,script,language){var this$1=this;var substitutions=[];var lookupTables=this.getLookupTables(script,language,feature,1);for(var idx=0;idx<lookupTables.length;idx++){var subtables=lookupTables[idx].subtables;for(var i=0;i<subtables.length;i++){var subtable=subtables[i];var glyphs=this$1.expandCoverage(subtable.coverage);var j=void 0;if(subtable.substFormat===1){var delta=subtable.deltaGlyphId;for(j=0;j<glyphs.length;j++){var glyph=glyphs[j];substitutions.push({sub:glyph,by:glyph+delta});}}else{var substitute=subtable.substitute;for(j=0;j<glyphs.length;j++){substitutions.push({sub:glyphs[j],by:substitute[j]});}}}}return substitutions;};/**
	 * List all alternates (lookup type 3) for a given script, language, and feature.
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 * @param {string} feature - 4-character feature name ('aalt', 'salt'...)
	 * @return {Array} alternates - The list of alternates
	 */Substitution.prototype.getAlternates=function(feature,script,language){var this$1=this;var alternates=[];var lookupTables=this.getLookupTables(script,language,feature,3);for(var idx=0;idx<lookupTables.length;idx++){var subtables=lookupTables[idx].subtables;for(var i=0;i<subtables.length;i++){var subtable=subtables[i];var glyphs=this$1.expandCoverage(subtable.coverage);var alternateSets=subtable.alternateSets;for(var j=0;j<glyphs.length;j++){alternates.push({sub:glyphs[j],by:alternateSets[j]});}}}return alternates;};/**
	 * List all ligatures (lookup type 4) for a given script, language, and feature.
	 * The result is an array of ligature objects like { sub: [ids], by: id }
	 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 * @return {Array} ligatures - The list of ligatures.
	 */Substitution.prototype.getLigatures=function(feature,script,language){var this$1=this;var ligatures=[];var lookupTables=this.getLookupTables(script,language,feature,4);for(var idx=0;idx<lookupTables.length;idx++){var subtables=lookupTables[idx].subtables;for(var i=0;i<subtables.length;i++){var subtable=subtables[i];var glyphs=this$1.expandCoverage(subtable.coverage);var ligatureSets=subtable.ligatureSets;for(var j=0;j<glyphs.length;j++){var startGlyph=glyphs[j];var ligSet=ligatureSets[j];for(var k=0;k<ligSet.length;k++){var lig=ligSet[k];ligatures.push({sub:[startGlyph].concat(lig.components),by:lig.ligGlyph});}}}}return ligatures;};/**
	 * Add or modify a single substitution (lookup type 1)
	 * Format 2, more flexible, is always used.
	 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
	 * @param {Object} substitution - { sub: id, delta: number } for format 1 or { sub: id, by: id } for format 2.
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 */Substitution.prototype.addSingle=function(feature,substitution,script,language){var lookupTable=this.getLookupTables(script,language,feature,1,true)[0];var subtable=getSubstFormat(lookupTable,2,{// lookup type 1 subtable, format 2, coverage format 1
substFormat:2,coverage:{format:1,glyphs:[]},substitute:[]});check.assert(subtable.coverage.format===1,'Ligature: unable to modify coverage table format '+subtable.coverage.format);var coverageGlyph=substitution.sub;var pos=this.binSearch(subtable.coverage.glyphs,coverageGlyph);if(pos<0){pos=-1-pos;subtable.coverage.glyphs.splice(pos,0,coverageGlyph);subtable.substitute.splice(pos,0,0);}subtable.substitute[pos]=substitution.by;};/**
	 * Add or modify an alternate substitution (lookup type 1)
	 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
	 * @param {Object} substitution - { sub: id, by: [ids] }
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 */Substitution.prototype.addAlternate=function(feature,substitution,script,language){var lookupTable=this.getLookupTables(script,language,feature,3,true)[0];var subtable=getSubstFormat(lookupTable,1,{// lookup type 3 subtable, format 1, coverage format 1
substFormat:1,coverage:{format:1,glyphs:[]},alternateSets:[]});check.assert(subtable.coverage.format===1,'Ligature: unable to modify coverage table format '+subtable.coverage.format);var coverageGlyph=substitution.sub;var pos=this.binSearch(subtable.coverage.glyphs,coverageGlyph);if(pos<0){pos=-1-pos;subtable.coverage.glyphs.splice(pos,0,coverageGlyph);subtable.alternateSets.splice(pos,0,0);}subtable.alternateSets[pos]=substitution.by;};/**
	 * Add a ligature (lookup type 4)
	 * Ligatures with more components must be stored ahead of those with fewer components in order to be found
	 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
	 * @param {Object} ligature - { sub: [ids], by: id }
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 */Substitution.prototype.addLigature=function(feature,ligature,script,language){var lookupTable=this.getLookupTables(script,language,feature,4,true)[0];var subtable=lookupTable.subtables[0];if(!subtable){subtable={// lookup type 4 subtable, format 1, coverage format 1
substFormat:1,coverage:{format:1,glyphs:[]},ligatureSets:[]};lookupTable.subtables[0]=subtable;}check.assert(subtable.coverage.format===1,'Ligature: unable to modify coverage table format '+subtable.coverage.format);var coverageGlyph=ligature.sub[0];var ligComponents=ligature.sub.slice(1);var ligatureTable={ligGlyph:ligature.by,components:ligComponents};var pos=this.binSearch(subtable.coverage.glyphs,coverageGlyph);if(pos>=0){// ligatureSet already exists
var ligatureSet=subtable.ligatureSets[pos];for(var i=0;i<ligatureSet.length;i++){// If ligature already exists, return.
if(arraysEqual(ligatureSet[i].components,ligComponents)){return;}}// ligature does not exist: add it.
ligatureSet.push(ligatureTable);}else{// Create a new ligatureSet and add coverage for the first glyph.
pos=-1-pos;subtable.coverage.glyphs.splice(pos,0,coverageGlyph);subtable.ligatureSets.splice(pos,0,[ligatureTable]);}};/**
	 * List all feature data for a given script and language.
	 * @param {string} feature - 4-letter feature name
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 * @return {Array} substitutions - The list of substitutions.
	 */Substitution.prototype.getFeature=function(feature,script,language){if(/ss\d\d/.test(feature)){// ss01 - ss20
return this.getSingle(feature,script,language);}switch(feature){case'aalt':case'salt':return this.getSingle(feature,script,language).concat(this.getAlternates(feature,script,language));case'dlig':case'liga':case'rlig':return this.getLigatures(feature,script,language);}return undefined;};/**
	 * Add a substitution to a feature for a given script and language.
	 * @param {string} feature - 4-letter feature name
	 * @param {Object} sub - the substitution to add (an object like { sub: id or [ids], by: id or [ids] })
	 * @param {string} [script='DFLT']
	 * @param {string} [language='dflt']
	 */Substitution.prototype.add=function(feature,sub,script,language){if(/ss\d\d/.test(feature)){// ss01 - ss20
return this.addSingle(feature,sub,script,language);}switch(feature){case'aalt':case'salt':if(typeof sub.by==='number'){return this.addSingle(feature,sub,script,language);}return this.addAlternate(feature,sub,script,language);case'dlig':case'liga':case'rlig':return this.addLigature(feature,sub,script,language);}return undefined;};function isBrowser(){return typeof window!=='undefined';}function nodeBufferToArrayBuffer(buffer){var ab=new ArrayBuffer(buffer.length);var view=new Uint8Array(ab);for(var i=0;i<buffer.length;++i){view[i]=buffer[i];}return ab;}function arrayBufferToNodeBuffer(ab){var buffer=new Buffer(ab.byteLength);var view=new Uint8Array(ab);for(var i=0;i<buffer.length;++i){buffer[i]=view[i];}return buffer;}function checkArgument(expression,message){if(!expression){throw message;}}/* A TrueType font hinting interpreter.
	*
	* (c) 2017 Axel Kittenberger
	*
	* This interpreter has been implemented according to this documentation:
	* https://developer.apple.com/fonts/TrueType-Reference-Manual/RM05/Chap5.html
	*
	* According to the documentation F24DOT6 values are used for pixels.
	* That means calculation is 1/64 pixel accurate and uses integer operations.
	* However, Javascript has floating point operations by default and only
	* those are available. One could make a case to simulate the 1/64 accuracy
	* exactly by truncating after every division operation
	* (for example with << 0) to get pixel exactly results as other TrueType
	* implementations. It may make sense since some fonts are pixel optimized
	* by hand using DELTAP instructions. The current implementation doesn't
	* and rather uses full floating point precision.
	*
	* xScale, yScale and rotation is currently ignored.
	*
	* A few non-trivial instructions are missing as I didn't encounter yet
	* a font that used them to test a possible implementation.
	*
	* Some fonts seem to use undocumented features regarding the twilight zone.
	* Only some of them are implemented as they were encountered.
	*
	* The exports.DEBUG statements are removed on the minified distribution file.
	*/var instructionTable;var exec;var execGlyph;var execComponent;/*
	* Creates a hinting object.
	*
	* There ought to be exactly one
	* for each truetype font that is used for hinting.
	*/function Hinting(font){// the font this hinting object is for
this.font=font;// cached states
this._fpgmState=this._prepState=undefined;// errorState
// 0 ... all okay
// 1 ... had an error in a glyf,
//       continue working but stop spamming
//       the console
// 2 ... error at prep, stop hinting at this ppem
// 3 ... error at fpeg, stop hinting for this font at all
this._errorState=0;}/*
	* Not rounding.
	*/function roundOff(v){return v;}/*
	* Rounding to grid.
	*/function roundToGrid(v){//Rounding in TT is supposed to "symmetrical around zero"
return(0,_sign2.default)(v)*Math.round(Math.abs(v));}/*
	* Rounding to double grid.
	*/function roundToDoubleGrid(v){return(0,_sign2.default)(v)*Math.round(Math.abs(v*2))/2;}/*
	* Rounding to half grid.
	*/function roundToHalfGrid(v){return(0,_sign2.default)(v)*(Math.round(Math.abs(v)+0.5)-0.5);}/*
	* Rounding to up to grid.
	*/function roundUpToGrid(v){return(0,_sign2.default)(v)*Math.ceil(Math.abs(v));}/*
	* Rounding to down to grid.
	*/function roundDownToGrid(v){return(0,_sign2.default)(v)*Math.floor(Math.abs(v));}/*
	* Super rounding.
	*/var roundSuper=function roundSuper(v){var period=this.srPeriod;var phase=this.srPhase;var threshold=this.srThreshold;var sign=1;if(v<0){v=-v;sign=-1;}v+=threshold-phase;v=(0,_trunc2.default)(v/period)*period;v+=phase;// according to http://xgridfit.sourceforge.net/round.html
if(sign>0&&v<0){return phase;}if(sign<0&&v>0){return-phase;}return v*sign;};/*
	* Unit vector of x-axis.
	*/var xUnitVector={x:1,y:0,axis:'x',// Gets the projected distance between two points.
// o1/o2 ... if true, respective original position is used.
distance:function distance(p1,p2,o1,o2){return(o1?p1.xo:p1.x)-(o2?p2.xo:p2.x);},// Moves point p so the moved position has the same relative
// position to the moved positions of rp1 and rp2 than the
// original positions had.
//
// See APPENDIX on INTERPOLATE at the bottom of this file.
interpolate:function interpolate(p,rp1,rp2,pv){var do1;var do2;var doa1;var doa2;var dm1;var dm2;var dt;if(!pv||pv===this){do1=p.xo-rp1.xo;do2=p.xo-rp2.xo;dm1=rp1.x-rp1.xo;dm2=rp2.x-rp2.xo;doa1=Math.abs(do1);doa2=Math.abs(do2);dt=doa1+doa2;if(dt===0){p.x=p.xo+(dm1+dm2)/2;return;}p.x=p.xo+(dm1*doa2+dm2*doa1)/dt;return;}do1=pv.distance(p,rp1,true,true);do2=pv.distance(p,rp2,true,true);dm1=pv.distance(rp1,rp1,false,true);dm2=pv.distance(rp2,rp2,false,true);doa1=Math.abs(do1);doa2=Math.abs(do2);dt=doa1+doa2;if(dt===0){xUnitVector.setRelative(p,p,(dm1+dm2)/2,pv,true);return;}xUnitVector.setRelative(p,p,(dm1*doa2+dm2*doa1)/dt,pv,true);},// Slope of line normal to this
normalSlope:Number.NEGATIVE_INFINITY,// Sets the point 'p' relative to point 'rp'
// by the distance 'd'.
//
// See APPENDIX on SETRELATIVE at the bottom of this file.
//
// p   ... point to set
// rp  ... reference point
// d   ... distance on projection vector
// pv  ... projection vector (undefined = this)
// org ... if true, uses the original position of rp as reference.
setRelative:function setRelative(p,rp,d,pv,org){if(!pv||pv===this){p.x=(org?rp.xo:rp.x)+d;return;}var rpx=org?rp.xo:rp.x;var rpy=org?rp.yo:rp.y;var rpdx=rpx+d*pv.x;var rpdy=rpy+d*pv.y;p.x=rpdx+(p.y-rpdy)/pv.normalSlope;},// Slope of vector line.
slope:0,// Touches the point p.
touch:function touch(p){p.xTouched=true;},// Tests if a point p is touched.
touched:function touched(p){return p.xTouched;},// Untouches the point p.
untouch:function untouch(p){p.xTouched=false;}};/*
	* Unit vector of y-axis.
	*/var yUnitVector={x:0,y:1,axis:'y',// Gets the projected distance between two points.
// o1/o2 ... if true, respective original position is used.
distance:function distance(p1,p2,o1,o2){return(o1?p1.yo:p1.y)-(o2?p2.yo:p2.y);},// Moves point p so the moved position has the same relative
// position to the moved positions of rp1 and rp2 than the
// original positions had.
//
// See APPENDIX on INTERPOLATE at the bottom of this file.
interpolate:function interpolate(p,rp1,rp2,pv){var do1;var do2;var doa1;var doa2;var dm1;var dm2;var dt;if(!pv||pv===this){do1=p.yo-rp1.yo;do2=p.yo-rp2.yo;dm1=rp1.y-rp1.yo;dm2=rp2.y-rp2.yo;doa1=Math.abs(do1);doa2=Math.abs(do2);dt=doa1+doa2;if(dt===0){p.y=p.yo+(dm1+dm2)/2;return;}p.y=p.yo+(dm1*doa2+dm2*doa1)/dt;return;}do1=pv.distance(p,rp1,true,true);do2=pv.distance(p,rp2,true,true);dm1=pv.distance(rp1,rp1,false,true);dm2=pv.distance(rp2,rp2,false,true);doa1=Math.abs(do1);doa2=Math.abs(do2);dt=doa1+doa2;if(dt===0){yUnitVector.setRelative(p,p,(dm1+dm2)/2,pv,true);return;}yUnitVector.setRelative(p,p,(dm1*doa2+dm2*doa1)/dt,pv,true);},// Slope of line normal to this.
normalSlope:0,// Sets the point 'p' relative to point 'rp'
// by the distance 'd'
//
// See APPENDIX on SETRELATIVE at the bottom of this file.
//
// p   ... point to set
// rp  ... reference point
// d   ... distance on projection vector
// pv  ... projection vector (undefined = this)
// org ... if true, uses the original position of rp as reference.
setRelative:function setRelative(p,rp,d,pv,org){if(!pv||pv===this){p.y=(org?rp.yo:rp.y)+d;return;}var rpx=org?rp.xo:rp.x;var rpy=org?rp.yo:rp.y;var rpdx=rpx+d*pv.x;var rpdy=rpy+d*pv.y;p.y=rpdy+pv.normalSlope*(p.x-rpdx);},// Slope of vector line.
slope:Number.POSITIVE_INFINITY,// Touches the point p.
touch:function touch(p){p.yTouched=true;},// Tests if a point p is touched.
touched:function touched(p){return p.yTouched;},// Untouches the point p.
untouch:function untouch(p){p.yTouched=false;}};(0,_freeze2.default)(xUnitVector);(0,_freeze2.default)(yUnitVector);/*
	* Creates a unit vector that is not x- or y-axis.
	*/function UnitVector(x,y){this.x=x;this.y=y;this.axis=undefined;this.slope=y/x;this.normalSlope=-x/y;(0,_freeze2.default)(this);}/*
	* Gets the projected distance between two points.
	* o1/o2 ... if true, respective original position is used.
	*/UnitVector.prototype.distance=function(p1,p2,o1,o2){return this.x*xUnitVector.distance(p1,p2,o1,o2)+this.y*yUnitVector.distance(p1,p2,o1,o2);};/*
	* Moves point p so the moved position has the same relative
	* position to the moved positions of rp1 and rp2 than the
	* original positions had.
	*
	* See APPENDIX on INTERPOLATE at the bottom of this file.
	*/UnitVector.prototype.interpolate=function(p,rp1,rp2,pv){var dm1;var dm2;var do1;var do2;var doa1;var doa2;var dt;do1=pv.distance(p,rp1,true,true);do2=pv.distance(p,rp2,true,true);dm1=pv.distance(rp1,rp1,false,true);dm2=pv.distance(rp2,rp2,false,true);doa1=Math.abs(do1);doa2=Math.abs(do2);dt=doa1+doa2;if(dt===0){this.setRelative(p,p,(dm1+dm2)/2,pv,true);return;}this.setRelative(p,p,(dm1*doa2+dm2*doa1)/dt,pv,true);};/*
	* Sets the point 'p' relative to point 'rp'
	* by the distance 'd'
	*
	* See APPENDIX on SETRELATIVE at the bottom of this file.
	*
	* p   ...  point to set
	* rp  ... reference point
	* d   ... distance on projection vector
	* pv  ... projection vector (undefined = this)
	* org ... if true, uses the original position of rp as reference.
	*/UnitVector.prototype.setRelative=function(p,rp,d,pv,org){pv=pv||this;var rpx=org?rp.xo:rp.x;var rpy=org?rp.yo:rp.y;var rpdx=rpx+d*pv.x;var rpdy=rpy+d*pv.y;var pvns=pv.normalSlope;var fvs=this.slope;var px=p.x;var py=p.y;p.x=(fvs*px-pvns*rpdx+rpdy-py)/(fvs-pvns);p.y=fvs*(p.x-px)+py;};/*
	* Touches the point p.
	*/UnitVector.prototype.touch=function(p){p.xTouched=true;p.yTouched=true;};/*
	* Returns a unit vector with x/y coordinates.
	*/function getUnitVector(x,y){var d=Math.sqrt(x*x+y*y);x/=d;y/=d;if(x===1&&y===0){return xUnitVector;}else if(x===0&&y===1){return yUnitVector;}else{return new UnitVector(x,y);}}/*
	* Creates a point in the hinting engine.
	*/function HPoint(x,y,lastPointOfContour,onCurve){this.x=this.xo=Math.round(x*64)/64;// hinted x value and original x-value
this.y=this.yo=Math.round(y*64)/64;// hinted y value and original y-value
this.lastPointOfContour=lastPointOfContour;this.onCurve=onCurve;this.prevPointOnContour=undefined;this.nextPointOnContour=undefined;this.xTouched=false;this.yTouched=false;(0,_preventExtensions2.default)(this);}/*
	* Returns the next touched point on the contour.
	*
	* v  ... unit vector to test touch axis.
	*/HPoint.prototype.nextTouched=function(v){var p=this.nextPointOnContour;while(!v.touched(p)&&p!==this){p=p.nextPointOnContour;}return p;};/*
	* Returns the previous touched point on the contour
	*
	* v  ... unit vector to test touch axis.
	*/HPoint.prototype.prevTouched=function(v){var p=this.prevPointOnContour;while(!v.touched(p)&&p!==this){p=p.prevPointOnContour;}return p;};/*
	* The zero point.
	*/var HPZero=(0,_freeze2.default)(new HPoint(0,0));/*
	* The default state of the interpreter.
	*
	* Note: Freezing the defaultState and then deriving from it
	* makes the V8 Javascript engine going awkward,
	* so this is avoided, albeit the defaultState shouldn't
	* ever change.
	*/var defaultState={cvCutIn:17/16,// control value cut in
deltaBase:9,deltaShift:0.125,loop:1,// loops some instructions
minDis:1,// minimum distance
autoFlip:true};/*
	* The current state of the interpreter.
	*
	* env  ... 'fpgm' or 'prep' or 'glyf'
	* prog ... the program
	*/function State(env,prog){this.env=env;this.stack=[];this.prog=prog;switch(env){case'glyf':this.zp0=this.zp1=this.zp2=1;this.rp0=this.rp1=this.rp2=0;/* fall through */case'prep':this.fv=this.pv=this.dpv=xUnitVector;this.round=roundToGrid;}}/*
	* Executes a glyph program.
	*
	* This does the hinting for each glyph.
	*
	* Returns an array of moved points.
	*
	* glyph: the glyph to hint
	* ppem: the size the glyph is rendered for
	*/Hinting.prototype.exec=function(glyph,ppem){if(typeof ppem!=='number'){throw new Error('Point size is not a number!');}// Received a fatal error, don't do any hinting anymore.
if(this._errorState>2){return;}var font=this.font;var prepState=this._prepState;if(!prepState||prepState.ppem!==ppem){var fpgmState=this._fpgmState;if(!fpgmState){// Executes the fpgm state.
// This is used by fonts to define functions.
State.prototype=defaultState;fpgmState=this._fpgmState=new State('fpgm',font.tables.fpgm);fpgmState.funcs=[];fpgmState.font=font;if(exports.DEBUG){console.log('---EXEC FPGM---');fpgmState.step=-1;}try{exec(fpgmState);}catch(e){console.log('Hinting error in FPGM:'+e);this._errorState=3;return;}}// Executes the prep program for this ppem setting.
// This is used by fonts to set cvt values
// depending on to be rendered font size.
State.prototype=fpgmState;prepState=this._prepState=new State('prep',font.tables.prep);prepState.ppem=ppem;// Creates a copy of the cvt table
// and scales it to the current ppem setting.
var oCvt=font.tables.cvt;if(oCvt){var cvt=prepState.cvt=new Array(oCvt.length);var scale=ppem/font.unitsPerEm;for(var c=0;c<oCvt.length;c++){cvt[c]=oCvt[c]*scale;}}else{prepState.cvt=[];}if(exports.DEBUG){console.log('---EXEC PREP---');prepState.step=-1;}try{exec(prepState);}catch(e){if(this._errorState<2){console.log('Hinting error in PREP:'+e);}this._errorState=2;}}if(this._errorState>1){return;}try{return execGlyph(glyph,prepState);}catch(e){if(this._errorState<1){console.log('Hinting error:'+e);console.log('Note: further hinting errors are silenced');}this._errorState=1;return undefined;}};/*
	* Executes the hinting program for a glyph.
	*/execGlyph=function execGlyph(glyph,prepState){// original point positions
var xScale=prepState.ppem/prepState.font.unitsPerEm;var yScale=xScale;var components=glyph.components;var contours;var gZone;var state;State.prototype=prepState;if(!components){state=new State('glyf',glyph.instructions);if(exports.DEBUG){console.log('---EXEC GLYPH---');state.step=-1;}execComponent(glyph,state,xScale,yScale);gZone=state.gZone;}else{var font=prepState.font;gZone=[];contours=[];for(var i=0;i<components.length;i++){var c=components[i];var cg=font.glyphs.get(c.glyphIndex);state=new State('glyf',cg.instructions);if(exports.DEBUG){console.log('---EXEC COMP '+i+'---');state.step=-1;}execComponent(cg,state,xScale,yScale);// appends the computed points to the result array
// post processes the component points
var dx=Math.round(c.dx*xScale);var dy=Math.round(c.dy*yScale);var gz=state.gZone;var cc=state.contours;for(var pi=0;pi<gz.length;pi++){var p=gz[pi];p.xTouched=p.yTouched=false;p.xo=p.x=p.x+dx;p.yo=p.y=p.y+dy;}var gLen=gZone.length;gZone.push.apply(gZone,gz);for(var j=0;j<cc.length;j++){contours.push(cc[j]+gLen);}}if(glyph.instructions&&!state.inhibitGridFit){// the composite has instructions on its own
state=new State('glyf',glyph.instructions);state.gZone=state.z0=state.z1=state.z2=gZone;state.contours=contours;// note: HPZero cannot be used here, since
//       the point might be modified
gZone.push(new HPoint(0,0),new HPoint(Math.round(glyph.advanceWidth*xScale),0));if(exports.DEBUG){console.log('---EXEC COMPOSITE---');state.step=-1;}exec(state);gZone.length-=2;}}return gZone;};/*
	* Executes the hinting program for a component of a multi-component glyph
	* or of the glyph itself by a non-component glyph.
	*/execComponent=function execComponent(glyph,state,xScale,yScale){var points=glyph.points||[];var pLen=points.length;var gZone=state.gZone=state.z0=state.z1=state.z2=[];var contours=state.contours=[];// Scales the original points and
// makes copies for the hinted points.
var cp;// current point
for(var i=0;i<pLen;i++){cp=points[i];gZone[i]=new HPoint(cp.x*xScale,cp.y*yScale,cp.lastPointOfContour,cp.onCurve);}// Chain links the contours.
var sp;// start point
var np;// next point
for(var i$1=0;i$1<pLen;i$1++){cp=gZone[i$1];if(!sp){sp=cp;contours.push(i$1);}if(cp.lastPointOfContour){cp.nextPointOnContour=sp;sp.prevPointOnContour=cp;sp=undefined;}else{np=gZone[i$1+1];cp.nextPointOnContour=np;np.prevPointOnContour=cp;}}if(state.inhibitGridFit){return;}gZone.push(new HPoint(0,0),new HPoint(Math.round(glyph.advanceWidth*xScale),0));exec(state);// Removes the extra points.
gZone.length-=2;if(exports.DEBUG){console.log('FINISHED GLYPH',state.stack);for(var i$2=0;i$2<pLen;i$2++){console.log(i$2,gZone[i$2].x,gZone[i$2].y);}}};/*
	* Executes the program loaded in state.
	*/exec=function exec(state){var prog=state.prog;if(!prog){return;}var pLen=prog.length;var ins;for(state.ip=0;state.ip<pLen;state.ip++){if(exports.DEBUG){state.step++;}ins=instructionTable[prog[state.ip]];if(!ins){throw new Error('unknown instruction: 0x'+Number(prog[state.ip]).toString(16));}ins(state);// very extensive debugging for each step
/*
	        if (exports.DEBUG) {
	            var da;
	            if (state.gZone) {
	                da = [];
	                for (let i = 0; i < state.gZone.length; i++)
	                {
	                    da.push(i + ' ' +
	                        state.gZone[i].x * 64 + ' ' +
	                        state.gZone[i].y * 64 + ' ' +
	                        (state.gZone[i].xTouched ? 'x' : '') +
	                        (state.gZone[i].yTouched ? 'y' : '')
	                    );
	                }
	                console.log('GZ', da);
	            }
	
	            if (state.tZone) {
	                da = [];
	                for (let i = 0; i < state.tZone.length; i++) {
	                    da.push(i + ' ' +
	                        state.tZone[i].x * 64 + ' ' +
	                        state.tZone[i].y * 64 + ' ' +
	                        (state.tZone[i].xTouched ? 'x' : '') +
	                        (state.tZone[i].yTouched ? 'y' : '')
	                    );
	                }
	                console.log('TZ', da);
	            }
	
	            if (state.stack.length > 10) {
	                console.log(
	                    state.stack.length,
	                    '...', state.stack.slice(state.stack.length - 10)
	                );
	            } else {
	                console.log(state.stack.length, state.stack);
	            }
	        }
	        */}};/*
	* Initializes the twilight zone.
	*
	* This is only done if a SZPx instruction
	* refers to the twilight zone.
	*/function initTZone(state){var tZone=state.tZone=new Array(state.gZone.length);// no idea if this is actually correct...
for(var i=0;i<tZone.length;i++){tZone[i]=new HPoint(0,0);}}/*
	* Skips the instruction pointer ahead over an IF/ELSE block.
	* handleElse .. if true breaks on matching ELSE
	*/function skip(state,handleElse){var prog=state.prog;var ip=state.ip;var nesting=1;var ins;do{ins=prog[++ip];if(ins===0x58)// IF
{nesting++;}else if(ins===0x59)// EIF
{nesting--;}else if(ins===0x40)// NPUSHB
{ip+=prog[ip+1]+1;}else if(ins===0x41)// NPUSHW
{ip+=2*prog[ip+1]+1;}else if(ins>=0xB0&&ins<=0xB7)// PUSHB
{ip+=ins-0xB0+1;}else if(ins>=0xB8&&ins<=0xBF)// PUSHW
{ip+=(ins-0xB8+1)*2;}else if(handleElse&&nesting===1&&ins===0x1B)// ELSE
{break;}}while(nesting>0);state.ip=ip;}/*----------------------------------------------------------*
	*          And then a lot of instructions...                *
	*----------------------------------------------------------*/// SVTCA[a] Set freedom and projection Vectors To Coordinate Axis
// 0x00-0x01
function SVTCA(v,state){if(exports.DEBUG){console.log(state.step,'SVTCA['+v.axis+']');}state.fv=state.pv=state.dpv=v;}// SPVTCA[a] Set Projection Vector to Coordinate Axis
// 0x02-0x03
function SPVTCA(v,state){if(exports.DEBUG){console.log(state.step,'SPVTCA['+v.axis+']');}state.pv=state.dpv=v;}// SFVTCA[a] Set Freedom Vector to Coordinate Axis
// 0x04-0x05
function SFVTCA(v,state){if(exports.DEBUG){console.log(state.step,'SFVTCA['+v.axis+']');}state.fv=v;}// SPVTL[a] Set Projection Vector To Line
// 0x06-0x07
function SPVTL(a,state){var stack=state.stack;var p2i=stack.pop();var p1i=stack.pop();var p2=state.z2[p2i];var p1=state.z1[p1i];if(exports.DEBUG){console.log('SPVTL['+a+']',p2i,p1i);}var dx;var dy;if(!a){dx=p1.x-p2.x;dy=p1.y-p2.y;}else{dx=p2.y-p1.y;dy=p1.x-p2.x;}state.pv=state.dpv=getUnitVector(dx,dy);}// SFVTL[a] Set Freedom Vector To Line
// 0x08-0x09
function SFVTL(a,state){var stack=state.stack;var p2i=stack.pop();var p1i=stack.pop();var p2=state.z2[p2i];var p1=state.z1[p1i];if(exports.DEBUG){console.log('SFVTL['+a+']',p2i,p1i);}var dx;var dy;if(!a){dx=p1.x-p2.x;dy=p1.y-p2.y;}else{dx=p2.y-p1.y;dy=p1.x-p2.x;}state.fv=getUnitVector(dx,dy);}// SPVFS[] Set Projection Vector From Stack
// 0x0A
function SPVFS(state){var stack=state.stack;var y=stack.pop();var x=stack.pop();if(exports.DEBUG){console.log(state.step,'SPVFS[]',y,x);}state.pv=state.dpv=getUnitVector(x,y);}// SFVFS[] Set Freedom Vector From Stack
// 0x0B
function SFVFS(state){var stack=state.stack;var y=stack.pop();var x=stack.pop();if(exports.DEBUG){console.log(state.step,'SPVFS[]',y,x);}state.fv=getUnitVector(x,y);}// GPV[] Get Projection Vector
// 0x0C
function GPV(state){var stack=state.stack;var pv=state.pv;if(exports.DEBUG){console.log(state.step,'GPV[]');}stack.push(pv.x*0x4000);stack.push(pv.y*0x4000);}// GFV[] Get Freedom Vector
// 0x0C
function GFV(state){var stack=state.stack;var fv=state.fv;if(exports.DEBUG){console.log(state.step,'GFV[]');}stack.push(fv.x*0x4000);stack.push(fv.y*0x4000);}// SFVTPV[] Set Freedom Vector To Projection Vector
// 0x0E
function SFVTPV(state){state.fv=state.pv;if(exports.DEBUG){console.log(state.step,'SFVTPV[]');}}// ISECT[] moves point p to the InterSECTion of two lines
// 0x0F
function ISECT(state){var stack=state.stack;var pa0i=stack.pop();var pa1i=stack.pop();var pb0i=stack.pop();var pb1i=stack.pop();var pi=stack.pop();var z0=state.z0;var z1=state.z1;var pa0=z0[pa0i];var pa1=z0[pa1i];var pb0=z1[pb0i];var pb1=z1[pb1i];var p=state.z2[pi];if(exports.DEBUG){console.log('ISECT[], ',pa0i,pa1i,pb0i,pb1i,pi);}// math from
// en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
var x1=pa0.x;var y1=pa0.y;var x2=pa1.x;var y2=pa1.y;var x3=pb0.x;var y3=pb0.y;var x4=pb1.x;var y4=pb1.y;var div=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);var f1=x1*y2-y1*x2;var f2=x3*y4-y3*x4;p.x=(f1*(x3-x4)-f2*(x1-x2))/div;p.y=(f1*(y3-y4)-f2*(y1-y2))/div;}// SRP0[] Set Reference Point 0
// 0x10
function SRP0(state){state.rp0=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SRP0[]',state.rp0);}}// SRP1[] Set Reference Point 1
// 0x11
function SRP1(state){state.rp1=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SRP1[]',state.rp1);}}// SRP1[] Set Reference Point 2
// 0x12
function SRP2(state){state.rp2=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SRP2[]',state.rp2);}}// SZP0[] Set Zone Pointer 0
// 0x13
function SZP0(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SZP0[]',n);}state.zp0=n;switch(n){case 0:if(!state.tZone){initTZone(state);}state.z0=state.tZone;break;case 1:state.z0=state.gZone;break;default:throw new Error('Invalid zone pointer');}}// SZP1[] Set Zone Pointer 1
// 0x14
function SZP1(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SZP1[]',n);}state.zp1=n;switch(n){case 0:if(!state.tZone){initTZone(state);}state.z1=state.tZone;break;case 1:state.z1=state.gZone;break;default:throw new Error('Invalid zone pointer');}}// SZP2[] Set Zone Pointer 2
// 0x15
function SZP2(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SZP2[]',n);}state.zp2=n;switch(n){case 0:if(!state.tZone){initTZone(state);}state.z2=state.tZone;break;case 1:state.z2=state.gZone;break;default:throw new Error('Invalid zone pointer');}}// SZPS[] Set Zone PointerS
// 0x16
function SZPS(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SZPS[]',n);}state.zp0=state.zp1=state.zp2=n;switch(n){case 0:if(!state.tZone){initTZone(state);}state.z0=state.z1=state.z2=state.tZone;break;case 1:state.z0=state.z1=state.z2=state.gZone;break;default:throw new Error('Invalid zone pointer');}}// SLOOP[] Set LOOP variable
// 0x17
function SLOOP(state){state.loop=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SLOOP[]',state.loop);}}// RTG[] Round To Grid
// 0x18
function RTG(state){if(exports.DEBUG){console.log(state.step,'RTG[]');}state.round=roundToGrid;}// RTHG[] Round To Half Grid
// 0x19
function RTHG(state){if(exports.DEBUG){console.log(state.step,'RTHG[]');}state.round=roundToHalfGrid;}// SMD[] Set Minimum Distance
// 0x1A
function SMD(state){var d=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SMD[]',d);}state.minDis=d/0x40;}// ELSE[] ELSE clause
// 0x1B
function ELSE(state){// This instruction has been reached by executing a then branch
// so it just skips ahead until matching EIF.
//
// In case the IF was negative the IF[] instruction already
// skipped forward over the ELSE[]
if(exports.DEBUG){console.log(state.step,'ELSE[]');}skip(state,false);}// JMPR[] JuMP Relative
// 0x1C
function JMPR(state){var o=state.stack.pop();if(exports.DEBUG){console.log(state.step,'JMPR[]',o);}// A jump by 1 would do nothing.
state.ip+=o-1;}// SCVTCI[] Set Control Value Table Cut-In
// 0x1D
function SCVTCI(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SCVTCI[]',n);}state.cvCutIn=n/0x40;}// DUP[] DUPlicate top stack element
// 0x20
function DUP(state){var stack=state.stack;if(exports.DEBUG){console.log(state.step,'DUP[]');}stack.push(stack[stack.length-1]);}// POP[] POP top stack element
// 0x21
function POP(state){if(exports.DEBUG){console.log(state.step,'POP[]');}state.stack.pop();}// CLEAR[] CLEAR the stack
// 0x22
function CLEAR(state){if(exports.DEBUG){console.log(state.step,'CLEAR[]');}state.stack.length=0;}// SWAP[] SWAP the top two elements on the stack
// 0x23
function SWAP(state){var stack=state.stack;var a=stack.pop();var b=stack.pop();if(exports.DEBUG){console.log(state.step,'SWAP[]');}stack.push(a);stack.push(b);}// DEPTH[] DEPTH of the stack
// 0x24
function DEPTH(state){var stack=state.stack;if(exports.DEBUG){console.log(state.step,'DEPTH[]');}stack.push(stack.length);}// LOOPCALL[] LOOPCALL function
// 0x2A
function LOOPCALL(state){var stack=state.stack;var fn=stack.pop();var c=stack.pop();if(exports.DEBUG){console.log(state.step,'LOOPCALL[]',fn,c);}// saves callers program
var cip=state.ip;var cprog=state.prog;state.prog=state.funcs[fn];// executes the function
for(var i=0;i<c;i++){exec(state);if(exports.DEBUG){console.log(++state.step,i+1<c?'next loopcall':'done loopcall',i);}}// restores the callers program
state.ip=cip;state.prog=cprog;}// CALL[] CALL function
// 0x2B
function CALL(state){var fn=state.stack.pop();if(exports.DEBUG){console.log(state.step,'CALL[]',fn);}// saves callers program
var cip=state.ip;var cprog=state.prog;state.prog=state.funcs[fn];// executes the function
exec(state);// restores the callers program
state.ip=cip;state.prog=cprog;if(exports.DEBUG){console.log(++state.step,'returning from',fn);}}// CINDEX[] Copy the INDEXed element to the top of the stack
// 0x25
function CINDEX(state){var stack=state.stack;var k=stack.pop();if(exports.DEBUG){console.log(state.step,'CINDEX[]',k);}// In case of k == 1, it copies the last element after popping
// thus stack.length - k.
stack.push(stack[stack.length-k]);}// MINDEX[] Move the INDEXed element to the top of the stack
// 0x26
function MINDEX(state){var stack=state.stack;var k=stack.pop();if(exports.DEBUG){console.log(state.step,'MINDEX[]',k);}stack.push(stack.splice(stack.length-k,1)[0]);}// FDEF[] Function DEFinition
// 0x2C
function FDEF(state){if(state.env!=='fpgm'){throw new Error('FDEF not allowed here');}var stack=state.stack;var prog=state.prog;var ip=state.ip;var fn=stack.pop();var ipBegin=ip;if(exports.DEBUG){console.log(state.step,'FDEF[]',fn);}while(prog[++ip]!==0x2D){}state.ip=ip;state.funcs[fn]=prog.slice(ipBegin+1,ip);}// MDAP[a] Move Direct Absolute Point
// 0x2E-0x2F
function MDAP(round,state){var pi=state.stack.pop();var p=state.z0[pi];var fv=state.fv;var pv=state.pv;if(exports.DEBUG){console.log(state.step,'MDAP['+round+']',pi);}var d=pv.distance(p,HPZero);if(round){d=state.round(d);}fv.setRelative(p,HPZero,d,pv);fv.touch(p);state.rp0=state.rp1=pi;}// IUP[a] Interpolate Untouched Points through the outline
// 0x30
function IUP(v,state){var z2=state.z2;var pLen=z2.length-2;var cp;var pp;var np;if(exports.DEBUG){console.log(state.step,'IUP['+v.axis+']');}for(var i=0;i<pLen;i++){cp=z2[i];// current point
// if this point has been touched go on
if(v.touched(cp)){continue;}pp=cp.prevTouched(v);// no point on the contour has been touched?
if(pp===cp){continue;}np=cp.nextTouched(v);if(pp===np){// only one point on the contour has been touched
// so simply moves the point like that
v.setRelative(cp,cp,v.distance(pp,pp,false,true),v,true);}v.interpolate(cp,pp,np,v);}}// SHP[] SHift Point using reference point
// 0x32-0x33
function SHP(a,state){var stack=state.stack;var rpi=a?state.rp1:state.rp2;var rp=(a?state.z0:state.z1)[rpi];var fv=state.fv;var pv=state.pv;var loop=state.loop;var z2=state.z2;while(loop--){var pi=stack.pop();var p=z2[pi];var d=pv.distance(rp,rp,false,true);fv.setRelative(p,p,d,pv);fv.touch(p);if(exports.DEBUG){console.log(state.step,(state.loop>1?'loop '+(state.loop-loop)+': ':'')+'SHP['+(a?'rp1':'rp2')+']',pi);}}state.loop=1;}// SHC[] SHift Contour using reference point
// 0x36-0x37
function SHC(a,state){var stack=state.stack;var rpi=a?state.rp1:state.rp2;var rp=(a?state.z0:state.z1)[rpi];var fv=state.fv;var pv=state.pv;var ci=stack.pop();var sp=state.z2[state.contours[ci]];var p=sp;if(exports.DEBUG){console.log(state.step,'SHC['+a+']',ci);}var d=pv.distance(rp,rp,false,true);do{if(p!==rp){fv.setRelative(p,p,d,pv);}p=p.nextPointOnContour;}while(p!==sp);}// SHZ[] SHift Zone using reference point
// 0x36-0x37
function SHZ(a,state){var stack=state.stack;var rpi=a?state.rp1:state.rp2;var rp=(a?state.z0:state.z1)[rpi];var fv=state.fv;var pv=state.pv;var e=stack.pop();if(exports.DEBUG){console.log(state.step,'SHZ['+a+']',e);}var z;switch(e){case 0:z=state.tZone;break;case 1:z=state.gZone;break;default:throw new Error('Invalid zone');}var p;var d=pv.distance(rp,rp,false,true);var pLen=z.length-2;for(var i=0;i<pLen;i++){p=z[i];if(p!==rp){fv.setRelative(p,p,d,pv);}}}// SHPIX[] SHift point by a PIXel amount
// 0x38
function SHPIX(state){var stack=state.stack;var loop=state.loop;var fv=state.fv;var d=stack.pop()/0x40;var z2=state.z2;while(loop--){var pi=stack.pop();var p=z2[pi];if(exports.DEBUG){console.log(state.step,(state.loop>1?'loop '+(state.loop-loop)+': ':'')+'SHPIX[]',pi,d);}fv.setRelative(p,p,d);fv.touch(p);}state.loop=1;}// IP[] Interpolate Point
// 0x39
function IP(state){var stack=state.stack;var rp1i=state.rp1;var rp2i=state.rp2;var loop=state.loop;var rp1=state.z0[rp1i];var rp2=state.z1[rp2i];var fv=state.fv;var pv=state.dpv;var z2=state.z2;while(loop--){var pi=stack.pop();var p=z2[pi];if(exports.DEBUG){console.log(state.step,(state.loop>1?'loop '+(state.loop-loop)+': ':'')+'IP[]',pi,rp1i,'<->',rp2i);}fv.interpolate(p,rp1,rp2,pv);fv.touch(p);}state.loop=1;}// MSIRP[a] Move Stack Indirect Relative Point
// 0x3A-0x3B
function MSIRP(a,state){var stack=state.stack;var d=stack.pop()/64;var pi=stack.pop();var p=state.z1[pi];var rp0=state.z0[state.rp0];var fv=state.fv;var pv=state.pv;fv.setRelative(p,rp0,d,pv);fv.touch(p);if(exports.DEBUG){console.log(state.step,'MSIRP['+a+']',d,pi);}state.rp1=state.rp0;state.rp2=pi;if(a){state.rp0=pi;}}// ALIGNRP[] Align to reference point.
// 0x3C
function ALIGNRP(state){var stack=state.stack;var rp0i=state.rp0;var rp0=state.z0[rp0i];var loop=state.loop;var fv=state.fv;var pv=state.pv;var z1=state.z1;while(loop--){var pi=stack.pop();var p=z1[pi];if(exports.DEBUG){console.log(state.step,(state.loop>1?'loop '+(state.loop-loop)+': ':'')+'ALIGNRP[]',pi);}fv.setRelative(p,rp0,0,pv);fv.touch(p);}state.loop=1;}// RTG[] Round To Double Grid
// 0x3D
function RTDG(state){if(exports.DEBUG){console.log(state.step,'RTDG[]');}state.round=roundToDoubleGrid;}// MIAP[a] Move Indirect Absolute Point
// 0x3E-0x3F
function MIAP(round,state){var stack=state.stack;var n=stack.pop();var pi=stack.pop();var p=state.z0[pi];var fv=state.fv;var pv=state.pv;var cv=state.cvt[n];// TODO cvtcutin should be considered here
if(round){cv=state.round(cv);}if(exports.DEBUG){console.log(state.step,'MIAP['+round+']',n,'(',cv,')',pi);}fv.setRelative(p,HPZero,cv,pv);if(state.zp0===0){p.xo=p.x;p.yo=p.y;}fv.touch(p);state.rp0=state.rp1=pi;}// NPUSB[] PUSH N Bytes
// 0x40
function NPUSHB(state){var prog=state.prog;var ip=state.ip;var stack=state.stack;var n=prog[++ip];if(exports.DEBUG){console.log(state.step,'NPUSHB[]',n);}for(var i=0;i<n;i++){stack.push(prog[++ip]);}state.ip=ip;}// NPUSHW[] PUSH N Words
// 0x41
function NPUSHW(state){var ip=state.ip;var prog=state.prog;var stack=state.stack;var n=prog[++ip];if(exports.DEBUG){console.log(state.step,'NPUSHW[]',n);}for(var i=0;i<n;i++){var w=prog[++ip]<<8|prog[++ip];if(w&0x8000){w=-((w^0xffff)+1);}stack.push(w);}state.ip=ip;}// WS[] Write Store
// 0x42
function WS(state){var stack=state.stack;var store=state.store;if(!store){store=state.store=[];}var v=stack.pop();var l=stack.pop();if(exports.DEBUG){console.log(state.step,'WS',v,l);}store[l]=v;}// RS[] Read Store
// 0x43
function RS(state){var stack=state.stack;var store=state.store;var l=stack.pop();if(exports.DEBUG){console.log(state.step,'RS',l);}var v=store&&store[l]||0;stack.push(v);}// WCVTP[] Write Control Value Table in Pixel units
// 0x44
function WCVTP(state){var stack=state.stack;var v=stack.pop();var l=stack.pop();if(exports.DEBUG){console.log(state.step,'WCVTP',v,l);}state.cvt[l]=v/0x40;}// RCVT[] Read Control Value Table entry
// 0x45
function RCVT(state){var stack=state.stack;var cvte=stack.pop();if(exports.DEBUG){console.log(state.step,'RCVT',cvte);}stack.push(state.cvt[cvte]*0x40);}// GC[] Get Coordinate projected onto the projection vector
// 0x46-0x47
function GC(a,state){var stack=state.stack;var pi=stack.pop();var p=state.z2[pi];if(exports.DEBUG){console.log(state.step,'GC['+a+']',pi);}stack.push(state.dpv.distance(p,HPZero,a,false)*0x40);}// MD[a] Measure Distance
// 0x49-0x4A
function MD(a,state){var stack=state.stack;var pi2=stack.pop();var pi1=stack.pop();var p2=state.z1[pi2];var p1=state.z0[pi1];var d=state.dpv.distance(p1,p2,a,a);if(exports.DEBUG){console.log(state.step,'MD['+a+']',pi2,pi1,'->',d);}state.stack.push(Math.round(d*64));}// MPPEM[] Measure Pixels Per EM
// 0x4B
function MPPEM(state){if(exports.DEBUG){console.log(state.step,'MPPEM[]');}state.stack.push(state.ppem);}// FLIPON[] set the auto FLIP Boolean to ON
// 0x4D
function FLIPON(state){if(exports.DEBUG){console.log(state.step,'FLIPON[]');}state.autoFlip=true;}// LT[] Less Than
// 0x50
function LT(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'LT[]',e2,e1);}stack.push(e1<e2?1:0);}// LTEQ[] Less Than or EQual
// 0x53
function LTEQ(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'LTEQ[]',e2,e1);}stack.push(e1<=e2?1:0);}// GTEQ[] Greater Than
// 0x52
function GT(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'GT[]',e2,e1);}stack.push(e1>e2?1:0);}// GTEQ[] Greater Than or EQual
// 0x53
function GTEQ(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'GTEQ[]',e2,e1);}stack.push(e1>=e2?1:0);}// EQ[] EQual
// 0x54
function EQ(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'EQ[]',e2,e1);}stack.push(e2===e1?1:0);}// NEQ[] Not EQual
// 0x55
function NEQ(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'NEQ[]',e2,e1);}stack.push(e2!==e1?1:0);}// ODD[] ODD
// 0x56
function ODD(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'ODD[]',n);}stack.push((0,_trunc2.default)(n)%2?1:0);}// EVEN[] EVEN
// 0x57
function EVEN(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'EVEN[]',n);}stack.push((0,_trunc2.default)(n)%2?0:1);}// IF[] IF test
// 0x58
function IF(state){var test=state.stack.pop();var ins;if(exports.DEBUG){console.log(state.step,'IF[]',test);}// if test is true it just continues
// if not the ip is skipped until matching ELSE or EIF
if(!test){skip(state,true);if(exports.DEBUG){console.log(state.step,ins===0x1B?'ELSE[]':'EIF[]');}}}// EIF[] End IF
// 0x59
function EIF(state){// this can be reached normally when
// executing an else branch.
// -> just ignore it
if(exports.DEBUG){console.log(state.step,'EIF[]');}}// AND[] logical AND
// 0x5A
function AND(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'AND[]',e2,e1);}stack.push(e2&&e1?1:0);}// OR[] logical OR
// 0x5B
function OR(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'OR[]',e2,e1);}stack.push(e2||e1?1:0);}// NOT[] logical NOT
// 0x5C
function NOT(state){var stack=state.stack;var e=stack.pop();if(exports.DEBUG){console.log(state.step,'NOT[]',e);}stack.push(e?0:1);}// DELTAP1[] DELTA exception P1
// DELTAP2[] DELTA exception P2
// DELTAP3[] DELTA exception P3
// 0x5D, 0x71, 0x72
function DELTAP123(b,state){var stack=state.stack;var n=stack.pop();var fv=state.fv;var pv=state.pv;var ppem=state.ppem;var base=state.deltaBase+(b-1)*16;var ds=state.deltaShift;var z0=state.z0;if(exports.DEBUG){console.log(state.step,'DELTAP['+b+']',n,stack);}for(var i=0;i<n;i++){var pi=stack.pop();var arg=stack.pop();var appem=base+((arg&0xF0)>>4);if(appem!==ppem){continue;}var mag=(arg&0x0F)-8;if(mag>=0){mag++;}if(exports.DEBUG){console.log(state.step,'DELTAPFIX',pi,'by',mag*ds);}var p=z0[pi];fv.setRelative(p,p,mag*ds,pv);}}// SDB[] Set Delta Base in the graphics state
// 0x5E
function SDB(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'SDB[]',n);}state.deltaBase=n;}// SDS[] Set Delta Shift in the graphics state
// 0x5F
function SDS(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'SDS[]',n);}state.deltaShift=Math.pow(0.5,n);}// ADD[] ADD
// 0x60
function ADD(state){var stack=state.stack;var n2=stack.pop();var n1=stack.pop();if(exports.DEBUG){console.log(state.step,'ADD[]',n2,n1);}stack.push(n1+n2);}// SUB[] SUB
// 0x61
function SUB(state){var stack=state.stack;var n2=stack.pop();var n1=stack.pop();if(exports.DEBUG){console.log(state.step,'SUB[]',n2,n1);}stack.push(n1-n2);}// DIV[] DIV
// 0x62
function DIV(state){var stack=state.stack;var n2=stack.pop();var n1=stack.pop();if(exports.DEBUG){console.log(state.step,'DIV[]',n2,n1);}stack.push(n1*64/n2);}// MUL[] MUL
// 0x63
function MUL(state){var stack=state.stack;var n2=stack.pop();var n1=stack.pop();if(exports.DEBUG){console.log(state.step,'MUL[]',n2,n1);}stack.push(n1*n2/64);}// ABS[] ABSolute value
// 0x64
function ABS(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'ABS[]',n);}stack.push(Math.abs(n));}// NEG[] NEGate
// 0x65
function NEG(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'NEG[]',n);}stack.push(-n);}// FLOOR[] FLOOR
// 0x66
function FLOOR(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'FLOOR[]',n);}stack.push(Math.floor(n/0x40)*0x40);}// CEILING[] CEILING
// 0x67
function CEILING(state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'CEILING[]',n);}stack.push(Math.ceil(n/0x40)*0x40);}// ROUND[ab] ROUND value
// 0x68-0x6B
function ROUND(dt,state){var stack=state.stack;var n=stack.pop();if(exports.DEBUG){console.log(state.step,'ROUND[]');}stack.push(state.round(n/0x40)*0x40);}// WCVTF[] Write Control Value Table in Funits
// 0x70
function WCVTF(state){var stack=state.stack;var v=stack.pop();var l=stack.pop();if(exports.DEBUG){console.log(state.step,'WCVTF[]',v,l);}state.cvt[l]=v*state.ppem/state.font.unitsPerEm;}// DELTAC1[] DELTA exception C1
// DELTAC2[] DELTA exception C2
// DELTAC3[] DELTA exception C3
// 0x73, 0x74, 0x75
function DELTAC123(b,state){var stack=state.stack;var n=stack.pop();var ppem=state.ppem;var base=state.deltaBase+(b-1)*16;var ds=state.deltaShift;if(exports.DEBUG){console.log(state.step,'DELTAC['+b+']',n,stack);}for(var i=0;i<n;i++){var c=stack.pop();var arg=stack.pop();var appem=base+((arg&0xF0)>>4);if(appem!==ppem){continue;}var mag=(arg&0x0F)-8;if(mag>=0){mag++;}var delta=mag*ds;if(exports.DEBUG){console.log(state.step,'DELTACFIX',c,'by',delta);}state.cvt[c]+=delta;}}// SROUND[] Super ROUND
// 0x76
function SROUND(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'SROUND[]',n);}state.round=roundSuper;var period;switch(n&0xC0){case 0x00:period=0.5;break;case 0x40:period=1;break;case 0x80:period=2;break;default:throw new Error('invalid SROUND value');}state.srPeriod=period;switch(n&0x30){case 0x00:state.srPhase=0;break;case 0x10:state.srPhase=0.25*period;break;case 0x20:state.srPhase=0.5*period;break;case 0x30:state.srPhase=0.75*period;break;default:throw new Error('invalid SROUND value');}n&=0x0F;if(n===0){state.srThreshold=0;}else{state.srThreshold=(n/8-0.5)*period;}}// S45ROUND[] Super ROUND 45 degrees
// 0x77
function S45ROUND(state){var n=state.stack.pop();if(exports.DEBUG){console.log(state.step,'S45ROUND[]',n);}state.round=roundSuper;var period;switch(n&0xC0){case 0x00:period=Math.sqrt(2)/2;break;case 0x40:period=Math.sqrt(2);break;case 0x80:period=2*Math.sqrt(2);break;default:throw new Error('invalid S45ROUND value');}state.srPeriod=period;switch(n&0x30){case 0x00:state.srPhase=0;break;case 0x10:state.srPhase=0.25*period;break;case 0x20:state.srPhase=0.5*period;break;case 0x30:state.srPhase=0.75*period;break;default:throw new Error('invalid S45ROUND value');}n&=0x0F;if(n===0){state.srThreshold=0;}else{state.srThreshold=(n/8-0.5)*period;}}// ROFF[] Round Off
// 0x7A
function ROFF(state){if(exports.DEBUG){console.log(state.step,'ROFF[]');}state.round=roundOff;}// RUTG[] Round Up To Grid
// 0x7C
function RUTG(state){if(exports.DEBUG){console.log(state.step,'RUTG[]');}state.round=roundUpToGrid;}// RDTG[] Round Down To Grid
// 0x7D
function RDTG(state){if(exports.DEBUG){console.log(state.step,'RDTG[]');}state.round=roundDownToGrid;}// SCANCTRL[] SCAN conversion ConTRoL
// 0x85
function SCANCTRL(state){var n=state.stack.pop();// ignored by opentype.js
if(exports.DEBUG){console.log(state.step,'SCANCTRL[]',n);}}// SDPVTL[a] Set Dual Projection Vector To Line
// 0x86-0x87
function SDPVTL(a,state){var stack=state.stack;var p2i=stack.pop();var p1i=stack.pop();var p2=state.z2[p2i];var p1=state.z1[p1i];if(exports.DEBUG){console.log('SDPVTL['+a+']',p2i,p1i);}var dx;var dy;if(!a){dx=p1.x-p2.x;dy=p1.y-p2.y;}else{dx=p2.y-p1.y;dy=p1.x-p2.x;}state.dpv=getUnitVector(dx,dy);}// GETINFO[] GET INFOrmation
// 0x88
function GETINFO(state){var stack=state.stack;var sel=stack.pop();var r=0;if(exports.DEBUG){console.log(state.step,'GETINFO[]',sel);}// v35 as in no subpixel hinting
if(sel&0x01){r=35;}// TODO rotation and stretch currently not supported
// and thus those GETINFO are always 0.
// opentype.js is always gray scaling
if(sel&0x20){r|=0x1000;}stack.push(r);}// ROLL[] ROLL the top three stack elements
// 0x8A
function ROLL(state){var stack=state.stack;var a=stack.pop();var b=stack.pop();var c=stack.pop();if(exports.DEBUG){console.log(state.step,'ROLL[]');}stack.push(b);stack.push(a);stack.push(c);}// MAX[] MAXimum of top two stack elements
// 0x8B
function MAX(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'MAX[]',e2,e1);}stack.push(Math.max(e1,e2));}// MIN[] MINimum of top two stack elements
// 0x8C
function MIN(state){var stack=state.stack;var e2=stack.pop();var e1=stack.pop();if(exports.DEBUG){console.log(state.step,'MIN[]',e2,e1);}stack.push(Math.min(e1,e2));}// SCANTYPE[] SCANTYPE
// 0x8D
function SCANTYPE(state){var n=state.stack.pop();// ignored by opentype.js
if(exports.DEBUG){console.log(state.step,'SCANTYPE[]',n);}}// INSTCTRL[] INSTCTRL
// 0x8D
function INSTCTRL(state){var s=state.stack.pop();var v=state.stack.pop();if(exports.DEBUG){console.log(state.step,'INSTCTRL[]',s,v);}switch(s){case 1:state.inhibitGridFit=!!v;return;case 2:state.ignoreCvt=!!v;return;default:throw new Error('invalid INSTCTRL[] selector');}}// PUSHB[abc] PUSH Bytes
// 0xB0-0xB7
function PUSHB(n,state){var stack=state.stack;var prog=state.prog;var ip=state.ip;if(exports.DEBUG){console.log(state.step,'PUSHB['+n+']');}for(var i=0;i<n;i++){stack.push(prog[++ip]);}state.ip=ip;}// PUSHW[abc] PUSH Words
// 0xB8-0xBF
function PUSHW(n,state){var ip=state.ip;var prog=state.prog;var stack=state.stack;if(exports.DEBUG){console.log(state.ip,'PUSHW['+n+']');}for(var i=0;i<n;i++){var w=prog[++ip]<<8|prog[++ip];if(w&0x8000){w=-((w^0xffff)+1);}stack.push(w);}state.ip=ip;}// MDRP[abcde] Move Direct Relative Point
// 0xD0-0xEF
// (if indirect is 0)
//
// and
//
// MIRP[abcde] Move Indirect Relative Point
// 0xE0-0xFF
// (if indirect is 1)
function MDRP_MIRP(indirect,setRp0,keepD,ro,dt,state){var stack=state.stack;var cvte=indirect&&stack.pop();var pi=stack.pop();var rp0i=state.rp0;var rp=state.z0[rp0i];var p=state.z1[pi];var md=state.minDis;var fv=state.fv;var pv=state.dpv;var od;// original distance
var d;// moving distance
var sign;// sign of distance
var cv;d=od=pv.distance(p,rp,true,true);sign=d>=0?1:-1;// Math.sign would be 0 in case of 0
// TODO consider autoFlip
d=Math.abs(d);if(indirect){cv=state.cvt[cvte];if(ro&&Math.abs(d-cv)<state.cvCutIn){d=cv;}}if(keepD&&d<md){d=md;}if(ro){d=state.round(d);}fv.setRelative(p,rp,sign*d,pv);fv.touch(p);if(exports.DEBUG){console.log(state.step,(indirect?'MIRP[':'MDRP[')+(setRp0?'M':'m')+(keepD?'>':'_')+(ro?'R':'_')+(dt===0?'Gr':dt===1?'Bl':dt===2?'Wh':'')+']',indirect?cvte+'('+state.cvt[cvte]+','+cv+')':'',pi,'(d =',od,'->',sign*d,')');}state.rp1=state.rp0;state.rp2=pi;if(setRp0){state.rp0=pi;}}/*
	* The instruction table.
	*/instructionTable=[/* 0x00 */SVTCA.bind(undefined,yUnitVector),/* 0x01 */SVTCA.bind(undefined,xUnitVector),/* 0x02 */SPVTCA.bind(undefined,yUnitVector),/* 0x03 */SPVTCA.bind(undefined,xUnitVector),/* 0x04 */SFVTCA.bind(undefined,yUnitVector),/* 0x05 */SFVTCA.bind(undefined,xUnitVector),/* 0x06 */SPVTL.bind(undefined,0),/* 0x07 */SPVTL.bind(undefined,1),/* 0x08 */SFVTL.bind(undefined,0),/* 0x09 */SFVTL.bind(undefined,1),/* 0x0A */SPVFS,/* 0x0B */SFVFS,/* 0x0C */GPV,/* 0x0D */GFV,/* 0x0E */SFVTPV,/* 0x0F */ISECT,/* 0x10 */SRP0,/* 0x11 */SRP1,/* 0x12 */SRP2,/* 0x13 */SZP0,/* 0x14 */SZP1,/* 0x15 */SZP2,/* 0x16 */SZPS,/* 0x17 */SLOOP,/* 0x18 */RTG,/* 0x19 */RTHG,/* 0x1A */SMD,/* 0x1B */ELSE,/* 0x1C */JMPR,/* 0x1D */SCVTCI,/* 0x1E */undefined,// TODO SSWCI
/* 0x1F */undefined,// TODO SSW
/* 0x20 */DUP,/* 0x21 */POP,/* 0x22 */CLEAR,/* 0x23 */SWAP,/* 0x24 */DEPTH,/* 0x25 */CINDEX,/* 0x26 */MINDEX,/* 0x27 */undefined,// TODO ALIGNPTS
/* 0x28 */undefined,/* 0x29 */undefined,// TODO UTP
/* 0x2A */LOOPCALL,/* 0x2B */CALL,/* 0x2C */FDEF,/* 0x2D */undefined,// ENDF (eaten by FDEF)
/* 0x2E */MDAP.bind(undefined,0),/* 0x2F */MDAP.bind(undefined,1),/* 0x30 */IUP.bind(undefined,yUnitVector),/* 0x31 */IUP.bind(undefined,xUnitVector),/* 0x32 */SHP.bind(undefined,0),/* 0x33 */SHP.bind(undefined,1),/* 0x34 */SHC.bind(undefined,0),/* 0x35 */SHC.bind(undefined,1),/* 0x36 */SHZ.bind(undefined,0),/* 0x37 */SHZ.bind(undefined,1),/* 0x38 */SHPIX,/* 0x39 */IP,/* 0x3A */MSIRP.bind(undefined,0),/* 0x3B */MSIRP.bind(undefined,1),/* 0x3C */ALIGNRP,/* 0x3D */RTDG,/* 0x3E */MIAP.bind(undefined,0),/* 0x3F */MIAP.bind(undefined,1),/* 0x40 */NPUSHB,/* 0x41 */NPUSHW,/* 0x42 */WS,/* 0x43 */RS,/* 0x44 */WCVTP,/* 0x45 */RCVT,/* 0x46 */GC.bind(undefined,0),/* 0x47 */GC.bind(undefined,1),/* 0x48 */undefined,// TODO SCFS
/* 0x49 */MD.bind(undefined,0),/* 0x4A */MD.bind(undefined,1),/* 0x4B */MPPEM,/* 0x4C */undefined,// TODO MPS
/* 0x4D */FLIPON,/* 0x4E */undefined,// TODO FLIPOFF
/* 0x4F */undefined,// TODO DEBUG
/* 0x50 */LT,/* 0x51 */LTEQ,/* 0x52 */GT,/* 0x53 */GTEQ,/* 0x54 */EQ,/* 0x55 */NEQ,/* 0x56 */ODD,/* 0x57 */EVEN,/* 0x58 */IF,/* 0x59 */EIF,/* 0x5A */AND,/* 0x5B */OR,/* 0x5C */NOT,/* 0x5D */DELTAP123.bind(undefined,1),/* 0x5E */SDB,/* 0x5F */SDS,/* 0x60 */ADD,/* 0x61 */SUB,/* 0x62 */DIV,/* 0x63 */MUL,/* 0x64 */ABS,/* 0x65 */NEG,/* 0x66 */FLOOR,/* 0x67 */CEILING,/* 0x68 */ROUND.bind(undefined,0),/* 0x69 */ROUND.bind(undefined,1),/* 0x6A */ROUND.bind(undefined,2),/* 0x6B */ROUND.bind(undefined,3),/* 0x6C */undefined,// TODO NROUND[ab]
/* 0x6D */undefined,// TODO NROUND[ab]
/* 0x6E */undefined,// TODO NROUND[ab]
/* 0x6F */undefined,// TODO NROUND[ab]
/* 0x70 */WCVTF,/* 0x71 */DELTAP123.bind(undefined,2),/* 0x72 */DELTAP123.bind(undefined,3),/* 0x73 */DELTAC123.bind(undefined,1),/* 0x74 */DELTAC123.bind(undefined,2),/* 0x75 */DELTAC123.bind(undefined,3),/* 0x76 */SROUND,/* 0x77 */S45ROUND,/* 0x78 */undefined,// TODO JROT[]
/* 0x79 */undefined,// TODO JROF[]
/* 0x7A */ROFF,/* 0x7B */undefined,/* 0x7C */RUTG,/* 0x7D */RDTG,/* 0x7E */POP,// actually SANGW, supposed to do only a pop though
/* 0x7F */POP,// actually AA, supposed to do only a pop though
/* 0x80 */undefined,// TODO FLIPPT
/* 0x81 */undefined,// TODO FLIPRGON
/* 0x82 */undefined,// TODO FLIPRGOFF
/* 0x83 */undefined,/* 0x84 */undefined,/* 0x85 */SCANCTRL,/* 0x86 */SDPVTL.bind(undefined,0),/* 0x87 */SDPVTL.bind(undefined,1),/* 0x88 */GETINFO,/* 0x89 */undefined,// TODO IDEF
/* 0x8A */ROLL,/* 0x8B */MAX,/* 0x8C */MIN,/* 0x8D */SCANTYPE,/* 0x8E */INSTCTRL,/* 0x8F */undefined,/* 0x90 */undefined,/* 0x91 */undefined,/* 0x92 */undefined,/* 0x93 */undefined,/* 0x94 */undefined,/* 0x95 */undefined,/* 0x96 */undefined,/* 0x97 */undefined,/* 0x98 */undefined,/* 0x99 */undefined,/* 0x9A */undefined,/* 0x9B */undefined,/* 0x9C */undefined,/* 0x9D */undefined,/* 0x9E */undefined,/* 0x9F */undefined,/* 0xA0 */undefined,/* 0xA1 */undefined,/* 0xA2 */undefined,/* 0xA3 */undefined,/* 0xA4 */undefined,/* 0xA5 */undefined,/* 0xA6 */undefined,/* 0xA7 */undefined,/* 0xA8 */undefined,/* 0xA9 */undefined,/* 0xAA */undefined,/* 0xAB */undefined,/* 0xAC */undefined,/* 0xAD */undefined,/* 0xAE */undefined,/* 0xAF */undefined,/* 0xB0 */PUSHB.bind(undefined,1),/* 0xB1 */PUSHB.bind(undefined,2),/* 0xB2 */PUSHB.bind(undefined,3),/* 0xB3 */PUSHB.bind(undefined,4),/* 0xB4 */PUSHB.bind(undefined,5),/* 0xB5 */PUSHB.bind(undefined,6),/* 0xB6 */PUSHB.bind(undefined,7),/* 0xB7 */PUSHB.bind(undefined,8),/* 0xB8 */PUSHW.bind(undefined,1),/* 0xB9 */PUSHW.bind(undefined,2),/* 0xBA */PUSHW.bind(undefined,3),/* 0xBB */PUSHW.bind(undefined,4),/* 0xBC */PUSHW.bind(undefined,5),/* 0xBD */PUSHW.bind(undefined,6),/* 0xBE */PUSHW.bind(undefined,7),/* 0xBF */PUSHW.bind(undefined,8),/* 0xC0 */MDRP_MIRP.bind(undefined,0,0,0,0,0),/* 0xC1 */MDRP_MIRP.bind(undefined,0,0,0,0,1),/* 0xC2 */MDRP_MIRP.bind(undefined,0,0,0,0,2),/* 0xC3 */MDRP_MIRP.bind(undefined,0,0,0,0,3),/* 0xC4 */MDRP_MIRP.bind(undefined,0,0,0,1,0),/* 0xC5 */MDRP_MIRP.bind(undefined,0,0,0,1,1),/* 0xC6 */MDRP_MIRP.bind(undefined,0,0,0,1,2),/* 0xC7 */MDRP_MIRP.bind(undefined,0,0,0,1,3),/* 0xC8 */MDRP_MIRP.bind(undefined,0,0,1,0,0),/* 0xC9 */MDRP_MIRP.bind(undefined,0,0,1,0,1),/* 0xCA */MDRP_MIRP.bind(undefined,0,0,1,0,2),/* 0xCB */MDRP_MIRP.bind(undefined,0,0,1,0,3),/* 0xCC */MDRP_MIRP.bind(undefined,0,0,1,1,0),/* 0xCD */MDRP_MIRP.bind(undefined,0,0,1,1,1),/* 0xCE */MDRP_MIRP.bind(undefined,0,0,1,1,2),/* 0xCF */MDRP_MIRP.bind(undefined,0,0,1,1,3),/* 0xD0 */MDRP_MIRP.bind(undefined,0,1,0,0,0),/* 0xD1 */MDRP_MIRP.bind(undefined,0,1,0,0,1),/* 0xD2 */MDRP_MIRP.bind(undefined,0,1,0,0,2),/* 0xD3 */MDRP_MIRP.bind(undefined,0,1,0,0,3),/* 0xD4 */MDRP_MIRP.bind(undefined,0,1,0,1,0),/* 0xD5 */MDRP_MIRP.bind(undefined,0,1,0,1,1),/* 0xD6 */MDRP_MIRP.bind(undefined,0,1,0,1,2),/* 0xD7 */MDRP_MIRP.bind(undefined,0,1,0,1,3),/* 0xD8 */MDRP_MIRP.bind(undefined,0,1,1,0,0),/* 0xD9 */MDRP_MIRP.bind(undefined,0,1,1,0,1),/* 0xDA */MDRP_MIRP.bind(undefined,0,1,1,0,2),/* 0xDB */MDRP_MIRP.bind(undefined,0,1,1,0,3),/* 0xDC */MDRP_MIRP.bind(undefined,0,1,1,1,0),/* 0xDD */MDRP_MIRP.bind(undefined,0,1,1,1,1),/* 0xDE */MDRP_MIRP.bind(undefined,0,1,1,1,2),/* 0xDF */MDRP_MIRP.bind(undefined,0,1,1,1,3),/* 0xE0 */MDRP_MIRP.bind(undefined,1,0,0,0,0),/* 0xE1 */MDRP_MIRP.bind(undefined,1,0,0,0,1),/* 0xE2 */MDRP_MIRP.bind(undefined,1,0,0,0,2),/* 0xE3 */MDRP_MIRP.bind(undefined,1,0,0,0,3),/* 0xE4 */MDRP_MIRP.bind(undefined,1,0,0,1,0),/* 0xE5 */MDRP_MIRP.bind(undefined,1,0,0,1,1),/* 0xE6 */MDRP_MIRP.bind(undefined,1,0,0,1,2),/* 0xE7 */MDRP_MIRP.bind(undefined,1,0,0,1,3),/* 0xE8 */MDRP_MIRP.bind(undefined,1,0,1,0,0),/* 0xE9 */MDRP_MIRP.bind(undefined,1,0,1,0,1),/* 0xEA */MDRP_MIRP.bind(undefined,1,0,1,0,2),/* 0xEB */MDRP_MIRP.bind(undefined,1,0,1,0,3),/* 0xEC */MDRP_MIRP.bind(undefined,1,0,1,1,0),/* 0xED */MDRP_MIRP.bind(undefined,1,0,1,1,1),/* 0xEE */MDRP_MIRP.bind(undefined,1,0,1,1,2),/* 0xEF */MDRP_MIRP.bind(undefined,1,0,1,1,3),/* 0xF0 */MDRP_MIRP.bind(undefined,1,1,0,0,0),/* 0xF1 */MDRP_MIRP.bind(undefined,1,1,0,0,1),/* 0xF2 */MDRP_MIRP.bind(undefined,1,1,0,0,2),/* 0xF3 */MDRP_MIRP.bind(undefined,1,1,0,0,3),/* 0xF4 */MDRP_MIRP.bind(undefined,1,1,0,1,0),/* 0xF5 */MDRP_MIRP.bind(undefined,1,1,0,1,1),/* 0xF6 */MDRP_MIRP.bind(undefined,1,1,0,1,2),/* 0xF7 */MDRP_MIRP.bind(undefined,1,1,0,1,3),/* 0xF8 */MDRP_MIRP.bind(undefined,1,1,1,0,0),/* 0xF9 */MDRP_MIRP.bind(undefined,1,1,1,0,1),/* 0xFA */MDRP_MIRP.bind(undefined,1,1,1,0,2),/* 0xFB */MDRP_MIRP.bind(undefined,1,1,1,0,3),/* 0xFC */MDRP_MIRP.bind(undefined,1,1,1,1,0),/* 0xFD */MDRP_MIRP.bind(undefined,1,1,1,1,1),/* 0xFE */MDRP_MIRP.bind(undefined,1,1,1,1,2),/* 0xFF */MDRP_MIRP.bind(undefined,1,1,1,1,3)];/*****************************
	  Mathematical Considerations
	******************************
	
	fv ... refers to freedom vector
	pv ... refers to projection vector
	rp ... refers to reference point
	p  ... refers to to point being operated on
	d  ... refers to distance
	
	SETRELATIVE:
	============
	
	case freedom vector == x-axis:
	------------------------------
	
	                        (pv)
	                     .-'
	              rpd .-'
	               .-*
	          d .-'90°'
	         .-'       '
	      .-'           '
	   *-'               ' b
	  rp                  '
	                       '
	                        '
	            p *----------*-------------- (fv)
	                          pm
	
	  rpdx = rpx + d * pv.x
	  rpdy = rpy + d * pv.y
	
	  equation of line b
	
	   y - rpdy = pvns * (x- rpdx)
	
	   y = p.y
	
	   x = rpdx + ( p.y - rpdy ) / pvns
	
	
	case freedom vector == y-axis:
	------------------------------
	
	    * pm
	    |\
	    | \
	    |  \
	    |   \
	    |    \
	    |     \
	    |      \
	    |       \
	    |        \
	    |         \ b
	    |          \
	    |           \
	    |            \    .-' (pv)
	    |         90° \.-'
	    |           .-'* rpd
	    |        .-'
	    *     *-'  d
	    p     rp
	
	  rpdx = rpx + d * pv.x
	  rpdy = rpy + d * pv.y
	
	  equation of line b:
	           pvns ... normal slope to pv
	
	   y - rpdy = pvns * (x - rpdx)
	
	   x = p.x
	
	   y = rpdy +  pvns * (p.x - rpdx)
	
	
	
	generic case:
	-------------
	
	
	                              .'(fv)
	                            .'
	                          .* pm
	                        .' !
	                      .'    .
	                    .'      !
	                  .'         . b
	                .'           !
	               *              .
	              p               !
	                         90°   .    ... (pv)
	                           ...-*-'''
	                  ...---'''    rpd
	         ...---'''   d
	   *--'''
	  rp
	
	    rpdx = rpx + d * pv.x
	    rpdy = rpy + d * pv.y
	
	 equation of line b:
	    pvns... normal slope to pv
	
	    y - rpdy = pvns * (x - rpdx)
	
	 equation of freedom vector line:
	    fvs ... slope of freedom vector (=fy/fx)
	
	    y - py = fvs * (x - px)
	
	
	  on pm both equations are true for same x/y
	
	    y - rpdy = pvns * (x - rpdx)
	
	    y - py = fvs * (x - px)
	
	  form to y and set equal:
	
	    pvns * (x - rpdx) + rpdy = fvs * (x - px) + py
	
	  expand:
	
	    pvns * x - pvns * rpdx + rpdy = fvs * x - fvs * px + py
	
	  switch:
	
	    fvs * x - fvs * px + py = pvns * x - pvns * rpdx + rpdy
	
	  solve for x:
	
	    fvs * x - pvns * x = fvs * px - pvns * rpdx - py + rpdy
	
	
	
	          fvs * px - pvns * rpdx + rpdy - py
	    x =  -----------------------------------
	                 fvs - pvns
	
	  and:
	
	    y = fvs * (x - px) + py
	
	
	
	INTERPOLATE:
	============
	
	Examples of point interpolation.
	
	The weight of the movement of the reference point gets bigger
	the further the other reference point is away, thus the safest
	option (that is avoiding 0/0 divisions) is to weight the
	original distance of the other point by the sum of both distances.
	
	If the sum of both distances is 0, then move the point by the
	arithmetic average of the movement of both reference points.
	
	
	
	
	           (+6)
	    rp1o *---->*rp1
	         .     .                          (+12)
	         .     .                  rp2o *---------->* rp2
	         .     .                       .           .
	         .     .                       .           .
	         .    10          20           .           .
	         |.........|...................|           .
	               .   .                               .
	               .   . (+8)                          .
	                po *------>*p                      .
	               .           .                       .
	               .    12     .          24           .
	               |...........|.......................|
	                                  36
	
	
	-------
	
	
	
	           (+10)
	    rp1o *-------->*rp1
	         .         .                      (-10)
	         .         .              rp2 *<---------* rpo2
	         .         .                   .         .
	         .         .                   .         .
	         .    10   .          30       .         .
	         |.........|.............................|
	                   .                   .
	                   . (+5)              .
	                po *--->* p            .
	                   .    .              .
	                   .    .   20         .
	                   |....|..............|
	                     5        15
	
	
	-------
	
	
	           (+10)
	    rp1o *-------->*rp1
	         .         .
	         .         .
	    rp2o *-------->*rp2
	
	
	                               (+10)
	                          po *-------->* p
	
	-------
	
	
	           (+10)
	    rp1o *-------->*rp1
	         .         .
	         .         .(+30)
	    rp2o *---------------------------->*rp2
	
	
	                                        (+25)
	                          po *----------------------->* p
	
	
	
	vim: set ts=4 sw=4 expandtab:
	*****/// The Font object
/**
	 * @typedef FontOptions
	 * @type Object
	 * @property {Boolean} empty - whether to create a new empty font
	 * @property {string} familyName
	 * @property {string} styleName
	 * @property {string=} fullName
	 * @property {string=} postScriptName
	 * @property {string=} designer
	 * @property {string=} designerURL
	 * @property {string=} manufacturer
	 * @property {string=} manufacturerURL
	 * @property {string=} license
	 * @property {string=} licenseURL
	 * @property {string=} version
	 * @property {string=} description
	 * @property {string=} copyright
	 * @property {string=} trademark
	 * @property {Number} unitsPerEm
	 * @property {Number} ascender
	 * @property {Number} descender
	 * @property {Number} createdTimestamp
	 * @property {string=} weightClass
	 * @property {string=} widthClass
	 * @property {string=} fsSelection
	 *//**
	 * A Font represents a loaded OpenType font file.
	 * It contains a set of glyphs and methods to draw text on a drawing context,
	 * or to get a path representing the text.
	 * @exports opentype.Font
	 * @class
	 * @param {FontOptions}
	 * @constructor
	 */function Font(options){options=options||{};if(!options.empty){// Check that we've provided the minimum set of names.
checkArgument(options.familyName,'When creating a new Font object, familyName is required.');checkArgument(options.styleName,'When creating a new Font object, styleName is required.');checkArgument(options.unitsPerEm,'When creating a new Font object, unitsPerEm is required.');checkArgument(options.ascender,'When creating a new Font object, ascender is required.');checkArgument(options.descender,'When creating a new Font object, descender is required.');checkArgument(options.descender<0,'Descender should be negative (e.g. -512).');// OS X will complain if the names are empty, so we put a single space everywhere by default.
this.names={fontFamily:{en:options.familyName||' '},fontSubfamily:{en:options.styleName||' '},fullName:{en:options.fullName||options.familyName+' '+options.styleName},postScriptName:{en:options.postScriptName||options.familyName+options.styleName},designer:{en:options.designer||' '},designerURL:{en:options.designerURL||' '},manufacturer:{en:options.manufacturer||' '},manufacturerURL:{en:options.manufacturerURL||' '},license:{en:options.license||' '},licenseURL:{en:options.licenseURL||' '},version:{en:options.version||'Version 0.1'},description:{en:options.description||' '},copyright:{en:options.copyright||' '},trademark:{en:options.trademark||' '}};this.unitsPerEm=options.unitsPerEm||1000;this.ascender=options.ascender;this.descender=options.descender;this.createdTimestamp=options.createdTimestamp;this.tables={os2:{usWeightClass:options.weightClass||this.usWeightClasses.MEDIUM,usWidthClass:options.widthClass||this.usWidthClasses.MEDIUM,fsSelection:options.fsSelection||this.fsSelectionValues.REGULAR}};}this.supported=true;// Deprecated: parseBuffer will throw an error if font is not supported.
this.glyphs=new glyphset.GlyphSet(this,options.glyphs||[]);this.encoding=new DefaultEncoding(this);this.substitution=new Substitution(this);this.tables=this.tables||{};Object.defineProperty(this,'hinting',{get:function get(){if(this._hinting){return this._hinting;}if(this.outlinesFormat==='truetype'){return this._hinting=new Hinting(this);}}});}/**
	 * Check if the font has a glyph for the given character.
	 * @param  {string}
	 * @return {Boolean}
	 */Font.prototype.hasChar=function(c){return this.encoding.charToGlyphIndex(c)!==null;};/**
	 * Convert the given character to a single glyph index.
	 * Note that this function assumes that there is a one-to-one mapping between
	 * the given character and a glyph; for complex scripts this might not be the case.
	 * @param  {string}
	 * @return {Number}
	 */Font.prototype.charToGlyphIndex=function(s){return this.encoding.charToGlyphIndex(s);};/**
	 * Convert the given character to a single Glyph object.
	 * Note that this function assumes that there is a one-to-one mapping between
	 * the given character and a glyph; for complex scripts this might not be the case.
	 * @param  {string}
	 * @return {opentype.Glyph}
	 */Font.prototype.charToGlyph=function(c){var glyphIndex=this.charToGlyphIndex(c);var glyph=this.glyphs.get(glyphIndex);if(!glyph){// .notdef
glyph=this.glyphs.get(0);}return glyph;};/**
	 * Convert the given text to a list of Glyph objects.
	 * Note that there is no strict one-to-one mapping between characters and
	 * glyphs, so the list of returned glyphs can be larger or smaller than the
	 * length of the given string.
	 * @param  {string}
	 * @param  {GlyphRenderOptions} [options]
	 * @return {opentype.Glyph[]}
	 */Font.prototype.stringToGlyphs=function(s,options){var this$1=this;options=options||this.defaultRenderOptions;// Get glyph indexes
var indexes=[];for(var i=0;i<s.length;i+=1){var c=s[i];indexes.push(this$1.charToGlyphIndex(c));}var length=indexes.length;// Apply substitutions on glyph indexes
if(options.features){var script=options.script||this.substitution.getDefaultScriptName();var manyToOne=[];if(options.features.liga){manyToOne=manyToOne.concat(this.substitution.getFeature('liga',script,options.language));}if(options.features.rlig){manyToOne=manyToOne.concat(this.substitution.getFeature('rlig',script,options.language));}for(var i$1=0;i$1<length;i$1+=1){for(var j=0;j<manyToOne.length;j++){var ligature=manyToOne[j];var components=ligature.sub;var compCount=components.length;var k=0;while(k<compCount&&components[k]===indexes[i$1+k]){k++;}if(k===compCount){indexes.splice(i$1,compCount,ligature.by);length=length-compCount+1;}}}}// convert glyph indexes to glyph objects
var glyphs=new Array(length);var notdef=this.glyphs.get(0);for(var i$2=0;i$2<length;i$2+=1){glyphs[i$2]=this$1.glyphs.get(indexes[i$2])||notdef;}return glyphs;};/**
	 * @param  {string}
	 * @return {Number}
	 */Font.prototype.nameToGlyphIndex=function(name){return this.glyphNames.nameToGlyphIndex(name);};/**
	 * @param  {string}
	 * @return {opentype.Glyph}
	 */Font.prototype.nameToGlyph=function(name){var glyphIndex=this.nameToGlyphIndex(name);var glyph=this.glyphs.get(glyphIndex);if(!glyph){// .notdef
glyph=this.glyphs.get(0);}return glyph;};/**
	 * @param  {Number}
	 * @return {String}
	 */Font.prototype.glyphIndexToName=function(gid){if(!this.glyphNames.glyphIndexToName){return'';}return this.glyphNames.glyphIndexToName(gid);};/**
	 * Retrieve the value of the kerning pair between the left glyph (or its index)
	 * and the right glyph (or its index). If no kerning pair is found, return 0.
	 * The kerning value gets added to the advance width when calculating the spacing
	 * between glyphs.
	 * @param  {opentype.Glyph} leftGlyph
	 * @param  {opentype.Glyph} rightGlyph
	 * @return {Number}
	 */Font.prototype.getKerningValue=function(leftGlyph,rightGlyph){leftGlyph=leftGlyph.index||leftGlyph;rightGlyph=rightGlyph.index||rightGlyph;var gposKerning=this.getGposKerningValue;return gposKerning?gposKerning(leftGlyph,rightGlyph):this.kerningPairs[leftGlyph+','+rightGlyph]||0;};/**
	 * @typedef GlyphRenderOptions
	 * @type Object
	 * @property {string} [script] - script used to determine which features to apply. By default, 'DFLT' or 'latn' is used.
	 *                               See https://www.microsoft.com/typography/otspec/scripttags.htm
	 * @property {string} [language='dflt'] - language system used to determine which features to apply.
	 *                                        See https://www.microsoft.com/typography/developers/opentype/languagetags.aspx
	 * @property {boolean} [kerning=true] - whether to include kerning values
	 * @property {object} [features] - OpenType Layout feature tags. Used to enable or disable the features of the given script/language system.
	 *                                 See https://www.microsoft.com/typography/otspec/featuretags.htm
	 */Font.prototype.defaultRenderOptions={kerning:true,features:{liga:true,rlig:true}};/**
	 * Helper function that invokes the given callback for each glyph in the given text.
	 * The callback gets `(glyph, x, y, fontSize, options)`.* @param  {string} text
	 * @param {string} text - The text to apply.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {GlyphRenderOptions=} options
	 * @param  {Function} callback
	 */Font.prototype.forEachGlyph=function(text,x,y,fontSize,options,callback){var this$1=this;x=x!==undefined?x:0;y=y!==undefined?y:0;fontSize=fontSize!==undefined?fontSize:72;options=options||this.defaultRenderOptions;var fontScale=1/this.unitsPerEm*fontSize;var glyphs=this.stringToGlyphs(text,options);for(var i=0;i<glyphs.length;i+=1){var glyph=glyphs[i];callback.call(this$1,glyph,x,y,fontSize,options);if(glyph.advanceWidth){x+=glyph.advanceWidth*fontScale;}if(options.kerning&&i<glyphs.length-1){var kerningValue=this$1.getKerningValue(glyph,glyphs[i+1]);x+=kerningValue*fontScale;}if(options.letterSpacing){x+=options.letterSpacing*fontSize;}else if(options.tracking){x+=options.tracking/1000*fontSize;}}return x;};/**
	 * Create a Path object that represents the given text.
	 * @param  {string} text - The text to create.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {GlyphRenderOptions=} options
	 * @return {opentype.Path}
	 */Font.prototype.getPath=function(text,x,y,fontSize,options){var fullPath=new Path();this.forEachGlyph(text,x,y,fontSize,options,function(glyph,gX,gY,gFontSize){var glyphPath=glyph.getPath(gX,gY,gFontSize,options,this);fullPath.extend(glyphPath);});return fullPath;};/**
	 * Create an array of Path objects that represent the glyphs of a given text.
	 * @param  {string} text - The text to create.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {GlyphRenderOptions=} options
	 * @return {opentype.Path[]}
	 */Font.prototype.getPaths=function(text,x,y,fontSize,options){var glyphPaths=[];this.forEachGlyph(text,x,y,fontSize,options,function(glyph,gX,gY,gFontSize){var glyphPath=glyph.getPath(gX,gY,gFontSize,options,this);glyphPaths.push(glyphPath);});return glyphPaths;};/**
	 * Returns the advance width of a text.
	 *
	 * This is something different than Path.getBoundingBox() as for example a
	 * suffixed whitespace increases the advanceWidth but not the bounding box
	 * or an overhanging letter like a calligraphic 'f' might have a quite larger
	 * bounding box than its advance width.
	 *
	 * This corresponds to canvas2dContext.measureText(text).width
	 *
	 * @param  {string} text - The text to create.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {GlyphRenderOptions=} options
	 * @return advance width
	 */Font.prototype.getAdvanceWidth=function(text,fontSize,options){return this.forEachGlyph(text,0,0,fontSize,options,function(){});};/**
	 * Draw the text on the given drawing context.
	 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
	 * @param  {string} text - The text to create.
	 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param  {GlyphRenderOptions=} options
	 */Font.prototype.draw=function(ctx,text,x,y,fontSize,options){this.getPath(text,x,y,fontSize,options).draw(ctx);};/**
	 * Draw the points of all glyphs in the text.
	 * On-curve points will be drawn in blue, off-curve points will be drawn in red.
	 * @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
	 * @param {string} text - The text to create.
	 * @param {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param {GlyphRenderOptions=} options
	 */Font.prototype.drawPoints=function(ctx,text,x,y,fontSize,options){this.forEachGlyph(text,x,y,fontSize,options,function(glyph,gX,gY,gFontSize){glyph.drawPoints(ctx,gX,gY,gFontSize);});};/**
	 * Draw lines indicating important font measurements for all glyphs in the text.
	 * Black lines indicate the origin of the coordinate system (point 0,0).
	 * Blue lines indicate the glyph bounding box.
	 * Green line indicates the advance width of the glyph.
	 * @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
	 * @param {string} text - The text to create.
	 * @param {number} [x=0] - Horizontal position of the beginning of the text.
	 * @param {number} [y=0] - Vertical position of the *baseline* of the text.
	 * @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
	 * @param {GlyphRenderOptions=} options
	 */Font.prototype.drawMetrics=function(ctx,text,x,y,fontSize,options){this.forEachGlyph(text,x,y,fontSize,options,function(glyph,gX,gY,gFontSize){glyph.drawMetrics(ctx,gX,gY,gFontSize);});};/**
	 * @param  {string}
	 * @return {string}
	 */Font.prototype.getEnglishName=function(name){var translations=this.names[name];if(translations){return translations.en;}};/**
	 * Validate
	 */Font.prototype.validate=function(){var warnings=[];var _this=this;function assert(predicate,message){if(!predicate){warnings.push(message);}}function assertNamePresent(name){var englishName=_this.getEnglishName(name);assert(englishName&&englishName.trim().length>0,'No English '+name+' specified.');}// Identification information
assertNamePresent('fontFamily');assertNamePresent('weightName');assertNamePresent('manufacturer');assertNamePresent('copyright');assertNamePresent('version');// Dimension information
assert(this.unitsPerEm>0,'No unitsPerEm specified.');};/**
	 * Convert the font object to a SFNT data structure.
	 * This structure contains all the necessary tables and metadata to create a binary OTF file.
	 * @return {opentype.Table}
	 */Font.prototype.toTables=function(){return sfnt.fontToTable(this);};/**
	 * @deprecated Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.
	 */Font.prototype.toBuffer=function(){console.warn('Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.');return this.toArrayBuffer();};/**
	 * Converts a `opentype.Font` into an `ArrayBuffer`
	 * @return {ArrayBuffer}
	 */Font.prototype.toArrayBuffer=function(){var sfntTable=this.toTables();var bytes=sfntTable.encode();var buffer=new ArrayBuffer(bytes.length);var intArray=new Uint8Array(buffer);for(var i=0;i<bytes.length;i++){intArray[i]=bytes[i];}return buffer;};/**
	 * Initiate a download of the OpenType font.
	 */Font.prototype.download=function(fileName){var familyName=this.getEnglishName('fontFamily');var styleName=this.getEnglishName('fontSubfamily');fileName=fileName||familyName.replace(/\s/g,'')+'-'+styleName+'.otf';var arrayBuffer=this.toArrayBuffer();if(isBrowser()){window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem;window.requestFileSystem(window.TEMPORARY,arrayBuffer.byteLength,function(fs){fs.root.getFile(fileName,{create:true},function(fileEntry){fileEntry.createWriter(function(writer){var dataView=new DataView(arrayBuffer);var blob=new Blob([dataView],{type:'font/opentype'});writer.write(blob);writer.addEventListener('writeend',function(){// Navigating to the file will download it.
location.href=fileEntry.toURL();},false);});});},function(err){throw new Error(err.name+': '+err.message);});}else{var fs=__webpack_require__(3);var buffer=arrayBufferToNodeBuffer(arrayBuffer);fs.writeFileSync(fileName,buffer);}};/**
	 * @private
	 */Font.prototype.fsSelectionValues={ITALIC:0x001,//1
UNDERSCORE:0x002,//2
NEGATIVE:0x004,//4
OUTLINED:0x008,//8
STRIKEOUT:0x010,//16
BOLD:0x020,//32
REGULAR:0x040,//64
USER_TYPO_METRICS:0x080,//128
WWS:0x100,//256
OBLIQUE:0x200//512
};/**
	 * @private
	 */Font.prototype.usWidthClasses={ULTRA_CONDENSED:1,EXTRA_CONDENSED:2,CONDENSED:3,SEMI_CONDENSED:4,MEDIUM:5,SEMI_EXPANDED:6,EXPANDED:7,EXTRA_EXPANDED:8,ULTRA_EXPANDED:9};/**
	 * @private
	 */Font.prototype.usWeightClasses={THIN:100,EXTRA_LIGHT:200,LIGHT:300,NORMAL:400,MEDIUM:500,SEMI_BOLD:600,BOLD:700,EXTRA_BOLD:800,BLACK:900};// The `fvar` table stores font variation axes and instances.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6fvar.html
function addName(name,names){var nameString=(0,_stringify2.default)(name);var nameID=256;for(var nameKey in names){var n=parseInt(nameKey);if(!n||n<256){continue;}if((0,_stringify2.default)(names[nameKey])===nameString){return n;}if(nameID<=n){nameID=n+1;}}names[nameID]=name;return nameID;}function makeFvarAxis(n,axis,names){var nameID=addName(axis.name,names);return[{name:'tag_'+n,type:'TAG',value:axis.tag},{name:'minValue_'+n,type:'FIXED',value:axis.minValue<<16},{name:'defaultValue_'+n,type:'FIXED',value:axis.defaultValue<<16},{name:'maxValue_'+n,type:'FIXED',value:axis.maxValue<<16},{name:'flags_'+n,type:'USHORT',value:0},{name:'nameID_'+n,type:'USHORT',value:nameID}];}function parseFvarAxis(data,start,names){var axis={};var p=new parse.Parser(data,start);axis.tag=p.parseTag();axis.minValue=p.parseFixed();axis.defaultValue=p.parseFixed();axis.maxValue=p.parseFixed();p.skip('uShort',1);// reserved for flags; no values defined
axis.name=names[p.parseUShort()]||{};return axis;}function makeFvarInstance(n,inst,axes,names){var nameID=addName(inst.name,names);var fields=[{name:'nameID_'+n,type:'USHORT',value:nameID},{name:'flags_'+n,type:'USHORT',value:0}];for(var i=0;i<axes.length;++i){var axisTag=axes[i].tag;fields.push({name:'axis_'+n+' '+axisTag,type:'FIXED',value:inst.coordinates[axisTag]<<16});}return fields;}function parseFvarInstance(data,start,axes,names){var inst={};var p=new parse.Parser(data,start);inst.name=names[p.parseUShort()]||{};p.skip('uShort',1);// reserved for flags; no values defined
inst.coordinates={};for(var i=0;i<axes.length;++i){inst.coordinates[axes[i].tag]=p.parseFixed();}return inst;}function makeFvarTable(fvar,names){var result=new table.Table('fvar',[{name:'version',type:'ULONG',value:0x10000},{name:'offsetToData',type:'USHORT',value:0},{name:'countSizePairs',type:'USHORT',value:2},{name:'axisCount',type:'USHORT',value:fvar.axes.length},{name:'axisSize',type:'USHORT',value:20},{name:'instanceCount',type:'USHORT',value:fvar.instances.length},{name:'instanceSize',type:'USHORT',value:4+fvar.axes.length*4}]);result.offsetToData=result.sizeOf();for(var i=0;i<fvar.axes.length;i++){result.fields=result.fields.concat(makeFvarAxis(i,fvar.axes[i],names));}for(var j=0;j<fvar.instances.length;j++){result.fields=result.fields.concat(makeFvarInstance(j,fvar.instances[j],fvar.axes,names));}return result;}function parseFvarTable(data,start,names){var p=new parse.Parser(data,start);var tableVersion=p.parseULong();check.argument(tableVersion===0x00010000,'Unsupported fvar table version.');var offsetToData=p.parseOffset16();// Skip countSizePairs.
p.skip('uShort',1);var axisCount=p.parseUShort();var axisSize=p.parseUShort();var instanceCount=p.parseUShort();var instanceSize=p.parseUShort();var axes=[];for(var i=0;i<axisCount;i++){axes.push(parseFvarAxis(data,start+offsetToData+i*axisSize,names));}var instances=[];var instanceStart=start+offsetToData+axisCount*axisSize;for(var j=0;j<instanceCount;j++){instances.push(parseFvarInstance(data,instanceStart+j*instanceSize,axes,names));}return{axes:axes,instances:instances};}var fvar={make:makeFvarTable,parse:parseFvarTable};// The `GPOS` table contains kerning pairs, among other things.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm
// Parse ScriptList and FeatureList tables of GPOS, GSUB, GDEF, BASE, JSTF tables.
// These lists are unused by now, this function is just the basis for a real parsing.
function parseTaggedListTable(data,start){var p=new parse.Parser(data,start);var n=p.parseUShort();var list=[];for(var i=0;i<n;i++){list[p.parseTag()]={offset:p.parseUShort()};}return list;}// Parse a coverage table in a GSUB, GPOS or GDEF table.
// Format 1 is a simple list of glyph ids,
// Format 2 is a list of ranges. It is expanded in a list of glyphs, maybe not the best idea.
function parseCoverageTable(data,start){var p=new parse.Parser(data,start);var format=p.parseUShort();var count=p.parseUShort();if(format===1){return p.parseUShortList(count);}else if(format===2){var coverage=[];for(;count--;){var begin=p.parseUShort();var end=p.parseUShort();var index=p.parseUShort();for(var i=begin;i<=end;i++){coverage[index++]=i;}}return coverage;}}// Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
// Returns a function that gets a class value from a glyph ID.
function parseClassDefTable(data,start){var p=new parse.Parser(data,start);var format=p.parseUShort();if(format===1){// Format 1 specifies a range of consecutive glyph indices, one class per glyph ID.
var startGlyph=p.parseUShort();var glyphCount=p.parseUShort();var classes=p.parseUShortList(glyphCount);return function(glyphID){return classes[glyphID-startGlyph]||0;};}else if(format===2){// Format 2 defines multiple groups of glyph indices that belong to the same class.
var rangeCount=p.parseUShort();var startGlyphs=[];var endGlyphs=[];var classValues=[];for(var i=0;i<rangeCount;i++){startGlyphs[i]=p.parseUShort();endGlyphs[i]=p.parseUShort();classValues[i]=p.parseUShort();}return function(glyphID){var l=0;var r=startGlyphs.length-1;while(l<r){var c=l+r+1>>1;if(glyphID<startGlyphs[c]){r=c-1;}else{l=c;}}if(startGlyphs[l]<=glyphID&&glyphID<=endGlyphs[l]){return classValues[l]||0;}return 0;};}}// Parse a pair adjustment positioning subtable, format 1 or format 2
// The subtable is returned in the form of a lookup function.
function parsePairPosSubTable(data,start){var p=new parse.Parser(data,start);// This part is common to format 1 and format 2 subtables
var format=p.parseUShort();var coverageOffset=p.parseUShort();var coverage=parseCoverageTable(data,start+coverageOffset);// valueFormat 4: XAdvance only, 1: XPlacement only, 0: no ValueRecord for second glyph
// Only valueFormat1=4 and valueFormat2=0 is supported.
var valueFormat1=p.parseUShort();var valueFormat2=p.parseUShort();var value1;var value2;if(valueFormat1!==4||valueFormat2!==0){return;}var sharedPairSets={};if(format===1){// Pair Positioning Adjustment: Format 1
var pairSetCount=p.parseUShort();var pairSet=[];// Array of offsets to PairSet tables-from beginning of PairPos subtable-ordered by Coverage Index
var pairSetOffsets=p.parseOffset16List(pairSetCount);for(var firstGlyph=0;firstGlyph<pairSetCount;firstGlyph++){var pairSetOffset=pairSetOffsets[firstGlyph];var sharedPairSet=sharedPairSets[pairSetOffset];if(!sharedPairSet){// Parse a pairset table in a pair adjustment subtable format 1
sharedPairSet={};p.relativeOffset=pairSetOffset;var pairValueCount=p.parseUShort();for(;pairValueCount--;){var secondGlyph=p.parseUShort();if(valueFormat1){value1=p.parseShort();}if(valueFormat2){value2=p.parseShort();}// We only support valueFormat1 = 4 and valueFormat2 = 0,
// so value1 is the XAdvance and value2 is empty.
sharedPairSet[secondGlyph]=value1;}}pairSet[coverage[firstGlyph]]=sharedPairSet;}return function(leftGlyph,rightGlyph){var pairs=pairSet[leftGlyph];if(pairs){return pairs[rightGlyph];}};}else if(format===2){// Pair Positioning Adjustment: Format 2
var classDef1Offset=p.parseUShort();var classDef2Offset=p.parseUShort();var class1Count=p.parseUShort();var class2Count=p.parseUShort();var getClass1=parseClassDefTable(data,start+classDef1Offset);var getClass2=parseClassDefTable(data,start+classDef2Offset);// Parse kerning values by class pair.
var kerningMatrix=[];for(var i=0;i<class1Count;i++){var kerningRow=kerningMatrix[i]=[];for(var j=0;j<class2Count;j++){if(valueFormat1){value1=p.parseShort();}if(valueFormat2){value2=p.parseShort();}// We only support valueFormat1 = 4 and valueFormat2 = 0,
// so value1 is the XAdvance and value2 is empty.
kerningRow[j]=value1;}}// Convert coverage list to a hash
var covered={};for(var i$1=0;i$1<coverage.length;i$1++){covered[coverage[i$1]]=1;}// Get the kerning value for a specific glyph pair.
return function(leftGlyph,rightGlyph){if(!covered[leftGlyph]){return;}var class1=getClass1(leftGlyph);var class2=getClass2(rightGlyph);var kerningRow=kerningMatrix[class1];if(kerningRow){return kerningRow[class2];}};}}// Parse a LookupTable (present in of GPOS, GSUB, GDEF, BASE, JSTF tables).
function parseLookupTable(data,start){var p=new parse.Parser(data,start);var lookupType=p.parseUShort();var lookupFlag=p.parseUShort();var useMarkFilteringSet=lookupFlag&0x10;var subTableCount=p.parseUShort();var subTableOffsets=p.parseOffset16List(subTableCount);var table={lookupType:lookupType,lookupFlag:lookupFlag,markFilteringSet:useMarkFilteringSet?p.parseUShort():-1};// LookupType 2, Pair adjustment
if(lookupType===2){var subtables=[];for(var i=0;i<subTableCount;i++){var pairPosSubTable=parsePairPosSubTable(data,start+subTableOffsets[i]);if(pairPosSubTable){subtables.push(pairPosSubTable);}}// Return a function which finds the kerning values in the subtables.
table.getKerningValue=function(leftGlyph,rightGlyph){for(var i=subtables.length;i--;){var value=subtables[i](leftGlyph,rightGlyph);if(value!==undefined){return value;}}return 0;};}return table;}// Parse the `GPOS` table which contains, among other things, kerning pairs.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm
function parseGposTable(data,start,font){var p=new parse.Parser(data,start);var tableVersion=p.parseFixed();check.argument(tableVersion===1,'Unsupported GPOS table version.');// ScriptList and FeatureList - ignored for now
parseTaggedListTable(data,start+p.parseUShort());// 'kern' is the feature we are looking for.
parseTaggedListTable(data,start+p.parseUShort());// LookupList
var lookupListOffset=p.parseUShort();p.relativeOffset=lookupListOffset;var lookupCount=p.parseUShort();var lookupTableOffsets=p.parseOffset16List(lookupCount);var lookupListAbsoluteOffset=start+lookupListOffset;for(var i=0;i<lookupCount;i++){var table=parseLookupTable(data,lookupListAbsoluteOffset+lookupTableOffsets[i]);if(table.lookupType===2&&!font.getGposKerningValue){font.getGposKerningValue=table.getKerningValue;}}}var gpos={parse:parseGposTable};// The `kern` table contains kerning pairs.
// Note that some fonts use the GPOS OpenType layout table to specify kerning.
// https://www.microsoft.com/typography/OTSPEC/kern.htm
function parseWindowsKernTable(p){var pairs={};// Skip nTables.
p.skip('uShort');var subtableVersion=p.parseUShort();check.argument(subtableVersion===0,'Unsupported kern sub-table version.');// Skip subtableLength, subtableCoverage
p.skip('uShort',2);var nPairs=p.parseUShort();// Skip searchRange, entrySelector, rangeShift.
p.skip('uShort',3);for(var i=0;i<nPairs;i+=1){var leftIndex=p.parseUShort();var rightIndex=p.parseUShort();var value=p.parseShort();pairs[leftIndex+','+rightIndex]=value;}return pairs;}function parseMacKernTable(p){var pairs={};// The Mac kern table stores the version as a fixed (32 bits) but we only loaded the first 16 bits.
// Skip the rest.
p.skip('uShort');var nTables=p.parseULong();//check.argument(nTables === 1, 'Only 1 subtable is supported (got ' + nTables + ').');
if(nTables>1){console.warn('Only the first kern subtable is supported.');}p.skip('uLong');var coverage=p.parseUShort();var subtableVersion=coverage&0xFF;p.skip('uShort');if(subtableVersion===0){var nPairs=p.parseUShort();// Skip searchRange, entrySelector, rangeShift.
p.skip('uShort',3);for(var i=0;i<nPairs;i+=1){var leftIndex=p.parseUShort();var rightIndex=p.parseUShort();var value=p.parseShort();pairs[leftIndex+','+rightIndex]=value;}}return pairs;}// Parse the `kern` table which contains kerning pairs.
function parseKernTable(data,start){var p=new parse.Parser(data,start);var tableVersion=p.parseUShort();if(tableVersion===0){return parseWindowsKernTable(p);}else if(tableVersion===1){return parseMacKernTable(p);}else{throw new Error('Unsupported kern table version ('+tableVersion+').');}}var kern={parse:parseKernTable};// The `loca` table stores the offsets to the locations of the glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/loca.htm
// Parse the `loca` table. This table stores the offsets to the locations of the glyphs in the font,
// relative to the beginning of the glyphData table.
// The number of glyphs stored in the `loca` table is specified in the `maxp` table (under numGlyphs)
// The loca table has two versions: a short version where offsets are stored as uShorts, and a long
// version where offsets are stored as uLongs. The `head` table specifies which version to use
// (under indexToLocFormat).
function parseLocaTable(data,start,numGlyphs,shortVersion){var p=new parse.Parser(data,start);var parseFn=shortVersion?p.parseUShort:p.parseULong;// There is an extra entry after the last index element to compute the length of the last glyph.
// That's why we use numGlyphs + 1.
var glyphOffsets=[];for(var i=0;i<numGlyphs+1;i+=1){var glyphOffset=parseFn.call(p);if(shortVersion){// The short table version stores the actual offset divided by 2.
glyphOffset*=2;}glyphOffsets.push(glyphOffset);}return glyphOffsets;}var loca={parse:parseLocaTable};// opentype.js
// https://github.com/nodebox/opentype.js
// (c) 2015 Frederik De Bleser
// opentype.js may be freely distributed under the MIT license.
/* global DataView, Uint8Array, XMLHttpRequest  *//**
	 * The opentype library.
	 * @namespace opentype
	 */// File loaders /////////////////////////////////////////////////////////
/**
	 * Loads a font from a file. The callback throws an error message as the first parameter if it fails
	 * and the font as an ArrayBuffer in the second parameter if it succeeds.
	 * @param  {string} path - The path of the file
	 * @param  {Function} callback - The function to call when the font load completes
	 */function loadFromFile(path,callback){var fs=__webpack_require__(3);fs.readFile(path,function(err,buffer){if(err){return callback(err.message);}callback(null,nodeBufferToArrayBuffer(buffer));});}/**
	 * Loads a font from a URL. The callback throws an error message as the first parameter if it fails
	 * and the font as an ArrayBuffer in the second parameter if it succeeds.
	 * @param  {string} url - The URL of the font file.
	 * @param  {Function} callback - The function to call when the font load completes
	 */function loadFromUrl(url,callback){var request=new XMLHttpRequest();request.open('GET',url,true);request.responseType='arraybuffer';request.onload=function(){if(request.status!==200){return callback('Font could not be loaded: '+request.statusText);}return callback(null,request.response);};request.onerror=function(){callback('Font could not be loaded');};request.send();}// Table Directory Entries //////////////////////////////////////////////
/**
	 * Parses OpenType table entries.
	 * @param  {DataView}
	 * @param  {Number}
	 * @return {Object[]}
	 */function parseOpenTypeTableEntries(data,numTables){var tableEntries=[];var p=12;for(var i=0;i<numTables;i+=1){var tag=parse.getTag(data,p);var checksum=parse.getULong(data,p+4);var offset=parse.getULong(data,p+8);var length=parse.getULong(data,p+12);tableEntries.push({tag:tag,checksum:checksum,offset:offset,length:length,compression:false});p+=16;}return tableEntries;}/**
	 * Parses WOFF table entries.
	 * @param  {DataView}
	 * @param  {Number}
	 * @return {Object[]}
	 */function parseWOFFTableEntries(data,numTables){var tableEntries=[];var p=44;// offset to the first table directory entry.
for(var i=0;i<numTables;i+=1){var tag=parse.getTag(data,p);var offset=parse.getULong(data,p+4);var compLength=parse.getULong(data,p+8);var origLength=parse.getULong(data,p+12);var compression=void 0;if(compLength<origLength){compression='WOFF';}else{compression=false;}tableEntries.push({tag:tag,offset:offset,compression:compression,compressedLength:compLength,length:origLength});p+=20;}return tableEntries;}/**
	 * @typedef TableData
	 * @type Object
	 * @property {DataView} data - The DataView
	 * @property {number} offset - The data offset.
	 *//**
	 * @param  {DataView}
	 * @param  {Object}
	 * @return {TableData}
	 */function uncompressTable(data,tableEntry){if(tableEntry.compression==='WOFF'){var inBuffer=new Uint8Array(data.buffer,tableEntry.offset+2,tableEntry.compressedLength-2);var outBuffer=new Uint8Array(tableEntry.length);index(inBuffer,outBuffer);if(outBuffer.byteLength!==tableEntry.length){throw new Error('Decompression error: '+tableEntry.tag+' decompressed length doesn\'t match recorded length');}var view=new DataView(outBuffer.buffer,0);return{data:view,offset:0};}else{return{data:data,offset:tableEntry.offset};}}// Public API ///////////////////////////////////////////////////////////
/**
	 * Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
	 * Throws an error if the font could not be parsed.
	 * @param  {ArrayBuffer}
	 * @return {opentype.Font}
	 */function parseBuffer(buffer){var indexToLocFormat;var ltagTable;// Since the constructor can also be called to create new fonts from scratch, we indicate this
// should be an empty font that we'll fill with our own data.
var font=new Font({empty:true});// OpenType fonts use big endian byte ordering.
// We can't rely on typed array view types, because they operate with the endianness of the host computer.
// Instead we use DataViews where we can specify endianness.
var data=new DataView(buffer,0);var numTables;var tableEntries=[];var signature=parse.getTag(data,0);if(signature===String.fromCharCode(0,1,0,0)||signature==='true'||signature==='typ1'){font.outlinesFormat='truetype';numTables=parse.getUShort(data,4);tableEntries=parseOpenTypeTableEntries(data,numTables);}else if(signature==='OTTO'){font.outlinesFormat='cff';numTables=parse.getUShort(data,4);tableEntries=parseOpenTypeTableEntries(data,numTables);}else if(signature==='wOFF'){var flavor=parse.getTag(data,4);if(flavor===String.fromCharCode(0,1,0,0)){font.outlinesFormat='truetype';}else if(flavor==='OTTO'){font.outlinesFormat='cff';}else{throw new Error('Unsupported OpenType flavor '+signature);}numTables=parse.getUShort(data,12);tableEntries=parseWOFFTableEntries(data,numTables);}else{throw new Error('Unsupported OpenType signature '+signature);}var cffTableEntry;var fvarTableEntry;var glyfTableEntry;var gposTableEntry;var gsubTableEntry;var hmtxTableEntry;var kernTableEntry;var locaTableEntry;var nameTableEntry;var metaTableEntry;var p;for(var i=0;i<numTables;i+=1){var tableEntry=tableEntries[i];var table=void 0;switch(tableEntry.tag){case'cmap':table=uncompressTable(data,tableEntry);font.tables.cmap=cmap.parse(table.data,table.offset);font.encoding=new CmapEncoding(font.tables.cmap);break;case'cvt ':table=uncompressTable(data,tableEntry);p=new parse.Parser(table.data,table.offset);font.tables.cvt=p.parseShortList(tableEntry.length/2);break;case'fvar':fvarTableEntry=tableEntry;break;case'fpgm':table=uncompressTable(data,tableEntry);p=new parse.Parser(table.data,table.offset);font.tables.fpgm=p.parseByteList(tableEntry.length);break;case'head':table=uncompressTable(data,tableEntry);font.tables.head=head.parse(table.data,table.offset);font.unitsPerEm=font.tables.head.unitsPerEm;indexToLocFormat=font.tables.head.indexToLocFormat;break;case'hhea':table=uncompressTable(data,tableEntry);font.tables.hhea=hhea.parse(table.data,table.offset);font.ascender=font.tables.hhea.ascender;font.descender=font.tables.hhea.descender;font.numberOfHMetrics=font.tables.hhea.numberOfHMetrics;break;case'hmtx':hmtxTableEntry=tableEntry;break;case'ltag':table=uncompressTable(data,tableEntry);ltagTable=ltag.parse(table.data,table.offset);break;case'maxp':table=uncompressTable(data,tableEntry);font.tables.maxp=maxp.parse(table.data,table.offset);font.numGlyphs=font.tables.maxp.numGlyphs;break;case'name':nameTableEntry=tableEntry;break;case'OS/2':table=uncompressTable(data,tableEntry);font.tables.os2=os2.parse(table.data,table.offset);break;case'post':table=uncompressTable(data,tableEntry);font.tables.post=post.parse(table.data,table.offset);font.glyphNames=new GlyphNames(font.tables.post);break;case'prep':table=uncompressTable(data,tableEntry);p=new parse.Parser(table.data,table.offset);font.tables.prep=p.parseByteList(tableEntry.length);break;case'glyf':glyfTableEntry=tableEntry;break;case'loca':locaTableEntry=tableEntry;break;case'CFF ':cffTableEntry=tableEntry;break;case'kern':kernTableEntry=tableEntry;break;case'GPOS':gposTableEntry=tableEntry;break;case'GSUB':gsubTableEntry=tableEntry;break;case'meta':metaTableEntry=tableEntry;break;}}var nameTable=uncompressTable(data,nameTableEntry);font.tables.name=_name.parse(nameTable.data,nameTable.offset,ltagTable);font.names=font.tables.name;if(glyfTableEntry&&locaTableEntry){var shortVersion=indexToLocFormat===0;var locaTable=uncompressTable(data,locaTableEntry);var locaOffsets=loca.parse(locaTable.data,locaTable.offset,font.numGlyphs,shortVersion);var glyfTable=uncompressTable(data,glyfTableEntry);font.glyphs=glyf.parse(glyfTable.data,glyfTable.offset,locaOffsets,font);}else if(cffTableEntry){var cffTable=uncompressTable(data,cffTableEntry);cff.parse(cffTable.data,cffTable.offset,font);}else{throw new Error('Font doesn\'t contain TrueType or CFF outlines.');}var hmtxTable=uncompressTable(data,hmtxTableEntry);hmtx.parse(hmtxTable.data,hmtxTable.offset,font.numberOfHMetrics,font.numGlyphs,font.glyphs);addGlyphNames(font);if(kernTableEntry){var kernTable=uncompressTable(data,kernTableEntry);font.kerningPairs=kern.parse(kernTable.data,kernTable.offset);}else{font.kerningPairs={};}if(gposTableEntry){var gposTable=uncompressTable(data,gposTableEntry);gpos.parse(gposTable.data,gposTable.offset,font);}if(gsubTableEntry){var gsubTable=uncompressTable(data,gsubTableEntry);font.tables.gsub=gsub.parse(gsubTable.data,gsubTable.offset);}if(fvarTableEntry){var fvarTable=uncompressTable(data,fvarTableEntry);font.tables.fvar=fvar.parse(fvarTable.data,fvarTable.offset,font.names);}if(metaTableEntry){var metaTable=uncompressTable(data,metaTableEntry);font.tables.meta=meta.parse(metaTable.data,metaTable.offset);font.metas=font.tables.meta;}return font;}/**
	 * Asynchronously load the font from a URL or a filesystem. When done, call the callback
	 * with two arguments `(err, font)`. The `err` will be null on success,
	 * the `font` is a Font object.
	 * We use the node.js callback convention so that
	 * opentype.js can integrate with frameworks like async.js.
	 * @alias opentype.load
	 * @param  {string} url - The URL of the font to load.
	 * @param  {Function} callback - The callback.
	 */function load(url,callback){var isNode$$1=typeof window==='undefined';var loadFn=isNode$$1?loadFromFile:loadFromUrl;loadFn(url,function(err,arrayBuffer){if(err){return callback(err);}var font;try{font=parseBuffer(arrayBuffer);}catch(e){return callback(e,null);}return callback(null,font);});}/**
	 * Synchronously load the font from a URL or file.
	 * When done, returns the font object or throws an error.
	 * @alias opentype.loadSync
	 * @param  {string} url - The URL of the font to load.
	 * @return {opentype.Font}
	 */function loadSync(url){var fs=__webpack_require__(3);var buffer=fs.readFileSync(url);return parseBuffer(nodeBufferToArrayBuffer(buffer));}exports.Font=Font;exports.Glyph=Glyph;exports.Path=Path;exports.BoundingBox=BoundingBox;exports._parse=parse;exports.parse=parseBuffer;exports.load=load;exports.loadSync=loadSync;Object.defineProperty(exports,'__esModule',{value:true});});//# sourceMappingURL=opentype.js.map
/***/},/* 3 *//***/function(module,exports){/* (ignored) *//***/},/* 4 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Paper.js v0.11.4 - The Swiss Army Knife of Vector Graphics Scripting.
	 * http://paperjs.org/
	 *
	 * Copyright (c) 2011 - 2016, Juerg Lehni & Jonathan Puckey
	 * http://scratchdisk.com/ & http://jonathanpuckey.com/
	 *
	 * Distributed under the MIT license. See LICENSE file for details.
	 *
	 * All rights reserved.
	 *
	 * Date: Wed Jun 7 16:56:44 2017 +0200
	 *
	 ***
	 *
	 * Straps.js - Class inheritance library with support for bean-style accessors
	 *
	 * Copyright (c) 2006 - 2016 Juerg Lehni
	 * http://scratchdisk.com/
	 *
	 * Distributed under the MIT license.
	 *
	 ***
	 *
	 * Acorn.js
	 * http://marijnhaverbeke.nl/acorn/
	 *
	 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
	 * created by Marijn Haverbeke and released under an MIT license.
	 *
	 */var paper=function(self,undefined){self=self||__webpack_require__(5);var window=self.window,document=self.document;var Base=new function(){var hidden=/^(statics|enumerable|beans|preserve)$/,array=[],_slice=array.slice,create=_create2.default,describe=_getOwnPropertyDescriptor2.default,define=_defineProperty2.default,forEach=array.forEach||function(iter,bind){for(var i=0,l=this.length;i<l;i++){iter.call(bind,this[i],i,this);}},forIn=function forIn(iter,bind){for(var i in this){if(this.hasOwnProperty(i))iter.call(bind,this[i],i,this);}},set=_assign2.default||function(dst){for(var i=1,l=arguments.length;i<l;i++){var src=arguments[i];for(var key in src){if(src.hasOwnProperty(key))dst[key]=src[key];}}return dst;},_each=function _each(obj,iter,bind){if(obj){var desc=describe(obj,'length');(desc&&typeof desc.value==='number'?forEach:forIn).call(obj,iter,bind=bind||obj);}return bind;};function _inject(dest,src,enumerable,beans,preserve){var beansNames={};function field(name,val){val=val||(val=describe(src,name))&&(val.get?val:val.value);if(typeof val==='string'&&val[0]==='#')val=dest[val.substring(1)]||val;var isFunc=typeof val==='function',res=val,prev=preserve||isFunc&&!val.base?val&&val.get?name in dest:dest[name]:null,bean;if(!preserve||!prev){if(isFunc&&prev)val.base=prev;if(isFunc&&beans!==false&&(bean=name.match(/^([gs]et|is)(([A-Z])(.*))$/)))beansNames[bean[3].toLowerCase()+bean[4]]=bean[2];if(!res||isFunc||!res.get||typeof res.get!=='function'||!Base.isPlainObject(res)){res={value:res,writable:true};}if((describe(dest,name)||{configurable:true}).configurable){res.configurable=true;res.enumerable=enumerable!=null?enumerable:!bean;}define(dest,name,res);}}if(src){for(var name in src){if(src.hasOwnProperty(name)&&!hidden.test(name))field(name);}for(var name in beansNames){var part=beansNames[name],set=dest['set'+part],get=dest['get'+part]||set&&dest['is'+part];if(get&&(beans===true||get.length===0))field(name,{get:get,set:set});}}return dest;}function Base(){for(var i=0,l=arguments.length;i<l;i++){var src=arguments[i];if(src)set(this,src);}return this;}return _inject(Base,{inject:function inject(src){if(src){var statics=src.statics===true?src:src.statics,beans=src.beans,preserve=src.preserve;if(statics!==src)_inject(this.prototype,src,src.enumerable,beans,preserve);_inject(this,statics,null,beans,preserve);}for(var i=1,l=arguments.length;i<l;i++){this.inject(arguments[i]);}return this;},extend:function extend(){var base=this,ctor,proto;for(var i=0,obj,l=arguments.length;i<l&&!(ctor&&proto);i++){obj=arguments[i];ctor=ctor||obj.initialize;proto=proto||obj.prototype;}ctor=ctor||function(){base.apply(this,arguments);};proto=ctor.prototype=proto||create(this.prototype);define(proto,'constructor',{value:ctor,writable:true,configurable:true});_inject(ctor,this);if(arguments.length)this.inject.apply(ctor,arguments);ctor.base=base;return ctor;}}).inject({enumerable:false,initialize:Base,set:Base,inject:function inject(){for(var i=0,l=arguments.length;i<l;i++){var src=arguments[i];if(src){_inject(this,src,src.enumerable,src.beans,src.preserve);}}return this;},extend:function extend(){var res=create(this);return res.inject.apply(res,arguments);},each:function each(iter,bind){return _each(this,iter,bind);},clone:function clone(){return new this.constructor(this);},statics:{set:set,each:_each,create:create,define:define,describe:describe,clone:function clone(obj){return set(new obj.constructor(),obj);},isPlainObject:function isPlainObject(obj){var ctor=obj!=null&&obj.constructor;return ctor&&(ctor===Object||ctor===Base||ctor.name==='Object');},pick:function pick(a,b){return a!==undefined?a:b;},slice:function slice(list,begin,end){return _slice.call(list,begin,end);}}});}();if(true)module.exports=Base;Base.inject({enumerable:false,toString:function toString(){return this._id!=null?(this._class||'Object')+(this._name?" '"+this._name+"'":' @'+this._id):'{ '+Base.each(this,function(value,key){if(!/^_/.test(key)){var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);this.push(key+': '+(type==='number'?Formatter.instance.number(value):type==='string'?"'"+value+"'":value));}},[]).join(', ')+' }';},getClassName:function getClassName(){return this._class||'';},importJSON:function importJSON(json){return Base.importJSON(json,this);},exportJSON:function exportJSON(options){return Base.exportJSON(this,options);},toJSON:function toJSON(){return Base.serialize(this);},set:function set(props,exclude){if(props)Base.filter(this,props,exclude,this._prioritize);return this;}},{beans:false,statics:{exports:{},extend:function extend(){var res=extend.base.apply(this,arguments),name=res.prototype._class;if(name&&!Base.exports[name])Base.exports[name]=res;return res;},equals:function equals(obj1,obj2){if(obj1===obj2)return true;if(obj1&&obj1.equals)return obj1.equals(obj2);if(obj2&&obj2.equals)return obj2.equals(obj1);if(obj1&&obj2&&(typeof obj1==='undefined'?'undefined':(0,_typeof4.default)(obj1))==='object'&&(typeof obj2==='undefined'?'undefined':(0,_typeof4.default)(obj2))==='object'){if(Array.isArray(obj1)&&Array.isArray(obj2)){var length=obj1.length;if(length!==obj2.length)return false;while(length--){if(!Base.equals(obj1[length],obj2[length]))return false;}}else{var keys=(0,_keys2.default)(obj1),length=keys.length;if(length!==(0,_keys2.default)(obj2).length)return false;while(length--){var key=keys[length];if(!(obj2.hasOwnProperty(key)&&Base.equals(obj1[key],obj2[key])))return false;}}return true;}return false;},read:function read(list,start,options,amount){if(this===Base){var value=this.peek(list,start);list.__index++;return value;}var proto=this.prototype,readIndex=proto._readIndex,begin=start||readIndex&&list.__index||0,length=list.length,obj=list[begin];amount=amount||length-begin;if(obj instanceof this||options&&options.readNull&&obj==null&&amount<=1){if(readIndex)list.__index=begin+1;return obj&&options&&options.clone?obj.clone():obj;}obj=Base.create(proto);if(readIndex)obj.__read=true;obj=obj.initialize.apply(obj,begin>0||begin+amount<length?Base.slice(list,begin,begin+amount):list)||obj;if(readIndex){list.__index=begin+obj.__read;var filtered=obj.__filtered;if(filtered){list.__filtered=filtered;obj.__filtered=undefined;}obj.__read=undefined;}return obj;},peek:function peek(list,start){return list[list.__index=start||list.__index||0];},remain:function remain(list){return list.length-(list.__index||0);},readList:function readList(list,start,options,amount){var res=[],entry,begin=start||0,end=amount?begin+amount:list.length;for(var i=begin;i<end;i++){res.push(Array.isArray(entry=list[i])?this.read(entry,0,options):this.read(list,i,options,1));}return res;},readNamed:function readNamed(list,name,start,options,amount){var value=this.getNamed(list,name),hasObject=value!==undefined;if(hasObject){var filtered=list.__filtered;if(!filtered){filtered=list.__filtered=Base.create(list[0]);filtered.__unfiltered=list[0];}filtered[name]=undefined;}var l=hasObject?[value]:list,res=this.read(l,start,options,amount);return res;},getNamed:function getNamed(list,name){var arg=list[0];if(list._hasObject===undefined)list._hasObject=list.length===1&&Base.isPlainObject(arg);if(list._hasObject)return name?arg[name]:list.__filtered||arg;},hasNamed:function hasNamed(list,name){return!!this.getNamed(list,name);},filter:function filter(dest,source,exclude,prioritize){var processed;function handleKey(key){if(!(exclude&&key in exclude)&&!(processed&&key in processed)){var value=source[key];if(value!==undefined)dest[key]=value;}}if(prioritize){var keys={};for(var i=0,key,l=prioritize.length;i<l;i++){if((key=prioritize[i])in source){handleKey(key);keys[key]=true;}}processed=keys;}(0,_keys2.default)(source.__unfiltered||source).forEach(handleKey);return dest;},isPlainValue:function isPlainValue(obj,asString){return Base.isPlainObject(obj)||Array.isArray(obj)||asString&&typeof obj==='string';},serialize:function serialize(obj,options,compact,dictionary){options=options||{};var isRoot=!dictionary,res;if(isRoot){options.formatter=new Formatter(options.precision);dictionary={length:0,definitions:{},references:{},add:function add(item,create){var id='#'+item._id,ref=this.references[id];if(!ref){this.length++;var res=create.call(item),name=item._class;if(name&&res[0]!==name)res.unshift(name);this.definitions[id]=res;ref=this.references[id]=[id];}return ref;}};}if(obj&&obj._serialize){res=obj._serialize(options,dictionary);var name=obj._class;if(name&&!obj._compactSerialize&&(isRoot||!compact)&&res[0]!==name){res.unshift(name);}}else if(Array.isArray(obj)){res=[];for(var i=0,l=obj.length;i<l;i++){res[i]=Base.serialize(obj[i],options,compact,dictionary);}}else if(Base.isPlainObject(obj)){res={};var keys=(0,_keys2.default)(obj);for(var i=0,l=keys.length;i<l;i++){var key=keys[i];res[key]=Base.serialize(obj[key],options,compact,dictionary);}}else if(typeof obj==='number'){res=options.formatter.number(obj,options.precision);}else{res=obj;}return isRoot&&dictionary.length>0?[['dictionary',dictionary.definitions],res]:res;},deserialize:function deserialize(json,create,_data,_setDictionary,_isRoot){var res=json,isFirst=!_data,hasDictionary=isFirst&&json&&json.length&&json[0][0]==='dictionary';_data=_data||{};if(Array.isArray(json)){var type=json[0],isDictionary=type==='dictionary';if(json.length==1&&/^#/.test(type)){return _data.dictionary[type];}type=Base.exports[type];res=[];for(var i=type?1:0,l=json.length;i<l;i++){res.push(Base.deserialize(json[i],create,_data,isDictionary,hasDictionary));}if(type){var args=res;if(create){res=create(type,args,isFirst||_isRoot);}else{res=Base.create(type.prototype);type.apply(res,args);}}}else if(Base.isPlainObject(json)){res={};if(_setDictionary)_data.dictionary=res;for(var key in json){res[key]=Base.deserialize(json[key],create,_data);}}return hasDictionary?res[1]:res;},exportJSON:function exportJSON(obj,options){var json=Base.serialize(obj,options);return options&&options.asString==false?json:(0,_stringify2.default)(json);},importJSON:function importJSON(json,target){return Base.deserialize(typeof json==='string'?JSON.parse(json):json,function(ctor,args,isRoot){var useTarget=isRoot&&target&&target.constructor===ctor,obj=useTarget?target:Base.create(ctor.prototype);if(args.length===1&&obj instanceof Item&&(useTarget||!(obj instanceof Layer))){var arg=args[0];if(Base.isPlainObject(arg))arg.insert=false;}(useTarget?obj.set:ctor).apply(obj,args);if(useTarget)target=null;return obj;});},splice:function splice(list,items,index,remove){var amount=items&&items.length,append=index===undefined;index=append?list.length:index;if(index>list.length)index=list.length;for(var i=0;i<amount;i++){items[i]._index=index+i;}if(append){list.push.apply(list,items);return[];}else{var args=[index,remove];if(items)args.push.apply(args,items);var removed=list.splice.apply(list,args);for(var i=0,l=removed.length;i<l;i++){removed[i]._index=undefined;}for(var i=index+amount,l=list.length;i<l;i++){list[i]._index=i;}return removed;}},capitalize:function capitalize(str){return str.replace(/\b[a-z]/g,function(match){return match.toUpperCase();});},camelize:function camelize(str){return str.replace(/-(.)/g,function(match,chr){return chr.toUpperCase();});},hyphenate:function hyphenate(str){return str.replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase();}}});var Emitter={on:function on(type,func){if(typeof type!=='string'){Base.each(type,function(value,key){this.on(key,value);},this);}else{var types=this._eventTypes,entry=types&&types[type],handlers=this._callbacks=this._callbacks||{};handlers=handlers[type]=handlers[type]||[];if(handlers.indexOf(func)===-1){handlers.push(func);if(entry&&entry.install&&handlers.length===1)entry.install.call(this,type);}}return this;},off:function off(type,func){if(typeof type!=='string'){Base.each(type,function(value,key){this.off(key,value);},this);return;}var types=this._eventTypes,entry=types&&types[type],handlers=this._callbacks&&this._callbacks[type],index;if(handlers){if(!func||(index=handlers.indexOf(func))!==-1&&handlers.length===1){if(entry&&entry.uninstall)entry.uninstall.call(this,type);delete this._callbacks[type];}else if(index!==-1){handlers.splice(index,1);}}return this;},once:function once(type,func){return this.on(type,function(){func.apply(this,arguments);this.off(type,func);});},emit:function emit(type,event){var handlers=this._callbacks&&this._callbacks[type];if(!handlers)return false;var args=Base.slice(arguments,1),setTarget=event&&event.target&&!event.currentTarget;handlers=handlers.slice();if(setTarget)event.currentTarget=this;for(var i=0,l=handlers.length;i<l;i++){if(handlers[i].apply(this,args)==false){if(event&&event.stop)event.stop();break;}}if(setTarget)delete event.currentTarget;return true;},responds:function responds(type){return!!(this._callbacks&&this._callbacks[type]);},attach:'#on',detach:'#off',fire:'#emit',_installEvents:function _installEvents(install){var types=this._eventTypes,handlers=this._callbacks,key=install?'install':'uninstall';if(types){for(var type in handlers){if(handlers[type].length>0){var entry=types[type],func=entry&&entry[key];if(func)func.call(this,type);}}}},statics:{inject:function inject(src){var events=src._events;if(events){var types={};Base.each(events,function(entry,key){var isString=typeof entry==='string',name=isString?entry:key,part=Base.capitalize(name),type=name.substring(2).toLowerCase();types[type]=isString?{}:entry;name='_'+name;src['get'+part]=function(){return this[name];};src['set'+part]=function(func){var prev=this[name];if(prev)this.off(type,prev);if(func)this.on(type,func);this[name]=func;};});src._eventTypes=types;}return inject.base.apply(this,arguments);}}};var PaperScope=Base.extend({_class:'PaperScope',initialize:function PaperScope(){paper=this;this.settings=new Base({applyMatrix:true,insertItems:true,handleSize:4,hitTolerance:0});this.project=null;this.projects=[];this.tools=[];this._id=PaperScope._id++;PaperScope._scopes[this._id]=this;var proto=PaperScope.prototype;if(!this.support){var ctx=CanvasProvider.getContext(1,1)||{};proto.support={nativeDash:'setLineDash'in ctx||'mozDash'in ctx,nativeBlendModes:BlendMode.nativeModes};CanvasProvider.release(ctx);}if(!this.agent){var user=self.navigator.userAgent.toLowerCase(),os=(/(darwin|win|mac|linux|freebsd|sunos)/.exec(user)||[])[0],platform=os==='darwin'?'mac':os,agent=proto.agent=proto.browser={platform:platform};if(platform)agent[platform]=true;user.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,function(match,n,v1,v2,rv){if(!agent.chrome){var v=n==='opera'?v2:/^(node|trident)$/.test(n)?rv:v1;agent.version=v;agent.versionNumber=parseFloat(v);n=n==='trident'?'msie':n;agent.name=n;agent[n]=true;}});if(agent.chrome)delete agent.webkit;if(agent.atom)delete agent.chrome;}},version:"0.11.4",getView:function getView(){var project=this.project;return project&&project._view;},getPaper:function getPaper(){return this;},execute:function execute(code,options){paper.PaperScript.execute(code,this,options);View.updateFocus();},install:function install(scope){var that=this;Base.each(['project','view','tool'],function(key){Base.define(scope,key,{configurable:true,get:function get(){return that[key];}});});for(var key in this){if(!/^_/.test(key)&&this[key])scope[key]=this[key];}},setup:function setup(element){paper=this;this.project=new Project(element);return this;},createCanvas:function createCanvas(width,height){return CanvasProvider.getCanvas(width,height);},activate:function activate(){paper=this;},clear:function clear(){var projects=this.projects,tools=this.tools;for(var i=projects.length-1;i>=0;i--){projects[i].remove();}for(var i=tools.length-1;i>=0;i--){tools[i].remove();}},remove:function remove(){this.clear();delete PaperScope._scopes[this._id];},statics:new function(){function handleAttribute(name){name+='Attribute';return function(el,attr){return el[name](attr)||el[name]('data-paper-'+attr);};}return{_scopes:{},_id:0,get:function get(id){return this._scopes[id]||null;},getAttribute:handleAttribute('get'),hasAttribute:handleAttribute('has')};}()});var PaperScopeItem=Base.extend(Emitter,{initialize:function initialize(activate){this._scope=paper;this._index=this._scope[this._list].push(this)-1;if(activate||!this._scope[this._reference])this.activate();},activate:function activate(){if(!this._scope)return false;var prev=this._scope[this._reference];if(prev&&prev!==this)prev.emit('deactivate');this._scope[this._reference]=this;this.emit('activate',prev);return true;},isActive:function isActive(){return this._scope[this._reference]===this;},remove:function remove(){if(this._index==null)return false;Base.splice(this._scope[this._list],null,this._index,1);if(this._scope[this._reference]==this)this._scope[this._reference]=null;this._scope=null;return true;},getView:function getView(){return this._scope.getView();}});var Formatter=Base.extend({initialize:function initialize(precision){this.precision=Base.pick(precision,5);this.multiplier=Math.pow(10,this.precision);},number:function number(val){return this.precision<16?Math.round(val*this.multiplier)/this.multiplier:val;},pair:function pair(val1,val2,separator){return this.number(val1)+(separator||',')+this.number(val2);},point:function point(val,separator){return this.number(val.x)+(separator||',')+this.number(val.y);},size:function size(val,separator){return this.number(val.width)+(separator||',')+this.number(val.height);},rectangle:function rectangle(val,separator){return this.point(val,separator)+(separator||',')+this.size(val,separator);}});Formatter.instance=new Formatter();var Numerical=new function(){var abscissas=[[0.5773502691896257645091488],[0,0.7745966692414833770358531],[0.3399810435848562648026658,0.8611363115940525752239465],[0,0.5384693101056830910363144,0.9061798459386639927976269],[0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],[0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],[0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],[0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],[0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],[0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]];var weights=[[1],[0.8888888888888888888888889,0.5555555555555555555555556],[0.6521451548625461426269361,0.3478548451374538573730639],[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]];var abs=Math.abs,sqrt=Math.sqrt,pow=Math.pow,log2=_log2.default||function(x){return Math.log(x)*Math.LOG2E;},EPSILON=1e-12,MACHINE_EPSILON=1.12e-16;function clamp(value,min,max){return value<min?min:value>max?max:value;}function getDiscriminant(a,b,c){function split(v){var x=v*134217729,y=v-x,hi=y+x,lo=v-hi;return[hi,lo];}var D=b*b-a*c,E=b*b+a*c;if(abs(D)*3<E){var ad=split(a),bd=split(b),cd=split(c),p=b*b,dp=bd[0]*bd[0]-p+2*bd[0]*bd[1]+bd[1]*bd[1],q=a*c,dq=ad[0]*cd[0]-q+ad[0]*cd[1]+ad[1]*cd[0]+ad[1]*cd[1];D=p-q+(dp-dq);}return D;}function getNormalizationFactor(){var norm=Math.max.apply(Math,arguments);return norm&&(norm<1e-8||norm>1e8)?pow(2,-Math.round(log2(norm))):0;}return{EPSILON:EPSILON,MACHINE_EPSILON:MACHINE_EPSILON,CURVETIME_EPSILON:1e-8,GEOMETRIC_EPSILON:1e-7,TRIGONOMETRIC_EPSILON:1e-8,KAPPA:4*(sqrt(2)-1)/3,isZero:function isZero(val){return val>=-EPSILON&&val<=EPSILON;},clamp:clamp,integrate:function integrate(f,a,b,n){var x=abscissas[n-2],w=weights[n-2],A=(b-a)*0.5,B=A+a,i=0,m=n+1>>1,sum=n&1?w[i++]*f(B):0;while(i<m){var Ax=A*x[i];sum+=w[i++]*(f(B+Ax)+f(B-Ax));}return A*sum;},findRoot:function findRoot(f,df,x,a,b,n,tolerance){for(var i=0;i<n;i++){var fx=f(x),dx=fx/df(x),nx=x-dx;if(abs(dx)<tolerance){x=nx;break;}if(fx>0){b=x;x=nx<=a?(a+b)*0.5:nx;}else{a=x;x=nx>=b?(a+b)*0.5:nx;}}return clamp(x,a,b);},solveQuadratic:function solveQuadratic(a,b,c,roots,min,max){var x1,x2=Infinity;if(abs(a)<EPSILON){if(abs(b)<EPSILON)return abs(c)<EPSILON?-1:0;x1=-c/b;}else{b*=-0.5;var D=getDiscriminant(a,b,c);if(D&&abs(D)<MACHINE_EPSILON){var f=getNormalizationFactor(abs(a),abs(b),abs(c));if(f){a*=f;b*=f;c*=f;D=getDiscriminant(a,b,c);}}if(D>=-MACHINE_EPSILON){var Q=D<0?0:sqrt(D),R=b+(b<0?-Q:Q);if(R===0){x1=c/a;x2=-x1;}else{x1=R/a;x2=c/R;}}}var count=0,boundless=min==null,minB=min-EPSILON,maxB=max+EPSILON;if(isFinite(x1)&&(boundless||x1>minB&&x1<maxB))roots[count++]=boundless?x1:clamp(x1,min,max);if(x2!==x1&&isFinite(x2)&&(boundless||x2>minB&&x2<maxB))roots[count++]=boundless?x2:clamp(x2,min,max);return count;},solveCubic:function solveCubic(a,b,c,d,roots,min,max){var f=getNormalizationFactor(abs(a),abs(b),abs(c),abs(d)),x,b1,c2,qd,q;if(f){a*=f;b*=f;c*=f;d*=f;}function evaluate(x0){x=x0;var tmp=a*x;b1=tmp+b;c2=b1*x+c;qd=(tmp+b1)*x+c2;q=c2*x+d;}if(abs(a)<EPSILON){a=b;b1=c;c2=d;x=Infinity;}else if(abs(d)<EPSILON){b1=b;c2=c;x=0;}else{evaluate(-(b/a)/3);var t=q/a,r=pow(abs(t),1/3),s=t<0?-1:1,td=-qd/a,rd=td>0?1.324717957244746*Math.max(r,sqrt(td)):r,x0=x-s*rd;if(x0!==x){do{evaluate(x0);x0=qd===0?x:x-q/qd/(1+MACHINE_EPSILON);}while(s*x0>s*x);if(abs(a)*x*x>abs(d/x)){c2=-d/x;b1=(c2-c)/x;}}}var count=Numerical.solveQuadratic(a,b1,c2,roots,min,max),boundless=min==null;if(isFinite(x)&&(count===0||count>0&&x!==roots[0]&&x!==roots[1])&&(boundless||x>min-EPSILON&&x<max+EPSILON))roots[count++]=boundless?x:clamp(x,min,max);return count;}};}();var UID={_id:1,_pools:{},get:function get(name){if(name){var pool=this._pools[name];if(!pool)pool=this._pools[name]={_id:1};return pool._id++;}else{return this._id++;}}};var Point=Base.extend({_class:'Point',_readIndex:true,initialize:function Point(arg0,arg1){var type=typeof arg0==='undefined'?'undefined':(0,_typeof4.default)(arg0),reading=this.__read,read=0;if(type==='number'){var hasY=typeof arg1==='number';this._set(arg0,hasY?arg1:arg0);if(reading)read=hasY?2:1;}else if(type==='undefined'||arg0===null){this._set(0,0);if(reading)read=arg0===null?1:0;}else{var obj=type==='string'?arg0.split(/[\s,]+/)||[]:arg0;read=1;if(Array.isArray(obj)){this._set(+obj[0],+(obj.length>1?obj[1]:obj[0]));}else if('x'in obj){this._set(obj.x||0,obj.y||0);}else if('width'in obj){this._set(obj.width||0,obj.height||0);}else if('angle'in obj){this._set(obj.length||0,0);this.setAngle(obj.angle||0);}else{this._set(0,0);read=0;}}if(reading)this.__read=read;return this;},set:'#initialize',_set:function _set(x,y){this.x=x;this.y=y;return this;},equals:function equals(point){return this===point||point&&(this.x===point.x&&this.y===point.y||Array.isArray(point)&&this.x===point[0]&&this.y===point[1])||false;},clone:function clone(){return new Point(this.x,this.y);},toString:function toString(){var f=Formatter.instance;return'{ x: '+f.number(this.x)+', y: '+f.number(this.y)+' }';},_serialize:function _serialize(options){var f=options.formatter;return[f.number(this.x),f.number(this.y)];},getLength:function getLength(){return Math.sqrt(this.x*this.x+this.y*this.y);},setLength:function setLength(length){if(this.isZero()){var angle=this._angle||0;this._set(Math.cos(angle)*length,Math.sin(angle)*length);}else{var scale=length/this.getLength();if(Numerical.isZero(scale))this.getAngle();this._set(this.x*scale,this.y*scale);}},getAngle:function getAngle(){return this.getAngleInRadians.apply(this,arguments)*180/Math.PI;},setAngle:function setAngle(angle){this.setAngleInRadians.call(this,angle*Math.PI/180);},getAngleInDegrees:'#getAngle',setAngleInDegrees:'#setAngle',getAngleInRadians:function getAngleInRadians(){if(!arguments.length){return this.isZero()?this._angle||0:this._angle=Math.atan2(this.y,this.x);}else{var point=Point.read(arguments),div=this.getLength()*point.getLength();if(Numerical.isZero(div)){return NaN;}else{var a=this.dot(point)/div;return Math.acos(a<-1?-1:a>1?1:a);}}},setAngleInRadians:function setAngleInRadians(angle){this._angle=angle;if(!this.isZero()){var length=this.getLength();this._set(Math.cos(angle)*length,Math.sin(angle)*length);}},getQuadrant:function getQuadrant(){return this.x>=0?this.y>=0?1:4:this.y>=0?2:3;}},{beans:false,getDirectedAngle:function getDirectedAngle(){var point=Point.read(arguments);return Math.atan2(this.cross(point),this.dot(point))*180/Math.PI;},getDistance:function getDistance(){var point=Point.read(arguments),x=point.x-this.x,y=point.y-this.y,d=x*x+y*y,squared=Base.read(arguments);return squared?d:Math.sqrt(d);},normalize:function normalize(length){if(length===undefined)length=1;var current=this.getLength(),scale=current!==0?length/current:0,point=new Point(this.x*scale,this.y*scale);if(scale>=0)point._angle=this._angle;return point;},rotate:function rotate(angle,center){if(angle===0)return this.clone();angle=angle*Math.PI/180;var point=center?this.subtract(center):this,sin=Math.sin(angle),cos=Math.cos(angle);point=new Point(point.x*cos-point.y*sin,point.x*sin+point.y*cos);return center?point.add(center):point;},transform:function transform(matrix){return matrix?matrix._transformPoint(this):this;},add:function add(){var point=Point.read(arguments);return new Point(this.x+point.x,this.y+point.y);},subtract:function subtract(){var point=Point.read(arguments);return new Point(this.x-point.x,this.y-point.y);},multiply:function multiply(){var point=Point.read(arguments);return new Point(this.x*point.x,this.y*point.y);},divide:function divide(){var point=Point.read(arguments);return new Point(this.x/point.x,this.y/point.y);},modulo:function modulo(){var point=Point.read(arguments);return new Point(this.x%point.x,this.y%point.y);},negate:function negate(){return new Point(-this.x,-this.y);},isInside:function isInside(){return _Rectangle.read(arguments).contains(this);},isClose:function isClose(){var point=Point.read(arguments),tolerance=Base.read(arguments);return this.getDistance(point)<=tolerance;},isCollinear:function isCollinear(){var point=Point.read(arguments);return Point.isCollinear(this.x,this.y,point.x,point.y);},isColinear:'#isCollinear',isOrthogonal:function isOrthogonal(){var point=Point.read(arguments);return Point.isOrthogonal(this.x,this.y,point.x,point.y);},isZero:function isZero(){var isZero=Numerical.isZero;return isZero(this.x)&&isZero(this.y);},isNaN:function(_isNaN){function isNaN(){return _isNaN.apply(this,arguments);}isNaN.toString=function(){return _isNaN.toString();};return isNaN;}(function(){return isNaN(this.x)||isNaN(this.y);}),isInQuadrant:function isInQuadrant(q){return this.x*(q>1&&q<4?-1:1)>=0&&this.y*(q>2?-1:1)>=0;},dot:function dot(){var point=Point.read(arguments);return this.x*point.x+this.y*point.y;},cross:function cross(){var point=Point.read(arguments);return this.x*point.y-this.y*point.x;},project:function project(){var point=Point.read(arguments),scale=point.isZero()?0:this.dot(point)/point.dot(point);return new Point(point.x*scale,point.y*scale);},statics:{min:function min(){var point1=Point.read(arguments),point2=Point.read(arguments);return new Point(Math.min(point1.x,point2.x),Math.min(point1.y,point2.y));},max:function max(){var point1=Point.read(arguments),point2=Point.read(arguments);return new Point(Math.max(point1.x,point2.x),Math.max(point1.y,point2.y));},random:function random(){return new Point(Math.random(),Math.random());},isCollinear:function isCollinear(x1,y1,x2,y2){return Math.abs(x1*y2-y1*x2)<=Math.sqrt((x1*x1+y1*y1)*(x2*x2+y2*y2))*1e-8;},isOrthogonal:function isOrthogonal(x1,y1,x2,y2){return Math.abs(x1*x2+y1*y2)<=Math.sqrt((x1*x1+y1*y1)*(x2*x2+y2*y2))*1e-8;}}},Base.each(['round','ceil','floor','abs'],function(key){var op=Math[key];this[key]=function(){return new Point(op(this.x),op(this.y));};},{}));var LinkedPoint=Point.extend({initialize:function Point(x,y,owner,setter){this._x=x;this._y=y;this._owner=owner;this._setter=setter;},_set:function _set(x,y,_dontNotify){this._x=x;this._y=y;if(!_dontNotify)this._owner[this._setter](this);return this;},getX:function getX(){return this._x;},setX:function setX(x){this._x=x;this._owner[this._setter](this);},getY:function getY(){return this._y;},setY:function setY(y){this._y=y;this._owner[this._setter](this);},isSelected:function isSelected(){return!!(this._owner._selection&this._getSelection());},setSelected:function setSelected(selected){this._owner._changeSelection(this._getSelection(),selected);},_getSelection:function _getSelection(){return this._setter==='setPosition'?4:0;}});var Size=Base.extend({_class:'Size',_readIndex:true,initialize:function Size(arg0,arg1){var type=typeof arg0==='undefined'?'undefined':(0,_typeof4.default)(arg0),reading=this.__read,read=0;if(type==='number'){var hasHeight=typeof arg1==='number';this._set(arg0,hasHeight?arg1:arg0);if(reading)read=hasHeight?2:1;}else if(type==='undefined'||arg0===null){this._set(0,0);if(reading)read=arg0===null?1:0;}else{var obj=type==='string'?arg0.split(/[\s,]+/)||[]:arg0;read=1;if(Array.isArray(obj)){this._set(+obj[0],+(obj.length>1?obj[1]:obj[0]));}else if('width'in obj){this._set(obj.width||0,obj.height||0);}else if('x'in obj){this._set(obj.x||0,obj.y||0);}else{this._set(0,0);read=0;}}if(reading)this.__read=read;return this;},set:'#initialize',_set:function _set(width,height){this.width=width;this.height=height;return this;},equals:function equals(size){return size===this||size&&(this.width===size.width&&this.height===size.height||Array.isArray(size)&&this.width===size[0]&&this.height===size[1])||false;},clone:function clone(){return new Size(this.width,this.height);},toString:function toString(){var f=Formatter.instance;return'{ width: '+f.number(this.width)+', height: '+f.number(this.height)+' }';},_serialize:function _serialize(options){var f=options.formatter;return[f.number(this.width),f.number(this.height)];},add:function add(){var size=Size.read(arguments);return new Size(this.width+size.width,this.height+size.height);},subtract:function subtract(){var size=Size.read(arguments);return new Size(this.width-size.width,this.height-size.height);},multiply:function multiply(){var size=Size.read(arguments);return new Size(this.width*size.width,this.height*size.height);},divide:function divide(){var size=Size.read(arguments);return new Size(this.width/size.width,this.height/size.height);},modulo:function modulo(){var size=Size.read(arguments);return new Size(this.width%size.width,this.height%size.height);},negate:function negate(){return new Size(-this.width,-this.height);},isZero:function isZero(){var isZero=Numerical.isZero;return isZero(this.width)&&isZero(this.height);},isNaN:function(_isNaN2){function isNaN(){return _isNaN2.apply(this,arguments);}isNaN.toString=function(){return _isNaN2.toString();};return isNaN;}(function(){return isNaN(this.width)||isNaN(this.height);}),statics:{min:function min(size1,size2){return new Size(Math.min(size1.width,size2.width),Math.min(size1.height,size2.height));},max:function max(size1,size2){return new Size(Math.max(size1.width,size2.width),Math.max(size1.height,size2.height));},random:function random(){return new Size(Math.random(),Math.random());}}},Base.each(['round','ceil','floor','abs'],function(key){var op=Math[key];this[key]=function(){return new Size(op(this.width),op(this.height));};},{}));var LinkedSize=Size.extend({initialize:function Size(width,height,owner,setter){this._width=width;this._height=height;this._owner=owner;this._setter=setter;},_set:function _set(width,height,_dontNotify){this._width=width;this._height=height;if(!_dontNotify)this._owner[this._setter](this);return this;},getWidth:function getWidth(){return this._width;},setWidth:function setWidth(width){this._width=width;this._owner[this._setter](this);},getHeight:function getHeight(){return this._height;},setHeight:function setHeight(height){this._height=height;this._owner[this._setter](this);}});var _Rectangle=Base.extend({_class:'Rectangle',_readIndex:true,beans:true,initialize:function Rectangle(arg0,arg1,arg2,arg3){var type=typeof arg0==='undefined'?'undefined':(0,_typeof4.default)(arg0),read;if(type==='number'){this._set(arg0,arg1,arg2,arg3);read=4;}else if(type==='undefined'||arg0===null){this._set(0,0,0,0);read=arg0===null?1:0;}else if(arguments.length===1){if(Array.isArray(arg0)){this._set.apply(this,arg0);read=1;}else if(arg0.x!==undefined||arg0.width!==undefined){this._set(arg0.x||0,arg0.y||0,arg0.width||0,arg0.height||0);read=1;}else if(arg0.from===undefined&&arg0.to===undefined){this._set(0,0,0,0);Base.filter(this,arg0);read=1;}}if(read===undefined){var frm=Point.readNamed(arguments,'from'),next=Base.peek(arguments),x=frm.x,y=frm.y,width,height;if(next&&next.x!==undefined||Base.hasNamed(arguments,'to')){var to=Point.readNamed(arguments,'to');width=to.x-x;height=to.y-y;if(width<0){x=to.x;width=-width;}if(height<0){y=to.y;height=-height;}}else{var size=Size.read(arguments);width=size.width;height=size.height;}this._set(x,y,width,height);read=arguments.__index;var filtered=arguments.__filtered;if(filtered)this.__filtered=filtered;}if(this.__read)this.__read=read;return this;},set:'#initialize',_set:function _set(x,y,width,height){this.x=x;this.y=y;this.width=width;this.height=height;return this;},clone:function clone(){return new _Rectangle(this.x,this.y,this.width,this.height);},equals:function equals(rect){var rt=Base.isPlainValue(rect)?_Rectangle.read(arguments):rect;return rt===this||rt&&this.x===rt.x&&this.y===rt.y&&this.width===rt.width&&this.height===rt.height||false;},toString:function toString(){var f=Formatter.instance;return'{ x: '+f.number(this.x)+', y: '+f.number(this.y)+', width: '+f.number(this.width)+', height: '+f.number(this.height)+' }';},_serialize:function _serialize(options){var f=options.formatter;return[f.number(this.x),f.number(this.y),f.number(this.width),f.number(this.height)];},getPoint:function getPoint(_dontLink){var ctor=_dontLink?Point:LinkedPoint;return new ctor(this.x,this.y,this,'setPoint');},setPoint:function setPoint(){var point=Point.read(arguments);this.x=point.x;this.y=point.y;},getSize:function getSize(_dontLink){var ctor=_dontLink?Size:LinkedSize;return new ctor(this.width,this.height,this,'setSize');},_fw:1,_fh:1,setSize:function setSize(){var size=Size.read(arguments),sx=this._sx,sy=this._sy,w=size.width,h=size.height;if(sx){this.x+=(this.width-w)*sx;}if(sy){this.y+=(this.height-h)*sy;}this.width=w;this.height=h;this._fw=this._fh=1;},getLeft:function getLeft(){return this.x;},setLeft:function setLeft(left){if(!this._fw){var amount=left-this.x;this.width-=this._sx===0.5?amount*2:amount;}this.x=left;this._sx=this._fw=0;},getTop:function getTop(){return this.y;},setTop:function setTop(top){if(!this._fh){var amount=top-this.y;this.height-=this._sy===0.5?amount*2:amount;}this.y=top;this._sy=this._fh=0;},getRight:function getRight(){return this.x+this.width;},setRight:function setRight(right){if(!this._fw){var amount=right-this.x;this.width=this._sx===0.5?amount*2:amount;}this.x=right-this.width;this._sx=1;this._fw=0;},getBottom:function getBottom(){return this.y+this.height;},setBottom:function setBottom(bottom){if(!this._fh){var amount=bottom-this.y;this.height=this._sy===0.5?amount*2:amount;}this.y=bottom-this.height;this._sy=1;this._fh=0;},getCenterX:function getCenterX(){return this.x+this.width/2;},setCenterX:function setCenterX(x){if(this._fw||this._sx===0.5){this.x=x-this.width/2;}else{if(this._sx){this.x+=(x-this.x)*2*this._sx;}this.width=(x-this.x)*2;}this._sx=0.5;this._fw=0;},getCenterY:function getCenterY(){return this.y+this.height/2;},setCenterY:function setCenterY(y){if(this._fh||this._sy===0.5){this.y=y-this.height/2;}else{if(this._sy){this.y+=(y-this.y)*2*this._sy;}this.height=(y-this.y)*2;}this._sy=0.5;this._fh=0;},getCenter:function getCenter(_dontLink){var ctor=_dontLink?Point:LinkedPoint;return new ctor(this.getCenterX(),this.getCenterY(),this,'setCenter');},setCenter:function setCenter(){var point=Point.read(arguments);this.setCenterX(point.x);this.setCenterY(point.y);return this;},getArea:function getArea(){return this.width*this.height;},isEmpty:function isEmpty(){return this.width===0||this.height===0;},contains:function contains(arg){return arg&&arg.width!==undefined||(Array.isArray(arg)?arg:arguments).length===4?this._containsRectangle(_Rectangle.read(arguments)):this._containsPoint(Point.read(arguments));},_containsPoint:function _containsPoint(point){var x=point.x,y=point.y;return x>=this.x&&y>=this.y&&x<=this.x+this.width&&y<=this.y+this.height;},_containsRectangle:function _containsRectangle(rect){var x=rect.x,y=rect.y;return x>=this.x&&y>=this.y&&x+rect.width<=this.x+this.width&&y+rect.height<=this.y+this.height;},intersects:function intersects(){var rect=_Rectangle.read(arguments),epsilon=Base.read(arguments)||0;return rect.x+rect.width>this.x-epsilon&&rect.y+rect.height>this.y-epsilon&&rect.x<this.x+this.width+epsilon&&rect.y<this.y+this.height+epsilon;},intersect:function intersect(){var rect=_Rectangle.read(arguments),x1=Math.max(this.x,rect.x),y1=Math.max(this.y,rect.y),x2=Math.min(this.x+this.width,rect.x+rect.width),y2=Math.min(this.y+this.height,rect.y+rect.height);return new _Rectangle(x1,y1,x2-x1,y2-y1);},unite:function unite(){var rect=_Rectangle.read(arguments),x1=Math.min(this.x,rect.x),y1=Math.min(this.y,rect.y),x2=Math.max(this.x+this.width,rect.x+rect.width),y2=Math.max(this.y+this.height,rect.y+rect.height);return new _Rectangle(x1,y1,x2-x1,y2-y1);},include:function include(){var point=Point.read(arguments);var x1=Math.min(this.x,point.x),y1=Math.min(this.y,point.y),x2=Math.max(this.x+this.width,point.x),y2=Math.max(this.y+this.height,point.y);return new _Rectangle(x1,y1,x2-x1,y2-y1);},expand:function expand(){var amount=Size.read(arguments),hor=amount.width,ver=amount.height;return new _Rectangle(this.x-hor/2,this.y-ver/2,this.width+hor,this.height+ver);},scale:function scale(hor,ver){return this.expand(this.width*hor-this.width,this.height*(ver===undefined?hor:ver)-this.height);}},Base.each([['Top','Left'],['Top','Right'],['Bottom','Left'],['Bottom','Right'],['Left','Center'],['Top','Center'],['Right','Center'],['Bottom','Center']],function(parts,index){var part=parts.join(''),xFirst=/^[RL]/.test(part);if(index>=4)parts[1]+=xFirst?'Y':'X';var x=parts[xFirst?0:1],y=parts[xFirst?1:0],getX='get'+x,getY='get'+y,setX='set'+x,setY='set'+y,get='get'+part,set='set'+part;this[get]=function(_dontLink){var ctor=_dontLink?Point:LinkedPoint;return new ctor(this[getX](),this[getY](),this,set);};this[set]=function(){var point=Point.read(arguments);this[setX](point.x);this[setY](point.y);};},{beans:true}));var LinkedRectangle=_Rectangle.extend({initialize:function Rectangle(x,y,width,height,owner,setter){this._set(x,y,width,height,true);this._owner=owner;this._setter=setter;},_set:function _set(x,y,width,height,_dontNotify){this._x=x;this._y=y;this._width=width;this._height=height;if(!_dontNotify)this._owner[this._setter](this);return this;}},new function(){var proto=_Rectangle.prototype;return Base.each(['x','y','width','height'],function(key){var part=Base.capitalize(key),internal='_'+key;this['get'+part]=function(){return this[internal];};this['set'+part]=function(value){this[internal]=value;if(!this._dontNotify)this._owner[this._setter](this);};},Base.each(['Point','Size','Center','Left','Top','Right','Bottom','CenterX','CenterY','TopLeft','TopRight','BottomLeft','BottomRight','LeftCenter','TopCenter','RightCenter','BottomCenter'],function(key){var name='set'+key;this[name]=function(){this._dontNotify=true;proto[name].apply(this,arguments);this._dontNotify=false;this._owner[this._setter](this);};},{isSelected:function isSelected(){return!!(this._owner._selection&2);},setSelected:function setSelected(selected){var owner=this._owner;if(owner._changeSelection){owner._changeSelection(2,selected);}}}));}());var Matrix=Base.extend({_class:'Matrix',initialize:function Matrix(arg,_dontNotify){var count=arguments.length,ok=true;if(count>=6){this._set.apply(this,arguments);}else if(count===1||count===2){if(arg instanceof Matrix){this._set(arg._a,arg._b,arg._c,arg._d,arg._tx,arg._ty,_dontNotify);}else if(Array.isArray(arg)){this._set.apply(this,_dontNotify?arg.concat([_dontNotify]):arg);}else{ok=false;}}else if(!count){this.reset();}else{ok=false;}if(!ok){throw new Error('Unsupported matrix parameters');}return this;},set:'#initialize',_set:function _set(a,b,c,d,tx,ty,_dontNotify){this._a=a;this._b=b;this._c=c;this._d=d;this._tx=tx;this._ty=ty;if(!_dontNotify)this._changed();return this;},_serialize:function _serialize(options,dictionary){return Base.serialize(this.getValues(),options,true,dictionary);},_changed:function _changed(){var owner=this._owner;if(owner){if(owner._applyMatrix){owner.transform(null,true);}else{owner._changed(9);}}},clone:function clone(){return new Matrix(this._a,this._b,this._c,this._d,this._tx,this._ty);},equals:function equals(mx){return mx===this||mx&&this._a===mx._a&&this._b===mx._b&&this._c===mx._c&&this._d===mx._d&&this._tx===mx._tx&&this._ty===mx._ty;},toString:function toString(){var f=Formatter.instance;return'[['+[f.number(this._a),f.number(this._c),f.number(this._tx)].join(', ')+'], ['+[f.number(this._b),f.number(this._d),f.number(this._ty)].join(', ')+']]';},reset:function reset(_dontNotify){this._a=this._d=1;this._b=this._c=this._tx=this._ty=0;if(!_dontNotify)this._changed();return this;},apply:function apply(recursively,_setApplyMatrix){var owner=this._owner;if(owner){owner.transform(null,true,Base.pick(recursively,true),_setApplyMatrix);return this.isIdentity();}return false;},translate:function translate(){var point=Point.read(arguments),x=point.x,y=point.y;this._tx+=x*this._a+y*this._c;this._ty+=x*this._b+y*this._d;this._changed();return this;},scale:function scale(){var scale=Point.read(arguments),center=Point.read(arguments,0,{readNull:true});if(center)this.translate(center);this._a*=scale.x;this._b*=scale.x;this._c*=scale.y;this._d*=scale.y;if(center)this.translate(center.negate());this._changed();return this;},rotate:function rotate(angle){angle*=Math.PI/180;var center=Point.read(arguments,1),x=center.x,y=center.y,cos=Math.cos(angle),sin=Math.sin(angle),tx=x-x*cos+y*sin,ty=y-x*sin-y*cos,a=this._a,b=this._b,c=this._c,d=this._d;this._a=cos*a+sin*c;this._b=cos*b+sin*d;this._c=-sin*a+cos*c;this._d=-sin*b+cos*d;this._tx+=tx*a+ty*c;this._ty+=tx*b+ty*d;this._changed();return this;},shear:function shear(){var shear=Point.read(arguments),center=Point.read(arguments,0,{readNull:true});if(center)this.translate(center);var a=this._a,b=this._b;this._a+=shear.y*this._c;this._b+=shear.y*this._d;this._c+=shear.x*a;this._d+=shear.x*b;if(center)this.translate(center.negate());this._changed();return this;},skew:function skew(){var skew=Point.read(arguments),center=Point.read(arguments,0,{readNull:true}),toRadians=Math.PI/180,shear=new Point(Math.tan(skew.x*toRadians),Math.tan(skew.y*toRadians));return this.shear(shear,center);},append:function append(mx,_dontNotify){if(mx){var a1=this._a,b1=this._b,c1=this._c,d1=this._d,a2=mx._a,b2=mx._c,c2=mx._b,d2=mx._d,tx2=mx._tx,ty2=mx._ty;this._a=a2*a1+c2*c1;this._c=b2*a1+d2*c1;this._b=a2*b1+c2*d1;this._d=b2*b1+d2*d1;this._tx+=tx2*a1+ty2*c1;this._ty+=tx2*b1+ty2*d1;if(!_dontNotify)this._changed();}return this;},prepend:function prepend(mx,_dontNotify){if(mx){var a1=this._a,b1=this._b,c1=this._c,d1=this._d,tx1=this._tx,ty1=this._ty,a2=mx._a,b2=mx._c,c2=mx._b,d2=mx._d,tx2=mx._tx,ty2=mx._ty;this._a=a2*a1+b2*b1;this._c=a2*c1+b2*d1;this._b=c2*a1+d2*b1;this._d=c2*c1+d2*d1;this._tx=a2*tx1+b2*ty1+tx2;this._ty=c2*tx1+d2*ty1+ty2;if(!_dontNotify)this._changed();}return this;},appended:function appended(mx){return this.clone().append(mx);},prepended:function prepended(mx){return this.clone().prepend(mx);},invert:function invert(){var a=this._a,b=this._b,c=this._c,d=this._d,tx=this._tx,ty=this._ty,det=a*d-b*c,res=null;if(det&&!isNaN(det)&&isFinite(tx)&&isFinite(ty)){this._a=d/det;this._b=-b/det;this._c=-c/det;this._d=a/det;this._tx=(c*ty-d*tx)/det;this._ty=(b*tx-a*ty)/det;res=this;}return res;},inverted:function inverted(){return this.clone().invert();},concatenate:'#append',preConcatenate:'#prepend',chain:'#appended',_shiftless:function _shiftless(){return new Matrix(this._a,this._b,this._c,this._d,0,0);},_orNullIfIdentity:function _orNullIfIdentity(){return this.isIdentity()?null:this;},isIdentity:function isIdentity(){return this._a===1&&this._b===0&&this._c===0&&this._d===1&&this._tx===0&&this._ty===0;},isInvertible:function isInvertible(){var det=this._a*this._d-this._c*this._b;return det&&!isNaN(det)&&isFinite(this._tx)&&isFinite(this._ty);},isSingular:function isSingular(){return!this.isInvertible();},transform:function transform(src,dst,count){return arguments.length<3?this._transformPoint(Point.read(arguments)):this._transformCoordinates(src,dst,count);},_transformPoint:function _transformPoint(point,dest,_dontNotify){var x=point.x,y=point.y;if(!dest)dest=new Point();return dest._set(x*this._a+y*this._c+this._tx,x*this._b+y*this._d+this._ty,_dontNotify);},_transformCoordinates:function _transformCoordinates(src,dst,count){for(var i=0,max=2*count;i<max;i+=2){var x=src[i],y=src[i+1];dst[i]=x*this._a+y*this._c+this._tx;dst[i+1]=x*this._b+y*this._d+this._ty;}return dst;},_transformCorners:function _transformCorners(rect){var x1=rect.x,y1=rect.y,x2=x1+rect.width,y2=y1+rect.height,coords=[x1,y1,x2,y1,x2,y2,x1,y2];return this._transformCoordinates(coords,coords,4);},_transformBounds:function _transformBounds(bounds,dest,_dontNotify){var coords=this._transformCorners(bounds),min=coords.slice(0,2),max=min.slice();for(var i=2;i<8;i++){var val=coords[i],j=i&1;if(val<min[j]){min[j]=val;}else if(val>max[j]){max[j]=val;}}if(!dest)dest=new _Rectangle();return dest._set(min[0],min[1],max[0]-min[0],max[1]-min[1],_dontNotify);},inverseTransform:function inverseTransform(){return this._inverseTransform(Point.read(arguments));},_inverseTransform:function _inverseTransform(point,dest,_dontNotify){var a=this._a,b=this._b,c=this._c,d=this._d,tx=this._tx,ty=this._ty,det=a*d-b*c,res=null;if(det&&!isNaN(det)&&isFinite(tx)&&isFinite(ty)){var x=point.x-this._tx,y=point.y-this._ty;if(!dest)dest=new Point();res=dest._set((x*d-y*c)/det,(y*a-x*b)/det,_dontNotify);}return res;},decompose:function decompose(){var a=this._a,b=this._b,c=this._c,d=this._d,det=a*d-b*c,sqrt=Math.sqrt,atan2=Math.atan2,degrees=180/Math.PI,rotate,scale,skew;if(a!==0||b!==0){var r=sqrt(a*a+b*b);rotate=Math.acos(a/r)*(b>0?1:-1);scale=[r,det/r];skew=[atan2(a*c+b*d,r*r),0];}else if(c!==0||d!==0){var s=sqrt(c*c+d*d);rotate=Math.asin(c/s)*(d>0?1:-1);scale=[det/s,s];skew=[0,atan2(a*c+b*d,s*s)];}else{rotate=0;skew=scale=[0,0];}return{translation:this.getTranslation(),rotation:rotate*degrees,scaling:new Point(scale),skewing:new Point(skew[0]*degrees,skew[1]*degrees)};},getValues:function getValues(){return[this._a,this._b,this._c,this._d,this._tx,this._ty];},getTranslation:function getTranslation(){return new Point(this._tx,this._ty);},getScaling:function getScaling(){return(this.decompose()||{}).scaling;},getRotation:function getRotation(){return(this.decompose()||{}).rotation;},applyToContext:function applyToContext(ctx){if(!this.isIdentity()){ctx.transform(this._a,this._b,this._c,this._d,this._tx,this._ty);}}},Base.each(['a','b','c','d','tx','ty'],function(key){var part=Base.capitalize(key),prop='_'+key;this['get'+part]=function(){return this[prop];};this['set'+part]=function(value){this[prop]=value;this._changed();};},{}));var Line=Base.extend({_class:'Line',initialize:function Line(arg0,arg1,arg2,arg3,arg4){var asVector=false;if(arguments.length>=4){this._px=arg0;this._py=arg1;this._vx=arg2;this._vy=arg3;asVector=arg4;}else{this._px=arg0.x;this._py=arg0.y;this._vx=arg1.x;this._vy=arg1.y;asVector=arg2;}if(!asVector){this._vx-=this._px;this._vy-=this._py;}},getPoint:function getPoint(){return new Point(this._px,this._py);},getVector:function getVector(){return new Point(this._vx,this._vy);},getLength:function getLength(){return this.getVector().getLength();},intersect:function intersect(line,isInfinite){return Line.intersect(this._px,this._py,this._vx,this._vy,line._px,line._py,line._vx,line._vy,true,isInfinite);},getSide:function getSide(point,isInfinite){return Line.getSide(this._px,this._py,this._vx,this._vy,point.x,point.y,true,isInfinite);},getDistance:function getDistance(point){return Math.abs(this.getSignedDistance(point));},getSignedDistance:function getSignedDistance(point){return Line.getSignedDistance(this._px,this._py,this._vx,this._vy,point.x,point.y,true);},isCollinear:function isCollinear(line){return Point.isCollinear(this._vx,this._vy,line._vx,line._vy);},isOrthogonal:function isOrthogonal(line){return Point.isOrthogonal(this._vx,this._vy,line._vx,line._vy);},statics:{intersect:function intersect(p1x,p1y,v1x,v1y,p2x,p2y,v2x,v2y,asVector,isInfinite){if(!asVector){v1x-=p1x;v1y-=p1y;v2x-=p2x;v2y-=p2y;}var cross=v1x*v2y-v1y*v2x;if(!Numerical.isZero(cross)){var dx=p1x-p2x,dy=p1y-p2y,u1=(v2x*dy-v2y*dx)/cross,u2=(v1x*dy-v1y*dx)/cross,epsilon=1e-12,uMin=-epsilon,uMax=1+epsilon;if(isInfinite||uMin<u1&&u1<uMax&&uMin<u2&&u2<uMax){if(!isInfinite){u1=u1<=0?0:u1>=1?1:u1;}return new Point(p1x+u1*v1x,p1y+u1*v1y);}}},getSide:function getSide(px,py,vx,vy,x,y,asVector,isInfinite){if(!asVector){vx-=px;vy-=py;}var v2x=x-px,v2y=y-py,ccw=v2x*vy-v2y*vx;if(!isInfinite&&Numerical.isZero(ccw)){ccw=(v2x*vx+v2x*vx)/(vx*vx+vy*vy);if(ccw>=0&&ccw<=1)ccw=0;}return ccw<0?-1:ccw>0?1:0;},getSignedDistance:function getSignedDistance(px,py,vx,vy,x,y,asVector){if(!asVector){vx-=px;vy-=py;}return vx===0?vy>0?x-px:px-x:vy===0?vx<0?y-py:py-y:((x-px)*vy-(y-py)*vx)/Math.sqrt(vx*vx+vy*vy);},getDistance:function getDistance(px,py,vx,vy,x,y,asVector){return Math.abs(Line.getSignedDistance(px,py,vx,vy,x,y,asVector));}}});var Project=PaperScopeItem.extend({_class:'Project',_list:'projects',_reference:'project',_compactSerialize:true,initialize:function Project(element){PaperScopeItem.call(this,true);this._children=[];this._namedChildren={};this._activeLayer=null;this._currentStyle=new Style(null,null,this);this._view=View.create(this,element||CanvasProvider.getCanvas(1,1));this._selectionItems={};this._selectionCount=0;this._updateVersion=0;},_serialize:function _serialize(options,dictionary){return Base.serialize(this._children,options,true,dictionary);},_changed:function _changed(flags,item){if(flags&1){var view=this._view;if(view){view._needsUpdate=true;if(!view._requested&&view._autoUpdate)view.requestUpdate();}}var changes=this._changes;if(changes&&item){var changesById=this._changesById,id=item._id,entry=changesById[id];if(entry){entry.flags|=flags;}else{changes.push(changesById[id]={item:item,flags:flags});}}},clear:function clear(){var children=this._children;for(var i=children.length-1;i>=0;i--){children[i].remove();}},isEmpty:function isEmpty(){return!this._children.length;},remove:function remove(){if(!remove.base.call(this))return false;if(this._view)this._view.remove();return true;},getView:function getView(){return this._view;},getCurrentStyle:function getCurrentStyle(){return this._currentStyle;},setCurrentStyle:function setCurrentStyle(style){this._currentStyle.set(style);},getIndex:function getIndex(){return this._index;},getOptions:function getOptions(){return this._scope.settings;},getLayers:function getLayers(){return this._children;},getActiveLayer:function getActiveLayer(){return this._activeLayer||new Layer({project:this,insert:true});},getSymbolDefinitions:function getSymbolDefinitions(){var definitions=[],ids={};this.getItems({class:SymbolItem,match:function match(item){var definition=item._definition,id=definition._id;if(!ids[id]){ids[id]=true;definitions.push(definition);}return false;}});return definitions;},getSymbols:'getSymbolDefinitions',getSelectedItems:function getSelectedItems(){var selectionItems=this._selectionItems,items=[];for(var id in selectionItems){var item=selectionItems[id],selection=item._selection;if(selection&1&&item.isInserted()){items.push(item);}else if(!selection){this._updateSelection(item);}}return items;},_updateSelection:function _updateSelection(item){var id=item._id,selectionItems=this._selectionItems;if(item._selection){if(selectionItems[id]!==item){this._selectionCount++;selectionItems[id]=item;}}else if(selectionItems[id]===item){this._selectionCount--;delete selectionItems[id];}},selectAll:function selectAll(){var children=this._children;for(var i=0,l=children.length;i<l;i++){children[i].setFullySelected(true);}},deselectAll:function deselectAll(){var selectionItems=this._selectionItems;for(var i in selectionItems){selectionItems[i].setFullySelected(false);}},addLayer:function addLayer(layer){return this.insertLayer(undefined,layer);},insertLayer:function insertLayer(index,layer){if(layer instanceof Layer){layer._remove(false,true);Base.splice(this._children,[layer],index,0);layer._setProject(this,true);var name=layer._name;if(name)layer.setName(name);if(this._changes)layer._changed(5);if(!this._activeLayer)this._activeLayer=layer;}else{layer=null;}return layer;},_insertItem:function _insertItem(index,item,_created){item=this.insertLayer(index,item)||(this._activeLayer||this._insertItem(undefined,new Layer(Item.NO_INSERT),true)).insertChild(index,item);if(_created&&item.activate)item.activate();return item;},getItems:function getItems(options){return Item._getItems(this,options);},getItem:function getItem(options){return Item._getItems(this,options,null,null,true)[0]||null;},importJSON:function importJSON(json){this.activate();var layer=this._activeLayer;return Base.importJSON(json,layer&&layer.isEmpty()&&layer);},removeOn:function removeOn(type){var sets=this._removeSets;if(sets){if(type==='mouseup')sets.mousedrag=null;var set=sets[type];if(set){for(var id in set){var item=set[id];for(var key in sets){var other=sets[key];if(other&&other!=set)delete other[item._id];}item.remove();}sets[type]=null;}}},draw:function draw(ctx,matrix,pixelRatio){this._updateVersion++;ctx.save();matrix.applyToContext(ctx);var children=this._children,param=new Base({offset:new Point(0,0),pixelRatio:pixelRatio,viewMatrix:matrix.isIdentity()?null:matrix,matrices:[new Matrix()],updateMatrix:true});for(var i=0,l=children.length;i<l;i++){children[i].draw(ctx,param);}ctx.restore();if(this._selectionCount>0){ctx.save();ctx.strokeWidth=1;var items=this._selectionItems,size=this._scope.settings.handleSize,version=this._updateVersion;for(var id in items){items[id]._drawSelection(ctx,matrix,size,items,version);}ctx.restore();}}});var Item=Base.extend(Emitter,{statics:{extend:function extend(src){if(src._serializeFields)src._serializeFields=Base.set({},this.prototype._serializeFields,src._serializeFields);return extend.base.apply(this,arguments);},NO_INSERT:{insert:false}},_class:'Item',_name:null,_applyMatrix:true,_canApplyMatrix:true,_canScaleStroke:false,_pivot:null,_visible:true,_blendMode:'normal',_opacity:1,_locked:false,_guide:false,_clipMask:false,_selection:0,_selectBounds:true,_selectChildren:false,_serializeFields:{name:null,applyMatrix:null,matrix:new Matrix(),pivot:null,visible:true,blendMode:'normal',opacity:1,locked:false,guide:false,clipMask:false,selected:false,data:{}},_prioritize:['applyMatrix']},new function(){var handlers=['onMouseDown','onMouseUp','onMouseDrag','onClick','onDoubleClick','onMouseMove','onMouseEnter','onMouseLeave'];return Base.each(handlers,function(name){this._events[name]={install:function install(type){this.getView()._countItemEvent(type,1);},uninstall:function uninstall(type){this.getView()._countItemEvent(type,-1);}};},{_events:{onFrame:{install:function install(){this.getView()._animateItem(this,true);},uninstall:function uninstall(){this.getView()._animateItem(this,false);}},onLoad:{},onError:{}},statics:{_itemHandlers:handlers}});}(),{initialize:function Item(){},_initialize:function _initialize(props,point){var hasProps=props&&Base.isPlainObject(props),internal=hasProps&&props.internal===true,matrix=this._matrix=new Matrix(),project=hasProps&&props.project||paper.project,settings=paper.settings;this._id=internal?null:UID.get();this._parent=this._index=null;this._applyMatrix=this._canApplyMatrix&&settings.applyMatrix;if(point)matrix.translate(point);matrix._owner=this;this._style=new Style(project._currentStyle,this,project);if(internal||hasProps&&props.insert==false||!settings.insertItems&&!(hasProps&&props.insert===true)){this._setProject(project);}else{(hasProps&&props.parent||project)._insertItem(undefined,this,true);}if(hasProps&&props!==Item.NO_INSERT){this.set(props,{internal:true,insert:true,project:true,parent:true});}return hasProps;},_serialize:function _serialize(options,dictionary){var props={},that=this;function serialize(fields){for(var key in fields){var value=that[key];if(!Base.equals(value,key==='leading'?fields.fontSize*1.2:fields[key])){props[key]=Base.serialize(value,options,key!=='data',dictionary);}}}serialize(this._serializeFields);if(!(this instanceof Group))serialize(this._style._defaults);return[this._class,props];},_changed:function _changed(flags){var symbol=this._symbol,cacheParent=this._parent||symbol,project=this._project;if(flags&8){this._bounds=this._position=this._decomposed=this._globalMatrix=undefined;}if(cacheParent&&flags&40){Item._clearBoundsCache(cacheParent);}if(flags&2){Item._clearBoundsCache(this);}if(project)project._changed(flags,this);if(symbol)symbol._changed(flags);},getId:function getId(){return this._id;},getName:function getName(){return this._name;},setName:function setName(name){if(this._name)this._removeNamed();if(name===+name+'')throw new Error('Names consisting only of numbers are not supported.');var owner=this._getOwner();if(name&&owner){var children=owner._children,namedChildren=owner._namedChildren;(namedChildren[name]=namedChildren[name]||[]).push(this);if(!(name in children))children[name]=this;}this._name=name||undefined;this._changed(128);},getStyle:function getStyle(){return this._style;},setStyle:function setStyle(style){this.getStyle().set(style);}},Base.each(['locked','visible','blendMode','opacity','guide'],function(name){var part=Base.capitalize(name),key='_'+name,flags={locked:128,visible:137};this['get'+part]=function(){return this[key];};this['set'+part]=function(value){if(value!=this[key]){this[key]=value;this._changed(flags[name]||129);}};},{}),{beans:true,getSelection:function getSelection(){return this._selection;},setSelection:function setSelection(selection){if(selection!==this._selection){this._selection=selection;var project=this._project;if(project){project._updateSelection(this);this._changed(129);}}},_changeSelection:function _changeSelection(flag,selected){var selection=this._selection;this.setSelection(selected?selection|flag:selection&~flag);},isSelected:function isSelected(){if(this._selectChildren){var children=this._children;for(var i=0,l=children.length;i<l;i++){if(children[i].isSelected())return true;}}return!!(this._selection&1);},setSelected:function setSelected(selected){if(this._selectChildren){var children=this._children;for(var i=0,l=children.length;i<l;i++){children[i].setSelected(selected);}}this._changeSelection(1,selected);},isFullySelected:function isFullySelected(){var children=this._children,selected=!!(this._selection&1);if(children&&selected){for(var i=0,l=children.length;i<l;i++){if(!children[i].isFullySelected())return false;}return true;}return selected;},setFullySelected:function setFullySelected(selected){var children=this._children;if(children){for(var i=0,l=children.length;i<l;i++){children[i].setFullySelected(selected);}}this._changeSelection(1,selected);},isClipMask:function isClipMask(){return this._clipMask;},setClipMask:function setClipMask(clipMask){if(this._clipMask!=(clipMask=!!clipMask)){this._clipMask=clipMask;if(clipMask){this.setFillColor(null);this.setStrokeColor(null);}this._changed(129);if(this._parent)this._parent._changed(1024);}},getData:function getData(){if(!this._data)this._data={};return this._data;},setData:function setData(data){this._data=data;},getPosition:function getPosition(_dontLink){var position=this._position,ctor=_dontLink?Point:LinkedPoint;if(!position){var pivot=this._pivot;position=this._position=pivot?this._matrix._transformPoint(pivot):this.getBounds().getCenter(true);}return new ctor(position.x,position.y,this,'setPosition');},setPosition:function setPosition(){this.translate(Point.read(arguments).subtract(this.getPosition(true)));},getPivot:function getPivot(){var pivot=this._pivot;return pivot?new LinkedPoint(pivot.x,pivot.y,this,'setPivot'):null;},setPivot:function setPivot(){this._pivot=Point.read(arguments,0,{clone:true,readNull:true});this._position=undefined;}},Base.each({getStrokeBounds:{stroke:true},getHandleBounds:{handle:true},getInternalBounds:{internal:true}},function(options,key){this[key]=function(matrix){return this.getBounds(matrix,options);};},{beans:true,getBounds:function getBounds(matrix,options){var hasMatrix=options||matrix instanceof Matrix,opts=Base.set({},hasMatrix?options:matrix,this._boundsOptions);if(!opts.stroke||this.getStrokeScaling())opts.cacheItem=this;var rect=this._getCachedBounds(hasMatrix&&matrix,opts).rect;return!arguments.length?new LinkedRectangle(rect.x,rect.y,rect.width,rect.height,this,'setBounds'):rect;},setBounds:function setBounds(){var rect=_Rectangle.read(arguments),bounds=this.getBounds(),_matrix=this._matrix,matrix=new Matrix(),center=rect.getCenter();matrix.translate(center);if(rect.width!=bounds.width||rect.height!=bounds.height){if(!_matrix.isInvertible()){_matrix.set(_matrix._backup||new Matrix().translate(_matrix.getTranslation()));bounds=this.getBounds();}matrix.scale(bounds.width!==0?rect.width/bounds.width:0,bounds.height!==0?rect.height/bounds.height:0);}center=bounds.getCenter();matrix.translate(-center.x,-center.y);this.transform(matrix);},_getBounds:function _getBounds(matrix,options){var children=this._children;if(!children||!children.length)return new _Rectangle();Item._updateBoundsCache(this,options.cacheItem);return Item._getBounds(children,matrix,options);},_getBoundsCacheKey:function _getBoundsCacheKey(options,internal){return[options.stroke?1:0,options.handle?1:0,internal?1:0].join('');},_getCachedBounds:function _getCachedBounds(matrix,options,noInternal){matrix=matrix&&matrix._orNullIfIdentity();var internal=options.internal&&!noInternal,cacheItem=options.cacheItem,_matrix=internal?null:this._matrix._orNullIfIdentity(),cacheKey=cacheItem&&(!matrix||matrix.equals(_matrix))&&this._getBoundsCacheKey(options,internal),bounds=this._bounds;Item._updateBoundsCache(this._parent||this._symbol,cacheItem);if(cacheKey&&bounds&&cacheKey in bounds){var cached=bounds[cacheKey];return{rect:cached.rect.clone(),nonscaling:cached.nonscaling};}var res=this._getBounds(matrix||_matrix,options),rect=res.rect||res,style=this._style,nonscaling=res.nonscaling||style.hasStroke()&&!style.getStrokeScaling();if(cacheKey){if(!bounds){this._bounds=bounds={};}var cached=bounds[cacheKey]={rect:rect.clone(),nonscaling:nonscaling,internal:internal};}return{rect:rect,nonscaling:nonscaling};},_getStrokeMatrix:function _getStrokeMatrix(matrix,options){var parent=this.getStrokeScaling()?null:options&&options.internal?this:this._parent||this._symbol&&this._symbol._item,mx=parent?parent.getViewMatrix().invert():matrix;return mx&&mx._shiftless();},statics:{_updateBoundsCache:function _updateBoundsCache(parent,item){if(parent&&item){var id=item._id,ref=parent._boundsCache=parent._boundsCache||{ids:{},list:[]};if(!ref.ids[id]){ref.list.push(item);ref.ids[id]=item;}}},_clearBoundsCache:function _clearBoundsCache(item){var cache=item._boundsCache;if(cache){item._bounds=item._position=item._boundsCache=undefined;for(var i=0,list=cache.list,l=list.length;i<l;i++){var other=list[i];if(other!==item){other._bounds=other._position=undefined;if(other._boundsCache)Item._clearBoundsCache(other);}}}},_getBounds:function _getBounds(items,matrix,options){var x1=Infinity,x2=-x1,y1=x1,y2=x2,nonscaling=false;options=options||{};for(var i=0,l=items.length;i<l;i++){var item=items[i];if(item._visible&&!item.isEmpty()){var bounds=item._getCachedBounds(matrix&&matrix.appended(item._matrix),options,true),rect=bounds.rect;x1=Math.min(rect.x,x1);y1=Math.min(rect.y,y1);x2=Math.max(rect.x+rect.width,x2);y2=Math.max(rect.y+rect.height,y2);if(bounds.nonscaling)nonscaling=true;}}return{rect:isFinite(x1)?new _Rectangle(x1,y1,x2-x1,y2-y1):new _Rectangle(),nonscaling:nonscaling};}}}),{beans:true,_decompose:function _decompose(){return this._applyMatrix?null:this._decomposed||(this._decomposed=this._matrix.decompose());},getRotation:function getRotation(){var decomposed=this._decompose();return decomposed?decomposed.rotation:0;},setRotation:function setRotation(rotation){var current=this.getRotation();if(current!=null&&rotation!=null){var decomposed=this._decomposed;this.rotate(rotation-current);if(decomposed){decomposed.rotation=rotation;this._decomposed=decomposed;}}},getScaling:function getScaling(){var decomposed=this._decompose(),s=decomposed&&decomposed.scaling;return new LinkedPoint(s?s.x:1,s?s.y:1,this,'setScaling');},setScaling:function setScaling(){var current=this.getScaling(),scaling=Point.read(arguments,0,{clone:true,readNull:true});if(current&&scaling&&!current.equals(scaling)){var rotation=this.getRotation(),decomposed=this._decomposed,matrix=new Matrix(),center=this.getPosition(true);matrix.translate(center);if(rotation)matrix.rotate(rotation);matrix.scale(scaling.x/current.x,scaling.y/current.y);if(rotation)matrix.rotate(-rotation);matrix.translate(center.negate());this.transform(matrix);if(decomposed){decomposed.scaling=scaling;this._decomposed=decomposed;}}},getMatrix:function getMatrix(){return this._matrix;},setMatrix:function setMatrix(){var matrix=this._matrix;matrix.initialize.apply(matrix,arguments);},getGlobalMatrix:function getGlobalMatrix(_dontClone){var matrix=this._globalMatrix,updateVersion=this._project._updateVersion;if(matrix&&matrix._updateVersion!==updateVersion)matrix=null;if(!matrix){matrix=this._globalMatrix=this._matrix.clone();var parent=this._parent;if(parent)matrix.prepend(parent.getGlobalMatrix(true));matrix._updateVersion=updateVersion;}return _dontClone?matrix:matrix.clone();},getViewMatrix:function getViewMatrix(){return this.getGlobalMatrix().prepend(this.getView()._matrix);},getApplyMatrix:function getApplyMatrix(){return this._applyMatrix;},setApplyMatrix:function setApplyMatrix(apply){if(this._applyMatrix=this._canApplyMatrix&&!!apply)this.transform(null,true);},getTransformContent:'#getApplyMatrix',setTransformContent:'#setApplyMatrix'},{getProject:function getProject(){return this._project;},_setProject:function _setProject(project,installEvents){if(this._project!==project){if(this._project)this._installEvents(false);this._project=project;var children=this._children;for(var i=0,l=children&&children.length;i<l;i++){children[i]._setProject(project);}installEvents=true;}if(installEvents)this._installEvents(true);},getView:function getView(){return this._project._view;},_installEvents:function _installEvents(install){_installEvents.base.call(this,install);var children=this._children;for(var i=0,l=children&&children.length;i<l;i++){children[i]._installEvents(install);}},getLayer:function getLayer(){var parent=this;while(parent=parent._parent){if(parent instanceof Layer)return parent;}return null;},getParent:function getParent(){return this._parent;},setParent:function setParent(item){return item.addChild(this);},_getOwner:'#getParent',getChildren:function getChildren(){return this._children;},setChildren:function setChildren(items){this.removeChildren();this.addChildren(items);},getFirstChild:function getFirstChild(){return this._children&&this._children[0]||null;},getLastChild:function getLastChild(){return this._children&&this._children[this._children.length-1]||null;},getNextSibling:function getNextSibling(){var owner=this._getOwner();return owner&&owner._children[this._index+1]||null;},getPreviousSibling:function getPreviousSibling(){var owner=this._getOwner();return owner&&owner._children[this._index-1]||null;},getIndex:function getIndex(){return this._index;},equals:function equals(item){return item===this||item&&this._class===item._class&&this._style.equals(item._style)&&this._matrix.equals(item._matrix)&&this._locked===item._locked&&this._visible===item._visible&&this._blendMode===item._blendMode&&this._opacity===item._opacity&&this._clipMask===item._clipMask&&this._guide===item._guide&&this._equals(item)||false;},_equals:function _equals(item){return Base.equals(this._children,item._children);},clone:function clone(options){var copy=new this.constructor(Item.NO_INSERT),children=this._children,insert=Base.pick(options?options.insert:undefined,options===undefined||options===true),deep=Base.pick(options?options.deep:undefined,true);if(children)copy.copyAttributes(this);if(!children||deep)copy.copyContent(this);if(!children)copy.copyAttributes(this);if(insert)copy.insertAbove(this);var name=this._name,parent=this._parent;if(name&&parent){var children=parent._children,orig=name,i=1;while(children[name]){name=orig+' '+i++;}if(name!==orig)copy.setName(name);}return copy;},copyContent:function copyContent(source){var children=source._children;for(var i=0,l=children&&children.length;i<l;i++){this.addChild(children[i].clone(false),true);}},copyAttributes:function copyAttributes(source,excludeMatrix){this.setStyle(source._style);var keys=['_locked','_visible','_blendMode','_opacity','_clipMask','_guide'];for(var i=0,l=keys.length;i<l;i++){var key=keys[i];if(source.hasOwnProperty(key))this[key]=source[key];}if(!excludeMatrix)this._matrix.set(source._matrix,true);this.setApplyMatrix(source._applyMatrix);this.setPivot(source._pivot);this.setSelection(source._selection);var data=source._data,name=source._name;this._data=data?Base.clone(data):null;if(name)this.setName(name);},rasterize:function rasterize(resolution,insert){var bounds=this.getStrokeBounds(),scale=(resolution||this.getView().getResolution())/72,topLeft=bounds.getTopLeft().floor(),bottomRight=bounds.getBottomRight().ceil(),size=new Size(bottomRight.subtract(topLeft)),raster=new Raster(Item.NO_INSERT);if(!size.isZero()){var canvas=CanvasProvider.getCanvas(size.multiply(scale)),ctx=canvas.getContext('2d'),matrix=new Matrix().scale(scale).translate(topLeft.negate());ctx.save();matrix.applyToContext(ctx);this.draw(ctx,new Base({matrices:[matrix]}));ctx.restore();raster.setCanvas(canvas);}raster.transform(new Matrix().translate(topLeft.add(size.divide(2))).scale(1/scale));if(insert===undefined||insert)raster.insertAbove(this);return raster;},contains:function contains(){return!!this._contains(this._matrix._inverseTransform(Point.read(arguments)));},_contains:function _contains(point){var children=this._children;if(children){for(var i=children.length-1;i>=0;i--){if(children[i].contains(point))return true;}return false;}return point.isInside(this.getInternalBounds());},isInside:function isInside(){return _Rectangle.read(arguments).contains(this.getBounds());},_asPathItem:function _asPathItem(){return new Path.Rectangle({rectangle:this.getInternalBounds(),matrix:this._matrix,insert:false});},intersects:function intersects(item,_matrix){if(!(item instanceof Item))return false;return this._asPathItem().getIntersections(item._asPathItem(),null,_matrix,true).length>0;}},new function(){function hitTest(){return this._hitTest(Point.read(arguments),HitResult.getOptions(arguments));}function hitTestAll(){var point=Point.read(arguments),options=HitResult.getOptions(arguments),all=[];this._hitTest(point,Base.set({all:all},options));return all;}function hitTestChildren(point,options,viewMatrix,_exclude){var children=this._children;if(children){for(var i=children.length-1;i>=0;i--){var child=children[i];var res=child!==_exclude&&child._hitTest(point,options,viewMatrix);if(res&&!options.all)return res;}}return null;}Project.inject({hitTest:hitTest,hitTestAll:hitTestAll,_hitTest:hitTestChildren});return{hitTest:hitTest,hitTestAll:hitTestAll,_hitTestChildren:hitTestChildren};}(),{_hitTest:function _hitTest(point,options,parentViewMatrix){if(this._locked||!this._visible||this._guide&&!options.guides||this.isEmpty()){return null;}var matrix=this._matrix,viewMatrix=parentViewMatrix?parentViewMatrix.appended(matrix):this.getGlobalMatrix().prepend(this.getView()._matrix),tolerance=Math.max(options.tolerance,1e-12),tolerancePadding=options._tolerancePadding=new Size(Path._getStrokePadding(tolerance,matrix._shiftless().invert()));point=matrix._inverseTransform(point);if(!point||!this._children&&!this.getBounds({internal:true,stroke:true,handle:true}).expand(tolerancePadding.multiply(2))._containsPoint(point)){return null;}var checkSelf=!(options.guides&&!this._guide||options.selected&&!this.isSelected()||options.type&&options.type!==Base.hyphenate(this._class)||options.class&&!(this instanceof options.class)),match=options.match,that=this,bounds,res;function filter(hit){if(hit&&match&&!match(hit))hit=null;if(hit&&options.all)options.all.push(hit);return hit;}function checkPoint(type,part){var pt=part?bounds['get'+part]():that.getPosition();if(point.subtract(pt).divide(tolerancePadding).length<=1){return new HitResult(type,that,{name:part?Base.hyphenate(part):type,point:pt});}}var checkPosition=options.position,checkCenter=options.center,checkBounds=options.bounds;if(checkSelf&&this._parent&&(checkPosition||checkCenter||checkBounds)){if(checkCenter||checkBounds){bounds=this.getInternalBounds();}res=checkPosition&&checkPoint('position')||checkCenter&&checkPoint('center','Center');if(!res&&checkBounds){var points=['TopLeft','TopRight','BottomLeft','BottomRight','LeftCenter','TopCenter','RightCenter','BottomCenter'];for(var i=0;i<8&&!res;i++){res=checkPoint('bounds',points[i]);}}res=filter(res);}if(!res){res=this._hitTestChildren(point,options,viewMatrix)||checkSelf&&filter(this._hitTestSelf(point,options,viewMatrix,this.getStrokeScaling()?null:viewMatrix._shiftless().invert()))||null;}if(res&&res.point){res.point=matrix.transform(res.point);}return res;},_hitTestSelf:function _hitTestSelf(point,options){if(options.fill&&this.hasFill()&&this._contains(point))return new HitResult('fill',this);},matches:function matches(name,compare){function matchObject(obj1,obj2){for(var i in obj1){if(obj1.hasOwnProperty(i)){var val1=obj1[i],val2=obj2[i];if(Base.isPlainObject(val1)&&Base.isPlainObject(val2)){if(!matchObject(val1,val2))return false;}else if(!Base.equals(val1,val2)){return false;}}}return true;}var type=typeof name==='undefined'?'undefined':(0,_typeof4.default)(name);if(type==='object'){for(var key in name){if(name.hasOwnProperty(key)&&!this.matches(key,name[key]))return false;}return true;}else if(type==='function'){return name(this);}else if(name==='match'){return compare(this);}else{var value=/^(empty|editable)$/.test(name)?this['is'+Base.capitalize(name)]():name==='type'?Base.hyphenate(this._class):this[name];if(name==='class'){if(typeof compare==='function')return this instanceof compare;value=this._class;}if(typeof compare==='function'){return!!compare(value);}else if(compare){if(compare.test){return compare.test(value);}else if(Base.isPlainObject(compare)){return matchObject(compare,value);}}return Base.equals(value,compare);}},getItems:function getItems(options){return Item._getItems(this,options,this._matrix);},getItem:function getItem(options){return Item._getItems(this,options,this._matrix,null,true)[0]||null;},statics:{_getItems:function _getItems(item,options,matrix,param,firstOnly){if(!param){var obj=(typeof options==='undefined'?'undefined':(0,_typeof4.default)(options))==='object'&&options,overlapping=obj&&obj.overlapping,inside=obj&&obj.inside,bounds=overlapping||inside,rect=bounds&&_Rectangle.read([bounds]);param={items:[],recursive:obj&&obj.recursive!==false,inside:!!inside,overlapping:!!overlapping,rect:rect,path:overlapping&&new Path.Rectangle({rectangle:rect,insert:false})};if(obj){options=Base.filter({},options,{recursive:true,inside:true,overlapping:true});}}var children=item._children,items=param.items,rect=param.rect;matrix=rect&&(matrix||new Matrix());for(var i=0,l=children&&children.length;i<l;i++){var child=children[i],childMatrix=matrix&&matrix.appended(child._matrix),add=true;if(rect){var bounds=child.getBounds(childMatrix);if(!rect.intersects(bounds))continue;if(!(rect.contains(bounds)||param.overlapping&&(bounds.contains(rect)||param.path.intersects(child,childMatrix))))add=false;}if(add&&child.matches(options)){items.push(child);if(firstOnly)break;}if(param.recursive!==false){_getItems(child,options,childMatrix,param,firstOnly);}if(firstOnly&&items.length>0)break;}return items;}}},{importJSON:function importJSON(json){var res=Base.importJSON(json,this);return res!==this?this.addChild(res):res;},addChild:function addChild(item){return this.insertChild(undefined,item);},insertChild:function insertChild(index,item){var res=item?this.insertChildren(index,[item]):null;return res&&res[0];},addChildren:function addChildren(items){return this.insertChildren(this._children.length,items);},insertChildren:function insertChildren(index,items){var children=this._children;if(children&&items&&items.length>0){items=Base.slice(items);var inserted={};for(var i=items.length-1;i>=0;i--){var item=items[i],id=item&&item._id;if(!item||inserted[id]){items.splice(i,1);}else{item._remove(false,true);inserted[id]=true;}}Base.splice(children,items,index,0);var project=this._project,notifySelf=project._changes;for(var i=0,l=items.length;i<l;i++){var item=items[i],name=item._name;item._parent=this;item._setProject(project,true);if(name)item.setName(name);if(notifySelf)item._changed(5);}this._changed(11);}else{items=null;}return items;},_insertItem:'#insertChild',_insertAt:function _insertAt(item,offset){var owner=item&&item._getOwner(),res=item!==this&&owner?this:null;if(res){res._remove(false,true);owner._insertItem(item._index+offset,res);}return res;},insertAbove:function insertAbove(item){return this._insertAt(item,1);},insertBelow:function insertBelow(item){return this._insertAt(item,0);},sendToBack:function sendToBack(){var owner=this._getOwner();return owner?owner._insertItem(0,this):null;},bringToFront:function bringToFront(){var owner=this._getOwner();return owner?owner._insertItem(undefined,this):null;},appendTop:'#addChild',appendBottom:function appendBottom(item){return this.insertChild(0,item);},moveAbove:'#insertAbove',moveBelow:'#insertBelow',addTo:function addTo(owner){return owner._insertItem(undefined,this);},copyTo:function copyTo(owner){return this.clone(false).addTo(owner);},reduce:function reduce(options){var children=this._children;if(children&&children.length===1){var child=children[0].reduce(options);if(this._parent){child.insertAbove(this);this.remove();}else{child.remove();}return child;}return this;},_removeNamed:function _removeNamed(){var owner=this._getOwner();if(owner){var children=owner._children,namedChildren=owner._namedChildren,name=this._name,namedArray=namedChildren[name],index=namedArray?namedArray.indexOf(this):-1;if(index!==-1){if(children[name]==this)delete children[name];namedArray.splice(index,1);if(namedArray.length){children[name]=namedArray[0];}else{delete namedChildren[name];}}}},_remove:function _remove(notifySelf,notifyParent){var owner=this._getOwner(),project=this._project,index=this._index;if(owner){if(this._name)this._removeNamed();if(index!=null){if(project._activeLayer===this)project._activeLayer=this.getNextSibling()||this.getPreviousSibling();Base.splice(owner._children,null,index,1);}this._installEvents(false);if(notifySelf&&project._changes)this._changed(5);if(notifyParent)owner._changed(11,this);this._parent=null;return true;}return false;},remove:function remove(){return this._remove(true,true);},replaceWith:function replaceWith(item){var ok=item&&item.insertBelow(this);if(ok)this.remove();return ok;},removeChildren:function removeChildren(start,end){if(!this._children)return null;start=start||0;end=Base.pick(end,this._children.length);var removed=Base.splice(this._children,null,start,end-start);for(var i=removed.length-1;i>=0;i--){removed[i]._remove(true,false);}if(removed.length>0)this._changed(11);return removed;},clear:'#removeChildren',reverseChildren:function reverseChildren(){if(this._children){this._children.reverse();for(var i=0,l=this._children.length;i<l;i++){this._children[i]._index=i;}this._changed(11);}},isEmpty:function isEmpty(){var children=this._children;return!children||!children.length;},isEditable:function isEditable(){var item=this;while(item){if(!item._visible||item._locked)return false;item=item._parent;}return true;},hasFill:function hasFill(){return this.getStyle().hasFill();},hasStroke:function hasStroke(){return this.getStyle().hasStroke();},hasShadow:function hasShadow(){return this.getStyle().hasShadow();},_getOrder:function _getOrder(item){function getList(item){var list=[];do{list.unshift(item);}while(item=item._parent);return list;}var list1=getList(this),list2=getList(item);for(var i=0,l=Math.min(list1.length,list2.length);i<l;i++){if(list1[i]!=list2[i]){return list1[i]._index<list2[i]._index?1:-1;}}return 0;},hasChildren:function hasChildren(){return this._children&&this._children.length>0;},isInserted:function isInserted(){return this._parent?this._parent.isInserted():false;},isAbove:function isAbove(item){return this._getOrder(item)===-1;},isBelow:function isBelow(item){return this._getOrder(item)===1;},isParent:function isParent(item){return this._parent===item;},isChild:function isChild(item){return item&&item._parent===this;},isDescendant:function isDescendant(item){var parent=this;while(parent=parent._parent){if(parent===item)return true;}return false;},isAncestor:function isAncestor(item){return item?item.isDescendant(this):false;},isSibling:function isSibling(item){return this._parent===item._parent;},isGroupedWith:function isGroupedWith(item){var parent=this._parent;while(parent){if(parent._parent&&/^(Group|Layer|CompoundPath)$/.test(parent._class)&&item.isDescendant(parent))return true;parent=parent._parent;}return false;}},Base.each(['rotate','scale','shear','skew'],function(key){var rotate=key==='rotate';this[key]=function(){var value=(rotate?Base:Point).read(arguments),center=Point.read(arguments,0,{readNull:true});return this.transform(new Matrix()[key](value,center||this.getPosition(true)));};},{translate:function translate(){var mx=new Matrix();return this.transform(mx.translate.apply(mx,arguments));},transform:function transform(matrix,_applyMatrix,_applyRecursively,_setApplyMatrix){var _matrix=this._matrix,transform=matrix&&!matrix.isIdentity(),applyMatrix=(_applyMatrix||this._applyMatrix)&&(!_matrix.isIdentity()||transform||_applyMatrix&&_applyRecursively&&this._children);if(!transform&&!applyMatrix)return this;if(transform){if(!matrix.isInvertible()&&_matrix.isInvertible())_matrix._backup=_matrix.getValues();_matrix.prepend(matrix,true);var style=this._style,fillColor=style.getFillColor(true),strokeColor=style.getStrokeColor(true);if(fillColor)fillColor.transform(matrix);if(strokeColor)strokeColor.transform(matrix);}if(applyMatrix&&(applyMatrix=this._transformContent(_matrix,_applyRecursively,_setApplyMatrix))){var pivot=this._pivot;if(pivot)_matrix._transformPoint(pivot,pivot,true);_matrix.reset(true);if(_setApplyMatrix&&this._canApplyMatrix)this._applyMatrix=true;}var bounds=this._bounds,position=this._position;if(transform||applyMatrix){this._changed(9);}var decomp=transform&&bounds&&matrix.decompose();if(decomp&&decomp.skewing.isZero()&&decomp.rotation%90===0){for(var key in bounds){var cache=bounds[key];if(cache.nonscaling){delete bounds[key];}else if(applyMatrix||!cache.internal){var rect=cache.rect;matrix._transformBounds(rect,rect);}}this._bounds=bounds;var cached=bounds[this._getBoundsCacheKey(this._boundsOptions||{})];if(cached){this._position=cached.rect.getCenter(true);}}else if(transform&&position&&this._pivot){this._position=matrix._transformPoint(position,position);}return this;},_transformContent:function _transformContent(matrix,applyRecursively,setApplyMatrix){var children=this._children;if(children){for(var i=0,l=children.length;i<l;i++){children[i].transform(matrix,true,applyRecursively,setApplyMatrix);}return true;}},globalToLocal:function globalToLocal(){return this.getGlobalMatrix(true)._inverseTransform(Point.read(arguments));},localToGlobal:function localToGlobal(){return this.getGlobalMatrix(true)._transformPoint(Point.read(arguments));},parentToLocal:function parentToLocal(){return this._matrix._inverseTransform(Point.read(arguments));},localToParent:function localToParent(){return this._matrix._transformPoint(Point.read(arguments));},fitBounds:function fitBounds(rectangle,fill){rectangle=_Rectangle.read(arguments);var bounds=this.getBounds(),itemRatio=bounds.height/bounds.width,rectRatio=rectangle.height/rectangle.width,scale=(fill?itemRatio>rectRatio:itemRatio<rectRatio)?rectangle.width/bounds.width:rectangle.height/bounds.height,newBounds=new _Rectangle(new Point(),new Size(bounds.width*scale,bounds.height*scale));newBounds.setCenter(rectangle.getCenter());this.setBounds(newBounds);}}),{_setStyles:function _setStyles(ctx,param,viewMatrix){var style=this._style,matrix=this._matrix;if(style.hasFill()){ctx.fillStyle=style.getFillColor().toCanvasStyle(ctx,matrix);}if(style.hasStroke()){ctx.strokeStyle=style.getStrokeColor().toCanvasStyle(ctx,matrix);ctx.lineWidth=style.getStrokeWidth();var strokeJoin=style.getStrokeJoin(),strokeCap=style.getStrokeCap(),miterLimit=style.getMiterLimit();if(strokeJoin)ctx.lineJoin=strokeJoin;if(strokeCap)ctx.lineCap=strokeCap;if(miterLimit)ctx.miterLimit=miterLimit;if(paper.support.nativeDash){var dashArray=style.getDashArray(),dashOffset=style.getDashOffset();if(dashArray&&dashArray.length){if('setLineDash'in ctx){ctx.setLineDash(dashArray);ctx.lineDashOffset=dashOffset;}else{ctx.mozDash=dashArray;ctx.mozDashOffset=dashOffset;}}}}if(style.hasShadow()){var pixelRatio=param.pixelRatio||1,mx=viewMatrix._shiftless().prepend(new Matrix().scale(pixelRatio,pixelRatio)),blur=mx.transform(new Point(style.getShadowBlur(),0)),offset=mx.transform(this.getShadowOffset());ctx.shadowColor=style.getShadowColor().toCanvasStyle(ctx);ctx.shadowBlur=blur.getLength();ctx.shadowOffsetX=offset.x;ctx.shadowOffsetY=offset.y;}},draw:function draw(ctx,param,parentStrokeMatrix){var updateVersion=this._updateVersion=this._project._updateVersion;if(!this._visible||this._opacity===0)return;var matrices=param.matrices,viewMatrix=param.viewMatrix,matrix=this._matrix,globalMatrix=matrices[matrices.length-1].appended(matrix);if(!globalMatrix.isInvertible())return;viewMatrix=viewMatrix?viewMatrix.appended(globalMatrix):globalMatrix;matrices.push(globalMatrix);if(param.updateMatrix){globalMatrix._updateVersion=updateVersion;this._globalMatrix=globalMatrix;}var blendMode=this._blendMode,opacity=this._opacity,normalBlend=blendMode==='normal',nativeBlend=BlendMode.nativeModes[blendMode],direct=normalBlend&&opacity===1||param.dontStart||param.clip||(nativeBlend||normalBlend&&opacity<1)&&this._canComposite(),pixelRatio=param.pixelRatio||1,mainCtx,itemOffset,prevOffset;if(!direct){var bounds=this.getStrokeBounds(viewMatrix);if(!bounds.width||!bounds.height)return;prevOffset=param.offset;itemOffset=param.offset=bounds.getTopLeft().floor();mainCtx=ctx;ctx=CanvasProvider.getContext(bounds.getSize().ceil().add(1).multiply(pixelRatio));if(pixelRatio!==1)ctx.scale(pixelRatio,pixelRatio);}ctx.save();var strokeMatrix=parentStrokeMatrix?parentStrokeMatrix.appended(matrix):this._canScaleStroke&&!this.getStrokeScaling(true)&&viewMatrix,clip=!direct&&param.clipItem,transform=!strokeMatrix||clip;if(direct){ctx.globalAlpha=opacity;if(nativeBlend)ctx.globalCompositeOperation=blendMode;}else if(transform){ctx.translate(-itemOffset.x,-itemOffset.y);}if(transform){(direct?matrix:viewMatrix).applyToContext(ctx);}if(clip){param.clipItem.draw(ctx,param.extend({clip:true}));}if(strokeMatrix){ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);var offset=param.offset;if(offset)ctx.translate(-offset.x,-offset.y);}this._draw(ctx,param,viewMatrix,strokeMatrix);ctx.restore();matrices.pop();if(param.clip&&!param.dontFinish)ctx.clip();if(!direct){BlendMode.process(blendMode,ctx,mainCtx,opacity,itemOffset.subtract(prevOffset).multiply(pixelRatio));CanvasProvider.release(ctx);param.offset=prevOffset;}},_isUpdated:function _isUpdated(updateVersion){var parent=this._parent;if(parent instanceof CompoundPath)return parent._isUpdated(updateVersion);var updated=this._updateVersion===updateVersion;if(!updated&&parent&&parent._visible&&parent._isUpdated(updateVersion)){this._updateVersion=updateVersion;updated=true;}return updated;},_drawSelection:function _drawSelection(ctx,matrix,size,selectionItems,updateVersion){var selection=this._selection,itemSelected=selection&1,boundsSelected=selection&2||itemSelected&&this._selectBounds,positionSelected=selection&4;if(!this._drawSelected)itemSelected=false;if((itemSelected||boundsSelected||positionSelected)&&this._isUpdated(updateVersion)){var layer,color=this.getSelectedColor(true)||(layer=this.getLayer())&&layer.getSelectedColor(true),mx=matrix.appended(this.getGlobalMatrix(true)),half=size/2;ctx.strokeStyle=ctx.fillStyle=color?color.toCanvasStyle(ctx):'#009dec';if(itemSelected)this._drawSelected(ctx,mx,selectionItems);if(positionSelected){var point=this.getPosition(true),x=point.x,y=point.y;ctx.beginPath();ctx.arc(x,y,half,0,Math.PI*2,true);ctx.stroke();var deltas=[[0,-1],[1,0],[0,1],[-1,0]],start=half,end=size+1;for(var i=0;i<4;i++){var delta=deltas[i],dx=delta[0],dy=delta[1];ctx.moveTo(x+dx*start,y+dy*start);ctx.lineTo(x+dx*end,y+dy*end);ctx.stroke();}}if(boundsSelected){var coords=mx._transformCorners(this.getInternalBounds());ctx.beginPath();for(var i=0;i<8;i++){ctx[!i?'moveTo':'lineTo'](coords[i],coords[++i]);}ctx.closePath();ctx.stroke();for(var i=0;i<8;i++){ctx.fillRect(coords[i]-half,coords[++i]-half,size,size);}}}},_canComposite:function _canComposite(){return false;}},Base.each(['down','drag','up','move'],function(key){this['removeOn'+Base.capitalize(key)]=function(){var hash={};hash[key]=true;return this.removeOn(hash);};},{removeOn:function removeOn(obj){for(var name in obj){if(obj[name]){var key='mouse'+name,project=this._project,sets=project._removeSets=project._removeSets||{};sets[key]=sets[key]||{};sets[key][this._id]=this;}}return this;}}));var Group=Item.extend({_class:'Group',_selectBounds:false,_selectChildren:true,_serializeFields:{children:[]},initialize:function Group(arg){this._children=[];this._namedChildren={};if(!this._initialize(arg))this.addChildren(Array.isArray(arg)?arg:arguments);},_changed:function _changed(flags){_changed.base.call(this,flags);if(flags&1026){this._clipItem=undefined;}},_getClipItem:function _getClipItem(){var clipItem=this._clipItem;if(clipItem===undefined){clipItem=null;var children=this._children;for(var i=0,l=children.length;i<l;i++){if(children[i]._clipMask){clipItem=children[i];break;}}this._clipItem=clipItem;}return clipItem;},isClipped:function isClipped(){return!!this._getClipItem();},setClipped:function setClipped(clipped){var child=this.getFirstChild();if(child)child.setClipMask(clipped);},_getBounds:function _getBounds(matrix,options){var clipItem=this._getClipItem();return clipItem?clipItem._getCachedBounds(matrix&&matrix.appended(clipItem._matrix),Base.set({},options,{stroke:false})):_getBounds.base.call(this,matrix,options);},_hitTestChildren:function _hitTestChildren(point,options,viewMatrix){var clipItem=this._getClipItem();return(!clipItem||clipItem.contains(point))&&_hitTestChildren.base.call(this,point,options,viewMatrix,clipItem);},_draw:function _draw(ctx,param){var clip=param.clip,clipItem=!clip&&this._getClipItem();param=param.extend({clipItem:clipItem,clip:false});if(clip){ctx.beginPath();param.dontStart=param.dontFinish=true;}else if(clipItem){clipItem.draw(ctx,param.extend({clip:true}));}var children=this._children;for(var i=0,l=children.length;i<l;i++){var item=children[i];if(item!==clipItem)item.draw(ctx,param);}}});var Layer=Group.extend({_class:'Layer',initialize:function Layer(){Group.apply(this,arguments);},_getOwner:function _getOwner(){return this._parent||this._index!=null&&this._project;},isInserted:function isInserted(){return this._parent?isInserted.base.call(this):this._index!=null;},activate:function activate(){this._project._activeLayer=this;},_hitTestSelf:function _hitTestSelf(){}});var Shape=Item.extend({_class:'Shape',_applyMatrix:false,_canApplyMatrix:false,_canScaleStroke:true,_serializeFields:{type:null,size:null,radius:null},initialize:function Shape(props,point){this._initialize(props,point);},_equals:function _equals(item){return this._type===item._type&&this._size.equals(item._size)&&Base.equals(this._radius,item._radius);},copyContent:function copyContent(source){this.setType(source._type);this.setSize(source._size);this.setRadius(source._radius);},getType:function getType(){return this._type;},setType:function setType(type){this._type=type;},getShape:'#getType',setShape:'#setType',getSize:function getSize(){var size=this._size;return new LinkedSize(size.width,size.height,this,'setSize');},setSize:function setSize(){var size=Size.read(arguments);if(!this._size){this._size=size.clone();}else if(!this._size.equals(size)){var type=this._type,width=size.width,height=size.height;if(type==='rectangle'){this._radius.set(Size.min(this._radius,size.divide(2)));}else if(type==='circle'){width=height=(width+height)/2;this._radius=width/2;}else if(type==='ellipse'){this._radius._set(width/2,height/2);}this._size._set(width,height);this._changed(9);}},getRadius:function getRadius(){var rad=this._radius;return this._type==='circle'?rad:new LinkedSize(rad.width,rad.height,this,'setRadius');},setRadius:function setRadius(radius){var type=this._type;if(type==='circle'){if(radius===this._radius)return;var size=radius*2;this._radius=radius;this._size._set(size,size);}else{radius=Size.read(arguments);if(!this._radius){this._radius=radius.clone();}else{if(this._radius.equals(radius))return;this._radius.set(radius);if(type==='rectangle'){var size=Size.max(this._size,radius.multiply(2));this._size.set(size);}else if(type==='ellipse'){this._size._set(radius.width*2,radius.height*2);}}}this._changed(9);},isEmpty:function isEmpty(){return false;},toPath:function toPath(insert){var path=new Path[Base.capitalize(this._type)]({center:new Point(),size:this._size,radius:this._radius,insert:false});path.copyAttributes(this);if(paper.settings.applyMatrix)path.setApplyMatrix(true);if(insert===undefined||insert)path.insertAbove(this);return path;},toShape:'#clone',_asPathItem:function _asPathItem(){return this.toPath(false);},_draw:function _draw(ctx,param,viewMatrix,strokeMatrix){var style=this._style,hasFill=style.hasFill(),hasStroke=style.hasStroke(),dontPaint=param.dontFinish||param.clip,untransformed=!strokeMatrix;if(hasFill||hasStroke||dontPaint){var type=this._type,radius=this._radius,isCircle=type==='circle';if(!param.dontStart)ctx.beginPath();if(untransformed&&isCircle){ctx.arc(0,0,radius,0,Math.PI*2,true);}else{var rx=isCircle?radius:radius.width,ry=isCircle?radius:radius.height,size=this._size,width=size.width,height=size.height;if(untransformed&&type==='rectangle'&&rx===0&&ry===0){ctx.rect(-width/2,-height/2,width,height);}else{var x=width/2,y=height/2,kappa=1-0.5522847498307936,cx=rx*kappa,cy=ry*kappa,c=[-x,-y+ry,-x,-y+cy,-x+cx,-y,-x+rx,-y,x-rx,-y,x-cx,-y,x,-y+cy,x,-y+ry,x,y-ry,x,y-cy,x-cx,y,x-rx,y,-x+rx,y,-x+cx,y,-x,y-cy,-x,y-ry];if(strokeMatrix)strokeMatrix.transform(c,c,32);ctx.moveTo(c[0],c[1]);ctx.bezierCurveTo(c[2],c[3],c[4],c[5],c[6],c[7]);if(x!==rx)ctx.lineTo(c[8],c[9]);ctx.bezierCurveTo(c[10],c[11],c[12],c[13],c[14],c[15]);if(y!==ry)ctx.lineTo(c[16],c[17]);ctx.bezierCurveTo(c[18],c[19],c[20],c[21],c[22],c[23]);if(x!==rx)ctx.lineTo(c[24],c[25]);ctx.bezierCurveTo(c[26],c[27],c[28],c[29],c[30],c[31]);}}ctx.closePath();}if(!dontPaint&&(hasFill||hasStroke)){this._setStyles(ctx,param,viewMatrix);if(hasFill){ctx.fill(style.getFillRule());ctx.shadowColor='rgba(0,0,0,0)';}if(hasStroke)ctx.stroke();}},_canComposite:function _canComposite(){return!(this.hasFill()&&this.hasStroke());},_getBounds:function _getBounds(matrix,options){var rect=new _Rectangle(this._size).setCenter(0,0),style=this._style,strokeWidth=options.stroke&&style.hasStroke()&&style.getStrokeWidth();if(matrix)rect=matrix._transformBounds(rect);return strokeWidth?rect.expand(Path._getStrokePadding(strokeWidth,this._getStrokeMatrix(matrix,options))):rect;}},new function(){function getCornerCenter(that,point,expand){var radius=that._radius;if(!radius.isZero()){var halfSize=that._size.divide(2);for(var q=1;q<=4;q++){var dir=new Point(q>1&&q<4?-1:1,q>2?-1:1),corner=dir.multiply(halfSize),center=corner.subtract(dir.multiply(radius)),rect=new _Rectangle(expand?corner.add(dir.multiply(expand)):corner,center);if(rect.contains(point))return{point:center,quadrant:q};}}}function isOnEllipseStroke(point,radius,padding,quadrant){var vector=point.divide(radius);return(!quadrant||vector.isInQuadrant(quadrant))&&vector.subtract(vector.normalize()).multiply(radius).divide(padding).length<=1;}return{_contains:function _contains(point){if(this._type==='rectangle'){var center=getCornerCenter(this,point);return center?point.subtract(center.point).divide(this._radius).getLength()<=1:_contains.base.call(this,point);}else{return point.divide(this.size).getLength()<=0.5;}},_hitTestSelf:function _hitTestSelf(point,options,viewMatrix,strokeMatrix){var hit=false,style=this._style,hitStroke=options.stroke&&style.hasStroke(),hitFill=options.fill&&style.hasFill();if(hitStroke||hitFill){var type=this._type,radius=this._radius,strokeRadius=hitStroke?style.getStrokeWidth()/2:0,strokePadding=options._tolerancePadding.add(Path._getStrokePadding(strokeRadius,!style.getStrokeScaling()&&strokeMatrix));if(type==='rectangle'){var padding=strokePadding.multiply(2),center=getCornerCenter(this,point,padding);if(center){hit=isOnEllipseStroke(point.subtract(center.point),radius,strokePadding,center.quadrant);}else{var rect=new _Rectangle(this._size).setCenter(0,0),outer=rect.expand(padding),inner=rect.expand(padding.negate());hit=outer._containsPoint(point)&&!inner._containsPoint(point);}}else{hit=isOnEllipseStroke(point,radius,strokePadding);}}return hit?new HitResult(hitStroke?'stroke':'fill',this):_hitTestSelf.base.apply(this,arguments);}};}(),{statics:new function(){function createShape(type,point,size,radius,args){var item=new Shape(Base.getNamed(args),point);item._type=type;item._size=size;item._radius=radius;return item;}return{Circle:function Circle(){var center=Point.readNamed(arguments,'center'),radius=Base.readNamed(arguments,'radius');return createShape('circle',center,new Size(radius*2),radius,arguments);},Rectangle:function Rectangle(){var rect=_Rectangle.readNamed(arguments,'rectangle'),radius=Size.min(Size.readNamed(arguments,'radius'),rect.getSize(true).divide(2));return createShape('rectangle',rect.getCenter(true),rect.getSize(true),radius,arguments);},Ellipse:function Ellipse(){var ellipse=Shape._readEllipse(arguments),radius=ellipse.radius;return createShape('ellipse',ellipse.center,radius.multiply(2),radius,arguments);},_readEllipse:function _readEllipse(args){var center,radius;if(Base.hasNamed(args,'radius')){center=Point.readNamed(args,'center');radius=Size.readNamed(args,'radius');}else{var rect=_Rectangle.readNamed(args,'rectangle');center=rect.getCenter(true);radius=rect.getSize(true).divide(2);}return{center:center,radius:radius};}};}()});var Raster=Item.extend({_class:'Raster',_applyMatrix:false,_canApplyMatrix:false,_boundsOptions:{stroke:false,handle:false},_serializeFields:{crossOrigin:null,source:null},_prioritize:['crossOrigin'],initialize:function Raster(object,position){if(!this._initialize(object,position!==undefined&&Point.read(arguments,1))){var image=typeof object==='string'?document.getElementById(object):object;if(image){this.setImage(image);}else{this.setSource(object);}}if(!this._size){this._size=new Size();this._loaded=false;}},_equals:function _equals(item){return this.getSource()===item.getSource();},copyContent:function copyContent(source){var image=source._image,canvas=source._canvas;if(image){this._setImage(image);}else if(canvas){var copyCanvas=CanvasProvider.getCanvas(source._size);copyCanvas.getContext('2d').drawImage(canvas,0,0);this._setImage(copyCanvas);}this._crossOrigin=source._crossOrigin;},getSize:function getSize(){var size=this._size;return new LinkedSize(size?size.width:0,size?size.height:0,this,'setSize');},setSize:function setSize(){var size=Size.read(arguments);if(!size.equals(this._size)){if(size.width>0&&size.height>0){var element=this.getElement();this._setImage(CanvasProvider.getCanvas(size));if(element)this.getContext(true).drawImage(element,0,0,size.width,size.height);}else{if(this._canvas)CanvasProvider.release(this._canvas);this._size=size.clone();}}},getWidth:function getWidth(){return this._size?this._size.width:0;},setWidth:function setWidth(width){this.setSize(width,this.getHeight());},getHeight:function getHeight(){return this._size?this._size.height:0;},setHeight:function setHeight(height){this.setSize(this.getWidth(),height);},getLoaded:function getLoaded(){return this._loaded;},isEmpty:function isEmpty(){var size=this._size;return!size||size.width===0&&size.height===0;},getResolution:function getResolution(){var matrix=this._matrix,orig=new Point(0,0).transform(matrix),u=new Point(1,0).transform(matrix).subtract(orig),v=new Point(0,1).transform(matrix).subtract(orig);return new Size(72/u.getLength(),72/v.getLength());},getPpi:'#getResolution',getImage:function getImage(){return this._image;},setImage:function setImage(image){var that=this;function emit(event){var view=that.getView(),type=event&&event.type||'load';if(view&&that.responds(type)){paper=view._scope;that.emit(type,new Event(event));}}this._setImage(image);if(this._loaded){setTimeout(emit,0);}else if(image){DomEvent.add(image,{load:function load(event){that._setImage(image);emit(event);},error:emit});}},_setImage:function _setImage(image){if(this._canvas)CanvasProvider.release(this._canvas);if(image&&image.getContext){this._image=null;this._canvas=image;this._loaded=true;}else{this._image=image;this._canvas=null;this._loaded=!!(image&&image.src&&image.complete);}this._size=new Size(image?image.naturalWidth||image.width:0,image?image.naturalHeight||image.height:0);this._context=null;this._changed(521);},getCanvas:function getCanvas(){if(!this._canvas){var ctx=CanvasProvider.getContext(this._size);try{if(this._image)ctx.drawImage(this._image,0,0);this._canvas=ctx.canvas;}catch(e){CanvasProvider.release(ctx);}}return this._canvas;},setCanvas:'#setImage',getContext:function getContext(modify){if(!this._context)this._context=this.getCanvas().getContext('2d');if(modify){this._image=null;this._changed(513);}return this._context;},setContext:function setContext(context){this._context=context;},getSource:function getSource(){var image=this._image;return image&&image.src||this.toDataURL();},setSource:function setSource(src){var image=new self.Image(),crossOrigin=this._crossOrigin;if(crossOrigin)image.crossOrigin=crossOrigin;image.src=src;this.setImage(image);},getCrossOrigin:function getCrossOrigin(){var image=this._image;return image&&image.crossOrigin||this._crossOrigin||'';},setCrossOrigin:function setCrossOrigin(crossOrigin){this._crossOrigin=crossOrigin;var image=this._image;if(image)image.crossOrigin=crossOrigin;},getElement:function getElement(){return this._canvas||this._loaded&&this._image;}},{beans:false,getSubCanvas:function getSubCanvas(){var rect=_Rectangle.read(arguments),ctx=CanvasProvider.getContext(rect.getSize());ctx.drawImage(this.getCanvas(),rect.x,rect.y,rect.width,rect.height,0,0,rect.width,rect.height);return ctx.canvas;},getSubRaster:function getSubRaster(){var rect=_Rectangle.read(arguments),raster=new Raster(Item.NO_INSERT);raster._setImage(this.getSubCanvas(rect));raster.translate(rect.getCenter().subtract(this.getSize().divide(2)));raster._matrix.prepend(this._matrix);raster.insertAbove(this);return raster;},toDataURL:function toDataURL(){var image=this._image,src=image&&image.src;if(/^data:/.test(src))return src;var canvas=this.getCanvas();return canvas?canvas.toDataURL.apply(canvas,arguments):null;},drawImage:function drawImage(image){var point=Point.read(arguments,1);this.getContext(true).drawImage(image,point.x,point.y);},getAverageColor:function getAverageColor(object){var bounds,path;if(!object){bounds=this.getBounds();}else if(object instanceof PathItem){path=object;bounds=object.getBounds();}else if((typeof object==='undefined'?'undefined':(0,_typeof4.default)(object))==='object'){if('width'in object){bounds=new _Rectangle(object);}else if('x'in object){bounds=new _Rectangle(object.x-0.5,object.y-0.5,1,1);}}if(!bounds)return null;var sampleSize=32,width=Math.min(bounds.width,sampleSize),height=Math.min(bounds.height,sampleSize);var ctx=Raster._sampleContext;if(!ctx){ctx=Raster._sampleContext=CanvasProvider.getContext(new Size(sampleSize));}else{ctx.clearRect(0,0,sampleSize+1,sampleSize+1);}ctx.save();var matrix=new Matrix().scale(width/bounds.width,height/bounds.height).translate(-bounds.x,-bounds.y);matrix.applyToContext(ctx);if(path)path.draw(ctx,new Base({clip:true,matrices:[matrix]}));this._matrix.applyToContext(ctx);var element=this.getElement(),size=this._size;if(element)ctx.drawImage(element,-size.width/2,-size.height/2);ctx.restore();var pixels=ctx.getImageData(0.5,0.5,Math.ceil(width),Math.ceil(height)).data,channels=[0,0,0],total=0;for(var i=0,l=pixels.length;i<l;i+=4){var alpha=pixels[i+3];total+=alpha;alpha/=255;channels[0]+=pixels[i]*alpha;channels[1]+=pixels[i+1]*alpha;channels[2]+=pixels[i+2]*alpha;}for(var i=0;i<3;i++){channels[i]/=total;}return total?Color.read(channels):null;},getPixel:function getPixel(){var point=Point.read(arguments);var data=this.getContext().getImageData(point.x,point.y,1,1).data;return new Color('rgb',[data[0]/255,data[1]/255,data[2]/255],data[3]/255);},setPixel:function setPixel(){var point=Point.read(arguments),color=Color.read(arguments),components=color._convert('rgb'),alpha=color._alpha,ctx=this.getContext(true),imageData=ctx.createImageData(1,1),data=imageData.data;data[0]=components[0]*255;data[1]=components[1]*255;data[2]=components[2]*255;data[3]=alpha!=null?alpha*255:255;ctx.putImageData(imageData,point.x,point.y);},createImageData:function createImageData(){var size=Size.read(arguments);return this.getContext().createImageData(size.width,size.height);},getImageData:function getImageData(){var rect=_Rectangle.read(arguments);if(rect.isEmpty())rect=new _Rectangle(this._size);return this.getContext().getImageData(rect.x,rect.y,rect.width,rect.height);},setImageData:function setImageData(data){var point=Point.read(arguments,1);this.getContext(true).putImageData(data,point.x,point.y);},_getBounds:function _getBounds(matrix,options){var rect=new _Rectangle(this._size).setCenter(0,0);return matrix?matrix._transformBounds(rect):rect;},_hitTestSelf:function _hitTestSelf(point){if(this._contains(point)){var that=this;return new HitResult('pixel',that,{offset:point.add(that._size.divide(2)).round(),color:{get:function get(){return that.getPixel(this.offset);}}});}},_draw:function _draw(ctx){var element=this.getElement();if(element){ctx.globalAlpha=this._opacity;ctx.drawImage(element,-this._size.width/2,-this._size.height/2);}},_canComposite:function _canComposite(){return true;}});var SymbolItem=Item.extend({_class:'SymbolItem',_applyMatrix:false,_canApplyMatrix:false,_boundsOptions:{stroke:true},_serializeFields:{symbol:null},initialize:function SymbolItem(arg0,arg1){if(!this._initialize(arg0,arg1!==undefined&&Point.read(arguments,1)))this.setDefinition(arg0 instanceof SymbolDefinition?arg0:new SymbolDefinition(arg0));},_equals:function _equals(item){return this._definition===item._definition;},copyContent:function copyContent(source){this.setDefinition(source._definition);},getDefinition:function getDefinition(){return this._definition;},setDefinition:function setDefinition(definition){this._definition=definition;this._changed(9);},getSymbol:'#getDefinition',setSymbol:'#setDefinition',isEmpty:function isEmpty(){return this._definition._item.isEmpty();},_getBounds:function _getBounds(matrix,options){var item=this._definition._item;return item._getCachedBounds(item._matrix.prepended(matrix),options);},_hitTestSelf:function _hitTestSelf(point,options,viewMatrix){var res=this._definition._item._hitTest(point,options,viewMatrix);if(res)res.item=this;return res;},_draw:function _draw(ctx,param){this._definition._item.draw(ctx,param);}});var SymbolDefinition=Base.extend({_class:'SymbolDefinition',initialize:function SymbolDefinition(item,dontCenter){this._id=UID.get();this.project=paper.project;if(item)this.setItem(item,dontCenter);},_serialize:function _serialize(options,dictionary){return dictionary.add(this,function(){return Base.serialize([this._class,this._item],options,false,dictionary);});},_changed:function _changed(flags){if(flags&8)Item._clearBoundsCache(this);if(flags&1)this.project._changed(flags);},getItem:function getItem(){return this._item;},setItem:function setItem(item,_dontCenter){if(item._symbol)item=item.clone();if(this._item)this._item._symbol=null;this._item=item;item.remove();item.setSelected(false);if(!_dontCenter)item.setPosition(new Point());item._symbol=this;this._changed(9);},getDefinition:'#getItem',setDefinition:'#setItem',place:function place(position){return new SymbolItem(this,position);},clone:function clone(){return new SymbolDefinition(this._item.clone(false));},equals:function equals(symbol){return symbol===this||symbol&&this._item.equals(symbol._item)||false;}});var HitResult=Base.extend({_class:'HitResult',initialize:function HitResult(type,item,values){this.type=type;this.item=item;if(values)this.inject(values);},statics:{getOptions:function getOptions(args){var options=args&&Base.read(args);return Base.set({type:null,tolerance:paper.settings.hitTolerance,fill:!options,stroke:!options,segments:!options,handles:false,ends:false,position:false,center:false,bounds:false,guides:false,selected:false},options);}}});var Segment=Base.extend({_class:'Segment',beans:true,_selection:0,initialize:function Segment(arg0,arg1,arg2,arg3,arg4,arg5){var count=arguments.length,point,handleIn,handleOut,selection;if(count>0){if(arg0==null||(typeof arg0==='undefined'?'undefined':(0,_typeof4.default)(arg0))==='object'){if(count===1&&arg0&&'point'in arg0){point=arg0.point;handleIn=arg0.handleIn;handleOut=arg0.handleOut;selection=arg0.selection;}else{point=arg0;handleIn=arg1;handleOut=arg2;selection=arg3;}}else{point=[arg0,arg1];handleIn=arg2!==undefined?[arg2,arg3]:null;handleOut=arg4!==undefined?[arg4,arg5]:null;}}new SegmentPoint(point,this,'_point');new SegmentPoint(handleIn,this,'_handleIn');new SegmentPoint(handleOut,this,'_handleOut');if(selection)this.setSelection(selection);},_serialize:function _serialize(options,dictionary){var point=this._point,selection=this._selection,obj=selection||this.hasHandles()?[point,this._handleIn,this._handleOut]:point;if(selection)obj.push(selection);return Base.serialize(obj,options,true,dictionary);},_changed:function _changed(point){var path=this._path;if(!path)return;var curves=path._curves,index=this._index,curve;if(curves){if((!point||point===this._point||point===this._handleIn)&&(curve=index>0?curves[index-1]:path._closed?curves[curves.length-1]:null))curve._changed();if((!point||point===this._point||point===this._handleOut)&&(curve=curves[index]))curve._changed();}path._changed(25);},getPoint:function getPoint(){return this._point;},setPoint:function setPoint(){this._point.set(Point.read(arguments));},getHandleIn:function getHandleIn(){return this._handleIn;},setHandleIn:function setHandleIn(){this._handleIn.set(Point.read(arguments));},getHandleOut:function getHandleOut(){return this._handleOut;},setHandleOut:function setHandleOut(){this._handleOut.set(Point.read(arguments));},hasHandles:function hasHandles(){return!this._handleIn.isZero()||!this._handleOut.isZero();},isSmooth:function isSmooth(){var handleIn=this._handleIn,handleOut=this._handleOut;return!handleIn.isZero()&&!handleOut.isZero()&&handleIn.isCollinear(handleOut);},clearHandles:function clearHandles(){this._handleIn._set(0,0);this._handleOut._set(0,0);},getSelection:function getSelection(){return this._selection;},setSelection:function setSelection(selection){var oldSelection=this._selection,path=this._path;this._selection=selection=selection||0;if(path&&selection!==oldSelection){path._updateSelection(this,oldSelection,selection);path._changed(129);}},_changeSelection:function _changeSelection(flag,selected){var selection=this._selection;this.setSelection(selected?selection|flag:selection&~flag);},isSelected:function isSelected(){return!!(this._selection&7);},setSelected:function setSelected(selected){this._changeSelection(7,selected);},getIndex:function getIndex(){return this._index!==undefined?this._index:null;},getPath:function getPath(){return this._path||null;},getCurve:function getCurve(){var path=this._path,index=this._index;if(path){if(index>0&&!path._closed&&index===path._segments.length-1)index--;return path.getCurves()[index]||null;}return null;},getLocation:function getLocation(){var curve=this.getCurve();return curve?new CurveLocation(curve,this===curve._segment1?0:1):null;},getNext:function getNext(){var segments=this._path&&this._path._segments;return segments&&(segments[this._index+1]||this._path._closed&&segments[0])||null;},smooth:function smooth(options,_first,_last){var opts=options||{},type=opts.type,factor=opts.factor,prev=this.getPrevious(),next=this.getNext(),p0=(prev||this)._point,p1=this._point,p2=(next||this)._point,d1=p0.getDistance(p1),d2=p1.getDistance(p2);if(!type||type==='catmull-rom'){var a=factor===undefined?0.5:factor,d1_a=Math.pow(d1,a),d1_2a=d1_a*d1_a,d2_a=Math.pow(d2,a),d2_2a=d2_a*d2_a;if(!_first&&prev){var A=2*d2_2a+3*d2_a*d1_a+d1_2a,N=3*d2_a*(d2_a+d1_a);this.setHandleIn(N!==0?new Point((d2_2a*p0._x+A*p1._x-d1_2a*p2._x)/N-p1._x,(d2_2a*p0._y+A*p1._y-d1_2a*p2._y)/N-p1._y):new Point());}if(!_last&&next){var A=2*d1_2a+3*d1_a*d2_a+d2_2a,N=3*d1_a*(d1_a+d2_a);this.setHandleOut(N!==0?new Point((d1_2a*p2._x+A*p1._x-d2_2a*p0._x)/N-p1._x,(d1_2a*p2._y+A*p1._y-d2_2a*p0._y)/N-p1._y):new Point());}}else if(type==='geometric'){if(prev&&next){var vector=p0.subtract(p2),t=factor===undefined?0.4:factor,k=t*d1/(d1+d2);if(!_first)this.setHandleIn(vector.multiply(k));if(!_last)this.setHandleOut(vector.multiply(k-t));}}else{throw new Error('Smoothing method \''+type+'\' not supported.');}},getPrevious:function getPrevious(){var segments=this._path&&this._path._segments;return segments&&(segments[this._index-1]||this._path._closed&&segments[segments.length-1])||null;},isFirst:function isFirst(){return!this._index;},isLast:function isLast(){var path=this._path;return path&&this._index===path._segments.length-1||false;},reverse:function reverse(){var handleIn=this._handleIn,handleOut=this._handleOut,tmp=handleIn.clone();handleIn.set(handleOut);handleOut.set(tmp);},reversed:function reversed(){return new Segment(this._point,this._handleOut,this._handleIn);},remove:function remove(){return this._path?!!this._path.removeSegment(this._index):false;},clone:function clone(){return new Segment(this._point,this._handleIn,this._handleOut);},equals:function equals(segment){return segment===this||segment&&this._class===segment._class&&this._point.equals(segment._point)&&this._handleIn.equals(segment._handleIn)&&this._handleOut.equals(segment._handleOut)||false;},toString:function toString(){var parts=['point: '+this._point];if(!this._handleIn.isZero())parts.push('handleIn: '+this._handleIn);if(!this._handleOut.isZero())parts.push('handleOut: '+this._handleOut);return'{ '+parts.join(', ')+' }';},transform:function transform(matrix){this._transformCoordinates(matrix,new Array(6),true);this._changed();},interpolate:function interpolate(from,to,factor){var u=1-factor,v=factor,point1=from._point,point2=to._point,handleIn1=from._handleIn,handleIn2=to._handleIn,handleOut2=to._handleOut,handleOut1=from._handleOut;this._point._set(u*point1._x+v*point2._x,u*point1._y+v*point2._y,true);this._handleIn._set(u*handleIn1._x+v*handleIn2._x,u*handleIn1._y+v*handleIn2._y,true);this._handleOut._set(u*handleOut1._x+v*handleOut2._x,u*handleOut1._y+v*handleOut2._y,true);this._changed();},_transformCoordinates:function _transformCoordinates(matrix,coords,change){var point=this._point,handleIn=!change||!this._handleIn.isZero()?this._handleIn:null,handleOut=!change||!this._handleOut.isZero()?this._handleOut:null,x=point._x,y=point._y,i=2;coords[0]=x;coords[1]=y;if(handleIn){coords[i++]=handleIn._x+x;coords[i++]=handleIn._y+y;}if(handleOut){coords[i++]=handleOut._x+x;coords[i++]=handleOut._y+y;}if(matrix){matrix._transformCoordinates(coords,coords,i/2);x=coords[0];y=coords[1];if(change){point._x=x;point._y=y;i=2;if(handleIn){handleIn._x=coords[i++]-x;handleIn._y=coords[i++]-y;}if(handleOut){handleOut._x=coords[i++]-x;handleOut._y=coords[i++]-y;}}else{if(!handleIn){coords[i++]=x;coords[i++]=y;}if(!handleOut){coords[i++]=x;coords[i++]=y;}}}return coords;}});var SegmentPoint=Point.extend({initialize:function SegmentPoint(point,owner,key){var x,y,selected;if(!point){x=y=0;}else if((x=point[0])!==undefined){y=point[1];}else{var pt=point;if((x=pt.x)===undefined){pt=Point.read(arguments);x=pt.x;}y=pt.y;selected=pt.selected;}this._x=x;this._y=y;this._owner=owner;owner[key]=this;if(selected)this.setSelected(true);},_set:function _set(x,y){this._x=x;this._y=y;this._owner._changed(this);return this;},getX:function getX(){return this._x;},setX:function setX(x){this._x=x;this._owner._changed(this);},getY:function getY(){return this._y;},setY:function setY(y){this._y=y;this._owner._changed(this);},isZero:function isZero(){var isZero=Numerical.isZero;return isZero(this._x)&&isZero(this._y);},isSelected:function isSelected(){return!!(this._owner._selection&this._getSelection());},setSelected:function setSelected(selected){this._owner._changeSelection(this._getSelection(),selected);},_getSelection:function _getSelection(){var owner=this._owner;return this===owner._point?1:this===owner._handleIn?2:this===owner._handleOut?4:0;}});var Curve=Base.extend({_class:'Curve',beans:true,initialize:function Curve(arg0,arg1,arg2,arg3,arg4,arg5,arg6,arg7){var count=arguments.length,seg1,seg2,point1,point2,handle1,handle2;if(count===3){this._path=arg0;seg1=arg1;seg2=arg2;}else if(!count){seg1=new Segment();seg2=new Segment();}else if(count===1){if('segment1'in arg0){seg1=new Segment(arg0.segment1);seg2=new Segment(arg0.segment2);}else if('point1'in arg0){point1=arg0.point1;handle1=arg0.handle1;handle2=arg0.handle2;point2=arg0.point2;}else if(Array.isArray(arg0)){point1=[arg0[0],arg0[1]];point2=[arg0[6],arg0[7]];handle1=[arg0[2]-arg0[0],arg0[3]-arg0[1]];handle2=[arg0[4]-arg0[6],arg0[5]-arg0[7]];}}else if(count===2){seg1=new Segment(arg0);seg2=new Segment(arg1);}else if(count===4){point1=arg0;handle1=arg1;handle2=arg2;point2=arg3;}else if(count===8){point1=[arg0,arg1];point2=[arg6,arg7];handle1=[arg2-arg0,arg3-arg1];handle2=[arg4-arg6,arg5-arg7];}this._segment1=seg1||new Segment(point1,null,handle1);this._segment2=seg2||new Segment(point2,handle2,null);},_serialize:function _serialize(options,dictionary){return Base.serialize(this.hasHandles()?[this.getPoint1(),this.getHandle1(),this.getHandle2(),this.getPoint2()]:[this.getPoint1(),this.getPoint2()],options,true,dictionary);},_changed:function _changed(){this._length=this._bounds=undefined;},clone:function clone(){return new Curve(this._segment1,this._segment2);},toString:function toString(){var parts=['point1: '+this._segment1._point];if(!this._segment1._handleOut.isZero())parts.push('handle1: '+this._segment1._handleOut);if(!this._segment2._handleIn.isZero())parts.push('handle2: '+this._segment2._handleIn);parts.push('point2: '+this._segment2._point);return'{ '+parts.join(', ')+' }';},classify:function classify(){return Curve.classify(this.getValues());},remove:function remove(){var removed=false;if(this._path){var segment2=this._segment2,handleOut=segment2._handleOut;removed=segment2.remove();if(removed)this._segment1._handleOut.set(handleOut);}return removed;},getPoint1:function getPoint1(){return this._segment1._point;},setPoint1:function setPoint1(){this._segment1._point.set(Point.read(arguments));},getPoint2:function getPoint2(){return this._segment2._point;},setPoint2:function setPoint2(){this._segment2._point.set(Point.read(arguments));},getHandle1:function getHandle1(){return this._segment1._handleOut;},setHandle1:function setHandle1(){this._segment1._handleOut.set(Point.read(arguments));},getHandle2:function getHandle2(){return this._segment2._handleIn;},setHandle2:function setHandle2(){this._segment2._handleIn.set(Point.read(arguments));},getSegment1:function getSegment1(){return this._segment1;},getSegment2:function getSegment2(){return this._segment2;},getPath:function getPath(){return this._path;},getIndex:function getIndex(){return this._segment1._index;},getNext:function getNext(){var curves=this._path&&this._path._curves;return curves&&(curves[this._segment1._index+1]||this._path._closed&&curves[0])||null;},getPrevious:function getPrevious(){var curves=this._path&&this._path._curves;return curves&&(curves[this._segment1._index-1]||this._path._closed&&curves[curves.length-1])||null;},isFirst:function isFirst(){return!this._segment1._index;},isLast:function isLast(){var path=this._path;return path&&this._segment1._index===path._curves.length-1||false;},isSelected:function isSelected(){return this.getPoint1().isSelected()&&this.getHandle2().isSelected()&&this.getHandle2().isSelected()&&this.getPoint2().isSelected();},setSelected:function setSelected(selected){this.getPoint1().setSelected(selected);this.getHandle1().setSelected(selected);this.getHandle2().setSelected(selected);this.getPoint2().setSelected(selected);},getValues:function getValues(matrix){return Curve.getValues(this._segment1,this._segment2,matrix);},getPoints:function getPoints(){var coords=this.getValues(),points=[];for(var i=0;i<8;i+=2){points.push(new Point(coords[i],coords[i+1]));}return points;}},{getLength:function getLength(){if(this._length==null)this._length=Curve.getLength(this.getValues(),0,1);return this._length;},getArea:function getArea(){return Curve.getArea(this.getValues());},getLine:function getLine(){return new Line(this._segment1._point,this._segment2._point);},getPart:function getPart(from,to){return new Curve(Curve.getPart(this.getValues(),from,to));},getPartLength:function getPartLength(from,to){return Curve.getLength(this.getValues(),from,to);},divideAt:function divideAt(location){return this.divideAtTime(location&&location.curve===this?location.time:this.getTimeAt(location));},divideAtTime:function divideAtTime(time,_setHandles){var tMin=1e-8,tMax=1-tMin,res=null;if(time>=tMin&&time<=tMax){var parts=Curve.subdivide(this.getValues(),time),left=parts[0],right=parts[1],setHandles=_setHandles||this.hasHandles(),seg1=this._segment1,seg2=this._segment2,path=this._path;if(setHandles){seg1._handleOut._set(left[2]-left[0],left[3]-left[1]);seg2._handleIn._set(right[4]-right[6],right[5]-right[7]);}var x=left[6],y=left[7],segment=new Segment(new Point(x,y),setHandles&&new Point(left[4]-x,left[5]-y),setHandles&&new Point(right[2]-x,right[3]-y));if(path){path.insert(seg1._index+1,segment);res=this.getNext();}else{this._segment2=segment;this._changed();res=new Curve(segment,seg2);}}return res;},splitAt:function splitAt(location){var path=this._path;return path?path.splitAt(location):null;},splitAtTime:function splitAtTime(time){return this.splitAt(this.getLocationAtTime(time));},divide:function divide(offset,isTime){return this.divideAtTime(offset===undefined?0.5:isTime?offset:this.getTimeAt(offset));},split:function split(offset,isTime){return this.splitAtTime(offset===undefined?0.5:isTime?offset:this.getTimeAt(offset));},reversed:function reversed(){return new Curve(this._segment2.reversed(),this._segment1.reversed());},clearHandles:function clearHandles(){this._segment1._handleOut._set(0,0);this._segment2._handleIn._set(0,0);},statics:{getValues:function getValues(segment1,segment2,matrix,straight){var p1=segment1._point,h1=segment1._handleOut,h2=segment2._handleIn,p2=segment2._point,x1=p1.x,y1=p1.y,x2=p2.x,y2=p2.y,values=straight?[x1,y1,x1,y1,x2,y2,x2,y2]:[x1,y1,x1+h1._x,y1+h1._y,x2+h2._x,y2+h2._y,x2,y2];if(matrix)matrix._transformCoordinates(values,values,4);return values;},subdivide:function subdivide(v,t){var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7];if(t===undefined)t=0.5;var u=1-t,x4=u*x0+t*x1,y4=u*y0+t*y1,x5=u*x1+t*x2,y5=u*y1+t*y2,x6=u*x2+t*x3,y6=u*y2+t*y3,x7=u*x4+t*x5,y7=u*y4+t*y5,x8=u*x5+t*x6,y8=u*y5+t*y6,x9=u*x7+t*x8,y9=u*y7+t*y8;return[[x0,y0,x4,y4,x7,y7,x9,y9],[x9,y9,x8,y8,x6,y6,x3,y3]];},getMonoCurves:function getMonoCurves(v,dir){var curves=[],io=dir?0:1,o0=v[io+0],o1=v[io+2],o2=v[io+4],o3=v[io+6];if(o0>=o1===o1>=o2&&o1>=o2===o2>=o3||Curve.isStraight(v)){curves.push(v);}else{var a=3*(o1-o2)-o0+o3,b=2*(o0+o2)-4*o1,c=o1-o0,tMin=1e-8,tMax=1-tMin,roots=[],n=Numerical.solveQuadratic(a,b,c,roots,tMin,tMax);if(!n){curves.push(v);}else{roots.sort();var t=roots[0],parts=Curve.subdivide(v,t);curves.push(parts[0]);if(n>1){t=(roots[1]-t)/(1-t);parts=Curve.subdivide(parts[1],t);curves.push(parts[0]);}curves.push(parts[1]);}}return curves;},solveCubic:function solveCubic(v,coord,val,roots,min,max){var v0=v[coord],v1=v[coord+2],v2=v[coord+4],v3=v[coord+6],res=0;if(!(v0<val&&v3<val&&v1<val&&v2<val||v0>val&&v3>val&&v1>val&&v2>val)){var c=3*(v1-v0),b=3*(v2-v1)-c,a=v3-v0-c-b;res=Numerical.solveCubic(a,b,c,v0-val,roots,min,max);}return res;},getTimeOf:function getTimeOf(v,point){var p0=new Point(v[0],v[1]),p3=new Point(v[6],v[7]),epsilon=1e-12,geomEpsilon=1e-7,t=point.isClose(p0,epsilon)?0:point.isClose(p3,epsilon)?1:null;if(t===null){var coords=[point.x,point.y],roots=[];for(var c=0;c<2;c++){var count=Curve.solveCubic(v,c,coords[c],roots,0,1);for(var i=0;i<count;i++){var u=roots[i];if(point.isClose(Curve.getPoint(v,u),geomEpsilon))return u;}}}return point.isClose(p0,geomEpsilon)?0:point.isClose(p3,geomEpsilon)?1:null;},getNearestTime:function getNearestTime(v,point){if(Curve.isStraight(v)){var x0=v[0],y0=v[1],x3=v[6],y3=v[7],vx=x3-x0,vy=y3-y0,det=vx*vx+vy*vy;if(det===0)return 0;var u=((point.x-x0)*vx+(point.y-y0)*vy)/det;return u<1e-12?0:u>0.999999999999?1:Curve.getTimeOf(v,new Point(x0+u*vx,y0+u*vy));}var count=100,minDist=Infinity,minT=0;function refine(t){if(t>=0&&t<=1){var dist=point.getDistance(Curve.getPoint(v,t),true);if(dist<minDist){minDist=dist;minT=t;return true;}}}for(var i=0;i<=count;i++){refine(i/count);}var step=1/(count*2);while(step>1e-8){if(!refine(minT-step)&&!refine(minT+step))step/=2;}return minT;},getPart:function getPart(v,from,to){var flip=from>to;if(flip){var tmp=from;from=to;to=tmp;}if(from>0)v=Curve.subdivide(v,from)[1];if(to<1)v=Curve.subdivide(v,(to-from)/(1-from))[0];return flip?[v[6],v[7],v[4],v[5],v[2],v[3],v[0],v[1]]:v;},isFlatEnough:function isFlatEnough(v,flatness){var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7],ux=3*x1-2*x0-x3,uy=3*y1-2*y0-y3,vx=3*x2-2*x3-x0,vy=3*y2-2*y3-y0;return Math.max(ux*ux,vx*vx)+Math.max(uy*uy,vy*vy)<=16*flatness*flatness;},getArea:function getArea(v){var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7];return 3*((y3-y0)*(x1+x2)-(x3-x0)*(y1+y2)+y1*(x0-x2)-x1*(y0-y2)+y3*(x2+x0/3)-x3*(y2+y0/3))/20;},getBounds:function getBounds(v){var min=v.slice(0,2),max=min.slice(),roots=[0,0];for(var i=0;i<2;i++){Curve._addBounds(v[i],v[i+2],v[i+4],v[i+6],i,0,min,max,roots);}return new _Rectangle(min[0],min[1],max[0]-min[0],max[1]-min[1]);},_addBounds:function _addBounds(v0,v1,v2,v3,coord,padding,min,max,roots){function add(value,padding){var left=value-padding,right=value+padding;if(left<min[coord])min[coord]=left;if(right>max[coord])max[coord]=right;}padding/=2;var minPad=min[coord]-padding,maxPad=max[coord]+padding;if(v0<minPad||v1<minPad||v2<minPad||v3<minPad||v0>maxPad||v1>maxPad||v2>maxPad||v3>maxPad){if(v1<v0!=v1<v3&&v2<v0!=v2<v3){add(v0,padding);add(v3,padding);}else{var a=3*(v1-v2)-v0+v3,b=2*(v0+v2)-4*v1,c=v1-v0,count=Numerical.solveQuadratic(a,b,c,roots),tMin=1e-8,tMax=1-tMin;add(v3,0);for(var i=0;i<count;i++){var t=roots[i],u=1-t;if(tMin<=t&&t<=tMax)add(u*u*u*v0+3*u*u*t*v1+3*u*t*t*v2+t*t*t*v3,padding);}}}}}},Base.each(['getBounds','getStrokeBounds','getHandleBounds'],function(name){this[name]=function(){if(!this._bounds)this._bounds={};var bounds=this._bounds[name];if(!bounds){bounds=this._bounds[name]=Path[name]([this._segment1,this._segment2],false,this._path);}return bounds.clone();};},{}),Base.each({isStraight:function isStraight(p1,h1,h2,p2){if(h1.isZero()&&h2.isZero()){return true;}else{var v=p2.subtract(p1);if(v.isZero()){return false;}else if(v.isCollinear(h1)&&v.isCollinear(h2)){var l=new Line(p1,p2),epsilon=1e-7;if(l.getDistance(p1.add(h1))<epsilon&&l.getDistance(p2.add(h2))<epsilon){var div=v.dot(v),s1=v.dot(h1)/div,s2=v.dot(h2)/div;return s1>=0&&s1<=1&&s2<=0&&s2>=-1;}}}return false;},isLinear:function isLinear(p1,h1,h2,p2){var third=p2.subtract(p1).divide(3);return h1.equals(third)&&h2.negate().equals(third);}},function(test,name){this[name]=function(epsilon){var seg1=this._segment1,seg2=this._segment2;return test(seg1._point,seg1._handleOut,seg2._handleIn,seg2._point,epsilon);};this.statics[name]=function(v,epsilon){var x0=v[0],y0=v[1],x3=v[6],y3=v[7];return test(new Point(x0,y0),new Point(v[2]-x0,v[3]-y0),new Point(v[4]-x3,v[5]-y3),new Point(x3,y3),epsilon);};},{statics:{},hasHandles:function hasHandles(){return!this._segment1._handleOut.isZero()||!this._segment2._handleIn.isZero();},hasLength:function hasLength(epsilon){return(!this.getPoint1().equals(this.getPoint2())||this.hasHandles())&&this.getLength()>(epsilon||0);},isCollinear:function isCollinear(curve){return curve&&this.isStraight()&&curve.isStraight()&&this.getLine().isCollinear(curve.getLine());},isHorizontal:function isHorizontal(){return this.isStraight()&&Math.abs(this.getTangentAtTime(0.5).y)<1e-8;},isVertical:function isVertical(){return this.isStraight()&&Math.abs(this.getTangentAtTime(0.5).x)<1e-8;}}),{beans:false,getLocationAt:function getLocationAt(offset,_isTime){return this.getLocationAtTime(_isTime?offset:this.getTimeAt(offset));},getLocationAtTime:function getLocationAtTime(t){return t!=null&&t>=0&&t<=1?new CurveLocation(this,t):null;},getTimeAt:function getTimeAt(offset,start){return Curve.getTimeAt(this.getValues(),offset,start);},getParameterAt:'#getTimeAt',getOffsetAtTime:function getOffsetAtTime(t){return this.getPartLength(0,t);},getLocationOf:function getLocationOf(){return this.getLocationAtTime(this.getTimeOf(Point.read(arguments)));},getOffsetOf:function getOffsetOf(){var loc=this.getLocationOf.apply(this,arguments);return loc?loc.getOffset():null;},getTimeOf:function getTimeOf(){return Curve.getTimeOf(this.getValues(),Point.read(arguments));},getParameterOf:'#getTimeOf',getNearestLocation:function getNearestLocation(){var point=Point.read(arguments),values=this.getValues(),t=Curve.getNearestTime(values,point),pt=Curve.getPoint(values,t);return new CurveLocation(this,t,pt,null,point.getDistance(pt));},getNearestPoint:function getNearestPoint(){var loc=this.getNearestLocation.apply(this,arguments);return loc?loc.getPoint():loc;}},new function(){var methods=['getPoint','getTangent','getNormal','getWeightedTangent','getWeightedNormal','getCurvature'];return Base.each(methods,function(name){this[name+'At']=function(location,_isTime){var values=this.getValues();return Curve[name](values,_isTime?location:Curve.getTimeAt(values,location));};this[name+'AtTime']=function(time){return Curve[name](this.getValues(),time);};},{statics:{_evaluateMethods:methods}});}(),new function(){function getLengthIntegrand(v){var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7],ax=9*(x1-x2)+3*(x3-x0),bx=6*(x0+x2)-12*x1,cx=3*(x1-x0),ay=9*(y1-y2)+3*(y3-y0),by=6*(y0+y2)-12*y1,cy=3*(y1-y0);return function(t){var dx=(ax*t+bx)*t+cx,dy=(ay*t+by)*t+cy;return Math.sqrt(dx*dx+dy*dy);};}function getIterations(a,b){return Math.max(2,Math.min(16,Math.ceil(Math.abs(b-a)*32)));}function evaluate(v,t,type,normalized){if(t==null||t<0||t>1)return null;var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7],isZero=Numerical.isZero;if(isZero(x1-x0)&&isZero(y1-y0)){x1=x0;y1=y0;}if(isZero(x2-x3)&&isZero(y2-y3)){x2=x3;y2=y3;}var cx=3*(x1-x0),bx=3*(x2-x1)-cx,ax=x3-x0-cx-bx,cy=3*(y1-y0),by=3*(y2-y1)-cy,ay=y3-y0-cy-by,x,y;if(type===0){x=t===0?x0:t===1?x3:((ax*t+bx)*t+cx)*t+x0;y=t===0?y0:t===1?y3:((ay*t+by)*t+cy)*t+y0;}else{var tMin=1e-8,tMax=1-tMin;if(t<tMin){x=cx;y=cy;}else if(t>tMax){x=3*(x3-x2);y=3*(y3-y2);}else{x=(3*ax*t+2*bx)*t+cx;y=(3*ay*t+2*by)*t+cy;}if(normalized){if(x===0&&y===0&&(t<tMin||t>tMax)){x=x2-x1;y=y2-y1;}var len=Math.sqrt(x*x+y*y);if(len){x/=len;y/=len;}}if(type===3){var x2=6*ax*t+2*bx,y2=6*ay*t+2*by,d=Math.pow(x*x+y*y,3/2);x=d!==0?(x*y2-y*x2)/d:0;y=0;}}return type===2?new Point(y,-x):new Point(x,y);}return{statics:{classify:function classify(v){var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7],a1=x0*(y3-y2)+y0*(x2-x3)+x3*y2-y3*x2,a2=x1*(y0-y3)+y1*(x3-x0)+x0*y3-y0*x3,a3=x2*(y1-y0)+y2*(x0-x1)+x1*y0-y1*x0,d3=3*a3,d2=d3-a2,d1=d2-a2+a1,l=Math.sqrt(d1*d1+d2*d2+d3*d3),s=l!==0?1/l:0,isZero=Numerical.isZero,serpentine='serpentine';d1*=s;d2*=s;d3*=s;function type(type,t1,t2){var hasRoots=t1!==undefined,t1Ok=hasRoots&&t1>0&&t1<1,t2Ok=hasRoots&&t2>0&&t2<1;if(hasRoots&&(!(t1Ok||t2Ok)||type==='loop'&&!(t1Ok&&t2Ok))){type='arch';t1Ok=t2Ok=false;}return{type:type,roots:t1Ok||t2Ok?t1Ok&&t2Ok?t1<t2?[t1,t2]:[t2,t1]:[t1Ok?t1:t2]:null};}if(isZero(d1)){return isZero(d2)?type(isZero(d3)?'line':'quadratic'):type(serpentine,d3/(3*d2));}var d=3*d2*d2-4*d1*d3;if(isZero(d)){return type('cusp',d2/(2*d1));}var f1=d>0?Math.sqrt(d/3):Math.sqrt(-d),f2=2*d1;return type(d>0?serpentine:'loop',(d2+f1)/f2,(d2-f1)/f2);},getLength:function getLength(v,a,b,ds){if(a===undefined)a=0;if(b===undefined)b=1;if(Curve.isStraight(v)){var c=v;if(b<1){c=Curve.subdivide(c,b)[0];a/=b;}if(a>0){c=Curve.subdivide(c,a)[1];}var dx=c[6]-c[0],dy=c[7]-c[1];return Math.sqrt(dx*dx+dy*dy);}return Numerical.integrate(ds||getLengthIntegrand(v),a,b,getIterations(a,b));},getTimeAt:function getTimeAt(v,offset,start){if(start===undefined)start=offset<0?1:0;if(offset===0)return start;var abs=Math.abs,epsilon=1e-12,forward=offset>0,a=forward?start:0,b=forward?1:start,ds=getLengthIntegrand(v),rangeLength=Curve.getLength(v,a,b,ds),diff=abs(offset)-rangeLength;if(abs(diff)<epsilon){return forward?b:a;}else if(diff>epsilon){return null;}var guess=offset/rangeLength,length=0;function f(t){length+=Numerical.integrate(ds,start,t,getIterations(start,t));start=t;return length-offset;}return Numerical.findRoot(f,ds,start+guess,a,b,32,1e-12);},getPoint:function getPoint(v,t){return evaluate(v,t,0,false);},getTangent:function getTangent(v,t){return evaluate(v,t,1,true);},getWeightedTangent:function getWeightedTangent(v,t){return evaluate(v,t,1,false);},getNormal:function getNormal(v,t){return evaluate(v,t,2,true);},getWeightedNormal:function getWeightedNormal(v,t){return evaluate(v,t,2,false);},getCurvature:function getCurvature(v,t){return evaluate(v,t,3,false).x;},getPeaks:function getPeaks(v){var x0=v[0],y0=v[1],x1=v[2],y1=v[3],x2=v[4],y2=v[5],x3=v[6],y3=v[7],ax=-x0+3*x1-3*x2+x3,bx=3*x0-6*x1+3*x2,cx=-3*x0+3*x1,ay=-y0+3*y1-3*y2+y3,by=3*y0-6*y1+3*y2,cy=-3*y0+3*y1,tMin=1e-8,tMax=1-tMin,roots=[];Numerical.solveCubic(9*(ax*ax+ay*ay),9*(ax*bx+by*ay),2*(bx*bx+by*by)+3*(cx*ax+cy*ay),cx*bx+by*cy,roots,tMin,tMax);return roots.sort();}}};}(),new function(){function addLocation(locations,include,c1,t1,c2,t2,overlap){var excludeStart=!overlap&&c1.getPrevious()===c2,excludeEnd=!overlap&&c1!==c2&&c1.getNext()===c2,tMin=1e-8,tMax=1-tMin;if(t1!==null&&t1>=(excludeStart?tMin:0)&&t1<=(excludeEnd?tMax:1)){if(t2!==null&&t2>=(excludeEnd?tMin:0)&&t2<=(excludeStart?tMax:1)){var loc1=new CurveLocation(c1,t1,null,overlap),loc2=new CurveLocation(c2,t2,null,overlap);loc1._intersection=loc2;loc2._intersection=loc1;if(!include||include(loc1)){CurveLocation.insert(locations,loc1,true);}}}}function addCurveIntersections(v1,v2,c1,c2,locations,include,flip,recursion,calls,tMin,tMax,uMin,uMax){if(++calls>=4096||++recursion>=40)return calls;var fatLineEpsilon=1e-9,q0x=v2[0],q0y=v2[1],q3x=v2[6],q3y=v2[7],getSignedDistance=Line.getSignedDistance,d1=getSignedDistance(q0x,q0y,q3x,q3y,v2[2],v2[3]),d2=getSignedDistance(q0x,q0y,q3x,q3y,v2[4],v2[5]),factor=d1*d2>0?3/4:4/9,dMin=factor*Math.min(0,d1,d2),dMax=factor*Math.max(0,d1,d2),dp0=getSignedDistance(q0x,q0y,q3x,q3y,v1[0],v1[1]),dp1=getSignedDistance(q0x,q0y,q3x,q3y,v1[2],v1[3]),dp2=getSignedDistance(q0x,q0y,q3x,q3y,v1[4],v1[5]),dp3=getSignedDistance(q0x,q0y,q3x,q3y,v1[6],v1[7]),hull=getConvexHull(dp0,dp1,dp2,dp3),top=hull[0],bottom=hull[1],tMinClip,tMaxClip;if(d1===0&&d2===0&&dp0===0&&dp1===0&&dp2===0&&dp3===0||(tMinClip=clipConvexHull(top,bottom,dMin,dMax))==null||(tMaxClip=clipConvexHull(top.reverse(),bottom.reverse(),dMin,dMax))==null)return calls;var tMinNew=tMin+(tMax-tMin)*tMinClip,tMaxNew=tMin+(tMax-tMin)*tMaxClip;if(Math.max(uMax-uMin,tMaxNew-tMinNew)<fatLineEpsilon){var t=(tMinNew+tMaxNew)/2,u=(uMin+uMax)/2;addLocation(locations,include,flip?c2:c1,flip?u:t,flip?c1:c2,flip?t:u);}else{v1=Curve.getPart(v1,tMinClip,tMaxClip);if(tMaxClip-tMinClip>0.8){if(tMaxNew-tMinNew>uMax-uMin){var parts=Curve.subdivide(v1,0.5),t=(tMinNew+tMaxNew)/2;calls=addCurveIntersections(v2,parts[0],c2,c1,locations,include,!flip,recursion,calls,uMin,uMax,tMinNew,t);calls=addCurveIntersections(v2,parts[1],c2,c1,locations,include,!flip,recursion,calls,uMin,uMax,t,tMaxNew);}else{var parts=Curve.subdivide(v2,0.5),u=(uMin+uMax)/2;calls=addCurveIntersections(parts[0],v1,c2,c1,locations,include,!flip,recursion,calls,uMin,u,tMinNew,tMaxNew);calls=addCurveIntersections(parts[1],v1,c2,c1,locations,include,!flip,recursion,calls,u,uMax,tMinNew,tMaxNew);}}else{if(uMax-uMin>=fatLineEpsilon){calls=addCurveIntersections(v2,v1,c2,c1,locations,include,!flip,recursion,calls,uMin,uMax,tMinNew,tMaxNew);}else{calls=addCurveIntersections(v1,v2,c1,c2,locations,include,flip,recursion,calls,tMinNew,tMaxNew,uMin,uMax);}}}return calls;}function getConvexHull(dq0,dq1,dq2,dq3){var p0=[0,dq0],p1=[1/3,dq1],p2=[2/3,dq2],p3=[1,dq3],dist1=dq1-(2*dq0+dq3)/3,dist2=dq2-(dq0+2*dq3)/3,hull;if(dist1*dist2<0){hull=[[p0,p1,p3],[p0,p2,p3]];}else{var distRatio=dist1/dist2;hull=[distRatio>=2?[p0,p1,p3]:distRatio<=0.5?[p0,p2,p3]:[p0,p1,p2,p3],[p0,p3]];}return(dist1||dist2)<0?hull.reverse():hull;}function clipConvexHull(hullTop,hullBottom,dMin,dMax){if(hullTop[0][1]<dMin){return clipConvexHullPart(hullTop,true,dMin);}else if(hullBottom[0][1]>dMax){return clipConvexHullPart(hullBottom,false,dMax);}else{return hullTop[0][0];}}function clipConvexHullPart(part,top,threshold){var px=part[0][0],py=part[0][1];for(var i=1,l=part.length;i<l;i++){var qx=part[i][0],qy=part[i][1];if(top?qy>=threshold:qy<=threshold){return qy===threshold?qx:px+(threshold-py)*(qx-px)/(qy-py);}px=qx;py=qy;}return null;}function getCurveLineIntersections(v,px,py,vx,vy){var isZero=Numerical.isZero;if(isZero(vx)&&isZero(vy)){var t=Curve.getTimeOf(v,new Point(px,py));return t===null?[]:[t];}var angle=Math.atan2(-vy,vx),sin=Math.sin(angle),cos=Math.cos(angle),rv=[],roots=[];for(var i=0;i<8;i+=2){var x=v[i]-px,y=v[i+1]-py;rv.push(x*cos-y*sin,x*sin+y*cos);}Curve.solveCubic(rv,1,0,roots,0,1);return roots;}function addCurveLineIntersections(v1,v2,c1,c2,locations,include,flip){var x1=v2[0],y1=v2[1],x2=v2[6],y2=v2[7],roots=getCurveLineIntersections(v1,x1,y1,x2-x1,y2-y1);for(var i=0,l=roots.length;i<l;i++){var t1=roots[i],p1=Curve.getPoint(v1,t1),t2=Curve.getTimeOf(v2,p1);if(t2!==null){addLocation(locations,include,flip?c2:c1,flip?t2:t1,flip?c1:c2,flip?t1:t2);}}}function addLineIntersection(v1,v2,c1,c2,locations,include){var pt=Line.intersect(v1[0],v1[1],v1[6],v1[7],v2[0],v2[1],v2[6],v2[7]);if(pt){addLocation(locations,include,c1,Curve.getTimeOf(v1,pt),c2,Curve.getTimeOf(v2,pt));}}function getCurveIntersections(v1,v2,c1,c2,locations,include){var epsilon=1e-12,min=Math.min,max=Math.max;if(max(v1[0],v1[2],v1[4],v1[6])+epsilon>min(v2[0],v2[2],v2[4],v2[6])&&min(v1[0],v1[2],v1[4],v1[6])-epsilon<max(v2[0],v2[2],v2[4],v2[6])&&max(v1[1],v1[3],v1[5],v1[7])+epsilon>min(v2[1],v2[3],v2[5],v2[7])&&min(v1[1],v1[3],v1[5],v1[7])-epsilon<max(v2[1],v2[3],v2[5],v2[7])){var overlaps=getOverlaps(v1,v2);if(overlaps){for(var i=0;i<2;i++){var overlap=overlaps[i];addLocation(locations,include,c1,overlap[0],c2,overlap[1],true);}}else{var straight1=Curve.isStraight(v1),straight2=Curve.isStraight(v2),straight=straight1&&straight2,flip=straight1&&!straight2,before=locations.length;(straight?addLineIntersection:straight1||straight2?addCurveLineIntersections:addCurveIntersections)(flip?v2:v1,flip?v1:v2,flip?c2:c1,flip?c1:c2,locations,include,flip,0,0,0,1,0,1);if(!straight||locations.length===before){for(var i=0;i<4;i++){var t1=i>>1,t2=i&1,i1=t1*6,i2=t2*6,p1=new Point(v1[i1],v1[i1+1]),p2=new Point(v2[i2],v2[i2+1]);if(p1.isClose(p2,epsilon)){addLocation(locations,include,c1,t1,c2,t2);}}}}}return locations;}function getLoopIntersection(v1,c1,locations,include){var info=Curve.classify(v1);if(info.type==='loop'){var roots=info.roots;addLocation(locations,include,c1,roots[0],c1,roots[1]);}return locations;}function getIntersections(curves1,curves2,include,matrix1,matrix2,_returnFirst){var self=!curves2;if(self)curves2=curves1;var length1=curves1.length,length2=curves2.length,values2=[],arrays=[],locations,current;for(var i=0;i<length2;i++){values2[i]=curves2[i].getValues(matrix2);}for(var i=0;i<length1;i++){var curve1=curves1[i],values1=self?values2[i]:curve1.getValues(matrix1),path1=curve1.getPath();if(path1!==current){current=path1;locations=[];arrays.push(locations);}if(self){getLoopIntersection(values1,curve1,locations,include);}for(var j=self?i+1:0;j<length2;j++){if(_returnFirst&&locations.length)return locations;getCurveIntersections(values1,values2[j],curve1,curves2[j],locations,include);}}locations=[];for(var i=0,l=arrays.length;i<l;i++){locations.push.apply(locations,arrays[i]);}return locations;}function getOverlaps(v1,v2){function getSquaredLineLength(v){var x=v[6]-v[0],y=v[7]-v[1];return x*x+y*y;}var abs=Math.abs,getDistance=Line.getDistance,timeEpsilon=1e-8,geomEpsilon=1e-7,straight1=Curve.isStraight(v1),straight2=Curve.isStraight(v2),straightBoth=straight1&&straight2,flip=getSquaredLineLength(v1)<getSquaredLineLength(v2),l1=flip?v2:v1,l2=flip?v1:v2,px=l1[0],py=l1[1],vx=l1[6]-px,vy=l1[7]-py;if(getDistance(px,py,vx,vy,l2[0],l2[1],true)<geomEpsilon&&getDistance(px,py,vx,vy,l2[6],l2[7],true)<geomEpsilon){if(!straightBoth&&getDistance(px,py,vx,vy,l1[2],l1[3],true)<geomEpsilon&&getDistance(px,py,vx,vy,l1[4],l1[5],true)<geomEpsilon&&getDistance(px,py,vx,vy,l2[2],l2[3],true)<geomEpsilon&&getDistance(px,py,vx,vy,l2[4],l2[5],true)<geomEpsilon){straight1=straight2=straightBoth=true;}}else if(straightBoth){return null;}if(straight1^straight2){return null;}var v=[v1,v2],pairs=[];for(var i=0;i<4&&pairs.length<2;i++){var i1=i&1,i2=i1^1,t1=i>>1,t2=Curve.getTimeOf(v[i1],new Point(v[i2][t1?6:0],v[i2][t1?7:1]));if(t2!=null){var pair=i1?[t1,t2]:[t2,t1];if(!pairs.length||abs(pair[0]-pairs[0][0])>timeEpsilon&&abs(pair[1]-pairs[0][1])>timeEpsilon){pairs.push(pair);}}if(i>2&&!pairs.length)break;}if(pairs.length!==2){pairs=null;}else if(!straightBoth){var o1=Curve.getPart(v1,pairs[0][0],pairs[1][0]),o2=Curve.getPart(v2,pairs[0][1],pairs[1][1]);if(abs(o2[2]-o1[2])>geomEpsilon||abs(o2[3]-o1[3])>geomEpsilon||abs(o2[4]-o1[4])>geomEpsilon||abs(o2[5]-o1[5])>geomEpsilon)pairs=null;}return pairs;}return{getIntersections:function getIntersections(curve){var v1=this.getValues(),v2=curve&&curve!==this&&curve.getValues();return v2?getCurveIntersections(v1,v2,this,curve,[]):getLoopIntersection(v1,this,[]);},statics:{getOverlaps:getOverlaps,getIntersections:getIntersections,getCurveLineIntersections:getCurveLineIntersections}};}());var CurveLocation=Base.extend({_class:'CurveLocation',initialize:function CurveLocation(curve,time,point,_overlap,_distance){if(time>=0.99999999){var next=curve.getNext();if(next){time=0;curve=next;}}this._setCurve(curve);this._time=time;this._point=point||curve.getPointAtTime(time);this._overlap=_overlap;this._distance=_distance;this._intersection=this._next=this._previous=null;},_setCurve:function _setCurve(curve){var path=curve._path;this._path=path;this._version=path?path._version:0;this._curve=curve;this._segment=null;this._segment1=curve._segment1;this._segment2=curve._segment2;},_setSegment:function _setSegment(segment){this._setCurve(segment.getCurve());this._segment=segment;this._time=segment===this._segment1?0:1;this._point=segment._point.clone();},getSegment:function getSegment(){var segment=this._segment;if(!segment){var curve=this.getCurve(),time=this.getTime();if(time===0){segment=curve._segment1;}else if(time===1){segment=curve._segment2;}else if(time!=null){segment=curve.getPartLength(0,time)<curve.getPartLength(time,1)?curve._segment1:curve._segment2;}this._segment=segment;}return segment;},getCurve:function getCurve(){var path=this._path,that=this;if(path&&path._version!==this._version){this._time=this._offset=this._curveOffset=this._curve=null;}function trySegment(segment){var curve=segment&&segment.getCurve();if(curve&&(that._time=curve.getTimeOf(that._point))!=null){that._setCurve(curve);return curve;}}return this._curve||trySegment(this._segment)||trySegment(this._segment1)||trySegment(this._segment2.getPrevious());},getPath:function getPath(){var curve=this.getCurve();return curve&&curve._path;},getIndex:function getIndex(){var curve=this.getCurve();return curve&&curve.getIndex();},getTime:function getTime(){var curve=this.getCurve(),time=this._time;return curve&&time==null?this._time=curve.getTimeOf(this._point):time;},getParameter:'#getTime',getPoint:function getPoint(){return this._point;},getOffset:function getOffset(){var offset=this._offset;if(offset==null){offset=0;var path=this.getPath(),index=this.getIndex();if(path&&index!=null){var curves=path.getCurves();for(var i=0;i<index;i++){offset+=curves[i].getLength();}}this._offset=offset+=this.getCurveOffset();}return offset;},getCurveOffset:function getCurveOffset(){var offset=this._curveOffset;if(offset==null){var curve=this.getCurve(),time=this.getTime();this._curveOffset=offset=time!=null&&curve&&curve.getPartLength(0,time);}return offset;},getIntersection:function getIntersection(){return this._intersection;},getDistance:function getDistance(){return this._distance;},divide:function divide(){var curve=this.getCurve(),res=curve&&curve.divideAtTime(this.getTime());if(res){this._setSegment(res._segment1);}return res;},split:function split(){var curve=this.getCurve(),path=curve._path,res=curve&&curve.splitAtTime(this.getTime());if(res){this._setSegment(path.getLastSegment());}return res;},equals:function equals(loc,_ignoreOther){var res=this===loc;if(!res&&loc instanceof CurveLocation){var c1=this.getCurve(),c2=loc.getCurve(),p1=c1._path,p2=c2._path;if(p1===p2){var abs=Math.abs,epsilon=1e-7,diff=abs(this.getOffset()-loc.getOffset()),i1=!_ignoreOther&&this._intersection,i2=!_ignoreOther&&loc._intersection;res=(diff<epsilon||p1&&abs(p1.getLength()-diff)<epsilon)&&(!i1&&!i2||i1&&i2&&i1.equals(i2,true));}}return res;},toString:function toString(){var parts=[],point=this.getPoint(),f=Formatter.instance;if(point)parts.push('point: '+point);var index=this.getIndex();if(index!=null)parts.push('index: '+index);var time=this.getTime();if(time!=null)parts.push('time: '+f.number(time));if(this._distance!=null)parts.push('distance: '+f.number(this._distance));return'{ '+parts.join(', ')+' }';},isTouching:function isTouching(){var inter=this._intersection;if(inter&&this.getTangent().isCollinear(inter.getTangent())){var curve1=this.getCurve(),curve2=inter.getCurve();return!(curve1.isStraight()&&curve2.isStraight()&&curve1.getLine().intersect(curve2.getLine()));}return false;},isCrossing:function isCrossing(){var inter=this._intersection;if(!inter)return false;var t1=this.getTime(),t2=inter.getTime(),tMin=1e-8,tMax=1-tMin,t1Inside=t1>=tMin&&t1<=tMax,t2Inside=t2>=tMin&&t2<=tMax;if(t1Inside&&t2Inside)return!this.isTouching();var c2=this.getCurve(),c1=t1<tMin?c2.getPrevious():c2,c4=inter.getCurve(),c3=t2<tMin?c4.getPrevious():c4;if(t1>tMax)c2=c2.getNext();if(t2>tMax)c4=c4.getNext();if(!c1||!c2||!c3||!c4)return false;var offsets=[];function addOffsets(curve,end){var v=curve.getValues(),roots=Curve.classify(v).roots||Curve.getPeaks(v),count=roots.length,t=end&&count>1?roots[count-1]:count>0?roots[0]:0.5;offsets.push(Curve.getLength(v,end?t:0,end?1:t)/2);}function isInRange(angle,min,max){return min<max?angle>min&&angle<max:angle>min||angle<max;}if(!t1Inside){addOffsets(c1,true);addOffsets(c2,false);}if(!t2Inside){addOffsets(c3,true);addOffsets(c4,false);}var pt=this.getPoint(),offset=Math.min.apply(Math,offsets),v2=t1Inside?c2.getTangentAtTime(t1):c2.getPointAt(offset).subtract(pt),v1=t1Inside?v2.negate():c1.getPointAt(-offset).subtract(pt),v4=t2Inside?c4.getTangentAtTime(t2):c4.getPointAt(offset).subtract(pt),v3=t2Inside?v4.negate():c3.getPointAt(-offset).subtract(pt),a1=v1.getAngle(),a2=v2.getAngle(),a3=v3.getAngle(),a4=v4.getAngle();return!!(t1Inside?isInRange(a1,a3,a4)^isInRange(a2,a3,a4)&&isInRange(a1,a4,a3)^isInRange(a2,a4,a3):isInRange(a3,a1,a2)^isInRange(a4,a1,a2)&&isInRange(a3,a2,a1)^isInRange(a4,a2,a1));},hasOverlap:function hasOverlap(){return!!this._overlap;}},Base.each(Curve._evaluateMethods,function(name){var get=name+'At';this[name]=function(){var curve=this.getCurve(),time=this.getTime();return time!=null&&curve&&curve[get](time,true);};},{preserve:true}),new function(){function insert(locations,loc,merge){var length=locations.length,l=0,r=length-1;function search(index,dir){for(var i=index+dir;i>=-1&&i<=length;i+=dir){var loc2=locations[(i%length+length)%length];if(!loc.getPoint().isClose(loc2.getPoint(),1e-7))break;if(loc.equals(loc2))return loc2;}return null;}while(l<=r){var m=l+r>>>1,loc2=locations[m],found;if(merge&&(found=loc.equals(loc2)?loc2:search(m,-1)||search(m,1))){if(loc._overlap){found._overlap=found._intersection._overlap=true;}return found;}var path1=loc.getPath(),path2=loc2.getPath(),diff=path1!==path2?path1._id-path2._id:loc.getIndex()+loc.getTime()-(loc2.getIndex()+loc2.getTime());if(diff<0){r=m-1;}else{l=m+1;}}locations.splice(l,0,loc);return loc;}return{statics:{insert:insert,expand:function expand(locations){var expanded=locations.slice();for(var i=locations.length-1;i>=0;i--){insert(expanded,locations[i]._intersection,false);}return expanded;}}};}());var PathItem=Item.extend({_class:'PathItem',_selectBounds:false,_canScaleStroke:true,beans:true,initialize:function PathItem(){},statics:{create:function create(arg){var data,segments,compound;if(Base.isPlainObject(arg)){segments=arg.segments;data=arg.pathData;}else if(Array.isArray(arg)){segments=arg;}else if(typeof arg==='string'){data=arg;}if(segments){var first=segments[0];compound=first&&Array.isArray(first[0]);}else if(data){compound=(data.match(/m/gi)||[]).length>1||/z\s*\S+/i.test(data);}var ctor=compound?CompoundPath:Path;return new ctor(arg);}},_asPathItem:function _asPathItem(){return this;},isClockwise:function isClockwise(){return this.getArea()>=0;},setClockwise:function setClockwise(clockwise){if(this.isClockwise()!=(clockwise=!!clockwise))this.reverse();},setPathData:function setPathData(data){var parts=data&&data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),coords,relative=false,previous,control,current=new Point(),start=new Point();function getCoord(index,coord){var val=+coords[index];if(relative)val+=current[coord];return val;}function getPoint(index){return new Point(getCoord(index,'x'),getCoord(index+1,'y'));}this.clear();for(var i=0,l=parts&&parts.length;i<l;i++){var part=parts[i],command=part[0],lower=command.toLowerCase();coords=part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);var length=coords&&coords.length;relative=command===lower;if(previous==='z'&&!/[mz]/.test(lower))this.moveTo(current);switch(lower){case'm':case'l':var move=lower==='m';for(var j=0;j<length;j+=2){this[move?'moveTo':'lineTo'](current=getPoint(j));if(move){start=current;move=false;}}control=current;break;case'h':case'v':var coord=lower==='h'?'x':'y';current=current.clone();for(var j=0;j<length;j++){current[coord]=getCoord(j,coord);this.lineTo(current);}control=current;break;case'c':for(var j=0;j<length;j+=6){this.cubicCurveTo(getPoint(j),control=getPoint(j+2),current=getPoint(j+4));}break;case's':for(var j=0;j<length;j+=4){this.cubicCurveTo(/[cs]/.test(previous)?current.multiply(2).subtract(control):current,control=getPoint(j),current=getPoint(j+2));previous=lower;}break;case'q':for(var j=0;j<length;j+=4){this.quadraticCurveTo(control=getPoint(j),current=getPoint(j+2));}break;case't':for(var j=0;j<length;j+=2){this.quadraticCurveTo(control=/[qt]/.test(previous)?current.multiply(2).subtract(control):current,current=getPoint(j));previous=lower;}break;case'a':for(var j=0;j<length;j+=7){this.arcTo(current=getPoint(j+5),new Size(+coords[j],+coords[j+1]),+coords[j+2],+coords[j+4],+coords[j+3]);}break;case'z':this.closePath(1e-12);current=start;break;}previous=lower;}},_canComposite:function _canComposite(){return!(this.hasFill()&&this.hasStroke());},_contains:function _contains(point){var winding=point.isInside(this.getBounds({internal:true,handle:true}))?this._getWinding(point):{};return winding.onPath||!!(this.getFillRule()==='evenodd'?winding.windingL&1||winding.windingR&1:winding.winding);},getIntersections:function getIntersections(path,include,_matrix,_returnFirst){var self=this===path||!path,matrix1=this._matrix._orNullIfIdentity(),matrix2=self?matrix1:(_matrix||path._matrix)._orNullIfIdentity();return self||this.getBounds(matrix1).intersects(path.getBounds(matrix2),1e-12)?Curve.getIntersections(this.getCurves(),!self&&path.getCurves(),include,matrix1,matrix2,_returnFirst):[];},getCrossings:function getCrossings(path){return this.getIntersections(path,function(inter){return inter.hasOverlap()||inter.isCrossing();});},getNearestLocation:function getNearestLocation(){var point=Point.read(arguments),curves=this.getCurves(),minDist=Infinity,minLoc=null;for(var i=0,l=curves.length;i<l;i++){var loc=curves[i].getNearestLocation(point);if(loc._distance<minDist){minDist=loc._distance;minLoc=loc;}}return minLoc;},getNearestPoint:function getNearestPoint(){var loc=this.getNearestLocation.apply(this,arguments);return loc?loc.getPoint():loc;},interpolate:function interpolate(from,to,factor){var isPath=!this._children,name=isPath?'_segments':'_children',itemsFrom=from[name],itemsTo=to[name],items=this[name];if(!itemsFrom||!itemsTo||itemsFrom.length!==itemsTo.length){throw new Error('Invalid operands in interpolate() call: '+from+', '+to);}var current=items.length,length=itemsTo.length;if(current<length){var ctor=isPath?Segment:Path;for(var i=current;i<length;i++){this.add(new ctor());}}else if(current>length){this[isPath?'removeSegments':'removeChildren'](length,current);}for(var i=0;i<length;i++){items[i].interpolate(itemsFrom[i],itemsTo[i],factor);}if(isPath){this.setClosed(from._closed);this._changed(9);}},compare:function compare(path){var ok=false;if(path){var paths1=this._children||[this],paths2=path._children?path._children.slice():[path],length1=paths1.length,length2=paths2.length,matched=[],count=0;ok=true;for(var i1=length1-1;i1>=0&&ok;i1--){var path1=paths1[i1];ok=false;for(var i2=length2-1;i2>=0&&!ok;i2--){if(path1.compare(paths2[i2])){if(!matched[i2]){matched[i2]=true;count++;}ok=true;}}}ok=ok&&count===length2;}return ok;}});var Path=PathItem.extend({_class:'Path',_serializeFields:{segments:[],closed:false},initialize:function Path(arg){this._closed=false;this._segments=[];this._version=0;var segments=Array.isArray(arg)?(0,_typeof4.default)(arg[0])==='object'?arg:arguments:arg&&arg.size===undefined&&(arg.x!==undefined||arg.point!==undefined)?arguments:null;if(segments&&segments.length>0){this.setSegments(segments);}else{this._curves=undefined;this._segmentSelection=0;if(!segments&&typeof arg==='string'){this.setPathData(arg);arg=null;}}this._initialize(!segments&&arg);},_equals:function _equals(item){return this._closed===item._closed&&Base.equals(this._segments,item._segments);},copyContent:function copyContent(source){this.setSegments(source._segments);this._closed=source._closed;},_changed:function _changed(flags){_changed.base.call(this,flags);if(flags&8){this._length=this._area=undefined;if(flags&16){this._version++;}else if(this._curves){for(var i=0,l=this._curves.length;i<l;i++){this._curves[i]._changed();}}}else if(flags&32){this._bounds=undefined;}},getStyle:function getStyle(){var parent=this._parent;return(parent instanceof CompoundPath?parent:this)._style;},getSegments:function getSegments(){return this._segments;},setSegments:function setSegments(segments){var fullySelected=this.isFullySelected(),length=segments&&segments.length;this._segments.length=0;this._segmentSelection=0;this._curves=undefined;if(length){var last=segments[length-1];if(typeof last==='boolean'){this.setClosed(last);length--;}this._add(Segment.readList(segments,0,{},length));}if(fullySelected)this.setFullySelected(true);},getFirstSegment:function getFirstSegment(){return this._segments[0];},getLastSegment:function getLastSegment(){return this._segments[this._segments.length-1];},getCurves:function getCurves(){var curves=this._curves,segments=this._segments;if(!curves){var length=this._countCurves();curves=this._curves=new Array(length);for(var i=0;i<length;i++){curves[i]=new Curve(this,segments[i],segments[i+1]||segments[0]);}}return curves;},getFirstCurve:function getFirstCurve(){return this.getCurves()[0];},getLastCurve:function getLastCurve(){var curves=this.getCurves();return curves[curves.length-1];},isClosed:function isClosed(){return this._closed;},setClosed:function setClosed(closed){if(this._closed!=(closed=!!closed)){this._closed=closed;if(this._curves){var length=this._curves.length=this._countCurves();if(closed)this._curves[length-1]=new Curve(this,this._segments[length-1],this._segments[0]);}this._changed(25);}}},{beans:true,getPathData:function getPathData(_matrix,_precision){var segments=this._segments,length=segments.length,f=new Formatter(_precision),coords=new Array(6),first=true,curX,curY,prevX,prevY,inX,inY,outX,outY,parts=[];function addSegment(segment,skipLine){segment._transformCoordinates(_matrix,coords);curX=coords[0];curY=coords[1];if(first){parts.push('M'+f.pair(curX,curY));first=false;}else{inX=coords[2];inY=coords[3];if(inX===curX&&inY===curY&&outX===prevX&&outY===prevY){if(!skipLine){var dx=curX-prevX,dy=curY-prevY;parts.push(dx===0?'v'+f.number(dy):dy===0?'h'+f.number(dx):'l'+f.pair(dx,dy));}}else{parts.push('c'+f.pair(outX-prevX,outY-prevY)+' '+f.pair(inX-prevX,inY-prevY)+' '+f.pair(curX-prevX,curY-prevY));}}prevX=curX;prevY=curY;outX=coords[4];outY=coords[5];}if(!length)return'';for(var i=0;i<length;i++){addSegment(segments[i]);}if(this._closed&&length>0){addSegment(segments[0],true);parts.push('z');}return parts.join('');},isEmpty:function isEmpty(){return!this._segments.length;},_transformContent:function _transformContent(matrix){var segments=this._segments,coords=new Array(6);for(var i=0,l=segments.length;i<l;i++){segments[i]._transformCoordinates(matrix,coords,true);}return true;},_add:function _add(segs,index){var segments=this._segments,curves=this._curves,amount=segs.length,append=index==null,index=append?segments.length:index;for(var i=0;i<amount;i++){var segment=segs[i];if(segment._path)segment=segs[i]=segment.clone();segment._path=this;segment._index=index+i;if(segment._selection)this._updateSelection(segment,0,segment._selection);}if(append){segments.push.apply(segments,segs);}else{segments.splice.apply(segments,[index,0].concat(segs));for(var i=index+amount,l=segments.length;i<l;i++){segments[i]._index=i;}}if(curves){var total=this._countCurves(),start=index>0&&index+amount-1===total?index-1:index,insert=start,end=Math.min(start+amount,total);if(segs._curves){curves.splice.apply(curves,[start,0].concat(segs._curves));insert+=segs._curves.length;}for(var i=insert;i<end;i++){curves.splice(i,0,new Curve(this,null,null));}this._adjustCurves(start,end);}this._changed(25);return segs;},_adjustCurves:function _adjustCurves(start,end){var segments=this._segments,curves=this._curves,curve;for(var i=start;i<end;i++){curve=curves[i];curve._path=this;curve._segment1=segments[i];curve._segment2=segments[i+1]||segments[0];curve._changed();}if(curve=curves[this._closed&&!start?segments.length-1:start-1]){curve._segment2=segments[start]||segments[0];curve._changed();}if(curve=curves[end]){curve._segment1=segments[end];curve._changed();}},_countCurves:function _countCurves(){var length=this._segments.length;return!this._closed&&length>0?length-1:length;},add:function add(segment1){return arguments.length>1&&typeof segment1!=='number'?this._add(Segment.readList(arguments)):this._add([Segment.read(arguments)])[0];},insert:function insert(index,segment1){return arguments.length>2&&typeof segment1!=='number'?this._add(Segment.readList(arguments,1),index):this._add([Segment.read(arguments,1)],index)[0];},addSegment:function addSegment(){return this._add([Segment.read(arguments)])[0];},insertSegment:function insertSegment(index){return this._add([Segment.read(arguments,1)],index)[0];},addSegments:function addSegments(segments){return this._add(Segment.readList(segments));},insertSegments:function insertSegments(index,segments){return this._add(Segment.readList(segments),index);},removeSegment:function removeSegment(index){return this.removeSegments(index,index+1)[0]||null;},removeSegments:function removeSegments(start,end,_includeCurves){start=start||0;end=Base.pick(end,this._segments.length);var segments=this._segments,curves=this._curves,count=segments.length,removed=segments.splice(start,end-start),amount=removed.length;if(!amount)return removed;for(var i=0;i<amount;i++){var segment=removed[i];if(segment._selection)this._updateSelection(segment,segment._selection,0);segment._index=segment._path=null;}for(var i=start,l=segments.length;i<l;i++){segments[i]._index=i;}if(curves){var index=start>0&&end===count+(this._closed?1:0)?start-1:start,curves=curves.splice(index,amount);for(var i=curves.length-1;i>=0;i--){curves[i]._path=null;}if(_includeCurves)removed._curves=curves.slice(1);this._adjustCurves(index,index);}this._changed(25);return removed;},clear:'#removeSegments',hasHandles:function hasHandles(){var segments=this._segments;for(var i=0,l=segments.length;i<l;i++){if(segments[i].hasHandles())return true;}return false;},clearHandles:function clearHandles(){var segments=this._segments;for(var i=0,l=segments.length;i<l;i++){segments[i].clearHandles();}},getLength:function getLength(){if(this._length==null){var curves=this.getCurves(),length=0;for(var i=0,l=curves.length;i<l;i++){length+=curves[i].getLength();}this._length=length;}return this._length;},getArea:function getArea(){var area=this._area;if(area==null){var segments=this._segments,closed=this._closed;area=0;for(var i=0,l=segments.length;i<l;i++){var last=i+1===l;area+=Curve.getArea(Curve.getValues(segments[i],segments[last?0:i+1],null,last&&!closed));}this._area=area;}return area;},isFullySelected:function isFullySelected(){var length=this._segments.length;return this.isSelected()&&length>0&&this._segmentSelection===length*7;},setFullySelected:function setFullySelected(selected){if(selected)this._selectSegments(true);this.setSelected(selected);},setSelection:function setSelection(selection){if(!(selection&1))this._selectSegments(false);setSelection.base.call(this,selection);},_selectSegments:function _selectSegments(selected){var segments=this._segments,length=segments.length,selection=selected?7:0;this._segmentSelection=selection*length;for(var i=0;i<length;i++){segments[i]._selection=selection;}},_updateSelection:function _updateSelection(segment,oldSelection,newSelection){segment._selection=newSelection;var selection=this._segmentSelection+=newSelection-oldSelection;if(selection>0)this.setSelected(true);},divideAt:function divideAt(location){var loc=this.getLocationAt(location),curve;return loc&&(curve=loc.getCurve().divideAt(loc.getCurveOffset()))?curve._segment1:null;},splitAt:function splitAt(location){var loc=this.getLocationAt(location),index=loc&&loc.index,time=loc&&loc.time,tMin=1e-8,tMax=1-tMin;if(time>tMax){index++;time=0;}var curves=this.getCurves();if(index>=0&&index<curves.length){if(time>=tMin){curves[index++].divideAtTime(time);}var segs=this.removeSegments(index,this._segments.length,true),path;if(this._closed){this.setClosed(false);path=this;}else{path=new Path(Item.NO_INSERT);path.insertAbove(this);path.copyAttributes(this);}path._add(segs,0);this.addSegment(segs[0]);return path;}return null;},split:function split(index,time){var curve,location=time===undefined?index:(curve=this.getCurves()[index])&&curve.getLocationAtTime(time);return location!=null?this.splitAt(location):null;},join:function join(path,tolerance){var epsilon=tolerance||0;if(path&&path!==this){var segments=path._segments,last1=this.getLastSegment(),last2=path.getLastSegment();if(!last2)return this;if(last1&&last1._point.isClose(last2._point,epsilon))path.reverse();var first2=path.getFirstSegment();if(last1&&last1._point.isClose(first2._point,epsilon)){last1.setHandleOut(first2._handleOut);this._add(segments.slice(1));}else{var first1=this.getFirstSegment();if(first1&&first1._point.isClose(first2._point,epsilon))path.reverse();last2=path.getLastSegment();if(first1&&first1._point.isClose(last2._point,epsilon)){first1.setHandleIn(last2._handleIn);this._add(segments.slice(0,segments.length-1),0);}else{this._add(segments.slice());}}if(path._closed)this._add([segments[0]]);path.remove();}var first=this.getFirstSegment(),last=this.getLastSegment();if(first!==last&&first._point.isClose(last._point,epsilon)){first.setHandleIn(last._handleIn);last.remove();this.setClosed(true);}return this;},reduce:function reduce(options){var curves=this.getCurves(),simplify=options&&options.simplify,tolerance=simplify?1e-7:0;for(var i=curves.length-1;i>=0;i--){var curve=curves[i];if(!curve.hasHandles()&&(!curve.hasLength(tolerance)||simplify&&curve.isCollinear(curve.getNext())))curve.remove();}return this;},reverse:function reverse(){this._segments.reverse();for(var i=0,l=this._segments.length;i<l;i++){var segment=this._segments[i];var handleIn=segment._handleIn;segment._handleIn=segment._handleOut;segment._handleOut=handleIn;segment._index=i;}this._curves=null;this._changed(9);},flatten:function flatten(flatness){var flattener=new PathFlattener(this,flatness||0.25,256,true),parts=flattener.parts,length=parts.length,segments=[];for(var i=0;i<length;i++){segments.push(new Segment(parts[i].curve.slice(0,2)));}if(!this._closed&&length>0){segments.push(new Segment(parts[length-1].curve.slice(6)));}this.setSegments(segments);},simplify:function simplify(tolerance){var segments=new PathFitter(this).fit(tolerance||2.5);if(segments)this.setSegments(segments);return!!segments;},smooth:function smooth(options){var that=this,opts=options||{},type=opts.type||'asymmetric',segments=this._segments,length=segments.length,closed=this._closed;function getIndex(value,_default){var index=value&&value.index;if(index!=null){var path=value.path;if(path&&path!==that)throw new Error(value._class+' '+index+' of '+path+' is not part of '+that);if(_default&&value instanceof Curve)index++;}else{index=typeof value==='number'?value:_default;}return Math.min(index<0&&closed?index%length:index<0?index+length:index,length-1);}var loop=closed&&opts.from===undefined&&opts.to===undefined,from=getIndex(opts.from,0),to=getIndex(opts.to,length-1);if(from>to){if(closed){from-=length;}else{var tmp=from;from=to;to=tmp;}}if(/^(?:asymmetric|continuous)$/.test(type)){var asymmetric=type==='asymmetric',min=Math.min,amount=to-from+1,n=amount-1,padding=loop?min(amount,4):1,paddingLeft=padding,paddingRight=padding,knots=[];if(!closed){paddingLeft=min(1,from);paddingRight=min(1,length-to-1);}n+=paddingLeft+paddingRight;if(n<=1)return;for(var i=0,j=from-paddingLeft;i<=n;i++,j++){knots[i]=segments[(j<0?j+length:j)%length]._point;}var x=knots[0]._x+2*knots[1]._x,y=knots[0]._y+2*knots[1]._y,f=2,n_1=n-1,rx=[x],ry=[y],rf=[f],px=[],py=[];for(var i=1;i<n;i++){var internal=i<n_1,a=internal?1:asymmetric?1:2,b=internal?4:asymmetric?2:7,u=internal?4:asymmetric?3:8,v=internal?2:asymmetric?0:1,m=a/f;f=rf[i]=b-m;x=rx[i]=u*knots[i]._x+v*knots[i+1]._x-m*x;y=ry[i]=u*knots[i]._y+v*knots[i+1]._y-m*y;}px[n_1]=rx[n_1]/rf[n_1];py[n_1]=ry[n_1]/rf[n_1];for(var i=n-2;i>=0;i--){px[i]=(rx[i]-px[i+1])/rf[i];py[i]=(ry[i]-py[i+1])/rf[i];}px[n]=(3*knots[n]._x-px[n_1])/2;py[n]=(3*knots[n]._y-py[n_1])/2;for(var i=paddingLeft,max=n-paddingRight,j=from;i<=max;i++,j++){var segment=segments[j<0?j+length:j],pt=segment._point,hx=px[i]-pt._x,hy=py[i]-pt._y;if(loop||i<max)segment.setHandleOut(hx,hy);if(loop||i>paddingLeft)segment.setHandleIn(-hx,-hy);}}else{for(var i=from;i<=to;i++){segments[i<0?i+length:i].smooth(opts,!loop&&i===from,!loop&&i===to);}}},toShape:function toShape(insert){if(!this._closed)return null;var segments=this._segments,type,size,radius,topCenter;function isCollinear(i,j){var seg1=segments[i],seg2=seg1.getNext(),seg3=segments[j],seg4=seg3.getNext();return seg1._handleOut.isZero()&&seg2._handleIn.isZero()&&seg3._handleOut.isZero()&&seg4._handleIn.isZero()&&seg2._point.subtract(seg1._point).isCollinear(seg4._point.subtract(seg3._point));}function isOrthogonal(i){var seg2=segments[i],seg1=seg2.getPrevious(),seg3=seg2.getNext();return seg1._handleOut.isZero()&&seg2._handleIn.isZero()&&seg2._handleOut.isZero()&&seg3._handleIn.isZero()&&seg2._point.subtract(seg1._point).isOrthogonal(seg3._point.subtract(seg2._point));}function isArc(i){var seg1=segments[i],seg2=seg1.getNext(),handle1=seg1._handleOut,handle2=seg2._handleIn,kappa=0.5522847498307936;if(handle1.isOrthogonal(handle2)){var pt1=seg1._point,pt2=seg2._point,corner=new Line(pt1,handle1,true).intersect(new Line(pt2,handle2,true),true);return corner&&Numerical.isZero(handle1.getLength()/corner.subtract(pt1).getLength()-kappa)&&Numerical.isZero(handle2.getLength()/corner.subtract(pt2).getLength()-kappa);}return false;}function getDistance(i,j){return segments[i]._point.getDistance(segments[j]._point);}if(!this.hasHandles()&&segments.length===4&&isCollinear(0,2)&&isCollinear(1,3)&&isOrthogonal(1)){type=Shape.Rectangle;size=new Size(getDistance(0,3),getDistance(0,1));topCenter=segments[1]._point.add(segments[2]._point).divide(2);}else if(segments.length===8&&isArc(0)&&isArc(2)&&isArc(4)&&isArc(6)&&isCollinear(1,5)&&isCollinear(3,7)){type=Shape.Rectangle;size=new Size(getDistance(1,6),getDistance(0,3));radius=size.subtract(new Size(getDistance(0,7),getDistance(1,2))).divide(2);topCenter=segments[3]._point.add(segments[4]._point).divide(2);}else if(segments.length===4&&isArc(0)&&isArc(1)&&isArc(2)&&isArc(3)){if(Numerical.isZero(getDistance(0,2)-getDistance(1,3))){type=Shape.Circle;radius=getDistance(0,2)/2;}else{type=Shape.Ellipse;radius=new Size(getDistance(2,0)/2,getDistance(3,1)/2);}topCenter=segments[1]._point;}if(type){var center=this.getPosition(true),shape=new type({center:center,size:size,radius:radius,insert:false});shape.copyAttributes(this,true);shape._matrix.prepend(this._matrix);shape.rotate(topCenter.subtract(center).getAngle()+90);if(insert===undefined||insert)shape.insertAbove(this);return shape;}return null;},toPath:'#clone',compare:function compare(path){if(!path||path instanceof CompoundPath)return compare.base.call(this,path);var curves1=this.getCurves(),curves2=path.getCurves(),length1=curves1.length,length2=curves2.length;if(!length1||!length2){return length1==length2;}var v1=curves1[0].getValues(),values2=[],pos1=0,pos2,end1=0,end2;for(var i=0;i<length2;i++){var v2=curves2[i].getValues();values2.push(v2);var overlaps=Curve.getOverlaps(v1,v2);if(overlaps){pos2=!i&&overlaps[0][0]>0?length2-1:i;end2=overlaps[0][1];break;}}var abs=Math.abs,epsilon=1e-8,v2=values2[pos2],start2;while(v1&&v2){var overlaps=Curve.getOverlaps(v1,v2);if(overlaps){var t1=overlaps[0][0];if(abs(t1-end1)<epsilon){end1=overlaps[1][0];if(end1===1){v1=++pos1<length1?curves1[pos1].getValues():null;end1=0;}var t2=overlaps[0][1];if(abs(t2-end2)<epsilon){if(!start2)start2=[pos2,t2];end2=overlaps[1][1];if(end2===1){if(++pos2>=length2)pos2=0;v2=values2[pos2]||curves2[pos2].getValues();end2=0;}if(!v1){return start2[0]===pos2&&start2[1]===end2;}continue;}}}break;}return false;},_hitTestSelf:function _hitTestSelf(point,options,viewMatrix,strokeMatrix){var that=this,style=this.getStyle(),segments=this._segments,numSegments=segments.length,closed=this._closed,tolerancePadding=options._tolerancePadding,strokePadding=tolerancePadding,join,cap,miterLimit,area,loc,res,hitStroke=options.stroke&&style.hasStroke(),hitFill=options.fill&&style.hasFill(),hitCurves=options.curves,strokeRadius=hitStroke?style.getStrokeWidth()/2:hitFill&&options.tolerance>0||hitCurves?0:null;if(strokeRadius!==null){if(strokeRadius>0){join=style.getStrokeJoin();cap=style.getStrokeCap();miterLimit=style.getMiterLimit();strokePadding=strokePadding.add(Path._getStrokePadding(strokeRadius,strokeMatrix));}else{join=cap='round';}}function isCloseEnough(pt,padding){return point.subtract(pt).divide(padding).length<=1;}function checkSegmentPoint(seg,pt,name){if(!options.selected||pt.isSelected()){var anchor=seg._point;if(pt!==anchor)pt=pt.add(anchor);if(isCloseEnough(pt,strokePadding)){return new HitResult(name,that,{segment:seg,point:pt});}}}function checkSegmentPoints(seg,ends){return(ends||options.segments)&&checkSegmentPoint(seg,seg._point,'segment')||!ends&&options.handles&&(checkSegmentPoint(seg,seg._handleIn,'handle-in')||checkSegmentPoint(seg,seg._handleOut,'handle-out'));}function addToArea(point){area.add(point);}function checkSegmentStroke(segment){var isJoin=closed||segment._index>0&&segment._index<numSegments-1;if((isJoin?join:cap)==='round'){return isCloseEnough(segment._point,strokePadding);}else{area=new Path({internal:true,closed:true});if(isJoin){if(!segment.isSmooth()){Path._addBevelJoin(segment,join,strokeRadius,miterLimit,null,strokeMatrix,addToArea,true);}}else if(cap==='square'){Path._addSquareCap(segment,cap,strokeRadius,null,strokeMatrix,addToArea,true);}if(!area.isEmpty()){var loc;return area.contains(point)||(loc=area.getNearestLocation(point))&&isCloseEnough(loc.getPoint(),tolerancePadding);}}}if(options.ends&&!options.segments&&!closed){if(res=checkSegmentPoints(segments[0],true)||checkSegmentPoints(segments[numSegments-1],true))return res;}else if(options.segments||options.handles){for(var i=0;i<numSegments;i++){if(res=checkSegmentPoints(segments[i]))return res;}}if(strokeRadius!==null){loc=this.getNearestLocation(point);if(loc){var time=loc.getTime();if(time===0||time===1&&numSegments>1){if(!checkSegmentStroke(loc.getSegment()))loc=null;}else if(!isCloseEnough(loc.getPoint(),strokePadding)){loc=null;}}if(!loc&&join==='miter'&&numSegments>1){for(var i=0;i<numSegments;i++){var segment=segments[i];if(point.getDistance(segment._point)<=miterLimit*strokeRadius&&checkSegmentStroke(segment)){loc=segment.getLocation();break;}}}}return!loc&&hitFill&&this._contains(point)||loc&&!hitStroke&&!hitCurves?new HitResult('fill',this):loc?new HitResult(hitStroke?'stroke':'curve',this,{location:loc,point:loc.getPoint()}):null;}},Base.each(Curve._evaluateMethods,function(name){this[name+'At']=function(offset){var loc=this.getLocationAt(offset);return loc&&loc[name]();};},{beans:false,getLocationOf:function getLocationOf(){var point=Point.read(arguments),curves=this.getCurves();for(var i=0,l=curves.length;i<l;i++){var loc=curves[i].getLocationOf(point);if(loc)return loc;}return null;},getOffsetOf:function getOffsetOf(){var loc=this.getLocationOf.apply(this,arguments);return loc?loc.getOffset():null;},getLocationAt:function getLocationAt(offset){if(typeof offset==='number'){var curves=this.getCurves(),length=0;for(var i=0,l=curves.length;i<l;i++){var start=length,curve=curves[i];length+=curve.getLength();if(length>offset){return curve.getLocationAt(offset-start);}}if(curves.length>0&&offset<=this.getLength()){return new CurveLocation(curves[curves.length-1],1);}}else if(offset&&offset.getPath&&offset.getPath()===this){return offset;}return null;}}),new function(){function drawHandles(ctx,segments,matrix,size){var half=size/2,coords=new Array(6),pX,pY;function drawHandle(index){var hX=coords[index],hY=coords[index+1];if(pX!=hX||pY!=hY){ctx.beginPath();ctx.moveTo(pX,pY);ctx.lineTo(hX,hY);ctx.stroke();ctx.beginPath();ctx.arc(hX,hY,half,0,Math.PI*2,true);ctx.fill();}}for(var i=0,l=segments.length;i<l;i++){var segment=segments[i],selection=segment._selection;segment._transformCoordinates(matrix,coords);pX=coords[0];pY=coords[1];if(selection&2)drawHandle(2);if(selection&4)drawHandle(4);ctx.fillRect(pX-half,pY-half,size,size);if(!(selection&1)){var fillStyle=ctx.fillStyle;ctx.fillStyle='#ffffff';ctx.fillRect(pX-half+1,pY-half+1,size-2,size-2);ctx.fillStyle=fillStyle;}}}function drawSegments(ctx,path,matrix){var segments=path._segments,length=segments.length,coords=new Array(6),first=true,curX,curY,prevX,prevY,inX,inY,outX,outY;function drawSegment(segment){if(matrix){segment._transformCoordinates(matrix,coords);curX=coords[0];curY=coords[1];}else{var point=segment._point;curX=point._x;curY=point._y;}if(first){ctx.moveTo(curX,curY);first=false;}else{if(matrix){inX=coords[2];inY=coords[3];}else{var handle=segment._handleIn;inX=curX+handle._x;inY=curY+handle._y;}if(inX===curX&&inY===curY&&outX===prevX&&outY===prevY){ctx.lineTo(curX,curY);}else{ctx.bezierCurveTo(outX,outY,inX,inY,curX,curY);}}prevX=curX;prevY=curY;if(matrix){outX=coords[4];outY=coords[5];}else{var handle=segment._handleOut;outX=prevX+handle._x;outY=prevY+handle._y;}}for(var i=0;i<length;i++){drawSegment(segments[i]);}if(path._closed&&length>0)drawSegment(segments[0]);}return{_draw:function _draw(ctx,param,viewMatrix,strokeMatrix){var dontStart=param.dontStart,dontPaint=param.dontFinish||param.clip,style=this.getStyle(),hasFill=style.hasFill(),hasStroke=style.hasStroke(),dashArray=style.getDashArray(),dashLength=!paper.support.nativeDash&&hasStroke&&dashArray&&dashArray.length;if(!dontStart)ctx.beginPath();if(hasFill||hasStroke&&!dashLength||dontPaint){drawSegments(ctx,this,strokeMatrix);if(this._closed)ctx.closePath();}function getOffset(i){return dashArray[(i%dashLength+dashLength)%dashLength];}if(!dontPaint&&(hasFill||hasStroke)){this._setStyles(ctx,param,viewMatrix);if(hasFill){ctx.fill(style.getFillRule());ctx.shadowColor='rgba(0,0,0,0)';}if(hasStroke){if(dashLength){if(!dontStart)ctx.beginPath();var flattener=new PathFlattener(this,0.25,32,false,strokeMatrix),length=flattener.length,from=-style.getDashOffset(),to,i=0;from=from%length;while(from>0){from-=getOffset(i--)+getOffset(i--);}while(from<length){to=from+getOffset(i++);if(from>0||to>0)flattener.drawPart(ctx,Math.max(from,0),Math.max(to,0));from=to+getOffset(i++);}}ctx.stroke();}}},_drawSelected:function _drawSelected(ctx,matrix){ctx.beginPath();drawSegments(ctx,this,matrix);ctx.stroke();drawHandles(ctx,this._segments,matrix,paper.settings.handleSize);}};}(),new function(){function getCurrentSegment(that){var segments=that._segments;if(!segments.length)throw new Error('Use a moveTo() command first');return segments[segments.length-1];}return{moveTo:function moveTo(){var segments=this._segments;if(segments.length===1)this.removeSegment(0);if(!segments.length)this._add([new Segment(Point.read(arguments))]);},moveBy:function moveBy(){throw new Error('moveBy() is unsupported on Path items.');},lineTo:function lineTo(){this._add([new Segment(Point.read(arguments))]);},cubicCurveTo:function cubicCurveTo(){var handle1=Point.read(arguments),handle2=Point.read(arguments),to=Point.read(arguments),current=getCurrentSegment(this);current.setHandleOut(handle1.subtract(current._point));this._add([new Segment(to,handle2.subtract(to))]);},quadraticCurveTo:function quadraticCurveTo(){var handle=Point.read(arguments),to=Point.read(arguments),current=getCurrentSegment(this)._point;this.cubicCurveTo(handle.add(current.subtract(handle).multiply(1/3)),handle.add(to.subtract(handle).multiply(1/3)),to);},curveTo:function curveTo(){var through=Point.read(arguments),to=Point.read(arguments),t=Base.pick(Base.read(arguments),0.5),t1=1-t,current=getCurrentSegment(this)._point,handle=through.subtract(current.multiply(t1*t1)).subtract(to.multiply(t*t)).divide(2*t*t1);if(handle.isNaN())throw new Error('Cannot put a curve through points with parameter = '+t);this.quadraticCurveTo(handle,to);},arcTo:function arcTo(){var abs=Math.abs,sqrt=Math.sqrt,current=getCurrentSegment(this),from=current._point,to=Point.read(arguments),through,peek=Base.peek(arguments),clockwise=Base.pick(peek,true),center,extent,vector,matrix;if(typeof clockwise==='boolean'){var middle=from.add(to).divide(2),through=middle.add(middle.subtract(from).rotate(clockwise?-90:90));}else if(Base.remain(arguments)<=2){through=to;to=Point.read(arguments);}else{var radius=Size.read(arguments),isZero=Numerical.isZero;if(isZero(radius.width)||isZero(radius.height))return this.lineTo(to);var rotation=Base.read(arguments),clockwise=!!Base.read(arguments),large=!!Base.read(arguments),middle=from.add(to).divide(2),pt=from.subtract(middle).rotate(-rotation),x=pt.x,y=pt.y,rx=abs(radius.width),ry=abs(radius.height),rxSq=rx*rx,rySq=ry*ry,xSq=x*x,ySq=y*y;var factor=sqrt(xSq/rxSq+ySq/rySq);if(factor>1){rx*=factor;ry*=factor;rxSq=rx*rx;rySq=ry*ry;}factor=(rxSq*rySq-rxSq*ySq-rySq*xSq)/(rxSq*ySq+rySq*xSq);if(abs(factor)<1e-12)factor=0;if(factor<0)throw new Error('Cannot create an arc with the given arguments');center=new Point(rx*y/ry,-ry*x/rx).multiply((large===clockwise?-1:1)*sqrt(factor)).rotate(rotation).add(middle);matrix=new Matrix().translate(center).rotate(rotation).scale(rx,ry);vector=matrix._inverseTransform(from);extent=vector.getDirectedAngle(matrix._inverseTransform(to));if(!clockwise&&extent>0)extent-=360;else if(clockwise&&extent<0)extent+=360;}if(through){var l1=new Line(from.add(through).divide(2),through.subtract(from).rotate(90),true),l2=new Line(through.add(to).divide(2),to.subtract(through).rotate(90),true),line=new Line(from,to),throughSide=line.getSide(through);center=l1.intersect(l2,true);if(!center){if(!throughSide)return this.lineTo(to);throw new Error('Cannot create an arc with the given arguments');}vector=from.subtract(center);extent=vector.getDirectedAngle(to.subtract(center));var centerSide=line.getSide(center);if(centerSide===0){extent=throughSide*abs(extent);}else if(throughSide===centerSide){extent+=extent<0?360:-360;}}var epsilon=1e-7,ext=abs(extent),count=ext>=360?4:Math.ceil((ext-epsilon)/90),inc=extent/count,half=inc*Math.PI/360,z=4/3*Math.sin(half)/(1+Math.cos(half)),segments=[];for(var i=0;i<=count;i++){var pt=to,out=null;if(i<count){out=vector.rotate(90).multiply(z);if(matrix){pt=matrix._transformPoint(vector);out=matrix._transformPoint(vector.add(out)).subtract(pt);}else{pt=center.add(vector);}}if(!i){current.setHandleOut(out);}else{var _in=vector.rotate(-90).multiply(z);if(matrix){_in=matrix._transformPoint(vector.add(_in)).subtract(pt);}segments.push(new Segment(pt,_in,out));}vector=vector.rotate(inc);}this._add(segments);},lineBy:function lineBy(){var to=Point.read(arguments),current=getCurrentSegment(this)._point;this.lineTo(current.add(to));},curveBy:function curveBy(){var through=Point.read(arguments),to=Point.read(arguments),parameter=Base.read(arguments),current=getCurrentSegment(this)._point;this.curveTo(current.add(through),current.add(to),parameter);},cubicCurveBy:function cubicCurveBy(){var handle1=Point.read(arguments),handle2=Point.read(arguments),to=Point.read(arguments),current=getCurrentSegment(this)._point;this.cubicCurveTo(current.add(handle1),current.add(handle2),current.add(to));},quadraticCurveBy:function quadraticCurveBy(){var handle=Point.read(arguments),to=Point.read(arguments),current=getCurrentSegment(this)._point;this.quadraticCurveTo(current.add(handle),current.add(to));},arcBy:function arcBy(){var current=getCurrentSegment(this)._point,point=current.add(Point.read(arguments)),clockwise=Base.pick(Base.peek(arguments),true);if(typeof clockwise==='boolean'){this.arcTo(point,clockwise);}else{this.arcTo(point,current.add(Point.read(arguments)));}},closePath:function closePath(tolerance){this.setClosed(true);this.join(this,tolerance);}};}(),{_getBounds:function _getBounds(matrix,options){var method=options.handle?'getHandleBounds':options.stroke?'getStrokeBounds':'getBounds';return Path[method](this._segments,this._closed,this,matrix,options);},statics:{getBounds:function getBounds(segments,closed,path,matrix,options,strokePadding){var first=segments[0];if(!first)return new _Rectangle();var coords=new Array(6),prevCoords=first._transformCoordinates(matrix,new Array(6)),min=prevCoords.slice(0,2),max=min.slice(),roots=new Array(2);function processSegment(segment){segment._transformCoordinates(matrix,coords);for(var i=0;i<2;i++){Curve._addBounds(prevCoords[i],prevCoords[i+4],coords[i+2],coords[i],i,strokePadding?strokePadding[i]:0,min,max,roots);}var tmp=prevCoords;prevCoords=coords;coords=tmp;}for(var i=1,l=segments.length;i<l;i++){processSegment(segments[i]);}if(closed)processSegment(first);return new _Rectangle(min[0],min[1],max[0]-min[0],max[1]-min[1]);},getStrokeBounds:function getStrokeBounds(segments,closed,path,matrix,options){var style=path.getStyle(),stroke=style.hasStroke(),strokeWidth=style.getStrokeWidth(),strokeMatrix=stroke&&path._getStrokeMatrix(matrix,options),strokePadding=stroke&&Path._getStrokePadding(strokeWidth,strokeMatrix),bounds=Path.getBounds(segments,closed,path,matrix,options,strokePadding);if(!stroke)return bounds;var strokeRadius=strokeWidth/2,join=style.getStrokeJoin(),cap=style.getStrokeCap(),miterLimit=style.getMiterLimit(),joinBounds=new _Rectangle(new Size(strokePadding));function addPoint(point){bounds=bounds.include(point);}function addRound(segment){bounds=bounds.unite(joinBounds.setCenter(segment._point.transform(matrix)));}function addJoin(segment,join){if(join==='round'||segment.isSmooth()){addRound(segment);}else{Path._addBevelJoin(segment,join,strokeRadius,miterLimit,matrix,strokeMatrix,addPoint);}}function addCap(segment,cap){if(cap==='round'){addRound(segment);}else{Path._addSquareCap(segment,cap,strokeRadius,matrix,strokeMatrix,addPoint);}}var length=segments.length-(closed?0:1);for(var i=1;i<length;i++){addJoin(segments[i],join);}if(closed){addJoin(segments[0],join);}else if(length>0){addCap(segments[0],cap);addCap(segments[segments.length-1],cap);}return bounds;},_getStrokePadding:function _getStrokePadding(radius,matrix){if(!matrix)return[radius,radius];var hor=new Point(radius,0).transform(matrix),ver=new Point(0,radius).transform(matrix),phi=hor.getAngleInRadians(),a=hor.getLength(),b=ver.getLength();var sin=Math.sin(phi),cos=Math.cos(phi),tan=Math.tan(phi),tx=Math.atan2(b*tan,a),ty=Math.atan2(b,tan*a);return[Math.abs(a*Math.cos(tx)*cos+b*Math.sin(tx)*sin),Math.abs(b*Math.sin(ty)*cos+a*Math.cos(ty)*sin)];},_addBevelJoin:function _addBevelJoin(segment,join,radius,miterLimit,matrix,strokeMatrix,addPoint,isArea){var curve2=segment.getCurve(),curve1=curve2.getPrevious(),point=curve2.getPoint1().transform(matrix),normal1=curve1.getNormalAtTime(1).multiply(radius).transform(strokeMatrix),normal2=curve2.getNormalAtTime(0).multiply(radius).transform(strokeMatrix);if(normal1.getDirectedAngle(normal2)<0){normal1=normal1.negate();normal2=normal2.negate();}if(isArea)addPoint(point);addPoint(point.add(normal1));if(join==='miter'){var corner=new Line(point.add(normal1),new Point(-normal1.y,normal1.x),true).intersect(new Line(point.add(normal2),new Point(-normal2.y,normal2.x),true),true);if(corner&&point.getDistance(corner)<=miterLimit*radius){addPoint(corner);}}addPoint(point.add(normal2));},_addSquareCap:function _addSquareCap(segment,cap,radius,matrix,strokeMatrix,addPoint,isArea){var point=segment._point.transform(matrix),loc=segment.getLocation(),normal=loc.getNormal().multiply(loc.getTime()===0?radius:-radius).transform(strokeMatrix);if(cap==='square'){if(isArea){addPoint(point.subtract(normal));addPoint(point.add(normal));}point=point.add(normal.rotate(-90));}addPoint(point.add(normal));addPoint(point.subtract(normal));},getHandleBounds:function getHandleBounds(segments,closed,path,matrix,options){var style=path.getStyle(),stroke=options.stroke&&style.hasStroke(),strokePadding,joinPadding;if(stroke){var strokeMatrix=path._getStrokeMatrix(matrix,options),strokeRadius=style.getStrokeWidth()/2,joinRadius=strokeRadius;if(style.getStrokeJoin()==='miter')joinRadius=strokeRadius*style.getMiterLimit();if(style.getStrokeCap()==='square')joinRadius=Math.max(joinRadius,strokeRadius*Math.SQRT2);strokePadding=Path._getStrokePadding(strokeRadius,strokeMatrix);joinPadding=Path._getStrokePadding(joinRadius,strokeMatrix);}var coords=new Array(6),x1=Infinity,x2=-x1,y1=x1,y2=x2;for(var i=0,l=segments.length;i<l;i++){var segment=segments[i];segment._transformCoordinates(matrix,coords);for(var j=0;j<6;j+=2){var padding=!j?joinPadding:strokePadding,paddingX=padding?padding[0]:0,paddingY=padding?padding[1]:0,x=coords[j],y=coords[j+1],xn=x-paddingX,xx=x+paddingX,yn=y-paddingY,yx=y+paddingY;if(xn<x1)x1=xn;if(xx>x2)x2=xx;if(yn<y1)y1=yn;if(yx>y2)y2=yx;}}return new _Rectangle(x1,y1,x2-x1,y2-y1);}}});Path.inject({statics:new function(){var kappa=0.5522847498307936,ellipseSegments=[new Segment([-1,0],[0,kappa],[0,-kappa]),new Segment([0,-1],[-kappa,0],[kappa,0]),new Segment([1,0],[0,-kappa],[0,kappa]),new Segment([0,1],[kappa,0],[-kappa,0])];function createPath(segments,closed,args){var props=Base.getNamed(args),path=new Path(props&&props.insert==false&&Item.NO_INSERT);path._add(segments);path._closed=closed;return path.set(props,{insert:true});}function createEllipse(center,radius,args){var segments=new Array(4);for(var i=0;i<4;i++){var segment=ellipseSegments[i];segments[i]=new Segment(segment._point.multiply(radius).add(center),segment._handleIn.multiply(radius),segment._handleOut.multiply(radius));}return createPath(segments,true,args);}return{Line:function Line(){return createPath([new Segment(Point.readNamed(arguments,'from')),new Segment(Point.readNamed(arguments,'to'))],false,arguments);},Circle:function Circle(){var center=Point.readNamed(arguments,'center'),radius=Base.readNamed(arguments,'radius');return createEllipse(center,new Size(radius),arguments);},Rectangle:function Rectangle(){var rect=_Rectangle.readNamed(arguments,'rectangle'),radius=Size.readNamed(arguments,'radius',0,{readNull:true}),bl=rect.getBottomLeft(true),tl=rect.getTopLeft(true),tr=rect.getTopRight(true),br=rect.getBottomRight(true),segments;if(!radius||radius.isZero()){segments=[new Segment(bl),new Segment(tl),new Segment(tr),new Segment(br)];}else{radius=Size.min(radius,rect.getSize(true).divide(2));var rx=radius.width,ry=radius.height,hx=rx*kappa,hy=ry*kappa;segments=[new Segment(bl.add(rx,0),null,[-hx,0]),new Segment(bl.subtract(0,ry),[0,hy]),new Segment(tl.add(0,ry),null,[0,-hy]),new Segment(tl.add(rx,0),[-hx,0],null),new Segment(tr.subtract(rx,0),null,[hx,0]),new Segment(tr.add(0,ry),[0,-hy],null),new Segment(br.subtract(0,ry),null,[0,hy]),new Segment(br.subtract(rx,0),[hx,0])];}return createPath(segments,true,arguments);},RoundRectangle:'#Rectangle',Ellipse:function Ellipse(){var ellipse=Shape._readEllipse(arguments);return createEllipse(ellipse.center,ellipse.radius,arguments);},Oval:'#Ellipse',Arc:function Arc(){var from=Point.readNamed(arguments,'from'),through=Point.readNamed(arguments,'through'),to=Point.readNamed(arguments,'to'),props=Base.getNamed(arguments),path=new Path(props&&props.insert==false&&Item.NO_INSERT);path.moveTo(from);path.arcTo(through,to);return path.set(props);},RegularPolygon:function RegularPolygon(){var center=Point.readNamed(arguments,'center'),sides=Base.readNamed(arguments,'sides'),radius=Base.readNamed(arguments,'radius'),step=360/sides,three=sides%3===0,vector=new Point(0,three?-radius:radius),offset=three?-1:0.5,segments=new Array(sides);for(var i=0;i<sides;i++){segments[i]=new Segment(center.add(vector.rotate((i+offset)*step)));}return createPath(segments,true,arguments);},Star:function Star(){var center=Point.readNamed(arguments,'center'),points=Base.readNamed(arguments,'points')*2,radius1=Base.readNamed(arguments,'radius1'),radius2=Base.readNamed(arguments,'radius2'),step=360/points,vector=new Point(0,-1),segments=new Array(points);for(var i=0;i<points;i++){segments[i]=new Segment(center.add(vector.rotate(step*i).multiply(i%2?radius2:radius1)));}return createPath(segments,true,arguments);}};}()});var CompoundPath=PathItem.extend({_class:'CompoundPath',_serializeFields:{children:[]},beans:true,initialize:function CompoundPath(arg){this._children=[];this._namedChildren={};if(!this._initialize(arg)){if(typeof arg==='string'){this.setPathData(arg);}else{this.addChildren(Array.isArray(arg)?arg:arguments);}}},insertChildren:function insertChildren(index,items){var list=items,first=list[0];if(first&&typeof first[0]==='number')list=[list];for(var i=items.length-1;i>=0;i--){var item=list[i];if(list===items&&!(item instanceof Path))list=Base.slice(list);if(Array.isArray(item)){list[i]=new Path({segments:item,insert:false});}else if(item instanceof CompoundPath){list.splice.apply(list,[i,1].concat(item.removeChildren()));item.remove();}}return insertChildren.base.call(this,index,list);},reduce:function reduce(options){var children=this._children;for(var i=children.length-1;i>=0;i--){var path=children[i].reduce(options);if(path.isEmpty())path.remove();}if(!children.length){var path=new Path(Item.NO_INSERT);path.copyAttributes(this);path.insertAbove(this);this.remove();return path;}return reduce.base.call(this);},isClosed:function isClosed(){var children=this._children;for(var i=0,l=children.length;i<l;i++){if(!children[i]._closed)return false;}return true;},setClosed:function setClosed(closed){var children=this._children;for(var i=0,l=children.length;i<l;i++){children[i].setClosed(closed);}},getFirstSegment:function getFirstSegment(){var first=this.getFirstChild();return first&&first.getFirstSegment();},getLastSegment:function getLastSegment(){var last=this.getLastChild();return last&&last.getLastSegment();},getCurves:function getCurves(){var children=this._children,curves=[];for(var i=0,l=children.length;i<l;i++){curves.push.apply(curves,children[i].getCurves());}return curves;},getFirstCurve:function getFirstCurve(){var first=this.getFirstChild();return first&&first.getFirstCurve();},getLastCurve:function getLastCurve(){var last=this.getLastChild();return last&&last.getLastCurve();},getArea:function getArea(){var children=this._children,area=0;for(var i=0,l=children.length;i<l;i++){area+=children[i].getArea();}return area;},getLength:function getLength(){var children=this._children,length=0;for(var i=0,l=children.length;i<l;i++){length+=children[i].getLength();}return length;},getPathData:function getPathData(_matrix,_precision){var children=this._children,paths=[];for(var i=0,l=children.length;i<l;i++){var child=children[i],mx=child._matrix;paths.push(child.getPathData(_matrix&&!mx.isIdentity()?_matrix.appended(mx):_matrix,_precision));}return paths.join('');},_hitTestChildren:function _hitTestChildren(point,options,viewMatrix){return _hitTestChildren.base.call(this,point,options.class===Path||options.type==='path'?options:Base.set({},options,{fill:false}),viewMatrix);},_draw:function _draw(ctx,param,viewMatrix,strokeMatrix){var children=this._children;if(!children.length)return;param=param.extend({dontStart:true,dontFinish:true});ctx.beginPath();for(var i=0,l=children.length;i<l;i++){children[i].draw(ctx,param,strokeMatrix);}if(!param.clip){this._setStyles(ctx,param,viewMatrix);var style=this._style;if(style.hasFill()){ctx.fill(style.getFillRule());ctx.shadowColor='rgba(0,0,0,0)';}if(style.hasStroke())ctx.stroke();}},_drawSelected:function _drawSelected(ctx,matrix,selectionItems){var children=this._children;for(var i=0,l=children.length;i<l;i++){var child=children[i],mx=child._matrix;if(!selectionItems[child._id]){child._drawSelected(ctx,mx.isIdentity()?matrix:matrix.appended(mx));}}}},new function(){function getCurrentPath(that,check){var children=that._children;if(check&&!children.length)throw new Error('Use a moveTo() command first');return children[children.length-1];}return Base.each(['lineTo','cubicCurveTo','quadraticCurveTo','curveTo','arcTo','lineBy','cubicCurveBy','quadraticCurveBy','curveBy','arcBy'],function(key){this[key]=function(){var path=getCurrentPath(this,true);path[key].apply(path,arguments);};},{moveTo:function moveTo(){var current=getCurrentPath(this),path=current&&current.isEmpty()?current:new Path(Item.NO_INSERT);if(path!==current)this.addChild(path);path.moveTo.apply(path,arguments);},moveBy:function moveBy(){var current=getCurrentPath(this,true),last=current&&current.getLastSegment(),point=Point.read(arguments);this.moveTo(last?point.add(last._point):point);},closePath:function closePath(tolerance){getCurrentPath(this,true).closePath(tolerance);}});}(),Base.each(['reverse','flatten','simplify','smooth'],function(key){this[key]=function(param){var children=this._children,res;for(var i=0,l=children.length;i<l;i++){res=children[i][key](param)||res;}return res;};},{}));PathItem.inject(new function(){var min=Math.min,max=Math.max,abs=Math.abs,operators={unite:{'1':true,'2':true},intersect:{'2':true},subtract:{'1':true},exclude:{'1':true,'-1':true}};function preparePath(path,resolve){var res=path.clone(false).reduce({simplify:true}).transform(null,true,true);return resolve?res.resolveCrossings().reorient(res.getFillRule()==='nonzero',true):res;}function createResult(paths,simplify,path1,path2,options){var result=new CompoundPath(Item.NO_INSERT);result.addChildren(paths,true);result=result.reduce({simplify:simplify});if(!(options&&options.insert==false)){result.insertAbove(path2&&path1.isSibling(path2)&&path1.getIndex()<path2.getIndex()?path2:path1);}result.copyAttributes(path1,true);return result;}function traceBoolean(path1,path2,operation,options){if(options&&(options.trace==false||options.stroke)&&/^(subtract|intersect)$/.test(operation))return splitBoolean(path1,path2,operation);var _path1=preparePath(path1,true),_path2=path2&&path1!==path2&&preparePath(path2,true),operator=operators[operation];operator[operation]=true;if(_path2&&(operator.subtract||operator.exclude)^(_path2.isClockwise()^_path1.isClockwise()))_path2.reverse();var crossings=divideLocations(CurveLocation.expand(_path1.getCrossings(_path2))),paths1=_path1._children||[_path1],paths2=_path2&&(_path2._children||[_path2]),segments=[],curves=[],paths;function collect(paths){for(var i=0,l=paths.length;i<l;i++){var path=paths[i];segments.push.apply(segments,path._segments);curves.push.apply(curves,path.getCurves());path._overlapsOnly=true;}}if(crossings.length){collect(paths1);if(paths2)collect(paths2);for(var i=0,l=crossings.length;i<l;i++){propagateWinding(crossings[i]._segment,_path1,_path2,curves,operator);}for(var i=0,l=segments.length;i<l;i++){var segment=segments[i],inter=segment._intersection;if(!segment._winding){propagateWinding(segment,_path1,_path2,curves,operator);}if(!(inter&&inter._overlap))segment._path._overlapsOnly=false;}paths=tracePaths(segments,operator);}else{paths=reorientPaths(paths2?paths1.concat(paths2):paths1.slice(),function(w){return!!operator[w];});}return createResult(paths,true,path1,path2,options);}function splitBoolean(path1,path2,operation){var _path1=preparePath(path1),_path2=preparePath(path2),crossings=_path1.getCrossings(_path2),subtract=operation==='subtract',divide=operation==='divide',added={},paths=[];function addPath(path){if(!added[path._id]&&(divide||_path2.contains(path.getPointAt(path.getLength()/2))^subtract)){paths.unshift(path);return added[path._id]=true;}}for(var i=crossings.length-1;i>=0;i--){var path=crossings[i].split();if(path){if(addPath(path))path.getFirstSegment().setHandleIn(0,0);_path1.getLastSegment().setHandleOut(0,0);}}addPath(_path1);return createResult(paths,false,path1,path2);}function linkIntersections(from,to){var prev=from;while(prev){if(prev===to)return;prev=prev._previous;}while(from._next&&from._next!==to){from=from._next;}if(!from._next){while(to._previous){to=to._previous;}from._next=to;to._previous=from;}}function clearCurveHandles(curves){for(var i=curves.length-1;i>=0;i--){curves[i].clearHandles();}}function reorientPaths(paths,isInside,clockwise){var length=paths&&paths.length;if(length){var lookup=Base.each(paths,function(path,i){this[path._id]={container:null,winding:path.isClockwise()?1:-1,index:i};},{}),sorted=paths.slice().sort(function(a,b){return abs(b.getArea())-abs(a.getArea());}),first=sorted[0];if(clockwise==null)clockwise=first.isClockwise();for(var i=0;i<length;i++){var path1=sorted[i],entry1=lookup[path1._id],point=path1.getInteriorPoint(),containerWinding=0;for(var j=i-1;j>=0;j--){var path2=sorted[j];if(path2.contains(point)){var entry2=lookup[path2._id];containerWinding=entry2.winding;entry1.winding+=containerWinding;entry1.container=entry2.exclude?entry2.container:path2;break;}}if(isInside(entry1.winding)===isInside(containerWinding)){entry1.exclude=true;paths[entry1.index]=null;}else{var container=entry1.container;path1.setClockwise(container?!container.isClockwise():clockwise);}}}return paths;}function divideLocations(locations,include,clearLater){var results=include&&[],tMin=1e-8,tMax=1-tMin,clearHandles=false,clearCurves=clearLater||[],clearLookup=clearLater&&{},renormalizeLocs,prevCurve,prevTime;function getId(curve){return curve._path._id+'.'+curve._segment1._index;}for(var i=(clearLater&&clearLater.length)-1;i>=0;i--){var curve=clearLater[i];if(curve._path)clearLookup[getId(curve)]=true;}for(var i=locations.length-1;i>=0;i--){var loc=locations[i],time=loc._time,origTime=time,exclude=include&&!include(loc),curve=loc._curve,segment;if(curve){if(curve!==prevCurve){clearHandles=!curve.hasHandles()||clearLookup&&clearLookup[getId(curve)];renormalizeLocs=[];prevTime=null;prevCurve=curve;}else if(prevTime>=tMin){time/=prevTime;}}if(exclude){if(renormalizeLocs)renormalizeLocs.push(loc);continue;}else if(include){results.unshift(loc);}prevTime=origTime;if(time<tMin){segment=curve._segment1;}else if(time>tMax){segment=curve._segment2;}else{var newCurve=curve.divideAtTime(time,true);if(clearHandles)clearCurves.push(curve,newCurve);segment=newCurve._segment1;for(var j=renormalizeLocs.length-1;j>=0;j--){var l=renormalizeLocs[j];l._time=(l._time-time)/(1-time);}}loc._setSegment(segment);var inter=segment._intersection,dest=loc._intersection;if(inter){linkIntersections(inter,dest);var other=inter;while(other){linkIntersections(other._intersection,inter);other=other._next;}}else{segment._intersection=dest;}}if(!clearLater)clearCurveHandles(clearCurves);return results||locations;}function getWinding(point,curves,dir,closed,dontFlip){var ia=dir?1:0,io=ia^1,pv=[point.x,point.y],pa=pv[ia],po=pv[io],windingEpsilon=1e-9,qualityEpsilon=1e-6,paL=pa-windingEpsilon,paR=pa+windingEpsilon,windingL=0,windingR=0,pathWindingL=0,pathWindingR=0,onPath=false,onAnyPath=false,quality=1,roots=[],vPrev,vClose;function addWinding(v){var o0=v[io+0],o3=v[io+6];if(po<min(o0,o3)||po>max(o0,o3)){return;}var a0=v[ia+0],a1=v[ia+2],a2=v[ia+4],a3=v[ia+6];if(o0===o3){if(a0<paR&&a3>paL||a3<paR&&a0>paL){onPath=true;}return;}var t=po===o0?0:po===o3?1:paL>max(a0,a1,a2,a3)||paR<min(a0,a1,a2,a3)?1:Curve.solveCubic(v,io,po,roots,0,1)>0?roots[0]:1,a=t===0?a0:t===1?a3:Curve.getPoint(v,t)[dir?'y':'x'],winding=o0>o3?1:-1,windingPrev=vPrev[io]>vPrev[io+6]?1:-1,a3Prev=vPrev[ia+6];if(po!==o0){if(a<paL){pathWindingL+=winding;}else if(a>paR){pathWindingR+=winding;}else{onPath=true;}if(a>pa-qualityEpsilon&&a<pa+qualityEpsilon)quality/=2;}else{if(winding!==windingPrev){if(a0<paL){pathWindingL+=winding;}else if(a0>paR){pathWindingR+=winding;}}else if(a0!=a3Prev){if(a3Prev<paR&&a>paR){pathWindingR+=winding;onPath=true;}else if(a3Prev>paL&&a<paL){pathWindingL+=winding;onPath=true;}}quality=0;}vPrev=v;return!dontFlip&&a>paL&&a<paR&&Curve.getTangent(v,t)[dir?'x':'y']===0&&getWinding(point,curves,!dir,closed,true);}function handleCurve(v){var o0=v[io+0],o1=v[io+2],o2=v[io+4],o3=v[io+6];if(po<=max(o0,o1,o2,o3)&&po>=min(o0,o1,o2,o3)){var a0=v[ia+0],a1=v[ia+2],a2=v[ia+4],a3=v[ia+6],monoCurves=paL>max(a0,a1,a2,a3)||paR<min(a0,a1,a2,a3)?[v]:Curve.getMonoCurves(v,dir),res;for(var i=0,l=monoCurves.length;i<l;i++){if(res=addWinding(monoCurves[i]))return res;}}}for(var i=0,l=curves.length;i<l;i++){var curve=curves[i],path=curve._path,v=curve.getValues(),res;if(!i||curves[i-1]._path!==path){vPrev=null;if(!path._closed){vClose=Curve.getValues(path.getLastCurve().getSegment2(),curve.getSegment1(),null,!closed);if(vClose[io]!==vClose[io+6]){vPrev=vClose;}}if(!vPrev){vPrev=v;var prev=path.getLastCurve();while(prev&&prev!==curve){var v2=prev.getValues();if(v2[io]!==v2[io+6]){vPrev=v2;break;}prev=prev.getPrevious();}}}if(res=handleCurve(v))return res;if(i+1===l||curves[i+1]._path!==path){if(vClose&&(res=handleCurve(vClose)))return res;if(onPath&&!pathWindingL&&!pathWindingR){pathWindingL=pathWindingR=path.isClockwise(closed)^dir?1:-1;}windingL+=pathWindingL;windingR+=pathWindingR;pathWindingL=pathWindingR=0;if(onPath){onAnyPath=true;onPath=false;}vClose=null;}}windingL=abs(windingL);windingR=abs(windingR);return{winding:max(windingL,windingR),windingL:windingL,windingR:windingR,quality:quality,onPath:onAnyPath};}function propagateWinding(segment,path1,path2,curves,operator){var chain=[],start=segment,totalLength=0,winding;do{var curve=segment.getCurve(),length=curve.getLength();chain.push({segment:segment,curve:curve,length:length});totalLength+=length;segment=segment.getNext();}while(segment&&!segment._intersection&&segment!==start);var offsets=[0.5,0.25,0.75],winding={winding:0,quality:-1},tMin=1e-8,tMax=1-tMin;for(var i=0;i<offsets.length&&winding.quality<0.5;i++){var length=totalLength*offsets[i];for(var j=0,l=chain.length;j<l;j++){var entry=chain[j],curveLength=entry.length;if(length<=curveLength){var curve=entry.curve,path=curve._path,parent=path._parent,operand=parent instanceof CompoundPath?parent:path,t=Numerical.clamp(curve.getTimeAt(length),tMin,tMax),pt=curve.getPointAtTime(t),dir=abs(curve.getTangentAtTime(t).y)<Math.SQRT1_2;var wind=!(operator.subtract&&path2&&(operand===path1&&path2._getWinding(pt,dir,true).winding||operand===path2&&!path1._getWinding(pt,dir,true).winding))?getWinding(pt,curves,dir,true):{winding:0,quality:1};if(wind.quality>winding.quality)winding=wind;break;}length-=curveLength;}}for(var j=chain.length-1;j>=0;j--){chain[j].segment._winding=winding;}}function tracePaths(segments,operator){var paths=[],starts;function isValid(seg){var winding;return!!(seg&&!seg._visited&&(!operator||operator[(winding=seg._winding||{}).winding]&&!(operator.unite&&winding.winding===2&&winding.windingL&&winding.windingR)));}function isStart(seg){if(seg){for(var i=0,l=starts.length;i<l;i++){if(seg===starts[i])return true;}}return false;}function visitPath(path){var segments=path._segments;for(var i=0,l=segments.length;i<l;i++){segments[i]._visited=true;}}function getCrossingSegments(segment,collectStarts){var inter=segment._intersection,start=inter,crossings=[];if(collectStarts)starts=[segment];function collect(inter,end){while(inter&&inter!==end){var other=inter._segment,path=other._path,next=other.getNext()||path&&path.getFirstSegment(),nextInter=next&&next._intersection;if(other!==segment&&(isStart(other)||isStart(next)||next&&isValid(other)&&(isValid(next)||nextInter&&isValid(nextInter._segment)))){crossings.push(other);}if(collectStarts)starts.push(other);inter=inter._next;}}if(inter){collect(inter);while(inter&&inter._prev){inter=inter._prev;}collect(inter,start);}return crossings;}segments.sort(function(seg1,seg2){var inter1=seg1._intersection,inter2=seg2._intersection,over1=!!(inter1&&inter1._overlap),over2=!!(inter2&&inter2._overlap),path1=seg1._path,path2=seg2._path;return over1^over2?over1?1:-1:!inter1^!inter2?inter1?1:-1:path1!==path2?path1._id-path2._id:seg1._index-seg2._index;});for(var i=0,l=segments.length;i<l;i++){var seg=segments[i],valid=isValid(seg),path=null,finished=false,closed=true,branches=[],branch,visited,handleIn;if(valid&&seg._path._overlapsOnly){var path1=seg._path,path2=seg._intersection._segment._path;if(path1.compare(path2)){if(path1.getArea())paths.push(path1.clone(false));visitPath(path1);visitPath(path2);valid=false;}}while(valid){var first=!path,crossings=getCrossingSegments(seg,first),other=crossings.shift(),finished=!first&&(isStart(seg)||isStart(other)),cross=!finished&&other;if(first){path=new Path(Item.NO_INSERT);branch=null;}if(finished){if(seg.isFirst()||seg.isLast())closed=seg._path._closed;seg._visited=true;break;}if(cross&&branch){branches.push(branch);branch=null;}if(!branch){if(cross)crossings.push(seg);branch={start:path._segments.length,crossings:crossings,visited:visited=[],handleIn:handleIn};}if(cross)seg=other;if(!isValid(seg)){path.removeSegments(branch.start);for(var j=0,k=visited.length;j<k;j++){visited[j]._visited=false;}visited.length=0;do{seg=branch&&branch.crossings.shift();if(!seg){branch=branches.pop();if(branch){visited=branch.visited;handleIn=branch.handleIn;}}}while(branch&&!isValid(seg));if(!seg)break;}var next=seg.getNext();path.add(new Segment(seg._point,handleIn,next&&seg._handleOut));seg._visited=true;visited.push(seg);seg=next||seg._path.getFirstSegment();handleIn=next&&next._handleIn;}if(finished){if(closed){path.getFirstSegment().setHandleIn(handleIn);path.setClosed(closed);}if(path.getArea()!==0){paths.push(path);}}}return paths;}return{_getWinding:function _getWinding(point,dir,closed){return getWinding(point,this.getCurves(),dir,closed);},unite:function unite(path,options){return traceBoolean(this,path,'unite',options);},intersect:function intersect(path,options){return traceBoolean(this,path,'intersect',options);},subtract:function subtract(path,options){return traceBoolean(this,path,'subtract',options);},exclude:function exclude(path,options){return traceBoolean(this,path,'exclude',options);},divide:function divide(path,options){return options&&(options.trace==false||options.stroke)?splitBoolean(this,path,'divide'):createResult([this.subtract(path,options),this.intersect(path,options)],true,this,path,options);},resolveCrossings:function resolveCrossings(){var children=this._children,paths=children||[this];function hasOverlap(seg){var inter=seg&&seg._intersection;return inter&&inter._overlap;}var hasOverlaps=false,hasCrossings=false,intersections=this.getIntersections(null,function(inter){return inter.hasOverlap()&&(hasOverlaps=true)||inter.isCrossing()&&(hasCrossings=true);}),clearCurves=hasOverlaps&&hasCrossings&&[];intersections=CurveLocation.expand(intersections);if(hasOverlaps){var overlaps=divideLocations(intersections,function(inter){return inter.hasOverlap();},clearCurves);for(var i=overlaps.length-1;i>=0;i--){var seg=overlaps[i]._segment,prev=seg.getPrevious(),next=seg.getNext();if(hasOverlap(prev)&&hasOverlap(next)){seg.remove();prev._handleOut._set(0,0);next._handleIn._set(0,0);if(prev!==seg&&!prev.getCurve().hasLength()){next._handleIn.set(prev._handleIn);prev.remove();}}}}if(hasCrossings){divideLocations(intersections,hasOverlaps&&function(inter){var curve1=inter.getCurve(),seg1=inter.getSegment(),other=inter._intersection,curve2=other._curve,seg2=other._segment;if(curve1&&curve2&&curve1._path&&curve2._path)return true;if(seg1)seg1._intersection=null;if(seg2)seg2._intersection=null;},clearCurves);if(clearCurves)clearCurveHandles(clearCurves);paths=tracePaths(Base.each(paths,function(path){this.push.apply(this,path._segments);},[]));}var length=paths.length,item;if(length>1&&children){if(paths!==children)this.setChildren(paths);item=this;}else if(length===1&&!children){if(paths[0]!==this)this.setSegments(paths[0].removeSegments());item=this;}if(!item){item=new CompoundPath(Item.NO_INSERT);item.addChildren(paths);item=item.reduce();item.copyAttributes(this);this.replaceWith(item);}return item;},reorient:function reorient(nonZero,clockwise){var children=this._children;if(children&&children.length){this.setChildren(reorientPaths(this.removeChildren(),function(w){return!!(nonZero?w:w&1);},clockwise));}else if(clockwise!==undefined){this.setClockwise(clockwise);}return this;},getInteriorPoint:function getInteriorPoint(){var bounds=this.getBounds(),point=bounds.getCenter(true);if(!this.contains(point)){var curves=this.getCurves(),y=point.y,intercepts=[],roots=[];for(var i=0,l=curves.length;i<l;i++){var v=curves[i].getValues(),o0=v[1],o1=v[3],o2=v[5],o3=v[7];if(y>=min(o0,o1,o2,o3)&&y<=max(o0,o1,o2,o3)){var monoCurves=Curve.getMonoCurves(v);for(var j=0,m=monoCurves.length;j<m;j++){var mv=monoCurves[j],mo0=mv[1],mo3=mv[7];if(mo0!==mo3&&(y>=mo0&&y<=mo3||y>=mo3&&y<=mo0)){var x=y===mo0?mv[0]:y===mo3?mv[6]:Curve.solveCubic(mv,1,y,roots,0,1)===1?Curve.getPoint(mv,roots[0]).x:(mv[0]+mv[6])/2;intercepts.push(x);}}}}if(intercepts.length>1){intercepts.sort(function(a,b){return a-b;});point.x=(intercepts[0]+intercepts[1])/2;}}return point;}};}());var PathFlattener=Base.extend({_class:'PathFlattener',initialize:function initialize(path,flatness,maxRecursion,ignoreStraight,matrix){var curves=[],parts=[],length=0,minSpan=1/(maxRecursion||32),segments=path._segments,segment1=segments[0],segment2;function addCurve(segment1,segment2){var curve=Curve.getValues(segment1,segment2,matrix);curves.push(curve);computeParts(curve,segment1._index,0,1);}function computeParts(curve,index,t1,t2){if(t2-t1>minSpan&&!(ignoreStraight&&Curve.isStraight(curve))&&!Curve.isFlatEnough(curve,flatness||0.25)){var halves=Curve.subdivide(curve,0.5),tMid=(t1+t2)/2;computeParts(halves[0],index,t1,tMid);computeParts(halves[1],index,tMid,t2);}else{var dx=curve[6]-curve[0],dy=curve[7]-curve[1],dist=Math.sqrt(dx*dx+dy*dy);if(dist>0){length+=dist;parts.push({offset:length,curve:curve,index:index,time:t2});}}}for(var i=1,l=segments.length;i<l;i++){segment2=segments[i];addCurve(segment1,segment2);segment1=segment2;}if(path._closed)addCurve(segment2,segments[0]);this.curves=curves;this.parts=parts;this.length=length;this.index=0;},_get:function _get(offset){var parts=this.parts,length=parts.length,start,i,j=this.index;for(;;){i=j;if(!j||parts[--j].offset<offset)break;}for(;i<length;i++){var part=parts[i];if(part.offset>=offset){this.index=i;var prev=parts[i-1],prevTime=prev&&prev.index===part.index?prev.time:0,prevOffset=prev?prev.offset:0;return{index:part.index,time:prevTime+(part.time-prevTime)*(offset-prevOffset)/(part.offset-prevOffset)};}}return{index:parts[length-1].index,time:1};},drawPart:function drawPart(ctx,from,to){var start=this._get(from),end=this._get(to);for(var i=start.index,l=end.index;i<=l;i++){var curve=Curve.getPart(this.curves[i],i===start.index?start.time:0,i===end.index?end.time:1);if(i===start.index)ctx.moveTo(curve[0],curve[1]);ctx.bezierCurveTo.apply(ctx,curve.slice(2));}}},Base.each(Curve._evaluateMethods,function(name){this[name+'At']=function(offset){var param=this._get(offset);return Curve[name](this.curves[param.index],param.time);};},{}));var PathFitter=Base.extend({initialize:function initialize(path){var points=this.points=[],segments=path._segments,closed=path._closed;for(var i=0,prev,l=segments.length;i<l;i++){var point=segments[i].point;if(!prev||!prev.equals(point)){points.push(prev=point.clone());}}if(closed){points.unshift(points[points.length-1]);points.push(points[1]);}this.closed=closed;},fit:function fit(error){var points=this.points,length=points.length,segments=null;if(length>0){segments=[new Segment(points[0])];if(length>1){this.fitCubic(segments,error,0,length-1,points[1].subtract(points[0]),points[length-2].subtract(points[length-1]));if(this.closed){segments.shift();segments.pop();}}}return segments;},fitCubic:function fitCubic(segments,error,first,last,tan1,tan2){var points=this.points;if(last-first===1){var pt1=points[first],pt2=points[last],dist=pt1.getDistance(pt2)/3;this.addCurve(segments,[pt1,pt1.add(tan1.normalize(dist)),pt2.add(tan2.normalize(dist)),pt2]);return;}var uPrime=this.chordLengthParameterize(first,last),maxError=Math.max(error,error*error),split,parametersInOrder=true;for(var i=0;i<=4;i++){var curve=this.generateBezier(first,last,uPrime,tan1,tan2);var max=this.findMaxError(first,last,curve,uPrime);if(max.error<error&&parametersInOrder){this.addCurve(segments,curve);return;}split=max.index;if(max.error>=maxError)break;parametersInOrder=this.reparameterize(first,last,uPrime,curve);maxError=max.error;}var tanCenter=points[split-1].subtract(points[split+1]);this.fitCubic(segments,error,first,split,tan1,tanCenter);this.fitCubic(segments,error,split,last,tanCenter.negate(),tan2);},addCurve:function addCurve(segments,curve){var prev=segments[segments.length-1];prev.setHandleOut(curve[1].subtract(curve[0]));segments.push(new Segment(curve[3],curve[2].subtract(curve[3])));},generateBezier:function generateBezier(first,last,uPrime,tan1,tan2){var epsilon=1e-12,abs=Math.abs,points=this.points,pt1=points[first],pt2=points[last],C=[[0,0],[0,0]],X=[0,0];for(var i=0,l=last-first+1;i<l;i++){var u=uPrime[i],t=1-u,b=3*u*t,b0=t*t*t,b1=b*t,b2=b*u,b3=u*u*u,a1=tan1.normalize(b1),a2=tan2.normalize(b2),tmp=points[first+i].subtract(pt1.multiply(b0+b1)).subtract(pt2.multiply(b2+b3));C[0][0]+=a1.dot(a1);C[0][1]+=a1.dot(a2);C[1][0]=C[0][1];C[1][1]+=a2.dot(a2);X[0]+=a1.dot(tmp);X[1]+=a2.dot(tmp);}var detC0C1=C[0][0]*C[1][1]-C[1][0]*C[0][1],alpha1,alpha2;if(abs(detC0C1)>epsilon){var detC0X=C[0][0]*X[1]-C[1][0]*X[0],detXC1=X[0]*C[1][1]-X[1]*C[0][1];alpha1=detXC1/detC0C1;alpha2=detC0X/detC0C1;}else{var c0=C[0][0]+C[0][1],c1=C[1][0]+C[1][1];alpha1=alpha2=abs(c0)>epsilon?X[0]/c0:abs(c1)>epsilon?X[1]/c1:0;}var segLength=pt2.getDistance(pt1),eps=epsilon*segLength,handle1,handle2;if(alpha1<eps||alpha2<eps){alpha1=alpha2=segLength/3;}else{var line=pt2.subtract(pt1);handle1=tan1.normalize(alpha1);handle2=tan2.normalize(alpha2);if(handle1.dot(line)-handle2.dot(line)>segLength*segLength){alpha1=alpha2=segLength/3;handle1=handle2=null;}}return[pt1,pt1.add(handle1||tan1.normalize(alpha1)),pt2.add(handle2||tan2.normalize(alpha2)),pt2];},reparameterize:function reparameterize(first,last,u,curve){for(var i=first;i<=last;i++){u[i-first]=this.findRoot(curve,this.points[i],u[i-first]);}for(var i=1,l=u.length;i<l;i++){if(u[i]<=u[i-1])return false;}return true;},findRoot:function findRoot(curve,point,u){var curve1=[],curve2=[];for(var i=0;i<=2;i++){curve1[i]=curve[i+1].subtract(curve[i]).multiply(3);}for(var i=0;i<=1;i++){curve2[i]=curve1[i+1].subtract(curve1[i]).multiply(2);}var pt=this.evaluate(3,curve,u),pt1=this.evaluate(2,curve1,u),pt2=this.evaluate(1,curve2,u),diff=pt.subtract(point),df=pt1.dot(pt1)+diff.dot(pt2);return Numerical.isZero(df)?u:u-diff.dot(pt1)/df;},evaluate:function evaluate(degree,curve,t){var tmp=curve.slice();for(var i=1;i<=degree;i++){for(var j=0;j<=degree-i;j++){tmp[j]=tmp[j].multiply(1-t).add(tmp[j+1].multiply(t));}}return tmp[0];},chordLengthParameterize:function chordLengthParameterize(first,last){var u=[0];for(var i=first+1;i<=last;i++){u[i-first]=u[i-first-1]+this.points[i].getDistance(this.points[i-1]);}for(var i=1,m=last-first;i<=m;i++){u[i]/=u[m];}return u;},findMaxError:function findMaxError(first,last,curve,u){var index=Math.floor((last-first+1)/2),maxDist=0;for(var i=first+1;i<last;i++){var P=this.evaluate(3,curve,u[i-first]);var v=P.subtract(this.points[i]);var dist=v.x*v.x+v.y*v.y;if(dist>=maxDist){maxDist=dist;index=i;}}return{error:maxDist,index:index};}});var TextItem=Item.extend({_class:'TextItem',_applyMatrix:false,_canApplyMatrix:false,_serializeFields:{content:null},_boundsOptions:{stroke:false,handle:false},initialize:function TextItem(arg){this._content='';this._lines=[];var hasProps=arg&&Base.isPlainObject(arg)&&arg.x===undefined&&arg.y===undefined;this._initialize(hasProps&&arg,!hasProps&&Point.read(arguments));},_equals:function _equals(item){return this._content===item._content;},copyContent:function copyContent(source){this.setContent(source._content);},getContent:function getContent(){return this._content;},setContent:function setContent(content){this._content=''+content;this._lines=this._content.split(/\r\n|\n|\r/mg);this._changed(265);},isEmpty:function isEmpty(){return!this._content;},getCharacterStyle:'#getStyle',setCharacterStyle:'#setStyle',getParagraphStyle:'#getStyle',setParagraphStyle:'#setStyle'});var PointText=TextItem.extend({_class:'PointText',initialize:function PointText(){TextItem.apply(this,arguments);},getPoint:function getPoint(){var point=this._matrix.getTranslation();return new LinkedPoint(point.x,point.y,this,'setPoint');},setPoint:function setPoint(){var point=Point.read(arguments);this.translate(point.subtract(this._matrix.getTranslation()));},_draw:function _draw(ctx,param,viewMatrix){if(!this._content)return;this._setStyles(ctx,param,viewMatrix);var lines=this._lines,style=this._style,hasFill=style.hasFill(),hasStroke=style.hasStroke(),leading=style.getLeading(),shadowColor=ctx.shadowColor;ctx.font=style.getFontStyle();ctx.textAlign=style.getJustification();for(var i=0,l=lines.length;i<l;i++){ctx.shadowColor=shadowColor;var line=lines[i];if(hasFill){ctx.fillText(line,0,0);ctx.shadowColor='rgba(0,0,0,0)';}if(hasStroke)ctx.strokeText(line,0,0);ctx.translate(0,leading);}},_getBounds:function _getBounds(matrix,options){var style=this._style,lines=this._lines,numLines=lines.length,justification=style.getJustification(),leading=style.getLeading(),width=this.getView().getTextWidth(style.getFontStyle(),lines),x=0;if(justification!=='left')x-=width/(justification==='center'?2:1);var rect=new _Rectangle(x,numLines?-0.75*leading:0,width,numLines*leading);return matrix?matrix._transformBounds(rect,rect):rect;}});var Color=Base.extend(new function(){var types={gray:['gray'],rgb:['red','green','blue'],hsb:['hue','saturation','brightness'],hsl:['hue','saturation','lightness'],gradient:['gradient','origin','destination','highlight']};var componentParsers={},colorCache={},colorCtx;function fromCSS(string){var match=string.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/),components;if(match){components=[0,0,0];for(var i=0;i<3;i++){var value=match[i+1];components[i]=parseInt(value.length==1?value+value:value,16)/255;}}else if(match=string.match(/^rgba?\((.*)\)$/)){components=match[1].split(',');for(var i=0,l=components.length;i<l;i++){var value=+components[i];components[i]=i<3?value/255:value;}}else if(window){var cached=colorCache[string];if(!cached){if(!colorCtx){colorCtx=CanvasProvider.getContext(1,1);colorCtx.globalCompositeOperation='copy';}colorCtx.fillStyle='rgba(0,0,0,0)';colorCtx.fillStyle=string;colorCtx.fillRect(0,0,1,1);var data=colorCtx.getImageData(0,0,1,1).data;cached=colorCache[string]=[data[0]/255,data[1]/255,data[2]/255];}components=cached.slice();}else{components=[0,0,0];}return components;}var hsbIndices=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]];var converters={'rgb-hsb':function rgbHsb(r,g,b){var max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,h=delta===0?0:(max==r?(g-b)/delta+(g<b?6:0):max==g?(b-r)/delta+2:(r-g)/delta+4)*60;return[h,max===0?0:delta/max,max];},'hsb-rgb':function hsbRgb(h,s,b){h=(h/60%6+6)%6;var i=Math.floor(h),f=h-i,i=hsbIndices[i],v=[b,b*(1-s),b*(1-s*f),b*(1-s*(1-f))];return[v[i[0]],v[i[1]],v[i[2]]];},'rgb-hsl':function rgbHsl(r,g,b){var max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,achromatic=delta===0,h=achromatic?0:(max==r?(g-b)/delta+(g<b?6:0):max==g?(b-r)/delta+2:(r-g)/delta+4)*60,l=(max+min)/2,s=achromatic?0:l<0.5?delta/(max+min):delta/(2-max-min);return[h,s,l];},'hsl-rgb':function hslRgb(h,s,l){h=(h/360%1+1)%1;if(s===0)return[l,l,l];var t3s=[h+1/3,h,h-1/3],t2=l<0.5?l*(1+s):l+s-l*s,t1=2*l-t2,c=[];for(var i=0;i<3;i++){var t3=t3s[i];if(t3<0)t3+=1;if(t3>1)t3-=1;c[i]=6*t3<1?t1+(t2-t1)*6*t3:2*t3<1?t2:3*t3<2?t1+(t2-t1)*(2/3-t3)*6:t1;}return c;},'rgb-gray':function rgbGray(r,g,b){return[r*0.2989+g*0.587+b*0.114];},'gray-rgb':function grayRgb(g){return[g,g,g];},'gray-hsb':function grayHsb(g){return[0,0,g];},'gray-hsl':function grayHsl(g){return[0,0,g];},'gradient-rgb':function gradientRgb(){return[];},'rgb-gradient':function rgbGradient(){return[];}};return Base.each(types,function(properties,type){componentParsers[type]=[];Base.each(properties,function(name,index){var part=Base.capitalize(name),hasOverlap=/^(hue|saturation)$/.test(name),parser=componentParsers[type][index]=name==='gradient'?function(value){var current=this._components[0];value=Gradient.read(Array.isArray(value)?value:arguments,0,{readNull:true});if(current!==value){if(current)current._removeOwner(this);if(value)value._addOwner(this);}return value;}:type==='gradient'?function(){return Point.read(arguments,0,{readNull:name==='highlight',clone:true});}:function(value){return value==null||isNaN(value)?0:value;};this['get'+part]=function(){return this._type===type||hasOverlap&&/^hs[bl]$/.test(this._type)?this._components[index]:this._convert(type)[index];};this['set'+part]=function(value){if(this._type!==type&&!(hasOverlap&&/^hs[bl]$/.test(this._type))){this._components=this._convert(type);this._properties=types[type];this._type=type;}this._components[index]=parser.call(this,value);this._changed();};},this);},{_class:'Color',_readIndex:true,initialize:function Color(arg){var args=arguments,reading=this.__read,read=0,type,components,alpha,values;if(Array.isArray(arg)){args=arg;arg=args[0];}var argType=arg!=null&&(typeof arg==='undefined'?'undefined':(0,_typeof4.default)(arg));if(argType==='string'&&arg in types){type=arg;arg=args[1];if(Array.isArray(arg)){components=arg;alpha=args[2];}else{if(reading)read=1;args=Base.slice(args,1);argType=typeof arg==='undefined'?'undefined':(0,_typeof4.default)(arg);}}if(!components){values=argType==='number'?args:argType==='object'&&arg.length!=null?arg:null;if(values){if(!type)type=values.length>=3?'rgb':'gray';var length=types[type].length;alpha=values[length];if(reading){read+=values===arguments?length+(alpha!=null?1:0):1;}if(values.length>length)values=Base.slice(values,0,length);}else if(argType==='string'){type='rgb';components=fromCSS(arg);if(components.length===4){alpha=components[3];components.length--;}}else if(argType==='object'){if(arg.constructor===Color){type=arg._type;components=arg._components.slice();alpha=arg._alpha;if(type==='gradient'){for(var i=1,l=components.length;i<l;i++){var point=components[i];if(point)components[i]=point.clone();}}}else if(arg.constructor===Gradient){type='gradient';values=args;}else{type='hue'in arg?'lightness'in arg?'hsl':'hsb':'gradient'in arg||'stops'in arg||'radial'in arg?'gradient':'gray'in arg?'gray':'rgb';var properties=types[type],parsers=componentParsers[type];this._components=components=[];for(var i=0,l=properties.length;i<l;i++){var value=arg[properties[i]];if(value==null&&!i&&type==='gradient'&&'stops'in arg){value={stops:arg.stops,radial:arg.radial};}value=parsers[i].call(this,value);if(value!=null)components[i]=value;}alpha=arg.alpha;}}if(reading&&type)read=1;}this._type=type||'rgb';if(!components){this._components=components=[];var parsers=componentParsers[this._type];for(var i=0,l=parsers.length;i<l;i++){var value=parsers[i].call(this,values&&values[i]);if(value!=null)components[i]=value;}}this._components=components;this._properties=types[this._type];this._alpha=alpha;if(reading)this.__read=read;return this;},set:'#initialize',_serialize:function _serialize(options,dictionary){var components=this.getComponents();return Base.serialize(/^(gray|rgb)$/.test(this._type)?components:[this._type].concat(components),options,true,dictionary);},_changed:function _changed(){this._canvasStyle=null;if(this._owner)this._owner._changed(65);},_convert:function _convert(type){var converter;return this._type===type?this._components.slice():(converter=converters[this._type+'-'+type])?converter.apply(this,this._components):converters['rgb-'+type].apply(this,converters[this._type+'-rgb'].apply(this,this._components));},convert:function convert(type){return new Color(type,this._convert(type),this._alpha);},getType:function getType(){return this._type;},setType:function setType(type){this._components=this._convert(type);this._properties=types[type];this._type=type;},getComponents:function getComponents(){var components=this._components.slice();if(this._alpha!=null)components.push(this._alpha);return components;},getAlpha:function getAlpha(){return this._alpha!=null?this._alpha:1;},setAlpha:function setAlpha(alpha){this._alpha=alpha==null?null:Math.min(Math.max(alpha,0),1);this._changed();},hasAlpha:function hasAlpha(){return this._alpha!=null;},equals:function equals(color){var col=Base.isPlainValue(color,true)?Color.read(arguments):color;return col===this||col&&this._class===col._class&&this._type===col._type&&this.getAlpha()===col.getAlpha()&&Base.equals(this._components,col._components)||false;},toString:function toString(){var properties=this._properties,parts=[],isGradient=this._type==='gradient',f=Formatter.instance;for(var i=0,l=properties.length;i<l;i++){var value=this._components[i];if(value!=null)parts.push(properties[i]+': '+(isGradient?value:f.number(value)));}if(this._alpha!=null)parts.push('alpha: '+f.number(this._alpha));return'{ '+parts.join(', ')+' }';},toCSS:function toCSS(hex){var components=this._convert('rgb'),alpha=hex||this._alpha==null?1:this._alpha;function convert(val){return Math.round((val<0?0:val>1?1:val)*255);}components=[convert(components[0]),convert(components[1]),convert(components[2])];if(alpha<1)components.push(alpha<0?0:alpha);return hex?'#'+((1<<24)+(components[0]<<16)+(components[1]<<8)+components[2]).toString(16).slice(1):(components.length==4?'rgba(':'rgb(')+components.join(',')+')';},toCanvasStyle:function toCanvasStyle(ctx,matrix){if(this._canvasStyle)return this._canvasStyle;if(this._type!=='gradient')return this._canvasStyle=this.toCSS();var components=this._components,gradient=components[0],stops=gradient._stops,origin=components[1],destination=components[2],highlight=components[3],inverse=matrix&&matrix.inverted(),canvasGradient;if(inverse){origin=inverse._transformPoint(origin);destination=inverse._transformPoint(destination);if(highlight)highlight=inverse._transformPoint(highlight);}if(gradient._radial){var radius=destination.getDistance(origin);if(highlight){var vector=highlight.subtract(origin);if(vector.getLength()>radius)highlight=origin.add(vector.normalize(radius-0.1));}var start=highlight||origin;canvasGradient=ctx.createRadialGradient(start.x,start.y,0,origin.x,origin.y,radius);}else{canvasGradient=ctx.createLinearGradient(origin.x,origin.y,destination.x,destination.y);}for(var i=0,l=stops.length;i<l;i++){var stop=stops[i],offset=stop._offset;canvasGradient.addColorStop(offset==null?i/(l-1):offset,stop._color.toCanvasStyle());}return this._canvasStyle=canvasGradient;},transform:function transform(matrix){if(this._type==='gradient'){var components=this._components;for(var i=1,l=components.length;i<l;i++){var point=components[i];matrix._transformPoint(point,point,true);}this._changed();}},statics:{_types:types,random:function random(){var random=Math.random;return new Color(random(),random(),random());}}});}(),new function(){var operators={add:function add(a,b){return a+b;},subtract:function subtract(a,b){return a-b;},multiply:function multiply(a,b){return a*b;},divide:function divide(a,b){return a/b;}};return Base.each(operators,function(operator,name){this[name]=function(color){color=Color.read(arguments);var type=this._type,components1=this._components,components2=color._convert(type);for(var i=0,l=components1.length;i<l;i++){components2[i]=operator(components1[i],components2[i]);}return new Color(type,components2,this._alpha!=null?operator(this._alpha,color.getAlpha()):null);};},{});}());var Gradient=Base.extend({_class:'Gradient',initialize:function Gradient(stops,radial){this._id=UID.get();if(stops&&Base.isPlainObject(stops)){this.set(stops);stops=radial=null;}if(this._stops==null){this.setStops(stops||['white','black']);}if(this._radial==null){this.setRadial(typeof radial==='string'&&radial==='radial'||radial||false);}},_serialize:function _serialize(options,dictionary){return dictionary.add(this,function(){return Base.serialize([this._stops,this._radial],options,true,dictionary);});},_changed:function _changed(){for(var i=0,l=this._owners&&this._owners.length;i<l;i++){this._owners[i]._changed();}},_addOwner:function _addOwner(color){if(!this._owners)this._owners=[];this._owners.push(color);},_removeOwner:function _removeOwner(color){var index=this._owners?this._owners.indexOf(color):-1;if(index!=-1){this._owners.splice(index,1);if(!this._owners.length)this._owners=undefined;}},clone:function clone(){var stops=[];for(var i=0,l=this._stops.length;i<l;i++){stops[i]=this._stops[i].clone();}return new Gradient(stops,this._radial);},getStops:function getStops(){return this._stops;},setStops:function setStops(stops){if(stops.length<2){throw new Error('Gradient stop list needs to contain at least two stops.');}var _stops=this._stops;if(_stops){for(var i=0,l=_stops.length;i<l;i++){_stops[i]._owner=undefined;}}_stops=this._stops=GradientStop.readList(stops,0,{clone:true});for(var i=0,l=_stops.length;i<l;i++){_stops[i]._owner=this;}this._changed();},getRadial:function getRadial(){return this._radial;},setRadial:function setRadial(radial){this._radial=radial;this._changed();},equals:function equals(gradient){if(gradient===this)return true;if(gradient&&this._class===gradient._class){var stops1=this._stops,stops2=gradient._stops,length=stops1.length;if(length===stops2.length){for(var i=0;i<length;i++){if(!stops1[i].equals(stops2[i]))return false;}return true;}}return false;}});var GradientStop=Base.extend({_class:'GradientStop',initialize:function GradientStop(arg0,arg1){var color=arg0,offset=arg1;if((typeof arg0==='undefined'?'undefined':(0,_typeof4.default)(arg0))==='object'&&arg1===undefined){if(Array.isArray(arg0)&&typeof arg0[0]!=='number'){color=arg0[0];offset=arg0[1];}else if('color'in arg0||'offset'in arg0||'rampPoint'in arg0){color=arg0.color;offset=arg0.offset||arg0.rampPoint||0;}}this.setColor(color);this.setOffset(offset);},clone:function clone(){return new GradientStop(this._color.clone(),this._offset);},_serialize:function _serialize(options,dictionary){var color=this._color,offset=this._offset;return Base.serialize(offset==null?[color]:[color,offset],options,true,dictionary);},_changed:function _changed(){if(this._owner)this._owner._changed(65);},getOffset:function getOffset(){return this._offset;},setOffset:function setOffset(offset){this._offset=offset;this._changed();},getRampPoint:'#getOffset',setRampPoint:'#setOffset',getColor:function getColor(){return this._color;},setColor:function setColor(){var color=Color.read(arguments,0,{clone:true});if(color)color._owner=this;this._color=color;this._changed();},equals:function equals(stop){return stop===this||stop&&this._class===stop._class&&this._color.equals(stop._color)&&this._offset==stop._offset||false;}});var Style=Base.extend(new function(){var itemDefaults={fillColor:null,fillRule:'nonzero',strokeColor:null,strokeWidth:1,strokeCap:'butt',strokeJoin:'miter',strokeScaling:true,miterLimit:10,dashOffset:0,dashArray:[],shadowColor:null,shadowBlur:0,shadowOffset:new Point(),selectedColor:null},groupDefaults=Base.set({},itemDefaults,{fontFamily:'sans-serif',fontWeight:'normal',fontSize:12,leading:null,justification:'left'}),textDefaults=Base.set({},groupDefaults,{fillColor:new Color()}),flags={strokeWidth:97,strokeCap:97,strokeJoin:97,strokeScaling:105,miterLimit:97,fontFamily:9,fontWeight:9,fontSize:9,font:9,leading:9,justification:9},item={beans:true},fields={_class:'Style',beans:true,initialize:function Style(style,_owner,_project){this._values={};this._owner=_owner;this._project=_owner&&_owner._project||_project||paper.project;this._defaults=!_owner||_owner instanceof Group?groupDefaults:_owner instanceof TextItem?textDefaults:itemDefaults;if(style)this.set(style);}};Base.each(groupDefaults,function(value,key){var isColor=/Color$/.test(key),isPoint=key==='shadowOffset',part=Base.capitalize(key),flag=flags[key],set='set'+part,get='get'+part;fields[set]=function(value){var owner=this._owner,children=owner&&owner._children;if(children&&children.length>0&&!(owner instanceof CompoundPath)){for(var i=0,l=children.length;i<l;i++){children[i]._style[set](value);}}else if(key in this._defaults){var old=this._values[key];if(old!==value){if(isColor){if(old&&old._owner!==undefined)old._owner=undefined;if(value&&value.constructor===Color){if(value._owner)value=value.clone();value._owner=owner;}}this._values[key]=value;if(owner)owner._changed(flag||65);}}};fields[get]=function(_dontMerge){var owner=this._owner,children=owner&&owner._children,value;if(key in this._defaults&&(!children||!children.length||_dontMerge||owner instanceof CompoundPath)){var value=this._values[key];if(value===undefined){value=this._defaults[key];if(value&&value.clone)value=value.clone();}else{var ctor=isColor?Color:isPoint?Point:null;if(ctor&&!(value&&value.constructor===ctor)){this._values[key]=value=ctor.read([value],0,{readNull:true,clone:true});if(value&&isColor)value._owner=owner;}}}else if(children){for(var i=0,l=children.length;i<l;i++){var childValue=children[i]._style[get]();if(!i){value=childValue;}else if(!Base.equals(value,childValue)){return undefined;}}}return value;};item[get]=function(_dontMerge){return this._style[get](_dontMerge);};item[set]=function(value){this._style[set](value);};});Base.each({Font:'FontFamily',WindingRule:'FillRule'},function(value,key){var get='get'+key,set='set'+key;fields[get]=item[get]='#get'+value;fields[set]=item[set]='#set'+value;});Item.inject(item);return fields;}(),{set:function set(style){var isStyle=style instanceof Style,values=isStyle?style._values:style;if(values){for(var key in values){if(key in this._defaults){var value=values[key];this[key]=value&&isStyle&&value.clone?value.clone():value;}}}},equals:function equals(style){function compare(style1,style2,secondary){var values1=style1._values,values2=style2._values,defaults2=style2._defaults;for(var key in values1){var value1=values1[key],value2=values2[key];if(!(secondary&&key in values2)&&!Base.equals(value1,value2===undefined?defaults2[key]:value2))return false;}return true;}return style===this||style&&this._class===style._class&&compare(this,style)&&compare(style,this,true)||false;},hasFill:function hasFill(){var color=this.getFillColor();return!!color&&color.alpha>0;},hasStroke:function hasStroke(){var color=this.getStrokeColor();return!!color&&color.alpha>0&&this.getStrokeWidth()>0;},hasShadow:function hasShadow(){var color=this.getShadowColor();return!!color&&color.alpha>0&&(this.getShadowBlur()>0||!this.getShadowOffset().isZero());},getView:function getView(){return this._project._view;},getFontStyle:function getFontStyle(){var fontSize=this.getFontSize();return this.getFontWeight()+' '+fontSize+(/[a-z]/i.test(fontSize+'')?' ':'px ')+this.getFontFamily();},getFont:'#getFontFamily',setFont:'#setFontFamily',getLeading:function getLeading(){var leading=getLeading.base.call(this),fontSize=this.getFontSize();if(/pt|em|%|px/.test(fontSize))fontSize=this.getView().getPixelSize(fontSize);return leading!=null?leading:fontSize*1.2;}});var DomElement=new function(){function handlePrefix(el,name,set,value){var prefixes=['','webkit','moz','Moz','ms','o'],suffix=name[0].toUpperCase()+name.substring(1);for(var i=0;i<6;i++){var prefix=prefixes[i],key=prefix?prefix+suffix:name;if(key in el){if(set){el[key]=value;}else{return el[key];}break;}}}return{getStyles:function getStyles(el){var doc=el&&el.nodeType!==9?el.ownerDocument:el,view=doc&&doc.defaultView;return view&&view.getComputedStyle(el,'');},getBounds:function getBounds(el,viewport){var doc=el.ownerDocument,body=doc.body,html=doc.documentElement,rect;try{rect=el.getBoundingClientRect();}catch(e){rect={left:0,top:0,width:0,height:0};}var x=rect.left-(html.clientLeft||body.clientLeft||0),y=rect.top-(html.clientTop||body.clientTop||0);if(!viewport){var view=doc.defaultView;x+=view.pageXOffset||html.scrollLeft||body.scrollLeft;y+=view.pageYOffset||html.scrollTop||body.scrollTop;}return new _Rectangle(x,y,rect.width,rect.height);},getViewportBounds:function getViewportBounds(el){var doc=el.ownerDocument,view=doc.defaultView,html=doc.documentElement;return new _Rectangle(0,0,view.innerWidth||html.clientWidth,view.innerHeight||html.clientHeight);},getOffset:function getOffset(el,viewport){return DomElement.getBounds(el,viewport).getPoint();},getSize:function getSize(el){return DomElement.getBounds(el,true).getSize();},isInvisible:function isInvisible(el){return DomElement.getSize(el).equals(new Size(0,0));},isInView:function isInView(el){return!DomElement.isInvisible(el)&&DomElement.getViewportBounds(el).intersects(DomElement.getBounds(el,true));},isInserted:function isInserted(el){return document.body.contains(el);},getPrefixed:function getPrefixed(el,name){return el&&handlePrefix(el,name);},setPrefixed:function setPrefixed(el,name,value){if((typeof name==='undefined'?'undefined':(0,_typeof4.default)(name))==='object'){for(var key in name){handlePrefix(el,key,true,name[key]);}}else{handlePrefix(el,name,true,value);}}};}();var DomEvent={add:function add(el,events){if(el){for(var type in events){var func=events[type],parts=type.split(/[\s,]+/g);for(var i=0,l=parts.length;i<l;i++){el.addEventListener(parts[i],func,false);}}}},remove:function remove(el,events){if(el){for(var type in events){var func=events[type],parts=type.split(/[\s,]+/g);for(var i=0,l=parts.length;i<l;i++){el.removeEventListener(parts[i],func,false);}}}},getPoint:function getPoint(event){var pos=event.targetTouches?event.targetTouches.length?event.targetTouches[0]:event.changedTouches[0]:event;return new Point(pos.pageX||pos.clientX+document.documentElement.scrollLeft,pos.pageY||pos.clientY+document.documentElement.scrollTop);},getTarget:function getTarget(event){return event.target||event.srcElement;},getRelatedTarget:function getRelatedTarget(event){return event.relatedTarget||event.toElement;},getOffset:function getOffset(event,target){return DomEvent.getPoint(event).subtract(DomElement.getOffset(target||DomEvent.getTarget(event)));}};DomEvent.requestAnimationFrame=new function(){var nativeRequest=DomElement.getPrefixed(window,'requestAnimationFrame'),requested=false,callbacks=[],timer;function handleCallbacks(){var functions=callbacks;callbacks=[];for(var i=0,l=functions.length;i<l;i++){functions[i]();}requested=nativeRequest&&callbacks.length;if(requested)nativeRequest(handleCallbacks);}return function(callback){callbacks.push(callback);if(nativeRequest){if(!requested){nativeRequest(handleCallbacks);requested=true;}}else if(!timer){timer=setInterval(handleCallbacks,1000/60);}};}();var View=Base.extend(Emitter,{_class:'View',initialize:function View(project,element){function getSize(name){return element[name]||parseInt(element.getAttribute(name),10);}function getCanvasSize(){var size=DomElement.getSize(element);return size.isNaN()||size.isZero()?new Size(getSize('width'),getSize('height')):size;}var size;if(window&&element){this._id=element.getAttribute('id');if(this._id==null)element.setAttribute('id',this._id='view-'+View._id++);DomEvent.add(element,this._viewEvents);var none='none';DomElement.setPrefixed(element.style,{userDrag:none,userSelect:none,touchCallout:none,contentZooming:none,tapHighlightColor:'rgba(0,0,0,0)'});if(PaperScope.hasAttribute(element,'resize')){var that=this;DomEvent.add(window,this._windowEvents={resize:function resize(){that.setViewSize(getCanvasSize());}});}size=getCanvasSize();if(PaperScope.hasAttribute(element,'stats')&&typeof Stats!=='undefined'){this._stats=new Stats();var stats=this._stats.domElement,style=stats.style,offset=DomElement.getOffset(element);style.position='absolute';style.left=offset.x+'px';style.top=offset.y+'px';document.body.appendChild(stats);}}else{size=new Size(element);element=null;}this._project=project;this._scope=project._scope;this._element=element;if(!this._pixelRatio)this._pixelRatio=window&&window.devicePixelRatio||1;this._setElementSize(size.width,size.height);this._viewSize=size;View._views.push(this);View._viewsById[this._id]=this;(this._matrix=new Matrix())._owner=this;if(!View._focused)View._focused=this;this._frameItems={};this._frameItemCount=0;this._itemEvents={native:{},virtual:{}};this._autoUpdate=!paper.agent.node;this._needsUpdate=false;},remove:function remove(){if(!this._project)return false;if(View._focused===this)View._focused=null;View._views.splice(View._views.indexOf(this),1);delete View._viewsById[this._id];var project=this._project;if(project._view===this)project._view=null;DomEvent.remove(this._element,this._viewEvents);DomEvent.remove(window,this._windowEvents);this._element=this._project=null;this.off('frame');this._animate=false;this._frameItems={};return true;},_events:Base.each(Item._itemHandlers.concat(['onResize','onKeyDown','onKeyUp']),function(name){this[name]={};},{onFrame:{install:function install(){this.play();},uninstall:function uninstall(){this.pause();}}}),_animate:false,_time:0,_count:0,getAutoUpdate:function getAutoUpdate(){return this._autoUpdate;},setAutoUpdate:function setAutoUpdate(autoUpdate){this._autoUpdate=autoUpdate;if(autoUpdate)this.requestUpdate();},update:function update(){},draw:function draw(){this.update();},requestUpdate:function requestUpdate(){if(!this._requested){var that=this;DomEvent.requestAnimationFrame(function(){that._requested=false;if(that._animate){that.requestUpdate();var element=that._element;if((!DomElement.getPrefixed(document,'hidden')||PaperScope.getAttribute(element,'keepalive')==='true')&&DomElement.isInView(element)){that._handleFrame();}}if(that._autoUpdate)that.update();});this._requested=true;}},play:function play(){this._animate=true;this.requestUpdate();},pause:function pause(){this._animate=false;},_handleFrame:function _handleFrame(){paper=this._scope;var now=Date.now()/1000,delta=this._last?now-this._last:0;this._last=now;this.emit('frame',new Base({delta:delta,time:this._time+=delta,count:this._count++}));if(this._stats)this._stats.update();},_animateItem:function _animateItem(item,animate){var items=this._frameItems;if(animate){items[item._id]={item:item,time:0,count:0};if(++this._frameItemCount===1)this.on('frame',this._handleFrameItems);}else{delete items[item._id];if(--this._frameItemCount===0){this.off('frame',this._handleFrameItems);}}},_handleFrameItems:function _handleFrameItems(event){for(var i in this._frameItems){var entry=this._frameItems[i];entry.item.emit('frame',new Base(event,{time:entry.time+=event.delta,count:entry.count++}));}},_changed:function _changed(){this._project._changed(2049);this._bounds=this._decomposed=undefined;},getElement:function getElement(){return this._element;},getPixelRatio:function getPixelRatio(){return this._pixelRatio;},getResolution:function getResolution(){return this._pixelRatio*72;},getViewSize:function getViewSize(){var size=this._viewSize;return new LinkedSize(size.width,size.height,this,'setViewSize');},setViewSize:function setViewSize(){var size=Size.read(arguments),delta=size.subtract(this._viewSize);if(delta.isZero())return;this._setElementSize(size.width,size.height);this._viewSize.set(size);this._changed();this.emit('resize',{size:size,delta:delta});if(this._autoUpdate){this.update();}},_setElementSize:function _setElementSize(width,height){var element=this._element;if(element){if(element.width!==width)element.width=width;if(element.height!==height)element.height=height;}},getBounds:function getBounds(){if(!this._bounds)this._bounds=this._matrix.inverted()._transformBounds(new _Rectangle(new Point(),this._viewSize));return this._bounds;},getSize:function getSize(){return this.getBounds().getSize();},isVisible:function isVisible(){return DomElement.isInView(this._element);},isInserted:function isInserted(){return DomElement.isInserted(this._element);},getPixelSize:function getPixelSize(size){var element=this._element,pixels;if(element){var parent=element.parentNode,temp=document.createElement('div');temp.style.fontSize=size;parent.appendChild(temp);pixels=parseFloat(DomElement.getStyles(temp).fontSize);parent.removeChild(temp);}else{pixels=parseFloat(pixels);}return pixels;},getTextWidth:function getTextWidth(font,lines){return 0;}},Base.each(['rotate','scale','shear','skew'],function(key){var rotate=key==='rotate';this[key]=function(){var value=(rotate?Base:Point).read(arguments),center=Point.read(arguments,0,{readNull:true});return this.transform(new Matrix()[key](value,center||this.getCenter(true)));};},{_decompose:function _decompose(){return this._decomposed||(this._decomposed=this._matrix.decompose());},translate:function translate(){var mx=new Matrix();return this.transform(mx.translate.apply(mx,arguments));},getCenter:function getCenter(){return this.getBounds().getCenter();},setCenter:function setCenter(){var center=Point.read(arguments);this.translate(this.getCenter().subtract(center));},getZoom:function getZoom(){var decomposed=this._decompose(),scaling=decomposed&&decomposed.scaling;return scaling?(scaling.x+scaling.y)/2:0;},setZoom:function setZoom(zoom){this.transform(new Matrix().scale(zoom/this.getZoom(),this.getCenter()));},getRotation:function getRotation(){var decomposed=this._decompose();return decomposed&&decomposed.rotation;},setRotation:function setRotation(rotation){var current=this.getRotation();if(current!=null&&rotation!=null){this.rotate(rotation-current);}},getScaling:function getScaling(){var decomposed=this._decompose(),scaling=decomposed&&decomposed.scaling;return scaling?new LinkedPoint(scaling.x,scaling.y,this,'setScaling'):undefined;},setScaling:function setScaling(){var current=this.getScaling(),scaling=Point.read(arguments,0,{clone:true,readNull:true});if(current&&scaling){this.scale(scaling.x/current.x,scaling.y/current.y);}},getMatrix:function getMatrix(){return this._matrix;},setMatrix:function setMatrix(){var matrix=this._matrix;matrix.initialize.apply(matrix,arguments);},transform:function transform(matrix){this._matrix.append(matrix);},scrollBy:function scrollBy(){this.translate(Point.read(arguments).negate());}}),{projectToView:function projectToView(){return this._matrix._transformPoint(Point.read(arguments));},viewToProject:function viewToProject(){return this._matrix._inverseTransform(Point.read(arguments));},getEventPoint:function getEventPoint(event){return this.viewToProject(DomEvent.getOffset(event,this._element));}},{statics:{_views:[],_viewsById:{},_id:0,create:function create(project,element){if(document&&typeof element==='string')element=document.getElementById(element);var ctor=window?CanvasView:View;return new ctor(project,element);}}},new function(){if(!window)return;var prevFocus,tempFocus,dragging=false,mouseDown=false;function getView(event){var target=DomEvent.getTarget(event);return target.getAttribute&&View._viewsById[target.getAttribute('id')];}function updateFocus(){var view=View._focused;if(!view||!view.isVisible()){for(var i=0,l=View._views.length;i<l;i++){if((view=View._views[i]).isVisible()){View._focused=tempFocus=view;break;}}}}function handleMouseMove(view,event,point){view._handleMouseEvent('mousemove',event,point);}var navigator=window.navigator,mousedown,mousemove,mouseup;if(navigator.pointerEnabled||navigator.msPointerEnabled){mousedown='pointerdown MSPointerDown';mousemove='pointermove MSPointerMove';mouseup='pointerup pointercancel MSPointerUp MSPointerCancel';}else{mousedown='touchstart';mousemove='touchmove';mouseup='touchend touchcancel';if(!('ontouchstart'in window&&navigator.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i))){mousedown+=' mousedown';mousemove+=' mousemove';mouseup+=' mouseup';}}var viewEvents={},docEvents={mouseout:function mouseout(event){var view=View._focused,target=DomEvent.getRelatedTarget(event);if(view&&(!target||target.nodeName==='HTML')){var offset=DomEvent.getOffset(event,view._element),x=offset.x,abs=Math.abs,ax=abs(x),max=1<<25,diff=ax-max;offset.x=abs(diff)<ax?diff*(x<0?-1:1):x;handleMouseMove(view,event,view.viewToProject(offset));}},scroll:updateFocus};viewEvents[mousedown]=function(event){var view=View._focused=getView(event);if(!dragging){dragging=true;view._handleMouseEvent('mousedown',event);}};docEvents[mousemove]=function(event){var view=View._focused;if(!mouseDown){var target=getView(event);if(target){if(view!==target){if(view)handleMouseMove(view,event);if(!prevFocus)prevFocus=view;view=View._focused=tempFocus=target;}}else if(tempFocus&&tempFocus===view){if(prevFocus&&!prevFocus.isInserted())prevFocus=null;view=View._focused=prevFocus;prevFocus=null;updateFocus();}}if(view)handleMouseMove(view,event);};docEvents[mousedown]=function(){mouseDown=true;};docEvents[mouseup]=function(event){var view=View._focused;if(view&&dragging)view._handleMouseEvent('mouseup',event);mouseDown=dragging=false;};DomEvent.add(document,docEvents);DomEvent.add(window,{load:updateFocus});var called=false,prevented=false,fallbacks={doubleclick:'click',mousedrag:'mousemove'},wasInView=false,overView,downPoint,lastPoint,downItem,overItem,dragItem,clickItem,clickTime,dblClick;function emitMouseEvent(obj,target,type,event,point,prevPoint,stopItem){var stopped=false,mouseEvent;function emit(obj,type){if(obj.responds(type)){if(!mouseEvent){mouseEvent=new MouseEvent(type,event,point,target||obj,prevPoint?point.subtract(prevPoint):null);}if(obj.emit(type,mouseEvent)){called=true;if(mouseEvent.prevented)prevented=true;if(mouseEvent.stopped)return stopped=true;}}else{var fallback=fallbacks[type];if(fallback)return emit(obj,fallback);}}while(obj&&obj!==stopItem){if(emit(obj,type))break;obj=obj._parent;}return stopped;}function emitMouseEvents(view,hitItem,type,event,point,prevPoint){view._project.removeOn(type);prevented=called=false;return dragItem&&emitMouseEvent(dragItem,null,type,event,point,prevPoint)||hitItem&&hitItem!==dragItem&&!hitItem.isDescendant(dragItem)&&emitMouseEvent(hitItem,null,type,event,point,prevPoint,dragItem)||emitMouseEvent(view,dragItem||hitItem||view,type,event,point,prevPoint);}var itemEventsMap={mousedown:{mousedown:1,mousedrag:1,click:1,doubleclick:1},mouseup:{mouseup:1,mousedrag:1,click:1,doubleclick:1},mousemove:{mousedrag:1,mousemove:1,mouseenter:1,mouseleave:1}};return{_viewEvents:viewEvents,_handleMouseEvent:function _handleMouseEvent(type,event,point){var itemEvents=this._itemEvents,hitItems=itemEvents.native[type],nativeMove=type==='mousemove',tool=this._scope.tool,view=this;function responds(type){return itemEvents.virtual[type]||view.responds(type)||tool&&tool.responds(type);}if(nativeMove&&dragging&&responds('mousedrag'))type='mousedrag';if(!point)point=this.getEventPoint(event);var inView=this.getBounds().contains(point),hit=hitItems&&inView&&view._project.hitTest(point,{tolerance:0,fill:true,stroke:true}),hitItem=hit&&hit.item||null,handle=false,mouse={};mouse[type.substr(5)]=true;if(hitItems&&hitItem!==overItem){if(overItem){emitMouseEvent(overItem,null,'mouseleave',event,point);}if(hitItem){emitMouseEvent(hitItem,null,'mouseenter',event,point);}overItem=hitItem;}if(wasInView^inView){emitMouseEvent(this,null,inView?'mouseenter':'mouseleave',event,point);overView=inView?this:null;handle=true;}if((inView||mouse.drag)&&!point.equals(lastPoint)){emitMouseEvents(this,hitItem,nativeMove?type:'mousemove',event,point,lastPoint);handle=true;}wasInView=inView;if(mouse.down&&inView||mouse.up&&downPoint){emitMouseEvents(this,hitItem,type,event,point,downPoint);if(mouse.down){dblClick=hitItem===clickItem&&Date.now()-clickTime<300;downItem=clickItem=hitItem;if(!prevented&&hitItem){var item=hitItem;while(item&&!item.responds('mousedrag')){item=item._parent;}if(item)dragItem=hitItem;}downPoint=point;}else if(mouse.up){if(!prevented&&hitItem===downItem){clickTime=Date.now();emitMouseEvents(this,hitItem,dblClick?'doubleclick':'click',event,point,downPoint);dblClick=false;}downItem=dragItem=null;}wasInView=false;handle=true;}lastPoint=point;if(handle&&tool){called=tool._handleMouseEvent(type,event,point,mouse)||called;}if(called&&!mouse.move||mouse.down&&responds('mouseup'))event.preventDefault();},_handleKeyEvent:function _handleKeyEvent(type,event,key,character){var scope=this._scope,tool=scope.tool,keyEvent;function emit(obj){if(obj.responds(type)){paper=scope;obj.emit(type,keyEvent=keyEvent||new KeyEvent(type,event,key,character));}}if(this.isVisible()){emit(this);if(tool&&tool.responds(type))emit(tool);}},_countItemEvent:function _countItemEvent(type,sign){var itemEvents=this._itemEvents,native=itemEvents.native,virtual=itemEvents.virtual;for(var key in itemEventsMap){native[key]=(native[key]||0)+(itemEventsMap[key][type]||0)*sign;}virtual[type]=(virtual[type]||0)+sign;},statics:{updateFocus:updateFocus}};}());var CanvasView=View.extend({_class:'CanvasView',initialize:function CanvasView(project,canvas){if(!(canvas instanceof window.HTMLCanvasElement)){var size=Size.read(arguments,1);if(size.isZero())throw new Error('Cannot create CanvasView with the provided argument: '+Base.slice(arguments,1));canvas=CanvasProvider.getCanvas(size);}var ctx=this._context=canvas.getContext('2d');ctx.save();this._pixelRatio=1;if(!/^off|false$/.test(PaperScope.getAttribute(canvas,'hidpi'))){var deviceRatio=window.devicePixelRatio||1,backingStoreRatio=DomElement.getPrefixed(ctx,'backingStorePixelRatio')||1;this._pixelRatio=deviceRatio/backingStoreRatio;}View.call(this,project,canvas);this._needsUpdate=true;},remove:function remove(){this._context.restore();return remove.base.call(this);},_setElementSize:function _setElementSize(width,height){var pixelRatio=this._pixelRatio;_setElementSize.base.call(this,width*pixelRatio,height*pixelRatio);if(pixelRatio!==1){var element=this._element,ctx=this._context;if(!PaperScope.hasAttribute(element,'resize')){var style=element.style;style.width=width+'px';style.height=height+'px';}ctx.restore();ctx.save();ctx.scale(pixelRatio,pixelRatio);}},getPixelSize:function getPixelSize(size){var agent=paper.agent,pixels;if(agent&&agent.firefox){pixels=getPixelSize.base.call(this,size);}else{var ctx=this._context,prevFont=ctx.font;ctx.font=size+' serif';pixels=parseFloat(ctx.font);ctx.font=prevFont;}return pixels;},getTextWidth:function getTextWidth(font,lines){var ctx=this._context,prevFont=ctx.font,width=0;ctx.font=font;for(var i=0,l=lines.length;i<l;i++){width=Math.max(width,ctx.measureText(lines[i]).width);}ctx.font=prevFont;return width;},update:function update(){if(!this._needsUpdate)return false;var project=this._project,ctx=this._context,size=this._viewSize;ctx.clearRect(0,0,size.width+1,size.height+1);if(project)project.draw(ctx,this._matrix,this._pixelRatio);this._needsUpdate=false;return true;}});var Event=Base.extend({_class:'Event',initialize:function Event(event){this.event=event;this.type=event&&event.type;},prevented:false,stopped:false,preventDefault:function preventDefault(){this.prevented=true;this.event.preventDefault();},stopPropagation:function stopPropagation(){this.stopped=true;this.event.stopPropagation();},stop:function stop(){this.stopPropagation();this.preventDefault();},getTimeStamp:function getTimeStamp(){return this.event.timeStamp;},getModifiers:function getModifiers(){return Key.modifiers;}});var KeyEvent=Event.extend({_class:'KeyEvent',initialize:function KeyEvent(type,event,key,character){this.type=type;this.event=event;this.key=key;this.character=character;},toString:function toString(){return"{ type: '"+this.type+"', key: '"+this.key+"', character: '"+this.character+"', modifiers: "+this.getModifiers()+" }";}});var Key=new function(){var keyLookup={'\t':'tab',' ':'space','\b':'backspace','\x7f':'delete','Spacebar':'space','Del':'delete','Win':'meta','Esc':'escape'},charLookup={'tab':'\t','space':' ','enter':'\r'},keyMap={},charMap={},metaFixMap,downKey,modifiers=new Base({shift:false,control:false,alt:false,meta:false,capsLock:false,space:false}).inject({option:{get:function get(){return this.alt;}},command:{get:function get(){var agent=paper&&paper.agent;return agent&&agent.mac?this.meta:this.control;}}});function getKey(event){var key=event.key||event.keyIdentifier;key=/^U\+/.test(key)?String.fromCharCode(parseInt(key.substr(2),16)):/^Arrow[A-Z]/.test(key)?key.substr(5):key==='Unidentified'?String.fromCharCode(event.keyCode):key;return keyLookup[key]||(key.length>1?Base.hyphenate(key):key.toLowerCase());}function handleKey(down,key,character,event){var type=down?'keydown':'keyup',view=View._focused,name;keyMap[key]=down;if(down){charMap[key]=character;}else{delete charMap[key];}if(key.length>1&&(name=Base.camelize(key))in modifiers){modifiers[name]=down;var agent=paper&&paper.agent;if(name==='meta'&&agent&&agent.mac){if(down){metaFixMap={};}else{for(var k in metaFixMap){if(k in charMap)handleKey(false,k,metaFixMap[k],event);}metaFixMap=null;}}}else if(down&&metaFixMap){metaFixMap[key]=character;}if(view){view._handleKeyEvent(down?'keydown':'keyup',event,key,character);}}DomEvent.add(document,{keydown:function keydown(event){var key=getKey(event),agent=paper&&paper.agent;if(key.length>1||agent&&agent.chrome&&(event.altKey||agent.mac&&event.metaKey||!agent.mac&&event.ctrlKey)){handleKey(true,key,charLookup[key]||(key.length>1?'':key),event);}else{downKey=key;}},keypress:function keypress(event){if(downKey){var key=getKey(event),code=event.charCode,character=code>=32?String.fromCharCode(code):key.length>1?'':key;if(key!==downKey){key=character.toLowerCase();}handleKey(true,key,character,event);downKey=null;}},keyup:function keyup(event){var key=getKey(event);if(key in charMap)handleKey(false,key,charMap[key],event);}});DomEvent.add(window,{blur:function blur(event){for(var key in charMap){handleKey(false,key,charMap[key],event);}}});return{modifiers:modifiers,isDown:function isDown(key){return!!keyMap[key];}};}();var MouseEvent=Event.extend({_class:'MouseEvent',initialize:function MouseEvent(type,event,point,target,delta){this.type=type;this.event=event;this.point=point;this.target=target;this.delta=delta;},toString:function toString(){return"{ type: '"+this.type+"', point: "+this.point+', target: '+this.target+(this.delta?', delta: '+this.delta:'')+', modifiers: '+this.getModifiers()+' }';}});var ToolEvent=Event.extend({_class:'ToolEvent',_item:null,initialize:function ToolEvent(tool,type,event){this.tool=tool;this.type=type;this.event=event;},_choosePoint:function _choosePoint(point,toolPoint){return point?point:toolPoint?toolPoint.clone():null;},getPoint:function getPoint(){return this._choosePoint(this._point,this.tool._point);},setPoint:function setPoint(point){this._point=point;},getLastPoint:function getLastPoint(){return this._choosePoint(this._lastPoint,this.tool._lastPoint);},setLastPoint:function setLastPoint(lastPoint){this._lastPoint=lastPoint;},getDownPoint:function getDownPoint(){return this._choosePoint(this._downPoint,this.tool._downPoint);},setDownPoint:function setDownPoint(downPoint){this._downPoint=downPoint;},getMiddlePoint:function getMiddlePoint(){if(!this._middlePoint&&this.tool._lastPoint){return this.tool._point.add(this.tool._lastPoint).divide(2);}return this._middlePoint;},setMiddlePoint:function setMiddlePoint(middlePoint){this._middlePoint=middlePoint;},getDelta:function getDelta(){return!this._delta&&this.tool._lastPoint?this.tool._point.subtract(this.tool._lastPoint):this._delta;},setDelta:function setDelta(delta){this._delta=delta;},getCount:function getCount(){return this.tool[/^mouse(down|up)$/.test(this.type)?'_downCount':'_moveCount'];},setCount:function setCount(count){this.tool[/^mouse(down|up)$/.test(this.type)?'downCount':'count']=count;},getItem:function getItem(){if(!this._item){var result=this.tool._scope.project.hitTest(this.getPoint());if(result){var item=result.item,parent=item._parent;while(/^(Group|CompoundPath)$/.test(parent._class)){item=parent;parent=parent._parent;}this._item=item;}}return this._item;},setItem:function setItem(item){this._item=item;},toString:function toString(){return'{ type: '+this.type+', point: '+this.getPoint()+', count: '+this.getCount()+', modifiers: '+this.getModifiers()+' }';}});var Tool=PaperScopeItem.extend({_class:'Tool',_list:'tools',_reference:'tool',_events:['onMouseDown','onMouseUp','onMouseDrag','onMouseMove','onActivate','onDeactivate','onEditOptions','onKeyDown','onKeyUp'],initialize:function Tool(props){PaperScopeItem.call(this);this._moveCount=-1;this._downCount=-1;this.set(props);},getMinDistance:function getMinDistance(){return this._minDistance;},setMinDistance:function setMinDistance(minDistance){this._minDistance=minDistance;if(minDistance!=null&&this._maxDistance!=null&&minDistance>this._maxDistance){this._maxDistance=minDistance;}},getMaxDistance:function getMaxDistance(){return this._maxDistance;},setMaxDistance:function setMaxDistance(maxDistance){this._maxDistance=maxDistance;if(this._minDistance!=null&&maxDistance!=null&&maxDistance<this._minDistance){this._minDistance=maxDistance;}},getFixedDistance:function getFixedDistance(){return this._minDistance==this._maxDistance?this._minDistance:null;},setFixedDistance:function setFixedDistance(distance){this._minDistance=this._maxDistance=distance;},_handleMouseEvent:function _handleMouseEvent(type,event,point,mouse){paper=this._scope;if(mouse.drag&&!this.responds(type))type='mousemove';var move=mouse.move||mouse.drag,responds=this.responds(type),minDistance=this.minDistance,maxDistance=this.maxDistance,called=false,tool=this;function update(minDistance,maxDistance){var pt=point,toolPoint=move?tool._point:tool._downPoint||pt;if(move){if(tool._moveCount&&pt.equals(toolPoint)){return false;}if(toolPoint&&(minDistance!=null||maxDistance!=null)){var vector=pt.subtract(toolPoint),distance=vector.getLength();if(distance<(minDistance||0))return false;if(maxDistance){pt=toolPoint.add(vector.normalize(Math.min(distance,maxDistance)));}}tool._moveCount++;}tool._point=pt;tool._lastPoint=toolPoint||pt;if(mouse.down){tool._moveCount=-1;tool._downPoint=pt;tool._downCount++;}return true;}function emit(){if(responds){called=tool.emit(type,new ToolEvent(tool,type,event))||called;}}if(mouse.down){update();emit();}else if(mouse.up){update(null,maxDistance);emit();}else if(responds){while(update(minDistance,maxDistance)){emit();}}return called;}});var Http={request:function request(options){var xhr=new self.XMLHttpRequest();xhr.open((options.method||'get').toUpperCase(),options.url,Base.pick(options.async,true));if(options.mimeType)xhr.overrideMimeType(options.mimeType);xhr.onload=function(){var status=xhr.status;if(status===0||status===200){if(options.onLoad){options.onLoad.call(xhr,xhr.responseText);}}else{xhr.onerror();}};xhr.onerror=function(){var status=xhr.status,message='Could not load "'+options.url+'" (Status: '+status+')';if(options.onError){options.onError(message,status);}else{throw new Error(message);}};return xhr.send(null);}};var CanvasProvider={canvases:[],getCanvas:function getCanvas(width,height){if(!window)return null;var canvas,clear=true;if((typeof width==='undefined'?'undefined':(0,_typeof4.default)(width))==='object'){height=width.height;width=width.width;}if(this.canvases.length){canvas=this.canvases.pop();}else{canvas=document.createElement('canvas');clear=false;}var ctx=canvas.getContext('2d');if(!ctx){throw new Error('Canvas '+canvas+' is unable to provide a 2D context.');}if(canvas.width===width&&canvas.height===height){if(clear)ctx.clearRect(0,0,width+1,height+1);}else{canvas.width=width;canvas.height=height;}ctx.save();return canvas;},getContext:function getContext(width,height){var canvas=this.getCanvas(width,height);return canvas?canvas.getContext('2d'):null;},release:function release(obj){var canvas=obj&&obj.canvas?obj.canvas:obj;if(canvas&&canvas.getContext){canvas.getContext('2d').restore();this.canvases.push(canvas);}}};var BlendMode=new function(){var min=Math.min,max=Math.max,abs=Math.abs,sr,sg,sb,sa,br,bg,bb,ba,dr,dg,db;function getLum(r,g,b){return 0.2989*r+0.587*g+0.114*b;}function setLum(r,g,b,l){var d=l-getLum(r,g,b);dr=r+d;dg=g+d;db=b+d;var l=getLum(dr,dg,db),mn=min(dr,dg,db),mx=max(dr,dg,db);if(mn<0){var lmn=l-mn;dr=l+(dr-l)*l/lmn;dg=l+(dg-l)*l/lmn;db=l+(db-l)*l/lmn;}if(mx>255){var ln=255-l,mxl=mx-l;dr=l+(dr-l)*ln/mxl;dg=l+(dg-l)*ln/mxl;db=l+(db-l)*ln/mxl;}}function getSat(r,g,b){return max(r,g,b)-min(r,g,b);}function setSat(r,g,b,s){var col=[r,g,b],mx=max(r,g,b),mn=min(r,g,b),md;mn=mn===r?0:mn===g?1:2;mx=mx===r?0:mx===g?1:2;md=min(mn,mx)===0?max(mn,mx)===1?2:1:0;if(col[mx]>col[mn]){col[md]=(col[md]-col[mn])*s/(col[mx]-col[mn]);col[mx]=s;}else{col[md]=col[mx]=0;}col[mn]=0;dr=col[0];dg=col[1];db=col[2];}var modes={multiply:function multiply(){dr=br*sr/255;dg=bg*sg/255;db=bb*sb/255;},screen:function screen(){dr=br+sr-br*sr/255;dg=bg+sg-bg*sg/255;db=bb+sb-bb*sb/255;},overlay:function overlay(){dr=br<128?2*br*sr/255:255-2*(255-br)*(255-sr)/255;dg=bg<128?2*bg*sg/255:255-2*(255-bg)*(255-sg)/255;db=bb<128?2*bb*sb/255:255-2*(255-bb)*(255-sb)/255;},'soft-light':function softLight(){var t=sr*br/255;dr=t+br*(255-(255-br)*(255-sr)/255-t)/255;t=sg*bg/255;dg=t+bg*(255-(255-bg)*(255-sg)/255-t)/255;t=sb*bb/255;db=t+bb*(255-(255-bb)*(255-sb)/255-t)/255;},'hard-light':function hardLight(){dr=sr<128?2*sr*br/255:255-2*(255-sr)*(255-br)/255;dg=sg<128?2*sg*bg/255:255-2*(255-sg)*(255-bg)/255;db=sb<128?2*sb*bb/255:255-2*(255-sb)*(255-bb)/255;},'color-dodge':function colorDodge(){dr=br===0?0:sr===255?255:min(255,255*br/(255-sr));dg=bg===0?0:sg===255?255:min(255,255*bg/(255-sg));db=bb===0?0:sb===255?255:min(255,255*bb/(255-sb));},'color-burn':function colorBurn(){dr=br===255?255:sr===0?0:max(0,255-(255-br)*255/sr);dg=bg===255?255:sg===0?0:max(0,255-(255-bg)*255/sg);db=bb===255?255:sb===0?0:max(0,255-(255-bb)*255/sb);},darken:function darken(){dr=br<sr?br:sr;dg=bg<sg?bg:sg;db=bb<sb?bb:sb;},lighten:function lighten(){dr=br>sr?br:sr;dg=bg>sg?bg:sg;db=bb>sb?bb:sb;},difference:function difference(){dr=br-sr;if(dr<0)dr=-dr;dg=bg-sg;if(dg<0)dg=-dg;db=bb-sb;if(db<0)db=-db;},exclusion:function exclusion(){dr=br+sr*(255-br-br)/255;dg=bg+sg*(255-bg-bg)/255;db=bb+sb*(255-bb-bb)/255;},hue:function hue(){setSat(sr,sg,sb,getSat(br,bg,bb));setLum(dr,dg,db,getLum(br,bg,bb));},saturation:function saturation(){setSat(br,bg,bb,getSat(sr,sg,sb));setLum(dr,dg,db,getLum(br,bg,bb));},luminosity:function luminosity(){setLum(br,bg,bb,getLum(sr,sg,sb));},color:function color(){setLum(sr,sg,sb,getLum(br,bg,bb));},add:function add(){dr=min(br+sr,255);dg=min(bg+sg,255);db=min(bb+sb,255);},subtract:function subtract(){dr=max(br-sr,0);dg=max(bg-sg,0);db=max(bb-sb,0);},average:function average(){dr=(br+sr)/2;dg=(bg+sg)/2;db=(bb+sb)/2;},negation:function negation(){dr=255-abs(255-sr-br);dg=255-abs(255-sg-bg);db=255-abs(255-sb-bb);}};var nativeModes=this.nativeModes=Base.each(['source-over','source-in','source-out','source-atop','destination-over','destination-in','destination-out','destination-atop','lighter','darker','copy','xor'],function(mode){this[mode]=true;},{});var ctx=CanvasProvider.getContext(1,1);if(ctx){Base.each(modes,function(func,mode){var darken=mode==='darken',ok=false;ctx.save();try{ctx.fillStyle=darken?'#300':'#a00';ctx.fillRect(0,0,1,1);ctx.globalCompositeOperation=mode;if(ctx.globalCompositeOperation===mode){ctx.fillStyle=darken?'#a00':'#300';ctx.fillRect(0,0,1,1);ok=ctx.getImageData(0,0,1,1).data[0]!==darken?170:51;}}catch(e){}ctx.restore();nativeModes[mode]=ok;});CanvasProvider.release(ctx);}this.process=function(mode,srcContext,dstContext,alpha,offset){var srcCanvas=srcContext.canvas,normal=mode==='normal';if(normal||nativeModes[mode]){dstContext.save();dstContext.setTransform(1,0,0,1,0,0);dstContext.globalAlpha=alpha;if(!normal)dstContext.globalCompositeOperation=mode;dstContext.drawImage(srcCanvas,offset.x,offset.y);dstContext.restore();}else{var process=modes[mode];if(!process)return;var dstData=dstContext.getImageData(offset.x,offset.y,srcCanvas.width,srcCanvas.height),dst=dstData.data,src=srcContext.getImageData(0,0,srcCanvas.width,srcCanvas.height).data;for(var i=0,l=dst.length;i<l;i+=4){sr=src[i];br=dst[i];sg=src[i+1];bg=dst[i+1];sb=src[i+2];bb=dst[i+2];sa=src[i+3];ba=dst[i+3];process();var a1=sa*alpha/255,a2=1-a1;dst[i]=a1*dr+a2*br;dst[i+1]=a1*dg+a2*bg;dst[i+2]=a1*db+a2*bb;dst[i+3]=sa*alpha+a2*ba;}dstContext.putImageData(dstData,offset.x,offset.y);}};}();var SvgElement=new function(){var svg='http://www.w3.org/2000/svg',xmlns='http://www.w3.org/2000/xmlns',xlink='http://www.w3.org/1999/xlink',attributeNamespace={href:xlink,xlink:xmlns,xmlns:xmlns+'/','xmlns:xlink':xmlns+'/'};function create(tag,attributes,formatter){return set(document.createElementNS(svg,tag),attributes,formatter);}function get(node,name){var namespace=attributeNamespace[name],value=namespace?node.getAttributeNS(namespace,name):node.getAttribute(name);return value==='null'?null:value;}function set(node,attributes,formatter){for(var name in attributes){var value=attributes[name],namespace=attributeNamespace[name];if(typeof value==='number'&&formatter)value=formatter.number(value);if(namespace){node.setAttributeNS(namespace,name,value);}else{node.setAttribute(name,value);}}return node;}return{svg:svg,xmlns:xmlns,xlink:xlink,create:create,get:get,set:set};}();var SvgStyles=Base.each({fillColor:['fill','color'],fillRule:['fill-rule','string'],strokeColor:['stroke','color'],strokeWidth:['stroke-width','number'],strokeCap:['stroke-linecap','string'],strokeJoin:['stroke-linejoin','string'],strokeScaling:['vector-effect','lookup',{true:'none',false:'non-scaling-stroke'},function(item,value){return!value&&(item instanceof PathItem||item instanceof Shape||item instanceof TextItem);}],miterLimit:['stroke-miterlimit','number'],dashArray:['stroke-dasharray','array'],dashOffset:['stroke-dashoffset','number'],fontFamily:['font-family','string'],fontWeight:['font-weight','string'],fontSize:['font-size','number'],justification:['text-anchor','lookup',{left:'start',center:'middle',right:'end'}],opacity:['opacity','number'],blendMode:['mix-blend-mode','style']},function(entry,key){var part=Base.capitalize(key),lookup=entry[2];this[key]={type:entry[1],property:key,attribute:entry[0],toSVG:lookup,fromSVG:lookup&&Base.each(lookup,function(value,name){this[value]=name;},{}),exportFilter:entry[3],get:'get'+part,set:'set'+part};},{});new function(){var formatter;function getTransform(matrix,coordinates,center){var attrs=new Base(),trans=matrix.getTranslation();if(coordinates){matrix=matrix._shiftless();var point=matrix._inverseTransform(trans);attrs[center?'cx':'x']=point.x;attrs[center?'cy':'y']=point.y;trans=null;}if(!matrix.isIdentity()){var decomposed=matrix.decompose();if(decomposed){var parts=[],angle=decomposed.rotation,scale=decomposed.scaling,skew=decomposed.skewing;if(trans&&!trans.isZero())parts.push('translate('+formatter.point(trans)+')');if(angle)parts.push('rotate('+formatter.number(angle)+')');if(!Numerical.isZero(scale.x-1)||!Numerical.isZero(scale.y-1))parts.push('scale('+formatter.point(scale)+')');if(skew.x)parts.push('skewX('+formatter.number(skew.x)+')');if(skew.y)parts.push('skewY('+formatter.number(skew.y)+')');attrs.transform=parts.join(' ');}else{attrs.transform='matrix('+matrix.getValues().join(',')+')';}}return attrs;}function exportGroup(item,options){var attrs=getTransform(item._matrix),children=item._children;var node=SvgElement.create('g',attrs,formatter);for(var i=0,l=children.length;i<l;i++){var child=children[i];var childNode=_exportSVG(child,options);if(childNode){if(child.isClipMask()){var clip=SvgElement.create('clipPath');clip.appendChild(childNode);setDefinition(child,clip,'clip');SvgElement.set(node,{'clip-path':'url(#'+clip.id+')'});}else{node.appendChild(childNode);}}}return node;}function exportRaster(item,options){var attrs=getTransform(item._matrix,true),size=item.getSize(),image=item.getImage();attrs.x-=size.width/2;attrs.y-=size.height/2;attrs.width=size.width;attrs.height=size.height;attrs.href=options.embedImages==false&&image&&image.src||item.toDataURL();return SvgElement.create('image',attrs,formatter);}function exportPath(item,options){var matchShapes=options.matchShapes;if(matchShapes){var shape=item.toShape(false);if(shape)return exportShape(shape,options);}var segments=item._segments,length=segments.length,type,attrs=getTransform(item._matrix);if(matchShapes&&length>=2&&!item.hasHandles()){if(length>2){type=item._closed?'polygon':'polyline';var parts=[];for(var i=0;i<length;i++){parts.push(formatter.point(segments[i]._point));}attrs.points=parts.join(' ');}else{type='line';var start=segments[0]._point,end=segments[1]._point;attrs.set({x1:start.x,y1:start.y,x2:end.x,y2:end.y});}}else{type='path';attrs.d=item.getPathData(null,options.precision);}return SvgElement.create(type,attrs,formatter);}function exportShape(item){var type=item._type,radius=item._radius,attrs=getTransform(item._matrix,true,type!=='rectangle');if(type==='rectangle'){type='rect';var size=item._size,width=size.width,height=size.height;attrs.x-=width/2;attrs.y-=height/2;attrs.width=width;attrs.height=height;if(radius.isZero())radius=null;}if(radius){if(type==='circle'){attrs.r=radius;}else{attrs.rx=radius.width;attrs.ry=radius.height;}}return SvgElement.create(type,attrs,formatter);}function exportCompoundPath(item,options){var attrs=getTransform(item._matrix);var data=item.getPathData(null,options.precision);if(data)attrs.d=data;return SvgElement.create('path',attrs,formatter);}function exportSymbolItem(item,options){var attrs=getTransform(item._matrix,true),definition=item._definition,node=getDefinition(definition,'symbol'),definitionItem=definition._item,bounds=definitionItem.getBounds();if(!node){node=SvgElement.create('symbol',{viewBox:formatter.rectangle(bounds)});node.appendChild(_exportSVG(definitionItem,options));setDefinition(definition,node,'symbol');}attrs.href='#'+node.id;attrs.x+=bounds.x;attrs.y+=bounds.y;attrs.width=bounds.width;attrs.height=bounds.height;attrs.overflow='visible';return SvgElement.create('use',attrs,formatter);}function exportGradient(color){var gradientNode=getDefinition(color,'color');if(!gradientNode){var gradient=color.getGradient(),radial=gradient._radial,origin=color.getOrigin(),destination=color.getDestination(),attrs;if(radial){attrs={cx:origin.x,cy:origin.y,r:origin.getDistance(destination)};var highlight=color.getHighlight();if(highlight){attrs.fx=highlight.x;attrs.fy=highlight.y;}}else{attrs={x1:origin.x,y1:origin.y,x2:destination.x,y2:destination.y};}attrs.gradientUnits='userSpaceOnUse';gradientNode=SvgElement.create((radial?'radial':'linear')+'Gradient',attrs,formatter);var stops=gradient._stops;for(var i=0,l=stops.length;i<l;i++){var stop=stops[i],stopColor=stop._color,alpha=stopColor.getAlpha(),offset=stop._offset;attrs={offset:offset==null?i/(l-1):offset};if(stopColor)attrs['stop-color']=stopColor.toCSS(true);if(alpha<1)attrs['stop-opacity']=alpha;gradientNode.appendChild(SvgElement.create('stop',attrs,formatter));}setDefinition(color,gradientNode,'color');}return'url(#'+gradientNode.id+')';}function exportText(item){var node=SvgElement.create('text',getTransform(item._matrix,true),formatter);node.textContent=item._content;return node;}var exporters={Group:exportGroup,Layer:exportGroup,Raster:exportRaster,Path:exportPath,Shape:exportShape,CompoundPath:exportCompoundPath,SymbolItem:exportSymbolItem,PointText:exportText};function applyStyle(item,node,isRoot){var attrs={},parent=!isRoot&&item.getParent(),style=[];if(item._name!=null)attrs.id=item._name;Base.each(SvgStyles,function(entry){var get=entry.get,type=entry.type,value=item[get]();if(entry.exportFilter?entry.exportFilter(item,value):!parent||!Base.equals(parent[get](),value)){if(type==='color'&&value!=null){var alpha=value.getAlpha();if(alpha<1)attrs[entry.attribute+'-opacity']=alpha;}if(type==='style'){style.push(entry.attribute+': '+value);}else{attrs[entry.attribute]=value==null?'none':type==='color'?value.gradient?exportGradient(value,item):value.toCSS(true):type==='array'?value.join(','):type==='lookup'?entry.toSVG[value]:value;}}});if(style.length)attrs.style=style.join(';');if(attrs.opacity===1)delete attrs.opacity;if(!item._visible)attrs.visibility='hidden';return SvgElement.set(node,attrs,formatter);}var definitions;function getDefinition(item,type){if(!definitions)definitions={ids:{},svgs:{}};return item&&definitions.svgs[type+'-'+(item._id||item.__id||(item.__id=UID.get('svg')))];}function setDefinition(item,node,type){if(!definitions)getDefinition();var typeId=definitions.ids[type]=(definitions.ids[type]||0)+1;node.id=type+'-'+typeId;definitions.svgs[type+'-'+(item._id||item.__id)]=node;}function exportDefinitions(node,options){var svg=node,defs=null;if(definitions){svg=node.nodeName.toLowerCase()==='svg'&&node;for(var i in definitions.svgs){if(!defs){if(!svg){svg=SvgElement.create('svg');svg.appendChild(node);}defs=svg.insertBefore(SvgElement.create('defs'),svg.firstChild);}defs.appendChild(definitions.svgs[i]);}definitions=null;}return options.asString?new self.XMLSerializer().serializeToString(svg):svg;}function _exportSVG(item,options,isRoot){var exporter=exporters[item._class],node=exporter&&exporter(item,options);if(node){var onExport=options.onExport;if(onExport)node=onExport(item,node,options)||node;var data=(0,_stringify2.default)(item._data);if(data&&data!=='{}'&&data!=='null')node.setAttribute('data-paper-data',data);}return node&&applyStyle(item,node,isRoot);}function setOptions(options){if(!options)options={};formatter=new Formatter(options.precision);return options;}Item.inject({exportSVG:function exportSVG(options){options=setOptions(options);return exportDefinitions(_exportSVG(this,options,true),options);}});Project.inject({exportSVG:function exportSVG(options){options=setOptions(options);var children=this._children,view=this.getView(),bounds=Base.pick(options.bounds,'view'),mx=options.matrix||bounds==='view'&&view._matrix,matrix=mx&&Matrix.read([mx]),rect=bounds==='view'?new _Rectangle([0,0],view.getViewSize()):bounds==='content'?Item._getBounds(children,matrix,{stroke:true}).rect:_Rectangle.read([bounds],0,{readNull:true}),attrs={version:'1.1',xmlns:SvgElement.svg,'xmlns:xlink':SvgElement.xlink};if(rect){attrs.width=rect.width;attrs.height=rect.height;if(rect.x||rect.y)attrs.viewBox=formatter.rectangle(rect);}var node=SvgElement.create('svg',attrs,formatter),parent=node;if(matrix&&!matrix.isIdentity()){parent=node.appendChild(SvgElement.create('g',getTransform(matrix),formatter));}for(var i=0,l=children.length;i<l;i++){parent.appendChild(_exportSVG(children[i],options,true));}return exportDefinitions(node,options);}});}();new function(){var definitions={},rootSize;function getValue(node,name,isString,allowNull,allowPercent){var value=SvgElement.get(node,name),res=value==null?allowNull?null:isString?'':0:isString?value:parseFloat(value);return /%\s*$/.test(value)?res/100*(allowPercent?1:rootSize[/x|^width/.test(name)?'width':'height']):res;}function getPoint(node,x,y,allowNull,allowPercent){x=getValue(node,x||'x',false,allowNull,allowPercent);y=getValue(node,y||'y',false,allowNull,allowPercent);return allowNull&&(x==null||y==null)?null:new Point(x,y);}function getSize(node,w,h,allowNull,allowPercent){w=getValue(node,w||'width',false,allowNull,allowPercent);h=getValue(node,h||'height',false,allowNull,allowPercent);return allowNull&&(w==null||h==null)?null:new Size(w,h);}function convertValue(value,type,lookup){return value==='none'?null:type==='number'?parseFloat(value):type==='array'?value?value.split(/[\s,]+/g).map(parseFloat):[]:type==='color'?getDefinition(value)||value:type==='lookup'?lookup[value]:value;}function importGroup(node,type,options,isRoot){var nodes=node.childNodes,isClip=type==='clippath',isDefs=type==='defs',item=new Group(),project=item._project,currentStyle=project._currentStyle,children=[];if(!isClip&&!isDefs){item=applyAttributes(item,node,isRoot);project._currentStyle=item._style.clone();}if(isRoot){var defs=node.querySelectorAll('defs');for(var i=0,l=defs.length;i<l;i++){importNode(defs[i],options,false);}}for(var i=0,l=nodes.length;i<l;i++){var childNode=nodes[i],child;if(childNode.nodeType===1&&!/^defs$/i.test(childNode.nodeName)&&(child=importNode(childNode,options,false))&&!(child instanceof SymbolDefinition))children.push(child);}item.addChildren(children);if(isClip)item=applyAttributes(item.reduce(),node,isRoot);project._currentStyle=currentStyle;if(isClip||isDefs){item.remove();item=null;}return item;}function importPoly(node,type){var coords=node.getAttribute('points').match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),points=[];for(var i=0,l=coords.length;i<l;i+=2){points.push(new Point(parseFloat(coords[i]),parseFloat(coords[i+1])));}var path=new Path(points);if(type==='polygon')path.closePath();return path;}function importPath(node){return PathItem.create(node.getAttribute('d'));}function importGradient(node,type){var id=(getValue(node,'href',true)||'').substring(1),radial=type==='radialgradient',gradient;if(id){gradient=definitions[id].getGradient();if(gradient._radial^radial){gradient=gradient.clone();gradient._radial=radial;}}else{var nodes=node.childNodes,stops=[];for(var i=0,l=nodes.length;i<l;i++){var child=nodes[i];if(child.nodeType===1)stops.push(applyAttributes(new GradientStop(),child));}gradient=new Gradient(stops,radial);}var origin,destination,highlight,scaleToBounds=getValue(node,'gradientUnits',true)!=='userSpaceOnUse';if(radial){origin=getPoint(node,'cx','cy',false,scaleToBounds);destination=origin.add(getValue(node,'r',false,false,scaleToBounds),0);highlight=getPoint(node,'fx','fy',true,scaleToBounds);}else{origin=getPoint(node,'x1','y1',false,scaleToBounds);destination=getPoint(node,'x2','y2',false,scaleToBounds);}var color=applyAttributes(new Color(gradient,origin,destination,highlight),node);color._scaleToBounds=scaleToBounds;return null;}var importers={'#document':function document(node,type,options,isRoot){var nodes=node.childNodes;for(var i=0,l=nodes.length;i<l;i++){var child=nodes[i];if(child.nodeType===1)return importNode(child,options,isRoot);}},g:importGroup,svg:importGroup,clippath:importGroup,polygon:importPoly,polyline:importPoly,path:importPath,lineargradient:importGradient,radialgradient:importGradient,image:function image(node){var raster=new Raster(getValue(node,'href',true));raster.on('load',function(){var size=getSize(node);this.setSize(size);var center=this._matrix._transformPoint(getPoint(node).add(size.divide(2)));this.translate(center);});return raster;},symbol:function symbol(node,type,options,isRoot){return new SymbolDefinition(importGroup(node,type,options,isRoot),true);},defs:importGroup,use:function use(node){var id=(getValue(node,'href',true)||'').substring(1),definition=definitions[id],point=getPoint(node);return definition?definition instanceof SymbolDefinition?definition.place(point):definition.clone().translate(point):null;},circle:function circle(node){return new Shape.Circle(getPoint(node,'cx','cy'),getValue(node,'r'));},ellipse:function ellipse(node){return new Shape.Ellipse({center:getPoint(node,'cx','cy'),radius:getSize(node,'rx','ry')});},rect:function rect(node){return new Shape.Rectangle(new _Rectangle(getPoint(node),getSize(node)),getSize(node,'rx','ry'));},line:function line(node){return new Path.Line(getPoint(node,'x1','y1'),getPoint(node,'x2','y2'));},text:function text(node){var text=new PointText(getPoint(node).add(getPoint(node,'dx','dy')));text.setContent(node.textContent.trim()||'');return text;}};function applyTransform(item,value,name,node){if(item.transform){var transforms=(node.getAttribute(name)||'').split(/\)\s*/g),matrix=new Matrix();for(var i=0,l=transforms.length;i<l;i++){var transform=transforms[i];if(!transform)break;var parts=transform.split(/\(\s*/),command=parts[0],v=parts[1].split(/[\s,]+/g);for(var j=0,m=v.length;j<m;j++){v[j]=parseFloat(v[j]);}switch(command){case'matrix':matrix.append(new Matrix(v[0],v[1],v[2],v[3],v[4],v[5]));break;case'rotate':matrix.rotate(v[0],v[1],v[2]);break;case'translate':matrix.translate(v[0],v[1]);break;case'scale':matrix.scale(v);break;case'skewX':matrix.skew(v[0],0);break;case'skewY':matrix.skew(0,v[0]);break;}}item.transform(matrix);}}function applyOpacity(item,value,name){var key=name==='fill-opacity'?'getFillColor':'getStrokeColor',color=item[key]&&item[key]();if(color)color.setAlpha(parseFloat(value));}var attributes=Base.set(Base.each(SvgStyles,function(entry){this[entry.attribute]=function(item,value){if(item[entry.set]){item[entry.set](convertValue(value,entry.type,entry.fromSVG));if(entry.type==='color'){var color=item[entry.get]();if(color){if(color._scaleToBounds){var bounds=item.getBounds();color.transform(new Matrix().translate(bounds.getPoint()).scale(bounds.getSize()));}}}}};},{}),{id:function id(item,value){definitions[value]=item;if(item.setName)item.setName(value);},'clip-path':function clipPath(item,value){var clip=getDefinition(value);if(clip){clip=clip.clone();clip.setClipMask(true);if(item instanceof Group){item.insertChild(0,clip);}else{return new Group(clip,item);}}},gradientTransform:applyTransform,transform:applyTransform,'fill-opacity':applyOpacity,'stroke-opacity':applyOpacity,visibility:function visibility(item,value){if(item.setVisible)item.setVisible(value==='visible');},display:function display(item,value){if(item.setVisible)item.setVisible(value!==null);},'stop-color':function stopColor(item,value){if(item.setColor)item.setColor(value);},'stop-opacity':function stopOpacity(item,value){if(item._color)item._color.setAlpha(parseFloat(value));},offset:function offset(item,value){if(item.setOffset){var percent=value.match(/(.*)%$/);item.setOffset(percent?percent[1]/100:parseFloat(value));}},viewBox:function viewBox(item,value,name,node,styles){var rect=new _Rectangle(convertValue(value,'array')),size=getSize(node,null,null,true),group,matrix;if(item instanceof Group){var scale=size?size.divide(rect.getSize()):1,matrix=new Matrix().scale(scale).translate(rect.getPoint().negate());group=item;}else if(item instanceof SymbolDefinition){if(size)rect.setSize(size);group=item._item;}if(group){if(getAttribute(node,'overflow',styles)!=='visible'){var clip=new Shape.Rectangle(rect);clip.setClipMask(true);group.addChild(clip);}if(matrix)group.transform(matrix);}}});function getAttribute(node,name,styles){var attr=node.attributes[name],value=attr&&attr.value;if(!value){var style=Base.camelize(name);value=node.style[style];if(!value&&styles.node[style]!==styles.parent[style])value=styles.node[style];}return!value?undefined:value==='none'?null:value;}function applyAttributes(item,node,isRoot){if(node.style){var parent=node.parentNode,styles={node:DomElement.getStyles(node)||{},parent:!isRoot&&!/^defs$/i.test(parent.tagName)&&DomElement.getStyles(parent)||{}};Base.each(attributes,function(apply,name){var value=getAttribute(node,name,styles);item=value!==undefined&&apply(item,value,name,node,styles)||item;});}return item;}function getDefinition(value){var match=value&&value.match(/\((?:["'#]*)([^"')]+)/),name=match&&match[1],res=name&&definitions[window?name.replace(window.location.href.split('#')[0]+'#',''):name];if(res&&res._scaleToBounds){res=res.clone();res._scaleToBounds=true;}return res;}function importNode(node,options,isRoot){var type=node.nodeName.toLowerCase(),isElement=type!=='#document',body=document.body,container,parent,next;if(isRoot&&isElement){rootSize=paper.getView().getSize();rootSize=getSize(node,null,null,true)||rootSize;container=SvgElement.create('svg',{style:'stroke-width: 1px; stroke-miterlimit: 10'});parent=node.parentNode;next=node.nextSibling;container.appendChild(node);body.appendChild(container);}var settings=paper.settings,applyMatrix=settings.applyMatrix,insertItems=settings.insertItems;settings.applyMatrix=false;settings.insertItems=false;var importer=importers[type],item=importer&&importer(node,type,options,isRoot)||null;settings.insertItems=insertItems;settings.applyMatrix=applyMatrix;if(item){if(isElement&&!(item instanceof Group))item=applyAttributes(item,node,isRoot);var onImport=options.onImport,data=isElement&&node.getAttribute('data-paper-data');if(onImport)item=onImport(node,item,options)||item;if(options.expandShapes&&item instanceof Shape){item.remove();item=item.toPath();}if(data)item._data=JSON.parse(data);}if(container){body.removeChild(container);if(parent){if(next){parent.insertBefore(node,next);}else{parent.appendChild(node);}}}if(isRoot){definitions={};if(item&&Base.pick(options.applyMatrix,applyMatrix))item.matrix.apply(true,true);}return item;}function _importSVG(source,options,owner){if(!source)return null;options=typeof options==='function'?{onLoad:options}:options||{};var scope=paper,item=null;function onLoad(svg){try{var node=(typeof svg==='undefined'?'undefined':(0,_typeof4.default)(svg))==='object'?svg:new self.DOMParser().parseFromString(svg,'image/svg+xml');if(!node.nodeName){node=null;throw new Error('Unsupported SVG source: '+source);}paper=scope;item=importNode(node,options,true);if(!options||options.insert!==false){owner._insertItem(undefined,item);}var onLoad=options.onLoad;if(onLoad)onLoad(item,svg);}catch(e){onError(e);}}function onError(message,status){var onError=options.onError;if(onError){onError(message,status);}else{throw new Error(message);}}if(typeof source==='string'&&!/^.*</.test(source)){var node=document.getElementById(source);if(node){onLoad(node);}else{Http.request({url:source,async:true,onLoad:onLoad,onError:onError});}}else if(typeof File!=='undefined'&&source instanceof File){var reader=new FileReader();reader.onload=function(){onLoad(reader.result);};reader.onerror=function(){onError(reader.error);};return reader.readAsText(source);}else{onLoad(source);}return item;}Item.inject({importSVG:function importSVG(node,options){return _importSVG(node,options,this);}});Project.inject({importSVG:function importSVG(node,options){this.activate();return _importSVG(node,options,this);}});}();paper=new(PaperScope.inject(Base.exports,{Base:Base,Numerical:Numerical,Key:Key,DomEvent:DomEvent,DomElement:DomElement,document:document,window:window,Symbol:SymbolDefinition,PlacedSymbol:SymbolItem}))();if(paper.agent.node){__webpack_require__(6)(paper);}if(true){!(__WEBPACK_AMD_DEFINE_FACTORY__=paper,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.call(exports,__webpack_require__,exports,module):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof module==='undefined'?'undefined':(0,_typeof4.default)(module))==='object'&&module){module.exports=paper;}return paper;}.call(this,(typeof self==='undefined'?'undefined':(0,_typeof4.default)(self))==='object'?self:null);/***/},/* 5 *//***/function(module,exports){/* (ignored) *//***/},/* 6 *//***/function(module,exports){/* (ignored) *//***/},/* 7 *//***/function(module,exports,__webpack_require__){var opentype=__webpack_require__(2),paper=__webpack_require__(4),Glyph=__webpack_require__(8),assign=__webpack_require__(10).assign;function mergeFont(url,name,user,arrayBuffer,merged,cb){fetch([url,name.family,name.style,user,name.template||'unknown'].join('/')+(merged?'/overlap':''),{method:'POST',headers:{'Content-Type':'application/otf'},body:arrayBuffer}).then(function(response){return response.arrayBuffer();}).then(cb);}function Font(args){paper.Group.prototype.constructor.apply(this);args=assign({familyName:'Default familyName',styleName:'Regular',ascender:1,descender:-1,unitsPerEm:1024},args);this.fontinfo=this.ot=new opentype.Font(args);this.glyphMap={};this.charMap={};this.altMap={};this._subset=false;this.fontMap={};this.addGlyph(new Glyph({name:'.notdef',unicode:0,advanceWidth:650}));if(args&&args.glyphs){this.addGlyphs(args.glyphs);}if((typeof window==='undefined'?'undefined':(0,_typeof4.default)(window))==='object'&&window.document&&!document.fonts){document.head.appendChild(this.styleElement=document.createElement('style'));// let's find the corresponding CSSStyleSheet
// (would be much easier with Array#find)
this.styleSheet=document.styleSheets[[].map.call(document.styleSheets,function(ss){return ss.ownerNode;}).indexOf(this.styleElement)];}}Font.prototype=(0,_create2.default)(paper.Group.prototype);Font.prototype.constructor=Font;// proxy .glyphs to .children
// TODO: handle unicode updates
Object.defineProperty(Font.prototype,'glyphs',(0,_getOwnPropertyDescriptor2.default)(paper.Item.prototype,'children'));// TODO: proper proxying of ...Glyph[s] methods to ...Child[ren] methods
// see Glyph.js
Font.prototype.addGlyph=function(glyph){this.addChild(glyph);this.glyphMap[glyph.name]=glyph;if(glyph.ot.unicode===undefined){return glyph;}// build the default cmap
// if multiple glyphs share the same unicode, use the glyph where unicode
// and name are equal
if(!this.charMap[glyph.ot.unicode]||glyph.name.indexOf('alt')===-1){this.charMap[glyph.ot.unicode]=glyph;}// build the alternates map
if(!this.altMap[glyph.ot.unicode]){this.altMap[glyph.ot.unicode]=[];}this.altMap[glyph.ot.unicode].push(glyph);// invalidate glyph subset cache
// TODO: switch to immutable.js to avoid this maddness
this._lastSubset=undefined;return glyph;};Font.prototype.addGlyphs=function(glyphs){return glyphs.forEach(function(glyph){this.addGlyph(glyph);},this);};Object.defineProperty(Font.prototype,'subset',{get:function get(){if(!this._subset){this._subset=this.normalizeSubset(false);}return this._subset;},set:function set(_set2){this._subset=this.normalizeSubset(_set2);}});Font.prototype.normalizeSubset=function(_set){var set;// two cases where _set isn't an array
// false set = all glyphs in the charMap
if(_set===false){set=(0,_keys2.default)(this.charMap).map(function(unicode){return this.charMap[unicode];}.bind(this));// convert string to array of chars
}else if(typeof _set==='string'){set=_set.split('').map(function(e){return e.charCodeAt(0);});}else{set=_set;}// convert array of number to array of glyphs
if(Array.isArray(set)&&typeof set[0]==='number'){set=set.map(function(unicode){return this.charMap[unicode];}.bind(this));}// always include .undef
if(set.indexOf(this.glyphMap['.notdef'])===-1){set.unshift(this.glyphMap['.notdef']);}// when encountering diacritics, include their base-glyph in the subset
set.forEach(function(glyph){if(glyph&&glyph.base!==undefined){var base=this.charMap[glyph.base];if(set.indexOf(base)===-1){set.unshift(base);}}},this);// remove undefined glyphs, dedupe the set and move diacritics at the end
return set.filter(function(e,i,arr){return e&&arr.lastIndexOf(e)===i;});};Font.prototype.getGlyphSubset=function(_set){return _set!==undefined?this.normalizeSubset(_set):this.subset;};Font.prototype.setAlternateFor=function(unicode,glyphName){this.charMap[unicode]=this.glyphMap[glyphName];};Font.prototype.interpolate=function(font0,font1,coef,set){this.getGlyphSubset(set).map(function(glyph){glyph.interpolate(font0.glyphMap[glyph.name],font1.glyphMap[glyph.name],coef);});// TODO: evaluate if taking subsetting into account makes kerning
// interpolation faster or slower.
if(this.ot.kerningPairs){for(var i in this.ot.kerningPairs){this.ot.kerningPairs[i]=font0.ot.kerningPairs[i]+(font1.ot.kerningPairs[i]-font0.ot.kerningPairs[i])*coef;}}this.ot.ascender=font0.ot.ascender+(font1.ot.ascender-font0.ot.ascender)*coef;this.ot.descender=font0.ot.descender+(font1.ot.descender-font0.ot.descender)*coef;return this;};Font.prototype.updateSVGData=function(set){this.getGlyphSubset(set).map(function(glyph){return glyph.updateSVGData();});return this;};Font.prototype.updateOTCommands=function(set,shouldMerge){return this.updateOT({set:set,shouldUpdateCommands:true,shouldMerge:shouldMerge});};Font.prototype.updateOT=function(args){if(args&&args.shouldUpdateCommands){// the following is required so that the globalMatrix of glyphs
// is taken into account on each update. I assume this is done in the
// main thread when calling view.update();
this._project._updateVersion++;}this.ot.glyphs.glyphs=this.getGlyphSubset(args&&args.set).reduce(function(o,glyph,i){if(args&&args.shouldUpdateCommands){o[i]=args.shouldMerge?glyph.combineOTCommands(null):glyph.updateOTCommands(null);}else{o[i]=glyph.ot;}return o;},{});this.ot.glyphs.length=(0,_keys2.default)(this.ot.glyphs.glyphs).length;return this;};Font.prototype.toArrayBuffer=function(){// rewrite the postScriptName to remove invalid characters
// TODO: this should be fixed in opentype.js
this.ot.names.postScriptName.en=this.ot.names.postScriptName.en.replace(/[^A-z]/g,'_');return this.ot.toArrayBuffer();};Font.prototype.importOT=function(otFont){this.ot=otFont;for(var i=0;i<otFont.glyphs.length;++i){var otGlyph=otFont.glyphs.get(i);var glyph=new Glyph({name:otGlyph.name,unicode:otGlyph.unicode});this.addGlyph(glyph);glyph.importOT(otGlyph);}return this;};if((typeof window==='undefined'?'undefined':(0,_typeof4.default)(window))==='object'&&window.document){var _URL=window.URL||window.webkitURL;Font.prototype.addToFonts=document.fonts?// CSS font loading, lightning fast
function(buffer,enFamilyName,noMerge){//cancelling in browser merge
clearTimeout(this.mergeTimeout);if(!enFamilyName){enFamilyName=this.ot.getEnglishName('fontFamily');}if(this.fontMap[enFamilyName]){document.fonts.delete(this.fontMap[enFamilyName]);}var fontface=this.fontMap[enFamilyName]=new window.FontFace(enFamilyName,buffer||this.toArrayBuffer());if(fontface.status==='error'){throw new Error('Fontface is invalid and cannot be displayed');}document.fonts.add(fontface);//we merge font that haven't been merge
if(!noMerge){var timeoutRef=this.mergeTimeout=setTimeout(function(){mergeFont('https://merge.prototypo.io',{style:'forbrowserdisplay',template:'noidea',family:'forbrowserdisplay'},'plumin',buffer,true,function(mergedBuffer){if(timeoutRef===this.mergeTimeout){this.addToFonts(mergedBuffer,enFamilyName,true);}}.bind(this));}.bind(this),300);}return this;}:function(buffer,enFamilyName){if(!enFamilyName){enFamilyName=this.ot.getEnglishName('fontFamily');}var url=_URL.createObjectURL(new Blob([new DataView(buffer||this.toArrayBuffer())],{type:'font/opentype'}));if(this.fontObjectURL){_URL.revokeObjectURL(this.fontObjectURL);this.styleSheet.deleteRule(0);}this.styleSheet.insertRule('@font-face { font-family: "'+enFamilyName+'";'+'src: url('+url+'); }',0);this.fontObjectURL=url;return this;};var a=document.createElement('a');var triggerDownload=function triggerDownload(font,arrayBuffer,filename){var reader=new FileReader();var enFamilyName=filename||font.ot.getEnglishName('fontFamily');reader.onloadend=function(){a.download=enFamilyName+'.otf';a.href=reader.result;a.dispatchEvent(new MouseEvent('click'));setTimeout(function(){a.href='#';_URL.revokeObjectURL(reader.result);},100);};reader.readAsDataURL(new Blob([new DataView(arrayBuffer||font.toArrayBuffer())],{type:'font/opentype'}));};Font.prototype.download=function(arrayBuffer,name,user,merged){if(!merged){triggerDownload(this,arrayBuffer,name&&name.family+' '+name.style);}// TODO: replace that with client-side font merging
if(name&&user){mergeFont('https://merge.prototypo.io',name,user,arrayBuffer,merged,function(bufferToDownload){if(merged){triggerDownload(this,bufferToDownload);}}.bind(this));}return this;};}module.exports=Font;/***/},/* 8 *//***/function(module,exports,__webpack_require__){var opentype=__webpack_require__(2),paper=__webpack_require__(4),Outline=__webpack_require__(9);function Glyph(args){paper.Group.prototype.constructor.apply(this);if(args&&typeof args.unicode==='string'){args.unicode=args.unicode.charCodeAt(0);}this.ot=new opentype.Glyph(args);this.ot.path=new opentype.Path();this.name=args.name;// workaround opentype 'unicode === 0' bug
this.ot.unicode=args.unicode;this.addChild(new Outline());// the second child will hold all components
this.addChild(new paper.Group());// Should all anchors and parentAnchors also leave in child groups?
this.anchors=args&&args.anchors||[];this.parentAnchors=args&&args.parentAnchors||[];// each individual glyph must be explicitely made visible
this.visible=false;// default colors required to display the glyph in a canvas
this.fillColor=new paper.Color(0,0,0);// stroke won't be displayed unless strokeWidth is set to 1
this.strokeColor=new paper.Color(0,0,0);this.strokeScaling=false;}Glyph.prototype=(0,_create2.default)(paper.Group.prototype);Glyph.prototype.constructor=Glyph;// Todo: handle unicode updates
Object.defineProperty(Glyph.prototype,'unicode',{set:function set(code){this.ot.unicode=typeof code==='string'?code.charCodeAt(0):code;},get:function get(){return this.ot.unicode;}});Object.defineProperty(Glyph.prototype,'base',{set:function set(code){this._base=typeof code==='string'?code.charCodeAt(0):code;},get:function get(){return this._base;}});// alias .advanceWidth to .ot.advanceWidth
Object.defineProperty(Glyph.prototype,'advanceWidth',{set:function set(value){this.ot.advanceWidth=value;},get:function get(){return this.ot.advanceWidth;}});// proxy .contours to .children[0]
Object.defineProperty(Glyph.prototype,'contours',{get:function get(){return this.children[0].children;}});// proxy .components to .children[1]
Object.defineProperty(Glyph.prototype,'components',{get:function get(){return this.children[1].children;}});// proxy ...Contour[s] methods to children[0]...Child[ren] methods
// and proxy ...Component[s] methods to children[1]...Child[ren] methods
(0,_getOwnPropertyNames2.default)(paper.Item.prototype).forEach(function(name){var proto=this;// exclude getters and non-methods
if((0,_getOwnPropertyDescriptor2.default)(proto,name).get||typeof proto[name]!=='function'){return;}if(name.indexOf('Children')!==-1){proto[name.replace('Children','Contours')]=function(){proto[name].apply(this.children[0],arguments);};proto[name.replace('Children','Components')]=function(){proto[name].apply(this.children[1],arguments);};}else if(name.indexOf('Child')!==-1){proto[name.replace('Child','Contour')]=function(){proto[name].apply(this.children[0],arguments);};proto[name.replace('Child','Component')]=function(){proto[name].apply(this.children[1],arguments);};}},paper.Item.prototype);Glyph.prototype.addAnchor=function(item){this.anchors.push(item);return item;};Glyph.prototype.addAnchors=function(anchors){return anchors.forEach(function(anchor){this.addAnchor(anchor);},this);};Glyph.prototype.addParentAnchor=function(item){this.parentAnchors.push(item);return item;};Glyph.prototype.addUnicode=function(code){this.ot.addUnicode(code);return this;};Glyph.prototype.interpolate=function(glyph0,glyph1,coef){// If we added an interpolate method to Group, we'd be able to just
// interpolate all this.children directly.
// instead we interpolate the outline first
this.children[0].interpolate(glyph0.children[0],glyph1.children[0],coef);// and then the components
this.children[1].children.forEach(function(component,j){component.interpolate(glyph0.children[1].children[j],glyph1.children[1].children[j],coef);});this.ot.advanceWidth=glyph0.ot.advanceWidth+(glyph1.ot.advanceWidth-glyph0.ot.advanceWidth)*coef;this.ot.leftSideBearing=glyph0.ot.leftSideBearing+(glyph1.ot.leftSideBearing-glyph0.ot.leftSideBearing)*coef;this.ot.xMax=glyph0.ot.xMax+(glyph1.ot.xMax-glyph0.ot.xMax)*coef;this.ot.xMin=glyph0.ot.xMin+(glyph1.ot.xMin-glyph0.ot.xMin)*coef;this.ot.yMax=glyph0.ot.yMax+(glyph1.ot.yMax-glyph0.ot.yMax)*coef;this.ot.yMin=glyph0.ot.yMin+(glyph1.ot.yMin-glyph0.ot.yMin)*coef;return this;};Glyph.prototype.updateSVGData=function(path){if(!path){this.svgData=[];path=this.svgData;}this.children[0].updateSVGData(path);this.children[1].children.forEach(function(component){component.updateSVGData(path);});return this.svgData;};Glyph.prototype.updateOTCommands=function(path){if(!path){this.ot.path.commands=[];path=this.ot.path;}this.children[0].updateOTCommands(path);this.children[1].children.forEach(function(component){component.updateOTCommands(path);});return this.ot;};Glyph.prototype.combineOTCommands=function(path){if(!path){this.ot.path.commands=[];path=this.ot.path;}var combined=this.combineTo(new Outline());if(combined){// prototypo.js will make all contours clockwise without this
combined.isPrepared=true;combined.updateOTCommands(path);}return this.ot;};Glyph.prototype.combineTo=function(outline){if(!outline){outline=new Outline();}outline=this.children[0].combineTo(outline);return this.children[1].children.reduce(function(outline,component){// and then combine it to the rest of the glyph
return component.combineTo(outline);},outline);};Glyph.prototype.importOT=function(otGlyph){var current;this.ot=otGlyph;if(!otGlyph.path||!otGlyph.path.commands){return this;}this.ot.path.commands.forEach(function(command){switch(command.type){case'M':current=new paper.Path();this.children[0].addChild(current);current.moveTo(command);break;case'L':current.lineTo(command);break;case'C':current.cubicCurveTo([command.x1,command.y1],[command.x2,command.y2],command);break;case'Q':current.quadraticCurveTo([command.x1,command.y1],command);break;case'Z':// When the glyph has no contour,
// they contain a single Z command in
// opentype.js.
// TODO: see how we should handle that
if(current){current.closePath();}break;}}.bind(this));return this;};module.exports=Glyph;/***/},/* 9 *//***/function(module,exports,__webpack_require__){var paper=__webpack_require__(4);var Outline=paper.CompoundPath;// function Outline() {
// 	paper.CompoundPath.prototype.constructor.apply( this, arguments );
// }
//
// // inehrit CompoundPath
// Outline.prototype = Object.create(paper.CompoundPath.prototype);
// Outline.prototype.constructor = Outline;
// Fix two problems with CompoundPath#insertChildren:
// - it arbitrarily changes the direction of paths
// - it seems that it doesn't handle CompoundPath arguments
Outline.prototype.insertChildren=function(index,items,_preserve){if(Array.isArray(items)){// flatten items to handle CompoundPath children
items=[].concat.apply([],items.map(function(item){return item instanceof paper.Path?item:item.children;}));}return paper.Item.prototype.insertChildren.call(this,index,items,_preserve,paper.Path);};Outline.fromPath=function(path){var result=new Outline();return path._clone(result,false);};Outline.prototype.interpolate=function(outline0,outline1,coef){for(var i=0,l=this.children.length;i<l;i++){// The number of children should be the same everywhere,
// but we're going to try our best anyway
if(!outline0.children[i]||!outline1.children[i]){break;}this.children[i].interpolate(outline0.children[i],outline1.children[i],coef);}return this;};Outline.prototype.updateSVGData=function(path){if(!path){this.svgData=[];path=this.svgData;}this.children.forEach(function(contour){contour.updateSVGData(path);},this);return this.svgData;};Outline.prototype.updateOTCommands=function(path){if(!path){this.ot.path.commands=[];path=this.ot.path;}this.children.forEach(function(contour){contour.updateOTCommands(path);}.bind(this));return this.ot;};Outline.prototype.combineTo=function(outline){return this.children.reduce(function(reducing,path){// ignore empty and open paths
if(path.curves.length===0||!path.closed){return reducing;}var tmp=reducing==undefined?// when the initial value doesn't exist, use the first path
// (clone it otherwise it's removed from this.children)
path.clone(false):reducing[path.clockwise===!path.exportReversed?'unite':'subtract'](path);return tmp.constructor===paper.Path?new paper.CompoundPath({children:[tmp]}):tmp;},outline);};module.exports=Outline;/***/},/* 10 *//***/function(module,exports){/**
	 * Code refactored from Mozilla Developer Network:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	 */'use strict';function assign(target,firstSource){if(target===undefined||target===null){throw new TypeError('Cannot convert first argument to object');}var to=Object(target);for(var i=1;i<arguments.length;i++){var nextSource=arguments[i];if(nextSource===undefined||nextSource===null){continue;}var keysArray=(0,_keys2.default)(Object(nextSource));for(var nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex++){var nextKey=keysArray[nextIndex];var desc=(0,_getOwnPropertyDescriptor2.default)(nextSource,nextKey);if(desc!==undefined&&desc.enumerable){to[nextKey]=nextSource[nextKey];}}}return to;}function polyfill(){if(!_assign2.default){Object.defineProperty(Object,'assign',{enumerable:false,configurable:true,writable:true,value:assign});}}module.exports={assign:assign,polyfill:polyfill};/***/},/* 11 *//***/function(module,exports,__webpack_require__){/* Extend the Path prototype to add OpenType conversion
	 * and alias *segments methods and properties to *nodes
	 */var paper=__webpack_require__(4);var proto=paper.PaperScope.prototype.Path.prototype;// alias *Segments methods to *Nodes equivalents
['add','insert','remove'].forEach(function(name){proto[name+'Nodes']=proto[name+'Segments'];});// alias .segments to .nodes
(0,_defineProperties2.default)(proto,{nodes:(0,_getOwnPropertyDescriptor2.default)(proto,'segments'),firstNode:(0,_getOwnPropertyDescriptor2.default)(proto,'firstSegment'),lastNode:(0,_getOwnPropertyDescriptor2.default)(proto,'lastSegment')});proto._updateData=function(data,pushSimple,pushBezier){if(this.visible===false||this.curves.length===0){return data;}// prototypo needs to be able to change the direction of the updated data.
var reverse=this.exportReversed,curves=this.curves,length=curves.length,matrix=this.globalMatrix,start=curves[reverse?length-1:0]['point'+(reverse?2:1)].transform(matrix);pushSimple('M',Math.round(start.x)||0,Math.round(start.y)||0);for(var i=-1,l=curves.length;++i<l;){var curve=curves[reverse?l-1-i:i],end=curve['point'+(reverse?1:2)].transform(matrix);if(curve.isStraight()){pushSimple('L',Math.round(end.x)||0,Math.round(end.y)||0);}else{var ctrl1=new paper.Point(curve.point1.x+curve.handle1.x,curve.point1.y+curve.handle1.y).transform(matrix),ctrl2=new paper.Point(curve.point2.x+curve.handle2.x,curve.point2.y+curve.handle2.y).transform(matrix);if(reverse){pushBezier('C',Math.round(ctrl2.x)||0,Math.round(ctrl2.y)||0,Math.round(ctrl1.x)||0,Math.round(ctrl1.y)||0,Math.round(end.x)||0,Math.round(end.y)||0);}else{pushBezier('C',Math.round(ctrl1.x)||0,Math.round(ctrl1.y)||0,Math.round(ctrl2.x)||0,Math.round(ctrl2.y)||0,Math.round(end.x)||0,Math.round(end.y)||0);}}}if(this.closed){pushSimple('Z');}return data;};proto.updateOTCommands=function(data){return this._updateData(data,function pushSimple(){data.commands.push({type:arguments[0],x:arguments[1],y:arguments[2]});},function pushBezier(){data.commands.push({type:arguments[0],x1:arguments[1],y1:arguments[2],x2:arguments[3],y2:arguments[4],x:arguments[5],y:arguments[6]});});};proto.updateSVGData=function(data){return this._updateData(data,function pushSimple(){data.push.apply(data,arguments);},function pushBezier(){data.push.apply(data,arguments);});};module.exports=paper.Path;/***/},/* 12 *//***/function(module,exports,__webpack_require__){var paper=__webpack_require__(4);Object.defineProperty(paper.Segment.prototype,'x',{get:function get(){return this.point.x;},set:function set(value){this.point.x=value;}});Object.defineProperty(paper.Segment.prototype,'y',{get:function get(){return this.point.y;},set:function set(value){this.point.y=value;}});module.exports=paper.Segment;/***/}]/******/));});;//# sourceMappingURL=plumin.js.map
/***/},/* 6 *//***/function(module,exports,__webpack_require__){var listCacheClear=__webpack_require__(93),listCacheDelete=__webpack_require__(94),listCacheGet=__webpack_require__(95),listCacheHas=__webpack_require__(96),listCacheSet=__webpack_require__(97);/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function ListCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}// Add methods to `ListCache`.
ListCache.prototype.clear=listCacheClear;ListCache.prototype['delete']=listCacheDelete;ListCache.prototype.get=listCacheGet;ListCache.prototype.has=listCacheHas;ListCache.prototype.set=listCacheSet;module.exports=ListCache;/***/},/* 7 *//***/function(module,exports,__webpack_require__){var root=__webpack_require__(0);/** Built-in value references. */var _Symbol2=root.Symbol;module.exports=_Symbol2;/***/},/* 8 *//***/function(module,exports,__webpack_require__){var eq=__webpack_require__(34);/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length;}}return-1;}module.exports=assocIndexOf;/***/},/* 9 *//***/function(module,exports,__webpack_require__){var isKeyable=__webpack_require__(90);/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */function getMapData(map,key){var data=map.__data__;return isKeyable(key)?data[typeof key=='string'?'string':'hash']:data.map;}module.exports=getMapData;/***/},/* 10 *//***/function(module,exports,__webpack_require__){var getNative=__webpack_require__(2);/* Built-in method references that are verified to be native. */var nativeCreate=getNative(Object,'create');module.exports=nativeCreate;/***/},/* 11 *//***/function(module,exports,__webpack_require__){var isSymbol=__webpack_require__(13);/** Used as references for various `Number` constants. */var INFINITY=1/0;/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */function toKey(value){if(typeof value=='string'||isSymbol(value)){return value;}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;}module.exports=toKey;/***/},/* 12 *//***/function(module,exports){/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */function isObject(value){var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);return value!=null&&(type=='object'||type=='function');}module.exports=isObject;/***/},/* 13 *//***/function(module,exports,__webpack_require__){var baseGetTag=__webpack_require__(3),isObjectLike=__webpack_require__(4);/** `Object#toString` result references. */var symbolTag='[object Symbol]';/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */function isSymbol(value){return(typeof value==='undefined'?'undefined':(0,_typeof4.default)(value))=='symbol'||isObjectLike(value)&&baseGetTag(value)==symbolTag;}module.exports=isSymbol;/***/},/* 14 *//***/function(module,exports){/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 *//** Used as references for various `Number` constants. */var MAX_SAFE_INTEGER=9007199254740991;/** `Object#toString` result references. */var argsTag='[object Arguments]',funcTag='[object Function]',genTag='[object GeneratorFunction]';/** Used to detect unsigned integer values. */var reIsUint=/^(?:0|[1-9]\d*)$/;/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */function apply(func,thisArg,args){switch(args.length){case 0:return func.call(thisArg);case 1:return func.call(thisArg,args[0]);case 2:return func.call(thisArg,args[0],args[1]);case 3:return func.call(thisArg,args[0],args[1],args[2]);}return func.apply(thisArg,args);}/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}return result;}/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */function overArg(func,transform){return function(arg){return func(transform(arg));};}/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var objectToString=objectProto.toString;/** Built-in value references. */var propertyIsEnumerable=objectProto.propertyIsEnumerable;/* Built-in method references for those with the same name as other `lodash` methods. */var nativeKeys=overArg(_keys2.default,Object),nativeMax=Math.max;/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */var nonEnumShadows=!propertyIsEnumerable.call({'valueOf':1},'valueOf');/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */function arrayLikeKeys(value,inherited){// Safari 8.1 makes `arguments.callee` enumerable in strict mode.
// Safari 9 makes `arguments.length` enumerable in strict mode.
var result=isArray(value)||isArguments(value)?baseTimes(value.length,String):[];var length=result.length,skipIndexes=!!length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(key=='length'||isIndex(key,length)))){result.push(key);}}return result;}/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function assignValue(object,key,value){var objValue=object[key];if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||value===undefined&&!(key in object)){object[key]=value;}}/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object);}var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!='constructor'){result.push(key);}}return result;}/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */function baseRest(func,start){start=nativeMax(start===undefined?func.length-1:start,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length-start,0),array=Array(length);while(++index<length){array[index]=args[start+index];}index=-1;var otherArgs=Array(start+1);while(++index<start){otherArgs[index]=args[index];}otherArgs[start]=array;return apply(func,this,otherArgs);};}/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */function copyObject(source,props,object,customizer){object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];var newValue=customizer?customizer(object[key],source[key],key,object,source):undefined;assignValue(object,key,newValue===undefined?source[key]:newValue);}return object;}/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */function createAssigner(assigner){return baseRest(function(object,sources){var index=-1,length=sources.length,customizer=length>1?sources[length-1]:undefined,guard=length>2?sources[2]:undefined;customizer=assigner.length>3&&typeof customizer=='function'?(length--,customizer):undefined;if(guard&&isIterateeCall(sources[0],sources[1],guard)){customizer=length<3?undefined:customizer;length=1;}object=Object(object);while(++index<length){var source=sources[index];if(source){assigner(object,source,index,customizer);}}return object;});}/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */function isIndex(value,length){length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(typeof value=='number'||reIsUint.test(value))&&value>-1&&value%1==0&&value<length;}/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */function isIterateeCall(value,index,object){if(!isObject(object)){return false;}var type=typeof index==='undefined'?'undefined':(0,_typeof4.default)(index);if(type=='number'?isArrayLike(object)&&isIndex(index,object.length):type=='string'&&index in object){return eq(object[index],value);}return false;}/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */function isPrototype(value){var Ctor=value&&value.constructor,proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;return value===proto;}/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */function eq(value,other){return value===other||value!==value&&other!==other;}/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */function isArguments(value){// Safari 8.1 makes `arguments.callee` enumerable in strict mode.
return isArrayLikeObject(value)&&hasOwnProperty.call(value,'callee')&&(!propertyIsEnumerable.call(value,'callee')||objectToString.call(value)==argsTag);}/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */var isArray=Array.isArray;/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value);}/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value);}/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function isFunction(value){// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 8-9 which returns 'object' for typed array and other constructors.
var tag=isObject(value)?objectToString.call(value):'';return tag==funcTag||tag==genTag;}/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */function isObject(value){var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);return!!value&&(type=='object'||type=='function');}/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */function isObjectLike(value){return!!value&&(typeof value==='undefined'?'undefined':(0,_typeof4.default)(value))=='object';}/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */var assign=createAssigner(function(object,source){if(nonEnumShadows||isPrototype(source)||isArrayLike(source)){copyObject(source,keys(source),object);return;}for(var key in source){if(hasOwnProperty.call(source,key)){assignValue(object,key,source[key]);}}});/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object);}module.exports=assign;/***/},/* 15 *//***/function(module,exports,__webpack_require__){var getNative=__webpack_require__(2),root=__webpack_require__(0);/* Built-in method references that are verified to be native. */var Map=getNative(root,'Map');module.exports=Map;/***/},/* 16 *//***/function(module,exports,__webpack_require__){var mapCacheClear=__webpack_require__(98),mapCacheDelete=__webpack_require__(99),mapCacheGet=__webpack_require__(100),mapCacheHas=__webpack_require__(101),mapCacheSet=__webpack_require__(102);/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function MapCache(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}// Add methods to `MapCache`.
MapCache.prototype.clear=mapCacheClear;MapCache.prototype['delete']=mapCacheDelete;MapCache.prototype.get=mapCacheGet;MapCache.prototype.has=mapCacheHas;MapCache.prototype.set=mapCacheSet;module.exports=MapCache;/***/},/* 17 *//***/function(module,exports,__webpack_require__){var isArray=__webpack_require__(1),isSymbol=__webpack_require__(13);/** Used to match property names within property paths. */var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */function isKey(value,object){if(isArray(value)){return false;}var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);if(type=='number'||type=='symbol'||type=='boolean'||value==null||isSymbol(value)){return true;}return reIsPlainProp.test(value)||!reIsDeepProp.test(value)||object!=null&&value in Object(object);}module.exports=isKey;/***/},/* 18 *//***/function(module,exports){/** Used as references for various `Number` constants. */var MAX_SAFE_INTEGER=9007199254740991;/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}module.exports=isLength;/***/},/* 19 *//***/function(module,exports,__webpack_require__){var arrayLikeKeys=__webpack_require__(53),baseKeys=__webpack_require__(65),isArrayLike=__webpack_require__(36);/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object);}module.exports=keys;/***/},/* 20 *//***/function(module,exports){module.exports=function(module){if(!module.webpackPolyfill){module.deprecate=function(){};module.paths=[];// module.parent = undefined by default
if(!module.children)module.children=[];Object.defineProperty(module,"loaded",{enumerable:true,get:function get(){return module.l;}});Object.defineProperty(module,"id",{enumerable:true,get:function get(){return module.i;}});module.webpackPolyfill=1;}return module;};/***/},/* 21 *//***/function(module,exports,__webpack_require__){var _typeof=typeof _symbol2.default==="function"&&(0,_typeof4.default)(_iterator2.default)==="symbol"?function(obj){return typeof obj==='undefined'?'undefined':(0,_typeof4.default)(obj);}:function(obj){return obj&&typeof _symbol2.default==="function"&&obj.constructor===_symbol2.default&&obj!==_symbol2.default.prototype?"symbol":typeof obj==='undefined'?'undefined':(0,_typeof4.default)(obj);};var plumin=__webpack_require__(5),DepTree=__webpack_require__(44),cloneDeep=__webpack_require__(22),assign=__webpack_require__(14),updateUtils=__webpack_require__(43);var paper=plumin.paper,Utils=updateUtils,_={cloneDeep:cloneDeep,assign:assign};// convert the glyph source from the ufo object model to the paper object model
// this is the inverse operation done by jsufonify
Utils.ufoToPaper=function(src){if(src.parameter){src.parameters=src.parameter;delete src.parameter;}if(src.anchor){src.anchors=src.anchor;delete src.anchor;}if(src.outline&&src.outline.contour){src.contours=src.outline.contour;delete src.outline.contour;}if(src.contours){src.contours.forEach(function(contour){if(contour.point){contour.nodes=contour.point;delete contour.point;}});}if(src.outline&&src.outline.component){src.components=src.outline.component;src.components.forEach(function(component){if(component.anchor){component.parentAnchors=component.anchor;delete component.anchor;}if(component.parameter){component.parentParameters=component.parameter;delete component.parameter;}});delete src.outline.component;}delete src.outline;if(src.lib&&src.lib.transforms){src.transforms=src.lib.transforms;delete src.lib.transforms;}if(src.lib&&src.lib.transformOrigin){src.transformOrigin=src.lib.transformOrigin;delete src.lib.transformOrigin;}if(src.lib&&src.lib.parameters){src.parameters=src.lib.parameters;delete src.lib.parameters;}if(src.lib&&src.lib.solvingOrder){src.solvingOrder=src.lib.solvingOrder;delete src.lib.solvingOrder;}return src;};Utils.fontFromSrc=function(src){// TODO: this, block is only here for backward compat
// and should be removed at some point in the future
if(!src.fontinfo){src.fontinfo=src.info;}var font=new paper.Font(_.assign({},src.fontinfo,{// The font needs to be initialized with valid ascender/descender values
ascender:1,descender:-1}));font.src=Utils.ufoToPaper(src);var filteredSrc=_.assign({},src);delete filteredSrc.controls;delete filteredSrc.presets;delete filteredSrc.glyphs;Utils.createUpdaters(filteredSrc,'font_'+src.fontinfo.familyName);font.parameters={};Utils.mergeStatic(font.parameters,font.src.parameters);// solvingOrder might be already available (if this is a subcomponent,
// or precomputed in a worker)
font.solvingOrder=font.src.solvingOrder;if(!font.solvingOrder){font.solvingOrder=filteredSrc.solvingOrder=Utils.solveDependencyTree(font,filteredSrc);}return font;};// create Glyph instance and all its child items: anchors, contours
// and components
// var wmm = typeof WeakMap === 'function' && new WeakMap();
Utils.glyphFromSrc=function(src,fontSrc,naive,embed){var glyph=new paper.Glyph({name:src.name,unicode:src.unicode});// Clone glyph src to allow altering it without impacting components srcs.
glyph.src=_.cloneDeep(src);// turn ._operation strings to ._updaters functions
// TODO: restore sourceURL pragma for debugging.
// this should impact the way results are memoized
Utils.createUpdaters(glyph.src/*, 'glyphs/glyph_' + name*/);Utils.mergeStatic(glyph,glyph.src);// this will be used to hold local parameters that will be merged with
// the font parameters
glyph.parameters={};Utils.mergeStatic(glyph.parameters,glyph.src.parameters);// solvingOrder might be already available (if this is a subcomponent,
// or precomputed in a worker)
glyph.solvingOrder=glyph.src.solvingOrder;(glyph.src.anchors||[]).forEach(function(anchorSrc){var anchor=new paper.Node();anchor.src=anchorSrc;Utils.mergeStatic(anchor,anchorSrc);glyph.addAnchor(anchor);});(glyph.src.contours||[]).forEach(function(contourSrc,contourIdx){var contour=new paper.Path();contour.src=contourSrc;Utils.mergeStatic(contour,contourSrc);glyph.addContour(contour);// TODO: handle oncurve/offcurve points
contourSrc.nodes.forEach(function(nodeSrc,nodeIdx){var node=new paper.Node();node.src=nodeSrc;Utils.mergeStatic(node,nodeSrc);node.contourIdx=contourIdx;node.nodeIdx=nodeIdx;contour.add(node);});});if(!glyph.src.components){return glyph;}glyph.componentLists={};// components can only be embedded once all glyphs have been generated
// from source
glyph.embedComponents=function(){glyph.src.components.forEach(function(componentSrc){if(Array.isArray(componentSrc.base)){glyph.componentLists[componentSrc.id]=componentSrc.base;Utils.selectGlyphComponent(glyph,componentSrc,componentSrc.base[0],fontSrc,naive,componentSrc.id);}else{Utils.selectGlyphComponent(glyph,componentSrc,componentSrc.base,fontSrc,naive);}});delete glyph.embedComponents;};if(embed){glyph.embedComponents();}return glyph;};Utils.selectGlyphComponent=function(glyph,componentSrc,componentName,fontSrc,naive,id,index){var component=Utils.glyphFromSrc(fontSrc.glyphs[componentName],fontSrc,naive,// components' subcomponents can be embedded immediatly
true);component.parentParameters={};Utils.mergeStatic(component.parentParameters,componentSrc.parentParameters);naive.annotator(component);component.componentId=id;component.chosen=componentName;component.multiple=Array.isArray(componentSrc.base);if(index===undefined){glyph.addComponent(component);}else{if(glyph.components[index].optionPoint){glyph.components[index].optionPoint.remove();}glyph.components[index].replaceWith(component);}(componentSrc.parentAnchors||[]).forEach(function(anchorSrc){var anchor=new paper.Node();anchor.src=anchorSrc;Utils.mergeStatic(anchor,anchorSrc);component.addParentAnchor(anchor);});};// build a full cursor from arguments
// adds 'contours' and 'nodes' automagically when arguments start with a number
Utils.cursor=function(){var cursor=[];for(var i=-1;++i<arguments.length;){if(i===0&&typeof arguments[0]==='number'){cursor.push('contours');}if(i===1&&typeof arguments[0]==='number'){cursor.push('nodes');}cursor.push(arguments[i]);}return cursor.join('.');};Utils.propFromCursor=function(cursor,context,length){if(length===undefined){length=cursor.length;}for(var i=-1;++i<length;){context=context[cursor[i]];}return context;};Utils.mergeStatic=function(obj,src){for(var i in src){if(_typeof(src[i])!=='object'){obj[i]=src[i];// props that have empty dependencies and params are static
}else if(src[i]._dependencies&&src[i]._dependencies.length===0&&(!src[i]._parameters||src[i]._parameters.length===0)&&src[i]._updaters){obj[i]=src[i]._updaters[0].apply(obj,[null,null,null,null,Utils]);delete src[i];}}};Utils.createUpdaters=function(leaf,path){if(leaf.constructor===Object&&leaf._operation){leaf._updaters=[Utils.createUpdater(leaf,path)];}else if(leaf.constructor===Object){for(var i in leaf){Utils.createUpdaters(leaf[i],path+'.'+i);}}else if(leaf.constructor===Array){leaf.forEach(function(child,j){Utils.createUpdaters(child,path+'.'+j);});}};Utils.updaterCache={};Utils.createUpdater=function(leaf/*, path*/){var sOperation=leaf._operation.toString(),cacheKey=(leaf.parameters||[]).join()+'#'+sOperation;if(cacheKey in Utils.updaterCache){return Utils.updaterCache[cacheKey];}Utils.updaterCache[cacheKey]=Function.apply(null,['propName','contours','anchors','parentAnchors','Utils'].concat(leaf._parameters||[]).concat((typeof leaf._operation==='string'&&leaf._operation.indexOf('return ')===-1?'return ':'')+// The operation might be wrapped in a function (e.g. multi-
// line code for debugging purpose). In this case, return
// must be explicit
sOperation// [\s\S] need to be used instead of . because
// javascript doesn't have a dotall flag (s)
.replace(/^function\s*\(\)\s*\{([\s\S]*?)\}$/,'$1').trim()/* +
                                                             // add sourceURL pragma to help debugging
                                                             // TODO: restore sourceURL pragma if it proves necessary
                                                             '\n\n//# sourceURL=' + path*/));return Utils.updaterCache[cacheKey];};Utils.solveDependencyTree=function(leaf,src){var depTree=Utils.dependencyTree(src||leaf.src,null),order=depTree.resolve().map(function(cursor){return{cursor:cursor.split('.')};}),simplified=Utils.simplifyResolutionOrder(leaf,order);return simplified;};Utils.dependencyTree=function(parentSrc,cursor,depTree){if(!depTree){depTree=new DepTree();}(0,_keys2.default)(parentSrc).forEach(function(i){// don't inspect local parameters, private properties and non-object
if(i==='parameters'||i.indexOf('_')===0||_typeof(parentSrc[i])!=='object'){return;}var leafSrc=parentSrc[i],currCursor=cursor?cursor+'.'+i:i;if(leafSrc._updaters&&leafSrc._updaters.length||leafSrc._dependencies&&leafSrc._dependencies.length){depTree.add(currCursor,leafSrc._dependencies.filter(function(dep){// parentAnchors are always here when you need them
return!/^parentAnchors/.test(dep);}));}if(!leafSrc._operation){Utils.dependencyTree(leafSrc,currCursor,depTree);}});return depTree;};// Simplify resolution order by removing cursors that don't point to objects
// with updater functions
Utils.simplifyResolutionOrder=function(leaf,depTree){return depTree.filter(function(cursor){var src=Utils.propFromCursor(cursor.cursor,leaf.src);return src&&src._updaters;});};var rdeg=/deg$/;Utils.transformsToMatrix=function(transforms,origin){var prev=new Float32Array(6),curr=new Float32Array(6),rslt=new Float32Array([1,0,0,1,0,0]);if(origin&&Array.isArray(origin)){transforms.unshift(['translate',origin[0],origin[1]]);transforms.push(['translate',-origin[0],-origin[1]]);}else if(origin){transforms.unshift(['translate',origin.x,origin.y]);transforms.push(['translate',-origin.x,-origin.y]);}transforms.forEach(function(transform){curr[0]=curr[3]=1;curr[1]=curr[2]=curr[4]=curr[5]=0;// convert degrees to radian
for(var i=1;i<transform.length;i++){if(transform[i]&&typeof transform[i]==='string'&&rdeg.test(transform[i])){transform[i]=parseFloat(transform[i])*(Math.PI*2/360);}}switch(transform[0]){case'translateX':curr[4]=transform[1];break;case'translateY':curr[5]=transform[1];break;case'translate':curr[4]=transform[1];curr[5]=transform[2]||0;break;case'rotate':curr[0]=Math.cos(transform[1]);curr[1]=Math.sin(transform[1]);curr[2]=-curr[1];curr[3]=curr[0];break;case'scaleX':curr[0]=transform[1];break;case'scaleY':curr[3]=transform[1];break;case'scale':curr[0]=transform[1];curr[3]=transform.length>2?transform[2]:transform[1];break;case'skewX':// stop parsing transform when encountering skewX(90)
// see http://stackoverflow.com/questions/21094958/how-to-deal-with-infinity-in-a-2d-matrix
transform[1]=transform[1]%(2*Math.PI);if(transform[1]===Math.PI/2||transform[1]===-Math.PI/2){return rslt;}curr[2]=Math.tan(transform[1]);break;case'skewY':transform[1]=transform[1]%(2*Math.PI);if(transform[1]===Math.PI/2||transform[1]===-Math.PI/2){return rslt;}curr[1]=Math.tan(transform[1]);break;case'matrix':curr[0]=transform[1];curr[1]=transform[2];curr[2]=transform[3];curr[3]=transform[4];curr[4]=transform[5];curr[5]=transform[6];break;}prev[0]=rslt[0];prev[1]=rslt[1];prev[2]=rslt[2];prev[3]=rslt[3];prev[4]=rslt[4];prev[5]=rslt[5];rslt[0]=prev[0]*curr[0]+prev[2]*curr[1];rslt[1]=prev[1]*curr[0]+prev[3]*curr[1];rslt[2]=(prev[0]*curr[2]||0)+prev[2]*curr[3];rslt[3]=(prev[1]*curr[2]||0)+prev[3]*curr[3];rslt[4]=prev[0]*curr[4]+prev[2]*curr[5]+prev[4];rslt[5]=prev[1]*curr[4]+prev[3]*curr[5]+prev[5];});return new paper.Matrix(rslt[0],rslt[1],rslt[2],rslt[3],rslt[4],rslt[5]);};Utils.updateParameters=function(leaf,params){var paramsToUpdate=leaf.src&&leaf.src.parameters||[];if(leaf.parent&&leaf.parent.src){paramsToUpdate=_.assign([],leaf.parent.src.parameters,paramsToUpdate);}(0,_keys2.default)(leaf.src&&paramsToUpdate||[]).forEach(function(name){var src=paramsToUpdate[name];params[name]=src._updaters?src._updaters[0].apply(null,[name,[],[],leaf.parentAnchors,Utils].concat((src._parameters||[]).map(function(_name){return params[_name];}))):src;});};Utils.updateIndividualParameters=function(leaf,params){(0,_keys2.default)(leaf.src&&leaf.src.parameters||[]).forEach(function(name){var src=leaf.src.parameters[name];if(params['indiv_group_param']){(0,_keys2.default)(params['indiv_group_param']).forEach(function(groupName){var needed=false;var group=params['indiv_group_param'][groupName];function handleGroup(_name){return group[_name+'_rel']?group[_name+'_rel'].state==='relative'?group[_name+'_rel'].value*params[_name]:group[_name+'_rel'].value+params[_name]:params[_name];}if(src._parameters){src._parameters.forEach(function(parameter){needed=needed||group[parameter+'_rel'];});if(needed){group[name]=src._updaters?src._updaters[0].apply(null,[name,[],[],leaf.parentAnchors,Utils].concat((src._parameters||[]).map(handleGroup))):src;}}});}});};Utils.updateProperties=function(leaf,params,erroredPreviously){if(!leaf.solvingOrder){return;}var errored;// don't use forEach here as we might add items to the array during the loop
for(var i=0;i<leaf.solvingOrder.length;i++){var _cursor=leaf.solvingOrder[i],cursor=_cursor.cursor,propName=cursor[cursor.length-1],src=_cursor.src||(_cursor.src=Utils.propFromCursor(cursor,leaf.src)),obj=_cursor.obj||(_cursor.obj=Utils.propFromCursor(cursor,leaf,cursor.length-1)),// TODO: one day we could allow multiple _updaters
result;if(src&&src._updaters){try{result=src._updaters[0].apply(obj,[propName,leaf.contours,leaf.anchors,leaf.parentAnchors,Utils].concat((src._parameters||[]).map(function(_name){if(!(_name in params)){}return params[_name];})));if(typeof result==='number'&&isNaN(result)){}}catch(e){// add the failing properties at the end of the solvingOrder
leaf.solvingOrder.push(_cursor);errored=true;}}// Assume that updaters returning undefined have their own
// assignment logic
if(result!==undefined){if(params.manualChanges&&params.manualChanges.cursors){var cursorName=cursor.join('.');var changes=params.manualChanges.cursors[cursorName];if(typeof changes==='number'){if(typeof result==='string'){result=parseFloat(result)+changes/Math.PI*180+'deg';}else if(typeof result==='number'){result+=changes;}}else if((typeof changes==='undefined'?'undefined':_typeof(changes))==='object'){(0,_keys2.default)(changes).forEach(function(key){if(result.hasOwnProperty(key)){if(key!=='width'){if(typeof result[key]==='string'){result[key]=parseFloat(result[key])+changes[key]/Math.PI*180+'deg';}else if(typeof result[key]==='number'){result[key]+=changes[key];}}else{result[key]*=1+changes[key];}}});}delete params.manualChanges.cursors[cursorName];}obj[propName]=result;}}var cursorKeys=params.manualChanges&&params.manualChanges.cursors?(0,_keys2.default)(params.manualChanges.cursors):[];if(cursorKeys.length>0){for(i=0;i<cursorKeys.length;i++){cursor=cursorKeys[i].split('.');var tmpObj=Utils.propFromCursor(cursor,leaf,cursor.length-1);var tmpSrc;if(tmpObj.oldUpdaters&&tmpObj.oldUpdaters[cursor[cursor.length-1]]){tmpSrc=tmpObj.oldUpdaters[cursor[cursor.length-1]];}else{tmpSrc={_updaters:[Utils.createUpdater({_operation:(0,_stringify2.default)(tmpObj[cursor[cursor.length-1]]||0)})]};tmpObj.oldUpdaters=tmpObj.oldUpdaters||{};tmpObj.oldUpdaters[cursor[cursor.length-1]]=tmpSrc;}var newCursor={cursor:cursor,obj:tmpObj,src:tmpSrc,manual:true};leaf.solvingOrder.unshift(newCursor);params.manualChanges.dirty--;}errored=true;erroredPreviously=false;}// If one update errored, we're going to try once more, hoping things will
// get resolved on the second pass.
if(errored&&!erroredPreviously){Utils.updateProperties(leaf,params,true);// any error on the second try will cause it to throw
}else if(errored&&erroredPreviously){throw'Too much update errors, giving up.';}};// The ascender and descender properties must be set to their maximum
// values accross the individualized params groups
Utils.updateXscenderProperties=function(font,params){if(params['indiv_group_param']){var xscenderProperties=['ascender','descender','cap-height','descendent-height'];xscenderProperties.forEach(function(name){var src=font.src.fontinfo[name];(0,_keys2.default)(params['indiv_group_param']).forEach(function(groupName){var group=params['indiv_group_param'][groupName];var sign=font.ot[name]>0?1:-1;font.ot[name]=sign*Math.max(Math.abs(font.ot[name]),Math.abs(src._updaters[0].apply(font.ot,[name,null,null,null,Utils].concat((src._parameters||[]).map(function(_name){return group[_name]||params[_name];})))));});});}};module.exports=Utils;/***/},/* 22 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global,module){/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 *//** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200;/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED='__lodash_hash_undefined__';/** Used as references for various `Number` constants. */var MAX_SAFE_INTEGER=9007199254740991;/** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',boolTag='[object Boolean]',dateTag='[object Date]',errorTag='[object Error]',funcTag='[object Function]',genTag='[object GeneratorFunction]',mapTag='[object Map]',numberTag='[object Number]',objectTag='[object Object]',promiseTag='[object Promise]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',symbolTag='[object Symbol]',weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',dataViewTag='[object DataView]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]';/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;/** Used to match `RegExp` flags from their coerced string values. */var reFlags=/\w*$/;/** Used to detect host constructors (Safari). */var reIsHostCtor=/^\[object .+?Constructor\]$/;/** Used to detect unsigned integer values. */var reIsUint=/^(?:0|[1-9]\d*)$/;/** Used to identify `toStringTag` values supported by `_.clone`. */var cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=true;cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=false;/** Detect free variable `global` from Node.js. */var freeGlobal=(typeof global==='undefined'?'undefined':(0,_typeof4.default)(global))=='object'&&global&&global.Object===Object&&global;/** Detect free variable `self`. */var freeSelf=(typeof self==='undefined'?'undefined':(0,_typeof4.default)(self))=='object'&&self&&self.Object===Object&&self;/** Used as a reference to the global object. */var root=freeGlobal||freeSelf||Function('return this')();/** Detect free variable `exports`. */var freeExports=(typeof exports==='undefined'?'undefined':(0,_typeof4.default)(exports))=='object'&&exports&&!exports.nodeType&&exports;/** Detect free variable `module`. */var freeModule=freeExports&&(typeof module==='undefined'?'undefined':(0,_typeof4.default)(module))=='object'&&module&&!module.nodeType&&module;/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */function addMapEntry(map,pair){// Don't return `map.set` because it's not chainable in IE 11.
map.set(pair[0],pair[1]);return map;}/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */function addSetEntry(set,value){// Don't return `set.add` because it's not chainable in IE 11.
set.add(value);return set;}/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */function arrayEach(array,iteratee){var index=-1,length=array?array.length:0;while(++index<length){if(iteratee(array[index],index,array)===false){break;}}return array;}/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}return array;}/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */function arrayReduce(array,iteratee,accumulator,initAccum){var index=-1,length=array?array.length:0;if(initAccum&&length){accumulator=array[++index];}while(++index<length){accumulator=iteratee(accumulator,array[index],index,array);}return accumulator;}/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}return result;}/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */function getValue(object,key){return object==null?undefined:object[key];}/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */function isHostObject(value){// Many host objects are `Object` objects that can coerce to strings
// despite having improperly defined `toString` methods.
var result=false;if(value!=null&&typeof value.toString!='function'){try{result=!!(value+'');}catch(e){}}return result;}/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value];});return result;}/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */function overArg(func,transform){return function(arg){return func(transform(arg));};}/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value;});return result;}/** Used for built-in method references. */var arrayProto=Array.prototype,funcProto=Function.prototype,objectProto=Object.prototype;/** Used to detect overreaching core-js shims. */var coreJsData=root['__core-js_shared__'];/** Used to detect methods masquerading as native. */var maskSrcKey=function(){var uid=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||'');return uid?'Symbol(src)_1.'+uid:'';}();/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var objectToString=objectProto.toString;/** Used to detect if a method is native. */var reIsNative=RegExp('^'+funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');/** Built-in value references. */var Buffer=moduleExports?root.Buffer:undefined,_Symbol4=root.Symbol,Uint8Array=root.Uint8Array,getPrototype=overArg(_getPrototypeOf2.default,Object),objectCreate=_create2.default,propertyIsEnumerable=objectProto.propertyIsEnumerable,splice=arrayProto.splice;/* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetSymbols=_getOwnPropertySymbols2.default,nativeIsBuffer=Buffer?Buffer.isBuffer:undefined,nativeKeys=overArg(_keys2.default,Object);/* Built-in method references that are verified to be native. */var DataView=getNative(root,'DataView'),Map=getNative(root,'Map'),Promise=getNative(root,'Promise'),Set=getNative(root,'Set'),WeakMap=getNative(root,'WeakMap'),nativeCreate=getNative(Object,'create');/** Used to detect maps, sets, and weakmaps. */var dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap);/** Used to convert symbols to primitives and strings. */var symbolProto=_Symbol4?_Symbol4.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined;/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function Hash(entries){var index=-1,length=entries?entries.length:0;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{};}/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function hashDelete(key){return this.has(key)&&delete this.__data__[key];}/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];return result===HASH_UNDEFINED?undefined:result;}return hasOwnProperty.call(data,key)?data[key]:undefined;}/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function hashHas(key){var data=this.__data__;return nativeCreate?data[key]!==undefined:hasOwnProperty.call(data,key);}/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */function hashSet(key,value){var data=this.__data__;data[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;return this;}// Add methods to `Hash`.
Hash.prototype.clear=hashClear;Hash.prototype['delete']=hashDelete;Hash.prototype.get=hashGet;Hash.prototype.has=hashHas;Hash.prototype.set=hashSet;/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function ListCache(entries){var index=-1,length=entries?entries.length:0;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */function listCacheClear(){this.__data__=[];}/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function listCacheDelete(key){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){return false;}var lastIndex=data.length-1;if(index==lastIndex){data.pop();}else{splice.call(data,index,1);}return true;}/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function listCacheGet(key){var data=this.__data__,index=assocIndexOf(data,key);return index<0?undefined:data[index][1];}/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function listCacheHas(key){return assocIndexOf(this.__data__,key)>-1;}/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */function listCacheSet(key,value){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){data.push([key,value]);}else{data[index][1]=value;}return this;}// Add methods to `ListCache`.
ListCache.prototype.clear=listCacheClear;ListCache.prototype['delete']=listCacheDelete;ListCache.prototype.get=listCacheGet;ListCache.prototype.has=listCacheHas;ListCache.prototype.set=listCacheSet;/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function MapCache(entries){var index=-1,length=entries?entries.length:0;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */function mapCacheClear(){this.__data__={'hash':new Hash(),'map':new(Map||ListCache)(),'string':new Hash()};}/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function mapCacheDelete(key){return getMapData(this,key)['delete'](key);}/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function mapCacheGet(key){return getMapData(this,key).get(key);}/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function mapCacheHas(key){return getMapData(this,key).has(key);}/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */function mapCacheSet(key,value){getMapData(this,key).set(key,value);return this;}// Add methods to `MapCache`.
MapCache.prototype.clear=mapCacheClear;MapCache.prototype['delete']=mapCacheDelete;MapCache.prototype.get=mapCacheGet;MapCache.prototype.has=mapCacheHas;MapCache.prototype.set=mapCacheSet;/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function Stack(entries){this.__data__=new ListCache(entries);}/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */function stackClear(){this.__data__=new ListCache();}/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function stackDelete(key){return this.__data__['delete'](key);}/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function stackGet(key){return this.__data__.get(key);}/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function stackHas(key){return this.__data__.has(key);}/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */function stackSet(key,value){var cache=this.__data__;if(cache instanceof ListCache){var pairs=cache.__data__;if(!Map||pairs.length<LARGE_ARRAY_SIZE-1){pairs.push([key,value]);return this;}cache=this.__data__=new MapCache(pairs);}cache.set(key,value);return this;}// Add methods to `Stack`.
Stack.prototype.clear=stackClear;Stack.prototype['delete']=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet;/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */function arrayLikeKeys(value,inherited){// Safari 8.1 makes `arguments.callee` enumerable in strict mode.
// Safari 9 makes `arguments.length` enumerable in strict mode.
var result=isArray(value)||isArguments(value)?baseTimes(value.length,String):[];var length=result.length,skipIndexes=!!length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(key=='length'||isIndex(key,length)))){result.push(key);}}return result;}/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */function assignValue(object,key,value){var objValue=object[key];if(!(hasOwnProperty.call(object,key)&&eq(objValue,value))||value===undefined&&!(key in object)){object[key]=value;}}/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function assocIndexOf(array,key){var length=array.length;while(length--){if(eq(array[length][0],key)){return length;}}return-1;}/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */function baseAssign(object,source){return object&&copyObject(source,keys(source),object);}/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */function baseClone(value,isDeep,isFull,customizer,key,object,stack){var result;if(customizer){result=object?customizer(value,key,object,stack):customizer(value);}if(result!==undefined){return result;}if(!isObject(value)){return value;}var isArr=isArray(value);if(isArr){result=initCloneArray(value);if(!isDeep){return copyArray(value,result);}}else{var tag=getTag(value),isFunc=tag==funcTag||tag==genTag;if(isBuffer(value)){return cloneBuffer(value,isDeep);}if(tag==objectTag||tag==argsTag||isFunc&&!object){if(isHostObject(value)){return object?value:{};}result=initCloneObject(isFunc?{}:value);if(!isDeep){return copySymbols(value,baseAssign(result,value));}}else{if(!cloneableTags[tag]){return object?value:{};}result=initCloneByTag(value,tag,baseClone,isDeep);}}// Check for circular references and return its corresponding clone.
stack||(stack=new Stack());var stacked=stack.get(value);if(stacked){return stacked;}stack.set(value,result);if(!isArr){var props=isFull?getAllKeys(value):keys(value);}arrayEach(props||value,function(subValue,key){if(props){key=subValue;subValue=value[key];}// Recursively populate clone (susceptible to call stack limits).
assignValue(result,key,baseClone(subValue,isDeep,isFull,customizer,key,value,stack));});return result;}/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */function baseCreate(proto){return isObject(proto)?objectCreate(proto):{};}/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */function baseGetAllKeys(object,keysFunc,symbolsFunc){var result=keysFunc(object);return isArray(object)?result:arrayPush(result,symbolsFunc(object));}/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */function baseGetTag(value){return objectToString.call(value);}/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */function baseIsNative(value){if(!isObject(value)||isMasked(value)){return false;}var pattern=isFunction(value)||isHostObject(value)?reIsNative:reIsHostCtor;return pattern.test(toSource(value));}/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object);}var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!='constructor'){result.push(key);}}return result;}/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */function cloneBuffer(buffer,isDeep){if(isDeep){return buffer.slice();}var result=new buffer.constructor(buffer.length);buffer.copy(result);return result;}/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */function cloneArrayBuffer(arrayBuffer){var result=new arrayBuffer.constructor(arrayBuffer.byteLength);new Uint8Array(result).set(new Uint8Array(arrayBuffer));return result;}/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */function cloneDataView(dataView,isDeep){var buffer=isDeep?cloneArrayBuffer(dataView.buffer):dataView.buffer;return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength);}/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */function cloneMap(map,isDeep,cloneFunc){var array=isDeep?cloneFunc(mapToArray(map),true):mapToArray(map);return arrayReduce(array,addMapEntry,new map.constructor());}/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source,reFlags.exec(regexp));result.lastIndex=regexp.lastIndex;return result;}/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */function cloneSet(set,isDeep,cloneFunc){var array=isDeep?cloneFunc(setToArray(set),true):setToArray(set);return arrayReduce(array,addSetEntry,new set.constructor());}/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */function cloneSymbol(symbol){return symbolValueOf?Object(symbolValueOf.call(symbol)):{};}/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */function cloneTypedArray(typedArray,isDeep){var buffer=isDeep?cloneArrayBuffer(typedArray.buffer):typedArray.buffer;return new typedArray.constructor(buffer,typedArray.byteOffset,typedArray.length);}/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */function copyArray(source,array){var index=-1,length=source.length;array||(array=Array(length));while(++index<length){array[index]=source[index];}return array;}/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */function copyObject(source,props,object,customizer){object||(object={});var index=-1,length=props.length;while(++index<length){var key=props[index];var newValue=customizer?customizer(object[key],source[key],key,object,source):undefined;assignValue(object,key,newValue===undefined?source[key]:newValue);}return object;}/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */function copySymbols(source,object){return copyObject(source,getSymbols(source),object);}/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */function getAllKeys(object){return baseGetAllKeys(object,keys,getSymbols);}/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */function getMapData(map,key){var data=map.__data__;return isKeyable(key)?data[typeof key=='string'?'string':'hash']:data.map;}/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */function getNative(object,key){var value=getValue(object,key);return baseIsNative(value)?value:undefined;}/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */var getSymbols=nativeGetSymbols?overArg(nativeGetSymbols,Object):stubArray;/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */var getTag=baseGetTag;// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||Map&&getTag(new Map())!=mapTag||Promise&&getTag(Promise.resolve())!=promiseTag||Set&&getTag(new Set())!=setTag||WeakMap&&getTag(new WeakMap())!=weakMapTag){getTag=function getTag(value){var result=objectToString.call(value),Ctor=result==objectTag?value.constructor:undefined,ctorString=Ctor?toSource(Ctor):undefined;if(ctorString){switch(ctorString){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag;}}return result;};}/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */function initCloneArray(array){var length=array.length,result=array.constructor(length);// Add properties assigned by `RegExp#exec`.
if(length&&typeof array[0]=='string'&&hasOwnProperty.call(array,'index')){result.index=array.index;result.input=array.input;}return result;}/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */function initCloneObject(object){return typeof object.constructor=='function'&&!isPrototype(object)?baseCreate(getPrototype(object)):{};}/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */function initCloneByTag(object,tag,cloneFunc,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return cloneArrayBuffer(object);case boolTag:case dateTag:return new Ctor(+object);case dataViewTag:return cloneDataView(object,isDeep);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(object,isDeep);case mapTag:return cloneMap(object,isDeep,cloneFunc);case numberTag:case stringTag:return new Ctor(object);case regexpTag:return cloneRegExp(object);case setTag:return cloneSet(object,isDeep,cloneFunc);case symbolTag:return cloneSymbol(object);}}/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */function isIndex(value,length){length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(typeof value=='number'||reIsUint.test(value))&&value>-1&&value%1==0&&value<length;}/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */function isKeyable(value){var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);return type=='string'||type=='number'||type=='symbol'||type=='boolean'?value!=='__proto__':value===null;}/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */function isMasked(func){return!!maskSrcKey&&maskSrcKey in func;}/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */function isPrototype(value){var Ctor=value&&value.constructor,proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;return value===proto;}/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */function toSource(func){if(func!=null){try{return funcToString.call(func);}catch(e){}try{return func+'';}catch(e){}}return'';}/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */function cloneDeep(value){return baseClone(value,true,true);}/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */function eq(value,other){return value===other||value!==value&&other!==other;}/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */function isArguments(value){// Safari 8.1 makes `arguments.callee` enumerable in strict mode.
return isArrayLikeObject(value)&&hasOwnProperty.call(value,'callee')&&(!propertyIsEnumerable.call(value,'callee')||objectToString.call(value)==argsTag);}/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */var isArray=Array.isArray;/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value);}/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */function isArrayLikeObject(value){return isObjectLike(value)&&isArrayLike(value);}/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */var isBuffer=nativeIsBuffer||stubFalse;/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function isFunction(value){// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 8-9 which returns 'object' for typed array and other constructors.
var tag=isObject(value)?objectToString.call(value):'';return tag==funcTag||tag==genTag;}/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */function isLength(value){return typeof value=='number'&&value>-1&&value%1==0&&value<=MAX_SAFE_INTEGER;}/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */function isObject(value){var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);return!!value&&(type=='object'||type=='function');}/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */function isObjectLike(value){return!!value&&(typeof value==='undefined'?'undefined':(0,_typeof4.default)(value))=='object';}/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */function keys(object){return isArrayLike(object)?arrayLikeKeys(object):baseKeys(object);}/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */function stubArray(){return[];}/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */function stubFalse(){return false;}module.exports=cloneDeep;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(40),__webpack_require__(20)(module));/***/},/* 23 *//***/function(module,exports,__webpack_require__){var ListCache=__webpack_require__(6),stackClear=__webpack_require__(112),stackDelete=__webpack_require__(113),stackGet=__webpack_require__(114),stackHas=__webpack_require__(115),stackSet=__webpack_require__(116);/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function Stack(entries){var data=this.__data__=new ListCache(entries);this.size=data.size;}// Add methods to `Stack`.
Stack.prototype.clear=stackClear;Stack.prototype['delete']=stackDelete;Stack.prototype.get=stackGet;Stack.prototype.has=stackHas;Stack.prototype.set=stackSet;module.exports=Stack;/***/},/* 24 *//***/function(module,exports,__webpack_require__){var castPath=__webpack_require__(27),toKey=__webpack_require__(11);/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */function baseGet(object,path){path=castPath(path,object);var index=0,length=path.length;while(object!=null&&index<length){object=object[toKey(path[index++])];}return index&&index==length?object:undefined;}module.exports=baseGet;/***/},/* 25 *//***/function(module,exports,__webpack_require__){var baseIsEqualDeep=__webpack_require__(61),isObjectLike=__webpack_require__(4);/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */function baseIsEqual(value,other,bitmask,customizer,stack){if(value===other){return true;}if(value==null||other==null||!isObjectLike(value)&&!isObjectLike(other)){return value!==value&&other!==other;}return baseIsEqualDeep(value,other,bitmask,customizer,baseIsEqual,stack);}module.exports=baseIsEqual;/***/},/* 26 *//***/function(module,exports,__webpack_require__){var baseMatches=__webpack_require__(66),baseMatchesProperty=__webpack_require__(67),identity=__webpack_require__(122),isArray=__webpack_require__(1),property=__webpack_require__(124);/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */function baseIteratee(value){// Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
// See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
if(typeof value=='function'){return value;}if(value==null){return identity;}if((typeof value==='undefined'?'undefined':(0,_typeof4.default)(value))=='object'){return isArray(value)?baseMatchesProperty(value[0],value[1]):baseMatches(value);}return property(value);}module.exports=baseIteratee;/***/},/* 27 *//***/function(module,exports,__webpack_require__){var isArray=__webpack_require__(1),isKey=__webpack_require__(17),stringToPath=__webpack_require__(117),toString=__webpack_require__(130);/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */function castPath(value,object){if(isArray(value)){return value;}return isKey(value,object)?[value]:stringToPath(toString(value));}module.exports=castPath;/***/},/* 28 *//***/function(module,exports,__webpack_require__){var SetCache=__webpack_require__(49),arraySome=__webpack_require__(56),cacheHas=__webpack_require__(73);/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */function equalArrays(array,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,arrLength=array.length,othLength=other.length;if(arrLength!=othLength&&!(isPartial&&othLength>arrLength)){return false;}// Assume cyclic values are equal.
var stacked=stack.get(array);if(stacked&&stack.get(other)){return stacked==other;}var index=-1,result=true,seen=bitmask&COMPARE_UNORDERED_FLAG?new SetCache():undefined;stack.set(array,other);stack.set(other,array);// Ignore non-index properties.
while(++index<arrLength){var arrValue=array[index],othValue=other[index];if(customizer){var compared=isPartial?customizer(othValue,arrValue,index,other,array,stack):customizer(arrValue,othValue,index,array,other,stack);}if(compared!==undefined){if(compared){continue;}result=false;break;}// Recursively compare arrays (susceptible to call stack limits).
if(seen){if(!arraySome(other,function(othValue,othIndex){if(!cacheHas(seen,othIndex)&&(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){return seen.push(othIndex);}})){result=false;break;}}else if(!(arrValue===othValue||equalFunc(arrValue,othValue,bitmask,customizer,stack))){result=false;break;}}stack['delete'](array);stack['delete'](other);return result;}module.exports=equalArrays;/***/},/* 29 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(global){/** Detect free variable `global` from Node.js. */var freeGlobal=(typeof global==='undefined'?'undefined':(0,_typeof4.default)(global))=='object'&&global&&global.Object===Object&&global;module.exports=freeGlobal;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(40));/***/},/* 30 *//***/function(module,exports){/** Used as references for various `Number` constants. */var MAX_SAFE_INTEGER=9007199254740991;/** Used to detect unsigned integer values. */var reIsUint=/^(?:0|[1-9]\d*)$/;/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */function isIndex(value,length){length=length==null?MAX_SAFE_INTEGER:length;return!!length&&(typeof value=='number'||reIsUint.test(value))&&value>-1&&value%1==0&&value<length;}module.exports=isIndex;/***/},/* 31 *//***/function(module,exports,__webpack_require__){var isObject=__webpack_require__(12);/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */function isStrictComparable(value){return value===value&&!isObject(value);}module.exports=isStrictComparable;/***/},/* 32 *//***/function(module,exports){/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */function matchesStrictComparable(key,srcValue){return function(object){if(object==null){return false;}return object[key]===srcValue&&(srcValue!==undefined||key in Object(object));};}module.exports=matchesStrictComparable;/***/},/* 33 *//***/function(module,exports){/** Used for built-in method references. */var funcProto=Function.prototype;/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */function toSource(func){if(func!=null){try{return funcToString.call(func);}catch(e){}try{return func+'';}catch(e){}}return'';}module.exports=toSource;/***/},/* 34 *//***/function(module,exports){/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */function eq(value,other){return value===other||value!==value&&other!==other;}module.exports=eq;/***/},/* 35 *//***/function(module,exports,__webpack_require__){var baseIsArguments=__webpack_require__(60),isObjectLike=__webpack_require__(4);/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/** Built-in value references. */var propertyIsEnumerable=objectProto.propertyIsEnumerable;/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */var isArguments=baseIsArguments(function(){return arguments;}())?baseIsArguments:function(value){return isObjectLike(value)&&hasOwnProperty.call(value,'callee')&&!propertyIsEnumerable.call(value,'callee');};module.exports=isArguments;/***/},/* 36 *//***/function(module,exports,__webpack_require__){var isFunction=__webpack_require__(38),isLength=__webpack_require__(18);/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */function isArrayLike(value){return value!=null&&isLength(value.length)&&!isFunction(value);}module.exports=isArrayLike;/***/},/* 37 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(module){var root=__webpack_require__(0),stubFalse=__webpack_require__(126);/** Detect free variable `exports`. */var freeExports=(typeof exports==='undefined'?'undefined':(0,_typeof4.default)(exports))=='object'&&exports&&!exports.nodeType&&exports;/** Detect free variable `module`. */var freeModule=freeExports&&(typeof module==='undefined'?'undefined':(0,_typeof4.default)(module))=='object'&&module&&!module.nodeType&&module;/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;/** Built-in value references. */var Buffer=moduleExports?root.Buffer:undefined;/* Built-in method references for those with the same name as other `lodash` methods. */var nativeIsBuffer=Buffer?Buffer.isBuffer:undefined;/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */var isBuffer=nativeIsBuffer||stubFalse;module.exports=isBuffer;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(20)(module));/***/},/* 38 *//***/function(module,exports,__webpack_require__){var baseGetTag=__webpack_require__(3),isObject=__webpack_require__(12);/** `Object#toString` result references. */var asyncTag='[object AsyncFunction]',funcTag='[object Function]',genTag='[object GeneratorFunction]',proxyTag='[object Proxy]';/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function isFunction(value){if(!isObject(value)){return false;}// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 9 which returns 'object' for typed arrays and other constructors.
var tag=baseGetTag(value);return tag==funcTag||tag==genTag||tag==asyncTag||tag==proxyTag;}module.exports=isFunction;/***/},/* 39 *//***/function(module,exports,__webpack_require__){var baseIsTypedArray=__webpack_require__(64),baseUnary=__webpack_require__(72),nodeUtil=__webpack_require__(106);/* Node.js helper references. */var nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray;/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */var isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray;module.exports=isTypedArray;/***/},/* 40 *//***/function(module,exports){var g;// This works in non-strict mode
g=function(){return this;}();try{// This works if eval is allowed (see CSP)
g=g||Function("return this")()||(1,eval)("this");}catch(e){// This works if the window reference is available
if((typeof window==='undefined'?'undefined':(0,_typeof4.default)(window))==="object")g=window;}// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}
module.exports=g;/***/},/* 41 *//***/function(module,exports,__webpack_require__){var plumin=__webpack_require__(5),assign=__webpack_require__(14),cloneDeep=__webpack_require__(22),Utils=__webpack_require__(21),naive=__webpack_require__(42),find=__webpack_require__(118);var paper=plumin.paper,psProto=paper.PaperScope.prototype,_={assign:assign,find:find};function parametricFont(src){var font=Utils.fontFromSrc(src);(0,_keys2.default)(src.glyphs).forEach(function(name){var glyphSrc=src.glyphs[name];Utils.ufoToPaper(glyphSrc);var glyph=Utils.glyphFromSrc(glyphSrc,src,naive);font.addGlyph(glyph);// Create additional paths for skeletons and set ._dependencies
// appropriately
naive.annotator(glyph);// solvingOrder might be already available (if this is a subcomponent,
// or precomputed in a worker)
if(!glyph.solvingOrder){glyph.solvingOrder=glyphSrc.solvingOrder=Utils.solveDependencyTree(glyph);}});// all glyphs are ready, embed components now
font.glyphs.forEach(function(_glyph){if(_glyph.embedComponents){_glyph.embedComponents();}});return font;}plumin.parametricFont=parametricFont;plumin.Utils=Utils;plumin.Utils.naive=naive;psProto.Font.prototype.update=function(params,set){var font=this;var subset=this.getGlyphSubset(set);if(params.altList){(0,_keys2.default)(params.altList).forEach(function(unicode){var charMap=font.charMap;if(charMap[unicode]&&charMap[unicode].name!==params.altList[unicode]){var oldGlyph=charMap[unicode];font.setAlternateFor(unicode,params.altList[unicode]);var index=subset.indexOf(oldGlyph);if(index!==-1){subset[index]=charMap[unicode];}}});}Utils.updateParameters(font,params);// Additionally, we must update the params of indiv group
Utils.updateIndividualParameters(font,params);Utils.updateProperties(font,params);Utils.updateXscenderProperties(font,params);subset.map(function(glyph){return glyph.update(params);},this);// We no longer support font transforms. Transforms should happen at the
// glyph level, where they can be individualized.
return this;};psProto.Font.prototype.resetComponents=function(){this.glyphs.forEach(function(glyph){glyph.resetComponents(this.src);}.bind(this));};psProto.Path.prototype._drawOld=psProto.Path.prototype._draw;psProto.Path.prototype._draw=function(ctx,param,viewMatrix,strokeMatrix){if(this.applyMatrix){var realViewMatrix=new psProto.Matrix(this.view.zoom/window.devicePixelRatio,viewMatrix.b/window.devicePixelRatio,viewMatrix.c/window.devicePixelRatio,this.view.zoom/window.devicePixelRatio,(-this.view.center.x+this.view.bounds.width/2)*this.view.zoom/window.devicePixelRatio,(-this.view.center.y+this.view.bounds.height/2)*this.view.zoom/window.devicePixelRatio);realViewMatrix.a=realViewMatrix.a*this.parent.globalMatrix.a;realViewMatrix.d=realViewMatrix.d*this.parent.globalMatrix.d;realViewMatrix.tx=realViewMatrix.tx+this.parent.globalMatrix.tx*this.view.zoom/window.devicePixelRatio;realViewMatrix.ty=realViewMatrix.ty+this.parent.globalMatrix.ty*this.view.zoom/window.devicePixelRatio;this._drawOld(ctx,param,realViewMatrix,realViewMatrix);}else{this._drawOld(ctx,param,realViewMatrix,strokeMatrix);}};psProto.CompoundPath.prototype._drawOld=psProto.CompoundPath.prototype._draw;psProto.CompoundPath.prototype._draw=function(ctx,param,viewMatrix){var realViewMatrix=new psProto.Matrix(this.view.zoom/window.devicePixelRatio,viewMatrix.b/window.devicePixelRatio,viewMatrix.c/window.devicePixelRatio,this.view.zoom/window.devicePixelRatio,(-this.view.center.x+this.view.bounds.width/2)*this.view.zoom/window.devicePixelRatio,(-this.view.center.y+this.view.bounds.height/2)*this.view.zoom/window.devicePixelRatio);realViewMatrix.a=realViewMatrix.a*this.parent.globalMatrix.a;realViewMatrix.d=realViewMatrix.d*this.parent.globalMatrix.d;realViewMatrix.tx=realViewMatrix.tx+this.parent.globalMatrix.tx*this.view.zoom/window.devicePixelRatio;realViewMatrix.ty=realViewMatrix.ty+this.parent.globalMatrix.ty*this.view.zoom/window.devicePixelRatio;this._drawOld(ctx,param,realViewMatrix,realViewMatrix);};psProto.Font.prototype.changeCursorsToManual=function(glyphUnicode,cursors){var font=this;// TODO manage alternates
font.altMap[glyphUnicode][0].changeCursorsToManual(cursors);};psProto.Font.prototype.setAlternatesFor=function(unicode,glyphName){var font=this;var glyph=font.charMap[unicode].src;var nextGlyph=font.children[glyphName].src;var result=[];(glyph.relatedGlyphs||[]).forEach(function(name){var relatedGlyph=font.children[name].src;var alternateName=relatedGlyph.name.replace(relatedGlyph.base||relatedGlyph.name,nextGlyph.base||nextGlyph.name);if(font.children[alternateName]){// checking alternate's existence
font.setAlternateFor(relatedGlyph.unicode,alternateName);result.push({glyph:relatedGlyph.unicode,name:alternateName});}});font.setAlternateFor(unicode,glyphName);result.push({glyph:unicode,name:glyphName});return result;};/* Update the shape of the glyph, according to formula and parameters
 * 0. before running, nodes have already been created by ParametricFont
 *   (including expanded ones thanks to naive.expandSkeletons). And static
 *   properties have been copied over to those nodes
 * 1. We use the solving order to calculate all node properties
 * 2. transform contours
 * 3. Update components and transform them
 */psProto.Glyph.prototype.update=function(_params){var _this=this;var glyph=this,font=glyph.parent,matrix,subset=font.subset,params;if(_params){this.oldParams=_params;}else if(this.oldParams){_params=this.oldParams;}else{return;}if(_params.altList&&font.charMap&&subset){var unicode=_.find((0,_keys2.default)(_params.altList),function(o){return parseInt(o)===_this.ot.unicode;});if(unicode&&this.name!==_params.altList[unicode].name){var charMap=font.charMap;if(charMap[unicode]&&charMap[unicode].name!==_params.altList[unicode]){var index=subset.indexOf(charMap[unicode]);font.setAlternateFor(unicode,_params.altList[unicode]);subset[index]=charMap[unicode];charMap[unicode].update(_params,subset);return charMap[unicode];}}}// 0. calculate local parameters
if(_params['indiv_glyphs']&&(0,_keys2.default)(_params['indiv_glyphs']).indexOf(''+glyph.ot.unicode)!==-1){var indivParam={};(0,_keys2.default)(_params).forEach(function(param){if(typeof _params[param]==='number'){var groups=_params['indiv_group_param'][_params['indiv_glyphs'][glyph.ot.unicode]],multiplier=groups[param+'_rel']||{state:'relative',value:1};indivParam[param]=groups[param]||(multiplier.state==='relative'?multiplier.value*_params[param]:multiplier.value+_params[param]);}});params=_.assign({},_params,indivParam,glyph.parentParameters);}else{params=_.assign({},_params,glyph.parentParameters);}Utils.updateParameters(glyph,params);// original values backup
glyph.baseSpacingLeft=params.spacingLeft;glyph.baseSpacingRight=params.spacingRight;// if we have special properties to compute
if(params.glyphSpecialProps&&params.glyphSpecialProps[glyph.ot.unicode]){var propsToUpdate=params.glyphSpecialProps[glyph.ot.unicode];(0,_keys2.default)(propsToUpdate).forEach(function(property){params[property]=params[property]+propsToUpdate[property];});}glyph.spacingLeft=params.spacingLeft;glyph.spacingRight=params.spacingRight;// parentParameters always overwrite glyph parameters. Use aliases
// (e.g. _width) to let glyph have the final word
_.assign(params,glyph.parentParameters);if(params.glyphComponentChoice&&params.glyphComponentChoice[glyph.ot.unicode]){var componentsChoices=params.glyphComponentChoice[glyph.ot.unicode];(0,_keys2.default)(componentsChoices).forEach(function(key){var componentFilter=glyph.components.filter(function(comp){return comp.componentId===key;});if(componentFilter.length>0){var component=componentFilter[0];var availableComponent=(glyph.src.components.find(function(compAvail){return compAvail.id===key;})||{base:[]}).base.indexOf(componentsChoices[key])!==-1;if(component.chosen!==componentsChoices[key]&&availableComponent){glyph.changeComponent(key,componentsChoices[key]);}}});}// 1. calculate node properties
if(_params.manualChanges){params.manualChanges=cloneDeep(_params.manualChanges[glyph.name]);}Utils.updateProperties(glyph,params);// 2. transform contours
this.contours.forEach(function(contour){// a. transform the nodes
contour.nodes.forEach(function(node){if(node.transforms){matrix=Utils.transformsToMatrix(node.transforms.slice(0),node.transformOrigin);if(contour.skeleton!==true){node.transform(matrix);// when dealing with a skeleton, modify only the matrix of
// expanded items
}else{node.expandedTo.forEach(function(_node){_node.transform(matrix);});}}});// b. transform the contour
// prepare and update outlines and expanded contours, but not
// skeletons
if(contour.transforms){matrix=Utils.transformsToMatrix(contour.transforms.slice(0),contour.transformOrigin);if(contour.skeleton!==true){// We don't want to apply the transforms immediatly on contours,
// otherwise the transformation will add-up on each update.
contour.applyMatrix=false;contour.matrix=matrix;// when dealing with a skeleton, modify only the matrix of
// expanded items
}else{contour.expandedTo.forEach(function(_contour){_contour.applyMatrix=false;_contour.matrix=matrix;});}}},this);// 3. update components and transform components
if(this.components.length&&font){// subcomponents have the parent component as their parent
// so search for the font
while(!('glyphs'in font)){font=font.parent;}this.components.forEach(function(component){component.update(params);if(component.transforms){matrix=Utils.transformsToMatrix(component.transforms.slice(0),component.transformOrigin);component.applyMatrix=false;component.matrix=matrix;}},this);}// 4. transform whole glyph
if(glyph.transforms){matrix=Utils.transformsToMatrix(glyph.transforms.slice(0),glyph.transformOrigin);glyph.applyMatrix=false;glyph.matrix=matrix;}glyph.glyphWidth=glyph.bounds.width;return this;};psProto.Glyph.prototype.resetComponents=function(){if(this.src){this.src.components.forEach(function(componentSrc){if(Array.isArray(componentSrc.base)){this.changeComponent(componentSrc.id,componentSrc.base[0]);}}.bind(this));}};psProto.Glyph.prototype.changeComponent=function(componentId,componentName){var glyph=this;//We remove the old components
var componentToDelete=glyph.components.filter(function(comp){return comp.componentId===componentId;})[0];//And remove its handle from the view
componentToDelete.contours.forEach(function(contour){contour.fullySelected=false;});//And add the correct components
var componentSrc=glyph.src.components.filter(function(comp){return comp.id===componentId;})[0];glyph.solvingOrder=undefined;glyph.src.solvingOrder=undefined;Utils.selectGlyphComponent(glyph,componentSrc,componentName,glyph.parent.src,Utils.naive,componentId,glyph.components.indexOf(componentToDelete));glyph.solvingOrder=glyph.src.solvingOrder=Utils.solveDependencyTree(glyph);glyph.update();};// Before updating SVG or OpenType data, we must determine paths exports
// directions. Basically, everything needs to be clockwise.
// this method needs to be called only after the first update, otherwise the
// directions won't be known
psProto.Outline.prototype.prepareDataUpdate=function(){if(this.isPrepared){return;}this.children.forEach(function(contour){// expanded contours are handled from their skeleton
if(contour.expandedFrom||contour.exportReversed){return;}if(contour.skeleton!==true){contour.exportReversed=!contour.isClockwise();}else if(!contour.expandedTo[1]){contour.expandedTo[0].exportReversed=!contour.expandedTo[0].isClockwise();}else{var isClockwise=contour.isClockwise();contour.expandedTo[0].exportReversed=!isClockwise;contour.expandedTo[1].exportReversed=!isClockwise;}});this.isPrepared=true;};// for the following plumin methods, the outline must be prepared beforehand
// to be usable in prototypo.js
['updateSVGData','updateOTCommands','combineTo'].forEach(function(name){var method=paper.PaperScope.prototype.Outline.prototype[name];psProto.Outline.prototype[name]=function(){if(!this.isPrepared){this.prepareDataUpdate();this.isPrepared=true;}return method.apply(this,arguments);};});plumin.cloneDeep=cloneDeep;module.exports=plumin;/***/},/* 42 *//***/function(module,exports,__webpack_require__){var plumin=__webpack_require__(5),assign=__webpack_require__(14),Utils=__webpack_require__(21);var paper=plumin.paper,naive={},_={assign:assign};function autoExpandableNodeSrc(node,i,j,inSkeleton){return{point:{_dependencies:[Utils.cursor(i,j,'x'),Utils.cursor(i,j,'y')]},all:{_dependencies:(0,_keys2.default)(node.src).map(function(key){return Utils.cursor(i,j,key);})},_dependencies:inSkeleton?// nodes in skeleton are never fully calculated (we don't calculate
// the position of handles because we never draw their contour).
// So we don't care about their dependencies.
[]:[Utils.cursor('contours',i,'all')]};}function autoExpandedNodeSrc(node,i,j,side,isClosed){return{x:{_dependencies:[Utils.cursor(i,j,'expandedTo',side,'point')]},y:{_dependencies:[Utils.cursor(i,j,'expandedTo',side,'point')]},point:{_dependencies:[Utils.cursor(i,j,'x'),Utils.cursor(i,j,'y'),Utils.cursor(i,j,'expand')],_parameters:['width'],_updaters:[function(){var width=arguments[arguments.length-1];naive.expandedNodeUpdater(node.expandedTo[side],side===0,width);}]},all:{_dependencies:(0,_keys2.default)(node.src).map(function(key){return Utils.cursor(i,j,key);}).concat([Utils.cursor(i,j,'expandedTo',side,'point')]),_updaters:[function(){naive.skeletonCopier(node);}]},_dependencies:[Utils.cursor('contours',i,'expandedTo',isClosed?side:0,'all')]};}function explicitExpandableNodeSrc(node,i,j){return{point:{_dependencies:[]},all:{_dependencies:[0,1].map(function(side){return Utils.cursor(i,j,'expandedTo',side,'all');})},_dependencies:[]};}function explicitExpandedNodeSrc(node,i,j,side,isClosed){return{point:{_dependencies:[Utils.cursor(i,j,'expandedTo',side,'x'),Utils.cursor(i,j,'expandedTo',side,'y')]},all:{_dependencies:(0,_keys2.default)(node.src.expandedTo[side]).map(function(key){return Utils.cursor(i,j,'expandedTo',side,key);})},_dependencies:[Utils.cursor('contours',i,'expandedTo',isClosed?side:0,'all')]};}function expandedContourSrc(contour,i,side){var half=contour.nodes.length/2;return{all:{_dependencies:contour.nodes.map(function(node,j){return side!==undefined?Utils.cursor(i,j,'expandedTo',side,'all'):Utils.cursor(i,j%half,'expandedTo',j<half?0:1,'all');}),_parameters:['curviness'],_updaters:[function(){var curviness=arguments[arguments.length-1];naive.prepareContour(contour);naive.updateContour(contour,curviness);}]},// nodes: nodesSrc,
_dependencies:[Utils.cursor('contours',i,'expandedTo',side||0,'all')]};}function contourSrc(contour,i){return{all:{_dependencies:contour.nodes.map(function(node,j){return Utils.cursor(i,j,'all');}),_parameters:['curviness'],_updaters:[function(){var curviness=arguments[arguments.length-1];naive.prepareContour(contour);naive.updateContour(contour,curviness);}]},_dependencies:contour.nodes.map(function(node,j){return Utils.cursor(i,j);})};}// default method to expand skeletons:
// derives two additional node from every node with an .expand object
naive.annotator=function(glyph){var additionalContours=[];glyph.contours.forEach(function(contour,i){if(contour.skeleton!==true){// annotate nodes+points that aren't in a skeleton
contour.nodes.forEach(function(node,j){_.assign(node.src,autoExpandableNodeSrc(node,i,j));});_.assign(contour.src,contourSrc(contour,i));return;}var leftContour,rightContour,leftNodes=[],rightNodes=[],leftNodesSrc=[],rightNodesSrc=[],firstNode,lastNode;// skeletons should be hidden
contour.visible=false;contour.nodes.forEach(function(node,j){var left=new paper.Node(),right=new paper.Node(),leftSrc,rightSrc;leftNodes.push(left);rightNodes.unshift(right);node.expandedTo=[left,right];left.expandedFrom=right.expandedFrom=node;if(!node.src.expandedTo){// annotate nodes+points that are automatically expanded
leftSrc=autoExpandedNodeSrc(node,i,j,0,contour.closed);rightSrc=autoExpandedNodeSrc(node,i,j,1,contour.closed);node.src.expandedTo=[leftSrc,rightSrc];_.assign(node.src,autoExpandableNodeSrc(node,i,j,!!'inSkeleton'));// the expanded node might have been defined explicitely
}else if(node.src.expandedTo[0]&&!node.src.expandedTo[0]._updaters){node.src.expandedTo.forEach(function(src,k){Utils.mergeStatic(node.expandedTo[k],src);});// annotate nodes+points that are explicitely expanded
leftSrc=_.assign(node.src.expandedTo[0],explicitExpandedNodeSrc(node,i,j,0,contour.closed));rightSrc=_.assign(node.src.expandedTo[1],explicitExpandedNodeSrc(node,i,j,1,contour.closed));_.assign(node.src,explicitExpandableNodeSrc(node,i,j));// A leaf shouldn't appear twice during the recursive
// dependency-tree building. Make the expanded nodes accessible
// from expanded contours, and provide accessors on the
// .expandedFrom node.
// leftNodesSrc.push( leftSrc );
// rightNodesSrc.push( rightSrc );
}// if ( leftSrc && rightSrc ) {
// 	Object.defineProperties( node.src.expandedTo = {}, {
// 		0: { get: function() {
// 			return leftSrc;
// 		}},
// 		1: { get: function() {
// 				return rightSrc;
// 		}}
// 	});
// }
});if(!contour.expandedTo&&!contour.closed){leftContour=new paper.Path({closed:true,segments:leftNodes.concat(rightNodes)});contour.expandedTo=[leftContour];contour.src.expandedTo=[expandedContourSrc(leftContour,i//, 0, leftNodesSrc.concat( rightNodesSrc )
)];leftContour.expandedFrom=contour;additionalContours.push(leftContour);firstNode=contour.firstNode;lastNode=contour.lastNode;firstNode.type='corner';lastNode.type='corner';firstNode.expandedTo[0].type='corner';firstNode.expandedTo[1].type='corner';lastNode.expandedTo[0].type='corner';lastNode.expandedTo[1].type='corner';firstNode.expandedTo[0].typeIn='line';firstNode.expandedTo[1].typeOut='line';lastNode.expandedTo[0].typeOut='line';lastNode.expandedTo[1].typeIn='line';}else if(!contour.expandedTo&&contour.closed){leftContour=new paper.Path({closed:true,segments:leftNodes});additionalContours.push(leftContour);rightContour=new paper.Path({closed:true,segments:rightNodes});additionalContours.push(rightContour);contour.expandedTo=[leftContour,rightContour];contour.src.expandedTo=[expandedContourSrc(leftContour,i,0,leftNodesSrc),expandedContourSrc(rightContour,i,1,rightNodesSrc)];leftContour.expandedFrom=rightContour.expandedFrom=contour;}});glyph.addContours(additionalContours);};// Calculate expanded node position
naive.expandedNodeUpdater=function(node,isLeft,_width){var origin=node.expandedFrom,expand=origin.expand,width=expand&&expand.width!==undefined?expand.width:_width,coef=expand&&expand.distr!==undefined?isLeft?expand.distr:1-expand.distr:0.5,angle=(isLeft?Math.PI:0)+(expand&&expand.angle!==undefined?expand.angle:// We resort to using directions.
// This is wrong, directions are not included in the
// dependencies of the updater and might not be ready yet.
// TODO: Fix this (always require angle to be specified?)
origin._dirOut!==undefined?origin._dirOut-Math.PI/2:origin._dirIn+Math.PI/2);// position
node.point.x=origin.point.x+width*coef*Math.cos(angle);node.point.y=origin.point.y+width*coef*Math.sin(angle);};// copy skeleton properties such as types, directions and tensions to expanded
// nodes
naive.skeletonCopier=function(node){var angle=node.expand&&node.expand.angle||0,left=node.expandedTo[0],right=node.expandedTo[1];// node type
if(node.type!==undefined){left.type=right.type=node.type;}// direction type
if(node.typeIn!==undefined){left.typeIn=right.typeOut=node.typeIn;}if(node.typeOut!==undefined){left.typeOut=right.typeIn=node.typeOut;}// direction
if(node._dirIn!==undefined){left._dirIn=right._dirOut=node._dirIn;if(node.type==='smooth'&&!node._dirOut){left._dirOut=right._dirIn=node._dirIn+Math.PI;}}if(node._dirOut!==undefined){left._dirOut=right._dirIn=node._dirOut;if(node.type==='smooth'&&!node._dirIn){left._dirIn=right._dirOut=node._dirOut+Math.PI;}}// use angle if direction isn't already defined
if(left._dirIn===undefined){// implies right._dirOut === undefined
left._dirIn=angle-Math.PI/2;right._dirOut=angle+Math.PI/2;}if(left._dirOut===undefined){// implies right._dirIn === undefined
left._dirOut=angle+Math.PI/2;right._dirIn=angle-Math.PI/2;}// tension
left.tensionIn=right.tensionOut=node.tensionIn!==undefined?node.tensionIn:node.tension!==undefined?node.tension:1;left.tensionOut=right.tensionIn=node.tensionOut!==undefined?node.tensionOut:node.tension!==undefined?node.tension:1;};// Make sure 'line' types are set on both side of segments
// and if a smooth node is used in a straight segment, update the directions
// appropriately this can only be done once the types, directions and position
// of all nodes have been updated can be renamed #prepareLines if no other
// operation is added
// TODO: try doing it at the same time as updateContour (once we have more
// complex glyphs)
naive.prepareContour=function(path){path.nodes.forEach(function(node){if(node.typeIn==='line'&&node.previous){node.previous.typeOut='line';}if(node.typeOut==='line'&&node.next){node.next.typeIn='line';}});path.nodes.forEach(function(node){if(node.typeIn==='line'&&node.type==='smooth'&&node.previous){node._dirIn=Utils.lineAngle(node.point,node.previous.point);node._dirOut=node._dirIn+Math.PI;}if(node.typeOut==='line'&&node.type==='smooth'&&node.next){node._dirOut=Utils.lineAngle(node.point,node.next.point);node._dirIn=node._dirOut+Math.PI;}});};// sets the position of control points
// can be renamed #updateControls if no other operation is added
naive.updateContour=function(path,curviness){if(curviness===undefined){curviness=2/3;}path.nodes.forEach(function(node){var start=node,end,startCtrl,endCtrl,startType,endType,startTension,endTension,startDir,endDir,rri;if(!node.next){return;}end=node.next;startCtrl=start.handleOut;endCtrl=end.handleIn;startType=start.typeOut;endType=end.typeIn;if(startType==='line'||endType==='line'){startCtrl.x=0;startCtrl.y=0;endCtrl.x=0;endCtrl.y=0;return;}startTension=start.tensionOut!==undefined?start.tensionOut:start.tension!==undefined?start.tension:1;endTension=end.tensionIn!==undefined?end.tensionIn:end.tension!==undefined?end.tension:1;startDir=start._dirOut!==undefined?start._dirOut:start.type==='smooth'?start._dirIn+Math.PI:0;endDir=end._dirIn!==undefined?end._dirIn:end.type==='smooth'?end._dirOut-Math.PI:0;rri=Utils.rayRayIntersection(start._point,startDir,end._point,endDir);// direction of handles is parallel
if(rri===null){var angle=Utils.lineAngle(start._point,end._point),middle={x:(end._point.x-start._point.x)/2+start._point.x,y:(end._point.y-start._point.y)/2+start._point.y},p0=Utils.rayRayIntersection(start._point,startDir,middle,angle-Math.PI/2),p1=Utils.rayRayIntersection(middle,angle+Math.PI/2,end._point,endDir);if(p0===null){startCtrl.x=0;startCtrl.y=0;endCtrl.x=0;endCtrl.y=0;return;}startCtrl.x=(Math.round(p0[0])-start._point.x)*curviness*startTension;startCtrl.y=(Math.round(p0[1])-start._point.y)*curviness*startTension;endCtrl.x=(Math.round(p1[0])-end._point.x)*curviness*endTension;endCtrl.y=(Math.round(p1[1])-end._point.y)*curviness*endTension;return;}startCtrl.x=(Math.round(rri[0])-start.point.x)*curviness*startTension;startCtrl.y=(Math.round(rri[1])-start.point.y)*curviness*startTension;endCtrl.x=(Math.round(rri[0])-end.point.x)*curviness*endTension;endCtrl.y=(Math.round(rri[1])-end.point.y)*curviness*endTension;});};var rdeg=/deg$/;(0,_defineProperties2.default)(paper.PaperScope.prototype.Segment.prototype,{expand:{get:function get(){return this._expand;},set:function set(expand){if(typeof expand.angle==='string'&&rdeg.test(expand.angle)){expand.angle=parseFloat(expand.angle)*(Math.PI*2/360);}this._expand=expand;}},dirIn:{get:function get(){return this._dirIn;},set:function set(dir){if(typeof dir==='string'&&rdeg.test(dir)){this._dirIn=parseFloat(dir)*(Math.PI*2/360);}else{this._dirIn=dir;}}},dirOut:{get:function get(){return this._dirOut;},set:function set(dir){if(typeof dir==='string'&&rdeg.test(dir)){this._dirOut=parseFloat(dir)*(Math.PI*2/360);}else{this._dirOut=dir;}}}});module.exports=naive;/***/},/* 43 *//***/function(module,exports,__webpack_require__){var plumin=__webpack_require__(5),paper=plumin.paper;var Utils={};/* eslint-disable */// The following function should be useless, thanks to paper
Utils.lineLineIntersection=function(p1,p2,p3,p4){var x1=p1.x,y1=p1.y,x2=p2.x,y2=p2.y,x3=p3.x,y3=p3.y,x4=p4.x,y4=p4.y,d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);if(d===0){return null;}return new Float32Array([((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/d,((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/d]);};// Find the intersection of two rays.
// A ray is defined by a point and an angle.
Utils.rayRayIntersection=function(p1,a1,p2,a2){// line equations
var a=Math.tan(a1),b=Math.tan(a2),c=p1.y-a*p1.x,d=p2.y-b*p2.x,x,y;// When searching for lines intersection,
// angles can be normalized to 0 < a < PI
// This will be helpful in detecting special cases below.
a1=a1%Math.PI;if(a1<0){a1+=Math.PI;}a2=a2%Math.PI;if(a2<0){a2+=Math.PI;}// no intersection
if(a1===a2){return null;}//We want to round a1, a2 and PI to avoid problems with approximation
a1=a1.toFixed(6);a2=a2.toFixed(6);var piOver2=(Math.PI/2).toFixed(6);// Optimize frequent and easy special cases.
// Without optimization, results would be incorrect when cos(a) === 0
if(a1===0){y=p1.y;}else if(a1===piOver2){x=p1.x;}if(a2===0){y=p2.y;}else if(a2===piOver2){x=p2.x;}// easiest case
if(x!==undefined&&y!==undefined){return new Float32Array([x,y]);}// other cases that can be optimized
if(a1===0){return new Float32Array([(y-d)/b,y]);}if(a1===piOver2){return new Float32Array([x,b*x+d]);}if(a2===0){return new Float32Array([(y-c)/a,y]);}if(a2===piOver2){return new Float32Array([x,a*x+c]);}// intersection from two line equations
// algo: http://en.wikipedia.org/wiki/Line–line_intersection#Given_the_equations_of_the_lines
return new Float32Array([x=(d-c)/(a-b),// this should work equally well with ax+c or bx+d
a*x+c]);};// return the angle between two points
Utils.lineAngle=function(p0,p1){return Math.atan2(p1.y-p0.y,p1.x-p0.x);};Utils.onLine=function(params){if(params.on[0].x===params.on[1].x&&params.on[0].y===params.on[1].y){return'x'in params?params.on[0].y:params.on[0].x;}var origin=params.on[0],vector=[params.on[1].x-params.on[0].x,params.on[1].y-params.on[0].y];return'x'in params?(params.x-origin.x)/vector[0]*vector[1]+origin.y:(params.y-origin.y)/vector[1]*vector[0]+origin.x;};Utils.pointOnCurve=function(pointHandleOut,pointHandleIn,distanceFromOut,inverseOrientation,linePrecision){linePrecision=linePrecision||3;var length=0;var previousPoint;var points;if(!inverseOrientation){points=[pointHandleOut.point,pointHandleOut.point.add(pointHandleOut.handleOut),pointHandleIn.point.add(pointHandleIn.handleIn),pointHandleIn.point];}else{points=[pointHandleIn.point,pointHandleIn.point.add(pointHandleIn.handleIn),pointHandleOut.point.add(pointHandleOut.handleOut),pointHandleOut.point];}for(var i=0;i<linePrecision;i++){var point=Utils.getPointOnCurve(points,i/(linePrecision-1));if(previousPoint){length+=Utils.distance(previousPoint.x,previousPoint.y,point.x,point.y);}previousPoint=point;}var t=length===0?0:distanceFromOut/length;t=Math.max(0.001,Math.min(1,t));return Utils.getPointOnCurve(points,t);};Utils.getPointOnCurve=function(points,t){var inverseT=1-t;var a=inverseT*inverseT*inverseT;var b=inverseT*inverseT*t*3;var c=inverseT*t*t*3;var d=t*t*t;return{x:a*points[0].x+b*points[1].x+c*points[2].x+d*points[3].x,y:a*points[0].y+b*points[1].y+c*points[2].y+d*points[3].y,normal:Utils.lineAngle({x:0,y:0},{x:(points[1].x-points[0].x)*inverseT*inverseT+2*(points[2].x-points[1].x)*t*inverseT+(points[3].x-points[2].x)*t*t,y:(points[1].y-points[0].y)*inverseT*inverseT+2*(points[2].y-points[1].y)*t*inverseT+(points[3].y-points[2].y)*t*t})};};Utils.split=function(points,t,base){t=t||1;var result=points;while(points.length>1){var newPoints=[];for(var i=1;i<points.length;i++){newPoints.push(points[i-1].multiply(1-t).add(points[i].multiply(t)));}result=result.concat(newPoints);points=newPoints;}if(t===1){return{left:[base[1],base[0]],right:[base[1],base[1]]};}var splitBezier={left:[{x:result[0].x,y:result[0].y,point:new paper.Point(result[0].x,result[0].y),handleOut:new paper.Point(result[4].x-result[0].x,result[4].y-result[0].y)},{x:result[9].x,y:result[9].y,point:new paper.Point(result[9].x,result[9].y),handleIn:new paper.Point(result[7].x-result[9].x,result[7].y-result[9].y),handleOut:new paper.Point(result[8].x-result[9].x,result[8].y-result[9].y)}],right:[{x:result[9].x,y:result[9].y,point:new paper.Point(result[9].x,result[9].y),handleIn:new paper.Point(result[7].x-result[9].x,result[7].y-result[9].y),handleOut:new paper.Point(result[8].x-result[9].x,result[8].y-result[9].y)},{x:result[3].x,y:result[3].y,point:new paper.Point(result[3].x,result[3].y),handleIn:new paper.Point(result[6].x-result[3].x,result[6].y-result[3].y)}]};return splitBezier;};Utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y1-y2,2));};Utils.align=function(points,lineStart,lineEnd){var tx=lineStart.x,ty=lineStart.y,a=-Math.atan2(lineEnd.y-ty,lineEnd.x-tx),d=function d(v){return{x:(v.x-tx)*Math.cos(a)-(v.y-ty)*Math.sin(a),y:(v.x-tx)*Math.sin(a)+(v.y-ty)*Math.cos(a)};};return points.map(d);};function crt(v){return v<0?-Math.pow(-v,1/3):Math.pow(v,1/3);}// see https://github.com/Pomax/bezierjs/blob/gh-pages/lib/utils.js line 313
Utils.lineCurveIntersection=function(pointHandleOut,pointHandleIn,lineStart,lineEnd){lineStart=lineStart||{x:0,y:0};lineEnd=lineEnd||{x:1,y:0};var points=[pointHandleOut.point,pointHandleOut.point.add(pointHandleOut.handleOut),pointHandleIn.point.add(pointHandleIn.handleIn),pointHandleIn.point];var p=Utils.align(points,lineStart,lineEnd);var reduce=function reduce(t){return 0<=t&&t<=1;};// see http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
var pa=p[0].y;var pb=p[1].y;var pc=p[2].y;var pd=p[3].y;var d=-pa+3*pb-3*pc+pd;var a=(3*pa-6*pb+3*pc)/d;var b=(-3*pa+3*pb)/d;var c=pa/d;var p3=(3*b-a*a)/3/3;var q=(2*a*a*a-9*a*b+27*c)/27;var q2=q/2;var discriminant=q2*q2+p3*p3*p3;var u1;var v1;var x1;var x2;var x3;var result;if(discriminant<0){var mp3=-p3,mp33=mp3*mp3*mp3,r=Math.sqrt(mp33),t=-q/(2*r),cosphi=t<-1?-1:t>1?1:t,phi=Math.acos(cosphi),crtr=crt(r),t1=2*crtr;x1=t1*Math.cos(phi/3)-a/3;x2=t1*Math.cos((phi+Math.PI*2)/3)-a/3;x3=t1*Math.cos((phi+4*Math.PI)/3)-a/3;result=[x1,x2,x3].filter(reduce);}else if(discriminant===0){u1=q2<0?crt(-q2):-crt(q2);x1=2*u1-a/3;x2=-u1-a/3;result=[x1,x2].filter(reduce);}else{var sd=Math.sqrt(discriminant);u1=crt(-q2+sd);v1=crt(q2+sd);result=[u1-v1-a/3].filter(reduce);}return Utils.split(points,result[0],[pointHandleIn,pointHandleOut]);};Utils.log=function(){/*eslint-disable no-console */console.log.apply(console,arguments);/*eslint-enable no-console */return arguments[0];};Utils.normalize=function(vector){var x=vector.x;var y=vector.y;var norm=Utils.distance(0,0,x,y);if(norm===0){return{x:0,y:0};}return{x:x/norm,y:y/norm};};Utils.vectorFromPoints=function(a,b){return{x:b.x-a.x,y:b.y-a.y};};Utils.parseInt=function(int){return parseInt(int);};Utils.makeCurveInsideSerif=function(pAnchors,serifHeight,serifWidth,serifMedian,serifCurve,serifTerminal,thickness,midWidth,serifRotate){var yDir=pAnchors.down?-1:1;var xDir=pAnchors.left?-1:1;var midStumpOrient=pAnchors.inverseMidStump?-1:1;var realThickness=pAnchors.thickness||thickness;var rotateRad=(serifRotate*pAnchors.rotationAngle||0)*Math.PI/180;var baseWidth=pAnchors.baseWidth;var baseHeight=pAnchors.baseHeight;var stumpOpposite=pAnchors.opposite;var stumpBase=baseHeight;var stumpVector={x:stumpOpposite.x-stumpBase.x,y:stumpOpposite.y-stumpBase.y};if(baseHeight.x===stumpOpposite.x&&baseHeight.y===stumpOpposite.y){var stumpVector={x:-stumpOpposite.x+baseWidth.x,y:-stumpOpposite.y+baseWidth.y};}var stumpNorm=Utils.distance(0,0,stumpVector.x,stumpVector.y);stumpVector=Utils.normalize(stumpVector);var stumpAngle=Utils.lineAngle(baseHeight,stumpOpposite);var rotationCenter=pAnchors.rotationCenter;var topLeft={x:rotationCenter.x+(baseHeight.x-rotationCenter.x-serifHeight*xDir)*Math.cos(rotateRad)-(baseWidth.y-rotationCenter.y+serifWidth*yDir)*Math.sin(rotateRad),y:rotationCenter.y+(baseWidth.y-rotationCenter.y+serifWidth*yDir)*Math.cos(rotateRad)+(baseHeight.x-rotationCenter.x-serifHeight*xDir)*Math.sin(rotateRad)};var bottomLeft={x:rotationCenter.x+(baseHeight.x-rotationCenter.x-serifHeight*xDir)*Math.cos(rotateRad)-(baseHeight.y-rotationCenter.y)*Math.sin(rotateRad),y:rotationCenter.y+(baseHeight.y-rotationCenter.y)*Math.cos(rotateRad)+(baseHeight.x-rotationCenter.x-serifHeight*xDir)*Math.sin(rotateRad)//We get the intersection with the left edge of the serif and the curve support
//this operation is direction dependent
};var splitBase;if(pAnchors.inverseOrder){splitBase=Utils.lineCurveIntersection(pAnchors.curveEnd,pAnchors.baseWidth,{x:topLeft.x,y:topLeft.y},{x:bottomLeft.x,y:bottomLeft.y});}else{splitBase=Utils.lineCurveIntersection(pAnchors.baseWidth,pAnchors.curveEnd,{x:topLeft.x,y:topLeft.y},{x:bottomLeft.x,y:bottomLeft.y});}// We chose a serifCenter depending on if the left edge intersect or not with
// the curve support
var serifCenter;var splitCurveEnd;if(!pAnchors.inverseOrder){if(splitBase.right[0].x!==splitBase.right[1].x||splitBase.right[0].y!==splitBase.right[1].y){serifCenter=splitBase.right[0];splitCurveEnd=splitBase.right[1];}else{serifCenter=splitBase.left[0];splitCurveEnd=splitBase.left[1];}}else{if(splitBase.left[0].x!==splitBase.left[1].x||splitBase.left[0].y!==splitBase.left[1].y){serifCenter=splitBase.left[1];splitCurveEnd=splitBase.left[0];}else{serifCenter=splitBase.right[1];splitCurveEnd=splitBase.right[0];}}// The serif direction is the line from the serif center
// to the serif left edge
var serifDirection=Utils.vectorFromPoints(serifCenter,{x:rotationCenter.x+(baseHeight.x-rotationCenter.x-serifHeight*xDir)*serifMedian*Math.cos(rotateRad)-(baseWidth.y-rotationCenter.y+serifWidth*yDir)*Math.sin(rotateRad),y:rotationCenter.y+(baseWidth.y-rotationCenter.y+serifWidth*yDir)*Math.cos(rotateRad)+(baseHeight.x-rotationCenter.x-serifHeight*xDir)*serifMedian*Math.sin(rotateRad)});var serifBasis=Utils.normalize(serifDirection);var serifRadDirection=Math.atan2(serifBasis.y,serifBasis.x);var pointOnCurve;var pointOnSerif;var pointWithCurve={};var normalToCurve;if(pAnchors.inverseOrder){pointWithCurve=Utils.pointOnCurve(splitCurveEnd,serifCenter,serifCurve,true,200);}else{pointWithCurve=Utils.pointOnCurve(serifCenter,splitCurveEnd,serifCurve,false,200);}if(serifCurve>0){normalToCurve=pointWithCurve.normal;pointOnCurve={x:pointWithCurve.x,y:pointWithCurve.y,dirOut:pointWithCurve.normal,type:'corner'};var curveRatio=Math.min(serifCurve/Utils.distance(0,0,serifDirection.x,serifDirection.y),0.75);pointOnSerif={x:serifCenter.x+serifDirection.x*curveRatio,y:serifCenter.y+serifDirection.y*curveRatio,dirIn:serifRadDirection,dirOut:serifRadDirection,type:'corner'};}else{if(pAnchors.inverseOrder){normalToCurve=serifCenter.handleIn.angleInRadians;}else{normalToCurve=serifCenter.handleOut.angleInRadians;}pointOnCurve={x:serifCenter.x,y:serifCenter.y,type:'corner'};pointOnSerif={x:serifCenter.x,y:serifCenter.y,type:'corner'};}var leftEdge={x:serifCenter.x+serifDirection.x,y:serifCenter.y+serifDirection.y,dirIn:serifRadDirection,dirOut:rotateRad};var rightEdge={x:rotationCenter.x-(baseWidth.y-rotationCenter.y+serifWidth*midWidth*yDir)*Math.sin(rotateRad),y:rotationCenter.y+(baseWidth.y-rotationCenter.y+serifWidth*midWidth*yDir)*Math.cos(rotateRad),dirIn:rotateRad,typeOut:'line'};var serifRoot={x:baseHeight.x,y:baseHeight.y};var rootVector=Utils.normalize(Utils.vectorFromPoints(serifRoot,rightEdge));var medianVector=Utils.normalize(Utils.vectorFromPoints(pointOnSerif,leftEdge));var terminalVector=Utils.normalize({x:rootVector.x+medianVector.x,y:rootVector.y+medianVector.y});var midPoint={x:(leftEdge.x+rightEdge.x)/2+serifTerminal*serifHeight*terminalVector.x,y:(leftEdge.y+rightEdge.y)/2+serifTerminal*serifHeight*terminalVector.y,dirIn:rotateRad,dirOut:rotateRad};if(serifTerminal!==0){leftEdge.dirOut=Math.atan2(medianVector.y,medianVector.x);rightEdge.dirIn=Math.atan2(rootVector.y,rootVector.x);}else if(midWidth!==1){var dirOut=Math.atan2(leftEdge.y-rightEdge.y,leftEdge.x-rightEdge.x);leftEdge.dirOut=dirOut;rightEdge.dirIn=dirOut;midPoint.dirIn=dirOut;midPoint.dirOut=dirOut;}var midStump={x:serifRoot.x+stumpNorm/2*stumpVector.x,y:serifRoot.y+stumpNorm/2*stumpVector.y,dirOut:baseWidth.dirIn,typeIn:'line',type:'corner'};var lastPoint={x:pointOnCurve.x-stumpNorm/2*Math.sin(normalToCurve)*yDir*xDir,y:pointOnCurve.y+stumpNorm/2*Math.cos(normalToCurve)*yDir*xDir,dirIn:normalToCurve,typeOut:'line',type:'corner'};if(serifCurve+serifHeight<70){midStump.tensionOut=0;lastPoint.tensionIn=0;}else{midStump.tensionOut=1;lastPoint.tensionIn=1;}return[pointOnCurve,pointOnSerif,leftEdge,midPoint,rightEdge,rotationCenter,serifRoot,midStump,lastPoint];};/* eslint-enable */module.exports=Utils;/***/},/* 44 *//***/function(module,exports){var DepTree=function DepTree(){this.nodes={};};DepTree.prototype.add=function(node,dependants){var self=this;if(!dependants){dependants=[];}else if(!(dependants instanceof Array)){dependants=[dependants];}this.nodes[node]=dependants;};DepTree.prototype.resolveNode=function(node,resolved,processing){var self=this;resolved=resolved||[];processing=processing||{};var deps=this.nodes[node]||[];processing[node]=true;deps.forEach(function(dep){if(resolved.indexOf(dep)!=-1){return;}if(processing[dep]){throw new Error('Circular dependency: '+dep);}self.resolveNode(dep,resolved,processing);});if(resolved.indexOf(node)==-1){processing[node]=false;resolved.push(node);}return resolved;};DepTree.prototype.resolve=function(){var resolved=[];for(var node in this.nodes){this.resolveNode(node,resolved);}return resolved;};module.exports=DepTree;/***/},/* 45 *//***/function(module,exports,__webpack_require__){var getNative=__webpack_require__(2),root=__webpack_require__(0);/* Built-in method references that are verified to be native. */var DataView=getNative(root,'DataView');module.exports=DataView;/***/},/* 46 *//***/function(module,exports,__webpack_require__){var hashClear=__webpack_require__(85),hashDelete=__webpack_require__(86),hashGet=__webpack_require__(87),hashHas=__webpack_require__(88),hashSet=__webpack_require__(89);/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function Hash(entries){var index=-1,length=entries==null?0:entries.length;this.clear();while(++index<length){var entry=entries[index];this.set(entry[0],entry[1]);}}// Add methods to `Hash`.
Hash.prototype.clear=hashClear;Hash.prototype['delete']=hashDelete;Hash.prototype.get=hashGet;Hash.prototype.has=hashHas;Hash.prototype.set=hashSet;module.exports=Hash;/***/},/* 47 *//***/function(module,exports,__webpack_require__){var getNative=__webpack_require__(2),root=__webpack_require__(0);/* Built-in method references that are verified to be native. */var Promise=getNative(root,'Promise');module.exports=Promise;/***/},/* 48 *//***/function(module,exports,__webpack_require__){var getNative=__webpack_require__(2),root=__webpack_require__(0);/* Built-in method references that are verified to be native. */var Set=getNative(root,'Set');module.exports=Set;/***/},/* 49 *//***/function(module,exports,__webpack_require__){var MapCache=__webpack_require__(16),setCacheAdd=__webpack_require__(109),setCacheHas=__webpack_require__(110);/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */function SetCache(values){var index=-1,length=values==null?0:values.length;this.__data__=new MapCache();while(++index<length){this.add(values[index]);}}// Add methods to `SetCache`.
SetCache.prototype.add=SetCache.prototype.push=setCacheAdd;SetCache.prototype.has=setCacheHas;module.exports=SetCache;/***/},/* 50 *//***/function(module,exports,__webpack_require__){var root=__webpack_require__(0);/** Built-in value references. */var Uint8Array=root.Uint8Array;module.exports=Uint8Array;/***/},/* 51 *//***/function(module,exports,__webpack_require__){var getNative=__webpack_require__(2),root=__webpack_require__(0);/* Built-in method references that are verified to be native. */var WeakMap=getNative(root,'WeakMap');module.exports=WeakMap;/***/},/* 52 *//***/function(module,exports){/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */function arrayFilter(array,predicate){var index=-1,length=array==null?0:array.length,resIndex=0,result=[];while(++index<length){var value=array[index];if(predicate(value,index,array)){result[resIndex++]=value;}}return result;}module.exports=arrayFilter;/***/},/* 53 *//***/function(module,exports,__webpack_require__){var baseTimes=__webpack_require__(70),isArguments=__webpack_require__(35),isArray=__webpack_require__(1),isBuffer=__webpack_require__(37),isIndex=__webpack_require__(30),isTypedArray=__webpack_require__(39);/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */function arrayLikeKeys(value,inherited){var isArr=isArray(value),isArg=!isArr&&isArguments(value),isBuff=!isArr&&!isArg&&isBuffer(value),isType=!isArr&&!isArg&&!isBuff&&isTypedArray(value),skipIndexes=isArr||isArg||isBuff||isType,result=skipIndexes?baseTimes(value.length,String):[],length=result.length;for(var key in value){if((inherited||hasOwnProperty.call(value,key))&&!(skipIndexes&&(// Safari 9 has enumerable `arguments.length` in strict mode.
key=='length'||// Node.js 0.10 has enumerable non-index properties on buffers.
isBuff&&(key=='offset'||key=='parent')||// PhantomJS 2 has enumerable non-index properties on typed arrays.
isType&&(key=='buffer'||key=='byteLength'||key=='byteOffset')||// Skip index properties.
isIndex(key,length)))){result.push(key);}}return result;}module.exports=arrayLikeKeys;/***/},/* 54 *//***/function(module,exports){/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */function arrayMap(array,iteratee){var index=-1,length=array==null?0:array.length,result=Array(length);while(++index<length){result[index]=iteratee(array[index],index,array);}return result;}module.exports=arrayMap;/***/},/* 55 *//***/function(module,exports){/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index<length){array[offset+index]=values[index];}return array;}module.exports=arrayPush;/***/},/* 56 *//***/function(module,exports){/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */function arraySome(array,predicate){var index=-1,length=array==null?0:array.length;while(++index<length){if(predicate(array[index],index,array)){return true;}}return false;}module.exports=arraySome;/***/},/* 57 *//***/function(module,exports){/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function baseFindIndex(array,predicate,fromIndex,fromRight){var length=array.length,index=fromIndex+(fromRight?1:-1);while(fromRight?index--:++index<length){if(predicate(array[index],index,array)){return index;}}return-1;}module.exports=baseFindIndex;/***/},/* 58 *//***/function(module,exports,__webpack_require__){var arrayPush=__webpack_require__(55),isArray=__webpack_require__(1);/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */function baseGetAllKeys(object,keysFunc,symbolsFunc){var result=keysFunc(object);return isArray(object)?result:arrayPush(result,symbolsFunc(object));}module.exports=baseGetAllKeys;/***/},/* 59 *//***/function(module,exports){/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */function baseHasIn(object,key){return object!=null&&key in Object(object);}module.exports=baseHasIn;/***/},/* 60 *//***/function(module,exports,__webpack_require__){var baseGetTag=__webpack_require__(3),isObjectLike=__webpack_require__(4);/** `Object#toString` result references. */var argsTag='[object Arguments]';/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */function baseIsArguments(value){return isObjectLike(value)&&baseGetTag(value)==argsTag;}module.exports=baseIsArguments;/***/},/* 61 *//***/function(module,exports,__webpack_require__){var Stack=__webpack_require__(23),equalArrays=__webpack_require__(28),equalByTag=__webpack_require__(76),equalObjects=__webpack_require__(77),getTag=__webpack_require__(82),isArray=__webpack_require__(1),isBuffer=__webpack_require__(37),isTypedArray=__webpack_require__(39);/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1;/** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',objectTag='[object Object]';/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function baseIsEqualDeep(object,other,bitmask,customizer,equalFunc,stack){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=objIsArr?arrayTag:getTag(object),othTag=othIsArr?arrayTag:getTag(other);objTag=objTag==argsTag?objectTag:objTag;othTag=othTag==argsTag?objectTag:othTag;var objIsObj=objTag==objectTag,othIsObj=othTag==objectTag,isSameTag=objTag==othTag;if(isSameTag&&isBuffer(object)){if(!isBuffer(other)){return false;}objIsArr=true;objIsObj=false;}if(isSameTag&&!objIsObj){stack||(stack=new Stack());return objIsArr||isTypedArray(object)?equalArrays(object,other,bitmask,customizer,equalFunc,stack):equalByTag(object,other,objTag,bitmask,customizer,equalFunc,stack);}if(!(bitmask&COMPARE_PARTIAL_FLAG)){var objIsWrapped=objIsObj&&hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj&&hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped||othIsWrapped){var objUnwrapped=objIsWrapped?object.value():object,othUnwrapped=othIsWrapped?other.value():other;stack||(stack=new Stack());return equalFunc(objUnwrapped,othUnwrapped,bitmask,customizer,stack);}}if(!isSameTag){return false;}stack||(stack=new Stack());return equalObjects(object,other,bitmask,customizer,equalFunc,stack);}module.exports=baseIsEqualDeep;/***/},/* 62 *//***/function(module,exports,__webpack_require__){var Stack=__webpack_require__(23),baseIsEqual=__webpack_require__(25);/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */function baseIsMatch(object,source,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object==null){return!length;}object=Object(object);while(index--){var data=matchData[index];if(noCustomizer&&data[2]?data[1]!==object[data[0]]:!(data[0]in object)){return false;}}while(++index<length){data=matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer&&data[2]){if(objValue===undefined&&!(key in object)){return false;}}else{var stack=new Stack();if(customizer){var result=customizer(objValue,srcValue,key,object,source,stack);}if(!(result===undefined?baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG,customizer,stack):result)){return false;}}}return true;}module.exports=baseIsMatch;/***/},/* 63 *//***/function(module,exports,__webpack_require__){var isFunction=__webpack_require__(38),isMasked=__webpack_require__(91),isObject=__webpack_require__(12),toSource=__webpack_require__(33);/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */var reRegExpChar=/[\\^$.*+?()[\]{}|]/g;/** Used to detect host constructors (Safari). */var reIsHostCtor=/^\[object .+?Constructor\]$/;/** Used for built-in method references. */var funcProto=Function.prototype,objectProto=Object.prototype;/** Used to resolve the decompiled source of functions. */var funcToString=funcProto.toString;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/** Used to detect if a method is native. */var reIsNative=RegExp('^'+funcToString.call(hasOwnProperty).replace(reRegExpChar,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?')+'$');/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */function baseIsNative(value){if(!isObject(value)||isMasked(value)){return false;}var pattern=isFunction(value)?reIsNative:reIsHostCtor;return pattern.test(toSource(value));}module.exports=baseIsNative;/***/},/* 64 *//***/function(module,exports,__webpack_require__){var baseGetTag=__webpack_require__(3),isLength=__webpack_require__(18),isObjectLike=__webpack_require__(4);/** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',boolTag='[object Boolean]',dateTag='[object Date]',errorTag='[object Error]',funcTag='[object Function]',mapTag='[object Map]',numberTag='[object Number]',objectTag='[object Object]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',dataViewTag='[object DataView]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]';/** Used to identify `toStringTag` values of typed arrays. */var typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=true;typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=false;/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */function baseIsTypedArray(value){return isObjectLike(value)&&isLength(value.length)&&!!typedArrayTags[baseGetTag(value)];}module.exports=baseIsTypedArray;/***/},/* 65 *//***/function(module,exports,__webpack_require__){var isPrototype=__webpack_require__(92),nativeKeys=__webpack_require__(105);/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */function baseKeys(object){if(!isPrototype(object)){return nativeKeys(object);}var result=[];for(var key in Object(object)){if(hasOwnProperty.call(object,key)&&key!='constructor'){result.push(key);}}return result;}module.exports=baseKeys;/***/},/* 66 *//***/function(module,exports,__webpack_require__){var baseIsMatch=__webpack_require__(62),getMatchData=__webpack_require__(79),matchesStrictComparable=__webpack_require__(32);/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */function baseMatches(source){var matchData=getMatchData(source);if(matchData.length==1&&matchData[0][2]){return matchesStrictComparable(matchData[0][0],matchData[0][1]);}return function(object){return object===source||baseIsMatch(object,source,matchData);};}module.exports=baseMatches;/***/},/* 67 *//***/function(module,exports,__webpack_require__){var baseIsEqual=__webpack_require__(25),get=__webpack_require__(120),hasIn=__webpack_require__(121),isKey=__webpack_require__(17),isStrictComparable=__webpack_require__(31),matchesStrictComparable=__webpack_require__(32),toKey=__webpack_require__(11);/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */function baseMatchesProperty(path,srcValue){if(isKey(path)&&isStrictComparable(srcValue)){return matchesStrictComparable(toKey(path),srcValue);}return function(object){var objValue=get(object,path);return objValue===undefined&&objValue===srcValue?hasIn(object,path):baseIsEqual(srcValue,objValue,COMPARE_PARTIAL_FLAG|COMPARE_UNORDERED_FLAG);};}module.exports=baseMatchesProperty;/***/},/* 68 *//***/function(module,exports){/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */function baseProperty(key){return function(object){return object==null?undefined:object[key];};}module.exports=baseProperty;/***/},/* 69 *//***/function(module,exports,__webpack_require__){var baseGet=__webpack_require__(24);/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */function basePropertyDeep(path){return function(object){return baseGet(object,path);};}module.exports=basePropertyDeep;/***/},/* 70 *//***/function(module,exports){/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */function baseTimes(n,iteratee){var index=-1,result=Array(n);while(++index<n){result[index]=iteratee(index);}return result;}module.exports=baseTimes;/***/},/* 71 *//***/function(module,exports,__webpack_require__){var _Symbol5=__webpack_require__(7),arrayMap=__webpack_require__(54),isArray=__webpack_require__(1),isSymbol=__webpack_require__(13);/** Used as references for various `Number` constants. */var INFINITY=1/0;/** Used to convert symbols to primitives and strings. */var symbolProto=_Symbol5?_Symbol5.prototype:undefined,symbolToString=symbolProto?symbolProto.toString:undefined;/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */function baseToString(value){// Exit early for strings to avoid a performance hit in some environments.
if(typeof value=='string'){return value;}if(isArray(value)){// Recursively convert values (susceptible to call stack limits).
return arrayMap(value,baseToString)+'';}if(isSymbol(value)){return symbolToString?symbolToString.call(value):'';}var result=value+'';return result=='0'&&1/value==-INFINITY?'-0':result;}module.exports=baseToString;/***/},/* 72 *//***/function(module,exports){/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */function baseUnary(func){return function(value){return func(value);};}module.exports=baseUnary;/***/},/* 73 *//***/function(module,exports){/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function cacheHas(cache,key){return cache.has(key);}module.exports=cacheHas;/***/},/* 74 *//***/function(module,exports,__webpack_require__){var root=__webpack_require__(0);/** Used to detect overreaching core-js shims. */var coreJsData=root['__core-js_shared__'];module.exports=coreJsData;/***/},/* 75 *//***/function(module,exports,__webpack_require__){var baseIteratee=__webpack_require__(26),isArrayLike=__webpack_require__(36),keys=__webpack_require__(19);/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */function createFind(findIndexFunc){return function(collection,predicate,fromIndex){var iterable=Object(collection);if(!isArrayLike(collection)){var iteratee=baseIteratee(predicate,3);collection=keys(collection);predicate=function predicate(key){return iteratee(iterable[key],key,iterable);};}var index=findIndexFunc(collection,predicate,fromIndex);return index>-1?iterable[iteratee?collection[index]:index]:undefined;};}module.exports=createFind;/***/},/* 76 *//***/function(module,exports,__webpack_require__){var _Symbol6=__webpack_require__(7),Uint8Array=__webpack_require__(50),eq=__webpack_require__(34),equalArrays=__webpack_require__(28),mapToArray=__webpack_require__(103),setToArray=__webpack_require__(111);/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1,COMPARE_UNORDERED_FLAG=2;/** `Object#toString` result references. */var boolTag='[object Boolean]',dateTag='[object Date]',errorTag='[object Error]',mapTag='[object Map]',numberTag='[object Number]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',symbolTag='[object Symbol]';var arrayBufferTag='[object ArrayBuffer]',dataViewTag='[object DataView]';/** Used to convert symbols to primitives and strings. */var symbolProto=_Symbol6?_Symbol6.prototype:undefined,symbolValueOf=symbolProto?symbolProto.valueOf:undefined;/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function equalByTag(object,other,tag,bitmask,customizer,equalFunc,stack){switch(tag){case dataViewTag:if(object.byteLength!=other.byteLength||object.byteOffset!=other.byteOffset){return false;}object=object.buffer;other=other.buffer;case arrayBufferTag:if(object.byteLength!=other.byteLength||!equalFunc(new Uint8Array(object),new Uint8Array(other))){return false;}return true;case boolTag:case dateTag:case numberTag:// Coerce booleans to `1` or `0` and dates to milliseconds.
// Invalid dates are coerced to `NaN`.
return eq(+object,+other);case errorTag:return object.name==other.name&&object.message==other.message;case regexpTag:case stringTag:// Coerce regexes to strings and treat strings, primitives and objects,
// as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
// for more details.
return object==other+'';case mapTag:var convert=mapToArray;case setTag:var isPartial=bitmask&COMPARE_PARTIAL_FLAG;convert||(convert=setToArray);if(object.size!=other.size&&!isPartial){return false;}// Assume cyclic values are equal.
var stacked=stack.get(object);if(stacked){return stacked==other;}bitmask|=COMPARE_UNORDERED_FLAG;// Recursively compare objects (susceptible to call stack limits).
stack.set(object,other);var result=equalArrays(convert(object),convert(other),bitmask,customizer,equalFunc,stack);stack['delete'](object);return result;case symbolTag:if(symbolValueOf){return symbolValueOf.call(object)==symbolValueOf.call(other);}}return false;}module.exports=equalByTag;/***/},/* 77 *//***/function(module,exports,__webpack_require__){var getAllKeys=__webpack_require__(78);/** Used to compose bitmasks for value comparisons. */var COMPARE_PARTIAL_FLAG=1;/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function equalObjects(object,other,bitmask,customizer,equalFunc,stack){var isPartial=bitmask&COMPARE_PARTIAL_FLAG,objProps=getAllKeys(object),objLength=objProps.length,othProps=getAllKeys(other),othLength=othProps.length;if(objLength!=othLength&&!isPartial){return false;}var index=objLength;while(index--){var key=objProps[index];if(!(isPartial?key in other:hasOwnProperty.call(other,key))){return false;}}// Assume cyclic values are equal.
var stacked=stack.get(object);if(stacked&&stack.get(other)){return stacked==other;}var result=true;stack.set(object,other);stack.set(other,object);var skipCtor=isPartial;while(++index<objLength){key=objProps[index];var objValue=object[key],othValue=other[key];if(customizer){var compared=isPartial?customizer(othValue,objValue,key,other,object,stack):customizer(objValue,othValue,key,object,other,stack);}// Recursively compare objects (susceptible to call stack limits).
if(!(compared===undefined?objValue===othValue||equalFunc(objValue,othValue,bitmask,customizer,stack):compared)){result=false;break;}skipCtor||(skipCtor=key=='constructor');}if(result&&!skipCtor){var objCtor=object.constructor,othCtor=other.constructor;// Non `Object` object instances with different constructors are not equal.
if(objCtor!=othCtor&&'constructor'in object&&'constructor'in other&&!(typeof objCtor=='function'&&objCtor instanceof objCtor&&typeof othCtor=='function'&&othCtor instanceof othCtor)){result=false;}}stack['delete'](object);stack['delete'](other);return result;}module.exports=equalObjects;/***/},/* 78 *//***/function(module,exports,__webpack_require__){var baseGetAllKeys=__webpack_require__(58),getSymbols=__webpack_require__(81),keys=__webpack_require__(19);/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */function getAllKeys(object){return baseGetAllKeys(object,keys,getSymbols);}module.exports=getAllKeys;/***/},/* 79 *//***/function(module,exports,__webpack_require__){var isStrictComparable=__webpack_require__(31),keys=__webpack_require__(19);/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */function getMatchData(object){var result=keys(object),length=result.length;while(length--){var key=result[length],value=object[key];result[length]=[key,value,isStrictComparable(value)];}return result;}module.exports=getMatchData;/***/},/* 80 *//***/function(module,exports,__webpack_require__){var _Symbol7=__webpack_require__(7);/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var nativeObjectToString=objectProto.toString;/** Built-in value references. */var symToStringTag=_Symbol7?_Symbol7.toStringTag:undefined;/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */function getRawTag(value){var isOwn=hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=undefined;var unmasked=true;}catch(e){}var result=nativeObjectToString.call(value);if(unmasked){if(isOwn){value[symToStringTag]=tag;}else{delete value[symToStringTag];}}return result;}module.exports=getRawTag;/***/},/* 81 *//***/function(module,exports,__webpack_require__){var arrayFilter=__webpack_require__(52),stubArray=__webpack_require__(125);/** Used for built-in method references. */var objectProto=Object.prototype;/** Built-in value references. */var propertyIsEnumerable=objectProto.propertyIsEnumerable;/* Built-in method references for those with the same name as other `lodash` methods. */var nativeGetSymbols=_getOwnPropertySymbols2.default;/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */var getSymbols=!nativeGetSymbols?stubArray:function(object){if(object==null){return[];}object=Object(object);return arrayFilter(nativeGetSymbols(object),function(symbol){return propertyIsEnumerable.call(object,symbol);});};module.exports=getSymbols;/***/},/* 82 *//***/function(module,exports,__webpack_require__){var DataView=__webpack_require__(45),Map=__webpack_require__(15),Promise=__webpack_require__(47),Set=__webpack_require__(48),WeakMap=__webpack_require__(51),baseGetTag=__webpack_require__(3),toSource=__webpack_require__(33);/** `Object#toString` result references. */var mapTag='[object Map]',objectTag='[object Object]',promiseTag='[object Promise]',setTag='[object Set]',weakMapTag='[object WeakMap]';var dataViewTag='[object DataView]';/** Used to detect maps, sets, and weakmaps. */var dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap);/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */var getTag=baseGetTag;// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||Map&&getTag(new Map())!=mapTag||Promise&&getTag(Promise.resolve())!=promiseTag||Set&&getTag(new Set())!=setTag||WeakMap&&getTag(new WeakMap())!=weakMapTag){getTag=function getTag(value){var result=baseGetTag(value),Ctor=result==objectTag?value.constructor:undefined,ctorString=Ctor?toSource(Ctor):'';if(ctorString){switch(ctorString){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag;}}return result;};}module.exports=getTag;/***/},/* 83 *//***/function(module,exports){/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */function getValue(object,key){return object==null?undefined:object[key];}module.exports=getValue;/***/},/* 84 *//***/function(module,exports,__webpack_require__){var castPath=__webpack_require__(27),isArguments=__webpack_require__(35),isArray=__webpack_require__(1),isIndex=__webpack_require__(30),isLength=__webpack_require__(18),toKey=__webpack_require__(11);/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */function hasPath(object,path,hasFunc){path=castPath(path,object);var index=-1,length=path.length,result=false;while(++index<length){var key=toKey(path[index]);if(!(result=object!=null&&hasFunc(object,key))){break;}object=object[key];}if(result||++index!=length){return result;}length=object==null?0:object.length;return!!length&&isLength(length)&&isIndex(key,length)&&(isArray(object)||isArguments(object));}module.exports=hasPath;/***/},/* 85 *//***/function(module,exports,__webpack_require__){var nativeCreate=__webpack_require__(10);/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{};this.size=0;}module.exports=hashClear;/***/},/* 86 *//***/function(module,exports){/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function hashDelete(key){var result=this.has(key)&&delete this.__data__[key];this.size-=result?1:0;return result;}module.exports=hashDelete;/***/},/* 87 *//***/function(module,exports,__webpack_require__){var nativeCreate=__webpack_require__(10);/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED='__lodash_hash_undefined__';/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function hashGet(key){var data=this.__data__;if(nativeCreate){var result=data[key];return result===HASH_UNDEFINED?undefined:result;}return hasOwnProperty.call(data,key)?data[key]:undefined;}module.exports=hashGet;/***/},/* 88 *//***/function(module,exports,__webpack_require__){var nativeCreate=__webpack_require__(10);/** Used for built-in method references. */var objectProto=Object.prototype;/** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty;/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function hashHas(key){var data=this.__data__;return nativeCreate?data[key]!==undefined:hasOwnProperty.call(data,key);}module.exports=hashHas;/***/},/* 89 *//***/function(module,exports,__webpack_require__){var nativeCreate=__webpack_require__(10);/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED='__lodash_hash_undefined__';/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */function hashSet(key,value){var data=this.__data__;this.size+=this.has(key)?0:1;data[key]=nativeCreate&&value===undefined?HASH_UNDEFINED:value;return this;}module.exports=hashSet;/***/},/* 90 *//***/function(module,exports){/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */function isKeyable(value){var type=typeof value==='undefined'?'undefined':(0,_typeof4.default)(value);return type=='string'||type=='number'||type=='symbol'||type=='boolean'?value!=='__proto__':value===null;}module.exports=isKeyable;/***/},/* 91 *//***/function(module,exports,__webpack_require__){var coreJsData=__webpack_require__(74);/** Used to detect methods masquerading as native. */var maskSrcKey=function(){var uid=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||'');return uid?'Symbol(src)_1.'+uid:'';}();/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */function isMasked(func){return!!maskSrcKey&&maskSrcKey in func;}module.exports=isMasked;/***/},/* 92 *//***/function(module,exports){/** Used for built-in method references. */var objectProto=Object.prototype;/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */function isPrototype(value){var Ctor=value&&value.constructor,proto=typeof Ctor=='function'&&Ctor.prototype||objectProto;return value===proto;}module.exports=isPrototype;/***/},/* 93 *//***/function(module,exports){/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */function listCacheClear(){this.__data__=[];this.size=0;}module.exports=listCacheClear;/***/},/* 94 *//***/function(module,exports,__webpack_require__){var assocIndexOf=__webpack_require__(8);/** Used for built-in method references. */var arrayProto=Array.prototype;/** Built-in value references. */var splice=arrayProto.splice;/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function listCacheDelete(key){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){return false;}var lastIndex=data.length-1;if(index==lastIndex){data.pop();}else{splice.call(data,index,1);}--this.size;return true;}module.exports=listCacheDelete;/***/},/* 95 *//***/function(module,exports,__webpack_require__){var assocIndexOf=__webpack_require__(8);/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function listCacheGet(key){var data=this.__data__,index=assocIndexOf(data,key);return index<0?undefined:data[index][1];}module.exports=listCacheGet;/***/},/* 96 *//***/function(module,exports,__webpack_require__){var assocIndexOf=__webpack_require__(8);/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function listCacheHas(key){return assocIndexOf(this.__data__,key)>-1;}module.exports=listCacheHas;/***/},/* 97 *//***/function(module,exports,__webpack_require__){var assocIndexOf=__webpack_require__(8);/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */function listCacheSet(key,value){var data=this.__data__,index=assocIndexOf(data,key);if(index<0){++this.size;data.push([key,value]);}else{data[index][1]=value;}return this;}module.exports=listCacheSet;/***/},/* 98 *//***/function(module,exports,__webpack_require__){var Hash=__webpack_require__(46),ListCache=__webpack_require__(6),Map=__webpack_require__(15);/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */function mapCacheClear(){this.size=0;this.__data__={'hash':new Hash(),'map':new(Map||ListCache)(),'string':new Hash()};}module.exports=mapCacheClear;/***/},/* 99 *//***/function(module,exports,__webpack_require__){var getMapData=__webpack_require__(9);/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function mapCacheDelete(key){var result=getMapData(this,key)['delete'](key);this.size-=result?1:0;return result;}module.exports=mapCacheDelete;/***/},/* 100 *//***/function(module,exports,__webpack_require__){var getMapData=__webpack_require__(9);/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function mapCacheGet(key){return getMapData(this,key).get(key);}module.exports=mapCacheGet;/***/},/* 101 *//***/function(module,exports,__webpack_require__){var getMapData=__webpack_require__(9);/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function mapCacheHas(key){return getMapData(this,key).has(key);}module.exports=mapCacheHas;/***/},/* 102 *//***/function(module,exports,__webpack_require__){var getMapData=__webpack_require__(9);/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */function mapCacheSet(key,value){var data=getMapData(this,key),size=data.size;data.set(key,value);this.size+=data.size==size?0:1;return this;}module.exports=mapCacheSet;/***/},/* 103 *//***/function(module,exports){/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */function mapToArray(map){var index=-1,result=Array(map.size);map.forEach(function(value,key){result[++index]=[key,value];});return result;}module.exports=mapToArray;/***/},/* 104 *//***/function(module,exports,__webpack_require__){var memoize=__webpack_require__(123);/** Used as the maximum memoize cache size. */var MAX_MEMOIZE_SIZE=500;/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */function memoizeCapped(func){var result=memoize(func,function(key){if(cache.size===MAX_MEMOIZE_SIZE){cache.clear();}return key;});var cache=result.cache;return result;}module.exports=memoizeCapped;/***/},/* 105 *//***/function(module,exports,__webpack_require__){var overArg=__webpack_require__(108);/* Built-in method references for those with the same name as other `lodash` methods. */var nativeKeys=overArg(_keys2.default,Object);module.exports=nativeKeys;/***/},/* 106 *//***/function(module,exports,__webpack_require__){/* WEBPACK VAR INJECTION */(function(module){var freeGlobal=__webpack_require__(29);/** Detect free variable `exports`. */var freeExports=(typeof exports==='undefined'?'undefined':(0,_typeof4.default)(exports))=='object'&&exports&&!exports.nodeType&&exports;/** Detect free variable `module`. */var freeModule=freeExports&&(typeof module==='undefined'?'undefined':(0,_typeof4.default)(module))=='object'&&module&&!module.nodeType&&module;/** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule&&freeModule.exports===freeExports;/** Detect free variable `process` from Node.js. */var freeProcess=moduleExports&&freeGlobal.process;/** Used to access faster Node.js helpers. */var nodeUtil=function(){try{return freeProcess&&freeProcess.binding&&freeProcess.binding('util');}catch(e){}}();module.exports=nodeUtil;/* WEBPACK VAR INJECTION */}).call(exports,__webpack_require__(20)(module));/***/},/* 107 *//***/function(module,exports){/** Used for built-in method references. */var objectProto=Object.prototype;/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */var nativeObjectToString=objectProto.toString;/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */function objectToString(value){return nativeObjectToString.call(value);}module.exports=objectToString;/***/},/* 108 *//***/function(module,exports){/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */function overArg(func,transform){return function(arg){return func(transform(arg));};}module.exports=overArg;/***/},/* 109 *//***/function(module,exports){/** Used to stand-in for `undefined` hash values. */var HASH_UNDEFINED='__lodash_hash_undefined__';/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */function setCacheAdd(value){this.__data__.set(value,HASH_UNDEFINED);return this;}module.exports=setCacheAdd;/***/},/* 110 *//***/function(module,exports){/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */function setCacheHas(value){return this.__data__.has(value);}module.exports=setCacheHas;/***/},/* 111 *//***/function(module,exports){/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */function setToArray(set){var index=-1,result=Array(set.size);set.forEach(function(value){result[++index]=value;});return result;}module.exports=setToArray;/***/},/* 112 *//***/function(module,exports,__webpack_require__){var ListCache=__webpack_require__(6);/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */function stackClear(){this.__data__=new ListCache();this.size=0;}module.exports=stackClear;/***/},/* 113 *//***/function(module,exports){/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function stackDelete(key){var data=this.__data__,result=data['delete'](key);this.size=data.size;return result;}module.exports=stackDelete;/***/},/* 114 *//***/function(module,exports){/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function stackGet(key){return this.__data__.get(key);}module.exports=stackGet;/***/},/* 115 *//***/function(module,exports){/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function stackHas(key){return this.__data__.has(key);}module.exports=stackHas;/***/},/* 116 *//***/function(module,exports,__webpack_require__){var ListCache=__webpack_require__(6),Map=__webpack_require__(15),MapCache=__webpack_require__(16);/** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200;/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */function stackSet(key,value){var data=this.__data__;if(data instanceof ListCache){var pairs=data.__data__;if(!Map||pairs.length<LARGE_ARRAY_SIZE-1){pairs.push([key,value]);this.size=++data.size;return this;}data=this.__data__=new MapCache(pairs);}data.set(key,value);this.size=data.size;return this;}module.exports=stackSet;/***/},/* 117 *//***/function(module,exports,__webpack_require__){var memoizeCapped=__webpack_require__(104);/** Used to match property names within property paths. */var reLeadingDot=/^\./,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;/** Used to match backslashes in property paths. */var reEscapeChar=/\\(\\)?/g;/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */var stringToPath=memoizeCapped(function(string){var result=[];if(reLeadingDot.test(string)){result.push('');}string.replace(rePropName,function(match,number,quote,string){result.push(quote?string.replace(reEscapeChar,'$1'):number||match);});return result;});module.exports=stringToPath;/***/},/* 118 *//***/function(module,exports,__webpack_require__){var createFind=__webpack_require__(75),findIndex=__webpack_require__(119);/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */var find=createFind(findIndex);module.exports=find;/***/},/* 119 *//***/function(module,exports,__webpack_require__){var baseFindIndex=__webpack_require__(57),baseIteratee=__webpack_require__(26),toInteger=__webpack_require__(128);/* Built-in method references for those with the same name as other `lodash` methods. */var nativeMax=Math.max;/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */function findIndex(array,predicate,fromIndex){var length=array==null?0:array.length;if(!length){return-1;}var index=fromIndex==null?0:toInteger(fromIndex);if(index<0){index=nativeMax(length+index,0);}return baseFindIndex(array,baseIteratee(predicate,3),index);}module.exports=findIndex;/***/},/* 120 *//***/function(module,exports,__webpack_require__){var baseGet=__webpack_require__(24);/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */function get(object,path,defaultValue){var result=object==null?undefined:baseGet(object,path);return result===undefined?defaultValue:result;}module.exports=get;/***/},/* 121 *//***/function(module,exports,__webpack_require__){var baseHasIn=__webpack_require__(59),hasPath=__webpack_require__(84);/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */function hasIn(object,path){return object!=null&&hasPath(object,path,baseHasIn);}module.exports=hasIn;/***/},/* 122 *//***/function(module,exports){/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */function identity(value){return value;}module.exports=identity;/***/},/* 123 *//***/function(module,exports,__webpack_require__){var MapCache=__webpack_require__(16);/** Error message constants. */var FUNC_ERROR_TEXT='Expected a function';/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */function memoize(func,resolver){if(typeof func!='function'||resolver!=null&&typeof resolver!='function'){throw new TypeError(FUNC_ERROR_TEXT);}var memoized=function memoized(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}var result=func.apply(this,args);memoized.cache=cache.set(key,result)||cache;return result;};memoized.cache=new(memoize.Cache||MapCache)();return memoized;}// Expose `MapCache`.
memoize.Cache=MapCache;module.exports=memoize;/***/},/* 124 *//***/function(module,exports,__webpack_require__){var baseProperty=__webpack_require__(68),basePropertyDeep=__webpack_require__(69),isKey=__webpack_require__(17),toKey=__webpack_require__(11);/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */function property(path){return isKey(path)?baseProperty(toKey(path)):basePropertyDeep(path);}module.exports=property;/***/},/* 125 *//***/function(module,exports){/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */function stubArray(){return[];}module.exports=stubArray;/***/},/* 126 *//***/function(module,exports){/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */function stubFalse(){return false;}module.exports=stubFalse;/***/},/* 127 *//***/function(module,exports,__webpack_require__){var toNumber=__webpack_require__(129);/** Used as references for various `Number` constants. */var INFINITY=1/0,MAX_INTEGER=1.7976931348623157e+308;/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */function toFinite(value){if(!value){return value===0?value:0;}value=toNumber(value);if(value===INFINITY||value===-INFINITY){var sign=value<0?-1:1;return sign*MAX_INTEGER;}return value===value?value:0;}module.exports=toFinite;/***/},/* 128 *//***/function(module,exports,__webpack_require__){var toFinite=__webpack_require__(127);/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */function toInteger(value){var result=toFinite(value),remainder=result%1;return result===result?remainder?result-remainder:result:0;}module.exports=toInteger;/***/},/* 129 *//***/function(module,exports,__webpack_require__){var isObject=__webpack_require__(12),isSymbol=__webpack_require__(13);/** Used as references for various `Number` constants. */var NAN=0/0;/** Used to match leading and trailing whitespace. */var reTrim=/^\s+|\s+$/g;/** Used to detect bad signed hexadecimal string values. */var reIsBadHex=/^[-+]0x[0-9a-f]+$/i;/** Used to detect binary string values. */var reIsBinary=/^0b[01]+$/i;/** Used to detect octal string values. */var reIsOctal=/^0o[0-7]+$/i;/** Built-in method references without a dependency on `root`. */var freeParseInt=parseInt;/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */function toNumber(value){if(typeof value=='number'){return value;}if(isSymbol(value)){return NAN;}if(isObject(value)){var other=typeof value.valueOf=='function'?value.valueOf():value;value=isObject(other)?other+'':other;}if(typeof value!='string'){return value===0?value:+value;}value=value.replace(reTrim,'');var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value;}module.exports=toNumber;/***/},/* 130 *//***/function(module,exports,__webpack_require__){var baseToString=__webpack_require__(71);/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */function toString(value){return value==null?'':baseToString(value);}module.exports=toString;/***/},/* 131 *//***/function(module,exports,__webpack_require__){module.exports=__webpack_require__(41);/***/}]/******/));});//# sourceMappingURL=prototypo.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66).Buffer, __webpack_require__(71)(module)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(68)
var ieee754 = __webpack_require__(69)
var isArray = __webpack_require__(70)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 67 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 69 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 70 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
module.exports = __webpack_require__(0).Object.getOwnPropertySymbols;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(21);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(14);
var $getPrototypeOf = __webpack_require__(50);

__webpack_require__(12)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
__webpack_require__(53);
module.exports = __webpack_require__(32).f('iterator');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(52)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(22);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(19);
var setToStringTag = __webpack_require__(20);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(84);
var step = __webpack_require__(85);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(52)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(55);
__webpack_require__(87);
__webpack_require__(88);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('asyncIterator');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33)('observable');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperties: __webpack_require__(46) });


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(94);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(12)('getOwnPropertyNames', function () {
  return __webpack_require__(47).f;
});


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Math.log2;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(56) });


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(10);
var $getOwnPropertyDescriptor = __webpack_require__(49).f;

__webpack_require__(12)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(0).Object.preventExtensions;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(2);
var meta = __webpack_require__(13).onFreeze;

__webpack_require__(12)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(2);
var meta = __webpack_require__(13).onFreeze;

__webpack_require__(12)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
module.exports = __webpack_require__(0).Math.trunc;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
module.exports = __webpack_require__(0).Math.sign;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(1);

$export($export.S, 'Math', { sign: __webpack_require__(118) });


/***/ }),
/* 118 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
__webpack_require__(53);
__webpack_require__(124);
__webpack_require__(133);
__webpack_require__(135);
module.exports = __webpack_require__(0).WeakMap;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(37)(0);
var redefine = __webpack_require__(31);
var meta = __webpack_require__(13);
var assign = __webpack_require__(56);
var weak = __webpack_require__(127);
var isObject = __webpack_require__(2);
var fails = __webpack_require__(9);
var validate = __webpack_require__(59);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(132)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(126);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var isArray = __webpack_require__(45);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(57);
var getWeak = __webpack_require__(13).getWeak;
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(2);
var anInstance = __webpack_require__(58);
var forOf = __webpack_require__(38);
var createArrayMethod = __webpack_require__(37);
var $has = __webpack_require__(6);
var validate = __webpack_require__(59);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(131);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var $export = __webpack_require__(1);
var meta = __webpack_require__(13);
var fails = __webpack_require__(9);
var hide = __webpack_require__(7);
var redefineAll = __webpack_require__(57);
var forOf = __webpack_require__(38);
var anInstance = __webpack_require__(58);
var isObject = __webpack_require__(2);
var setToStringTag = __webpack_require__(20);
var dP = __webpack_require__(8).f;
var each = __webpack_require__(37)(0);
var DESCRIPTORS = __webpack_require__(5);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(134)('WeakMap');


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(136)('WeakMap');


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(41);
var ctx = __webpack_require__(18);
var forOf = __webpack_require__(38);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(51);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(54);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ })
/******/ ]);