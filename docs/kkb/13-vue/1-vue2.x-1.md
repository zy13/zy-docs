vue官网：[https://vuejs.org/](https://vuejs.org/)
vue-中文网：[https://cn.vuejs.org/](https://cn.vuejs.org/)

### 目标
- 掌握 `mvvm` 开发思想
- 学会 `vue` 基础 api
- 学会看 `vue` 文档

## 1、Vue

- 是一套构建用户页面的**渐进式**Javascript框架
- Vue 被设计为可以**自底向上**逐层应用

### 渐进式

一层一层、一步步来做的事情，由内到外，自底向上--洋葱模型

![渐进式](./imgs/progressive.jpg)

- 声明式渲染-核心
- 组件系统
- 客户端路由
  - vue-router
- 大规模状态管理
  - vuex
- 构建系统
  - vue-cli
  - vue-test-utils

### 思考

一个框架应该是包含的功能多好，还是包含的功能少好？

### Vue安装

(1) **CDN**：用`<script>`引入

```js
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
````

(2) **ES Module**

- 使用cdn

```js
<script type="module">
  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'
</script>
```

- 安装到本地再使用
`npm i vue`
```js
<script type="module">
  import Vue from './node_modules/vue/dist/vue.js'
  console.log(Vue)
</script>
```
### 使用

- 创建hello world

```html
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 方式一：cdn引入 -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <!-- 方式二：ES Module引入 -->
  <!-- <script type="module">
        import Vue from 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'
    </script> -->
</head>

<body>
  <div id="app">{{msg}}</div>
  <!-- 方式三：`npm i vue`下载到本地再通过`ES Module`引入 -->
  <!-- <script type="module">
    import Vue from './node_modules/vue/dist/vue.js'
    console.log(Vue)
  </script> -->
  <script>
    new Vue({
      el: '#app',
      data: {
        msg: 'hello world'
      }
    })
  </script>
</body>

</html>
```

### 核心

Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统(**声明式渲染**)
- 模板
- 数据

## 2、Vue实例

- **vm**

![vm](./imgs/vm.png)

- **数据与方法**
  - $data
    - `$`开头的属性，是public-公有属性，可以随意调用
  - _xxx
    - `_`开头的属性，是private私有属性，不可以随意调用

>![vue-object](./imgs/vue-obj.png)

## 3、插值 v-bind

- `v-bind`缩写为`:`
- 文本
- 属性attribute
- js表达式
### v-bind
绑定数据（表达式）到指定的属性上，`<div v-bind:参数="值/表达式"></div>`，这里的参数就是指定的属性名称。

```html
<body>
  <div id="app" :class="test">{{msg + 'heihei'}}{{test}}</div>  
</body>
<script src="./node_modules/vue/dist/vue.js"></script>
<script>
  // {{}}-文本插值，大胡子语法
  // v-bind => :
  // Vue对象实例化 => app => vm
  const app = new Vue({
    el: '#app', // view视图在哪里？指定视图挂载的域
    data: {
      // 响应式数据：数据变动=>视图变动
      msg: 'hello world',
      test: 'test class'
    }
  })

  // 浏览器端使用
  window.app = app
</script>
```

## 4、事件处理 v-on

- [`v-on`](https://cn.vuejs.org/v2/api/#v-on)，缩写为`@`

### 修饰符
一个指令可以包含的内容包括：
- 指令名称
- 指令值
- 指令参数
- 指令修饰符

`<组件 指令:参数.修饰符1.修饰符2="值" />`

指令`v-on:click`的修饰符包括

```
.stop - 调用 event.stopPropagation()。
.prevent - 调用 event.preventDefault()。
.capture - 添加事件侦听器时使用 capture 模式。
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
```

```html
<body>
  <div id="app">
    {{msg}}{{count}}
    <button v-on:click="handleClick">v-on:click</button>
    <button @click="handleClick">@click</button>
    <button @click="handleClick(1)">click(1)</button>
    <button @click="handleClick(1,$event)">click(1,$event)</button>
    <button @click="count++">count</button>
    <!-- 修饰符once 只触发一次-->
    <button @click.once="count++">count-once</button>
    <!-- 修饰符prevent 阻止默认行为 -->
    <button @click.prevent="count++">count-prevent</button>
  </div>
  <script>
    // v-on注册事件
    // 简写@
    const app = new Vue({
      el: '#app',
      data: {
        // 响应式数据
        msg: 'hello world',
        count: 0
      },
      methods: {
        handleClick(type, e) {
          console.log(type, e)
          console.log('click')
        }
      },
    })

    // 浏览器端使用
    window.app = app
  </script>
</body>
```

## 5、计算属性 computed

- [计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)是依赖于其它属性（响应式属性）的**属性**
- 计算属性书写形式类似于函数，必须返回一个数据
- 计算属性**可缓存**：每次调用时，若依赖的属性没发生变化，使用缓存值，否则重新计算取值
- 计算属性依赖一个或者多个属性，是**一对多**的关系

### [函数对比计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95)

- 函数没有缓存的说法，也不需要依赖属性
- 函数每次调用时，其依赖的属性不管有无变化，每次调用时，都需要计算取值

```html
<body>
  <!-- 倒置显示msg -->
  <!-- 可读性差 -->
  <!-- <div id="app">{{msg.split('').reverse().join('')}}</div> -->
  <!-- 计算输出与函数的区别 -->
  <!-- 函数：每次调用都需要计算取值（因为没有缓存），不管依赖的属性值是否有变化 -->
  <!-- 计算属性：如果依赖的属性没有变化，就使用缓存值，否则重新计算取值 -->
  <div id="app">{{reverseMsg}} --- {{reverseHandle()}}</div>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        msg: 'hello world',
        count: 0
      },
      methods: {
        // 每次调用都需要计算取值（因为没有缓存），不管依赖的属性值是否有变化
        reverseHandle() {
          console.log('methods')
          return this.msg.split('').reverse().join('')
        }
      },
      // 计算属性
      computed: {
        // 函数
        // 计算属性：依赖别的属性的属性 reverseMsg => this.msg(响应式属性)
        // 可缓存：依赖的属性不变，计算属性不需要重新执行
        // 依赖一个或者多个属性
        // 一对多
        // 每次调用：如果依赖的属性没有变化，就使用缓存值，否则重新计算取值
        reverseMsg() {
          console.log('computed')
          // 一定要返回一个数据
          // return this.msg.split('').reverse().join('')
          return this.msg.split('').reverse().join('') + this.count
        }
      }
    })

    // 浏览器端使用
    window.app = app
    // app.reverseMsg app.reverseHandle()调用对比
  </script>
