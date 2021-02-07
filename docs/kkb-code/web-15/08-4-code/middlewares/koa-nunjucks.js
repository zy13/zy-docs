const path = require('path')
const nunjucks = require('nunjucks')

module.exports = () => {
  return async (ctx, next) => {
    const viewUrl = path.resolve(__dirname, '../views')
    ctx.render = (tplName, data) => {
     try {
      ctx.body = nunjucks.configure(viewUrl, {
        autoescape: true,
        watch: true
      }).render(`${tplName}.html`, data)
     } catch(e) {
       console.log(e)
     }
    }
    await next()
  }
}