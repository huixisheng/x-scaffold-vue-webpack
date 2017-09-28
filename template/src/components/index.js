import packages from './packages';

const install = function (Vue) {
  Object.keys(packages).forEach((key) => {
    Vue.component(key, packages[key]);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = Object.assign(packages, { install });  // eslint-disable-line no-undef
