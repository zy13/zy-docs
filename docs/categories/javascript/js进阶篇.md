### [js数组reduce方法](https://segmentfault.com/a/1190000010731933)

#### 基本概念
>reduce为数组中的每个元素依次执行回调函数

语法：array.reduce(callback[, initialValue])
* callback, 执行数组中的每个值，包含四个参数
  - `previousValue` 上一次调用回调返回的值，或者提供的初始值
  - `currentValue` 数组中当前被处理的元素
  - `index` 当前元素在数组中的索引
  - `array` 调用reduce的数组
* initialValue, 作为第一次调用callback的第一个参数


#### 简单应用

```js
const arr = [10, 120, 1000]
const reducer = (sum, item) => sum + item
const total = arr.reduce(reducer, 0) // arr.reduce(reducer,{sum:0})一维数据叠加的简写
```

#### 进阶应用
>使用reduce方法可以使用多维度的数据叠加, 例如{sum:0,totalInEuros:0,totalInYen:0},这时候需要相应的逻辑进行处理

```js
const EVENTS = ["click", "focus", "blur", "keyup", "keydown", "keypress"]
const listeners = EVENTS.reduce(
  (res, type) => ((res[type] = event => this.$emit(type, event)), res),
  {}
)

// 回调函数的等价实现
function cb = (res, type) => {
  const a = res[type] = event => this.$emit(type, event)
  const b = res
  return (a, b) // 等价于return b
}

// listeiners等价写法
const listeners = EVENTS.reduce(cb,{})

// 输出结果: 依次给EVENTS中的元素初始化函数体
```




