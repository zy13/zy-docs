[比较运算符](https://www.wangdoc.com/javascript/operators/comparison.html)

## 1、概述
比较运算符用于比较两个值的大小，然后返回一个布尔值，表示是否满足指定的条件。**比较运算符可以比较各种类型的值，不仅仅是数值**。`JavaScript` 一共提供了`8`个比较运算符，分成**相等比较和非相等比较**。
- 对于**非相等**的比较，算法是先看两个运算子是否都是**字符串**，如果是的，就按照**字典顺序**比较（实际上是比较 `Unicode` 码点）
- 否则，将两个运算子都转成**数值**，再比较数值的**大小**。
```js
> 大于运算符
< 小于运算符
<= 小于或等于运算符
>= 大于或等于运算符
== 相等运算符
=== 严格相等运算符
!= 不相等运算符
!== 严格不相等运算符
```

## 2、非相等运算符：字符串的比较
字符串**按照字典顺序进行比较**。
- `JavaScript` 引擎内部首先比较首字符的 `Unicode` 码点。如果相等，再比较第二个字符的 `Unicode` 码点，以此类推。
- 所有字符都有 `Unicode` 码点，因此汉字也可以比较
```js
'cat' > 'dog' // false
'cat' > 'catalog' // false

// 小写的c的 Unicode 码点（99）
// 大写的C的 Unicode 码点（67）
'cat' > 'Cat' // true'

// “大”的 Unicode 码点是22823
// “小”是23567
'大' > '小' // false
```
## 3、非相等运算符：非字符串的比较
如果两个运算子之中，至少有一个不是字符串，需要分成以下两种情况。
### （1）原始类型值
如果两个运算子**都是原始类型的值，则是先转成数值再比较**。

**任何值（包括`NaN`本身）与`NaN`使用非相等运算符进行比较，返回的都是`false`。**
```js
// 字符串和布尔值都会先转成数值，再进行比较

5 > '4' // true
// 等同于 5 > Number('4')
// 即 5 > 4

true > false // true
// 等同于 Number(true) > Number(false)
// 即 1 > 0

2 > true // true
// 等同于 2 > Number(true)
// 即 2 > 1

// 任何值与NaN比较，返回的都是false
1 > NaN // false
1 <= NaN // false
'1' > NaN // false
'1' <= NaN // false
NaN > NaN // false
NaN <= NaN // false
```
### （2）对象
如果运算子是**对象，会转为原始类型的值，再进行比较**。

对象转换成原始类型的值，算法是先调用`valueOf`方法；如果返回的还是对象，再接着调用`toString`方法，然后**照字典顺序进行**，逐个字符的`Unicode`码进行比较。
```js
// 运算子是对象，会转为原始类型的值，再进行比较
var x = [2];
x > '11' // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () { return '1' };
x > '11' // false
// 等同于 [2].valueOf() > '11'
// 即 '1' > '11'

// 两个对象之间的比较
[2] > [1] // true
// 等同于 [2].valueOf().toString() > [1].valueOf().toString()
// 即 '2' > '1'

[2] > [11] // true
// 等同于 [2].valueOf().toString() > [11].valueOf().toString()
// 即 '2' > '11'

{ x: 2 } >= { x: 1 } // true
// 等同于 { x: 2 }.valueOf().toString() >= { x: 1 }.valueOf().toString()
// 即 '[object Object]' >= '[object Object]'
```

## 4、严格相等运算符 ===
严格相等运算符（`===`）比较两个值是否为“同一个值”，如果两个值不是同一类型，严格相等运算符（`===`）直接返回`false`。
- **不同类型的值**。如果两个值的类型不同，直接返回`false`。
- **同一类的原始类型值**。值相同就返回`true`，值不同就返回`false`。
- **复合类型值**。两个复合类型（对象、数组、函数）比较它们是否指向同一个地址。
- **undefined 和 null**。`undefined`和`null`与自身严格相等。
```js
// 数值的1与字符串的“1”、布尔值的true与字符串"true"，因为类型不同，结果都是false。
1 === "1" // false
true === "true" // false

// 十进制的1与十六进制的1，因为类型和值都相同，返回true
1 === 0x1 // true

// NaN与任何值都不相等（包括自身）。另外，正0等于负0。
NaN === NaN  // false
+0 === -0 // true

// 分别比较两个空对象、两个空数组、两个空函数，结果都是不相等
// 运算符两边的空对象、空数组、空函数的值，都存放在不同的内存地址
{} === {} // false
[] === [] // false
(function () {} === function () {}) // false

// 如果两个变量引用同一个对象，则它们相等。
// 对于两个对象的比较，严格相等运算符比较的是地址，而大于或小于运算符比较的是值
var v1 = {};
var v2 = v1;
v1 === v2 // true

// 前两个比较的是值，最后一个比较的是地址
var obj1 = {};
var obj2 = {};
obj1 > obj2 // false
obj1 < obj2 // false
obj1 === obj2 // false

// undefined和null与自身严格相等
undefined === undefined // true
null === null // true

// 变量声明后默认值是undefined，因此两个只声明未赋值的变量是相等的
var v1;
var v2;
v1 === v2 // true
```
## 5、严格不相等运算符 !==
“严格不相等运算符”（!==），它的算法就是**先求严格相等运算符的结果，然后返回相反值**。
```js
// 感叹号!是求出后面表达式的相反值
1 !== '1' // true
// 等同于
!(1 === '1')
```
## 6、相等运算符 == 不建议使用
相等运算符（`==`）**比较两个值是否相等**。比较不同类型的数据时，相等运算符会先将数据进行类型转换，然后再用严格相等运算符比较。
- **原始类型值**。原始类型的值会转换成数值再进行比较。
- **对象与原始类型值比较**。对象（这里指广义的对象，包括数组和函数）与原始类型的值比较时，**对象转换成原始类型的值**，再进行比较。先调用对象的`valueOf()`方法，如果得到原始类型的值，就按照上一小节的规则，互相比较；如果得到的还是对象，则再调用`toString()`方法，得到字符串形式，再进行比较。
- **undefined 和 null**。`undefined`和`null`只有与自身比较，或者互相比较时，才会返回`true`；与其他类型的值比较时，结果都为`false`。
- **相等运算符的缺点**。相等运算符隐藏的类型转换，会带来一些违反直觉的结果。
```js
// 将字符串和布尔值都转为数值，然后再进行比较

1 == true // true 
// 等同于 1 === Number(true)

0 == false // true
// 等同于 0 === Number(false)

2 == true // false
// 等同于 2 === Number(true)

2 == false // false
// 等同于 2 === Number(false)

'true' == true // false
// 等同于 Number('true') === Number(true)
// 等同于 NaN === 1

'' == 0 // true
// 等同于 Number('') === 0
// 等同于 0 === 0

'' == false  // true
// 等同于 Number('') === Number(false)
// 等同于 0 === 0

'1' == true  // true
// 等同于 Number('1') === Number(true)
// 等同于 1 === 1

'\n  123  \t' == 123 // true 因为字符串转为数字时，省略前置和后置的空格

// 数组与数值的比较
// JavaScript 引擎会先对数组[1]调用数组的valueOf()方法，由于返回的还是一个数组，
// 所以会接着调用数组的toString()方法，得到字符串形式，再按照上一小节的规则进行比较。
[1] == 1 // true

// 数组与字符串的比较
[1] == '1' // true
[1, 2] == '1,2' // true

// 对象与布尔值的比较
[1] == true // true
[2] == true // false


// obj是一个自定义了valueOf()和toString()方法的对象。
// 这个对象与字符串'foo'进行比较时，会依次调用valueOf()和toString()方法，
// 最后返回'foo'，所以比较结果是true。
const obj = {
  valueOf: function () {
    console.log('执行 valueOf()');
    return obj;
  },
  toString: function () {
    console.log('执行 toString()');
    return 'foo';
  }
};
obj == 'foo'
// 执行 valueOf()
// 执行 toString()
// true

// undefined和null只有与自身比较，或者互相比较时，才会返回true
undefined == undefined // true
null == null // true
undefined == null // true

// 与其他类型的值比较时，结果都为false。
false == null // false
false == undefined // false
0 == null // false
0 == undefined // false


// 这些表达式都不同于直觉，很容易出错
// 因此建议不要使用相等运算符（==），最好只使用严格相等运算符（===）
0 == ''             // true
0 == '0'            // true

2 == true           // false
2 == false          // false

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```
## 7、不相等运算符 !=
相等运算符有一个对应的“不相等运算符”（`!=`），它的算法就是**先求相等运算符的结果，然后返回相反值**。
```js
1 != '1' // false
// 等同于
!(1 == '1')
```