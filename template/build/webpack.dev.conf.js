let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')
let merge = require('webpack-merge')
var path = require('path')
var WebpackAssetsManifest = require('webpack-assets-manifest')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
let baseWebpackConfig = require('./webpack.base.conf')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let StyleLintPlugin = require('stylelint-webpack-plugin')


var port = process.env.PORT || config.dev.port

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true
    })
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // @todo 报错
    // new StyleLintPlugin({
    //   failOnError: false,
    //   files: '../static/.css'
    // }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    // new OptimizeCSSPlugin(),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new WebpackAssetsManifest({
      output: config.dev.manifestPath,
      writeToDisk: true,
      publicPath: function (val, manifest) {
        switch (manifest.getExtension(val).substr(1).toLowerCase()) {
          case 'jpg': case 'jpeg': case 'gif': case 'png': case 'svg':
            return '//' + utils.getIp() +':' + port + '/' + val
            // break
          case 'css':
            return '//' + utils.getIp() +':' + port + '/' + val
            // break
          case 'js':
            return '//' + utils.getIp() +':' + port + '/' + val
            // break
          default:
            return '//' + utils.getIp() +':' + port + '/' + val
        }
      },
      done: function(manifest, stats) {
        console.log(`The manifest has been written to ${manifest.getOutputPath()}`);
        // console.log(stats); // Compilation stats
      }
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
    new FriendlyErrorsPlugin()
  ]
})

let pages = utils.getEntries('./src/pages/*/*.html')
pages['index'] = './index.html'
for (let pathname in pages) {
  let conf = {
    filename: pathname + '.html',
    template: pages[pathname],
    inject: true,
    excludeChunks: Object.keys(pages).filter(item => (item !== pathname))
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
