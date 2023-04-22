<template>
  <div class="wrapper">
    <header class="header">
      <app-header></app-header>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <app-footer></app-footer>
    </footer>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  name: 'app',
  components: { AppHeader, AppFooter }
}

</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #f0f0f0;
}

.main {
  align-items: center;
  align-content: center;
  justify-content: center;
  background-image: url("./assets/background-img.jpg");
  background-size: cover; /* Use 'contain' to fit the image within the element */
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-grow: 1;
  padding: 1rem;
}

.footer {
  background-color: #f0f0f0;
  padding: 1rem;
}
</style>
