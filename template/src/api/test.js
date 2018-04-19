import service from 'src/utils/http';
import URL from './url';

// 返回相关文档列表
export function apiDocsList(params, method = 'GET') {
  const methodParamsKey = method === 'POST' ? 'data' : 'params';
  const serviceParams = {
    url: URL['docsList'],
    method,
  };
  serviceParams[methodParamsKey] = params;
  return service(serviceParams);
}

// 新增Vue资源
export function apiAddVueSource(params, method = 'POST') {
  const methodParamsKey = method === 'POST' ? 'data' : 'params';
  const serviceParams = {
    url: URL['addVueSource'],
    method,
  };
  serviceParams[methodParamsKey] = params;
  return service(serviceParams);
}