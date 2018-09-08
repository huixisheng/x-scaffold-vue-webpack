/**
 * ajax请求的url链接配置
 * @author huixisheng
 */
const BASE_PATH = '/v1';

// TODO 用于接口测试，可删除
const testSnippet = {
  // 返回相关文档列表
  docsList: {
    method: 'GET',
    url: '/docs-list',
  },
};

const URL = {
  ...testSnippet,
};

// eslint-disable-next-line
for (const i in URL) {
  // TODO
  URL[i]['url'] = BASE_PATH + URL[i]['url'];
}

export default URL;
