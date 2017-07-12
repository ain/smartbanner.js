import OptionParser from './optionparser.js';
import Detector from './detector.js';
import Bakery from './bakery.js';

const DEFAULT_PLATFORMS = 'android,ios';

let datas = {
  originalTop: 'data-smartbanner-original-top',
  originalMarginTop: 'data-smartbanner-original-margin-top'
};

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function handleJQueryMobilePageLoad(event) {
  if (!this.positioningDisabled) {
    setContentPosition(event.data.height);
  }
}

function addEventListeners(self) {
  let closeIcon = document.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', (event) => handleExitClick(event, self));
  if (Detector.jQueryMobilePage()) {
    $(document).on('pagebeforeshow', self, handleJQueryMobilePageLoad);
  }
}

function removeEventListeners() {
  if (Detector.jQueryMobilePage()) {
    $(document).off('pagebeforeshow', handleJQueryMobilePageLoad);
  }
}

function setContentPosition(value) {
  let wrappers = Detector.wrapperElement();
  for (let i = 0, l = wrappers.length, wrapper; i < l; i++) {
    wrapper = wrappers[i];
    if (Detector.jQueryMobilePage()) {
      if (wrapper.getAttribute(datas.originalTop)) {
        continue;
      }
      let top = parseFloat(getComputedStyle(wrapper).top);
      wrapper.setAttribute(datas.originalTop, isNaN(top) ? 0 : top);
      wrapper.style.top = value + 'px';
    } else {
      if (wrapper.getAttribute(datas.originalMarginTop)) {
        continue;
      }
      let margin = parseFloat(getComputedStyle(wrapper).marginTop);
      wrapper.setAttribute(datas.originalMarginTop, isNaN(margin) ? 0 : margin);
      wrapper.style.marginTop = value + 'px';
    }
  }
}

function restoreContentPosition() {
  let wrappers = Detector.wrapperElement();
  for (let i = 0, l = wrappers.length, wrapper; i < l; i++) {
    wrapper = wrappers[i];
    if (Detector.jQueryMobilePage() && wrapper.getAttribute(datas.originalTop)) {
      wrapper.style.top = wrapper.getAttribute(datas.originalTop) + 'px';
    } else if (wrapper.getAttribute(datas.originalMarginTop)) {
      wrapper.style.marginTop = wrapper.getAttribute(datas.originalMarginTop) + 'px';
    }
  }
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
    this.platform = Detector.platform();
    this.platformOS = this.platform && this.platform.replace(' tablet','').replace(' phone','');
  }

  // DEPRECATED. Will be removed.
  get originalTop() {
    let wrapper = Detector.wrapperElement()[0];
    return parseFloat(wrapper.getAttribute(datas.originalTop));
  }

  // DEPRECATED. Will be removed.
  get originalTopMargin() {
    let wrapper = Detector.wrapperElement()[0];
    return parseFloat(wrapper.getAttribute(datas.originalMarginTop));
  }

  get priceSuffix() {
    if (this.platformOS === 'ios') {
      return this.options.priceSuffixApple;
    } else if (this.platformOS === 'android') {
      return this.options.priceSuffixGoogle;
    }
    return '';
  }

  get icon() {
    if (this.platformOS === 'android') {
      return this.options.iconGoogle;
    } else {
      return this.options.iconApple;
    }
  }

  get buttonUrl() {
    let URL = '#',
      o = this.options;
    debugger;
    if (this.ignoreMainPlatformUrls) {
      o.buttonUrlGoogle = '';
      o.buttonUrlApple = '';
    }

    switch(this.platform){
    case 'android phone':
      if(o.buttonUrlGoogle || o.buttonUrlGooglePhone){
        URL = o.buttonUrlGoogle ? o.buttonUrlGoogle : o.buttonUrlGooglePhone;
      }
      break;
    case 'android tablet':
      if(o.buttonUrlGoogle || o.buttonUrlGoogleTablet){
        URL = o.buttonUrlGoogle ? o.buttonUrlGoogle : o.buttonUrlGoogleTablet;
      }
      break;
    case 'ios phone':
      if(o.buttonUrlApple || o.buttonUrlAppleIphone){
        URL = o.buttonUrlApple ? o.buttonUrlApple : o.buttonUrlAppleIphone;
      }
      break;
    case 'ios tablet':
      if(o.buttonUrlApple || o.buttonUrlAppleIpad){
        URL = o.buttonUrlApple ? o.buttonUrlApple : o.buttonUrlAppleIpad;
      }
      break;
    }

    return URL;
  }

  get html() {
    return `<div class="smartbanner smartbanner--${this.platformOS} js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">${this.options.title}</div>
          <div class="smartbanner__info__author">${this.options.author}</div>
          <div class="smartbanner__info__price">${this.options.price}${this.priceSuffix}</div>
        </div>
      </div>
      <a href="${this.buttonUrl}" target="_blank" class="smartbanner__button"><span class="smartbanner__button__label">${this.options.button}</span></a>
    </div>`;
  }

  get height() {
    let height = document.querySelector('.js_smartbanner').offsetHeight;
    return height !== undefined ? height : 0;
  }

  get platformEnabled() {
    let enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
    return enabledPlatforms && enabledPlatforms.replace(/\s+/g, '').split(',').indexOf(this.platformOS) !== -1;
  }

  get positioningDisabled() {
    return this.options.disablePositioning === 'true';
  }

  get userAgentExcluded() {
    if (!this.options.excludeUserAgentRegex) {
      return false;
    }
    return Detector.userAgentMatchesRegex(this.options.excludeUserAgentRegex);
  }

  get userAgentIncluded() {
    if (!this.options.includeUserAgentRegex) {
      return false;
    }
    return Detector.userAgentMatchesRegex(this.options.includeUserAgentRegex);
  }

  publish(ignoreMainPlatformUrls) {
    //ignoreMainPlatformUrls is used for testing to simulate situation when user omits
    //<meta name="smartbanner:button-url-apple"/> and <meta name="smartbanner:button-url-google"/>
    //to use device related URLs instead
    this.ignoreMainPlatformUrls = ignoreMainPlatformUrls;

    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    }

    if (Bakery.baked) {
      return false;
    }

    // User Agent was explicetely excluded by defined excludeUserAgentRegex
    if (this.userAgentExcluded) {
      return false;
    }

    // User agent was neither included by platformEnabled,
    // nor by defined includeUserAgentRegex
    if (!(this.platformEnabled || this.userAgentIncluded)) {
      return false;
    }

    let bannerDiv = document.createElement('div');
    document.querySelector('body').appendChild(bannerDiv);
    bannerDiv.outerHTML = this.html;
    if (!this.positioningDisabled) {
      setContentPosition(this.height);
    }
    addEventListeners(this);
  }

  exit() {
    removeEventListeners();
    if (!this.positioningDisabled) {
      restoreContentPosition();
    }
    let banner = document.querySelector('.js_smartbanner');
    document.querySelector('body').removeChild(banner);
    Bakery.bake();
  }
}
