### 知识点
- ES6中类的使用: `理解并能使用ES6中的类`
- ES6中继承extends、super: `学会使用ES6中继承`
- ES6静态方法和属性: `理解静态属性及方法`
- ES6中模块化import、export：`会使用ES6中模块化`
- 王者荣耀英雄选择案例：[github代码](https://github.com/zy13/honor-of-kings)

## 1、类的写法

- ES5的写法：构造函数
- ES6的写法：class语法糖，更简洁直观
- 实例化对象方式一致

### ES5中的类 - 构造函数
```js
function Person(name){
  this.name = name;
  this.age = 20
}
Person.prototype.fn = function(){
  console.log("fn..");
}
let zhangsan = new Person('张三')
zhangsan.fn()
console.log(zhangsan.name)
```

### ES6中的类 - 构造函数的语法糖
```js
class Person{
  // constructor指向类本身
  constructor(name) {
    this.name = name;
    this.age = 20
  }
  // 方法自动挂载在原型prototype上
  fn() {
    console.log("fn..");
  }
}
let zhangsan = new Person('张三')
zhangsan.fn()
console.log(zhangsan.name)
```

## 2、ES2020-私有成员: '#'
```js
class Person{
  #weight = "100kg";  //私有属性 
  constructor(name){
    this.name = name;
    this.age = 20;
  }
  // 共有方法调取私有成员
  getWeight() {
    return this.#weight;
  }
}
let zhangsan = new Person("张三");
console.log(zhangsan.getWeight());
```

## 3、静态成员
- `static`：属于类的（不是对象的）特性
- 静态方法和属性: **实例不会继承**的属性和方法
- 深层打印：静态属性和方法挂载在类（构造函数）的原型constructor属性上
- 静态属性和方法：通过类调用
```js
class Person{
  // 静态属性
  static num = 10;
  constructor(name){
    this.name = name;
  }
  fn(){
    console.log("fn..");
  }
  // 静态方法
  static hobby() {
    console.log('喜欢篮球');
  }
}
// 静态属性
Person.age = 20;
// 通过类来调用
Person.hobby()
console.dir(Person);
let zhangsan = new Person("张三");
console.log(zhangsan);
```

## 4、静态成员与私有成员

 ### 相同之处
 - 两者均不能被子类继承
 - 非静态方法可以调用私有属性和静态属性
### 不同之处
- 静态成员
  - 不管在静态方法还是非静态方法，钧可以通过类名调用; 
  - 静态方法里不能调用私有属性
- 私有成员
  - 在类外不可以通过类名调用；
```js
class Dad {
  static gendle = '男' // 静态属性，不能被子类继续
  #height = '178cm' // 私有属性，不能被子类继承，也不能被静态方法调用
  constructor(name) {
    this.name = name
  }
  fn() {
    console.log('父类的方法')
    console.log(666, this.#height)
    console.log(this.getHeight())
  }
  static hobby() {
    console.log('父类的爱好')
    // 可以调用静态属性
    console.log('静态方法里调用', this.gendle)
    // 静态方法：不可以调用静态方法
    // console.log(this.#height) // 报错
  }
  getHeight() {
    // 非静态方法可以调用自由方法
    console.log('非静态方法',this.gendle)
    console.log(this.#height)
  }
}
console.dir(Dad)
let liyi = new Dad('李一')
console.log(liyi)
console.log(liyi.gendle)
console.log(Dad.gendle)
Dad.hobby()
liyi.fn()
liyi.getHeight()
```

## 5、单例模式

- 保证一个类只有一个实例: 不过实例化多少个对象，所有对象都是相同的，且永远等于第一次实例化的对象；window,doucument
- 通过类的`静态属性`，可以保存实例化状态

```js
class Person{
  // 保存实例化状态
  static count = 0
  static instance
  constructor(name) {
    this.name = name
    this.age = 20
    Person.count++
    if(Person.instance) {
      return Person.instance
    } else {
      Person.instance = this
    }
  }
}

let zhangsan = new Person('张三')
let lisi = new Person('李四')
console.log(Person.count, Person.instance)
console.log(zhangsan === lisi) // true
```

## 6、类的继承
- `extends`关键字和`super()`方法实现子类对父类的继承
- `super()`方法必须写在`constructor`固有属性的首行: 表示子类继承父类的所有属性和方法
- `super`指向父类，表示父类的构造函数，可以通过其在子类中调用父类的`非静态属性和方法`
```js

class Dad {
  static gendle = '男' // 静态属性，不能被子类继续
  height = '178cm' // 非静态属性，可以被子类继承
  constructor(name) {
    this.name = name
  }
  fn() {
    console.log('父类的方法')
  }
  hobby() {
    console.log('父类的爱好')
  }
}

class Son extends Dad{
  constructor(name) {
    // 继承父类的所有非静态成员（属性和方法）
    super(name)
    this.age = 20
  }
  // 不重写fn：默认继承父类的fn
  fn() {
    // 调用父类的方法
    super.fn();
    // console.log(super.gendle) // 子类不能调用父类的静态属性
    console.log(this.height) // 继承自父类
    console.log('子类的方法')
  }
}

let zhangsan = new Son('张三')
zhangsan.fn()
zhangsan.hobby()
console.log(zhangsan)
```

## 7、ES2020-合并空运算符: ??
- `??`称为合并空运算符, 比如`C = A ?? B`
  - `A=undefined，C=B`
  - `A='', C=A`
  - `A='非空值'，C=A`
- 或运算符`||`：`C = A || B`
  - `Boolean(A)=false`（比如A为空值或者undefined）, `C=B`
  - `Boolean(A)=true`（A非空）, `C=A`
```js
function test(myname) {
  console.log(myname)
  // name值: myname取值为false时（例如''或者undefined），='张三'
  let name = myname || '张三' 
  console.log('或||', name)
  // name1值: myname取值为''时，=空值，为undefined时，='张三'
  let name1 = myname??'张三'
  console.log('合并??', name1)
}
test('')
```

## 8、ES2020-可选链式操作符: ?.
- `?.`称为可选链式运算符：问号前的对象是否存在，存在则引用对象的属性
```js
// 可选链式操作符
let obj = {
  hobbies:{
    one:"football"
  }
}
// 获取"football"
// 1.传统方式
let hobby = obj.hobbies && obj.hobbies.one;
console.log(hobby)
console.log(obj.hobbies.one); // hobbies不存在时会报错
// 2.可选链式?.
console.log(obj?.hobbies?.one); // hobbies不存在时不会报错 
```

## 9、ES6模块化-ESM
- 浏览器默认模块化script标签加入type="module": `<script src="module"></script>`
- 模块化：防止变量污染
### 导出模块的关键字`export`
export 可以导出多个，export default 只能导出一个；
- 只能导出一个<br>
  `export default a`
- 可以导出多个<br>
  `export { a ,b , c};`
- 关键字`as`取别名<br>
`
export { a as aa ,b , c};
export {
  a as default,
  c
}
`
- 导出默认模块`default`<br>
`export default a; `<br>
`export {
  a as default,
  c
}
`
- 导出表达式<br>
`let fn = () => {console.log('fn')}`<br>
`export function abc() {console.log('abc')}`

### 导入模块关键字`import`
- `import`是异步导入
- `export`导出的,命名要保持一致<br>
`import {a,b,c} from './module.js'`
- `export default`导出的，命名可以自定义；
`import myModuleName from './module.js'`
- 通配符`"*"`导入所有模块
`import * as obj from './moduleb.js';`

### 按需导入（延迟导入）: import()方法-异步方法

```js
  document.onclick = async function() {
    let res = await import('./a.js')
    console.log(res)
  }
```

## 10、王者荣耀选择英雄案例

[github代码](https://github.com/zy13/honor-of-kings)

## 11、课件
[有道云笔记](https://note.youdao.com/web/#/file/WEBd7da81000e430a4d89caeeffbc588f1a/markdown/WEB38dad27eb54f35f4c13e68d41c42fc77/)



