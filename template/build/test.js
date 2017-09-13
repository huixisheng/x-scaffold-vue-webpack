// const path = require('path');
const utils = require('./utils');
// const config = require('../config');
// const vueLoaderConfig = require('./vue-loader.conf');
const glob = require('glob');

// function resolve(dir) {
//   return path.join(__dirname, '..', dir);
// }
const entry = utils.getEntries('./src/pages/*/*.js');
console.log(entry);

console.log(glob.sync('./src/pages/*/*.js'));
