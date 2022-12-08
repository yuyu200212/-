<template>
     <div class="navbar">
    <div class="logo">
      <img src="@/assets/common/logo.png" alt="" />
      <p>电商后台管理系统</p>
    </div>
    <el-button type="info" @click="loginEsc" >退出</el-button>
  </div>

</template>

<script>
import { mapGetters, createNamespacedHelpers  } from 'vuex'
const {mapActions} = createNamespacedHelpers('user')
    export default {
      methods:{
        ...mapActions(['loginOut']),
        loginEsc(){
          this.loginOut()
          this.$router.push('/login')
        }

      }
      
    }
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 61px;
      height: 56px;
      border-radius: 50%;
    }
    p {
      margin-left: 10px;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>