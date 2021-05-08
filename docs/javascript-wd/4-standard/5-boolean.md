[Boolean 对象](https://www.wangdoc.com/javascript/stdlib/boolean.html)

### 概述

`Boolean`对象是 `JavaScript` 的三个包装对象之一。作为构造函数，它主要用于生成布尔值的包装对象实例。
```js
// 变量b是一个Boolean对象的实例，它的类型是对象，值为布尔值true。
var b = new Boolean(true);
typeof b // "object"
b.valueOf() // true

// false对应的包装对象实例，布尔运算结果也是true
// false对应的包装对象实例是一个对象，进行逻辑运算时，被自动转化成布尔值true
// 因为所有对象对应的布尔值都是true
if (new Boolean(false)) {
  console.log('true');
} // true

// 实例的valueOf方法，则返回实例对应的原始值，本例为false
if (new Boolean(false).valueOf()) {
  console.log('true');
} // 无输出
```

### Boolean 函数的类型转换作用
`Boolean`对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。这时`Boolean`就是一个单纯的工具方法。
```js
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false

// 得到true的情况，都值得认真记住
Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true

// 使用双重的否运算符（!）也可以将任意值转为对应的布尔值。
!!undefined // false
!!null // false
!!0 // false
!!'' // false
!!NaN // false

!!1 // true
!!'false' // true
!![] // true
!!{} // true
!!function(){} // true
!!/foo/ // true

// 对于一些特殊值，Boolean对象前面加不加new，会得到完全相反的结果
if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) {
  console.log('true');
} // true

if (Boolean(null)) {
  console.log('true');
} // 无输出

if (new Boolean(null)) {
  console.log('true');
} // true
```