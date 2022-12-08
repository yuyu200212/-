<template>
  <div class="userslist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑 -->
    <el-card class="cardlist">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input
              placeholder="请输入搜索内容"
              v-model="objPosition.query"
              class="input-with-select"
            >
              <el-button
                @click="getUsersData"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="addFn"
              >添加用户</el-button
            >
          </div>
        </el-col>
      </el-row>
      <!-- 表格 
      data	显示的数据	array
      -->
      <el-table class="cardlist" :data="users" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="{ row, $index }">
            <el-switch
              v-model="row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changState(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              size="mini"
              @click="edit(row)"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteFn(row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-s-tools"
                @click="serRole(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      
      <Page 
      :page.sync="objPosition.pagenum"
      :limit.sync="objPosition.pagesize"
      :total="total"
      @pagination="getUsersData"
      ></Page>
    </el-card>
    <!-- 用户添加弹框 
    visible	是否显示 Dialog，支持 .sync 修饰符	boolean	—	false
    -->
       <EditDialog
         :dialogVisible.sync="addVisible"
         :formRules="addRules"
         :formData="addObj"
         @submitFn="submit"
         >
           <template #formItem="{row}">
              <el-form-item prop="username" label="用户名" label-width="80px">
                <el-input 
                :disabled="Boolean(row.formData.id)"
                v-model="row.formData.username" 
                autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item   v-if="row.isAdd" prop="password" label="密码"  label-width="80px">
                <el-input 
                v-model="row.formData.password" 
                autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱" label-width="80px">
                <el-input v-model="row.formData.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="mobile" label="手机" label-width="80px">
                <el-input v-model="row.formData.mobile" autocomplete="off"></el-input>
              </el-form-item>

           </template>
       </EditDialog>


    <!-- 分配角色 -->
    <el-dialog :visible.sync="rolesVisible" title="分配角色">
      <div class="userinfo">
        <p>当前用户:{{ userinfo.username }}</p>
        <p>当前角色:{{ userinfo.role_name }}</p>
        <p>
          分配新角色:
          <el-select v-model="roleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesVisible = false">取消</el-button>
        <el-button type="primary" @click="setRoles">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserData,
  deleteUser,
  addUser,
  editUser,
  setRoles,
  putUserState,
} from '@/api/userlist'
import { getRole } from '@/api/role'
import { validMobile } from '@/utils/validate'
import EditDialog from './copy/editDialog.vue'
import Page from '@/components/page.vue'
export default {
    data() {
        return {
            userinfo: {},
            roleId: "",
            roleList: [],
            rolesVisible: false,
            // 编辑用户
           
            // 添加
            addVisible: false,
            // 表单域标签的宽度
            formLabelWidth: "120px",
            addObj: {
                username: "",
                password: "",
                email: "",
                mobile: "",
            },
            // 添加表单的验证规则
            addRules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                ],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    {
                        type: "email",
                        message: "输入正确的邮箱格式",
                        trigger: ["blur", "change"],
                    },
                ],
                mobile: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { validator: validMobile, trigger: "blur" },
                ],
            },
            // keyword: '',
            users: [],
            objPosition: {
                query: "",
                pagenum: 1,
                pagesize: 5, //每页的条数
            },
            total: 0, //总数量
        };
    },
    mounted() {
        //  数据请求
        this.getUsersData();
    },
    methods: {
      // 添加编辑用户
     async submit(){
      if(this.addObj.id){
        console.log(123)
        // 编辑用户
        await editUser(this.addObj);
                        this.$message("修改成功");
                       

      }else{
       
             // 发送添加用户的请求   this.addObj
             await addUser(this.addObj);
             //  提示
            this.$message("添加成功");
            // 重新渲染数据
            this.getUsersData();
            // 清空表单内容
            this.addObj = {
              username: "",
              password: "",
              email: "",
              mobile: "",
                        };
 }
        this.addVisible = false;

      },
      addFn(){
        this.addObj  = {}
        this.addVisible = true
       
      },
        // 更新用户的状态
        async changState(row) {
            // row  获取到当前行的数据
            // console.log(row, 'state')
            const res = await putUserState({ id: row.id, mg_state: row.mg_state });
            // 提示更新成功
            this.$message.success("用户状态更新成功");
        },
        // 点击分配角色确定按钮
        async setRoles() {
            //  调用分配角色接口
            let res = await setRoles(this.userinfo.id, { rid: this.roleId });
            // console.log(res)
            // 1提示
            this.$message("分配角色成功");
            // 2重新渲染数据
            this.getUsersData();
            // 3 关闭模态框
            this.rolesVisible = false;
        },
        async getRoleList() {
            let res = await getRole();
            // console.log(res)
            this.roleList = res;
        },
        // 点击分配角色
        serRole(row) {
            // 显示模态框
            this.rolesVisible = true;
            // 回显
            this.userinfo = row;
            // 获取角色列表数据
            this.getRoleList();
        },
      
        // 编辑用户
        edit(row) {
            // 数据回显
            // console.log(row)
            this.addObj = row;
            // 模态框显示
            this.addVisible = true;
        },            
        /*
        删除单个用户
        methods中定义删除的方法
          - confirm询问是否要删除
          - 确定   调用删除的api接口  提示删除成功
          - 取消   提示
        */
        deleteFn(id) {
          
            this.$confirm("确定要永久删除该条数据吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                // 点击确定 请求删除的api接口
                await deleteUser(id);
                // 重新渲染数据
                this.getUsersData();
                // 提示
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
            })
                .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        async getUsersData() {
            let { total, users } = await getUserData(this.objPosition);
            // console.log(total)
            this.users = users;
            this.total = total;
        },
    },
    components: { EditDialog, Page }
}
</script>

<style lang="less" scoped>
.cardlist {
  margin-top: 15px;
}

//
</style>
