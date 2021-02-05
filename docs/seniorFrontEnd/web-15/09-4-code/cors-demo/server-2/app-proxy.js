const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const http = require('http')

const app = new Koa()
const router = new KoaRouter()

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

// 跨域解决方案二：后端代理，原理是node端跨域请求不受浏览器跨域同源安全策略的影响，
// 也就是在node端发送请求不存在跨域问题，跨域请求问题是存在于浏览器端的同源安全策略
router.get('/server1/users', async ctx => {
  let rs = await nodeRequest({
    method: 'get', 
    hostname: 'localhost',
    port: 8888,
    path: '/users'
  })
  console.log(rs)
  ctx.body = rs
})

// 代理 - 转发浏览器的请求：利用http模块实现简单的服务器转发
function nodeRequest(options) {
  return new Promise((resolve,reject) => {
    let req = http.request(options,(res)=>{
      let data = ''
      res.on('data', chunk => {
        data+=chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    })

    req.write('')
    req.end()
  })
}

// 跨域解决方案三：利用koa-server-http-proxy中间件

app.use(router.routes())
app.listen(9999)