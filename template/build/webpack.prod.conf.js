const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpackEntry = require('@x-scaffold/webpack-entry');
const xConfig = require('x-config-deploy').getConfig();
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const webpackVueStyle = require('@x-scaffold/webpack-vue-style');
const QiniuPlugin = require('qiniu-webpack-plugin');
const pkg = require('../package.json');

// const DashboardPlugin = require('webpack-dashboard/plugin');
// const WebpackSftpClient = require('webpack-sftp-client');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const qiniuPluginAssets = new QiniuPlugin({
  ACCESS_KEY: xConfig.qiniuConfig.accessKey,
  SECRET_KEY: xConfig.qiniuConfig.secretKey,
  bucket: xConfig.qiniuConfig.bucket,
  path: '',
  include: [new RegExp(pkg.name + '/')],
  // include 可选项。你可以选择上传的文件，比如['main.js']``或者[/main/]`
  // path: '[hash]'
});


const os = require('os');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

const webpackBaseConfig = merge(baseWebpackConfig, {
  module: {
    rules: webpackVueStyle.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
    }),
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    qiniuPluginAssets,
    // @todo
    // new StatsWriterPlugin({
    //   filename: 'stats.json', // Default
    // }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
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
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // split vendor js into its own file
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
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
    new WebpackAssetsManifest({
      output: config.build.manifestPath,
      // publicPath: '//cdn.example.com'
      publicPath(val, manifest) {
        switch (manifest.getExtension(val).substr(1).toLowerCase()) {
          case 'jpg': case 'jpeg': case 'gif': case 'png': case 'svg':
            return config.build.assetsPublicPath + val;
            // break
          case 'css':
            return config.build.assetsPublicPath + val;
            // break
          case 'js':
            return config.build.assetsPublicPath + val;
            // break
          default:
            return config.build.assetsPublicPath + val;
        }
      },
      done(manifest) {
        // eslint-disable-next-line
        const { requestAssets } = require('request-assets');
        const cacheManifestAssets = config.build.manifestPath.replace('.json', '-cache.json');
        requestAssets({
          webpack: JSON.stringify(manifest.assets),
          path: path.basename(config.build.manifestPath, '.json'),
          module: config.build.projectModule,
        }, cacheManifestAssets).then((body) => {
          console.log(body);
        }).catch((error) => {
          console.log(error);
        });
      },
    }),
    // new WebpackSftpClient(Object.assign(xConfig.sftp,
    // {
    //   path: path.resolve(__dirname, '../dist/' + assetsManifestFile),
    //   remotePath: '/home/ykq/',
    //   // Show details of uploading for files
    //   verbose: true
    // }))
    // new DashboardPlugin({ port: 10001 })
    // @todo 上传资源服务器
    // transfer-webpack-plugin
    // https://github.com/lyfeyaj/qn-webpack
    // https://github.com/wyvernnot/qiniu-webpack-plugin
  ],
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackBaseConfig.plugins.push(new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8,
  }));
}

module.exports = webpackBaseConfig;

const pages = webpackEntry.getEntriesHtml(['./pages/**/*.js', './src/main.js'], './pages/');
pages.forEach((value) => {
  module.exports.plugins.push(new HtmlWebpackPlugin(value));
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackBaseConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 10000,
  }));
}
