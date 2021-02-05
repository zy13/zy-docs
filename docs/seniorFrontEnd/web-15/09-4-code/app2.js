const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const koaConnection = require('./middleware/koa-connection')

const app = new Koa()
const router = new KoaRouter()

// 连接数据库
app.use(koaConnection({
  host: 'localhost',
  user: 'root',
  database: 'kkb_15',
  port: 3307
}))

// 静态资源代理
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// 获取图片接口
router.get('/getPhotos', async ctx => {
  let [attachments] = await ctx.connection.query(
    'select * from `attachments`'
  )
  ctx.body = attachments
})

// 文件上传接口
router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/upload',
    keepExtensions: true
  }
}), async (ctx) => {
  let { name: filename, size, type, path } = ctx.request.files.attachment
  // 将图片存入数据库
  await ctx.connection.query( 
    'insert into `attachments` (`filename`, `size`, `type`, `path`) values (?, ?, ?, ?)',
    [filename, size, type, path]
  )
  // 返回图片路径给前端
  ctx.body = '/' + path
})

app.use(router.routes())
app.listen(9999)