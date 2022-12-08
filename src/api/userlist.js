import request from '@/utils/request'

// 数据展示

export function getUserData(data){
  return request({
    url:'users',
    method:'get',
    params:data,
  })
}

// 删除单个用户
export function deleteUser(id){
  return request({
    url:`users/${id}`,
    method:'DELETE',
    
  })
}

// 添加用户
export function addUser(data){
  return request({
    url:'users',
    method:'post',
    data,
    
  })
}

// 编辑用户
export function editUser(data){
  return request({
    url:`users/${data.id}`,
    method:'PUT',
    data,

  })
}
// 分配用户
export function setRoles(id,data){
  return request({
    url:`users/${id}/role`,
    method:'PUT',
    data,

  })
}
// 修改用户状态
export function putUserState(data){
  return request({
    url:`users/${data.id}/state/${data.mg_state}`,
    method:'PUT',
  })
}