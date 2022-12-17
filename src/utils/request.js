import axios from 'axios'
import router from '@/router'
import store from '@/store/index'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net',
  timer: 5000
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    if (store.state.token) {
      config.headers.Authorization = store.getters.token
    } else {
      router.push('/login')
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // axios默认加了一层data
    const data = response.data
    if (data.code === 0 && response.status === 200) {
      return data
    } else if (response.status === 401) {
      // 身份任证失败
      Message.error(data.message) // 提示错误消息
      store.commit('removeToken') // 清除token
      store.commit('removeUserInfo') // 清除用户信息
      return Promise.reject(new Error(data.message))
    } else {
      Message.error(data.message) // 提示错误消息
      return Promise.reject(new Error(data.message))
    }
  },
  (error) => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  }
)

export default request
