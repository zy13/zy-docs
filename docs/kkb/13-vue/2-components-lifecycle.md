## 1、注册组件

### [组件](https://cn.vuejs.org/v2/guide/components.html)特点

- 可复用
- 组件与`new Vue()`实例接受的选项相同：
  - data，computed，watch，methods以及生命周期钩子等
- data必须是一个函数
  - 每个实例可以维护一份被返回对象的独立的拷贝
  - 对象的数据类型为引用类型，若使用对象，多个实例会共享一个对象，会导致赋值问题

  注意：一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。
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


### 创建

此阶段进行各种初始化，如数据初始化、事件初始化、生命周期初始化等。在此阶段进行异步请求来获取数据。

### 挂载

此阶段进行编译模板，将实例vm(视图模型)挂载到真实的DOM(文本对象模型)中，视图呈现。可以对DOM进行操作。

注意：此阶段不适合异步请求获取数据，因为实例挂载完成后，会因数据变化发生重绘，而提高渲染开销，性能会受到影响。

* 父组件与子组件的挂载顺序

父组件包含子组件的情况，父组件创建完成后，子组件开始创建，然后挂载，子组件全部挂载完成后，再轮到父组件挂载。

### 更新

在组件数据发生变化时更新DOM，比如响应式属性、计算属性等发生变化时。

### 销毁

组件在条件隐藏`<Bar v-if="false"></Bar>`情况下，组件销毁。

### 各组件生命周期的执行顺序

- 组件的创建（调用）顺序：先父后子；
- 组件的挂载（渲染）顺序：先子后父；
- 组件的销毁操作：先父后子；
- 销毁完成：先子后父。

- 加载渲染过程
  `父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted`
- 子组件更新过程
  `父beforeUpdate->子beforeUpdate->子updated->父updated`
- 父组件更新过程
  `父 beforeUpdate -> 父 updated`
- 销毁过程
  `父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`

- 单个组件
```js
<A v-if="showA">{{msg}}</A>
//1、A组件创建->挂载，执行的钩子顺序：beforeCreate、created、beforeMount、mounted
//2、msg数据变化，触发更新钩子：beforeUpdate、updated
//（虚拟DOM重新渲染，并且发生变化的部分更新到DOM中）
//3、showA由true变为false：触发组件中的销毁钩子beforeDestroy、destroyed
//4、showA由false变为true：触发1过程的钩子
```

- 嵌套组件并列多个组件
```js
<A>
  <B v-if="showB"></B>
  <C v-if="showC"></C>
</A>
// 1、创建->挂载，钩子执行顺序：
//   A-beforeCreate -> A-created -> A-beforeMount ->
//   B-beforeCreate -> B-created -> B-beforeMount ->
//   C-beforeCreate -> C-created -> C-beforeMount ->
//   B-mounted -> A-mounted ->  A-mounted

// 2、showB=false，触发钩子顺序:
//   A-beforeUpdate -> B-beforeDestroy -> B-destroyed -> A-updated
//   showB由false变为true，触发:
//   A-beforeUpdate -> B-beforeCreate -> B-created -> B-beforeMount -> B-mounted -> A-updated
```

- 异步请求数据在created阶段，做好数据准备，为下一阶段打基础
- mounted阶段实例挂载到DOM，任何数据变化都会发生重绘，产生额外的渲染开销，所以需要在渲染DOM做好数据初始化和计算准备。

## 3、单向数据流：props

