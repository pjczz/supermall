<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">首页</div>
    </NavBar>
    <HomeSwiper :banners="banners"> </HomeSwiper>
    <HomeRecommmendView :recommends="recommends"></HomeRecommmendView>
    <FeatureView></FeatureView>
    <TabControl
      :titles="['流行', '新款', '精选']"
      class="tab-control"
    ></TabControl>
    <GoodsList :goods="goods['pop'].list">
      <GoodsListItem></GoodsListItem>
    </GoodsList>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata, getHomeGoods } from "network/home";

import TabControl from "components/content/TabControl/TabControl";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommmendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommmendView,
    FeatureView,
    GoodsList,
    GoodsListItem,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  created() {
    //箭头函数的this是上一层的this 也就是created的this created的this也就是组件本身（）
    //函数调用是压入函数栈（保存函数调用过程中所有变量）
    //函数结束会弹出函数栈 此时函数调用过程中所有变量 临时变量就会释放
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}
.tab-control {
  position: sticky;
  top: 44px;
  overflow: hidden;

  z-index: 999;

}
</style>
