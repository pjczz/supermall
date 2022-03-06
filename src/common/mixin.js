import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  mounted() {
    this.itemImgListener = () => {
      this.refresh += 1;
      if (this.refresh == 30) {
        console.log("刷新率");
        this.$refs.scroll.scroll.refresh();
        this.refresh = 0;
      }
      this.$bus.$on("itemImageLoad", this.itemImgListener);
    };
  },
};
export const backTopMixin = {
  //生命周期可合并 但是methods里面具体的方法不会合并只能添加
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
  },
};
