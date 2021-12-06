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
    path: '/platform',
    name: 'platform',
    component: (resolve) => require(['@/views/platform'], resolve),
  },
  {
    path: '/task',
    name: 'task',
    component: (resolve) => require(['@/views/implement/dispatch/task'], resolve),
  },
  {
    path: '/people',
    name: 'people',
    component: (resolve) => require(['@/views/support/search/people'], resolve),
  },
  {
    path: '/duchazu',
    name: 'duchazu',
    component: (resolve) => require(['@/views/support/search/duchazu'], resolve),
    children: [{
      path: '/renyuan',
      name: 'renyuan',
      component: (resolve) => require(['@/views/support/search/component/renyuan'], resolve),
    }, {
      path: '/xiansuo',
      name: 'xiansuo',
      component: (resolve) => require(['@/views/support/search/component/xiansuo'], resolve),
    }, {
      path: '/jzqziliao',
      name: 'jzqziliao',
      component: (resolve) => require(['@/views/support/search/component/jzqziliao'], resolve),
    }, {
      path: '/meeting',
      name: 'meeting',
      component: (resolve) => require(['@/views/support/search/component/meeting'], resolve),
    }, {
      path: '/jubao',
      name: 'jubao',
      component: (resolve) => require(['@/views/support/search/component/jubao'], resolve),
    }, {
      path: '/zl',
      name: 'zl',
      component: (resolve) => require(['@/views/support/search/component/zl'], resolve),
    }, {
      path: '/ducha',
      name: 'ducha',
      component: (resolve) => require(['@/views/support/search/component/ducha'], resolve),
    }, {
      path: '/xiachen',
      name: 'xiachen',
      component: (resolve) => require(['@/views/support/search/component/xiachen'], resolve),
    }, {
      path: '/anjuan',
      name: 'anjuan',
      component: (resolve) => require(['@/views/support/search/component/anjuan'], resolve),
    }, {
      path: '/jianbao',
      name: 'jianbao',
      component: (resolve) => require(['@/views/support/search/component/jianbao'], resolve),
    }, {
      path: '/baogao',
      name: 'baogao',
      component: (resolve) => require(['@/views/support/search/component/baogao'], resolve),
    }, {
      path: '/fangan',
      name: 'fangan',
      component: (resolve) => require(['@/views/support/search/component/fangan'], resolve),
    }, {
      path: '/renwu',
      name: 'renwu',
      component: (resolve) => require(['@/views/support/search/component/renwu'], resolve),
    }, {
      path: '/wenti',
      name: 'wenti',
      component: (resolve) => require(['@/views/support/search/component/wenti'], resolve),
    },]
  },
  {
    path: '/xfj',
    name: 'xfj',
    component: (resolve) => require(['@/views/support/search/xfj'], resolve),
  },
  {
    path: '/hy',
    name: 'hy',
    component: (resolve) => require(['@/views/support/search/hy'], resolve),
  },
  {
    path: '/program',
    name: 'program',
    component: (resolve) => require(['@/views/support/search/program'], resolve),
  },
  {
    path: '/ziliao',
    name: 'ziliao',
    component: (resolve) => require(['@/views/support/search/ziliao'], resolve),
  },
  {
    path: '/talk',
    name: 'talk',
    component: (resolve) => require(['@/views/support/search/talk'], resolve),
  },
  {
    path: '/question',
    name: 'question',
    component: (resolve) => require(['@/views/support/search/question'], resolve),
  },
  {
    path: '/clue',
    name: 'clue',
    component: (resolve) => require(['@/views/support/search/clue'], resolve),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
