import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['@/views/login'], resolve),
  },
  {
    path: '/index',
    name: 'index',
    component: (resolve) => require(['@/layout/index'], resolve),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
