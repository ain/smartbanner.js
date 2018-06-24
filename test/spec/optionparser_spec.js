let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import OptionParser from '../../src/optionparser.js';

describe('OptionParser', function() {

  const HTML_WITH_FULL_OPTIONS = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="smartbanner:title" content="Smart Application">
      <meta name="smartbanner:author" content="SmartBanner Contributors">
      <meta name="smartbanner:price" content="FREE">
      <meta name="smartbanner:price-suffix-apple" content=" - On the App Store">
      <meta name="smartbanner:price-suffix-google" content=" - In Google Play">
      <meta name="smartbanner:icon-apple" content="icon--apple.jpg">
      <meta name="smartbanner:icon-google" content="icon--google.jpg">
      <meta name="smartbanner:button" content="VIEW">
      <meta name="smartbanner:button-url-apple" content="https://itunes.apple.com/us/genre/ios/id36?mt=8">
      <meta name="smartbanner:button-url-google" content="https://play.google.com/store">
      <meta name="smartbanner:enabled-platforms" content="android">
      <meta name="smartbanner:custom-design-modifier" content="tekkie.flashbit.net">
      <meta name="smartbanner:hide-path" content="/smartbanner">
    </head>
    <body>
    </body>
    </html>`;
  const HTML_WITHOUT_SMARTBANNER_META = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body>
    </body>
    </html>`;
  const HTML_WITHOUT_META = `<!doctype html>
    <html>
    <head></head>
    <body>
    </body>
    </html>`;

  const { JSDOM } = jsdom;

  describe('parse', function() {

    let parser = new OptionParser();
    let options = null;

    context('with smartbanner meta tags', function() {

      before(function() {
        global.document = new JSDOM(HTML_WITH_FULL_OPTIONS).window.document;
        options = parser.parse();
      });

      it('expected to parse title', function() {
        expect(options.title).to.eql('Smart Application');
      });

      it('expected to parse author', function() {
        expect(options.author).to.eql('SmartBanner Contributors');
      });

      it('expected to parse price', function() {
        expect(options.price).to.eql('FREE');
      });

      it('expected to parse iOS price suffix', function() {
        expect(options.priceSuffixApple).to.eql(' - On the App Store');
      });

      it('expected to parse Android price suffix', function() {
        expect(options.priceSuffixGoogle).to.eql(' - In Google Play');
      });

      it('expected to parse button label', function() {
        expect(options.button).to.eql('VIEW');
      });

      it('expected to parse iOS icon', function() {
        expect(options.iconApple).to.eql('icon--apple.jpg');
      });

      it('expected to parse Android icon', function() {
        expect(options.iconGoogle).to.eql('icon--google.jpg');
      });

      it('expected to parse iOS button URL', function() {
        expect(options.buttonUrlApple).to.eql('https://itunes.apple.com/us/genre/ios/id36?mt=8');
      });

      it('expected to parse Android button URL', function() {
        expect(options.buttonUrlGoogle).to.eql('https://play.google.com/store');
      });

      it('expected to parse enabled platforms option', function() {
        expect(options.enabledPlatforms).to.eql('android');
      });

      it('expected to parse custom design modifier option', function() {
        expect(options.customDesignModifier).to.eql('tekkie.flashbit.net');
      });

      it('expected to parse hide path option', function() {
        expect(options.hidePath).to.eql('/smartbanner');
      });
    });

    context('without smartbanner meta tags', function() {

      before(function() {
        global.document = new JSDOM(HTML_WITHOUT_SMARTBANNER_META).window.document;
        options = parser.parse();
      });

      it('expected to return empty object', function() {
        expect(options).to.be.empty;
      });

    });

    context('without any meta tags', function() {

      before(function() {
        global.document = new JSDOM(HTML_WITHOUT_META).window.document;
        options = parser.parse();
      });

      it('expected to return empty object', function() {
        expect(options).to.be.empty;
      });

    });

  });

});
