## 1、scroll 事件 - 节流 - ♥
`scroll`事件**在文档或文档元素滚动时触发，主要出现在用户拖动滚动条**。该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。
```js
window.addEventListener('scroll', callback);
```

**推荐的做法是使用`requestAnimationFrame`或`setTimeout`控制该事件的触发频率，然后可以结合`customEvent`抛出一个新事件。**
```js
// throttle()函数用于控制事件触发频率，它有一个内部函数func()，
// 每次scroll事件实际上触发的是这个函数。

// func()函数内部使用requestAnimationFrame()方法，
// 保证只有每次页面重绘时（每秒60次），才可能会触发optimizedScroll事件
// 从而实际上将scroll事件转换为optimizedScroll事件，触发频率被控制在每秒最多60次。
(function () {
  var throttle = function (type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function () {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  // 将 scroll 事件转为 optimizedScroll 事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log('Resource conscious scroll callback!');
});
```
**改用`setTimeout()`方法，可以放置更大的时间间隔。**
```js
// 每次scroll事件都会执行scrollThrottler函数
// 该函数里面有一个定时器setTimeout，
// 每66毫秒触发一次（每秒15次）真正执行的任务actualScrollHandler。
(function() {
  window.addEventListener('scroll', scrollThrottler, false);

  var scrollTimeout;
  function scrollThrottler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        actualScrollHandler();
      }, 66);
    }
  }

  function actualScrollHandler() {
    // ...
  }
}());
```
**下面是一个更一般的`throttle`函数的写法。**
```js
// 将scroll事件的触发频率，限制在一秒一次
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
```
**`lodash`函数库提供了现成的`throttle`函数，可以直接使用。**
```js
window.addEventListener('scroll', _.throttle(callback, 1000));
```

### 防抖和节流的区别

`throttle`与`debounce`区别在于，`throttle`是“节流”，确保一段时间内只执行一次，而`debounce`是“防抖”，要连续操作结束后再执行。以网页滚动为例，`debounce`要等到用户停止滚动后才执行，`throttle`则是如果用户一直在滚动网页，那么在滚动过程中还是会执行。

## 2、resize 事件

`resize`事件在改变浏览器窗口大小时触发，主要发生在`window`对象上面。该事件也会连续地大量触发，所以最好像上面的`scroll`事件一样，通过`throttle`函数控制事件触发频率。
```js
var resizeMethod = function () {
  if (document.body.clientWidth < 768) {
    console.log('移动设备的视口');
  }
};
window.addEventListener('resize', resizeMethod, true);
```

## 3、fullscreenchange，fullscreenerror 事件

`fullscreenchange`事件在进入或退出全屏状态时触发，该事件发生在`document`对象上面。

`fullscreenerror`事件在浏览器无法切换到全屏状态时触发。
```js
document.addEventListener('fullscreenchange', function (event) {
  console.log(document.fullscreenElement);
});
```
