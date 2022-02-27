import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () =>
      import(/* webpackChunkName: "home" */ "views/home/Home.vue"),
  },
  {
    path: "/cart",
    component: () =>
      import(/* webpackChunkName: "cart" */ "views/cart/Cart.vue"),
  },
  {
    path: "/category",
    component: () =>
      import(/* webpackChunkName: "category" */ "views/category/Category.vue"),
  },
  {
    path: "/profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "views/profile/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
