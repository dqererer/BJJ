import Vue from 'vue'
import Vuex from 'vuex'
import { userLogin, ueserLogout, } from "@/api/login"
import { getInfo } from "@/api/styem/user"
import { getRouters } from "@/api/styem/menu"
import { filterAsyncRouter } from '@/utils/util'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    name: getName(),
    grade: '',
    userName: '',
    byId: '',
    routes: [],
    addRoutes: [],
    composoteItemId: undefined,
    loginName: '',
    permissions: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, usernmae) => {
      state.userName = usernmae
    },
    SET_GRADE: (state, grade) => {
      state.grade = grade
    },
    SET_BYID: (state, id) => {
      state.byId = id
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
    },
    SET_ComposoteItemId: (state, id) => {
      state.composoteItemId = id
    },
    SET_LOGINNAME: (state, name) => {
      state.loginName = name
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  getters: {
    asyncRouterMap: state => {
      return state.addRoutes;
    },
    permissions: state => {
      return state.permissions
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        userLogin(userInfo).then(reponse => {
          if (reponse.code == '200') {
            const token = reponse.msg
            setToken(token)
            setName(userInfo.username)
            commit('SET_TOKEN', token)
            commit('SET_NAME', userInfo.username)
            resolve(reponse)
          } else {
            reject(reponse)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取用户信息
    GetPermissionList({ commit, state }) {
      return new Promise(resolve => {
        getInfo().then(reponse => {
          commit('SET_USERNAME', reponse.data.name)
          commit('SET_BYID', reponse.data.id)
          commit('SET_LOGINNAME', reponse.data.loginName)
          commit('SET_PERMISSIONS', reponse.data.permissions)
          resolve(reponse)
        })
      }).catch(error => {
        resolve(error)
      })
    },
    Logout({ commit }) {
      return new Promise(resolve => {
        ueserLogout().then(reponse => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_GRADE', '')
          commit('SET_USERNAME', '')
          commit('SET_ROUTES', '')
          commit('SET_LOGINNAME', '')
          commit('SET_PERMISSIONS', [])
          removeToken()
          removeName();
          resolve(reponse)
        }).catch(error => {
          resolve(error)
        })
      })
    },

    //获取路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        getRouters().then(reponse => {
          const accessedRoutes = filterAsyncRouter(reponse.data)
          const accessedRoutesOther = JSON.parse(JSON.stringify(accessedRoutes))
          accessedRoutes.push({ path: '*', redirect: '/', hidden: true })
          commit('SET_ROUTES', accessedRoutesOther)
          resolve(accessedRoutes)
        })
      })
    }
  }
})
