'use strict'
//配置指向src 可用@引用
// const path = require('path')
// function resolve(dir) {
//     return path.join(__dirname, dir)
// }

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
                    require('postcss-plugin-px2rem')({
                        rootValue: 48, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
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
