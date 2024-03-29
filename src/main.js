import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './api/mock'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
