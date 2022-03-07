<template>
  <div class="cart">
    <NavBar class="cart-nav-bar"
      ><div slot="center">购物车({{ CartLength }})</div>
    </NavBar>

    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from './childComps/CartBottomBar.vue'

//mapGetters可以自动获取vuex中的getters方法，并在该地方注册成计算属性，声明后可直接调动
export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters({ 这样写也行
    // cartlength: "CartLength",
    // cartlist: "GetCartList",
    // }),

    ...mapGetters(["CartLength", "GetCartList"]),
  },
};
</script>

<style scoped>
.cart {
}
.cart-nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-size: 20px;
  font-weight: 700;
}
</style>
