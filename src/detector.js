export default class Detector {

  static platform() {
    if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
      return 'ios';
    } else if (/Android/i.test(window.navigator.userAgent)) {
      return 'android';
    }
  }

  static device(){
    if (/iPhone/i.test(window.navigator.userAgent) || /iPod/i.test(window.navigator.userAgent)) {
      return 'iphone';
    } else if (/iPad/i.test(window.navigator.userAgent)) {
      return 'ipad';
    } else if (/Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent)) {
      return 'phone';
    } else if (/Android/i.test(window.navigator.userAgent) && !/Mobile/i.test(window.navigator.userAgent)) {
      return 'tablet';
    }
  }

  static ignoreDeviceMeta(ignoreMeta){
    //ignoreMeta is used for testing to simulate situation when user omits few of the tags
    //related to either Platform (ios, android) or Device

    if (ignoreMeta === 'iosglobal') {
      return 'iosglobal';
    } else if (ignoreMeta === 'androidglobal') {
      return 'androidglobal';
    } else if (ignoreMeta === 'ipad') {
      return 'ipad';
    } else if (ignoreMeta === 'ipod') {
      return 'ipod';
    } else if (ignoreMeta === 'iphone') {
      return 'iphone';
    } else if (ignoreMeta === 'phone') {
      return 'phone';
    } else if (ignoreMeta === 'tablet') {
      return 'tablet';
    } else {
      return '';
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
