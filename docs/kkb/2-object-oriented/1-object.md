## 1-面向对象概念

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

### 对象

Javascript 是一种基于对象的语言，几乎所有东西都是对象；

对象的创建方式：1、字面量；2、构造函数 new Object()；3、Object.create()

- **字面量创建**
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

- **构造函数 new Object()创建**
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

- **Object.create()创建**：属性方法放在原型上。
```js
  let obj3 = Object.create({
    name: '张三',
    age: 20,
    hobby() {
      console.log('喜欢打篮球')
    }
  })
```


