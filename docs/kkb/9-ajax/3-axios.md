github代码：[https://github.com/zy13/koa-demo/tree/6-koa-axios](https://github.com/zy13/koa-demo/tree/6-koa-axios)

## 1、axios.js介绍

axios.js: [https://www.npmjs.com/package/axios](https://www.npmjs.com/package/axios)

axios是基于Promise封装的http客户端，应用于浏览器端和nodejs的进行发送请求。

- 应用于浏览器端时，使用XMLHttpRequest
- 应用于nodejs端时，使用http模块发生请求
- 支持Promise
- 请求拦截器和响应拦截器
- 转换请求数据和响应数据
- 客户端防XSRF

## 2、axios.js代码逻辑图

- ### 2-1、入口逻辑图

![img](./imgs/axios-entry.drawio.png)

- ### 2-2、Axios类

- 构造函数：初始化config，初始化request拦截器和response拦截器

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```

- request方法
```js
// ...
var promise = Promise.resolve(config);
// ...
return promise;
```

## 3、直播课件
[有道云笔记](https://note.youdao.com/web/#/file/WEBaeda3e573eceea012e4201bf8db23585/markdown/WEBeed2cc6498ec09099611b3576dfd464b/)