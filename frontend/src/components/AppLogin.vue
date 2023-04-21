<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <b-form @submit.prevent="signIn">
              <b-form-group id="email-group" label="Email" label-for="email">
                <b-form-input id="email" v-model="email" type="text" required autofocus></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary" block>Login</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'app-login',
  data () {
    return {
      email: '',
      isLoggingIn: false // Add a flag to track login state

    }
  },
  methods: {
    ...mapMutations(['setAuthState']),

    async signIn (e) {
      e.preventDefault()
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email
        })
      })
      const res = await response.json()
      this.setAuthState({ isAuthenticated: true, token: res.token })
      this.$router.push('/')
    }
  }
}
</script>
