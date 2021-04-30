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