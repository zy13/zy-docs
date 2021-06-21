## webpack打包输出配置

### 用法

```js
output: {
  pageOne: './src/pageOne.js',
  pageTwo: './src/pageTwo.js'
}
```

* 多个入口起点
```js
output: {
  filename: '[name].js',
  path: __dirname + '/dist'
}

// 写入到硬盘./dist/pageOne.js, ./dist/pageTwo.js
```