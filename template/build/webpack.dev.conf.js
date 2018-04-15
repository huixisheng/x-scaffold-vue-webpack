const utils = require('./utils');
const webpackEntry = require('@x-scaffold/webpack-entry');
const webpackVueStyle = require('@x-scaffold/webpack-vue-style');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const IP = require('ip').address();

const port = process.env.PORT || config.dev.port;

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: webpackVueStyle.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: false,
    }),
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js'),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // @todo 报错
    new StyleLintPlugin({
      failOnError: false,
      files: ['**/*.s?(a|c)ss', 'src/**/**/*.vue', 'src/***/*.css'],
      // files: '../static/.css'
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),

    // new OptimizeCSSPlugin(),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // eslint-disable-next-line
      minChunks(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    new WebpackAssetsManifest({
      output: config.dev.manifestPath,
      writeToDisk: true,
      publicPath(val, manifest) {
        switch (manifest.getExtension(val).substr(1).toLowerCase()) {
          case 'jpg': case 'jpeg': case 'gif': case 'png': case 'svg':
            return '//' + IP + ':' + port + '/' + val;
            // break
          case 'css':
            return '//' + IP + ':' + port + '/' + val;
            // break
          case 'js':
            return '//' + IP + ':' + port + '/' + val;
            // break
          default:
            return '//' + IP + ':' + port + '/' + val;
        }
      },
      // eslint-disable-next-line
      done(manifest, stats) {
        console.log(`The manifest has been written to ${manifest.getOutputPath()}`);
        // console.log(stats); // Compilation stats
      },
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin(),
  ],
});

const pages = webpackEntry.getEntriesHtml(['./pages/**/*.js', './src/main.js'], './pages/');
pages.forEach((value) => {
  module.exports.plugins.push(new HtmlWebpackPlugin(value));
});
