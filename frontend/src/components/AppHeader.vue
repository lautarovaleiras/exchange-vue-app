<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand><b-icon icon="currency-exchange" font-scale="2"></b-icon> </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="https://github.com/lautarovaleiras/exchange-vue-app">Github source code</b-nav-item>
        <b-nav-item @click="redirectTo('/about')">Doc</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em v-if="!isAuthenticated"><b-icon icon="person-circle" font-scale="2"></b-icon></em>
            <em v-if="isAuthenticated">{{getUser}}</em>
          </template>
          <b-dropdown-item  v-if="!isAuthenticated" @click="redirectTo('/login')">Sign In</b-dropdown-item>
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
    ...mapGetters(['isAuthenticated', 'getToken', 'getUser']),
    ...mapActions(['logout'])
  },
  methods: {
    redirectTo (path) {
      this.$router.push(path)
    },
    singOut () {
      this.$store.dispatch('logout') // Dispatch the logout action
        .then(() => {
          return this.$router.push('/login')
        })
        .catch((error) => {
          console.error('Failed to logout:', error)
        })
    }
  }
}
</script>
