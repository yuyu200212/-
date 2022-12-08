import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import collapse from './modules/collapse'
Vue.use(Vuex)

export default new Vuex.Store({
 
  getters: {
     token:(state)=>state.user.token,
     isCollapse:(state)=>state.collapse.isCollapse,
  },
 
  modules: {
    user,
    collapse,
  }
})
