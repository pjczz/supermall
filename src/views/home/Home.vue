<template>
  <div id="home" class="wrapper">
    <NavBar class="home-nav">
      <div slot="center">首页</div>
    </NavBar>
    <TabControl
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></TabControl>
    <scroll
      class="content"
      ref="scroll"
      :pullUpLoad="true"
      :probeType="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad">
      </HomeSwiper>
      <HomeRecommmendView :recommends="recommends"></HomeRecommmendView>
      <FeatureView></FeatureView>

      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <GoodsList :goods="showGoods" class="goodsList">
        <GoodsListItem></GoodsListItem>
      </GoodsList>
    </scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop >
    <!-- click.native可以实现组件的原生事件值监听 -->
  </div>
</template>

<script>
import scroll from "components/common/scroll/scroll";

import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata, getHomeGoods } from "network/home";

import TabControl from "components/content/TabControl/TabControl";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommmendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";



import { itemListenerMixin ,backTopMixin} from "common/mixin";
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
    scroll,

  },
  mixins: { itemListenerMixin,backTopMixin },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      
      refresh: 0,
      tabOffsetTop: 0,
isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  mixins: [itemListenerMixin ,backTopMixin] ,
  created() {
    //箭头函数的this是上一层的this 也就是created的this created的this也就是组件本身（）
    //函数调用是压入函数栈（保存函数调用过程中所有变量）
    //函数结束会弹出函数栈 此时函数调用过程中所有变量 临时变量就会释放
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //监听item中图片加载完成
  },
  mounted() {},
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.scroll.refresh();
  },
  methods: {
    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp();
      });
    },
    //事件监听相关
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },



    contentScroll(position) {
      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }

      //把controltabbar 固定
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
/*带了scoped 的style有作用域，只会作用于该文件*/

#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
