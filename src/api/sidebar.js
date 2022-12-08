import request from '../utils/request'

export function getSideBar() {
  return request({
    url: 'menus',
    method: 'get',
  })
}