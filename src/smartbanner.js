import OptionParser from './optionparser.js';
import Detector from './detector.js';
import Bakery from './bakery.js';

const DEFAULT_PLATFORMS = 'android,ios';
const DEFAULT_CLOSE_LABEL = 'Close';

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function handleClickout(event, self) {
  self.clickout();
}

function addEventListeners(self) {
  let closeIcon = document.querySelector('.js_smartbanner__exit');
  closeIcon.addEventListener('click', (event) => handleExitClick(event, self));

  let button = document.querySelector('.js_smartbanner__button');
  button.addEventListener('click', (event) => handleClickout(event, self));
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
    this.platform = Detector.platform();

    let event = new Event('smartbanner.init');
    document.dispatchEvent(event);
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

  get closeLabel() {
    return this.options.closeLabel !== undefined ? this.options.closeLabel : DEFAULT_CLOSE_LABEL;
  }

  get html() {
    let modifier = !this.options.customDesignModifier ? this.platform : this.options.customDesignModifier;
    return `<div class="smartbanner smartbanner--${modifier} js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit" aria-label="${this.closeLabel}"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div class="smartbanner__copy">
          <div class="smartbanner__title">${this.options.title}</div>
          <div class="smartbanner__author">${this.options.author}</div>
          <div class="smartbanner__price">${this.options.price}${this.priceSuffix}</div>
        </div>
      </div>
      <a href="${this.buttonUrl}" class="smartbanner__button js_smartbanner__button" aria-label="${this.options.button}"><span class="smartbanner__button-label">${this.options.button}</span></a>
    </div>`;
  }

  get height() {
    try {
      return document.querySelector('.js_smartbanner').offsetHeight;
    } catch(error) {
      return 0;
    }
  }

  get platformEnabled() {
    let enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
    return enabledPlatforms && enabledPlatforms.replace(/\s+/g, '').split(',').indexOf(this.platform) !== -1;
  }

  get positioningDisabled() {
    return this.options.disablePositioning === 'true';
  }

  get apiEnabled() {
    return this.options.api === 'true';
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

  get hideTtl() {
    return this.options.hideTtl ? parseInt(this.options.hideTtl) : false;
  }

  get hidePath() {
    return this.options.hidePath ? this.options.hidePath : '/';
  }

  get parentElement() {
    const parentElement = this.options.parentElement ? document.querySelector(this.options.parentElement) : null;

    return parentElement || document.querySelector('body');
  }

  publish() {
    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    }

    if (Bakery.baked) {
      return false;
    }

    // User Agent was explicetely excluded by excludeUserAgentRegex
    if (this.userAgentExcluded) {
      return false;
    }

    // User Agent was neither included by platformEnabled nor defined by includeUserAgentRegex
    if (!(this.platformEnabled || this.userAgentIncluded)) {
      return false;
    }

    let bannerDiv = document.createElement('div');
    this.parentElement.appendChild(bannerDiv);
    bannerDiv.outerHTML = this.html;
    let event = new Event('smartbanner.view');
    document.dispatchEvent(event);
    addEventListeners(this);
  }

  exit() {
    let banner = document.querySelector('.js_smartbanner');
    document.querySelector('body').removeChild(banner);
    let event = new Event('smartbanner.exit');
    document.dispatchEvent(event);
    Bakery.bake(this.hideTtl, this.hidePath);
  }

  clickout() {
    let event = new Event('smartbanner.clickout');
    document.dispatchEvent(event);
  }
}
