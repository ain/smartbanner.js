import SmartBanner from './smartbanner.js';

let smartbanner;

window.addEventListener('load', function() {
  smartbanner = new SmartBanner();
  if (smartbanner.apiEnabled) {
    window.smartbanner = smartbanner;
  } else {
    smartbanner.publish();
  }
});
