import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// 通过axios.create()创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // base URL
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 请求相关的所有信息
  // 如果登录了，给所有请求注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
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
  Message.error(error.message)
  return Promise.reject(error)
})

// 把axios实例默认导出出去
export default service
