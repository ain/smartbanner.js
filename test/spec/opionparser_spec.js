let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import OptionParser from '../../src/optionparser.js';

describe('OptionParser', function() {

  describe('parse', function() {

    let parser;

    context('with smartbanner meta tags', function() {

      before(function() {
        global.document = jsdom.jsdom('<!doctype html>' +
          '<html>' +
          '<head>' +
            '<meta charset="utf-8">' +
            '<meta name="smartbanner:title" content="Smart Application">' +
            '<meta name="smartbanner:author" content="SmartBanner Contributors">' +
            '<meta name="smartbanner:price" content="FREE">' +
            '<meta name="smartbanner:price-suffix-apple" content=" - On the App Store">' +
            '<meta name="smartbanner:price-suffix-google" content=" - In Google Play">' +
            '<meta name="smartbanner:button" content="VIEW">' +
          '</head>' +
          '<body>' +
          '</body>' +
          '</html>');
        parser = new OptionParser();
      });

      it('expected to not return null', function() {
        expect(parser.options).to.not.be.null;
      });

      it('expected to parse title', function() {
        expect(parser.options.title).to.eql('Smart Application');
      });

      it('expected to parse author', function() {
        expect(parser.options.author).to.eql('SmartBanner Contributors');
      });

      it('expected to parse price', function() {
        expect(parser.options.price).to.eql('FREE');
      });

      // TODO: transform price suffixes to camelCase and test
      xit('expected to parse iOS price suffix', function() {
        expect(parser.options.priceSuffixApple).to.eql(' - On the App Store');
      });

      // TODO: transform price suffixes to camelCase and test
      xit('expected to parse Android price suffix', function() {
        expect(parser.options.priceSuffixGoogle).to.eql(' - In Google Play');
      });

      it('expected to parse button label', function() {
        expect(parser.options.button).to.eql('VIEW');
      });

    });

    context('without smartbanner meta tags', function() {

      before(function() {
        global.document = jsdom.jsdom('<!doctype html>' +
          '<html>' +
          '<head>' +
            '<meta charset="utf-8">' +
          '</head>' +
          '<body>' +
          '</body>' +
          '</html>');
        parser = new OptionParser();
      });

      it('expected to return empty object', function() {
        expect(parser.options).to.be.empty;
      });

    });

    context('without any meta tags', function() {

      before(function() {
        global.document = jsdom.jsdom('<!doctype html>' +
          '<html>' +
          '<head>' +
          '</head>' +
          '<body>' +
          '</body>' +
          '</html>');
        parser = new OptionParser();
      });

      it('expected to return empty object', function() {
        expect(parser.options).to.be.empty;
      });

    });

  });

});
