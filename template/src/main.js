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