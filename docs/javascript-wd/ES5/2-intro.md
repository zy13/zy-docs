[数据类型概述](https://www.wangdoc.com/javascript/types/general.html)
## 1、简介
`JavaScript` 语言的每一个值，都属于某一种数据类型。

`JavaScript`共有六种数据类型：
```bash
- 数值（`number`）：整数和小数（比如`1`和`3.14`）。
- 字符串（`string`）：文本（比如`Hello World`）。
- 布尔值（`boolean`）：表示真伪的两个特殊值，即`true`（真）和`false`（假）。
- `undefined`：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。
- `null`：表示空值，即此处的值为空。
- 对象（`object`）：各种值组成的集合。

- `ES6` 又新增了第七种 `Symbol` 类型的值，本教程不涉及。
```
- 数值、字符串、布尔值这三种类型，合称为原始类型（`primitive type`）的值，即它们是最基本的数据类型，不能再细分了。
- 至于`undefined`和`null`，一般将它们看成两个特殊值。
- 对象则称为合成类型（`complex type`）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。对象是最复杂的数据类型，又可以分成三个子类型。
  ```bash
  - 狭义的对象（`object`）
  - 数组（`array`）
  - 函数（`function`）
  ```
- 函数其实是处理数据的方法，`JavaScript` 把它当成一种数据类型，可以赋值给变量，这为编程带来了很大的灵活性，也为 `JavaScript` 的“函数式编程”奠定了基础。

## 2、typeof 运算符
`typeof`运算符可以返回一个值的数据类型。
```js
typeof 123 // "number"
typeof '123' // "string"
typeof false // "boolean"
function f() {}
typeof f // "function"
typeof undefined // "undefined"

// 返回对象
typeof null // "object"，null的类型是object，这是由于历史原因造成的
typeof window // "object"
typeof {} // "object"
typeof [] // "object"，数组本质上是一种特殊的对象
```
`typeof`可以用来检查一个没有声明的变量，而不报错
```js
// 变量v没有用var命令声明，直接使用就会报错
v // ReferenceError: v is not defined

// v放在typeof后面，就不报错了，而是返回undefined
typeof v // "undefined"


// 这个特点通常用在判断语句
// 错误的写法
if (v) {
  // ...
}
// ReferenceError: v is not defined

// 正确的写法
if (typeof v === "undefined") {
  // ...
}
```

## 3、instanceof 运算符
`instanceof`运算符返回一个布尔值，表示对象是否为某个构造函数的实例。它的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上。

**注意**：`instanceof`运算符只能用于对象，不适用原始类型的值。
```js
// 对象v是构造函数Vehicle的实例，所以返回true
var v = new Vehicle();
v instanceof Vehicle // true

// 左边是实例对象，右边是构造函数
// 它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上
v instanceof Vehicle
// 等同于
Vehicle.prototype.isPrototypeOf(v) // Vehicle.prototype是否为v实例的原型

// isPrototypeOf()方法是 JavaScript 提供的原生方法，用于检查某个对象是否为另一个对象的原型
```
由于`instanceof`检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回`true`。
```js
// d同时是Date和Object的实例
var d = new Date();
d instanceof Date // true
d instanceof Object // true

// 除了null，任意对象都是Object的实例
// 利用这点可以判断一个值是否为非null的对象
var obj = { foo: 123 };
obj instanceof Object // true
null instanceof Object // false
```
有一种特殊情况，就是左边对象的原型链上，只有`null`对象。这时，`instanceof`判断会失真。
```js
// Object.create(null)返回一个新对象obj，它的原型是null
var obj = Object.create(null);
typeof obj // "object"
obj instanceof Object // false

// 右边的构造函数Object的prototype属性，不在左边的原型链上
// 因此instanceof就认为obj不是Object的实例
// 这是唯一的instanceof运算符判断会失真的情况（一个对象的原型是null）
```

### 判断值的类型
```js
// instanceof运算符判断，变量x是数组，变量y是对象。
var x = [1, 2, 3];
var y = {};
x instanceof Array // true
y instanceof Object // true

// 不适用原始类型的值
var s = 'hello'; // 字符串不是String对象的实例（因为字符串不是对象）
s instanceof String // false

// 对于undefined和null，instanceof运算符总是返回false。
undefined instanceof Object // false
null instanceof Object // false
```
## 2、确定一个值的类型的三种方法
