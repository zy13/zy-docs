### 主题
- 同步及异步概念
- 方块运动的实现
- promise的用法
- then的返还值
- Async 函数 和 await 
### 目标

理解并学会使用promise使用方式以及async 、await的使用

## 1、同步异步概念

- 同步和异步：是一种消息通知机制

### 同步

做一件事，没有拿到结果之前，就一直在这等着，一直等到有结果了,再去做下边的事

- 同步阻塞 <br>
  - A调用B，B处理获得结果，才返回给A。
  - A在这个过程中，一直等待B的处理结果，
    - 没有拿到结果之前，需要A（调用者）一直等待和确认调用结果是否返回，
    - 拿到结果,然后继续往下执行。
### 异步
做一件事，不用等待事情的结果，然后就去忙别的了，有了结果，再通过状态来告诉我，或者通过回调函数来处理。
- 异步非阻塞: 
  - A调用B，无需等待B的结果，B通过状态，通知等来通知A或回调函数来处理。

## 2、异步处理方案

- 回调解决异步问题
  - 缺点：通过回调函数来处理异步，容易造成回调地狱
    - **回调地狱**：函数作为参数层层嵌套。回调地狱会导致代码可读性及可维护性变差。
    ```js
    function move(ele,target,direction,cb) {
        let start = parseInt( getComputedStyle(ele,null)[direction]);
        let speed = 5*(target-start>0?1:-1);
        setTimeout(()=>{
            start += speed;
            ele.style[direction] = start + "px";
            if(Math.abs(target-start)<5){
                // console.log("运动完成");
                cb && cb();
            }else{
                move(ele,target,direction,cb)
            }
        },10)
    }
    let ele = document.querySelector(".box");
    // move(ele,300,"top");
    // move(ele,0,"left");
    // move(ele,300,"top");
    // 回调地狱
    move(ele,300,"left",function () {
      move(ele,300,"top",function () {
        // console.log("运动完成");
        move(ele,0,"left",function () {
          move(ele,0,"top",function () {
            console.log("所有运动完毕 ");
          })
        })
      })
    });
    ```
## 3、自定义事件

- EventTarget类 - 事件类
- CustomEvent

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 100px;
      height: 100px;
      position: absolute;
      left: 0;
      top: 0;
      background: red;
    }
  </style>
</head>

<body>
  <div class="box"></div>
  <script>
    // 方块的运动 - 解决回调地域
    let eventObj = new EventTarget();
    let num = 1;

    function move(ele, target, direction) {
      let start = parseInt(getComputedStyle(ele, null)[direction]);
      let speed = 5 * (target - start > 0 ? 1 : -1);
      setTimeout(() => {
        start += speed;
        ele.style[direction] = start + "px";
        if (Math.abs(target - start) < 5) {
          // console.log("运动完成");
          // cb && cb();
          eventObj.dispatchEvent(new CustomEvent("myevent" + num));
          num++;
        } else {
          move(ele, target, direction)
        }
      }, 10)
    }
    let ele = document.querySelector(".box");
    move(ele,300,"left");
    eventObj.addEventListener("myevent1",()=>{
      console.log("运动完成11");
      move(ele,300,"top");
    })
    eventObj.addEventListener("myevent2",()=>{
      console.log("运动完成22");
      move(ele,0,"left");
    })
    eventObj.addEventListener("myevent3",()=>{
      console.log("运动完成333");
      move(ele,0,"top");
    })
    eventObj.addEventListener("myevent4",()=>{
      console.log("运动完成444");
    })
  </script>
</body>

</html>
```

## 3、方块运动实现

- 回调运动框架方块的运动 

## 4、Promise对象的使用

**Promise 对象**
### 两种参数：
  - then的2个参数；
  - onresolove 和 onreject；
### Promise对象 - **构造函数**
  ES6的Promise对象是一个构造函数，用来生成Promise实例的。<br>
  所谓Promise对象，就是代表了未来某个将要发生的事件（通常是一个异步操作）。
  - 优点：将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
###  Promise对象的三种状态
Promise对象的三种状态 pending 、resolve 和 reject 
- then 方法
- then的返回值，会返回一个新的 Promise 对象, 但是状态会有几种情况:
  - then 的回调函数中没有返回值，then就会返回一个状态为: resolved 的 promise 对象
  - then 的回调函数返回值是 非 promise 的值, then就会返回一个状态为: resolved 的 promise 对象，另外会把返回值，传递给 下一个 then
  - then 的回调函数返回值是 promise 对象，then 就直接返回这个  promise 对象，具体的状态可以由我们自己定义,具体传递的值，也由我们自己定义

### Promise 下的方法：
- resolve
- reject
- all
- race
- finally

## 5、async&await - 改造promise

- Async 函数 和 await 改造promise；
- try及catch方法捕获错误



