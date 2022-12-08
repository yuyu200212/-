import request from '../utils/request'


// 获取角色列表
export function getRole(){
    return request({
        url:'roles',
        method:'GET',
    })
    
}
// 删除角色指定的权限
export function deleteRole(data){
    return request({
        url:`roles/${data.roleId}/rights/${data.rightId}`,
        method:'DELETE',
        data,
    })
    
}
// 角色授权
export function sRole(type){
    return request({
        url:`rights/${type}`,
        method:'get',
       
    })
    
}
// users/:id/role
export function setRole(roleId,data){
    
    return request({
        url:`roles/${roleId}/rights`,
        method:'post',
        data,
    })
    
}
// 删除角色
export function deleteRoles(data){
    return request({
        url:`roles/${data.id}`,
        method:'delete',
        data,
    })
    
}
// 添加角色
export function addRoless(data){
    return request({
        url:'roles',
        method:'post',
        data,
    })
}
// 编辑角色
export function editRoless(data,id){
    return request({
        url:`roles/${id}`,
        method:'put',
        data,
    })
}