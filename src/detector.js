export default class Detector {

  static platform() {
    let maxTouchPoints = window.navigator.maxTouchPoints;
    let userAgent = window.navigator.userAgent;

    // if Android, it's Android
    if (/Android/i.test(userAgent)){
      return 'android';
    // if not Android and either has maxTouchPoints greater than 0 (newer iPads) or is an older iOS device, it's iOS
    } else if ((maxTouchPoints && maxTouchPoints > 0) || /iPhone|iPad|iPod/i.test(userAgent)) {
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
