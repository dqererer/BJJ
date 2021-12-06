const path = require('path');
const defaultSettings = require('./src/settings')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title;

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? "/HBDC/" : '/',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    devServer: {
        port: 8081,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target:'http://192.168.100.182:9876',// 超越
                // target:'http://114.255.129.72:8088',//线上 外网
                // target:'http://192.168.100.123:8080',  //zhangxiao 
                // target:'http://192.168.100.29:8080',  //xutong
                // target:'http://192.168.100.43:8080',  //wf
                // target:'http://192.168.100.221:8080',
                changeOrigin: true,
                pathRewirte: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
        }, // 设置代理
        disableHostCheck: true
    },

    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
    },
    chainWebpack(config) {
        config.module.rule('svg')
            .exclude.add(resolve('src/assets/icons'))
        config.module.rule('icons')
            .test(/\.(svg)(\?.*)?$/)
            .include.add(resolve('src/assets//icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'icon-[name]' })
            .end()

    },
}
// (\/.(svg)(\?.*)?$\)