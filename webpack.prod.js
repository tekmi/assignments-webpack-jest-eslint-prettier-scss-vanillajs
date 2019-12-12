const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map', // https://webpack.js.org/configuration/devtool/#production
  performance: {
    hints: 'error', // https://webpack.js.org/configuration/performance/#performance-hints
    maxEntrypointSize: 1000000, // < 1 MB
    maxAssetSize: 300000, // < 0.3 MB
  },
  stats: 'normal', // https://webpack.js.org/configuration/stats/
});

