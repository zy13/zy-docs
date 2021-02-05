const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const app = new Koa()
const router = new KoaRouter()

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// 跨域解决方案一：设置请求头，设置允许跨域的源
// router.get('/users', async ctx => {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   ctx.body = [
//     {id: 1, name: '张三'},
//     {id: 2, name: '李四'}
//   ]
// })

// 将token挂载到ctx
app.use(async (ctx, next) => {
  let token = ctx.get('Authorization')
  try {
    ctx.state.token = jsonwebtoken.verify(token, 'kkb')
  } catch (e) {
    ctx.throw(401)
  }
  await next()
})

router.get('/users', async ctx => {
  let token = ctx.state.tokenString
  ctx.body = token
})

router.post('/login', async ctx => {
  // 验证用户是否登录成功
  let user = {
    id: 1,
    name: 'zy'
  }
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Inptb3VzZSIsImlhdCI6MTYxMjQyODA0M30.1gTPGAXMqdVWPlv1sAb3jcmHlbNcUFotpjueaz_CgWA
  let tokenString = jsonwebtoken.sign(user, 'kkb')
  ctx.set('Authorization', tokenString)
  ctx.body = tokenString
})

app.use(router.routes())
app.listen(8888)