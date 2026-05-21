# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run eslint        # lint src/*.js
npm test              # run tests with coverage (mocha + c8)
npm run build         # production build (minified JS + CSS + license banner)
npm run prebuild      # dev build (unminified JS + CSS)
npm start             # dev build + watch mode + local server at :8080
```

Run a single test file:
```bash
npx mocha test/spec/smartbanner_spec.js
```

## Architecture

The library reads configuration from `<meta name="smartbanner:*">` tags in the page and renders a dismissible banner for iOS/Android users.

**Source modules** (`src/`):
- `index.js` — entry point; instantiates `SmartBanner` on `window.load`. If `smartbanner:api` meta is set to `true`/`yes`, exposes the instance at `window.smartbanner` for manual control; otherwise auto-calls `publish()`.
- `smartbanner.js` — main class. `publish()` renders the banner HTML and calls `setContentPosition()` to push page content down. `exit()` removes the banner, restores position, and bakes the close cookie. Emits DOM events: `smartbanner.init`, `smartbanner.view`, `smartbanner.exit`, `smartbanner.clickout`.
- `optionparser.js` — reads all `<meta>` tags, filters those with `name="smartbanner:*"`, and returns options as camelCase keys (e.g. `button-url-apple` → `buttonUrlApple`).
- `detector.js` — UA-based platform detection (`android`/`ios`). iOS 13+ iPad detection uses `maxTouchPoints` because the UA reports as desktop Safari. Also detects jQuery Mobile pages and selects the appropriate wrapper element (`.ui-page` vs `html`) for content positioning.
- `bakery.js` — manages the `smartbanner_exited=1` cookie. `bake(hideTtl, hidePath)` sets it; `baked` getter checks it. When `hideTtl` is falsy the cookie has no expiry (session-only).

**Build pipeline**: esbuild bundles `src/index.js` → `dist/smartbanner[.min].js` targeting ES2015; Sass compiles `src/smartbanner.scss` → `dist/smartbanner[.min].css`. `add-banner` prepends the license header from `banner.tmpl` after minification.

**Tests**: Mocha + Chai running in Node.js with JSDOM to simulate a browser environment. Tests set up a DOM string (including relevant meta tags and UA overrides) and import source modules directly as ESM.

## Style

ESLint enforces: 2-space indent, single quotes, semicolons, strict equality (`===`), max 1 consecutive blank line.
