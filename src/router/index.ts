import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/dashboard/placeholders',
    name: 'Placeholders',
    component: () => import(/* webpackChunkName: "placeholders" */ '../views/Placeholders.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/dashboard')) {
    try {
      const loggedInRes = await (
        await fetch('http://localhost:4567/auth/status', { credentials: 'include' })
      ).json()
      if (loggedInRes.logged_in) next()
      else next('/')
    } catch (e) {
      next('/')
    }
  } else next()
})

export default router
