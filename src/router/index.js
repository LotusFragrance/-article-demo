import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/pageIndex'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/homeIndex')
      },
      {
        path: '/art-cate',
        name: 'type',
        component: () => import('@/views/article/typeIndex')
      },
      {
        path: '/art-list',
        name: 'list',
        component: () => import('@/views/article/listIndex')
      },
      {
        path: '/user-info',
        name: 'info',
        component: () => import('@/views/user/baseInfo')
      },
      {
        path: '/user-pwd',
        name: 'resetpsw',
        component: () => import('@/views/user/resetPassword')
      },
      {
        path: '/user-avatar',
        name: 'changeimg',
        component: () => import('@/views/user/changeImg')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/loginIndex')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/registerIndex')
  },
  {
    path: '*',
    name: 'nofound',
    component: () => import('@/views/nofound/noFound.vue')
  }
]

// 解决Vue-Router升级导致的Uncaught (in promise)问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}
const router = new VueRouter({
  routes
})

export default router
