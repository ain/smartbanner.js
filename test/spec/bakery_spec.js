let jsdom = require('jsdom');
let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import Bakery from '../../src/bakery.js';

describe('Bakery', function() {

  const HTML = `<!doctype html><html><head></head><body></body></html>`;

  before(function() {
    global.document = jsdom.jsdom(HTML);
  });

  describe('bake', function() {

    before(function() {
      Bakery.bake();
    });

    after(function() {
      Bakery.unbake();
    });

    it('expected to set cookie', function() {
      expect(Bakery.baked).to.be.true;
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
