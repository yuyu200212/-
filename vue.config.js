const { defineConfig } = require('@vue/cli-service')
const port = process.env.port || process.env.npm_config_port || 9528
module.exports = defineConfig({
  devServer:{
       port: port,
        //  代理配置 启动vuecli的服务，代理请求
        proxy:{
          '/api':{
            // target: 'http://heima.9yuecloud.com:9988/api/private/v1/', 
            target:'https://www.shiyansong.cn:8888/api/private/v1/',
            changeOrigin:true,
            pathRewrite:{
             '^/api':''
             }
          }
        }
  },
  transpileDependencies: true
})
