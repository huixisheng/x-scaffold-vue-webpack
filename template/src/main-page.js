import Vue from 'vue';
import MintUI from 'mint-ui';
// import VueLazyload from 'vue-lazyload';
import vueTap from 'v-tap';
import 'normalize.css/normalize.css';
import 'mint-ui/lib/style.css';
import Components from 'components';
// import filters from 'x-mbase/filters';

if (process.env.NODE_ENV === 'development') {
  require('./mock/index'); // eslint-disable-line
}

Vue.use(vueTap);
Vue.use(Components);
Vue.use(MintUI, {
  lazyload: {
    preLoad: 1.3,
    error: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
    loading: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
    attempt: 1,
  },
});
// console.log(Components);

Vue.config.productionTip = false;
Vue.config.silent = true;

// register global utility filters.
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key]);
// });

