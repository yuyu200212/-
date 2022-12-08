<template>
    <div>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table
              :data="tableData"
              stripe
              border
             style="width: 100%">
              <el-table-column type="index" label="#" ></el-table-column>
              <el-table-column prop="authName" label="权限名称"></el-table-column>
              <el-table-column prop="path" label="路径" ></el-table-column>
              <el-table-column prop="level" label="等级" >
               
              </el-table-column>
             
    
  </el-table>
 
</el-card>
    </div>
</template>

<script>
import { getRight } from "@/api/right"
    export default {
        data() {
            return {
                tableData: [],
                
            }
        },
        methods: {
           async right() {
             let data =  await getRight()
              console.log(123)
            this.tableData = data
            console.log(this.tableData)
          
            },

        },
        mounted () {
            this.right()
        }
    }
</script>

<style lang="less" scoped>
.box-card{
    margin-top:15px
}
</style>