import { loginAPI, getUserInfoAPI } from '@/api'

const state = {
  token: null,
  userId: null,
  tokenTimeStamp: 0
}

const mutations = {
  SET_TOKEN_USERNAME(state, data) {
    state.token = data.token
    state.userId = data.userId
  },
  SET_TOKEN_TIMESTAMP(state, tokenTimeStamp) {
    state.tokenTimeStamp = tokenTimeStamp
  }
}

const actions = {
  // 登录请求
  async login({ commit }, loginForm) {
    const data = await loginAPI(loginForm)
    console.log(data)
    commit('SET_TOKEN_USERNAME', data)
    commit('SET_TOKEN_TIMESTAMP', +new Date())
  },
  // 退出登录：清除token和userName。把退出登录清除token和userName写在vuex里，且路由跳转放外面，因为很有可能其它地方要用到清除token但并不伴随着路由跳转
  logout({ commit }) {
    commit('SET_TOKEN_USERNAME', { token: null, userName: '' })
  },
  // 获取用户信息请求
  async getUserInfo({ commit }, userId) {
    console.log(1)
    const { data } = await getUserInfoAPI(userId)
    console.log(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

