let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import SmartBanner from '../../src/smartbanner.js';

describe('SmartBanner', function() {

  let smartbanner = null;
  let template = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="smartbanner:title" content="Smart Application">
      <meta name="smartbanner:author" content="SmartBanner Contributors">
      <meta name="smartbanner:price" content="FREE">
      <meta name="smartbanner:price-suffix-apple" content=" - On the App Store">
      <meta name="smartbanner:price-suffix-google" content=" - In Google Play">
      <meta name="smartbanner:button" content="VIEW">
    </head>
    <body>
    </body>
  </html>`;

  describe('publish', function() {

    context('without options', function() {

      before(function() {
        smartbanner = new SmartBanner();
      });

      it('expected to throw error', function() {
        expect(() => smartbanner.publish()).to.throw('No options detected. Please consult documentation.');
      });

    });

  });

  describe('template', function() {

    context('when on iPhone', function() {

      before(function() {
        global.window = jsdom.jsdom(template, {
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1'
        }).defaultView;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('expected to work against iOS platform', function() {
        expect(smartbanner.platform).to.eql('ios');
      });

      it('expected to have iOS price suffix', function() {
        expect(smartbanner.priceSuffix).to.eql(' - On the App Store');
      });

      it('expected to return iOS template', function() {
        // Incorrect indentation to match template
        let expectation = `<div class="smartbanner smartbanner--ios">
      <div class="smartbanner__icon"></div>
      <div class="smartbanner__info">
        <div class="smartbanner__info__title">Smart Application</div>
        <div class="smartbanner__info__author">SmartBanner Contributors</div>
        <div class="smartbanner__info__price">FREE - On the App Store</div>
        <div class="smartbanner__button">VIEW</div>
      </div>
    </div>`;
        expect(smartbanner.template).to.equal(expectation);
      });

    });

  });
});
