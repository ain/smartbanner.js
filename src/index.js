import SmartBanner from './smartbanner.js';
import Detector from './detector.js';

let smartbanner;

window.onload = function() {

  smartbanner = new SmartBanner();
  smartbanner.publish();

  if (Detector.jQueryMobilePage()) {
    document.addEventListener('pagebeforeload', smartbanner.exit);
    document.addEventListener('pageload', smartbanner.publish);
  }
};
