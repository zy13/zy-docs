### apply与call的异同

每一个Function对象都有一个call与apply方法，语法分别为：

* function.apply(thisObj[,argArray])
* function.call(thisObj[,arg1[,arg2[,...argN]]])

#### 相同之处

apply与call均是调用一个对象的一个方法，用另一个对象替换当前对象。例如：

* B.apply(A, arguments)，A对象调用B对象的方法
* B.call(A, args1, args2)，A对象调用B对象的方法

#### 不同之处

apply和call的主要不同之处在于它们的参数个数不一样

* `apply`最多只有两个参数，一个新的thisObj对象以及一个数组argArray
* `call`可以接受很多个参数，第一个参数和apply一样，后面则是一串参数列表。


#### 基本用法
```js
function add(a,b){
  return a+b
}

function sub(a,b){
  return a-b
}

var b1 = add.apply('', [4,2])
var b2 = sub.apply('', [4,2])

// call的用法
var a1 = add.call(sub, 4, 2)
```

#### 实现继承
```js
function Animal(name) {
  this.name = name
  this.showName = function() {
    alert(name)
  }
}

function Cat(name) {
  Animal.apply(this, [name])
}

var cat = new Cat('鸟')
cat.showName()
```

