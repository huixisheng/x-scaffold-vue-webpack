import Vue from 'vue';
import 'assets/app.css';
import './main-page';
import App from './App';
import router from './routers';

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