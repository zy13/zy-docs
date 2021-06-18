[对象的继承](https://www.wangdoc.com/javascript/oop/prototype.html)

面向对象编程很重要的一个方面，就是对象的继承。`A` 对象通过继承 `B` 对象，就能直接拥有 `B` 对象的所有属性和方法。这对于代码的复用是非常有用的。

大部分面向对象的编程语言，都是通过“**类**”（`class`）实现对象的继承。传统上，`JavaScript` 语言的继承不通过 `class`，而是通过“**原型对象**”（`prototype`）实现，本章介绍 `JavaScript` 的原型链继承。

## 1、构造函数的缺点
`JavaScript` 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。
```js
// Cat函数是一个构造函数，函数内部定义了name属性和color属性
// 所有实例对象（上例是cat1）都会生成这两个属性，即这两个属性会定义在实例对象上面
function Cat (name, color) {
  this.name = name;
  this.color = color;
}
var cat1 = new Cat('大毛', '白色');
cat1.name // '大毛'
cat1.color // '白色'

// 通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点
// 同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费

// cat1和cat2是同一个构造函数的两个实例，它们都具有meow方法
// 由于meow方法是生成在每个实例对象上面，所以两个实例就生成了两次
// 也就是说，每新建一个实例，就会新建一个meow方法
// 这既没有必要，又浪费系统资源，因为所有meow方法都是同样的行为，完全应该共享
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function () {
    console.log('喵喵');
  };
}
var cat1 = new Cat('大毛', '白色');
var cat2 = new Cat('二毛', '黑色');
cat1.meow === cat2.meow // false
```

## 2、prototype 属性的作用
`JavaScript` 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。
- 如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。
- `JavaScript` 规定，每个函数都有一个`prototype`属性，指向一个对象。对于普通函数来说，该属性基本无用。
- 对于构造函数来说，生成实例的时候，`prototype`属性会自动成为实例对象的原型。
- 原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。
- 当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法，这就是原型对象的特殊之处。
- 如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。
- **原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。**
```js
// 函数f默认具有prototype属性，指向一个对象
function f() {}
typeof f.prototype // "object"

// 构造函数Animal的prototype属性，就是实例对象cat1和cat2的原型对象
// 原型对象上添加一个color属性，结果，实例对象都共享了该属性
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = 'white';
var cat1 = new Animal('大毛');
var cat2 = new Animal('二毛');
cat1.color // 'white'
cat2.color // 'white'

// 原型对象的color属性的值变为yellow，两个实例对象的color属性立刻跟着变了
// 因为实例对象其实没有color属性，都是读取原型对象的color属性
Animal.prototype.color = 'yellow';
cat1.color // "yellow"
cat2.color // "yellow"

// 实例对象cat1的color属性改为black，就使得它不再去原型对象读取color属性，后者的值依然为yellow。
cat1.color = 'black';
cat1.color // 'black'
cat2.color // 'yellow'
Animal.prototype.color // 'yellow';

// Animal.prototype对象上面定义了一个walk方法，这个方法将可以在所有Animal实例对象上面调用。
Animal.prototype.walk = function () {
  console.log(this.name + ' is walking');
};
```

## 3、原型链
`JavaScript` 规定，所有对象都有自己的原型对象（`prototype`）。**一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（`prototype chain`）：对象到原型，再到原型的原型……**

如果一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。
- 所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf`和`toString`方法的原因，因为这是从`Object.prototype`继承的。
- **Object.prototype对象有没有它的原型呢？**回答是`Object.prototype`的原型是`null`。
- `null`没有任何属性和方法，也没有自己的原型。因此，**原型链的尽头就是`null`**。
```js
// Object.getPrototypeOf方法返回参数对象的原型
Object.getPrototypeOf(Object.prototype) // null
```
**读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的Object.prototype还是找不到，则返回undefined。**

**如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）**

**注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。**
```js
// 如果让构造函数的prototype属性指向一个数组，就意味着实例对象可以调用数组方法。
var MyArray = function () {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true
```

## 4、constructor 属性
`prototype`对象有一个`constructor`属性，**默认指向prototype对象所在的构造函数**。
- 由于`constructor`属性定义在`prototype`对象上面，意味着可以被所有实例对象继承
- `constructor`属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的
- 另一方面，有了`constructor`属性，就可以从一个实例对象新建另一个实例
```js
function P() {}
P.prototype.constructor === P // true

// p是构造函数P的实例对象，但是p自身没有constructor属性，该属性其实是
// 读取原型链上面的P.prototype.constructor属性。
function P() {}
var p = new P();
p.constructor === P // true
p.constructor === P.prototype.constructor // true
p.hasOwnProperty('constructor') // false

// constructor属性确定了实例对象f的构造函数是F，而不是RegExp
function F() {};
var f = new F();
f.constructor === F // true
f.constructor === RegExp // false

// x是构造函数Constr的实例，可以从x.constructor间接调用构造函数
function Constr() {}
var x = new Constr();
var y = new x.constructor();
y instanceof Constr // true

// 在实例方法中，调用自身的构造函数成为可能
// createCopy方法调用构造函数，新建另一个实例
Constr.prototype.createCopy = function () {
  return new this.constructor();
};
```
**constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。**
```js
// 构造函数Person的原型对象改掉了，但是没有修改constructor属性，导致这个属性不再指向Person
// 由于Person的新原型是一个普通对象，而普通对象的constructor属性指向Object构造函数，
// 导致Person.prototype.constructor变成了Object。
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true

// 修改原型对象时，一般要同时修改constructor属性的指向

// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };

// 要么将constructor属性重新指向原来的构造函数，要么只在原型对象上添加方法，
// 这样可以保证instanceof运算符不会失真。

// 如果不能确定constructor属性是什么函数，还有一个办法
// 通过name属性，从实例得到构造函数的名称。
function Foo() {}
var f = new Foo();
f.constructor.name // "Foo"
```

## 5、构造函数的继承
让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步实现：
- 第一步是在子类的构造函数中，调用父类的构造函数
- 第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型
```js
// 第一步
// Sub是子类的构造函数
// this是子类的实例
// 在实例上调用父类的构造函数Super
// 就会让子类实例具有父类实例的属性
function Sub(value) {
  Super.call(this);
  this.prop = value;
}

// 第二步
// Sub.prototype是子类的原型，
// 要将它赋值为Object.create(Super.prototype)，而不是直接等于Super.prototype
// 否则后面两行对Sub.prototype的操作，会连父类的原型Super.prototype一起修改掉
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = '...';
```

```js
// Shape构造函数
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// 让Rectangle构造函数继承Shape
// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this)
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

// instanceof运算符会对子类和父类的构造函数，都返回true。
var rect = new Rectangle();
rect instanceof Rectangle  // true
rect instanceof Shape  // true

// 子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。
// 子类B的print方法先调用父类A的print方法，再部署自己的代码
ClassB.prototype.print = function() {
  ClassA.prototype.print.call(this);
  // some code
}
```
## 6、多重继承 - 混入模式
`JavaScript` 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。
```js
// 子类S同时继承了父类M1和M2。这种模式又称为 Mixin（混入）
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.world = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}
// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
```
## 7、模块
随着网站逐渐变成“互联网应用程序”，嵌入网页的 `JavaScript` 代码越来越庞大，越来越复杂。网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等……开发者必须使用软件工程的方法，管理网页的业务逻辑。

`JavaScript` 模块化编程，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

但是，`JavaScript` 不是一种模块化编程语言，`ES6` 才开始支持“类”和“模块”。下面介绍传统的做法，如何利用对象实现模块的效果。

## 8、模块-基本的实现方法
模块是实现特定功能的一组属性和方法的封装。
- 简单的做法是把模块写成一个对象，所有的模块成员都放到这个对象里面。
- 但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。
```js
// 函数m1和m2，都封装在module1对象里
// 使用的时候，就是调用这个对象的属性
var module1 = new Object({
　_count : 0,
　m1 : function (){
　　//...
　},
　m2 : function (){
  　//...
　}
});
module1.m1();

// 外部代码可以直接改变内部计数器的值。
module1._count = 5;
```

## 9、封装私有变量：构造函数的写法
- 这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除
- 这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，**违背了构造函数与实例对象在数据上相分离的原则**（即实例对象的数据，不应该保存在实例对象以外）。**同时，非常耗费内存。**
```js
// buffer是模块的私有变量
// 一旦生成实例对象，外部是无法直接访问buffer的
function StringBuilder() {
  var buffer = [];

  this.add = function (str) {
     buffer.push(str);
  };

  this.toString = function () {
    return buffer.join('');
  };

}


// 这种方法将私有变量放入实例对象中，好处是看上去更自然，
// 但是它的私有变量可以从外部读写，不是很安全。
function StringBuilder() {
  this._buffer = [];
}
StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function (str) {
    this._buffer.push(str);
  },
  toString: function () {
    return this._buffer.join('');
  }
};
```

## 10、封装私有变量：IIFE的写法
使用“立即执行函数”（`Immediately-Invoked Function Expression，IIFE`），将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。
```js
// 下面的module1就是 JavaScript 模块的基本写法
var module1 = (function () {
　var _count = 0;
　var m1 = function () {
　  //...
　};
　var m2 = function () {
　　//...
　};
　return {
　　m1 : m1,
　　m2 : m2
　};
})();
// 使用上面的写法，外部代码无法读取内部的_count变量。
console.info(module1._count); //undefined
```
## 11、模块的放大模式
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“**放大模式**”（`augmentation`）
```js
// 为module1模块添加了一个新方法m3()，然后返回新的module1模块
var module1 = (function (mod){
　mod.m3 = function () {
　　//...
　};
　return mod;
})(module1);
```
在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"**宽放大模式**"（`Loose augmentation`）
```js
// 与"放大模式"相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象
var module1 = (function (mod) {
　//...
　return mod;
})(window.module1 || {});
```
## 12、输入全局变量
**独立性**是模块的重要特点，模块内部最好不与程序的其他部分直接交互。**为了在模块内部调用全局变量，必须显式地将其他变量输入模块。**
```js
// module1模块需要使用 jQuery 库和 YUI 库，就把这两个库（其实是两个模块）当作参数输入module1
// 这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。
var module1 = (function ($, YAHOO) {
　//...
})(jQuery, YAHOO);


// 立即执行函数还可以起到命名空间的作用。
// finalCarousel对象输出到全局，对外暴露init和destroy接口
// 内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的
(function($, window, document) {

  function go(num) {
  }

  function handleEvents() {
  }

  function initialize() {
  }

  function dieCarouselDie() {
  }

  //attach to the global scope
  window.finalCarousel = {
    init : initialize,
    destroy : dieCarouselDie
  }

})( jQuery, window, document );
```


