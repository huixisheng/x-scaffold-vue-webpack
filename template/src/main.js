// 国产的安卓设备不支持find, find-index。然而文档显示安卓4.0的chrome是支持，配置env也无效
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
// object-assign 安卓设备不支持
import 'core-js/fn/object/assign';
import Vue from 'vue';
import vueTap from 'v-tap';
import Packages from 'components/index';
import 'normalize.css/normalize.css';
import 'assets/app.css';
import router from './routers';
import App from './App';

Vue.use(vueTap);
Vue.use(Packages);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

router.beforeEach((to, from, next) => {
  next();
});


router.afterEach((route) => {
  document.title = route.meta.title || '前端开发';
});

// 全局注册也可以局部注册
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key]);
// });