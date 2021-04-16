# Promise原理解析与实现
### 要点
- Promise 类
- Promise 状态
- promise.resolve 方法实现
- promise.reject 方法实现
- promise.then 方法实现
- promise.catch 方法实现
### 目标
- 了解 `Promise` 基本实现原理
- 深入掌握 `Promise` 的使用细节
- 了解 `Promise` 未来新标准新特性
### 学前须知
本次 `Promise` 源码课程中会涉及到面向对象的使用，所以如果您能知道一些面向对象的知识（基础即可），会更加有利于您的理解

## 1、Promise介绍

`Promise` 是 `JavaScript` 异步编程的一种流行解决方案，掌握 `Promise` 的使用是我们不可或缺的一项基本技能。但是要想熟练掌握并深入的理解它，还是必须要知道它的实现原理的。这节课就是从具体使用角度出发，使用原生手写方式一步一步的带你实现 `Promise` 库，而且不仅仅只是包含了 `Promise` 目前通用的功能，还有 `Promise` 的一些新的特性和未来即将支持的特性的介绍与实现

### Promise 类

`Promise` 的构造函数必须接收一个函数参数（也就是需要执行异步任务的函数），该函数将在传入以后立即调用，并传入 `Promise` 对象下的两个方法 `resolve` 和 `reject` 
- Promose接受一个函数，函数会立即执行，函数传入两个参数为Promise对象下的
  - **Promise.resolve**方法
  - **Promise.reject**方法

### Promise方法
- Promise.prototype.then()
- Promise.prototype.catch()
- Promise.prototype.finally()
- Promise.all()
- Promise.race()
- Promise.allSettled()
- Promise.any()
- Promise.resolve()
- Promise.reject()

## 2、Promise 三种状态

每一个 `Promise` 对象都存在以下**三种状态**：

- `pending` : 进行中 - 初始状态
- `fulfilled` : 已成功
- `rejected` : 已失败

```js
class Promise{
  constructor(handle) {
    this['[[PromiseState]]'] = 'pending'
    this['[[PromiseResult]]'] = undefined
    handle(this._resolve.bind(this), this._reject.bind(this))
  }
  _resolve(val) {
    // 1.改变状态 2、改变value
    this['[[PromiseState]]'] = 'fulfilled'
    this['[[PromiseResult]]'] = val
  }
  _reject(err) {
    // 1.改变状态 2、改变value
    this['[[PromiseState]]'] = 'rejected'
    this['[[PromiseResult]]'] = err
  }
}

// 实例化
let p = new Promise((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})
console.log(p);
```

**注意**
- 每一个 `Promise` 对象只能由 `pending` 状态变成 `fulfilled` 或 `rejected`
- 状态发生变化以后就不能再改变了
- 一个 `Promise` 对象状态的变化并不由 `Promise` 对象本身来决定，而应该是由我们传入的异步任务完成情况来决定的
- `Promise` 提供了两个用来改变状态的方法，resolve, reject
## 3、resolve 方法
- 将 `Promise` 对象的状态从 `pending` 变为 `fulfilled`，并执行成功后的注册任务;
- 修改`PromiseResult`的值为实例化对象传过来的对象

- 注意：如果当前状态已经改变过了，则直接 `return`

```js
_resolve(val) {
  this['[[PromiseState]]'] = 'fulfilled'
  this['[[PromiseResult]]'] = val
  // 微任务-所有同步任务执行后才开始执行微任务
  let run = () => {
    let cb
    while (cb = this.resolveFnQueue.shift()) {
      cb(val)
    }
  }
  let mo = new MutationObserver(run)
  mo.observe(document.body,{
    attributes: true
  })
  document.body.setAttribute('kkb', 'kkb')
}
```
## 4、reject 方法

- 将 `Promise` 对象的状态从 `pending` 变为 `rejected`，并执行失败后的注册任务;
- 修改`PromiseResult`的值为实例化对象传过来的对象

- 注意：如果当前状态已经改变过了，则直接 `return`
```js
_reject(err) {
  this['[[PromiseState]]'] = 'rejected'
  this['[[PromiseResult]]'] = err
  // 微任务-所有同步任务执行后才开始执行微任务
  let run = () => {
    let cb
    while (cb = this.rejectFnQueue.shift()) {
      cb(err)
    }
  }
  let mo = new MutationObserver(run)
  mo.observe(document.body,{
    attributes: true
  })
  document.body.setAttribute('kkb', 'kkb')
}
```

