let jsdom = require('jsdom');

import SmartBanner from '../../src/smartbanner.js';

describe('SmartBanner', function() {

  const { JSDOM } = jsdom;
  const HEAD = `<head>
      <meta charset="utf-8">
      <meta name="smartbanner:title" content="Smart Application">
      <meta name="smartbanner:author" content="SmartBanner Contributors">
      <meta name="smartbanner:price" content="FREE">
      <meta name="smartbanner:price-suffix-apple" content=" - On the App Store">
      <meta name="smartbanner:price-suffix-google" content=" - In Google Play">
      <meta name="smartbanner:icon-apple" content="icon--apple.jpg">
      <meta name="smartbanner:icon-google" content="icon--google.jpg">
      <meta name="smartbanner:button" content="View">
      <meta name="smartbanner:button-url-apple" content="https://itunes.apple.com/us/genre/ios/id36?mt=8">
      <meta name="smartbanner:button-url-google" content="https://play.google.com/store">
      <meta name="smartbanner:disable-positioning" content="false">
    </head>`;

  const HTML = `<!doctype html>
    <html style="margin-top:10px;">
    ${HEAD}
    <body>
    </body>
  </html>`;

  const USER_AGENT_IPHONE_IOS9 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPAD = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4';
  const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]';

  let smartbanner = null;

  describe('publish', function() {

    context('when on iPhone', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.$ = undefined;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      afterEach(function() {
        smartbanner.exit();
      });

      it('expected to dispatch a smartbanner.view event', function(done) {
        document.addEventListener('smartbanner.view', function () {
          done();
        });
        smartbanner.publish();
      });

    });

    context('when on iPad', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPAD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to dispatch a smartbanner.view event', function(done) {
        document.addEventListener('smartbanner.view', function () {
          done();
        });
        smartbanner.publish();
      });

    });

    context('when on iPod', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPOD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to dispatch a smartbanner.view event', function(done) {
        document.addEventListener('smartbanner.view', function () {
          done();
        });
        smartbanner.publish();
      });

    });

    context('when on Android', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to dispatch a smartbanner.view event', function(done) {
        document.addEventListener('smartbanner.view', function () {
          done();
        });
        smartbanner.publish();
      });

    });

  });

  describe('exit', function() {

    context('when on iPhone', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to dispatch a smartbanner.exit event', function(done) {
        document.addEventListener('smartbanner.exit', function () {
          done();
        });
        smartbanner.exit();
      });

    });

    context('when on iPad', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPAD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to dispatch a smartbanner.exit event', function(done) {
        document.addEventListener('smartbanner.exit', function () {
          done();
        });
        smartbanner.exit();
      });

    });

    context('when on iPod', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPOD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to dispatch a smartbanner.exit event', function(done) {
        document.addEventListener('smartbanner.exit', function () {
          done();
        });
        smartbanner.exit();
      });

    });

    context('when on Android', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to dispatch a smartbanner.exit event', function(done) {
        document.addEventListener('smartbanner.exit', function () {
          done();
        });
        smartbanner.exit();
      });

    });

  });

  describe('clickout', function() {

    context('when on iPhone', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.$ = undefined;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      afterEach(function() {
        smartbanner.exit();
      });

      it('expected to dispatch smartbanner.clickout event', function(done) {
        document.addEventListener('smartbanner.clickout', function () {
          done();
        });
        smartbanner.publish();
        smartbanner.clickout();
      });

    });

    context('when on iPad', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPAD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to dispatch smartbanner.clickout event', function(done) {
        document.addEventListener('smartbanner.clickout', function () {
          done();
        });
        smartbanner.publish();
        smartbanner.clickout();
      });

    });

    context('when on iPod', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPOD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to dispatch smartbanner.clickout event', function(done) {
        document.addEventListener('smartbanner.clickout', function () {
          done();
        });
        smartbanner.publish();
        smartbanner.clickout();
      });

    });

    context('when on Android', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to dispatch event', function(done) {
        document.addEventListener('smartbanner.clickout', function () {
          done();
        });
        smartbanner.publish();
        smartbanner.clickout();
      });

    });

  });

});
