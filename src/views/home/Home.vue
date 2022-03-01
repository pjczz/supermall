<template>
  <div>
    <NavBar class="home-nav">
      <div slot="center">首页</div>
    </NavBar>
    <HomeSwiper :banners=banners>


    </HomeSwiper>
    <HomeRecommmendView :recommends=recommends></HomeRecommmendView>


  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import HomeSwiper from "./childComps/HomeSwiper.vue"
import HomeRecommmendView from "./childComps/HomeRecommendView.vue"

export default {
  name: "home",
  components: { NavBar,HomeSwiper,HomeRecommmendView},
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    //箭头函数的this是上一层的this 也就是created的this created的this也就是组件本身（）
    //函数调用是压入函数栈（保存函数调用过程中所有变量）
    //函数结束会弹出函数栈 此时函数调用过程中所有变量 临时变量就会释放
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;

      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
