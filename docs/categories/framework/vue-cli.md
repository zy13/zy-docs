### 目录结构

```js
// vue-cli生成的目录结构及解析
.
├── .env  // 环境变量配置文件
├── build // vue-cli 生成，用于webpack监听、构建
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config // vue-cli 生成&自己加的一些配置文件
│   ├── default.conf
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist // Vue build 后的文件夹
│   ├── index.html // 入口文件
│   └── static // 静态资源
├── server // Koa后端，用于提供Api
│   ├── config // 配置文件夹
│   ├── controllers // controller-控制器
│   ├── models // model-模型
│   ├── routes // route-路由
│   └── schema // schema-数据库表结构
├── src // vue-cli 生成&自己添加的utils工具类
│   ├── App.vue // 主文件
│   ├── assets // 相关静态资源存放
│   ├── components // 单文件组件
│   ├── main.js // 引入Vue等资源、挂载Vue的入口js
│   └── utils // 工具文件夹-封装的可复用的方法、功能
├── static // vue-cli 生成
│   ├── .gitkeep // 允许提交到git仓库的空文件夹
├── test // vue-cli 生成
├── .babelrc // 下一代JavaScript解析器babel的配置文件
├── .eslintignore // eslint过滤的文件
├── .eslintrc.js // eslint配置文件
├── .gitignore // git提交过滤的文件
├── .postcssrc.js 
├── app.js  // Koa入口文件
├── index.html // vue-cli生成，用于容纳Vue组件的主html文件。单页应用就只有一个html
├── package-lock.json // 用npm自动生成的lock文件
├── package.json // npm的依赖、项目信息文件
└── README.md // 项目说明文档

```

### 项目启动流程

```js
项目启动命令
'npm run dev: webpack-dev-server --inline --progress --config build/webpack.dev.conf.js'
流程
build/webpack.dev.conf.js => 
```


### 备注

* webpack-dev-server
>`webpack -d --watch`用于在开发环境下编译静态文件，`webpack-dev-server`除了有此功能外。还有其他功能，比如在本地开启服务，打开浏览器等

* webpack配置字段解读
```
entry: 
```


