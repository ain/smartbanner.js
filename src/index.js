import OptionParser from './optionparser.js';
import SmartBanner from "./smartbanner.js";

let parser = new OptionParser;
let smartbanner = new SmartBanner(parser.options);

console.log('SmartBanner initilised with', smartbanner.options);
