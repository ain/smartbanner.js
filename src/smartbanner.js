import OptionParser from './optionparser.js';

function validOptions(options) {
  // TODO: option validation
  return false;
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
  }

  publish() {
    if (!validOptions(this.options)) {
      throw new Error('Options incomplete. Please consult documentation.');
    }
  }
}
