const fs = require('fs');
const path = require('path');
const signale = require('signale');
const configDeploy = require('x-config-deploy');
const pkg = require('../package.json');


function showErrorHint() {
  if (process.env.NODE_ENV === 'development') {
    signale.info('根据需求配置.env。例opsBase=http://ykq.example.net');
  }
}

function getEnvConfig(envKey, defaultEnvValue) {
  let envValue = defaultEnvValue;
  if (fs.existsSync('.env')) {
    const result = require('dotenv').config().parsed;
    if (!result[envKey]) {
      showErrorHint();
    } else {
      envValue = result[envKey];
    }
  } else {
    showErrorHint();
  }
  if (!envValue) {
    signale.error('检查配置是否出错');
  }
  return envValue;
}

const qiniuDomain = configDeploy.get('qiniuDeploy.domain');
const publicPath = qiniuDomain + '/' + pkg.name + '/';

exports.getEnvConfig = getEnvConfig;
exports.pkg = pkg;
exports.publicPath = publicPath;