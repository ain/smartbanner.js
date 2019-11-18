let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import SmartBanner from '../../src/smartbanner.js';
import Bakery from '../../src/bakery.js';

describe('SmartBanner', function() {

  const { JSDOM } = jsdom;
  const HEAD = `<meta charset="utf-8">
      <meta name="smartbanner:title" content="Smart Application">
      <meta name="smartbanner:author" content="SmartBanner Contributors">
      <meta name="smartbanner:price" content="FREE">
      <meta name="smartbanner:price-suffix-apple" content=" - On the App Store">
      <meta name="smartbanner:price-suffix-google" content=" - In Google Play">
      <meta name="smartbanner:icon-apple" content="icon--apple.jpg">
      <meta name="smartbanner:icon-google" content="icon--google.jpg">
      <meta name="smartbanner:button" content="View">
      <meta name="smartbanner:button-url-apple" content="https://itunes.apple.com/us/genre/ios/id36?mt=8">
      <meta name="smartbanner:button-url-google" content="https://play.google.com/store">`;

  const HTML = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
    </head>
    <body>
    </body>
  </html>`;

  const HTML_WITH_CONCLUDE = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
    </head>
    <body>
      ${SCRIPTS}
    </body>
  </html>`;

  const HTML_DISABLED_POSITIONING = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
      <meta name="smartbanner:disable-positioning" content="true">
    </head>
    <body>
      <div class="ui-page ui-page-active" style="position:absolute; top:12px;"></div>
      <div class="ui-page" style="position:absolute; top:13px;"></div>
    </body>
  </html>`;

  const HTML_CUSTOM_DESIGN_MODIFIER = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
      <meta name="smartbanner:custom-design-modifier" content="custom-design">
      <meta name="smartbanner:close-label" content="Close banner">
    </head>
    <body>
    </body>
  </html>`;

  const HTML_API = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
      <meta name="smartbanner:api" content="true">
    </head>
    <body>
    </body>
  </html>`;

  const HTML_IOS = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
      <meta name="smartbanner:close-label" content="Close iOS Smart App Banner">
    </head>
    <body>
    </body>
  </html>`;

  const HTML_ANDROID = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
      <meta name="smartbanner:close-label" content="Close Android Smart App Banner">
    </head>
    <body>
    </body>
  </html>`;

  const HTML_UNKNOWN = `<!doctype html>
    <html style="margin-top:10px;">
    <head>
      ${HEAD}
      <meta name="smartbanner:close-label" content="Close Smart App Banner">
    </head>
    <body>
    </body>
  </html>`;

  const SCRIPTS = `<script>window.conclude();</script>`;
  const SCRIPTS_JQUERY_MOBILE = `<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script>window.conclude();</script>`;
  const HTML_WITH_JQUERY_MOBILE = `<!doctype html><html><head></head><body class="ui-page">${SCRIPTS_JQUERY_MOBILE}</body></html>`;
  const HTML_WITH_JQUERY_MOBILE_AND_META = `<!doctype html><html>${HEAD}<body class="ui-page">${SCRIPTS_JQUERY_MOBILE}</body></html>`;

  const IOS_BODY = `<div class="smartbanner smartbanner--ios js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit" aria-label="Close iOS Smart App Banner"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--apple.jpg);"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">Smart Application</div>
          <div class="smartbanner__info__author">SmartBanner Contributors</div>
          <div class="smartbanner__info__price">FREE - On the App Store</div>
        </div>
      </div>
      <a href="https://itunes.apple.com/us/genre/ios/id36?mt=8" target="_blank" class="smartbanner__button js_smartbanner__button" rel="noopener" aria-label="View"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const ANDROID_BODY = `<div class="smartbanner smartbanner--android js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit" aria-label="Close Android Smart App Banner"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--google.jpg);"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">Smart Application</div>
          <div class="smartbanner__info__author">SmartBanner Contributors</div>
          <div class="smartbanner__info__price">FREE - In Google Play</div>
        </div>
      </div>
      <a href="https://play.google.com/store" target="_blank" class="smartbanner__button js_smartbanner__button" rel="noopener" aria-label="View"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const UNDEFINED_BODY = `<div class="smartbanner smartbanner--undefined js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit" aria-label="Close Smart App Banner"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--apple.jpg);"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">Smart Application</div>
          <div class="smartbanner__info__author">SmartBanner Contributors</div>
          <div class="smartbanner__info__price">FREE</div>
        </div>
      </div>
      <a href="#" target="_blank" class="smartbanner__button js_smartbanner__button" rel="noopener" aria-label="View"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const ANDROID_CUSTOM_DESIGN_BODY = `<div class="smartbanner smartbanner--custom-design js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit" aria-label="Close banner"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--google.jpg);"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">Smart Application</div>
          <div class="smartbanner__info__author">SmartBanner Contributors</div>
          <div class="smartbanner__info__price">FREE - In Google Play</div>
        </div>
      </div>
      <a href="https://play.google.com/store" target="_blank" class="smartbanner__button js_smartbanner__button" rel="noopener" aria-label="View"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const USER_AGENT_IPHONE_IOS8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4';
  const USER_AGENT_IPHONE_IOS9 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPHONE_CUSTOM_WEBAPP = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1 My Example Webapp';
  const USER_AGENT_IPAD = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4';
  const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]';
  const USER_AGENT_ANDROID_CUSTOM_WEBAPP = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]  My Example Webapp';
  const USER_AGENT_DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7';
  const USER_AGENT_UNKNOWN = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/0.0.1 Unknown/0.0.1';

  let smartbanner = null;

  describe('publish', function() {

    context('without options', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({userAgent: USER_AGENT_IPHONE_IOS9});
        global.window = new JSDOM('<html></html>', { resource: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = global.document.defaultView.getComputedStyle;
        smartbanner = new SmartBanner();
      });

      it('expected to throw error', function() {
        expect(() => smartbanner.publish()).to.throw('No options detected. Please consult documentation.');
      });

    });

    context('with options', function() {

      context('when on iPhone', function() {

        beforeEach(function() {
          const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
          global.window = new JSDOM(HTML_IOS, { resources: resourceLoader }).window;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          global.$ = undefined;
          global.Event = window.Event;
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
          const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPAD });
          global.window = new JSDOM(HTML_IOS, { resources: resourceLoader }).window;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          global.Event = window.Event;
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
          const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPOD });
          global.window = new JSDOM(HTML_IOS, { resources: resourceLoader }).window;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          global.Event = window.Event;
          smartbanner = new SmartBanner();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          let html = document.querySelector('.js_smartbanner').outerHTML;
          expect(html).to.eql(IOS_BODY);
        });

      });

      context('when on Android', function() {

        context('without custom design modifier', function() {
          before(function() {
            const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
            global.window = new JSDOM(HTML_ANDROID, { resources: resourceLoader }).window;
            global.document = window.document;
            global.getComputedStyle = window.getComputedStyle;
            global.Event = window.Event;
            smartbanner = new SmartBanner();
          });

          it('expected to add Android template to body', function() {
            smartbanner.publish();
            let html = document.querySelector('.js_smartbanner').outerHTML;
            expect(html).to.eql(ANDROID_BODY);
          });

        });

        context('with custom design modifier', function() {
          before(function() {
            const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
            global.window = new JSDOM(HTML_CUSTOM_DESIGN_MODIFIER, { resources: resourceLoader }).window;
            global.document = window.document;
            global.getComputedStyle = window.getComputedStyle;
            global.Event = window.Event;
            smartbanner = new SmartBanner();
          });

          it('expected to add Android template to body', function() {
            smartbanner.publish();
            let html = document.querySelector('.js_smartbanner').outerHTML;
            expect(html).to.eql(ANDROID_CUSTOM_DESIGN_BODY);
          });
        });

      });

      context('when on desktop', function() {

        before(function() {
          const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_DESKTOP });
          global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
        smartbanner.publish();
        smartbanner.exit();
      });

      it('expected to add to body', function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML_WITH_PLATFROM_OPTION_ANDROID, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
          <meta name="smartbanner:close-label" content="Close iOS Smart App Banner">
        </head>
        <body>
        </body>
      </html>`;

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML_WITH_PLATFROM_OPTION_ANDROID_INCLUDE_IOS9, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_CUSTOM_WEBAPP });
        global.window = new JSDOM(HTML_WITH_PLATFROM_OPTION_ANDROID_INCLUDE_IOS9_EXCLUDE_WEBAPP, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML_WITH_PLATFROM_OPTION_IOS, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML_IOS, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPAD });
        global.window = new JSDOM(HTML_IOS, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPOD });
        global.window = new JSDOM(HTML_IOS, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML_ANDROID, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
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

    context('when on unidentified platform', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_UNKNOWN });
        global.window = new JSDOM(HTML_UNKNOWN, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        global.Event = window.Event;
        smartbanner = new SmartBanner();
      });

      it('expected to work against no platform', function() {
        expect(smartbanner.platform).to.be.undefined;
      });

      it('expected to have no price suffix', function() {
        expect(smartbanner.priceSuffix).to.be.empty;
      });

      it('expected to return undefined (broken) template', function() {
        expect(smartbanner.html).to.eql(UNDEFINED_BODY);
      });

      it('expected to have Apple icon as fallback', function() {
        expect(smartbanner.icon).to.eql('icon--apple.jpg');
      });

      it('expected to have empty button URL', function() {
        expect(smartbanner.buttonUrl).to.eql('#');
      });

    });

  });

  describe('exit', function() {

    context('without jQuery Mobile', function() {

      beforeEach(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        global.getComputedStyle = window.getComputedStyle;
        smartbanner = new SmartBanner();
        smartbanner.publish();
      });

      it('expected to set cookie', function() {
        smartbanner.exit();
        expect(Bakery.baked).to.be.true;
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
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML_WITH_JQUERY_MOBILE_AND_META, { runScripts: 'dangerously', resources: resourceLoader }).window;
        global.window.conclude = () => {
          global.document = window.document;
          global.getComputedStyle = window.getComputedStyle;
          global.$ = window.jQuery;
          global.Event = window.Event;
          smartbanner = new SmartBanner();
          smartbanner.publish();
          done();
        };
      });

      it('expected to restore top distance', function() {
        smartbanner.exit();
        let page = global.document.querySelector('.ui-page');
        let top = parseFloat(getComputedStyle(page).top);
        if (isNaN(top)) {
          top = 0;
        }
        expect(top).to.eql(smartbanner.originalTop);
      });
    });

  });

  describe('height', function() {
    before(function() {
      const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
      global.window = new JSDOM(HTML, { runScripts: 'dangerously', resources: resourceLoader }).window;
      global.document = window.document;
      global.getComputedStyle = window.getComputedStyle;
      global.Event = window.Event;
      smartbanner = new SmartBanner();
      smartbanner.publish();
    });

    context('when offset height available', function() {
      it('expected to match component offset height', function() {
        let height = document.querySelector('.js_smartbanner').offsetHeight;
        expect(smartbanner.height).to.eql(height);
      });
    });

    context('when offset height N/A', function() {
      before(function() {
        smartbanner.exit();
      });
      it('expected to return default height', function() {
        expect(smartbanner.height).to.eql(0);
      });
    });
  });

  describe('disable-positioning', function() {
    before(function() {
      const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
      global.window = new JSDOM(HTML_DISABLED_POSITIONING, { resources: resourceLoader }).window;
      global.document = window.document;
      global.getComputedStyle = window.getComputedStyle;
      global.Event = window.Event;
      smartbanner = new SmartBanner();
      smartbanner.publish();
    });

    it('expected to match component offset height', function() {
      let height = document.querySelector('.js_smartbanner').offsetHeight;
      height = height !== undefined ? height : 0;
      expect(smartbanner.height).to.eql(height);
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

  describe('apiEnabled', function() {

    const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });

    context('when API option not set', function() {

      before(function() {
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('expected to return false ', function() {
        expect(smartbanner.apiEnabled).to.be.false;
      });

    });

    context('when API option set', function() {

      before(function() {
        global.window = new JSDOM(HTML_API, { resources: resourceLoader }).window;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('expected to return true ', function() {
        expect(smartbanner.apiEnabled).to.be.true;
      });

    });

  });

  describe('handleExitClick', function() {
    before(function() {
      const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
      global.window = new JSDOM(HTML_API, { resources: resourceLoader }).window;
      global.document = window.document;
      global.getComputedStyle = window.getComputedStyle;
      smartbanner = new SmartBanner();
      smartbanner.publish();
    });

    it('expected to handle exit', function(done) {
      document.addEventListener('smartbanner.exit', function () {
        done();
      });
      let clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", false, true);
      document.querySelector('.js_smartbanner__exit').dispatchEvent(clickEvent);
    });

  });

  describe('handleClickout', function() {
    before(function() {
      const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
      global.window = new JSDOM(HTML_API, { resources: resourceLoader }).window;
      global.document = window.document;
      global.getComputedStyle = window.getComputedStyle;
      smartbanner = new SmartBanner();
      smartbanner.publish();
    });

    it('expected to handle clickout', function(done) {
      document.addEventListener('smartbanner.clickout', function () {
        done();
      });
      let clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", false, true);
      document.querySelector('.js_smartbanner__button').dispatchEvent(clickEvent);
    });

  });

  describe('hidePath', function() {

    const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });

    context('when option is not set', function() {

      before(function() {
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('returns default hide path', function() {
        expect(smartbanner.hidePath).to.eql('/');
      });
    });

    context('when option is set', function() {

      const HTML_WITH_HIDE_PATH = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
          ${HEAD}
          <meta name="smartbanner:hide-path" content="/smartbannerjs">
        </head>
        <body>
          <div class="ui-page ui-page-active" style="position:absolute; top:12px;"></div>
          <div class="ui-page" style="position:absolute; top:13px;"></div>
        </body>
      </html>`;

      before(function() {
        global.window = new JSDOM(HTML_WITH_HIDE_PATH, { resources: resourceLoader }).window;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('returns option value', function() {
        expect(smartbanner.hidePath).to.eql('/smartbannerjs');
      });
    });

  });

  describe('hideTtl', function() {

    const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });

    context('when option is not set', function() {

      before(function() {
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('returns default hide time to live', function() {
        expect(smartbanner.hideTtl).to.be.false;
      });
    });

    context('when option is set', function() {

      const HTML_WITH_HIDE_TTL = `<!doctype html>
        <html style="margin-top:10px;">
        <head>
          ${HEAD}
          <meta name="smartbanner:hide-ttl" content="1244">
        </head>
        <body>
          <div class="ui-page ui-page-active" style="position:absolute; top:12px;"></div>
          <div class="ui-page" style="position:absolute; top:13px;"></div>
        </body>
      </html>`;

      before(function() {
        global.window = new JSDOM(HTML_WITH_HIDE_TTL, { resources: resourceLoader }).window;
        global.document = window.document;
        smartbanner = new SmartBanner();
      });

      it('returns option value', function() {
        expect(smartbanner.hideTtl).to.eql(1244);
      });
    });

  });

});
