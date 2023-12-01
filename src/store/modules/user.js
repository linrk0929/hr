import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {}, // 存储用户基本资料状态
  routes: constantRoutes
}
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除Vuex的token
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setRouters(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  async login(context, data) {
    // context上下文，传入参数
    console.log(data)
    const token = await login(data)
    // todo:调用登录接口
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result // 返回数据
  },
  // 退出登录的action
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空对象
    resetRouter()
  }

}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
