import OptionParser from './optionparser.js';
import SmartBanner from './smartbanner.js';

let parser = new OptionParser;
let smartbanner = new SmartBanner(parser.options);

document.write('SmartBanner initilised with: ' + JSON.stringify(smartbanner.options));
