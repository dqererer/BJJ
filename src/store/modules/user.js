import { userLogin, ueserLogout, } from "@/api/login"
import { inspectUserInfo } from "@/api/national/casemanage"
import { getInfo } from "@/api/styem/user"
import { getToken, setToken, removeToken } from '@/utils/auth'
import { areaTreeNew } from "@/api/styem/dept";
import { getStorageRouters, setRouters } from '../../utils/storage'

const user = {
  state: {
    token: getToken(),
    name: '',
    roles: [],
    permissions: [],
    inspectUserInfo: {},
    userInfo: {},
    areaInfo: {},
    examInfo: {},
    error: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_EXAMINECHANGE: (state, examInfo) => {
      state.examInfo = examInfo
    },
    SET_AREAINFO: (state, areaInfo) => {
      state.areaInfo = areaInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_INSPECTUSERINFO: (state, info) => {
      state.inspectUserInfo = info
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const loginType = userInfo.loginType
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        userLogin({ username, password, code, uuid, loginType }).then(res => {
          if (res.code == 200) {
            setToken(res.msg)
            commit('SET_TOKEN', res.msg)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取用户信息
    GetInfo({ commit, state }) {
      return new Promise(resolve => {
        getInfo().then(async res => {
          const user = res.data;
          const avatar = require("@/assets/images/user-icon.png");
          commit('SET_USERINFO', user)
          localStorage.setItem("userInfo", JSON.stringify(user));
          resolve(res)
        })
      }).catch(error => {
        resolve(error)
      })
    },
    //获取督察组信息
    InspectUserInfo({ commit, state }, info) {
      return new Promise(resolve => {
        inspectUserInfo({ superviseType: info.code }).then(res => {
          if (res.data) {
            const subject = res.data[0];
            const resData = {
              suite: {
                roundName: subject.roundName,
                roundId: subject.roundId,
                batchName: subject.batchName,
                batchId: subject.batchId,
                superviseName: subject.superviseName,
                superviseOne: subject.superviseOne,
                superviseOneName: subject.superviseOneName,
                superviseType: subject.superviseType,
                provinceName: subject.provinceName,
                startDate: subject.startDate,
                endDate: subject.endDate
              },
              groupName: []
            }
            let groupArry = [];
            for (const item in res.data) {
              const subjectb = res.data[item]
              const temp = {
                areaCode: subjectb.areaCode,
                areaName: subjectb.areaName,
                id: subjectb.id,
                name:subjectb.roundName + subjectb.batchName + subjectb.name,
                teamName:subjectb.name
              }
              groupArry.push(temp)
            }
            resData.groupName = groupArry;
            setRouters('inspectInfo', resData);
            commit('SET_INSPECTUSERINFO', resData)
            resolve(resData)
          } else {
            setRouters('inspectInfo', false);
            commit('SET_INSPECTUSERINFO', false)
            resolve()
          }
        })
      }).catch(error => {
        resolve(error)
      })
    },

    GetAreaInfo({ commit, state }) {
      return new Promise(resolve => {
        areaTreeNew({ parentId: state.userInfo.provinceCode }).then(res => {
          localStorage.setItem("areaInfo", JSON.stringify(res.data));
          commit('SET_AREAINFO', res.data)
          resolve(res)
        })
      }).catch(error => {
        resolve(error)
      })
    },
    LogOut({ commit }) {
      return new Promise(resolve => {
        ueserLogout().then(res => {
          commit('SET_TOKEN', '')
          commit('SET_PERMISSIONS', [])
          removeToken()
          localStorage.clear();
          resolve(res)
        }).catch(error => {
          resolve(error)
        })
      })
    }
  }
}
function routersInit() {
  let userInfo = localStorage.getItem("userInfo");
  let areaInfo = localStorage.getItem("areaInfo");
  let inspectInfo = getStorageRouters('inspectInfo');
  if (userInfo) {
    user.state.userInfo = JSON.parse(userInfo)
  }
  if (inspectInfo) {
    user.state.inspectUserInfo = JSON.parse(JSON.stringify(inspectInfo));
  }
  if (areaInfo) {
    user.state.areaInfo = JSON.parse(areaInfo)
  }
}
routersInit();
export default user