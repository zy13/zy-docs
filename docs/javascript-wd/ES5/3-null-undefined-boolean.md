[null, undefined 和布尔值](https://www.wangdoc.com/javascript/types/null-undefined-boolean.html)

## 1、null 类型
`1995`年 `JavaScript` 诞生时，最初像 `Java` 一样，只设置了`null`表示"无"。`null`是一个表示“空”的对象，转为数值时为`0`

### 在if语句中，null被自动转为false
```js
if (!null) {
  console.log('null is false');
}
// null is false
```

### null转为数字时，可以自动转为0。
```js
// null转为数字时，自动变成0。
Number(null) // 0
5 + null // 5
```
### null 的不足
- 首先，第一版的 `JavaScript` 里面，`null`就像在 `Java` 里一样，被当成一个对象，`Brendan Eich` 觉得表示“无”的值最好不是对象
- 其次，那时的 `JavaScript` 不包括错误处理机制，`Brendan Eich` 觉得，如果`null`自动转为`0`，很不容易发现错误。

### null 的用法

`null`表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入`null`，表示该参数为空。

比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入`null`，表示未发生错误。

```js
typeof null // "object"
null instanceof Object // false
Object.prototype.toString.call(null) // "[object Null]"
```

## 2、undefined 类型
`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。
```js
Number(undefined) // NaN
5 + undefined // NaN
```
`undefined`表示“未定义”，下面是返回`undefined`的典型场景。
```js
// 变量声明了，但没有赋值
var i;
i // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x;
}
f() // undefined

// 对象没有赋值的属性
var  o = new Object();
o.p // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f() // undefined
```

### 在if语句中，undefined 被自动转为false
```js
if (!undefined) {
  console.log('undefined is false');
}
// undefined is false
```
### undefined 转化为数字时，自动转化为 NaN
```js
Number(undefined) // NaN
5 + undefined // NaN
```

### undefined 用法
```js
typeof undefined // "undefined"
undefined instanceof Object // false
Object.prototype.toString.call(undefined) // "[object Undefined]"
```

## 3、null 和 undefined 的异同

### 相同点
- `null`与`undefined`都可以表示“没有”，含义非常相似
- 在`if`语句中，它们都会被自动转为`false`，相等运算符（`==`）甚至直接报告两者相等。
```js
// 变量a分别被赋值为undefined和null，这两种写法的效果几乎等价。
var a = undefined;
// 或者
var a = null;

if (!undefined) // undefined is false
if (!null) // null is false
undefined == null // true
```

### 区别
- `null`表示“空”的对象，转为数值时为`0`。
- `undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。
- `null`是正常的有效数值，`undefined`不是。
```js
typeof null // 'object'
typeof undefined // 'undefined'

Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"

isFinite(null) // true
isFinite(undefined) // false
isNaN(null) // false
isNaN(undefined) // true
Number(null) // 0
Number(undefined) // NaN
```

## 4、boolean 布尔值
布尔值代表“真”和“假”两个状态。“真”用关键字`true`表示，“假”用关键字`false`表示。布尔值只有这两个值。
```bash
- 前置逻辑运算符： ! (Not)
- 相等运算符：===，!==，==，!=
- 比较运算符：>，>=，<，<=
```

如果 `JavaScript` 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为`false`，其他值都视为`true`。
```js
- undefined
- null
- false
- 0
- NaN
- "" 或 '' // 空字符串

// 布尔值往往用于程序流程的控制
// if命令后面的判断条件，预期应该是一个布尔值，所以 JavaScript 自动将空字符串，转为布尔值false，
// 导致程序不会进入代码块，所以没有任何输出。
if ('') {
  console.log('true');
}
// 没有任何输出
```

### 空数组（[]）和空对象（{}）对应的布尔值，都是true
```js
if ([]) {
  console.log('true');
}
// true

if ({}) {
  console.log('true');
}
// true
```
