<template>
    <div>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout='layout'
      :pager-count="pagerCount"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>
    export default {
        props:{
            // 每页条数
            limit:{
                type:Number,
                default:5
            },
            // 当前页数
            page:{
                type:Number,
                default:1
            },
            layout:{
                type:String,
                default:'total, sizes, prev, pager, next, jumper'
            },
            pageSizes:{
                type:Array,
                default(){
                    return [1, 2, 3, 4, 5]
                }
            },
            total:{
                required: true,
                type: Number,
            },
            pagerCount: {
                type: Number,
                default: document.body.clientWidth < 992 ? 5 : 7,
    },
        },
        computed:{
              // 每页显示条数
                pageSize:{
                    get(){
                        return this.limit
                    },
                    set(val){
                        return this.$emit('update:limit',val)
                    }
                },
                // 当前页数
                currentPage:{
                    get(){
                        return this.page
                    },
                    set(val){
                        return this.$emit('update:page',val)
                    }
                },
            },
        methods: {
            handleSizeChange(val) {
                this.$emit('pagination',{page:this.currentPage, limit: val})
            },
            handleCurrentChange(val) {
                this.$emit('pagination',{page:val, limit:this.pageSize})
            }
        },
        }
    
</script>

<style lang="less" scoped>

</style>