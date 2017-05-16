const path = require('path');
const webpack = require('webpack');
const NodemonBrowsersyncPlugin = require('nodemon-browsersync-webpack-plugin');

module.exports = {
  entry: './app.js',

  output: {
    path: path.resolve('build'),
    filename: "bundle.js",
  },
  config: {
    path: path.resolve('config', 'database.json')
  },
  migrations_path: {
    path: path.resolve('./server/migrations', 'migrate')
  }

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ],
  	loaders: [
  	{ test: /\.json$/, loader: "json"}
  	]
  },

  plugins: [
  new webpack.DefinePlugin({
        'process.VERSION': require('./package.json').version
      })
  new webpack.HotModuleReplacementPlugin(),
  new NodemonBrowsersyncPlugin({
      script: 'server.js',
      ignore: [
          "src/*", 
          "public/*"
      ],
      ext: 'js json',
      verbose: true
    }, {
      proxy: '127.0.0.1:8000'
    })
  ],

  devtool: 'source-map',
  
}
