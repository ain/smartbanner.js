# smartbanner.js [![Build Status](https://travis-ci.org/ain/smartbanner.js.svg?branch=master)](https://travis-ci.org/ain/smartbanner.js) [![npm version](https://badge.fury.io/js/smartbanner.js.svg)](https://badge.fury.io/js/smartbanner.js) [![Bower version](https://badge.fury.io/bo/smartbanner.js.svg)](https://badge.fury.io/bo/smartbanner.js)
Customisable smart app banner for iOS and Android.

![smartbanner.js iOS screenshot](https://github.com/ain/smartbanner.js/raw/master/screenshot-ios.png) &nbsp; ![smartbanner.js Android screenshot](https://github.com/ain/smartbanner.js/raw/master/screenshot-android.png)

## Features

- Pure JavaScript, no jQuery (14 KB in size)
- ECMAScript 6 source
- Default [Smart App Banner](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) like design
- Customisable design by using
  - automatically generated `smartbanner--<platform>` class on wrapper
  - [custom design modifier](#custom-design-modifier) for externally defined styles or same design on all platforms
- Fully customisable info
- Close button that
  - closes the banner
  - sets cookie to keep banner closed for current session or [for defined time](#time-limited-close)
- Platform-specific app icon URL
- Platform-specific URL for _View_ button
- jQuery Mobile and AngularJS compliance
- User Agent specific targeting

## Basic Usage

`smartbanner.js` works automagically given following meta tags:

```html
<!-- Start SmartBanner configuration -->
<meta name="smartbanner:title" content="Smart Application">
<meta name="smartbanner:author" content="SmartBanner Contributors">
<meta name="smartbanner:price" content="FREE">
<meta name="smartbanner:price-suffix-apple" content=" - On the App Store">
<meta name="smartbanner:price-suffix-google" content=" - In Google Play">
<meta name="smartbanner:icon-apple" content="https://url/to/apple-store-icon.png">
<meta name="smartbanner:icon-google" content="https://url/to/google-play-icon.png">
<meta name="smartbanner:button" content="VIEW">
<meta name="smartbanner:button-url-apple" content="https://ios/application-url">
<meta name="smartbanner:button-url-google" content="https://android/application-url">
<meta name="smartbanner:enabled-platforms" content="android,ios">
<!-- End SmartBanner configuration -->
```

Additionally, JavaScript and CSS has to be included:

```html
<link rel="stylesheet" href="path/to/component/dist/smartbanner.min.css">
<script src="path/to/component/dist/smartbanner.min.js"></script>
```

## Advanced usage

### Hide the smartbanner for certain User Agents

There are cases where you do not want to show the smart app banner on all Android and/or all iOS devices. For example:
* your app is availabe only for some Android/iOS versions
* your app is only availabe on iPhone, but not iPad
* your app is a web app which also shows this website, but of course should not show the smart app banner.

In this case you can define a regular expression, which matches all user agent strings that should be excluded. Just add another `meta` tag like the following:
```html
<meta name="smartbanner:exclude-user-agent-regex" content="^.*My Example Webapp$">
```
This regular expression would match any user agent string, that ends with *My Example Webapp*.

### Show the smartbanner for certain User Agents

In addition to blacklisting certain user agents using the regex explained in the previous section, you can also whitelist certain user agents:
```html
<meta name="smartbanner:include-user-agent-regex" content="iPhone 7">
```

**Note:** You can define `enabled-platforms`, `exclude-user-agent-regex` and `include-user-agent-regex` at the same time. `enabled-platforms` has the lowest priority, `exclude-user-agent-regex` the highest priority.

### Disable Positioning

If you want to position smart app banner yourself (e.g. in CSS), you can disable built-in positioning with following option:
```html
<meta name="smartbanner:disable-positioning" content="true">
```

### Hide the smartbanner completely

If you want to prevent smartbanner rendering in some html pages, you can add optional `meta` tag:

```html
<meta name="smartbanner:enabled-platforms" content="none">
```

### Time-limited close

By default smartbanner would not reappear if closed. This can be prevented with `hide-ttl` option. Following example would keep smartbanner closed for 10 seconds (10000 ms):

```html
<meta name="smartbanner:hide-ttl" content="10000">
```

### Custom design modifier

smartbanner uses built-in platform-specific styles (e.g. `smartbanner--ios` or `smartbanner--android`), but this behaviour can be altered by adding custom design modifier that allows use of:

- externally defined styles, e.g.:

    ```html
    <meta name="smartbanner:custom-design-modifier" content="mysite.com">
    ```

    which would add `smartbanner--mysite.com` class on wrapper.

- forced platform-specific styles on all platforms, e.g.:

    ```html
    <meta name="smartbanner:custom-design-modifier" content="ios">
    ```

    which would add `smartbanner--ios` class on wrapper regardless of actual platform.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Sponsors

Cross-browser testing across all mobile platforms is powered by

<a href="https://www.browserstack.com" title="BrowserStack"><img src="https://rawgithub.com/ain/smartbanner.js/master/browserstack.svg" height="32px" alt="BrowserStack"></a>

## Licence

Copyright © 2016, 2017 Ain Tohvri, contributors. Licenced under [GPL-3](https://raw.githubusercontent.com/ain/smartbanner.js/master/LICENSE).
