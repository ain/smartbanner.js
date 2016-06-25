let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import SmartBanner from '../../src/smartbanner.js';
import Bakery from '../../src/bakery.js';

describe('SmartBanner', function() {

  const HTML = `<!doctype html>
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
      <meta name="smartbanner:button" content="View">
      <meta name="smartbanner:button-url-apple" content="https://itunes.apple.com/us/genre/ios/id36?mt=8">
      <meta name="smartbanner:button-url-google" content="https://play.google.com/store">
    </head>
    <body>
    </body>
  </html>`;

  const IOS_BODY = `<div class="smartbanner smartbanner--ios">
      <a href="#exit" class="smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--apple.jpg);"></div>
      <div class="smartbanner__info">
        <div class="smartbanner__info__title">Smart Application</div>
        <div class="smartbanner__info__author">SmartBanner Contributors</div>
        <div class="smartbanner__info__price">FREE - On the App Store</div>
      </div>
      <a href="https://itunes.apple.com/us/genre/ios/id36?mt=8" class="smartbanner__button"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const ANDROID_BODY = `<div class="smartbanner smartbanner--android">
      <a href="#exit" class="smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(icon--google.jpg);"></div>
      <div class="smartbanner__info">
        <div class="smartbanner__info__title">Smart Application</div>
        <div class="smartbanner__info__author">SmartBanner Contributors</div>
        <div class="smartbanner__info__price">FREE - In Google Play</div>
      </div>
      <a href="https://play.google.com/store" class="smartbanner__button"><span class="smartbanner__button__label">View</span></a>
    </div>`;

  const USER_AGENT_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPAD = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4'
  const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]'

  let smartbanner = null;

  describe('publish', function() {

    context('without options', function() {

      before(function() {
        smartbanner = new SmartBanner();
      });

      it('expected to throw error', function() {
        expect(() => smartbanner.publish()).to.throw('No options detected. Please consult documentation.');
      });

    });

    context('with options', function() {

      context('when on iPhone', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE }).defaultView;
          global.document = window.document;
          smartbanner = new SmartBanner();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          expect(document.body.innerHTML).to.eql(IOS_BODY);
        });

      });

      context('when on iPad', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPAD }).defaultView;
          global.document = window.document;
          smartbanner = new SmartBanner();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          expect(document.body.innerHTML).to.eql(IOS_BODY);
        });

      });

      context('when on iPod', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPOD }).defaultView;
          global.document = window.document;
          smartbanner = new SmartBanner();
        });

        it('expected to add iOS template to body', function() {
          smartbanner.publish();
          expect(document.body.innerHTML).to.eql(IOS_BODY);
        });

      });

      context('when on Android', function() {

        before(function() {
          global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
          global.document = window.document;
          smartbanner = new SmartBanner();
        });

        it('expected to add Android template to body', function() {
          smartbanner.publish();
          expect(document.body.innerHTML).to.eql(ANDROID_BODY);
        });

      });

    });

    context('when has been closed within current session', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
        global.document = window.document;
        smartbanner = new SmartBanner();
        smartbanner.publish();
        smartbanner.exit();
      });

      it('expected to not to add anything to body', function() {
        smartbanner.publish();
        expect(document.querySelector('.smartbanner')).not.to.exist;
      });

    });

  });

  describe('template', function() {

    context('when on iPhone', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE }).defaultView;
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

    before(function() {
      global.document = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE });
      smartbanner = new SmartBanner();
      smartbanner.publish();
      smartbanner.exit();
    });

    it('expected to set cookie', function() {
      expect(Bakery.baked).to.be.true;
    });

    it('expected to remove HTML', function() {
      let element = document.querySelector('.smartbanner');
      expect(element).not.to.exist;
    });

  });

});
