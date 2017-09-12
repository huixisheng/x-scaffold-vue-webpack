# x-scaffold-vue-webpack

> 相关问题记录

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
