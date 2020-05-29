import SmartBanner from './smartbanner.js';

let smartbanner;

window.addEventListener('load', function() {
  smartbanner = new SmartBanner();
  if (smartbanner.apiEnabled) {
    window.smartbanner = smartbanner;
    document.dispatchEvent(new Event('smartbanner.apiready'));
  } else {
    smartbanner.publish();
  }
});
