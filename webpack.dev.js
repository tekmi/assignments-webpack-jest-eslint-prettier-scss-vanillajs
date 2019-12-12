const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // https://webpack.js.org/configuration/devtool/#development
  performance: {
    hints: 'warning', // https://webpack.js.org/configuration/performance/#performance-hints
    maxEntrypointSize: 3000000, // < 3MB
    maxAssetSize: 3000000, // < 3MB
  },
  stats: 'verbose', // https://webpack.js.org/configuration/stats/
  devServer: {
    compress: true,
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 7777,
    contentBase: path.join(__dirname, 'dist'),
  },
});
