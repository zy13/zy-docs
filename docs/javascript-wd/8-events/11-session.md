## 1、pageshow，pagehide 事件
默认情况下，浏览器会在当前会话（`session`）缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。

**注意，这两个事件只在浏览器的`history`对象发生变化时触发，跟网页是否可见没有关系。**
### pageshow 事件

`pageshow`事件**在页面加载时触发，包括第一次加载和从缓存加载两种情况**。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。

**第一次加载时，它的触发顺序排在`load`事件后面。从缓存加载时，`load`事件不会触发**，因为网页在缓存中的样子通常是`load`事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的 `JavaScript` 脚本（比如 `DOMContentLoaded` 事件的监听函数）也不会执行。
```js
window.addEventListener('pageshow', function(event) {
  console.log('pageshow: ', event);
});
```
`pageshow`事件有一个`persisted`属性，返回一个布尔值。**页面第一次加载时，这个属性是`false`；当页面从缓存加载时，这个属性是`true`**。
```js
// 可以判断页面是否为首次加载
window.addEventListener('pageshow', function(event){
  if (event.persisted) {
    // ...
  }
});
```
### pagehide 事件
`pagehide`事件与`pageshow`事件类似，**当用户通过“前进/后退”按钮，离开当前页面时触发**。

它与 `unload` 事件的区别在于，如果在 `window` 对象上定义`unload`事件的监听函数之后，页面不会保存在缓存中，而使用`pagehide`事件，页面会保存在缓存中。

`pagehide`事件实例也有一个`persisted`属性，**将这个属性设为`true`，就表示页面要保存在缓存中；设为`false`，表示网页不保存在缓存中**，这时如果设置了`unload` 事件的监听函数，该函数将在 `pagehide` 事件后立即运行。

如果页面包含`<frame>`或`<iframe>`元素，则`<frame>`页面的`pageshow`事件和`pagehide`事件，都会在主页面之前触发。

## 2、popstate 事件 - ♥

`popstate`事件**在浏览器的`history`对象的当前记录发生显式切换时触发**。注意，调用`history.pushState()`或`history.replaceState()`，并不会触发`popstate`事件。该事件只在用户在`history`记录之间显式切换时触发，**比如鼠标点击“后退/前进”按钮，或者在脚本中调用`history.back()`、`history.forward()`、`history.go()`时触发。**
```js
window.onpopstate = function (event) {
  console.log('state: ' + event.state);
};

// pushState方法向history添加了两条记录
// 然后replaceState方法替换掉当前记录
// 因此，连续两次back方法，会让当前条目退回到原始网址，它没有附带state对象，
// 所以事件的state属性为null，然后前进两条记录，又回到replaceState方法添加的记录。
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');
history.back(); // state: {"page":1}
history.back(); // state: null
history.go(2);  // state: {"page":3}
```
浏览器对于页面首次加载，是否触发`popstate`事件，处理不一样，`Firefox` 不触发该事件。

## 3、hashchange 事件
`hashchange`事件在 `URL` 的 `hash` 部分（即#号后面的部分，包括`#`号）发生变化时触发。该事件一般在`window`对象上监听。

`hashchange`的事件实例具有两个特有属性：`oldURL`属性和`newURL`属性，分别表示变化前后的完整 `URL`。
```js
// URL 是 http://www.example.com/
window.addEventListener('hashchange', myFunction);

function myFunction(e) {
  console.log(e.oldURL);
  console.log(e.newURL);
}

location.hash = 'part2';
// http://www.example.com/
// http://www.example.com/#part2
```