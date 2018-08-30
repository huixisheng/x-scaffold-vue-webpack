const webpackEntry = require('@x-scaffold/webpack-entry');
const path = require('path');
const fs = require('fs');

const entries = webpackEntry.getEntries(['**/*.js'], {
  cwd: path.resolve('./multipage'),
  ignore: ['page2/**'],
});
const pages = {};
const pagesJson = [];

Object.entries(entries).forEach(([key, value], index) => {
  const filename = key + '.html';
  const entry = 'multipage/' + value;
  let template =  value.replace(path.extname(value), '.html');
  if (!fs.existsSync(path.join(process.cwd(), template))) {
    template = 'public/index.html';
  }
  pages[key] = {
    entry,
    template,
    filename,
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
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

pagesJson.push({
  path: '',
  name: 'app',
});

// console.log(pages);
const pagesPath = path.join(__dirname, '../src/config/pages.json');
fs.writeFileSync(pagesPath, JSON.stringify(pagesJson, null, 2));

module.exports = pages;