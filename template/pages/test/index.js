import Vue from 'vue';
import App from './app';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  template: '<App/>',
  components: { App },
}).$mount('#app');
