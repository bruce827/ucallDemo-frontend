import request from 'umi-request';

// 静态数据
// import data from './_data'
import data from './_mock'

export async function queryProjectNotice() {
  // return request('/api/project/notice');

  return data['GET  /api/project/notice']
}
export async function queryActivities() {
  // return request('/api/activities');

  return data['GET  /api/activities']
}
export async function fakeChartData() {
  // return request('/api/fake_chart_data');

  return data['GET  /api/fake_chart_data']
}
export async function queryCurrent() {
  // return request('/api/currentUser');

  return data['GET  /api/currentUser']
}
