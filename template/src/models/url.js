/**
 * ajax请求的url链接配置
 * @author huixisheng
 */
const BASE_PATH = '/v1';

// 后台用户模块
const authUrl = {
  authCaptcha: {
    method: 'GET',
    url: '/auth/captcha',
  },
  authLogin: {
    method: 'POST',
    url: '/auth/login',
  },
  authLogout: {
    method: 'POST',
    url: '/auth/logout',
  },
  /**
    {
      "status": 1,
      "data": {
        "roles": [
          "superadmin"
        ],
        "introduction": "含有所有的操作权限",
        "avatar": "//img0.cosmeapp.com/FhpqzjdxM_FKKyzXxI8QNpprxUsu",
        "name": "超级管理员"
      }
    }
   */
  authUser: {
    method: 'GET',
    url: '/user/info',
  },
};

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
  ...authUrl,
};

// eslint-disable-next-line
for (const i in URL) {
  // TODO
  URL[i]['url'] = BASE_PATH + URL[i]['url'];
}

export default URL;
