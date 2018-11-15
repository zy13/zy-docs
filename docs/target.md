
* js => 单线程
>js为什么是单线程的？
```js
js主要用途
1、交互、操作DOM和BOM

js：包括一个主线程和一个调用堆栈

js执行过程中遇到的如setTimeout的异步操作，会交给浏览器处理，当达到指定执行时间时，回调函数会放入到任务队列中。一般不同的异步任务的回调函数会放入不同的任务队列中。等调用栈的所有任务执行完之后，接着去执行任务队列中的回调函数。

同步：发出调用，要等得到结果才会继续执行，可能导致主线程阻塞
异步：调用之后，不能直接拿到结果，需要通过event loop事件处理机制，在Event Queue注册回调函数最终拿到结果，拿到结果中间可以插入其他任务
```
>如果js是多线程会怎么样？

* bs => 多线程
```js
JavaScript引擎线程
GUI渲染线程
浏览器事件触发线程
浏览器Http请求线程
```

>多线程特点：多线程需要共享资源，多线程编程经常面临锁、状态同步等问题

### JS引擎

* 基本概念
```js
1 JS Engine(JS引擎)
2 Runtime(运行上下文/运行环境)
3 Call Stack(回调栈)
4 CallBack(回调函数)
```

* js引擎
>js引擎用来执行js代码，通过编译器将代码编译成可执行的机器码给计算机执行，类似Java的JVM

>引擎主要由`堆(Memory Heap)`和`栈(Call Statk)`组成<br>
>`Heap(堆)`: JS引擎给对象配置的内存空间放在堆中<br>
>`Statk(栈)`: 栈存储着JS引擎正在运行的任务

```js
常见的JavaScript虚拟机：
Chakra(Microsoft Internet Explorer)
Nitro/JavaScript Core (Safari)
Carakan (Opera)
SpiderMonkey (Firefox)
V8 (Chrome, Chromium, Node.js)
```

* RunTime（运行上下文|运行环境）
>RunTime（执行环境）用栈表示
```js
1 供js在浏览器环境执行时调用的接口：如BOM和DOM对象提供的外部接口；
2 Node提供的各种API；
3 事件循环和事件队列；
```

* Call Stack（调用栈）
>栈的特点：先进后出FILO
```js
1 js首次被载入时，会创建全局执行环境
2 函数被调用时，会创建一个函数执行上下文
```
>函数被调用时，会创建一个执行环境，创建一个栈<br>
>调用栈中遇到的DOM操作、ajax请求、setTimeout等WebAPIs，就会交给浏览器内核的其他模块处理，处理完之后会将回调函数放在任务队列之中，等回调栈中的任务执行完之后再去执行任务队列中的回调函数

* Event loop(事件环)
* web worker
* 主线程，执行栈与事件队列
* 异步，事件挂起
* 异步事件，web apis
* 宏任务，微任务



