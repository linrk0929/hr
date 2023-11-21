import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
}) // 创建了一个新的axios实例
// 请求拦截器
// 成功1 失败2
service.interceptors.request.use((config) => {
  // 注入token
  // store.getters.token => 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  //  axios 默认包裹了data
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message.error(message) // 提示消息
    return Promise.reject(new Error(message))
  }
}, (error) => {
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
