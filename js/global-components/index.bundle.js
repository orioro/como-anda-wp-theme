(function () {
	'use strict';

	var componentSystem = function componentSystem(_ref) {
	  var componentNameAttribute = _ref.componentNameAttribute,
	      specs = _ref.specs;
	  var COMPONENT_SELECTOR = "[".concat(componentNameAttribute, "]");
	  return function ($rootElement) {
	    var $components = Array.from($rootElement.find(COMPONENT_SELECTOR)).map(jQuery);
	    $components.forEach(function ($component) {
	      var componentName = $component.attr(componentNameAttribute);
	      var componentSpec = specs.find(function (spec) {
	        return spec.name === componentName;
	      });

	      if (!componentSpec) {
	        console.warn("Could not find spec for component with name '".concat(componentName, "'"));
	      }

	      componentSpec.initialize($component);
	    });
	  };
	};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var api = createCommonjsModule(function (module) {
	module.exports =
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
	/******/ 	__webpack_require__.p = "/";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 143);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var core = __webpack_require__(22);
	var hide = __webpack_require__(12);
	var redefine = __webpack_require__(13);
	var ctx = __webpack_require__(19);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
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
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(4);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


	/***/ }),
	/* 3 */
	/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(55)('wks');
	var uid = __webpack_require__(36);
	var Symbol = __webpack_require__(2).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(3)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(1);
	var IE8_DOM_DEFINE = __webpack_require__(109);
	var toPrimitive = __webpack_require__(23);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(25);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(24);
	module.exports = function (it) {
	  return Object(defined(it));
	};


	/***/ }),
	/* 10 */
	/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


	/***/ }),
	/* 11 */
	/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var createDesc = __webpack_require__(35);
	module.exports = __webpack_require__(6) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


	/***/ }),
	/* 13 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var hide = __webpack_require__(12);
	var has = __webpack_require__(11);
	var SRC = __webpack_require__(36)('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	__webpack_require__(22).inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});


	/***/ }),
	/* 14 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var fails = __webpack_require__(3);
	var defined = __webpack_require__(24);
	var quot = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function (string, tag, attribute, value) {
	  var S = String(defined(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function (NAME, exec) {
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function () {
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};


	/***/ }),
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(51);
	var defined = __webpack_require__(24);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


	/***/ }),
	/* 16 */
	/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(52);
	var createDesc = __webpack_require__(35);
	var toIObject = __webpack_require__(15);
	var toPrimitive = __webpack_require__(23);
	var has = __webpack_require__(11);
	var IE8_DOM_DEFINE = __webpack_require__(109);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


	/***/ }),
	/* 17 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(11);
	var toObject = __webpack_require__(9);
	var IE_PROTO = __webpack_require__(78)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


	/***/ }),
	/* 18 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(32);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__(149);
	/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });



	var version = '15.1.0'; // trick libraries to think we are react

	var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

	var REACT_ELEMENT_TYPE = (typeof Symbol!=='undefined' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

	var COMPONENT_WRAPPER_KEY = (typeof Symbol!=='undefined' && Symbol.for) ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

	// don't autobind these methods since they already have guaranteed context.
	var AUTOBIND_BLACKLIST = {
		constructor: 1,
		render: 1,
		shouldComponentUpdate: 1,
		componentWillReceiveProps: 1,
		componentWillUpdate: 1,
		componentDidUpdate: 1,
		componentWillMount: 1,
		componentDidMount: 1,
		componentWillUnmount: 1,
		componentDidUnmount: 1
	};


	var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;


	var BYPASS_HOOK = {};

	/*global process*/
	var DEV = typeof process==='undefined' || !process.env || "development"!=='production';

	// a component that renders nothing. Used to replace components for unmountComponentAtNode.
	function EmptyComponent() { return null; }



	// make react think we're react.
	var VNode = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])('a', null).constructor;
	VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
	VNode.prototype.preactCompatUpgraded = false;
	VNode.prototype.preactCompatNormalized = false;

	Object.defineProperty(VNode.prototype, 'type', {
		get: function() { return this.nodeName; },
		set: function(v) { this.nodeName = v; },
		configurable:true
	});

	Object.defineProperty(VNode.prototype, 'props', {
		get: function() { return this.attributes; },
		set: function(v) { this.attributes = v; },
		configurable:true
	});



	var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].event;
	__WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].event = function (e) {
		if (oldEventHook) { e = oldEventHook(e); }
		e.persist = Object;
		e.nativeEvent = e;
		return e;
	};


	var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].vnode;
	__WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].vnode = function (vnode) {
		if (!vnode.preactCompatUpgraded) {
			vnode.preactCompatUpgraded = true;

			var tag = vnode.nodeName,
				attrs = vnode.attributes = extend({}, vnode.attributes);

			if (typeof tag==='function') {
				if (tag[COMPONENT_WRAPPER_KEY]===true || (tag.prototype && 'isReactComponent' in tag.prototype)) {
					if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
					if (vnode.children) { attrs.children = vnode.children; }

					if (!vnode.preactCompatNormalized) {
						normalizeVNode(vnode);
					}
					handleComponentVNode(vnode);
				}
			}
			else {
				if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
				if (vnode.children) { attrs.children = vnode.children; }

				if (attrs.defaultValue) {
					if (!attrs.value && attrs.value!==0) {
						attrs.value = attrs.defaultValue;
					}
					delete attrs.defaultValue;
				}

				handleElementVNode(vnode, attrs);
			}
		}

		if (oldVnodeHook) { oldVnodeHook(vnode); }
	};

	function handleComponentVNode(vnode) {
		var tag = vnode.nodeName,
			a = vnode.attributes;

		vnode.attributes = {};
		if (tag.defaultProps) { extend(vnode.attributes, tag.defaultProps); }
		if (a) { extend(vnode.attributes, a); }
	}

	function handleElementVNode(vnode, a) {
		var shouldSanitize, attrs, i;
		if (a) {
			for (i in a) { if ((shouldSanitize = CAMEL_PROPS.test(i))) { break; } }
			if (shouldSanitize) {
				attrs = vnode.attributes = {};
				for (i in a) {
					if (a.hasOwnProperty(i)) {
						attrs[ CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i ] = a[i];
					}
				}
			}
		}
	}



	// proxy render() since React returns a Component reference.
	function render$1(vnode, parent, callback) {
		var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

		// ignore impossible previous renders
		if (prev && prev.parentNode!==parent) { prev = null; }

		// default to first Element child
		if (!prev && parent) { prev = parent.firstElementChild; }

		// remove unaffected siblings
		for (var i=parent.childNodes.length; i--; ) {
			if (parent.childNodes[i]!==prev) {
				parent.removeChild(parent.childNodes[i]);
			}
		}

		var out = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["e" /* render */])(vnode, parent, prev);
		if (parent) { parent._preactCompatRendered = out && (out._component || { base: out }); }
		if (typeof callback==='function') { callback(); }
		return out && out._component || out;
	}


	var ContextProvider = function () {};

	ContextProvider.prototype.getChildContext = function () {
		return this.props.context;
	};
	ContextProvider.prototype.render = function (props) {
		return props.children[0];
	};

	function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
		var wrap = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])(ContextProvider, { context: parentComponent.context }, vnode);
		var renderContainer = render$1(wrap, container);
		var component = renderContainer._component || renderContainer.base;
		if (callback) { callback.call(component, renderContainer); }
		return component;
	}


	function unmountComponentAtNode(container) {
		var existing = container._preactCompatRendered && container._preactCompatRendered.base;
		if (existing && existing.parentNode===container) {
			Object(__WEBPACK_IMPORTED_MODULE_1_preact__["e" /* render */])(Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])(EmptyComponent), container, existing);
			return true;
		}
		return false;
	}



	var ARR = [];

	// This API is completely unnecessary for Preact, so it's basically passthrough.
	var Children = {
		map: function(children, fn, ctx) {
			if (children == null) { return null; }
			children = Children.toArray(children);
			if (ctx && ctx!==children) { fn = fn.bind(ctx); }
			return children.map(fn);
		},
		forEach: function(children, fn, ctx) {
			if (children == null) { return null; }
			children = Children.toArray(children);
			if (ctx && ctx!==children) { fn = fn.bind(ctx); }
			children.forEach(fn);
		},
		count: function(children) {
			return children && children.length || 0;
		},
		only: function(children) {
			children = Children.toArray(children);
			if (children.length!==1) { throw new Error('Children.only() expects only one child.'); }
			return children[0];
		},
		toArray: function(children) {
			if (children == null) { return []; }
			return ARR.concat(children);
		}
	};


	/** Track current render() component for ref assignment */
	var currentComponent;


	function createFactory(type) {
		return createElement.bind(null, type);
	}


	var DOM = {};
	for (var i=ELEMENTS.length; i--; ) {
		DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
	}

	function upgradeToVNodes(arr, offset) {
		for (var i=offset || 0; i<arr.length; i++) {
			var obj = arr[i];
			if (Array.isArray(obj)) {
				upgradeToVNodes(obj);
			}
			else if (obj && typeof obj==='object' && !isValidElement(obj) && ((obj.props && obj.type) || (obj.attributes && obj.nodeName) || obj.children)) {
				arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
			}
		}
	}

	function isStatelessComponent(c) {
		return typeof c==='function' && !(c.prototype && c.prototype.render);
	}


	// wraps stateless functional components in a PropTypes validator
	function wrapStatelessComponent(WrappedComponent) {
		return createClass({
			displayName: WrappedComponent.displayName || WrappedComponent.name,
			render: function() {
				return WrappedComponent(this.props, this.context);
			}
		});
	}


	function statelessComponentHook(Ctor) {
		var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
		if (Wrapped) { return Wrapped===true ? Ctor : Wrapped; }

		Wrapped = wrapStatelessComponent(Ctor);

		Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable:true, value:true });
		Wrapped.displayName = Ctor.displayName;
		Wrapped.propTypes = Ctor.propTypes;
		Wrapped.defaultProps = Ctor.defaultProps;

		Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable:true, value:Wrapped });

		return Wrapped;
	}


	function createElement() {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		upgradeToVNodes(args, 2);
		return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */].apply(void 0, args));
	}


	function normalizeVNode(vnode) {
		vnode.preactCompatNormalized = true;

		applyClassName(vnode);

		if (isStatelessComponent(vnode.nodeName)) {
			vnode.nodeName = statelessComponentHook(vnode.nodeName);
		}

		var ref = vnode.attributes.ref,
			type = ref && typeof ref;
		if (currentComponent && (type==='string' || type==='number')) {
			vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
		}

		applyEventNormalization(vnode);

		return vnode;
	}


	function cloneElement$1(element, props) {
		var children = [], len = arguments.length - 2;
		while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

		if (!isValidElement(element)) { return element; }
		var elementProps = element.attributes || element.props;
		var node = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])(
			element.nodeName || element.type,
			extend({}, elementProps),
			element.children || elementProps && elementProps.children
		);
		// Only provide the 3rd argument if needed.
		// Arguments 3+ overwrite element.children in preactCloneElement
		var cloneArgs = [node, props];
		if (children && children.length) {
			cloneArgs.push(children);
		}
		else if (props && props.children) {
			cloneArgs.push(props.children);
		}
		return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["b" /* cloneElement */].apply(void 0, cloneArgs));
	}


	function isValidElement(element) {
		return element && ((element instanceof VNode) || element.$$typeof===REACT_ELEMENT_TYPE);
	}


	function createStringRefProxy(name, component) {
		return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
			if (component && component.refs) {
				component.refs[name] = resolved;
				if (resolved===null) {
					delete component._refProxies[name];
					component = null;
				}
			}
		});
	}


	function applyEventNormalization(ref) {
		var nodeName = ref.nodeName;
		var attributes = ref.attributes;

		if (!attributes || typeof nodeName!=='string') { return; }
		var props = {};
		for (var i in attributes) {
			props[i.toLowerCase()] = i;
		}
		if (props.ondoubleclick) {
			attributes.ondblclick = attributes[props.ondoubleclick];
			delete attributes[props.ondoubleclick];
		}
		// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
		if (props.onchange && (nodeName==='textarea' || (nodeName.toLowerCase()==='input' && !/^fil|che|rad/i.test(attributes.type)))) {
			var normalized = props.oninput || 'oninput';
			if (!attributes[normalized]) {
				attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
				delete attributes[props.onchange];
			}
		}
	}


	function applyClassName(vnode) {
		var a = vnode.attributes || (vnode.attributes = {});
		classNameDescriptor.enumerable = 'className' in a;
		if (a.className) { a.class = a.className; }
		Object.defineProperty(a, 'className', classNameDescriptor);
	}


	var classNameDescriptor = {
		configurable: true,
		get: function() { return this.class; },
		set: function(v) { this.class = v; }
	};

	function extend(base, props) {
		var arguments$1 = arguments;

		for (var i=1, obj = (void 0); i<arguments.length; i++) {
			if ((obj = arguments$1[i])) {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						base[key] = obj[key];
					}
				}
			}
		}
		return base;
	}


	function shallowDiffers(a, b) {
		for (var i in a) { if (!(i in b)) { return true; } }
		for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
		return false;
	}


	function findDOMNode(component) {
		return component && component.base || component;
	}


	function F(){}

	function createClass(obj) {
		function cl(props, context) {
			bindAll(this);
			Component$1.call(this, props, context, BYPASS_HOOK);
			newComponentHook.call(this, props, context);
		}

		obj = extend({ constructor: cl }, obj);

		// We need to apply mixins here so that getDefaultProps is correctly mixed
		if (obj.mixins) {
			applyMixins(obj, collateMixins(obj.mixins));
		}
		if (obj.statics) {
			extend(cl, obj.statics);
		}
		if (obj.propTypes) {
			cl.propTypes = obj.propTypes;
		}
		if (obj.defaultProps) {
			cl.defaultProps = obj.defaultProps;
		}
		if (obj.getDefaultProps) {
			cl.defaultProps = obj.getDefaultProps.call(cl);
		}

		F.prototype = Component$1.prototype;
		cl.prototype = extend(new F(), obj);

		cl.displayName = obj.displayName || 'Component';

		return cl;
	}


	// Flatten an Array of mixins to a map of method name to mixin implementations
	function collateMixins(mixins) {
		var keyed = {};
		for (var i=0; i<mixins.length; i++) {
			var mixin = mixins[i];
			for (var key in mixin) {
				if (mixin.hasOwnProperty(key) && typeof mixin[key]==='function') {
					(keyed[key] || (keyed[key]=[])).push(mixin[key]);
				}
			}
		}
		return keyed;
	}


	// apply a mapping of Arrays of mixin methods to a component prototype
	function applyMixins(proto, mixins) {
		for (var key in mixins) { if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(
				mixins[key].concat(proto[key] || ARR),
				key==='getDefaultProps' || key==='getInitialState' || key==='getChildContext'
			);
		} }
	}


	function bindAll(ctx) {
		for (var i in ctx) {
			var v = ctx[i];
			if (typeof v==='function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
				(ctx[i] = v.bind(ctx)).__bound = true;
			}
		}
	}


	function callMethod(ctx, m, args) {
		if (typeof m==='string') {
			m = ctx.constructor.prototype[m];
		}
		if (typeof m==='function') {
			return m.apply(ctx, args);
		}
	}

	function multihook(hooks, skipDuplicates) {
		return function() {
			var arguments$1 = arguments;
			var this$1 = this;

			var ret;
			for (var i=0; i<hooks.length; i++) {
				var r = callMethod(this$1, hooks[i], arguments$1);

				if (skipDuplicates && r!=null) {
					if (!ret) { ret = {}; }
					for (var key in r) { if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					} }
				}
				else if (typeof r!=='undefined') { ret = r; }
			}
			return ret;
		};
	}


	function newComponentHook(props, context) {
		propsHook.call(this, props, context);
		this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
		this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
	}


	function propsHook(props, context) {
		if (!props) { return; }

		// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
		var c = props.children;
		if (c && Array.isArray(c) && c.length===1 && (typeof c[0]==='string' || typeof c[0]==='function' || c[0] instanceof VNode)) {
			props.children = c[0];

			// but its totally still going to be an Array.
			if (props.children && typeof props.children==='object') {
				props.children.length = 1;
				props.children[0] = props.children;
			}
		}

		// add proptype checking
		if (DEV) {
			var ctor = typeof this==='function' ? this : this.constructor,
				propTypes = this.propTypes || ctor.propTypes;
			var displayName = this.displayName || ctor.name;

			if (propTypes) {
				__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
			}
		}
	}


	function beforeRender(props) {
		currentComponent = this;
	}

	function afterRender() {
		if (currentComponent===this) {
			currentComponent = null;
		}
	}



	function Component$1(props, context, opts) {
		__WEBPACK_IMPORTED_MODULE_1_preact__["a" /* Component */].call(this, props, context);
		this.state = this.getInitialState ? this.getInitialState() : {};
		this.refs = {};
		this._refProxies = {};
		if (opts!==BYPASS_HOOK) {
			newComponentHook.call(this, props, context);
		}
	}
	extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["a" /* Component */](), {
		constructor: Component$1,

		isReactComponent: {},

		replaceState: function(state, callback) {
			var this$1 = this;

			this.setState(state, callback);
			for (var i in this$1.state) {
				if (!(i in state)) {
					delete this$1.state[i];
				}
			}
		},

		getDOMNode: function() {
			return this.base;
		},

		isMounted: function() {
			return !!this.base;
		}
	});



	function PureComponent(props, context) {
		Component$1.call(this, props, context);
	}
	F.prototype = Component$1.prototype;
	PureComponent.prototype = new F();
	PureComponent.prototype.isPureReactComponent = true;
	PureComponent.prototype.shouldComponentUpdate = function(props, state) {
		return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
	};

	var index = {
		version: version,
		DOM: DOM,
		PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
		Children: Children,
		render: render$1,
		createClass: createClass,
		createFactory: createFactory,
		createElement: createElement,
		cloneElement: cloneElement$1,
		isValidElement: isValidElement,
		findDOMNode: findDOMNode,
		unmountComponentAtNode: unmountComponentAtNode,
		Component: Component$1,
		PureComponent: PureComponent,
		unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
		__spread: extend
	};

	/* harmony default export */ __webpack_exports__["default"] = (index);


	/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(28)));

	/***/ }),
	/* 19 */
	/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
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
	/* 20 */
	/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


	/***/ }),
	/* 21 */
	/***/ (function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(3);

	module.exports = function (method, arg) {
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};


	/***/ }),
	/* 22 */
	/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.3' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


	/***/ }),
	/* 23 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(4);
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
	/* 24 */
	/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


	/***/ }),
	/* 25 */
	/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


	/***/ }),
	/* 26 */
	/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(0);
	var core = __webpack_require__(22);
	var fails = __webpack_require__(3);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


	/***/ }),
	/* 27 */
	/***/ (function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx = __webpack_require__(19);
	var IObject = __webpack_require__(51);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(8);
	var asc = __webpack_require__(95);
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
	/* 28 */
	/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ());
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] };

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


	/***/ }),
	/* 29 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(process) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.noop = exports.applyIOSIframeResizeHack = exports.applyIOSFooterHack = exports.debounce = exports.fixSafariScroll = exports.isIOSDevice = exports.isSafari = exports.isMobile = exports.isScreenBig = exports.isElementInViewport = exports.onMessage = exports.ensureMetaViewport = exports.replaceExistingKeys = exports.appendParamsToUrl = exports.DOMAIN = undefined;

	var _customEvent = __webpack_require__(150);

	var _customEvent2 = _interopRequireDefault(_customEvent);

	var _isUrl = __webpack_require__(151);

	var _isUrl2 = _interopRequireDefault(_isUrl);

	var _urlParse = __webpack_require__(104);

	var _urlParse2 = _interopRequireDefault(_urlParse);

	var _isobject = __webpack_require__(154);

	var _isobject2 = _interopRequireDefault(_isobject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DOMAIN_REGEXP = /(\.typeform)\.(com|io)$/;
	var DOMAIN = exports.DOMAIN = 'admin.typeform.com';

	var appendParamsToUrl = exports.appendParamsToUrl = function appendParamsToUrl(url, params) {
	  var queryParameters = [];

	  var _UrlParse = (0, _urlParse2.default)(url, true),
	      query = _UrlParse.query,
	      origin = _UrlParse.origin,
	      pathname = _UrlParse.pathname;

	  var path = pathname.replace(/\/$/, ''); // remove trailing slash
	  var parameters = Object.assign({}, query, params);

	  Object.keys(parameters).forEach(function (key) {
	    queryParameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]));
	  });

	  return '' + origin + path + '?' + queryParameters.join('&');
	};

	var replaceExistingKeys = exports.replaceExistingKeys = function replaceExistingKeys(obj, replacer) {
	  return Object.keys(replacer).reduce(function (acc, oldKey) {
	    var newKey = replacer[oldKey];
	    if (newKey != null && obj[oldKey] != null && obj[oldKey] !== false) {
	      acc[newKey] = obj[oldKey];
	    }

	    return acc;
	  }, {});
	};

	var ensureMetaViewport = exports.ensureMetaViewport = function ensureMetaViewport() {
	  if (!document.querySelector) {
	    return;
	  }

	  var viewport = document.querySelector('meta[name=viewport]');
	  var viewportContent = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';

	  if (viewport) {
	    viewport.setAttribute('content', viewportContent);
	  } else {
	    var metaTag = document.createElement('meta');
	    metaTag.content = viewportContent;
	    metaTag.name = 'viewport';
	    document.head.appendChild(metaTag);
	  }
	};

	var acceptMessageOrigin = function acceptMessageOrigin(e) {
	  {
	    return true;
	  }

	  // deal with polymorphistic legacy: some events come from jQuery, other Vanilla JS
	  var re = new RegExp('^(?:f|ht)tp(?:s)?://([^/]+)', 'im');
	  var matches = e.origin.match(re);
	  if (matches && matches.length > 1) {
	    var domain = matches[1].toString();

	    // to test this in local you will need to whitelist your local domain
	    if (!DOMAIN_REGEXP.test(domain)) {
	      return false;
	    }
	  } else {
	    return false;
	  }

	  return true;
	};

	var onMessage = exports.onMessage = function onMessage(e) {
	  e = e.originalEvent || e;
	  if (!acceptMessageOrigin(e)) {
	    return false;
	  }

	  if ((0, _isUrl2.default)(e.data)) {
	    window.location.href = e.data;
	    return;
	  }

	  if ((0, _isobject2.default)(e.data) && e.data.hasOwnProperty('type')) {
	    window.dispatchEvent(new _customEvent2.default(e.data.type, { detail: e.data }));
	    return;
	  }

	  window.dispatchEvent(new _customEvent2.default(e.data));
	};

	var isElementInViewport = exports.isElementInViewport = function isElementInViewport(el) {
	  var rect = el.getBoundingClientRect();
	  var docWidth = window.innerWidth || document.documentElement.clientWidth;
	  var docHeight = window.innerHeight || document.documentElement.clientHeight;
	  var docCenterX = docWidth / 2;
	  var docCenterY = docHeight / 2;

	  // Check that the element is completely visible in the viewport...
	  var elementIsFullyVisible = rect.top >= 0 && rect.left >= 0 && rect.bottom <= docHeight && rect.right <= docWidth;

	  // ...or that it's right above the vertical and horizontal centers of the page...
	  var elementIsAboveTheFold = rect.top <= docCenterY && rect.left <= docCenterX;

	  // ...or that it's at least taking up to 1/3 of the page!
	  var elementIsPartiallyVisible = docHeight - rect.top >= docHeight / 3;

	  return elementIsFullyVisible || elementIsAboveTheFold || elementIsPartiallyVisible;
	};

	var isScreenBig = exports.isScreenBig = function isScreenBig() {
	  return window.screen.width >= 1024 && window.screen.height >= 768;
	};

	var isMobile = exports.isMobile = function isMobile(ua) {
	  return (/mobile|tablet|android/i.test(ua.toLowerCase())
	  );
	};

	var isSafari = exports.isSafari = function isSafari(ua) {
	  return (/^((?!chrome|android).)*safari/i.test(ua.toLowerCase())
	  );
	};

	var isIOSDevice = exports.isIOSDevice = function isIOSDevice(ua) {
	  return (/ip(hone|od|ad)/i.test(ua.toLowerCase())
	  );
	};

	// RD-712
	var fixSafariScroll = exports.fixSafariScroll = function fixSafariScroll(iframe) {
	  if (isMobile(navigator.userAgent) || !isSafari(navigator.userAgent)) {
	    return;
	  }

	  iframe.addEventListener('load', function () {
	    return setTimeout(function () {
	      var originalHeight = window.getComputedStyle(iframe).height;
	      iframe.setAttribute('height', iframe.offsetHeight + 1 + 'px');
	      return setTimeout(function () {
	        iframe.setAttribute('height', originalHeight);
	      }, 1);
	    }, 1000);
	  });
	};

	var debounce = exports.debounce = function debounce(func, wait, context) {
	  var timeout = void 0;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var debounced = function debounced() {
	      timeout = null;
	      func.call.apply(func, [context].concat(args));
	    };

	    clearTimeout(timeout);
	    timeout = setTimeout(debounced, wait);
	  };
	};

	// Fix RD-731, footer not fully visible on iOS devices
	var applyIOSFooterHack = exports.applyIOSFooterHack = function applyIOSFooterHack(element) {
	  if (!isIOSDevice(navigator.userAgent)) {
	    return;
	  }

	  element.setAttribute('scrolling', 'no');
	  element.style.height = '1px';
	  element.style.minHeight = '100%';
	};

	var applyIOSIframeResizeHack = exports.applyIOSIframeResizeHack = function applyIOSIframeResizeHack(element) {
	  if (!isIOSDevice(navigator.userAgent)) {
	    return;
	  }

	  element.style.maxHeight = '100%';
	  element.style.maxWidth = '100%';
	  element.style.minHeight = '100%';
	  element.style.minWidth = '100%';
	  element.style.width = 0;
	};

	var noop = exports.noop = function noop() {
	  return null;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)));

	/***/ }),
	/* 30 */
	/***/ (function(module, exports, __webpack_require__) {

	if (__webpack_require__(6)) {
	  var LIBRARY = __webpack_require__(37);
	  var global = __webpack_require__(2);
	  var fails = __webpack_require__(3);
	  var $export = __webpack_require__(0);
	  var $typed = __webpack_require__(65);
	  var $buffer = __webpack_require__(101);
	  var ctx = __webpack_require__(19);
	  var anInstance = __webpack_require__(43);
	  var propertyDesc = __webpack_require__(35);
	  var hide = __webpack_require__(12);
	  var redefineAll = __webpack_require__(45);
	  var toInteger = __webpack_require__(25);
	  var toLength = __webpack_require__(8);
	  var toIndex = __webpack_require__(135);
	  var toAbsoluteIndex = __webpack_require__(39);
	  var toPrimitive = __webpack_require__(23);
	  var has = __webpack_require__(11);
	  var classof = __webpack_require__(53);
	  var isObject = __webpack_require__(4);
	  var toObject = __webpack_require__(9);
	  var isArrayIter = __webpack_require__(92);
	  var create = __webpack_require__(40);
	  var getPrototypeOf = __webpack_require__(17);
	  var gOPN = __webpack_require__(41).f;
	  var getIterFn = __webpack_require__(94);
	  var uid = __webpack_require__(36);
	  var wks = __webpack_require__(5);
	  var createArrayMethod = __webpack_require__(27);
	  var createArrayIncludes = __webpack_require__(56);
	  var speciesConstructor = __webpack_require__(63);
	  var ArrayIterators = __webpack_require__(97);
	  var Iterators = __webpack_require__(48);
	  var $iterDetect = __webpack_require__(60);
	  var setSpecies = __webpack_require__(42);
	  var arrayFill = __webpack_require__(96);
	  var arrayCopyWithin = __webpack_require__(125);
	  var $DP = __webpack_require__(7);
	  var $GOPD = __webpack_require__(16);
	  var dP = $DP.f;
	  var gOPD = $GOPD.f;
	  var RangeError = global.RangeError;
	  var TypeError = global.TypeError;
	  var Uint8Array = global.Uint8Array;
	  var ARRAY_BUFFER = 'ArrayBuffer';
	  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var PROTOTYPE = 'prototype';
	  var ArrayProto = Array[PROTOTYPE];
	  var $ArrayBuffer = $buffer.ArrayBuffer;
	  var $DataView = $buffer.DataView;
	  var arrayForEach = createArrayMethod(0);
	  var arrayFilter = createArrayMethod(2);
	  var arraySome = createArrayMethod(3);
	  var arrayEvery = createArrayMethod(4);
	  var arrayFind = createArrayMethod(5);
	  var arrayFindIndex = createArrayMethod(6);
	  var arrayIncludes = createArrayIncludes(true);
	  var arrayIndexOf = createArrayIncludes(false);
	  var arrayValues = ArrayIterators.values;
	  var arrayKeys = ArrayIterators.keys;
	  var arrayEntries = ArrayIterators.entries;
	  var arrayLastIndexOf = ArrayProto.lastIndexOf;
	  var arrayReduce = ArrayProto.reduce;
	  var arrayReduceRight = ArrayProto.reduceRight;
	  var arrayJoin = ArrayProto.join;
	  var arraySort = ArrayProto.sort;
	  var arraySlice = ArrayProto.slice;
	  var arrayToString = ArrayProto.toString;
	  var arrayToLocaleString = ArrayProto.toLocaleString;
	  var ITERATOR = wks('iterator');
	  var TAG = wks('toStringTag');
	  var TYPED_CONSTRUCTOR = uid('typed_constructor');
	  var DEF_CONSTRUCTOR = uid('def_constructor');
	  var ALL_CONSTRUCTORS = $typed.CONSTR;
	  var TYPED_ARRAY = $typed.TYPED;
	  var VIEW = $typed.VIEW;
	  var WRONG_LENGTH = 'Wrong length!';

	  var $map = createArrayMethod(1, function (O, length) {
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });

	  var LITTLE_ENDIAN = fails(function () {
	    // eslint-disable-next-line no-undef
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });

	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
	    new Uint8Array(1).set({});
	  });

	  var toOffset = function (it, BYTES) {
	    var offset = toInteger(it);
	    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
	    return offset;
	  };

	  var validate = function (it) {
	    if (isObject(it) && TYPED_ARRAY in it) return it;
	    throw TypeError(it + ' is not a typed array!');
	  };

	  var allocate = function (C, length) {
	    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };

	  var speciesFromList = function (O, list) {
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = allocate(C, length);
	    while (length > index) result[index] = list[index++];
	    return result;
	  };

	  var addGetter = function (it, key, internal) {
	    dP(it, key, { get: function () { return this._d[internal]; } });
	  };

	  var $from = function from(source /* , mapfn, thisArg */) {
	    var O = toObject(source);
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var iterFn = getIterFn(O);
	    var i, length, values, result, step, iterator;
	    if (iterFn != undefined && !isArrayIter(iterFn)) {
	      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
	        values.push(step.value);
	      } O = values;
	    }
	    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
	    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };

	  var $of = function of(/* ...items */) {
	    var index = 0;
	    var length = arguments.length;
	    var result = allocate(this, length);
	    while (length > index) result[index] = arguments[index++];
	    return result;
	  };

	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

	  var $toLocaleString = function toLocaleString() {
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };

	  var proto = {
	    copyWithin: function copyWithin(target, start /* , end */) {
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /* , thisArg */) {
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /* , thisArg */) {
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /* , thisArg */) {
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /* , thisArg */) {
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /* , thisArg */) {
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /* , fromIndex */) {
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /* , fromIndex */) {
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator) { // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /* , thisArg */) {
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse() {
	      var that = this;
	      var length = validate(that).length;
	      var middle = Math.floor(length / 2);
	      var index = 0;
	      var value;
	      while (index < middle) {
	        value = that[index];
	        that[index++] = that[--length];
	        that[length] = value;
	      } return that;
	    },
	    some: function some(callbackfn /* , thisArg */) {
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn) {
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end) {
	      var O = validate(this);
	      var length = O.length;
	      var $begin = toAbsoluteIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
	      );
	    }
	  };

	  var $slice = function slice(start, end) {
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };

	  var $set = function set(arrayLike /* , offset */) {
	    validate(this);
	    var offset = toOffset(arguments[1], 1);
	    var length = this.length;
	    var src = toObject(arrayLike);
	    var len = toLength(src.length);
	    var index = 0;
	    if (len + offset > length) throw RangeError(WRONG_LENGTH);
	    while (index < len) this[offset + index] = src[index++];
	  };

	  var $iterators = {
	    entries: function entries() {
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys() {
	      return arrayKeys.call(validate(this));
	    },
	    values: function values() {
	      return arrayValues.call(validate(this));
	    }
	  };

	  var isTAIndex = function (target, key) {
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key) {
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc) {
	    if (isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ) {
	      target[key] = desc.value;
	      return target;
	    } return dP(target, key, desc);
	  };

	  if (!ALL_CONSTRUCTORS) {
	    $GOPD.f = $getDesc;
	    $DP.f = $setDesc;
	  }

	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty: $setDesc
	  });

	  if (fails(function () { arrayToString.call({}); })) {
	    arrayToString = arrayToLocaleString = function toString() {
	      return arrayJoin.call(this);
	    };
	  }

	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice: $slice,
	    set: $set,
	    constructor: function () { /* noop */ },
	    toString: arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function () { return this[TYPED_ARRAY]; }
	  });

	  // eslint-disable-next-line max-statements
	  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
	    CLAMPED = !!CLAMPED;
	    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + KEY;
	    var SETTER = 'set' + KEY;
	    var TypedArray = global[NAME];
	    var Base = TypedArray || {};
	    var TAC = TypedArray && getPrototypeOf(TypedArray);
	    var FORCED = !TypedArray || !$typed.ABV;
	    var O = {};
	    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function (that, index) {
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function (that, index, value) {
	      var data = that._d;
	      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function (that, index) {
	      dP(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if (FORCED) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME, '_d');
	        var index = 0;
	        var offset = 0;
	        var buffer, byteLength, length, klass;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new $ArrayBuffer(byteLength);
	        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (TYPED_ARRAY in data) {
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if (!fails(function () {
	      TypedArray(1);
	    }) || !fails(function () {
	      new TypedArray(-1); // eslint-disable-line no-new
	    }) || !$iterDetect(function (iter) {
	      new TypedArray(); // eslint-disable-line no-new
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(1.5); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)) {
	      TypedArray = wrapper(function (that, data, $offset, $length) {
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if (!isObject(data)) return new Base(toIndex(data));
	        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
	        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator = TypedArrayPrototype[ITERATOR];
	    var CORRECT_ITER_NAME = !!$nativeIterator
	      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
	    var $iterator = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

	    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
	      dP(TypedArrayPrototype, TAG, {
	        get: function () { return NAME; }
	      });
	    }

	    O[NAME] = TypedArray;

	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES
	    });

	    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
	      from: $from,
	      of: $of
	    });

	    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

	    $export($export.P, NAME, proto);

	    setSpecies(NAME);

	    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

	    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

	    $export($export.P + $export.F * fails(function () {
	      new TypedArray(1).slice();
	    }), NAME, { slice: $slice });

	    $export($export.P + $export.F * (fails(function () {
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
	    }) || !fails(function () {
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, { toLocaleString: $toLocaleString });

	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function () { /* empty */ };


	/***/ }),
	/* 31 */
	/***/ (function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(130);
	var $export = __webpack_require__(0);
	var shared = __webpack_require__(55)('metadata');
	var store = shared.store || (shared.store = new (__webpack_require__(133))());

	var getOrCreateMetadataMap = function (target, targetKey, create) {
	  var targetMetadata = store.get(target);
	  if (!targetMetadata) {
	    if (!create) return undefined;
	    store.set(target, targetMetadata = new Map());
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if (!keyMetadata) {
	    if (!create) return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map());
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function (target, targetKey) {
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
	  var keys = [];
	  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
	  return keys;
	};
	var toMetaKey = function (it) {
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function (O) {
	  $export($export.S, 'Reflect', O);
	};

	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};


	/***/ }),
	/* 32 */
	/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(145)(isValidElement, throwOnDirectAccess);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)));

	/***/ }),
	/* 33 */
	/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(36)('meta');
	var isObject = __webpack_require__(4);
	var has = __webpack_require__(11);
	var setDesc = __webpack_require__(7).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(3)(function () {
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
	/* 34 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(5)('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
	module.exports = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};


	/***/ }),
	/* 35 */
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
	/* 36 */
	/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


	/***/ }),
	/* 37 */
	/***/ (function(module, exports) {

	module.exports = false;


	/***/ }),
	/* 38 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(111);
	var enumBugKeys = __webpack_require__(79);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


	/***/ }),
	/* 39 */
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


	/***/ }),
	/* 40 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(1);
	var dPs = __webpack_require__(112);
	var enumBugKeys = __webpack_require__(79);
	var IE_PROTO = __webpack_require__(78)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(76)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(80).appendChild(iframe);
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
	/* 41 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(111);
	var hiddenKeys = __webpack_require__(79).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


	/***/ }),
	/* 42 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var dP = __webpack_require__(7);
	var DESCRIPTORS = __webpack_require__(6);
	var SPECIES = __webpack_require__(5)('species');

	module.exports = function (KEY) {
	  var C = global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


	/***/ }),
	/* 43 */
	/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


	/***/ }),
	/* 44 */
	/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(19);
	var call = __webpack_require__(123);
	var isArrayIter = __webpack_require__(92);
	var anObject = __webpack_require__(1);
	var toLength = __webpack_require__(8);
	var getIterFn = __webpack_require__(94);
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
	/* 45 */
	/***/ (function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(13);
	module.exports = function (target, src, safe) {
	  for (var key in src) redefine(target, key, src[key], safe);
	  return target;
	};


	/***/ }),
	/* 46 */
	/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f;
	var has = __webpack_require__(11);
	var TAG = __webpack_require__(5)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


	/***/ }),
	/* 47 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var defined = __webpack_require__(24);
	var fails = __webpack_require__(3);
	var spaces = __webpack_require__(82);
	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = fails(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	module.exports = exporter;


	/***/ }),
	/* 48 */
	/***/ (function(module, exports) {

	module.exports = {};


	/***/ }),
	/* 49 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(4);
	module.exports = function (it, TYPE) {
	  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};


	/***/ }),
	/* 50 */
	/***/ (function(module, exports) {

	var g;

	// This works in non-strict mode
	g = (function() {
		return this;
	})();

	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (0, eval)("this");
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
	/* 51 */
	/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(20);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


	/***/ }),
	/* 52 */
	/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


	/***/ }),
	/* 53 */
	/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(20);
	var TAG = __webpack_require__(5)('toStringTag');
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
	/* 54 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.injectGlobal = exports.css = undefined;

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _createEmotion = __webpack_require__(155);

	var _createEmotion2 = _interopRequireDefault(_createEmotion);

	var _createEmotionStyled = __webpack_require__(157);

	var _createEmotionStyled2 = _interopRequireDefault(_createEmotionStyled);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var context = typeof global !== 'undefined' ? global : {};

	var emotion = (0, _createEmotion2.default)(context);

	var css = exports.css = emotion.css;
	var injectGlobal = exports.injectGlobal = emotion.injectGlobal;
	exports.default = (0, _createEmotionStyled2.default)(emotion, _react2.default);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)));

	/***/ }),
	/* 55 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


	/***/ }),
	/* 56 */
	/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(15);
	var toLength = __webpack_require__(8);
	var toAbsoluteIndex = __webpack_require__(39);
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
	/* 57 */
	/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


	/***/ }),
	/* 58 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(20);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


	/***/ }),
	/* 59 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(4);
	var cof = __webpack_require__(20);
	var MATCH = __webpack_require__(5)('match');
	module.exports = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};


	/***/ }),
	/* 60 */
	/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(5)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


	/***/ }),
	/* 61 */
	/***/ (function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(1);
	module.exports = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};


	/***/ }),
	/* 62 */
	/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(12);
	var redefine = __webpack_require__(13);
	var fails = __webpack_require__(3);
	var defined = __webpack_require__(24);
	var wks = __webpack_require__(5);

	module.exports = function (KEY, length, exec) {
	  var SYMBOL = wks(KEY);
	  var fns = exec(defined, SYMBOL, ''[KEY]);
	  var strfn = fns[0];
	  var rxfn = fns[1];
	  if (fails(function () {
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  })) {
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};


	/***/ }),
	/* 63 */
	/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(1);
	var aFunction = __webpack_require__(10);
	var SPECIES = __webpack_require__(5)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


	/***/ }),
	/* 64 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var $export = __webpack_require__(0);
	var redefine = __webpack_require__(13);
	var redefineAll = __webpack_require__(45);
	var meta = __webpack_require__(33);
	var forOf = __webpack_require__(44);
	var anInstance = __webpack_require__(43);
	var isObject = __webpack_require__(4);
	var fails = __webpack_require__(3);
	var $iterDetect = __webpack_require__(60);
	var setToStringTag = __webpack_require__(46);
	var inheritIfRequired = __webpack_require__(83);

	module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};


	/***/ }),
	/* 65 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var hide = __webpack_require__(12);
	var uid = __webpack_require__(36);
	var TYPED = uid('typed_array');
	var VIEW = uid('view');
	var ABV = !!(global.ArrayBuffer && global.DataView);
	var CONSTR = ABV;
	var i = 0;
	var l = 9;
	var Typed;

	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');

	while (i < l) {
	  if (Typed = global[TypedArrayConstructors[i++]]) {
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}

	module.exports = {
	  ABV: ABV,
	  CONSTR: CONSTR,
	  TYPED: TYPED,
	  VIEW: VIEW
	};


	/***/ }),
	/* 66 */
	/***/ (function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(37) || !__webpack_require__(3)(function () {
	  var K = Math.random();
	  // In FF throws only define methods
	  // eslint-disable-next-line no-undef, no-useless-call
	  __defineSetter__.call(null, K, function () { /* empty */ });
	  delete __webpack_require__(2)[K];
	});


	/***/ }),
	/* 67 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/
	var $export = __webpack_require__(0);

	module.exports = function (COLLECTION) {
	  $export($export.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};


	/***/ }),
	/* 68 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/
	var $export = __webpack_require__(0);
	var aFunction = __webpack_require__(10);
	var ctx = __webpack_require__(19);
	var forOf = __webpack_require__(44);

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
	/* 69 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

	/***/ }),
	/* 70 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */



	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	{
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)));

	/***/ }),
	/* 71 */
	/***/ (function(module, exports, __webpack_require__) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */



	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


	/***/ }),
	/* 72 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(32);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _spin = __webpack_require__(159);

	var _spin2 = _interopRequireDefault(_spin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultConfig = {
	  lines: 16,
	  length: 3,
	  width: 3,
	  radius: 14,
	  color: '#FFFFFF',
	  speed: 2.1,
	  trail: 60,
	  shadow: false,
	  hwaccel: false,
	  top: '50%',
	  left: '50%',
	  position: 'absolute',
	  zIndex: 999
	};

	var Spinner = function (_Component) {
	  _inherits(Spinner, _Component);

	  function Spinner() {
	    _classCallCheck(this, Spinner);

	    return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
	  }

	  _createClass(Spinner, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.instantiateSpinner(this.props);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      if (newProps.config.color !== this.props.config.color) {
	        this.spinner.stop();
	        // the Spinner API doesn't provide a method to change its options after instantiation,
	        // so the only way to do so is to reinstantiate the spinner ¯\_(ツ)_/¯
	        this.instantiateSpinner(newProps);
	      } else {
	        if (newProps.stopped === true && !this.props.stopped) {
	          this.spinner.stop();
	        } else if (!newProps.stopped && this.props.stopped === true) {
	          this.spinner.spin(this.container);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.spinner.stop();
	    }
	  }, {
	    key: 'instantiateSpinner',
	    value: function instantiateSpinner(props) {
	      this.spinner = new _spin2.default(_extends({}, defaultConfig, props.config));
	      if (!props.stopped) {
	        this.spinner.spin(this.container);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2.default.createElement('div', { ref: function ref(node) {
	          _this2.container = node;
	        } });
	    }
	  }]);

	  return Spinner;
	}(_react.Component);

	Spinner.propTypes = {
	  config: _propTypes2.default.object,
	  stopped: _propTypes2.default.bool,
	  className: _propTypes2.default.string,
	  style: _propTypes2.default.object
	};

	Spinner.defaultProps = {
	  config: defaultConfig,
	  className: '',
	  style: {}
	};

	exports.default = Spinner;

	/***/ }),
	/* 73 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(32);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _utilities = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Iframe = function (_Component) {
	  _inherits(Iframe, _Component);

	  function Iframe() {
	    _classCallCheck(this, Iframe);

	    var _this = _possibleConstructorReturn(this, (Iframe.__proto__ || Object.getPrototypeOf(Iframe)).call(this));

	    _this.iframeRef = null;
	    _this.loadHandler = _this.loadHandler.bind(_this);
	    return _this;
	  }

	  // Fixes scroll not responding in renderer v1


	  _createClass(Iframe, [{
	    key: 'loadHandler',
	    value: function loadHandler() {
	      var _this2 = this;

	      this.iframeRef.style.height = this.iframeRef.offsetHeight + 1 + 'px';
	      setTimeout(function () {
	        _this2.iframeRef.style.height = '';
	        (0, _utilities.applyIOSFooterHack)(_this2.iframeRef);
	        (0, _utilities.applyIOSIframeResizeHack)(_this2.iframeRef);

	        _this2.props.onLoad && _this2.props.onLoad(_this2.iframeRef);
	      }, 1);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return nextProps.src !== this.props.src;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props = this.props,
	          style = _props.style,
	          rest = _objectWithoutProperties(_props, ['style']);

	      return _react2.default.createElement('iframe', _extends({}, rest, {
	        width: '100%',
	        height: '100%',
	        frameBorder: '0',
	        style: _extends({ border: 0 }, style),
	        src: this.props.src,
	        ref: function ref(node) {
	          _this3.iframeRef = node;
	        },
	        'data-qa': 'iframe',
	        onLoad: this.loadHandler
	      }));
	    }
	  }]);

	  return Iframe;
	}(_react.Component);

	Iframe.propTypes = {
	  src: _propTypes2.default.string.isRequired,
	  onLoad: _propTypes2.default.func
	};

	exports.default = Iframe;

	/***/ }),
	/* 74 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fetchJsonp = __webpack_require__(161);

	var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

	var _urlParse = __webpack_require__(104);

	var _urlParse2 = _interopRequireDefault(_urlParse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DataService = {
	  generateURL: function generateURL(uid, domain) {
	    return 'https://' + domain + '/app/embed/' + uid + '?jsoncallback=?';
	  },
	  getFormData: function getFormData(uid, domain) {
	    var url = this.generateURL(uid, domain);
	    return (0, _fetchJsonp2.default)(url, { jsonpCallback: 'jsoncallback' }).then(function (res) {
	      return res.json();
	    });
	  },
	  getAccountFromURL: function getAccountFromURL(url) {
	    return url.split('/')[2].split('.')[0];
	  },
	  getUidFromURL: function getUidFromURL(url) {
	    var _UrlParse = (0, _urlParse2.default)(url),
	        pathname = _UrlParse.pathname;

	    var path = pathname.replace(/\/$/, ''); // remove trailing slash
	    return path.replace(/\/to\/(.+)$/, '$1');
	  },
	  getDomainFromUrl: function getDomainFromUrl(url) {
	    return url.split('/')[2];
	  },
	  getDOMElementData: function getDOMElementData($element) {
	    return {
	      url: $element.data('url'),
	      text: $element.data('text')
	    };
	  }
	};

	exports.default = DataService;

	/***/ }),
	/* 75 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utilities = __webpack_require__(29);

	var defaultData = {
	  'account-name': 'admin',
	  'name': 'Typeform',
	  'welcome-image': '',
	  'font-google': '',
	  'primary-color': '#222',
	  'background-image': '',
	  'background-color': '#DDD',
	  'background-repeat': '',
	  'background-brightness': '',
	  'button-color': '#AAA'
	};

	var store = function store(uid, type, url, buttonText) {
	  var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultData;

	  return {
	    isMobile: (0, _utilities.isMobile)(navigator.userAgent),
	    'account-name': data['account-name'] || 'admin',
	    type: type,
	    form: {
	      uid: uid,
	      url: url,
	      ready: false, // not implemented
	      buttonText: buttonText,
	      name: data['name'] || '',
	      'welcome-image': data['welcome-image'],
	      'font-google': data['font-google'],
	      'primary-color': data['primary-color'],
	      'background-image': data['background-image'],
	      'background-color': data['background-color'],
	      'background-repeat': data['background-repeat'],
	      'background-brightness': data['background-brightness'],
	      'button-color': data['button-color']
	    }
	  };
	};

	exports.default = store;

	/***/ }),
	/* 76 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(4);
	var document = __webpack_require__(2).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


	/***/ }),
	/* 77 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var core = __webpack_require__(22);
	var LIBRARY = __webpack_require__(37);
	var wksExt = __webpack_require__(110);
	var defineProperty = __webpack_require__(7).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


	/***/ }),
	/* 78 */
	/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(55)('keys');
	var uid = __webpack_require__(36);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


	/***/ }),
	/* 79 */
	/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


	/***/ }),
	/* 80 */
	/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(2).document;
	module.exports = document && document.documentElement;


	/***/ }),
	/* 81 */
	/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(4);
	var anObject = __webpack_require__(1);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(19)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


	/***/ }),
	/* 82 */
	/***/ (function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


	/***/ }),
	/* 83 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(4);
	var setPrototypeOf = __webpack_require__(81).set;
	module.exports = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};


	/***/ }),
	/* 84 */
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25);
	var defined = __webpack_require__(24);

	module.exports = function repeat(count) {
	  var str = String(defined(this));
	  var res = '';
	  var n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
	  return res;
	};


	/***/ }),
	/* 85 */
	/***/ (function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};


	/***/ }),
	/* 86 */
	/***/ (function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x) {
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;


	/***/ }),
	/* 87 */
	/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25);
	var defined = __webpack_require__(24);
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
	/* 88 */
	/***/ (function(module, exports, __webpack_require__) {

	var LIBRARY = __webpack_require__(37);
	var $export = __webpack_require__(0);
	var redefine = __webpack_require__(13);
	var hide = __webpack_require__(12);
	var has = __webpack_require__(11);
	var Iterators = __webpack_require__(48);
	var $iterCreate = __webpack_require__(89);
	var setToStringTag = __webpack_require__(46);
	var getPrototypeOf = __webpack_require__(17);
	var ITERATOR = __webpack_require__(5)('iterator');
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
	/* 89 */
	/***/ (function(module, exports, __webpack_require__) {

	var create = __webpack_require__(40);
	var descriptor = __webpack_require__(35);
	var setToStringTag = __webpack_require__(46);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


	/***/ }),
	/* 90 */
	/***/ (function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(59);
	var defined = __webpack_require__(24);

	module.exports = function (that, searchString, NAME) {
	  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};


	/***/ }),
	/* 91 */
	/***/ (function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(5)('match');
	module.exports = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};


	/***/ }),
	/* 92 */
	/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(48);
	var ITERATOR = __webpack_require__(5)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


	/***/ }),
	/* 93 */
	/***/ (function(module, exports, __webpack_require__) {

	var $defineProperty = __webpack_require__(7);
	var createDesc = __webpack_require__(35);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


	/***/ }),
	/* 94 */
	/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(53);
	var ITERATOR = __webpack_require__(5)('iterator');
	var Iterators = __webpack_require__(48);
	module.exports = __webpack_require__(22).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


	/***/ }),
	/* 95 */
	/***/ (function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(260);

	module.exports = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};


	/***/ }),
	/* 96 */
	/***/ (function(module, exports, __webpack_require__) {
	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

	var toObject = __webpack_require__(9);
	var toAbsoluteIndex = __webpack_require__(39);
	var toLength = __webpack_require__(8);
	module.exports = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var aLen = arguments.length;
	  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};


	/***/ }),
	/* 97 */
	/***/ (function(module, exports, __webpack_require__) {

	var addToUnscopables = __webpack_require__(34);
	var step = __webpack_require__(126);
	var Iterators = __webpack_require__(48);
	var toIObject = __webpack_require__(15);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(88)(Array, 'Array', function (iterated, kind) {
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
	/* 98 */
	/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(19);
	var invoke = __webpack_require__(116);
	var html = __webpack_require__(80);
	var cel = __webpack_require__(76);
	var global = __webpack_require__(2);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(20)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


	/***/ }),
	/* 99 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var macrotask = __webpack_require__(98).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(20)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    var promise = Promise.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


	/***/ }),
	/* 100 */
	/***/ (function(module, exports, __webpack_require__) {

	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(10);

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


	/***/ }),
	/* 101 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var DESCRIPTORS = __webpack_require__(6);
	var LIBRARY = __webpack_require__(37);
	var $typed = __webpack_require__(65);
	var hide = __webpack_require__(12);
	var redefineAll = __webpack_require__(45);
	var fails = __webpack_require__(3);
	var anInstance = __webpack_require__(43);
	var toInteger = __webpack_require__(25);
	var toLength = __webpack_require__(8);
	var toIndex = __webpack_require__(135);
	var gOPN = __webpack_require__(41).f;
	var dP = __webpack_require__(7).f;
	var arrayFill = __webpack_require__(96);
	var setToStringTag = __webpack_require__(46);
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length!';
	var WRONG_INDEX = 'Wrong index!';
	var $ArrayBuffer = global[ARRAY_BUFFER];
	var $DataView = global[DATA_VIEW];
	var Math = global.Math;
	var RangeError = global.RangeError;
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = global.Infinity;
	var BaseBuffer = $ArrayBuffer;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;
	var BUFFER = 'buffer';
	var BYTE_LENGTH = 'byteLength';
	var BYTE_OFFSET = 'byteOffset';
	var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
	var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
	var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

	// IEEE754 conversions based on https://github.com/feross/ieee754
	function packIEEE754(value, mLen, nBytes) {
	  var buffer = new Array(nBytes);
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var i = 0;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  var e, m, c;
	  value = abs(value);
	  // eslint-disable-next-line no-self-compare
	  if (value != value || value === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if (value * (c = pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	}
	function unpackIEEE754(buffer, mLen, nBytes) {
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = eLen - 7;
	  var i = nBytes - 1;
	  var s = buffer[i--];
	  var e = s & 127;
	  var m;
	  s >>= 7;
	  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	}

	function unpackI32(bytes) {
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	}
	function packI8(it) {
	  return [it & 0xff];
	}
	function packI16(it) {
	  return [it & 0xff, it >> 8 & 0xff];
	}
	function packI32(it) {
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	}
	function packF64(it) {
	  return packIEEE754(it, 52, 8);
	}
	function packF32(it) {
	  return packIEEE754(it, 23, 4);
	}

	function addGetter(C, key, internal) {
	  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
	}

	function get(view, bytes, index, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	}
	function set(view, bytes, index, conversion, value, isLittleEndian) {
	  var numIndex = +index;
	  var intIndex = toIndex(numIndex);
	  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b;
	  var start = intIndex + view[$OFFSET];
	  var pack = conversion(+value);
	  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	}

	if (!$typed.ABV) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    this._b = arrayFill.call(new Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH];
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };

	  if (DESCRIPTORS) {
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if (!fails(function () {
	    $ArrayBuffer(1);
	  }) || !fails(function () {
	    new $ArrayBuffer(-1); // eslint-disable-line no-new
	  }) || fails(function () {
	    new $ArrayBuffer(); // eslint-disable-line no-new
	    new $ArrayBuffer(1.5); // eslint-disable-line no-new
	    new $ArrayBuffer(NaN); // eslint-disable-line no-new
	    return $ArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new BaseBuffer(toIndex(length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
	    }
	    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2));
	  var $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;


	/***/ }),
	/* 102 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var navigator = global.navigator;

	module.exports = navigator && navigator.userAgent || '';


	/***/ }),
	/* 103 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */



	var emptyFunction = __webpack_require__(69);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	{
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)));

	/***/ }),
	/* 104 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {

	var required = __webpack_require__(152)
	  , qs = __webpack_require__(153)
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
	  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 };

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @api public
	 */
	function lolcation(loc) {
	  loc = loc || global.location || {};

	  var finaldestination = {}
	    , type = typeof loc
	    , key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new URL(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new URL(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	}

	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */

	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @api private
	 */
	function extractProtocol(address) {
	  var match = protocolre.exec(address);

	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}

	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @api private
	 */
	function resolve(relative, base) {
	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;

	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }

	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');

	  return path.join('/');
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} location Location defaults for relative paths.
	 * @param {Boolean|Function} parser Parser for the query string.
	 * @api public
	 */
	function URL(address, location, parser) {
	  if (!(this instanceof URL)) {
	    return new URL(address, location, parser);
	  }

	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) parser = qs.parse;

	  location = lolcation(location);

	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;

	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];
	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if ((index = parse.exec(address))) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }

	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!required(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL}
	 * @api public
	 */
	function set(part, value, fn) {
	  var url = this;

	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || qs.parse)(value);
	      }

	      url[part] = value;
	      break;

	    case 'port':
	      url[part] = value;

	      if (!required(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }

	      break;

	    case 'hostname':
	      url[part] = value;

	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;

	    case 'host':
	      url[part] = value;

	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }

	      break;

	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;

	    case 'pathname':
	    case 'hash':
	      if (value) {
	        var char = part === 'pathname' ? '/' : '#';
	        url[part] = value.charAt(0) !== char ? char + value : value;
	      } else {
	        url[part] = value;
	      }
	      break;

	    default:
	      url[part] = value;
	  }

	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];

	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:'
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  url.href = url.toString();

	  return url;
	}

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String}
	 * @api public
	 */
	function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

	  var query
	    , url = this
	    , protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }

	  result += url.host + url.pathname;

	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

	  if (url.hash) result += url.hash;

	  return result;
	}

	URL.prototype = { set: set, toString: toString };

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	URL.extractProtocol = extractProtocol;
	URL.location = lolcation;
	URL.qs = qs;

	module.exports = URL;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)));

	/***/ }),
	/* 105 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.POPUP_MODES = exports.DRAWER_RIGHT = exports.DRAWER = exports.POPUP = exports.DEFAULT_AUTOCLOSE_TIMEOUT = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _POPUP_MODES;

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(32);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _styles = __webpack_require__(54);

	var _styles2 = _interopRequireDefault(_styles);

	var _scrollbarWidth = __webpack_require__(158);

	var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

	var _spinner = __webpack_require__(72);

	var _spinner2 = _interopRequireDefault(_spinner);

	var _utilities = __webpack_require__(29);

	var _iframe = __webpack_require__(73);

	var _iframe2 = _interopRequireDefault(_iframe);

	var _close = __webpack_require__(160);

	var _close2 = _interopRequireDefault(_close);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var ESC_KEY_CODE = 27;
	var CLOSE_BUTTON_WIDTH = 30;

	var DEFAULT_AUTOCLOSE_TIMEOUT = exports.DEFAULT_AUTOCLOSE_TIMEOUT = 5;
	var POPUP = exports.POPUP = 'popup';
	var DRAWER = exports.DRAWER = 'drawer_left';
	var DRAWER_RIGHT = exports.DRAWER_RIGHT = 'drawer_right';
	var POPUP_MODES = exports.POPUP_MODES = (_POPUP_MODES = {}, _defineProperty(_POPUP_MODES, POPUP, 'popup-blank'), _defineProperty(_POPUP_MODES, DRAWER, 'popup-classic'), _defineProperty(_POPUP_MODES, DRAWER_RIGHT, 'popup-drawer'), _POPUP_MODES);

	var BaseWrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e1o3ysfi0'
	})('visibility:', function (p) {
	  return p.open ? 'visible' : 'hidden';
	}, ';opacity:', function (p) {
	  return p.open ? 1 : 0;
	}, ';position:', function (p) {
	  return p.isContained ? 'absolute' : 'fixed';
	}, ';max-width:100%;z-index:10001;');

	var Overlay = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e1o3ysfi1'
	})('visibility:', function (p) {
	  return p.appearing ? 'hidden' : 'visible';
	}, ';opacity:', function (p) {
	  return p.appearing ? 0 : 1;
	}, ';transition:opacity 200ms ease,visibility 0s linear ', function (p) {
	  return p.appearing ? '200ms' : '0s';
	}, ';background:rgba(0,0,0,0.85);position:', function (p) {
	  return p.isContained ? 'absolute' : 'fixed';
	}, ';overflow:', function (p) {
	  return p.isContained ? 'hidden' : 'auto';
	}, ';left:0;top:0;right:0;bottom:0;z-index:10000;min-height:100%;');

	var popupWrapper = /*#__PURE__*/(0, _styles2.default)(BaseWrapper, {
	  target: 'e1o3ysfi2'
	})('width:', function (p) {
	  return p.isContained ? 'calc(100% - 80px)' : 'calc(100vw - 80px)';
	}, ';height:', function (p) {
	  return p.isContained ? 'calc(100% - 80px)' : 'calc(100vh - 80px)';
	}, ';top:40px;left:40px;transition:all 300ms ease-out;');

	var drawerWrapper = /*#__PURE__*/(0, _styles2.default)(BaseWrapper, {
	  target: 'e1o3ysfi3'
	})('transition:all 400ms ease-out;width:', function (p) {
	  return p.width;
	}, 'px;height:100%;top:0;');

	var drawerLeftWrapper = /*#__PURE__*/(0, _styles2.default)(drawerWrapper, {
	  target: 'e1o3ysfi4'
	})('left:', function (p) {
	  return !p.open ? -(p.width - CLOSE_BUTTON_WIDTH) : 0;
	}, 'px;');

	var drawerRightWrapper = /*#__PURE__*/(0, _styles2.default)(drawerWrapper, {
	  target: 'e1o3ysfi5'
	})('right:', function (p) {
	  return !p.open ? -(p.width - CLOSE_BUTTON_WIDTH) : 0;
	}, 'px;');

	var BaseCloseImage = /*#__PURE__*/(0, _styles2.default)('img', {
	  target: 'e1o3ysfi6'
	})('position:absolute;padding:8px;cursor:pointer;width:initial;max-width:initial;');

	var closeImagePopup = /*#__PURE__*/(0, _styles2.default)(BaseCloseImage, {
	  target: 'e1o3ysfi7'
	})('top:-34px;right:-34px;');

	var closeImageLeft = /*#__PURE__*/(0, _styles2.default)(BaseCloseImage, {
	  target: 'e1o3ysfi8'
	})('top:12px;right:-38px;');

	var closeImageRight = /*#__PURE__*/(0, _styles2.default)(BaseCloseImage, {
	  target: 'e1o3ysfi9'
	})('top:12px;left:-38px;right:auto;');

	var Popup = function (_Component) {
	  _inherits(Popup, _Component);

	  function Popup(props) {
	    _classCallCheck(this, Popup);

	    var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

	    _this.state = {
	      frameAnimate: false,
	      iframeLoaded: false,
	      popupAnimate: true,
	      transitionEnded: false
	    };

	    _this.onIframeLoad = _this.onIframeLoad.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onAutoClose = _this.onAutoClose.bind(_this);
	    _this.animateBeforeClose = _this.animateBeforeClose.bind(_this);
	    _this.onTransitionEnd = _this.onTransitionEnd.bind(_this);
	    _this.onFormSubmit = _this.onFormSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(Popup, [{
	    key: 'onIframeLoad',
	    value: function onIframeLoad(iframeRef) {
	      var _this2 = this;

	      this.setState({ iframeLoaded: true }, function () {
	        setTimeout(function () {
	          _this2.setState({ frameAnimate: true });
	          if (iframeRef && iframeRef.contentWindow) {
	            iframeRef.contentWindow.focus();
	          }
	        }, 500);
	      });
	    }
	  }, {
	    key: 'animateBeforeClose',
	    value: function animateBeforeClose() {
	      var _this3 = this;

	      this.setState({ frameAnimate: false, popupAnimate: false }, function () {
	        setTimeout(function () {
	          _this3.setState({ popupAnimate: true }, function () {
	            setTimeout(_this3.props.onClose, 400);
	          });
	        }, 400);
	      });
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      var key = document.all ? e.keyCode : e.which;
	      if (key === ESC_KEY_CODE) {
	        this.animateBeforeClose();
	      }
	    }
	  }, {
	    key: 'onAutoClose',
	    value: function onAutoClose(e) {
	      var _this4 = this;

	      var canSetAutocloseDelay = e.detail.isProPlus || e.detail.canSetAutocloseDelay;
	      var _props$options = this.props.options,
	          isAutoCloseEnabled = _props$options.isAutoCloseEnabled,
	          autoClose = _props$options.autoClose;

	      var timeout = (canSetAutocloseDelay ? autoClose : DEFAULT_AUTOCLOSE_TIMEOUT) * 1000;

	      if (isAutoCloseEnabled) {
	        setTimeout(function () {
	          _this4.animateBeforeClose();
	        }, timeout);
	      }
	    }
	  }, {
	    key: 'onTransitionEnd',
	    value: function onTransitionEnd(event) {
	      if (event.target === this.wrapper) {
	        this.setState({
	          transitionEnded: this.state.frameAnimate
	        });
	      }
	    }
	  }, {
	    key: 'onFormSubmit',
	    value: function onFormSubmit() {
	      var onSubmit = this.props.options.onSubmit;

	      onSubmit();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this5 = this;

	      window.addEventListener('message', _utilities.onMessage);
	      window.addEventListener('keydown', this.onKeyDown);
	      window.addEventListener('form-close', this.animateBeforeClose);
	      window.addEventListener('ESC', this.animateBeforeClose);
	      window.addEventListener('embed-auto-close-popup', this.onAutoClose);
	      window.addEventListener('form-submit', this.onFormSubmit);

	      setTimeout(function () {
	        _this5.setState({
	          popupAnimate: false
	        });
	      }, 100);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('message', _utilities.onMessage);
	      window.removeEventListener('keydown', this.onKeyDown);
	      window.removeEventListener('form-close', this.animateBeforeClose);
	      window.removeEventListener('ESC', this.animateBeforeClose);
	      window.removeEventListener('embed-auto-close-popup', this.onAutoClose);
	      window.removeEventListener('form-submit', this.onFormSubmit);
	    }
	  }, {
	    key: 'getWrapperComponent',
	    value: function getWrapperComponent(mode) {
	      if (mode === DRAWER_RIGHT) return drawerRightWrapper;
	      if (mode === DRAWER) return drawerLeftWrapper;
	      return popupWrapper;
	    }
	  }, {
	    key: 'getCloseImage',
	    value: function getCloseImage(mode) {
	      if (mode === DRAWER_RIGHT) return closeImageRight;
	      if (mode === DRAWER) return closeImageLeft;
	      return closeImagePopup;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      var iframeStyles = null;
	      var options = this.props.options;
	      var drawerWidth = options.drawerWidth,
	          hideScrollbars = options.hideScrollbars,
	          isContained = options.isContained,
	          mode = options.mode;


	      if (hideScrollbars) {
	        iframeStyles = {
	          width: 'calc(100% + ' + (0, _scrollbarWidth2.default)() + 'px)'
	        };
	      }

	      if (mode === POPUP) {
	        iframeStyles = _extends({}, iframeStyles, {
	          WebkitMaskImage: '-webkit-radial-gradient(circle, white, black)',
	          WebkitTransform: 'translateZ(0)'
	        });
	      }

	      var Wrapper = this.getWrapperComponent(mode);
	      var CloseImage = this.getCloseImage(mode);

	      return _react2.default.createElement(
	        Overlay,
	        { appearing: this.state.popupAnimate, isContained: isContained },
	        _react2.default.createElement(_spinner2.default, { stopped: this.state.iframeLoaded }),
	        _react2.default.createElement(
	          Wrapper,
	          {
	            mode: mode,
	            open: this.state.frameAnimate,
	            isContained: isContained,
	            width: drawerWidth,
	            onTransitionEnd: this.onTransitionEnd,
	            innerRef: function innerRef(node) {
	              _this6.wrapper = node;
	            },
	            'data-qa': 'popup-mode-' + mode
	          },
	          this.state.iframeLoaded && _react2.default.createElement(CloseImage, {
	            mode: mode,
	            src: _close2.default,
	            alt: 'close-typeform',
	            'data-qa': 'popup-close-button',
	            onClick: this.animateBeforeClose
	          }),
	          _react2.default.createElement(_iframe2.default, {
	            src: this.props.url,
	            style: iframeStyles,
	            onLoad: this.onIframeLoad
	          })
	        )
	      );
	    }
	  }]);

	  return Popup;
	}(_react.Component);

	Popup.propTypes = {
	  url: _propTypes2.default.string.isRequired,
	  options: _propTypes2.default.object.isRequired,
	  onClose: _propTypes2.default.func,
	  width: _propTypes2.default.number,
	  height: _propTypes2.default.number
	};

	exports.default = Popup;

	/***/ }),
	/* 106 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return memoize; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STYLES_KEY; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return unitless; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hashString; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pa; });
	/* eslint-disable */
	// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
	function hashString(str) {
	  return murmurhash2_32_gc(str, str.length).toString(36);
	}

	function murmurhash2_32_gc(str, seed) {
	  var l = str.length,
	      h = seed ^ l,
	      i = 0,
	      k;

	  while (l >= 4) {
	    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    k ^= k >>> 24;
	    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
	    l -= 4;
	    ++i;
	  }

	  switch (l) {
	    case 3:
	      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

	    case 2:
	      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

	    case 1:
	      h ^= str.charCodeAt(i) & 0xff;
	      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  }

	  h ^= h >>> 13;
	  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
	  h ^= h >>> 15;
	  return h >>> 0;
	}

	var pa = function fa(ha) {
	  function V(b, c, d, k, l) {
	    for (var a = 0, f = 0, n = 0, e = 0, h, q, m, v = 0, A = 0, B = 0, x = 0, C = 0, p = 0, G = 0, r = 0, N = q = 0, L = 0, t = 0, D = d.length, F = D - 1, g = "", u = "", S = "", M = "", H; r < D;) {
	      m = d.charCodeAt(r);
	      r === F && 0 !== f + e + n + a && (0 !== f && (m = 47 === f ? 10 : 47), e = n = a = 0, D++, F++);

	      if (0 === f + e + n + a) {
	        if (r === F && (0 < q && (g = g.replace(P, "")), 0 < g.trim().length)) {
	          switch (m) {
	            case 32:
	            case 9:
	            case 59:
	            case 13:
	            case 10:
	              break;

	            default:
	              g += d.charAt(r);
	          }

	          m = 59;
	        }

	        if (1 === N) switch (m) {
	          case 123:
	          case 125:
	          case 59:
	          case 34:
	          case 39:
	          case 40:
	          case 41:
	          case 44:
	            N = 0;

	          case 9:
	          case 13:
	          case 10:
	          case 32:
	            break;

	          default:
	            for (N = 0, t = r, h = m, r--, m = 59; t < D;) {
	              switch (d.charCodeAt(++t)) {
	                case 10:
	                case 13:
	                case 59:
	                  r++, m = h;

	                case 58:
	                case 123:
	                  t = D;
	              }
	            }

	        }

	        switch (m) {
	          case 123:
	            g = g.trim();
	            h = g.charCodeAt(0);
	            x = 1;

	            for (t = ++r; r < D;) {
	              m = d.charCodeAt(r);

	              switch (m) {
	                case 123:
	                  x++;
	                  break;

	                case 125:
	                  x--;
	              }

	              if (0 === x) break;
	              r++;
	            }

	            p = d.substring(t, r);
	            0 === h && (h = (g = g.replace(qa, "").trim()).charCodeAt(0));

	            switch (h) {
	              case 64:
	                0 < q && (g = g.replace(P, ""));
	                q = g.charCodeAt(1);

	                switch (q) {
	                  case 100:
	                  case 109:
	                  case 115:
	                  case 45:
	                    h = c;
	                    break;

	                  default:
	                    h = W;
	                }

	                p = V(c, h, p, q, l + 1);
	                t = p.length;
	                0 < X && 0 === t && (t = g.length);
	                0 < E && (h = ia(W, g, L), H = O(3, p, h, c, I, y, t, q, l), g = h.join(""), void 0 !== H && 0 === (t = (p = H.trim()).length) && (q = 0, p = ""));
	                if (0 < t) switch (q) {
	                  case 115:
	                    g = g.replace(ra, sa);

	                  case 100:
	                  case 109:
	                  case 45:
	                    p = g + "{" + p + "}";
	                    break;

	                  case 107:
	                    g = g.replace(ta, "$1 $2" + (0 < Q ? T : ""));
	                    p = g + "{" + p + "}";
	                    p = 1 === w || 2 === w && U("@" + p, 3) ? "@-webkit-" + p + "@" + p : "@" + p;
	                    break;

	                  default:
	                    p = g + p, 112 === k && (p = (u += p, ""));
	                } else p = "";
	                break;

	              default:
	                p = V(c, ia(c, g, L), p, k, l + 1);
	            }

	            S += p;
	            p = L = q = G = N = C = 0;
	            g = "";
	            m = d.charCodeAt(++r);
	            break;

	          case 125:
	          case 59:
	            g = (0 < q ? g.replace(P, "") : g).trim();
	            if (1 < (t = g.length)) switch (0 === G && (h = g.charCodeAt(0), 45 === h || 96 < h && 123 > h) && (t = (g = g.replace(" ", ":")).length), 0 < E && void 0 !== (H = O(1, g, c, b, I, y, u.length, k, l)) && 0 === (t = (g = H.trim()).length) && (g = "\x00\x00"), h = g.charCodeAt(0), q = g.charCodeAt(1), h + q) {
	              case 0:
	                break;

	              case 169:
	              case 163:
	                M += g + d.charAt(r);
	                break;

	              default:
	                58 !== g.charCodeAt(t - 1) && (u += ja(g, h, q, g.charCodeAt(2)));
	            }
	            L = q = G = N = C = 0;
	            g = "";
	            m = d.charCodeAt(++r);
	        }
	      }

	      switch (m) {
	        case 13:
	        case 10:
	          if (0 === f + e + n + a + ka) switch (B) {
	            case 41:
	            case 39:
	            case 34:
	            case 64:
	            case 126:
	            case 62:
	            case 42:
	            case 43:
	            case 47:
	            case 45:
	            case 58:
	            case 44:
	            case 59:
	            case 123:
	            case 125:
	              break;

	            default:
	              0 < G && (N = 1);
	          }
	          47 === f ? f = 0 : 0 === z + C && (q = 1, g += "\x00");
	          0 < E * la && O(0, g, c, b, I, y, u.length, k, l);
	          y = 1;
	          I++;
	          break;

	        case 59:
	        case 125:
	          if (0 === f + e + n + a) {
	            y++;
	            break;
	          }

	        default:
	          y++;
	          h = d.charAt(r);

	          switch (m) {
	            case 9:
	            case 32:
	              if (0 === e + a + f) switch (v) {
	                case 44:
	                case 58:
	                case 9:
	                case 32:
	                  h = "";
	                  break;

	                default:
	                  32 !== m && (h = " ");
	              }
	              break;

	            case 0:
	              h = "\\0";
	              break;

	            case 12:
	              h = "\\f";
	              break;

	            case 11:
	              h = "\\v";
	              break;

	            case 38:
	              0 === e + f + a && 0 < z && (q = L = 1, h = "\f" + h);
	              break;

	            case 108:
	              if (0 === e + f + a + J && 0 < G) switch (r - G) {
	                case 2:
	                  112 === v && 58 === d.charCodeAt(r - 3) && (J = v);

	                case 8:
	                  111 === A && (J = A);
	              }
	              break;

	            case 58:
	              0 === e + f + a && (G = r);
	              break;

	            case 44:
	              0 === f + n + e + a && (q = 1, h += "\r");
	              break;

	            case 34:
	              0 === f && (e = e === m ? 0 : 0 === e ? m : e);
	              break;

	            case 39:
	              0 === f && (e = e === m ? 0 : 0 === e ? m : e);
	              break;

	            case 91:
	              0 === e + f + n && a++;
	              break;

	            case 93:
	              0 === e + f + n && a--;
	              break;

	            case 41:
	              0 === e + f + a && n--;
	              break;

	            case 40:
	              if (0 === e + f + a) {
	                if (0 === C) switch (2 * v + 3 * A) {
	                  case 533:
	                    break;

	                  default:
	                    x = 0, C = 1;
	                }
	                n++;
	              }

	              break;

	            case 64:
	              0 === f + n + e + a + G + p && (p = 1);
	              break;

	            case 42:
	            case 47:
	              if (!(0 < e + a + n)) switch (f) {
	                case 0:
	                  switch (2 * m + 3 * d.charCodeAt(r + 1)) {
	                    case 235:
	                      f = 47;
	                      break;

	                    case 220:
	                      t = r, f = 42;
	                  }

	                  break;

	                case 42:
	                  47 === m && 42 === v && (33 === d.charCodeAt(t + 2) && (u += d.substring(t, r + 1)), h = "", f = 0);
	              }
	          }

	          if (0 === f) {
	            if (0 === z + e + a + p && 107 !== k && 59 !== m) switch (m) {
	              case 44:
	              case 126:
	              case 62:
	              case 43:
	              case 41:
	              case 40:
	                if (0 === C) {
	                  switch (v) {
	                    case 9:
	                    case 32:
	                    case 10:
	                    case 13:
	                      h += "\x00";
	                      break;

	                    default:
	                      h = "\x00" + h + (44 === m ? "" : "\x00");
	                  }

	                  q = 1;
	                } else switch (m) {
	                  case 40:
	                    C = ++x;
	                    break;

	                  case 41:
	                    0 === (C = --x) && (q = 1, h += "\x00");
	                }

	                break;

	              case 9:
	              case 32:
	                switch (v) {
	                  case 0:
	                  case 123:
	                  case 125:
	                  case 59:
	                  case 44:
	                  case 12:
	                  case 9:
	                  case 32:
	                  case 10:
	                  case 13:
	                    break;

	                  default:
	                    0 === C && (q = 1, h += "\x00");
	                }

	            }
	            g += h;
	            32 !== m && 9 !== m && (B = m);
	          }

	      }

	      A = v;
	      v = m;
	      r++;
	    }

	    t = u.length;
	    0 < X && 0 === t && 0 === S.length && 0 === c[0].length === !1 && (109 !== k || 1 === c.length && (0 < z ? K : R) === c[0]) && (t = c.join(",").length + 2);

	    if (0 < t) {
	      if (0 === z && 107 !== k) {
	        d = 0;
	        a = c.length;

	        for (f = Array(a); d < a; ++d) {
	          v = c[d].split(ua);
	          A = "";
	          B = 0;

	          for (D = v.length; B < D; ++B) {
	            if (!(0 === (x = (e = v[B]).length) && 1 < D)) {
	              r = A.charCodeAt(A.length - 1);
	              L = e.charCodeAt(0);
	              n = "";
	              if (0 !== B) switch (r) {
	                case 42:
	                case 126:
	                case 62:
	                case 43:
	                case 32:
	                case 40:
	                  break;

	                default:
	                  n = " ";
	              }

	              switch (L) {
	                case 38:
	                  e = n + K;

	                case 126:
	                case 62:
	                case 43:
	                case 32:
	                case 41:
	                case 40:
	                  break;

	                case 91:
	                  e = n + e + K;
	                  break;

	                case 58:
	                  switch (2 * e.charCodeAt(1) + 3 * e.charCodeAt(2)) {
	                    case 530:
	                      if (0 < Y) {
	                        e = n + e.substring(8, x - 1);
	                        break;
	                      }

	                    default:
	                      if (1 > B || 1 > v[B - 1].length) e = n + K + e;
	                  }

	                  break;

	                case 44:
	                  n = "";

	                default:
	                  e = 1 < x && 0 < e.indexOf(":") ? n + e.replace(va, "$1" + K + "$2") : n + e + K;
	              }

	              A += e;
	            }
	          }

	          f[d] = A.replace(P, "").trim();
	        }

	        c = f;
	      }

	      h = c;
	      if (0 < E && (H = O(2, u, h, b, I, y, t, k, l), void 0 !== H && 0 === (u = H).length)) return M + u + S;
	      u = h.join(",") + "{" + u + "}";

	      if (0 !== w * J) {
	        2 !== w || U(u, 2) || (J = 0);

	        switch (J) {
	          case 111:
	            u = u.replace(wa, ":-moz-$1") + u;
	            break;

	          case 112:
	            u = u.replace(Z, "::-webkit-input-$1") + u.replace(Z, "::-moz-$1") + u.replace(Z, ":-ms-input-$1") + u;
	        }

	        J = 0;
	      }
	    }

	    return M + u + S;
	  }

	  function ia(b, c, d) {
	    var k = c.trim().split(xa);
	    c = k;
	    var l = k.length,
	        a = b.length;

	    switch (a) {
	      case 0:
	      case 1:
	        var f = 0;

	        for (b = 0 === a ? "" : b[0] + " "; f < l; ++f) {
	          c[f] = ma(b, c[f], d, a).trim();
	        }

	        break;

	      default:
	        var n = f = 0;

	        for (c = []; f < l; ++f) {
	          for (var e = 0; e < a; ++e) {
	            c[n++] = ma(b[e] + " ", k[f], d, a).trim();
	          }
	        }

	    }

	    return c;
	  }

	  function ma(b, c, d, k) {
	    var l = c.charCodeAt(0);
	    33 > l && (l = (c = c.trim()).charCodeAt(0));

	    switch (l) {
	      case 38:
	        switch (z + k) {
	          case 0:
	          case 1:
	            if (0 === b.trim().length) break;

	          default:
	            return c.replace(M, "$1" + b.trim());
	        }

	        break;

	      case 58:
	        switch (c.charCodeAt(1)) {
	          case 103:
	            if (0 < Y && 0 < z) return c.replace(ya, "$1").replace(M, "$1" + R);
	            break;

	          default:
	            return b.trim() + c;
	        }

	      default:
	        if (0 < d * z && 0 < c.indexOf("\f")) return c.replace(M, (58 === b.charCodeAt(0) ? "" : "$1") + b.trim());
	    }

	    return b + c;
	  }

	  function ja(b, c, d, k) {
	    var l = 0,
	        a = b + ";";
	    c = 2 * c + 3 * d + 4 * k;

	    if (944 === c) {
	      l = a.length;
	      b = a.indexOf(":", 9) + 1;
	      d = a.substring(0, b).trim();
	      k = a.substring(b, l - 1).trim();

	      switch (a.charCodeAt(9) * Q) {
	        case 0:
	          break;

	        case 45:
	          if (110 !== a.charCodeAt(10)) break;

	        default:
	          for (a = k.split((k = "", za)), b = c = 0, l = a.length; c < l; b = 0, ++c) {
	            for (var f = a[c], n = f.split(Aa); f = n[b];) {
	              var e = f.charCodeAt(0);
	              if (1 === Q && (64 < e && 90 > e || 96 < e && 123 > e || 95 === e || 45 === e && 45 !== f.charCodeAt(1))) switch (isNaN(parseFloat(f)) + (-1 !== f.indexOf("("))) {
	                case 1:
	                  switch (f) {
	                    case "infinite":
	                    case "alternate":
	                    case "backwards":
	                    case "running":
	                    case "normal":
	                    case "forwards":
	                    case "both":
	                    case "none":
	                    case "linear":
	                    case "ease":
	                    case "ease-in":
	                    case "ease-out":
	                    case "ease-in-out":
	                    case "paused":
	                    case "reverse":
	                    case "alternate-reverse":
	                    case "inherit":
	                    case "initial":
	                    case "unset":
	                    case "step-start":
	                    case "step-end":
	                      break;

	                    default:
	                      f += T;
	                  }

	              }
	              n[b++] = f;
	            }

	            k += (0 === c ? "" : ",") + n.join(" ");
	          }

	      }

	      k = d + k + ";";
	      return 1 === w || 2 === w && U(k, 1) ? "-webkit-" + k + k : k;
	    }

	    if (0 === w || 2 === w && !U(a, 1)) return a;

	    switch (c) {
	      case 1015:
	        return 45 === a.charCodeAt(9) ? "-webkit-" + a + a : a;

	      case 951:
	        return 116 === a.charCodeAt(3) ? "-webkit-" + a + a : a;

	      case 963:
	        return 110 === a.charCodeAt(5) ? "-webkit-" + a + a : a;

	      case 1009:
	        if (100 !== a.charCodeAt(4)) break;

	      case 969:
	      case 942:
	        return "-webkit-" + a + a;

	      case 978:
	        return "-webkit-" + a + "-moz-" + a + a;

	      case 1019:
	      case 983:
	        return "-webkit-" + a + "-moz-" + a + "-ms-" + a + a;

	      case 883:
	        return 45 === a.charCodeAt(8) ? "-webkit-" + a + a : a;

	      case 932:
	        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
	          case 103:
	            return "-webkit-box-" + a.replace("-grow", "") + "-webkit-" + a + "-ms-" + a.replace("grow", "positive") + a;

	          case 115:
	            return "-webkit-" + a + "-ms-" + a.replace("shrink", "negative") + a;

	          case 98:
	            return "-webkit-" + a + "-ms-" + a.replace("basis", "preferred-size") + a;
	        }
	        return "-webkit-" + a + "-ms-" + a + a;

	      case 964:
	        return "-webkit-" + a + "-ms-flex-" + a + a;

	      case 1023:
	        if (99 !== a.charCodeAt(8)) break;
	        b = a.substring(a.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
	        return "-webkit-box-pack" + b + "-webkit-" + a + "-ms-flex-pack" + b + a;

	      case 1005:
	        return Ba.test(a) ? a.replace(na, ":-webkit-") + a.replace(na, ":-moz-") + a : a;

	      case 1E3:
	        b = a.substring(13).trim();
	        l = b.indexOf("-") + 1;

	        switch (b.charCodeAt(0) + b.charCodeAt(l)) {
	          case 226:
	            b = a.replace(aa, "tb");
	            break;

	          case 232:
	            b = a.replace(aa, "tb-rl");
	            break;

	          case 220:
	            b = a.replace(aa, "lr");
	            break;

	          default:
	            return a;
	        }

	        return "-webkit-" + a + "-ms-" + b + a;

	      case 1017:
	        if (-1 === a.indexOf("sticky", 9)) break;

	      case 975:
	        l = (a = b).length - 10;
	        b = (33 === a.charCodeAt(l) ? a.substring(0, l) : a).substring(b.indexOf(":", 7) + 1).trim();

	        switch (c = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
	          case 203:
	            if (111 > b.charCodeAt(8)) break;

	          case 115:
	            a = a.replace(b, "-webkit-" + b) + ";" + a;
	            break;

	          case 207:
	          case 102:
	            a = a.replace(b, "-webkit-" + (102 < c ? "inline-" : "") + "box") + ";" + a.replace(b, "-webkit-" + b) + ";" + a.replace(b, "-ms-" + b + "box") + ";" + a;
	        }

	        return a + ";";

	      case 938:
	        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
	          case 105:
	            return b = a.replace("-items", ""), "-webkit-" + a + "-webkit-box-" + b + "-ms-flex-" + b + a;

	          case 115:
	            return "-webkit-" + a + "-ms-flex-item-" + a.replace(Ca, "") + a;

	          default:
	            return "-webkit-" + a + "-ms-flex-line-pack" + a.replace("align-content", "") + a;
	        }
	        break;

	      case 953:
	        if (0 < (l = a.indexOf("-content", 9)) && 109 === a.charCodeAt(l - 3) && 45 !== a.charCodeAt(l - 4)) return b = a.substring(l - 3), "width:-webkit-" + b + "width:-moz-" + b + "width:" + b;
	        break;

	      case 962:
	        if (a = "-webkit-" + a + (102 === a.charCodeAt(5) ? "-ms-" + a : "") + a, 211 === d + k && 105 === a.charCodeAt(13) && 0 < a.indexOf("transform", 10)) return a.substring(0, a.indexOf(";", 27) + 1).replace(Da, "$1-webkit-$2") + a;
	    }

	    return a;
	  }

	  function U(b, c) {
	    var d = b.indexOf(1 === c ? ":" : "{"),
	        k = b.substring(0, 3 !== c ? d : 10);
	    d = b.substring(d + 1, b.length - 1);
	    return ba(2 !== c ? k : k.replace(Ea, "$1"), d, c);
	  }

	  function sa(b, c) {
	    var d = ja(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
	    return d !== c + ";" ? d.replace(Fa, " or ($1)").substring(4) : "(" + c + ")";
	  }

	  function O(b, c, d, k, l, a, f, n, e) {
	    for (var h = 0, q = c, m; h < E; ++h) {
	      switch (m = ca[h].call(F, b, q, d, k, l, a, f, n, e)) {
	        case void 0:
	        case !1:
	        case !0:
	        case null:
	          break;

	        default:
	          q = m;
	      }
	    }

	    switch (q) {
	      case void 0:
	      case !1:
	      case !0:
	      case null:
	      case c:
	        break;

	      default:
	        return q;
	    }
	  }

	  function da(b) {
	    switch (b) {
	      case void 0:
	      case null:
	        E = ca.length = 0;
	        break;

	      default:
	        switch (b.constructor) {
	          case Array:
	            for (var c = 0, d = b.length; c < d; ++c) {
	              da(b[c]);
	            }

	            break;

	          case Function:
	            ca[E++] = b;
	            break;

	          case Boolean:
	            la = !!b | 0;
	        }

	    }

	    return da;
	  }

	  function ea(b) {
	    for (var c in b) {
	      var d = b[c];

	      switch (c) {
	        case "keyframe":
	          Q = d | 0;
	          break;

	        case "global":
	          Y = d | 0;
	          break;

	        case "cascade":
	          z = d | 0;
	          break;

	        case "compress":
	          oa = d | 0;
	          break;

	        case "semicolon":
	          ka = d | 0;
	          break;

	        case "preserve":
	          X = d | 0;
	          break;

	        case "prefix":
	          ba = null, d ? "function" !== typeof d ? w = 1 : (w = 2, ba = d) : w = 0;
	      }
	    }

	    return ea;
	  }

	  function F(b, c) {
	    if (void 0 !== this && this.constructor === F) return fa(b);
	    var d = b,
	        k = d.charCodeAt(0);
	    33 > k && (k = (d = d.trim()).charCodeAt(0));
	    0 < Q && (T = d.replace(Ga, 91 === k ? "" : "-"));
	    k = 1;
	    1 === z ? R = d : K = d;
	    d = [R];

	    if (0 < E) {
	      var l = O(-1, c, d, d, I, y, 0, 0, 0);
	      void 0 !== l && "string" === typeof l && (c = l);
	    }

	    var a = V(W, d, c, 0, 0);
	    0 < E && (l = O(-2, a, d, d, I, y, a.length, 0, 0), void 0 !== l && "string" !== typeof (a = l) && (k = 0));
	    K = R = T = "";
	    J = 0;
	    y = I = 1;
	    return 0 === oa * k ? a : a.replace(P, "").replace(Ha, "").replace(Ia, "$1").replace(Ja, "$1").replace(Ka, " ");
	  }

	  var qa = /^\0+/g,
	      P = /[\0\r\f]/g,
	      na = /: */g,
	      Ba = /zoo|gra/,
	      Da = /([,: ])(transform)/g,
	      za = /,+\s*(?![^(]*[)])/g,
	      Aa = / +\s*(?![^(]*[)])/g,
	      ua = / *[\0] */g,
	      xa = /,\r+?/g,
	      M = /([\t\r\n ])*\f?&/g,
	      ya = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g,
	      Ga = /\W+/g,
	      ta = /@(k\w+)\s*(\S*)\s*/,
	      Z = /::(place)/g,
	      wa = /:(read-only)/g,
	      Ha = /\s+(?=[{\];=:>])/g,
	      Ia = /([[}=:>])\s+/g,
	      Ja = /(\{[^{]+?);(?=\})/g,
	      Ka = /\s{2,}/g,
	      va = /([^\(])(:+) */g,
	      aa = /[svh]\w+-[tblr]{2}/,
	      ra = /\(\s*(.*)\s*\)/g,
	      Fa = /([^]*?);/g,
	      Ca = /-self|flex-/g,
	      Ea = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
	      y = 1,
	      I = 1,
	      J = 0,
	      z = 1,
	      w = 1,
	      Y = 1,
	      oa = 0,
	      ka = 0,
	      X = 0,
	      W = [],
	      ca = [],
	      E = 0,
	      ba = null,
	      la = 0,
	      Q = 1,
	      T = "",
	      K = "",
	      R = "";
	  F.use = da;
	  F.set = ea;
	  void 0 !== ha && ea(ha);
	  return F;
	};

	var memoize = function memoize(fn) {
	  var cache = {};
	  return function (arg) {
	    if (cache[arg] === undefined) cache[arg] = fn(arg);
	    return cache[arg];
	  };
	};
	var STYLES_KEY = '__emotion_styles';
	var unitless = {
	  animationIterationCount: 1,
	  borderImageOutset: 1,
	  borderImageSlice: 1,
	  borderImageWidth: 1,
	  boxFlex: 1,
	  boxFlexGroup: 1,
	  boxOrdinalGroup: 1,
	  columnCount: 1,
	  columns: 1,
	  flex: 1,
	  flexGrow: 1,
	  flexPositive: 1,
	  flexShrink: 1,
	  flexNegative: 1,
	  flexOrder: 1,
	  gridRow: 1,
	  gridRowEnd: 1,
	  gridRowSpan: 1,
	  gridRowStart: 1,
	  gridColumn: 1,
	  gridColumnEnd: 1,
	  gridColumnSpan: 1,
	  gridColumnStart: 1,
	  fontWeight: 1,
	  lineHeight: 1,
	  opacity: 1,
	  order: 1,
	  orphans: 1,
	  tabSize: 1,
	  widows: 1,
	  zIndex: 1,
	  zoom: 1,
	  WebkitLineClamp: 1,
	  // SVG-related properties
	  fillOpacity: 1,
	  floodOpacity: 1,
	  stopOpacity: 1,
	  strokeDasharray: 1,
	  strokeDashoffset: 1,
	  strokeMiterlimit: 1,
	  strokeOpacity: 1,
	  strokeWidth: 1
	};





	/***/ }),
	/* 107 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(32);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _styles = __webpack_require__(54);

	var _styles2 = _interopRequireDefault(_styles);

	var _dataService = __webpack_require__(74);

	var _dataService2 = _interopRequireDefault(_dataService);

	var _store = __webpack_require__(75);

	var _store2 = _interopRequireDefault(_store);

	var _utilities = __webpack_require__(29);

	var _iframe = __webpack_require__(73);

	var _iframe2 = _interopRequireDefault(_iframe);

	var _popup = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DOMAIN = 'admin.typeform.com';
	var TYPE = 'popup';

	var Wrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e4550h40'
	})('visibility:', function (p) {
	  return p.open ? 'visible' : 'hidden';
	}, ';opacity:', function (p) {
	  return p.open ? 1 : 0;
	}, ';background-color:', function (p) {
	  return p.backgroundColor;
	}, ';position:fixed !important;z-index:1000;left:0 !important;right:0 !important;top:0 !important;bottom:0 !important;overflow:hidden !important;height:100%;transition:all 400ms ease;');

	var CloseWrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e4550h41'
	})('position:absolute;z-index:1001;top:0;right:0;font-size:20px;font-family:sans-serif;width:50px;height:50px;');

	var closeArrow = /*#__PURE__*/(0, _styles.css)('border-radius:0;display:block;height:2px;width:25px;position:absolute;right:6px;top:6px;');

	var ArrowLeft = /*#__PURE__*/(0, _styles2.default)('span', {
	  target: 'e4550h42'
	})(closeArrow, '\n  background-color:', function (p) {
	  return p.backgroundColor;
	}, ';transform:translate(0,13px) rotate3d(0,0,1,-135deg);');

	var ArrowRight = /*#__PURE__*/(0, _styles2.default)('span', {
	  target: 'e4550h43'
	})(closeArrow, '\n  background-color:', function (p) {
	  return p.backgroundColor;
	}, ';transform:translate(0,13px) rotate3d(0,0,1,-45deg);');

	(0, _styles.injectGlobal)('.__typeform-embed-mobile-modal-open{overflow:hidden !important;position:fixed !important;top:0 !important;left:0 !important;right:0 !important;bottom:0 !important;}');

	var MobileModal = function (_Component) {
	  _inherits(MobileModal, _Component);

	  function MobileModal(props) {
	    _classCallCheck(this, MobileModal);

	    var _this = _possibleConstructorReturn(this, (MobileModal.__proto__ || Object.getPrototypeOf(MobileModal)).call(this, props));

	    _this.state = {
	      backgroundColor: 'transparent',
	      buttonColor: '#FFF'
	    };

	    _this.onAutoClose = _this.onAutoClose.bind(_this);
	    _this.onFormSubmit = _this.onFormSubmit.bind(_this);
	    _this.close = _this.close.bind(_this);
	    return _this;
	  }

	  _createClass(MobileModal, [{
	    key: 'onAutoClose',
	    value: function onAutoClose(e) {
	      var _this2 = this;

	      var canSetAutocloseDelay = e.detail.isProPlus || e.detail.canSetAutocloseDelay;
	      var _props = this.props,
	          isAutoCloseEnabled = _props.isAutoCloseEnabled,
	          autoClose = _props.autoClose;

	      var timeout = (canSetAutocloseDelay ? autoClose : _popup.DEFAULT_AUTOCLOSE_TIMEOUT) * 1000;

	      if (isAutoCloseEnabled) {
	        setTimeout(function () {
	          _this2.close();
	        }, timeout);
	      }
	    }
	  }, {
	    key: 'onFormSubmit',
	    value: function onFormSubmit() {
	      var onSubmit = this.props.onSubmit;

	      onSubmit && onSubmit();
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this3 = this;

	      var uid = _dataService2.default.getUidFromURL(this.props.url);

	      _dataService2.default.getFormData(uid, DOMAIN).then(function (data) {
	        return (0, _store2.default)(uid, TYPE, _this3.props.url, _this3.props.buttonText, data);
	      }).then(function (_ref) {
	        var form = _ref.form;

	        _this3.setState({
	          backgroundColor: '#' + form['background-color'],
	          buttonColor: '#' + form['button-color']
	        });
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('message', _utilities.onMessage);
	      window.addEventListener('embed-auto-close-popup', this.onAutoClose);
	      window.addEventListener('form-submit', this.onFormSubmit);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('message', _utilities.onMessage);
	      window.removeEventListener('embed-auto-close-popup', this.onAutoClose);
	      window.removeEventListener('form-submit', this.onFormSubmit);

	      document.body.classList.remove('__typeform-embed-mobile-modal-open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      document.body.classList.remove('__typeform-embed-mobile-modal-open');

	      if (this.props.onClose) {
	        this.props.onClose();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          url = _props2.url,
	          open = _props2.open;
	      var _state = this.state,
	          backgroundColor = _state.backgroundColor,
	          buttonColor = _state.buttonColor;


	      if (this.props.open) {
	        document.body.classList.add('__typeform-embed-mobile-modal-open');
	      }

	      return _react2.default.createElement(
	        Wrapper,
	        {
	          open: open,
	          backgroundColor: backgroundColor,
	          'data-qa': 'mobile-modal'
	        },
	        _react2.default.createElement(
	          CloseWrapper,
	          { 'data-qa': 'close-button-mobile', onClick: this.close },
	          _react2.default.createElement(ArrowLeft, { backgroundColor: buttonColor }),
	          _react2.default.createElement(ArrowRight, { backgroundColor: buttonColor })
	        ),
	        open && _react2.default.createElement(_iframe2.default, { src: url })
	      );
	    }
	  }]);

	  return MobileModal;
	}(_react.Component);

	MobileModal.propTypes = {
	  url: _propTypes2.default.string,
	  open: _propTypes2.default.bool,
	  buttonText: _propTypes2.default.string,
	  onClose: _propTypes2.default.func,
	  onSubmit: _propTypes2.default.func,
	  autoClose: _propTypes2.default.number
	};

	MobileModal.defaultProps = {
	  open: false,
	  autoClose: null
	};

	exports.default = MobileModal;

	/***/ }),
	/* 108 */
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.1
	// https://github.com/bgrins/TinyColor
	// Brian Grinstead, MIT License

	(function(Math) {

	var trimLeft = /^\s+/,
	    trimRight = /\s+$/,
	    tinyCounter = 0,
	    mathRound = Math.round,
	    mathMin = Math.min,
	    mathMax = Math.max,
	    mathRandom = Math.random;

	function tinycolor (color, opts) {

	    color = (color) ? color : '';
	    opts = opts || { };

	    // If input is already a tinycolor, return itself
	    if (color instanceof tinycolor) {
	       return color;
	    }
	    // If we are called as a function, call using new instead
	    if (!(this instanceof tinycolor)) {
	        return new tinycolor(color, opts);
	    }

	    var rgb = inputToRGB(color);
	    this._originalInput = color,
	    this._r = rgb.r,
	    this._g = rgb.g,
	    this._b = rgb.b,
	    this._a = rgb.a,
	    this._roundA = mathRound(100*this._a) / 100,
	    this._format = opts.format || rgb.format;
	    this._gradientType = opts.gradientType;

	    // Don't let the range of [0,255] come back in [0,1].
	    // Potentially lose a little bit of precision here, but will fix issues where
	    // .5 gets interpreted as half of the total, instead of half of 1
	    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
	    if (this._r < 1) { this._r = mathRound(this._r); }
	    if (this._g < 1) { this._g = mathRound(this._g); }
	    if (this._b < 1) { this._b = mathRound(this._b); }

	    this._ok = rgb.ok;
	    this._tc_id = tinyCounter++;
	}

	tinycolor.prototype = {
	    isDark: function() {
	        return this.getBrightness() < 128;
	    },
	    isLight: function() {
	        return !this.isDark();
	    },
	    isValid: function() {
	        return this._ok;
	    },
	    getOriginalInput: function() {
	      return this._originalInput;
	    },
	    getFormat: function() {
	        return this._format;
	    },
	    getAlpha: function() {
	        return this._a;
	    },
	    getBrightness: function() {
	        //http://www.w3.org/TR/AERT#color-contrast
	        var rgb = this.toRgb();
	        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	    },
	    getLuminance: function() {
	        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	        var rgb = this.toRgb();
	        var RsRGB, GsRGB, BsRGB, R, G, B;
	        RsRGB = rgb.r/255;
	        GsRGB = rgb.g/255;
	        BsRGB = rgb.b/255;

	        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
	        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
	        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
	        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
	    },
	    setAlpha: function(value) {
	        this._a = boundAlpha(value);
	        this._roundA = mathRound(100*this._a) / 100;
	        return this;
	    },
	    toHsv: function() {
	        var hsv = rgbToHsv(this._r, this._g, this._b);
	        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
	    },
	    toHsvString: function() {
	        var hsv = rgbToHsv(this._r, this._g, this._b);
	        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
	        return (this._a == 1) ?
	          "hsv("  + h + ", " + s + "%, " + v + "%)" :
	          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
	    },
	    toHsl: function() {
	        var hsl = rgbToHsl(this._r, this._g, this._b);
	        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
	    },
	    toHslString: function() {
	        var hsl = rgbToHsl(this._r, this._g, this._b);
	        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
	        return (this._a == 1) ?
	          "hsl("  + h + ", " + s + "%, " + l + "%)" :
	          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
	    },
	    toHex: function(allow3Char) {
	        return rgbToHex(this._r, this._g, this._b, allow3Char);
	    },
	    toHexString: function(allow3Char) {
	        return '#' + this.toHex(allow3Char);
	    },
	    toHex8: function(allow4Char) {
	        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
	    },
	    toHex8String: function(allow4Char) {
	        return '#' + this.toHex8(allow4Char);
	    },
	    toRgb: function() {
	        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
	    },
	    toRgbString: function() {
	        return (this._a == 1) ?
	          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
	          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
	    },
	    toPercentageRgb: function() {
	        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
	    },
	    toPercentageRgbString: function() {
	        return (this._a == 1) ?
	          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
	          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
	    },
	    toName: function() {
	        if (this._a === 0) {
	            return "transparent";
	        }

	        if (this._a < 1) {
	            return false;
	        }

	        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
	    },
	    toFilter: function(secondColor) {
	        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
	        var secondHex8String = hex8String;
	        var gradientType = this._gradientType ? "GradientType = 1, " : "";

	        if (secondColor) {
	            var s = tinycolor(secondColor);
	            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
	        }

	        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
	    },
	    toString: function(format) {
	        var formatSet = !!format;
	        format = format || this._format;

	        var formattedString = false;
	        var hasAlpha = this._a < 1 && this._a >= 0;
	        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

	        if (needsAlphaFormat) {
	            // Special case for "transparent", all other non-alpha formats
	            // will return rgba when there is transparency.
	            if (format === "name" && this._a === 0) {
	                return this.toName();
	            }
	            return this.toRgbString();
	        }
	        if (format === "rgb") {
	            formattedString = this.toRgbString();
	        }
	        if (format === "prgb") {
	            formattedString = this.toPercentageRgbString();
	        }
	        if (format === "hex" || format === "hex6") {
	            formattedString = this.toHexString();
	        }
	        if (format === "hex3") {
	            formattedString = this.toHexString(true);
	        }
	        if (format === "hex4") {
	            formattedString = this.toHex8String(true);
	        }
	        if (format === "hex8") {
	            formattedString = this.toHex8String();
	        }
	        if (format === "name") {
	            formattedString = this.toName();
	        }
	        if (format === "hsl") {
	            formattedString = this.toHslString();
	        }
	        if (format === "hsv") {
	            formattedString = this.toHsvString();
	        }

	        return formattedString || this.toHexString();
	    },
	    clone: function() {
	        return tinycolor(this.toString());
	    },

	    _applyModification: function(fn, args) {
	        var color = fn.apply(null, [this].concat([].slice.call(args)));
	        this._r = color._r;
	        this._g = color._g;
	        this._b = color._b;
	        this.setAlpha(color._a);
	        return this;
	    },
	    lighten: function() {
	        return this._applyModification(lighten, arguments);
	    },
	    brighten: function() {
	        return this._applyModification(brighten, arguments);
	    },
	    darken: function() {
	        return this._applyModification(darken, arguments);
	    },
	    desaturate: function() {
	        return this._applyModification(desaturate, arguments);
	    },
	    saturate: function() {
	        return this._applyModification(saturate, arguments);
	    },
	    greyscale: function() {
	        return this._applyModification(greyscale, arguments);
	    },
	    spin: function() {
	        return this._applyModification(spin, arguments);
	    },

	    _applyCombination: function(fn, args) {
	        return fn.apply(null, [this].concat([].slice.call(args)));
	    },
	    analogous: function() {
	        return this._applyCombination(analogous, arguments);
	    },
	    complement: function() {
	        return this._applyCombination(complement, arguments);
	    },
	    monochromatic: function() {
	        return this._applyCombination(monochromatic, arguments);
	    },
	    splitcomplement: function() {
	        return this._applyCombination(splitcomplement, arguments);
	    },
	    triad: function() {
	        return this._applyCombination(triad, arguments);
	    },
	    tetrad: function() {
	        return this._applyCombination(tetrad, arguments);
	    }
	};

	// If input is an object, force 1 into "1.0" to handle ratios properly
	// String input requires "1.0" as input, so 1 will be treated as 1
	tinycolor.fromRatio = function(color, opts) {
	    if (typeof color == "object") {
	        var newColor = {};
	        for (var i in color) {
	            if (color.hasOwnProperty(i)) {
	                if (i === "a") {
	                    newColor[i] = color[i];
	                }
	                else {
	                    newColor[i] = convertToPercentage(color[i]);
	                }
	            }
	        }
	        color = newColor;
	    }

	    return tinycolor(color, opts);
	};

	// Given a string or object, convert that input to RGB
	// Possible string inputs:
	//
	//     "red"
	//     "#f00" or "f00"
	//     "#ff0000" or "ff0000"
	//     "#ff000000" or "ff000000"
	//     "rgb 255 0 0" or "rgb (255, 0, 0)"
	//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	//
	function inputToRGB(color) {

	    var rgb = { r: 0, g: 0, b: 0 };
	    var a = 1;
	    var s = null;
	    var v = null;
	    var l = null;
	    var ok = false;
	    var format = false;

	    if (typeof color == "string") {
	        color = stringInputToObject(color);
	    }

	    if (typeof color == "object") {
	        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
	            rgb = rgbToRgb(color.r, color.g, color.b);
	            ok = true;
	            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
	        }
	        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
	            s = convertToPercentage(color.s);
	            v = convertToPercentage(color.v);
	            rgb = hsvToRgb(color.h, s, v);
	            ok = true;
	            format = "hsv";
	        }
	        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
	            s = convertToPercentage(color.s);
	            l = convertToPercentage(color.l);
	            rgb = hslToRgb(color.h, s, l);
	            ok = true;
	            format = "hsl";
	        }

	        if (color.hasOwnProperty("a")) {
	            a = color.a;
	        }
	    }

	    a = boundAlpha(a);

	    return {
	        ok: ok,
	        format: color.format || format,
	        r: mathMin(255, mathMax(rgb.r, 0)),
	        g: mathMin(255, mathMax(rgb.g, 0)),
	        b: mathMin(255, mathMax(rgb.b, 0)),
	        a: a
	    };
	}


	// Conversion Functions
	// --------------------

	// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

	// `rgbToRgb`
	// Handle bounds / percentage checking to conform to CSS color spec
	// <http://www.w3.org/TR/css3-color/>
	// *Assumes:* r, g, b in [0, 255] or [0, 1]
	// *Returns:* { r, g, b } in [0, 255]
	function rgbToRgb(r, g, b){
	    return {
	        r: bound01(r, 255) * 255,
	        g: bound01(g, 255) * 255,
	        b: bound01(b, 255) * 255
	    };
	}

	// `rgbToHsl`
	// Converts an RGB color value to HSL.
	// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	// *Returns:* { h, s, l } in [0,1]
	function rgbToHsl(r, g, b) {

	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    var max = mathMax(r, g, b), min = mathMin(r, g, b);
	    var h, s, l = (max + min) / 2;

	    if(max == min) {
	        h = s = 0; // achromatic
	    }
	    else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }

	        h /= 6;
	    }

	    return { h: h, s: s, l: l };
	}

	// `hslToRgb`
	// Converts an HSL color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	function hslToRgb(h, s, l) {
	    var r, g, b;

	    h = bound01(h, 360);
	    s = bound01(s, 100);
	    l = bound01(l, 100);

	    function hue2rgb(p, q, t) {
	        if(t < 0) t += 1;
	        if(t > 1) t -= 1;
	        if(t < 1/6) return p + (q - p) * 6 * t;
	        if(t < 1/2) return q;
	        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	        return p;
	    }

	    if(s === 0) {
	        r = g = b = l; // achromatic
	    }
	    else {
	        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	        var p = 2 * l - q;
	        r = hue2rgb(p, q, h + 1/3);
	        g = hue2rgb(p, q, h);
	        b = hue2rgb(p, q, h - 1/3);
	    }

	    return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHsv`
	// Converts an RGB color value to HSV
	// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	// *Returns:* { h, s, v } in [0,1]
	function rgbToHsv(r, g, b) {

	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    var max = mathMax(r, g, b), min = mathMin(r, g, b);
	    var h, s, v = max;

	    var d = max - min;
	    s = max === 0 ? 0 : d / max;

	    if(max == min) {
	        h = 0; // achromatic
	    }
	    else {
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    return { h: h, s: s, v: v };
	}

	// `hsvToRgb`
	// Converts an HSV color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	 function hsvToRgb(h, s, v) {

	    h = bound01(h, 360) * 6;
	    s = bound01(s, 100);
	    v = bound01(v, 100);

	    var i = Math.floor(h),
	        f = h - i,
	        p = v * (1 - s),
	        q = v * (1 - f * s),
	        t = v * (1 - (1 - f) * s),
	        mod = i % 6,
	        r = [v, q, p, p, t, v][mod],
	        g = [t, v, v, q, p, p][mod],
	        b = [p, p, t, v, v, q][mod];

	    return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHex`
	// Converts an RGB color to hex
	// Assumes r, g, and b are contained in the set [0, 255]
	// Returns a 3 or 6 character hex
	function rgbToHex(r, g, b, allow3Char) {

	    var hex = [
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16))
	    ];

	    // Return a 3 character hex if possible
	    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	    }

	    return hex.join("");
	}

	// `rgbaToHex`
	// Converts an RGBA color plus alpha transparency to hex
	// Assumes r, g, b are contained in the set [0, 255] and
	// a in [0, 1]. Returns a 4 or 8 character rgba hex
	function rgbaToHex(r, g, b, a, allow4Char) {

	    var hex = [
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16)),
	        pad2(convertDecimalToHex(a))
	    ];

	    // Return a 4 character hex if possible
	    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
	        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
	    }

	    return hex.join("");
	}

	// `rgbaToArgbHex`
	// Converts an RGBA color to an ARGB Hex8 string
	// Rarely used, but required for "toFilter()"
	function rgbaToArgbHex(r, g, b, a) {

	    var hex = [
	        pad2(convertDecimalToHex(a)),
	        pad2(mathRound(r).toString(16)),
	        pad2(mathRound(g).toString(16)),
	        pad2(mathRound(b).toString(16))
	    ];

	    return hex.join("");
	}

	// `equals`
	// Can be called with any tinycolor input
	tinycolor.equals = function (color1, color2) {
	    if (!color1 || !color2) { return false; }
	    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
	};

	tinycolor.random = function() {
	    return tinycolor.fromRatio({
	        r: mathRandom(),
	        g: mathRandom(),
	        b: mathRandom()
	    });
	};


	// Modification Functions
	// ----------------------
	// Thanks to less.js for some of the basics here
	// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

	function desaturate(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.s -= amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return tinycolor(hsl);
	}

	function saturate(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.s += amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return tinycolor(hsl);
	}

	function greyscale(color) {
	    return tinycolor(color).desaturate(100);
	}

	function lighten (color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.l += amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return tinycolor(hsl);
	}

	function brighten(color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var rgb = tinycolor(color).toRgb();
	    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
	    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
	    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
	    return tinycolor(rgb);
	}

	function darken (color, amount) {
	    amount = (amount === 0) ? 0 : (amount || 10);
	    var hsl = tinycolor(color).toHsl();
	    hsl.l -= amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return tinycolor(hsl);
	}

	// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	// Values outside of this range will be wrapped into this range.
	function spin(color, amount) {
	    var hsl = tinycolor(color).toHsl();
	    var hue = (hsl.h + amount) % 360;
	    hsl.h = hue < 0 ? 360 + hue : hue;
	    return tinycolor(hsl);
	}

	// Combination Functions
	// ---------------------
	// Thanks to jQuery xColor for some of the ideas behind these
	// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

	function complement(color) {
	    var hsl = tinycolor(color).toHsl();
	    hsl.h = (hsl.h + 180) % 360;
	    return tinycolor(hsl);
	}

	function triad(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
	    ];
	}

	function tetrad(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
	        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
	    ];
	}

	function splitcomplement(color) {
	    var hsl = tinycolor(color).toHsl();
	    var h = hsl.h;
	    return [
	        tinycolor(color),
	        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
	        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
	    ];
	}

	function analogous(color, results, slices) {
	    results = results || 6;
	    slices = slices || 30;

	    var hsl = tinycolor(color).toHsl();
	    var part = 360 / slices;
	    var ret = [tinycolor(color)];

	    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
	        hsl.h = (hsl.h + part) % 360;
	        ret.push(tinycolor(hsl));
	    }
	    return ret;
	}

	function monochromatic(color, results) {
	    results = results || 6;
	    var hsv = tinycolor(color).toHsv();
	    var h = hsv.h, s = hsv.s, v = hsv.v;
	    var ret = [];
	    var modification = 1 / results;

	    while (results--) {
	        ret.push(tinycolor({ h: h, s: s, v: v}));
	        v = (v + modification) % 1;
	    }

	    return ret;
	}

	// Utility Functions
	// ---------------------

	tinycolor.mix = function(color1, color2, amount) {
	    amount = (amount === 0) ? 0 : (amount || 50);

	    var rgb1 = tinycolor(color1).toRgb();
	    var rgb2 = tinycolor(color2).toRgb();

	    var p = amount / 100;

	    var rgba = {
	        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
	        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
	        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
	        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
	    };

	    return tinycolor(rgba);
	};


	// Readability Functions
	// ---------------------
	// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

	// `contrast`
	// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
	tinycolor.readability = function(color1, color2) {
	    var c1 = tinycolor(color1);
	    var c2 = tinycolor(color2);
	    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
	};

	// `isReadable`
	// Ensure that foreground and background color combinations meet WCAG2 guidelines.
	// The third argument is an optional Object.
	//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
	//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
	// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

	// *Example*
	//    tinycolor.isReadable("#000", "#111") => false
	//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
	tinycolor.isReadable = function(color1, color2, wcag2) {
	    var readability = tinycolor.readability(color1, color2);
	    var wcag2Parms, out;

	    out = false;

	    wcag2Parms = validateWCAG2Parms(wcag2);
	    switch (wcag2Parms.level + wcag2Parms.size) {
	        case "AAsmall":
	        case "AAAlarge":
	            out = readability >= 4.5;
	            break;
	        case "AAlarge":
	            out = readability >= 3;
	            break;
	        case "AAAsmall":
	            out = readability >= 7;
	            break;
	    }
	    return out;

	};

	// `mostReadable`
	// Given a base color and a list of possible foreground or background
	// colors for that base, returns the most readable color.
	// Optionally returns Black or White if the most readable color is unreadable.
	// *Example*
	//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
	//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
	//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
	//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
	tinycolor.mostReadable = function(baseColor, colorList, args) {
	    var bestColor = null;
	    var bestScore = 0;
	    var readability;
	    var includeFallbackColors, level, size ;
	    args = args || {};
	    includeFallbackColors = args.includeFallbackColors ;
	    level = args.level;
	    size = args.size;

	    for (var i= 0; i < colorList.length ; i++) {
	        readability = tinycolor.readability(baseColor, colorList[i]);
	        if (readability > bestScore) {
	            bestScore = readability;
	            bestColor = tinycolor(colorList[i]);
	        }
	    }

	    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
	        return bestColor;
	    }
	    else {
	        args.includeFallbackColors=false;
	        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
	    }
	};


	// Big List of Colors
	// ------------------
	// <http://www.w3.org/TR/css3-color/#svg-color>
	var names = tinycolor.names = {
	    aliceblue: "f0f8ff",
	    antiquewhite: "faebd7",
	    aqua: "0ff",
	    aquamarine: "7fffd4",
	    azure: "f0ffff",
	    beige: "f5f5dc",
	    bisque: "ffe4c4",
	    black: "000",
	    blanchedalmond: "ffebcd",
	    blue: "00f",
	    blueviolet: "8a2be2",
	    brown: "a52a2a",
	    burlywood: "deb887",
	    burntsienna: "ea7e5d",
	    cadetblue: "5f9ea0",
	    chartreuse: "7fff00",
	    chocolate: "d2691e",
	    coral: "ff7f50",
	    cornflowerblue: "6495ed",
	    cornsilk: "fff8dc",
	    crimson: "dc143c",
	    cyan: "0ff",
	    darkblue: "00008b",
	    darkcyan: "008b8b",
	    darkgoldenrod: "b8860b",
	    darkgray: "a9a9a9",
	    darkgreen: "006400",
	    darkgrey: "a9a9a9",
	    darkkhaki: "bdb76b",
	    darkmagenta: "8b008b",
	    darkolivegreen: "556b2f",
	    darkorange: "ff8c00",
	    darkorchid: "9932cc",
	    darkred: "8b0000",
	    darksalmon: "e9967a",
	    darkseagreen: "8fbc8f",
	    darkslateblue: "483d8b",
	    darkslategray: "2f4f4f",
	    darkslategrey: "2f4f4f",
	    darkturquoise: "00ced1",
	    darkviolet: "9400d3",
	    deeppink: "ff1493",
	    deepskyblue: "00bfff",
	    dimgray: "696969",
	    dimgrey: "696969",
	    dodgerblue: "1e90ff",
	    firebrick: "b22222",
	    floralwhite: "fffaf0",
	    forestgreen: "228b22",
	    fuchsia: "f0f",
	    gainsboro: "dcdcdc",
	    ghostwhite: "f8f8ff",
	    gold: "ffd700",
	    goldenrod: "daa520",
	    gray: "808080",
	    green: "008000",
	    greenyellow: "adff2f",
	    grey: "808080",
	    honeydew: "f0fff0",
	    hotpink: "ff69b4",
	    indianred: "cd5c5c",
	    indigo: "4b0082",
	    ivory: "fffff0",
	    khaki: "f0e68c",
	    lavender: "e6e6fa",
	    lavenderblush: "fff0f5",
	    lawngreen: "7cfc00",
	    lemonchiffon: "fffacd",
	    lightblue: "add8e6",
	    lightcoral: "f08080",
	    lightcyan: "e0ffff",
	    lightgoldenrodyellow: "fafad2",
	    lightgray: "d3d3d3",
	    lightgreen: "90ee90",
	    lightgrey: "d3d3d3",
	    lightpink: "ffb6c1",
	    lightsalmon: "ffa07a",
	    lightseagreen: "20b2aa",
	    lightskyblue: "87cefa",
	    lightslategray: "789",
	    lightslategrey: "789",
	    lightsteelblue: "b0c4de",
	    lightyellow: "ffffe0",
	    lime: "0f0",
	    limegreen: "32cd32",
	    linen: "faf0e6",
	    magenta: "f0f",
	    maroon: "800000",
	    mediumaquamarine: "66cdaa",
	    mediumblue: "0000cd",
	    mediumorchid: "ba55d3",
	    mediumpurple: "9370db",
	    mediumseagreen: "3cb371",
	    mediumslateblue: "7b68ee",
	    mediumspringgreen: "00fa9a",
	    mediumturquoise: "48d1cc",
	    mediumvioletred: "c71585",
	    midnightblue: "191970",
	    mintcream: "f5fffa",
	    mistyrose: "ffe4e1",
	    moccasin: "ffe4b5",
	    navajowhite: "ffdead",
	    navy: "000080",
	    oldlace: "fdf5e6",
	    olive: "808000",
	    olivedrab: "6b8e23",
	    orange: "ffa500",
	    orangered: "ff4500",
	    orchid: "da70d6",
	    palegoldenrod: "eee8aa",
	    palegreen: "98fb98",
	    paleturquoise: "afeeee",
	    palevioletred: "db7093",
	    papayawhip: "ffefd5",
	    peachpuff: "ffdab9",
	    peru: "cd853f",
	    pink: "ffc0cb",
	    plum: "dda0dd",
	    powderblue: "b0e0e6",
	    purple: "800080",
	    rebeccapurple: "663399",
	    red: "f00",
	    rosybrown: "bc8f8f",
	    royalblue: "4169e1",
	    saddlebrown: "8b4513",
	    salmon: "fa8072",
	    sandybrown: "f4a460",
	    seagreen: "2e8b57",
	    seashell: "fff5ee",
	    sienna: "a0522d",
	    silver: "c0c0c0",
	    skyblue: "87ceeb",
	    slateblue: "6a5acd",
	    slategray: "708090",
	    slategrey: "708090",
	    snow: "fffafa",
	    springgreen: "00ff7f",
	    steelblue: "4682b4",
	    tan: "d2b48c",
	    teal: "008080",
	    thistle: "d8bfd8",
	    tomato: "ff6347",
	    turquoise: "40e0d0",
	    violet: "ee82ee",
	    wheat: "f5deb3",
	    white: "fff",
	    whitesmoke: "f5f5f5",
	    yellow: "ff0",
	    yellowgreen: "9acd32"
	};

	// Make it easy to access colors via `hexNames[hex]`
	var hexNames = tinycolor.hexNames = flip(names);


	// Utilities
	// ---------

	// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
	function flip(o) {
	    var flipped = { };
	    for (var i in o) {
	        if (o.hasOwnProperty(i)) {
	            flipped[o[i]] = i;
	        }
	    }
	    return flipped;
	}

	// Return a valid alpha value [0,1] with all invalid values being set to 1
	function boundAlpha(a) {
	    a = parseFloat(a);

	    if (isNaN(a) || a < 0 || a > 1) {
	        a = 1;
	    }

	    return a;
	}

	// Take input from [0, n] and return it as [0, 1]
	function bound01(n, max) {
	    if (isOnePointZero(n)) { n = "100%"; }

	    var processPercent = isPercentage(n);
	    n = mathMin(max, mathMax(0, parseFloat(n)));

	    // Automatically convert percentage into number
	    if (processPercent) {
	        n = parseInt(n * max, 10) / 100;
	    }

	    // Handle floating point rounding errors
	    if ((Math.abs(n - max) < 0.000001)) {
	        return 1;
	    }

	    // Convert into [0, 1] range if it isn't already
	    return (n % max) / parseFloat(max);
	}

	// Force a number between 0 and 1
	function clamp01(val) {
	    return mathMin(1, mathMax(0, val));
	}

	// Parse a base-16 hex value into a base-10 integer
	function parseIntFromHex(val) {
	    return parseInt(val, 16);
	}

	// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	function isOnePointZero(n) {
	    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
	}

	// Check to see if string passed in is a percentage
	function isPercentage(n) {
	    return typeof n === "string" && n.indexOf('%') != -1;
	}

	// Force a hex value to have 2 characters
	function pad2(c) {
	    return c.length == 1 ? '0' + c : '' + c;
	}

	// Replace a decimal with it's percentage value
	function convertToPercentage(n) {
	    if (n <= 1) {
	        n = (n * 100) + "%";
	    }

	    return n;
	}

	// Converts a decimal to a hex value
	function convertDecimalToHex(d) {
	    return Math.round(parseFloat(d) * 255).toString(16);
	}
	// Converts a hex value to a decimal
	function convertHexToDecimal(h) {
	    return (parseIntFromHex(h) / 255);
	}

	var matchers = (function() {

	    // <http://www.w3.org/TR/css3-values/#integers>
	    var CSS_INTEGER = "[-\\+]?\\d+%?";

	    // <http://www.w3.org/TR/css3-values/#number-value>
	    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

	    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
	    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

	    // Actual matching.
	    // Parentheses and commas are optional, but not required.
	    // Whitespace can take the place of commas or opening paren
	    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
	    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

	    return {
	        CSS_UNIT: new RegExp(CSS_UNIT),
	        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
	        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
	        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
	        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
	        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
	        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
	        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
	    };
	})();

	// `isValidCSSUnit`
	// Take in a single string / number and check to see if it looks like a CSS unit
	// (see `matchers` above for definition).
	function isValidCSSUnit(color) {
	    return !!matchers.CSS_UNIT.exec(color);
	}

	// `stringInputToObject`
	// Permissive string parsing.  Take in a number of formats, and output an object
	// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	function stringInputToObject(color) {

	    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
	    var named = false;
	    if (names[color]) {
	        color = names[color];
	        named = true;
	    }
	    else if (color == 'transparent') {
	        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
	    }

	    // Try to match string input using regular expressions.
	    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	    // Just return an object and let the conversion functions handle that.
	    // This way the result will be the same whether the tinycolor is initialized with string or object.
	    var match;
	    if ((match = matchers.rgb.exec(color))) {
	        return { r: match[1], g: match[2], b: match[3] };
	    }
	    if ((match = matchers.rgba.exec(color))) {
	        return { r: match[1], g: match[2], b: match[3], a: match[4] };
	    }
	    if ((match = matchers.hsl.exec(color))) {
	        return { h: match[1], s: match[2], l: match[3] };
	    }
	    if ((match = matchers.hsla.exec(color))) {
	        return { h: match[1], s: match[2], l: match[3], a: match[4] };
	    }
	    if ((match = matchers.hsv.exec(color))) {
	        return { h: match[1], s: match[2], v: match[3] };
	    }
	    if ((match = matchers.hsva.exec(color))) {
	        return { h: match[1], s: match[2], v: match[3], a: match[4] };
	    }
	    if ((match = matchers.hex8.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            a: convertHexToDecimal(match[4]),
	            format: named ? "name" : "hex8"
	        };
	    }
	    if ((match = matchers.hex6.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1]),
	            g: parseIntFromHex(match[2]),
	            b: parseIntFromHex(match[3]),
	            format: named ? "name" : "hex"
	        };
	    }
	    if ((match = matchers.hex4.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1] + '' + match[1]),
	            g: parseIntFromHex(match[2] + '' + match[2]),
	            b: parseIntFromHex(match[3] + '' + match[3]),
	            a: convertHexToDecimal(match[4] + '' + match[4]),
	            format: named ? "name" : "hex8"
	        };
	    }
	    if ((match = matchers.hex3.exec(color))) {
	        return {
	            r: parseIntFromHex(match[1] + '' + match[1]),
	            g: parseIntFromHex(match[2] + '' + match[2]),
	            b: parseIntFromHex(match[3] + '' + match[3]),
	            format: named ? "name" : "hex"
	        };
	    }

	    return false;
	}

	function validateWCAG2Parms(parms) {
	    // return valid WCAG2 parms for isReadable.
	    // If input parms are invalid, return {"level":"AA", "size":"small"}
	    var level, size;
	    parms = parms || {"level":"AA", "size":"small"};
	    level = (parms.level || "AA").toUpperCase();
	    size = (parms.size || "small").toLowerCase();
	    if (level !== "AA" && level !== "AAA") {
	        level = "AA";
	    }
	    if (size !== "small" && size !== "large") {
	        size = "small";
	    }
	    return {"level":level, "size":size};
	}

	// Node: Export function
	if (typeof module !== "undefined" && module.exports) {
	    module.exports = tinycolor;
	}
	// AMD/requirejs: Define the module
	else {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return tinycolor;}).call(exports, __webpack_require__, exports, module),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	})(Math);


	/***/ }),
	/* 109 */
	/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
	  return Object.defineProperty(__webpack_require__(76)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


	/***/ }),
	/* 110 */
	/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(5);


	/***/ }),
	/* 111 */
	/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(11);
	var toIObject = __webpack_require__(15);
	var arrayIndexOf = __webpack_require__(56)(false);
	var IE_PROTO = __webpack_require__(78)('IE_PROTO');

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
	/* 112 */
	/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var anObject = __webpack_require__(1);
	var getKeys = __webpack_require__(38);

	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


	/***/ }),
	/* 113 */
	/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(15);
	var gOPN = __webpack_require__(41).f;
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
	/* 114 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys = __webpack_require__(38);
	var gOPS = __webpack_require__(57);
	var pIE = __webpack_require__(52);
	var toObject = __webpack_require__(9);
	var IObject = __webpack_require__(51);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(3)(function () {
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
	/* 115 */
	/***/ (function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(10);
	var isObject = __webpack_require__(4);
	var invoke = __webpack_require__(116);
	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	module.exports = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};


	/***/ }),
	/* 116 */
	/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};


	/***/ }),
	/* 117 */
	/***/ (function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(2).parseInt;
	var $trim = __webpack_require__(47).trim;
	var ws = __webpack_require__(82);
	var hex = /^[-+]?0[xX]/;

	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;


	/***/ }),
	/* 118 */
	/***/ (function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(2).parseFloat;
	var $trim = __webpack_require__(47).trim;

	module.exports = 1 / $parseFloat(__webpack_require__(82) + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;


	/***/ }),
	/* 119 */
	/***/ (function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(20);
	module.exports = function (it, msg) {
	  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
	  return +it;
	};


	/***/ }),
	/* 120 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(4);
	var floor = Math.floor;
	module.exports = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};


	/***/ }),
	/* 121 */
	/***/ (function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x) {
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};


	/***/ }),
	/* 122 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var sign = __webpack_require__(85);
	var pow = Math.pow;
	var EPSILON = pow(2, -52);
	var EPSILON32 = pow(2, -23);
	var MAX32 = pow(2, 127) * (2 - EPSILON32);
	var MIN32 = pow(2, -126);

	var roundTiesToEven = function (n) {
	  return n + 1 / EPSILON - 1 / EPSILON;
	};

	module.exports = Math.fround || function fround(x) {
	  var $abs = Math.abs(x);
	  var $sign = sign(x);
	  var a, result;
	  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	  a = (1 + EPSILON32 / EPSILON) * $abs;
	  result = a - (a - $abs);
	  // eslint-disable-next-line no-self-compare
	  if (result > MAX32 || result != result) return $sign * Infinity;
	  return $sign * result;
	};


	/***/ }),
	/* 123 */
	/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(1);
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
	/* 124 */
	/***/ (function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(10);
	var toObject = __webpack_require__(9);
	var IObject = __webpack_require__(51);
	var toLength = __webpack_require__(8);

	module.exports = function (that, callbackfn, aLen, memo, isRight) {
	  aFunction(callbackfn);
	  var O = toObject(that);
	  var self = IObject(O);
	  var length = toLength(O.length);
	  var index = isRight ? length - 1 : 0;
	  var i = isRight ? -1 : 1;
	  if (aLen < 2) for (;;) {
	    if (index in self) {
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if (isRight ? index < 0 : length <= index) {
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};


	/***/ }),
	/* 125 */
	/***/ (function(module, exports, __webpack_require__) {
	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

	var toObject = __webpack_require__(9);
	var toAbsoluteIndex = __webpack_require__(39);
	var toLength = __webpack_require__(8);

	module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};


	/***/ }),
	/* 126 */
	/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


	/***/ }),
	/* 127 */
	/***/ (function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(61)
	});


	/***/ }),
	/* 128 */
	/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


	/***/ }),
	/* 129 */
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var newPromiseCapability = __webpack_require__(100);

	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


	/***/ }),
	/* 130 */
	/***/ (function(module, exports, __webpack_require__) {

	var strong = __webpack_require__(131);
	var validate = __webpack_require__(49);
	var MAP = 'Map';

	// 23.1 Map Objects
	module.exports = __webpack_require__(64)(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(validate(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong, true);


	/***/ }),
	/* 131 */
	/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7).f;
	var create = __webpack_require__(40);
	var redefineAll = __webpack_require__(45);
	var ctx = __webpack_require__(19);
	var anInstance = __webpack_require__(43);
	var forOf = __webpack_require__(44);
	var $iterDefine = __webpack_require__(88);
	var step = __webpack_require__(126);
	var setSpecies = __webpack_require__(42);
	var DESCRIPTORS = __webpack_require__(6);
	var fastKey = __webpack_require__(33).fastKey;
	var validate = __webpack_require__(49);
	var SIZE = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	module.exports = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate(this, NAME);
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS) dP(C.prototype, 'size', {
	      get: function () {
	        return validate(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};


	/***/ }),
	/* 132 */
	/***/ (function(module, exports, __webpack_require__) {

	var strong = __webpack_require__(131);
	var validate = __webpack_require__(49);
	var SET = 'Set';

	// 23.2 Set Objects
	module.exports = __webpack_require__(64)(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, strong);


	/***/ }),
	/* 133 */
	/***/ (function(module, exports, __webpack_require__) {

	var each = __webpack_require__(27)(0);
	var redefine = __webpack_require__(13);
	var meta = __webpack_require__(33);
	var assign = __webpack_require__(114);
	var weak = __webpack_require__(134);
	var isObject = __webpack_require__(4);
	var fails = __webpack_require__(3);
	var validate = __webpack_require__(49);
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
	var $WeakMap = module.exports = __webpack_require__(64)(WEAK_MAP, wrapper, methods, weak, true, true);

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
	/* 134 */
	/***/ (function(module, exports, __webpack_require__) {

	var redefineAll = __webpack_require__(45);
	var getWeak = __webpack_require__(33).getWeak;
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var anInstance = __webpack_require__(43);
	var forOf = __webpack_require__(44);
	var createArrayMethod = __webpack_require__(27);
	var $has = __webpack_require__(11);
	var validate = __webpack_require__(49);
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
	/* 135 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/ecma262/#sec-toindex
	var toInteger = __webpack_require__(25);
	var toLength = __webpack_require__(8);
	module.exports = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length!');
	  return length;
	};


	/***/ }),
	/* 136 */
	/***/ (function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN = __webpack_require__(41);
	var gOPS = __webpack_require__(57);
	var anObject = __webpack_require__(1);
	var Reflect = __webpack_require__(2).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject(it));
	  var getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};


	/***/ }),
	/* 137 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var isArray = __webpack_require__(58);
	var isObject = __webpack_require__(4);
	var toLength = __webpack_require__(8);
	var ctx = __webpack_require__(19);
	var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

	function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
	  var element, spreadable;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      spreadable = false;
	      if (isObject(element)) {
	        spreadable = element[IS_CONCAT_SPREADABLE];
	        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
	      }

	      if (spreadable && depth > 0) {
	        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
	      } else {
	        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	}

	module.exports = flattenIntoArray;


	/***/ }),
	/* 138 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(8);
	var repeat = __webpack_require__(84);
	var defined = __webpack_require__(24);

	module.exports = function (that, maxLength, fillString, left) {
	  var S = String(defined(that));
	  var stringLength = S.length;
	  var fillStr = fillString === undefined ? ' ' : String(fillString);
	  var intMaxLength = toLength(maxLength);
	  if (intMaxLength <= stringLength || fillStr == '') return S;
	  var fillLen = intMaxLength - stringLength;
	  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


	/***/ }),
	/* 139 */
	/***/ (function(module, exports, __webpack_require__) {

	var getKeys = __webpack_require__(38);
	var toIObject = __webpack_require__(15);
	var isEnum = __webpack_require__(52).f;
	module.exports = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};


	/***/ }),
	/* 140 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(53);
	var from = __webpack_require__(141);
	module.exports = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};


	/***/ }),
	/* 141 */
	/***/ (function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(44);

	module.exports = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


	/***/ }),
	/* 142 */
	/***/ (function(module, exports) {

	// https://rwaldron.github.io/proposal-math-extensions/
	module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
	  if (
	    arguments.length === 0
	      // eslint-disable-next-line no-self-compare
	      || x != x
	      // eslint-disable-next-line no-self-compare
	      || inLow != inLow
	      // eslint-disable-next-line no-self-compare
	      || inHigh != inHigh
	      // eslint-disable-next-line no-self-compare
	      || outLow != outLow
	      // eslint-disable-next-line no-self-compare
	      || outHigh != outHigh
	  ) return NaN;
	  if (x === Infinity || x === -Infinity) return x;
	  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
	};


	/***/ }),
	/* 143 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeFullScreen = exports.makeWidget = exports.makePopup = undefined;

	var _makePopup = __webpack_require__(144);

	var _makePopup2 = _interopRequireDefault(_makePopup);

	var _makeWidget = __webpack_require__(162);

	var _makeWidget2 = _interopRequireDefault(_makeWidget);

	var _makeFullScreen = __webpack_require__(167);

	var _makeFullScreen2 = _interopRequireDefault(_makeFullScreen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!window._babelPolyfill) {
	  __webpack_require__(168);
	}

	exports.makePopup = _makePopup2.default;
	exports.makeWidget = _makeWidget2.default;
	exports.makeFullScreen = _makeFullScreen2.default;

	/***/ }),
	/* 144 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = makePopup;

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(18);

	var _utilities = __webpack_require__(29);

	var _popup = __webpack_require__(105);

	var _popup2 = _interopRequireDefault(_popup);

	var _mobileModal = __webpack_require__(107);

	var _mobileModal2 = _interopRequireDefault(_mobileModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT_DRAWER_WIDTH = 800;

	var defaultOptions = {
	  mode: _popup.POPUP,
	  autoOpen: false,
	  isModalOpen: false,
	  autoClose: _popup.DEFAULT_AUTOCLOSE_TIMEOUT,
	  hideFooter: false,
	  hideHeaders: false,
	  hideScrollbars: false,
	  disableSubmit: false,
	  drawerWidth: DEFAULT_DRAWER_WIDTH,
	  onSubmit: _utilities.noop
	};

	var queryStringKeys = {
	  embedType: 'typeform-embed',
	  hideFooter: 'embed-hide-footer',
	  hideHeaders: 'embed-hide-headers',
	  disableSubmit: '__dangerous-disable-submissions'
	};

	var renderComponent = function renderComponent(url, domNode, options, onClose) {
	  if (!(0, _utilities.isMobile)(navigator.userAgent) && (0, _utilities.isScreenBig)()) {
	    var urlWithQueryString = (0, _utilities.appendParamsToUrl)(url, (0, _utilities.replaceExistingKeys)(options, queryStringKeys));

	    (0, _reactDom.render)(_react2.default.createElement(_popup2.default, { url: urlWithQueryString, options: options, onClose: onClose }), domNode);
	  } else {
	    (0, _utilities.ensureMetaViewport)();
	    (0, _reactDom.render)(_react2.default.createElement(_mobileModal2.default, {
	      url: url,
	      buttonText: options.buttonText,
	      autoClose: options.autoClose,
	      onClose: onClose,
	      onSubmit: options.onSubmit,
	      isAutoCloseEnabled: options.isAutoCloseEnabled,
	      open: true
	    }), domNode);
	  }
	};

	function makePopup(url, options) {
	  options = _extends({}, defaultOptions, options, {
	    isAutoCloseEnabled: options.autoClose !== undefined,
	    embedType: _popup.POPUP_MODES[options.mode]
	  });

	  if (!Number.isSafeInteger(options.drawerWidth)) {
	    throw new Error('Whoops! You provided an invalid \'drawerWidth\' option: "' + options.drawerWidth + '". It must be a number.');
	  }

	  var domNode = document.createElement('div');
	  options.isContained = options.container !== undefined;
	  options.container = options.container || document.body;
	  options.container.appendChild(domNode);

	  var popup = {
	    open: function open() {
	      renderComponent(url, domNode, options, this.close);
	    },
	    close: function close() {
	      window.postMessage('form-close', '*');
	      (0, _reactDom.unmountComponentAtNode)(domNode);
	    }
	  };

	  if (options.autoOpen) {
	    popup.open();
	  }

	  return popup;
	}

	/***/ }),
	/* 145 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */



	var emptyFunction = __webpack_require__(69);
	var invariant = __webpack_require__(70);
	var warning = __webpack_require__(103);
	var assign = __webpack_require__(146);

	var ReactPropTypesSecret = __webpack_require__(71);
	var checkPropTypes = __webpack_require__(147);

	module.exports = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
	      return emptyFunction.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)));

	/***/ }),
	/* 146 */
	/***/ (function(module, exports, __webpack_require__) {
	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/


	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


	/***/ }),
	/* 147 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */



	{
	  var invariant = __webpack_require__(70);
	  var warning = __webpack_require__(103);
	  var ReactPropTypesSecret = __webpack_require__(71);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)));

	/***/ }),
	/* 148 */
	/***/ (function(module, exports, __webpack_require__) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */



	var emptyFunction = __webpack_require__(69);
	var invariant = __webpack_require__(70);
	var ReactPropTypesSecret = __webpack_require__(71);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  }  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  }  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


	/***/ }),
	/* 149 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return h; });
	/* unused harmony export createElement */
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cloneElement; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return render; });
	/* unused harmony export rerender */
	/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return options; });
	/** Virtual DOM Node */
	function VNode() {}

	/** Global options
	 *	@public
	 *	@namespace options {Object}
	 */
	var options = {

		/** If `true`, `prop` changes trigger synchronous component updates.
	  *	@name syncComponentUpdates
	  *	@type Boolean
	  *	@default true
	  */
		//syncComponentUpdates: true,

		/** Processes all created VNodes.
	  *	@param {VNode} vnode	A newly-created VNode to normalize/process
	  */
		//vnode(vnode) { }

		/** Hook invoked after a component is mounted. */
		// afterMount(component) { }

		/** Hook invoked after the DOM is updated with a component's latest render. */
		// afterUpdate(component) { }

		/** Hook invoked immediately before a component is unmounted. */
		// beforeUnmount(component) { }
	};

	var stack = [];

	var EMPTY_CHILDREN = [];

	/**
	 * JSX/hyperscript reviver.
	 * @see http://jasonformat.com/wtf-is-jsx
	 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
	 *
	 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
	 *
	 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
	 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
	 * the current _actual_ DOM structure, and applying only the differences.
	 *
	 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
	 * and optionally children to append to the element.
	 *
	 * @example The following DOM tree
	 *
	 * `<div id="foo" name="bar">Hello!</div>`
	 *
	 * can be constructed using this function as:
	 *
	 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
	 *
	 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
	 * @param {Object} attributes	Any attributes/props to set on the created element.
	 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
	 *
	 * @public
	 */
	function h(nodeName, attributes) {
		var children = EMPTY_CHILDREN,
		    lastSimple,
		    child,
		    simple,
		    i;
		for (i = arguments.length; i-- > 2;) {
			stack.push(arguments[i]);
		}
		if (attributes && attributes.children != null) {
			if (!stack.length) stack.push(attributes.children);
			delete attributes.children;
		}
		while (stack.length) {
			if ((child = stack.pop()) && child.pop !== undefined) {
				for (i = child.length; i--;) {
					stack.push(child[i]);
				}
			} else {
				if (typeof child === 'boolean') child = null;

				if (simple = typeof nodeName !== 'function') {
					if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
				}

				if (simple && lastSimple) {
					children[children.length - 1] += child;
				} else if (children === EMPTY_CHILDREN) {
					children = [child];
				} else {
					children.push(child);
				}

				lastSimple = simple;
			}
		}

		var p = new VNode();
		p.nodeName = nodeName;
		p.children = children;
		p.attributes = attributes == null ? undefined : attributes;
		p.key = attributes == null ? undefined : attributes.key;

		// if a "vnode hook" is defined, pass every created VNode to it
		if (options.vnode !== undefined) options.vnode(p);

		return p;
	}

	/**
	 *  Copy all properties from `props` onto `obj`.
	 *  @param {Object} obj		Object onto which properties should be copied.
	 *  @param {Object} props	Object from which to copy properties.
	 *  @returns obj
	 *  @private
	 */
	function extend(obj, props) {
	  for (var i in props) {
	    obj[i] = props[i];
	  }return obj;
	}

	/**
	 * Call a function asynchronously, as soon as possible. Makes
	 * use of HTML Promise to schedule the callback if available,
	 * otherwise falling back to `setTimeout` (mainly for IE<11).
	 *
	 * @param {Function} callback
	 */
	var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

	/**
	 * Clones the given VNode, optionally adding attributes/props and replacing its children.
	 * @param {VNode} vnode		The virutal DOM element to clone
	 * @param {Object} props	Attributes/props to add when cloning
	 * @param {VNode} rest		Any additional arguments will be used as replacement children.
	 */
	function cloneElement(vnode, props) {
	  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
	}

	// DOM properties that should NOT have "px" added when numeric
	var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

	/** Managed queue of dirty components to be re-rendered */

	var items = [];

	function enqueueRender(component) {
		if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
			(options.debounceRendering || defer)(rerender);
		}
	}

	function rerender() {
		var p,
		    list = items;
		items = [];
		while (p = list.pop()) {
			if (p._dirty) renderComponent(p);
		}
	}

	/**
	 * Check if two nodes are equivalent.
	 *
	 * @param {Node} node			DOM Node to compare
	 * @param {VNode} vnode			Virtual DOM node to compare
	 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
	 * @private
	 */
	function isSameNodeType(node, vnode, hydrating) {
	  if (typeof vnode === 'string' || typeof vnode === 'number') {
	    return node.splitText !== undefined;
	  }
	  if (typeof vnode.nodeName === 'string') {
	    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	  }
	  return hydrating || node._componentConstructor === vnode.nodeName;
	}

	/**
	 * Check if an Element has a given nodeName, case-insensitively.
	 *
	 * @param {Element} node	A DOM Element to inspect the name of.
	 * @param {String} nodeName	Unnormalized name to compare against.
	 */
	function isNamedNode(node, nodeName) {
	  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	}

	/**
	 * Reconstruct Component-style `props` from a VNode.
	 * Ensures default/fallback values from `defaultProps`:
	 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
	 *
	 * @param {VNode} vnode
	 * @returns {Object} props
	 */
	function getNodeProps(vnode) {
	  var props = extend({}, vnode.attributes);
	  props.children = vnode.children;

	  var defaultProps = vnode.nodeName.defaultProps;
	  if (defaultProps !== undefined) {
	    for (var i in defaultProps) {
	      if (props[i] === undefined) {
	        props[i] = defaultProps[i];
	      }
	    }
	  }

	  return props;
	}

	/** Create an element with the given nodeName.
	 *	@param {String} nodeName
	 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
	 *	@returns {Element} node
	 */
	function createNode(nodeName, isSvg) {
		var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
		node.normalizedNodeName = nodeName;
		return node;
	}

	/** Remove a child node from its parent if attached.
	 *	@param {Element} node		The node to remove
	 */
	function removeNode(node) {
		var parentNode = node.parentNode;
		if (parentNode) parentNode.removeChild(node);
	}

	/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
	 *	If `value` is `null`, the attribute/handler will be removed.
	 *	@param {Element} node	An element to mutate
	 *	@param {string} name	The name/key to set, such as an event or attribute name
	 *	@param {any} old	The last value that was set for this name/node pair
	 *	@param {any} value	An attribute value, such as a function to be used as an event handler
	 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
	 *	@private
	 */
	function setAccessor(node, name, old, value, isSvg) {
		if (name === 'className') name = 'class';

		if (name === 'key') ; else if (name === 'ref') {
			if (old) old(null);
			if (value) value(node);
		} else if (name === 'class' && !isSvg) {
			node.className = value || '';
		} else if (name === 'style') {
			if (!value || typeof value === 'string' || typeof old === 'string') {
				node.style.cssText = value || '';
			}
			if (value && typeof value === 'object') {
				if (typeof old !== 'string') {
					for (var i in old) {
						if (!(i in value)) node.style[i] = '';
					}
				}
				for (var i in value) {
					node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
				}
			}
		} else if (name === 'dangerouslySetInnerHTML') {
			if (value) node.innerHTML = value.__html || '';
		} else if (name[0] == 'o' && name[1] == 'n') {
			var useCapture = name !== (name = name.replace(/Capture$/, ''));
			name = name.toLowerCase().substring(2);
			if (value) {
				if (!old) node.addEventListener(name, eventProxy, useCapture);
			} else {
				node.removeEventListener(name, eventProxy, useCapture);
			}
			(node._listeners || (node._listeners = {}))[name] = value;
		} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
			setProperty(node, name, value == null ? '' : value);
			if (value == null || value === false) node.removeAttribute(name);
		} else {
			var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
			if (value == null || value === false) {
				if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
			} else if (typeof value !== 'function') {
				if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
			}
		}
	}

	/** Attempt to set a DOM property to the given value.
	 *	IE & FF throw for certain property-value combinations.
	 */
	function setProperty(node, name, value) {
		try {
			node[name] = value;
		} catch (e) {}
	}

	/** Proxy an event to hooked event handlers
	 *	@private
	 */
	function eventProxy(e) {
		return this._listeners[e.type](options.event && options.event(e) || e);
	}

	/** Queue of components that have been mounted and are awaiting componentDidMount */
	var mounts = [];

	/** Diff recursion count, used to track the end of the diff cycle. */
	var diffLevel = 0;

	/** Global flag indicating if the diff is currently within an SVG */
	var isSvgMode = false;

	/** Global flag indicating if the diff is performing hydration */
	var hydrating = false;

	/** Invoke queued componentDidMount lifecycle methods */
	function flushMounts() {
		var c;
		while (c = mounts.pop()) {
			if (options.afterMount) options.afterMount(c);
			if (c.componentDidMount) c.componentDidMount();
		}
	}

	/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
	 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
	 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
	 *	@returns {Element} dom			The created/mutated element
	 *	@private
	 */
	function diff(dom, vnode, context, mountAll, parent, componentRoot) {
		// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
		if (!diffLevel++) {
			// when first starting the diff, check if we're diffing an SVG or within an SVG
			isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

			// hydration is indicated by the existing element to be diffed not having a prop cache
			hydrating = dom != null && !('__preactattr_' in dom);
		}

		var ret = idiff(dom, vnode, context, mountAll, componentRoot);

		// append the element if its a new parent
		if (parent && ret.parentNode !== parent) parent.appendChild(ret);

		// diffLevel being reduced to 0 means we're exiting the diff
		if (! --diffLevel) {
			hydrating = false;
			// invoke queued componentDidMount lifecycle methods
			if (!componentRoot) flushMounts();
		}

		return ret;
	}

	/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
	function idiff(dom, vnode, context, mountAll, componentRoot) {
		var out = dom,
		    prevSvgMode = isSvgMode;

		// empty values (null, undefined, booleans) render as empty Text nodes
		if (vnode == null || typeof vnode === 'boolean') vnode = '';

		// Fast case: Strings & Numbers create/update Text nodes.
		if (typeof vnode === 'string' || typeof vnode === 'number') {

			// update if it's already a Text node:
			if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
				/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
				if (dom.nodeValue != vnode) {
					dom.nodeValue = vnode;
				}
			} else {
				// it wasn't a Text node: replace it with one and recycle the old Element
				out = document.createTextNode(vnode);
				if (dom) {
					if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
					recollectNodeTree(dom, true);
				}
			}

			out['__preactattr_'] = true;

			return out;
		}

		// If the VNode represents a Component, perform a component diff:
		var vnodeName = vnode.nodeName;
		if (typeof vnodeName === 'function') {
			return buildComponentFromVNode(dom, vnode, context, mountAll);
		}

		// Tracks entering and exiting SVG namespace when descending through the tree.
		isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

		// If there's no existing element or it's the wrong type, create a new one:
		vnodeName = String(vnodeName);
		if (!dom || !isNamedNode(dom, vnodeName)) {
			out = createNode(vnodeName, isSvgMode);

			if (dom) {
				// move children into the replacement node
				while (dom.firstChild) {
					out.appendChild(dom.firstChild);
				} // if the previous Element was mounted into the DOM, replace it inline
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

				// recycle the old element (skips non-Element node types)
				recollectNodeTree(dom, true);
			}
		}

		var fc = out.firstChild,
		    props = out['__preactattr_'],
		    vchildren = vnode.children;

		if (props == null) {
			props = out['__preactattr_'] = {};
			for (var a = out.attributes, i = a.length; i--;) {
				props[a[i].name] = a[i].value;
			}
		}

		// Optimization: fast-path for elements containing a single TextNode:
		if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
			if (fc.nodeValue != vchildren[0]) {
				fc.nodeValue = vchildren[0];
			}
		}
		// otherwise, if there are existing or new children, diff them:
		else if (vchildren && vchildren.length || fc != null) {
				innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
			}

		// Apply attributes/props from VNode to the DOM Element:
		diffAttributes(out, vnode.attributes, props);

		// restore previous SVG mode: (in case we're exiting an SVG namespace)
		isSvgMode = prevSvgMode;

		return out;
	}

	/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
	 *	@param {Element} dom			Element whose children should be compared & mutated
	 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
	 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
	 *	@param {Boolean} mountAll
	 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
	 */
	function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
		var originalChildren = dom.childNodes,
		    children = [],
		    keyed = {},
		    keyedLen = 0,
		    min = 0,
		    len = originalChildren.length,
		    childrenLen = 0,
		    vlen = vchildren ? vchildren.length : 0,
		    j,
		    c,
		    f,
		    vchild,
		    child;

		// Build up a map of keyed children and an Array of unkeyed children:
		if (len !== 0) {
			for (var i = 0; i < len; i++) {
				var _child = originalChildren[i],
				    props = _child['__preactattr_'],
				    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
				if (key != null) {
					keyedLen++;
					keyed[key] = _child;
				} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
					children[childrenLen++] = _child;
				}
			}
		}

		if (vlen !== 0) {
			for (var i = 0; i < vlen; i++) {
				vchild = vchildren[i];
				child = null;

				// attempt to find a node based on key matching
				var key = vchild.key;
				if (key != null) {
					if (keyedLen && keyed[key] !== undefined) {
						child = keyed[key];
						keyed[key] = undefined;
						keyedLen--;
					}
				}
				// attempt to pluck a node of the same type from the existing children
				else if (!child && min < childrenLen) {
						for (j = min; j < childrenLen; j++) {
							if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
								child = c;
								children[j] = undefined;
								if (j === childrenLen - 1) childrenLen--;
								if (j === min) min++;
								break;
							}
						}
					}

				// morph the matched/found/created DOM child to match vchild (deep)
				child = idiff(child, vchild, context, mountAll);

				f = originalChildren[i];
				if (child && child !== dom && child !== f) {
					if (f == null) {
						dom.appendChild(child);
					} else if (child === f.nextSibling) {
						removeNode(f);
					} else {
						dom.insertBefore(child, f);
					}
				}
			}
		}

		// remove unused keyed children:
		if (keyedLen) {
			for (var i in keyed) {
				if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
			}
		}

		// remove orphaned unkeyed children:
		while (min <= childrenLen) {
			if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
		}
	}

	/** Recursively recycle (or just unmount) a node and its descendants.
	 *	@param {Node} node						DOM node to start unmount/removal from
	 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
	 */
	function recollectNodeTree(node, unmountOnly) {
		var component = node._component;
		if (component) {
			// if node is owned by a Component, unmount that component (ends up recursing back here)
			unmountComponent(component);
		} else {
			// If the node's VNode had a ref function, invoke it with null here.
			// (this is part of the React spec, and smart for unsetting references)
			if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

			if (unmountOnly === false || node['__preactattr_'] == null) {
				removeNode(node);
			}

			removeChildren(node);
		}
	}

	/** Recollect/unmount all children.
	 *	- we use .lastChild here because it causes less reflow than .firstChild
	 *	- it's also cheaper than accessing the .childNodes Live NodeList
	 */
	function removeChildren(node) {
		node = node.lastChild;
		while (node) {
			var next = node.previousSibling;
			recollectNodeTree(node, true);
			node = next;
		}
	}

	/** Apply differences in attributes from a VNode to the given DOM Element.
	 *	@param {Element} dom		Element with attributes to diff `attrs` against
	 *	@param {Object} attrs		The desired end-state key-value attribute pairs
	 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
	 */
	function diffAttributes(dom, attrs, old) {
		var name;

		// remove attributes no longer present on the vnode by setting them to undefined
		for (name in old) {
			if (!(attrs && attrs[name] != null) && old[name] != null) {
				setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
			}
		}

		// add new & update changed attributes
		for (name in attrs) {
			if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
				setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
			}
		}
	}

	/** Retains a pool of Components for re-use, keyed on component name.
	 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
	 *	@private
	 */
	var components = {};

	/** Reclaim a component for later re-use by the recycler. */
	function collectComponent(component) {
		var name = component.constructor.name;
		(components[name] || (components[name] = [])).push(component);
	}

	/** Create a component. Normalizes differences between PFC's and classful Components. */
	function createComponent(Ctor, props, context) {
		var list = components[Ctor.name],
		    inst;

		if (Ctor.prototype && Ctor.prototype.render) {
			inst = new Ctor(props, context);
			Component.call(inst, props, context);
		} else {
			inst = new Component(props, context);
			inst.constructor = Ctor;
			inst.render = doRender;
		}

		if (list) {
			for (var i = list.length; i--;) {
				if (list[i].constructor === Ctor) {
					inst.nextBase = list[i].nextBase;
					list.splice(i, 1);
					break;
				}
			}
		}
		return inst;
	}

	/** The `.render()` method for a PFC backing instance. */
	function doRender(props, state, context) {
		return this.constructor(props, context);
	}

	/** Set a component's `props` (generally derived from JSX attributes).
	 *	@param {Object} props
	 *	@param {Object} [opts]
	 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
	 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
	 */
	function setComponentProps(component, props, opts, context, mountAll) {
		if (component._disable) return;
		component._disable = true;

		if (component.__ref = props.ref) delete props.ref;
		if (component.__key = props.key) delete props.key;

		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}

		if (context && context !== component.context) {
			if (!component.prevContext) component.prevContext = component.context;
			component.context = context;
		}

		if (!component.prevProps) component.prevProps = component.props;
		component.props = props;

		component._disable = false;

		if (opts !== 0) {
			if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
				renderComponent(component, 1, mountAll);
			} else {
				enqueueRender(component);
			}
		}

		if (component.__ref) component.__ref(component);
	}

	/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
	 *	@param {Component} component
	 *	@param {Object} [opts]
	 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
	 *	@private
	 */
	function renderComponent(component, opts, mountAll, isChild) {
		if (component._disable) return;

		var props = component.props,
		    state = component.state,
		    context = component.context,
		    previousProps = component.prevProps || props,
		    previousState = component.prevState || state,
		    previousContext = component.prevContext || context,
		    isUpdate = component.base,
		    nextBase = component.nextBase,
		    initialBase = isUpdate || nextBase,
		    initialChildComponent = component._component,
		    skip = false,
		    rendered,
		    inst,
		    cbase;

		// if updating
		if (isUpdate) {
			component.props = previousProps;
			component.state = previousState;
			component.context = previousContext;
			if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
				skip = true;
			} else if (component.componentWillUpdate) {
				component.componentWillUpdate(props, state, context);
			}
			component.props = props;
			component.state = state;
			component.context = context;
		}

		component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
		component._dirty = false;

		if (!skip) {
			rendered = component.render(props, state, context);

			// context to pass to the child, can be updated via (grand-)parent component
			if (component.getChildContext) {
				context = extend(extend({}, context), component.getChildContext());
			}

			var childComponent = rendered && rendered.nodeName,
			    toUnmount,
			    base;

			if (typeof childComponent === 'function') {
				// set up high order component link

				var childProps = getNodeProps(rendered);
				inst = initialChildComponent;

				if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
					setComponentProps(inst, childProps, 1, context, false);
				} else {
					toUnmount = inst;

					component._component = inst = createComponent(childComponent, childProps, context);
					inst.nextBase = inst.nextBase || nextBase;
					inst._parentComponent = component;
					setComponentProps(inst, childProps, 0, context, false);
					renderComponent(inst, 1, mountAll, true);
				}

				base = inst.base;
			} else {
				cbase = initialBase;

				// destroy high order component link
				toUnmount = initialChildComponent;
				if (toUnmount) {
					cbase = component._component = null;
				}

				if (initialBase || opts === 1) {
					if (cbase) cbase._component = null;
					base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
				}
			}

			if (initialBase && base !== initialBase && inst !== initialChildComponent) {
				var baseParent = initialBase.parentNode;
				if (baseParent && base !== baseParent) {
					baseParent.replaceChild(base, initialBase);

					if (!toUnmount) {
						initialBase._component = null;
						recollectNodeTree(initialBase, false);
					}
				}
			}

			if (toUnmount) {
				unmountComponent(toUnmount);
			}

			component.base = base;
			if (base && !isChild) {
				var componentRef = component,
				    t = component;
				while (t = t._parentComponent) {
					(componentRef = t).base = base;
				}
				base._component = componentRef;
				base._componentConstructor = componentRef.constructor;
			}
		}

		if (!isUpdate || mountAll) {
			mounts.unshift(component);
		} else if (!skip) {
			// Ensure that pending componentDidMount() hooks of child components
			// are called before the componentDidUpdate() hook in the parent.
			// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
			// flushMounts();

			if (component.componentDidUpdate) {
				component.componentDidUpdate(previousProps, previousState, previousContext);
			}
			if (options.afterUpdate) options.afterUpdate(component);
		}

		if (component._renderCallbacks != null) {
			while (component._renderCallbacks.length) {
				component._renderCallbacks.pop().call(component);
			}
		}

		if (!diffLevel && !isChild) flushMounts();
	}

	/** Apply the Component referenced by a VNode to the DOM.
	 *	@param {Element} dom	The DOM node to mutate
	 *	@param {VNode} vnode	A Component-referencing VNode
	 *	@returns {Element} dom	The created/mutated element
	 *	@private
	 */
	function buildComponentFromVNode(dom, vnode, context, mountAll) {
		var c = dom && dom._component,
		    originalComponent = c,
		    oldDom = dom,
		    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
		    isOwner = isDirectOwner,
		    props = getNodeProps(vnode);
		while (c && !isOwner && (c = c._parentComponent)) {
			isOwner = c.constructor === vnode.nodeName;
		}

		if (c && isOwner && (!mountAll || c._component)) {
			setComponentProps(c, props, 3, context, mountAll);
			dom = c.base;
		} else {
			if (originalComponent && !isDirectOwner) {
				unmountComponent(originalComponent);
				dom = oldDom = null;
			}

			c = createComponent(vnode.nodeName, props, context);
			if (dom && !c.nextBase) {
				c.nextBase = dom;
				// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
				oldDom = null;
			}
			setComponentProps(c, props, 1, context, mountAll);
			dom = c.base;

			if (oldDom && dom !== oldDom) {
				oldDom._component = null;
				recollectNodeTree(oldDom, false);
			}
		}

		return dom;
	}

	/** Remove a component from the DOM and recycle it.
	 *	@param {Component} component	The Component instance to unmount
	 *	@private
	 */
	function unmountComponent(component) {
		if (options.beforeUnmount) options.beforeUnmount(component);

		var base = component.base;

		component._disable = true;

		if (component.componentWillUnmount) component.componentWillUnmount();

		component.base = null;

		// recursively tear down & recollect high-order component children:
		var inner = component._component;
		if (inner) {
			unmountComponent(inner);
		} else if (base) {
			if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

			component.nextBase = base;

			removeNode(base);
			collectComponent(component);

			removeChildren(base);
		}

		if (component.__ref) component.__ref(null);
	}

	/** Base Component class.
	 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
	 *	@public
	 *
	 *	@example
	 *	class MyFoo extends Component {
	 *		render(props, state) {
	 *			return <div />;
	 *		}
	 *	}
	 */
	function Component(props, context) {
		this._dirty = true;

		/** @public
	  *	@type {object}
	  */
		this.context = context;

		/** @public
	  *	@type {object}
	  */
		this.props = props;

		/** @public
	  *	@type {object}
	  */
		this.state = this.state || {};
	}

	extend(Component.prototype, {

		/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
	  *	@param {object} nextProps
	  *	@param {object} nextState
	  *	@param {object} nextContext
	  *	@returns {Boolean} should the component re-render
	  *	@name shouldComponentUpdate
	  *	@function
	  */

		/** Update component state by copying properties from `state` to `this.state`.
	  *	@param {object} state		A hash of state properties to update with new values
	  *	@param {function} callback	A function to be called once component state is updated
	  */
		setState: function setState(state, callback) {
			var s = this.state;
			if (!this.prevState) this.prevState = extend({}, s);
			extend(s, typeof state === 'function' ? state(s, this.props) : state);
			if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
			enqueueRender(this);
		},


		/** Immediately perform a synchronous re-render of the component.
	  *	@param {function} callback		A function to be called after component is re-rendered.
	  *	@private
	  */
		forceUpdate: function forceUpdate(callback) {
			if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
			renderComponent(this, 2);
		},


		/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
	  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
	  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
	  *	@param {object} state		The component's current state
	  *	@param {object} context		Context object (if a parent component has provided context)
	  *	@returns VNode
	  */
		render: function render() {}
	});

	/** Render JSX into a `parent` Element.
	 *	@param {VNode} vnode		A (JSX) VNode to render
	 *	@param {Element} parent		DOM element to render into
	 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
	 *	@public
	 *
	 *	@example
	 *	// render a div into <body>:
	 *	render(<div id="hello">hello!</div>, document.body);
	 *
	 *	@example
	 *	// render a "Thing" component into #foo:
	 *	const Thing = ({ name }) => <span>{ name }</span>;
	 *	render(<Thing name="one" />, document.querySelector('#foo'));
	 */
	function render(vnode, parent, merge) {
	  return diff(merge, vnode, {}, false, parent, false);
	}



	/***/ }),
	/* 150 */
	/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var NativeCustomEvent = global.CustomEvent;

	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}

	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */

	module.exports = useNative() ? NativeCustomEvent :

	// IE >= 9
	'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :

	// IE <= 8
	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)));

	/***/ }),
	/* 151 */
	/***/ (function(module, exports) {


	/**
	 * Expose `isUrl`.
	 */

	module.exports = isUrl;

	/**
	 * Matcher.
	 */

	var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

	/**
	 * Loosely validate a URL `string`.
	 *
	 * @param {String} string
	 * @return {Boolean}
	 */

	function isUrl(string){
	  return matcher.test(string);
	}


	/***/ }),
	/* 152 */
	/***/ (function(module, exports, __webpack_require__) {


	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	module.exports = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;

	    case 'https':
	    case 'wss':
	    return port !== 443;

	    case 'ftp':
	    return port !== 21;

	    case 'gopher':
	    return port !== 70;

	    case 'file':
	    return false;
	  }

	  return port !== 0;
	};


	/***/ }),
	/* 153 */
	/***/ (function(module, exports, __webpack_require__) {


	var has = Object.prototype.hasOwnProperty;

	/**
	 * Decode a URI encoded string.
	 *
	 * @param {String} input The URI encoded string.
	 * @returns {String} The decoded string.
	 * @api private
	 */
	function decode(input) {
	  return decodeURIComponent(input.replace(/\+/g, ' '));
	}

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;

	  //
	  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
	  // the lastIndex property so we can continue executing this loop until we've
	  // parsed all results.
	  //
	  for (;
	    part = parser.exec(query);
	    result[decode(part[1])] = decode(part[2])
	  );

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = [];

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (var key in obj) {
	    if (has.call(obj, key)) {
	      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	exports.stringify = querystringify;
	exports.parse = querystring;


	/***/ }),
	/* 154 */
	/***/ (function(module, exports, __webpack_require__) {
	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2017, Jon Schlinkert.
	 * Released under the MIT License.
	 */



	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && Array.isArray(val) === false;
	};


	/***/ }),
	/* 155 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_emotion_utils__ = __webpack_require__(106);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis_rule_sheet__ = __webpack_require__(156);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stylis_rule_sheet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stylis_rule_sheet__);



	var hyphenateRegex = /[A-Z]|^ms/g;
	var processStyleName = Object(__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["d" /* memoize */])(function (styleName) {
	  return styleName.replace(hyphenateRegex, '-$&').toLowerCase();
	});
	var processStyleValue = function processStyleValue(key, value) {
	  if (value == null || typeof value === 'boolean') {
	    return '';
	  }

	  if (__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["e" /* unitless */][key] !== 1 && key.charCodeAt(1) !== 45 && // custom properties
	  !isNaN(value) && value !== 0) {
	    return value + 'px';
	  }

	  return value;
	};
	var classnames = function classnames(args) {
	  var len = args.length;
	  var i = 0;
	  var cls = '';

	  for (; i < len; i++) {
	    var arg = args[i];
	    if (arg == null) continue;
	    var toAdd = void 0;

	    switch (typeof arg) {
	      case 'boolean':
	        break;

	      case 'function':
	        toAdd = classnames([arg()]);
	        break;

	      case 'object':
	        {
	          if (Array.isArray(arg)) {
	            toAdd = classnames(arg);
	          } else {
	            toAdd = '';

	            for (var k in arg) {
	              if (arg[k] && k) {
	                toAdd && (toAdd += ' ');
	                toAdd += k;
	              }
	            }
	          }

	          break;
	        }

	      default:
	        {
	          toAdd = arg;
	        }
	    }

	    if (toAdd) {
	      cls && (cls += ' ');
	      cls += toAdd;
	    }
	  }

	  return cls;
	};
	var isBrowser = typeof document !== 'undefined';

	/*

	high performance StyleSheet for css-in-js systems

	- uses multiple style tags behind the scenes for millions of rules
	- uses `insertRule` for appending in production for *much* faster performance
	- 'polyfills' on server side

	// usage

	import StyleSheet from 'glamor/lib/sheet'
	let styleSheet = new StyleSheet()

	styleSheet.inject()
	- 'injects' the stylesheet into the page (or into memory if on server)

	styleSheet.insert('#box { border: 1px solid red; }')
	- appends a css rule into the stylesheet

	styleSheet.flush()
	- empties the stylesheet of all its contents

	*/
	// $FlowFixMe
	function sheetForTag(tag) {
	  if (tag.sheet) {
	    // $FlowFixMe
	    return tag.sheet;
	  } // this weirdness brought to you by firefox


	  for (var i = 0; i < document.styleSheets.length; i++) {
	    if (document.styleSheets[i].ownerNode === tag) {
	      // $FlowFixMe
	      return document.styleSheets[i];
	    }
	  }
	}

	function makeStyleTag(opts) {
	  var tag = document.createElement('style');
	  tag.type = 'text/css';
	  tag.setAttribute('data-emotion', opts.key || '');

	  if (opts.nonce !== undefined) {
	    tag.setAttribute('nonce', opts.nonce);
	  }

	  tag.appendChild(document.createTextNode('')) // $FlowFixMe
	  ;
	  (opts.container !== undefined ? opts.container : document.head).appendChild(tag);
	  return tag;
	}

	function _StyleSheet(options) {
	  this.isSpeedy = "development" === 'production'; // the big drawback here is that the css won't be editable in devtools

	  this.tags = [];
	  this.ctr = 0;
	  this.opts = options;
	}

	function _inject() {
	  if (this.injected) {
	    throw new Error('already injected!');
	  }

	  this.tags[0] = makeStyleTag(this.opts);
	  this.injected = true;
	}

	function _speedy(bool) {
	  if (this.ctr !== 0) {
	    // cannot change speedy mode after inserting any rule to sheet. Either call speedy(${bool}) earlier in your app, or call flush() before speedy(${bool})
	    throw new Error("cannot change speedy now");
	  }

	  this.isSpeedy = !!bool;
	}

	function _insert(rule, sourceMap) {
	  // this is the ultrafast version, works across browsers
	  if (this.isSpeedy) {
	    var tag = this.tags[this.tags.length - 1];
	    var sheet = sheetForTag(tag);

	    try {
	      sheet.insertRule(rule, sheet.cssRules.length);
	    } catch (e) {
	      {
	        console.warn('illegal rule', rule); // eslint-disable-line no-console
	      }
	    }
	  } else {
	    var _tag = makeStyleTag(this.opts);

	    this.tags.push(_tag);

	    _tag.appendChild(document.createTextNode(rule + (sourceMap || '')));
	  }

	  this.ctr++;

	  if (this.ctr % 65000 === 0) {
	    this.tags.push(makeStyleTag(this.opts));
	  }
	}

	function _ref(tag) {
	  return tag.parentNode.removeChild(tag);
	}

	function _flush() {
	  // $FlowFixMe
	  this.tags.forEach(_ref);
	  this.tags = [];
	  this.ctr = 0; // todo - look for remnants in document.styleSheets

	  this.injected = false;
	}

	var StyleSheet =
	/*#__PURE__*/
	function () {
	  var _proto = _StyleSheet.prototype;
	  _proto.inject = _inject;
	  _proto.speedy = _speedy;
	  _proto.insert = _insert;
	  _proto.flush = _flush;
	  return _StyleSheet;
	}();

	function createEmotion(context, options) {
	  if (options === undefined) options = {};
	  var key = options.key || 'css';

	  {
	    if (/[^a-z-]/.test(key)) {
	      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
	    }
	  } // $FlowFixMe


	  var caches = context.__SECRET_EMOTION__;
	  var current;

	  function insertRule(rule) {
	    current += rule;

	    if (isBrowser) {
	      sheet.insert(rule, currentSourceMap);
	    }
	  }

	  var insertionPlugin = __WEBPACK_IMPORTED_MODULE_1_stylis_rule_sheet___default()(insertRule);

	  if (caches === undefined) {
	    var stylisOptions = {
	      keyframe: false,
	      global: false,
	      prefix: options.prefix === undefined ? true : options.prefix,
	      semicolon: true
	    };

	    {
	      stylisOptions.compress = false;
	    }

	    context.__SECRET_EMOTION__ = caches = {
	      registered: {},
	      inserted: {},
	      sheet: new StyleSheet(options),
	      stylis: new __WEBPACK_IMPORTED_MODULE_0_emotion_utils__["b" /* Stylis */](stylisOptions),
	      nonce: options.nonce,
	      key: key
	    };
	    caches.stylis.use(options.stylisPlugins)(insertionPlugin); // 🚀

	    if (isBrowser) {
	      caches.sheet.inject();
	    }
	  }

	  var stylis = caches.stylis;
	  var sheet = caches.sheet;
	  var currentSourceMap = '';

	  function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
	    if (interpolation == null) {
	      return '';
	    }

	    switch (typeof interpolation) {
	      case 'boolean':
	        return '';

	      case 'function':
	        if (interpolation[__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["a" /* STYLES_KEY */]] !== undefined) {
	          var selector = interpolation.toString();

	          if (selector === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	            throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	          }

	          return selector;
	        }

	        return handleInterpolation.call(this, this === undefined ? interpolation() : // $FlowFixMe
	        interpolation(this.mergedProps, this.context), couldBeSelectorInterpolation);

	      case 'object':
	        return createStringFromObject.call(this, interpolation);

	      default:
	        var cached = caches.registered[interpolation];
	        return couldBeSelectorInterpolation === false && cached !== undefined ? cached : interpolation;
	    }
	  }

	  var objectToStringCache = new WeakMap();

	  function createStringFromObject(obj) {
	    if (objectToStringCache.has(obj)) {
	      // $FlowFixMe
	      return objectToStringCache.get(obj);
	    }

	    var string = '';

	    function _ref(interpolation) {
	      string += handleInterpolation.call(this, interpolation, false);
	    }

	    function _ref2(key) {
	      if (typeof obj[key] !== 'object') {
	        if (caches.registered[obj[key]] !== undefined) {
	          string += key + "{" + caches.registered[obj[key]] + "}";
	        } else {
	          string += processStyleName(key) + ":" + processStyleValue(key, obj[key]) + ";";
	        }
	      } else {
	        if (key === 'NO_COMPONENT_SELECTOR' && "development" !== 'production') {
	          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
	        }

	        string += key + "{" + handleInterpolation.call(this, obj[key], false) + "}";
	      }
	    }

	    if (Array.isArray(obj)) {
	      obj.forEach(_ref, this);
	    } else {
	      Object.keys(obj).forEach(_ref2, this);
	    }

	    objectToStringCache.set(obj, string);
	    return string;
	  }

	  var name;
	  var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;

	  var createStyles = function createStyles(strings) {
	    var stringMode = true;
	    var styles = '';
	    var identifierName = '';

	    if (strings == null || strings.raw === undefined) {
	      stringMode = false;
	      styles += handleInterpolation.call(this, strings, false);
	    } else {
	      styles += strings[0];
	    }

	    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      interpolations[_key - 1] = arguments[_key];
	    }

	    interpolations.forEach(function (interpolation, i) {
	      styles += handleInterpolation.call(this, interpolation, styles.charCodeAt(styles.length - 1) === 46 // .
	      );

	      if (stringMode === true && strings[i + 1] !== undefined) {
	        styles += strings[i + 1];
	      }
	    }, this);
	    styles = styles.replace(labelPattern, function (match, p1) {
	      identifierName += "-" + p1;
	      return '';
	    });
	    name = Object(__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["c" /* hashString */])(styles + identifierName) + identifierName;
	    return styles;
	  };

	  {
	    var sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
	    var oldStylis = stylis;

	    stylis = function stylis(selector, styles) {
	      var result = sourceMapRegEx.exec(styles);
	      currentSourceMap = result ? result[0] : '';
	      oldStylis(selector, styles);
	      currentSourceMap = '';
	    };
	  }

	  function insert(scope, styles) {
	    if (caches.inserted[name] === undefined) {
	      current = '';
	      stylis(scope, styles);
	      caches.inserted[name] = current;
	    }
	  }

	  var css = function css() {
	    var styles = createStyles.apply(this, arguments);
	    var selector = key + "-" + name;

	    if (caches.registered[selector] === undefined) {
	      caches.registered[selector] = styles;
	    }

	    insert("." + selector, styles);
	    return selector;
	  };

	  var keyframes = function keyframes() {
	    var styles = createStyles.apply(this, arguments);
	    var animation = "animation-" + name;
	    insert('', "@keyframes " + animation + "{" + styles + "}");
	    return animation;
	  };

	  var injectGlobal = function injectGlobal() {
	    var styles = createStyles.apply(this, arguments);
	    insert('', styles);
	  };

	  function getRegisteredStyles(registeredStyles, classNames) {
	    var rawClassName = '';
	    classNames.split(' ').forEach(function (className) {
	      if (caches.registered[className] !== undefined) {
	        registeredStyles.push(className);
	      } else {
	        rawClassName += className + " ";
	      }
	    });
	    return rawClassName;
	  }

	  function merge(className, sourceMap) {
	    var registeredStyles = [];
	    var rawClassName = getRegisteredStyles(registeredStyles, className);

	    if (registeredStyles.length < 2) {
	      return className;
	    }

	    return rawClassName + css(registeredStyles, sourceMap);
	  }

	  function cx() {
	    for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      classNames[_key2] = arguments[_key2];
	    }

	    return merge(classnames(classNames));
	  }

	  function hydrateSingleId(id) {
	    caches.inserted[id] = true;
	  }

	  function hydrate(ids) {
	    ids.forEach(hydrateSingleId);
	  }

	  function flush() {
	    if (isBrowser) {
	      sheet.flush();
	      sheet.inject();
	    }

	    caches.inserted = {};
	    caches.registered = {};
	  }

	  function _ref3(node) {
	    // $FlowFixMe
	    sheet.tags[0].parentNode.insertBefore(node, sheet.tags[0]); // $FlowFixMe

	    node.getAttribute("data-emotion-" + key).split(' ').forEach(hydrateSingleId);
	  }

	  if (isBrowser) {
	    var chunks = document.querySelectorAll("[data-emotion-" + key + "]");
	    Array.prototype.forEach.call(chunks, _ref3);
	  }

	  var emotion = {
	    flush: flush,
	    hydrate: hydrate,
	    cx: cx,
	    merge: merge,
	    getRegisteredStyles: getRegisteredStyles,
	    injectGlobal: injectGlobal,
	    keyframes: keyframes,
	    css: css,
	    sheet: sheet,
	    caches: caches
	  };
	  return emotion;
	}

	/* harmony default export */ __webpack_exports__["default"] = (createEmotion);


	/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(28)));

	/***/ }),
	/* 156 */
	/***/ (function(module, exports, __webpack_require__) {

	(function (factory) {
		 module['exports'] = factory();
	}(function () {

		return function (insertRule) {
			var delimiter = '/*|*/';
			var needle = delimiter+'}';

			function toSheet (block) {
				if (block)
					try {
						insertRule(block + '}');
					} catch (e) {}
			}

			return function ruleSheet (context, content, selectors, parents, line, column, length, at, depth) {
				switch (context) {
					// property
					case 1:
						// @import
						if (depth === 0 && content.charCodeAt(0) === 64)
							insertRule(content);
						break
					// selector
					case 2:
						if (at === 0)
							return content + delimiter
						break
					// at-rule
					case 3:
						switch (at) {
							// @font-face, @page
							case 102:
							case 112:
								return insertRule(selectors[0]+content), ''
							default:
								return content + delimiter
						}
					case -2:
						content.split(needle).forEach(toSheet);
				}
			}
		}
	}));


	/***/ }),
	/* 157 */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
	/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_emotion_utils__ = __webpack_require__(106);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(32);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var channel = '__EMOTION_THEMING__';

	var _contextTypes;

	var contextTypes = (_contextTypes = {}, _contextTypes[channel] = __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, _contextTypes);

	function setTheme(theme) {
	  this.setState({
	    theme: theme
	  });
	}
	var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|accept|acceptCharset|accessKey|action|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan)|(on[A-Z].*)|((data|aria)-.*))$/;
	var testOmitPropsOnStringTag = Object(__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["d" /* memoize */])(function (key) {
	  return reactPropsRegex.test(key);
	});
	var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
	  return key !== 'theme' && key !== 'innerRef';
	};
	var testAlwaysTrue = function testAlwaysTrue() {
	  return true;
	};
	var omitAssign = function omitAssign(testFn, target) {
	  var i = 2;
	  var length = arguments.length;

	  for (; i < length; i++) {
	    var source = arguments[i];

	    var _key = void 0;

	    for (_key in source) {
	      if (testFn(_key)) {
	        target[_key] = source[_key];
	      }
	    }
	  }

	  return target;
	};

	function _componentWillMount() {
	  if (this.context[channel] !== undefined) {
	    this.unsubscribe = this.context[channel].subscribe(setTheme.bind(this));
	  }
	}

	function _componentWillUnmount() {
	  if (this.unsubscribe !== undefined) {
	    this.context[channel].unsubscribe(this.unsubscribe);
	  }
	}

	function _get(target, property) {
	  switch (property) {
	    // react-hot-loader tries to access this stuff
	    case '__proto__':
	    case 'name':
	    case 'prototype':
	    case 'displayName':
	      {
	        return target[property];
	      }

	    default:
	      {
	        throw new Error("You're trying to use the styled shorthand without babel-plugin-emotion." + ("\nPlease install and setup babel-plugin-emotion or use the function call syntax(`styled('" + property + "')` instead of `styled." + property + "`)"));
	      }
	  }
	}

	function createEmotionStyled(emotion, view) {
	  var _createStyled = function createStyled(tag, options) {
	    {
	      if (tag === undefined) {
	        throw new Error('You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.');
	      }
	    }

	    var staticClassName;
	    var identifierName;
	    var stableClassName;

	    if (options !== undefined) {
	      staticClassName = options.e;
	      identifierName = options.label;
	      stableClassName = options.target;
	    }

	    var isReal = tag.__emotion_real === tag;
	    var baseTag = staticClassName === undefined ? isReal && tag.__emotion_base || tag : tag;
	    var omitFn = typeof baseTag === 'string' && baseTag.charAt(0) === baseTag.charAt(0).toLowerCase() ? testOmitPropsOnStringTag : testOmitPropsOnComponent;

	    function _value() {
	      if (stableClassName === undefined) {
	        return 'NO_COMPONENT_SELECTOR';
	      }

	      return "." + stableClassName;
	    }

	    return function () {
	      var args = arguments;
	      var styles = isReal && tag[__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["a" /* STYLES_KEY */]] !== undefined ? tag[__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["a" /* STYLES_KEY */]].slice(0) : [];

	      if (identifierName !== undefined) {
	        styles.push("label:" + identifierName + ";");
	      }

	      if (staticClassName === undefined) {
	        if (args[0] == null || args[0].raw === undefined) {
	          styles.push.apply(styles, args);
	        } else {
	          styles.push(args[0][0]);
	          var len = args.length;
	          var i = 1;

	          for (; i < len; i++) {
	            styles.push(args[i], args[0][i]);
	          }
	        }
	      }

	      function _render() {
	        var props = this.props,
	            state = this.state;
	        this.mergedProps = omitAssign(testAlwaysTrue, {}, props, {
	          theme: state !== null && state.theme || props.theme || {}
	        });
	        var className = '';
	        var classInterpolations = [];

	        if (props.className) {
	          if (staticClassName === undefined) {
	            className += emotion.getRegisteredStyles(classInterpolations, props.className);
	          } else {
	            className += props.className + " ";
	          }
	        }

	        if (staticClassName === undefined) {
	          className += emotion.css.apply(this, styles.concat(classInterpolations));
	        } else {
	          className += staticClassName;
	        }

	        if (stableClassName !== undefined) {
	          className += " " + stableClassName;
	        }

	        return view.createElement(baseTag, omitAssign(omitFn, {}, props, {
	          className: className,
	          ref: props.innerRef
	        }));
	      }

	      var Styled =
	      /*#__PURE__*/
	      function (_view$Component) {
	        _inheritsLoose(Styled, _view$Component);

	        function Styled() {
	          return _view$Component.apply(this, arguments) || this;
	        }

	        var _proto = Styled.prototype;
	        _proto.componentWillMount = _componentWillMount;
	        _proto.componentWillUnmount = _componentWillUnmount;
	        _proto.render = _render;
	        return Styled;
	      }(view.Component);

	      Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
	      Styled.contextTypes = contextTypes;
	      Styled[__WEBPACK_IMPORTED_MODULE_0_emotion_utils__["a" /* STYLES_KEY */]] = styles;
	      Styled.__emotion_base = baseTag;
	      Styled.__emotion_real = Styled;
	      Object.defineProperty(Styled, 'toString', {
	        enumerable: false,
	        value: _value
	      });

	      Styled.withComponent = function (nextTag, nextOptions) {
	        return _createStyled(nextTag, nextOptions !== undefined ? // $FlowFixMe
	        omitAssign(testAlwaysTrue, {}, options, nextOptions) : options).apply(void 0, args);
	      };

	      return Styled;
	    };
	  };

	  if (typeof Proxy !== 'undefined') {
	    _createStyled = new Proxy(_createStyled, {
	      get: _get
	    });
	  }

	  return _createStyled;
	}

	/* harmony default export */ __webpack_exports__["default"] = (createEmotionStyled);


	/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(28)));

	/***/ }),
	/* 158 */
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.9.1
	(function() {
	  var getScrollbarWidth, scrollbarWidth;

	  scrollbarWidth = null;

	  getScrollbarWidth = function(recalculate) {
	    var div1, div2;
	    if (recalculate == null) {
	      recalculate = false;
	    }
	    if ((scrollbarWidth != null) && !recalculate) {
	      return scrollbarWidth;
	    }
	    if (document.readyState === 'loading') {
	      return null;
	    }
	    div1 = document.createElement('div');
	    div2 = document.createElement('div');
	    div1.style.width = div2.style.width = div1.style.height = div2.style.height = '100px';
	    div1.style.overflow = 'scroll';
	    div2.style.overflow = 'hidden';
	    document.body.appendChild(div1);
	    document.body.appendChild(div2);
	    scrollbarWidth = Math.abs(div1.scrollHeight - div2.scrollHeight);
	    document.body.removeChild(div1);
	    document.body.removeChild(div2);
	    return scrollbarWidth;
	  };

	  {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
	      return getScrollbarWidth;
	    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }

	}).call(this);


	/***/ }),
	/* 159 */
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2011-2014 Felix Gnass
	 * Licensed under the MIT license
	 * http://spin.js.org/
	 *
	 * Example:
	    var opts = {
	      lines: 12             // The number of lines to draw
	    , length: 7             // The length of each line
	    , width: 5              // The line thickness
	    , radius: 10            // The radius of the inner circle
	    , scale: 1.0            // Scales overall size of the spinner
	    , corners: 1            // Roundness (0..1)
	    , color: '#000'         // #rgb or #rrggbb
	    , opacity: 1/4          // Opacity of the lines
	    , rotate: 0             // Rotation offset
	    , direction: 1          // 1: clockwise, -1: counterclockwise
	    , speed: 1              // Rounds per second
	    , trail: 100            // Afterglow percentage
	    , fps: 20               // Frames per second when using setTimeout()
	    , zIndex: 2e9           // Use a high z-index by default
	    , className: 'spinner'  // CSS class to assign to the element
	    , top: '50%'            // center vertically
	    , left: '50%'           // center horizontally
	    , shadow: false         // Whether to render a shadow
	    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	    , position: 'absolute'  // Element positioning
	    }
	    var target = document.getElementById('foo')
	    var spinner = new Spinner(opts).spin(target)
	 */
	(function (root, factory) {

	  /* CommonJS */
	  if (typeof module == 'object' && module.exports) module.exports = factory();

	  /* AMD module */
	  else !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
					__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
					(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
					__WEBPACK_AMD_DEFINE_FACTORY__),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(this, function () {

	  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
	    , animations = {} /* Animation rules keyed by their name */
	    , useCssAnimations /* Whether to use CSS animations or setTimeout */
	    , sheet; /* A stylesheet to hold the @keyframe or VML rules. */

	  /**
	   * Utility function to create elements. If no tag name is given,
	   * a DIV is created. Optionally properties can be passed.
	   */
	  function createEl (tag, prop) {
	    var el = document.createElement(tag || 'div')
	      , n;

	    for (n in prop) el[n] = prop[n];
	    return el
	  }

	  /**
	   * Appends children and returns the parent.
	   */
	  function ins (parent /* child1, child2, ...*/) {
	    for (var i = 1, n = arguments.length; i < n; i++) {
	      parent.appendChild(arguments[i]);
	    }

	    return parent
	  }

	  /**
	   * Creates an opacity keyframe animation rule and returns its name.
	   * Since most mobile Webkits have timing issues with animation-delay,
	   * we create separate rules for each line/segment.
	   */
	  function addAnimation (alpha, trail, i, lines) {
	    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
	      , start = 0.01 + i/lines * 100
	      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
	      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
	      , pre = prefix && '-' + prefix + '-' || '';

	    if (!animations[name]) {
	      sheet.insertRule(
	        '@' + pre + 'keyframes ' + name + '{' +
	        '0%{opacity:' + z + '}' +
	        start + '%{opacity:' + alpha + '}' +
	        (start+0.01) + '%{opacity:1}' +
	        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
	        '100%{opacity:' + z + '}' +
	        '}', sheet.cssRules.length);

	      animations[name] = 1;
	    }

	    return name
	  }

	  /**
	   * Tries various vendor prefixes and returns the first supported property.
	   */
	  function vendor (el, prop) {
	    var s = el.style
	      , pp
	      , i;

	    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
	    if (s[prop] !== undefined) return prop
	    for (i = 0; i < prefixes.length; i++) {
	      pp = prefixes[i]+prop;
	      if (s[pp] !== undefined) return pp
	    }
	  }

	  /**
	   * Sets multiple style properties at once.
	   */
	  function css (el, prop) {
	    for (var n in prop) {
	      el.style[vendor(el, n) || n] = prop[n];
	    }

	    return el
	  }

	  /**
	   * Fills in default values.
	   */
	  function merge (obj) {
	    for (var i = 1; i < arguments.length; i++) {
	      var def = arguments[i];
	      for (var n in def) {
	        if (obj[n] === undefined) obj[n] = def[n];
	      }
	    }
	    return obj
	  }

	  /**
	   * Returns the line color from the given string or array.
	   */
	  function getColor (color, idx) {
	    return typeof color == 'string' ? color : color[idx % color.length]
	  }

	  // Built-in defaults

	  var defaults = {
	    lines: 12             // The number of lines to draw
	  , length: 7             // The length of each line
	  , width: 5              // The line thickness
	  , radius: 10            // The radius of the inner circle
	  , scale: 1.0            // Scales overall size of the spinner
	  , corners: 1            // Roundness (0..1)
	  , color: '#000'         // #rgb or #rrggbb
	  , opacity: 1/4          // Opacity of the lines
	  , rotate: 0             // Rotation offset
	  , direction: 1          // 1: clockwise, -1: counterclockwise
	  , speed: 1              // Rounds per second
	  , trail: 100            // Afterglow percentage
	  , fps: 20               // Frames per second when using setTimeout()
	  , zIndex: 2e9           // Use a high z-index by default
	  , className: 'spinner'  // CSS class to assign to the element
	  , top: '50%'            // center vertically
	  , left: '50%'           // center horizontally
	  , shadow: false         // Whether to render a shadow
	  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	  , position: 'absolute'  // Element positioning
	  };

	  /** The constructor */
	  function Spinner (o) {
	    this.opts = merge(o || {}, Spinner.defaults, defaults);
	  }

	  // Global defaults that override the built-ins:
	  Spinner.defaults = {};

	  merge(Spinner.prototype, {
	    /**
	     * Adds the spinner to the given target element. If this instance is already
	     * spinning, it is automatically removed from its previous target b calling
	     * stop() internally.
	     */
	    spin: function (target) {
	      this.stop();

	      var self = this
	        , o = self.opts
	        , el = self.el = createEl(null, {className: o.className});

	      css(el, {
	        position: o.position
	      , width: 0
	      , zIndex: o.zIndex
	      , left: o.left
	      , top: o.top
	      });

	      if (target) {
	        target.insertBefore(el, target.firstChild || null);
	      }

	      el.setAttribute('role', 'progressbar');
	      self.lines(el, self.opts);

	      if (!useCssAnimations) {
	        // No CSS animation support, use setTimeout() instead
	        var i = 0
	          , start = (o.lines - 1) * (1 - o.direction) / 2
	          , alpha
	          , fps = o.fps
	          , f = fps / o.speed
	          , ostep = (1 - o.opacity) / (f * o.trail / 100)
	          , astep = f / o.lines

	        ;(function anim () {
	          i++;
	          for (var j = 0; j < o.lines; j++) {
	            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);

	            self.opacity(el, j * o.direction + start, alpha, o);
	          }
	          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
	        })();
	      }
	      return self
	    }

	    /**
	     * Stops and removes the Spinner.
	     */
	  , stop: function () {
	      var el = this.el;
	      if (el) {
	        clearTimeout(this.timeout);
	        if (el.parentNode) el.parentNode.removeChild(el);
	        this.el = undefined;
	      }
	      return this
	    }

	    /**
	     * Internal method that draws the individual lines. Will be overwritten
	     * in VML fallback mode below.
	     */
	  , lines: function (el, o) {
	      var i = 0
	        , start = (o.lines - 1) * (1 - o.direction) / 2
	        , seg;

	      function fill (color, shadow) {
	        return css(createEl(), {
	          position: 'absolute'
	        , width: o.scale * (o.length + o.width) + 'px'
	        , height: o.scale * o.width + 'px'
	        , background: color
	        , boxShadow: shadow
	        , transformOrigin: 'left'
	        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
	        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
	        })
	      }

	      for (; i < o.lines; i++) {
	        seg = css(createEl(), {
	          position: 'absolute'
	        , top: 1 + ~(o.scale * o.width / 2) + 'px'
	        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
	        , opacity: o.opacity
	        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
	        });

	        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}));
	        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')));
	      }
	      return el
	    }

	    /**
	     * Internal method that adjusts the opacity of a single line.
	     * Will be overwritten in VML fallback mode below.
	     */
	  , opacity: function (el, i, val) {
	      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
	    }

	  });


	  function initVML () {

	    /* Utility function to create a VML tag */
	    function vml (tag, attr) {
	      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
	    }

	    // No CSS transforms but VML support, add a CSS rule for VML elements:
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

	    Spinner.prototype.lines = function (el, o) {
	      var r = o.scale * (o.length + o.width)
	        , s = o.scale * 2 * r;

	      function grp () {
	        return css(
	          vml('group', {
	            coordsize: s + ' ' + s
	          , coordorigin: -r + ' ' + -r
	          })
	        , { width: s, height: s }
	        )
	      }

	      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
	        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
	        , i;

	      function seg (i, dx, filter) {
	        ins(
	          g
	        , ins(
	            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
	          , ins(
	              css(
	                vml('roundrect', {arcsize: o.corners})
	              , { width: r
	                , height: o.scale * o.width
	                , left: o.scale * o.radius
	                , top: -o.scale * o.width >> 1
	                , filter: filter
	                }
	              )
	            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
	            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
	            )
	          )
	        );
	      }

	      if (o.shadow)
	        for (i = 1; i <= o.lines; i++) {
	          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
	        }

	      for (i = 1; i <= o.lines; i++) seg(i);
	      return ins(el, g)
	    };

	    Spinner.prototype.opacity = function (el, i, val, o) {
	      var c = el.firstChild;
	      o = o.shadow && o.lines || 0;
	      if (c && i + o < c.childNodes.length) {
	        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild;
	        if (c) c.opacity = val;
	      }
	    };
	  }

	  if (typeof document !== 'undefined') {
	    sheet = (function () {
	      var el = createEl('style', {type : 'text/css'});
	      ins(document.getElementsByTagName('head')[0], el);
	      return el.sheet || el.styleSheet
	    }());

	    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'});

	    if (!vendor(probe, 'transform') && probe.adj) initVML();
	    else useCssAnimations = vendor(probe, 'animation');
	  }

	  return Spinner

	}));


	/***/ }),
	/* 160 */
	/***/ (function(module, exports) {

	module.exports = "data:image/gif;base64,R0lGODlhEQARAIAAAODn7P///yH5BAEHAAEALAAAAAARABEAAAIqBIKpab3v3EMyVHWtWZluf0za0XFNKDJfCq5i5JpomdUxqKLQVmInqyoAADs=";

	/***/ }),
	/* 161 */
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
					__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
					(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	})(this, function (exports, module) {

	  var defaultOptions = {
	    timeout: 5000,
	    jsonpCallback: 'callback',
	    jsonpCallbackFunction: null
	  };

	  function generateCallbackFunction() {
	    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
	  }

	  function clearFunction(functionName) {
	    // IE8 throws an exception when you try to delete a property on window
	    // http://stackoverflow.com/a/1824228/751089
	    try {
	      delete window[functionName];
	    } catch (e) {
	      window[functionName] = undefined;
	    }
	  }

	  function removeScript(scriptId) {
	    var script = document.getElementById(scriptId);
	    if (script) {
	      document.getElementsByTagName('head')[0].removeChild(script);
	    }
	  }

	  function fetchJsonp(_url) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    // to avoid param reassign
	    var url = _url;
	    var timeout = options.timeout || defaultOptions.timeout;
	    var jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;

	    var timeoutId = undefined;

	    return new Promise(function (resolve, reject) {
	      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
	      var scriptId = jsonpCallback + '_' + callbackFunction;

	      window[callbackFunction] = function (response) {
	        resolve({
	          ok: true,
	          // keep consistent with fetch API
	          json: function json() {
	            return Promise.resolve(response);
	          }
	        });

	        if (timeoutId) clearTimeout(timeoutId);

	        removeScript(scriptId);

	        clearFunction(callbackFunction);
	      };

	      // Check if the user set their own params, and if not add a ? to start a list of params
	      url += url.indexOf('?') === -1 ? '?' : '&';

	      var jsonpScript = document.createElement('script');
	      jsonpScript.setAttribute('src', '' + url + jsonpCallback + '=' + callbackFunction);
	      if (options.charset) {
	        jsonpScript.setAttribute('charset', options.charset);
	      }
	      jsonpScript.id = scriptId;
	      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

	      timeoutId = setTimeout(function () {
	        reject(new Error('JSONP request to ' + _url + ' timed out'));

	        clearFunction(callbackFunction);
	        removeScript(scriptId);
	        window[callbackFunction] = function () {
	          clearFunction(callbackFunction);
	        };
	      }, timeout);

	      // Caught if got 404/500
	      jsonpScript.onerror = function () {
	        reject(new Error('JSONP request to ' + _url + ' failed'));

	        clearFunction(callbackFunction);
	        removeScript(scriptId);
	        if (timeoutId) clearTimeout(timeoutId);
	      };
	    });
	  }

	  // export as global function
	  /*
	  let local;
	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }
	  local.fetchJsonp = fetchJsonp;
	  */

	  module.exports = fetchJsonp;
	});

	/***/ }),
	/* 162 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = makeWidget;

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(18);

	var _utilities = __webpack_require__(29);

	var _widget = __webpack_require__(163);

	var _widget2 = _interopRequireDefault(_widget);

	var _placeholder = __webpack_require__(164);

	var _placeholder2 = _interopRequireDefault(_placeholder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultOptions = {
	  mode: 'embed-widget',
	  hideFooter: false,
	  hideHeaders: false,
	  hideScrollbars: false,
	  disableSubmit: false,
	  onSubmit: _utilities.noop
	};

	var queryStringKeys = {
	  mode: 'typeform-embed',
	  hideFooter: 'embed-hide-footer',
	  hideHeaders: 'embed-hide-headers',
	  opacity: 'embed-opacity',
	  disableSubmit: '__dangerous-disable-submissions'
	};

	function makeWidget(element, url, options) {
	  options = _extends({}, defaultOptions, options);

	  if ((0, _utilities.isMobile)(navigator.userAgent)) {
	    var urlWithQueryString = (0, _utilities.appendParamsToUrl)(url, (0, _utilities.replaceExistingKeys)(options, Object.assign({}, queryStringKeys, { opacity: undefined })));
	    (0, _utilities.ensureMetaViewport)();
	    (0, _reactDom.render)(_react2.default.createElement(_placeholder2.default, {
	      url: urlWithQueryString,
	      buttonText: options.buttonText,
	      autoOpen: options.autoOpen,
	      onSubmit: options.onSubmit
	    }), element);
	  } else {
	    var _urlWithQueryString = (0, _utilities.appendParamsToUrl)(url, (0, _utilities.replaceExistingKeys)(options, queryStringKeys));
	    (0, _reactDom.render)(_react2.default.createElement(_widget2.default, { url: _urlWithQueryString, options: options }), element);
	  }
	}

	/***/ }),
	/* 163 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(32);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _styles = __webpack_require__(54);

	var _styles2 = _interopRequireDefault(_styles);

	var _tinycolor = __webpack_require__(108);

	var _tinycolor2 = _interopRequireDefault(_tinycolor);

	var _utilities = __webpack_require__(29);

	var _iframe = __webpack_require__(73);

	var _iframe2 = _interopRequireDefault(_iframe);

	var _spinner = __webpack_require__(72);

	var _spinner2 = _interopRequireDefault(_spinner);

	var _dataService = __webpack_require__(74);

	var _dataService2 = _interopRequireDefault(_dataService);

	var _store = __webpack_require__(75);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DEBOUNCE_WAIT = 200;
	var TRANSPARENT = 'transparent';

	var WidgetWrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e12baen60'
	})('height:100%;position:relative;');

	var IframeWrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e12baen61'
	})('height:100%;visibility:', function (p) {
	  return p.open ? 'visible' : 'hidden';
	}, ';');

	var hiddenSpinner = /*#__PURE__*/(0, _styles.css)('transition:visibility 0s 0.25s,opacity 0.25s linear;visibility:hidden;opacity:0;');

	var SpinnerWrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'e12baen62'
	})('width:100%;height:100%;position:absolute;background-color:', function (p) {
	  return p.bgColor;
	}, ';', function (p) {
	  return p.visible ? '' : hiddenSpinner;
	}, ';');

	var Widget = function (_Component) {
	  _inherits(Widget, _Component);

	  function Widget(props) {
	    _classCallCheck(this, Widget);

	    var _this = _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this, props));

	    _this.state = {
	      form: {
	        'primary-color': 'ffffff',
	        'background-color': TRANSPARENT
	      },
	      iframeLoaded: false,
	      spinnerVisible: true,
	      isFormReady: false,
	      isIframeFocused: false
	    };

	    _this.onFormReady = _this.onFormReady.bind(_this);
	    _this.onIframeLoad = _this.onIframeLoad.bind(_this);
	    _this.focusIframe = _this.focusIframe.bind(_this);
	    _this.debouncedScroll = (0, _utilities.debounce)(_this.focusIframe, DEBOUNCE_WAIT, _this);
	    _this.onFormSubmit = _this.onFormSubmit.bind(_this);
	    return _this;
	  }

	  _createClass(Widget, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      var uid = _dataService2.default.getUidFromURL(this.props.url);
	      _dataService2.default.getFormData(uid, _utilities.DOMAIN).then(function (resp) {
	        return (0, _store2.default)(uid, '', _this2.props.url, '', resp);
	      }).then(function (data) {
	        _this2.setState({ form: data.form });
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('message', _utilities.onMessage);
	      window.addEventListener('form-ready', this.onFormReady);
	      window.addEventListener('scroll', this.debouncedScroll);
	      window.addEventListener('form-submit', this.onFormSubmit);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('message', _utilities.onMessage);
	      window.removeEventListener('form-ready', this.onFormReady);
	      window.removeEventListener('scroll', this.debouncedScroll);
	      window.removeEventListener('form-submit', this.onFormSubmit);
	    }
	  }, {
	    key: 'onFormReady',
	    value: function onFormReady() {
	      var _this3 = this;

	      this.setState({
	        isFormReady: true
	      }, function () {
	        _this3.focusIframe();
	      });
	    }
	  }, {
	    key: 'onFormSubmit',
	    value: function onFormSubmit() {
	      var onSubmit = this.props.options.onSubmit;

	      onSubmit();
	    }
	  }, {
	    key: 'onIframeLoad',
	    value: function onIframeLoad() {
	      var _this4 = this;

	      this.setState({
	        iframeLoaded: true
	      }, function () {
	        setTimeout(function () {
	          _this4.setState({
	            spinnerVisible: false
	          });
	        }, 300);
	      });
	    }
	  }, {
	    key: 'focusIframe',
	    value: function focusIframe() {
	      var iframeRef = this.iframe.iframeRef;


	      if (!iframeRef || !iframeRef.contentWindow) {
	        return;
	      }

	      var isIframeInViewport = (0, _utilities.isElementInViewport)(iframeRef);
	      var canPostMessage = this.state.isFormReady && !this.state.isIframeFocused && isIframeInViewport && iframeRef.contentWindow != null;

	      if (canPostMessage) {
	        iframeRef.contentWindow.postMessage('embed-focus', '*');
	        this.setState({
	          isIframeFocused: true
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      var _state = this.state,
	          form = _state.form,
	          iframeLoaded = _state.iframeLoaded,
	          spinnerVisible = _state.spinnerVisible;


	      var bgColor = void 0;
	      if (form['background-color'] !== TRANSPARENT) {
	        bgColor = (0, _tinycolor2.default)('#' + form['background-color']).setAlpha(this.props.options.opacity / 100).toRgbString();
	      } else {
	        bgColor = '#' + form['background-color'];
	      }

	      var spinnerConfig = {
	        color: '#' + form['primary-color']
	      };

	      return _react2.default.createElement(
	        WidgetWrapper,
	        null,
	        _react2.default.createElement(
	          SpinnerWrapper,
	          {
	            visible: spinnerVisible,
	            bgColor: bgColor },
	          _react2.default.createElement(_spinner2.default, {
	            config: spinnerConfig,
	            stopped: iframeLoaded
	          })
	        ),
	        _react2.default.createElement(
	          IframeWrapper,
	          { open: !spinnerVisible },
	          _react2.default.createElement(_iframe2.default, {
	            ref: function ref(node) {
	              _this5.iframe = node;
	            },
	            width: '100%',
	            height: '100%',
	            frameBorder: '0',
	            src: this.props.url,
	            onLoad: this.onIframeLoad
	          })
	        )
	      );
	    }
	  }]);

	  return Widget;
	}(_react.Component);

	Widget.propTypes = {
	  url: _propTypes2.default.string,
	  options: _propTypes2.default.object
	};

	Widget.defaultProps = {
	  options: {}
	};

	exports.default = Widget;

	/***/ }),
	/* 164 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(18);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(32);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _styles = __webpack_require__(54);

	var _styles2 = _interopRequireDefault(_styles);

	var _mobileModal = __webpack_require__(107);

	var _mobileModal2 = _interopRequireDefault(_mobileModal);

	var _spinner = __webpack_require__(72);

	var _spinner2 = _interopRequireDefault(_spinner);

	var _createPalette = __webpack_require__(165);

	var _createPalette2 = _interopRequireDefault(_createPalette);

	var _webfontloader = __webpack_require__(166);

	var _webfontloader2 = _interopRequireDefault(_webfontloader);

	var _dataService = __webpack_require__(74);

	var _dataService2 = _interopRequireDefault(_dataService);

	var _store2 = __webpack_require__(75);

	var _store3 = _interopRequireDefault(_store2);

	var _utilities = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TYPE = 'widget';

	var Wrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'euxg6n90'
	})('position:relative;height:100%;background-color:', function (p) {
	  return p.isBackgroundBright ? 'white' : 'black';
	}, ';');

	var Title = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'euxg6n91'
	})('position:absolute;top:calc(50% - 50px);width:100%;text-align:center;z-index:2;line-height:1;color:', function (p) {
	  return p.color || '#FFF';
	}, ';font-family:', function (p) {
	  return p.font ? '"' + p.font + '",' : '';
	}, ' "Source Sans Pro",sans-serif;font-size:30px;@media only screen and (min-width:600px){font-size:60px;}');

	var Button = /*#__PURE__*/(0, _styles2.default)('button', {
	  target: 'euxg6n92'
	})('position:absolute;top:auto;bottom:20px;left:20px;width:calc(100% - 40px);font-size:30px;z-index:5;display:block;border-radius:3px;outline:none;height:61px;-moz-border-radius:3px;font-weight:bold;overflow:hidden;transition:background-color ease-out 100ms 0ms;white-space:nowrap;text-overflow:ellipsis;padding-left:12px;padding-right:12px;background-color:', function (p) {
	  return p.backgroundColor || '#bbb';
	}, ';color:', function (p) {
	  return p.color || 'rgba(0, 0, 0, 0.8)';
	}, ';border:1px solid ', function (p) {
	  return p.borderColor || '#333';
	}, ';font-family:', function (p) {
	  return p.font ? '"' + p.font + '",' : '';
	}, ' "Source Sans Pro",sans-serif;&:active{box-shadow:inset 0 2px 1px rgba(0,0,0,0.4),inset #000000 0 0 210px -100px;}');

	var Background = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'euxg6n93'
	})('position:absolute;z-index:1;left:0;right:0;top:0;bottom:0;background-color:', function (p) {
	  return p.backgroundColor || 'transparent';
	}, ';background-image:', function (p) {
	  return p.image ? 'url(' + p.image + ')' : 'none';
	}, ';background-repeat:', function (p) {
	  return p.backgroundRepeat;
	}, ';opacity:', function (p) {
	  return p.image ? 1 - p.brightness : 1;
	}, ';');

	var SpinnerWrapper = /*#__PURE__*/(0, _styles2.default)('div', {
	  target: 'euxg6n94'
	})('width:100%;height:100%;position:relative;background-color:transparent;');

	var Placeholder = function (_Component) {
	  _inherits(Placeholder, _Component);

	  function Placeholder(props) {
	    _classCallCheck(this, Placeholder);

	    var _this = _possibleConstructorReturn(this, (Placeholder.__proto__ || Object.getPrototypeOf(Placeholder)).call(this, props));

	    _this.state = {
	      open: !!_this.props.autoOpen,
	      form: {
	        name: 'Typeform',
	        'font-google': 'sans-serif',
	        'primary-color': '#222',
	        'background-image': '',
	        'background-color': '#DDD',
	        'background-repeat': '',
	        'button-color': '4FB0AA',
	        'background-brightness': 0.72
	      },
	      themeLoaded: false
	    };

	    _this.open = _this.open.bind(_this);
	    _this.close = _this.close.bind(_this);
	    return _this;
	  }

	  _createClass(Placeholder, [{
	    key: 'loadGoogleFont',
	    value: function loadGoogleFont(form) {
	      if (form['font-google']) {
	        _webfontloader2.default.load({
	          google: {
	            families: [form['font-google']]
	          }
	        });
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      var uid = _dataService2.default.getUidFromURL(this.props.url);

	      _dataService2.default.getFormData(uid, _utilities.DOMAIN).then(function (data) {
	        var _store = (0, _store3.default)(uid, TYPE, _this2.props.url, _this2.props.buttonText, data),
	            form = _store.form;

	        _this2.loadGoogleFont(form);
	        _this2.setState({ form: form, themeLoaded: true });
	      }).catch(function () {
	        return _this2.setState({ themeLoaded: true });
	      });
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      this.setState({ open: true });
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.setState({ open: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state,
	          form = _state.form,
	          themeLoaded = _state.themeLoaded;

	      var buttonColors = (0, _createPalette2.default)('#' + form['button-color']);
	      var fontFamily = form['font-google'].split(':')[0].split('+').join(' ');
	      var buttonText = this.props.buttonText ? this.props.buttonText : 'Start';

	      if (!themeLoaded) {
	        var spinnerConfig = {
	          color: '#7b7b7b',
	          fadeColor: '#ffffff'
	        };

	        return _react2.default.createElement(
	          SpinnerWrapper,
	          { visible: true, bgColor: 'transparent' },
	          _react2.default.createElement(_spinner2.default, { config: spinnerConfig })
	        );
	      }

	      return _react2.default.createElement(
	        Wrapper,
	        { isBackgroundBright: form['background-brightness'] >= 0 },
	        _react2.default.createElement(_mobileModal2.default, {
	          url: this.props.url,
	          open: this.state.open,
	          onClose: this.close,
	          onSubmit: this.props.onSubmit,
	          backgroundColor: '#' + form['background-color'],
	          buttonColor: '#' + form['button-color']
	        }),
	        _react2.default.createElement(
	          Title,
	          { color: '#' + form['primary-color'], font: fontFamily },
	          form.name
	        ),
	        _react2.default.createElement(
	          Button,
	          {
	            'data-qa': 'start-button',
	            color: buttonColors.text,
	            backgroundColor: buttonColors.background,
	            borderColor: buttonColors.border,
	            font: fontFamily,
	            onClick: this.open,
	            type: 'button'
	          },
	          buttonText
	        ),
	        _react2.default.createElement(Background, {
	          backgroundColor: '#' + form['background-color'],
	          image: form['background-image'],
	          brightness: Math.abs(form['background-brightness']),
	          backgroundRepeat: form['background-repeat']
	        })
	      );
	    }
	  }]);

	  return Placeholder;
	}(_react.Component);

	Placeholder.propTypes = {
	  url: _propTypes2.default.string,
	  buttonText: _propTypes2.default.string,
	  autoOpen: _propTypes2.default.bool,
	  onSubmit: _propTypes2.default.func
	};

	exports.default = Placeholder;

	/***/ }),
	/* 165 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tinycolor = __webpack_require__(108);

	var _tinycolor2 = _interopRequireDefault(_tinycolor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var colorateButton = function colorateButton(buttonHex) {
	  var button = (0, _tinycolor2.default)(buttonHex).toHsv();

	  var textSaturation = 1 * Math.pow(button.s, 0.1) - 3 * Math.pow(button.s, 1) + 2 * Math.pow(button.s, 1.3);
	  var textBrightness = void 0;

	  if (button.v > 0.5 + Math.pow(button.s, 1.6) * 0.5) {
	    textBrightness = Math.min(0.1 + button.v / 4 - textSaturation / 8 - button.s / 5, 0.25);
	    textBrightness = Math.max(0.05, textBrightness);
	  } else {
	    textBrightness = Math.max(0.9 - (1 - button.v) / 4 + textSaturation / 8 + button.s / 5, 0.75);
	    textBrightness = Math.min(0.95, textBrightness);
	    textSaturation = textSaturation / 2;
	  }

	  return {
	    text: (0, _tinycolor2.default)('hsva(' + button.h + ',' + Math.max(textSaturation, 0) + ',' + textBrightness + ',0.9)').toRgbString(),
	    background: (0, _tinycolor2.default)('hsva(' + button.h + ',' + button.s + ',' + button.v + ',1)').toRgbString(),
	    border: (0, _tinycolor2.default)('hsv(' + button.h + ',' + Math.min(button.s * 5, 1) + ',' + button.v / 2 + ')').toRgbString()
	  };
	};

	exports.default = colorateButton;

	/***/ }),
	/* 166 */
	/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return +new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document;}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild);}function v(a){a.parentNode&&a.parentNode.removeChild(a);}
	function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e]);}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e]);}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"");}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return !0;return !1}
	function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null);}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d();},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d();}):setTimeout(function(){e=!0;d();},0);u(a,"head",b);}
	function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f));};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")));},d||5E3);return f}return null}function B(){this.a=0;this.c=null;}function C(a){a.a++;return function(){a.a--;D(a);}}function E(a,b){a.c=b;D(a);}function D(a){0==a.a&&a.c&&(a.c(),a.c=null);}function F(a){this.a=a||"-";}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10));}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d);}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
	function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b}function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes;}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading");}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d);}K(a,"inactive");}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]();}function ja(){this.c={};}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c));}return d}function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f);}function N(a){u(a.c,"body",a.a);}function O(a){return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")}function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0;}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25);},function(){e();});}f();}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f);});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a);},function(){b.j(b.a);});};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
	O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m);}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10));}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this);};
	function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return !0;return !1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v);}function ma(a){setTimeout(p(function(){U(this);},a),50);}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a);},a),0);}function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c;}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this);};
	W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e);}K(b,"fontinactive",a);na(this);};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a));}function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0;}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a);};
	function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
	X=x?42<parseInt(x[1],10):xa?!1:!0;}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r);}for(h=0;h<l.length;h++)l[h].start();}},0);}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c);});}function ra(a,b){this.c=a;this.a=b;}
	ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k));}a(e);}else setTimeout(function(){b();},50);}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
	d]=function(){return c.a},b());}).id="__MonotypeAPIScript__"+d;}else a([]);};function sa(a,b){this.c=a;this.a=b;}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f);});};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||"";}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f));}}
	function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b}function ya(a){this.f=a;this.a=[];this.c={};}
	var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
	Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
	function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("");}}else k="";k&&g.push(k);}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
	g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d));}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]));}}function Ea(a,b){this.c=a;this.a=b;}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa);});};function Ga(a,b){this.c=a;this.a=b;}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0});}catch(l){}a(e);}},2E3):a([]);};function Ha(a,b){this.c=a;this.f=b;this.a=[];}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)));}a(d.a);},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([]);})):a([]);};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)}; !(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return Z}).call(exports, __webpack_require__, exports, module),
					__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}());


	/***/ }),
	/* 167 */
	/***/ (function(module, exports, __webpack_require__) {


	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = makeFullScreen;

	var _utilities = __webpack_require__(29);

	var defaultOptions = {
	  mode: 'embed-fullpage',
	  disableSubmit: false,
	  onSubmit: _utilities.noop
	};

	var queryStringKeys = {
	  mode: 'typeform-embed',
	  disableSubmit: '__dangerous-disable-submissions'
	};

	function makeFullScreen(iframe, url, options) {
	  options = _extends({}, defaultOptions, options);

	  iframe.src = (0, _utilities.appendParamsToUrl)(url, (0, _utilities.replaceExistingKeys)(options, queryStringKeys));

	  var onFormSubmit = function onFormSubmit() {
	    options.onSubmit();
	  };

	  (0, _utilities.ensureMetaViewport)();
	  (0, _utilities.fixSafariScroll)(iframe);

	  // Fix scroll inside the iframe (renderer v1)
	  iframe.onload = function () {
	    setTimeout(function () {
	      iframe.style.height = '';
	      (0, _utilities.applyIOSFooterHack)(iframe);
	      (0, _utilities.applyIOSIframeResizeHack)(iframe);
	    }, 1);

	    iframe.contentWindow.focus();
	  };

	  window.addEventListener('message', _utilities.onMessage);
	  window.addEventListener('form-submit', onFormSubmit);
	}

	/***/ }),
	/* 168 */
	/***/ (function(module, exports, __webpack_require__) {
	/* WEBPACK VAR INJECTION */(function(global) {

	__webpack_require__(169);

	__webpack_require__(366);

	__webpack_require__(367);

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;

	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}

	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);

	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)));

	/***/ }),
	/* 169 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(170);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(185);
	__webpack_require__(186);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(193);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(209);
	__webpack_require__(210);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(216);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(219);
	__webpack_require__(220);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(243);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(250);
	__webpack_require__(251);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(259);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(267);
	__webpack_require__(268);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(97);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(127);
	__webpack_require__(276);
	__webpack_require__(277);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(130);
	__webpack_require__(132);
	__webpack_require__(133);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(290);
	__webpack_require__(291);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(294);
	__webpack_require__(295);
	__webpack_require__(296);
	__webpack_require__(297);
	__webpack_require__(298);
	__webpack_require__(299);
	__webpack_require__(300);
	__webpack_require__(301);
	__webpack_require__(302);
	__webpack_require__(303);
	__webpack_require__(304);
	__webpack_require__(305);
	__webpack_require__(306);
	__webpack_require__(307);
	__webpack_require__(308);
	__webpack_require__(309);
	__webpack_require__(310);
	__webpack_require__(311);
	__webpack_require__(312);
	__webpack_require__(313);
	__webpack_require__(314);
	__webpack_require__(315);
	__webpack_require__(316);
	__webpack_require__(317);
	__webpack_require__(318);
	__webpack_require__(319);
	__webpack_require__(320);
	__webpack_require__(321);
	__webpack_require__(322);
	__webpack_require__(323);
	__webpack_require__(324);
	__webpack_require__(325);
	__webpack_require__(326);
	__webpack_require__(327);
	__webpack_require__(328);
	__webpack_require__(329);
	__webpack_require__(330);
	__webpack_require__(331);
	__webpack_require__(332);
	__webpack_require__(333);
	__webpack_require__(334);
	__webpack_require__(335);
	__webpack_require__(336);
	__webpack_require__(337);
	__webpack_require__(338);
	__webpack_require__(339);
	__webpack_require__(340);
	__webpack_require__(341);
	__webpack_require__(342);
	__webpack_require__(343);
	__webpack_require__(344);
	__webpack_require__(345);
	__webpack_require__(346);
	__webpack_require__(347);
	__webpack_require__(348);
	__webpack_require__(349);
	__webpack_require__(350);
	__webpack_require__(351);
	__webpack_require__(352);
	__webpack_require__(353);
	__webpack_require__(354);
	__webpack_require__(355);
	__webpack_require__(356);
	__webpack_require__(357);
	__webpack_require__(358);
	__webpack_require__(359);
	__webpack_require__(360);
	__webpack_require__(361);
	__webpack_require__(362);
	__webpack_require__(363);
	__webpack_require__(364);
	__webpack_require__(365);
	module.exports = __webpack_require__(22);


	/***/ }),
	/* 170 */
	/***/ (function(module, exports, __webpack_require__) {

	// ECMAScript 6 symbols shim
	var global = __webpack_require__(2);
	var has = __webpack_require__(11);
	var DESCRIPTORS = __webpack_require__(6);
	var $export = __webpack_require__(0);
	var redefine = __webpack_require__(13);
	var META = __webpack_require__(33).KEY;
	var $fails = __webpack_require__(3);
	var shared = __webpack_require__(55);
	var setToStringTag = __webpack_require__(46);
	var uid = __webpack_require__(36);
	var wks = __webpack_require__(5);
	var wksExt = __webpack_require__(110);
	var wksDefine = __webpack_require__(77);
	var enumKeys = __webpack_require__(171);
	var isArray = __webpack_require__(58);
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var toIObject = __webpack_require__(15);
	var toPrimitive = __webpack_require__(23);
	var createDesc = __webpack_require__(35);
	var _create = __webpack_require__(40);
	var gOPNExt = __webpack_require__(113);
	var $GOPD = __webpack_require__(16);
	var $DP = __webpack_require__(7);
	var $keys = __webpack_require__(38);
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
	  __webpack_require__(41).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(52).f = $propertyIsEnumerable;
	  __webpack_require__(57).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(37)) {
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


	/***/ }),
	/* 171 */
	/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(38);
	var gOPS = __webpack_require__(57);
	var pIE = __webpack_require__(52);
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
	/* 172 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(40) });


	/***/ }),
	/* 173 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


	/***/ }),
	/* 174 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(112) });


	/***/ }),
	/* 175 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(15);
	var $getOwnPropertyDescriptor = __webpack_require__(16).f;

	__webpack_require__(26)('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});


	/***/ }),
	/* 176 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(9);
	var $getPrototypeOf = __webpack_require__(17);

	__webpack_require__(26)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


	/***/ }),
	/* 177 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(9);
	var $keys = __webpack_require__(38);

	__webpack_require__(26)('keys', function () {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});


	/***/ }),
	/* 178 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(26)('getOwnPropertyNames', function () {
	  return __webpack_require__(113).f;
	});


	/***/ }),
	/* 179 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(4);
	var meta = __webpack_require__(33).onFreeze;

	__webpack_require__(26)('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});


	/***/ }),
	/* 180 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(4);
	var meta = __webpack_require__(33).onFreeze;

	__webpack_require__(26)('seal', function ($seal) {
	  return function seal(it) {
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});


	/***/ }),
	/* 181 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(4);
	var meta = __webpack_require__(33).onFreeze;

	__webpack_require__(26)('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});


	/***/ }),
	/* 182 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(4);

	__webpack_require__(26)('isFrozen', function ($isFrozen) {
	  return function isFrozen(it) {
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});


	/***/ }),
	/* 183 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(4);

	__webpack_require__(26)('isSealed', function ($isSealed) {
	  return function isSealed(it) {
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});


	/***/ }),
	/* 184 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(4);

	__webpack_require__(26)('isExtensible', function ($isExtensible) {
	  return function isExtensible(it) {
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});


	/***/ }),
	/* 185 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(0);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(114) });


	/***/ }),
	/* 186 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(0);
	$export($export.S, 'Object', { is: __webpack_require__(187) });


	/***/ }),
	/* 187 */
	/***/ (function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};


	/***/ }),
	/* 188 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(0);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(81).set });


	/***/ }),
	/* 189 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(53);
	var test = {};
	test[__webpack_require__(5)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof(this) + ']';
	  }, true);
	}


	/***/ }),
	/* 190 */
	/***/ (function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(0);

	$export($export.P, 'Function', { bind: __webpack_require__(115) });


	/***/ }),
	/* 191 */
	/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7).f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});


	/***/ }),
	/* 192 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(4);
	var getPrototypeOf = __webpack_require__(17);
	var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
	var FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
	  if (typeof this != 'function' || !isObject(O)) return false;
	  if (!isObject(this.prototype)) return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
	  return false;
	} });


	/***/ }),
	/* 193 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $parseInt = __webpack_require__(117);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


	/***/ }),
	/* 194 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $parseFloat = __webpack_require__(118);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


	/***/ }),
	/* 195 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var has = __webpack_require__(11);
	var cof = __webpack_require__(20);
	var inheritIfRequired = __webpack_require__(83);
	var toPrimitive = __webpack_require__(23);
	var fails = __webpack_require__(3);
	var gOPN = __webpack_require__(41).f;
	var gOPD = __webpack_require__(16).f;
	var dP = __webpack_require__(7).f;
	var $trim = __webpack_require__(47).trim;
	var NUMBER = 'Number';
	var $Number = global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = cof(__webpack_require__(40)(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (has(Base, key = keys[j]) && !has($Number, key)) {
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(13)(global, NUMBER, $Number);
	}


	/***/ }),
	/* 196 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toInteger = __webpack_require__(25);
	var aNumberValue = __webpack_require__(119);
	var repeat = __webpack_require__(84);
	var $toFixed = 1.0.toFixed;
	var floor = Math.floor;
	var data = [0, 0, 0, 0, 0, 0];
	var ERROR = 'Number.toFixed: incorrect invocation!';
	var ZERO = '0';

	var multiply = function (n, c) {
	  var i = -1;
	  var c2 = c;
	  while (++i < 6) {
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function (n) {
	  var i = 6;
	  var c = 0;
	  while (--i >= 0) {
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function () {
	  var i = 6;
	  var s = '';
	  while (--i >= 0) {
	    if (s !== '' || i === 0 || data[i] !== 0) {
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(3)(function () {
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits) {
	    var x = aNumberValue(this, ERROR);
	    var f = toInteger(fractionDigits);
	    var s = '';
	    var m = ZERO;
	    var e, z, j, k;
	    if (f < 0 || f > 20) throw RangeError(ERROR);
	    // eslint-disable-next-line no-self-compare
	    if (x != x) return 'NaN';
	    if (x <= -1e21 || x >= 1e21) return String(x);
	    if (x < 0) {
	      s = '-';
	      x = -x;
	    }
	    if (x > 1e-21) {
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(0, z);
	        j = f;
	        while (j >= 7) {
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if (f > 0) {
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});


	/***/ }),
	/* 197 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $fails = __webpack_require__(3);
	var aNumberValue = __webpack_require__(119);
	var $toPrecision = 1.0.toPrecision;

	$export($export.P + $export.F * ($fails(function () {
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function () {
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision) {
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
	  }
	});


	/***/ }),
	/* 198 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(0);

	$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


	/***/ }),
	/* 199 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export = __webpack_require__(0);
	var _isFinite = __webpack_require__(2).isFinite;

	$export($export.S, 'Number', {
	  isFinite: function isFinite(it) {
	    return typeof it == 'number' && _isFinite(it);
	  }
	});


	/***/ }),
	/* 200 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(0);

	$export($export.S, 'Number', { isInteger: __webpack_require__(120) });


	/***/ }),
	/* 201 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(0);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});


	/***/ }),
	/* 202 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export = __webpack_require__(0);
	var isInteger = __webpack_require__(120);
	var abs = Math.abs;

	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number) {
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});


	/***/ }),
	/* 203 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(0);

	$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


	/***/ }),
	/* 204 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(0);

	$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


	/***/ }),
	/* 205 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $parseFloat = __webpack_require__(118);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


	/***/ }),
	/* 206 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $parseInt = __webpack_require__(117);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


	/***/ }),
	/* 207 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(0);
	var log1p = __webpack_require__(121);
	var sqrt = Math.sqrt;
	var $acosh = Math.acosh;

	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x) {
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});


	/***/ }),
	/* 208 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(0);
	var $asinh = Math.asinh;

	function asinh(x) {
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}

	// Tor Browser bug: Math.asinh(0) -> -0
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


	/***/ }),
	/* 209 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(0);
	var $atanh = Math.atanh;

	// Tor Browser bug: Math.atanh(-0) -> 0
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x) {
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});


	/***/ }),
	/* 210 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(0);
	var sign = __webpack_require__(85);

	$export($export.S, 'Math', {
	  cbrt: function cbrt(x) {
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});


	/***/ }),
	/* 211 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  clz32: function clz32(x) {
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});


	/***/ }),
	/* 212 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(0);
	var exp = Math.exp;

	$export($export.S, 'Math', {
	  cosh: function cosh(x) {
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});


	/***/ }),
	/* 213 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(0);
	var $expm1 = __webpack_require__(86);

	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


	/***/ }),
	/* 214 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { fround: __webpack_require__(122) });


	/***/ }),
	/* 215 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(0);
	var abs = Math.abs;

	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
	    var sum = 0;
	    var i = 0;
	    var aLen = arguments.length;
	    var larg = 0;
	    var arg, div;
	    while (i < aLen) {
	      arg = abs(arguments[i++]);
	      if (larg < arg) {
	        div = larg / arg;
	        sum = sum * div * div + 1;
	        larg = arg;
	      } else if (arg > 0) {
	        div = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});


	/***/ }),
	/* 216 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(0);
	var $imul = Math.imul;

	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(3)(function () {
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y) {
	    var UINT16 = 0xffff;
	    var xn = +x;
	    var yn = +y;
	    var xl = UINT16 & xn;
	    var yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});


	/***/ }),
	/* 217 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  log10: function log10(x) {
	    return Math.log(x) * Math.LOG10E;
	  }
	});


	/***/ }),
	/* 218 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { log1p: __webpack_require__(121) });


	/***/ }),
	/* 219 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  log2: function log2(x) {
	    return Math.log(x) / Math.LN2;
	  }
	});


	/***/ }),
	/* 220 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { sign: __webpack_require__(85) });


	/***/ }),
	/* 221 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(0);
	var expm1 = __webpack_require__(86);
	var exp = Math.exp;

	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(3)(function () {
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x) {
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});


	/***/ }),
	/* 222 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(0);
	var expm1 = __webpack_require__(86);
	var exp = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x) {
	    var a = expm1(x = +x);
	    var b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});


	/***/ }),
	/* 223 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  trunc: function trunc(it) {
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});


	/***/ }),
	/* 224 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toAbsoluteIndex = __webpack_require__(39);
	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments[i++];
	      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});


	/***/ }),
	/* 225 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toIObject = __webpack_require__(15);
	var toLength = __webpack_require__(8);

	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite) {
	    var tpl = toIObject(callSite.raw);
	    var len = toLength(tpl.length);
	    var aLen = arguments.length;
	    var res = [];
	    var i = 0;
	    while (len > i) {
	      res.push(String(tpl[i++]));
	      if (i < aLen) res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});


	/***/ }),
	/* 226 */
	/***/ (function(module, exports, __webpack_require__) {

	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(47)('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});


	/***/ }),
	/* 227 */
	/***/ (function(module, exports, __webpack_require__) {

	var $at = __webpack_require__(87)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(88)(String, 'String', function (iterated) {
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
	/* 228 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $at = __webpack_require__(87)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});


	/***/ }),
	/* 229 */
	/***/ (function(module, exports, __webpack_require__) {
	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

	var $export = __webpack_require__(0);
	var toLength = __webpack_require__(8);
	var context = __webpack_require__(90);
	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	$export($export.P + $export.F * __webpack_require__(91)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = context(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});


	/***/ }),
	/* 230 */
	/***/ (function(module, exports, __webpack_require__) {
	// 21.1.3.7 String.prototype.includes(searchString, position = 0)

	var $export = __webpack_require__(0);
	var context = __webpack_require__(90);
	var INCLUDES = 'includes';

	$export($export.P + $export.F * __webpack_require__(91)(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});


	/***/ }),
	/* 231 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);

	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(84)
	});


	/***/ }),
	/* 232 */
	/***/ (function(module, exports, __webpack_require__) {
	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

	var $export = __webpack_require__(0);
	var toLength = __webpack_require__(8);
	var context = __webpack_require__(90);
	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	$export($export.P + $export.F * __webpack_require__(91)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = context(this, searchString, STARTS_WITH);
	    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});


	/***/ }),
	/* 233 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(14)('anchor', function (createHTML) {
	  return function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  };
	});


	/***/ }),
	/* 234 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.3 String.prototype.big()
	__webpack_require__(14)('big', function (createHTML) {
	  return function big() {
	    return createHTML(this, 'big', '', '');
	  };
	});


	/***/ }),
	/* 235 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.4 String.prototype.blink()
	__webpack_require__(14)('blink', function (createHTML) {
	  return function blink() {
	    return createHTML(this, 'blink', '', '');
	  };
	});


	/***/ }),
	/* 236 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.5 String.prototype.bold()
	__webpack_require__(14)('bold', function (createHTML) {
	  return function bold() {
	    return createHTML(this, 'b', '', '');
	  };
	});


	/***/ }),
	/* 237 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(14)('fixed', function (createHTML) {
	  return function fixed() {
	    return createHTML(this, 'tt', '', '');
	  };
	});


	/***/ }),
	/* 238 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(14)('fontcolor', function (createHTML) {
	  return function fontcolor(color) {
	    return createHTML(this, 'font', 'color', color);
	  };
	});


	/***/ }),
	/* 239 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(14)('fontsize', function (createHTML) {
	  return function fontsize(size) {
	    return createHTML(this, 'font', 'size', size);
	  };
	});


	/***/ }),
	/* 240 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.9 String.prototype.italics()
	__webpack_require__(14)('italics', function (createHTML) {
	  return function italics() {
	    return createHTML(this, 'i', '', '');
	  };
	});


	/***/ }),
	/* 241 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(14)('link', function (createHTML) {
	  return function link(url) {
	    return createHTML(this, 'a', 'href', url);
	  };
	});


	/***/ }),
	/* 242 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.11 String.prototype.small()
	__webpack_require__(14)('small', function (createHTML) {
	  return function small() {
	    return createHTML(this, 'small', '', '');
	  };
	});


	/***/ }),
	/* 243 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.12 String.prototype.strike()
	__webpack_require__(14)('strike', function (createHTML) {
	  return function strike() {
	    return createHTML(this, 'strike', '', '');
	  };
	});


	/***/ }),
	/* 244 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.13 String.prototype.sub()
	__webpack_require__(14)('sub', function (createHTML) {
	  return function sub() {
	    return createHTML(this, 'sub', '', '');
	  };
	});


	/***/ }),
	/* 245 */
	/***/ (function(module, exports, __webpack_require__) {

	// B.2.3.14 String.prototype.sup()
	__webpack_require__(14)('sup', function (createHTML) {
	  return function sup() {
	    return createHTML(this, 'sup', '', '');
	  };
	});


	/***/ }),
	/* 246 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(0);

	$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


	/***/ }),
	/* 247 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var toPrimitive = __webpack_require__(23);

	$export($export.P + $export.F * __webpack_require__(3)(function () {
	  return new Date(NaN).toJSON() !== null
	    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
	}), 'Date', {
	  // eslint-disable-next-line no-unused-vars
	  toJSON: function toJSON(key) {
	    var O = toObject(this);
	    var pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});


	/***/ }),
	/* 248 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(0);
	var toISOString = __webpack_require__(249);

	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
	  toISOString: toISOString
	});


	/***/ }),
	/* 249 */
	/***/ (function(module, exports, __webpack_require__) {

	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var fails = __webpack_require__(3);
	var getTime = Date.prototype.getTime;
	var $toISOString = Date.prototype.toISOString;

	var lz = function (num) {
	  return num > 9 ? num : '0' + num;
	};

	// PhantomJS / old WebKit has a broken implementations
	module.exports = (fails(function () {
	  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
	}) || !fails(function () {
	  $toISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
	  var d = this;
	  var y = d.getUTCFullYear();
	  var m = d.getUTCMilliseconds();
	  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
	  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	} : $toISOString;


	/***/ }),
	/* 250 */
	/***/ (function(module, exports, __webpack_require__) {

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var $toString = DateProto[TO_STRING];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}


	/***/ }),
	/* 251 */
	/***/ (function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
	var proto = Date.prototype;

	if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(252));


	/***/ }),
	/* 252 */
	/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(1);
	var toPrimitive = __webpack_require__(23);
	var NUMBER = 'number';

	module.exports = function (hint) {
	  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};


	/***/ }),
	/* 253 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(0);

	$export($export.S, 'Array', { isArray: __webpack_require__(58) });


	/***/ }),
	/* 254 */
	/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(19);
	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var call = __webpack_require__(123);
	var isArrayIter = __webpack_require__(92);
	var toLength = __webpack_require__(8);
	var createProperty = __webpack_require__(93);
	var getIterFn = __webpack_require__(94);

	$export($export.S + $export.F * !__webpack_require__(60)(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


	/***/ }),
	/* 255 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var createProperty = __webpack_require__(93);

	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(3)(function () {
	  function F() { /* empty */ }
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */) {
	    var index = 0;
	    var aLen = arguments.length;
	    var result = new (typeof this == 'function' ? this : Array)(aLen);
	    while (aLen > index) createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});


	/***/ }),
	/* 256 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.3.13 Array.prototype.join(separator)
	var $export = __webpack_require__(0);
	var toIObject = __webpack_require__(15);
	var arrayJoin = [].join;

	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(51) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
	  join: function join(separator) {
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});


	/***/ }),
	/* 257 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var html = __webpack_require__(80);
	var cof = __webpack_require__(20);
	var toAbsoluteIndex = __webpack_require__(39);
	var toLength = __webpack_require__(8);
	var arraySlice = [].slice;

	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(3)(function () {
	  if (html) arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end) {
	    var len = toLength(this.length);
	    var klass = cof(this);
	    end = end === undefined ? len : end;
	    if (klass == 'Array') return arraySlice.call(this, begin, end);
	    var start = toAbsoluteIndex(begin, len);
	    var upTo = toAbsoluteIndex(end, len);
	    var size = toLength(upTo - start);
	    var cloned = new Array(size);
	    var i = 0;
	    for (; i < size; i++) cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});


	/***/ }),
	/* 258 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var aFunction = __webpack_require__(10);
	var toObject = __webpack_require__(9);
	var fails = __webpack_require__(3);
	var $sort = [].sort;
	var test = [1, 2, 3];

	$export($export.P + $export.F * (fails(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(21)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});


	/***/ }),
	/* 259 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $forEach = __webpack_require__(27)(0);
	var STRICT = __webpack_require__(21)([].forEach, true);

	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});


	/***/ }),
	/* 260 */
	/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(4);
	var isArray = __webpack_require__(58);
	var SPECIES = __webpack_require__(5)('species');

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
	/* 261 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $map = __webpack_require__(27)(1);

	$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});


	/***/ }),
	/* 262 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $filter = __webpack_require__(27)(2);

	$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});


	/***/ }),
	/* 263 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $some = __webpack_require__(27)(3);

	$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});


	/***/ }),
	/* 264 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $every = __webpack_require__(27)(4);

	$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});


	/***/ }),
	/* 265 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $reduce = __webpack_require__(124);

	$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});


	/***/ }),
	/* 266 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $reduce = __webpack_require__(124);

	$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});


	/***/ }),
	/* 267 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $indexOf = __webpack_require__(56)(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});


	/***/ }),
	/* 268 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toIObject = __webpack_require__(15);
	var toInteger = __webpack_require__(25);
	var toLength = __webpack_require__(8);
	var $native = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	    // convert -0 to +0
	    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
	    var O = toIObject(this);
	    var length = toLength(O.length);
	    var index = length - 1;
	    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
	    if (index < 0) index = length + index;
	    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
	    return -1;
	  }
	});


	/***/ }),
	/* 269 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(0);

	$export($export.P, 'Array', { copyWithin: __webpack_require__(125) });

	__webpack_require__(34)('copyWithin');


	/***/ }),
	/* 270 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(0);

	$export($export.P, 'Array', { fill: __webpack_require__(96) });

	__webpack_require__(34)('fill');


	/***/ }),
	/* 271 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(0);
	var $find = __webpack_require__(27)(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(34)(KEY);


	/***/ }),
	/* 272 */
	/***/ (function(module, exports, __webpack_require__) {

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(0);
	var $find = __webpack_require__(27)(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(34)(KEY);


	/***/ }),
	/* 273 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(42)('Array');


	/***/ }),
	/* 274 */
	/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var inheritIfRequired = __webpack_require__(83);
	var dP = __webpack_require__(7).f;
	var gOPN = __webpack_require__(41).f;
	var isRegExp = __webpack_require__(59);
	var $flags = __webpack_require__(61);
	var $RegExp = global.RegExp;
	var Base = $RegExp;
	var proto = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
	  re2[__webpack_require__(5)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = isRegExp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(13)(global, 'RegExp', $RegExp);
	}

	__webpack_require__(42)('RegExp');


	/***/ }),
	/* 275 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(127);
	var anObject = __webpack_require__(1);
	var $flags = __webpack_require__(61);
	var DESCRIPTORS = __webpack_require__(6);
	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}


	/***/ }),
	/* 276 */
	/***/ (function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(62)('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});


	/***/ }),
	/* 277 */
	/***/ (function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(62)('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});


	/***/ }),
	/* 278 */
	/***/ (function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(62)('search', 1, function (defined, SEARCH, $search) {
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});


	/***/ }),
	/* 279 */
	/***/ (function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(62)('split', 2, function (defined, SPLIT, $split) {
	  var isRegExp = __webpack_require__(59);
	  var _split = $split;
	  var $push = [].push;
	  var $SPLIT = 'split';
	  var LENGTH = 'length';
	  var LAST_INDEX = 'lastIndex';
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while (match = separatorCopy.exec(string)) {
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          // eslint-disable-next-line no-loop-func
	          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
	            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
	          });
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    $split = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit) {
	    var O = defined(this);
	    var fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});


	/***/ }),
	/* 280 */
	/***/ (function(module, exports, __webpack_require__) {

	var LIBRARY = __webpack_require__(37);
	var global = __webpack_require__(2);
	var ctx = __webpack_require__(19);
	var classof = __webpack_require__(53);
	var $export = __webpack_require__(0);
	var isObject = __webpack_require__(4);
	var aFunction = __webpack_require__(10);
	var anInstance = __webpack_require__(43);
	var forOf = __webpack_require__(44);
	var speciesConstructor = __webpack_require__(63);
	var task = __webpack_require__(98).set;
	var microtask = __webpack_require__(99)();
	var newPromiseCapabilityModule = __webpack_require__(100);
	var perform = __webpack_require__(128);
	var promiseResolve = __webpack_require__(129);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(45)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(46)($Promise, PROMISE);
	__webpack_require__(42)(PROMISE);
	Wrapper = __webpack_require__(22)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(60)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


	/***/ }),
	/* 281 */
	/***/ (function(module, exports, __webpack_require__) {

	var weak = __webpack_require__(134);
	var validate = __webpack_require__(49);
	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	__webpack_require__(64)(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(validate(this, WEAK_SET), value, true);
	  }
	}, weak, false, true);


	/***/ }),
	/* 282 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $typed = __webpack_require__(65);
	var buffer = __webpack_require__(101);
	var anObject = __webpack_require__(1);
	var toAbsoluteIndex = __webpack_require__(39);
	var toLength = __webpack_require__(8);
	var isObject = __webpack_require__(4);
	var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
	var speciesConstructor = __webpack_require__(63);
	var $ArrayBuffer = buffer.ArrayBuffer;
	var $DataView = buffer.DataView;
	var $isView = $typed.ABV && ArrayBuffer.isView;
	var $slice = $ArrayBuffer.prototype.slice;
	var VIEW = $typed.VIEW;
	var ARRAY_BUFFER = 'ArrayBuffer';

	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it) {
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});

	$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end) {
	    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
	    var len = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, len);
	    var final = toAbsoluteIndex(end === undefined ? len : end, len);
	    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
	    var viewS = new $DataView(this);
	    var viewT = new $DataView(result);
	    var index = 0;
	    while (first < final) {
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});

	__webpack_require__(42)(ARRAY_BUFFER);


	/***/ }),
	/* 283 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	$export($export.G + $export.W + $export.F * !__webpack_require__(65).ABV, {
	  DataView: __webpack_require__(101).DataView
	});


	/***/ }),
	/* 284 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Int8', 1, function (init) {
	  return function Int8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 285 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Uint8', 1, function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 286 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Uint8', 1, function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);


	/***/ }),
	/* 287 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Int16', 2, function (init) {
	  return function Int16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 288 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Uint16', 2, function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 289 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Int32', 4, function (init) {
	  return function Int32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 290 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Uint32', 4, function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 291 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Float32', 4, function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 292 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(30)('Float64', 8, function (init) {
	  return function Float64Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});


	/***/ }),
	/* 293 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(0);
	var aFunction = __webpack_require__(10);
	var anObject = __webpack_require__(1);
	var rApply = (__webpack_require__(2).Reflect || {}).apply;
	var fApply = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(3)(function () {
	  rApply(function () { /* empty */ });
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList) {
	    var T = aFunction(target);
	    var L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});


	/***/ }),
	/* 294 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export = __webpack_require__(0);
	var create = __webpack_require__(40);
	var aFunction = __webpack_require__(10);
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);
	var fails = __webpack_require__(3);
	var bind = __webpack_require__(115);
	var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});


	/***/ }),
	/* 295 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP = __webpack_require__(7);
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var toPrimitive = __webpack_require__(23);

	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(3)(function () {
	  // eslint-disable-next-line no-undef
	  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes) {
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});


	/***/ }),
	/* 296 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export = __webpack_require__(0);
	var gOPD = __webpack_require__(16).f;
	var anObject = __webpack_require__(1);

	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey) {
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});


	/***/ }),
	/* 297 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.5 Reflect.enumerate(target)
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var Enumerate = function (iterated) {
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = [];      // keys
	  var key;
	  for (key in iterated) keys.push(key);
	};
	__webpack_require__(89)(Enumerate, 'Object', function () {
	  var that = this;
	  var keys = that._k;
	  var key;
	  do {
	    if (that._i >= keys.length) return { value: undefined, done: true };
	  } while (!((key = keys[that._i++]) in that._t));
	  return { value: key, done: false };
	});

	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target) {
	    return new Enumerate(target);
	  }
	});


	/***/ }),
	/* 298 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD = __webpack_require__(16);
	var getPrototypeOf = __webpack_require__(17);
	var has = __webpack_require__(11);
	var $export = __webpack_require__(0);
	var isObject = __webpack_require__(4);
	var anObject = __webpack_require__(1);

	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (anObject(target) === receiver) return target[propertyKey];
	  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
	}

	$export($export.S, 'Reflect', { get: get });


	/***/ }),
	/* 299 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD = __webpack_require__(16);
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);

	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});


	/***/ }),
	/* 300 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export = __webpack_require__(0);
	var getProto = __webpack_require__(17);
	var anObject = __webpack_require__(1);

	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return getProto(anObject(target));
	  }
	});


	/***/ }),
	/* 301 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(0);

	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey) {
	    return propertyKey in target;
	  }
	});


	/***/ }),
	/* 302 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var $isExtensible = Object.isExtensible;

	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target) {
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});


	/***/ }),
	/* 303 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(0);

	$export($export.S, 'Reflect', { ownKeys: __webpack_require__(136) });


	/***/ }),
	/* 304 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export = __webpack_require__(0);
	var anObject = __webpack_require__(1);
	var $preventExtensions = Object.preventExtensions;

	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target) {
	    anObject(target);
	    try {
	      if ($preventExtensions) $preventExtensions(target);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});


	/***/ }),
	/* 305 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP = __webpack_require__(7);
	var gOPD = __webpack_require__(16);
	var getPrototypeOf = __webpack_require__(17);
	var has = __webpack_require__(11);
	var $export = __webpack_require__(0);
	var createDesc = __webpack_require__(35);
	var anObject = __webpack_require__(1);
	var isObject = __webpack_require__(4);

	function set(target, propertyKey, V /* , receiver */) {
	  var receiver = arguments.length < 4 ? target : arguments[3];
	  var ownDesc = gOPD.f(anObject(target), propertyKey);
	  var existingDescriptor, proto;
	  if (!ownDesc) {
	    if (isObject(proto = getPrototypeOf(target))) {
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if (has(ownDesc, 'value')) {
	    if (ownDesc.writable === false || !isObject(receiver)) return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}

	$export($export.S, 'Reflect', { set: set });


	/***/ }),
	/* 306 */
	/***/ (function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export = __webpack_require__(0);
	var setProto = __webpack_require__(81);

	if (setProto) $export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto) {
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }
	});


	/***/ }),
	/* 307 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/Array.prototype.includes
	var $export = __webpack_require__(0);
	var $includes = __webpack_require__(56)(true);

	$export($export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	__webpack_require__(34)('includes');


	/***/ }),
	/* 308 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
	var $export = __webpack_require__(0);
	var flattenIntoArray = __webpack_require__(137);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(8);
	var aFunction = __webpack_require__(10);
	var arraySpeciesCreate = __webpack_require__(95);

	$export($export.P, 'Array', {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = toObject(this);
	    var sourceLen, A;
	    aFunction(callbackfn);
	    sourceLen = toLength(O.length);
	    A = arraySpeciesCreate(O, 0);
	    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
	    return A;
	  }
	});

	__webpack_require__(34)('flatMap');


	/***/ }),
	/* 309 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
	var $export = __webpack_require__(0);
	var flattenIntoArray = __webpack_require__(137);
	var toObject = __webpack_require__(9);
	var toLength = __webpack_require__(8);
	var toInteger = __webpack_require__(25);
	var arraySpeciesCreate = __webpack_require__(95);

	$export($export.P, 'Array', {
	  flatten: function flatten(/* depthArg = 1 */) {
	    var depthArg = arguments[0];
	    var O = toObject(this);
	    var sourceLen = toLength(O.length);
	    var A = arraySpeciesCreate(O, 0);
	    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
	    return A;
	  }
	});

	__webpack_require__(34)('flatten');


	/***/ }),
	/* 310 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(0);
	var $at = __webpack_require__(87)(true);

	$export($export.P, 'String', {
	  at: function at(pos) {
	    return $at(this, pos);
	  }
	});


	/***/ }),
	/* 311 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(0);
	var $pad = __webpack_require__(138);
	var userAgent = __webpack_require__(102);

	// https://github.com/zloirock/core-js/issues/280
	$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});


	/***/ }),
	/* 312 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(0);
	var $pad = __webpack_require__(138);
	var userAgent = __webpack_require__(102);

	// https://github.com/zloirock/core-js/issues/280
	$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});


	/***/ }),
	/* 313 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(47)('trimLeft', function ($trim) {
	  return function trimLeft() {
	    return $trim(this, 1);
	  };
	}, 'trimStart');


	/***/ }),
	/* 314 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(47)('trimRight', function ($trim) {
	  return function trimRight() {
	    return $trim(this, 2);
	  };
	}, 'trimEnd');


	/***/ }),
	/* 315 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/String.prototype.matchAll/
	var $export = __webpack_require__(0);
	var defined = __webpack_require__(24);
	var toLength = __webpack_require__(8);
	var isRegExp = __webpack_require__(59);
	var getFlags = __webpack_require__(61);
	var RegExpProto = RegExp.prototype;

	var $RegExpStringIterator = function (regexp, string) {
	  this._r = regexp;
	  this._s = string;
	};

	__webpack_require__(89)($RegExpStringIterator, 'RegExp String', function next() {
	  var match = this._r.exec(this._s);
	  return { value: match, done: match === null };
	});

	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp) {
	    defined(this);
	    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
	    var S = String(this);
	    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
	    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});


	/***/ }),
	/* 316 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(77)('asyncIterator');


	/***/ }),
	/* 317 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(77)('observable');


	/***/ }),
	/* 318 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export = __webpack_require__(0);
	var ownKeys = __webpack_require__(136);
	var toIObject = __webpack_require__(15);
	var gOPD = __webpack_require__(16);
	var createProperty = __webpack_require__(93);

	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject(object);
	    var getDesc = gOPD.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) createProperty(result, key, desc);
	    }
	    return result;
	  }
	});


	/***/ }),
	/* 319 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(0);
	var $values = __webpack_require__(139)(false);

	$export($export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});


	/***/ }),
	/* 320 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(0);
	var $entries = __webpack_require__(139)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});


	/***/ }),
	/* 321 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var aFunction = __webpack_require__(10);
	var $defineProperty = __webpack_require__(7);

	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(66), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter) {
	    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
	  }
	});


	/***/ }),
	/* 322 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var aFunction = __webpack_require__(10);
	var $defineProperty = __webpack_require__(7);

	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(66), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter) {
	    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
	  }
	});


	/***/ }),
	/* 323 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var toPrimitive = __webpack_require__(23);
	var getPrototypeOf = __webpack_require__(17);
	var getOwnPropertyDescriptor = __webpack_require__(16).f;

	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(66), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P) {
	    var O = toObject(this);
	    var K = toPrimitive(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
	    } while (O = getPrototypeOf(O));
	  }
	});


	/***/ }),
	/* 324 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var toObject = __webpack_require__(9);
	var toPrimitive = __webpack_require__(23);
	var getPrototypeOf = __webpack_require__(17);
	var getOwnPropertyDescriptor = __webpack_require__(16).f;

	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(66), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P) {
	    var O = toObject(this);
	    var K = toPrimitive(P, true);
	    var D;
	    do {
	      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
	    } while (O = getPrototypeOf(O));
	  }
	});


	/***/ }),
	/* 325 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(0);

	$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(140)('Map') });


	/***/ }),
	/* 326 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export = __webpack_require__(0);

	$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(140)('Set') });


	/***/ }),
	/* 327 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	__webpack_require__(67)('Map');


	/***/ }),
	/* 328 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
	__webpack_require__(67)('Set');


	/***/ }),
	/* 329 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	__webpack_require__(67)('WeakMap');


	/***/ }),
	/* 330 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
	__webpack_require__(67)('WeakSet');


	/***/ }),
	/* 331 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	__webpack_require__(68)('Map');


	/***/ }),
	/* 332 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
	__webpack_require__(68)('Set');


	/***/ }),
	/* 333 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	__webpack_require__(68)('WeakMap');


	/***/ }),
	/* 334 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
	__webpack_require__(68)('WeakSet');


	/***/ }),
	/* 335 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-global
	var $export = __webpack_require__(0);

	$export($export.G, { global: __webpack_require__(2) });


	/***/ }),
	/* 336 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-global
	var $export = __webpack_require__(0);

	$export($export.S, 'System', { global: __webpack_require__(2) });


	/***/ }),
	/* 337 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(0);
	var cof = __webpack_require__(20);

	$export($export.S, 'Error', {
	  isError: function isError(it) {
	    return cof(it) === 'Error';
	  }
	});


	/***/ }),
	/* 338 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  clamp: function clamp(x, lower, upper) {
	    return Math.min(upper, Math.max(lower, x));
	  }
	});


	/***/ }),
	/* 339 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


	/***/ }),
	/* 340 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	var RAD_PER_DEG = 180 / Math.PI;

	$export($export.S, 'Math', {
	  degrees: function degrees(radians) {
	    return radians * RAD_PER_DEG;
	  }
	});


	/***/ }),
	/* 341 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	var scale = __webpack_require__(142);
	var fround = __webpack_require__(122);

	$export($export.S, 'Math', {
	  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
	    return fround(scale(x, inLow, inHigh, outLow, outHigh));
	  }
	});


	/***/ }),
	/* 342 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});


	/***/ }),
	/* 343 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1) {
	    var $x0 = x0 >>> 0;
	    var $x1 = x1 >>> 0;
	    var $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});


	/***/ }),
	/* 344 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  imulh: function imulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >> 16;
	    var v1 = $v >> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});


	/***/ }),
	/* 345 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


	/***/ }),
	/* 346 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);
	var DEG_PER_RAD = Math.PI / 180;

	$export($export.S, 'Math', {
	  radians: function radians(degrees) {
	    return degrees * DEG_PER_RAD;
	  }
	});


	/***/ }),
	/* 347 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://rwaldron.github.io/proposal-math-extensions/
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { scale: __webpack_require__(142) });


	/***/ }),
	/* 348 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', {
	  umulh: function umulh(u, v) {
	    var UINT16 = 0xffff;
	    var $u = +u;
	    var $v = +v;
	    var u0 = $u & UINT16;
	    var v0 = $v & UINT16;
	    var u1 = $u >>> 16;
	    var v1 = $v >>> 16;
	    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});


	/***/ }),
	/* 349 */
	/***/ (function(module, exports, __webpack_require__) {

	// http://jfbastien.github.io/papers/Math.signbit.html
	var $export = __webpack_require__(0);

	$export($export.S, 'Math', { signbit: function signbit(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
	} });


	/***/ }),
	/* 350 */
	/***/ (function(module, exports, __webpack_require__) {
	// https://github.com/tc39/proposal-promise-finally

	var $export = __webpack_require__(0);
	var core = __webpack_require__(22);
	var global = __webpack_require__(2);
	var speciesConstructor = __webpack_require__(63);
	var promiseResolve = __webpack_require__(129);

	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


	/***/ }),
	/* 351 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(0);
	var newPromiseCapability = __webpack_require__(100);
	var perform = __webpack_require__(128);

	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


	/***/ }),
	/* 352 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var toMetaKey = metadata.key;
	var ordinaryDefineOwnMetadata = metadata.set;

	metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	} });


	/***/ }),
	/* 353 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var toMetaKey = metadata.key;
	var getOrCreateMetadataMap = metadata.map;
	var store = metadata.store;

	metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
	  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
	  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
	  if (metadataMap.size) return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	} });


	/***/ }),
	/* 354 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var getPrototypeOf = __webpack_require__(17);
	var ordinaryHasOwnMetadata = metadata.has;
	var ordinaryGetOwnMetadata = metadata.get;
	var toMetaKey = metadata.key;

	var ordinaryGetMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};

	metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });


	/***/ }),
	/* 355 */
	/***/ (function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(132);
	var from = __webpack_require__(141);
	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var getPrototypeOf = __webpack_require__(17);
	var ordinaryOwnMetadataKeys = metadata.keys;
	var toMetaKey = metadata.key;

	var ordinaryMetadataKeys = function (O, P) {
	  var oKeys = ordinaryOwnMetadataKeys(O, P);
	  var parent = getPrototypeOf(O);
	  if (parent === null) return oKeys;
	  var pKeys = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};

	metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	} });


	/***/ }),
	/* 356 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var ordinaryGetOwnMetadata = metadata.get;
	var toMetaKey = metadata.key;

	metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });


	/***/ }),
	/* 357 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var ordinaryOwnMetadataKeys = metadata.keys;
	var toMetaKey = metadata.key;

	metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	} });


	/***/ }),
	/* 358 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var getPrototypeOf = __webpack_require__(17);
	var ordinaryHasOwnMetadata = metadata.has;
	var toMetaKey = metadata.key;

	var ordinaryHasMetadata = function (MetadataKey, O, P) {
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if (hasOwn) return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};

	metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });


	/***/ }),
	/* 359 */
	/***/ (function(module, exports, __webpack_require__) {

	var metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var ordinaryHasOwnMetadata = metadata.has;
	var toMetaKey = metadata.key;

	metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	} });


	/***/ }),
	/* 360 */
	/***/ (function(module, exports, __webpack_require__) {

	var $metadata = __webpack_require__(31);
	var anObject = __webpack_require__(1);
	var aFunction = __webpack_require__(10);
	var toMetaKey = $metadata.key;
	var ordinaryDefineOwnMetadata = $metadata.set;

	$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
	  return function decorator(target, targetKey) {
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	} });


	/***/ }),
	/* 361 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export = __webpack_require__(0);
	var microtask = __webpack_require__(99)();
	var process = __webpack_require__(2).process;
	var isNode = __webpack_require__(20)(process) == 'process';

	$export($export.G, {
	  asap: function asap(fn) {
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});


	/***/ }),
	/* 362 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/zenparsing/es-observable
	var $export = __webpack_require__(0);
	var global = __webpack_require__(2);
	var core = __webpack_require__(22);
	var microtask = __webpack_require__(99)();
	var OBSERVABLE = __webpack_require__(5)('observable');
	var aFunction = __webpack_require__(10);
	var anObject = __webpack_require__(1);
	var anInstance = __webpack_require__(43);
	var redefineAll = __webpack_require__(45);
	var hide = __webpack_require__(12);
	var forOf = __webpack_require__(44);
	var RETURN = forOf.RETURN;

	var getMethod = function (fn) {
	  return fn == null ? undefined : aFunction(fn);
	};

	var cleanupSubscription = function (subscription) {
	  var cleanup = subscription._c;
	  if (cleanup) {
	    subscription._c = undefined;
	    cleanup();
	  }
	};

	var subscriptionClosed = function (subscription) {
	  return subscription._o === undefined;
	};

	var closeSubscription = function (subscription) {
	  if (!subscriptionClosed(subscription)) {
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};

	var Subscription = function (observer, subscriber) {
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup = subscriber(observer);
	    var subscription = cleanup;
	    if (cleanup != null) {
	      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch (e) {
	    observer.error(e);
	    return;
	  } if (subscriptionClosed(this)) cleanupSubscription(this);
	};

	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe() { closeSubscription(this); }
	});

	var SubscriptionObserver = function (subscription) {
	  this._s = subscription;
	};

	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if (m) return m.call(observer, value);
	      } catch (e) {
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value) {
	    var subscription = this._s;
	    if (subscriptionClosed(subscription)) throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if (!m) throw value;
	      value = m.call(observer, value);
	    } catch (e) {
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value) {
	    var subscription = this._s;
	    if (!subscriptionClosed(subscription)) {
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch (e) {
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});

	var $Observable = function Observable(subscriber) {
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};

	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer) {
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn) {
	    var that = this;
	    return new (core.Promise || global.Promise)(function (resolve, reject) {
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next: function (value) {
	          try {
	            return fn(value);
	          } catch (e) {
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});

	redefineAll($Observable, {
	  from: function from(x) {
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if (method) {
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function (observer) {
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          try {
	            if (forOf(x, false, function (it) {
	              observer.next(it);
	              if (done) return RETURN;
	            }) === RETURN) return;
	          } catch (e) {
	            if (done) throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function () { done = true; };
	    });
	  },
	  of: function of() {
	    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
	      var done = false;
	      microtask(function () {
	        if (!done) {
	          for (var j = 0; j < items.length; ++j) {
	            observer.next(items[j]);
	            if (done) return;
	          } observer.complete();
	        }
	      });
	      return function () { done = true; };
	    });
	  }
	});

	hide($Observable.prototype, OBSERVABLE, function () { return this; });

	$export($export.G, { Observable: $Observable });

	__webpack_require__(42)('Observable');


	/***/ }),
	/* 363 */
	/***/ (function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global = __webpack_require__(2);
	var $export = __webpack_require__(0);
	var userAgent = __webpack_require__(102);
	var slice = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
	var wrap = function (set) {
	  return function (fn, time /* , ...args */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice.call(arguments, 2) : false;
	    return set(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
	    } : fn, time);
	  };
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout: wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});


	/***/ }),
	/* 364 */
	/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(0);
	var $task = __webpack_require__(98);
	$export($export.G + $export.B, {
	  setImmediate: $task.set,
	  clearImmediate: $task.clear
	});


	/***/ }),
	/* 365 */
	/***/ (function(module, exports, __webpack_require__) {

	var $iterators = __webpack_require__(97);
	var getKeys = __webpack_require__(38);
	var redefine = __webpack_require__(13);
	var global = __webpack_require__(2);
	var hide = __webpack_require__(12);
	var Iterators = __webpack_require__(48);
	var wks = __webpack_require__(5);
	var ITERATOR = wks('iterator');
	var TO_STRING_TAG = wks('toStringTag');
	var ArrayValues = Iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
	  }
	}


	/***/ }),
	/* 366 */
	/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof global.process === "object" && global.process.domain) {
	      invoke = global.process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)));

	/***/ }),
	/* 367 */
	/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(368);
	module.exports = __webpack_require__(22).RegExp.escape;


	/***/ }),
	/* 368 */
	/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(0);
	var $re = __webpack_require__(369)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

	$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


	/***/ }),
	/* 369 */
	/***/ (function(module, exports) {

	module.exports = function (regExp, replace) {
	  var replacer = replace === Object(replace) ? function (part) {
	    return replace[part];
	  } : replace;
	  return function (it) {
	    return String(it).replace(regExp, replacer);
	  };
	};


	/***/ })
	/******/ ]);
	});

	unwrapExports(api);
	var api_1 = api.makePopup;

	var typeformTrigger = {
	  name: 'ca-typeform-trigger',
	  initialize: function initialize($component) {
	    var TYPEFORM_URL = $component.attr('data-typeform-url') || $component.attr('href');
	    var popup = api_1(TYPEFORM_URL, {
	      mode: 'popup'
	    });
	    $component.on('click', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      popup.open();
	    });
	  }
	};

	/**
	 * https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
	 * @param  {[type]} element     [description]
	 * @param  {[type]} fullyInView [description]
	 * @return {[type]}             [description]
	 */
	var isElementInView = function isElementInView(element, fullyInView) {
	  var pageTop = jQuery(window).scrollTop();
	  var pageBottom = pageTop + jQuery(window).height();
	  var elementTop = jQuery(element).offset().top;
	  var elementBottom = elementTop + jQuery(element).height();

	  if (fullyInView === true) {
	    return pageTop < elementTop && pageBottom > elementBottom;
	  } else {
	    return elementTop <= pageBottom && elementBottom >= pageTop;
	  }
	};

	var NOT_VISIBLE_CLASS = 'not-visible';
	var HIGHLIGHT_REGEXP = /\*\*([^\*]+?)\*\*/g;
	var animatedText = {
	  name: 'ca-animated-text',
	  initialize: function initialize($component) {
	    var SOURCE_TEXT = $component.text();
	    var $window = jQuery(window);
	    var highlightedHTML = ['<span>', SOURCE_TEXT.replace(HIGHLIGHT_REGEXP, '</span><span class="ca-highlight">$1</span><span>'), '</span>'].join('');
	    $component.html(highlightedHTML);
	    var $textNodes = Array.from($component.children()).map(jQuery);
	    var $charEls = [];
	    $textNodes.forEach(function ($node) {
	      var nodeText = $node.text();
	      $node.html('');
	      nodeText.split('').forEach(function (char) {
	        var $charEl = jQuery("<span>".concat(char, "</span>"));
	        $charEl.addClass(NOT_VISIBLE_CLASS);
	        $charEls.push($charEl);
	        $node.append($charEl);
	      });
	    });

	    var updateVisibility = function updateVisibility() {
	      if (isElementInView($component)) {
	        $component.removeClass(NOT_VISIBLE_CLASS);
	        $charEls.forEach(function ($charEl) {
	          setTimeout(function () {
	            $charEl.removeClass(NOT_VISIBLE_CLASS);
	          }, Math.round(Math.random() * 600));
	        });
	      }
	    };

	    $window.on('scroll', updateVisibility);
	    updateVisibility();
	  }
	};

	var DISTANCE_FROM_VERTICAL_BOUNDARIES = 0;
	var stickyElement = {
	  name: 'ca-sticky-element',
	  initialize: function initialize($component) {
	    var $ = window.jQuery;
	    var $window = $(window);

	    if ($window.width() < 500) {
	      return;
	    }

	    var $placeholder = null;
	    var stickyElementTopSelector = $component.attr('data-ca-sticky-element-top') || offsetTargetSelector;
	    var stickyElementBottomSelector = $component.attr('data-ca-sticky-element-bottom');

	    if (!stickyElementTopSelector) {
	      throw new Error('sticky-element component requires "data-ca-sticky-element-top" attribute');
	    }

	    var getTopBoundary = function getTopBoundary() {
	      return $(stickyElementTopSelector).height() + DISTANCE_FROM_VERTICAL_BOUNDARIES;
	    };

	    var getBottomBoundary = function getBottomBoundary() {
	      if (!stickyElementBottomSelector) {
	        return false;
	      }

	      var $bottomEl = $(stickyElementBottomSelector);

	      if ($bottomEl.length > 0) {
	        return $bottomEl.offset().top - DISTANCE_FROM_VERTICAL_BOUNDARIES;
	      } else {
	        return false;
	      }
	    };

	    var INITIAL_POSITION = $component.css('position') || 'static';

	    var makeSticky = function makeSticky() {
	      // Put placeholder if none is set
	      if (!$placeholder) {
	        $placeholder = $('<div data-ca-sticky-element-placeholder></div>');
	        $placeholder.css({
	          position: INITIAL_POSITION,
	          height: $component.height()
	        });
	        $placeholder.insertAfter($component);
	      }

	      $component.data('sticky-element-original-offset-top', $component.offset().top);
	      $component.addClass('active');
	      $component.css({
	        position: 'fixed',
	        zIndex: '10',
	        top: getTopBoundary() + 'px',
	        width: $component.width() + 'px',
	        transform: 'translateY(0)'
	      });
	    };

	    var reverseSticky = function reverseSticky() {
	      $component.removeClass('active');
	      $component.css({
	        position: INITIAL_POSITION,
	        zIndex: '',
	        top: '',
	        width: '',
	        transform: 'none'
	      }); // Remove placeholder if it is set

	      if ($placeholder) {
	        $placeholder.remove();
	        $placeholder = null;
	      }
	    };

	    $window.on('scroll', function (e) {
	      // https://davidwalsh.name/offsetheight-visibility
	      var isVisible = $component.height() !== 0;

	      if (!isVisible) {
	        return;
	      }

	      var isSticky = $component.hasClass('active');

	      if (!isSticky) {
	        var shouldStick = $window.scrollTop() + getTopBoundary() >= $component.offset().top;

	        if (shouldStick) {
	          makeSticky();
	        }
	      } else {
	        var currentTop = $window.scrollTop() + getTopBoundary();
	        var shouldKeepSticky = currentTop >= $component.data('sticky-element-original-offset-top');

	        if (shouldKeepSticky) {
	          // if the sticky element has reached the bottom,
	          // translate it in the y axis
	          var bottomBoundary = getBottomBoundary();

	          if (bottomBoundary !== false) {
	            var yTranslation = Math.min(0, bottomBoundary - (currentTop + $component.height()));
	            $component.css('transform', "translateY(".concat(yTranslation, "px)"));
	          }

	          var topBoundary = getTopBoundary();

	          if ($component.offset().top !== topBoundary) {
	            $component.css('top', topBoundary);
	          }
	        } else {
	          reverseSticky();
	        }
	      }
	    });
	  }
	};

	var inPageNavigation = (function () {
	  var $html = jQuery('html,body');
	  var $mainHeader = jQuery('#main-header');

	  var getBaseUrl = function getBaseUrl(postfix) {
	    var baseUrl = window.location.origin + window.location.pathname + window.location.search;
	    return postfix ? baseUrl + postfix : baseUrl;
	  };

	  var getTargetElementGivenHref = function getTargetElementGivenHref(targetUrl, baseUrl) {
	    if (!targetUrl || !/#/.test(targetUrl)) {
	      return null;
	    }

	    var targetUrlSplit = targetUrl.split('#');

	    if (targetUrlSplit[0] === '' || targetUrlSplit[0] === baseUrl || targetUrlSplit[1] === '') {
	      var candidateSectionId = '#' + targetUrlSplit[1];
	      var $targetSection = jQuery(candidateSectionId);
	      return $targetSection.length > 0 ? $targetSection : null;
	    } else {
	      return null;
	    }
	  };
	  /**
	   * On click, if possible, intercept click and navigate
	   * to corresponding section through scroll.
	   *
	   * In case there is no matching section in the page,
	   * simply allow default browser behavior.                                                                     [description]
	   */


	  jQuery('body').on('click', 'a', function (event) {
	    var baseUrl = getBaseUrl();
	    var $targetAnchor = jQuery(event.currentTarget);
	    var $targetSection = getTargetElementGivenHref($targetAnchor.attr('href'), baseUrl);

	    if ($targetSection) {
	      event.preventDefault();
	      event.stopPropagation();
	      window.history.pushState({}, '', $targetAnchor.attr('href'));
	      var targetScrollTop = $targetSection.offset().top - $mainHeader.outerHeight();

	      if ($targetSection.attr('data-in-page-navigation-offset')) {
	        var offset = parseInt($targetSection.attr('data-in-page-navigation-offset'));

	        if (offset) {
	          targetScrollTop = targetScrollTop + offset;
	        }
	      }
	      /**
	       * Active / inactive
	       */


	      jQuery('html, body').animate({
	        scrollTop: targetScrollTop
	      });
	    }
	  });
	});

	jQuery(function () {
	  componentSystem({
	    componentNameAttribute: 'data-component',
	    specs: [typeformTrigger, animatedText, stickyElement]
	  })(jQuery('body'));
	  inPageNavigation();
	});

}());
