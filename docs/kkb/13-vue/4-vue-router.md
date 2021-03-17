### 目标
- 掌握 `vue-router` 的应用

## 1、单页面应用 SPA
单页Web应用（single page application）, 实现了更新视图而不重新请求页面，即无刷新请求页面。
### 特点
- 只加载单个 html 页面
- 动态更新
- 更好的用户体验
- 重前端

## 2、vue-router

vue-router的官方文档：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

- Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。
- **本质** 就是建立起`url`和页面之间的映射关系

### 安装

- **vue-cli**<br>
  `vue add @vue/router` 或者`npm add vue-router -S`
- 手动<br>
	`npm i vue-router`

### 对象

- `router`：路由实例对象
- `route`：[路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)<br>
	一个路由对象 (route object) 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

### 使用路由

- 1、`Vue`使用插件`vue-router`

  `Vue`中使用`vue-router`，可以为路由指定组件挂载的DOM位置，并且可以将路由对象和路由实例对象挂载到Vue实例对象中，从而让整个应用都有路由功能。通过`this.$route`访问当前路由的信息，通过`this.$router`访问路由器

  ```js
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  // 使用vue-router插件-让整个应用都有路由功能
  Vue.use(VueRouter)
  ```

- 2、将组件 (components) 映射到路由 (routes)，即配置组件和路由的映射关系
  ```js
  // 每个路由映射一个组件
  {
    path: '/home',
    component: ComponentName
  }
  ```
- 3、将路由实例对象挂载到Vue的根实例中，让整个应用都有路由功能，并通过`this.$routes`和`this.$router`访问

```js
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

- 4、告诉 `Vue Router` 在哪里渲染它们，即指定路由映射的组件的渲染位置
  ```html
  <template>
    <div id="app">
      <router-view></router-view>
    </div>
  </template>
  ```

### 路由懒加载

[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)，即路由被访问到的时候才加载其映射的组件。其**原理**是结合Vue异步组件（`import()`函数导入的组件，返回`Promise`对象）和`webpack`的代码分割功能。

```js
// 使用import() -> Promise
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [
    { 
      path: '/foo',
      component: Foo
      // component: () => import('../views/Foo.vue') // 路由懒加载
    }
  ]
})
```

### 路由实例对象`push`和`replace`的区别

`$router`中有`push`和`replace`方法，前者存储方式是栈存储，后者存储方式是单个变量，替换后就没有前后历史记录了:
- `this.$router.push`后，通过this.router.back()可以回退到上一页
- `this.$router.replace`后，通过this.router.back()会报404或者其他域的页面
### 路由重定向 `redirect`

```js
  {
    path: '/home',
    redirect: '/'
  },
```
### 路由别名 `alias`

```js
  // 设置别名后，可以通过别名访问组件
  {
    path: '/',
    alias: '/heihei',
    component: Home
  },

  // http://localhost:8080/#/heihei
  // http://localhost:8080/#/
