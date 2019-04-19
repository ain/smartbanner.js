let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import Bakery from '../../src/bakery.js';

describe('Bakery', function() {

  const { JSDOM } = jsdom;
  const HTML = '<!doctype html><html><head></head><body></body></html>';

  before(function() {
    global.document = (new JSDOM(HTML)).window;
  });

  describe('getCookieExpiresString', function () {
    let hideTtl = 2629746000;
    let now = new Date();
    let expireTime = new Date(now.getTime() + hideTtl);
    let expectation = Bakery.getCookieExpiresString(hideTtl);

    it('expected to return valid expire string', function () {
      expect(expectation).to.eql(`expires=${expireTime.toGMTString()};`);
    });
  });

  describe('bake', function() {

    let cookieTtl = 3600;
    let cookiePath = '/cookiepath';

    context('when TTL and path unset', function() {
      before(function() {
        Bakery.bake();
      });

      after(function() {
        Bakery.unbake();
      });

      it('expected to set correct cookie TTL and path', function() {
        expect(document.cookie).to.eql('smartbanner_exited=1;  path=undefined');
      });
    });

    context('when TTL and path set', function() {
      before(function() {
        Bakery.bake(cookieTtl, cookiePath);
      });

      after(function() {
        Bakery.unbake();
      });

      it('expected to set correct cookie TTL and path', function() {
        expect(document.cookie).to.eql('smartbanner_exited=1; ' + Bakery.getCookieExpiresString(cookieTtl) + ' path=' + cookiePath);
      });
    });

    context('when TTL set and path unset', function() {
      before(function() {
        Bakery.bake(cookieTtl);
      });

      after(function() {
        Bakery.unbake();
      });

      it('expected to set correct cookie TTL and path', function() {
        expect(document.cookie).to.eql('smartbanner_exited=1; ' + Bakery.getCookieExpiresString(cookieTtl) + ' path=undefined');
      });
    });

    context('when TTL unset and path set', function() {
      before(function() {
        Bakery.bake(null, cookiePath);
      });

      after(function() {
        Bakery.unbake();
      });

      it('expected to set correct cookie TTL and path', function() {
        expect(document.cookie).to.eql('smartbanner_exited=1;  path=' + cookiePath);
      });
    });

  });

  describe('baked', function() {

    before(function() {
      Bakery.bake();
    });

    after(function() {
      Bakery.unbake();
    });

    it('expected to return true if cookie is set', function() {
      expect(Bakery.baked).to.be.true;
    });

    it('expected to return false if cookie is not set', function() {
      Bakery.unbake();
      expect(Bakery.baked).to.be.false;
    });

  });

  describe('unbake', function() {

    before(function() {
      Bakery.bake();
    });

    it('expected to remove cookie', function() {
      Bakery.unbake();
      expect(Bakery.baked).to.be.false;
    });

  });
});
