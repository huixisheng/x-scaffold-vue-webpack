import Vue from 'vue';
import MintUI from 'mint-ui';
import vueTap from 'v-tap';
import 'normalize.css/normalize.css';
import 'mint-ui/lib/style.css';
import Packages from 'components/index';
// import filters from 'x-mbase/filters';

Vue.use(vueTap);
Vue.use(Packages);
Vue.use(MintUI, {
  lazyload: {
    preLoad: 1.3,
    error: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
    loading: '//img0.cosmeapp.com/top/201501/12/10/32/54b3323b470da636.gif',
    attempt: 1,
    filter: {
      webp(listener, options) {
        if (!options.supportWebp) return;
        const isCDN = /[img0|static].cosmeapp.com/;
        if (isCDN.test(listener.src)) {
          listener.src = formatImageToWebp(listener.src);
        }
      },
    },
  },
});
function formatImageToWebp(src) {
  // http://static.cosmeapp.com/activity/201703/28/10/50/58d9cf6d0d6a6679.jpg?imageMogr2/auto-orient/thumbnail/750x%3E  @todo
  // https://static.cosmeapp.com/avatar/021/49/64/48_avatar_big.jpg?_1440750428.jpg&imageView2/1/w/300/h/300
  if (src.indexOf('imageView2') >= 0 || src.indexOf('imageMogr2') >= 0) {
    if (src.indexOf('format/') >= 0) {
      return src.replace(/\/format\/(jpg|jpeg|png)/ig, '/format/webp');
    }
    return src + '/format/webp';
  }
  return src + '?imageView2/2/format/webp';
}


// Vue.config.productionTip = false;
// Vue.config.silent = true;

// register global utility filters.
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key]);
// });

