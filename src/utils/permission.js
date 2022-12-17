import router from '@/router'
import store from '@/store' // 引入vuex store实例
const whiteList = ['/login', '/404', '/register'] // 定义白名单  所有不受权限控制的页面
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 有token
  if (store.getters.token) {
    // 跳转的页面是登录页面
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token
    // 是否位白名单
    // 在白名单中
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
