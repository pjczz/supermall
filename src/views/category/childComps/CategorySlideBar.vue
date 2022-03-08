<template>
  <div class="category-slide-bar">
    <div class="category-slide-bar-item" v-for="(item,index) in categoryList" :class="{active:currentIndex===index}" @click="itemClick(index)">
     {{item.title}}
    </div>


  </div>
</template>

<script>
export default {
  props:{
    categoryList:{
      type:Array,
      default(){
        return []
      },
    }
  },
  data(){
    return {
      currentIndex:0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
     
      this.$emit('clickItem',index)
    },
  }

}
</script>

<style  scoped>
.category-slide-bar{
 
 flex-direction: column;
  width: 20%;
 background-color: #f6f6f6;
 overflow: scroll;

  text-align: center;
  
  
  
 
}
.category-slide-bar-item{
  display: flex;
  
  width: 100%;
  height: 7%;
   align-items: center;
   text-align: center;
   justify-content: center;
   font-size: 14px;
 
}



.active{
  color: #ff8198;
  border-left:2px solid #ff8198 ;
  background-color: #fff;
}
</style>>

