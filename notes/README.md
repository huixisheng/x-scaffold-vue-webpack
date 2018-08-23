# x-scaffold-vue-webpack


## TODO ##
- eslint-plugin-vue
- webpack4
- vue-cli3

## 相关参考文档 ##
- https://babeljs.io/docs/en/next/babel-preset-env.html
- https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-babel-preset-app/README.md

ERROR in vendor-library-dll-3ccda9.js from UglifyJs
Unexpected token: operator (-) [vendor-library-dll-3ccda9.js:1,10]

vendor-library命名问题

> 相关问题记录

```
/usr/local/lib/node_modules/webpack/bin/webpack.js:348
      throw err;
      ^

TypeError: Cannot read property 'compilation' of undefined
    at OptimizeCssAssetsWebpackPlugin.apply (/Users/huixisheng/x-scaffold/x-scaffold-vue-webpack/template/node_modules/last-call-webpack-plugin/src/index.js:170:20)
    at Compiler.apply (/usr/local/lib/node_modules/webpack/node_modules/tapable/lib/Tapable.js:375:16)
    at webpack (/usr/local/lib/node_modules/webpack/lib/webpack.js:33:19)
    at processOptions (/usr/local/lib/node_modules/webpack/bin/webpack.js:335:15)
    at yargs.parse (/usr/local/lib/node_modules/webpack/bin/webpack.js:397:2)
    at Object.Yargs.self.parse (/usr/local/lib/node_modules/webpack/node_modules/yargs/yargs.js:533:18)
    at Object.<anonymous> (/usr/local/lib/node_modules/webpack/bin/webpack.js:152:7)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:188:16)
    at bootstrap_node.js:609:3
```


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 问题 ##

### css不加浏览器前缀 ###
- https://github.com/zhengweikeng/blog/issues/9
- https://juejin.im/post/5937791ea22b9d00580dc1a7
- https://github.com/vuejs/vue-loader/issues/424

```
warning  File ignored because of a matching ignore pattern. Use "--no-ignore" to override
```
- https://github.com/eslint/eslint/issues/5623

```
search: {
  immediate: true,
  handler(val) {
    console.log('watch search: ', val);
    this.getList();
    this.optCount = val;
   },
   deep: true,
 },
```

```
for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array no-restricted-syntax
```
- https://github.com/airbnb/javascript/issues/851
- https://github.com/airbnb/javascript/issues/1271

## stylelint ##
- https://github.com/JaKXz/stylelint-webpack-plugin#options
- https://lzw.me/a/css-lint-stylelint-stylefmt.html
- http://www.jianshu.com/p/caccf4d2c88d
- https://blog.1stg.me/2016/07/07/start-using-linters-Eslint-and-Stylelint/

sublime 插件
- stylefmt 和 SublimeLinter-contrib-stylelint

## Mock ##
- https://www.npmjs.com/search?q=mock%20server&page=1&ranking=optimal
- https://www.npmjs.com/package/json-server
- https://www.npmjs.com/package/mock-dev-server
- https://devhub.io/search?keyword=mock
- https://github.com/Houfeng/faked?spm=5176.100239.0.0.O5QMy1
- https://juejin.im/entry/5862059f1b69e675fcd44533
- https://www.google.com/search?q=mock+server&ei=U2pSWYuSCcSJ0gLPspmoAw&start=0&sa=N&biw=1280&bih=703
- https://www.zhihu.com/question/35436669

## 参考 ##

- https://github.com/cnu4/Webpack-Vue-MultiplePage
- https://gold.xitu.io/entry/57e68d9aa3413100624768d9
- https://github.com/yaoyao1987/vue-cli-multipage
- https://github.com/bluefox1688/vue-cli-multi-page


# vue-webpack-boilerplate

> A full-featured Webpack setup with hot-reload, lint-on-save, unit testing & css extraction.

> This template is Vue 2.0 compatible. For Vue 1.x use this command: `vue init webpack#1.0 my-project`

## Documentation

- [For this template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
```

If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching, and a production `index.html` is auto-generated with proper URLs to these generated assets.
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run unit`: Unit tests run in PhantomJS with [Karma](http://karma-runner.github.io/0.13/index.html) + [Mocha](http://mochajs.org/) + [karma-webpack](https://github.com/webpack/karma-webpack).
  - Supports ES2015+ in test files.
  - Supports all webpack loaders.
  - Easy mock injection.

- `npm run e2e`: End-to-end tests with [Nightwatch](http://nightwatchjs.org/).
  - Run tests in multiple browsers in parallel.
  - Works with one command out of the box:
    - Selenium and chromedriver dependencies automatically handled.
    - Automatically spawns the Selenium server.

### Fork It And Make Your Own

You can fork this repo to create your own boilerplate, and use it with `vue-cli`:

``` bash
vue init username/repo my-project
```