## 5、then 方法
`then` 方法用来获取结果，它接收两个函数作为参数，分别注册到 `resolve` 和 `reject`  方法执行后的任务队列中;
- then是个异步任务，分为宏任务和微任务：
  - 比如setTimeout是个宏任务，其特点是：颗粒比较大
  - 在宏任务后面建立微任务队列，执行完之后才会执行下一个宏任务
  - 微任务颗粒度小，先执行，宏任务颗粒度大，后执行

```js
then(onResolve, onReject) {
  // then原则：只存储回调函数，不执行回调函数
  // 链式调用
  return new Promise((resolve, reject) => {
    let onResolveFn = (val) => {
      let res = onResolve && onResolve(val)
      if(res instanceof Promise) {
        res.then(resolve)
      } else {
        resolve(res)
      }
    }
    let onRejectFn = (err) => {
      reject(err)
    }
    this.resolveFnQueue.push(onResolveFn)
    this.rejectFnQueue.push(onReject)
  })
}
```

### 1、添加任务
把 `then` 方法中接收到的两个函数分别添加到对应的**任务队列**中：
  - **fulfilledQueues -- resolveFnQueue**
  - **rejectedQueues -- rejectedFnQueue**
```js
  then(onResolve, onRejected){
    // 链式调用：后一个then获取前一个then的返回值
    return new MyPromise((resolve, reject) => {
      let onResolveFn = (val) => {
        let res = onResolve && onResolve(val)
        if(res instanceof MyPromise) {
          res.then(resolve)
        } else {
          resolve(res)
        }
      }
      let rejectedFn = () => {
        onRejected && onRejected()
        reject(err)
      }
      this.resolveFnQueue.push(onResolveFn)
      this.rejectedFnQueue.push(rejectedFn)
    })
  }
```
### 2、执行任务
在 `Promise.resolve` 和 `Promise.reject` 方法中调用执行对应的任务队列的所有注册函数
```js
// === 改善后 === 
_resolve(val) {
  // 1.改变状态 2、改变value
  this['[[PromiseState]]'] = 'fulfilled'
  this['[[PromiseResult]]'] = val
  // 模拟微任务
  let run = () => {
    let cb;
    while(cb = this.resolveFnQueue.shift()) {
      cb(val)
    }
  }
  let mo = new MutationObserver(run)
  mo.observe(document.body,{
    attributes: true
  })
  document.body.setAttribute('kkb','kkb')
}
_reject(err) {
  this['[[PromiseState]]'] = 'rejected'
  this['[[PromiseResult]]'] = err
  // 模拟微任务
  let run = () => {
    let cb;
    while(cb = this.rejectedFnQueue.shift()) {
      cb(err)
    }
  }
  let mo = new MutationObserver(run)
  mo.observe(document.body,{
    attributes: true
  })
  document.body.setAttribute('kkb','kkb')
}
```
### 3、结果传递
<style>
  blockquote{
    font-size: 1rem;
    color: #777;
    border-left: 0.25rem solid #dfe2e5;
    margin-left: 0;
    padding-left: 1rem;
  }
</style>
在调用 `reslove` 或者 `reject` 方法的时候，我们还可以通过传入一些值，在后续的 `then` 方法中，可以通过对应的函数接收到该结果

> 如果在一个 `Promise` 对象的状态改变后调用`then` 则会立即执行添加的对应函数，所以需要注意必须根据当前 `Promise` 的状态来做不同的处理
>
> - PENDING : 添加到对应的任务队列
> - FULFILLED / REJECTED : 不用添加到队列，而是立即执行任务

### 返回值

`then` 方法在执行最后必须返回一个新的 `Promise` 对象

> <span style="color:red">重点（难点）</span>
>
> 返回 `Promise`对象会立即调用并执行，如果这个时候，直接去执行该对象的 `resolve` 或者 `reject` 方法都会导致后续的 `then` 也立即被调用
>
> 我们需要对原 `fulfilledHandler` 和 `rejectedHandler` 进行包装，把它们和新 `Promise` 对象的 `resolve` 和 `reject` 方法分别放置到新的函数中，并把这个新的函数添加到原有任务队列中调用
>
> 简而言之：把新返回的 `Promise` 对象的 `resolve` 和 `reject` 与 `then` 中执行的 `fulfilledHandler` 和 `rejectedHandler` 添加到一个任务队列中执行，这样才能使用原有的 `then` 执行完成以后才执行新的 `Promise` 中的 `then`

上面是默认情况下的处理情况，其实 `then` 方法的处理更为复杂

