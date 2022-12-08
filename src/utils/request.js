import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from './auth'
import router from '@/router'

const request = axios.create({
  // baseURL:'http://shiyansong.cn:8888/api/private/v1/',
    // baseURL: process.env.VUE_APP_BASE_API,
    //  baseURL:'http://timemeetyou.com:8889/api/private/v1/',
    // baseURL:'http://192.168.16.149:8888/api/private/v1/',
    baseURL:'http://123.57.143.201:8888/api/private/v1/',
    timeout:3000,
})
// 定义超时的时间
const TimeOut = 3600

function IsCheckTimeOut(){
  var currentTime = Date.now()
  var timeStamp = getTime()
   return (currentTime-timeStamp)/1000>TimeOut
}

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    // config 是请求的配置信息
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 如果token存在 注入token
      // 只有在有token的情况下才有必要检查时间是否超时
      if(IsCheckTimeOut()){
        store.dispatch('user/loginOut')
        router.push('/login')
        return Promise.reject (new Error('token超时了'))
      }
      config.headers['Authorization'] = store.getters.token
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
      const {
       data,
       meta:{msg, status},
      }=response.data
      if(status===200|| status === 201){
       return data
   }else {
       Message.error(msg)
       return Promise.reject(new Error(msg))
   }
   },
   (error)=>{
    // error 信息 里面有response对象
    if(
      error.response&&
      error.response.meta &&
      error.response.status == 10002
    ){
      store.dispatch('user/loginOut')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
      
      return Promise.reject(error)
   }
);
export default request