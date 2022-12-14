// 所有得postcss得插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
    // 配置要使用的 PostCSS 插件
    plugins: [
        pxToRem({
            // 根节点字体大小
            //如果是vant 37.5 自己的代码75

            rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75), // 所有属性都转为rem

            propList: ['*']
        })
    ]
}
