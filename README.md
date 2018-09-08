# x-scaffold-vue-webpack

> 根据`vue init webpack`生成的模块修改，支持多页面配置

## 功能 ##
- 支持`x-do`命令生成路由和组件依赖引入
- 项目一键初始化，基本页面骨架基础
- 多页入口支持忽略相关的文件
- api请求包装，一键配置直接调用

## 安装 ##

### 项目初始化 ###

``` bash
$ vue init huixisheng/x-scaffold-vue-webpack my-project
$ cd my-project
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

##  配置

### 多页配置
- 默认使用`public/index.html`页面的入口模板，添加的需要同`*.js`的文件同名
- `/index`会列出多页面的入口和单页面所有页面入口