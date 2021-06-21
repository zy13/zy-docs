[属性描述对象](https://www.wangdoc.com/javascript/stdlib/attributes.html)

## 1、概述

`JavaScript` 提供了一个内部数据结构，**用来描述对象的属性，控制它的行为**，比如该属性是否可写、可遍历等等。这个内部数据结构称为“**属性描述对象**”（`attributes object`）。**每个属性都有自己对应的属性描述对象，保存该属性的一些元信息**。
```js
// 属性描述对象提供6个元属性
{
  value: undefined, // 该属性的属性值，默认为undefined
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

## 2、Object.getOwnPropertyDescriptor

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
- 通过`Object.defineProperty`定义的属性，参数里面的属性描述对象，`writable`、`configurable`、`enumerable`这三个属性的默认值都为`false`。
- 通过字面量或者`new Object`声明的对象，定义的属性，其属性描述对象，`writable`、`configurable`、`enumerable`这三个属性的默认值都为`true`。
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
如果一次性定义或修改多个属性，可以使用`Object.defineProperties()`方法。`Object.defineProperties`对于属性的定义或者修改规则一致。
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

## 6、实例方法 - propertyIsEnumerable
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
obj.p = 123;

// 获取属性值
Object.getOwnPropertyDescriptor(obj, 'p').value // 123

// 修改属性值
Object.defineProperty(obj, 'p', { value: 246 });
obj.p // 246
```

## 8、元属性 - writable
`writable`属性是一个**布尔值**，决定了**目标属性的值是否可以被改变**。
- **正常模式下**，对`writable`为`false`的属性赋值不会报错，只会默默失败。但是，**严格模式**下会报错，即使对属性重新赋予一个同样的值。
- 如果原型对象的某个属性的`writable`为`false`，那么子对象将无法自定义这个属性。
- 有一个规避方法，就是通过**覆盖属性描述对象**，绕过这个限制。原因是这种情况下，原型链会被完全忽视。
```js
// 正常模式下 - 对writable为false的属性赋值不会报错
// obj.a的writable属性是false
// 然后，改变obj.a的值，不会有任何效果
'use strict'
var obj = {};
Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});
obj.a // 37
obj.a = 25;
obj.a // 37

// 严格模式 - 对writable为false的属性赋值会报错
// 严格模式，对obj.a任何赋值行为都会报错
'use strict'
var obj = {};
Object.defineProperty(obj, 'a', {
  value: 37,
  writable: false
});
obj.a = 37; 
// Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'

// proto是原型对象，writable为false时，它的foo属性不可写
// obj对象继承proto，也不可以再自定义这个属性了
// 如果是严格模式，这样做还会抛出一个错误。
var proto = Object.defineProperty({}, 'foo', {value: 'a'})
var obj = Object.create(proto)
obj.foo = 'b' 
obj.foo // 'a'
// 'use strict'
// Uncaught TypeError: Cannot assign to read only property 'foo' of object '#<Object>'

// 覆盖属性描述对象，可以使writable为false的属性变得可修改
var proto = Object.defineProperty({}, 'foo', {
  value: 'a'
});
var obj = Object.create(proto);
Object.defineProperty(obj, 'foo', {
  value: 'b'
})
obj.foo // "b"
```

## 9、元属性 - enumerable
`enumerable`（可遍历性）返回一个**布尔值**，表示**目标属性是否可遍历**。

`JavaScript` 的早期版本，`for...in`循环是基于`in`运算符的。我们知道，`in`运算符不管某个属性是对象自身的还是继承的，都会返回`true`。
```js
// toString不是obj对象自身的属性，但是in运算符也返回true
// 这导致了toString属性也会被for...in循环遍历。
var obj = {};
'toString' in obj // true
```
这显然不太合理，后来就引入了“可遍历性”这个概念。只有可遍历的属性，才会被`for...in`循环遍历，同时还规定`toString`这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了`for...in`循环的可用性。

具体来说，如果一个属性的`enumerable`为`false`，下面三个操作不会取到该属性。因此，`enumerable`可以用来设置“秘密”属性。如果**需要获取对象自身的所有属性，不管是否可遍历**，可以使用`Object.getOwnPropertyNames`方法。
- `for..in` 循环，包括继承的属性
- `Object.keys` 方法，不包括继承的属性
- `JSON.stringify` 方法，如果对象的 `JSON` 格式输出要排除某些属性，就可以把这些属性的`enumerable`设为`false`
```js
// obj.x属性的enumerable为false，所以一般的遍历操作都无法获取该属性
// 使得它有点像“秘密”属性，但不是真正的私有属性，还是可以直接获取它的值。
var obj = {};

Object.defineProperty(obj, 'x', {
  value: 123,
  enumerable: false
});
obj.x // 123

for (var key in obj) {
  console.log(key);
}
// undefined

Object.keys(obj)  // []
JSON.stringify(obj) // "{}"
```

## 10、元属性 - configurable
`configurable`(可配置性）返回一个**布尔值**，决定了**是否可以修改属性描述对象**。
- `configurable=false`时，`value`、`writable`、`enumerable`和`configurable`都不能被修改。
- `writable`只有在`false`改为`true`会报错，`true`改为`false`是允许的。
- 至于`value`，只要`writable`和`configurable`有一个为`true`，就允许改动。
- `writable`为`false`时，直接目标属性赋值，不报错，但不会成功。如果是严格模式，还会报错。
- 可配置性决定了目标属性是否可以被删除（`delete`）。
```js
// obj.p的configurable为false
// 然后，改动value、writable、enumerable、configurable，结果都报错。

var obj = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, 'p', {value: 2})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {writable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {enumerable: true})
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, 'p', {configurable: true})
// TypeError: Cannot redefine property: p


// writable只有在false改为true会报错，true改为false是允许的。
// 至于`value`，只要`writable`和`configurable`有一个为`true`，就允许改动。
var obj = Object.defineProperty({}, 'p', {
  value: 11,
  writable: true,
  configurable: false
});

// writable由true改为false
Object.defineProperty(obj, 'p', {writable: false}) // 修改成功

// writable为true时，允许修改value
Object.defineProperty(obj, 'p', {value: 22}) 


// configurable为true时，允许修改value
var o2 = Object.defineProperty({}, 'p', {
  value: 1,
  writable: false,
  configurable: true
});
Object.defineProperty(o2, 'p', {value: 2})

// obj.p1的configurable是true，所以可以被删除，obj.p2就无法删除。
var obj = Object.defineProperties({}, {
  p1: { value: 1, configurable: true },
  p2: { value: 2, configurable: false }
});

delete obj.p1 // true
delete obj.p2 // false

obj.p1 // undefined
obj.p2 // 2
```

## 11、存取器 - setter、getter

除了直接定义以外，属性还可以用存取器（`accessor`）定义，其中
- 存值函数称为`setter`，使用属性描述对象的`set`属性。
- 取值函数称为`getter`，使用属性描述对象的`get`属性。
- 取值函数`get`不能接受参数，存值函数`set`只能接受一个参数（即属性的值）。
- **一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数**。利用这个功能，可以实现许多高级特性，比如定制属性的读取和赋值行为。
- `JavaScript` 为存储器提供了两种写法。两种写法有细微的差别。实际开发中，**写法二更常用**。
```js
// 写法一
// 属性p的configurable和enumerable默认都为false，从而导致属性p是不可遍历的

// obj.p定义了get和set属性
// obj.p取值时，就会调用get
// 赋值时，就会调用set。
var obj = Object.defineProperty({}, 'p', {
  get: function () {
    return 'getter';
  },
  set: function (value) {
    console.log('setter: ' + value);
  }
});
obj.p // "getter"
obj.p = 123 // "setter: 123"

// 写法二
// 属性p的configurable和enumerable默认都为true，因此属性p是可遍历的。
var obj = {
  get p() {
    return 'getter';
  },
  set p(value) {
    console.log('setter: ' + value);
  }
};
```
**存取器往往用于，属性的值依赖对象内部数据的场合。**
```js
// next属性的存值函数和取值函数，都依赖于内部属性$n
var obj ={
  $n : 5,
  get next() { return this.$n++ },
  set next(n) {
    if (n >= this.$n) {
      this.$n = n;
    } else {
      throw new Error('新的值必须大于当前值');
    }
  }
};
obj.next // 5

obj.next = 10;
obj.next // 10

obj.next = 5; // Uncaught Error: 新的值必须大于当前值
```

## 12、对象的拷贝 - ♥
有时，我们需要**将一个对象的所有属性，拷贝到另一个对象**，可以用下面的方法实现。
```js
// 方法一
// 问题：如果遇到存取器定义的属性，会只拷贝值，导致存取值时失去监听的本质。
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }
  return to;
}

extend({}, {
  a: 1
})
// {a: 1}

extend({}, {
  get a() { return 1 }
})
// {a: 1}
```
**通过Object.defineProperty方法来拷贝属性**。
```js
// 方法二
// hasOwnProperty那一行用来过滤掉继承的属性，否则可能会报错
// 因为Object.getOwnPropertyDescriptor读不到继承属性的属性描述对象。
var exrend = function(to, from) {
  for(var property in from) {
    if(!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    )
  }
  return to
}
exrend({}, {
  get a() {
    console.log('getter')
    return 1
  }
})
```

## 13、控制对象状态 及 局限性
有时需要**冻结对象的读写状态，防止对象被改变**。JavaScript 提供了三种冻结方法，
- 最弱的一种是`Object.preventExtensions`，它使得**一个对象无法再添加新的属性**
- 其次是`Object.seal`，使得**一个对象既无法添加新属性，也无法删除旧属性**，但对属性的读写没有影响。
- 最强的是`Object.freeze`

### 局限性

上面的三个方法锁定对象的可写性有一个漏洞：**可以通过改变原型对象，来为对象增加属性**。一种解决方案是，**把对象的原型也冻结住**。
```js
// 对象obj本身不能新增属性，但是可以在它的原型对象上新增属性，就依然能够在obj上读到。
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj); // Object.getPrototypeOf(obj) === obj.__proto__
proto.t = 'hello';
obj.t

// 一种解决方案是，把obj的原型也冻结住。
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);
proto.t = 'hello';
obj.t // undefined
```
另外一个局限是，**如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。**
```js
// obj.bar属性指向一个数组，
// obj对象被冻结以后，这个指向无法改变，即无法指向其他值，
// 但是所指向的数组是可以改变的。
var obj = {
  foo: 1,
  bar: ['a', 'b']
};
Object.freeze(obj);

obj.bar.push('c');
obj.bar // ["a", "b", "c"]
```
## 14、Object.preventExtensions()
`Object.preventExtensions`方法可以使得**一个对象无法再添加新的属性**。
```js
// obj对象经过Object.preventExtensions以后，就无法添加新属性了。
// 字面量添加不报错
// Object.defineProperty添加会报错
var obj = new Object();
Object.preventExtensions(obj);

Object.defineProperty(obj, 'p', {
  value: 'hello'
});
// TypeError: Cannot define property:p, object is not extensible.

obj.p = 1;
obj.p // undefined
```
## 15、Object.isExtensible()
`Object.isExtensible`方法用于检查一个对象是否使用了`Object.preventExtensions`方法，即**检查是否可以为一个对象添加属性**。
```js
// 对obj对象使用Object.preventExtensions方法以后
// 再使用Object.isExtensible方法，返回false，表示已经不能添加新属性了。
var obj = new Object();
Object.isExtensible(obj) // true
Object.preventExtensions(obj);
Object.isExtensible(obj) // false
```

## 16、Object.seal()
`Object.seal`方法使得**一个对象既无法添加新属性，也无法删除旧属性**。

- `Object.seal`**实质是把属性描述对象的`configurable`属性设为`false`，因此属性描述对象不再能改变了。**
- `Object.seal`只是禁止新增或删除属性，并**不影响修改某个属性的值**。
```js
// obj对象执行Object.seal方法以后，就无法添加新属性和删除旧属性了。

var obj = { p: 'hello' };
Object.seal(obj);

delete obj.p;
obj.p // "hello"

obj.x = 'world';
obj.x // undefined


var obj = {
  p: 'a'
};
// seal方法之前
Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// seal方法之后
// 属性描述对象的configurable属性就变成了false，然后改变enumerable属性就会报错。
Object.seal(obj);
Object.getOwnPropertyDescriptor(obj, 'p')
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

Object.defineProperty(obj, 'p', {
  enumerable: false
})
// TypeError: Cannot redefine property: p

// Object.seal方法对p属性的value无效，是因为此时p属性的可写性由writable决定。
var obj = { p: 'a' };
Object.seal(obj);
obj.p = 'b';
obj.p // 'b'
```

## 17、Object.isSealed()
`Object.isSealed`方法用于**检查一个对象是否使用了`Object.seal`方法**。
```js
// Object.isExtensible方法也返回false
var obj = { p: 'a' };
Object.seal(obj);
Object.isSealed(obj) // true
Object.isExtensible(obj) // false
```

## 18、Object.freeze() - ♥
`Object.freeze`方法可以使得一个对象**无法添加新属性、无法删除旧属性、也无法改变属性的值**，使得这个**对象实际上变成了常量**。
```js
// 对obj对象进行Object.freeze()以后
// 修改属性、新增属性、删除属性都无效了
// 这些操作并不报错，只是默默地失败。
// 如果在严格模式下，则会报错。
var obj = {
  p: 'hello'
};

Object.freeze(obj);

obj.p = 'world';
obj.p // "hello"

obj.t = 'hello';
obj.t // undefined

delete obj.p // false
obj.p // "hello"
```

## 19、Object.isFrozen()
`Object.isFrozen`方法用于检查一个对象是否使用了`Object.freeze`方法。
`Object.isFrozen`的一个用途是，**确认某个对象没有被冻结后，再对它的属性赋值**。
```js
// 使用Object.freeze方法以后
// Object.isSealed将会返回true
// Object.isExtensible返回false
var obj = {
  p: 'hello'
};
Object.freeze(obj);
Object.isFrozen(obj) // true
Object.isSealed(obj) // true
Object.isExtensible(obj) // false

// 确认obj没有被冻结后，再对它的属性赋值，就不会报错了。
if (!Object.isFrozen(obj)) {
  obj.p = 'world';
}
```
