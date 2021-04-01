### 知识点
- 单例模式
- 工厂模式
- 观察者模式
- 装饰者模式
- 代理模式

### 目标
- 学会各种设计模式的使用
- 学会面向对象中抽象使用
- 理解类中的继承
- oop思想规划项目

## 1、设计原则
### solid(稳定的)
- **单一职责原则（Single Responsibility Principle）**<br>
一个类应该只有一个发生变化的原因。简而言之就是每个类只需要负责自己的那部分，类的复杂度就会降低。
- **开闭原则（Open Closed Principle）**<br>
一个软件实体，如类、模块和函数应该对扩展开放，对修改关闭
- **里氏替换原则（Liskov Substitution Principle）**<br>
所有引用基类的地方必须能透明地使用其子类的对象，也就是说子类对象可以替换其父类对象，而程序执行效果不变。
- **迪米特法则（Law of Demeter）**<br>
迪米特法则（Law of Demeter）又叫作**最少知识原则（The Least Knowledge Principle）**，一个类对于其他类知道的越少越好，就是说一个对象应当对其他对象有尽可能少的了解,只和朋友通信，不和陌生人说话。
- **接口隔离原则（Interface Segregation Principle）** flow 、ts<br>
多个特定的客户端接口要好于一个通用性的总接口
- **依赖倒置原则（Dependence Inversion Principle）**
  - 1、上层模块不应该依赖底层模块，它们都应该依赖于抽象。 
  - 2、抽象不应该依赖于细节，细节应该依赖于抽象

## 2、设计模式
​`设计模式`是软件开发人员在软件开发过程中面临的一些具有代表性问题的**解决方案**。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的；

**设计模式特点：**
- 经验复用，提高复用性可维护：不像函数、类、组件是简单的代码复用
- 状态共享: 多组件状态统一管理
- 高内聚 ，低耦合

## 3、单例模式

**单例模式**（Singleton Pattern）又称为**单体模式**，保证一个类只有一个实例，并提供一个访问它的全局访问点。也就是说，第二次使用同一个类创建新对象的时候，应该得到与第一次创建的对象完全相同的对象。

### 单例模式优缺点
- 优点：单例模式**节约内存**开支和实例化时的性能开支，**节约性能**；
- 缺点：单例模式**扩展性不强**

### 单例创建方式
- 通过`静态属性`创建单例
- 通过`高阶函数`创建单例

简单的单例：对象
```js
let obj = {
  myname:"张三",
  fn(){
    console.log("fn");
  }
}
```

- **通过类的静态属性创建单例**
```js
class Person {
  static Instance;
  constructor(name) {
    if (Person.Instance) {
      return Person.Instance;
    }
    Person.Instance = this;
    this.name = name;
    this.age = 20;
  }
}
```

- **通过高阶函数创建单例**
```js
// 高阶函数：有函数作为输入或者是输出的函数；
// 把非单例变成单例
function getSingle(Fn) {
  let instance;
  return function (...args) {
    if (!instance) {
      instance = new Fn(...args);
    }
    return instance;
  }
}
const silgelPerson = getSingle(PersonA);
let zhangsan1 = silgelPerson("张三");
let lisi1 = silgelPerson("李四");
console.log(zhangsan1 === lisi1);
```

- **实现单个模态框**
```js
// 单例
function getSingle(Fn) {
  let instance;
  return function (...args) {
    if (!instance) {
      instance = new Fn(...args);
    }
    return instance;
  }
}

// 创建弹框
class CreateDailog {
  constructor(html) {
    this.html = html;
    this.createDailog();
  }
  createDailog() {
    let div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }
}

let singleDailog = getSingle(CreateDailog);
singleDailog("div1");
singleDailog("div2");
console.log(singleDailog("div1"),singleDailog("div2"));
```

## 4、工厂模式

**工厂模式** （Factory Pattern），封装了具体实例的创建逻辑和过程，外部只需要根据不同条件返回不同的实例。
- 优点：实现代码复用性，封装良好，抽象逻辑；
- 缺点：增加了代码复杂程度；

```js
// 工厂模式：抽象了对象的创建过程；

class P1 {
  constructor() {
    this.name = "手机";
  }
}

class P2 {
  constructor() {
    this.name = "电脑";
  }
}

let xiaomi = new P1();
let mac = new P2();

// 告诉我需要什么产品（产品名），工厂模式帮你生产
function Factory(pName) {
  switch (pName) {
    case 'xiaomi':
      return new P1();
      break;
    case 'mac':
      return new P2();
      break;
    default:
      console.log("没有产品");
      break;
  }
}

let xiaoli  = Factory("mac");
console.log(xiaoli);
```

## 5、装饰者模式 - 扩展

**装饰者模式** （Decorator Pattern）使用一种更为灵活的方式来动态给一个对象/函数等添加额外信息
- 扩展功能和继承类似：extends
- 耦合性低，扩展不同类的功能，和原始类并无关联；
### 继承的特点
- 1. 可能会扩展多个子类出来
- 2. 和父类耦合性强：子类对父类有很高的依赖性
- 3. 没有装饰者链

### 装饰者模式
```js
class Yase {
  constructor() {
    this.name = "亚瑟";
  }
  // 释放技能同时造成伤害； 
  // 继承： 1.可能会扩展多个子类出来；2.和父类耦合性强 3.没有装饰者链 
  fire() {
    console.log("释放了技能");
  }
}

// 装饰者模式
function hurt() {
  console.log("造成了100点伤害");
}
Function.prototype.decoratorFn = function (fn) {
  this();
  fn();
}
let yase = new Yase();
yase.fire();
yase.fire.decoratorFn(hurt);
```

