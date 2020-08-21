[webpack4.x+babel7.x+react16.x](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/)

## 创建react项目

```bash
1️⃣ 输入命令行`npm init`，生成`package.json`文件，用于项目信息说明以及项目依赖的管理

2️⃣ 根目录创建`index.html`文件，作为页面访问入口
```

## webpack4.x安装

* 相关依赖的安装

```bash
`webpack` -- 自动化构建工具

`webpack-dev-server` -- 本地开发环境服务

`webpack-cli` -- 使用webpack相关命令的必须插件

`html-webpack-plugin` -- 将编译好的脚本自动插入到index.html文件中
```

## babe7.x安装

* 相关依赖的安装
```bash
`@babel/core`和`@babel/preset-env` -- babel的两个主要依赖，解析脚本，使大部分浏览器都能识别

`babel-loader` -- babel加载器，解析babel。
```

* `.babelrc`文件配置
```js
{
  "presets": [
    "@babel/core",
    "@babel/preset-env"
  ]
}
```

* 在`webpack.config.js`文件中的配置
```js
...
"module": {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }
  ]
}
...
```

## react16.x安装

* 依赖安装
```bash
`@babel/preset-react` -- babel解析react中的jsx语法

`react-hot-replacement` -- webpack服务中热加载react组件

`react`和`react-dom`
```

* 配置

```js
...
plugins: [
  new webpack.HotModuleReplacementPlugin()
],
devServer: {
  hot: true
}
...
```