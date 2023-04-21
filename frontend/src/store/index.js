import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null
  },
  mutations: {
    setAuthState (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
      state.token = payload.token
    },
    clearAuthState (state) {
      state.isAuthenticated = false
      state.token = null
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
    }
  }
})
