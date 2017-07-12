export default class Detector {

  static platform() {
    if (/iPhone/i.test(window.navigator.userAgent) || /iPod/i.test(window.navigator.userAgent)) {
      return 'ios phone';
    } else if(/iPad/i.test(window.navigator.userAgent)){
      return 'ios tablet';
    } else if (/Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent)) {
      return 'android phone';
    } else if (/Android/i.test(window.navigator.userAgent) && !/Mobile/i.test(window.navigator.userAgent)) {
      return 'android tablet';
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
