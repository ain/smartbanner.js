/*!
 * smartbanner.js v1.0.2-alpha1 <https://github.com/ain/smartbanner.js>
 * Copyright © 2016 Ain Tohvri, contributors. Licensed under GPL-3.0.
 */
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
      if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
        return 'ios';
      } else if (/Android/i.test(window.navigator.userAgent)) {
        return 'android';
      }
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
      return document.querySelector(selector);
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

window.onload = function () {
  smartbanner = new _smartbanner2.default();
  smartbanner.publish();
};

},{"./smartbanner.js":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
          if (optionName.includes('-')) {
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

},{}],5:[function(require,module,exports){
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

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function handleJQueryMobilePageLoad(event) {
  setContentTop(event.data.self.originalTop + event.data.self.height);
}

function addEventListeners(self) {
  var closeIcon = document.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', function () {
    return handleExitClick(event, self);
  });
  if (_detector2.default.jQueryMobilePage()) {
    $(document).on('pageload', self, handleJQueryMobilePageLoad);
  }
}

function getOriginalTop() {
  var element = _detector2.default.wrapperElement();
  if (_detector2.default.jQueryMobilePage()) {
    var top = parseFloat(getComputedStyle(element).top);
    return isNaN(top) ? 0 : top;
  } else {
    var margin = parseFloat(getComputedStyle(element).marginTop);
    return isNaN(margin) ? 0 : margin;
  }
}

function setContentTop(value) {
  if (_detector2.default.jQueryMobilePage) {
    _detector2.default.wrapperElement().style.top = value + 'px';
  } else {
    _detector2.default.wrapperElement().style.marginTop = value + 'px';
  }
}

var SmartBanner = function () {
  function SmartBanner() {
    _classCallCheck(this, SmartBanner);

    var parser = new _optionparser2.default();
    this.options = parser.parse();
    this.platform = _detector2.default.platform();
    this.originalTop = getOriginalTop();

    // Deprecated property. Will be removed in future versions.
    this.originalTopMargin = this.originalTop;
  }

  _createClass(SmartBanner, [{
    key: 'publish',
    value: function publish() {
      if (Object.keys(this.options).length === 0) {
        throw new Error('No options detected. Please consult documentation.');
      } else if (_bakery2.default.baked) {
        return false;
      }
      var bannerDiv = document.createElement('div');
      document.querySelector('body').appendChild(bannerDiv);
      bannerDiv.outerHTML = this.html;
      //let position = Detector.jQueryMobilePage ? this.originalTop : this.originalTopMargin;
      //setTopMarginOrTop(position + this.height);
      setContentTop(this.originalTop + this.height);
      addEventListeners(this);
    }
  }, {
    key: 'exit',
    value: function exit() {
      var banner = document.querySelector('.js_smartbanner');
      banner.outerHTML = '';
      //let position = Detector.jQueryMobilePage ? this.originalTop : this.originalTopMargin;
      //setTopMarginOrTop(position);
      setContentTop(this.originalTop);
      _bakery2.default.bake();
    }
  }, {
    key: 'priceSuffix',
    get: function get() {
      if (this.platform === 'ios') {
        return this.options.priceSuffixApple;
      } else if (this.platform === 'android') {
        return this.options.priceSuffixGoogle;
      }
      return '';
    }
  }, {
    key: 'icon',
    get: function get() {
      if (this.platform === 'android') {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
  }, {
    key: 'buttonUrl',
    get: function get() {
      if (this.platform === 'android') {
        return this.options.buttonUrlGoogle;
      } else if (this.platform === 'ios') {
        return this.options.buttonUrlApple;
      }
      return '#';
    }
  }, {
    key: 'html',
    get: function get() {
      return '<div class="smartbanner smartbanner--' + this.platform + ' js_smartbanner">\n      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>\n      <div class="smartbanner__icon" style="background-image: url(' + this.icon + ');"></div>\n      <div class="smartbanner__info">\n        <div>\n          <div class="smartbanner__info__title">' + this.options.title + '</div>\n          <div class="smartbanner__info__author">' + this.options.author + '</div>\n          <div class="smartbanner__info__price">' + this.options.price + this.priceSuffix + '</div>\n        </div>\n      </div>\n      <a href="' + this.buttonUrl + '" class="smartbanner__button"><span class="smartbanner__button__label">' + this.options.button + '</span></a>\n    </div>';
    }
  }, {
    key: 'height',
    get: function get() {
      var height = document.querySelector('.js_smartbanner').offsetHeight;
      return height !== undefined ? height : 0;
    }
  }]);

  return SmartBanner;
}();

exports.default = SmartBanner;

},{"./bakery.js":1,"./detector.js":2,"./optionparser.js":4}]},{},[3]);
