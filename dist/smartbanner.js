(() => {
  // src/optionparser.js
  function valid(name) {
    return name.indexOf("smartbanner:") !== -1 && name.split(":")[1].length > 0;
  }
  function convertToCamelCase(name) {
    let parts = name.split("-");
    parts.map(function(part, index) {
      if (index > 0) {
        parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
      }
    });
    return parts.join("");
  }
  var OptionParser = class {
    parse() {
      let metas = document.getElementsByTagName("meta");
      let options = {};
      Array.apply(null, metas).forEach(function(meta) {
        let optionName = null;
        let name = meta.getAttribute("name");
        let content = meta.getAttribute("content");
        if (name && content && valid(name) && content.length > 0) {
          optionName = name.split(":")[1];
          if (optionName.indexOf("-") !== -1) {
            optionName = convertToCamelCase(optionName);
          }
          options[optionName] = content;
        }
      });
      return options;
    }
  };

  // src/detector.js
  var Detector = class _Detector {
    static platform() {
      let maxTouchPoints = window.navigator.maxTouchPoints;
      let userAgent = window.navigator.userAgent;
      if (/Android/i.test(userAgent)) {
        return "android";
      } else if (!window.MSStream && !/X11|Linux|Windows/i.test(userAgent) && maxTouchPoints && maxTouchPoints > 0 || /iPhone|iPad|iPod/i.test(userAgent)) {
        return "ios";
      }
    }
    static userAgentMatchesRegex(regexString) {
      return new RegExp(regexString).test(window.navigator.userAgent);
    }
    static jQueryMobilePage() {
      return typeof window.$ !== "undefined" && typeof window.$.mobile !== "undefined" && document.querySelector(".ui-page") !== null;
    }
    static wrapperElement() {
      let selector = _Detector.jQueryMobilePage() ? ".ui-page" : "html";
      return document.querySelectorAll(selector);
    }
  };

  // src/bakery.js
  var Bakery = class _Bakery {
    static getCookieExpiresString(hideTtl) {
      const now = /* @__PURE__ */ new Date();
      const expireTime = new Date(now.getTime() + hideTtl);
      return `expires=${expireTime.toGMTString()};`;
    }
    static bake(hideTtl, hidePath) {
      document.cookie = `smartbanner_exited=1; ${hideTtl ? _Bakery.getCookieExpiresString(hideTtl) : ""} path=${hidePath}`;
    }
    static unbake() {
      document.cookie = "smartbanner_exited=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    static get baked() {
      let value = document.cookie.replace(/(?:(?:^|.*;\s*)smartbanner_exited\s*=\s*([^;]*).*$)|^.*$/, "$1");
      return value === "1";
    }
  };

  // src/smartbanner.js
  var DEFAULT_PLATFORMS = "android,ios";
  var DEFAULT_CLOSE_LABEL = "Close";
  var DEFAULT_BUTTON_LABEL = "View";
  var datas = {
    originalTop: "data-smartbanner-original-top",
    originalMarginTop: "data-smartbanner-original-margin-top"
  };
  function handleExitClick(event, self) {
    self.exit();
    event.preventDefault();
  }
  function handleClickout(event, self) {
    self.clickout();
  }
  function handleJQueryMobilePageLoad(event) {
    if (!this.positioningDisabled) {
      setContentPosition(event.data.height);
    }
  }
  function addEventListeners(self) {
    let closeIcon = document.querySelector(".js_smartbanner__exit");
    closeIcon.addEventListener("click", (event) => handleExitClick(event, self));
    let button = document.querySelector(".js_smartbanner__button");
    button.addEventListener("click", (event) => handleClickout(event, self));
    if (Detector.jQueryMobilePage()) {
      $(document).on("pagebeforeshow", self, handleJQueryMobilePageLoad);
    }
  }
  function removeEventListeners() {
    if (Detector.jQueryMobilePage()) {
      $(document).off("pagebeforeshow", handleJQueryMobilePageLoad);
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
        wrapper.style.top = value + "px";
      } else {
        if (wrapper.getAttribute(datas.originalMarginTop)) {
          continue;
        }
        let margin = parseFloat(getComputedStyle(wrapper).marginTop);
        wrapper.setAttribute(datas.originalMarginTop, isNaN(margin) ? 0 : margin);
        wrapper.style.marginTop = value + "px";
      }
    }
  }
  function restoreContentPosition() {
    let wrappers = Detector.wrapperElement();
    for (let i = 0, l = wrappers.length, wrapper; i < l; i++) {
      wrapper = wrappers[i];
      if (Detector.jQueryMobilePage() && wrapper.getAttribute(datas.originalTop)) {
        wrapper.style.top = wrapper.getAttribute(datas.originalTop) + "px";
      } else if (wrapper.getAttribute(datas.originalMarginTop)) {
        wrapper.style.marginTop = wrapper.getAttribute(datas.originalMarginTop) + "px";
      }
    }
  }
  var SmartBanner = class {
    constructor() {
      let parser = new OptionParser();
      this.options = parser.parse();
      this.platform = Detector.platform();
      let event = new Event("smartbanner.init");
      document.dispatchEvent(event);
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
      if (this.platform === "ios" && this.options.priceSuffixApple) {
        return this.options.priceSuffixApple;
      } else if (this.platform === "android" && this.options.priceSuffixGoogle) {
        return this.options.priceSuffixGoogle;
      }
      return "";
    }
    get price() {
      if (this.options.price && this.options.price !== "") {
        return this.options.price;
      } else {
        return "";
      }
    }
    get icon() {
      if (this.platform === "android") {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
    get buttonUrl() {
      if (this.platform === "android") {
        return this.options.buttonUrlGoogle;
      } else if (this.platform === "ios") {
        return this.options.buttonUrlApple;
      }
      return "#";
    }
    get closeLabel() {
      return this.options.closeLabel !== void 0 ? this.options.closeLabel : DEFAULT_CLOSE_LABEL;
    }
    get buttonLabel() {
      let buttonLabel = this.options.button;
      if (this.platform === "android" && this.options.buttonGoogle) {
        buttonLabel = this.options.buttonGoogle;
      } else if (this.platform === "ios" && this.options.buttonApple) {
        buttonLabel = this.options.buttonApple;
      }
      return buttonLabel || DEFAULT_BUTTON_LABEL;
    }
    get html() {
      let modifier = !this.options.customDesignModifier ? this.platform : this.options.customDesignModifier;
      return `<div class="smartbanner smartbanner--${modifier} js_smartbanner">
      <a href="#" class="smartbanner__exit js_smartbanner__exit" title="${this.closeLabel}" rel="nofollow"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">${this.options.title}</div>
          <div class="smartbanner__info__author">${this.options.author}</div>
          <div class="smartbanner__info__price">${this.price}${this.priceSuffix}</div>
        </div>
      </div>
      <a href="${this.buttonUrl}" target="_blank" class="smartbanner__button js_smartbanner__button" rel="noopener" aria-label="${this.buttonLabel}"><span class="smartbanner__button__label">${this.buttonLabel}</span></a>
    </div>`;
    }
    get height() {
      try {
        return document.querySelector(".js_smartbanner").offsetHeight;
      } catch (error) {
        return 0;
      }
    }
    get platformEnabled() {
      let enabledPlatforms = this.options.enabledPlatforms || DEFAULT_PLATFORMS;
      return enabledPlatforms && enabledPlatforms.replace(/\s+/g, "").split(",").indexOf(this.platform) !== -1;
    }
    get positioningDisabled() {
      return this.options.disablePositioning === "true";
    }
    get apiEnabled() {
      return this.options.api === "true" || this.options.api === "yes";
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
      return this.options.hidePath ? this.options.hidePath : "/";
    }
    publish() {
      if (Object.keys(this.options).length === 0) {
        throw new Error("No options detected. Please consult documentation.");
      }
      if (Bakery.baked) {
        return false;
      }
      if (this.userAgentExcluded) {
        return false;
      }
      if (!(this.platformEnabled || this.userAgentIncluded)) {
        return false;
      }
      let bannerDiv = document.createElement("div");
      document.querySelector("body").prepend(bannerDiv);
      bannerDiv.outerHTML = this.html;
      let event = new Event("smartbanner.view");
      document.dispatchEvent(event);
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
      let banner = document.querySelector(".js_smartbanner");
      document.querySelector("body").removeChild(banner);
      let event = new Event("smartbanner.exit");
      document.dispatchEvent(event);
      Bakery.bake(this.hideTtl, this.hidePath);
    }
    clickout() {
      let event = new Event("smartbanner.clickout");
      document.dispatchEvent(event);
    }
  };

  // src/index.js
  var smartbanner;
  window.addEventListener("load", function() {
    smartbanner = new SmartBanner();
    if (smartbanner.apiEnabled) {
      window.smartbanner = smartbanner;
    } else {
      smartbanner.publish();
    }
  });
})();
