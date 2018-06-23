export default class Bakery {

  static getCookieExpiresString(hideTtl) {
    const now = new Date();
    const expireTime = new Date(now.getTime() + hideTtl);
    return `expires=${expireTime.toGMTString()};`;
  }

  static getPathString(path) {
    return `path=${path};`;
  }

  static bake(hideTtl, hidePath = null) {
    document.cookie = `smartbanner_exited=1; ${hideTtl ? Bakery.getCookieExpiresString(hideTtl) : ''} ${hidePath ? Bakery.getPathString(hidePath) : ''}`;
  }

  static unbake() {
    document.cookie = 'smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  static get baked() {
    let value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return value === '1';
  }

}
