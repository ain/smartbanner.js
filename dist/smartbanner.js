/*!
 * smartbanner.js v2.0.0-beta.1 <https://github.com/ain/smartbanner.js>
 * Copyright © 2020 Ain Tohvri, contributors. Licensed under GPL-3.0.
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bakery = /*#__PURE__*/function () {
  function Bakery() {
    _classCallCheck(this, Bakery);
  }

  _createClass(Bakery, null, [{
    key: "getCookieExpiresString",
    value: function getCookieExpiresString(hideTtl) {
      var now = new Date();
      var expireTime = new Date(now.getTime() + hideTtl);
      return "expires=".concat(expireTime.toGMTString(), ";");
    }
  }, {
    key: "bake",
    value: function bake(hideTtl, hidePath) {
      document.cookie = "smartbanner_exited=1; ".concat(hideTtl ? Bakery.getCookieExpiresString(hideTtl) : '', " path=").concat(hidePath);
    }
  }, {
    key: "unbake",
    value: function unbake() {
      document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }, {
    key: "baked",
    get: function get() {
      var value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*=\s*([^;]*).*$)|^.*$/, '$1');
      return value === '1';
    }
  }]);

  return Bakery;
}();

exports["default"] = Bakery;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Detector = /*#__PURE__*/function () {
  function Detector() {
    _classCallCheck(this, Detector);
  }

  _createClass(Detector, null, [{
    key: "platform",
    value: function platform() {
      if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
        return 'ios';
      } else if (/Android/i.test(window.navigator.userAgent)) {
        return 'android';
      }
    }
  }, {
    key: "userAgentMatchesRegex",
    value: function userAgentMatchesRegex(regexString) {
      return new RegExp(regexString).test(window.navigator.userAgent);
    }
  }, {
    key: "wrapperElement",
    value: function wrapperElement() {
      return document.querySelectorAll('html');
    }
  }]);

  return Detector;
}();

