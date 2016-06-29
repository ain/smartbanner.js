export default class Detector {

  static platform() {
    if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
      return 'ios';
    } else if (/Android/i.test(window.navigator.userAgent)) {
      return 'android';
    }
  }

  static jQueryMobilePage() {
    return typeof $ !== 'undefined' && $.mobile !== 'undefined' && document.querySelector('.ui-page') !== null;
  }

}
