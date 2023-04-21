import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jwtInterceptor from './plugins/jwtInterceptor-vue'

Vue.config.productionTip = false

jwtInterceptor(store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
