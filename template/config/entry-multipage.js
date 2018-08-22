const webpackEntry = require('@x-scaffold/webpack-entry');
const path = require('path');
const fs = require('fs');

const entry = webpackEntry.getEntries(['./multipage/**/*.js'], './multipage/');
const pages = {};
const pagesJson = [];

Object.entries(entry).forEach(([key, value], index) => {
  // index: {
  //   // page 的入口
  //   entry: 'src/index/main.js',
  //   // 模板来源
  //   template: 'public/index.html',
  //   // 在 dist/index.html 的输出
  //   filename: 'index.html',
  //   // 当使用 title 选项时，
  //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //   title: 'Index Page',
  //   // 在这个页面中包含的块，默认情况下会包含
  //   // 提取出来的通用 chunk 和 vendor chunk。
  //   chunks: ['chunk-vendors', 'chunk-common', 'index']
  // },
  const filename = key + '.html';
  let template = value.replace(path.extname(value), '.html');
  if (!fs.existsSync(path.join(process.cwd(), template))) {
    template = 'public/index.html';
  }
  pages[key] = {
    entry: value,
    template,
    filename,
    title: '多页面入口例子页面',
    chunks: ['chunk-vendors', 'chunk-common', key],
  };
  pagesJson.push({
    path: key + '.html',
    name: key,
  });
});

// 单页入口
pages['app'] = {
  entry: './src/main.js',
  template: 'public/index.html',
  filename: 'index.html',
  chunks: ['chunk-vendors', 'chunk-common', 'app'],
};

const pagesPath = path.join(__dirname, '../src/config/pages.json');
fs.writeFileSync(pagesPath, JSON.stringify(pagesJson, null, 2));

module.exports = pages;