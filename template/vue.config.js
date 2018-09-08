const path = require('path');
const fs = require('fs');
const AutoDllPlugin = require('autodll-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const devServer = require('./config/webpack-dev-server');
const entryMultupage = require('./config/entry-multipage');
const qiniuWebpackPlugin = require('./config/qiniu-plugin');
const { getEnvConfig, publicPath } = require('./config/utils');
const webpackAssetsManifestInstance = require('./config/deploy-manifest');

class WebpackPluginXdo {
  // constructor() {
  //   this.xdoStatus = 'todo';
  // }
  apply(compiler) {
    compiler.hooks.entryOption.tap('WebpackPluginXdo', () => {
      require('child_process').exec('./node_modules/.bin/x-do-view');
      require('child_process').exec('./node_modules/.bin/x-do-component');
    });
    compiler.hooks.watchRun.tap('WebpackPluginXdo', function (compiler) {
      require('child_process').exec('./node_modules/.bin/x-do-view');
      require('child_process').exec('./node_modules/.bin/x-do-component');
    });
  }
}

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 支持webpack define
// process.env.VUE_APP_API_BASE = 'https://ykq.com';
// if (process.env.NODE_ENV === 'development') {
//   process.env.VUE_APP_API_BASE = getEnvConfig('ykqBase', 'http://test.ykq.com');
// }

module.exports = {
  // 后台不需要
  pages: entryMultupage,

  lintOnSave: true,
  // https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  baseUrl: process.env.NODE_ENV === 'production' ? publicPath : '/',

  // configure webpack-dev-server behavior
  devServer,

  // tweak internal webpack configuration.
  chainWebpack: (config) => {
    // https://cli.vuejs.org/guide/webpack.html#adding-a-new-loader
    // https://github.com/neutrinojs/webpack-chain/tree/v3
    config.module
      .rule('json5')
      .test(/\.json5$/)
      .use('json5-loader')
      .loader('json5-loader')
      .end();
    // config
    //   .plugin('define')
    //   .tap((args) => {
    //     console.log(args);
    //   });
  },
  configureWebpack: (config) => {
    // 在内部无效
    // https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/util/resolveClientEnv.js
    // https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/base.js
    // https://github.com/vuejs/vue-cli/issues/787

    // const definePlugin = new webpack.DefinePlugin({
    // });
    // 用于配置替换的apiUrl
    // if (config.mode === 'development') {
    //   process.env.VUE_APP_XX_BASE = getEnvConfig('apiBase', 'http://xx.com');
    // }

    config.externals = {
      // 指定别名
      // "moment": 'moment'
      vue: 'Vue',
    };

    // 新增的文件没有触发watch-run
    // https://webpack.docschina.org/configuration/watch/
    config.watchOptions = {
      ignored: ['node_modules'],
      poll: 200,
    };

    // delete config.resolve.alias['@'];
    config.resolve.alias.src = resolve('src');

    // https://github.com/asfktz/autodll-webpack-plugin/issues/58
    config.plugins.push(new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name]_[hash:8].js',
      debug: true,
      path: './dll',
      // inherit(config) {
      //   // console.log(config);
      // },
      // config: {
      //   output: {
      //     filename: '[name]_v3.dll.js',
      //     library: '[name]_v3',
      //   },
      // },
      // hash: '[name]_v3',
      entry: {
        vendor: [
          'vue/dist/vue.esm.js',
          'vue-router',
          // 'core-js',
          'pack-axios',
          // 'qs',
          // 'vuex',
          'vue-lazyload',
        ],
      },
    }));

    if (config.mode === 'development') {
      config.plugins.push(new StyleLintPlugin({
        failOnError: false,
        files: ['**/*.s?(a|c)ss', 'src/**/**/*.vue', 'src/***/*.css'],
        // files: '../static/.css'
      }));
    }

    if (config.mode === 'production') {
      config.devtool = false;
      // Configuration Error: Avoid modifying webpack output.publicPath directly. Use the "baseUrl" option instead.
      // config.output.publicPath = publicPath;
      // https://github.com/vuejs/vue-cli/issues/1608
      config.plugins.push(qiniuWebpackPlugin);
      config.plugins.push(webpackAssetsManifestInstance);
    }
    config.plugins.push(new WebpackPluginXdo());
  },
};