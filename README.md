# smartbanner.js [![Build Status](https://travis-ci.org/ain/smartbanner.js.svg?branch=master)](https://travis-ci.org/ain/smartbanner.js)
Customisable smart app banner for iOS and Android.

![smartbanner.js screenshot](https://github.com/ain/smartbanner.js/raw/master/screenshot.png)

## Features

- Pure JavaScript, no jQuery
- ECMAScript 6 source
- Small (8 KB)
- Default [Smart App Banner](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) like design
- Customisable design using `smartbanner--<platform>` class on wrapper
- Fully customisable info
- Close button that
  - closes the banner
  - sets cookie to keep banner closed for current session
- Platform-specific app icon URL
- Platform-specific URL for _View_ button

## Usage

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
<!-- End SmartBanner configuration -->
```

Additionally, JavaScript and CSS has to be included:

```html
<link rel="stylesheet" href="path/to/component/dist/smartbanner.min.css">
<script src="path/to/component/dist/smartbanner.min.js"></script>
```

## Licence

Copyright © 2016 Ain Tohvri. Licenced under [GPL-3](https://raw.githubusercontent.com/ain/smartbanner.js/master/LICENSE).
