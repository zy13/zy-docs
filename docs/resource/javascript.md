## ♥-v8引擎及js代码的执行

[V8引擎简介——如何编译和执行JS代码](https://www.cnblogs.com/codexlx/p/14179920.html)

<enlarge><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0432ac39417e4ee9b238d0b753f0f23c~tplv-k3u1fbpfcp-zoom-1.image" /></enlarge>

### v8引擎工作原理

```js
// 假如有这样一段JavaScript源代码
console.log("hello world");
function sum(num1, num2) {
	return num1 + num2;
}
```

- `Parse`解析器，会将`JavaScript`代码转换成`AST`（抽象语法树），这是因为解释器并不直接认识`JavaScript`代码；
  - 如果函数没有被调用，那么是不会被转换成`AST`的；
  - `Parse`的`V8`官方文档：[https://v8.dev/blog/scanner](https://v8.dev/blog/scanner)
- `Ignition`解释器，会将`AST`转换成`ByteCode`（字节码）；
  - 同时会收集`TurboFan`优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
  - 如果函数只调用一次，`Ignition`直接解释为`ByteCode`；
  - `Ignition`的`V8`官方文档：[https://v8.dev/blog/ignition-interpreter](https://v8.dev/blog/ignition-interpreter)

- `TurboFan`优化编译器，可以将字节码编译为`CPU`可以直接执行的机器码；
  - 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过`TurboFan`转换成优化的机器码，提高代码的执行性能；
  - 但是，机器码实际上也会被还原为`ByteCode`，这是因为如果后续执行函数的过程中，类型发生了变化（比如`sum`函数原来执行的是`number`类型，后来执行变成了`string`类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；
  - `TurboFan`的`V8`官方文档：[https://v8.dev/blog/turbofan-jit](https://v8.dev/blog/turbofan-jit)

### V8的内存回收
[V8引擎的垃圾内存回收机制](https://juejin.cn/post/6875714523332870157)
- `Orinoco`模块，负责垃圾回收，将程序中不需要的内存回收；
- `Orinoco`的`V8`官方文档：[https://v8.dev/blog/trash-talk](https://v8.dev/blog/trash-talk)
### V8引擎
- V8引擎是谷歌开源的高性能`JavaScript`引擎，主要工作是：
- 编译和执行`JavaScript`
- 处理调用栈
- 内存分配
- 垃圾回收
### js代码的执行
在执行一段代码时，
- `JS` 引擎会首先创建一个**执行栈**
- 然后`JS`引擎会创建一个**全局执行上下文**，并`push`到执行栈中, 这个过程`JS`引擎会为这段代码中所有变量分配内存并赋一个初始值（`undefined`），
- 在创建完成后，`JS`引擎会进入执行阶段，这个过程`JS`引擎会逐行的执行代码，即
为之前分配好内存的变量逐个赋值(真实值)。

- 如果这段代码中存在`function`的声明和调用，那么`JS`引擎会创建一个**函数执行上下文**，并`push`到**执行栈**中，其创建和执行过程跟**全局执行上下文**一样。
- 但有特殊情况，即当函数中存在对其它函数的调用时，`JS`引擎会在父函数执行的过程中，将子函数的**全局执行上下文**`push`到**执行栈**，这也是为什么子函数能够访问到父函数内所声明的变量。
- 还有一种特殊情况是，在子函数执行的过程中，父函数已经`return`了，这种情况下，`JS`引擎会将父函数的上下文从执行栈中移除，
- 与此同时，`JS`引擎会为还在执行的**子函数上下文**创建一个**闭包**，这个闭包里保存了父函数内声明的变量及其赋值，子函数仍然能够在其上下文中访问并使用这边变量/常量。
- 当子函数执行完毕，`JS`引擎才会将子函数的上下文及闭包一并从执行栈中移除。

### js 如何处理高并发
最后，`JS`引擎是单线程的，那么它是如何处理高并发的呢？即当代码中存在异步调用时`JS`是如何执行的。
- 比如`setTimeout`或`fetch`请求都是非阻塞（`non-blocking`）的，
- 当异步调用代码触发时，`JS`引擎会将需要异步执行的代码移出调用栈，直到等待到返回结果，
- `JS`引擎会立即将与之对应的回调函数`push`进任务队列中等待被调用，
- 当调用(执行)栈中已经没有需要被执行的代码时，
- `JS`引擎会立刻将任务队列中的回调函数逐个`push`进调用栈并执行。这个过程我们也称之为**事件循环**。

### 附言
需要更深入的了解`JS`引擎，必须理解几个概念，
- 执行上下文，
- 闭包，
- 作用域，
- 作用域链，
- 事件循环。

建议去网上多看看相关文章，这里推荐一篇非常精彩的博客，对于`JS`引擎的执行做了图形化的说明，更加便于理解。

## ☆-原型设计模式

- 原型模式可用于创建新对象，但它创建的不是非初始化的对象，而是使用原型对象（或样本对
象）的值进行初始化的对象。**原型模式**也称为**属性模式**。

- **原型模式**在初始化**业务对象**时非常有用，业务对象的值与数据库中的默认值相匹配。原型对象中
的默认值被复制到新创建的业务对象中。

- 经典的编程语言很少使用原型模式，但作为原型语言的 `JavaScript` 在构造新对象及其原型时使用
了这个模式。

## ☆-看代码猜结果
下面代码的输出结果是什么?
```js
// 按顺序执行原则
sayHi()
function sayHi() {
  console.log(name);
  console.log(age);
  var name = 'Lydia';
  let age = 21;
}
// A. undefined 和 undefined;
// B. Lydia 和 ReferenceError;
// C. ReferenceError 和 21;
// D. undefined 和 ReferenceError;

// 本题的考点主要是var与let的区别以及var的预解析问题。
// var所声明的变量会被预解析，var name;提升到作用域最顶部，所以在开始的console.log(name)时，
// name已经存在，但是由于没有赋值，所以是undefined；
// 而let会有暂时性死区，也就是在let声明变量之前，你都无法使用这个变量，会抛出一个错误，故选D。
```
下面代码的输出结果是什么
```js
const arr = [1, 2, [3, 4, [5]]];
console.log(arr.flat(1)); // es6

// A. [1, 2, [3, 4, [5]]];
// B. [1, 2, 3, 4, [5]];
// C. [1, 2, [3, 4, 5]];
// D. [1, 2, 3, 4, 5];

// 这里主要是考察Array.prototype.flat方法的使用，扁平化会创建一个新的，被扁平化的数组，扁
// 平化的深度取决于传入的值；这里传入的是1也就是默认值，所以数组只会被扁平化一层，相当于
// [].concat([1, 2], [3, 4, [5]])，故选B。
```

```js
const name = 'Lydia Hallie';
const age = 21;
console.log(Number.isNaN(name));
console.log(Number.isNaN(age));
console.log(isNaN(name));
console.log(isNaN(age));

// A. true false true false
// B. true false false false
// C. false false true false
// D. false true false true

// 本题主要考察isNaN(es5)和Number.isNaN(es6)的区别；
// 首先isNaN在调用的时候，会先将传入的参数转换为数字类型，所以非数字值传入也有可能返回true，
// 所以第三个和第四个打印分别是true false；
// Number.isNaN不同的地方是，他会首先判断传入的值是否为数字类型，如果不是，直接返回
// false，本题中传入的是字符串类型，所以第一个和第二个打印均为false，故选C。
```

## ☆-其他类型值转换为字符串时的规则

`ToString`负责处理非字符串到字符串的**强制类型转换**。
- （1）`Null` 和 `Undefined` 类型 ，`null` 转换为 `"null"`，`undefined` 转换为 `"undefined"`，
- （2）`Boolean` 类型，`true` 转换为 `"true"`，`false` 转换为 `"false"`。
- （3）`Number` 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。 
- （4）`Symbol` 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。 
- （5）对普通对象来说，除非自行定义 `toString()` 方法，否则会调用`toString((Object.prototype.toString())`来返回内部属性 `[[Class]]` 的值，如`"[object Object]"`。如果对象有自己的 `toString()` 方法，字符串化时就会调用该方法并使用其返回值。

## ☆-其他类型值转换为数字时的规则

将非数字值当作数字来使用，比如数学运算抽象操作 `ToNumber`。
- （1）`Undefined` 类型的值转换为 `NaN`。
- （2）`Null` 类型的值转换为 `0`。
- （3）`Boolean` 类型的值，`true` 转换为 `1`，`false` 转换为 `0`。
- （4）`String` 类型的值转换如同使用 `Number()` 函数进行转换，如果包含非数字值则转换为
`NaN`，空字符串为 `0`。
- （5）`Symbol` 类型的值不能转换为数字，会报错。
- （6）对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，
则再遵循以上规则将其强制转换为数字。

为了将值转换为相应的基本类型值，抽象操作 `ToPrimitive` 会首先（通过内部操作
`DefaultValue`）检查该值是否有`valueOf()` 方法。
如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用`toString()` 的返回值
（如果存在）来进行强制类型转换.如果 `valueOf()` 和 `toString()` 均不返回基本类型值，会产生
`TypeError` 错误。

##  ☆-Object.is()和"==="、"=="的区别

- 使用双等号`"=="`进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。 
- 使用三等号`"==="`进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 `false`。
- 使用 `Object.is` 来进行相等判断时，一般情况下**和三等号的判断相同**，它处理了一些特殊的情况，
  - 比如 `-0` 和 `+0` 不再相等，
  - 两 个 `NaN` 认定为是相等的。

## ☆-CommonJS 模块

`Node`应用由模块组成，采用`CommonJS`模块规范。

`CommonJS`规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。

- 模块输出方式：`exports` 和 `module.exports`
- 模块输出方式：`require`
```js
var x = 5;
var addX = function (value) {
  return value + x;
};
// 通过module.exports输出变量x和函数addX。
module.exports.x = x;
module.exports.addX = addX;
```

`require`方法用于加载模块，其实就是加载模块的`module.exports`属性。
```js
var example = require('./example.js');
 
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

为了方便，**`Node`为每个模块提供一个`exports`变量，指向`module.exports`**。这等同在每个模块头部，有一行这样的命令。
```js
// 可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样
var exports = module.exports;
```

**注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。**

### 导出基础数据类型

对于**原始数据类型**，属于值的拷贝：一旦输出一个值，模块内部的变化就影响不到这个值。原始数据类型的值，会被缓存。
```js
// a.js
let count = 1
let incCount = () => {
  count++
}
setTimeout(()=>{
  console.log('a, 1s后',count);
},1000)

module.exports = {
  count, // 对count的拷贝：模块内部的变化不影响这个值
  incCount
}
```
```js
// b.js
const mod = require('./a.js')
console.log('main', mod.count); // 1
mod.incCount() 
console.log('main,incCount后', mod.count); // 1
setTimeout(()=>{
  mod.count=3
  console.log('main, 2s后', mod.count); //3
},2000)

// 打印结果
// main 1
// main,incCount后 1
// a, 1s后 2
// main, 2s后 3
```
`main.js`获得内部变动后的值，`a.js`的模块输出如下：
```js
// a.js
let count = 1
let incCount = () => {
  count++
}
setTimeout(()=>{
  console.log('a, 1s后',count);
},1000)

// 取消对原始数据类型的缓存
module.exports = {
  get count() {
    // 取值器函数，在main.js中可正确读取内部的变量的变动
    return count
  },
  incCount
}
```
```js
// main.js的输出
// main 1
// main,incCount后 2
// a, 1s后 2
// main, 2s后 2
```

### 导出复杂数据类型
对于**复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。**
```js
// b.js
let obj = {
  count: 1
}

let incCount = () => {
  obj.count++
}

setTimeout(()=>{
  console.log('b,1s后',obj.count);
},1000)

setTimeout(()=>{
  console.log('b,3s后',obj.count);
},3000)

module.exports = {
  obj,
  incCount
}
```
```js
// main.js
const {obj,incCount} = require('./b.js')
console.log('main', obj.count);
incCount()
console.log('main,incCount后', obj.count);
setTimeout(()=>{
  obj.count=3
  console.log('main, 2s后', obj.count);
},2000)
// main 1
// main,incCount后 2
// b,1s后 2
// main, 2s后 3
// b,3s后 3
```

### require
- 当使用`require`命令加载某个模块时，就会运行整个模块的代码。
- 当使用`require`命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，**`CommonJS`模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存**。
```js
// a.js
let count = 1
let incCount = () => {
  count++
}
setTimeout(()=>{
  console.log('a, 1s后',count);
},1000)

module.exports = {
  count,
  incCount
}
```
```js
const mod = require('./a.js')
console.log(111, mod.count);
mod.incCount()
const xxx = require('./a.js')
console.log(222,mod.count)
console.log(333, xxx.count);
// 111 1
// 222 1
// 333 1
// a, 1s后 2
```
- 循环加载时，属于加载时执行。即脚本代码在`require`的时候，就会全部执行。一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
```js
// x.js
exports.done = false

let y = require('./y.js')
console.log('x', y.done);

exports.done = true
console.log('x 执行完毕');
```
```js
// y.js
exports.done = false

let x = require('./x.js')

console.log('y.js', x.done);

exports.done = true

console.log('y.js 执行完毕');
```
```js
// z.js
let x = require('./x')
let y = require('./y')

console.log('z 执行完毕',x.done,y.done);
```

## ☆-ES6 模块

- ES6模块输出方式：`export`  和 `export default`
- ES6模块输入方式：`import ... from ...`

### ES6 模块中的值

- 1、`ES6`模块中的值属于【动态只读引用】
- 2、对于只读来说，即不允许修改引入变量的值，`import`的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到`import`命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
- 3、对于动态来说，**原始值发生变化，`import`加载的值也会发生变化**。不论是基本数据类型还是复杂数据类型。
```js
// a.js
import {obj} from './b.js'
// obj = {} 报错
console.log('a.js',obj);
setTimeout(()=>{
  console.log('a,2s后',obj);
},2000)
```
```js
// b.js
export let obj = {
  count: 1
}

setTimeout(()=>{
  console.log('b', obj.count);
  obj.count++
},1000)
```
- 4、循环加载时，`ES6`模块是动态引用。只要两个模块之间存在某个引用，代码就能够执行。
```js
// x.js
import {bar} from './y.js'
export function foo() {
  console.log('');
  bar();foo
  console.log('执行完毕');
}
foo()
```
```js
// y.js
import {foo} from './x.js'
export function bar() {
  console.log('bar');
  if(Math.random()>0.5) {
    foo()
  }
}

// 执行结果有多重可能
// x.js:3 foo
// y.js:3 bar
// x.js:3 foo
// y.js:3 bar
// x.js:5 执行完毕
// x.js:5 执行完毕
```

## ♥-CommonJS模块与ES6模块的区别
[CommonJS模块与ES6模块的区别](https://www.cnblogs.com/unclekeith/p/7679503.html)

- 语法不同，`ES6 module` 导出 是`export`，`import`导入；`commonjs` 导出是`module.exports`，导入是`require`；
- `ES6 module`针对 前端，`commonjs`针对后端；
- 加载时机不同，`commonjs`运行时加载模块，`ES6 module`编译时加载模块；
- `commonjs`导出基础类型属于值的拷贝，通过getter可以修改，导出复杂数据类型属于值的引用；`ES6 module`导出一个值的引用，且只读，不能修改；
- `commonjs`一个文件只能导出一个值，即模块中的`module.exports`属性；`ES6 module` 可以导出多个。
## ☆-Commonjs中module.exports和exports的区别
[Commonjs规范中module.exports和exports的区别](https://www.cnblogs.com/fightjianxian/p/12151010.html)
- `require`只能引入`module.exports`导出的值，不能引入`exports`导出的值
- `module.exports` 是一个对象，`exports`默认则是指向这个对象的引用
- `module.exports`和`exports`是等价的
- 每个导出模块 `node.js` 默认会返回 `return module.exports`
```js
// 写法是一致的，给最初的空对象{}添加了一个属性
exports.age = 18;
module.exports.age = 18;
// 通过require得到的就是{age: 18}
```

## ☆-请解释原型设计模式

原型模式可用于创建新对象，但它创建的不是非初始化的对象，而是使用原型对象（或样本对
象）的值进行初始化的对象。原型模式也称为属性模式。

原型模式在初始化业务对象时非常有用，业务对象的值与数据库中的默认值相匹配。原型对象中
的默认值被复制到新创建的业务对象中。

经典的编程语言很少使用原型模式，但作为原型语言的 `JavaScript` 在构造新对象及其原型时使用
了这个模式。

## ☆-JS判断变量的类型
- (1) **使用 typeof 检测** 当需要变量是否是`number`, `string`, `boolean`, `function`, `undefined`类型
时，可以使用`typeof`进行判断。 `arr, json, nul, date, reg, error` 全部被检测为`object`类型，其他
的变量能够被正确检测出来。
- (2) **使用 instanceof 检测** `instanceof` 运算符与 `typeof` 运算符相似，用于识别正在处理的对象的类
型。与 `typeof` 方法不同的是，`instanceof` 方法要求开发者**明确地确认对象为某特定类型**。
- (3) **使用 constructor 检测** `constructor`本来是原型对象上的属性，指向构造函数。但是根据实例
对象寻找属性的顺序，若实例对象上没有实例属性或方法时，就去原型链上寻找，因此，实例对象也是能使用`constructor`属性的。

## ♥-防抖与节流
[防抖和节流](https://segmentfault.com/a/1190000018428170/)严格算起来应该属于性能优化的知识。实际上遇到的频率相当高，处理不当或者放任不管就容易引起浏览器卡死。

### 滚动条案例

很多网站会提供这么一个按钮：用于返回顶部。这个按钮只会在滚动到距离顶部一定位置之后才出现，那么我们现在抽象出这个功能需求-- **监听浏览器滚动事件，返回当前滚条与顶部的距离**
```js
function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动位置：', scrollTop);
}
window.onscroll = showTop
```
```js
// scroll事件的默认执行频率，太高了：点击一次键盘的【向下方向键】，会发现函数执行了8-9次！
let displayEle = document.querySelector('.display')
window.onscroll = function() {
  window.requestAnimationFrame(function(){
    displayEle.style.display = window.scrollY>100?'block':'none'
    document.querySelector('#totop').onclick = function() {
      window.scrollTo(0,0)
    }
  })      
}
```

### 防抖（debounce）

对于短时间内连续触发的事件（上面的滚动事件），**防抖**的含义就是让某个时间期限（如上面的1000毫秒）内，事件处理函数只执行一次

在第一次触发事件时，不立即执行函数，而是给出一个期限值比如`200ms`，然后：
- 如果在`200ms`内没有再次触发滚动事件，那么就执行函数
- 如果在`200ms`内再次触发滚动事件，那么当前的计时取消，重新开始计时

**优化效果**：如果短时间内大量触发同一事件，只会执行一次函数。

**实现**：既然前面都提到了计时，那实现的关键就在于`setTimeout`这个函数，由于还需要一个变量来保存计时，考虑维护全局纯净，可以借助闭包来实现：
```js
/*
* fn[function] 需要防抖的函数
* delay[number] 毫秒，防抖期限值
*/
function debounce(fn, delay) {
  let timer = null // 闭包
  return function() {
    if(timer){
      clearTimeout(timer) // delay内多次触发，取消计时，重新计算
    }
    timer = setTimeout(fn, delay)
  }
}
```

**滚动条防抖实现**：
```js
function showTop() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动位置：', scrollTop);
}
function debounce(fn, delay) {
  let timer = null // 闭包
  return function() {
    if(timer){
      clearTimeout(timer) // delay内多次触发，取消计时，重新计算
    }
    timer = setTimeout(fn, delay)
  }
}
window.onscroll = debounce(showTop,1000)
```

### 节流（throttle）
使用上面的防抖方案来处理问题的结果是：
- 如果在限定时间段内，不断触发滚动事件（比如某个用户闲着无聊，按住滚动不断的拖来拖去），只要不停止触发，理论上就永远不会输出当前距离顶部的距离。

但是如果产品同学的期望处理方案是：即使用户不断拖动滚动条，也能在某个时间间隔之后给出反馈呢？

可以设计一种类似控制阀门一样定期开放的函数，也就是**让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活**（类似于技能冷却时间）

**效果**：如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。

**实现**：这里借助`setTimeout`来做一个简单的实现，加上一个状态位`valid`来表示当前函数是否处于工作状态：
```js
function thottle(fn, delay) {
  let valid = true
  return function() {
    if(!valide) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}
window.onscroll = thottle(fn, delay)
```
### 其他应用场景举例
- 搜索框`input`事件，例如要支持输入实时搜索可以使用节流方案（间隔一段时间就必须查询相关内容），或者实现输入间隔大于某个值（如`500ms`），就当做用户输入完成，然后开始搜索，具体使用哪种方案要看业务需求。
- 页面`resize`事件，常见于需要做页面适配的时候。需要根据最终呈现的页面情况进行`dom`渲染（这种情形一般是使用防抖，因为只需要判断最后一次的变化情况）

## ☆-Window.onload和DOMContentLoaded区别是什么

- `Window.onload`网页资源加载完毕后触发，包括`html`、`js`、`css`、图片等
- `DOMContentLoaded`只要`DOM`结构加载完成后就触发