### 装饰者链及其应用

- 管道符`|`：代码依次从左至右执行。
- `after`: 参数提交，参数合并
- `before`：用于鉴权、校验
- Axios库中请求拦截器和响应拦截器

```js
// 装饰者链；
function fn1(arg) {
  console.log("fn1.." + arg)
}

function fn2(arg) {
  console.log("fn2.." + arg)
}

function fn3(arg) {
  console.log("fn3.." + arg);
}
Function.prototype.after = function (fn) {
  let that = this;
  return function (...args) {
    that(...args);
    fn(...args);
  }
}
let yase  = new Yase();
yase.fire.after(fn1).after(fn2).after(fn3)("hello");
```

## 6、观察者模式 - 自定义事件

**观察者模式** （Observer Pattern） 定义一个对象`addEvent`与其他对象`trigger`之间的一种依赖关系，当对象`addEvent`发生某种变化的时候，依赖它的其它对象`trigger`都会得到更新
- 自定义事件绑定addEvent
- 自定义事件触发trigger
- 自定义事件移除removeEvent

### 特点
- 1.统一管理事件（解耦）；
- 2.惰性执行，延迟执行；

```js

function fn1() {
  console.log("fn1");
}

function fn2() {
  console.log("fn2");
}

// 1.统一管理事件（解耦） 2.惰性执行，延迟执行；
document.addEventListener("click",function(){
  fn1();
})
document.addEventListener("click",fn2);

let handle = {};
handle{"myevent1":[fn1,fn2...],"myevent2":[fn1,fn2...]}

// 添加事件
function addEvent(eventName,fn){
  if(typeof handle[eventName] === "undefined"){
    handle[eventName] = [];
  }
  handle[eventName].push(fn);
}

// 触发
function trigger(eventName){
  handle[eventName].forEach(fn=>{
    fn();
  })
}

// addEvent与trigger之间的依赖关系
// 当addEvent发生变化，trigger得到更新
addEvent("event1",fn1);
addEvent("event1",fn2);
trigger("event1");

```

## 7、代理模式 - 控制访问

**代理模式** 为其他对象提供一种代理以控制对这个对象的访问，类似于生活中的中介。
- 应用：图片的懒加载原理？

### 代理 - 中介
```js
let zhangsan = {
  sellHouse(price) {
    console.log("卖了" + price + "万元");
  }
}

// 中介 
let ProxySeller = {
  sellHouse(price, hasSold) {
    if (hasSold) {
      zhangsan.sellHouse(price - 2);
    } else {
      zhangsan.sellHouse(price);
    }
  }
}
zhangsan.sellHouse(100);
ProxySeller.sellHouse(100, true);
```

### 代理创建图片 - 图片懒加载

- 先使用本地图片（代理），远程图片加载完成后使用远程图片
```js
// 创建图片；
class CreateImage {
  constructor() {
    this.img = document.createElement("img");
    document.body.appendChild(this.img);
  }
  setSrc(src) {
    this.img.src = src;
  }
}

let src = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg";
// let myImg = new CreateImage();
// myImg.setSrc(src);

// 图片懒加载-图片代理
function proxyImg(src){
  let myImg = new CreateImage();
  myImg.setSrc("./loading.jpg");

  let img = new Image();
  img.src = src;
  img.onload = function(){
    myImg.setSrc(this.src);   
  }
}
proxyImg(src);
```

## 8、适配器模式-提高兼容性

两个**不兼容的接口**之间的**桥梁**，将一个类的接口转换成客户希望的另外一个接口。**适配器模式**使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

```js
function getUsers() {
  return [
    {
      name: "zhangsan",
      age: 20
    },
    {
      name: "lisi",
      age: 21
    }
  ]
}
// 得到 ---> [ {zhangsan: 20}, {lisi: 21} ];
function Adaptor(users) {
  let arr = [];
  for (let i = 0; i < users.length; i++) {
    let obj = {
      [users[i].name]: users[i].age
    }
    arr.push(obj);
  }
  return arr;
}

let res =  Adaptor(getUsers());
console.log(res);
```

## 9、混入模式

将一个对象中的**属性**或者**方法**混入到另一个对象中，使另一个对象也具有相应的属性或者方法
- `vue`中的`mixins`
- `Object.assign(obj1, obj2)`
```js
class Yase {
  constructor() {
    this.name = "亚瑟";
  }
}

class Skills {
  release() {
    console.log("释放技能");
  }
  hurt() {
    console.log("造成伤害");
  }
  run() {
    console.log("跑");
  }
}

// 混入模式；
function mixin(receivingClass, givingClass) {
  if (typeof arguments[2] !== "undefined") {
    for (let i = 2; i < arguments.length; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
}

mixin(Yase, Skills, "release", "run");
console.dir(Yase);

let newYase  = new Yase();
newYase.release();
newYase.run();
```

## 10、发布订阅模式

**发布-订阅**是一种[消息](https://zh.wikipedia.org/wiki/消息)[范式](https://zh.wikipedia.org/wiki/范式)，消息的发送者（称为发布者）不会将消息**直接**发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。

[移步 第五章ES6高阶函数-数据响应式原理-发布订阅模式](/kkb/5-es6-higher/2-data.html#_5、发布订阅模式-渲染新数据)
## 11、课件

[有道云笔记](https://note.youdao.com/web/#/file/WEB46441cd2c6744d98fbd9cb7c5f72834c/markdown/WEBb6fbb2ecfad4970e50db607ce531070b/)
[github代码]()
