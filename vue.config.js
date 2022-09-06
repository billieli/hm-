const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 7776,
      host: 'localhost'
    }
  }
})
