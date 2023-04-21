import Vue from 'vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap'

Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
