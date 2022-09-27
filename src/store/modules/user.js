import { loginAPI } from '@/api'

const state = {
  token: null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

const actions = {
  async login({ commit }, loginForm) {
    const { token } = await loginAPI(loginForm)
    commit('SET_TOKEN', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

