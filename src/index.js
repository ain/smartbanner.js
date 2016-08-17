import from from './polyfills/array/from.js';
import includes from './polyfills/array/includes.js';

import SmartBanner from './smartbanner.js';

let smartbanner;

window.onload = function() {
  smartbanner = new SmartBanner();
  smartbanner.publish();
};
