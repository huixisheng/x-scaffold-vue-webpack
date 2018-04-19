const path = require('path');
const webpack = require('webpack');
const xConfig = require('x-config-deploy').getConfig();
const QiniuPlugin = require('qiniu-webpack-plugin');
const config = require('../config/index');
const pkg = require('../package.json');

const os = require('os');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');


const qiniuPluginAssets = new QiniuPlugin({
  ACCESS_KEY: xConfig.qiniuLibConfig.accessKey,
  SECRET_KEY: xConfig.qiniuLibConfig.secretKey,
  bucket: xConfig.qiniuLibConfig.bucket,
  path: pkg.name,
  include: [new RegExp('vendor-dll-')],
  // include 可选项。你可以选择上传的文件，比如['main.js']``或者[/main/]`
});

module.exports = {
  entry: config.dll.entry,
  output: {
    hashDigestLength: 6,
    path: path.resolve(__dirname, 'dist'),
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
    qiniuPluginAssets,
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', 'dll/[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_library',
    }),
    // https://www.404forest.com/2017/06/12/optimie-webpack-bundle-performance/#3-4-使用-webpack-uglify-parallel-并行执行压缩
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
      sourceMap: false,
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),
  ],
};