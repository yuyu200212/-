<template>
   <el-menu
      
      collapse-transition 
      :default-active='activePath'
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
      :collapse = 'isCollapse'
      >
      <el-submenu :index="item.id + ''" v-for="item in menus" :key="item.id">
        <template slot="title">
            <i :class="objIcon[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item 
          :index="'/'+item1.path" 
          v-for="item1 in item.children"
          :key="item1.id"
          >
            <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item1.authName}}</span>
        </template>
          </el-menu-item>
          </el-submenu>
          </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSideBar } from '@/api/sidebar';
export default {
    data() {
        return {
          menus:[],
          objIcon: {
        // 属性名是导航的id值，值位icon样式
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
          },
        //   激活菜单的index
         activePath:''
    }
    },
    computed:{
             ...mapGetters(['isCollapse'])  
            },
    watch:{
        // 监听路有对象的变化
    $route:{
        handler(newRoute){
        
          this.activePath =newRoute.fullPath
        },
        deep:true,
        immediate:true,
    }
    
    },
    mounted(){
        this.getMenus()
    },
     methods:{
     async getMenus(){
         let data = await getSideBar()
        //  console.log(data)
         this.menus = data
    },
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo{
  border-right:none;
}
</style>