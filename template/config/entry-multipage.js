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
  let template = entry.replace(path.extname(entry), '.html');
  if (!fs.existsSync(path.join(process.cwd(), template))) {
    template = 'public/index.html';
  }
  const title = getTemplateTitle(template) || key;
  pages[key] = {
    entry,
    template,
    filename,
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title,
    chunks: ['chunk-vendors', 'chunk-common', key],
  };
  pagesJson.push({
    path: key + '.html',
    name: key,
    title,
  });
});

const title = getTemplateTitle('public/index.html') || 'app';
// 单页入口
pages['app'] = {
  entry: './src/main.js',
  template: 'public/index.html',
  title,
  filename: 'index.html',
  chunks: ['chunk-vendors', 'chunk-common', 'app'],
};

pagesJson.push({
  path: '',
  name: 'app',
  title,
});

// TODO
function getTemplateTitle(template) {
  let tmpPath = template;
  if (!path.isAbsolute(tmpPath)) {
    tmpPath = path.join(process.cwd(), template);
  }
  const content = fs.readFileSync(tmpPath, { encoding: 'utf-8' });
  return '';
  // console.log(content.match(/<title>(.*)<\/title>/mg));
  // return content.match(/<title>(.*)<\/title>/mg)[1];
}

// console.log(pages);
const pagesPath = path.join(__dirname, '../src/config/pages.json5');
fs.writeFileSync(pagesPath, '// generate by config/entry-multipage.js\n' + JSON.stringify(pagesJson, null, 2));

module.exports = pages;