import packages from './packages';

console.log('packages', packages);

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

// const xx = Object.assign(packages, { install });
// console.log(xx);
// debugger;

export default {
  install,
  ...packages,
};

// export default packages;
// const packages = Object.assign(packages, { install });

// console.log(Object.assign(packages, { install }));

// module.exports = Object.assign(packages, { install });  // eslint-disable-line no-undef
