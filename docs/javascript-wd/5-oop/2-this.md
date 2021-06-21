[this关键字](https://www.wangdoc.com/javascript/oop/this.html)

## 1、this概述

`this`就是**属性或方法“当前”所在的对象**。它总是返回一个**对象**，用在构造函数之中，表示实例对象。
```js
// this就代表property属性当前所在的对象
// this指代Window对象
this.property

// this指代person对象
// this.name就是person.name
var person = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};
person.describe() // "姓名：张三"

// 由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的。
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};
var B = {
  name: '李四'
};
B.describe = A.describe;
B.describe()
// 重构上面例子
// 函数f内部使用了this关键字，随着f所在的对象不同，this的指向也不同。
function f() {
  return '姓名：'+ this.name;
}
var A = {
  name: '张三',
  describe: f
};
var B = {
  name: '李四',
  describe: f
};
A.describe() // "姓名：张三"
B.describe() // "姓名：李四"

// 只要函数被赋给另一个变量，this的指向就会变。
// A.describe被赋值给变量f，内部的this就会指向f运行时所在的对象（本例是顶层对象）
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};
var name = '李四';
var f = A.describe;
f() // "姓名：李四"
```

```html
<!-- 一个文本输入框，每当用户输入一个值，就会调用onChange回调函数，验证这个值是否在指定范围 -->
<input type="text" name="age" size=3 onChange="validate(this, 18, 99);">

<script>
// 浏览器会向回调函数传入当前对象，因此this就代表传入当前对象（即文本框），
// 然后就可以从this.value上面读到用户的输入值。
function validate(obj, lowval, hival){
  if ((obj.value < lowval) || (obj.value > hival))
    console.log('Invalid Value!');
}
</script>
```
`JavaScript` 语言之中，一切皆对象，运行环境也是对象，所以**函数都是在某个对象之中运行，`this`就是函数运行时所在的对象（环境）**。**`this`的指向是动态的**，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。

## 2、this 实质
`JavaScript` 语言之所以有 `this` 的设计，跟内存里面的数据结构有关系。
```js
// 将一个对象赋值给变量obj
// JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }
// 然后把这个对象的内存地址赋值给变量obj
// 变量obj是一个地址（reference）
// 后面如果要读取obj.foo，引擎先从obj拿到内存地址，
// 然后再从该地址读出原始的对象，返回它的foo属性。
var obj = { foo:  5 };

// 原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。
// 举例来说，上面例子的foo属性，实际上是以下面的形式保存的。
// foo属性的值保存在属性描述对象的value属性里面
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}

// 这样的结构是很清晰的，问题在于属性的值可能是一个函数
var obj = { foo: function () {} };

// 引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性
{
  foo: {
    [[value]]: 函数的地址
    ...
  }
}

// 由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行。
var f = function () {};
var obj = { f: f };

// 单独执行
f()

// obj 环境执行
obj.f()

```
`this`设计目的就是**在函数体内部，指代函数当前的运行环境**
```js
// JavaScript 允许在函数体内部，引用当前环境的其他变量。
// 函数体里面使用了变量x。该变量由运行环境提供
var f = function () {
  console.log(x);
};

// this.x就是指当前运行环境的x
var f = function () {
  console.log(this.x);
}
var x = 1;
var obj = {
  f: f,
  x: 2,
};

// 单独执行，函数f在全局环境执行,this.x指向全局环境的x
f() // 1

// obj 环境执行，this.x指向obj.x。
obj.f() // 2
```

## 3、this使用场合 - 全局环境
全局环境使用`this`，它指的就是顶层对象`window`
```js
// 不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window。
this === window // true

function f() {
  console.log(this === window);
}
f() // true
```
## 4、this使用场合 - 构造函数
构造函数中的`this`，指的是实例对象。
```js
// 由于this指向实例对象，所以在构造函数内部定义this.p，就相当于定义实例对象有一个p属性
var Obj = function (p) {
  this.p = p;
};

var o = new Obj('Hello World!');
o.p // "Hello World!"
```
## 5、this使用场合 - 对象的方法
**如果对象的方法里面包含`this`，`this`的指向就是方法运行时所在的对象**。该方法赋值给另一个对象，就会改变`this`的指向。
```js
// obj.foo方法执行时，它内部的this指向obj
var obj ={
  foo: function () {
    console.log(this);
  }
};
obj.foo() // obj

// 下面这几种用法，都会改变this的指向
// obj.foo就是一个值。这个值真正调用时，运行环境已经不是obj了，而是全局环境，所以this不再指向obj
// 可以这样理解，JavaScript 引擎内部，obj和obj.foo储存在两个内存地址，称为地址一和地址二。
// obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj。
// 下面三种情况，直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此this指向全局环境

// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window

// 上面三种情况等同于下面的代码。

// 情况一
(obj.foo = function () {
  console.log(this);
})()
// 等同于
(function () {
  console.log(this);
})()

// 情况二
(false || function () {
  console.log(this);
})()

// 情况三
(1, function () {
  console.log(this);
})()
```
如果`this`所在的方法不在对象的第一层，这时`this`只是指向当前一层的对象，而不会继承更上面的层。
```js
// a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};
a.b.m() // undefined

// 实际执行的是下面的代码
var b = {
  m: function() {
   console.log(this.p);
  }
};
var a = {
  p: 'Hello',
  b: b
};
(a.b).m() // 等同于 b.m()

// 如果要达到预期效果，只有写成下面这样。
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

// 如果这时将嵌套对象内部的方法赋值给一个变量，this依然会指向全局对象。
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};
var hello = a.b.m;
hello() // undefined

// m是多层对象内部的一个方法。为求简便，将其赋值给hello变量，结果调用时，this指向了顶层对象。
// 为了避免这个问题，可以只将m所在的对象赋值给hello，这样调用时，this的指向就不会变。
var hello = a.b;
hello.m() // Hello
```

## 6、避免多层 this
由于`this`的指向是不确定的，所以切勿在函数中包含多层的`this`，使用一个变量固定`this`的值，然后内层函数调用这个变量，是非常常见的做法，请务必掌握。
```js
// 下面代码包含两层this，结果运行后，第一层指向对象o，第二层指向全局对象
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () {
      console.log(this);
    }();
  }
}
o.f1() // Object Window

// 实际执行的是下面的代码
var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}

// 一个解决方法是在第二层改用一个指向外层this的变量。
// 定义了变量that，固定指向外层的this，然后在内层使用that，就不会发生this指向的改变。
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}
o.f1()
// Object
// Object
```
`JavaScript` 提供了严格模式，也可以硬性避免这种问题。严格模式下，如果函数内部的`this`指向顶层对象，就会报错。
```js
// inc方法通过'use strict'声明采用严格模式，这时内部的this一旦指向顶层对象，就会报错。
var counter = {
  count: 0
};
counter.inc = function () {
  'use strict';
  this.count++
};
var f = counter.inc;
f()
```
## 7、避免数组处理方法中的 this
数组的`map`和`foreach`方法，允许提供一个函数作为参数。这个函数内部不应该使用`this`。
```js
// foreach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。
// 因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象。
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}
o.f()

// 解决这个问题的一种方法，就是前面提到的，使用中间变量固定this。
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v+' '+item);
    });
  }
}
o.f()

// 另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境
// forEach方法也可以接受第二个参数，绑定参数函数的this变量
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}
o.f()
```
## 8、避免回调函数中的 this
回调函数中的`this`往往会改变指向，最好避免使用。为了解决这个问题，可以采用一些方法对`this`进行绑定，也就是使得`this`固定指向某个对象，减少不确定性。
```js
// 点击按钮以后，控制台会显示false
// 此时this不再指向o对象，而是指向按钮的 DOM 对象
// 因为f方法是在按钮对象的环境中被调用的
var o = new Object();
o.f = function () {
  console.log(this === o);
}
// jQuery 的写法
$('#button').on('click', o.f);
```
## 9、Function.prototype.call() 绑定this
函数实例的`call`方法，可以**指定函数内部`this`的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数**。
```js
// 全局环境运行函数f时，this指向全局环境（浏览器为window对象）
// call方法可以改变this的指向，指定this指向对象obj，然后在对象obj的作用域中运行函数f。
var obj = {};
var f = function () {
  return this;
};
f() === window
f.call(obj) === obj

// call方法的参数，应该是一个对象
// 如果参数为空、null和undefined，则默认传入全局对象。
var n = 123;
var obj = { n: 456 };
function a() {
  console.log(this.n);
}
a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456

// 如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法。
var f = function () {
  return this;
};
f.call(5) // Number {[[PrimitiveValue]]: 5}
```
`call`方法还可以接受多个参数。
```js
// call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
func.call(thisValue, arg1, arg2, ...)

// call方法指定函数add内部的this绑定当前环境（对象），并且参数为1和2，因此函数add运行后得到3。
function add(a, b) {
  return a + b;
}
add.call(this, 1, 2) // 3

// call方法的一个应用是调用对象的原生方法。
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

// hasOwnProperty是obj对象继承的方法
// 如果这个方法一旦被覆盖，就不会得到正确结果。
// call方法可以解决这个问题，它将hasOwnProperty方法的原始定义放到obj对象上执行，
// 这样无论obj上有没有同名方法，都不会影响结果。
Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

## 10、Function.prototype.apply() 绑定this
`apply`方法的作用与`call`方法类似，也是**改变`this`指向，然后再调用该函数**。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下
```js
// 第一个参数是this所要指向的对象，如果设为null或undefined，则等同于指定全局对象
// 第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数
func.apply(thisValue, [arg1, arg2, ...])

// 原函数的参数，在call方法中必须一个个添加，在apply方法中，必须以数组形式添加
function f(x, y){
  console.log(x + y);
}
f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2
```
结合使用`apply`方法和`Math.max`方法, **找出数组中的最大元素**
```js
// 结合使用apply方法和Math.max方法，就可以返回数组的最大元素
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15

Math.max(10, 2, 4, 15, 9) // 15
```
通过`apply`方法, **将数组的空元素变为undefined**
```js
// 通过apply方法，利用Array构造函数将数组的空元素变成undefined
Array.apply(null, ['a', ,'b']) // [ 'a', undefined, 'b' ]

// 空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined
var a = ['a', , 'b'];
function print(i) {
  console.log(i);
}
a.forEach(print) // a b


Array.apply(null, a).forEach(print) // a undefined b
```
利用数组对象的`slice`方法，可以**将一个类似数组的对象（比如arguments对象）转为真正的数组**
```js
// apply方法的参数都是对象, 但是返回结果都是数组
// slice方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
```
**绑定回调函数的对象**
```js
// 按钮点击事件
// 点击按钮以后，控制台将会显示true
// 由于apply()方法（或者call()方法）不仅绑定函数执行时所在的对象
// 还会立即执行函数，因此不得不把绑定语句写在一个函数体内
var o = new Object();
o.f = function () {
  console.log(this === o);
}
var f = function (){
  o.f.apply(o);
  // 或者 o.f.call(o);
};
// jQuery 的写法
$('#button').on('click', f);
```
## 11、Function.prototype.bind() 绑定this
`bind()`方法用于**将函数体内的`this`绑定到某个对象，然后返回一个新函数**。
```js
// bind方法的参数，就是所要绑定this的对象
// bind()方法将inc()内部的this，绑定到counter
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
}
var func = counter.inc.bind(counter);
func();
counter.count // 1

