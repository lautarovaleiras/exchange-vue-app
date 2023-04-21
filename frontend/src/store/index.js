import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null,
    user: null
  },
  mutations: {
    setAuthState (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
      state.token = payload.token
      state.user = payload.user
    },
    clearAuthState (state) {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    }
  },
  actions: {
    logout ({ commit }) {
      // Clear authentication state and JWT
      commit('clearAuthState')
    }
  },
  getters: {

    isAuthenticated (state) {
      return state.isAuthenticated
    },
    getToken (state) {
      return state.token
    },
    getUser (state) {
      return state.user
    }
  }
})
