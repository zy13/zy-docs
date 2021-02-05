const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const jsonwebtoken = require('jsonwebtoken')
const jwt = require('koa-jwt')
const app = new Koa()
const router = new KoaRouter()

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// 验证 jsonwebtoken
app.use(jwt({secret: 'kkb'}).unless({
  path: [/^login/]
}))

router.get('/users', async ctx => {
  let token = ctx.state.tokenString
  console.log(ctx.state.user)
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