```
## 3、动态路由

[动态路由](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)

### 响应路由参数的变化

[响应路由参数的变化](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)，包括`params`、`query`、`hash`等的变化

- 关于参数`params`的变化

当使用路由参数时，例如从 `/user/1` 导航到 `/user/2`，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 `watch` (监测变化) `$route` 对象：

```js
// 耦合度高，一般情况下不推荐使用
<template>
  <div>
    user-{{id}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route?.params?.id
    }
  },
  mounted () {
    console.log('mounted', this.$route)
  },
  watch: {
    // 2、路由参数变化，通过watch检测$route的变化
    $route (to, from) {
      console.log('to', to)
      console.log('from', from)
      // 3、获取路由参数
      console.log('params', this.$route.params)
      this.id = this.$route?.params?.id
    }
  }
}
</script>
```
- `jquery`参数发生变化，通过当前路由对象`$route.jquery`获取

```js
// `http://localhost:8080/#/user/1?name=zy`
data () {
  return {
    name: this.$route?.query?.name
  }
},
watch: {
  // 2、路由参数变化，通过watch检测$route的变化
  $route (to, from) {
    console.log('to', to)
    console.log('from', from)
    // 3、获取路由参数
    this.name = this.$route?.query?.name
  }
}
```

- 匹配优先级：谁先定义的，谁的优先级就最高

## 4、路由组件传参

[路由组件传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)的目的是解耦。

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

- **`props`属性**
	- `boolean`
	- `object`
	- `function`
  ```js
  import Vue from 'vue'
  import VueRouter from 'vue-router'

  const Detail = () => import('../views/Detail.vue')

  Vue.use(VueRouter)

  const routes = [
    // 1、路由组件传参：在路由配置时候添加props，
    // 在相应的组件添加props属性获取相应的参数
    {
      path: '/detail/:id',
      name: 'detail',
      props: (route) => {
        // route -> 当前路由对象
        console.log('props', route)
        return {
          id: route.params.id
        }
      },
      component: Detail
    }
  ]

  const router = new VueRouter({
    routes
  })

  export default router

  ```
  ```html
  <template>
    <div>
      id: {{id}}
    </div>
  </template>
  <script>
  export default {
    props: ['id']
  }
  </script>

  ```

## 5、嵌套路由

[嵌套路由](https://router.vuejs.org/zh/guide/essentials/nested-routes.html)，相对应的就是多个组件之间相互嵌套。其中有一个`<view-router>`最顶层的出口，渲染最高级路由匹配的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`，要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置。

### 配置`children`

- 参数与`routes`配置的数组一样
- 可以嵌套多层路由
- 相对应要配置嵌套的 `<router-view>`出口


- **注意**：以 `/` 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径

  ```js
  // 嵌套路由的配置
  import Vue from 'vue'
  import VueRouter from 'vue-router'

  const Foo = () => import('../views/Foo.vue')
  const Bar = () => import('../views/Bar.vue')
  const User = () => import('../views/User.vue')
  const Detail = () => import('../views/Detail.vue')

  Vue.use(VueRouter)

  const routes = [
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [ // 嵌套第一层
        {
          path: 'foo',
          name: 'foo',
          component: Foo,
          children: [ // 嵌套第二层
            {
              path: 'detail/:id',
              name: 'detail',
              component: Detail,
              props: (route) => {
                return {
                  id: route.params.id
                }
              }
            }
          ]
        },
        {
          path: 'bar',
          name: 'bar',
          component: Bar
        }
      ]
    }
  ]

  const router = new VueRouter({
    routes
  })

  export default router

  ```

  ```html
  <!-- 父组组件 user.vue -->
  <template>
    <div>
      user-{{id}}-name-{{name}}
      <button @click="handleToFoo">to Foo</button>
      <button @click="handleBack">back</button>
      <router-view></router-view>
    </div>
  </template>
  ```

  ```html
  <!-- 子组件 Foo.vue -->
  <template>
    <div>
      Foo
      <button @click="handleToDetail">to Detail</button>
      <button @click="handleBack">back</button>
      <router-view></router-view>
    </div>
  </template>
  ```

    ```html
  <!-- 子组件 Detail.vue -->
  <template>
    <div>
      detail-id: {{id}}
      <button @click="handleBack">back</button>
    </div>
  </template>
  <script>
  export default {
    props: ['id'],
    methods: {
      handleBack () {
        this.$router.back()
      }
    }
  }
  </script>
  ```

## 6、命名路由

