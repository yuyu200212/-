import { getToken,removeToken,setToken,setTime } from "@/utils/auth"
import { login } from "@/api/user"

// 初始化的时候从缓存中读取token 并赋值到初始化的状态上面
// 实现了vuex的持久化
const state ={
    token:getToken()
    
}
const mutations = {
    setToken(state,token){
         state.token = token  
        //  设置token 修改state数据 重新缓存
        setToken(token)
    },
    // 删除token 缓存
    removeToken(state){
        state.token=null
        // 删除vuex中的token
        // 还要删除缓存中的 先删除vuex 再删除缓存
        removeToken()
    }

}
const actions = {
    login({commit},data){
        return new Promise (function(resolve,reject){
         login(data)
         .then(result=>{
        //   console.log(result)
          commit('setToken',result.token)
          setTime()
          resolve()
      
           
         })
         .catch(err=>{
              reject(err)
         })
        })
    },
    loginOut(context){
        context.commit('removeToken')
    }
   
    
    
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
}