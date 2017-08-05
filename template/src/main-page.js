import Vue from 'vue';
import MintUI from 'mint-ui';
import VueLazyload from 'vue-lazyload';
import vueTap from 'v-tap';
import 'normalize.css/normalize.css';
import 'mint-ui/lib/style.css';
import Components from 'components';
import filters from 'x-mbase/filters';

if (process.env.NODE_ENV === 'development') {
  require('./mock/index'); // eslint-disable-line
}

Vue.use(vueTap);
Vue.use(Components);
Vue.use(MintUI);
Vue.use(VueLazyload, {
  preLoad: 2,
  error: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
  loading: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
  attempt: 2,
});
// console.log(Components);

Vue.config.productionTip = false;

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

