(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bakery = function () {
  function Bakery() {
    _classCallCheck(this, Bakery);
  }

  _createClass(Bakery, null, [{
    key: 'bake',
    value: function bake() {
      document.cookie = 'smartbanner_exited=1';
    }
  }, {
    key: 'unbake',
    value: function unbake() {
      document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }, {
    key: 'baked',
    get: function get() {
      var value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      return value === '1';
    }
  }]);

  return Bakery;
}();

exports.default = Bakery;

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Detector = function () {
  function Detector() {
    _classCallCheck(this, Detector);
  }

  _createClass(Detector, null, [{
    key: 'platform',
    value: function platform() {
      if (/iPhone/i.test(window.navigator.userAgent) || /iPod/i.test(window.navigator.userAgent)) {
        return 'ios phone';
      } else if (/iPad/i.test(window.navigator.userAgent)) {
        return 'ios tablet';
      } else if (/Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent)) {
        return 'android phone';
      } else if (/Android/i.test(window.navigator.userAgent) && !/Mobile/i.test(window.navigator.userAgent)) {
        return 'android tablet';
      }
    }
  }, {
    key: 'userAgentMatchesRegex',
    value: function userAgentMatchesRegex(regexString) {
      return new RegExp(regexString).test(window.navigator.userAgent);
    }
  }, {
    key: 'jQueryMobilePage',
    value: function jQueryMobilePage() {
      return typeof global.$ !== 'undefined' && global.$.mobile !== 'undefined' && document.querySelector('.ui-page') !== null;
    }
  }, {
    key: 'wrapperElement',
    value: function wrapperElement() {
      var selector = Detector.jQueryMobilePage() ? '.ui-page' : 'html';
      return document.querySelectorAll(selector);
    }
  }]);

  return Detector;
}();

exports.default = Detector;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
'use strict';

var _smartbanner = require('./smartbanner.js');

var _smartbanner2 = _interopRequireDefault(_smartbanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smartbanner = void 0;

window.addEventListener('load', function () {
  smartbanner = new _smartbanner2.default();
  smartbanner.publish();
});

},{"./smartbanner.js":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./polyfills/array/from.js');

require('./polyfills/array/includes.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function valid(name) {
  // TODO: validate against options dictionary
  return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
}

function convertToCamelCase(name) {
  var parts = name.split('-');
  parts.map(function (part, index) {
    if (index > 0) {
      parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
    }
  });
  return parts.join('');
}

var OptionParser = function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);
  }

  _createClass(OptionParser, [{
    key: 'parse',
    value: function parse() {
      var metas = document.getElementsByTagName('meta');
      var options = {};
      var optionName = null;
      Array.from(metas).forEach(function (meta) {
        var name = meta.getAttribute('name');
        var content = meta.getAttribute('content');
        if (name && content && valid(name) && content.length > 0) {
          optionName = name.split(':')[1];
          if (Array.from(optionName).includes('-')) {
            optionName = convertToCamelCase(optionName);
          }
          options[optionName] = content;
        }
      });
      return options;
    }
  }]);

  return OptionParser;
}();

