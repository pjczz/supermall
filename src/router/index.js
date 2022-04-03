import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


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
  {
    path: "/detail",
    component: () =>
      import(/* webpackChunkName: "profile" */ "views/detail/Detail.vue"),
  },
];

const router = new VueRouter({
  //  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
