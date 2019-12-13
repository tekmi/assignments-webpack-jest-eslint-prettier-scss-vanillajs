# Intro

- Dist files deployed [https://schiphol-assignment.yum.pl/](https://schiphol-assignment.yum.pl/)
- Source code [https://github.com/tekmi/assignments-webpack-jest-eslint-prettier-scss-vanillajs](https://github.com/tekmi/assignments-webpack-jest-eslint-prettier-scss-vanillajs)

# Installation

```
yarn install
yarn start
```

# Explanation

## Webpack configuration 

I have created two webpack configs, one for development and one for production. I have chosen `webpack-merge` library to keep it more elegant. I have also played a bit more with some stats and performance hints.
It feels a bit over-engineered, but I'm planning to write a blog post about it, so it was a nice exercise for me :-)

## Polyfills and XHR

- I've chosen the default configuration of `browserslist`, which means bigger bundle and more things to polyfill. You can check which browsers shall be supported by running `npx browserslist`.
- I've chosen to use native `fetch`, instead of using another NPM library like `axios`. Because I support older browsers, I had to polyfill it with `es6-promise` and `whatwg-fetch`.
- I also wanted to use `await/async`, so I had to bundle the `@babel/runtime` for older browsers. (P.S: If you know how to do it slimmer, please let me know)

## Flights file

I have chosen to use `copy-webpack-plugin` to copy the `flights.json` file into the `dist` directory under `/dist/fakeapi/flights.json`.
This drew a strict line between the build and source files and simplified deployment. It is the simplest solution I came up with, but I'm happy to extend it, if you want to see some Nodejs/PHP API that truly serves this file.

## HTML files and templates

I've chosen to use `html-webpack-plugin` to read and build from a template file `public/indexTemplate.html`.  It does automatically inject webpack's bundled file and gives some level of extensibility.
But it feels a bit fishy that way, I would rather go for some SPA framework like React, Angular or Vue. Or maybe tried SSR with frameworks like Next or Nuxt.

When it comes to templating, I wanted to keep it also as simple as possible, so I've chosen ES6 Template Literals and simple `innerHTML` to place it in in a given DOM element. 
It also feels fishy to me, I would rather use JSX, Handlebars or other JS templating engine.

## Unit and Integration Tests

I have chosen `jest` framework for unit and integration testing. It is fast, reliable and is maintained by Facebook. It comes bundled with assertions, spies and mocks. Moreover it provides snapshots and code coverage functionality.
I have achieved 100% coverage, but it's only because it is a tiny project. My preferred coverage thresholds for greenfield projects are listed in package.json.
I had some trouble to make JSDOM working properly inside `integration/templates/TemplateHandler.test.js`. I had to mock too much. If you know how to instruct JSDOM to listen on the `innerHTML` DOM element changes, please let know :-)

| File                      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
|---------------------------|----------|----------|----------|----------|-------------------|
| All files                 |      100 |      100 |      100 |      100 |                   |
|  api                      |      100 |      100 |      100 |      100 |                   |
|   FlightsApi.js           |      100 |      100 |      100 |      100 |                   |
|  templates                |      100 |      100 |      100 |      100 |                   |
|   FoundFlightsTemplate.js |      100 |      100 |      100 |      100 |                   |
|   NoFlightsTemplate.js    |      100 |      100 |      100 |      100 |                   |
|   TemplateHandler.js      |      100 |      100 |      100 |      100 |                   |

To run all unit and integration tests with coverage

```
test:unit:integration:coverage
```

## Functional Tests (End2End)

For this tiny assignment I've chosen Cypress, because of its all-in-one solution (Mocha-like testing framework, Chai assertion library, Sinon for mocking) bundled in one library, its the developer experience with automatic live reload and usage of pure browser APIs. 
It's also fast, because it runs in the browser and does not use Selenium or Node underneath. However it may not be the best tool out there, since the main problem is its browser support. (It runs only on Chromium and Electron browsers).
For bigger projects I would consider trying out TestCafe, because it has better browser support, still being the new child on the scene.

I've used a default Cypress syntax for assertions and writing specifications. However, if I had to work with bigger teams, I would definitely add Cucumber integration and write User Stories together with Product Owners.
I've also used the `data-ft-element` to not couple the functional tests to the classes or ids.

To see all the functional tests in action, run

```
yarn test:functional:run
```

## Styles

I've tried to replicate the styles from your main website, so I `copy & paste` the selector names and extracted the juices out of it. I see you have used BEM technique there, so I tried to understand it, slicing it inside various SCSS files, basing on my guts.
However I didn't feel so comfortable with this, so please verify if this makes sense. I would be glad to hear more from you.

# Possible improvements

- debounce to not call Search API too often
- stylelint for SCSS
- extract styles to separate files during webpack production build
- husky for some pre-commit hooks

# Miscellaneous

- can be tested in IE11 [https://www.browserling.com/browse/win/7/ie/11/https%3A%2F%2Fschiphol-assignment.yum.pl%2F](https://www.browserling.com/browse/win/7/ie/11/https%3A%2F%2Fschiphol-assignment.yum.pl%2F)
- production build can be generated with `yarn prod` and served with `yarn serve`
- dev build can be generated with `yarn dev` and served with `yarn serve`
- prettier and eslint are used together to ensure the coding styles and guidelines (mostly based on the Airbnb)

# Contact

For any questions, feel free to contact me via 

- e-mail: adam.gegotek@gmail.com
- twitter: https://twitter.com/adamgegotek
- website: https://tekmi.nl/#contact

Or if you have some time, feel free to read my latest technical thoughts on my blog page https://blog.tekmi.nl/
