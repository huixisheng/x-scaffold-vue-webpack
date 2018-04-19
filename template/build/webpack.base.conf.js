const path = require('path');
const utils = require('./utils');
const config = require('../config');
const webpackEntry = require('@x-scaffold/webpack-entry');
const webpackVueStyle = require('@x-scaffold/webpack-vue-style');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
const entry = webpackEntry.getEntriesJs(['./pages/**/*.js', './src/main.js'], './pages/');

/* eslint-disable max-len */
module.exports = {
  entry,
  output: {
    hashDigestLength: 6,
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: resolve('src'),
      views: resolve('src/views'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
      api: resolve('src/api'),
      utils: resolve('src/utils'),
    },
  },
  externals: {
    // 指定别名
    // vue: 'Vue',
    // '@x-scaffold/adminui': 'AdminUi',
  },
  // https://doc.webpack-china.org/configuration/stats/
  // devServer: {
  //   stats: {
  //     colors: true,
  //   },
  // },
  module: {
    // https://doc.webpack-china.org/configuration/module/#module-noparse
    // noParse: function(content) {
    //   // console.log(content);
    //   return /vue\.esm\.js|axios|element-ui|lodash/.test(content);
    // },
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test'), resolve('docs')],
        exclude: /node_modules/,
        options: {
          cache: false,
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: webpackVueStyle.loaders,
          cssSourceMap: false,
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/,
        include: [resolve('src'), resolve('test'), resolve('docs')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      /**
       * ERROR  Failed to compile with 3 errors                                                             22:54:22
        These dependencies were not found:

        * assets/app.css in ./src/main.js
        * mint-ui/lib/style.css in ./src/main-page.js
        * normalize.css/normalize.css in ./src/main-page.js

        To install them, you can run: npm install --save assets/app.css mint-ui/lib/style.css normalize.css/normalize.css
        (node:40847) DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead.
       */
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract(["css-loader", "postcss-loader"])
      // },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./dll/vendor-manifest.json')
    // }),
  ],
};
