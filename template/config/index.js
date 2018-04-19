// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const pkg = require('../package.json');
const xConfig = require('x-config-deploy').getConfig();
const pkgName = pkg.name.replace('@x-scaffold/', '');
// var getIp = require('../build/utils').getIp; // 出现死循环

// https://www.npmjs.com/package/ip
function getIp() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let IPv4 = '127.0.0.1';
  for (const key in interfaces) {
    // const alias = 0;
    interfaces[key].forEach(function (details) {
      if (details.family === 'IPv4' && key === 'en0') {
        IPv4 = details.address;
      }
    });
  }
  return IPv4;
}

const portFinderSync = require('portfinder-sync');
const PORT = portFinderSync.getPort(8080);
const cdnAssestPath = 's/webpack/';
const projectType = 'Api';

const devManifestPath = path.join(`test/${pkgName}.json`);
const buildManifestPath = path.join(`${pkgName}.json`);

module.exports = {
  build: {
    manifestPath: buildManifestPath,
    // 对应后台的模块
    projectModule: 'Api',
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: pkgName,
    cdnAssestSubPath: cdnAssestPath,
    assetsPublicPath: `//p1.cosmeapp.com/`,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    manifestPath: devManifestPath,
    env: require('./dev.env'),
    port: PORT,
    index: path.resolve(__dirname, '../dist/index.html'),
    autoOpenBrowser: true,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: `//${getIp()}:${PORT}/`,
    proxyTable: {
      '/api': {
        target: 'http://proxy.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
        // TODO
        // https://github.com/chimurai/http-proxy-middleware#context-matching
        // https://vuejs-templates.github.io/webpack/proxy.html
        // https://www.jianshu.com/p/95b2caf7e0da
        // filter: function (pathname, req) {
        //   console.log(pathname);
        //   return pathname.match('^/api') && req.method === 'GET'
        // },
        // cookieDomainRewrite: {
        //   '*': getIp(),
        // },
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  // 配置dll
  dll: {
    entry: {
      'vendor': [
        'vue/dist/vue.esm.js',
        'vue-router',
        'v-tap',
        'pack-axios',
        'vue-lazyload',
      ],
    },
  },
};
