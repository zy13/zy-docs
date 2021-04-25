[JavaScript 的基本语法](https://www.wangdoc.com/javascript/basic/grammar.html)

## 1、语句
语句（`statement`）是为了完成某种任务而进行的操作，比如下面就是一行赋值语句。语句以分号结尾，一个分号就表示一个语句结束。多个语句可以写在一行内。
```js
// 先用var命令，声明了变量a，然后将 1 + 3 的运算结果赋值给变量a
var a = 2 + 3
```
`2 + 3` 叫做表达式：指一个为了得到返回值的计算式。表达式不需要分号结尾。

**语句和表达式的区别**
- 前者主要为了进行某种操作，一般情况下不需要返回值
- 后者则是为了得到返回值，一定会返回一个值

## 2、变量

### 概念
变量是对“值”的具名引用，即为“值”起名，引用这个变量名，就等于引用这个值。
```js
// 先声明变量a，然后将数值1“赋值”给变量a。
var a = 1; // 引用变量名a就会得到数值1
var A = 1;

// JavaScript 的变量名区分大小写，A和a是两个不同的变量。
```
`var`是变量声明命令，它表示通知解释引擎，要创建一个变量`a`。

```js
// 变量的声明和赋值，是分开的两个步骤：
var a;
a = 1;

// 变量可以同时声明并赋值
var a = 1
```

**特殊值 undefined**

如果只是声明变量而没有赋值，则该变量的值是`undefined`。
```js
// undefined是一个特殊的值，表示“无定义”。
var a;
console.log(a) // undefined
```

**全局变量**

在顶层作用域中，`var`声明的变量和未声明的变量，都是`window`对象下的属性变量。
```js
var a = 1;
// 基本等同
a = 1;
```

**变量未声明就使用会报错**

```js
// ReferenceError 引用错误
console.log(myVar) // Uncaught ReferenceError: myVar is not defined
```

**变量可以随时更换类型**
```js
// JavaScript 是一种动态类型语言，变量的类型没有限制
var a = 1; // "number"
a = 'hello'; // "string"
```

**声明已存在的变量无效**

第二次声明的时候还进行了赋值，则会覆盖掉前面的值。
```js
// 变量x声明了两次，第二次声明是无效的。
var x = 1;
var x;
x // 1

var x = 2
x // 2
```

## 3、变量提升

**JavaScript 引擎的工作方式**，先解析代码，获取所有被声明的变量，然后再一行一行地运行。

这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做**变量提升**（`hoisting`）。
```js
console.log(a); // undefined
var a = 1;

// 等同于
var a;
console.log(a); // undefined
a = 1;
```
## 4、标识符
**标识符**（`identifier`）指的是用来识别各种值的合法名称。

最常见的标识符就是变量名，以及后面要提到的函数名。

`JavaScript` 语言的标识符对大小写敏感，所以`a`和`A`是两个不同的标识符。

### 标识符命名规则
- 第一个字符，可以是任意 `Unicode` 字母（包括英文字母和其他语言的字母），以及美元符号（`$`）和下划线（`_`）。
- 第二个字符及后面的字符，除了 `Unicode` 字母、美元符号和下划线，还可以用数字`0-9`。
```js
// 合法标识
arg0
_tmp
$elem
π

// 不合法的标识符
1a  // 第一个字符不能是数字
23  // 同上
***  // 标识符不能包含星号
a+b  // 标识符不能包含加号
-d  // 标识符不能包含减号或连词线

// 中文是合法的标识符，可以用作变量名。
var 临时变量 = 1;
```

### 保留字
```js
JavaScript 有一些保留字，不能用作标识符：arguments、break、case、catch、class、
const、continue、debugger、default、delete、do、else、enum、eval、export、extends、
false、finally、for、function、if、implements、import、in、instanceof、interface、
let、new、null、package、private、protected、public、return、static、super、switch、
this、throw、true、try、typeof、var、void、while、with、yield。
```
## 5、注释
源码中被 `JavaScript` 引擎忽略的部分就叫做注释，它的作用是对代码进行解释。

JavaScript 提供两种注释的写法：
- 一种是单行注释，用`//`起头；
- 另一种是多行注释，放在`/*`和`*/`之间。
- `<!--`和`-->`也被视为合法的单行注释：`JavaScript` 可以兼容 `HTML` 代码的注释
```js
// 这是单行注释

/*
 这是
 多行
 注释
*/

// 只有x = 1会执行
// -->只有在行首，才会被当成单行注释
x = 1; <!-- x = 2;
--> x = 3;
```

## 6、区块
`JavaScript` 使用大括号，将多个相关的语句组合在一起，称为“区块”（`block`）。

对于`var`命令来说，`JavaScript` 的区块不构成单独的作用域（`scope`）。
```js
// 使用var命令声明并赋值了变量a，然后在区块外部，变量a依然有效
{
  var a = 1;
}

a // 1
```
- 区块对于`var`命令不构成单独的作用域，与不使用区块的情况没有任何区别
- 在 `JavaScript` 语言中，单独使用区块并不常见，区块往往用来构成其他更复杂的语法结构，比如`for`、`if`、`while`、`function`等。

## 7、条件语句
- `if` 结构：[link](./1-datatype.html#if-结构)
- `if...else` 结构：[link](./1-datatype.html#if-else-结构)
- `switch` 结构：[link](./1-datatype.html#switch-结构)
- 三元运算符 `?:`：[link](./1-datatype.html#三元运算符)
### if 结构
`if`结构先判断一个表达式的布尔值，然后根据布尔值的真伪，执行不同的语句。

所谓布尔值，指的是 `JavaScript` 的两个特殊值，`true`表示真，`false
```js
if (布尔值 or 返回布尔值的表达式)
  语句;

// 或者
if (布尔值 or 返回布尔值的表达式) 语句;
```
- 将相等运算符写成赋值运算符，就会报错，因为常量不能被赋值。
- 优先采用“严格相等运算符”（`===`），而不是“相等运算符”（`==`）
### if...else 结构
`if`代码块后面，还可以跟一个`else`代码块，表示不满足条件时，所要执行的代码。
```js
if (m === 3) {
  // 满足条件时，执行的语句
} else {
  // 不满足条件时，执行的语句
}
```

对**同一个变量进行多次判断**时，多个`if...else`语句可以连写在一起。
```js
if (m === 0) {
  // ...
} else if (m === 1) {
  // ...
} else if (m === 2) {
  // ...
} else {
  // ...
}
```
**else代码块总是与离自己最近的那个if语句配对。**
```js
var m = 1;
var n = 2;

if (m !== 1)
if (n === 2) console.log('hello');
else console.log('world');
```
### switch 结构
### 三元运算符 ?:
## 8、循环语句
while 循环
for 循环
do...while 循环
break 语句和 continue 语句
标签（label）