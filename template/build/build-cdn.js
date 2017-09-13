/* global cp, cd, exec */
const path = require('path');
const util = require('util');
const pkg = require('../package.json');
const config = require('../config');
// const xConfig = require('x-config-deploy').getConfig();
const RootPaths = require('./RootPaths');

const rootPathsInstance = new RootPaths();
require('shelljs/global');


function init() {
  const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
  const mapPath = path.join(config.build.assetsRoot, 'webpack-' + pkg.name + '.json');
  // eslint-disable-next-line
  const cdnsWebpackDir = path.join(rootPathsInstance.getCdnAsstesRoot(),
    config.build.cdnAssestSubPath);

  const h5MapPath = rootPathsInstance.getModulesAssetsPath('cosmeapi', 'Api');
  console.log(h5MapPath);

  cp('-R', mapPath, h5MapPath);
  cp('-R', assetsPath, cdnsWebpackDir);

  cd(cdnsWebpackDir);
  const gitOutput = exec('git status');
  // console.log(gitOutput);
  /*
    {
    code: 0,
    output: '',
    stdout: '',
    stderr: ''
    }
  */
  const date = new Date();
  const month = date.getMonth() + 1;
  const d = date.getDate();
  const time = `${date.getFullYear()}-${month}-${d}`;
  if (gitOutput.code === 0 && gitOutput.stdout.indexOf('use "git add') >= 0) {
    // eslint-disable-next-line
    const shellCmd = util.format('git add . && git commit -am "[%s] [%s]更新前端资源文件" && git push origin master', time, pkg.name);
    exec(shellCmd);
    cd(path.join(cdnsWebpackDir, '../../'));
    // console.log('\n\ncdnpath: %s\n\n', cdnpath)
    exec('npm run sync');
  }
}

exports.init = init;
