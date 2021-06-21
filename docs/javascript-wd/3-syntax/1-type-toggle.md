[数据类型的转换](https://www.wangdoc.com/javascript/features/conversion.html#%E6%A6%82%E8%BF%B0)

## 1、概述
`JavaScript` 是一种**动态类型语言，变量没有类型限制，可以随时赋予任意值**。如果运算符发现，运算子的类型与预期不符，就会**自动转换类型**。
```js
// y为true时，x是一个数值；y为false时，x是一个字符串
// x的类型没法在编译阶段就知道，必须等到运行时才能知道。
var x = y ? 1 : 'a';

// 减法运算符预期左右两侧的运算子应该是数值，如果不是，就会自动将它们转为数值。
'4' - '3' // 1
```

### 强制转换

强制转换主要指使用`Number()`、`String()`和`Boolean()`三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。

## 2、强制转换 - Number()
使用`Number`函数，可以**将任意类型的值转化成数值**，它要比`parseInt`函数严格很多。
### （1）原始类型值
```js
// 原始类型值的转换规则如下

// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值; 如果不可以被解析为数值，返回 NaN
Number('324') // 324
Number('324abc') // NaN

// 空字符串转为0
Number('') // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0

// 比`parseInt`函数严格很多。
// parseInt逐个解析字符，而Number函数整体转换字符串的类型。
// 只要有一个字符无法转成数值，整个字符串就会被转为NaN
parseInt('42 cats') // 42
Number('42 cats') // NaN

// parseInt和Number函数都会自动过滤一个字符串前导和后缀的空格。
parseInt('\t\v\r12.34\n') // 12
Number('\t\v\r12.34\n') // 12.34
```

### （2）对象
`Number`方法的参数是对象时，将返回`NaN`，除非是包含单个数值的数组。
- 第一步，调用对象自身的`valueOf`方法。如果返回原始类型的值，则直接对该值使用`Number`函数，不再进行后续步骤。
- 第二步，如果`valueOf`方法返回的还是对象，则改为调用对象自身的`toString`方法。如果`toString`方法返回原始类型的值，则对该值使用`Number`函数，不再进行后续步骤。
- 第三步，如果`toString`方法返回的是对象，就报错。
```js
// Number背后的转换规则比较复杂
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5

var obj = {x: 1};
Number(obj) // NaN

// 等同于
// 首先调用obj.valueOf方法, 结果返回对象本身
// 继续调用obj.toString方法，这时返回字符串[object Object]
// 对这个字符串使用Number函数，得到NaN。
if (typeof obj.valueOf() === 'object') {
  Number(obj.toString());
} else {
  Number(obj.valueOf());
}

// 默认情况下，对象的valueOf方法返回对象本身
// 所以一般总是会调用toString方法
// 而toString方法返回对象的类型字符串（比如[object Object]）
Number({}) // NaN

// 如果toString方法返回的不是原始类型的值，结果就会报错
var obj = {
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  }
};

Number(obj) // TypeError: Cannot convert object to primitive value at Number (<anonymous>)


// 返回valueOf方法的值
Number({
  valueOf: function () {
    return 2;
  }
})
// 2

// 返回toString方法的值
Number({
  toString: function () {
    return 3;
  }
})
// 3

// 表示valueOf方法先于toString方法执行
Number({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  }
})
// 2
```

## 3、强制转换 - String()
`String`函数可以将任意类型的值转化成字符串，转换规则如下。
### （1）原始类型值
```js
- 数值：转为相应的字符串。
- 字符串：转换后还是原来的值。
- 布尔值：true转为字符串"true"，false转为字符串"false"。
- undefined：转为字符串"undefined"。
- null：转为字符串"null"。

String(123) // "123"
String('abc') // "abc"
String(true) // "true"
String(undefined) // "undefined"
String(null) // "null"
```

### （2）对象
`String`方法的参数如果是对象，返回一个**类型字符串**；如果是数组，返回该**数组的字符串形式**。`String`方法背后的转换规则，与`Number`方法基本相同，只是互换了`valueOf`方法和`toString`方法的执行顺序。
- （1）先调用对象自身的`toString`方法。如果返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
- （2）如果`toString`方法返回的是对象，再调用原对象的`valueOf`方法。如果`valueOf`方法返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
- （3）如果`valueOf`方法返回的是对象，就报错。
```js
String([1, 2, 3]) // "1,2,3"

// 先调用对象的toString方法，发现返回的是字符串[object Object]，就不再调用valueOf方法了。
String({a: 1}) // "[object Object]"
// 等同于
String({a: 1}.toString()) // "[object Object]"

// 如果toString法和valueOf方法，返回的都是对象，就会报错。
var obj = {
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  }
};
String(obj) // TypeError: Cannot convert object to primitive value

// 通过自定义toString方法，改变返回值
// 返回toString方法的值（数值3）
String({
  toString: function () {
    return 3;
  }
})
// "3"

// 返回的还是toString方法的值（[object Object]）
String({
  valueOf: function () {
    return 2;
  }
})
// "[object Object]"

// toString方法先于valueOf方法执行
String({
  valueOf: function () {
    return 2;
  },
  toString: function () {
    return 3;
  }
})
// "3"
```

## 4、强制转换 - Boolean()
`Boolean()`函数可以将任意类型的值转为布尔值。**所有对象（包括空对象）的转换结果都是true**。
```js
// 除了以下五个值的转换结果为false，其他的值全部为true。
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false

// true和false这两个布尔值不会发生变化。
Boolean(true) // true
Boolean(false) // false

// 所有对象（包括空对象）的转换结果都是true，
// 甚至连false对应的布尔对象new Boolean(false)也是true
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

## 5、自动转换
自动转换的规则是这样的：**预期什么类型的值，就调用该类型的转换函数**。比如，某个位置预期为字符串，就调用`String()`函数进行转换。**如果该位置既可以是字符串，也可能是数值，那么默认转为数值。**

遇到以下三种情况时，`JavaScript` 会自动转换数据类型，即转换是自动完成的，用户不可见。
- 第一种情况，不同类型的数据互相运算。
- 第二种情况，对非布尔值类型的数据求布尔值。
- 第三种情况，对非数值类型的值使用一元运算符（即`+`和`-`）。
```js
// 不同类型的数据互相运算
123 + 'abc' // "123abc"

// 对非布尔值类型的数据求布尔值
if ('abc') {
  console.log('hello')
}  // "hello"

// 对非数值类型的值使用一元运算符
+ {foo: 'bar'} // NaN
- [1, 2, 3] // NaN
```

由于自动转换具有不确定性，而且不易除错，**建议在预期为布尔值、数值、字符串的地方，全部使用`Boolean()`、`Number()`和`String()`函数进行显式转换**。

## 6、自动转换为布尔值
`JavaScript` 遇到预期为布尔值的地方（比如`if`语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用`Boolean()`函数。
```js
// 条件部分的每个值都相当于false，使用否定运算符后，就变成了true。
if ( !undefined
  && !null
  && !0
  && !NaN
  && !''
) {
  console.log('true');
} // true

// 将一个表达式转为布尔值。它们内部调用的也是Boolean()函数。

// 写法一
expression ? true : false

// 写法二
!! expression
```

## 7、自动转换为字符串
`JavaScript` 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串。
```js
// 字符串的自动转换，主要发生在字符串的加法运算时
// 当一个值为字符串，另一个值为非字符串，则后者转为字符串。
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"

// 这种自动转换很容易出错。
// 开发者可能期望返回120，但是由于自动转换，实际上返回了一个字符10020。
var obj = {
  width: '100'
};
obj.width + 20 // "10020"
```

## 8、自动转换为数值
`JavaScript` 遇到预期为数值的地方，就会将参数值自动转换为数值。系统内部会自动调用`Number()`函数。
```js
// 除了加法运算符（+）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值。
// 运算符两侧的运算子，都被转成了数值。
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN

// 一元运算符也会把运算子转成数值。
+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0
```
**注意：null转为数值时为0，而undefined转为数值时为NaN。**