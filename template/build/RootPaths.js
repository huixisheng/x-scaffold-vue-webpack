const path = require('path');
const fs = require('fs');
const url = require('url');
const dotenv = require('dotenv');

class RootPaths {
  constructor() {
    // @todo 支持更多扩展
    this.rootPath = path.join(this.getUserHome(), 'ProjectRoot');
  }

  // 用户的目录文件
  static getUserHome() {
    let userHomeDir = process.env.HOME || process.env.USERPROFILE;
    if (!userHomeDir) {
      userHomeDir = process.env.HOMEDRIVE + process.env.HOMEPATH;
    }
    return userHomeDir;
  }

  getProjectRoot(projectName) {
    const projectPath = path.join(this.rootPath, projectName);
    const stat = fs.statSync(projectPath);
    if (!stat.isDirectory()) {
      console.log('%s不存在', projectPath);
      process.exit();
    }
    return projectPath;
  }

  getModulesAssetsPath(projectName, module) {
    const projectPath = this.getProjectRoot(projectName);
    return path.join(projectPath, `Modules/${module}/Assets`);
  }

  getModulesViews(projectName, module) {
    const projectPath = this.getProjectRoot(projectName);
    return path.join(projectPath, `Modules/${module}/Resources/views`);
  }

  getCdnAsstesRoot() {
    return path.join(this.rootPath, 'cdnAssets');
  }

  getProjectDomain(projectName, platformUrl) {
    const envPath = path.join(this.getProjectRoot(projectName), '.env');
    let envConfig = dotenv.parse(fs.readFileSync(envPath));
    if (envConfig['APP_ENV']) {
      const AppEnvPath = path.join(this.getProjectRoot(projectName), `.${envConfig['APP_ENV']}.env`);
      envConfig = Object.assign(envConfig, dotenv.parse(fs.readFileSync(AppEnvPath)));
    }
    const href = url.parse(envConfig[platformUrl]);
    // @todo 根据platform获取各个平台的domain

    // const path = require('path')
    // const envFile = path.join(__dirname, '.local.env')
    // let envFileContent = fs.readFileSync(envFile, 'utf-8')
    // const reg = /URL_OPS_ADMIN=http\:\/\/(.*?)[\s|\/]/ig;
    // let domain = ''
    // envFileContent.replace(reg, function (match, p1) {
    //   console.log('p1', p1)
    //   domain = p1
    //   return p1
    // })
    console.log(' envConfig[platformUrl]', href.hostname);
    return href.hostname;
  }

}

module.exports = RootPaths;
