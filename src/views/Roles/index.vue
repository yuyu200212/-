<template>
    <div  class="roles">  
      <!-- 面包屑 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>权限管理</el-breadcrumb-item>
     <el-breadcrumb-item>角色列表</el-breadcrumb-item>
     </el-breadcrumb>
     <!-- 白板 -->
     <el-card class="card">
        <el-button type="primary" @click="addRole">添加角色</el-button>
        <!-- 表格 -->
         <el-table :data="roles" :border="true" >
            <el-table-column type="expand">
                <template slot-scope ='{row}'>
                    <div class="user-rights">
                        <el-row :class="['btop', { bbottom: i1 === row.children.length - 1 }]"  
                                v-for="(item1, i1) in row.children"
                                :key="item1.id" >
                             <el-col :span="5">
                             <el-tag closable @close="delRights(row, item1.id)">{{item1.authName}}</el-tag>
                             <i class="el-icon-caret-right"></i>
                             </el-col>
                             <!-- 二级权限 -->
                             <el-col :span="19">
                              <el-row :class="{ btop: i2 !== 0 }"
                                      v-for="(item2, i2) in item1.children"
                                      :key="item2.id">
                                <el-col :span="6">
                                    <el-tag type="success" closable @close="delRights(row, item2.id)">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <!-- 三级权限 -->
                                <el-col :span="18">
                                    <el-tag type="warning"
                                            closable=""
                                            v-for="(item3) in item2.children"
                                            :key="item3.id"
                                            @close="delRights(row, item3.id)">
                                            {{ item3.authName }}
                                    </el-tag>
                                </el-col>
                              </el-row>
                             </el-col>
                        </el-row>
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" >
                <template slot-scope ='{row}'>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFn(row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleRoles(row)" >删除</el-button>
                    <el-button type="warning" icon="el-icon-s-tools" @click="disRight(row)" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
         </el-table>
     </el-card>
     <!-- 添加角色 -->
     <el-dialog :visible.sync="addRoles" title="添加角色">
        <el-form :model="roleList" :rules="addRoleRule" ref="role">
          <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="roleList.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
            <el-input v-model="roleList.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         <el-button @click="addRoles = false">取 消</el-button>
         <el-button type="primary" @click="addRol">确 定</el-button>
        </div>
     </el-dialog>
     <!-- 编辑角色 -->
     <el-dialog :visible.sync="editRoles" title="编辑角色" :rules="editRoleRule">
        <el-form :model="editList" :rules="addRoleRule" ref="editRole">
          <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="editList.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
            <el-input v-model="editList.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         <el-button @click="editRoles = false">取 消</el-button>
         <el-button type="primary" @click="editRol">确 定</el-button>
        </div>
     </el-dialog>
     <!-- 分配权限 -->
     <el-dialog :visible.sync="setRightDialogVisible" title="分配权限">
        <el-tree 
        ref="rightsRef" 
        :data="data" 
        show-checkbox 
        :props="defaultProps"  
        default-expand-all 
        :default-checked-keys="defaultKeys"
        node-key="id">
      
        </el-tree>
        <template #footer>
        <el-button>取消</el-button>
        <el-button type="primary" @click="setRights">确定</el-button>
        </template>

     </el-dialog>
    </div>
</template>

<script>
import {getRole,deleteRole,sRole,setRole,deleteRoles,addRoless,editRoless} from '@/api/role'
import {getKeys} from '@/utils/get'
    export default {
        data() {
            return {
                editRoles:false,
                editList:{
                    roleId: '',
                    roleName: "",
                    roleDesc: ""
                },
                roleList:{
                    roleName:'',
                    roleDesc:'',
                    roleId:''
                },
                editRoleRule:{
                    roleName:[{required:true,message:'请输入角色名',trigger:'blur'}],
                    roleDesc:[{required:true,message:'请输入角色描述',trigger:'blur'}],
                },
                addRoleRule:{
                    roleName:[{required:true,message:'请输入角色名',trigger:'blur'}],
                    roleDesc:[{required:true,message:'请输入角色描述',trigger:'blur'}],
                },
                formLabelWidth:'120px',
               roles:[],
               addRoles:false,
            //    分配权限
               setRightDialogVisible:false,
               data:[],
               defaultProps:{
                label:'authName',
                children:'children'
               },
               defaultKeys:[],
               roleid:''
            }
        },
        mounted () {
                this.getData ()
            },

        methods: {
            // 编辑角色
            editFn(row){
                this.editRoles = true
                this.editList = row
               
            },
            editRol(){
                 this.$refs.editRole.validate(async(isok)=>{
                  if(isok){
                        try{
                           await editRoless(this.editList,this.editList.id)
                           this.$message('编辑成功')
                           this.editRoles = false
                           this.getData()
                           

                        }catch{

                        }
                  }else {
                    return false
                  }
                 })
            },
            // 添加角色
            addRole(){
                 this.addRoles = true

            },
            addRol(){
                 this.$refs.role.validate(async(isok)=>{
                     if(isok){
                        try{
                            await addRoless(this.roleList)
                            this.$message('添加成功')
                            this.addRoles = false
                            this.getData()
                            this.roleList={
                                   roleName:'',
                                   roleDesc:'',
                                   roleId:'',}
                        }catch(error){
                            console.log(error)
                        }

                     }else{
                        return false
                     }
                 })
            },
            // 删除角色
            deleRoles(row){
                this.$confirm('此操作将永久该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                await deleteRoles({id:row.id})
                this.getData()
                this.$message.success('删除成功')
           }).catch(() => {
               this.$message({
               type: 'info',
               message: '已取消删除'
           });          
           });

            },
            // 点击确定按钮 分配权限
           async setRights(){
                // 保存被选中节点的keys
                const keys = [
                    // 保存被选中节点的key和半选中节点的key
                this.$refs.rightsRef.getCheckedKeys(),
                this.$refs.rightsRef.getHalfCheckedKeys(),
                ]
                await setRole(this.roleid,{rids:keys.join(',')})
                this.getData()
                this.setRightDialogVisible = false
                this.$message.success('角色授权成功')
            },
            // 删除角色权限
             async delRights(row,rightId){
             const data = await deleteRole({roleId:row.id,rightId:rightId})
             row.children = data
             this.$message.success('删除角色对应的权限成功')
            },
          
            async getData (){
            this.roles = await getRole()
               
           },
            //    分配权限
            async disRight(row){
            // 保存角色id
            this.roleid = row.id
            // 获取权限列表
            this.data = await sRole('tree')
            // 获取所有三级子节点
            getKeys(row,this.defaultKeys)
            
            // 弹框显示
            this.setRightDialogVisible = true
           

        },
           
            
        },
    }
</script>

<style lang="less" scoped>
.card{
    margin-top: 25px
}
.user-rights {
  padding: 20px 50px;
  box-sizing: border-box;
  .el-row {
    display: flex;
    align-items: center;
    &.btop {
      border-top: 1px solid #eee;
    }
    &.bbottom {
      border-bottom: 1px solid #eee;
    }
    .el-tag {
      margin: 10px;
    }
  }
}
</style>