import HttpService from 'pack-axios';

const service = new HttpService({
  timeout: 10000,
  before(config) {
    // 请求前统一处理，比如添加jwt
    return config;
  },
  success(response) {
    return response.data;
  },
  error(error) {
    return Promise.reject(error);
  },
});

export default service;