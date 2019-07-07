import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

Vue.config.productionTip = false

// 使用axios
import axios from './axios'
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
