import SmartBanner from './smartbanner.js';

let smartbanner;

window.onload = function() {
  smartbanner = new SmartBanner();
  smartbanner.publish();
};
