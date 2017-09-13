const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');


exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    },
  };

  // https://github.com/vuejs/vue-loader/issues/424
  // @todo https://github.com/vuejs/vue-loader/search?q=autoprefixer+&type=Issues&utf8=%E2%9C%93
  // https://github.com/vuejs/vue-loader/issues/440
  const postcssLoader = {
    loader: 'postcss-loader', // 解决.js文件require/import autoprefixer问题
    options: {
      sourceMap: true, // 消除警告
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      });
    }
    return ['vue-style-loader'].concat(loaders);
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  // eslint-disable-next-line
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
    });
  }
  return output;
};

exports.getEntries = function (globPath) {
  const entries = {};
  let basename;
  let tmp;
  let pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(1, 1) + '/' + basename;
    entries[pathname] = entry;
  });
  return entries;
};

// https://www.npmjs.com/package/ip
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
