import OptionParser from './optionparser.js';

function isEmptyObject(obj) {
  return Object.keys(obj).legnth === 0;
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
  }

  publish() {
    if (isEmptyObject(this.options)) {
      throw 'Options could not be located. Aborting.';
    }
  }
}
