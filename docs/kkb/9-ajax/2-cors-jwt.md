github代码：[https://github.com/zy13/koa-demo/tree/5-koa-cors-jwt](https://github.com/zy13/koa-demo/tree/5-koa-cors-jwt)

**目标**
- 能解决跨域问题
- 了解后端代理
- 使用koa-server-http-proxy实现代理
- 了解前后端分离的工作场景

**主要内容**
- 1）CORS解决跨域
- 2）预检请求
- 3）后端代理原理
- 4）利用koa-server-http-proxy中间件实现代理
- 5）前后分离开发

## 1、CORS：跨域资源共享

[CORS(Cross-origin-resource-sharing)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS),跨域资源共享。是一份浏览器技术的规范，用来避开浏览器的同源策略。

- **域**：协议+主机（域名、IP）+端口
- **同域请求**<br>
请求的资源和被请求的资源都在同一个域，否则为跨域请求
- **同源**<br>
`协议+主机（域名、IP）+端口`都相同（注意：只要有一个不同，就是非同源，即为跨域请求）
- **同源策略**<br>
[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)是一个重要的安全策略......其是浏览器制定的安全策略。

## 2、设置CORS：跨域解决方案一

### 2-1、CORS介绍

CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

- **('Access-Control-Allow-Origin', '*')**

`[必须字段]`设置允许访问的域名，"*"表示任意域名都可以访问.默认不能携带cookie。
```js
res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问。
```

- **Access-Control-Allow-Headers**

设置允许Request请求的请求头
```js
res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
```

- **Access-Control-Allow-Methods**

设置允许Request请求的请求方法。预检请求需要设置。
```js
ctx.set('Access-Control-Allow-Methods', 'PUT');
```

- **Access-Control-Expose-Headers**

允许客户端获取的头部key
```js
('Access-Control-Expose-Headers'，'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
```

### 2-2、把跨域请求的场景分为：
- **简单请求**

如果通过则直接返回资源
```bash
`GET、HEAD、POST`
// 或者
`content-type`为：`text/plain、multipart/form-data、application/x-www-form-urlencoded`
```
- **预检请求**
  - 首选有一个预检过程
  - 预检通过，再返回资源
  - **Access-Control-Max-Age**, 用来指定本次预检请求的有效期，单位为秒。在此期间不用发出另一条预检请求

```js
PUT
DELETE
CONNECT
OPTIONS
TRACE
PATCH
```

### 2-3、预检请求

#### 客户端发送请求
- 1、客户端发送跨域的put请求
```js
const xhr = new XMLHttpRequest()
// http://localhost:7777/users => http://localhost:7777/8888
xhr.open('put','http://localhost:8888/users') 
xhr.send()
xhr.onload = function() {
  console.log(xhr.responseText)
}
```
- 2、服务端处理跨域的put请求
```js
// 1、先经过options请求
// 预检请求
router.options('/users', async ctx => {
    console.log('发生了预检请求')
    // 允许所有域名访问    
    ctx.set('Access-Control-Allow-Origin', '*') 
    // 还需要返回一些头信息，告诉他实际请求是否允许通过
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    // 允许客户端put请求，必须要设置，否则无法请求put
    ctx.set('Access-Control-Allow-Methods', 'PUT');
    ctx.body = '允许通过请求'
})

// 2、options请求通过后，再经过put请求
router.put('/users', koaBody({
    multipart: true
}), async ctx => {
    // 先经过预检请求，再发生该请求
    ctx.set('Access-Control-Allow-Origin', '*');
    console.log('reqData', ctx.request.body)
    ctx.body = '添加成功'
})
```

### 原生nodejs的http模块处理跨域

```js
const http = require('http')
const server = http.createServer()
const fs = require('fs')

server.on('request', (req, res) => {
  console.log(2222);
  const tpl = fs.readFileSync('./index.html', 'utf-8')
  // 处理跨域的预检请求
  res.setHeader('Access-Control-Allow-Methods', 'PUT');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.write(tpl)
  res.end()
})

server.listen(7777)
```

## 3、后端代理：跨域解决方案二
### 3-1、 跨域是浏览器规范，通过同服务器(都是nodejs服务器)请求数据，也能解决浏览器限制
- **客户端发送请求**
```js
btn.onclick = function () {
  const xhr = new XMLHttpRequest()
  xhr.open('get','/users') // http://localhost:9999/users => http://localhost:6666/users
  xhr.send()
  xhr.onload = function() {
    console.log(xhr.responseText)
  }
}
```
- **服务端9999转发客户端的请求**

node向服务器发出请求
```js
// node向服务器发送请求
const http = require('http');

(async () => {
  let rs = await httpRequest({
    method: 'get',
    hostname: 'localhost',
    port: '6666',
    path: '/users'
  })
  console.log(rs)
})()

function httpRequest(options) {
  return new Promise((resolve) => {
    let req = http.request(
      options,
      res => {
        let data = ''
        res.on('data', chunk => {
          data+=chunk.toString()
        })
        res.on('end', () =>{
          resolve(data)
        })
      }
    )
    req.write('')
    req.end()
  })
}
```

利用http模块实现简单的服务器转发
```js
// localhost: 9999 => localhost: 6666
// localhost: 9999的请求
router.get('/users', async ctx => {
    let rs = await httpRequest({
        hostname: 'localhost',
        port: 6666,
        path: '/users'
    })
    
    console.log(11, rs)
    ctx.body = rs
})

// - 利用http模块实现简单的服务器转发
function httpRequest(options) {
    return new Promise((resolve, reject) => {
        let req = http.request(options, res => {
            let data = ''
            res.on('data', chunk => {
                data+=chunk.toString() 
            })
            res.on('end', () => {
                resolve(data)
            })
        })
        req.write('')
        req.end()
    })
}
```
- **服务端6666**
```js
const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/users', async ctx => {
  ctx.body = '请求成功'
})

app.use(router.routes());
app.listen(6666);
```

## 4、利用koa-server-http-proxy实现服务器代理
```js
const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const proxy = require('koa-server-http-proxy')

const app = new Koa();
const router = new KoaRouter();

app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

// 利用koa-server-http-proxy中间件实现代理
app.use(proxy('/api', {
  target: 'http://localhost:6666',
  pathRewrite: {'^/api': ''}
}))

app.use(router.routes());
app.listen(9999);
```

## 5、基于jwt鉴权

### 5-1、jwt介绍

- jwt: [https://jwt.io/](https://jwt.io/)

- jwt是**json web token**的缩写，其为了在网络环境间传递声明而执行的一种基于JSON的开放标准

### 5-2、生成token

- [jsonwebtoken模块](https://www.npmjs.com/package/jsonwebtoken)

登录接口，生成tokenString， 服务端响应头设置**Authorization**
```js
const jwt = require('jsonwebtoken')
router.post('/login', async ctx => {
  // 验证用户是否登录成功，成功则返回用户信息
  let loginUser = {
    id: 1,
    name: 'zy'
  }
  // sign()方法：第一个参数为用户信息，第二参数为关键字
  let tokenString = jwt.sign(loginUser, 'kkb')
  ctx.set('Authorization', tokenString)
  ctx.body = '登录成功！'
})
```
- 客户端缓存token

使用**cookie**或者**localStorage**缓存，这里使用localStorage缓存

```js
  // 登录
  btns[0].onclick = function() {
    let xhr = new XMLHttpRequest()
    xhr.open('post', '/login')
    xhr.send()
    xhr.onload = function() {
      // 获取响应头Authorization
      let token = xhr.getResponseHeader('Authorization')
      // 永久缓存token
      localStorage.setItem('token', token)
      console.log(token)
    }
  }
```

### 5-3、token的组成

- 头部的基本信息
```js
{
  "typ": "JWT",
  "alg": "HS256"
}
```

- payload :存放自定义信息 ； 预定义信息有如下几个
```js
iss: 该JWT的签发者
sub: 该JWT所面向的用户
aud: 接收该JWT的一方
exp(expires): 什么时候过期，这里是一个Unix时间戳
iat(issued at): 在什么时候签发的
```

- signature 签名 哈希需要有secret

`[可选字段]`**Access-Control-Allow-Credentials**：布尔值 true允许携带凭证；
```js
//客户端设置允许携带用户凭证
xhr.withCredentials = true;

//服务端设置允许携带凭证
ctx.set("Access-Control-Allow-Credentials",true);
```

### 5-4、前端的认证

"Bearer"可用可不用
```js
"Authorization","Bearer " + token
```

- 客户端获取用户信息

```js
  // 获取登录信息
  btns[1].onclick = function() {
    let xhr = new XMLHttpRequest()
    xhr.open('get', '/users')
    xhr.onload = function() {
      console.log(xhr.responseText)
    }
    let token = localStorage.getItem('token')
    // 如果使用了koa-jwt，那么 token 一定要带上 Bearer 
    // 设置请求头Authorization
    xhr.setRequestHeader('Authorization', token)
    xhr.send()
  }
```

- 服务端验证Authorization

```js
// 手写koa-jwt
app.use(async (ctx,next) => {
  // 排除不需要验证的url
  if(ctx.url.startsWith('/login')) {
    await next()
  } else {
    let token = ctx.get('Authorization')
    try {
      ctx.state.user = jwt.verify(token, 'kkb')
    } catch (e) {
      ctx.throw(400)
    }
    await next()
  }
})

router.get('/users', async ctx => {
  console.log(ctx.state.user)
  ctx.body = [
    ...ctx.state.user
  ]
})
```

- 使用[koa-jwt](https://www.npmjs.com/package/koa-jwt)验证Authorization

```js
const koaJwt = require('koa-jwt')
app.use(koaJwt({
  secret: 'kkb'
}).unless({path: [/^\login/]}))
// 通过ctx.state.user可获取用户信息
```

## 6、直播课件
[有道云笔记](https://note.youdao.com/web/#/file/WEBa857c3bdf9bbeb1c0cebaca1c1e11ea7/markdown/WEB2ef56d5a2aba48572f8134a8a02ee276/)

## 7、练习

### 相册实现区分用户上传的照片功能

- 1、A用户上传的话，只会看到 A用户上传的照片

  - 用户数据可以在 users 表内写死

- 2、使用 jwt 实现相册的鉴权处理逻辑

- 3、实现登录接口 /login（post形式）
```
1. 数据库内创建 users 表: 1. username 字段 2. password 字段
2. 验证账号密码 1.用户数据可以在 users 表内写死
3. 登录成功后，返回token给前端
```

- 4、/getPhotos 接口增加鉴权
```
1、检测 token，如果没有 token 的话，返回 401
2、有 token 并且验证成功的话，在返回对应的数据
```

- 5、jwt 使用 koa-jwt 以及 jsonwebtoken 两个库来实现

- 6、前端使用 ajax 请求登录接口
