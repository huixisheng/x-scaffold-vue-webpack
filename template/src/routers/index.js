import Vue from 'vue';
import Router from 'vue-router';
import Layout from 'src/layouts/base/Layout';

import routerConfig from './config';
import childrenDashboard from './children/dashboard';


// 以下子路由自己添加

Vue.use(Router);
// 配置路由前缀。根据后端修改
const BASE_PATH = '/f';

export const routes = [
  {
    path: '/dashboard',
    component: Layout,
    alias: '/',
    redirect: '/dashboard/index',
    hidden: true,
    name: 'dashboard',
    children: routerConfig.setRouter(childrenDashboard),
    meta: {
      title: 'dashboard',
    },
  },
  // {
  //   path: '*',
  //   name: '404',
  //   meta: {
  //     title: '404',
  //   },
  //   component: NotFound,
  // },
];


const router = new Router({
  mode: 'history',
  base: BASE_PATH,
  // TODO base
  routes,
});

export default router;