[命名路由](https://router.vuejs.org/zh/guide/essentials/named-routes.html)通过一个名称来标识一个路由，在链接一个路由或者在路由跳转时显得更加方便。`<router-link>`本质是 创建 `a` 标签来定义导航链接。

- 在`routes`中配置路由
  ```js
  const router = new VueRouter({
    routes: [
      {
        path: '/user/:id',
        name: 'user',
        component: User
      }
    ]
  })
  ```

- 链接到一个命名路由，使用`router-link`的`to`属性传一个对象
  ```html
  <router-link :to="{ name: 'user' }">to user</router-link>
  ```

- 调用 router.push()
  ```js
  this.$router.push({
    name: 'user'
  })
  ```

## 7、命名视图

[命名视图](https://router.vuejs.org/zh/guide/essentials/named-views.html#%E5%B5%8C%E5%A5%97%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE)，可以在界面中拥有多个单独的视图，而不是只有一个单独的出口。

- `<router-view></router-view>` 没有设置名字，那么默认为 default。
- 一个路由 -> 多个视图 -> 多个组件
  ```js
  import Vue from 'vue'
  import VueRouter from 'vue-router'

  const Home = () => import('../views/Home.vue')
  const Foo = () => import('../views/Foo.vue')
  const Bar = () => import('../views/Bar.vue')
  const routes = [
    // 命名视图，name为视图名称，没有的话为默认视图
    {
      path: '/',
      name: 'home',
      components: {
        default: User,
        foo: Foo,
        bar: Bar
      }
    }
  ]
  const router = new VueRouter({
    routes
  })

  export default router
  ```

## 8、编程式导航


除了`<router-link>`的声明式导航，还有一种叫[编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)，其本质是借助$router的实例方法实现的。

`router => this.$router`

- `router.push()`方法

  ```js

  // 字符串
  router.push('home')

  // 对象
  router.push({ path: 'home' })

  // 命名的路由
  router.push({ name: 'user', params: { userId: '123' }})

  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})

  ```

  **注意**：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。
  取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path

  ```js
  const userId = '123'
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  router.push({ path: `/user/${userId}` }) // -> /user/123
  // 这里的 params 不生效
  router.push({ path: '/user', params: { userId }}) // -> /user
  ```
  
	
-	`router.replace()`替换路由

它不会向 `history` 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 `history` 记录

-	`router.back()`
-	`router.go(n)`

## 9、操作`History`


Vue的History操作与[浏览器的History的API](https://developer.mozilla.org/en-US/docs/Web/API/History)是很像的:
- `router.push` -> `window.history.pushState`
- `router.replace` -> `window.history.replaceState`
- `router.go` -> `window.history.go`

`Vue Router` 的导航方法(`push`、 `replace`、 `go`)在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致。

## 9、导航守卫

[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)也称路由守卫，主要用来通过跳转或取消的方式守卫导航

路由守卫本质是在不断阶段拦截路由进行逻辑处理的钩子，分为全局的、单个路由独享的、组件级别的

- 全局前置守卫
- 全局解析守卫
- 全局后置钩子
- 路由独享的守卫
- 组件内的守卫

### 全局前置守卫


### 完整的导航解析流程
导航被触发。
在失活的组件里调用 `beforeRouteLeave` 守卫。
调用全局的 `beforeEach` 守卫。
在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
在路由配置里调用 `beforeEnter`。
解析异步路由组件。
在被激活的组件里调用 `beforeRouteEnter`。
调用全局的 `beforeResolve` 守卫 (2.5+)。
导航被确认。
调用全局的 `afterEach` 钩子。
触发 `DOM` 更新。
调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。


路由导航**本质**就是钩子hook，包括：<br>
`beforeEach、afterEach、beforeEnter、beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave`

- 1、全局前置守卫`beforeEach`
  ```js
  router.beforeEach((to, from, next => {
    // to目标
    // from来源
    // next() 执行下一步
  })) 
  ```
- 2、全局后置钩子`afterEach`
  ```js
  router.afterEach((to, from => {
    // to目标
    // from来源
  })) 
  ```
- 3、路由独享的守卫 `beforeEnter`
      
- 4、组件内的守卫
  - beforeRouteEnter
  - beforeRouteUpdate: 接口请求
  - beforeRouteLeave
### 整体流程
- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。


## 10、路由元信息 meta

[路由元信息](https://router.vuejs.org/zh/guide/advanced/meta.html)通过配置 `meta` 字段。

## 10、路由模式

- hash # 
- history
  - https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
  - 后端设置

