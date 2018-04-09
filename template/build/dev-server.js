require('./check-versions')();

const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');
// const webpackDocsConfig = require('./webpack.docs.conf')
const utils = require('./utils');

// default port where dev server listens for incoming traffic
const PORT = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();

// @todo No 'Access-Control-Allow-Origin' header is present on the requested resource
// php header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST');
// https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// https://stackoverflow.com/questions/37465815/node-js-no-access-control-allow-origin-header-is-present-on-the-requested
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// const compiler = webpack([webpackConfig, webpackDocsConfig]);
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
  },
  quiet: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000,
});

// hrm暂时的解决办法
// @todo  https://github.com/vuejs-templates/webpack/issues/751
// force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);
// compiler.apply(new DashboardPlugin());

// serve pure static assets
// const staticPath = path.posix.join('/', config.dev.assetsSubDirectory);
const staticPath = path.posix.join('/');
app.use(staticPath, express.static('./static'));

let uri = 'http://' + utils.getIp() + ':' + PORT;

let _resolve;
let _reject;
const readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve;
  _reject = reject;
});

let server;
const portfinder = require('portfinder');

portfinder.basePort = PORT;

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err);
    }
    process.env.PORT = port;
    uri = 'http://' + utils.getIp() + ':' + PORT;
    console.log('> Listening at ' + uri + '\n');
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri);
    }
    server = app.listen(port);
    _resolve();
  });
});

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};

// devMiddleware.waitUntilValid(function () {
//   console.log('> Listening at ' + uri + '\n');
// });

// // @todo 报错
// // compiler.run((err, stats) => {
// //     process.stdout.write(stats.toString({
// //       colors: true,
// //       modules: true,
// //       children: true,
// //       chunks: true,
// //       timings: true,
// //       performance: true,
// //       // chunkModules: true,
// //     }) + '\n\n')
// // });

// module.exports = app.listen(port, function (err) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   // when env is testing, don't need open it
//   if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
//     opn(uri);
//   }
// });