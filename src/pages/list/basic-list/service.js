import request from 'umi-request';

// import data from './_mock'

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
  // return data['GET  /api/fake_list']
}
export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
  // return data['POST  /api/fake_list']
}
export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'post' },
  });

  // return data['POST  /api/fake_list'] 
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: { ...restParams, method: 'update' },
  });
  // return data['POST  /api/fake_list']
}
