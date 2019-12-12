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

Please create a page that contains an input field.
When the user enters *at least* three characters into this input field,
you should display all flight information from the `flights.json` file where the destination matches the entered input.
Do this by using vanilla Javascript.

We think 4 hours should be enough to spend on this assignment.
Please don't spend more than that unless you're having fun and want to show off :)

## Requirement:
- Use Webpack to build an ES5 bundle of your program.
- Make it look nice. Make sure Webpack also packages your styles. We have provided some internal SCSS files in the `/sass` directory from our internal setup.
You can read about these on [http://takeoff.schiphol.nl/component/style-fundamentals](http://takeoff.schiphol.nl/component/style-fundamentals)
- Your application should treat the contents of `flights.json` as the output of an API endpoint.
It should load this via xhr and should not require a page load when the user changes their input.

## Submission:
- Create a clone of this repository locally.
Then push it to **your GitHub account** and continue working from there. Once you have finished, please send us the URL of the repository you have created.

### Some things to consider:
- We like tested code
- We like readable code
- We like using the latest features of ES6 where applicable
- Last but not least, have fun!
