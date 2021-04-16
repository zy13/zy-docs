### 知识点
- 对象的创建: `理解面相对象思想`
- 工厂模式: `会使用工厂模式`
- new运算符: `会使用new运算符`
- 构造函数: `会使用构造函数`
- 原型prototype: `理解原型`
- 构造函数继承: `会使用继承`
- 原型的继承: `会使用继承`
- 原型链：`理解原型链`

## 1、面向对象概念

- 面向过程：注重解决问题的步骤，分析问题需要的每一步，实现函数一次调用，如
`for`循环语句
- 面向对象：是一种程序设计思想，它将数据和处理数据的程序封建到对象里。
- 面向对象的特征：抽象、继承、封装、多态
```js
小明去餐厅吃饭：

1、面向过程 - 小明走去餐厅看菜单点餐吃饭

2、面向对象 - （1）小明（走、看、点餐、吃饭）；（2）餐厅（菜单）

研究对象间的关系：小明.去.餐厅 小明.看.菜单 小明.点餐 小明.吃
````

**优点：提高代码的复用性和可维护性。**

## 2、对象的创建方式

对象：Javascript 是一种基于对象的语言，几乎所有东西都是对象；

### 对象的创建方式：
- 1、字面量；
- 2、构造函数 new Object() 或者 类的实例化对象；
- 3、Object.create()
- 4、Object.defineProperty
- 5、Proxy
- 6、单例模式、工厂模式

### 字面量创建
```js
  let str = 'name'
  let obj1 = {
    [str]: '张三',
    age: 20,
    hobby: function() {
      console.log('喜欢打篮球')
    }
  }
```

### 构造函数 new Object()创建
```js
  let obj2 = new Object()
  obj2.name = '张三'
  obj2.age = 20
  obj2.hobby = function() {
    console.log('喜欢打篮球')
  }
```

```js
  let obj2 = new Object({
    name: '张三',
    age: 20,
    hobby: function() {
      console.log('喜欢打篮球')
    }
  })
```

### Object.create()创建：属性方法放在原型上。
```js
  let obj3 = Object.create({
    name: '张三',
    age: 20,
    hobby() {
      console.log('喜欢打篮球')
    }
  })
```

## 3、工厂模式

工厂模式解决了代码的复用问题。

```js
// 字面量创建对象
let zhangsan = {
  name: '张三',
  age: 20,
  hobby() {
    console.log('喜欢打篮球')
  }
}

let lisi = {
  name: '李四',
  age: 21,
  hobby() {
    console.log('喜欢打足球')
  }
}


// 类（构造函数）：工厂模式(能生成同一类对象)
function Person(name, age, hobby) {
  let obj = {} // 添加原料
  obj.name = name 
  obj.age = age
  obj.hobby = function() {
    console.log(hobby)
  }
  // 加工原料
  return obj // 出厂
}

// 构造函数创建对象
let zs = Person('张三', 20, '喜欢篮球')
let ls = Person('李四', 21, '喜欢足球')
```

## 4、new运算符

### 对象和类

- 对象：具体的某个事物（如小明，波斯猫）
- 类：一类事物的抽象（如人类、猫类）

### new运算符的作用

- 1、执行函数
- 2、自动创建空对象
- 3、`this`绑定到空对象
- 4、如果没有返还，隐式返还`this`；
- 5、通过`new`来改造工厂模式

```js
// 1.new执行函数
function test(){
  console.log("test");
}
test(); // test
new test(); // test
new test; // test

// 2.自动创建一个空对象； 
// 3.把空对象和this绑定 
// 4.如果没有返还，隐式返还this；
function Test(){
    // let obj = {};  === this; 
    // ...
    // return this; 
}
new Test();
```

## 5、构造函数及静态成员

- 构造函数首字母大写
- 构造函数要通过`new`来调用 
- `this`指向实例化对象
- 静态属性及静态方法：
  - 属于类/构造函数本身：只能构造函数自己调用，实例化对象无法调用；
- 静态方法里的`this`：指向类/构造函数本身

```js
/**
 * 构造函数
 * 1.首字母大写
 * 2.this指向实例化对象
 */
function Person(name){
  this.name = name;
  this.age =20;
  this.hobby = function(){
      console.log("喜欢篮球");
  }
}

// 静态成员（静态属性和静态方法）
// - 属于类/构造函数本身：只能构造函数自己调用，实例化对象无法调用；
// 静态方法里的this: 指向构造函数本身
Person.num = 0;
Person.fn = function(){
  console.log(this) // 指向构造函数本身
  console.log("fn");
}
Person.fn()

