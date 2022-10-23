import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 数据持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [
    createPersistedState({
      key: 'like-de',
      paths: ['user.token', 'user.tokenTimeStamp', 'user.userId', 'user.userInfo']
      /* reducer(state) {
        return {
          user: state.user.token
        }
      } */
    })
  ]
})

export default store
