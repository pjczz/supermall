import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()//想要使用$bus 就需要使用vue的原型
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
