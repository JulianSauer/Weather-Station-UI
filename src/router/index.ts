import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Current from '@/views/Current.vue'

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
    component: () => import('@/views/Forecast.vue')
  },
  {
    path: '/temperature',
    name: 'Temperature',
    component: () => import('@/views/Temperature.vue')
  },
  {
    path: '/humidity',
    name: 'Humidity',
    component: () => import('@/views/Humidity.vue')
  },
  {
    path: '/rain',
    name: 'Rain',
    component: () => import('@/views/Rain.vue')
  },
  {
    path: '/wind-direction',
    name: 'Wind-Direction',
    component: () => import('@/views/WindDirection.vue')
  },
  {
    path: '/wind-speed',
    name: 'Wind-Speed',
    component: () => import('@/views/WindSpeed.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
