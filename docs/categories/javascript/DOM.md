<!-- ## events -->

### DOM事件流如图：

![avatar](./imgs/event-bubbles.gif)

* 由图可知，事件的捕获过程要先于冒泡过程

### addEventListener、removeEventListener

用来分配和删除事件的函数，方法需要三个参数，分别为：

* 事件名称(String)
* 要触发的事件处理函数(Function)
* 指定事件处理函数的时期或阶段(Boolean)
* 当第三个函数为true时，事件在捕获过程中执行，反之为冒泡过程

```js
document.getElementById('#idName').addEventListener('click', function(e){
  console.log('点击事件处理过程')
}, true)
```

