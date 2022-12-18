import Vue from 'vue'
import Vuex from 'vuex'
import { loginApi } from '@/api/login'
import { getUserinfo } from '@/api/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    // token
    setToken (state, token) {
      state.token = token
    },
    // 移除token
    removeToken (state) {
      state.token = null
    },
    // 设置用户信息
    setUserInfo (state, data) {
      state.userInfo = data
    },
    // 删除用户信息
    removeUserInfo (state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录获取token
    async inLogin (context, data) {
      const { token } = await loginApi(data)
      context.commit('setToken', token)
    },
    // 获取用户的基本信息
    async getUserinfo (context) {
      const data = await getUserinfo()
      context.commit('setUserInfo', data.data)
    }
  },
  modules: {},
  getters: {
    token: (state) => state.token, // token
    userId: (state) => state.userInfo.id, // 用户ID
    img: (state) => state.userInfo.user_pic, // 用户图像
    userName: (state) => state.userInfo.nickname || state.userInfo.username // 用户名称
  },
  plugins: [
    // 用vuex-persistedstate插件把数据保存在本地存储
    createPersistedState({
      key: 'eventToken'
    })
  ]
})
