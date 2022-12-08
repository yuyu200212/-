// 引入封装的axios
 import request from '../utils/request'
//  登陆
  export function login(data){
    return request({
        url:'login',
        method:'post',
        data,
    })
 }

