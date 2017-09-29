import Vue from 'vue';
import VueI18n from 'vue-i18n';
import 'at-ui-style/css/at.min.css';

import zhLocale from 'theme/locale/lang/zh-CN';
import enLocale from 'theme/locale/lang/en-US';

import DemoBox from './components/demobox';
import IconList from './components/iconlist';
import VueClipboard from './directives/clipboard';

Vue.use(VueClipboard);
Vue.component('demo-box', DemoBox);
Vue.component('icon-list', IconList);


Vue.use(VueI18n);

const matchArr = window.location.href.match(/#\/(zh|en)/);
const urlLang = matchArr && matchArr[1];
let navigatorLang = window.navigator.language.slice(0, 2);

if (['en', 'zh'].indexOf(navigatorLang) <= -1) {
  navigatorLang = '';
}

const userLang = urlLang || window.localStorage.getItem('at-ui-language') || navigatorLang || 'zh';


export const i18n = new VueI18n({
  locale: userLang,
  messages: {
    en: {
      ...enLocale,
    },
    zh: {
      ...zhLocale,
    },
  },
});

