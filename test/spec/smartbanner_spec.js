let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import SmartBanner from '../../src/smartbanner.js';
import Bakery from '../../src/bakery.js';

describe('SmartBanner', function() {

  const HTML = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
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
    </head>
    <body>
      <div class="ui-page ui-page-active" style="position:absolute; top:12px;"></div>
      <div class="ui-page" style="position:absolute; top:13px;"></div>
    </body>
  </html>`;

  const HTML_DISABLED_POSITIONING = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
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
      <meta name="smartbanner:disable-positioning" content="true">
    </head>
    <body>
      <div class="ui-page ui-page-active" style="position:absolute; top:12px;"></div>
      <div class="ui-page" style="position:absolute; top:13px;"></div>
    </body>
  </html>`;

  const SCRIPTS = [
    'https://code.jquery.com/jquery-3.1.1.min.js',
    'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js'
  ];

  const IOS_BODY = `<div class="smartbanner smartbanner--ios js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--apple.jpg);"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">Smart Application</div>
          <div class="smartbanner__info__author">SmartBanner Contributors</div>
          <div class="smartbanner__info__price">FREE - On the App Store</div>
        </div>
      </div>
      <a href="https://itunes.apple.com/us/genre/ios/id36?mt=8" target="_blank" class="smartbanner__button"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const ANDROID_BODY = `<div class="smartbanner smartbanner--android js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--google.jpg);"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">Smart Application</div>
          <div class="smartbanner__info__author">SmartBanner Contributors</div>
          <div class="smartbanner__info__price">FREE - In Google Play</div>
        </div>
      </div>
      <a href="https://play.google.com/store" target="_blank" class="smartbanner__button"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const USER_AGENT_IPHONE_IOS8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4';
  const USER_AGENT_IPHONE_IOS9 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPHONE_CUSTOM_WEBAPP = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1 My Example Webapp';
  const USER_AGENT_IPAD = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4';
  const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]';
  const USER_AGENT_ANDROID_CUSTOM_WEBAPP = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]  My Example Webapp';
  const USER_AGENT_DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7';

  let smartbanner = null;

  describe('publish', function() {

    context('without options', function() {

      before(function() {
        global.document = jsdom.jsdom('<html></html>', { userAgent: USER_AGENT_IPHONE_IOS9 });
        global.getComputedStyle = document.defaultView.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to throw error', function() {
        expect(() => smartbanner.publish()).to.throw('No options detected. Please consult documentation.');
      });

    });

    context('direct api usage', function() {
      const HTML_WITH_API = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
          <meta charset="utf-8">
          <meta name="smartbanner:api" content="true">
        </head>
        <body>
        </body>
      </html>`;

      context('when we append meta api and no arguments in constructor', function() {
          before(function() {
            global.window = jsdom.jsdom(HTML_WITH_API, {userAgent: USER_AGENT_IPHONE_IOS9}).defaultView;
            global.document = window.document;
          });

          it('expected to throw error', function() {
            expect(() => new SmartBanner()).to.throw('No options detected in constructor with api enabled');
          });
      });

      context('when on we do not append meta api with arguments in constructor', function() {
          before(function() {
            global.window = jsdom.jsdom(HTML, {userAgent: USER_AGENT_IPHONE_IOS9}).defaultView;
            global.document = window.document;
            smartbanner = new SmartBanner({
              title: 'Smart Application',
              author: 'SmartBanner Contributors',
              price: 'FREE',
              button: 'View',
              priceSuffixApple: ' - On the App Store',
              buttonUrlApple: 'https://itunes.apple.com/us/genre/ios/id36?mt=8',
              iconApple: 'icon--apple.jpg',
            });
          });

          it('expected to add iOS template to body', function() {
            smartbanner.publish();
            let html = document.querySelector('.js_smartbanner').outerHTML;
            expect(html).to.eql(IOS_BODY);
          });
      });

      context('when on we append meta api and pass arguments to constructor', function() {
        before(function() {
          global.window = jsdom.jsdom(HTML_WITH_API, { userAgent: USER_AGENT_IPHONE_IOS9 }).defaultView;
          global.document = window.document;
          smartbanner = new SmartBanner({
            title: 'Smart Application',
            author: 'SmartBanner Contributors',
            price: 'FREE',
            button: 'View',
            priceSuffixApple: ' - On the App Store',
            buttonUrlApple: 'https://itunes.apple.com/us/genre/ios/id36?mt=8',
            iconApple: 'icon--apple.jpg',
          });
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          let html = document.querySelector('.js_smartbanner').outerHTML;
          expect(html).to.eql(IOS_BODY);
        });
      });

    });

    context('with options', function() {

      context('when on iPhone', function() {

        beforeEach(function() {
          global.window = jsdom.jsdom(HTML, {userAgent: USER_AGENT_IPHONE_IOS9}).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          global.$ = undefined;
          smartbanner = new SmartBanner();
        });

        afterEach(function() {
          smartbanner.exit();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          let html = document.querySelector('.js_smartbanner').outerHTML;
          expect(html).to.eql(IOS_BODY);
        });

        it('expected to store original top margin', function() {
          let html = document.querySelector('html');
          let margin = parseFloat(getComputedStyle(html).marginTop);
          smartbanner.publish();
          expect(smartbanner.originalTopMargin).to.eql(margin);
        });

      });

      context('when on iPad', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, {userAgent: USER_AGENT_IPAD}).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          smartbanner = new SmartBanner();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          let html = document.querySelector('.js_smartbanner').outerHTML;
          expect(html).to.eql(IOS_BODY);
        });

      });

      context('when on iPod', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, {userAgent: USER_AGENT_IPOD}).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          smartbanner = new SmartBanner();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          let html = document.querySelector('.js_smartbanner').outerHTML;
          expect(html).to.eql(IOS_BODY);
        });

      });

      context('when on Android', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          smartbanner = new SmartBanner();
        });

        it('expected to add Android template to body', function() {
          smartbanner.publish();
          let html = document.querySelector('.js_smartbanner').outerHTML;
          expect(html).to.eql(ANDROID_BODY);
        });

      });

      context('when on desktop', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_DESKTOP }).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          smartbanner = new SmartBanner();
          smartbanner.publish();
        });

        it('expected to not add anything to body', function() {
          expect(document.querySelector('.js_smartbanner')).to.be.null;
        });

      });

    });

    context('when has been closed within current session', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
        smartbanner.exit();
      });

      it('expected to not to add to body', function() {
        smartbanner.publish();
        expect(document.querySelector('.js_smartbanner')).not.to.exist;
      });

    });

    context('when has been closed, but is reopened in new session', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
        smartbanner.exit();
      });

      it('expected to add to body', function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
        expect(document.querySelector('.js_smartbanner')).to.exist;
      });

    });

    context('when enabled-platform set to android, but opened on iOS', function() {
      const HTML_WITH_PLATFROM_OPTION_ANDROID = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
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
          <meta name="smartbanner:enabled-platforms" content="android">
        </head>
        <body>
        </body>
      </html>`;

      before(function() {
        global.window = jsdom.jsdom(HTML_WITH_PLATFROM_OPTION_ANDROID, { userAgent: USER_AGENT_IPHONE_IOS9 }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to not add anything to body', function() {
        expect(document.querySelector('.js_smartbanner')).to.be.null;
      });

    });

    context('when enabled-platform set to android, but opened on iOS 9 which is included by include-user-agent-regex', function() {
      const HTML_WITH_PLATFROM_OPTION_ANDROID_INCLUDE_IOS9 = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
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
          <meta name="smartbanner:enabled-platforms" content="android">
          <meta name="smartbanner:include-user-agent-regex" content=".*iPhone OS [9\\-10].*">
        </head>
        <body>
        </body>
      </html>`;

      before(function() {
        global.window = jsdom.jsdom(HTML_WITH_PLATFROM_OPTION_ANDROID_INCLUDE_IOS9, { userAgent: USER_AGENT_IPHONE_IOS9 }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to add iOS template to body', function() {
        smartbanner.publish();
        let html = document.querySelector('.js_smartbanner').outerHTML;
        expect(html).to.eql(IOS_BODY);
      });

    });

    context('when enabled-platform set to android, but opened on iOS 9 webapp which is included by include-user-agent-regex but ' +
      'excluded by exclude-user-agent-regex', function() {
      const HTML_WITH_PLATFROM_OPTION_ANDROID_INCLUDE_IOS9_EXCLUDE_WEBAPP = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
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
          <meta name="smartbanner:enabled-platforms" content="android">
          <meta name="smartbanner:include-user-agent-regex" content=".*iPhone OS [9\\-10].*">
          <meta name="smartbanner:exclude-user-agent-regex" content=".*My Example Webapp$">
        </head>
        <body>
        </body>
      </html>`;

      before(function() {
        global.window = jsdom.jsdom(HTML_WITH_PLATFROM_OPTION_ANDROID_INCLUDE_IOS9_EXCLUDE_WEBAPP, { userAgent: USER_AGENT_IPHONE_CUSTOM_WEBAPP }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to not add anything to body', function() {
        expect(document.querySelector('.js_smartbanner')).to.be.null;
      });

    });

    context('when enabled-platform set to ios, but opened on Android', function() {
      const HTML_WITH_PLATFROM_OPTION_IOS = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
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
          <meta name="smartbanner:enabled-platforms" content="ios">
        </head>
        <body>
        </body>
      </html>`;

      before(function() {
        global.window = jsdom.jsdom(HTML_WITH_PLATFROM_OPTION_IOS, { userAgent: USER_AGENT_ANDROID }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to not add anything to body', function() {
        expect(document.querySelector('.js_smartbanner')).to.be.null;
      });

    });

  });

  describe('template', function() {

    context('when on iPhone', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE_IOS9 }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to work against iOS platform', function() {
        expect(smartbanner.platform).to.eql('ios');
      });

      it('expected to have iOS price suffix', function() {
        expect(smartbanner.priceSuffix).to.eql(' - On the App Store');
      });

      it('expected to return iOS template', function() {
        expect(smartbanner.html).to.eql(IOS_BODY);
      });

      it('expected to have iOS icon', function() {
        expect(smartbanner.icon).to.eql('icon--apple.jpg');
      });

      it('expected to have iOS button URL', function() {
        expect(smartbanner.buttonUrl).to.eql('https://itunes.apple.com/us/genre/ios/id36?mt=8');
      });

    });

    context('when on iPad', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPAD }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to work against iOS platform', function() {
        expect(smartbanner.platform).to.eql('ios');
      });

      it('expected to have iOS price suffix', function() {
        expect(smartbanner.priceSuffix).to.eql(' - On the App Store');
      });

      it('expected to return iOS template', function() {
        expect(smartbanner.html).to.eql(IOS_BODY);
      });

      it('expected to have iOS icon', function() {
        expect(smartbanner.icon).to.eql('icon--apple.jpg');
      });

      it('expected to have iOS button URL', function() {
        expect(smartbanner.buttonUrl).to.eql('https://itunes.apple.com/us/genre/ios/id36?mt=8');
      });

    });

    context('when on iPod', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPOD }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to work against iOS platform', function() {
        expect(smartbanner.platform).to.eql('ios');
      });

      it('expected to have iOS price suffix', function() {
        expect(smartbanner.priceSuffix).to.eql(' - On the App Store');
      });

      it('expected to return iOS template', function() {
        expect(smartbanner.html).to.eql(IOS_BODY);
      });

      it('expected to have iOS icon', function() {
        expect(smartbanner.icon).to.eql('icon--apple.jpg');
      });

      it('expected to have iOS button URL', function() {
        expect(smartbanner.buttonUrl).to.eql('https://itunes.apple.com/us/genre/ios/id36?mt=8');
      });

    });

    context('when on Android', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to work against Android platform', function() {
        expect(smartbanner.platform).to.eql('android');
      });

      it('expected to have Android price suffix', function() {
        expect(smartbanner.priceSuffix).to.eql(' - In Google Play');
      });

      it('expected to return Android template', function() {
        expect(smartbanner.html).to.eql(ANDROID_BODY);
      });

      it('expected to have Android icon', function() {
        expect(smartbanner.icon).to.eql('icon--google.jpg');
      });

      it('expected to have Android button URL', function() {
        expect(smartbanner.buttonUrl).to.eql('https://play.google.com/store');
      });

    });

  });

  describe('exit', function() {

    context('without jQuery Mobile', function(done) {

      beforeEach(function(done) {
        jsdom.env({
          html: HTML,
          userAgent: USER_AGENT_IPHONE_IOS9,
          done: function(err, window) {
            global.document = window.document;
            global.window = window;
            global.getComputedStyle = window.getComputedStyle;
            smartbanner = new SmartBanner();
            smartbanner.publish();
            done();
          }
        });
      });

      it('expected to set cookie', function(done) {
        smartbanner.exit();
        expect(Bakery.baked).to.be.true;
        done();
      });

      it('expected to remove component markup', function(done) {
        smartbanner.exit();
        let element = document.querySelector('.js_smartbanner');
        expect(element).not.to.exist;
        done();
      });

      it('expected to restore HTML margin', function(done) {
        smartbanner.exit();
        let html = document.querySelector('html');
        let margin = parseFloat(getComputedStyle(html).marginTop);
        if (isNaN(margin)) {
          margin = 0;
        }
        expect(margin).to.eql(smartbanner.originalTopMargin);
        done();
      });
    });

    context('with jQuery Mobile', function(done) {
      before(function(done) {
        jsdom.env({
          html: HTML,
          scripts: SCRIPTS,
          userAgent: USER_AGENT_IPHONE_IOS9,
          done: function(err, window) {
            global.document = window.document;
            global.window = window;
            global.$ = window.jQuery;
            global.getComputedStyle = window.getComputedStyle;
            smartbanner = new SmartBanner();
            smartbanner.publish();
            done();
          }
        });
      });

      it('expected to restore top distance', function(done) {
        smartbanner.exit();
        let page = document.querySelector('.ui-page');
        let top = parseFloat(getComputedStyle(page).top);
        if (isNaN(top)) {
          top = 0;
        }
        expect(top).to.eql(smartbanner.originalTop);
        done();
      });
    });

  });

  describe('height', function() {
    before(function(done) {
      jsdom.env({
        html: HTML,
        scripts: SCRIPTS,
        done: function(err, window) {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE_IOS9 }).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          smartbanner = new SmartBanner();
          smartbanner.publish();
          done();
        }
      });
    });

    it('expected to match component offset height', function(done) {
      let height = document.querySelector('.js_smartbanner').offsetHeight;
      height = height !== undefined ? height : 0;
      expect(smartbanner.height).to.eql(height);
      done();
    });
  });

  describe('disable-positioning', function() {
    before(function(done) {
      jsdom.env({
        html: HTML_DISABLED_POSITIONING,
        scripts: SCRIPTS,
        done: function(err, window) {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE_IOS9 }).defaultView;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          smartbanner = new SmartBanner();
          smartbanner.publish();
          done();
        }
      });
    });

    it('expected to match component offset height', function(done) {
      let height = document.querySelector('.js_smartbanner').offsetHeight;
      height = height !== undefined ? height : 0;
      expect(smartbanner.height).to.eql(height);
      done();
    });

    it('expected to not alter <html> top margin', function(done) {
      let html = document.querySelector('html');
      let margin = parseFloat(getComputedStyle(html).marginTop);
      if (isNaN(margin)) {
        margin = 0;
      }
      expect(margin).to.eql(10);
      done();
    });

    it('expected to not alter ui-page top margin', function(done) {
      let page = document.querySelector('.ui-page');
      let top = parseFloat(getComputedStyle(page).top);
      if (isNaN(top)) {
        top = 0;
      }
      expect(top).to.eql(12);
      done();
    });
  });

});
