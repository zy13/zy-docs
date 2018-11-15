### [字段解析](https://www.webpackjs.com/configuration/)

* [entry](https://www.webpackjs.com/configuration/entry-context/#entry) string | object | array
>webpack打包入口，多页面多入口，单页面单入口。
```js
module.export = {
  // webpack构建打包入口，应用程序开始执行
  entry: './app/entry.js', // ①生成一个编译压缩好的chunk文件，名称为main
  entry: ['./app/entry1.js', './app/entry2.js'], // ②生成一个编译压缩好的文件
  entry: { // ③生成两个编译压缩好的a、b两个chunck文件
    a: './app/entry-a.js',
    b: ['./app/entry-b1.js', './app/entry-b2.js']
  }
}
```

* [output](https://www.webpackjs.com/configuration/output/)
>webpack如何输出结果的相关选项
```js
const path = require('path')
module.export = {
  // 指示webpack如何去输出
  output: {
    // 所有输出文件的目标路径
    path: path.resolve(__dirname, 'dist'), // string 
    // 决定每个输出bundle的名称
    filename: 'bundle.js', // ① string
    filename: '[name].js', // ② 用于多个入口，比如entry-②
    filename: '[hash].js', // ③ 所有编译压缩好的文件都共用一个哈希值
    filename: '[chunkhash].js', // ④ 用于长效缓存，每个文件的哈希值都不一样，
    filename: '[name].[chunkhash].js',
    // 输出解析文件的目录，url相对于html页面
    publicPath: '/assets/',
    publicPath: '',
    publicPath: 'https://cdn.example.com/'
  }
}
```
>关键字段：[缓存指南](https://www.webpackjs.com/guides/caching/)、[filename](https://www.webpackjs.com/configuration/output/#output-filename)
>[hash | chunkhash](https://juejin.im/post/5a4502be6fb9a0450d1162ed)
>hash一般结合cdn缓存使用，跟整个项目的构建相关，只要项目里有文件更改，整个项目的构建的hash值都会更改，并且全部文件都共用相同的hash值<br>
>[长效缓存](https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/)

* [module](https://www.webpackjs.com/configuration/module/)
>关于模块的配置
```js
const path = require('path')
module.export = {
  // 模块规则（配置loader、解析器等选项）
  rules: [
    {
      // 正则表达式
      test: /\.jsx?$/,
      // 更倾向于include
      include: [
        path.resolve(__dirname, 'app')
      ],
      // 尽量避免exclude
      exclude: [
        path.resolve(__dirname, '')
      ],
      // 应该应用的loader，它相对于上下文解析
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      }
    }
  ]
}
```

* [resolve](https://www.webpackjs.com/configuration/resolve/)
>解析模块请求的选项，配置模块如何解析
```js
module.export = {
  resolve: {
    // 模块别名
    alias: {
      "module": path.resolve(__dirname, "app/third/module")
    },
    // 自动解析确定的扩展，能够使用户引入模块时不带扩展，默认为
    extensions: [".js", ".json"],
    // 告诉webpack解析模块时应该搜素的目录
    modules: ["node_modules"]
  }
}

```

* [devTool](https://www.webpackjs.com/configuration/devtool/)
>此项控制是否生成以及如何生成source map，选择一种source map格式来增强调试过程，不同的值会明显影响到构建和重构的速速
```js
module.export = {
  // 通过在浏览器调试工具中添加元信息增强调试
  devTool: "source-map", // 牺牲构建速度，元信息是最详尽的
  devTool: none, // 生产环境，构建速度、重构速度 —— +++ => 打包后的代码
  devTool: "eval", // 开发环境，+++ => 生成后的代码
  devTool: "cheap-eval-source-map", // 开发环境，+++ => 转换后的代码(仅限行)
  devTool: ...
}
```

* [plugin](https://www.webpackjs.com/configuration/plugins/) array
>webpack插件列表。当一些bundle
```js
module.export = {
  plugins: [
    
  ]
}
```