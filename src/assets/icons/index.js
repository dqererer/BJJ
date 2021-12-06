// import Vue from 'vue'
// import SvgIcon from '@/components/SvgIcon'

// //自动加载svg目录中的svg文件
// //context()返回函数式指定了上下文路径的require函数
// const req = require.context('./svg', false, /\.svg$/)
// //keys返回文件名数组，map遍历所有文件并使用req加载他们
// req.keys().map(req)

// Vue.component('svg-icon',SvgIcon)


import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

const req = require.context('./svg',false,/\.svg$/)

req.keys().map(req)

Vue.component('svg-icon',SvgIcon)




