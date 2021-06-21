### [链接](https://github.com/ruanyf/es6tutorial/blob/gh-pages/docs/generator-async.md)

### Generator函数的异步应用

>JavaScript语音的执行环境是'单线程'的，如果没有异步编程，那么应用会很卡

### Generator如何完成异步编程

```
es5异步编程的四种方法：
* 回调函数
* 事件监听
* 发布/订阅
* Promise对象

es6: Generator函数
```

### 基本概念

* 异步
>任务不是连续执行的，而是分阶段执行

* 回调函数
>实现异步编程, node约定，回调函数的第一个参数必须是错误对象err，为什么？