[props](https://cn.vuejs.org/v2/guide/components-props.html): 父组件与子组件的通信方式

- 单向数据流：父组件 -> 子组件
- 写在子组件实例中，解构父组件传过来的数据
- props中所有属性均不可在子组件中修改
- props为数组形式时：每个元素都是一个属性，无法获取属性类型
- props为对象形式：
  - 可以指定属性类型`type`，
  - 设置默认值`default`，
  - 自定义校验器`validator(val)`

```js
const Foo = {
  // 1、数组形式，每个元素都是一个变量没有指定的属性类型，难以知道父组件传入的数据类型
  // props: ['msg', 'num'], 
  // 2、对象形式，[key: type-object]形式，每个key为属性名，值为类型对象，指定key的类型，且
  // props: {
  //   msg: String,
  //   num: Number
  // },
  props: {
    msg: String,
    num: {
      type: Number,
      default: 9, // 默认值
      validator(val) { // 自定义校验器custom validator
        if (val === 9) {
          return true
        } else {
          alert('传入数据有误')
          return false
        }
      }
    },
    name: {
      type: String,
      default () { // 默认值写成函数形式
        return 'zy'
      }
    },
    test: String
  },
  data() {
    return {
      // msg: 'Foo'
    }
  },
  template: `<h1>{{msg}} {{num}} {{name}}</h1>`
}
Vue.component('Foo', Foo)

const app = new Vue({
  el: '#app',
  data: {
    msg: 'hello world'
  },
  // 父组件与子组件的通信
  template: `<div>
      <Foo msg="abc" :num='9'></Foo>
    </div>`
})

window.app = app
```

## 4、监听子组件事件 $emit 

`$emit`，用于监听子组件上的事件，或者自定义事件

```html
<body>
  <div id="app">
    <!-- myclick事件 -->
    <Foo @myclick="handleClick"></Foo>
    <div>{{msg}} {{count}}</div>
  </div>
</body>

<script>
  const Foo = {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      handleClick() {
        this.count++
        // 触发子组件的myclick事件
        this.$emit('myclick', this.count)
      }
    },
    template: `
      <div>
        Foo
        <button @click="handleClick">click hear</button>
      </div>
    `
  }
  Vue.component('Foo', Foo)
  const app = new Vue({
    el: '#app',
    data: {
      msg: 'hello world',
      count: 0
    },
    methods: {
      handleClick(val) {
        console.log(val);
        this.count = val
      }
    },
  })

  window.app = app
</script>
```

## 5、组件上使用 v-model

在组件上使用双向绑定指令[v-modle](https://cn.vuejs.org/v2/guide/components.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)，可以自定义事件，创建支持v-model的自定义输入组件

- 实现单个数据的双向绑定

```html
<input v-model="showFoo">
<!-- 等价于 -->
<input :value="showFoo" @input="showFoo=$event">
```

- 使用自定义的v-model
```html
<body>
  <div id="app">
    <Foo v-model="showFoo"></Foo>
  </div>
</body>

<script>
  const Foo = {
    props: ['visible'], // 接收showFoo的值
    // 绑定自定义事件
    model: {
      prop: 'visible', // 默认为value
      event: 'close' // 默认为input
    },
    methods: {
      handleClose() {
        this.$emit('close', false)
      }
    },
    template: `
      <div v-if="visible">
        Foo
        <button @click="handleClose">close Foo</button>
      </div>
    `
  }
  Vue.component('Foo', Foo)
  new Vue({
    el: '#app',
    data: {
      showFoo: true
    }
  })
</script>
```

- 使用默认的v-model
```html
<body>
  <div id="app">
    <Foo v-model="showFoo"></Foo>
  </div>
</body>

<script>
  const Foo = {
    props: ['value'], // 接收showFoo的值
    // 默认的model不需要写
    methods: {
      handleClose() {
        this.$emit('close', false)
      }
    },
    template: `
      <div v-if="value">
        Foo
        <button @click="handleClose">close Foo</button>
      </div>
    `
  }
  Vue.component('Foo', Foo)
  new Vue({
    el: '#app',
    data: {
      showFoo: true
    }
  })
</script>
```

### 存在问题

- 一次只能变更一个基本类型的数据，如String、Number、Boolean
- 自定义组件中使用`v-model`进行数据双向绑定，会带来维护上的问题
  - 子组件可以变更父组件
  - 父组件和子组件都没有明显的变更来源

## 6、修饰符 .sync

为解决自定义组件使用v-model带来的局限性（一次只能变更一个基础类型的数据问题），vue2.3引入了[修饰符 .sync](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)，
使用`update:myPropName`模式出发事件，取代自定义组件上的v-model，实现复杂数据的双向绑定

例如，在一个包含title属性的子组件中，用以下表达式对其赋新值：<br>
`this.$emit('update:title', newTitle)`<br>

父组件可以监听相应的事件，并根据需要更新一个本地的（父组件上的）属性：<br>
```html
<sub-component v-bind:title.sync="obj.title" v-on:update:title="obj.title='$event'"></sub-component>
<!-- 缩写为 -->
<sub-component :title.sync="doc.title"></sub-component>
```

### 用一个对象设置多个属性
`.sync`和`v-bind`配合使用
```html
<sub-component v-bind:obj.sync="obj"></sub-component>
<!-- 简写为 -->
<sub-component :obj.sync="obj"></sub-component>

<!-- 子组件出发更新 -->
<script>
  // props: ['obj']
  this.$emit('update:obj',this.obj)
</script>
```
对象中的每一个属性都是作为一个独立的prop传给子组件，然后各自添加用于更新的v-on监听器`v-on:update:propertyName`。


**注意**：
- 带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用 
  - 例如 `v-bind:title.sync=obj.title + ‘!’”` 是无效的
- 将`v-bind.sync`用于字面量的对象上，是无法工作的
  - 例如`v-bind:obj.sync=”{ title: obj.title }”`，由于复杂表达式的边缘情况难以考虑

```html
<body>
  <div id="app">
    {{obj.title}}---{{obj.name}}
    <!-- 双向绑定对象 -->
    <Foo :obj.sync="obj"></Foo>
  </div>
</body>

<script>
  const Foo = {
    // 接收对象
    props: ['obj'],
    // 深度观察对象
    watch: {
      obj: {
        handler(n, o) {
          this.$emit('update:obj', this.obj)
        },
        deep: true
      }
    },
    template: `
      <div>
        Foo: {{obj.title}}---{{obj.name}}
        <input type="text" v-model="obj.title">
        <input type="text" v-model="obj.name">
      </div>
    `
  }
  Vue.component('Foo', Foo)
  new Vue({
    el: '#app',
    data: {
      obj: {
        title: 'my-component',
        name: 'zy'
      }
    }
  })
</script>
```


## 7、插槽 slot

通过[插槽元素`<slot>`](https://cn.vuejs.org/v2/guide/components-slots.html)可以向组件指定的位置传递内容，也就是内容分发。

### 新指令[v-slot](https://cn.vuejs.org/v2/api/#v-slot)

- 默认插槽
```html
<template v-slot></template>
<template v-slot="obj">{{obj.name}}</template>
```

- 具名插槽
```html
<template v-slot:first></template>
```

- 接受属性的具名插槽
```html
<template v-slot:first="obj">
{{obj.name}}
</template>
<!-- 使用解构 -->
<template v-slot:first="{name}">
{{name}}
</template>
```

### `v-slot`缩写 #

```html
<template #first></template>
<template #first="obj"></template>
```

```html
<body>
  <div id="app">
    root app
    <Foo>
      <!-- 默认 -->
      {{msg}}
      <!-- 或者 -->
      <!-- <template v-slot>新指令</template> -->
      <!-- 旧指令-具名插槽（已废弃） -->
      <!-- <template slot="first">first slot</template> -->
      <!-- 旧指令-作用域插槽 -->
      <!-- <template slot="second" slot-scope="obj">
        {{obj.title}}--{{obj.user}}---{{obj.age}}
      </template> -->
      <!-- 新指令-具名插槽 -->
      <!-- <template v-slot:first>new--first--slot</template> -->
      <!-- 缩写 -->
      <template #first>缩写：new--first--slot</template>
      <!-- 新指令-作用域插槽 -->
      <template #second="obj">
        缩写--new: {{obj.title}}--{{obj.user}}---{{obj.age}}
      </template>
    </Foo>
  </div>
</body>

<script>
  const Foo = {
    data() {
      return {
        obj: {
          title: 'my foo',
          user: 'zy'
        }
      }
    },
    template: `
    <div>
      <div>
        Foo--默认插槽:
        <slot></slot>
      </div>
      <div>
        Foo--具名插槽:
        <slot name="first"></slot>
      </div>
      <div>
        Foo--作用域插槽:
        <slot name="second" :title="obj.title" age="13" :user="obj.user"></slot>
      </div>
    </div>
  `
  }
  Vue.component('Foo', Foo)
  new Vue({
    el: '#app',
    data: {
      msg: 'hello world'
    }
  })
</script>
```

### [已经废弃的语法](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%BA%9F%E5%BC%83%E4%BA%86%E7%9A%84%E8%AF%AD%E6%B3%95)

就语法的具名插槽、作用域插槽语法已经被废除，不过vue还在支持，新的语法使用v-slot指令

- 旧语法的作用域插槽`slot-scope`无法解构属性名为`name`的值，因为与具名插槽的`name`属性有冲突
## 8、混入对象 mixin

[mixin](https://cn.vuejs.org/v2/guide/mixins.html#%E5%9F%BA%E7%A1%80)

- 混入对象存在的问题[vue3解决]
  - 1.来源未知
  - 2.命名冲突

```js
// 鼠标移动逻辑
const MousemoveMixin = {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    handleMouseMove(e) {
      this.x = e.pageX
      this.y = e.pageY
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  destroyed() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  },
}
// mixin问题 1.来源未知 2.命名冲突
const Foo = {
  mixins: [MousemoveMixin],
  template: `
    <div>
      Foo
      {{x}}--{{y}}
    </div>
  `
}
Vue.component('Foo', Foo)
const app = new Vue({
  el: '#app',
  template: `
    <Foo></Foo>
  `
})
```

## 9、自定义指令

[自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html#ad)使用场景：对普通DOM元素进行底层操作。比如当页面加载时，该元素将获得焦点，即聚焦输入框。

注意：
- `autofocus` 在移动版 `Safari` 上不工作
- 代码复用和抽象的主要形式是组件
- 核心功能默认的内置指令`v-model`和`v-show`

```html
<body>
  <div id="app">
    Foo
    <input type="text" v-focus>
    <Foo></Foo>
  </div>
</body>

<script>
  // 注册一个全局自定义指令
  Vue.directive('focus', {
    // 绑定元素：只调用一次，可以进行一次性的初始化设置
    bind(el, data) {
      // el直接插入DOM
      console.log(el, data)
    },
    // 绑定的元素插入到 DOM 中
    inserted(el, data) {
      // mounted
      console.log(data)
      // 聚焦元素
      el.focus()
    },
    // 更新
    update() {

    },
    componentUpdate() {

    },
    // 解绑：只调用一次
    unbind() {

    }
  })
  // 注册局部指令：组件接受directives选项：
  const Foo = {
    template: `
      <div>
        <input name="a" v-focus></input>
        <input name="a" ></input>
      </div>
    `
  }
  Vue.component("Foo", Foo);
  const app = new Vue({
    el: '#app'
  })
</script>
```

## 10、练习

- 实现组件 PhotoItem 封装展示图片的逻辑
 - 可通过 props 传入图片路径 imgUrl
 - 可通过 props 传入图片名称 imgName

```js
const PhotoItem = {
  props: ['imgUrl', 'imgName'],
  mounted() {
    this.showImg()
  },
  methods: {
    showImg() {
      const img = document.createElement('img')
      img.src = this.imgUrl
      img.alt = this.imgName
      img.onload = function () {
        document.querySelector('.img-container').appendChild(img)
      }
    }
  },
  template: `
    <div class="img-container"></div>
  `
}
Vue.component('PhotoItem', PhotoItem)
const app = new Vue({
  el: '#app',
  data: {
    imgUrl: './avatar.jpg',
    imgName: 'avatar.jpg'
  },
  template: `<PhotoItem :imgUrl="imgUrl" :imgName="imgName"></PhotoItem>`
})
```