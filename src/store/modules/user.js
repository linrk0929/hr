import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 从缓存中读取初始值
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
  }
}
const actions = {
  async login(context, data) {
    // context上下文，传入参数
    console.log(data)
    const token = await login(data)
    // todo:调用登录接口
    context.commit('setToken', token)
  }

}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
