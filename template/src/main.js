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
  console.log('afterEach');
  document.title = route.meta.title || '前端开发';
  // if (F.UA.cosmeapp) {
  //   loaerIframe('/favicon.ico');
  // }
  // // @todo 安卓6.5.8无法设置自定义分享内容
  // const user = getStoreUser();
  // const originLocation = location.origin;
  // const mobile = user.mobile;
  // const shareData = {
  //   title: '',
  //   link: ``,
  //   desc: '',
  //   imgUrl: '',
  // };
  // // console.log(shareData);
  // F.emit('share', shareData, function () {});

  // Promise.resolve().then(() => {
  //   if (F.UA.weixin && F.UA.android) {
  //     F.Weixin.loadjweixin();
  //   }
  //   // wx.onMenuShareAppMessage(shareData);
  //   // F.emit('wxShare', shareData);
  //   // wxShare({
  //   //   title: 'xxxx',
  //   //   desc: 'xxxx',
  //   //   link: window.location.href,
  //   //   imgUrl: window.location.origin + '/wash/static/image/logo.png'
  //   // })
  // });
  // // F.Weixin.loadjweixin();
});

// if (F.UA.ios && F.UA.cosmeapp) {
//   // 支持app的push。安卓没问题
//   const routerPush = router.push;
//   router.push = function (...args) {
//     // eslint-disable-next-line
//     const routeInstance = router.match(args[0], this.history.current);
//     if (F.UA.cosmeapp) {
//       console.log(routeInstance.fullPath);
//       F.redirect(routeInstance.fullPath);
//     } else {
//       routerPush.apply(router, args);
//     }
//   };
// }