// this绑定到其他对象
// bind()方法将inc()方法内部的this，绑定到obj对象
var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101

// bind()还可以接受更多的参数，将这些参数绑定原函数的参数
// bind()方法除了绑定this对象，还将add()函数的第一个参数x绑定成5
// 然后返回一个新函数newAdd()
// 这个函数只要再接受一个参数y就能运行了。
var add = function (x, y) {
  return x * this.m + y * this.n;
}
var obj = {
  m: 2,
  n: 2
};
var newAdd = add.bind(obj, 5)
newAdd(5) // 20

// d.getTime()方法赋给变量print，然后调用print()就报错了
// 因为getTime()方法内部的this，绑定Date对象的实例
// 赋给变量print以后，内部的this已经不指向Date对象的实例了
var d = new Date();
d.getTime()
var print = d.getTime;
print() // VM81:1 Uncaught TypeError: this is not a Date object.

// bind()方法将getTime()方法内部的this绑定到d对象
// 这时就可以安全地将这个方法赋值给其他变量了
var print = d.getTime.bind(d);
print()

// 如果bind()方法的第一个参数是null或undefined，
// 等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）
// 因为add()内部没有this，所以bind()的第一个参数是null，不过这里如果是其他对象，也没有影响。
function add(x, y) {
  return x + y;
}
var plus5 = add.bind(null, 5);
plus5(10) // 15
```

## 12、bind()方法有一些使用注意点
- （1）每一次返回一个新函数，会产生一些问题
- （2）结合回调函数使用，包含`this`的方法直接当作回调函数，会有`this`指向的问题
- （3）结合`call()`方法使用
```js
// （1）每一次返回一个新函数

