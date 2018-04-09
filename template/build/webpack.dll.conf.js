const path = require('path');
const webpack = require('webpack');
const config = require('../config/index');

// TODO 上传服务器
module.exports = {
  entry: config.dll.entry,
  output: {
    hashDigestLength: 6,
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name]-dll-[chunkhash].js',
    library: '[name]_library',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', 'dll/[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_library',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};