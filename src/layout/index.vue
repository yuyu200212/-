<template>
   <el-container>
  <el-header>
    <Navbar></Navbar>
  </el-header>
  <el-container>
    <el-aside :width="isCollapse==true?'4rem':'12.5rem'">
        <CollTop></CollTop>
        <siderbar class="sidebar-container"></siderbar>
    </el-aside>
   
    <el-main>
      <router-view ></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Navbar from './compoents/Navbar'
import Siderbar from './compoents/Siderbar'
import CollTop  from './compoents/Siderbar/CollTop.vue'
import { mapGetters } from 'vuex'
    export default {
        components:{
            Siderbar,
            CollTop,
            Navbar,
        },
        computed:{
          ...mapGetters(['isCollapse'])
        }
    }
</script>

<style lang="less" scoped>
@import '~@/styles/layout.less';
.sidebar-container {
     
      background: url('~@/assets/common/leftnavBg.png') no-repeat 0 100%;
}
</style>