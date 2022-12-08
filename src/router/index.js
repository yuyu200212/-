import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/home',
    name:'home',
   redirect:'welcome',
    component:()=>import('../layout'),
    children:[
      {
        path:'/welcome',
        name:'welcome',
      
        component:()=>import('../views/welcome')
      },
      {
        path:'/users',
        name:'users',
      
        component:()=>import('../views/Users')
      },
      {
        path:'/roles',
        name:'roles',
        component:()=>import('../views/Roles')
      }, 
      {
        path:'/rights',
        name:'rights',
        component:()=>import('../views/rights')
      },
      {
        path:'/goods',
        name:'goods',
        component:()=>import('../views/goods')
      }, 
      {
        path:'/params',
        name:'params',
        component:()=>import('../views/goods/params')
      },
      {
        path:'/categories',
        name:'categories',
        component:()=>import('../views/goods/categories')
      },
      {
        path:'/orders',
        name:'orders',
        component:()=>import('../views/orders')
      },
      {
        path:'/reports',
        name:'reports',
        component:()=>import('../views/reports')
      },
    ]
    

  },
  
  {path:'/login',
   name:'login',
   component:()=>import('@/views/login')
   },
   
 
  {
    path:'/404',
    name:'notundefind',
    component:()=>import('../views/NotUndefind')
  },
  {
    path:'*',
    redirect:'/404'
  }
]

const router = new VueRouter({
  routes,
})

const whiteList = ['/login','/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if(store.getters.token){
    if(to.path === '/home'){
      next('/login')
     
    } else {
      next()
    }
  } else {
    if(whiteList.indexOf(to.path) > -1){
      next()
    } else {
       next ('/login')
    }
  }
  nprogress.done()
})

router.afterEach( (to,from) => {
 nprogress.done()
  
})



export default router
