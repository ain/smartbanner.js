(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _optionparser = require('./optionparser.js');

var _optionparser2 = _interopRequireDefault(_optionparser);

var _smartbanner = require('./smartbanner.js');

var _smartbanner2 = _interopRequireDefault(_smartbanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = new _optionparser2.default();
var smartbanner = new _smartbanner2.default(parser.options);

document.write('SmartBanner initilised with: ' + JSON.stringify(smartbanner.options));

},{"./optionparser.js":2,"./smartbanner.js":3}],2:[function(require,module,exports){
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

var OptionParser = function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);

    this.options = this.parse();
  }

  _createClass(OptionParser, [{
    key: 'parse',
    value: function parse() {
      var metas = document.getElementsByTagName('meta');
      if (metas.length === 0) {
        return null;
      }
      var options = {};
      Array.from(metas).forEach(function (meta) {
        var name = meta.getAttribute('name');
        var content = meta.getAttribute('content');
        if (name && content && valid(name) && content.length > 0) {
          options[name.split(':')[1]] = content;
        }
      });
      return options;
    }
  }]);

  return OptionParser;
}();

exports.default = OptionParser;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmartBanner = function SmartBanner(options) {
  _classCallCheck(this, SmartBanner);

  this.options = options;
};

exports.default = SmartBanner;

},{}]},{},[1]);
