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
    async inLogin (context, data) {
      const { token } = await loginApi(data)
      context.commit('setToken', token)
    },
    async getUserinfo (context) {
      const data = await getUserinfo()
      context.commit('setUserInfo', data.data)
    }
  },
  modules: {},
  getters: {
    token: state => state.token,
    userId: state => state.userInfo.id
  },
  plugins: [createPersistedState({
    key: 'eventToken'
  })]
})