// new ： 实例化；
let zhangsan  = new Person("张三");
Person.num++
// zhangsan.num = 2
// zhangsan.num++
// console.log(zhangsan.num); // 3
console.log(zhangsan.num); // undifined
console.log(Person.num); // 1
```

## 6、构造函数性能

- 每实例化一个对象，就需要创造一个内存空间
- 如果构造函数的某个方法是固定，那么也会因实例化对象而耗费内存空间
- 所以最好是有`公共空间存放公共方法`，实例化对象直接使用`公共空间的公共方法`即可节约内存空间

```js
/**
 * 6、构造函数性能
 * - 公共方法不存放在公共空间，会造成内存空间的浪费
 */
function Person(name){
  this.name = name;
  this.age = 20;
  this.hobby = function(){
      console.log("喜欢篮球");
  }
}

let zhangsan = new Person("张三");
let lisi = new Person("李四");

console.log(zhangsan.hobby===lisi.hobby); // false
```

## 7、原型-prototype
- 通过`new`实例化出来的对象，其`属性`和`行为`来自两个部分：`构造函数`，`原型`
- 当声明一个函数的时候，同时也声明了一个原型，原型是构造函数的特有属性
- 原型本身是一个对象，它提供一个`公共空间`，用来存放公共方法，所有实例化出来的对象都可以调用公共空间的方法
- 原型的固有属性`constructor`，指向构造函数本身
- `constructor`判断类型：通过`constructor`判断实例化对象所属的构造函数类型

```js
function Person(name){
  this.name = name;
  this.age = 20;
  // this.hobby = function(){
  //     console.log("喜欢篮球");
  // }
}

// 公共空间-原型；
Person.prototype.hobby = function(){
  console.log("喜欢篮球");
}
Person.prototype.fn = function(){
  console.log("fn");
}
// 复写原型对象
Person.prototype = {
  constructor:Person,
  hobby:function(){
    console.log("hobby");
  }
}

// 原型的固有属性constructor：
// 通过constructor可以知道实例化对象属于哪个构造函数；
// 对象的__proto__是构造函数Person的prototype
console.log( Person.prototype.constructor===Person);
let zhangsan = new Person("张三");
console.log(zhangsan.constructor===Person);
console.log(zhangsan);
console.log(zhangsan.__proto__===Person.prototype);

let lisi = new Person("李四");
console.log(zhangsan.hobby===lisi.hobby); // true

// 判断类型；
let str1 = new String("abd");
let str2 = "abc";
console.log(str1.constructor===String);
console.log(str2.constructor===String);
```
### 对象属性方法查找规则
- 挂载在原型上的属性方法，通过原型__proto__查找
  - 实例化对象后，通过__proto__对象递归查找，直到找到的对象没有__proto__为止

## 8、三者关系-原型、构造函数、对象

- **构造函数**
  - (1) 含有原型`prototype`对象属性
  - (2) 通过new命令实例化对象
  - (3) 其`this` 指向`实例化对象`
- **原型**
  - (1) 含有固有属性`constructor`, 其指向原型所属的`构造函数`
  - (2) 其`this`指向原型所属的构造函数的`实例化对象`
  - (3) 原型（prototype）与实例化对象的原型（__proto__）恒等

![三者关系](./imgs/amongs.drawio.png)

```js
let temp;

// 构造函数
function Person(name){
  this.name = name;
  this.age = 20;
}

// 原型
Person.prototype.fn = function(){
  console.log("fn");
  temp = this; // this指向谁？
  console.log(333, this === Person) // false
  console.log(333, this === Person.prototype) // false
}

console.log(Person.prototype.constructor===Person)
let zhangsan = new Person("张三")
zhangsan.fn();

console.log(zhangsan===temp) // true
console.log(zhangsan.__proto__===temp) // false
console.log(zhangsan === Person.prototype)
```

## 9、工厂模式对比构造函数

- 无法解决对象识别问题：即创造的所有实例都是Object类型
- 没有公共空间存放公共方法：没有原型，占用内存

```js
// 工厂模式
function Person(name){
  let obj = {};
  obj.name = name;
  obj.age = 20;
  obj.fn = function(){
      console.log("fn..");
  }
}
let zhangsan1  = Person("张三");
// console.log(zhangsan.prototype) // TypeError
// console.log(zhangsan.constructor===Person) // TypeError

// 构造函数；
function Person(){
  this.name = name;
  this.age = 20;
}
Person.prototype.fn = function(){
  console.log("fn...");
}
let zhangsan  = new Person("张三");
console.log( zhangsan.constructor===Person); // true

