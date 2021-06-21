[instanceof 运算符](https://www.wangdoc.com/javascript/oop/prototype.html#instanceof-%E8%BF%90%E7%AE%97%E7%AC%A6)

## 1、概述

`instanceof`运算符返回一个布尔值，表示**对象是否为某个构造函数的实例**。
- `instanceof`运算符的**左边是实例对象，右边是构造函数**。
- 它的**原理是，检查右边构造函数的原型对象（`prototype`），是否在左边对象的原型链上。**
- `isPrototypeOf()`方法是 `JavaScript` 提供的原生方法，用于检查**某个对象是否为另一个对象的原型。`instanceof`运算符只能用于对象，不适用原始类型的值**
- 由于`instanceof`检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回`true`
- 由于任意对象（除了`null`）都是`Object`的实例，所以`instanceof`运算符可以判断一个值是否为非`null`的对象。**这是唯一的instanceof运算符判断会失真的情况（一个对象的原型是null）**
- **instanceof运算符的一个用处，是判断值的类型。**
- 利用`instanceof`运算符，还可以巧妙地解决，调用构造函数时，忘了加`new`命令的问题。
```js
// 对象v是构造函数Vehicle的实例，所以返回true
var v = new Vehicle();
v instanceof Vehicle // true
// 等同于
Vehicle.prototype.isPrototypeOf(v)

// d同时是Date和Object的实例，因此对这两个构造函数都返回true。
var d = new Date();
d instanceof Date // true
d instanceof Object // true

// Object.create(null)返回一个新对象obj，它的原型是null
// 右边的构造函数Object的prototype属性，不在左边的原型链上，
// 因此instanceof就认为obj不是Object的实例
var obj = { foo: 123 };
obj instanceof Object // true
null instanceof Object // false

// instanceof运算符判断，变量x是数组，变量y是对象。
// instanceof运算符只能用于对象，不适用原始类型的值
var x = [1, 2, 3];
var y = {};
x instanceof Array // true
y instanceof Object // true

// 字符串不是String对象的实例（因为字符串不是对象），所以返回false。
var s = 'hello';
s instanceof String // false

// 对于undefined和null，instanceof运算符总是返回false
undefined instanceof Object // false
null instanceof Object // false

// 使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例。
// 如果不是，就表明忘了加new命令。
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```