import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Current from '../views/Current.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Current',
    component: Current
  },
  {
    path: '/forecast',
    name: 'Forecast',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Forecast.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