let str = "abc";
console.log(str.constructor===String);
```

## 10、原型链

对象之间的`继承关系`，在JavaScript中是通过`prototype对象`指向`父类对象`，直到指向`Object对象`为止，这样就形成了一个`原型指向的链条`，称之为`原型链`；

### 对象属性方法查找规则：
当访问一个对象的属性或方法时，会先在`对象自身`上查找属性或方法是否存在，如果存在就使用对象自身的属性或方法。如果不存在就去创建对象的构造函数的`原型对象`中查找 ，依此类推，直到找到为止。如果到`顶层对象`中还找不到，则返回`undefined`。

![对象自身->原型对象->顶层对象->undified](./imgs/rules.drawio.png)


`原型链最顶层`为`Object` 构造函数的`prototype`原型对象，给 `Object.prototype` 添加属性或方法可以被除 `null` 和 `undefined` 之外的所有数据类型对象使用。

```js
// 构造函数
function Foo(name){
  this.name = name;
  this.age = 20;
  // this.test = "你好111"
}

//原型对象；
Foo.prototype.fn = function () {
  console.log("f");
}

Foo.prototype.test = "hello";
Object.prototype.test = "你好222";
let newFoo = new Foo("张三");
console.log(newFoo, newFoo.test);

let obj = new Object();
console.log(Object.prototype.__proto__); // null
```

## 11、call, apply, bind

- 三者均能实现构造函数的继承。

Function对象自带的三个函数：call, apply, bind，能将函数的this绑定到指定的对象上。
三者间传入的参数形式不一样：
- **call**
  - 参数个数没有上限
  - 第一个参数为this绑定的对象
  - 后面参数为传给函数的实参
- **apply**
  - 最多有两个参数
  - 第一个参数为this指定的对象
  - 第二个参数为数组，数组元素为传给函数的实参
- **bind**
  - 执行两次
  - 执行第一次时，传入this绑定的对象，返回函数本身
  - 执行第二次时，传入函数的实参
- 三者均可实现构造函数的继承

```js
function foo(name,age) {
  // this指向？
  console.log(this,"姓名是"+name+"年龄是"+age);
}
foo(); // this->window


// Function对象：修改函数内部的this指向，即指定this的调用对象
// 1.call 2.apply 3.bind
// 三者均可用于将函数内部的this，绑定到指定的调用对象
console.dir(foo) 

// 如何将foo函数中的this指向obj?
let obj = {
  name:"张三"
}
// foo函数中this指向obj
// 1.call：参数个数没有上限
// 第一个参数为this指定的对象，
// 第n个参数为传给foo函数的实参
foo.call(obj,"张三",20); 

// 2.apply：最多有两个参数
// 第一个参数为this指定的对象，
// 第二个参数为数组，传给foo函数的实参
foo.apply(obj,["张三",20]);

// 2.bind：执行两次
// 执行第一次，传入this指向的对象,返回foo函数本身
// 执行第二次，传入foo函数的实参，参数个数没有上限
foo.bind(obj)("张三",20);

console.log(foo.bind(obj))
```

## 12、构造函数的继承

**继承**：子类继承父类所有属性，父类不受影响
- 目的：找到类之间的共性精简代码
- 使用`call`、`apply`、`bind`实现继承
- **无法继承父类原型`prototype`中的属性和方法**

在子类中，调用父类的call、apply、或者bind方法，方法绑定子类的this，也就是子类实例化的对象
```js
// 继承；
// 1.call 2.apply 3.bind
function Dad(name,age) {
  this.name = name;
  this.age = age;
  this.money = "100000";
}

function Son(name,age) {
  // Dad.call(this,name,age);
  // Dad.apply(this,[name,age])
  Dad.bind(this)(name,age);
  this.sex = "男";
}

let zhangsan  = new Son("张三",20);
console.log(zhangsan.money)
console.log(zhangsan.sex);
```

## 13、原型的继承

- 简单的原型继承，会影响到父类，比如重写原型的方法和属性

```js
// 继承;
// 1.call 2.apply 3.bind
// 无法继承prototype中的属性和方法
function Dad(name,age) {
  this.name = name;
  this.age = age;
  this.money = "100000";
}
Dad.prototype.fn = function(){
  console.log("fn");
}
Dad.prototype.children = 2

function Son(name,age) {
  Dad.call(this,name,age);
  this.sex = "男";
}

let zhangsan  = new Son("张三",20);
console.log(zhangsan.money);
console.log(zhangsan.sex);
// console.log(zhangsan.children); // undefined
// zhangsan.fn(); // TypeError

// 原型继承
// 简单的原型继承，会影响父类，比如重写
Son.prototype = Dad.prototype;
let lisi =  new Son('李四', 23)
console.log(lisi.children);
lisi.fn();
Son.prototype.fn = function(){
  console.log("重写的fn");
}
lisi.fn();

```

## 14、传值和传址

传值指向的是不同的内存地址，赋值不受影响；传址指向的是同一个内存地址，会互相受到影响。

- 基本数据类型 - **传值**：`Number`、`String`、`Boolean`、`Null`、`Undefined`
- 复杂数据类型/引用数据类型 - **传址**: `Array`、`Date`、`Math`、`RegExp`、`Object`、
`Function`等
```js
//复杂数据类型：传址;
let DadProto = {
  name:"张三",
  age:20
}

