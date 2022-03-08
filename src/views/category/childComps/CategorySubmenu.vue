<template>
  <div class="category-submenu">

    <div class="category-submenu-item" v-for="(item,index) in submenuList">

<a :href="submenuList[index].link">
  <div class="submenu-img"><img :src="submenuList[index].image" alt=""></div>
  
 
  <div class="submenu-content">{{submenuList[index].title}}</div></a>      
    </div>


  </div>
</template>

<script>
export default {
  props:{
    submenuList:{
      type:Array,
      default(){
        return []
      }
    }
  },

}
</script>

<style scoped>
.category-submenu{
  display: flex;
  
  flex-wrap: wrap;
  
}
.submenu-content{
  
  padding-top: 10px;

}
.category-submenu-item{
  width: 28%;
  font-size: 14px;
  text-align: center;
  margin-bottom:10px ;
  margin-left:10px ;

}
.category-submenu-item img{
  width: 100%;
}


</style>