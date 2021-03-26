github代码：[https://github.com/zy13/koa-demo/tree/2-koa-with-mysql](https://github.com/zy13/koa-demo/tree/2-koa-with-mysql)

## 1、nunjucks模板引擎的应用

官网：[https://mozilla.github.io/nunjucks/cn/getting-started.html](https://mozilla.github.io/nunjucks/cn/getting-started.html)

### 1-1、服务端引入

- 配置方法configure
- 渲染方法render：二次封装后挂载到ctx.render()

### 1-2、模板文件

- include语法引入公共模块
- extends语法扩展基础模块
- block语法引入块

### 1-3、数据渲染

- 服务端挂载数据
- 模板渲染：通过大胡子语法和for...in等语法渲染模板数据

### 1-4、二次封装nunjucks

二次封装的目的：将模板文件的渲染方法，将其挂载到`ctx.render()`，简化模板渲染方式,方便维护
```js
const nunjucks = require('nunjucks')
const path = require('path')

module.exports = (options) => {
  const viewDir = path.resolve(__dirname, '../views')

  // 配置模板文件-动态数据渲染模板
  nunjucks.configure('views', {
    noCache: true,
    watch: true,
    autoescape: true,
    ...options
  })

  // 返回异步函数
  return async (ctx, next) => {
    if(!ctx.render) {
      ctx.render = (tplName, data) => {
        return nunjucks.render(`${viewDir}/${tplName}.html`, {
          ...data
        })
      }
    }
    
    await next()
  }
}
```


## 2、MySQL数据库的应用

数据能够提供很多功能性的函数以及底层算法支撑，帮助我们更好地管理维护和使用数据。

官网：[https://mysql.com](https://mysql.com)

### 2-1、学习数据库目的：
- 1、了解整个后端工作流程、以及后端业务逻辑
- 2、了解前端配合后端工作的方式
- 3、更有利于前端和后端业务的划分

### 2-2、数据库的安装
- 数据库管理
- 图形化操作界面（GUI）管理数据库（尽量使用开源或者免费的工具）
  - 官网下载：https://dev.mysql.com/downloads/workbench/
  - 配置：连接名称、协议、数据库主机名、端口、用户名、密码
  - 连接数据库：端口、用户名、密码等

    <enlarge><img src="./imgs/mysqlWorkbench.png"/></enlarge>
  - 数据库图形化管理界面

    <enlarge><img src="./imgs/mysql-workbench-gui.png"/></enlarge>

### 2-3、mysqlworkbench的使用
  - 创建一个数据库
  
    <enlarge><img src="./imgs/create-schemas.png"/></enlarge>
  - 创建数据库的表格
    - 通过create table创建

    <enlarge><img src="./imgs/create-table.png"/></enlarge>
    - 通过table import导入

## 3、第三方库mysql2的应用

官网：[https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2)

### 3-1、创建与数据库的连接
```js
// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});
```

### 3-2、异步查询数据库

- 通过回调函数的方式获得数据库的数据
```js
// simple query
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
```

- 通过promise版本获取数据库数据

```js
async function main() {
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
  // query database
  const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
}
```

### 3-3、二次封装mysql2

二次封装的目的：将连接挂载到ctx.connection, 简化数据库的操作,便于维护

```js
// 单例模式
const mysql = require('mysql2/promise')

const config = {
  host: 'localhost',
  user: 'root',
  database: 'kkb',
  port: 3307
}
let connection
module.exports = () => {
  return async (ctx, next) => {
    if(!connection) {
      connection = await mysql.createConnection(config)
    }
    ctx.connection = connection
    await next()
  }
}
```

## 4、动态路由

- koa-router中间件

官网：[https://www.npmjs.com/package/koa-router](https://www.npmjs.com/package/koa-router)

- 因为url在请求过程中再携带一些动态的额外数据，这个数据会影响当前从数据库中查询的结果
- 客户端发送请求可以发送数据：1.**url** 2.**请求头** 3.**请求正文**
- koa-router会在分析当前动态url时候，把/list/1或者/list/2后面:匹配的内容单独解析出来，然后存放到**ctx.request.params.categoryId**

```js
// 列表页
router.get('/list/:categoryId', async ctx => {
  let { categoryId } = ctx.request.params
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [items] = await ctx.connection.query(
    'select * from items where category_id=?',
    [categoryId]
  )
  ctx.body = ctx.render('list', {
    title: '列表',
    categories,
    items
  })
})
```

## 4、post请求的数据处理

### 4-1、客户端

客户端请求的数据量大的情况下，使用post请求，通过表单形式提交给后端
```html
<form method="post" action="/comment" enctype="application/x-www-form-urlencoded">
  <p>
    <textarea name="content" class="input" rows="5"></textarea>
    <input type="hidden" name="detailId" value="{{item.id}}">
  </p>
  <p>
    <button class="btn btn-primary">提交</button>
  </p>
</form> 
<!-- 浏览器会自动收集form表单里name属性的字段名称和值，并提交给`/comment`接口 -->
<!-- 点击form表单中的button按钮，浏览器会自动提交响应数据给后端 -->
```

### 4-2、服务端

koa框架只能解析url和请求头的相关数据，对应客户端请求正文携带的数据无法解析，故需要引入中间件进行解析。

- koa-body
  - 该中间件解析请求正文携带的数据，并将数据挂载到ctx.request.body中

- 将数据存入到数据库中

```js
// 数据量比较大的请求，使用post提交数据
router.post('/comment', koaBody(), async ctx => {
  // 默认情况下，koa不会解析post提交的正文请求中的数据，其解析头部和url的信息
  let { content, detailId } = ctx.request.body
  let [rs] = await ctx.connection.query(
    'insert into comments (content,datatime,detail_id) values (?,?,?)',
    [content,Date.now(),detailId]
  )
  ctx.body = '评论成功'
})
```

## 5、练习

- 1、创建一个数据库kkb 
- 2、在kkb数据库中创建一个表users 
- 3、在users表中添加至少下面两个字段： 
  - 1、id(int)，username(varchar) 
- 4、通过koa、koa-router构建一个webserver，端口8888 
- 5、提供一个get方式接口localhost:8888/register访问注册页面（form表单） 
- 6、提供一个post方式接口localhost:8888/register处理提交的数据，并返回操作结果（注册失败 or 注册成功） 
- 7、提交注册的数据保存到数据库users表中 通过标准：完成以上所有任务及要求，方可通过。









