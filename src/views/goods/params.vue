<template>
    <div>
      <el-card>
        <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
        <el-row>
            <el-col>
                选择商品分类:
                 <el-cascader
                 v-model="value"
                 :options="options"
                 :props="cateProps"
                 @change="handleChange"></el-cascader>
            </el-col>
        </el-row>
        <!-- 分类参数 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
         <el-tab-pane label="动态参数" name="only">
            <el-button type="primary" size="small" :disabled="isDisabled">添加参数</el-button>
            <el-table :data="manyData" border row-key="attr_id">
                <el-table-column type="expand">
                    <template slot-scope="{ row }">
                     <el-tag
                     closable 
                     v-for="(item,index) in  row.attr_vals"
                     :key="index"
                     @close="delAttrValue(index, row)"
                    >{{item}}</el-tag>
                     <el-input 
                     v-model="row.inputValue" 
                     v-if="row.inputVisible" 
                     class="tag-input" 
                     ref="inputRef"
                     @keyup.enter="handleInputConfirm(row)"
                     @blur="handleInputConfirm(row)"
                     />
                     <el-button size="small" v-else @click="showInput(row)">+ New Tag</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="{row}">
                        <el-button type="primary" class="el-icon-edit" size="small">编辑</el-button>
                        <el-button type="danger" class="el-icon-delete" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
         </el-tab-pane>
         <!-- 静态参数 -->
         <el-tab-pane label="静态参数" name="many">
            <el-button type="primary" size="small" :disabled="isDisabled">添加属性</el-button>
            <el-table :data="onlyData" border row-key="attr_id">
                <el-table-column type="expand">
                    <template slot-scope="{ row }">
                     <el-tag 
                     closable 
                     v-for="(item,index) in row.attr_vals" 
                     :key="index"
                     @close="delAttrValue(index, row)">{{item}}</el-tag>
                     <el-input
                     v-model="row.inputValue" 
                     v-if="row.inputVisible" 
                     class="tag-input" 
                     ref="inputRef"
                     @keyup.enter="handleInputConfirm(row)"
                     @blur="handleInputConfirm(row)" />
                     <el-button size="small" @click="showInput(row)">+ New Tag</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="{row}">
                        <el-button type="primary" class="el-icon-edit" size="small">编辑</el-button>
                        <el-button type="danger" class="el-icon-delete" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table></el-tab-pane>
        </el-tabs>
       
      </el-card>
    </div>
</template>

<script>
import {cateShops,addList,saveParams} from "@/api/goods"

    export default {
        data() {
            return {
                // isDisabled:false,
                onlyData:[],
                manyData:[],
                activeName:'only',
                value: [],
                options:[],
                cateProps:{
                    expandTrigger: 'hover', //次级菜单的展开方式	string	click / hover	'click'
                    children:'children', 
                    label: 'cat_name', //级联选择器显示的文本
                    value: 'cat_id', //选中的值
                },

            }
        },
        mounted(){
            this.getDate()
        },
        computed:{
            paraId(){
                return this.value[this.value.length-1]
            },
           isDisabled(){
                if(this.value.length!==3){
                    return  true
                }else{
                    return false
                }
            }
           

        },
        methods: {
            delAttrValue(idx, row) {
      //  attr_vals数组中删除元素
      row.attr_vals.splice(idx, 1)
      //  更新数据库
      this.saveVals(row)
    },
            async saveVals(row) {
                const obj = {
                   attr_id: row.attr_id,
                   attr_name: row.attr_name,
                   attr_sel: row.attr_sel,
                   attr_vals: row.attr_vals.join(' '),
                }
                   await saveParams(this.paraId, obj)
                  //  提示
                   this.$message.success('更新参数项成功')
                 // 让输入框进行隐藏
                  row.inputVisible = false
                 // 输入框的值清空
                    row.inputValue = ''
                 },
            showInput(row){
                row.inputVisible = true
                this.$nextTick(() => {
        this.$refs.inputRef.focus()
      })
            },
           async getList(){
             const data = await addList(this.paraId,{sel:this.activeName})
           
             data.forEach(item => {
                item.attr_vals = item.attr_vals.trim() ? item.attr_vals.split(' ') : []
                item.inputVisible = false
                item.inputValue = ''
                
             })
            
             if (this.activeName === 'many') {
                        this.manyData = data
               } else {
                   this.onlyData = data
                      }
            },
           async getDate(){
            this.options = await cateShops()
           },
           handleInputConfirm(row) {
                // 如果我们输入的值不是空字符串就把它添加到attr_vals数组中
                   if (row.inputValue.trim()) {
                   // 输入的值保存到数组中
                    row.attr_vals.push(row.inputValue)

                  // 更新数据库
                    this.saveVals(row)
              }
             },

           handleChange(){
            if(this.value.length!=3){
                this.value = []
                this.manyData=[]
                this.onlyData=[]
                this.$message.warning('只允许为第三集分类添加参数')

            }else{
                this.getList()
            }

           },
           handleClick(tab){
            this.activeName = tab.name
            if (this.value.length === 3) {
        // console.log(tab.name)

        // 重新请求参数列表数据
        this.getList()
      }
           }
        },
    }
</script>

<style lang="less" scoped>
.tag-input{
    height: .9375rem;
    width: 4.375rem;
}
</style>