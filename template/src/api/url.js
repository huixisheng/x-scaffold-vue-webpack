const BASE_PATH = 'https://www.easy-mock.com/mock/5ad8a552f3464d4f566fe012';
const URL = {
  // 返回相关文档列表
  docsList: '/docs-list',
  // 新增Vue资源
  addVueSource: '/add-vue-source',
};

// eslint-disable-next-line
for (const i in URL) {
  URL[i] = BASE_PATH + URL[i];
}

export default URL;