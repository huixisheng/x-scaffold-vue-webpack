import Vue from 'vue';
import { i18n } from 'theme/index';

import App from './App';
import router from './router';

Vue.config.debug = true;

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App),
  i18n,
});
