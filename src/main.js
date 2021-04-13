import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
