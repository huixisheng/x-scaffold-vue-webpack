import Vue from 'vue';
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
