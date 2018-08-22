// 根据路由的name进行相关的扩展配置
const config = {

};

class RouterConfig {
  // constructor() {
  // }

  setRouter(routerList) {
    routerList.forEach((item, index) => {
      if (config[item.name]) {
        config[index] = Object.assign(item, config[item.name]);
      }
    });
    return routerList;
  }
}

const routerConfig = new RouterConfig();

export default routerConfig;