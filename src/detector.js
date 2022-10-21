export default class Detector {

  static platform() {
    let maxTouchPoints = window.navigator.maxTouchPoints;
    let userAgent = window.navigator.userAgent;

    if (/Android/i.test(userAgent)){
      return 'android';
    // maxTouchPoints is the only effective method to detect iPad iOS 13+
    // FMI https://developer.apple.com/forums/thread/119186
    } else if ((!window.MSStream && !/X11|Linux/i.test(userAgent) && maxTouchPoints && maxTouchPoints > 0) || /iPhone|iPad|iPod/i.test(userAgent)) {
      return 'ios';
    }
  }

  static userAgentMatchesRegex(regexString) {
    return new RegExp(regexString).test(window.navigator.userAgent);
  }

  static jQueryMobilePage() {
    return typeof global.$ !== 'undefined' && global.$.mobile !== 'undefined' && document.querySelector('.ui-page') !== null;
  }

  static wrapperElement() {
    let selector = Detector.jQueryMobilePage() ? '.ui-page' : 'html';
    return document.querySelectorAll(selector);
  }

}
