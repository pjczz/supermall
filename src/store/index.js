import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
Vue.use(Vuex);
const state = {
  cartList: [],
};
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {},
});
