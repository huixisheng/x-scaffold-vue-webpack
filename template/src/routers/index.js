import Vue from 'vue';
import Router from 'vue-router';
import Layout from 'src/layouts/base/Layout';

import routerConfig from './config';
import childrenSnippet from './children/snippet';
import childrenDashboard from './children/dashboard';


Vue.use(Router);
// 配置路由前缀。根据后端修改
const BASE_PARH = '/f';

const routes = [
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
  {
    path: '/dev',
    component: Layout,
    alwaysShow: true,
    hidden: false,
    meta: {
      title: 'snippet',
      icon: 'homepage',
      roles: ['editor', 'admin'],
      noCache: true,
    },
    name: 'dev',
    children: routerConfig.setRouter(childrenSnippet),
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
  base: BASE_PARH,
  // TODO base
  routes,
});

export default router;
