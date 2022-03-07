const obj = {};
import Toast from "./Toast";
obj.install = function (Vue) {
  //创建组件构造器
  const toastConstrustor = Vue.extend(Toast);
  //根据组件构造器new出一个组件对象
  const toast = new toastConstrustor();
  //将组件对象手动挂在到一个元素上
  toast.$mount(document.createElement('div'))
//toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //在vue原型中添加该组件toast
  Vue.prototype.$toast=toast
};
export default obj;
