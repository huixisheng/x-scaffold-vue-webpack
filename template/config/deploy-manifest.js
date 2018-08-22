const fs = require('fs');
const path = require('path');
const configDeploy = require('x-config-deploy');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { publicPath, pkg } = require('./utils');

const manifestOutpath = path.join(__dirname, `../dist/webpack-${pkg.name}.json`);

const webpackAssetsManifessInstance = new WebpackAssetsManifest({
  output: manifestOutpath,
  publicPath,
  done(manifest) {
    // 支持AutoDllPlugin的文件写入manifest.json
    updateManifest(manifest.assets, manifest.options);

    // 业务捆绊
    // eslint-disable-next-line
    const { requestAssets } = require('request-assets'); // 使用内部的部署的cnpm安装
    const requestAssetsModule = configDeploy.get('laravelModuleName');
    if (requestAssetsModule) {
      const manifestPath = manifestOutpath;
      const cacheManifestAssets = manifestPath.replace('.json', '-cache.json');
      requestAssets(
        {
          webpack: JSON.stringify(manifest.assets),
          path: path.basename(manifestPath, '.json'),
          module: requestAssetsModule,
        },
        cacheManifestAssets,
      )
        .then((body) => {
          console.log(body);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});


function updateManifest(assets, options) {
  const dllFileListPath = path.join(path.dirname(options.output), 'dll');
  const publicPath = options.publicPath;
  const dllFileList = fs.readdirSync(dllFileListPath);
  dllFileList.forEach((filepath) => {
    const basename = path.basename(filepath);
    const arrBasename = basename.split('_');
    assets[arrBasename[0]] = publicPath + '/dll/' + filepath;
  });
}

module.exports = webpackAssetsManifessInstance;