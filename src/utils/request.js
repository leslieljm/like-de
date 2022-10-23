import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const TimeOut = 7200000

// 定义检查token是否登录的方法
function checkTokenTimeout() {
  const nowTimeStamp = Date.now()
  const gapTime = nowTimeStamp - store.getters.tokenTimeStamp
  return gapTime > TimeOut // 为true时token超时失效
}

// 通过axios.create()创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // base URL
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 请求相关的所有信息
  // 如果登录(vuex里有token)了，给所有请求注入token
  if (store.getters.token) {
    if (checkTokenTimeout()) { // 除了检查有没有登录(有无token)，还要检查token是否超时失效
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    }
    config.headers.Authorization = store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { data } = response
  if (data.success && data.success === false) { // 接口成功但业务逻辑未成功
    Message.error(data.msg)
    return Promise.reject(new Error(data.msg))
  }
  return data
}, error => { // 接口未成功
  // 如果响应状态码为401，表示token超时失效：同样清除token和userName且跳转到登录页
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('token 超时')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

// 把axios实例默认导出出去
export default service
