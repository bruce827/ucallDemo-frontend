import request from '@/utils/request';


// 静态网页部署
import data from './data/_data.js'


export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
  // return data.currentUser

}
export async function queryNotices() {
  return request('/api/notices');
  // return data.notices

}
