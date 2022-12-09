<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
            <el-button type="primary" @click="addCatFn">添加分类</el-button>
            <el-table :data="cateShop" border row-key="cat_id">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="cat_name" label="分类名称"></el-table-column>
                <el-table-column label="是否有效">
                  <template slot-scope="{ row }">
                    <el-icon v-if="!row.cat_deleted" class="el-icon-success"></el-icon>
                    <el-icon v-else class="el-icon-error"></el-icon>
                 </template>
                </el-table-column>
                <el-table-column label="排序">
                  <template slot-scope="{ row }">
                    <el-tag v-if="row.cat_level === 0">一级</el-tag>
                    <el-tag v-if="row.cat_level === 1" type="success">二级</el-tag>
                    <el-tag v-if="row.cat_level === 2" type="warning">三级</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                  <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="small"
                  @click="edit(row)"
                   >编辑</el-button>
                  <el-button
                  icon="el-icon-delete"
                  type="danger"
                  size="small"
                  @click="deleteFn(row)"
                  >删除</el-button>
                  </template>
            </el-table-column>
            </el-table>
            <!-- 分页 -->
            <Page
            :page.sync="objShop.pagenum"
            :limit.sync="objShop.pagesize"
            :total="total"
            @pagination="getDate"
            ></Page>
        
        </el-card>
           <!-- 添加分类 -->
           <el-dialog  :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="addCateRef">
              <el-form-item label="分类名称" :label-width="formLabelWidth" >
               <el-input v-model="form.cat_name" autocomplete="off"></el-input>
              </el-form-item >
              <el-form-item label="父级名称">
                <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"
                clearable
                :props="cateProps"></el-cascader>
              </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取消</el-button>
               <el-button type="primary" @click="addCate">确定</el-button>
              </div>
            </template>
         </el-dialog>
         <!-- 编辑 -->
         <el-dialog  :visible.sync="editVisible">
            <el-form :model="edits" ref="addCateRef"  >
              <el-form-item label="分类名称" :label-width="formLabelWidth" >
               <el-input v-model="edits.cat_name" autocomplete="off"></el-input>
              </el-form-item >
            </el-form>
            <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="editCate">确定</el-button>
            </div>
           </template>
        </el-dialog>
    </div>
</template>

<script>

import {cateShops,addCates,editCates,deleteCates} from '@/api/goods'
import Page from '@/components/page.vue'
    export default {
    data() {
        return {
            formLabelWidth: "7.5rem",
            cateProps: {
                expandTrigger: "hover",
                checkStrictly: true,
                label: "cat_name",
                value: "cat_id", //选中的值
            },
            value: [],
            options: [],
            form: {
                cat_pid: "",
                cat_name: "",
                cat_leve: "",
               
            },
            edits:{
                cat_pid: "",
                cat_name: "",
                cat_leve: "",
                cat_id: '',
            },
            cateShop: [],
            objShop: {
                pagenum: 1,
                pagesize: 5,
            },
            editVisible:false,
            total: 30,
            dialogFormVisible: false,
         
        };
    },
    mounted() {
        this.getDate();
    },
    methods: {
        addCate() {
            this.$refs.addCateRef.validate(async (isOk) => {
                if (isOk) {
                    await addCates(this.form);
                    this.getDate();
                    this.$message.success("添加成功");
                    this.dialogFormVisible = false;
                }
                else {
                    return false;
                }
            });
        },
        async addCatFn() {
            this.dialogFormVisible = true;
            this.options = await cateShops({ type: 2 });
        },
        handleChange() {
            if (this.value.length === 0) {
                this.form.cat_pid = 0;
                this.form.cat_level = 0;
            }
            else {
                this.form.cat_pid = this.value[this.value.length - 1];
                this.form.cat_level = this.value.length;
            }
        },
        async getDate() {
            let { result, total } = await cateShops(this.objShop);
            this.cateShop = result;
            this.total = total;
          
        },
        edit(row){
            this.editVisible = true
            this.edits = row
            console.log()
        
        },
       async editCate(){
           console.log(this.edits)
           await editCates(this.edits,this.edits.cat_id)
           this.editVisible = false
           this.$message.success("编辑成功");
           this.getDate();
        },
       async deleteFn(row){
        await deleteCates(row.cat_id)
        this.$message.success("删除成功");
        this.getDate();
       }
    },
    components: { Page }
}
</script>

<style lang="less" scoped>
.card{
    margin-top: .9375rem
}
</style>