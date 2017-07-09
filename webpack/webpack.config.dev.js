const path = require('path');
const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const rootPath = path.resolve('./');

module.exports = {
  entry: './server/app.js',

  output: {
    path: rootPath,
    filename: 'bundle.js',
  },
  target: 'node',
  externals: [NodeExternals()],

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
    new webpack.EnvironmentPlugin({'NODE_ENV': 'development'}),
  ],

  devtool: 'source-map',

};
