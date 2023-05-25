import SmartBanner from './smartbanner.js';

let smartbanner;

window.addEventListener('load', function() {
  smartbanner = new SmartBanner();
  if (smartbanner.apiEnabled) {
    window.smartbanner = smartbanner;
  }
  let event = new Event('smartbanner.init');
  document.dispatchEvent(event);
  if (!smartbanner.apiEnabled) {
    smartbanner.publish();
  }
});
