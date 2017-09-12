/* global cp, cd, exec */
var path = require('path')
var util = require('util')
var pkg = require('../package.json')
var config = require('../config')
var xConfig = require('x-config-deploy').getConfig()
const RootPaths = require('./RootPaths');
const rootPathsInstance = new RootPaths();
require('shelljs/global')


function init () {
  var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  var mapPath = path.join(config.build.assetsRoot, 'webpack-' + pkg.name + '.json')
  var cdnsWebpackDir = path.join(rootPathsInstance.getCdnAsstesRoot(), config.build.cdnAssestSubPath)

  var h5MapPath = rootPathsInstance.getModulesAssetsPath('cosmeapi', 'Api')
  console.log(h5MapPath);

  cp('-R', mapPath, h5MapPath)
  cp('-R', assetsPath, cdnsWebpackDir)

  cd(cdnsWebpackDir)
  var gitOutput = exec('git status')
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
    var shellCmd = util.format('git add . && git commit -am "[%s] [%s]更新前端资源文件" && git push origin master', time, pkg.name)
    exec(shellCmd)
    cd(path.join(cdnsWebpackDir, '../../'))
    // console.log('\n\ncdnpath: %s\n\n', cdnpath)
    exec('npm run sync')
  }
}

exports.init = init
