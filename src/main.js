// import '@babel/polyfill'
// import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
<<<<<<< HEAD
import VueLazyload from 'vue-lazyload'
import Clipboard from 'v-clipboard'
=======

import { Tabbar, TabbarItem, Field, NavBar, Cell, CellGroup, Button, Image, Checkbox, CheckboxGroup, Icon, NoticeBar, Row, Col, List } from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Field).use(NavBar).use(Cell).use(CellGroup).use(Button).use(Image).use(Checkbox).use(CheckboxGroup).use(Icon).use(NoticeBar).use(Row).use(Col).use(List)
>>>>>>> 425629bc78a3a96b74b399d8f1a6a254d956c802

Vue.config.productionTip = false

// Es6Promise.polyfill()

Vue.use(VueLazyload)
Vue.use(Clipboard)

import axios from './axios'
Vue.prototype.$axios = axios

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
