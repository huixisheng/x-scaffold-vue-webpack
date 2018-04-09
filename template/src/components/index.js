import packages from './packages';

const install = function (Vue) {
  // packages.map(component => {
  //   Vue.component(component.name, component);
  // });
  Object.keys(packages).forEach((key) => {
    Vue.component(packages[key].name, packages[key]);
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