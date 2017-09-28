import Vue from 'vue';
import Router from 'vue-router';

const HomeIndex = () => import('views/home/index');

// 以下子路由自己添加
// import childrenHello from './children/hello';
// import childrenHome from './children/home';

Vue.use(Router);
// 配置路由前缀
const BASE_PARH = '/f';

const routes = [
  {
    path: '/home/index',
    alias: '/',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: HomeIndex,
  },
];


if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/demo',
    name: 'Hello',
    // eslint-disable-next-line
    component: require('views/hello/hello'),
  });
}

export default new Router({
  mode: 'history',
  routes,
  base: BASE_PARH,
  linkActiveClass: 'router-active',
});
