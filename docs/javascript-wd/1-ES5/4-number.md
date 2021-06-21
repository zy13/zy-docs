[数值](https://www.wangdoc.com/javascript/types/number.html)

## 1、整数和浮点数

`JavaScript` 内部，所有数字都是以`64`位浮点数形式储存，即使整数也是如此。所以，`1`与`1.0`是相同的，是同一个数。

- `JavaScript` 语言的**底层根本没有整数，所有数字都是小数**（`64`位浮点数）
- 容易造成混淆的是，某些运算只有整数才能完成，此时 `JavaScript` **会自动把**`64`**位浮点数，转成**`32`**位整数，然后再进行运算**
- 由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。

```js
1 === 1.0 // true

// 浮点数不是精确的值
0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false
```

## 2、数值的精度

根据国际标准 `IEEE 754`，`JavaScript` 浮点数的`64`个二进制位，从最左边开始，是这样组成的。

- **符号位**决定了一个数的正负，
- **指数部分**决定了数值的大小，
- **小数部分**决定了数值的精度。

```bash
第`1`位：符号位，`0`表示正数，`1`表示负数
第`2`位到第`12`位（共`11`位）：指数部分
第`13`位到第`64`位（共`52`位）：小数部分（即有效数字）
```

### 指数和有效数字

`JavaScript` 提供的**有效数字**最长为`53`个二进制位，即 2<sup>53</sup>。
```js
// 正常情况下，一个数在 JavaScript 内部实际的表示形式。
(-1)^符号位 * 1.xx...xx * 2^指数部分 // 指数部分在0到2047之间

// 有效数字总是`1.xx...xx`的形式，其中`xx..xx`的部分保存在`64`位浮点数之中，最长可能为`52`位。

// 指数部分一共有`11`个二进制位，因此大小范围就是`0`到`2047`（开区间）
// `IEEE 754` 规定，如果指数部分的值在`0`到`2047`之间（不含两个端点），
// 那么有效数字的第一位默认总是`1`，不保存在`64`位浮点数之中。
```

### 数值精度
精度最多只能到`53`个二进制位，这意味着，绝对值小于`2`的`53`次方的整数，即`-2`<sup>53</sup>到`2`<sup>53</sup>，都可以精确表示。

```js
// pow方法：次方；计算次方值
Math.pow(2, 53) // 9007199254740992

// 大于2的53次方的数值，都无法保持精度
Math.pow(2, 53) + 1 // 9007199254740992

Math.pow(2, 53) + 2 // 9007199254740994

Math.pow(2, 53) + 3 // 9007199254740996

Math.pow(2, 53) + 4 // 9007199254740996
```
- 由于`2`<sup>53</sup>是一个`16`位的十进制数值，所以简单的法则就是，**`JavaScript`对`15`位的十进制数都可以精确处理**。
<!-- - 超过`16`位之后的数，全部化为`0`表示，而且遵循四舍五入，即第`17`位满`5`，则向第`16`位进`1`，不满则用`0`表示。 -->
```js
// 大于2的53次方以后，多出来的有效数字（最后三位的111）都会无法保存，变成0。
Math.pow(2, 53)
// 9007199254740992

// 多出的三个有效数字，将无法保存
9007199254740992111
// 9007199254740992000
```

## 3、数值的范围
根据标准，`64`位浮点数的指数部分的长度是`11`个二进制位，意味着指数部分的最大值是`2047`（ 2<sup>11</sup> - 1 ）。

也就是说，`64`位浮点数的指数部分的值最大为`2047`，分出一半表示负数，则 `JavaScript` 能够表示的数值范围为 **2<sup>1024</sup> 到 2<sup>-1023</sup>**（开区间），超出这个范围的数无法表示。
- 如果一个数大于等于 2<sup>1024</sup>，那么就会发生“正向溢出”，即 `JavaScript `无法表示这么大的数，这时就会返回`Infinity`。
- 如果一个数小于等于 2<sup>-1075</sup>（指数部分最小值`-1023`，再加上小数部分的`52`位），那么就会发生为“负向溢出”，即 `JavaScript` 无法表示这么小的数，这时会直接返回`0`。
```js
Math.pow(2, 1024) // Infinity
Math.pow(2, -1075) // 0

var x = 0.5;
for(var i = 0; i < 25; i++) {
  x = x * x;
}
x // 0

Math.pow(0.5,25) // 2.9802322387695312e-8
```
`Number`对象的`MAX_VALUE`和`MIN_VALUE`属性，返回可以表示的具体的最大值和最小值。
```js
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324
```

## 4、数值的表示法
`JavaScript` 的数值有多种表示方法，可以用字面形式直接表示，比如`35`（十进制）和`0xFF`（十六进制）。

### 科学计数法
科学计数法允许字母e或E的后面，跟着一个整数，表示这个数值的指数部分。小写的`e`或者大写的`E`表示`10`的指数，正指数后面的`+`可以省略。
```js
// 123乘以10的3次方
123e3 // 123000

// 123乘以10的-3次方
123e-3 // 0.123

-3.1E+12 // 等同于-3.1e12
```

### 小数点前的数字多于21位，自动用科学计数法表示
小数点前的数字多于`21`位，`JavaScript` 会自动将数值转为科学计数法表示。
```js
1234567890123456789012 // 1.2345678901234568e+21

123456789012345678901  // 123456789012345680000
```

### 小数点后的零多于5个，自动用科学计数法表示
```js
// 小数点后紧跟5个以上的零，
// 就自动转为科学计数法
0.0000003 // 3e-7

// 否则，就保持原来的字面形式
0.000003 // 0.000003
```
## 5、数值的进制
使用字面量（`literal`）直接表示一个数值时，`JavaScript` 对整数提供四种进制的表示方法：十进制、十六进制、八进制、二进制。
```bash
（1）十进制：没有前导`0`的数值。
（2）八进制：有前缀`0o`或`0O`的数值，或者有前导`0`、且只用到`0-7`的八个阿拉伯数字的数值。
（3）十六进制：有前缀`0x`或`0X`的数值。
（4）二进制：有前缀`0b`或`0B`的数值。
```
默认情况下，`JavaScript` 内部会自动将八进制、十六进制、二进制转为十进制
```js
0xff // 0xff -> 15x16+15 = 255
0o377 // 0o377 ->3x8x8+7x8+7 = 255
0b11 // 1x2+1 = 3

// 八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。
// 十六进制出现了字母z、八进制出现数字8、二进制出现数字2，因此报错。
0xzz // SyntaxError: Invalid or unexpected token
0o88 // SyntaxError: Invalid or unexpected token
0b22 // SyntaxError: Invalid or unexpected token
```
通常来说，有前导`0`的数值会被视为八进制，但是如果前导`0`后面有数字`8`和`9`，则该数值被视为十进制。**前导0表示八进制，处理时很容易造成混乱，ES5 的严格模式和 ES6，已经废除了这种表示法**，浏览器为了兼容以前的代码，目前还继续支持这种表示法。
```js
// 浏览器为了兼容以前的代码，目前还继续支持这种表示法。
0888 // 十进制 - 888
0777 // 八进制 - 511 八进制的前导的o可以省略
```
## 6、特殊数值 - 正零和负零
`JavaScript` 的`64`位浮点数之中，有一个二进制位是符号位。这意味着，任何一个数都有一个对应的负值，就连`0`也不例外。

`JavaScript` 内部实际上存在`2`个`0`：一个是`+0`，一个是`-0`，区别就是64位浮点数表示法的符号位不同。它们是等价的。
```js
-0 === +0 // true
0 === -0 // true
0 === +0 // true

// 正零和负零都会被当作正常的0
+0 // 0
-0 // 0
(-0).toString() // '0'
(+0).toString() // '0'

// 唯一有区别的场合是，+0或-0当作分母，返回的值是不相等的。
// 除以正零得到+Infinity，除以负零得到-Infinity
(1 / +0) === (1 / -0) // false
1 / +0 // Infinity
1 / -0 // -Infinity
```

## 7、特殊数值 - NaN
`NaN`是 `JavaScript` 的特殊值，表示“非数字”（`Not a Number`），主要出现在将字符串解析成数字出错的场合。
```js
// 自动将字符串x转为数值，但是由于x不是数值，所以最后得到结果为NaN，表示它是“非数字”
5 - 'x' // NaN

// 一些数学函数的运算结果会出现NaN
Math.acos(2) // NaN
Math.log(-1) // NaN
Math.sqrt(-1) // NaN

// 0除以0也会得到NaN
0 / 0 // NaN

// NaN不是独立的数据类型，而是一个特殊数值,它的数据类型依然属于Number
typeof NaN // 'number'
```

### 运算规则

```js
// `NaN`不等于任何值，包括它本身
NaN === NaN // false

// 数组的indexOf方法内部使用的是严格相等运算符，所以该方法对NaN不成立
[NaN].indexOf(NaN) // -1

// NaN在布尔运算时被当作false
Boolean(NaN) // false

// NaN与任何数（包括它自己）的运算，得到的都是NaN
NaN + 32 // NaN
NaN - 32 // NaN
NaN * 32 // NaN
NaN / 32 // NaN
```
## 8、特殊数值 - Infinity
`Infinity`表示“无穷”，用来表示两种场景。
- 一种是一个正的数值太大，或一个负的数值太小，无法表示；
- 另一种是非`0`数值除以`0`，得到`Infinity`
- `Infinity`有正负之分，`Infinity`表示正的无穷，`-Infinity`表示负的无穷。
```js
// 场景一: 表达式的计算结果太大，超出了能够表示的范围，因此返回Infinity
Math.pow(2, 1024)
// Infinity

// 场景二: 0除以0会得到NaN; 非0数值除以0，会返回Infinity
0 / 0 // NaN
1 / 0 // Infinity

// 非零正数除以-0，会得到-Infinity，负数除以-0，会得到Infinity
Infinity === -Infinity // false
1 / -0 // -Infinity
-1 / -0 // Infinity
```
由于数值正向溢出（`overflow`）、负向溢出（`underflow`）和被`0`除，`JavaScript` 都不报错，所以单纯的数学运算几乎没有可能抛出错误。
```js
// Infinity大于一切数值（除了NaN），-Infinity小于一切数值（除了NaN）
Infinity > 1000 // true
-Infinity < -1000 // true

// Infinity与NaN比较，总是返回false
Infinity > NaN // false
-Infinity > NaN // false

Infinity < NaN // false
-Infinity < NaN // false
```
### 运算规则
```js
// Infinity的四则运算，符合无穷的数学计算规则
5 * Infinity // Infinity
5 - Infinity // -Infinity
Infinity / 5 // Infinity
5 / Infinity // 0

// Infinity加上或乘以Infinity，返回的还是Infinity
Infinity + Infinity // Infinity
Infinity * Infinity // Infinity

// Infinity减去或除以Infinity，得到NaN。
Infinity - Infinity // NaN
Infinity / Infinity // NaN

// 0乘以Infinity，返回NaN
// 0除以Infinity，返回0
// Infinity除以0，返回Infinity。
0 * Infinity // NaN
0 / Infinity // 0
Infinity / 0 // Infinity

// Infinity与null计算时，null会转成0，等同于与0的计算。
null * Infinity // NaN
null / Infinity // 0
Infinity / null // Infinity

// Infinity与undefined计算，返回的都是NaN
undefined + Infinity // NaN
undefined - Infinity // NaN
undefined * Infinity // NaN
undefined / Infinity // NaN
Infinity / undefined // NaN
```
## 9、全局方法 - parseInt()
`parseInt`方法用于将字符串转为十进制的整数。`parseInt`的返回值只有两种可能，要么是一个十进制整数，要么是`NaN`。
- 如果`parseInt`的参数不是字符串，则会先转为字符串再转换。
- 如果字符串以`0x`或`0X`开头，`parseInt`会将其按照十六进制数解析。
- 如果字符串以`0`开头，将其按照`10`进制解析。
- 如果`parseInt`的参数是十六进制或者八进制数值，则先被转化为十进制，然后再转化为字符串。
```js
parseInt('123') // 123
parseInt('0x10') // 16
parseInt('011') // 11

// 如果字符串头部有空格，空格会被自动去除。
parseInt('   81') // 81

// 如果parseInt的参数不是字符串，则会先转为字符串再转换。
parseInt(1.23) // 1
// 等同于
parseInt('1.23') // 1
```
字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。
```js
// parseInt的参数都是字符串，结果只返回字符串头部可以转为数字的部分。
parseInt('8a') // 8
parseInt('12**') // 12
parseInt('12.34') // 12
parseInt('15e2') // 15
parseInt('15px') // 15

// 如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN
parseInt('abc') // NaN
parseInt('.3') // NaN
parseInt('') // NaN
parseInt('+') // NaN
parseInt('+1') // 1
```
对于那些会自动转为**科学计数法**的数字，`parseInt`会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。
```js
parseInt(1000000000000000000000.5) // 1
// 等同于
parseInt('1e+21') // 1

parseInt(0.0000008) // 8
// 等同于
parseInt('8e-7') // 8
```
### 进制转换
`parseInt`方法还可以接受第二个参数（`2`到`36`之间），表示被解析的值的进制，返回该值对应的十进制数。默认情况下，`parseInt`的第二个参数为`10`，即默认是十进制转十进制。
- 如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在`2`到`36`之间，才能得到有意义的结果，超出这个范围，则返回`NaN`。
- 如果第二个参数是`0`、`undefined`和`null`，则直接忽略。
- 如果字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回`NaN`。
- 如果`parseInt`的第一个参数是十六进制或者八进制数值，则会被先转为十进制，再转为字符串，然后再用第二个参数的进制数解读字符串。
```js
parseInt('1000') // 1000
// 等同于
parseInt('1000', 10) // 1000

// 转换指定进制的数
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512

// 超出这个`2`到`36`范围，则返回NaN
parseInt('10', 37) // NaN
parseInt('10', 1) // NaN

// 第二个参数是0、undefined和null，则直接忽略
parseInt('10', 0) // 10
parseInt('10', null) // 10
parseInt('10', undefined) // 10

// 字符串包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值
parseInt('1546', 2) // 1

// 最高位无法转换，则直接返回`NaN`。
parseInt('546', 2) // NaN

// 十六进制的0x11会被先转为十进制的17，再转为字符串。
// 然后，再用36进制或二进制解读字符串17，最后返回结果43和1。
parseInt(0x11, 36) // 43
parseInt(0x11, 2) // 1
// 等同于
parseInt('17', 36)
parseInt('17', 2)

// 011会被先转为字符串9，因为9不是二进制的有效字符，所以返回NaN
parseInt(011, 2) // NaN

// 字符串'011'直接被当做二进制数处理
parseInt('011', 2) // 3
```
**JavaScript 不再允许将带有前缀0的数字视为八进制数，而是要求忽略这个0。但是，为了保证兼容性，大部分浏览器并没有部署这一条规定。**

## 10、全局方法 - parseFloat()
`parseFloat`方法用于将一个字符串转为浮点数。
- 如果字符串符合科学计数法，则会进行相应的转换
- 如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分。
- 如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回`NaN`。
```js
parseFloat('3.14') // 3.14

// 自动过滤字符串前导的空格
parseFloat('\t\v\r12.34\n ') // 12.34

// 对科学计数法进行转换
parseFloat('314e-2') // 3.14
parseFloat('0.0314E+2') // 3.14

// 只返回有效的转换部分
parseFloat('3.14more non-digit characters') // 3.14

// 第一个字符不能转化为浮点数，则返回NaN
parseFloat([]) // NaN
parseFloat('FF2') // NaN
parseFloat('') // NaN
```

### parseFloat的转换结果不同于Number函数
```js
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```
## 11、全局方法 - isNaN()
`isNaN`方法可以用来判断一个值是否为`NaN`。`isNaN`只对数值有效，如果传入其他值，会被先转成数值。
- 传入字符串的时候，字符串会被先转成`NaN`，所以最后返回`true`。
- 使用`isNaN`之前，最好判断一下数据类型。
- 对于对象和数组，`isNaN`也返回`true`。
- 对于空数组和只有一个数值成员的数组，`isNaN`返回`false`。
```js
isNaN(NaN) // true
isNaN(123) // false

// 传入字符串的时候，字符串会被先转成NaN，所以最后返回true
isNaN('Hello') // true
// 相当于
isNaN(Number('Hello')) // true

// 对于对象和数组，`isNaN`也返回`true`
isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true

// 对于空数组和只有一个数值成员的数组，isNaN返回false
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```

```js
// 使用`isNaN`之前，最好判断一下数据类型
function myIsNaN(value) {
  return typeof value === 'number' && isNaN(value);
}

// 判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断。
function myIsNaN(value) {
  return value !== value;
}
```
## 12、全局方法 - isFinite()
`isFinite`方法返回一个布尔值，表示某个值是否为正常的数值。
- 除了`Infinity`、`-Infinity`、`NaN`和`undefined`这几个值会返回`false`，`isFinite`对于其他的数值都会返回`true`
```js
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```