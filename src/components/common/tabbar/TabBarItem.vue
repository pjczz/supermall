<template>
         <div class="tab-bar-item" @click="itemClick">
           <div v-if="!isActive"><slot name="item-icon"></slot></div>
           <div v-else><slot name="item-icon-active"></slot></div>
           <!-- <div :class="{isActive:isActive}"><slot name="item-text"></slot></div> -->
           <div :style="activeStyle"><slot name="item-text"></slot></div>
           
           
 
</div>
</template>

<script>
export default {
name:'TabBarItem',
props:{
  path:String,
  activeColor:{
    type:String,
    default:'red'
  }
},
data() {
  return {
  }
},
computed: {
  isActive() {
    return this.$route.path.indexOf(this.path) !==-1//indexOf相当于字符串判断是否为子串
  },
  activeStyle() {
    console.log('寄')
    return this.isActive ? {color: this.activeColor} : {}
  }
},
methods: {
  itemClick() {
    this.$router.replace(this.path)
  }
},
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top:3px ;
  vertical-align: middle;
}
.isActive{
  color: red;
}
</style>