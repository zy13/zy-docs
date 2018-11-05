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

## 总结


### Generator函数特点

* yield命令是暂停执行命令，后面跟表达式或者函数
* yield命令必须在Generator函数（格式function* fName()）内使用，否则会报错
* yield命令与return的区别：同一个作用域中，一个函数中可以有多个yield命令，只能有一个return命令
* Gnerator是一个迭代器，通过next()方法执行一个yield命令后面的表达式或者方法并返回值
* 可以通过数组扩展（符号为...）一次性获取Generator函数迭代器中的所有值

### 迭代器相关的循环

* for...of只能遍历只有遍历接口的数组或者类数组

## 应用

### 斐波那契数列fibonacci

```js
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr<limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
console.log([...fibonacci(10)])
```

### 利用for...of循环，写出遍历任意对象的方法

>原生的对象没有遍历接口，无法使用for...of循环，可以通过Generator为对象添加遍历接口，实现对象也能使用for...of遍历

```js
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
```