// 会产生一些问题，比如监听事件的时候，不能写成下面这样
element.addEventListener('click', o.m.bind(o));
// click事件绑定bind()方法生成的一个匿名函数，会导致无法取消绑定，所以下面的代码是无效的。
element.removeEventListener('click', o.m.bind(o));

// 正确的方法是写成下面这样
var listener = o.m.bind(o);
element.addEventListener('click', listener);
element.removeEventListener('click', listener);

// （2）结合回调函数使用

// 包含this的方法直接当作回调函数
// 如果直接把counter.inc传入，调用时counter.inc()内部的this就会指向全局对象
// 使用bind()方法将counter.inc绑定counter以后，就不会有这个问题
var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};
function callIt(callback) {
  callback();
}
callIt(counter.inc.bind(counter));
counter.count // 1

// 还有一种情况比较隐蔽
// 某些数组方法可以接受一个函数当作参数，这些函数内部的this指向，很可能也会出错
// obj.print内部this.times的this是指向obj的，这个没有问题
// 但是，forEach()方法的回调函数内部的this.name却是指向全局对象，导致没有办法取到值
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  }
};
obj.print() // 没有任何输出

// 稍微改动一下，就可以看得更清楚
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this === window);
  });
};
obj.print() // true true true

// 解决这个问题，也是通过bind()方法绑定this
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this === window);
  }.bind(this));
};
obj.print() // 张三 张三 张三


// （3）结合call()方法使用

// 利用bind()方法，可以改写一些 JavaScript 原生方法的使用形式，以数组的slice()方法为例。
// 数组的slice方法从[1, 2, 3]里面，按照指定的开始位置和结束位置，切分出另一个数组
// 本质是在[1, 2, 3]上面调用Array.prototype.slice()方法
[1, 2, 3].slice(0, 1) // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1)

// call()方法实质上是调用Function.prototype.call()方法，因此上面的表达式可以用bind()方法改写。
// 将Array.prototype.slice变成Function.prototype.call方法所在的对象
// 调用时就变成了Array.prototype.slice.call
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1) 

var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]

// 将Function.prototype.call方法绑定到Function.prototype.bind对象，就意味着bind的调用形式也可以被改写。
// 将Function.prototype.bind方法绑定在Function.prototype.call上面，
// 所以bind方法就可以直接使用，不需要在函数实例上使用。
function f() {
  console.log(this.v);
}
var o = { v: 123 };
var bind = Function.prototype.call.bind(Function.prototype.bind);
bind(f, o)()
```