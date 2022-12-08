<template>
    <div class="all">
      
        <dv-border-box-1>
        
            <div class="center"> 
                <dv-decoration-5 style="width:300px;height:40px;" />
            </div>
            <div class="text">
            <span style="color:#B0E0E6;font-size:50px">{{ showText }}</span>
            </div>


        </dv-border-box-1>




    
    </div>
</template>

<script>
    export default {
        data() {
          return {
             timer: null, //settimeout
             showText: "",
         }
    },
    mounted() {
    this.appear(
      "欢迎来到后台管理权限系统!!! 点击右侧即可查看数据"
    );
  },
  methods: {
    appear(content) {
      const _this = this;
 
      this.showText = "";
      clearTimeout(this.timer);
 
      var speed = 50; //设置定时的速度 越来越快
      var count = 1;
 
      function changeContent() {
        _this.showText = content.substring(0, count); //截取字符串
        count++;
 
        if (count != content.length + 1) {
          speed -= 1;
          if (speed < 5) speed = 5;
 
          _this.timer = setTimeout(changeContent, speed);
        }
      }
      changeContent();
    },
  },

}
</script>

<style lang="less" scoped>
.all{
    background: #2b4b6b;
    height:100%
}
.center{
  display: flex;
  justify-content: center
}
.text{
    display: flex;
    justify-content: center;
    margin-top:200px
}
</style>