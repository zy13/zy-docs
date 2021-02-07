const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStatic = require('koa-static-cache')
const koaBody = require('koa-body')
const koaConnection = require('./middlewares/koa-connection')
const koaNunjucks = require('./middlewares/koa-nunjucks')
const app = new Koa()
const router = new KoaRouter()

// 数据库连接
app.use(koaConnection({
  host: 'localhost',
  user: 'root',
  database: 'kkb_15',
  port: 3307
}))
// 静态资源代理
app.use(koaStatic({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))
// 将解析的数据挂载到ctx.body中
app.use(koaBody())
// 模板加载
app.use(koaNunjucks())

router.get('/upload', async (ctx) => {
  ctx.render('upload')
})
// 文件上传接口
router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/avatars',
    keepExtensions: true
  }
}), async (ctx) => {
  let {avatar} = ctx.request.files
  let {name:filename, type, size} = avatar

  // 文件信息保存到数据库
  await ctx.connection.query(
    'insert into `attachments` (`filename`, `type`, `size`) values (?, ?, ?)',
    [filename, type, size]
  )
  // 重定向
  ctx.redirect('/upload')
})
app.use(router.routes())
app.listen(8888)