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
    } else if (this.platform === 'android') {
      return this.options.priceSuffixGoogle;
    }
    return '';
  }

  get icon() {
    if (this.platform === 'android') {
      return this.options.iconGoogle;
    } else {
      return this.options.iconApple;
    }
  }

  get buttonUrl() {
    if (this.platform === 'android') {
      return this.options.buttonUrlGoogle;
    } else if (this.platform === 'ios') {
      return this.options.buttonUrlApple;
    }
    return '#';
  }

  get html() {
    return `<div class="smartbanner smartbanner--${this.platform}">
      <a href="#exit" class="smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div class="smartbanner__info__title">${this.options.title}</div>
        <div class="smartbanner__info__author">${this.options.author}</div>
        <div class="smartbanner__info__price">${this.options.price}${this.priceSuffix}</div>
      </div>
      <a href="${this.buttonUrl}" class="smartbanner__button"><span class="smartbanner__button__label">${this.options.button}</span></a>
    </div>`;
  }

  publish() {
    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    }
    document.write(this.html);
  }
}
