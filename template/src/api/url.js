const URL = {};

// 开发环境的模拟数据
if (process.env.NODE_ENV === 'development') {
  URL['tag-detail'] = '/tag/detail';
}

export default URL;
