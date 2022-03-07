export default{
  addCounter(state, payload) {
    payload.count += 1;
  },
  increaseProduct(state, payload){
    payload.count = 1;
    state.cartList.push(payload)
  }
}
