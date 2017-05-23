const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/app.js',

  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
  },
  target: 'node',
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },

  plugins: [
  new webpack.NoEmitOnErrorsPlugin(),
  ],

  devtool: 'source-map',

};
