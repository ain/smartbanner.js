import SmartBanner from './smartbanner.js';

let smartbanner;

window.addEventListener('load', function() {
  smartbanner = new SmartBanner();
});

window.SmartBanner = function() {
  smartbanner.publish();
};
