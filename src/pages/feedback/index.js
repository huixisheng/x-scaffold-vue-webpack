import Vue from 'vue';
import acc from './index.vue';


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  template: '<acc></acc>',
  components: { acc }
}).$mount('#app1');
