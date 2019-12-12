const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const javascript = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        "@babel/transform-runtime"
      ]
    }
  }],
};

const styles = {
  test: /\.s[ac]ss$/i,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
  ]
};

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './flights.json', to: 'fakeapi' }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Schiphol Frontend Assignment',
      favicon: './public/favicon.webp',
      template: './public/indexTemplate.html',
    }),
  ]
};
