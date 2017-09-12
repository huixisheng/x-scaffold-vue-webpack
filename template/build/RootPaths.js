const path = require('path');
const fs = require('fs');

class RootPaths {
  constructor() {
    // @todo 支持更多扩展
    this.rootPath = path.join(this.getUserHome(), 'ProjectRoot');
  }

  // 用户的目录文件
  getUserHome(){
      var userHomeDir = process.env.HOME || process.env.USERPROFILE;
      if (!userHomeDir) {
          userHomeDir = process.env.HOMEDRIVE + process.env.HOMEPATH;
      }
      return userHomeDir;
  }

  getProjectRoot(projectName) {
    const projectPath = path.join(this.rootPath, projectName);
    const stat = fs.statSync(projectPath);
    if (stat.isDirectory()) {
      return projectPath;
    } else {
      console.log('%s不存在', projectPath);
      process.exit();
    }
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

}

module.exports = RootPaths;
