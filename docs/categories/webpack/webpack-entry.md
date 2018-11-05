## entry-配置webpack打包入口

[entry-point](https://webpack.docschina.org/concepts/entry-points/)

### 作用

```
1、webpack打包入口，配置必不可少的环节
2、可配置但入口和多入口，一般单页面应用文件配置单入口，多页面应用配置多入口
```

### 配置

```
entry: string|array<string>
```


### 用法

```js
entry: ''
entry: []
entry: {}
```

### 使用场景

* 分离应用程序[app]和第三方[vendor]入口
```js
entry: {
  app: './src/app.js',
  vendors: ['react', 'react-dom', 'jquery']
}
```
>这种方式比较常见，只有一个入口起点(不包括vendors)的单页面应用程序。

* 多页面应用程序
```js
entry: {
  pageOne: './src/pageOne/index.js',
  pageTwo: './src/pageTwo/index.js',
  pageThree: './src/pageThree/index.js'
}
```