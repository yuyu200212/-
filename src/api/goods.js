import request from "@/utils/request"
  

export function getShop(data){
    return request({
        url:'goods',
        method:'get',
        params:data,
    })
}
// 添加商品
export function addShops(data){
    return request({
        url:'goods',
        method:'post',
        data,
    })
}
// 商品分类
export function cateShops(data){
    return request({
        url:'categories',
        method:'get',
        params:data,
    })
}
// 添加商品
export function addCates(data){
    return request({
        url:'categories',
        method:'post',
       data,
    })
}
// 获取分类参数列表
export function addList(id,data){
    return request({
        url:`categories/${id}/attributes`,
        method:'get',
        params:data,
    })
}
// 保存参数
export function saveParams(id, data) {
    return request({
      url: `categories/${id}/attributes/${data.attr_id}`,
      method: 'PUT',
      data,
    })
  }
// 删除商品
export function deleteShop(id) {
    return request({
      url: `goods/${id}`,
      method: 'delete',
      
    })
  }
// 编辑提交分类
export function editCates(data,id) {
    return request({
      url: `categories/${id}`,
      method: 'put',
      data,
      
    })
  }
// 删除分类
export function deleteCates(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete',
   
    
  })
}  