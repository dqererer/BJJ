import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import sidebar from './modules/sidebar'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)
const strore = new Vuex.Store({
  modules:{
    user,
    permission,
    sidebar
  },
  getters
})

export default strore