</body>
```

- [计算属性的setter](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%9A%84-setter)

## 6、侦听属性 watch

[侦听器](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)，在数据变化时执行异步或开销较大的操作时使用。


- 1、异步请求数据时候：数据变化时要，需要向服务器获取数据-异步请求
- 2、多个值依赖一个属性的时候：多对一
- 3、`deep` 深度观察: 对象中的某个属性发生变化时
  - 观察对象中指定的key属性
- 4、`immediate: true` 立即执行：true-初始化时候就开始执行，false-等数据发生变化时候才执行

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./node_modules/vue/dist/vue.js"></script>
</head>

<body>
  <div id="app">
    {{msg}}---{{count}}---{{hello1}}---{{hello2}}
    <div>{{color1}}---{{color2}}---{{mixins}}</div>
    <div>{{user.age}}---{{user.name}}</div>
    <button @click="handleClick">click then count increase</button>
  </div>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        msg: 'hello world',
        count: 0,
        hello1: '',
        hello2: '',
        user: {
          name: 'zhangsan',
          age: 20
        },
        color1: 'red',
        color2: 'yellow',
        mixins: ''
      },
      methods: {
        handleClick() {
          this.count++
        },
      },
      watch: {
        // 1、异步请求数据：app.count = 1时
        count: async function (n, o) {
          console.log('watch-count', n, o);
          // todo -> fetch -> data
          let res = await fetch('http://localhost:8888')
          let msg = await res.text()
          this.msg = msg
        },
        // 2、多个值去依赖一个属性时：多对一
        msg(n, o) {
          console.log('watch-msg', n)
          this.hello1 = n + '1'
          this.hello2 = n + '2'
        },
        // 3、deep-深度观察: 对象中的属性发生变化时
        user: {
          // 若没有deep，当user中的属性发生改变时，此函数不会执行
          handler(n, o) {
            console.log('user', n, o)
          },
          deep: true
        },
        // 只观察对象中指定的key属性
        'user.age': {
          handler(n, o) {
            console.log('user.age', n, o)
          }
        },
        // 4、立即执行: true-数据在初始化时候就开始执行，false-等mixins发生变化时候才执行
        mixins: {
          handler(n, o) {
            console.log('mixins')
            this.color1 = `color1 ${n}`
            this.color2 = `color2 ${n}`
          },
          immediate: true
        }
      }
    })

    // 浏览器端使用
    window.app = app
  </script>
</body>

</html>
```

