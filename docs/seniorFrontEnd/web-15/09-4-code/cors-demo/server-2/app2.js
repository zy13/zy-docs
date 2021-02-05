const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const proxy = require('koa-server-http-proxy')

const app = new Koa()
const router = new KoaRouter()

// 跨域解决方案三：利用koa-server-http-proxy中间件
// 对当前的代理进行转发
app.use(proxy('/server1', {
  target: 'http://localhost:8888',
  pathRewrite: {'^/server1':''},
  changeOrigin: true // 是否处理cookie跨域问题
}))

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.get('/users', async ctx => {
  ctx.body = [
    {id: 1, name: '张三'},
    {id: 2, name: '李四'}
  ]
})

app.use(router.routes())
app.listen(9999)