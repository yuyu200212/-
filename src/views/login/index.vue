<template>
    <div class="login-wrapper">
    <div class="login-box">
      <!-- logo -->
      <div class="logo-wrapper">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form :model="loginUser" :rules="loginRoles" ref="loginRef">
      <el-form-item prop="username">
      <el-input v-model="loginUser.username" ></el-input>
      </el-form-item>
      <el-form-item prop="password">
      <el-input type="password" v-model="loginUser.password" ></el-input>
      </el-form-item>
      <el-form-item>
        <template>
            <el-button type="primary" @click="loginFn()">登陆</el-button>
            
            <el-button type="info">取消</el-button>
        </template>
      </el-form-item>
      </el-form>    
    </div>
   
    <vue-particles
        color="#87CEEB"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="star"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
  
  </div>
</template>

<script>
import {mapActions} from 'vuex'

    export default {
        data() {
            var checkPass = function (rule,value,callback){
              if(value.charAt(2) ==='3'){
                return callback()
              }
                else{
                  return  callback(new Error('密码第三位必须是9'))
                }
                
            }
            return {
               loginUser:{
                username:'admin',
                password:'123456',
               },
               loginRoles:{
               username:[
                 { required: true, message: '请输入活动名称', trigger: 'blur' },
                 {min:5,max:12,    message:"请输入用户名", trigger: 'blur'}
               ],
               password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { validator: checkPass,message: '请输入密码', trigger: 'blur' },
               ]
               }
            }
        },
        methods:{
          ...mapActions(['user/login']),
          loginFn(){
            this.$refs['loginRef'].validate(async (isOk)=>{
       
              if(isOk){
                try{
                //  调用actions方法
                await this['user/login'](this.loginUser)
               // 跳转到主页
               this.$router.push('/home')
               
                }catch(error){
                  console.log(error)
                }
              } else{
                return  false
              }
            })
          },
        },
       
    }
</script>

<style  lang="less" scoped>
.login-wrapper {
  width: 100%;
  // height: 100%;
  position:fixed;
   background: #2b4b6b;
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26.875rem;
    height: 15.625rem;
    background: #fff;
    border-radius: .1875rem;
    .logo-wrapper {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: .9375rem;
      width: 9.375rem;
      height: 9.375rem;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 .625rem #ddd;
      overflow: hidden;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
    .el-form {
      padding: 0 .9375rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      :deep(.el-form-item) {
        &:last-child {
          .el-form-item__content {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}

</style>