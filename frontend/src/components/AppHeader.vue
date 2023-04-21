<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Exchange</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Account</em>
          </template>
          <b-dropdown-item  v-if="!isAuthenticated" @click="redirectToLogin">Sign In</b-dropdown-item>
          <b-dropdown-item  v-if="isAuthenticated" @click="singOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app-header',
  computed: {
    ...mapGetters(['isAuthenticated', 'getToken']),
    ...mapActions(['logout'])
  },
  methods: {
    redirectToLogin () {
      this.$router.push('/login')
    },
    singOut () {
      this.logout.then(() => this.redirectToLogin())
    }
  }
}
</script>