> 当一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)完成（fulfilled）或者失败（rejected），返回函数将被异步调用（由当前的线程循环来调度完成）。具体的返回值依据以下规则返回：
>
> - 如果then中的回调函数没有返回值，那么then返回的Promise将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
> - 如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
> - 如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
> - 如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
> - 如果then中的回调函数返回一个已经是拒绝状态的Promise，那么then返回的Promise也会成为拒绝状态，并且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
> - 如果then中的回调函数返回一个未定状态（pending）的Promise，那么then返回Promise的状态也是未定的，并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。

## 3、任务执行顺序
所有`<script>`标签是一个大的宏任务，分好同步队列和异步队列，同步任务放进同步队列，异步任务放进异步任务，同步队列的任务执行完之后，再执行异步任务。而异步任务包括宏任务和微任务，其中所有微任务按顺序执行完，再按顺序执行宏任务，比如`setTimeout`。

- **微任务**
  - [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)监视对DOM树的更改
  - `Promise.then`
- **宏任务**
  - `<script>`标签：同步任务放在同步队列，异步任务放在异步队列
    - 异步任务包括宏任务和微任务。
  - `setTimeout`、`setIntterval`

**标签`<script>`中的事件执行中，同步、异步执行顺序**

  -- ![image](./imgs/task-queue.drawio.png)

**标签`<script>`中的事件循环，异步任务分为宏任务、微任务的执行顺序**

  -- ![image](./imgs/event-loop.drawio.png)


**下面任务执行顺序：同步 -> 异步 （微任务）-> 异步宏任务**
- 1、先执行同步任务：`console.log(111)-->console.log('执行')-->console.log(222)--> console.log(333) -->console.log('我是第二个script标签')-->console.log('第二-111')-->console.log('弟2 - 333')`
- 2、再执行异步微任务：`console.log(111, res) --> console.log(2) --> console.log('第二-111')-->console.log('弟2 - 222', res)`
- 3、再执行异步宏任务：`setTimeout: console.log('setTimeout')`
```html
  <script>
    // 宏任务 - 异步任务
    console.log(111);
    setTimeout(function(){
      console.log('setTimeout');
    })
    // Promise不是严格意义的微任务
    let p = new Promise((resolve, reject) => {
      console.log('执行');
      resolve('成功')
    })
    // then是微任务
    p.then(res => {
      console.log(111, res);
    },err=>{
      console.log(err);
    })
    console.log(222);
    p.then(res => {
      console.log(2);
    })
    console.log(333);
  </script>
  <script>
    console.log('我是第二个script标签');
    let p2 = new Promise(resolve=>{
      console.log('第二-111');
      resolve('第2 promise')
    })
    p2.then(res => {
      console.log('弟2 - 222', res);
    })
    console.log('弟2 - 333');
  </script>
```

## 7、静态方法 resolve() 和 reject()
```js
  static resolve(val) {
    return new MyPromise(resolve => {
      resolve(val)
    })
  }
  static reject(err) {
    return new MyPromise((undifined, reject) => {
      reject(err)
    })
  }  
```

## 8、静态方法 race()
Promise.race()方法将多个 Promise 实例，包装成一个新的 Promise 实例。
```js
// 只要p1、p2之中有一个实例率先改变状态，p的状态就跟着改变。
// 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
let p1 = new Promise((resolve,reject) => {
  setTimeout(()=>{
    resolve(222)
  }, 2000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve(111)
  }, 1000)
})
Promise.race([p1,p2]).then(res => {
  console.log(res); // 111
})
```

```js
static race(list) {
  return new MyPromise((resolve, reject) => {
    console.log(list);
    list.forEach(item => {
      item.then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  })
}
```
## 9、静态方法 all()

`all()`方法接受一个数组，用于将多个 Promise 实例，包装成一个新的 Promise 实例:
```
const p = Promise.all([p1, p2, p3]);
```
- 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled。p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

```js
static all(list) {
  return new Promise((resolve, reject) => {
    let resArr = []
    let num = 0
    list.forEach(item => {
      item.then(res => {
        num++
        resArr.push(res)
        if(num === resArr.length) {
          resolve(resArr)
        }
      }, err => {
        reject(err)
      })
    })
  })
}
```

