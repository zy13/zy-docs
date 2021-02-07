const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static-cache')
const koaBody = require('koa-body')
const koaJwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')

const app = new Koa()
const router = new Router()
let key = 'kkb'

app.use(koaStatic({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

app.use(koaJwt({
  secret: key
}).unless({path: [/^\/login/]}))

app.use(koaBody({
  multipart: true
}))

router.post('/login', async ctx => {
  try {
    let user = {
      id: 1,
      username: 'zy',
      password: '123'
    }
    let token = jsonwebtoken.sign(user, key)
    ctx.set('Authorization', `Bearer ${token}`)
    ctx.body = '登录成功'
  } catch(e) {
    ctx.throw(401)
  }
})

// 获取数据
router.get('/users', async ctx => {
  // let token = ctx.cookies.get('')
  ctx.body =  {
    id: 1,
    username: 'zy'
  }
})

app.use(router.routes())
app.listen(8888)