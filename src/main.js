import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入基本样式
import '@/styles/base.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 字体图标
import '@/assets/iconfont/iconfont.css'
// 引入路由守位
import '@/utils/permission'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
