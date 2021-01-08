## 1、`随机数`相关

`Math.random()`返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。
```js
Math.random() // 0.7151307314634323
```

**1.1 任意范围的`随机数`**:
```js
function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomRange(1.5, 6.5)
```

**1.2 任意范围的`随机整数`**
```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // or
  // return Math.ceil(Math.random() * (max - min)) + min;
}

getRandomInt(1, 6)
```

**1.3 `随机字符`_生成验证码**
```js
function getRandomStr(length) {
  var str = ''
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet += 'abcdefghijklmnopqrstuvwxyz';
  alphabet += '0123456789';

  for(var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * alphabet.length);
    str += alphabet.substring(rand, rand + 1);
  }
  return str
}

getRandomStr(6) // JVaVtr
```

## 2、`数组`相关

**2.1 找出数组最大元素_apply()**
```js
var a = [10, 2, 4, 15, 9]
Math.max.aplly(null, a) // 15
```
[this关键字](https://wangdoc.com/javascript/oop/this.html)


## 3、异步操作的流程控制

[异步操作概述](https://wangdoc.com/javascript/async/general.html)

情景：如果有六个这样的异步任务，需要全部完成后，才能执行最后的final函数
```js
function async(arg, callback) {
  console.log('参数为' + arg + ', 1秒后返回结果')
  setTimeout(function() {
    callback(arg * 2);
  }, 1000)
}

function final(value) {
  console.log('完成:', value);
}

async(1, function(value) {
  async(2, function(value) {
    async(3, function(value) {
      async(4, function(value) {
        async(5, function(value) {
          async(6, filnal)
        })
      })
    })
  })
})
```


**3.1 串行执行**

```js
var items = [1,2,3,4,5,6];
var results = [];

function async(arg, callback) {
  console.log('参数为' + arg + ', 1秒后返回结果')
  setTimeout(function() {
    callback(arg * 2);
  }, 1000)
}

function final(value) {
  console.log('完成:', value);
}

function series(item) {
  if (item) {
    async(item, function(result){
      results.push(result);
      return series(items.shift());
    })
  } else {
    final(results);
  }
}
series(items.shift());
```

**3.2 并行执行**

```js
var items = [1,2,3,4,5,6];
var results = [];

function async(arg, callback) {
  console.log('参数为' + arg + ', 1秒后返回结果')
  setTimeout(function() {
    callback(arg * 2);
  }, 1000)
}

function final(value) {
  console.log('完成:', value);
}

// forEach同时发起六个异步任务
items.forEach(function(item) {
  async(item, function(result) {
    results.push(result);
    if (results.length === items.length) {
      final(results);
    }
  })
}) 
```

**3.3 并行与串行结合**
```js
var items = [1,2,3,4,5,6];
var results = [];
var limit = 2;
var running = 0;

function async(arg, callback) {
  console.log('参数为' + arg + ', 1秒后返回结果')
  setTimeout(function() {
    callback(arg * 2);
  }, 1000)
}

function final(value) {
  console.log('完成:', value);
}

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift()
    async(item, function(result) {
      results.push(result);
      running--;
      if (items.length > 0) {
        launcher();
      } else if (running === 0) {
        final(results);
      }
    })
    running++;
  }
}

launcher();
```

**3.4 定时器**

[定时器](https://wangdoc.com/javascript/async/timer.html)

>使用setTimeout替代setInterval实现轮询
```js
var i = 1;
var timer = setTimeout(function f() {
  // ...
  timer = setTimeout(f, 2000);
}, 2000);
```

debounce函数防抖动
```js
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay){
  var timer = null; // 声明计时器
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
```

## 4、DOM操作

[dom操作](https://wangdoc.com/javascript/dom/node.html)

**4.1 判断一个节点有无子节点**
```js
var node = document.getElementById('idname');
node.hasChildNodes();
node.firstChild !== null;
node.childNodes && node.childNodes.length > 0;
```

**4.2 遍历当前节点的所有后代节点**
```js
function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for(var node=parent.firstChild; node ; node = node.nextSibling) {
      DOMComb(node, callback)
    }
  }
  callback(parent)
}

DOMComb(document.body, console.log)
```

**4.3 克隆节点**
```js
var cloneNode = document.querySelector('ul').cloneNode(true)
```

**4.4 将某个节点插入父节点内部的指定位置**
```js
var insertedNode = parentNode.insertBefore(newNode, referenceNode);

var p = document.createElement('p');
// 变成第一个子节点
document.body.insertBefore(p, document.body.firstChild);

// 变成最后一个子节点
document.body.insertBefore(p, null);

// 将s1节点，插在s2节点的后面
parent.insertBefore(s1, s2.nextSibling);
```

**4.5 移除子节点**
```js
// 移除单个子节点
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);

// 移除所有子节点
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

**4.6 替换节点**
```js
// 返回值是替换走的那个节点oldChild
var replacedNode = parentNode.replaceChild(newChild, oldChild);

// 将指定节点divA替换走
var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
```