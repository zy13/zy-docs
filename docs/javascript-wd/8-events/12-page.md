## 1、DOMContentLoaded 事件
网页下载并解析完成以后，浏览器就会在`document`对象上触发 `DOMContentLoaded` 事件。

这时，仅仅完成了网页的解析（整张页面的 `DOM` 生成了），所有外部资源（样式表、脚本、`iframe` 等等）可能还没有下载结束。

也就是说，这个事件比`load`事件，发生时间早得多。

**注意，网页的 `JavaScript` 脚本是同步执行的，脚本一旦发生堵塞，将推迟触发`DOMContentLoaded`事件。**
```js
document.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM 生成');
});

// 这段代码会推迟触发 DOMContentLoaded 事件
for(var i = 0; i < 1000000000; i++) {
  // ...
}
```

## 2、readystatechange 事件
`readystatechange`事件当 `Document` 对象和 `XMLHttpRequest` 对象的`readyState`属性发生变化时触发。`document.readyState`有三个可能的值：
- `loading`（网页正在加载）
- `interactive`（网页已经解析完成，但是外部资源仍然处在加载状态）
- `complete`（网页和所有外部资源已经结束加载，`load`事件即将触发）。

**这个事件可以看作DOMContentLoaded事件的另一种实现方法。**
```js
document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    // ...
  }
}
```