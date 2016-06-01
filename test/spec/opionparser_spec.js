let path = require('path');
let chai = require('chai');
let expect = chai.expect;

import OptionParser from '../../src/optionparser.js';

describe('OptionParser', function() {

  describe('parse', function() {

    let parser;

    beforeEach(function() {
      parser = new OptionParser();
    });

    // FIXME: implement PhantomJS (fails without document)
    xit('expected to return null without markup', function() {
      expect(parser.options).to.be.null;
    });


  });

});
