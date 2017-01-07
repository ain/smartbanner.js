export default class Detector {

  static platform() {
    if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
      return 'ios';
    } else if (/Android/i.test(window.navigator.userAgent)) {
      return 'android';
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
