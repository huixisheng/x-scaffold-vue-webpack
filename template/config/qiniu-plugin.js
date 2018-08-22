const configDeploy = require('x-config-deploy');
const QiniuWebpackPlugin = require('better-qiniu-webpack-plugin');
const { pkg } = require('./utils');

// TODO 支持env配置
const qiniuWebpackPlugin = new QiniuWebpackPlugin({
  accessKey: configDeploy.get('qiniuDeploy.accessKey'), // required
  secretKey: configDeploy.get('qiniuDeploy.secretKey'), // required
  bucket: configDeploy.get('qiniuDeploy.bucket'), // required
  bucketDomain: configDeploy.get('qiniuDeploy.domain'), // required
  matchFiles: ['*.css', '*.js'],
  uploadPath: pkg.name + '/',
  batch: 10,
});

// const QiniuPlugin = require('qiniu-webpack-plugin');
// const qiniuPluginAssets = new QiniuPlugin({
//   ACCESS_KEY: xConfig.qiniuDeploy.accessKey,
//   SECRET_KEY: xConfig.qiniuDeploy.secretKey,
//   bucket: 'deploy',
//   path: pkg.name,
//   // include: [],
//   // include: [/.*\.(css)$/g, /.*\.(js)$/g],
//   // include: [new RegExp('dist')],
//   // include 可选项。你可以选择上传的文件，比如['main.js']``或者[/main/]`
//   // path: '[hash]'
// });

module.exports = qiniuWebpackPlugin;