const Koa = require('koa-router')
const Router = require('koa-router')
const http = require('http')

const app = new Koa()
const router = new Router()

http.request()

app.use(async (ctx,next) => {
  if(!ctx.cookies.get('token')) {
    ctx.cookies.set('token', '123456789')
  }
  console.log(7777, ctx.cookies.get('token')
  await next()
})

router.get('/demo', async ctx => {
  ctx.body = ctx.cookies.get('token')
})

app.use(router.routes())
app.listen(6666)