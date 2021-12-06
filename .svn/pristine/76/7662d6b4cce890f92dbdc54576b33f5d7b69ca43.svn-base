import hasPermi from './hasPermi'
import select from './select'

const install = function (Vue) {
    Vue.directive('hasPermi', hasPermi)
    Vue.directive('el-select-loadmmore', select)
}
if (window.Vue) {
    window['hasPermi'] = hasPermi
    Vue.use(install); // eslint-disable-line
}
export default install