exports["default"] = Detector;

},{}],3:[function(require,module,exports){
"use strict";

var _smartbanner = _interopRequireDefault(require("./smartbanner.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var smartbanner;
window.addEventListener('load', function () {
  smartbanner = new _smartbanner["default"]();

  if (smartbanner.apiEnabled) {
    window.smartbanner = smartbanner;
  } else {
    smartbanner.publish();
  }
});

},{"./smartbanner.js":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var OptionParser = /*#__PURE__*/function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);
  }

  _createClass(OptionParser, [{
    key: "parse",
    value: function parse() {
      var metas = document.getElementsByTagName('meta');
      var options = {};
      Array.apply(null, metas).forEach(function (meta) {
        var optionName = null;
        var name = meta.getAttribute('name');
        var content = meta.getAttribute('content');

        if (name && content && valid(name) && content.length > 0) {
          optionName = name.split(':')[1];

          if (optionName.indexOf('-') !== -1) {
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

exports["default"] = OptionParser;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _optionparser = _interopRequireDefault(require("./optionparser.js"));

var _detector = _interopRequireDefault(require("./detector.js"));

var _bakery = _interopRequireDefault(require("./bakery.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_PLATFORMS = 'android,ios';
var DEFAULT_CLOSE_LABEL = 'Close';

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function handleClickout(event, self) {
  self.clickout();
}

function addEventListeners(self) {
  var closeIcon = document.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', function (event) {
    return handleExitClick(event, self);
  });
  var button = document.querySelector('.js_smartbanner__button');
  button.addEventListener('click', function (event) {
    return handleClickout(event, self);
  });
}

var SmartBanner = /*#__PURE__*/function () {
  function SmartBanner() {
    _classCallCheck(this, SmartBanner);

    var parser = new _optionparser["default"]();
    this.options = parser.parse();
    this.platform = _detector["default"].platform();
    var event = new Event('smartbanner.init');
    document.dispatchEvent(event);
  }

  _createClass(SmartBanner, [{
    key: "publish",
    value: function publish() {
      if (Object.keys(this.options).length === 0) {
        throw new Error('No options detected. Please consult documentation.');
      }

      if (_bakery["default"].baked) {
        return false;
      } // User Agent was explicetely excluded by excludeUserAgentRegex


      if (this.userAgentExcluded) {
        return false;
      } // User Agent was neither included by platformEnabled nor defined by includeUserAgentRegex


      if (!(this.platformEnabled || this.userAgentIncluded)) {
        return false;
      }

      var bannerDiv = document.createElement('div');
      this.parentElement.appendChild(bannerDiv);
      bannerDiv.outerHTML = this.html;
      var event = new Event('smartbanner.view');
      document.dispatchEvent(event);
      addEventListeners(this);
    }
  }, {
    key: "exit",
    value: function exit() {
      var banner = document.querySelector('.js_smartbanner');
      document.querySelector('body').removeChild(banner);
      var event = new Event('smartbanner.exit');
      document.dispatchEvent(event);

      _bakery["default"].bake(this.hideTtl, this.hidePath);
    }
  }, {
    key: "clickout",
    value: function clickout() {
      var event = new Event('smartbanner.clickout');
      document.dispatchEvent(event);
    }
  }, {
    key: "priceSuffix",
    get: function get() {
      if (this.platform === 'ios') {
        return this.options.priceSuffixApple;
      } else if (this.platform === 'android') {
        return this.options.priceSuffixGoogle;
      }

      return '';
    }
  }, {
    key: "icon",
    get: function get() {
      if (this.platform === 'android') {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
  }, {
    key: "buttonUrl",
    get: function get() {
      if (this.platform === 'android') {
        return this.options.buttonUrlGoogle;
      } else if (this.platform === 'ios') {
        return this.options.buttonUrlApple;
      }

      return '#';
    }
  }, {
    key: "closeLabel",
    get: function get() {
      return this.options.closeLabel !== undefined ? this.options.closeLabel : DEFAULT_CLOSE_LABEL;
    }
  }, {
    key: "html",
    get: function get() {
      var modifier = !this.options.customDesignModifier ? this.platform : this.options.customDesignModifier;
      return "<div class=\"smartbanner smartbanner--".concat(modifier, " js_smartbanner\">\n      <a href=\"javascript:void();\" class=\"smartbanner__exit js_smartbanner__exit\" aria-label=\"").concat(this.closeLabel, "\"></a>\n      <div class=\"smartbanner__icon\" style=\"background-image: url(").concat(this.icon, ");\"></div>\n      <div class=\"smartbanner__info\">\n        <div class=\"smartbanner__copy\">\n          <div class=\"smartbanner__title\">").concat(this.options.title, "</div>\n          <div class=\"smartbanner__author\">").concat(this.options.author, "</div>\n          <div class=\"smartbanner__price\">").concat(this.options.price).concat(this.priceSuffix, "</div>\n        </div>\n      </div>\n      <a href=\"").concat(this.buttonUrl, "\" class=\"smartbanner__button js_smartbanner__button\" aria-label=\"").concat(this.options.button, "\"><span class=\"smartbanner__button-label\">").concat(this.options.button, "</span></a>\n    </div>");
    }
  }, {
    key: "height",
    get: function get() {
      try {
        return document.querySelector('.js_smartbanner').offsetHeight;
      } catch (error) {
        return 0;
      }
    }
  }, {
    key: "platformEnabled",
    get: function get() {
      var enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
      return enabledPlatforms && enabledPlatforms.replace(/\s+/g, '').split(',').indexOf(this.platform) !== -1;
    }
  }, {
    key: "positioningDisabled",
    get: function get() {
      return this.options.disablePositioning === 'true';
    }
  }, {
    key: "apiEnabled",
    get: function get() {
      return this.options.api === 'true';
    }
  }, {
    key: "userAgentExcluded",
    get: function get() {
      if (!this.options.excludeUserAgentRegex) {
        return false;
      }

      return _detector["default"].userAgentMatchesRegex(this.options.excludeUserAgentRegex);
    }
  }, {
    key: "userAgentIncluded",
    get: function get() {
      if (!this.options.includeUserAgentRegex) {
        return false;
      }

      return _detector["default"].userAgentMatchesRegex(this.options.includeUserAgentRegex);
    }
  }, {
    key: "hideTtl",
    get: function get() {
      return this.options.hideTtl ? parseInt(this.options.hideTtl) : false;
    }
  }, {
    key: "hidePath",
    get: function get() {
      return this.options.hidePath ? this.options.hidePath : '/';
    }
  }, {
    key: "parentElement",
    get: function get() {
      var parentElement = this.options.parentElement ? document.querySelector(this.options.parentElement) : null;
      return parentElement || document.querySelector('body');
    }
  }]);

  return SmartBanner;
}();

exports["default"] = SmartBanner;

},{"./bakery.js":1,"./detector.js":2,"./optionparser.js":4}]},{},[3]);
