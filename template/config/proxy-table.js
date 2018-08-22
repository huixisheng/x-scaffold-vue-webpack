const IP = require('ip').address();
const { getEnvConfig } = require('./utils');

// TODO 可以在.env配置中baseUrl，用于接口的代理
const target = getEnvConfig('baseUrl', 'https://www.easy-mock.com/mock/59ba562fe0dc663341aa54c3');

// 提示 小心只写部分路径会匹配代理到线上。避免踩坑
const proxyTable = {
  '/v1/': {
    xfwd: false,
    target,
    changeOrigin: true,
    secure: true,
    cookieDomainRewrite: {
      '*': IP,
    },
    pathRewrite: {

    },
  },
};

module.exports = proxyTable;