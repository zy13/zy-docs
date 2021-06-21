[console 对象与控制台](https://www.wangdoc.com/javascript/features/console.html)

## 1、console 对象

`console`对象是 `JavaScript` 的原生对象，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。console的常见用途有两个。
- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。

`console`对象的浏览器实现，包含在浏览器自带的开发工具之中。以 `Chrome` 浏览器的“开发者工具”（`Developer Tools`）为例，可以使用下面三种方法的打开它。
- 按 `F12` 或者`Control + Shift + i（PC）/ Command + Option + i（Mac）`。
- 浏览器菜单选择“工具/开发者工具”。
- 在一个页面元素上，打开右键菜单，选择其中的“`Inspect Element`”。

打开开发者工具以后，顶端有多个面板。
```js
Elements：查看网页的 HTML 源码和 CSS 代码。
Resources：查看网页加载的各种资源文件（比如代码文件、字体文件 CSS 文件等），
           以及在硬盘上创建的各种内容（比如本地缓存、Cookie、Local Storage等）。
Network：查看网页的 HTTP 通信情况。
Sources：查看网页加载的脚本源码。
Timeline：查看各种网页行为随时间变化的情况。
Performance：查看网页的性能情况，比如 CPU 和内存消耗。
Console：用来运行 JavaScript 命令。
```

## 2、console.log()，console.info()，console.debug()
`console`对象提供的各种静态方法，用来与控制台窗口互动。
- `console.info`是`console.log`方法的别名，用法完全一样。
- `console.debug`方法与`console.log`方法类似，会在控制台输出调试信息。
- `console`对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义`console.log`方法。
```js
// `console.log`方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。
console.log('Hello World')
// Hello World
console.log('a', 'b', 'c')
// a b c

// `console.log`方法会自动在每次输出的结尾，添加换行符
console.log(1);
console.log(2);
console.log(3);
// 1
// 2
// 3

// 如果第一个参数是格式字符串（使用了格式占位符），
// console.log方法将依次用后面的参数替换占位符，然后再进行输出。
// console.log方法的第一个参数有三个占位符（%s），
// 第二、三、四个参数会在显示时，依次替换掉这个三个占位符。
console.log(' %s + %s = %s', 1, 1, 2)
//  1 + 1 = 2

// console.log方法支持以下占位符，不同类型的数据必须使用对应的占位符。
%s 字符串
%d 整数
%i 整数
%f 浮点数
%o 对象的链接
%c CSS 格式字符串

// 第二个参数是数值，对应的占位符是%d，
// 第三个参数是字符串，对应的占位符是%s。
var number = 11 * 9;
var color = 'red';
console.log('%d %s balloons', number, color);
// 99 red balloons

// 使用%c占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行 CSS 渲染。
// 输出的内容将显示为黄底红字。
console.log(
  '%cThis text is styled!',
  'color: red; background: yellow; font-size: 24px;'
)

// console.log方法的两种参数格式，可以结合在一起使用。
console.log(' %s + %s ', 1, 1, '= 2')
// 1 + 1  = 2

// 如果参数是一个对象，console.log会显示该对象的值。
console.log({foo: 'bar'})
// {foo: "bar"}

// 输出Date对象的值，结果为一个构造函数
console.log(Date)
// ƒ Date() { [native code] }

// 使用自定义的console.log方法，可以在显示结果添加当前时间。
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});
console.log("出错了！");
```

## 2、console.warn()，console.error()

`warn`方法和`error`方法也是在控制台输出信息，它们与`log`方法的不同之处在于，
- `warn`方法输出信息时，在最前面加一个黄色三角，表示警告；
- `error`方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。
```js
console.error('Error: %s (%i)', 'Server is not responding', 500)
// Error: Server is not responding (500)

console.warn('Warning! Too few nodes (%d)', document.childNodes.length)
// Warning! Too few nodes (%d) 2
```

## 3、console.table()
对于某些复合类型的数据，`console.table`方法可以将其**转为表格显示**。
```js
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];
console.table(languages); 
// (index) name         fileExtension
// 0	"JavaScript"	".js"
// 1	"TypeScript"	".ts"
// 2	"CoffeeScript"	".coffee"
// Array(3)
// 0: {name: "JavaScript", fileExtension: ".js"}
// 1: {name: "TypeScript", fileExtension: ".ts"}
// 2: {name: "CoffeeScript", fileExtension: ".coffee"}
// length: 3
// __proto__: Array(0)
```

## 4、console.count()
`count`方法用于计数，输出它被调用了多少次。该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。
```js
// 每次调用greet函数，内部的console.count方法就输出执行次数。
function greet(user) {
  console.count();
  return 'hi ' + user;
}
greet('bob')
// default: 1
// "hi bob"
greet('alice')
// default: 2
// "hi alice"

// 根据参数的不同，显示bob执行了两次，alice执行了一次
function greet(user) {
  console.count(user);
  return "hi " + user;
}
greet('bob')
// bob: 1
// "hi bob"
greet('alice')
// alice: 1
// "hi alice"
greet('bob')
// bob: 2
// "hi bob"
```

## 5、console.dir()，console.dirxml()
`dir`方法用来对一个对象进行检查（`inspect`），并以易于阅读和打印的格式显示。
- 该方法对于输出 `DOM` 对象非常有用，因为会显示 `DOM` 对象的所有属性。
- `Node` 环境之中，还可以指定以代码高亮的形式输出。
- `dirxml`方法主要用于以目录树的形式，显示 `DOM` 节点。
- 如果参数不是 `DOM` 节点，而是普通的 `JavaScript` 对象，`console.dirxml`等同于`console.dir`。
```js
// dir方法的输出结果，比log方法更易读，信息也更丰富。
console.dir({f1: 'foo', f2: 'bar'})
// Object
//   f1: "foo"
//   f2: "bar"
//   __proto__: Object

// 显示 DOM 对象的所有属性。
console.dir(document.body)

// Node 环境之中，还可以指定以代码高亮的形式输出。
console.dir(obj, {colors: true})

// 以目录树的形式，显示 DOM 节点
console.dirxml(document.body)
```

## 6、console.assert()
`console.assert`方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。

- 它接受两个参数，第一个参数是**表达式**，第二个参数是**字符串**。
- 只有当第一个参数为`false`，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。
```js
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (!false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}

// 判断子节点的个数是否大于等于500
// 如果符合条件的节点小于500个，不会有任何输出
// 只有大于等于500时，才会在控制台提示错误，并且显示指定文本。
console.assert(list.childNodes.length < 500, '节点个数大于等于500')
```

## 7、console.time()，console.timeEnd()
这两个方法用于计时，可以算出**一个操作所花费的准确时间**。
- `time`方法表示计时开始，`timeEnd`方法表示计时结束。它们的**参数是计时器的名称**。
- 调用`timeEnd`方法之后，控制台会显示“计时器名称: 所耗费的时间”。
```js
console.time('Array initialize');
var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};
console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
```

## 8、console.group()，console.groupEnd()，console.groupCollapsed()
- `console.group`和`console.groupEnd`这两个方法用于**将显示的信息分组**。
- 它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
- `console.groupCollapsed`方法与`console.group`方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（`collapsed`），而不是展开的。
```js
// 将“二级分组”显示在“一级分组”内部，
// 并且“一级分组”和“二级分组”前面都有一个折叠符号，可以用来折叠本级的内容。
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 二级分组结束
console.groupEnd(); // 一级分组结束

// 只显示一行”Fetching Data“，点击后才会展开，显示其中包含的两行。
console.groupCollapsed('Fetching Data');

console.log('Request Sent');
console.error('Error: Server not responding (500)');

console.groupEnd();
```

## 9、console.trace()，console.clear()
`console.trace`方法显示**当前执行的代码在堆栈中的调用路径**。
```js
console.trace()
// console.trace()
//   (anonymous function)
//   InjectedScript._evaluateOn
//   InjectedScript._evaluateAndWrap
//   InjectedScript.evaluate
```
`console.clear`方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“`Preserve log`”选项，`console.clear`方法将不起作用。

## 10、控制台命令行 API
浏览器控制台中，除了使用`console`对象，还可以使用一些控制台自带的命令行方法。

- `$_`属性返回上一个表达式的值。
- `$0 - $4`：控制台保存了最近`5`个在 `Elements` 面板选中的 `DOM` 元素，`$0`代表倒数第一个（最近一个），`$1`代表倒数第二个，以此类推直到`$4`。
- `$(selector)`返回第一个匹配的元素，等同于`document.querySelector()`。注意，如果页面脚本对`$`有定义，则会覆盖原始的定义。比如，页面里面有 `jQuery`，控制台执行`$(selector)`就会采用 `jQuery` 的实现，返回一个数组。
- `$$(selector)`返回选中的 `DOM` 对象，等同于`document.querySelectorAll`。
- `$x(path)`方法返回一个数组，包含匹配特定 `XPath` 表达式的所有 DOM 元素。
- `inspect(object)`方法打开相关面板，并选中相应的元素，显示它的细节。
- `getEventListeners(object)`方法返回一个对象，该对象的成员为`object`登记了回调函数的各种事件（比如`click`或`keydown`），每个事件对应一个数组，数组的成员为该事件的回调函数。
- `keys(object)`方法返回一个数组，包含`object`的所有键名。
- `values(object)`方法返回一个数组，包含`object`的所有键值。
- `monitorEvents(object[, events])`方法监听特定对象上发生的特定事件。事件发生时，会返回一个`Event`对象，包含该事件的相关信息。
- `unmonitorEvents`方法用于停止监听。
- `clear()`清除控制台的历史。
- `copy(object)`复制特定 DOM 元素到剪贴板。
- `dir(object)`显示特定对象的所有属性，是`console.dir`方法的别名。
- `dirxml(object)`显示特定对象的 `XML` 形式，是`console.dirxml`方法的别名。
```js
// `$_`属性返回上一个表达式的值
2 + 2 // 4
$_ // 4

// 返回所有包含a元素的p元素。
$x("//p[a]")

// DOM 元素在Elements面板中显示，比如inspect(document)会在 Elements 面板显示document元素。
// JavaScript 对象在控制台面板Profiles面板中显示，比如inspect(window)

var o = {'p1': 'a', 'p2': 'b'};
keys(o)
// ["p1", "p2"]
values(o)
// ["a", "b"]

// 单个事件和多个事件的监听方法
monitorEvents(window, "resize");
monitorEvents(window, ["resize", "scroll"])

// 如何停止监听
monitorEvents($0, 'mouse');
unmonitorEvents($0, 'mousemove');

// monitorEvents允许监听同一大类的事件。所有事件可以分成四个大类。
mouse："mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", 
       "mouseout", "mousewheel"
key："keydown", "keyup", "keypress", "textInput"
touch："touchstart", "touchmove", "touchend", "touchcancel"
control："resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"

// 监听所有key大类的事件。
monitorEvents($("#msg"), "key");
```

## 11、debugger 语句
`debugger`语句主要用于除错，作用是设置断点。
- 如果有正在运行的除错工具，程序运行到`debugger`语句时会自动停下。
- 如果没有除错工具，`debugger`语句不会产生任何结果，`JavaScript` 引擎自动跳过这一句。
```js
// Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面。
// 打印出0，1，2以后，就会暂停，自动打开源码界面，等待进一步处理。
for(var i = 0; i < 5; i++){
  console.log(i);
  if (i === 2) debugger;
}
```