- 服务端处理异步请求-基于http模块

```js
const http = require('http')
const server = http.createServer()

server.on('request', async (req, res) => {
  console.log(req.url)
  // 解决跨域
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })
  res.write('hello')
  res.end()
})

server.listen(8888)
```

### [计算属性对比侦听属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)

使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态

## 7、条件渲染：v-if 和 v-show

### [条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)

- **`v-if`**
  - `v-else-if`
  - `v-else`
- **`v-show`**
  - 由`display`控制显示
### `v-if`对比`v-show`

- `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的`事件监听器`和`子组件`适当地`被销毁和重建`。
- `v-if`也是**惰性的**：如果在初始渲染时条件为假，则什么也不做，直到**条件第一次变为真时，才会开始渲染条件块**。
- `v-show`就简单得多: 不管初始条件是什么，**元素总是会被渲染**，并且只是简单地**基于 CSS 进行切换**。
- 一般来说，`v-if`有更高的切换开销，而 `v-show` 有更高的初始渲染开销。

因此：
- 如果需要非常频繁地切换，则使用 `v-show` 较好；
- 如果在运行时条件很少改变，则使用 `v-if` 较好。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./node_modules/vue/dist/vue.js"></script>
</head>

<body>
  <div id="app">
    {{msg}}
    <div v-if="age===18">你好 {{age}}</div>
    <div v-else-if="age===19">我不好了 {{age}}</div>
    <div v-else>年纪是 {{age}}</div>
    <div v-if="count===1">v-if count === {{count}}</div>
    <div v-show="count===1">v-show count === {{count}}</div>
  </div>
  <script>
    // v-if 如果不匹配的话，dom不会渲染
    // v-if 使用条件少 懒加载，减少首屏渲染开销
    // v-if vs v-show
    // v-show通过css控制显示和隐藏
    // v-show 频繁使用的时候 减少切换开销
    const app = new Vue({
      el: '#app',
      data: {
        msg: 'hello world',
        age: 18,
        count: 0
      }
    })

    window.app = app
  </script>
</body>

</html>
```

## 8、列表渲染 v-for

[列表渲染](https://cn.vuejs.org/v2/guide/list.html)循环指令`v-for`:

- 遍历数组
- 遍历对象
  - 1个参数
    - (val)
  - 2个参数
    - (Val,key)
  - 3个参数
    - (val,key,index)
- 带有 `v-for` 的 `<template>`
  - 循环渲染一段包含多个元素的内容
- `v-for` 和 `v-if` 一同使用时（不推荐）:[官网链接](https://cn.vuejs.org/v2/guide/conditional.html#v-if-%E4%B8%8E-v-for-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8)
  - 设置 `key` 属性： 原地复用，提高效率；diff算法优化

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./node_modules/vue/dist/vue.js"></script>
</head>

<body>
  <div id="app">
    <h3>对象循环</h3>
    <ul>
      <!-- v-for object -->
      <li v-for="val in users">{{val.name}}--{{val.age}}</li>
      <li v-for="(val, key) in users">{{val}}---{{key}}</li>
      <li v-for="(val, key, index) in users">{{val}}---{{key}}---{{index}}</li>
    </ul>
    <h3>数组循环</h3>
    <ul>
      <!-- v-for array -->
      <li v-for="item in userList">{{item.name}}--{{item.age}}</li>
      <li v-for="(item,index) in userList">{{item}}---{{index}}</li>
      <!-- v-for v-if同时使用-不推荐-可以将userList替换为一个计算属性，让其返回过滤后的结果-->
      <!-- <li v-for="item in userList" v-if="item.age>=19">{{item.name}}--{{item.age}}</li> -->
      <li v-for="(item,index) in filterAge">{{item.name}}---{{item.age}}---{{index}}</li>
    </ul>
  </div>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        users: {
          1: {
            name: "xiaohong",
            age: 19,
          },

          2: {
            name: "xiaohei",
            age: 20,
          },
        },
        userList: [{
            name: "xiaohong",
            age: 19,
          },
          {
            name: "xiaohei",
            age: 20,
          },
        ],
      },
      computed: {
        filterAge() {
          return this.userList.filter(user => user.age > 19)
        }
      }
    })

    window.app = app
  </script>
