[实例对象与 new 命令](https://www.wangdoc.com/javascript/oop/new.html)

## 1、对象是什么

面向对象编程（`Object Oriented Programming`，缩写为 `OOP`）是目前主流的编程范式。它将真实世界各种复杂的关系，抽象为一个个对象，然后由对象之间的分工与合作，完成对真实世界的模拟。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。对象可以复用，通过继承机制还可以定制。因此，面向对象编程具有**灵活**、**代码可复用**、**高度模块化**等特点，容**易维护和开发**，比起由一系列函数或指令组成的传统的过程式编程（`procedural programming`），更适合多人合作的大型软件项目。

那么，“对象”（`object`）到底是什么？我们从两个层次来理解。

### （1）对象是单个实物的抽象

一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个远程服务器连接也可以是对象。当实物被抽象成对象，实物之间的关系就变成了对象之间的关系，从而就可以模拟现实情况，针对对象进行编程。

### （2） 对象是一个容器，封装了属性（property）和方法（method）

属性是对象的状态，方法是对象的行为（完成某种任务）。比如，我们可以把动物抽象为animal对象，使用“属性”记录具体是哪一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

## 2、构造函数
面向对象编程的第一步，就是要生成对象。`JavaScript` 语言的对象体系，是基于构造函数（`constructor`）和原型链（`prototype`）。

`JavaScript` 语言使用构造函数（`constructor`）作为对象的模板。所谓**构造函数，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构**。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。构造函数有两个特点：
- 函数体内部使用了`this`关键字，代表了所要生成的对象实例。
- 生成对象的时候，必须使用`new`命令。
```js
// Vehicle就是构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。
var Vehicle = function () {
  this.price = 1000;
};
```

## 3、new命令的基本用法
`new`命令的作用，执行构造函数，返回一个实例对象。
```js
// 通过new命令，让构造函数Vehicle生成一个实例对象，保存在变量v中
// new命令执行时，构造函数内部的this，就代表了新生成的实例对象，
var Vehicle = function () {
  this.price = 1000;
};
var v = new Vehicle();
v.price // 1000

// 使用new命令时，根据需要，构造函数也可以接受参数。
// new命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。
var Vehicle = function (p) {
  this.price = p;
};
var v = new Vehicle(500);

// new命令后面的构造函数可以带括号，也可以不带括号
// 推荐的写法
var v = new Vehicle();
// 不推荐的写法
var v = new Vehicle;

// 不使用new命令，构造函数就变成了普通函数，并不会生成实例对象。
// this这时代表全局对象
var Vehicle = function (){
  this.price = 1000;
};
var v = Vehicle();
v // undefined
price // 1000

// 构造函数内部使用严格模式，即第一行加上use strict
// 一旦忘了使用new命令，直接调用构造函数就会报错
// 由于严格模式中，函数内部的this不能指向全局对象，默认等于undefined，导致不加new调用会报错
function Fubar(foo, bar){
  'use strict';
  this._foo = foo;
  this._bar = bar;
}
Fubar() // TypeError: Cannot set property '_foo' of undefine

// 造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象
// 不管加不加new命令，都会得到同样的结果
function Fubar(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
  }
  this._foo = foo;
  this._bar = bar;
}
Fubar(1, 2)._foo // 1
(new Fubar(1, 2))._foo // 1
```

## 4、new 命令的原理
使用`new`命令时，它后面的函数依次执行下面的步骤：
- 1、创建一个空对象，作为将要返回的对象实例
- 2、将这个空对象的原型，指向构造函数的`prototype`属性
- 3、将这个空对象赋值给函数内部的`this`关键字
- 4、开始执行构造函数内部的代码

构造函数内部，`this`指的是一个新生成的空对象，所有针对`this`的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即`this`对象），将其“构造”为需要的样子。

如果构造函数内部有`return`语句，而且`return`后面跟着一个对象，`new`命令会返回`return`语句指定的对象；否则，就会不管`return`语句，返回`this`对象。
```js
// 构造函数Vehicle的return语句返回一个数值
// new命令就会忽略这个return语句，返回this对象
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};
(new Vehicle()) === 1000 // false

// 如果return语句返回的是一个跟this无关的新对象
// new命令会返回这个新对象，而不是this对象
var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};
(new Vehicle()).price

// 如果对普通函数（内部没有this关键字的函数）使用new命令，则会返回一个空对象
// getMessage是一个普通函数，返回一个字符串
// 对它使用new命令，会得到一个空对象
// 因为new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象
function getMessage() {
  return 'this is a message';
}
var msg = new getMessage();

// new命令简化的内部流程，可以用下面的代码表示
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}
// 实例
var actor = _new(Person, '张三', 28)
```

## 5、new.target
函数内部可以使用`new.target`属性。如果当前函数是`new`命令调用，`new.target`指向当前函数，否则为`undefined`。
```js
// 调用new，new.target指向当前函数
function f() {
  console.log(new.target === f);
}
f() // false
new f() // true

// 使用这个属性，可以判断函数调用的时候，是否使用new命令。
function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}
// 构造函数f调用时，没有使用new命令，就抛出一个错误。
f() // Uncaught Error: 请使用 new 命令调用！
```

## 6、Object.create() 创建实例对象 
构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用`Object.create()`方法。
```js
// 对象person1是person2的模板，后者继承了前者的属性和方法
// 生成新的对象，属性挂载在新对象原型上
// 新旧对象互不影响
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};
var person2 = Object.create(person1);
person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```