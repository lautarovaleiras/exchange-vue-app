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
    // login ({ commit }, { email }) {
    //   return new Promise((resolve, reject) => {
    //     fetch('http://localhost:3000/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ email })
    //     })
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error('Failed to authenticate')
    //         }
    //         return response.json()
    //       })
    //       .then(data => {
    //       // Set authentication state and save JWT
    //         commit('setAuthState', {
    //           isAuthenticated: true,
    //           token: data.token
    //         })
    //         resolve()
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // },
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