let SonProto = DadProto;
SonProto.name = "李四";
console.log(SonProto);
console.log(DadProto);

// 简单数据类型：传值；
let a = 10;
let b = a;
b = 20;
console.log(a);
```

## 15、浅拷贝和深拷贝

**拷贝**：拷贝之后的新旧对象互相不受影响<br>
**赋值**：对象赋值之后，新旧两个对象会互相受到影响

### **浅拷贝**：只拷贝对象第一层数据
- 无法拷贝**函数**、**undefined**
- JSON序列化：JSON.parse、JSON.stringify
```js
let DadPrototype = {
  name:"张三",
  age:20,
  fn:function() {
    console.log("fn..");
  },
  test:undefined,
  hobby: {
    h1: '篮球',
    h2: '爬山',
    obj: {
      ass: []
    }
  },
  arr: ['1']
}

  // JSON序列化：无法拷贝函数和undefined的属性
  let SonPrototype = JSON.parse(JSON.stringify(DadPrototype));
  SonPrototype.name = "李四";
  console.log(DadPrototype);
  console.log(SonPrototype);
  ```
### **深拷贝**: 拷贝对象的所有属性和方法
- **Object.assign()**
- 函数 - 递归遍历拷贝的对象: 大量数据的拷贝会消耗性能
```js
// 深拷贝：递归遍历
let obj = {
  name: '张三',
  age: 20,
  fn: function() {
    console.log('fn...')
  },
  test: undefined,
  arr: [],
  sub: {
    children: 2,
    monery: 10000,
    houses: []
  }
}
// 函数 - 递归遍历
let newObj = deepCopy(obj)
function deepCopy(obj) {
  let newObj = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(typeof obj[key] === 'object') {
        newObj[key] = deepCopy(obj[key])
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  return newObj
}
// Object.assign
let newObj1 = Object.assign({}, obj)
```

## 15、原型深拷贝继承
- 子类原型对父类原型进行深拷贝：
  - 深拷贝函数 - 递归遍历对象，返回一个新对象，新对象包含旧对象的所有属性和方法
  - `Son.prototype = deepCopy(Dad.prototype);`
```js
// 深拷贝：递归遍历
function deepCopy(obj) {
  let newObj = Array.isArray(obj)?[]:{};
  for(let key in obj){
      if(obj.hasOwnProperty(key)){
          if(typeof obj[key] === "object"){
              newObj[key] = deepCopy(obj[key]) ;
          }else{
              newObj[key] = obj[key];
          }
      }
  }
  return newObj;
}

function Dad(name,age) {
  this.name = name;
  this.age = age;
  this.money = "100000";
}
Dad.prototype.fn = function () {
  console.log("喜欢象棋");
}

function Son(name,age) {
  Dad.call(this,name,age);
  this.sex = "男";
}
Son.prototype =deepCopy(Dad.prototype);
Son.prototype.fn = function () {
  console.log("喜欢篮球");
}

let zhangsan  = new Son("张三",20);
console.log(zhangsan.money);
console.log( zhangsan.sex);
zhangsan.fn();

let zhangyi  = new Dad("张一",50);
zhangyi.fn();
```

## 16、组合继承 - 替换深拷贝
- **组合继承** - 替换深拷贝
  - 子类继承父类构造函数
  - 创建一个中间类Link
  - **Link的prototype** - 继承 - **父类Dad的prototype**
  - **子类Son的prototype** - 等于 - **Link的实例化对象**
  - **子类的prototype的constructor** - 指向 - **自己**
```js
function Dad(name,age) {
  this.name = name;
  this.age = age;
  this.money = "100000";
}
Dad.prototype.fn = function () {
  console.log("喜欢象棋");
}

function Son(name,age) {
  Dad.call(this,name,age);
  this.sex = "男";
}

let Link = function(){};
Link.prototype = Dad.prototype;

Son.prototype = new Link() // 获取父类中的原型的属性和方法，此时 Son.prototype.constructor === Dad --> true
Son.prototype.constructor = Son // 上一步 Son.prototype.constructor  === Son --> false
Son.prototype.fn = function() {
  console.log('喜欢篮球')
}

let zhangsan = new Son('张三')
zhangsan.fn()

let zhangyi = new Dad('张一')
zhangyi.fn()
```

## 17、源码

github源码：[https://github.com/zy13/javascript-demo](https://github.com/zy13/javascript-demo)

课件：[有道云笔记](https://note.youdao.com/web/#/file/WEB400fb6c7dccce6b3727d3745758afe07/markdown/WEB78e42391654a9dc12ddd4de6982e32a8/)

