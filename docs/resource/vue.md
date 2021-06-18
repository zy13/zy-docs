## ☆ - Vue中computed和watch的区别
- `computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算
值变化才会返回内容。 
 - 一对多：一个属性依赖多个属性
 - 必须要有一个返回值
 - 依赖属性为发生变化，调用缓存的值，否则重新计算
 - 只有函数形式

- `watch` 监听data中属性，属性值发生变化时，就会执行回调，在回调中可以进行一些逻辑操作。
  - 多对一：多个属性依赖一个属性
  - 监听的属性需要在data中初始化
  - 根据使用场景，来使用可以设置一些属性，
  - 函数形式对象形式，对象形式可以设置immediate喝deep属性，分别表示是否立即执行与深层监听

## ☆ - Vue中$route和$router的区别

- `$route` 是当前组件映射的“路由信息对象”，包括 `path`，`params`，`hash`，`query`，`fullPath`，`matched`，`name` 等路由信息参数。

- `$router`是整个应用的“路由实例”对象，包括了路由的跳转方法，钩子函数等。

## V-model的原理是什么？
Vue的**双向数据绑定**是由**数据劫持**结合**发布者订阅者**实现的。 
- 数据劫持是通过**Object.defineProperty()**来劫持对象数据的**setter**和**getter**操作。 在数据变动时作你想做的事

### 原理 

- 通过`Observer`来监听自己的`model`数据变化，通过`Compile`来解析编译模板指令，最终利用`Watcher`搭起`Observer`和`Compile`之间的通信桥梁，达到数据变化->视图更新
- 在初始化`vue`实例时，遍历`data`这个对象，给每一个键值对利用`Object.definedProperty`对`data`的键值对新增`get`和
`set`方法，利用了事件监听`DOM`的机制，让视图去改变数据

## vuex的流程
- 页面通过`mapAction`异步提交事件到`action`。
- `action`通过`commit`把对应参数同步提交到`mutation`。
- `mutation`会修改`state`中对于的值。 
- 最后通过`getter`把对应值跑出去，在页面的计算属性中通过`mapGetter`来动态获取`state`中的值

##  $route 和$router 的区别

- `$route`是“路由信息对象”，包括`path，params，hash，query，fullPath，matched，name`等路
由信息参数。
- `$router`是“路由实例”对象包括了路由的跳转方法，钩子函数等

## react和vue的区别
=> **相同点**： 
- 1.数据驱动页面，提供响应式的试图组件 
- 2.都有virtual DOM,组件化的开发，通过props参数进行父子之间组件传递数据，都实现了webComponents规范 
- 3.数据流动单向，都支持服务器的渲染SSR 
- 4.都有支持native的方法，react有React native， vue有wexx

=> **不同点**： 
- 1.数据绑定：Vue实现了双向的数据绑定，react数据流动是单向的 
- 2.数据渲染：大规模的数据渲染，react更快 
- 3.使用场景：React配合Redux架构适合大规模多人协作复杂项目，Vue适合小快的项目 
- 4.开发风格：react推荐做法jsx + inline style