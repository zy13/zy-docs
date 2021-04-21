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

## ♥-同构字符串

描述：[答案](https://leetcode-cn.com/problems/isomorphic-strings/solution/tong-gou-zi-fu-chuan-by-leetcode-solutio-s6fd/)
```
给定两个字符串 `s` 和 `t`，判断它们是否是同构的。

如果 `s` 中的字符可以按某种映射关系替换得到 `t` ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，
相同字符只能映射到同一个字符上，字符可以映射到自己本身。
```

题解：[练习](https://leetcode-cn.com/problems/isomorphic-strings/)
```
判断 ss 和 tt 每个位置上的字符是否都一一对应，
即 ss 的任意一个字符被 tt 中唯一的字符对应，
同时 tt 的任意一个字符被 ss 中唯一的字符对应。
这也被称为「双射」的关系。
```

```js
isIsomorphic("egg", 'add'); // true
isIsomorphic("paper", 'title'); // true
isIsomorphic("kick", 'side'); // false

function isIsomorphic(s, t) {
  let s2t = {}, t2s = {}
  for(let i=0;i<s.length;i++){
    let x=s[i], y=t[i]
    if(s2t[x] && s2t[x] !== y || t2s[y] && t2s[y] !== x) {
      // ss 的任意一个字符被 tt 中唯一的字符对应
      // 同时 tt 的任意一个字符被 ss 中唯一的字符对应
      return false
    }
    s2t[x] = y
    t2s[y] = x
  }
  return true
}
```

[力扣-同构字符串](https://leetcode-cn.com/problems/isomorphic-strings/)

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

## ☆-答其他类型值转换为数字时的规则

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

