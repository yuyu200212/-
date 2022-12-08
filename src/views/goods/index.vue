<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card" >
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="objShop.query" >
                    <el-button slot="append" icon="el-icon-search" @click="getDate"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="18">
                    <el-button type="primary" @click="addShop">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="shopDate" border class="table">
            <el-table-column label="#"  type="index"></el-table-column>
            <el-table-column label="商品名称"       prop="goods_name"></el-table-column>
            <el-table-column label="商品价格（元）"  prop="goods_price"></el-table-column>
            <el-table-column label="商品数量"       prop="goods_number"></el-table-column>
            <el-table-column label="商品重量"       prop="goods_weight"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="{row}">
                    <span>{{row.add_time | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="{row,$index}">
                  
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteFn(row.goods_id)"></el-button>
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
        <!-- 添加商品 -->
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
            <el-form :model="addObj" :rules="addRules" ref="addGoodsRef">
                <el-form-item label="商品名称" prop="goods_name" :label-width="formLabelWidth">
                    <el-input v-model="addObj.goods_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price" :label-width="formLabelWidth">
                    <el-input v-model="addObj.goods_price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number" :label-width="formLabelWidth">
                    <el-input v-model="addObj.goods_number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight" :label-width="formLabelWidth">
                    <el-input v-model="addObj.goods_weight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload
                      action="http://shiyansong.cn:8888/api/private/v1/upload"
                      :on-success="handleSuccess"
                      :on-remove="handleRemove"
                      :headers="headersObj"
                      list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addShopFn" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { formatDate } from "@/utils/time"
import { getShop,addShops,deleteShop,editShops } from '@/api/goods'
import Page from '@/components/page.vue'
    export default {
    data() {
        return {
            headersObj: {
                Authorization: getToken(),
            },
            shopDate: [],
            objShop: {
                query: "",
                pagenum: 1,
                pagesize: 5, //每页页数
            },
            total: 0,
            formLabelWidth: "120px",
            dialogFormVisible: false,
            editVisible: false,
            addRules: {
                goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
                goods_price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
                goods_number: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
                goods_weight: [{ required: true, message: "请输入商品重量", trigger: "blur" }],
            }, 
            addObj: {
                goods_name: "",
                goods_price: "",
                goods_number: "",
                goods_weight: "",
                pics: [],
               
            },
            
         
        };
    },
    mounted() {
        this.getDate();
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    methods: {
        // 点击添加商品
        addShopFn() {
            this.$refs.addGoodsRef.validate(async (isOk) => {
                if (isOk) {
                    await addShops(this.addObj);
                    this.dialogFormVisible = false;
                    this.getDate();
                    this.$message.success("商品添加成功");
                }
                else {
                    return false;
                }
            });
        },
        // 图片上传
        handleSuccess(res) {
            let { meta: { status }, data: { tmp_path }, } = res;
            if (status === 200) {
                this.addObj.pics.push({ pics: tmp_path });
            }
        },
        handleRemove(file, fileList) {
            console.log(file);
            // 找到删除图片的临时路径
            const temPath = file.response.data.tmp_path;
            // 根据路径找到要删除图片的下标
            const indexPath = this.addObj.pics.findIndex((item) => item.pic === temPath);
            // 删除
            this.addObj.pics.splice(indexPath, 1);
        },
        // 添加商品
        addShop() {
            this.dialogFormVisible = true;
        },
        async getDate() {
            let { total, goods } = await getShop(this.objShop);
            this.shopDate = goods;
            this.total = total;
        },
        // 删除商品
        deleteFn(id) {
          
            this.$confirm("确定要永久删除该条数据吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                // 点击确定 请求删除的api接口
                await deleteShop(id);
                // 重新渲染数据
                this.getDate();
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
        // 编辑商品
      
       


    },
    components: { Page }
}
</script>

<style lang="less" scoped>
.card{
    margin-top: 15px
}
.table{
    margin-top:15px
}
</style>