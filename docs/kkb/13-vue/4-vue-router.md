### 目标
- 掌握 `vue-router` 的应用

## 1、单页面应用 SPA
单页Web应用（single page application）
- 实现：更新视图而不重新请求页面
### 特点
- 只加载单个 html 页面
- 动态更新
- 更好的用户体验
- 重前端

## 2、vue-router

what?
- Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。
- 本质: 就是建立起url和页面之间的映射关系

### 对象

- `router`：路由实例对象
- `route`: 路由对象<br>
	一个路由对象 (route object) 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

### 使用模型

How?
- 将组件 (components) 映射到路由 (routes)
  ```js
  {
    path: '/home',
    component: ComponentName
  }
  ```
- 告诉 `Vue Router` 在哪里渲染它们<br>
  ```html
  <view-roouter></view-roouter>
  ```

### 安装

- **vue-cli**<br>
  `vue add @vue/router`
- 手动<br>
	`npm i vue-router`

### 路由

- 动态路由 
- 路由组件传参
- 嵌套路由
- 命名视图
- 重定向：redirect
- 别名：alias

## 3、动态路由

- 响应路由参数的变化
  - params
	- query
	- hash

- 底层匹配支持库<br>
  `path-to-regexp`

- 匹配优先级<br>
	谁先定义的，谁的优先级就最高

- 复用组件
  -	watch $route
	- beforeRouteUpdate

## 4、路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

- props
	- boolean
	- object
	- function

## 5、嵌套路由

- 父子关系
- children
- 以 `/` 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径

## 6、命名视图

- 兄弟关系
  ```html
  <router-view name="routerName" ></router-view>
  ```

## 7、导航

- 组件: `<router-link to="">`
- 命名路由: 通过路由名称进行导航

## 8、编程式导航
- `this.$router`
	- push: `字符串 | path | name | 对象 | 函数 | 添加`
	-	repleace
			替换
	-	back
	-	go

## 9、路由导航

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

## 10、路由模式

- hash # 
- history
  - https://developer.mozilla.org/zh-CN/docs/Web/API/History_API
  - 后端设置

