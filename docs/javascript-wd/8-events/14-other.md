## 1、剪贴板事件
以下三个事件属于剪贴板操作的相关事件。

- `cut`：将选中的内容从文档中移除，加入剪贴板时触发。
- `copy`：进行复制动作时触发。
- `paste`：剪贴板内容粘贴到文档后触发。
```js
// 禁止输入框的粘贴事件
// 下面代码用户无法在<input>输入框里面粘贴内容
inputElement.addEventListener('paste', e => e.preventDefault());
```

`cut、copy、paste`这三个事件的事件对象都是`ClipboardEvent`接口的实例。

`ClipboardEvent`有一个实例属性`clipboardData`，是一个 `DataTransfer` 对象，存放剪贴的数据。具体的 `API` 接口和操作方法，请参见《拖拉事件》的 [`DataTransfer`](./9-drag.html#_3%E3%80%81datatransfer-%E6%8E%A5%E5%8F%A3%E6%A6%82%E8%BF%B0) 对象部分。
```js
// 下面的代码使得复制进入剪贴板的，都是开发者指定的数据，而不是用户想要拷贝的数据。
document.addEventListener('copy', function (e) {
  e.clipboardData.setData('text/plain', 'Hello, world!');
  e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
  e.preventDefault();
});
```
## 2、焦点事件
焦点事件发生在元素节点和`document`对象上面，与获得或失去焦点相关。它主要包括以下四个事件。
```js
`focus`：元素节点获得焦点后触发，该事件不会冒泡。
`blur`：元素节点失去焦点后触发，该事件不会冒泡。
`focusin`：元素节点将要获得焦点时触发，发生在`focus`事件之前。该事件会冒泡。
`focusout`：元素节点将要失去焦点时触发，发生在`blur`事件之前。该事件会冒泡。
```
这四个事件的事件对象都继承了`FocusEvent`接口。`FocusEvent`实例具有以下属性。
```js
`FocusEvent.target`：事件的目标节点。
`FocusEvent.relatedTarget`：对于`focusin`事件，返回失去焦点的节点；
                            对于`focusout`事件，返回将要接受焦点的节点；
                            对于`focus`和`blur`事件，返回 null。
```
由于`focus`和`blur`事件不会冒泡，只能在捕获阶段触发，所以`addEventListener`方法的第三个参数需要设为`true`
```js
// 下面代码针对表单的文本输入框，接受焦点时设置背景色，失去焦点时去除背景色。
form.addEventListener('focus', function (event) {
  event.target.style.background = 'pink';
}, true);

form.addEventListener('blur', function (event) {
  event.target.style.background = '';
}, true);
```

## 3、CustomEvent 接口

`CustomEvent` 接口**用于生成自定义的事件实例**。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 `CustomEvent` 接口生成的自定义事件对象。

浏览器原生提供`CustomEvent()`构造函数，用来生成 `CustomEvent` 事件实例。
```js
// 接受两个参数
// 第一个参数是字符串，表示事件的名字，这是必须的
// 第二个参数是事件的配置对象，这个参数是可选的
new CustomEvent(type, options)

// CustomEvent的配置对象除了接受 Event 事件的配置属性，只有一个自己的属性。
`detail`：表示事件的附带数据，默认为 null。


// 手动定义了build事件。该事件触发后，会被监听到，从而输出该事件实例的detail属性（即字符串hello）
var event = new CustomEvent('build', { 'detail': 'hello' });
function eventHandler(e) {
  console.log(e.detail);
}
document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});
document.body.dispatchEvent(event);


// CustomEvent 的事件实例，除了具有 Event 接口的实例属性，还具有detail属性。
var myEvent = new CustomEvent('myevent', {
  detail: {
    foo: 'bar'
  },
  bubbles: true,
  cancelable: false
});
el.addEventListener('myevent', function (event) {
  console.log('Hello ' + event.detail.foo);
});
el.dispatchEvent(myEvent);
```