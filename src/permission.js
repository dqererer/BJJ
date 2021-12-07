import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { objChnage } from '@/utils/util'

const whiteList = ['/login'] //白名单

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        if (to.path == "/login") {
            next({ path: '/index' })
            NProgress.done();
        } else {
            if (store.getters.asyncRouterMap.length === 0) {
                store.dispatch('GetPermissionList').then(() => {
                    store.dispatch('GenerateRoutes').then(accessRoutes => {
                        const accessedChangeRoutes = objChnage(accessRoutes);
                        router.addRoutes(accessedChangeRoutes)
                        next({ ...to, replace: true })
                    })
                }).catch(err => {
                    store.dispatch('Logout').then(() => {
                        Message.error(err)
                        next({ path: '/login' })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.fullPath } })
            NProgress.done();
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})