const path = require('path');
const webpack = require('webpack');
const NodemonBrowsersyncPlugin = require('nodemon-browsersync-webpack-plugin');

module.exports = {
  entry: './server/app.js',

  output: {
    path: path.resolve('build'),
    filename: "bundle.js",
  },
node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty',
      fs:  'empty', 
    },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ],
  	loaders: [
  	{ test: /\.json$/, loader: "json"},
    { test: /\.jsx?$/, loader: "babel-loader"}
  	]
  },

  plugins: [
  new webpack.DefinePlugin({
        'process.VERSION': require('package.json').version
      }),
  new webpack.HotModuleReplacementPlugin(),
  new NodemonBrowsersyncPlugin({
      script: 'server.js',
      ignore: [
          "src/*", 
          "public/*"
      ],
      ext: 'js json',
      verbose: true
    }/*, {
      proxy: 'localhost:8000'
    }*/)
  ],

  devtool: 'source-map',
  
}
