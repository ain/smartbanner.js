import OptionParser from './optionparser.js';
import Detector from './detector.js';
import Bakery from './bakery.js';

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function addEventListeners(self) {
  let closeIcon = document.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', () => handleExitClick(event, self));
}

function getOriginalTopMargin() {
  let element = Detector.wrapperElement();
  let margin = parseFloat(getComputedStyle(element).marginTop);
  return isNaN(margin) ? 0 : margin;
}

function getOriginalTop() {
  let element = Detector.wrapperElement();
  let top = parseFloat(getComputedStyle(element).top);
  return isNaN(top) ? 0 : top;
}

function setTopMarginOrTop(value) {
  if (Detector.jQueryMobilePage) {
    Detector.wrapperElement().style.top = value + 'px';
  } else {
    Detector.wrapperElement().style.marginTop = value + 'px';
  }
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
    this.platform = Detector.platform();
    this.originalTopMargin = getOriginalTopMargin();
    this.originalTop = getOriginalTop();
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
    return `<div class="smartbanner smartbanner--${this.platform} js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">${this.options.title}</div>
          <div class="smartbanner__info__author">${this.options.author}</div>
          <div class="smartbanner__info__price">${this.options.price}${this.priceSuffix}</div>
        </div>
      </div>
      <a href="${this.buttonUrl}" class="smartbanner__button"><span class="smartbanner__button__label">${this.options.button}</span></a>
    </div>`;
  }

  get height() {
    let height = document.querySelector('.js_smartbanner').offsetHeight;
    return height !== undefined ? height : 0;
  }

  publish() {
    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    } else if (Bakery.baked) {
      return false;
    }
    let bannerDiv = document.createElement('div');
    document.querySelector('body').appendChild(bannerDiv);
    bannerDiv.outerHTML = this.html;
    let position = Detector.jQueryMobilePage ? this.originalTop : this.originalTopMargin;
    setTopMarginOrTop(position + this.height);
    addEventListeners(this);
  }

  exit() {
    let banner = document.querySelector('.js_smartbanner');
    banner.outerHTML = '';
    Bakery.bake();
    let position = Detector.jQueryMobilePage ? this.originalTop : this.originalTopMargin;
    setTopMarginOrTop(position);
  }
}
