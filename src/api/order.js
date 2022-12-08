import request from "@/utils/request"
  

export function getOrders(data){
    return request({
        url:'orders',
        method:'get',
        params:data
    })
}
// 物流信息
export function getInformation(data,id){
    return request({
        url:`/kuaidi/${id}`,
        method:'get',
        params:data
    })
}

