<template>

    <Swiper>
      <SwiperItem v-for="item in banners">
        <a href="#">
          <img :src="item.image" alt="" @load="imageLoad" >
        </a>
      </SwiperItem>
    </Swiper>

</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: [],
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
}
</script>

<style></style>
