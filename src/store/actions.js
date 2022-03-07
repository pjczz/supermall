export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      // let p = state.cartList.indexOf(payload);
      // if (index === -1) {
      // oldProduct.count += 1;
      // } else {
      // payload.count = 1;
      // state.cartList.push(payload);
      // }
      let product = state.cartList.find(function (item) {
        return item.iid === payload.iid;
      });
      if (product) {
        commit("addCounter", product);
        resolve("商品添加成功");
      } else {
        commit("increaseProduct", payload);
        resolve("商品添加成功");
      }
    });
  },
};