## 10、静态方法allSettled()-ES2020
Promise.allSettled()方法方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。
```js
  static allSettled(list) {
  let resArr = new Array(list.length)
  let num = 0
  return new Promise((resolve) => {
    list.forEach((item,key) => {
      let obj = {}
      item.then(res => {
        obj['state'] = this['[[PromiseState]]'] 
        obj['value'] = res
        resArr[key] = obj
        num++
        if(num===list.length){
          resolve(resArr)
        }
      }, err=>{
        obj['state'] = this['[[PromiseState]]'] 
        obj['value'] = err
        resArr[key] = obj
        num++
        if(num===list.length){
          resolve(resArr)
        }
      })
    })
  })
}
```
## 11、方法 finally()
异步执行完成之后在执行
```js
finally(cb) {
  this.then(cb)
}
```

## 12、方法 catch()
```js
catch(cb) {
  this.then((undefined, err) => {
    cb && cb(err)
  })
}
```

## 13、静态方法 any()- ES2021

该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

## 14、扩展-MutationObserver-微任务

[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver)创建并返回一个新的观察器，它会在触发指定 DOM 事件时，调用指定的回调函数。MutationObserver 对 DOM 的观察不会立即启动；而必须先调用 observe() 方法来确定，要监听哪一部分的 DOM 以及要响应哪些更改。

- 语法

`var observer = new MutationObserver(callback);`

- 微任务

由`MutationObserver`的实例化对象是一个[微任务](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)，属于异步任务的一部分，只有所有同步任务执行完，才会执行异步任务。异步任务中可以有很多宏任务和微任务，微任务执行完之后才会执行下一个宏任务。

![img](./imgs/event-loop.drawio.png)

## 15、完整代码
```js
  class Promise{
    constructor(handle) {
      this['[[PromiseState]]'] = 'pending'
      this['[[PromiseResult]]'] = 'undefined'
      this.resolveFnQueue = []      
      this.rejectFnQueue = []
      handle(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(val) {
      this['[[PromiseState]]'] = 'fulfilled'
      this['[[PromiseResult]]'] = val
      // 微任务-所有同步任务执行后才开始执行微任务
      let run = () => {
        let cb
        while (cb = this.resolveFnQueue.shift()) {
          cb(val)
        }
      }
      let mo = new MutationObserver(run)
      mo.observe(document.body,{
        attributes: true
      })
      document.body.setAttribute('kkb', 'kkb')
    }
    _reject(err) {
      this['[[PromiseState]]'] = 'rejected'
      this['[[PromiseResult]]'] = err
      // 微任务-所有同步任务执行后才开始执行微任务
      let run = () => {
        let cb
        while (cb = this.rejectFnQueue.shift()) {
          cb(err)
        }
      }
      let mo = new MutationObserver(run)
      mo.observe(document.body,{
        attributes: true
      })
      document.body.setAttribute('kkb', 'kkb')
    }
    then(onResolve, onReject) {
      // then原则：只存储回调函数，不执行回调函数
      // 链式调用
      return new Promise((resolve, reject) => {
        let onResolveFn = (val) => {
          let res = onResolve && onResolve(val)
          if(res instanceof Promise) {
            res.then(resolve)
          } else {
            resolve(res)
          }
        }
        let onRejectFn = (err) => {
          reject(err)
        }
        this.resolveFnQueue.push(onResolveFn)
        this.rejectFnQueue.push(onReject)
      })
    }
    static resolve(val) {
      return new Promise(resolve => {
        resolve(val)
      })
    }
    static reject(err) {
      return new Promise((undefined, reject) => {
        reject(err)
      })
    }
    static all(list) {
      // 所有函数都resolve才返回的结果列表
      return new Promise((resolve, reject) => {
        let resArr = []
        list.forEach(item => {
          item.then(res => {
            resArr.push(res)
            if(resArr.length === list.length) {
              resolve(resArr)
            }
          },err => {
            reject('err')
          })
        })
      })
    }
    static allSettled(list) {
      return new Promise((resolve, reject) => {
        let resArr = []
        list.forEach(item => {
          item.then(res => {
            resArr.push(res)
            if(resArr.length === list.length) {
              resolve(resArr)
            }
          }, err => {
            resArr.push(err)
            if(resArr.length === list.length) {
              resolve(resArr)
            }
          })
        })
      })
    }
    static race(list) {
      return new Promise((resolve,reject) => {
        list.forEach(item => {
          item.then(res => {
              resolve(res)
          }, err => {
            reject(err)
          })
        })
      })
    }
    finally(cb) {
      this.then(cb)
    }
    catch(cb) {
      this.then((undefined, err) => {
        cb && cb(err)
      })
    }
  }
```