基于koa框架的服务端架构，其中渲染模板为pug

koa依赖集
```
koa
koa-router
koa-pug
```

服务端使用es6语法,需要安装以下babel解析器
```
babel
babel-cli
```

### 搭建服务端框架步骤

`1️⃣` 新建项目文件夹，打开终端，输入`npm init`,生成package.json文件<br>
`2️⃣` 安装服务器依赖koa,koa-router,koa-pug，以及es6解析器babel、babel-cli、babel-preset-es2015、babel-preset-stage-3等<br>
`3️⃣` 新建文件`.babelrc`,用于引用babel的preset依赖<br>
`4️⃣` 新建文件夹app,views,routes,以及文件`app/app.js`作为服务器启动文件，`routes/index.js`作为路由入口<br>
`5️⃣` `app.js`文件，添加服务启动代码：
```js
import Koa from 'koa'
import Pug from 'koa-pug'
import path from 'path'
import router from '../router'

const app = new Koa()
const pug = new Pug({
  viewPath: path.resolve(__dirname, '../views')
})

pug.use(pug)
app.use(router.routes())
   .use(router.allowedMethods())
   .listen(9002)

```
`6️⃣` `routes/index.js`文件，添加首页路由代码：
```js
import Router from 'koa-router'

const router = new Router()

router.get('/', async ctx => {
  ctx.render('index', {
    title: '首页',
    list: '列表数据'
  })
})

export default router
```
`7️⃣` `views/index.pug`,添加首页模板：
```pug
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    title Document
  body
    h1 首页demo
    div=list
```
`8️⃣` 通过浏览查，输入`localhost:9002`查看页面效果





