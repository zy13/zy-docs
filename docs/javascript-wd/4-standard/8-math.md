[Math 对象](https://www.wangdoc.com/javascript/stdlib/math.html)

`Math`是 `JavaScript` 的原生对象，提供各种数学功能。该对象不是构造函数，不能生成实例，所有的属性和方法都必须在`Math`对象上调用。

## 1、静态属性
`Math`对象的静态属性，提供以下一些数学常数。这些属性都是只读的，不能修改。
```js
// 常数e
Math.E // 2.718281828459045

// 2 的自然对数
Math.LN2 // 0.6931471805599453

// 10 的自然对数
Math.LN10 // 2.302585092994046

// 以 2 为底的e的对数
Math.LOG2E // 1.4426950408889634

// 以 10 为底的e的对数
Math.LOG10E // 0.4342944819032518

// 常数π
Math.PI // 3.141592653589793

// 0.5 的平方根
Math.SQRT1_2 // 0.7071067811865476

// 2 的平方根
Math.SQRT2 // 1.4142135623730951
```

## 2、Math.abs()
```js
// 返回参数的绝对值
Math.abs(1) // 1
Math.abs(-1) // 1
```

## 3、Math.max()，Math.min()
```js
// 最大值
// Math.max方法返回参数之中最大的那个值
Math.max(2, -1, 5) // 5

// 最小值
// Math.min返回最小的那个值
Math.min(2, -1, 5) // -1

// 如果参数为空
// Math.min返回Infinity
// Math.max返回-Infinity
Math.min() // Infinity
Math.max() // -Infinity
```

## 4、Math.floor()，Math.ceil()
```js
// 向下取整
// Math.floor方法返回小于或等于参数值的最大整数（地板值）
Math.floor(3.2) // 3
Math.floor(-3.2) // -4

// 向下取整
// Math.ceil方法返回大于或等于参数值的最小整数（天花板值）
Math.ceil(3.2) // 4
Math.ceil(-3.2) // -3

// 两个方法可以结合起来，实现一个总是返回数值的整数部分的函数
// 相当于parseInt(x)
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
ToInteger(3.2) // 3
ToInteger(3.5) // 3
ToInteger(3.8) // 3
ToInteger(-3.2) // -3
ToInteger(-3.5) // -3
ToInteger(-3.8) // -3
```

## 5、Math.round()
```js
// 四舍五入
Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1
// 等同于
Math.floor(x + 0.5)

// 它对负数的处理（主要是对0.5的处理）
Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

## 6、Math.pow()
```js
// 幂运算
// 第一个参数为底数
// 第二个参数为指数
// 返回幂运算值

Math.pow(2, 2) // 4
// 等同于 2 ** 2

Math.pow(2, 3) // 8
// 等同于 2 ** 3

// 计算圆面积的方法
var radius = 20;
var area = Math.PI * Math.pow(radius, 2);
```

## 7、Math.sqrt()
```js
// 平方根
// 返回参数值的平方根
// 参数是一个负值，则返回NaN
Math.sqrt(4) // 2
Math.sqrt(-4) // NaN
```
## 8、Math.log()
```js
// 自然对数
// 返回以e为底的自然对数值
Math.log(Math.E) // 1
Math.log(10) // 2.302585092994046

// 如果要计算以10为底的对数，
// 可以先用Math.log求出自然对数，然后除以Math.LN10；
// 求以2为底的对数，可以除以Math.LN2。
Math.log(100)/Math.LN10 // 2
Math.log(8)/Math.LN2 // 3
```
## 9、Math.exp()
```js
// e的指数
// 返回常数e的参数次方
Math.exp(1) // 2.718281828459045
Math.exp(3) // 20.085536923187668
```

## 10、Math.random()
`Math.random()`返回`0`到`1`之间的一个伪随机数，可能等于`0`，但是一定小于`1`。
```js
// 伪随机数
Math.random() // 0.8297200958242619

// 任意范围的随机数生成函数
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}
getRandomArbitrary(1.5, 6.5) // 4.642224379519979

// 任意范围的随机整数生成函数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
getRandomInt(1,3) // 2

// 返回随机字符
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  // 重复
  for(var i = 0; i < length; i++) {
    var rand = getRandomInt(0,length-1)
    str += ALPHABET[rand]
  }
  return str
}
```

## 11、三角函数方法
```js
// 返回参数的正弦（参数为弧度值）
Math.sin(0) // 0
Math.sin(Math.PI / 2) // 1

// 返回参数的余弦（参数为弧度值）
Math.cos(0) // 1

// 返回参数的正切（参数为弧度值）
Math.tan(0) // 0

// 返回参数的反正弦（返回值为弧度值）
Math.asin(1) // 1.5707963267948966

// 返回参数的反余弦（返回值为弧度值）
Math.acos(1) // 0

// 返回参数的反正切（返回值为弧度值）
Math.atan(1) // 0.7853981633974483
```