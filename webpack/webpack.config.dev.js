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
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
  new webpack.DefinePlugin({
        'process.VERSION': require('package.json').version,
        'process.browser': true,
      }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  ],

  devtool: 'source-map',

};
