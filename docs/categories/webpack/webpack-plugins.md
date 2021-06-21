## html-webpack-plugin^3.2.0

[html-webpack-plugin详解](https://www.cnblogs.com/wonyun/p/6030090.html)

### 主要作用

```
1、为html文件中引入的外部资源(如js、css等)动态的添加编译后的hash，防止引用外部缓存文件存在的问题。
2、可以生成html入口文件，例如单页面应用生成一个html文件，多页面应用生成多个html文件
```

### 配置项

```js
this.options = _.extend({
  template: path.join(__dirname, 'default_index.ejs'),
  templateParameters: templateParametersGenerator,
  filename: 'index.html',
  hash: false,
  inject: true,
  compile: true,
  favicon: false,
  minify: false,
  cache: true,
  showErrors: true,
  chunks: 'all',
  excludeChunks: [],
  chunksSortMode: 'auto',
  meta: {},
  title: 'Webpack App',
  xhtml: false
}, options);
```

* title：生成html文档的标题。一般不会替换掉模板中title元素的内容。
* filename：输出文件的文件名称，默认为“index.html”
* template：本地模板文件的位置，支持html、ejs等加载器
* hash：true|false，是否允许为js、css等静态资源文件在webpack编译完成后注入哈希值。默认值为false
* chunks：允许插入到模板中的一些chunk，不配置此项默认会将entry中的所有chunk注入到模板中。
* excludeChunks：与chunks相反，用来配置不允许注入的chunk
* minify：{}|Boolean，是否压缩html，默认是true。传递html-minifier选项给minify输出。

### 用法

```js
new HtmlWebpackPlugins({
  minify: {
    collapseWhitespace: true //压缩空白
  },
  template: './src/index.html', // 模板地址
  hash: true // 消除缓存，添加版本号
})
```

## extract-text-webpack-pugin

### 主要作用
```
1、抽取css样式
```

### 配置项


### 用法