</body>

</html>
```

### 为什么要设置[key属性](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)

默认情况下，在渲染 `DOM` 过程中使用 原地复用 ，这样一般情况下会比较高效，但是对于循环列表，特别是依赖某种状态的列表，会有一些问题，我们可以通过 `:key` 属性，来给每个循环节点添加一个标识


## 9、class与style

[官网链接](https://cn.vuejs.org/v2/guide/class-and-style.html)

- **class**
  - 数组写法：`<div :class="['box1', 'box2']"></div>`
  - 对象写法：`<div :class="{'box1': isActive, 'box2': isChecked}"></div>`
  - 计算属性: `return ['blue', this.count === 0 ? 'fontSize' : '']`
- **style**
  - 数组写法: `<div :style="[style1, style2]"></div>`
  - 对象写法: `<div :style=" {width: '100px', height: '100px', background: 'green' }"></div>`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./node_modules/vue/dist/vue.js"></script>
  <style>
    .blue {
      color: blue;
    }

    .fontSize {
      font-size: 50px;
    }
  </style>
</head>

<body>
  <div id="app">
    <div :class="classes1">classes1</div>
    <div :class="classes2">classes2</div>
    <div :class="classesObj1">classes1-obj</div>
    <div :class="classes">classes---{{count}}---计算属性</div>
    <div :style="styleInfo1">styleInfo-array</div>
    <div :style="styleInfo2">styleInfo-object</div>
  </div>
  <script>
    // class -> array object
    const app = new Vue({
      el: "#app",
      data: {
        count: 0,
        // 数组表示 1.字符串数组，每个元素都是一个样式类名
        classes1: [
          'blue',
          'fontSize'
        ],
        // 含有表达式的数组
        classes2: [
          'blue',
          // this.count === 0 ? 'fontSize' : '',
          {
            fontSize: true
          }
        ],
        // 对象表示法,属性名即为样式类名
        classesObj1: {
          blue: true,
          fontSize: true
        },
        // 数组
        styleInfo1: [{
            color: 'yellow'
          },
          {
            fontSize: '60px'
          }
        ],
        styleInfo2: {
          color: 'red',
          fontSize: '60px'
        }
      },
      computed: {
        classes() {
          return ['blue', this.count === 0 ? 'fontSize' : '']
        }
      }
    })

    window.app = app
  </script>
</body>

</html>
```

## 10、表单

- [表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)

- v-model 双向数据绑定(语法糖)
`<input type="text" v-model="title" />`

原理

`<input type="text" @input="handleInput" :value="content" />`

```js
app = new Vue({
  el: "#app",
  data: {
    content: "test",
    isCheck: false,
  },
  methods: {
    handleInput(e) {
      this.content = e.target.value;
    },
  },
});
```

## 11、练习

点击按钮时，count 和 double 会增加
- double 的值为 count 的双倍
- double 需要用 computed 来实现
## 12、课件

[有道云笔记](https://note.youdao.com/web/#/file/WEB22508fda699ec364b0d1f8111ca8fedd/markdown/WEBe462e128dbb9e05872fe03e788b56a16/)