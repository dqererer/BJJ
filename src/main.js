import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import permission from './directive/permission'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/***** 公共样式 ****/
import './assets/styles/index.scss'
import '@/permission.js'
import '@/assets/icons/index'
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import echarts from 'echarts'

import Upload from "@/components/Upload/index"
import Pagination from '@/components/Pagination'
import Treeselect from "@riophae/vue-treeselect";
import FileUpload from "@/components/FileUpload/index"
import Print from '@/utils/print'
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
// 导入supermap
import '@supermap/iclient-classic/libs/SuperMap-8.1.1-17729';
//导入天地图
import Tianditu from '@/utils/Tianditu';

import { resetFieldsTap, handleTree, tabControlHide, tabControlShow, format, hasPermission } from '@/utils/styem'


//全局方法挂载
Vue.prototype.resetFieldsTap = resetFieldsTap
Vue.prototype.handleTree = handleTree
Vue.prototype.tabControlHide = tabControlHide
Vue.prototype.tabControlShow = tabControlShow
Vue.prototype.hasPermission = hasPermission
Vue.prototype.$echarts = echarts
Vue.prototype.format = format
//全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Upload', Upload)
Vue.component('Treeselect', Treeselect)
Vue.component('FileUpload', FileUpload)
Vue.use(Element)
Vue.use(permission)
Vue.use(Print)
Vue.use(Tianditu)

Vue.filter('1000', function (val) {
  if (typeof (val) === 'number') {
    return (val).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
