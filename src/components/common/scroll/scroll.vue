<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  components: {
    BScroll,
  },
  data() {
    return {
      scroll: null,
    };
  },

  mounted() {
    //如果是用document获取wrapper 很容易出现其他地方的wrapper获取干扰，也就是不知道拿到哪一个
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
    });
    console.log(this.scroll);
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll &&
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);
        });
    }
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style></style>
