const portFinderSync = require('portfinder-sync');
const IP = require('ip').address();
const proxyTable = require('./proxy-table');

const PORT = portFinderSync.getPort(8080);

// 配置见 https://webpack.docschina.org/configuration/dev-server/#devserver
const devServer = {
  // contentBase: path.join(__dirname, 'public'),
  watchOptions: {
    poll: true,
  },
  // 一切服务都启用 gzip 压缩
  compress: true,
  progress: true,
  open: true,
  // vue-cli3无效
  openPage: '/index/',
  // TDOO fix socket实时预览的问题 https://github.com/vuejs/vue-cli/pull/2230
  // 见/node_modules/@vue/cli-service/lib/commands/serve.js const sockjsUrl = publicUrl  '0.0.0.0',
  host: IP,
  // bonjour: true,
  stats: 'errors-only',
  port: PORT,
  https: false,
  hotOnly: false,
  overlay: {
    warnings: true,
    errors: true,
  },
  // 用于监听的 Unix socket（而不是 host） vue-cli下无效？
  socket: 'socket',
  // https://webpack.docschina.org/configuration/dev-server/#devserver-uselocalip
  useLocalIp: true,
  historyApiFallback: true,
  noInfo: true,
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  proxy: proxyTable, // string | Object
  before: (app) => {
    // console.log(app.request);
    // console.log(app.response);
  },
};

module.exports = devServer;