var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var entry = utils.getEntries('./src/pages/*/*.js')
entry['index'] = './src/main.js'

module.exports = {
  entry: entry,
  output: {
    hashDigestLength: 6,
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'views': resolve('src/views'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      'api': resolve('src/api'),
      'utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
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
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, '..'),
    //   manifest: require('./vendor-manifest.json')
    // }),
  ]
}
