<template>
  <div class="cart-list-item">
    <div class="check-button">
      <CheckButton
        :value="product.checked"
        @checkBtnClick="checkCLick"
      ></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="pandc">
        <div class="item-price">{{ product.price }}</div>
        <div class="item-count">X{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckButton,
  },
  methods: {
    checkCLick() {
      this.product.checked=!this.product.checked
      console.log(this.product.checked)
    },
  },
};
</script>

<style scoped>
.cart-list-item {
  display: flex;
  position: relative;

  border-bottom: 1px solid #ccc;
  width: 100%;
}
.check-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
.item-title {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-desc {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
.pandc {
  display: flex;
}
.item-price {
  flex: 50%;
  color: orange;
}
.item-price {
  flex: 50%;
}
</style>
