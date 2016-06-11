import OptionParser from './optionparser.js';

function validOptions() {
  // TODO: option validation
  return true;
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
  }

  publish() {
    // FIXME: 'this' undefined, causes test failure
    if (validOptions(this.options)) {
      throw new Error('Options incomplete. Please consult documentation.');
    }
  }
}
