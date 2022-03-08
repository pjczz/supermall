<template>
  <div class="category-detail">

    <GoodsList :goods=categoryDetailList[theType]></GoodsList>

  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList"
export default {
  props:{
    theType:{
      type:String,
      default:"pop"
    },categoryDetailList:{
      type:Object,
      default:{}

    },

  },
  components:{
    GoodsList,
  }

}
</script>

<style>

</style>