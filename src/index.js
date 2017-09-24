import SmartBanner from './smartbanner.js';

window.SmartBanner = SmartBanner;

window.addEventListener('load', function() {
  let smartbanner = new window.SmartBanner();
  smartbanner.publish();
});
