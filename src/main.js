import '@babel/polyfill'
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import Clipboard from 'v-clipboard'

Vue.config.productionTip = false

Es6Promise.polyfill()

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
