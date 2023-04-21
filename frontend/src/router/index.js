import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLogin from '../components/AppLogin.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Guard for redirect unauthenticated users
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // Redirect to the login page unauthenticated users
    next('/login')
  } else if (store.getters.isAuthenticated && to.path === '/login') {
    // Redirect to home page authenticated users
    next('/')
  } else {
    // Continue to the requested route
    next()
  }
})

export default router
