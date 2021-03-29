### 目标
  - 掌握es6基本使用
  - 了解数据驱动视图模式
  - 完成员工列表案例
  - 完成百度音乐案例

## 1、ECMAScript6 简介
### JavaScript三大组成部分
  - ECMAScript
  - DOM
  - BOM
### ECMAScript 发展历史
- [发展历史](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources)
### ECMAScript 包含内容
- JS 中的数据类型及相关操作
- 流程控制
- 运算符及相关运算

## 2、let 和 const

- **let** - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- **const** - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)



### let 和 var 的差异

- let 允许声明一个在作用域限制在块级中的变量、语句或者表达式
  - 作用域规则：块级作用域
  ```js
  function letTest() {
    let x = 1;
    {
      let x = 2;  // 不同的变量
      console.log(x);  // 2
    }
    console.log(x);  // 1
  }
  ```
  - 模仿私有成员
  - let 不能重复声明 （SyntaxError）
  - 暂存死区 - let 不会被预解析 （ReferenceError）
    - 不存在变量提升
    ```js
    function do_something() {
      console.log(bar); // undefined
      console.log(foo); // ReferenceError
      var bar = 1;
      let foo = 2;
    }
    ```
- var 声明的变量只能是全局或者整个函数块的
  - 作用域规则：全局或整个封闭函数
  ```js
  function varTest() {
    var x = 1;
    {
      var x = 2;  // 同样的变量!
      console.log(x);  // 2
    }
    console.log(x);  // 2
  }
  ```
- 在程序和方法的最顶端，位于函数或代码顶部的
  - **var**声明会给全局对象新增属性
  - **let**不会在全局对象里新建一个属性
  ```js
  // 全局对象为window
  var x = 'global';
  let y = 'global';
  console.log(this.x); // "global"
  console.log(this.y); // undefined
  ```

### const 常量
变量用**const**声明的时候就被赋值。
- 常量不能重新赋值
- 不能重复声明
- 块级作用域
- 不会被预解析
  
## 3、解构赋值

[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)语法是一种 Javascript 表达式。通过解构赋值, 可以将**属性/值**从**对象/数组**中取出,赋值给其他变量。
- 对象的解构赋值
- 数组的解构赋值
- 字符串的解构赋值

## 4、解构数组
- 变量声明并赋值时的解构：`var [one, two, three] = foo;`
- 变量先声明后赋值时的解构: `var a, b; [a, b] = [1, 2];`
- 默认值: `var a, b; [a=5, b=7] = [1];`
- 交换变量 - 不需要临时变量: `var a = 1; var b = 3; [a, b] = [b, a];`
- 解析一个从函数返回的数组 - 在一行内完成解析： 
  ```js
  function f() {
    return [1, 2];
  }
  var a, b;
  [a, b] = f();
  ```
- 忽略某些返回值:
  ```js
  function f() {
    return [1, 2, 3];
  }
  var [a, , b] = f();
  ```
- 将剩余数组赋值给一个变量: `var [a, ...b] = [1, 2, 3];`
  - `...b`为剩余元素，必须是数组最后一个元素
- 用正则表达式匹配提取值
  - `exec()`匹配字符串会返回一个数组
    - 数组第一个值是完全匹配正则表达式的字符串
    - 后面的值是匹配**正则表达式括号内**内容部分
  ```js
  var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url)
  // 逗号前面忽略第一个值
  var [, protocol, fullhost, fullpath] = parsedURL;
  ```

## 5、解构对象
- 基本赋值：`var o = {p: 42, q: true}; var {p, q} = o;`
- 无声明赋值: `var a, b; ({a, b} = {a: 1, b: 2});`
  - 圆括号 `()` 是必须的
  - 左边的 `{a, b}` 是一个块, 右边是一个无声明变量
  - `() `表达式之前需要有一个分号`;`, 否则它可能会被当成上一行中的函数执行
- 给新的变量名赋值：`var o = {p: 42, q: true}; var {p: foo, q: bar} = o;`
- 默认值: `var {a = 10, b = 5} = {a: 3};`
  - 当要提取的对象对应属性解析为 `undefined`，变量就被赋予默认值
- 给新的变量命名并提供默认值: `var {a:aa = 10, b:bb = 5} = {a: 3};`
- 函数参数默认值:
  ```js
  // es5
  function drawES5Chart(options) {
    options = options === undefined ? {} : options;
    var size = options.size === undefined ? 'big' : options.size;
    var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
    var radius = options.radius === undefined ? 25 : options.radius;
    console.log(size, cords, radius);
    // now finally do some chart drawing
  }
  // es6
  function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {})
  drawES5Chart({
    cords: { x: 18, y: 30 },
    radius: 30
  });
  ```
