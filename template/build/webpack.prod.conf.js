var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var WebpackAssetsManifest = require('webpack-assets-manifest')
var pkg = require('../package.json')
var DashboardPlugin = require('webpack-dashboard/plugin')

var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;

const os = require('os')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new StatsWriterPlugin({
      filename: 'stats.json' // Default
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
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
      sourceMap: false
    }),

    // new ParallelUglifyPlugin({
    //   cacheDir: '.cache/',
    //   uglifyJS:{
    //     output: {
    //       comments: false
    //     },
    //     compress: {
    //       warnings: false
    //     }
    //   }
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: process.env.NODE_ENV === 'testing'
    //     ? 'index.html'
    //     : config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
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
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new WebpackAssetsManifest({
      output: 'webpack-' + pkg.name + '.json',
      // publicPath: '//cdn.example.com'
      publicPath: function (val, manifest) {
        switch (manifest.getExtension(val).substr(1).toLowerCase()) {
          case 'jpg': case 'jpeg': case 'gif': case 'png': case 'svg':
            return '//img0.cosmeapp.com/' + val
            // break
          case 'css':
            return '//p.cosmeapp.com/s/webpack/' + val
            // break
          case 'js':
            return '//p.cosmeapp.com/s/webpack/' + val
            // break
          default:
            return '//p.cosmeapp.com/s/webpack/' + val
        }
      }
    }),
    // new DashboardPlugin({ port: 10001 })
    // @todo 上传资源服务器
    // transfer-webpack-plugin
    // https://github.com/lyfeyaj/qn-webpack
    // https://github.com/wyvernnot/qiniu-webpack-plugin
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig

// module.exports.plugins.push()
var pages = utils.getEntries('./src/pages/*/*.html')

for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true,              // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }
  if (pathname in module.exports.entry) {    // 为页面导入所需的依赖
    conf.chunks = ['vendor', 'manifest', pathname]
    conf.hash = false
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 10000,
  }))
}
