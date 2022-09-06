import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入icon样式
import '@/assets/font/iconfont.css'
// 引入vant样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入rem包
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
