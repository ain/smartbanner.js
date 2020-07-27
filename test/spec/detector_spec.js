let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import Detector from '../../src/detector.js';

describe('Detector', function() {

  const USER_AGENT_IPHONE_IOS8 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4';
  const USER_AGENT_IPHONE_IOS9 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPHONE_CUSTOM_WEBAPP = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1 My Example Webapp';
  const USER_AGENT_IPAD = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
  const USER_AGENT_IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4';
  const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]';
  const USER_AGENT_ANDROID_CUSTOM_WEBAPP = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]  My Example Webapp';

  const EXCLUDE_USER_AGENT_REGEX = '^.*My Example Webapp$';
  const INCLUDE_USER_AGENT_REGEX = '.*iPhone OS [9\\-10].*';

  const { JSDOM } = jsdom;
  const HTML = `<!doctype html><html><head></head><body></body></html>`;

  describe('platform', function() {

    let platform = null;

    context('when on iPhone with iOS8', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS8 });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

      it('expected exclude regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.false;
      });

      it('expected include regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.false;
      });
    });

    context('when on iPhone with iOS9', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_IOS9 });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

      it('expected exclude regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.false;
      });

      it('expected include regex to match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.true;
      });
    });

    context('when on iPhone with Custom Web App', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPHONE_CUSTOM_WEBAPP });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

      it('expected exclude regex to match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.true;
      });

      it('expected include regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.true;
      });
    });


    context('when on iPad', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPAD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

      it('expected exclude regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.false;
      });

      it('expected include regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.false;
      });
    });

    context('when on iPod', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_IPOD });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

      it('expected exclude regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.false;
      });

      it('expected include regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.false;
      });
    });

    context('when on Android', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return android', function() {
        expect(platform).to.eql('android');
      });

      it('expected exclude regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.false;
      });

      it('expected include regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.false;
      });
    });

    context('when on Android with Custom Web App', function() {

      before(function() {
        const resourceLoader = new jsdom.ResourceLoader({ userAgent: USER_AGENT_ANDROID_CUSTOM_WEBAPP });
        global.window = new JSDOM(HTML, { resources: resourceLoader }).window;
        platform = Detector.platform();
      });

      it('expected to return android', function() {
        expect(platform).to.eql('android');
      });

      it('expected exclude regex to match', function() {
        expect(Detector.userAgentMatchesRegex(EXCLUDE_USER_AGENT_REGEX)).to.be.true;
      });

      it('expected include regex to not match', function() {
        expect(Detector.userAgentMatchesRegex(INCLUDE_USER_AGENT_REGEX)).to.be.false;
      });
    });
  });

  describe('marginedElement', function() {

    before(function() {
      global.window = new JSDOM(HTML).window;
      global.document = window.document;
    });

    it('expected to return html element as first item of array', function() {
      expect(Detector.wrapperElement()[0]).to.eql(document.querySelector('html'));
    });
  });

});
