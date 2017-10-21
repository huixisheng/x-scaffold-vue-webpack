const path = require('path');
const config = require('../config');


exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.getIp = function () {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let IPv4 = '127.0.0.1';
  // eslint-disable-next-line
  for (const key in interfaces) {
    // const alias = 0;
    // eslint-disable-next-line
    interfaces[key].forEach(function (details) {
      if (details.family === 'IPv4' && key === 'en0') {
        IPv4 = details.address;
      }
    });
  }
  return IPv4;
};
