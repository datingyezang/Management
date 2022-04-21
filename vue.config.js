'use strict'
//配置指向src 可用@引用
// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, dir)
// }
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
    remUnit:16
})
module.exports = {
    devServer:{
        port: 8013, // 设置项目端口号
        host: "0.0.0.0", // "0.0.0.0"是允许所有的主机访问当前项目,也可以指定某一天服务器访问
        proxy:{ // 配置代理
            '/api':{ // 正则匹配到以这个开头的时候 就用代理
                target:'http://localhost:8000', //指向的是目标服务器
                changeOrigin: true, // 允许跨域
                pathRewrite:{ // 路径重写  不然接口前面会加上/api/路径，如果接口需要api则无需路径重写
                    '^/api':""
                }
            },
            '/auth': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                pathRewrite: {
                    '^/auth': 'auth'
                }
            }
        }
    },
    lintOnSave: true,
    //配置pxerem自适应
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                  postcss
                ]
            }
        }
    },
    //模块指向
    // chainWebpack: (config) => {
    //     config.resolve.alias
    //         .set("@", resolve("src"))
    //         .set("@", resolve("src/utils"))
    // }

}
