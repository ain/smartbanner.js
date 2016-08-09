import SmartBanner from './smartbanner.js';
import Detector from './detector.js';

let smartbanner;

window.onload = function() {
  smartbanner = new SmartBanner();
  smartbanner.publish();
};
