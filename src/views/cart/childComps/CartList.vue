<template>
  <div class="cart-list">
    <CartListItem
      v-for="(item, index) in cartItems"
      :product="item"
      :key="index"
    ></CartListItem>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  computed: {
    ...mapGetters({
      cartItems: "GetCartList",
    }),
  },
  components: {
    CartListItem,
  },
};
</script>

<style></style>
