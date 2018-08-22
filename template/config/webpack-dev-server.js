const portFinderSync = require('portfinder-sync');
// const IP = require('ip').address();
const proxyTable = require('./proxy-table');

const PORT = portFinderSync.getPort(8080);

// 配置见 https://webpack.docschina.org/configuration/dev-server/#devserver
const devServer = {
  // contentBase: path.join(__dirname, 'public'),
  watchOptions: {
    poll: true,
  },
  progress: true,
  open: true,
  openPage: './',
  // TDOO fix socket实时预览的问题 https://github.com/vuejs/vue-cli/pull/2230
  // 见/node_modules/@vue/cli-service/lib/commands/serve.js const sockjsUrl = publicUrl
  // host: IP, | '0.0.0.0',
  // bonjour: true,
  stats: 'errors-only',
  port: PORT,
  https: false,
  hotOnly: false,
  overlay: {
    warnings: true,
    errors: true,
  },
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