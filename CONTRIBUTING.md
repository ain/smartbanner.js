# Contributing to smartbanner.js

## Building

If you want to build `smartbanner.js` from source, you have to install the required dependencies first:

    $ npm i

Afterwards, you can generate distribution files in `dist/` from source by running:

    $ npm run build

## Unit tests

To run all unit tests, execute:

    $ npm test

To run single specs, execute as per file, e.g.:

    $ npm run mocha test/spec/smartbanner_spec.js

__ATTENTION:__ in order to get Pull Requests merged and released faster, please ensure [Code Coverage of smartbanner.js](https://coveralls.io/github/ain/smartbanner.js) remains positive and does not drop!

## Linting

For the purposes of consistent coding standard, SCSS and JavaScript files are linted every build.

If some of the files do not pass linters, build will fail.

Pull Requests will only be accepted if build succeeds.

To lint JavaScript, run:

    $ npm run eslint

## Running locally

To run `smartbanner.js` locally, e.g. for testing:

1. Start server

        $ npm start

2. Access at http://127.0.0.1:8080
3. Switch browser to mobile User Agent, e.g. iPhone
