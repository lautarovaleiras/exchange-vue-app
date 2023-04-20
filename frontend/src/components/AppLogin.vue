<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <b-form @submit.prevent="login">
              <b-form-group id="username-group" label="Username" label-for="username">
                <b-form-input id="username" v-model="username" type="text" required autofocus></b-form-input>
              </b-form-group>

              <b-form-group id="password-group" label="Password" label-for="password">
                <b-form-input id="password" v-model="password" type="password" required></b-form-input>
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
export default {
  name: 'app-login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // Handle login logic here
      console.log('Logged in:', this.username)
    }
  }
}
</script>
