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

## webpack

* [webpack中文文档](https://www.webpackjs.com/concepts/)
* [深入浅出webpack](http://webpack.wuhaolin.cn/)

>webpack是一个打包模块化JavaScript的工具，在webpack里一切文件皆模块，通过Loader转换文件，通过Plugin注入钩子，最后输出由多个模块组合成的文件。Webpack专注于构建模块化项目。<br>

>构建：源代码无法直接运行，必须通过转换后才可以正常运行。<br>

>通过webpack构建，把源代码转换成发布到线上的可执行JavaScript、CSS、HTML代码，包括：<br>
>1、代码转换：TypeScript编译成JavaScript、SCSS编译成CSS等<br>
>2、文件优化：压缩JavaScript、CSS、HTML代码，压缩合并图片等<br>
>3、代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。<br>
>4、模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件<br>
>5、自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器<br>
>6、代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过<br>
>7、自定发布：更新完代码后，自动构建出线上发布代码并传输给发布系统<br>

>一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。

webpack优点
* 专注于处理模块化的项目，能做到开箱即用一步到位；
* 通过plugin扩展，完整好用又不失灵活；
* 通过场景不仅限于Web开发；
* 开发体验良好

webpack缺点
* 只能用于采用模块化开发的项目

### entry
>webpack构建入口文件路径的配置，并递归解析所需要的依赖
```js
// webpack.config.js
module.exports = {
  entry: './src/main.js'
}
```

### output
```

```

>如何优化构建的速度和输出
## webpack-dev-server
