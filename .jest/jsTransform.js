module.exports = require("babel-jest").createTransformer({
  presets: ["@babel/env"],
  plugins: ["@babel/transform-runtime"],
});
