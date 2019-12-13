# Intro

Results of the assignment were deployed here [https://schiphol-assignment.yum.pl/](https://schiphol-assignment.yum.pl/)
Source code is here [https://github.com/tekmi](https://github.com/tekmi)

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

|File                      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
|--------------------------|----------|----------|----------|----------|-------------------|
|All files                 |      100 |      100 |      100 |      100 |                   |
| api                      |      100 |      100 |      100 |      100 |                   |
|  FlightsApi.js           |      100 |      100 |      100 |      100 |                   |
| templates                |      100 |      100 |      100 |      100 |                   |
|  FoundFlightsTemplate.js |      100 |      100 |      100 |      100 |                   |
|  NoFlightsTemplate.js    |      100 |      100 |      100 |      100 |                   |
|  TemplateHandler.js      |      100 |      100 |      100 |      100 |                   |

## Functional Tests (End2End)

