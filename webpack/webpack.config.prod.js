const WebpackStripLoader = require('strip-loader');
const devConfig = require('./webpack.config.dev.js');

const stripLoader = {
  test: [/\.js$/],
  exclude: /node_modules/,
  loader: WebpackStripLoader.loader('console.log')
}

devConfig.module.rules.push(stripLoader);

module.exports = devConfig;
