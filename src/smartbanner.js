import OptionParser from './optionparser.js';

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
  }

  publish() {
    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    }
  }
}
