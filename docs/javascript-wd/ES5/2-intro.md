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
`instanceof`运算符返回一个布尔值，表示对象是否为某个构造函数的实例。**它的原理是检查右边构造函数的`prototype`属性，是否在左边对象的原型链上。**

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

## 4、Object.prototype.toString 方法
`toString`方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。
```js
// 对于一个对象调用toString方法，会返回字符串[object Object]，该字符串说明对象的类型
var o1 = new Object();
o1.toString() // // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"
```
字符串`[object Object]`本身没有太大的用处，但是通过自定义`toString`方法，可以让对象在自动类型转换时，得到想要的字符串形式。
```js
var obj = new Object();
obj.toString = function () {
  return 'hello';
};
// 当对象用于字符串加法时，会自动调用toString方法
obj + ' ' + 'world' // "hello world"
```

数组、字符串、函数、`Date` 对象都分别部署了自定义的`toString`方法，覆盖了`Object.prototype.toString`方法。
```js
// 数组、字符串、函数、Date 对象调用toString方法，并不会返回[object Object]
// 因为它们都自定义了toString方法，覆盖原始方法。

[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString() // "Tue Apr 27 2021 09:29:07 GMT+0800 (中国标准时间)"
```

### toString() 的应用：判断数据类型
`Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型。
```js
// 调用空对象的toString方法，结果返回一个字符串object Object
// 其中第二个Object表示该值的构造函数
// 十分有用的判断数据类型的方法。
var obj = {};
obj.toString() // "[object Object]"
```
由于实例对象可能会自定义`toString`方法，覆盖掉`Object.prototype.toString`方法，所以为了得到类型字符串，最好直接使用`Object.prototype.toString`方法。通过函数的`call`方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。
```js
// value值调用Object.prototype.toString方法
Object.prototype.toString.call(value)

// 不同数据类型返回值
// 数值：返回[object Number]。
// 字符串：返回[object String]。
// 布尔值：返回[object Boolean]。
// undefined：返回[object Undefined]。
// null：返回[object Null]。
// 数组：返回[object Array]。
// arguments 对象：返回[object Arguments]。
// 函数：返回[object Function]。
// Error 对象：返回[object Error]。
// Date 对象：返回[object Date]。
// RegExp 对象：返回[object RegExp]。
// 其他对象：返回[object Object]。

Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
```
`Object.prototype.toString`方法准确度更高的类型判断函数
```js
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

type({}); // "object"
type([]); // "array"
type(5); // "number"
type(null); // "null"
type(); // "undefined"
type(/abcd/); // "regex"
type(new Date()); // "date"
```
在上面这个`type`函数的基础上，还可以加上专门判断某种类型数据的方法。
```js
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}) // true
type.isNumber(NaN) // true
type.isRegExp(/abc/) // true
```

## 5、确定一个值的类型的三种方法
`JavaScript` 有三种方法，可以确定一个值到底是什么类型
```bash
- `typeof` 运算符
- `instanceof` 运算符
- `Object.prototype.toString` 方法
```
- `typeof`运算符可以返回一个**值的数据类型**。
- `instanceof` 运算符返回一个**布尔值**，且只能用于对象，不适用原始类型的值。
- `Object.prototype.toString`方法返回**对象的类型字符串**
  ```js
  Object.prototype.toString.call(value)
  ```