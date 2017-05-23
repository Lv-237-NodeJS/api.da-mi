'use strict';
const WebpackStripLoader = require('strip-loader');
let devConfig = require('./webpack.config.dev.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const rootPath = __dirname + '/';
const buildPath = __dirname + '/build';

const stripLoader = {
  test: [/\.js$/],
  exclude: /node_modules/,
  loader: 'strip-loader',
};

devConfig.module.rules.push(stripLoader);

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['buildPath'], {
      rootPath: 'rootPath',
      verbose: true,
      dry: false,
    }),
  ],
};

module.exports = devConfig;
