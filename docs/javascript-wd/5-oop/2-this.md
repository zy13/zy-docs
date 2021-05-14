[this关键字](https://www.wangdoc.com/javascript/oop/this.html)

## 1、this概述

`this`就是属性或方法“当前”所在的对象。它总是返回一个对象，用在构造函数之中，表示实例对象。
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

// 于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的。
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
`JavaScript` 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，`this`就是函数运行时所在的对象（环境）。`this`的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。

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