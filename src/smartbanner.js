import OptionParser from './optionparser.js';
import Detector from './detector.js';

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
    this.platform = Detector.platform();
  }

  get priceSuffix() {
    if (this.platform === 'ios') {
      return this.options.priceSuffixApple;
    } else if (this.platform == 'android') {
      return this.options.priceSuffixAndroid;
    }
  }

  get template() {
    return `<div class="smartbanner smartbanner--${this.platform}">
      <div class="smartbanner__icon"></div>
      <div class="smartbanner__info">
        <div class="smartbanner__info__title">${this.options.title}</div>
        <div class="smartbanner__info__author">${this.options.author}</div>
        <div class="smartbanner__info__price">${this.options.price}${this.priceSuffix}</div>
        <div class="smartbanner__button">${this.options.button}</div>
      </div>
    </div>`;
  }

  publish() {
    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    }
  }
}
