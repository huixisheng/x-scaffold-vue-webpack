// const path = require('path');
const utils = require('../utils');
// const config = require('../config');
// const vueLoaderConfig = require('./vue-loader.conf');
const glob = require('glob');

// function resolve(dir) {
//   return path.join(__dirname, '..', dir);
// }
/*
{
  'test/index': './src/pages/test/index.js',
  'login/index': './src/pages/user/login/index.js'
}
 */
const entry = utils.getEntries('./src/pages/**/*.js');
console.log(entry);

const htmlEntry = utils.getEntriesHtml();
console.log(htmlEntry);

console.log(glob.sync('./src/pages/**/*.html'));
