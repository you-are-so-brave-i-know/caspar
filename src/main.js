import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import '@/icons' // icon
import axios from 'axios'
import waterfall from 'vue-waterfall2'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
Vue.use(waterfall)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')