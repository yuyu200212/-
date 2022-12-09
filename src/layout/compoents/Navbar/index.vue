<template>
     <div class="navbar">
    <div class="logo">
      <img src="@/assets/common/logo.png" alt="" />
      <p>后台管理系统</p>
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
        },
        change(){
          console.log(123)
          document.getElementById('app').setAttribute('class', 'theme_red')
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
      width: 3.8125rem;
      height: 3.5rem;
      border-radius: 50%;
    }
    p {
      margin-left: .625rem;
      font-size: 1.25rem;
      color: #fff;
    }
  }
}
</style>