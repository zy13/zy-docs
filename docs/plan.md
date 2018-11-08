### components

#### 国内比较流行的框架

>react,vue,angular

#### 优秀的前端组件库

>ant design,element ui, iView

### 管理系统前端开发流程

>脚手架搭建、添加依赖包、配置路由、创建页面、引入组件

### 考虑SEO的情况

>React的ssr框架Next.js, Vue的ssr框架Nuxt.js--同构页面系统

#### 前端组件化开发

>组成页面的一部分，包括js、html、css，设置属性、函数和事件处理等接口供外部调用，对外部来说，组件是一个完全的黑盒子

```js
0、MVVM模式：数据驱动视图
1、拆分功能、封装组件、单独维护
2、例如：vue-router、vuex等
3、一个组件只专注做一件事
4、组件是可配置的，明确输入与输出
5、可配置的考虑范围：字体颜色，图片规则，按钮位置，按钮点击事件的处理等
6、属性值的校验：属性值类型、属性值是否必须
7、组件的生命周期
vue: beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed, errorCapture, errorCaptured
8、父组件与子组件之间的调用
```

模块化与组件化开发
```js
1 模块化注重数据和功能化，目的是解耦合
2 组件化更注重UI
```

组件化与插件的特点
>特点：只把大块的业务界面，拆分成复用性较高的若干小块，然后进行组装；完成复用性比较高得功能；提供属性、函数、事件接口
>场景：页面公用性高的页面部门：比如分页、搜索、弹框、表单等
>目的：提高复用性，提高开发效率，提高代码可维护性

### 数据流

```js
0 数据流管理模式：函数式、不可变、模式化、响应式
1 数据流，单向数据流，双向数据流，vue数据流的方式
2 数据流准则：隔离副作用、全局与局部数据合理规划
```

### [前端自动化](https://juejin.im/post/5a966bd16fb9a0635172a50a)

* [en](https://www.smashingmagazine.com/2018/01/front-end-performance-checklist-2018-pdf-pages/)

```js
1 js, font字体, images大小, rendering速度, css, html, http, client
2 performance matters, improve performance, establish culture long-term
```

>plan, target, goal
>性能瓶颈
>热替换：运行时更新各种模块