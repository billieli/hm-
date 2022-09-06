const pxtorem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxtorem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      proplist: ['*']
    })
  ]
}
