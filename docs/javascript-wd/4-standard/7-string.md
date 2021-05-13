[String对象](https://www.wangdoc.com/javascript/stdlib/string.html)

## 1、概述
`String`对象是 `JavaScript` 原生提供的三个包装对象之一，用来生成字符串对象。
- 字符串对象是一个类似数组的对象（很像数组，但不是数组）。
- 除了用作构造函数，`String`对象还可以当作工具方法使用，将任意类型的值转为字符串。
```js
// 变量s1是字符串，s2是对象
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"

// s2.valueOf方法返回原始字符串
s2.valueOf() // "abc"

// 字符串abc对应的字符串对象，有数值键（0、1、2）和length属性，所以可以像数组那样取值。
new String('abc')
// String {0: "a", 1: "b", 2: "c", length: 3}
(new String('abc'))[1] // "b"

// 将布尔值true和数值5，分别转换为字符串
String(true) // "true"
String(5) // "5"
```

## 2、String.fromCharCode()
`String.fromCharCode()`方法的参数是一个或多个数值，代表 `Unicode` 码点，返回值是这些码点组成的字符串。
- 该方法不支持 `Unicode` 码点大于`0xFFFF`的字符，即传入的参数不能大于`0xFFFF`（即十进制的 `65535`）。
- 码点大于`0xFFFF`的字符占用四个字节，而 `JavaScript` 默认支持两个字节的字符。
- 码点大于`0xFFFF`的字符的四字节表示法，由 `UTF-16` 编码方法决定。
```js
// 参数是一个或多个数值，代表 `Unicode` 码点
// 返回值是这些码点组成的字符串
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111) // "hello"

// 参数0x20BB7大于0xFFFF，导致返回结果出错
// 0x20BB7对应的字符是汉字𠮷
// 参数值大于0xFFFF，就会忽略多出的位
String.fromCharCode(0x20BB7)
// "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
// true

// 把`0x20BB7`拆成两个字符表示
String.fromCharCode(0xD842, 0xDFB7)
// "𠮷"
```

## 3、String.prototype.length
`String.prototype.length`是String对象的实例属性，返回字符串的长度。
```js
'abc'.length // 3
```

## 4、String.prototype.charAt()
`charAt`方法**返回指定位置的字符**，参数是从`0`开始编号的位置。
```js
// 参数是字符的小标
// 返回下标对应的字符
var s = new String('abc');
s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"

// 这个方法完全可以用数组下标替代
'abc'.charAt(1) // "b"
'abc'[1] // "b"

// 如果参数为负数，或大于等于字符串的长度，charAt返回空字符串。
// 如果用数组下标代替，则返回undefined
'abc'.charAt(-1) // ""
'abc'.charAt(3) // ""
'abc'[-1] // ""
'abc'[3] // ""
```

## 5、String.prototype.charCodeAt()
`charCodeAt()`方法返回字符串指定位置的 `Unicode` 码点（十进制表示），相当于`String.fromCharCode()`的逆操作。
```js
// 参数是下标
// 返回下标对应字符的unicode码
// abc的1号位置的字符是b，它的 Unicode 码点是98
'abc'.charCodeAt(1) // 98
// 逆操作
String.fromCharCode(98) // "b"

// 没有任何参数，charCodeAt返回首字符的 Unicode 码点
'abc'.charCodeAt() // 97

// 如果参数为负数，或大于等于字符串的长度，charCodeAt返回NaN
'abc'.charCodeAt(-1) // NaN
'abc'.charCodeAt(4) // NaN
```

## 6、String.prototype.concat()
`concat`方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
```js
var s1 = 'abc';
var s2 = 'def';
s1.concat(s2) // "abcdef"
s1 // "abc"

// 该方法可以接受多个参数。
'a'.concat('b', 'c') // "abc"

// 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接。
// concat方法将参数先转成字符串再连接，所以返回的是一个三个字符的字符串。
// 作为对比，加号运算符在两个运算数都是数值时，不会转换类型，所以返回的是一个两个字符的字符串。
var one = 1;
var two = 2;
var three = '3';
''.concat(one, two, three) // "123"
one + two + three // "33"
```

## 6、String.prototype.slice()
`slice()`方法用于**从原字符串取出子字符串并返回，不改变原字符串**。
```js
// - 第一个参数是子字符串的开始位置。
// - 第二个参数是子字符串的结束位置（不含该位置）。
'JavaScript'.slice(0, 4) // "Java"

// - 如果省略第二个参数，则表示子字符串一直到原字符串结束。
'JavaScript'.slice(4) // "Script"

// - 如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"
'JavaScript'.slice(-2, -1) // "p"

// - 如果第一个参数大于第二个参数（正数情况下），`slice()`方法返回一个空字符串。
'JavaScript'.slice(2, 1) // ""
```

## 7、String.prototype.substring() - 不建议
`substring`方法用于从原字符串取出子字符串并返回，不改变原字符串，跟`slice`方法很相像。
```js
// - 第一个参数表示子字符串的开始位置。
// - 第二个位置表示结束位置（返回结果不含该位置）。
'JavaScript'.substring(0, 4) // "Java"

// 如果省略第二个参数，则表示子字符串一直到原字符串的结束。
'JavaScript'.substring(4) // "Script"

// 如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。
// 调换substring方法的两个参数，都得到同样的结果
'JavaScript'.substring(10, 4) // "Script"
// 等同于
'JavaScript'.substring(4, 10) // "Script"

// 如果参数是负数，substring方法会自动将负数转为0。
// 参数-3会自动变成0
'JavaScript'.substring(-3) // "JavaScript"

// // 由于第二个参数小于第一个参数，会自动互换位置，所以返回Java。
'JavaScript'.substring(4, -3) // "Java"
// 相当于
'JavaScript'.substring(0, 4)  // "Java"
```

## 8、String.prototype.substr()
`substr`方法用于**从原字符串取出子字符串并返回，不改变原字符串**，跟`slice`和`substring`方法的作用相同。
```js
// 第一个参数是子字符串的开始位置（从0开始计算）
// 第二个参数是子字符串的长度
'JavaScript'.substr(4, 6) // "Script"

// 如果省略第二个参数，则表示子字符串一直到原字符串的结束。
'JavaScript'.substr(4) // "Script"

// 如果第一个参数是负数，表示倒数计算的字符位置
'JavaScript'.substr(-6) // "Script"

// 如果第二个参数是负数，将被自动转为0，因此会返回空字符串。
// 参数-1自动转为0，表示子字符串长度为0
'JavaScript'.substr(4, -1) // ""
```

## 9、String.prototype.indexOf()，String.prototype.lastIndexOf() 
`indexOf`方法用于**确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置**。如果返回`-1`，就表示不匹配。
```js
// 第一个参数指定字符
'hello world'.indexOf('o') // 4
'JavaScript'.indexOf('script') // -1

// 第二个参数，表示从该位置开始向后匹配。
'hello world'.indexOf('o', 6) // 7
```
`lastIndexOf`方法的用法跟`indexOf`方法一致，主要的区别是`lastIndexOf`从尾部开始匹配，`indexOf`则是从头部开始匹配。
```js
'hello world'.lastIndexOf('o') // 7

// 第二个参数表示从该位置起向前匹配
'hello world'.lastIndexOf('o', 6) // 4
```

## 10、String.prototype.trim()
`trim`方法用于**去除字符串两端的空格，返回一个新字符串，不改变原字符串**。
```js
'  hello world  '.trim() // "hello world"

// 该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）
'\r\nabc \t'.trim() // 'abc'
```

## 11、String.prototype.toLowerCase()，String.prototype.toUpperCase()
```js
// toLowerCase方法用于将一个字符串全部转为小写
// 返回一个新字符串，不改变原字符串
'Hello World'.toLowerCase() // "hello world"

// toUpperCase则是全部转为大写
// 返回一个新字符串，不改变原字符串
'Hello World'.toUpperCase() // "HELLO WORLD"
```

## 12、String.prototype.match()
`match`方法用于**确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串**。
```js
// 返回一个数组
// 成员为匹配的第一个字符串
'cat, bat, sat, fat'.match('at') // ["at"]
'cat, bat, sat, fat'.match('xt') // null

// 返回的数组还有index属性和input属性
// 别表示匹配字符串开始的位置和原始字符串。
var matches = 'cat, bat, sat, fat'.match('at');
matches // ["at", index: 1, input: "cat, bat, sat, fat", groups: undefined]
matches.index // 1
matches.input // "cat, bat, sat, fat"

// match方法还可以使用正则表达式作为参数
// 参数为正则表达式
// 返回一个数组
// 数组成员为匹配的第一个或者多个字符串，取决于正则表达式匹配的修饰符
// 若是修饰符为g，则返回的数组没有index属性和input属性
var matches1 = 'cat, bat, sat, fat'.match(/at/)
var matches2 = 'cat, bat, sat, fat'.match(/at/g)
matches1 // ["at", index: 1, input: "cat, bat, sat, fat", groups: undefined]
matches2 // ["at", "at", "at", "at"]
```

## 13、String.prototype.search()，String.prototype.replace()
`search`方法的用法基本等同于`indexOf`，但是**返回值为匹配的第一个位置**。如果没有找到匹配，则返回`-1`。
```js
'cat, bat, sat, fat'.search('at') // 1

// search方法还可以使用正则表达式作为参数
'cat, bat, sat, fat'.search(/at/g) // 1
```
`replace`方法用于**替换匹配的子字符串，一般情况下只替换第一个匹配**（除非使用带有`g`修饰符的正则表达式）。
```js
// 第一个参数为被替换的字符串
// 第二个参数为替换的内容
'aaa'.replace('a', 'b') // "baa"

// 如果被替换的字符串找不到，返回原字符串
'aaa'.replace('c', 'b') // "aaa"

// replace方法还可以使用正则表达式作为参数
// 全局匹配时，替换所有匹配的字符
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"
```

## 14、String.prototype.split()
`split`方法按照给定规则**分割字符串，返回一个由分割出来的子字符串组成的数组**。
```js
// 参数为分割的字符
// 返回一个数组
'a|b|c'.split('|') // ["a", "b", "c"]

// 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]

// 如果省略参数，则返回数组的唯一成员就是原字符串。
'a|b|c'.split() // ["a|b|c"]

// 如果满足分割规则的两个部分紧邻着,即两个分割符中间没有其他字符
// 则返回数组之中会有一个空字符串。
'a||c'.split('|') // ['a', '', 'c']
'a|||c'.split('|') // ["a", "", "", "c"]

// 如果满足分割规则的部分处于字符串的开头或结尾,即它的前面或后面没有其他字符
// 则返回数组的第一个或最后一个成员是一个空字符串
'|b|c'.split('|') // ["", "b", "c"]
'a|b|'.split('|') // ["a", "b", ""]

// split方法还可以接受第二个参数，限定返回数组的最大成员数。
// split方法的第二个参数，决定了返回数组的成员数。
'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // ["a"]
'a|b|c'.split('|', 2) // ["a", "b"]
'a|b|c'.split('|', 3) // ["a", "b", "c"]
'a|b|c'.split('|', 4) // ["a", "b", "c"]

// split方法还可以使用正则表达式作为参数
'a|b|c'.split(/\|/)  // ["a", "b", "c"]
```

## 15、String.prototype.localeCompare()
`localeCompare`方法用于比较两个字符串，它返回一个整数。
```js
// 如果小于0，表示第一个字符串小于第二个字符串
'apple'.localeCompare('banana') // -1

// 如果等于0，表示两者相等
'apple'.localeCompare('apple') // 0

// 如果大于0，表示第一个字符串大于第二个字符串。
// 考虑自然语言的排序情况，将B排在a的前面
'B'.localeCompare('a') // 1
'B' > 'a' // false

// 第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较。
// de表示德语,ä小于z，所以返回-1
// sv表示瑞典语,ä大于z，所以返回1
'ä'.localeCompare('z', 'de') // -1
'ä'.localeCompare('z', 'sv') // 1
```