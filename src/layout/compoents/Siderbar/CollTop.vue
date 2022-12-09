<template>
    <div>
        <div 
        class="sidebar-coll-container"
       
        @click="unFold"
        >|||</div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
    export default {
        name:'CollTop',
        props:{
           collapse:{
            type:Boolean,
            default:false,
           }

        },
        methods:{
            ...mapMutations(['collapse/setCollapse']),
            unFold(){
                  this['collapse/setCollapse']()
            }
        }
    }
</script>

<style lang="less" scoped>
.sidebar-coll-container {
  height: 2.5rem;
  line-height: 2.5rem;
  color: #fff;
  text-align: center;
  background-color:#4a5064;
}
</style>