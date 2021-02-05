const Koa = require('koa')
const Router = require('koa-router')
const koaStaticCache = require('koa-static-cache')

const app = new Koa()
const router = new Router()

// app.use(async (ctx,next) => {
//   if(!ctx.cookies.get('token')) {
//     ctx.cookies.set('token', '123456789')
//   }
//   console.log(7777, ctx.cookies.get('token'))
//   await next()
// })

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.get('/users', async ctx => {
  ctx.body = [
    {id: 1,name:'123'}
  ]
})

app.use(router.routes())
app.listen(8888)