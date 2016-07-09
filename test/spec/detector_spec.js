let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import Detector from '../../src/detector.js';

describe('Detector', function() {

  describe('platform', function() {

    const USER_AGENT_IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
    const USER_AGENT_IPAD = 'Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1';
    const USER_AGENT_IPOD = 'Mozilla/5.0 (iPod touch; CPU iPhone OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4'
    const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]'

    const HTML = `<!doctype html><html><head></head><body></body></html>`;

    let platform = null;

    context('when on iPhone', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPHONE }).defaultView;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

    });

    context('when on iPad', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPAD }).defaultView;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

    });

    context('when on iPod', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_IPOD }).defaultView;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

    });

    context('when on Android', function() {

      before(function() {
        global.window = jsdom.jsdom(HTML, { userAgent: USER_AGENT_ANDROID }).defaultView;
        platform = Detector.platform();
      });

      it('expected to return android', function() {
        expect(platform).to.eql('android');
      });

    });

  });

  describe('jQueryMobilePage', function() {

    context('without jQuery Mobile', function() {

      before(function() {
        global.window = jsdom.jsdom(`<!doctype html><html><head></head><body></body></html>`).defaultView;
        global.document = window.document;
      });

      it('expected to return false', function() {
        expect(Detector.jQueryMobilePage()).to.be.false;
      });

    });

    context('with jQuery Mobile', function() {

      before(function() {
        global.window = jsdom.jsdom(`<!doctype html><html><head></head><body class="ui-page"></body></html>`).defaultView;
        global.document = window.document;
        global.$ = {mobile: true};
      });

      it('expected to return true', function() {
        expect(Detector.jQueryMobilePage()).to.be.true;
      });

    });
  });

  describe('marginedElement', function() {

    context('without jQuery Mobile', function() {

      before(function() {
        global.window = jsdom.jsdom(`<!doctype html><html><head></head><body></body></html>`).defaultView;
        global.document = window.document;
      });

      it('expected to return html element', function() {
        expect(Detector.wrapperElement()).to.eql(document.querySelector('html'));
      });

    });

    context('with jQuery Mobile', function() {

      before(function() {
        global.window = jsdom.jsdom(`<!doctype html><html><head></head><body class="ui-page"></body></html>`).defaultView;
        global.document = window.document;
        global.$ = {mobile: true};
      });

      it('expected to return ui-page element', function() {
        expect(Detector.wrapperElement()).to.eql(document.querySelector('.ui-page'));
      });

    });
  });



});
