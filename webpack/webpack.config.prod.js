const WebpackStripLoader = require('strip-loader');
let devConfig = require('./webpack.config.dev.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const stripLoader = {
  test: [/\.js$/],
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log'),
};

devConfig.module.rules.push(stripLoader);

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: './webpack.config.dev.js',
      verbose: true,
      dry: false,
    }),
  ],
};

module.exports = devConfig;
