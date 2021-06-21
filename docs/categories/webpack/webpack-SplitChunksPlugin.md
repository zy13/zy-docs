## webpack代码切割

### 作用

```
代码切割器...
```

### 默认配置项

```js
splitChunks: {
  chunks: "async",
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      priority: -10
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}
```

* chunks：'async'|'initial'|'all'。asyn是针对异步加载做切割，initial是针对初始chunk, all是针对所有chunk
* minSize：我们切割完要生成的新chunk要>30kb，否则不生成新的chunk
* minChunks：共享该module的最小chunk数
* maxAsyncRequests：最多有五个异步加载请求该module
* maxInitialRequests：初始化的时候最多有三个请求该module
* automaticNameDelimiter：名字中间的间隔符
* name：chunk的名字，如果被设为true，会根据被提取的chunk自动生成
* cacheGroups：重点掌握，要切割成的每一个新chunk就是一个cache group
  - test
  - priority