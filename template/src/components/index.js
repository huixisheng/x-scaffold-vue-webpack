import packages from './packages';

const install = function (Vue) {
  // packages.map(component => {
  //   Vue.component(component.name, component);
  // });
  Object.keys(packages).forEach((key) => {
    const name = packages[key].name;
    if (!name) {
      console.error('undefine component name');
    } else {
      Vue.component(name, packages[key]);
    }
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export default {
  install,
  ...packages,
};