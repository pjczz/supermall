<template>
  <div>
    <NavBar>
      <div slot="left" @click="itemBack" class="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
      <div slot="right"></div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
  props: {
    currentIndex: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    itemBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  text-align: 13px;

  justify-content: center;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  margin-top: 8px;
}
</style>
