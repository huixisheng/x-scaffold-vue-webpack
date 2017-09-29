import Vue from 'vue';
import Router from 'vue-router';
import NavConfig from 'docs/router/nav.config.yml';

Vue.use(Router);

function regeisterRoute() {
  const routes = [];
  const parentRoutes = {};


  Object.keys(NavConfig).forEach((lang) => {
    const pageNavs = NavConfig[lang];

    for (const pageName in pageNavs) { // eslint-disable-line
      pageNavs[pageName].forEach((nav) => {
        const parentName = nav.name;
        parentRoutes[`${parentName}-${lang}`] = parentRoutes[`${parentName}-${lang}`] || addParentRoute(parentName, lang);

        if (nav.groups) {
          nav.groups.forEach((group) => {
            group.items.forEach((item) => {
              addRoute(parentName, item, lang);
            });
          });
        } else if (nav.items) {
          nav.items.forEach((item) => {
            addRoute(parentName, item, lang);
          });
        }
      });
    }
  });

  function addParentRoute(parentName, lang) {
    return {
      path: `/${lang}/${parentName.toLowerCase()}`,
      component: require(`theme/views/${parentName.toLowerCase()}${lang === 'zh' ? '' : `-${lang}`}`).default, // eslint-disable-line
      children: [],
    };
  }

  function addRoute(parentName, item, lang) {
    parentRoutes[`${parentName}-${lang}`].children.push({
      path: `${item.name.toLowerCase()}`,
      name: `${item.name}-${lang}`,
      component: require(`../markdown/${lang}/${item.name.toLowerCase()}.md`).default, // eslint-disable-line
    });
  }

  for (const key in parentRoutes) { // eslint-disable-line
    if (parentRoutes.hasOwnProperty(key)) { // eslint-disable-line
      routes.push(parentRoutes[key]);
    }
  }

  return routes;
}

let routes = regeisterRoute(NavConfig);
console.log(routes);
console.log(NavConfig);
let navigatorLang = window.navigator.language.slice(0, 2);

if (['en', 'zh'].indexOf(navigatorLang) <= -1) {
  navigatorLang = '';
}

const userLang = localStorage.getItem('at-ui-language') || navigatorLang || 'zh';

routes = routes.concat([{
  path: '/zh',
  name: 'Home',
  component: require('theme/views/index').default, // eslint-disable-line
}, {
  path: '/en',
  name: 'Home-en',
  component: require('theme/views/index-en').default, // eslint-disable-line
}, {
  path: '/',
  redirect: { name: userLang === 'zh' ? 'Home' : `Home-${userLang}` },
}, {
  path: '*',
  redirect: { name: 'Home' },
}]);

routes.forEach((page) => {
  // if (page.path === '/zh/guide') {
  //   page.children.push({
  //     path: '',
  //     name: 'Guide',
  //     redirect: { name: page.children[0].name },
  //   });
  // } else if (page.path === '/en/guide') {
  //   page.children.push({
  //     path: '',
  //     name: 'Guide-en',
  //     redirect: { name: page.children[0].name },
  //   });
  // } else
  if (page.path === '/zh/docs') {
    page.children.push({
      path: '',
      name: 'Docs',
      redirect: { name: page.children[0].name },
    });
  } else if (page.path === '/en/docs') {
    page.children.push({
      path: '',
      name: 'Docs-en',
      redirect: { name: page.children[0].name },
    });
  } else if (page.path === '/zh/resource') {
    page.children.push({
      path: '',
      name: 'Resource',
      redirect: { name: page.children[0].name },
    });
  } else if (page.path === '/en/resource') {
    page.children.push({
      path: '',
      name: 'Resource-en',
      redirect: { name: page.children[0].name },
    });
  }
});

// routes.push({
//   path: '*',
//   redirect: { name: 'Home' }
// })

const router = new Router({
  routes,
  // @todo
  // root: process.env.serverConfig.portalPrefix,
  scrollBehavior(to, from) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    console.log(from);

    return { x: 0, y: 0 };
  },
});

export default router;