- 从作为函数实参的对象中提取数据
  ```js
  function userId({id}) {
    return id;
  }

  function whois({displayName: displayName, fullName: {firstName: name}}){
    console.log(displayName + " is " + name);
  }

  var user = {
    id: 42,
    displayName: "jdoe",
    fullName: {
        firstName: "John",
        lastName: "Doe"
    }
  };

  console.log("userId: " + userId(user)); // "userId: 42"
  whois(user); // "jdoe is John"
  ```
- 对象属性计算名和解构
  ```js
  let key = "z";
  let { [key]: foo } = { z: "bar" };
  ```
- 对象解构中的 Rest
  ```js
  // ...rest剩余元素
  let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
  ```
- 解构对象时会查找原型链
  - 如果属性不在对象自身，将从原型链中查找
  ```js
  // 声明对象 和 自身 self 属性
  var obj = {self: '123'};
  // 在原型链中定义一个属性 prot
  obj.__proto__.prot = '456';
  // test
  const {self, prot} = obj;
  // self "123"
  // prot "456"（访问到了原型链）
  ```

## 6、解构嵌套对象和数组
```js
const metadata = {
  title: 'Scratchpad',
  translations: [
    {
      locale: 'de',
      localization_tags: [],
      last_edit: '2014-04-14T08:43:37',
      url: '/de/docs/Tools/Scratchpad',
      title: 'JavaScript-Umgebung'
    }
  ],
  url: '/en-US/docs/Tools/Scratchpad'
};

let {
  title: englishTitle, // rename
  translations: [
    {
       title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
```

## 7、For of迭代和解构
```js
var people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith'
    },
    age: 35
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones'
    },
    age: 25
  }
];

for (var {name: n, family: {father: f}} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}
```

## 8、展开运算符
- 展开运算符 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- apply方法 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

只能用于可迭代对象：数组或者对象
- 对象展开
- 数组展开


### 在函数调用时使用展开语法 - 等价于apply的方式

- 如果想将数组元素迭代为函数参数
  - 可以使用 **Function.prototype.apply** 的方式进行调用
  ```js
  function myFunction(x, y, z) { }
  var args = [0, 1, 2];
  myFunction.apply(null, args);
  ```
  - 展开语法
  ```js
  function myFunction(x, y, z) { }
  var args = [0, 1, 2];
  myFunction(...args);
  ```
  - 所有参数都可以通过展开语法来传值，也不限制多次使用展开语法
  ```js
  function myFunction(v, w, x, y, z) { }
  var args = [0, 1];
  myFunction(-1, ...args, 2, ...[3]);
  ```

### 在new表达式中调用
  ```js
  var dateFields = [1970, 0, 1]; // 1970年1月1日
  var d = new Date(...dateFields);
  ```
  
## 9、展开语法 - 构造字面量数组

### 构造字面量数组
- 没有展开语法的时候，只能组合使用 push, splice, concat 等方法
  ```js
  // 用展开语法轻松实现
  var parts = ['shoulders', 'knees'];
  var lyrics = ['head', ...parts, 'and', 'toes'];
  ```

### 数组浅拷贝(copy)
展开语法和 **Object.assign()** 行为一致， 执行的都是浅拷贝(只遍历一层)
```js
var arr = [1, 2, 3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4);
// arr2 此时变成 [1, 2, 3, 4]
// arr 不受影响
```

### 连接多个数组
**Array.concat** 函数常用于将一个数组连接到另一个数组的后面。
```js

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// es5方法：将 arr2 中所有元素附加到 arr1 后面并返回
var arr3 = arr1.concat(arr2);

// 展开方法
var arr3 = [...arr1, ...arr2]; 
```

**Array.unshift** 方法常用于在数组的开头插入新元素/数组
```js
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// 将 arr2 中的元素插入到 arr1 的开头
Array.prototype.unshift.apply(arr1, arr2) // arr1 现在是 [3, 4, 5, 0, 1, 2]
// 等价于arr1.unshitf(...arr2)

// 展开方法
arr1 = [...arr2, ...arr1]
```
  
## 10、Set 对象 - 任何类型的值的集合

- Set对象 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
- 基本数据类型 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)

Set对象是值的集合，允许你存储任何类型的唯一值，无论是原始值或者是对象引用，Set中的元素只会出现一次，即 Set 中的元素是唯一的。

- Set 对象的数据结构
- Set 相关属性与方法
- size 属性
  - 返回 Set 对象中的值的个数

### 实例方法
- add()：在Set对象尾部添加一个元素。返回该Set对象。
- clear()：移除Set对象内的所有元素。
- delete()：移除Set中与这个值相等的元素。
- has()：返回一个布尔值，表示该值在Set中存在与否。
- entries()：返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。
- forEach()
- keys(): 与entries一样
- values(): 与keys一样

### 使用Set对象
```js
let mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add("some text"); // Set [ 1, 5, "some text" ]
let o = {a: 1, b: 2};
mySet.add(o);

mySet.add({a: 1, b: 2}); // o 指向的是不同的对象，所以没问题

mySet.has(1); // true
mySet.has(3); // false
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5);  // true,  从set中移除5
mySet.has(5);     // false, 5已经被移除

mySet.size; // 4, 刚刚移除一个值

console.log(mySet);
// logs Set(4) [ 1, "some text", {…}, {…} ] in Firefox
// logs Set(4) { 1, "some text", {…}, {…} } in Chrome
```

