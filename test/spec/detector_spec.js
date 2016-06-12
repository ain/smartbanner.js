let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import Detector from '../../src/detector.js';

describe('Detector', function() {

  describe('os', function() {

    let platform = null;
    let template = `<!doctype html><html><head></head><body></body></html>`;

    context('when on iPhone', function() {

      before(function() {
        global.window = jsdom.jsdom(template, {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1'
          }).defaultView;
        platform = Detector.platform();
      });

      it('expected to return ios', function() {
        expect(platform).to.eql('ios');
      });

    });

    context('when on Android', function() {

      before(function() {
        global.window = jsdom.jsdom(template, {
            userAgent: 'Mozilla/5.0 (Linux; Android 5.1; XT1039 Build/LPB23.13-17.6; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/50.0.2661.86 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/79.0.0.18.71;]'
          }).defaultView;
        platform = Detector.platform();
      });

      it('expected to return android', function() {
        expect(platform).to.eql('android');
      });

    });

  });
});
