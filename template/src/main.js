// 国产的安卓设备不支持find, find-index。然而文档显示安卓4.0的chrome是支持，配置env也无效
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
// object-assign 安卓设备不支持
import 'core-js/fn/object/assign';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import vueTap from 'v-tap';
import Packages from 'src/components/index';
import 'normalize.css/normalize.css';
import 'src/assets/app.css';
import apiInstance from 'src/models/index';
import router from './routers';
import App from './App';

Vue.use(vueTap);
Vue.use(Packages);

Vue.use(VueLazyload, {
  preLoad: 2,
  error: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
  loading: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
  attempt: 2,
  filter: {
    webp(listener, options) {
      if (!options.supportWebp) return;
    },
  },
});

Vue.prototype.$http = apiInstance;
// import * as filters from './filters' // global filters

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
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