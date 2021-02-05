const Koa = require('koa')
const Router = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const mysql = require('./middleware/koa-connection')
const koaBody = require('koa-body')
const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')

const app = new Koa()
const router = new Router()

// 连接数据库
app.use(mysql())

// 静态资源代理
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// 解析表单数据
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/avatars',
    keepExtensions: true
  }
}))

// 验证 jsonwebtoken
app.use(jwt({secret: 'kkb'}).unless({
  path: [/login/]
}))

router.get('/getPhotos', async ctx => {
  let { id } = ctx.state.user // 获取用户id
  if(!ctx.get('Authorization')){
    throw(401)
  } else {
    let [avatars] = await ctx.connection.query( // 根据用户id查询所有关联的图片数据
      'select path from `attachments` where `uid`=?',
      [id]
    )

    ctx.body = avatars
  }
})

router.post('/login', async ctx => {
  let { username, password} = JSON.parse(ctx.request.body)
  let [[user]] = await ctx.connection.query( // 从表users中获取账号密码
    'select * from `users` where `username`=? and `password`=?',
    [username, password]
  )
  if(user) { // 账号存在，生成token返回给前端
    let token = jsonwebtoken.sign({...user}, 'kkb')
    ctx.body = {
      code: 200,
      token: token,
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '账号或者密码错误！'
    }
  }
})

router.post('/upload', async ctx => {
  let { id } = ctx.state.user
  let { name: filename, size, path,type } = ctx.request.files.attachment

  if(!ctx.get('Authorization')) {
    ctx.throw(401)
  } else {
    let [[avatars]] = await ctx.connection.query(
      'select * from `attachments` where `uid`=?',
      [id]
    )
    await ctx.connection.query(
      'insert into `attachments` (`uid`,`filename`,`size`,`path`, `type`) values (?,?,?,?,?)',
      [id,filename,size,path,type]
    )
    ctx.body = '/' + path
  }
})

app.use(router.routes())
app.listen(8888)