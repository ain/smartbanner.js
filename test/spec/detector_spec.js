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

  describe('wrapperElement', function() {

    before(function() {
      global.window = new JSDOM(HTML).window;
      global.document = window.document;
    });

    it('expected to return html element', function() {
      expect(Detector.wrapperElement()).to.eql(document.querySelector('html'));
    });
  });

  describe.only('fixedElements', function() {

    let FIXED_ELEMENT = `<div style="position: fixed; top: 0; z-index: 1000; height: 50px; background-color: #ddd; width: 100%; margin: 0; left: 0; margin-top: 84px; padding: 10px;">Fixed element</div>`;
    let ABSOLUTE_ELEMENT = `<div style="position: absolute; top: 0;">Nested top-aligned element</div>`;
    let HTML_WITH_FIXED_ELEMENT = `<!doctype html><html style="margin-top:10px;"><head></head><body>${FIXED_ELEMENT}</body></html>`;
    let HTML_WITH_FIXED_ELEMENTS = `<!doctype html><html><head></head><body>${FIXED_ELEMENT}<p>${ABSOLUTE_ELEMENT}</p></body></html>`;

    context('with single fixed top-aligned element', function() {
      before(function() {
        global.window = new JSDOM(HTML_WITH_FIXED_ELEMENT).window;
        global.document = window.document;
        global.getComputedStyle = global.document.defaultView.getComputedStyle;
      });

      it('expected to return one item', function() {
        expect(Detector.fixedElements()).to.have.lengthOf(1);
      });

      it('expected to return top-aligned fixed element', function() {
        expect(Detector.fixedElements()[0].outerHTML).to.eql(FIXED_ELEMENT);
      });
    });

    context('with multiple fixed top-aligned elements', function() {
      before(function() {
        global.window = new JSDOM(HTML_WITH_FIXED_ELEMENTS).window;
        global.document = window.document;
        global.getComputedStyle = global.document.defaultView.getComputedStyle;
      });

      it('expected to return two items', function() {
        expect(Detector.fixedElements()).to.have.lengthOf(2);
      });

      it('expected to return top-aligned fixed element', function() {
        expect(Detector.fixedElements()[0].outerHTML).to.eql(FIXED_ELEMENT);
      });

      it('expected to return top-aligned absolute element', function() {
        expect(Detector.fixedElements()[1].outerHTML).to.eql(ABSOLUTE_ELEMENT);
      });
    });
  });
});
