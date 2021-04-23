## 1、模块化介绍

- 模块化已经是现代化前端开发中不可或缺的一部分
- 把复杂的问题分解成相对独立的模块，这样的设计可以降低程序复杂性，提高代码的重用，也有利于团队协作开发与后期的维护和扩展
- 从`ECMAScript2015`开始引入模块的概念，我们成为：`ECMAScript Module`，简称`ESM`

## 2、模块化的核心

- 独立的作用域和依赖关系的处理
  - 如何导出模块内部数据
  - 如果导入外部模块数据

## 3、基于 JavaScript 的模块系统分类

- CommonJS（适用于服务端）
- AMD/CMD
- UMD
- ESM - EcmaScript Module
- TypeScript Module

无论是那种模块化规范，重点关注

- 独立模块作用域
- 导出模块内部数据
- 导入外部模块数据

## 4、ESM-es6模块规范

- 从`ECMAScript2015/ECMAScript6`开始，`JavaScript`原生引入了模块概念，而且现在主浏览器也都有了很好的支持

- ES6模块输出方式：`export`  和 `export default`
- ES6模块输入方式：`import ... from ...`

### ES6模块
- 1、`ES6`模块中的值属于【动态只读引用】
- 2、对于只读来说，即不允许修改引入变量的值，`import`的变量是只读的，不论是基本数据类型还是复杂数据类型。当模块遇到`import`命令时，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
- 3、对于动态来说，**原始值发生变化，`import`加载的值也会发生变化**。不论是基本数据类型还是复杂数据类型。
### 4-1、独立模块作用域

- 一个文件就是模块，拥有独立的作用域，且导出的模块都自动处于严格模式下，即：`use strict`

### 4-2、导出模块内部数据

使用 `export` 语句导出模块内部数据

- **导出单个特性**

```js
export let name1, name2, …, nameN;
export let name1 = …, name2 = …, …, nameN;
export function FunctionName(){...};
export class ClassName {...};
```

- **导出列表**
```js
export { name1, name2, …, nameN };
```

- **重命名导出**
```js
export { variable1 as name1, variable2 as name2, …, nameN };
```

- **默认导出**
```js
export default expression;
export default function (…) { … }
export default function name1(…) { … }
export { name1 as default, … };
```

- **模块重定向导出**
```js
export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
export { default } from …;
```

### 4-3、导入外部模块数据

导入分为两种模式

- 静态导入
- 动态导入

### 静态导入

- 在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用。
```js
// 静态导入方式不支持延迟加载，import 必须这模块的最开始
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";

document.onclick = function () {
  // 使用模块
  // console.log(...);
}

```

### 动态导入

- 此外，还有一个类似函数的动态 `import()`，它不需要依赖 `type="module"` 的 script 标签。
- 关键字 `import` 可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 `promise`。
- 通过 `import()` 方法导入返回的数据会被包装在一个对象中，即使是 `default` 也是如此

```js
import('./m.js').then(m => {
  //...
});
// 也支持 await
let m = await import('./m.js');
```

## 5、CommonJS-同步模块规范

早期前端对于模块化并没有什么规范，反而是偏向服务端的应用有更强烈的需求，CommonJS 规范就是一套偏向服务端的模块化规范，NodeJS 就采用了这个规范。
### CommonJS模块
- 模块输出方式：`exports` 和 `module.exports`
- 模块输出方式：`require`

`CommonJS`规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。

**注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。**
### 5-1、独立模块作用域

一个文件就是模块，拥有独立的作用域

### 5-2、导出模块内部数据

通过 `module.exports` 或 `exports` 对象导出模块内部数据

```js
// a.js
let a = 1;
let b = 2;

module.exports = {
  x: a,
  y: b
}
// or
exports.x = a;
exports.y = b;
```

### 5-3、导入外部模块数据

通过 `require` 函数导入外部模块数据

```js
// b.js
let a = require('./a');
a.x;
a.y;
```

## 6、AMD-异步模块定义规范

- [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)) (**Asynchronous Module Definition**) - 异步模块定义规范
- 因为 CommonJS 规范一些特性（基于文件系统，同步加载），它并不适用于浏览器端，所以另外定义了适用于浏览器端的规范
- 浏览器并没有具体实现该规范的代码，我们可以通过一些`第三方库`来解决

### 6-1、[requireJS](https://requirejs.org/)

```html
<script data-main="scripts/main" src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
```

#### 独立模块作用域

通过一个 `define` 方法来定义一个模块，并通过该方法的`第二个回调函数参数`来产生`独立作用域`

```js
// scripts/Cart.js
define(function() {
  // 模块内部代码
})
```

#### 导出模块内部数据

- 通过 `return` 导出模块内部数据

```js
// scripts/Cart.js
define(function() {
  return class Cart {
    add(item) {
      console.log(`添加商品：${item}`)
    }
  }
})
```

#### 导入外部模块数据

通过`前置依赖列表`导入外部模块数据

```js
// scripts/main.js
// 定义一个模块，并导入 ./Cart 模块
define(['./Cart'], function(Cart) {
  let cart = new Cart()
  cart.add({name: 'iphoneXX', price: 1000000})
})
```

## 7、CMD- requireJS 的 CommonJS 风格

- `require.js` 也支持 `CommonJS` 风格的语法

### 7-1、导出模块内部数据

```js
// scripts/Cart.js
define(['require', 'exports', 'module'], function(require, exports, module) {
  class Cart {
    add(item) {
      console.log(`添加商品：${item}`)
    }
  }
  exports.Cart = Cart;
})
// 忽略不需要的依赖导入
define(['exports'], function(exports) {
  class Cart {
    add(item) {
      console.log(`添加商品：${item}`)
    }
  }
  exports.Cart = Cart;
})
// 如果是依赖的导入为：require, exports, module，也可以省略依赖导入声明
define(function(require, exports, module) {
  class Cart {
    add(item) {
      console.log(`添加商品：${item}`)
    }
  }
  exports.Cart = Cart;
})
```

### 7-2、导入外部模块数据

```js
// scripts/main.js
define(['./Cart'], function(Cart) {
  let cart = new Cart()
  cart.add({name: 'iphoneXX', price: 1000000})
})
```

## 8、UMD-不属于一套模块规范

- 严格来说，UMD 并不属于一套模块规范，它主要用来处理 CommonJS、AMD、CMD 的差异兼容，是模块代码能在前面不同的模块环境下都能正常运行

```js
(function M(root, factory) {
  	if (typeof module === "object" && typeof module.exports === "object") {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    }
    else if (typeof define === "function" && define.amd) {
      	// AMD 模块环境下
        define(['jquery'], factory);
    } else {
      root.f = factory();
    }
}(this, function ($) { // $ 要导入的外部依赖模块
    $('div')
    // ...
    function b(){}
    function c(){

    // 模块导出数据
    return {
        b: b,
        c: c
    }
}));
```


## 9、直播课件

[有道云笔记](https://note.youdao.com/web/#/file/WEB74da0fb14c405c2f454cd051a2d4ae0a/markdown/WEB531cc90408eee1c943a994351bb5a8c9/)