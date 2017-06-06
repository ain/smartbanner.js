export default class Bakery {

  static bake(daysToHide) {
    let cookie = 'smartbanner_exited=1';

    if (daysToHide) {
      cookie = cookie + '; expires=' + Bakery.getExpireDate(daysToHide) + ';';
    }

    document.cookie = cookie;
  }

  static unbake() {
    document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  static get baked() {
    let value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    return value === '1';
  }

  static getExpireDate(daysToHide) {
    let date = new Date();
    // convert days to miliseconds.
    let ms = daysToHide * 24 * 60 * 60 *1000;
    date.setTime(date.getTime() + ms);

    return date;
  }

}
