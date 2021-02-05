const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const KoaRouter = require('koa-router')
const app = new Koa()
const router = new KoaRouter()

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.get('/users', async ctx => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = [
    {id: 1, name: '张三'},
    {id: 2, name: '李四'}
  ]
})

router.post('/users', koaBody(), async ctx => {
  let {name} = JSON.parse(ctx.request.body)
  console.log(123,typeof ctx.request.body,name)
  ctx.body = [
    {id: 1, name: '张三'},
    {id: 2, name: '李四'}
  ]
})

app.use(router.routes())
app.listen(8888)