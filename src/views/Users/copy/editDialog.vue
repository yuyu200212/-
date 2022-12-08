<template>
    <div>
    <el-dialog :title="isAdd? '新增' : '编辑'" :visible.sync="boolShow">
        <el-form :model="formData" :rules="formRules" ref="REF" >
            <slot name="formItem" :row="{formData,isAdd}">
            </slot>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="boolShow=false">取 消</el-button>
        <el-button type="primary" @click="formCon">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
    export default {
        props:{
            formData:{
                type:Object,
                default(){
                    return {}
                }
            },
            formRules:{
                type:[],
                default(){
                    return []
                }
            },
            dialogVisible:{
                type:Boolean,
                default:false
            }

        },
        computed:{
            boolShow:{
                set(val){
                    this.$emit('update:dialogVisible',val)
                },
                get(){
                    return this.dialogVisible
                }
            },
            isAdd(){
                return !this.formData.id
            }
        },
        methods: {
            formCon() {
                this.$refs.REF.validate((isOk)=>{
                    if(isOk){
                        this.$emit('submitFn')
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>

</style>