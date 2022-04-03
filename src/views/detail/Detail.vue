<template>
  <div id="detail">
    <DetailNavBar
      class="detail-nav"
      @titleClick="titleClick"
      ref="navbar"
      :current-index="currentIndex"
    ></DetailNavBar>
    <Scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <DetailSwiper :topImages="topImages" ref="base"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>

      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="goodsParam" ref="param"></DetailParamInfo>

      <DetailCommentInfo
        :commentInfo="commentInfo"
        ref="comment"
      ></DetailCommentInfo>
      <DetailRecommendInfo
        :recommendList="recomments"
        ref="recommend"
      ></DetailRecommendInfo>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailParamInfo from "./childComponents/DetailParamInfo.vue";
import DetailShopInfo from "./childComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo.vue";
import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue";
import DetailRecommendInfo from "./childComponents/DetailRecommendInfo.vue";
import Scroll from "components/common/scroll/scroll";
import DetailBottomBar from "./childComponents/DetaiBottomBar.vue";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailParamInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsParam: {},
      detailInfo: {},
      commentInfo: {},
      recomments: [],
      ThemeTopYs: [],
      currentIndex: 0,
      message: "",
      isShow: false,
    };
  },
  created() {
    this.iid = this.$route.query.iid;

    this.getDetail();
    this.getRecommend();
  },
  mounted() {
    this.$bus.$on("itemImgLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  updated() {
    // this.ThemeTopYs = []; //因为update在每次更新都会回调，这样写可以保证最后的到的数组是最终值

    
  },
  methods: {
    getDetail() {
      getDetail(this.iid).then((res) => {
        const data = res.result;
        console.log(data);
        this.topImages = res.result.itemInfo.topImages;
        //创建商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //创建店铺信息
        this.shop = new Shop(data.shopInfo);
        this.goodsParam = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        this.detailInfo = data.detailInfo;
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        this.$nextTick(() => {});
      });
    },
    getRecommend() {
      getRecommend(this.iid).then((res) => {
        this.recomments = res.data.list;
        console.log(res.data)
      });
    },
    imageLoad() {
      this.$refs.scroll.scroll.refresh();

      this.ThemeTopYs = [];
      this.ThemeTopYs.push(this.$refs.base.$el.offsetTop);
      this.ThemeTopYs.push(this.$refs.param.$el.offsetTop);
      this.ThemeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.ThemeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.ThemeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.ThemeTopYs[index], 200);
    },
    contentScroll(position) {
      let length = this.ThemeTopYs.length;

      if (position.y < -1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }

      for (let i = 0; i < length; i++) {
        let iPos = this.ThemeTopYs[i];
        /**
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         */
        if (-position.y >= iPos && -position.y < this.ThemeTopYs[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res, 2000);
        console.log(this.$toast)
      });
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
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
