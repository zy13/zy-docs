[nodejs-en]: https://nodejs.org/en/
[nodejs-cn]:http://nodejs.cn/api/
[nodejs入门教程]:(https://www.nodebeginner.org/index-zh-cn.html)

## node简介

### node
>关注高性能的web服务器, web服务器具有事件驱动，非阻塞I/O的特点

### node的特点

* 异步io
>发起Ajax调用就是一个异步请求

* 事件与回调函数
>事件编程：轻量级、松耦合、只关注事物点等特点                

* 单线程
>不用在意状态的问题、无死锁、线程没有上下文交换所带来的性能上的开销
>弱点：无法利用多核cpu；健壮性差，错误会导致整个应用退出；大量计算占用cpu导致无法继续调用异步I/O
>解决方案：web worker; 通过子进程充分利用硬件资源和提升应用的健壮性。

* 跨平台
>node可以在多个平台运行而存在极少的兼容性问题

### node的应用场景

* I/O密集型
>主要优势：node利用事件循环的处理能力，资源占用极少

* CPU密集型
>node的异步I/O已经解决了在单线程上CPU与I/O之间阻塞无法重叠利用的问题






















### [nodejs-en]的核心模块

* fs

* path

* net

* url

  格式化域名
  url.format({
    host,
    http,
    hostname,
    port
  })

* readline
* pkgPath

### 中文版[nodejs-cn]api文档，版本为v10.7