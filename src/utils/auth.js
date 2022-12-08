//token 本地缓存

const timeKey = 'admin-timestamp-key'
const TokenKey='admin-token'

export function setToken(token){
    return localStorage.setItem(TokenKey,token)
}

export function getToken(){
    return localStorage.getItem(TokenKey)
}

export function removeToken(){
    return localStorage.removeItem(TokenKey)
}


// 获取时间戳
export function getTime(){
   return localStorage.getItem(timeKey)
}

export function setTime(){
    return localStorage.setItem(timeKey,Date.now())
}