### 迭代Set

- 使用 Array.from 转换Set为Array
```js
var myArr = Array.from(mySet)
```

- Set 和 Array互换
```js
mySet2 = new Set([1, 2, 3, 4]);
mySet2.size;
[...mySet2]
```

- 求交集
```js
let intersection = new Set([...set1].filter(x => set2.has(x)));
```

- 求差集
```js
let difference = new Set([...set1].filter(x => !set2.has(x)));
```

- 用forEach迭代
```js
mySet.forEach(function(value) {
  console.log(value);
});
```

- 其他
```js
// 迭代整个set
// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
for (let item of mySet) console.log(item);

// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
for (let item of mySet.keys()) console.log(item);

// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
for (let item of mySet.values()) console.log(item);

// 按顺序输出：1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}
//(键与值相等)
for (let [key, value] of mySet.entries()) console.log(key);
```

### 数据去重
```js
let numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
numbers = [...new Set(numbers)]
```

## 11、Map 对象

- Map 对象 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- for...of语句 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)：遍历可迭代对象 Object，Array，Map，Set，String

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值。

- Map 对象的数据结构
- Map 相关属性与方法
- size 属性
- clear()、delete()、get()、has()、get()、set() 

### 使用 Map 对象
```js
let myMap = new Map();

let keyObj = {};
let keyFunc = function() {};
let keyString = 'a string';

// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");

myMap.size; // 3

// 读取值
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get(keyObj);       // "和键keyObj关联的值"
myMap.get(keyFunc);      // "和键keyFunc关联的值"

myMap.get('a string');   // "和键'a string'关联的值"
                         // 因为keyString === 'a string'
myMap.get({});           // undefined, 因为keyObj !== {}
myMap.get(function() {}); // undefined, 因为keyFunc !== function () {}
```
### 使用 for..of 方法迭代 Map
```js
let myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
for (let [key, value] of myMap) {
  console.log(key + " = " + value);
}
// 将会显示两个log。一个是"0 = zero"另一个是"1 = one"

for (let key of myMap.keys()) {
  console.log(key);
}
// 将会显示两个log。 一个是 "0" 另一个是 "1"

for (let value of myMap.values()) {
  console.log(value);
}
// 将会显示两个log。 一个是 "zero" 另一个是 "one"

for (let [key, value] of myMap.entries()) {
  console.log(key + " = " + value);
}
// 将会显示两个log。 一个是 "0 = zero" 另一个是 "1 = one"
```

### 使用 forEach() 方法迭代 Map
```js
myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
})
```

### Map和数组的关系
```js
let kvArray = [["key1", "value1"], ["key2", "value2"]];

// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
let myMap = new Map(kvArray);

myMap.get("key1"); // 返回值为 "value1"

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和kvArray相同的数组

// 更简洁的方法来做如上同样的事情，使用展开运算符
console.log([...myMap]);

// 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```

### 复制或合并 Maps
Map 能像数组一样被复制:
```js
let original = new Map([
  [1, 'one']
]);

let clone = new Map(original);

console.log(clone.get(1)); // one
console.log(original === clone); // false. 浅比较 不为同一个对象的引用
```
Map对象间可以进行合并，但是会保持键的唯一性
```js
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);

// 合并两个Map对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开运算符本质上是将Map对象转换成数组。
let merged = new Map([...first, ...second]);

console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```
Map对象也能与数组合并
```js
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);

// Map对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
let merged = new Map([...first, ...second, [1, 'eins']]);

console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```
  
## 12、函数新增扩展

### 箭头函数 
[手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- 适用于需要匿名函数的地方
- 没有自己的`this`，`arguments`，`super`或`new.target`
- 不能用作构造函数
- 通过 call 或 apply 调用

### this的指向问题

- 构造函数，this指针该实例化对象
- 在严格模式下的函数调用下，this指向undefined
- 如果是该函数是一个对象的方法，则它的this指针指向这个对象
- ...
  
## 13、新增数组扩展
数组扩展 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- Array.from()、Array.of()
- find()、findIndex()、includes()
- flat()、flatMap()
  
## 14、新增字符串扩展
字符串扩展 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
- includes(), startsWith(), endsWith()
- repeat()
- 模版字符串
  
## 15、新增对象扩展
对象扩展 - [手册地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
- 属性简洁表示法
- 属性名表达式
  
## 16、babel 使用
babel - [手册地址](https://www.babeljs.cn/)
- Babel 是一个 JavaScript 编译器
- Babel 基本使用方法

## 17、员工列表
- 数据驱动视图
- 员工列表筛选

## 18、百度音乐全选列表
- 实现添加功能
- 实现全选功能
- 实现删除功能