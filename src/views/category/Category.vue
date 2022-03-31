<template>
<div id="category">
<NavBar class="category-nav">
  <div slot="center">首页</div>
</NavBar>








<div class="content">
 
<CategorySlideBar :categoryList="categoryList" @clickItem="clickSlideItem" class="category-slidebar"></CategorySlideBar>
<div class="category-main">
<CatetorySubmenu :submenuList="subcategoryList" class="catetory-submenu"></CatetorySubmenu>
<TabControl
ref="tabControl"
  :titles="['综合', '新品', '销量']"
  @tabClick="tabClick"
  class="tabControl"
></TabControl>
<CategoryDetail :categoryDetailList="categoryDetailList" :theType="tabContent[tabIndex]"></CategoryDetail>

</div>
</div>

</div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getCategory,getSubcategory,getCategoryDetail} from "network/category"
import CategorySlideBar from './childComps/CategorySlideBar.vue'
import CatetorySubmenu from './childComps/CategorySubmenu.vue'
import TabControl from 'components/content/TabControl/TabControl'
import CategoryDetail from "./childComps/CategoryDetail.vue"
export default {
  components:{
    CategorySlideBar,
    NavBar,
    CatetorySubmenu,
    TabControl,
    CategoryDetail,
  },
  methods:{
    getCategory(){
  getCategory().then((res)=>{
    this.categoryList=res.data.category.list
    console.log(this.categoryList)

    this.getSubcategory(this.categoryList[0].maitKey)
      
    

  })},
  getSubcategory(maitKey){
    getSubcategory(maitKey).then((res)=>{
      
      this.subcategoryList=res.data.list
      this.getCategoryDetail('pop')
      this.getCategoryDetail('new')
      this.getCategoryDetail('sell')
      console.log(this.subcategoryList)
    })
  },
   getCategoryDetail(type){
   getCategoryDetail(this.categoryList[this.index].miniWallkey,type).then((res)=>{
     console.log(res)
     this.categoryDetailList[type]=res
   })
 },
 clickSlideItem(index){
   
   this.getSubcategory(this.categoryList[index].maitKey)
   this.index=index
   
   
   

 },
 tabClick(tabIndex){
   
   this.tabIndex=tabIndex
   console.log(tabIndex)
 },

  },
  data(){
    return {
      categoryList:[],
      subcategoryList:[],
      categoryDetailList:{"pop":[],"new":[],"sell":[]},
      index:0,
      tabIndex:0,
      tabContent:["pop","new","sell"],
      isFixed:false,

    }
  },
  created(){
    this.getCategory()
    

    

  },
  mounted(){
    

    
  },
  
  
  
  
  
  
  }



</script>

<style  scoped>

#category{
  height: 100vh;
  display: flex;
  flex: 1;
  
}




.category-nav{
  
 background-color: var(--color-tint);
 color: #fff;
 position: fixed;
 left: 0;
 right: 0;
 top: 0;

}
.catetory-submenu{
  
  
  
  
  
}
.category-slidebar{
  overflow: hidden;
}
.tabControl{
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
}
.category-main{
  display: flex;
  flex-direction:column;
  width: 80%;
  overflow: scroll;
  
}
.content{

  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  
  

}

</style>
