# x-scaffold-vue-webpack

> 根据`vue init webpack`生成的模块修改，支持多页面配置

## 功能 ##
- 引出pack-axios处理重复请求
- 支持x-do命令生成路由和组件依赖引入
- 资源直接构建到七牛
- manifest构建到服务器
- 多页入口

## TODO ##
- eslint-plugin-vue
- webpack4
- vue-cli3

## 安装 ##

### 项目初始化 ###

``` bash
$ vue init huixisheng/x-scaffold-vue-webpack my-project
```

### 安装依赖 ###

``` bash
$ npm install
```

**ps:** 如果出现权限问题，加`sudo`

### 预览 ###

``` bash
$ npm run dev
```

### 项目构建 ###


``` bash
$ npm run build
```

### 项目构建支持生成图表依赖分析 ###

```bash
$ npm run build --report
```

### run unit tests ###

```bash
$ npm run unit
```

### run e2e tests ###

```bash
$ npm run e2e
```

### run all tests
```bash
$ npm test
```