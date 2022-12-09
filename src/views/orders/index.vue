<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
          <div>
            <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="order.query" class="input-with-select" width="18.75rem">
            <el-button slot="append" icon="el-icon-search" @click="getOrder"></el-button>
            </el-input>
           </el-col>
          </div>
           <el-table
             :data="tableData"
              border
              class="table"
             style="width: 100%">
           <el-table-column type="index" label="#" ></el-table-column>
           <el-table-column prop="order_number" label="订单编号"></el-table-column>
           <el-table-column prop="order_price" label="订单价格" ></el-table-column>
           <el-table-column  label="是否付款" >
            <template slot-scope="{row,$index}">
                <el-tag type="info" v-if="row.pay_status == 1">已付款</el-tag>
                <el-tag type="danger" v-if="(row.pay_status == 0)">未付款</el-tag>
            </template>
           </el-table-column>
           <el-table-column prop="is_send" label="是否发货">
           </el-table-column>
           <el-table-column  label="下单时间">
            <template slot-scope="{row,$index}">
             <span> {{row.create_time | formatDate}}</span> 
            </template>
           </el-table-column>
           <el-table-column label="操作" >
            <template slot-scope="{row,$index}">
                
                <el-button type="success" icon=" el-icon-location-outline" size="mini"  @click="submit(row)"></el-button>
            </template>
           </el-table-column>
           </el-table>
           <!-- 分页 -->
           <Page
           :page.sync="order.pagenum"
           :limit.sync="order.pagesize"
           @pagination="getOrder"
           :total="total"
           ></Page>
           <!-- 物流信息 -->
           <el-dialog
            title="物流进度"
            :visible.sync="dialogVisible"
           >
           <el-timeline>
               <el-timeline-item
               v-for="(activity, index) in activities"
               :key="index"
               :type="primary"
                color="#0bbd87"
               :size="normal"
               :timestamp="activity.time">
               {{activity.context}}
           </el-timeline-item>
           </el-timeline>
           </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { formatDate } from "@/utils/time"
import { getOrders,getInformation} from "@/api/order"
import Page from "@/components/page.vue"
import cityOptions from '@/utils/city'
    export default {
    data() {
        return {
            tableData: [],
            order: {
                query: "",
                pagenum: 1,
                pagesize: 5, //每页的条数
            },
            total: 0,
            dialogVisible:false,
            activities:[],
            editVisible:false,
            cityOptions: cityOptions,
            editList:{}
        };
    },
    methods: {
        async getOrder() {
            let { total, goods } = await getOrders(this.order);
            this.tableData = goods;
            this.total = total;
           
        },
        submit(row){
            this.dialogVisible = true
          
           this.getInformation(row,row.order_id)
           
        },
        async getInformation(v,id){
         this.activities = await getInformation(v,id)
          
       
        },
       
       

      
       
    },
    mounted() {
        this.getOrder();
      
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        },
    },
    components: { Page }
}  
</script>

<style lang="less" scoped>
.card{
    margin-top:1.25rem;
}
.table{
    margin-top:3.4375rem;
}
</style>