<!-- # 常用的npmbao -->
<style scoped>
blockquote{
  background: #2d2d2d;
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  padding: 0.25rem 1.5rem;
  margin: 0.85rem 0;
  border-radius: 6px;
  border-left: 0.1rem solid #b2fd3d;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
}
code{
  color: #7ec699;
  font-size: 14px;
  padding: 0.25rem 0.2rem;
}
li, li>a{
  font-weight: bold;
}
</style>

## package.json

* [package.json文件_阮一峰](https://javascript.ruanyifeng.com/nodejs/packagejson.html)

>每个项目的根目录下面，都有一个`package.json`文件，定义了这个项目的所需要的各种模块，以及项目的配置信息（比如项目名称、版本、许可证等）。`npm install`命令根据这个配置文件，自动下载所需要的模块，也就是配置项目所需要的运行和开发环境。`npm init`命令可自动生成一个package.json文件。

* **重要字段解析**
```bash
1、`scripts字段`

指定了运行脚本命令的npm 命令行缩写，比如dev指定了`npm run dev`时，所要执行的命令。
"scripts": {
  "dev": "cross-env NODE_ENV=development node ./build/devServer.js"
},

2、`devpendencies字段，devDependencies字段`

`devpendencies`字段指定了项目运行时所依赖的模块，`devDependencies`字段指定项目开发所需要的模块
它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及版本范围。

"devDependencies": {
  "@babel/core": "^7.11.0",
  "cross-env": "^7.0.2",
  "webpack": "^4.44.1",
  "webpack-cli": "^3.3.12",
  "webpack-dev-server": "^3.11.0"
}
# 指定版本：比如7.11.0，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
# 波浪号（~）+指定版本：比如~7.11.0，表示安装7.11.X的最新版本，安装时不改变大版本号和次要版本。
# 插入号（^）+指定版本：比如^7.11.0，表示安装7.x.x的最新版本，安装时不改变大版本号。
# latest：安装最新版本。

3、`engines`

指明了该项目运行的平台，比如node的某个版本或者浏览器。
```

## cross-env

```bash
跨平台设置和使用环境变量。

"cross-env NODE_ENV=production webpack --config build/webpack.config.js"

只要在`NODE_ENV`前面加上`cross-env`标志，就可以实现NODE_ENV赋值。

用于package.json，项目启动前赋值
```

## 
