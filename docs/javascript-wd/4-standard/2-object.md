[属性描述对象](https://www.wangdoc.com/javascript/stdlib/attributes.html)

## 1、概述

`JavaScript` 提供了一个内部数据结构，**用来描述对象的属性，控制它的行为**，比如该属性是否可写、可遍历等等。这个内部数据结构称为“**属性描述对象**”（`attributes object`）。**每个属性都有自己对应的属性描述对象，保存该属性的一些元信息**。
```js
// 属性描述对象提供6个元属性
{
  value: 123, // 该属性的属性值，默认为undefined
  writable: true, // 是一个布尔值，表示属性值（value）是否可写，默认为true
  enumerable: true, // enumerable是一个布尔值，表示该属性是否可遍历，默认为true
  configurable: true, // configurable是一个布尔值，表示可配置性，默认为true
  get: undefined, // get是一个函数，表示该属性的取值函数（getter），默认为undefined。
  set: undefined // set是一个函数，表示该属性的存值函数（setter），默认为undefined。
}

// enumerable
// 如果设为false，会使得某些操作（比如for...in循环、Object.keys()）跳过该属性。

// configurable
// 如果设为false，将阻止某些操作改写该属性，
// 比如无法删除该属性，也不得改变该属性的属性描述对象（value属性除外）。
// 也就是说，configurable属性控制了属性描述对象的可写性。
```

## 2、Object.getOwnPropertyDescriptor()

`Object.getOwnPropertyDescriptor()`方法可以获取属性描述对象。
```js
// 第一个参数是目标对象
// 第二个参数是一个字符串，对应目标对象的某个属性名。
// 该方法只能用于对象自身的属性，不能用于继承的属性。

// 获取obj.p的属性描述对象。
var obj = { p: 'a' };
Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// toString是obj对象继承的属性，Object.getOwnPropertyDescriptor()无法获取。
Object.getOwnPropertyDescriptor(obj, 'toString')
// undefined
```

## 3、Object.getOwnPropertyNames()
`Object.getOwnPropertyNames`方法**返回一个数组**，成员是参数对象自身的**全部属性的属性名，不管该属性是否可遍历**。
```js
// obj.p1是可遍历的，obj.p2是不可遍历的，Object.getOwnPropertyNames会将它们都返回
var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});
Object.getOwnPropertyNames(obj)
// ["p1", "p2"]
```
`Object.keys`只返回对象自身的**可遍历属性的全部属性名**。
```js
// 数组自身的length属性是不可遍历的，Object.keys不会返回该属性。
Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

// Object.prototype也是一个对象，所有实例对象都会继承它，它自身的属性都是不可遍历的。
Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
// ['hasOwnProperty',
//  'valueOf',
//  'constructor',
//  'toLocaleString',
//  'isPrototypeOf',
//  'propertyIsEnumerable',
//  'toString']
```

## 4、Object.defineProperty()
`Object.defineProperty()`方法允许**通过属性描述对象，定义或修改一个属性，然后返回修改后的对象**，它的用法如下。
```js
// 第一个参数object，属性所在的对象
// 第二个参数propertyName：字符串，表示属性名
// 第三个参数attributesObject：属性描述对象
Object.defineProperty(object, propertyName, attributesObject)

// 定义obj.p可以写成下面这样。
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  writable: false, // 只读
  enumerable: true,
  configurable: false
});
obj.p // 123
obj.p = 246;
obj.p // 123

// 一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，
// 或者同时定义value属性，否则会报错。
var obj = {};
Object.defineProperty(obj, 'p', {
  value: 123,
  get: function() { return 456; }
});
// TypeError: Invalid property.
// A property cannot both have accessors and be writable or have a value

Object.defineProperty(obj, 'p', {
  writable: true,
  get: function() { return 456; }
});
// TypeError: Invalid property descriptor.
// Cannot both specify accessors and a value or writable attribute

// 参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false。
var obj = {};
Object.defineProperty(obj, 'foo', {});
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

## 5、Object.defineProperties()
如果一次性定义或修改多个属性，可以使用`Object.defineProperties()`方法。
```js
// 同时定义了obj对象的三个属性
var obj = Object.defineProperties({}, {
  p1: { value: 123, enumerable: true },
  p2: { value: 'abc', enumerable: true },
  p3: { 
    // 定义了取值函数get，每次读取该属性，都会调用这个取值函数。
    // 一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true
    // 或者同时定义value属性，否则会报错。
    get: function () { return this.p1 + this.p2 },
    enumerable:true,
    configurable:true
  }
});
obj.p1 // 123
obj.p2 // "abc"
obj.p3 // "123abc"


// 参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false。
var obj = {};
Object.getOwnPropertyDescriptor(obj, 'foo')
// {
//   value: undefined,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

## 6、实例方法 - propertyIsEnumerable()
实例对象的`propertyIsEnumerable()`方法**返回一个布尔值，用来判断某个属性是否可遍历**。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回`false`。
```js
// 实例方法 - Object.prototype.propertyEnumerable
// obj.p是可遍历的，而obj.toString是继承的属性
var obj = {};
obj.p = 123;
obj.propertyIsEnumerable('p') // true
obj.propertyIsEnumerable('toString') // false
```

## 7、元属性 - value
`value`属性是**目标属性的值**。
```js
// 通过value属性，读取或改写obj.p
var obj = {};

obj.p = 123; // p属性可读写，即使使用defineProperty
Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
obj.p = 0
obj.p // 0

Object.getOwnPropertyDescriptor(obj, 'p').value // 0

// x属性为只读，不可修改
Object.defineProperty(obj, 'x', { value: 246 });
obj.x // 246
```

## 8、元属性 - writable
