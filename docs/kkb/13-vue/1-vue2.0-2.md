## 1、注册组件

### [组件](https://cn.vuejs.org/v2/guide/components.html)特点

- 可复用
- 组件与`new Vue()`实例接受的选项相同：
  - data，computed，watch，methods以及生命周期钩子等
- data必须是一个函数
  - 每个实例可以维护一份被返回对象的独立的拷贝
  - 对象的数据类型为引用类型，若使用对象，多个实例会共享一个对象，会导致赋值问题
- 注册组件
  - 全局`Vue.component('Foo', Foo)`
  - 局部`components: {Bar}`
  - 必须只有一个root节点（vue3可以拥有多个）

- 组件的组织：树形结构

![组件](./imgs/components.png)

```js
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
  <div id="app"></div>
  <script>
    // 注册组件 1.全局 2.局部
    // 注意：1.data 2.只能有一个根节点

    const Bar = {
      template: '<div>Bar</div>'
    }

    const Foo = {
      // 局部注册
      components: {
        Bar
      },
      data() {
        return {
          count: 1
        }
      },
      template: `<div>
        {{count}}
        <Bar></Bar>
        </div>`
    }

    // 全局注册：组件要注册之后才可以调用
    Vue.component('Foo', Foo)

    const app = new Vue({
      el: '#app',
      data: {
        msg: 'hello'
      },
      // 只能有一个根节点
      template: `<div>
        <Foo></Foo>
        <Foo></Foo>
      </div>`
    })
  </script>
</body>

</html>
```


## 2、生命周期

每个 Vue 实例在被创建时都要经过一系列的初始化过程
- 设置数据监听
- 编译模板
- 将实例挂载到 DOM 
- 在数据变化时更新 DOM等

[生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)的this上下文指向调用它的实例。
- 不要使用箭头函数，因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致`Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

![生命周期](./imgs/lifecycle.png)


```js

```