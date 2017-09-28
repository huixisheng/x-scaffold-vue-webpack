const path = require('path');
const webpack = require('webpack');
const MarkdownItContainer = require('markdown-it-container');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const striptags = require('./lib/strip-tags');

const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config');
const utils = require('./utils');

const vueMarkdown = {
  preventExtract: true,
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function () {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);
    return source;
  },
  use: [
    [MarkdownItContainer, 'demo', {
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'));

          return `<demo-box>
                    <div slot="demo">${html}</div>
                    <div slot="source-code">`;
        }

        // closing tag
        return '</div></demo-box>';
      },
    }],
  ],
};

delete baseWebpackConfig.entry;
const PORT = 9500;

module.exports = merge(baseWebpackConfig, {
  entry: {
    docs: ['./build/dev-client', './docs/main.js'],
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : `//${utils.getIp()}:${PORT}/`,
    filename: 'js/[name].js',
  },
  resolve: {
    alias: {
    },
  },
  // --inline --hot --watch -d --open -d ?
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    openPage: 'docs/index.html',
    port: PORT,
    host: utils.getIp(),
    watchOptions: {
      poll: true,
    },
    inline: true,
    hot: true,
    open: true,
    stats: {
      colors: true,
      timings: true,
      warnings: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: vueMarkdown,
      },
      {
        test: /\.yml$/,
        loader: 'json-loader!yaml-loader',
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader',
      },
    ].concat(utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true,
    })),
  },
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new FaviconsWebpackPlugin(path.resolve(config.config.projectRoot, 'docs/assets/favicon.png')),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'docs/index.html',
      template: 'docs/template.html',
      inject: true,
      chunks: ['docs'],
    }),
  ],
});


// const pages = utils.getEntries('./src/pages/*/*.html');
// pages['docs'] = './docs/index.html';
// // eslint-disable-next-line
// for (const pathname in pages) {
//   const excludeChunks = Object.keys(pages).filter(item => (item !== pathname));
//   console.log(excludeChunks);
//   console.log(pathname);
//   const conf = {
//     filename: pathname + '.html',
//     template: pages[pathname],
//     inject: true,
//     excludeChunks,
//   };
//   module.exports.plugins.push(new HtmlWebpackPlugin(conf));
// }
