[严格模式](https://www.wangdoc.com/javascript/oop/strict.html)

除了正常的运行模式，`JavaScript` 还有第二种运行模式：严格模式（`strict mode`）
顾名思义，这种模式采用更加严格的 `JavaScript` 语法。

同样的代码，在正常模式和严格模式中，可能会有不一样的运行结果。一些在正常模式下可以运行的语句，在严格模式下将不能运行。

## 1、设计目的
早期的 `JavaScript` 语言有很多设计不合理的地方，但是为了兼容以前的代码，又不能改变老的语法，只能不断添加新的语法，引导程序员使用新语法。

严格模式是从 `ES5`进入标准的，主要目的有以下几个。
- 明确禁止一些不合理、不严谨的语法，减少 `JavaScript` 语言的一些怪异行为。
- 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全。
- 提高编译器效率，增加运行速度。
- 为未来新版本的 `JavaScript` 语法做好铺垫。

总之，严格模式体现了 JavaScript **更合理、更安全、更严谨**的发展方向。

## 2、启用方法
进入严格模式的标志，是一行字符串`use strict`。
- 严格模式可以用于整个脚本，也可以只用于单个函数。
- `use strict`放在脚本文件的第一行，整个脚本都将以严格模式运行。如果这行语句不在第一行就无效，整个脚本会以正常模式运行。
```js
// 老版本的引擎会把它当作一行普通字符串，加以忽略
// 新版本的引擎就会进入严格模式。
'use strict'
```
### （1） 整个脚本文件
```html
<!-- 严格模式必须从代码一开始就生效 -->

<!-- 严格模式 -->
<script>
  'use strict';
  console.log('这是严格模式');
</script>

<!-- 正常模式 -->
<script>
  console.log('这是正常模式');
</script>

<!-- use strict写成下面这样，则不起作用 -->
<script>
  console.log('这是正常模式');
  'use strict';
</script>
```
### （2）单个函数
`use strict`放在函数体的第一行，则整个函数以严格模式运行。有时，需要把不同的脚本合并在一个文件里面。
- 如果一个脚本是严格模式，另一个脚本不是，它们的合并就可能出错。
- 严格模式的脚本在前，则合并后的脚本都是严格模式；如果正常模式的脚本在前，则合并后的脚本都是正常模式
- 这以上两种情况下，合并后的结果都是不正确的。这时可以考虑把整个脚本文件放在一个立即执行的匿名函数之中。
```js
function strict() {
  'use strict';
  return '这是严格模式';
}

function strict2() {
  'use strict';
  function f() {
    return '这也是严格模式';
  }
  return f();
}

function notStrict() {
  return '这是正常模式';
}

// 把整个脚本文件放在一个立即执行的匿名函数之中。
(function(){
  'use strict'
  // some code here
})()
```
## 3、显示报错
严格模式使得 `JavaScript` 的语法变得更严格，更多的操作会显式报错。其中有些操作，在正常模式下只会默默地失败，不会报错。
- 只读属性不可写
- 只设置了取值器的属性不可写
- 禁止扩展的对象不可扩展
- `eval`、`arguments` 不可用作标识名
- 函数不能有重名的参数
- 禁止八进制的前缀0表示法
```js
// 严格模式下，对只读属性赋值，或者删除不可配置（non-configurable）属性都会报错。

// length是只读属性，严格模式下不可写；正常模式下，改变length属性是无效的，但不会报错。
'use strict';
'abc'.length = 5;
// Uncaught TypeError: Cannot assign to read only property 'length' of string 'abc'

'use strict';
var obj = Object.defineProperty({}, 'a', {
  value: 37,
  writable: false
});
obj.a = 123;
// TypeError: Cannot assign to read only property 'a' of object #<Object>

// 删除不可配置的属性会报错
'use strict';
var obj = Object.defineProperty({}, 'p', {
  value: 1,
  configurable: false
});
delete obj.p
// TypeError: Cannot delete property 'p' of #<Object>

// 严格模式下，对一个只有取值器（getter）、没有存值器（setter）的属性赋值，会报错。
'use strict';
var obj = {
  get v() { return 1; }
};
obj.v = 2;
// Uncaught TypeError: Cannot set property v of #<Object> which has only a getter

// 严格模式下，对禁止扩展的对象添加新属性，会报错。
'use strict';
var obj = {};
Object.preventExtensions(obj);
obj.v = 1;
// Uncaught TypeError: Cannot add property v, object is not extensible

// 严格模式下，函数不能有重名的参数
function f(a, a, b) {
  'use strict';
  return a + b;
}
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context

// 严格模式下，禁止八进制的前缀0表示法
'use strict';
var n = 0100;
// Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```

## 4、增强的安全措施
严格模式增强了安全保护，从语法上防止了一些不小心会出现的错误。
- **全局变量显式声明**，变量都必须先声明，然后再使用，否则会报错
- **禁止 `this` 关键字指向全局对象**，这种限制对于构造函数尤其有用，使用构造函数时，有时忘了加`new`，这时`this`不再指向全局对象，而是报错。
- 禁止使用 `fn.callee`、`fn.caller`
- 禁止使用 `arguments.callee`、`arguments.caller`。这是两个历史遗留的变量，从来没有标准化过，现在**已经取消**了。
- **禁止删除变量**
```js
// 正常模式中，如果一个变量没有声明就赋值，默认是全局变量。
// 严格模式禁止这种用法，全局变量必须显式声明。
'use strict';
v = 1; // 报错，v未声明
for (i = 0; i < 2; i++) { // 报错，i 未声明
  // ...
}
function f() {
  x = 123;
}
f() // 报错，未声明就创建一个全局变量

// 正常模式下，函数内部的this可能会指向全局对象
// 严格模式禁止这种用法，避免无意间创造全局变量。
// 正常模式
function f() {
  console.log(this === window);
}
f() // true

// 严格模式
// 严格模式的函数体内部this是undefined
function f() {
  'use strict';
  console.log(this === undefined);
}
f() // true

// 严格模式下，函数直接调用时（不使用new调用），函数内部的this表示undefined（未定义）
// 正常模式下，this指向全局对象
function f() {
  'use strict';
  this.a = 1;
};
f();// 报错，this 未定义

// 可以用call、apply和bind方法，将任意值绑定在this上面
// 正常模式
function fun() {
  return this;
}
fun() // window
fun.call(2) // Number {2}
fun.call(true) // Boolean {true}
fun.call(null) // window
fun.call(undefined) // window

// 严格模式
'use strict';
function fun() {
  return this;
}
fun() //undefined
fun.call(2) // 2
fun.call(true) // true
fun.call(null) // null
fun.call(undefined) // undefined

// 函数内部不得使用fn.caller、fn.arguments，否则会报错
// 这意味着不能在函数内部得到调用栈了。
function f1() {
  'use strict';
  f1.caller;    // 报错
  f1.arguments; // 报错
}
f1();

// 严格模式下无法删除变量，如果使用delete命令删除一个变量，会报错
// 只有对象的属性，且属性的描述对象的configurable属性设置为true，才能被delete命令删除。
'use strict';
var x;
delete x; // 语法错误
var obj = Object.create(null, {
  x: {
    value: 1,
    configurable: true
  }
});
delete obj.x; // 删除成功
```

## 5、静态绑定
JavaScript 语言的一个特点，就是允许“**动态绑定**”，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在**运行时**
（`runtime`）确定的。

严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，必须在**编译阶段**就确定。这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。

- **禁止使用 `with` 语句**。严格模式下，使用`with`语句将报错。因为`with`语句无法在编译时就确定，某个属性到底归属哪个对象，从而影响了编译效果。
- **创设 `eval` 作用域**。正常模式下，`JavaScript` 语言有两种变量作用域（`scope`）：全局作用域和函数作用域。严格模式创设了第三种作用域：`eval`作用域。正常模式下，`eval`语句的作用域，取决于它处于全局作用域，还是函数作用域。
- `arguments` 不再追踪参数的变化

```js
'use strict';
var v  = 1;
var obj = {};
with (obj) {
  v = 2;
} // Uncaught SyntaxError: Strict mode code may not include a with statement

// 严格模式下，eval语句本身就是一个作用域，不再能够在其所运行的作用域创设新的变量了，
// 也就是说，eval所生成的变量只能用于eval内部。
// 由于eval语句内部是一个独立作用域，所以内部的变量x不会泄露到外部。
(function () {
  'use strict';
  var x = 2;
  console.log(eval('var x = 5; x')) // 5
  console.log(x) // 2
})() // Uncaught TypeError: eval is not a function


// 变量arguments代表函数的参数
// 严格模式下，函数内部改变参数与arguments的联系被切断了，两者不再存在联动关系。
function f(a) {
  a = 2;
  return [a, arguments[0]];
}
f(1); // 正常模式为[2, 2]

function f(a) {
  'use strict';
  a = 2;
  return [a, arguments[0]];
}
f(1); // 严格模式为[2, 1]
```

## 6、向下一个版本的 JavaScript 过渡
`JavaScript` 语言的下一个版本是 `ECMAScript 6`，为了平稳过渡，严格模式引入了一些 `ES6` 语法。
- **非函数代码块不得声明函数**。`ES6` 会引入**块级作用域**。为了与新版本接轨，`ES5` 的严格模式只允许在全局作用域或函数作用域声明函数。也就是说，`ES5`不允许在非函数的代码块内声明函数, `ES6` 允许在代码块之中声明函数。
- **保留字**。为了向将来 `JavaScript` 的新版本过渡，严格模式新增了一些保留字（`implements`、`interface`、`let`、`package`、`private`、`protected`、`public`、`static`、`yield`等）。使用这些词作为变量名将会报错
```js
// 在if代码块和for代码块中声明了函数，ES5 环境会报错
// 如果是 ES6 环境，不会报错
'use strict';
if (true) {
  function f1() { } // 语法错误
}
for (var i = 0; i < 5; i++) {
  function f2() { } // 语法错误
}

// 严格模式使用保留字会报错
function package(protected) { // 语法错误
  'use strict';
  var implements; // 语法错误
} // Uncaught SyntaxError: Unexpected strict mode reserved word
```