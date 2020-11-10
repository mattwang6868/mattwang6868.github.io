import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
// jquery
import $ from 'jquery'
// bootstrap
import 'bootstrap'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// loading-overlay
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// vee-validate
import { ValidationObserver, ValidationProvider, configure, localize, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json' // 語系檔案

import currencyFilter from './filter/currency'

import store from './store'
// Bus
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
window.$ = $
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.filter('money', currencyFilter)

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
localize('tw', zhTW)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
