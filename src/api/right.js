import request from "@/utils/request"
  

export function getRight(data){
    return request({
        url:'rights/list',
        method:'get',
        params:data
    })
}