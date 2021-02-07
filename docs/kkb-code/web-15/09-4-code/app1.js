const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const koaConnection = require('./middleware/koa-connection')

const app = new Koa()
const router = new KoaRouter()

app.use(koaConnection())

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.post('/login', koaBody(), async ctx=> {
  let { username, password } = JSON.parse(ctx.request.body)
  let [[user]] = await ctx.connection.query(
    'select * from `users` where `username`=? and `password`=?',
    [username, password]
  )
  if(!user) {
    ctx.throw(400)
  } else {
    // ctx.set('Set-Cookie', `uid=${user.id};max-age=1000`)
    // ctx.cookies.set('uid', JSON.stringify({
    //   uid: user.id,
    //   username: ''
    // }), {
    //   maxAge: ''
    // })
    ctx.cookies.set('uid', user.id, {
      maxAge: ''
    })
    ctx.body = {
      code: 200,
      msg: '登录成功'
    }
  }
})

router.post('/register', koaBody(), async ctx=> {
  let { username, password } = JSON.parse(ctx.request.body)
  await ctx.connection.query(
    'insert into `users` (`username`, `password`) values (?, ?)',
    [username, password]
  )
  ctx.body = {
    code: 200,
    msg: '注册成功'
  }
})


router.get('/users', async (ctx) => {
  // let uid = ctx.get('cookie')
  let uid = ctx.cookies.get('uid')
  console.log(uid)
  let [[user]] = await ctx.connection.query(
    'select * from `users` where `id`=?',
    [uid]
  )
  ctx.body = JSON.stringify(user)
})

router.post('/users', koaBody(), async (ctx) => {
  let {name} = ctx.request.body
  if(!name) {
    ctx.throw(400)
  }
  ctx.body = ctx.request.body
})

router.get('/getPhotos', ctx => {

})

app.use(router.routes())
app.listen(9999)