exports.default = OptionParser;

},{"./polyfills/array/from.js":5,"./polyfills/array/includes.js":6}],5:[function(require,module,exports){
'use strict';

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

},{}],6:[function(require,module,exports){
'use strict';

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
    'use strict';

    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
        // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _optionparser = require('./optionparser.js');

var _optionparser2 = _interopRequireDefault(_optionparser);

var _detector = require('./detector.js');

var _detector2 = _interopRequireDefault(_detector);

var _bakery = require('./bakery.js');

var _bakery2 = _interopRequireDefault(_bakery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PLATFORMS = 'android,ios';

var datas = {
  originalTop: 'data-smartbanner-original-top',
  originalMarginTop: 'data-smartbanner-original-margin-top'
};

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function handleJQueryMobilePageLoad(event) {
  if (!this.positioningDisabled) {
    setContentPosition(event.data.height);
  }
}

function addEventListeners(self) {
  var closeIcon = document.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', function (event) {
    return handleExitClick(event, self);
  });
  if (_detector2.default.jQueryMobilePage()) {
    $(document).on('pagebeforeshow', self, handleJQueryMobilePageLoad);
  }
}

function removeEventListeners() {
  if (_detector2.default.jQueryMobilePage()) {
    $(document).off('pagebeforeshow', handleJQueryMobilePageLoad);
  }
}

function setContentPosition(value) {
  var wrappers = _detector2.default.wrapperElement();
  for (var i = 0, l = wrappers.length, wrapper; i < l; i++) {
    wrapper = wrappers[i];
    if (_detector2.default.jQueryMobilePage()) {
      if (wrapper.getAttribute(datas.originalTop)) {
        continue;
      }
      var top = parseFloat(getComputedStyle(wrapper).top);
      wrapper.setAttribute(datas.originalTop, isNaN(top) ? 0 : top);
      wrapper.style.top = value + 'px';
    } else {
      if (wrapper.getAttribute(datas.originalMarginTop)) {
        continue;
      }
      var margin = parseFloat(getComputedStyle(wrapper).marginTop);
      wrapper.setAttribute(datas.originalMarginTop, isNaN(margin) ? 0 : margin);
      wrapper.style.marginTop = value + 'px';
    }
  }
}

function restoreContentPosition() {
  var wrappers = _detector2.default.wrapperElement();
  for (var i = 0, l = wrappers.length, wrapper; i < l; i++) {
    wrapper = wrappers[i];
    if (_detector2.default.jQueryMobilePage() && wrapper.getAttribute(datas.originalTop)) {
      wrapper.style.top = wrapper.getAttribute(datas.originalTop) + 'px';
    } else if (wrapper.getAttribute(datas.originalMarginTop)) {
      wrapper.style.marginTop = wrapper.getAttribute(datas.originalMarginTop) + 'px';
    }
  }
}

var SmartBanner = function () {
  function SmartBanner() {
    _classCallCheck(this, SmartBanner);

    var parser = new _optionparser2.default();
    this.options = parser.parse();
    this.platform = _detector2.default.platform();
    this.platformOS = this.platform && this.platform.replace(' tablet', '').replace(' phone', '');
  }

  // DEPRECATED. Will be removed.


  _createClass(SmartBanner, [{
    key: 'publish',
    value: function publish(ignoreMainPlatformUrls) {
      //ignoreMainPlatformUrls is used for testing to simulate situation when user omits
      //<meta name="smartbanner:button-url-apple"/> and <meta name="smartbanner:button-url-google"/>
      //to use device related URLs instead
      this.ignoreMainPlatformUrls = ignoreMainPlatformUrls;

      if (Object.keys(this.options).length === 0) {
        throw new Error('No options detected. Please consult documentation.');
      }

      if (_bakery2.default.baked) {
        return false;
      }

      // User Agent was explicetely excluded by defined excludeUserAgentRegex
      if (this.userAgentExcluded) {
        return false;
      }

      // User agent was neither included by platformEnabled,
      // nor by defined includeUserAgentRegex
      if (!(this.platformEnabled || this.userAgentIncluded)) {
        return false;
      }

      var bannerDiv = document.createElement('div');
      document.querySelector('body').appendChild(bannerDiv);
      bannerDiv.outerHTML = this.html;
      if (!this.positioningDisabled) {
        setContentPosition(this.height);
      }
      addEventListeners(this);
    }
  }, {
    key: 'exit',
    value: function exit() {
      removeEventListeners();
      if (!this.positioningDisabled) {
        restoreContentPosition();
      }
      var banner = document.querySelector('.js_smartbanner');
      document.querySelector('body').removeChild(banner);
      _bakery2.default.bake();
    }
  }, {
    key: 'originalTop',
    get: function get() {
      var wrapper = _detector2.default.wrapperElement()[0];
      return parseFloat(wrapper.getAttribute(datas.originalTop));
    }

    // DEPRECATED. Will be removed.

  }, {
    key: 'originalTopMargin',
    get: function get() {
      var wrapper = _detector2.default.wrapperElement()[0];
      return parseFloat(wrapper.getAttribute(datas.originalMarginTop));
    }
  }, {
    key: 'priceSuffix',
    get: function get() {
      if (this.platformOS === 'ios') {
        return this.options.priceSuffixApple;
      } else if (this.platformOS === 'android') {
        return this.options.priceSuffixGoogle;
      }
      return '';
    }
  }, {
    key: 'icon',
    get: function get() {
      if (this.platformOS === 'android') {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
  }, {
    key: 'buttonUrl',
    get: function get() {
      var URL = '#',
          o = this.options;

      if (this.ignoreMainPlatformUrls) {
        o.buttonUrlGoogle = '';
        o.buttonUrlApple = '';
      }

      switch (this.platform) {
        case 'android phone':
          if (o.buttonUrlGoogle || o.buttonUrlGooglePhone) {
            URL = o.buttonUrlGoogle ? o.buttonUrlGoogle : o.buttonUrlGooglePhone;
          }
          break;
        case 'android tablet':
          if (o.buttonUrlGoogle || o.buttonUrlGoogleTablet) {
            URL = o.buttonUrlGoogle ? o.buttonUrlGoogle : o.buttonUrlGoogleTablet;
          }
          break;
        case 'ios phone':
          if (o.buttonUrlApple || o.buttonUrlAppleIphone) {
            URL = o.buttonUrlApple ? o.buttonUrlApple : o.buttonUrlAppleIphone;
          }
          break;
        case 'ios tablet':
          if (o.buttonUrlApple || o.buttonUrlAppleIpad) {
            URL = o.buttonUrlApple ? o.buttonUrlApple : o.buttonUrlAppleIpad;
          }
          break;
      }

      return URL;
    }
  }, {
    key: 'html',
    get: function get() {
      return '<div class="smartbanner smartbanner--' + this.platformOS + ' js_smartbanner">\n      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>\n      <div class="smartbanner__icon" style="background-image: url(' + this.icon + ');"></div>\n      <div class="smartbanner__info">\n        <div>\n          <div class="smartbanner__info__title">' + this.options.title + '</div>\n          <div class="smartbanner__info__author">' + this.options.author + '</div>\n          <div class="smartbanner__info__price">' + this.options.price + this.priceSuffix + '</div>\n        </div>\n      </div>\n      <a href="' + this.buttonUrl + '" target="_blank" class="smartbanner__button"><span class="smartbanner__button__label">' + this.options.button + '</span></a>\n    </div>';
    }
  }, {
    key: 'height',
    get: function get() {
      var height = document.querySelector('.js_smartbanner').offsetHeight;
      return height !== undefined ? height : 0;
    }
  }, {
    key: 'platformEnabled',
    get: function get() {
      var enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
      return enabledPlatforms && enabledPlatforms.replace(/\s+/g, '').split(',').indexOf(this.platformOS) !== -1;
    }
  }, {
    key: 'positioningDisabled',
    get: function get() {
      return this.options.disablePositioning === 'true';
    }
  }, {
    key: 'userAgentExcluded',
    get: function get() {
      if (!this.options.excludeUserAgentRegex) {
        return false;
      }
      return _detector2.default.userAgentMatchesRegex(this.options.excludeUserAgentRegex);
    }
  }, {
    key: 'userAgentIncluded',
    get: function get() {
      if (!this.options.includeUserAgentRegex) {
        return false;
      }
      return _detector2.default.userAgentMatchesRegex(this.options.includeUserAgentRegex);
    }
  }]);

  return SmartBanner;
}();

exports.default = SmartBanner;

},{"./bakery.js":1,"./detector.js":2,"./optionparser.js":4}]},{},[3]);
