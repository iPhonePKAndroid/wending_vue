import '@babel/polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Tabbar, TabbarItem, Field, NavBar, Cell, CellGroup, Button, Image, Checkbox, CheckboxGroup } from 'vant';
Vue.use(Tabbar).use(TabbarItem).use(Field).use(NavBar).use(Cell).use(CellGroup).use(Button).use(Image).use(Checkbox).use(CheckboxGroup);

Vue.config.productionTip = false

Es6Promise.polyfill()

// 使用axios
import axios from './axios'
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
