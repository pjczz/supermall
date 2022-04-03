<template>
  <div class="home-recommend-view">
    <div class="home-recommend-item" v-for="item in recommends">
      <a href="#">

        <img :src="item.image" alt="" />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: [],
  },
};
</script>

<style>
.home-recommend-view {

  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 30px;
  border-bottom:8px solid #eee ;
}
.home-recommend-item {
  flex: 1;
}
.home-recommend-item img {
  width: 65px;
  height: 65px;
  margin-bottom:10px;
}
</style>
