基本概念

[generator](https://github.com/ruanyf/es6tutorial/blob/gh-pages/docs/generator.md)
[generator-async](https://github.com/ruanyf/es6tutorial/blob/gh-pages/docs/generator-async.md)

* 异步：单线程任务非连续的、分阶段完成
* 回调函数：单线程的第二阶段单独写在一个函数里，等到获得执行权时候直接调用函数执行
* 协程：多线程相互协作
* 协程运行流程：
  ```
  1、协程A开始执行
  2、协程A执行到一半，暂停，将执行权交给协程B
  3、协程执行完毕，交还执行权
  4、协程A恢复执行权
  ```
* 协程写法
  ```js
  function* asyncJob(){
    // ...其他代码
    var f = yield readFile(fileA)
    // ...其他代码
  }
  ```
  >上面代码`asyncJob`是一个协程，yield命令是异步阶段的分界线，返回一个包含value、done属性的对象，其中value为yield命令后面表达式的值，done是个布尔值，表示函数是否执行完毕
* 回调地狱：回调函数嵌套着回调函数，代码呈现横向发展，形成了强耦合，难以维护
* Promise对象：为了解决回调地狱的一种新写法，将回调函数的嵌套改成了链式调用
* Generator函数：协程在es6的实现，最大的特点是交出函数的执行权
* Generator函数的执行方法：
  ```js
  function* gen(x){
    var y = yield x + 2
    return y
  }
  var g=gen(1)
  g.next()
  g.next(2)
  ```
  >`g.next()`执行有yield命令的语句并返回一个对象，若done属性为false,那么value拿的是yield命令的表达式，否则为undefined或者为next(传入的参数)
  ```js
  function* gen(x) {
    try{
      var y = yield x + 2
    }catch(e){
      console.log(e)
    }
    return y
  }
  var g = gen(1)
  g.next()
  g.throw('出错啦')
  ```
  >指针对象的throw方法，可以被函数体try...catch代码块捕获

异步任务的封装

Thunk函数

>Thunk函数是自动执行Generator函数的一种方法


* koa

koa
koa-router

### http-request






