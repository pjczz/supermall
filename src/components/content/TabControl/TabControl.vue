<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :class="[{ active: index === currentIndex }, 'tab-control-item']"
      @click="itemCLick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: [],
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemCLick(index) {
      this.currentIndex = index;
      this.$emit("tabClick",index)
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
