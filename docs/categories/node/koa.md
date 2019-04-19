### [官网](https://koajs.com/)

* 最新版本v2.5.2

### [koa-router](https://segmentfault.com/a/1190000007468233)

#### verb()
* get|put|post|patch|delete
* 作用: 注册路由，直接注册相应http方法的路由

#### routes()
* 作用：启动路由，并且返回一个中间件函数
* 配置路由的重要一步：
```js
const app = require('koa')()
const router = require('koa-router')()

app.use(router.routes())
```

#### allowMethods()
* 作用：当请求出错时的处理逻辑，返回中间件函数


