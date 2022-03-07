export default{
  addCart({ state, commit }, payload) {
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
    } else {
      commit('increaseProduct',payload);
    }},
}
