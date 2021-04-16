[XMLHttpRequest 对象](https://www.wangdoc.com/javascript/bom/xmlhttprequest.html)

## 1、简介

浏览器与服务器之间，采用 `HTTP` 协议通信。用户在浏览器地址栏键入一个网址，或者通过网页表单向服务器提交内容，这时浏览器就会向服务器发出 `HTTP` 请求。

`AJAX` 通过原生的`XMLHttpRequest`对象发出 `HTTP` 请求，得到服务器返回的数据后，再进行处理。现在，服务器返回的都是 `JSON` 格式的数据，`XML` 格式已经过时了，但是 `AJAX` 这个名字已经成了一个通用名词，字面含义已经消失了。

`XMLHttpRequest`对象是 `AJAX` 的主要接口，用于浏览器与服务器之间的通信。尽管名字里面有`XML`和`Http`，它实际上可以使用多种协议（比如`file`或`ftp`），发送任何格式的数据（包括字符串和二进制）。
### AJAX请求步骤

`XMLHttpRequest`本身是一个构造函数，可以使用`new`命令生成实例。它没有任何参数。

具体来说，`AJAX` 包括以下几个步骤:
- 创建 `XMLHttpRequest` 实例
- 发出 `HTTP` 请求
- 接收服务器传回的数据 - 注册回调函数
- 更新网页数据
```js
// 一旦新建实例，就可以使用open()方法指定建立 HTTP 连接的一些细节。
var xhr = new XMLHttpRequest();

// 使用 GET 方法，跟指定的服务器网址建立连接。第三个参数true，表示请求是异步的。
xhr.open('GET', 'http://www.example.com/page.php', true);

// 指定回调函数，监听通信状态（readyState属性）的变化。
// 一旦XMLHttpRequest实例的状态发生变化，就会调用监听函数handleStateChange
xhr.onreadystatechange = handleStateChange;

function handleStateChange() {
  // ...
}

// 最后使用send()方法，实际发出请求，不带有数据体
// 如果发送的是 POST 请求，这里就需要指定数据体。
xhr.send();
```

一旦拿到服务器返回的数据，`AJAX` 不会刷新整个网页，而是只更新网页里面的相关部分，从而不打断用户正在做的事情。

**注意**，`AJAX` 只能向同源网址（协议、域名、端口都相同）发出 `HTTP` 请求，如果发出跨域请求，就会报错。

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', '/endpoint', true);

// 通信成功的回调函数
xhr.onload = function() {
  console.log(xhr.responseText);
}
// xhr.onreadystatechange = function(){
//   // 通信成功时，状态值为4
//   if (xhr.readyState === 4){
//     if (xhr.status === 200){
//       console.log(xhr.responseText);
//     } else {
//       console.error(xhr.statusText);
//     }
//   }
// };
// xhr.onerror = function (e) {
//   console.error(xhr.statusText);
// };
xhr.send(null);
```

## 2、XMLHttpRequest 的实例属性

- XMLHttpRequest.readyState：[link](./5-xhr.html#_2-1-xmlhttprequest-readystate)
- XMLHttpRequest.onreadystatechange：[link](./5-xhr.html#_2-2-xmlhttprequest-onreadystatechange)
- XMLHttpRequest.response：[link](./5-xhr.html#_2-3-xmlhttprequest-response)
- XMLHttpRequest.responseType：[link](./5-xhr.html#_2-4-xmlhttprequest-responsetype)
- XMLHttpRequest.responseText：[link](./5-xhr.html#_2-5-xmlhttprequest-responsetext)
- XMLHttpRequest.responseXML：[link](./5-xhr.html#_2-6-xmlhttprequest-responsexml)
- XMLHttpRequest.responseURL：[link](./5-xhr.html#_2-7-xmlhttprequest-responseurl)
- XMLHttpRequest.status，XMLHttpRequest.statusText：[link](./5-xhr.html#_2-8-xmlhttprequest-status，xmlhttprequest-statustext)
- XMLHttpRequest.timeout，XMLHttpRequestEventTarget.ontimeout：[link](./5-xhr.html#_2-9-xmlhttprequest-timeout，xmlhttprequesteventtarget-ontimeout)
- 事件监听属性：[link](./5-xhr.html#_2-10-事件监听属性)
  - onloadstart，onprogress，onabort， onerror，**onload**，ontimeout，onloadend
- XMLHttpRequest.withCredentials：[link](./5-xhr.html#_2-11-xmlhttprequest-withcredentials)
- XMLHttpRequest.upload：[link](./5-xhr.html#_2-12-xmlhttprequest-upload)

### 2.1 XMLHttpRequest.readyState
### 2.2 XMLHttpRequest.onreadystatechange
### 2.3 XMLHttpRequest.response
### 2.4 XMLHttpRequest.responseType
### 2.5 XMLHttpRequest.responseText
### 2.6 XMLHttpRequest.responseXML
### 2.7 XMLHttpRequest.responseURL
### 2.8 XMLHttpRequest.status，XMLHttpRequest.statusText
### 2.9 XMLHttpRequest.timeout，XMLHttpRequestEventTarget.ontimeout 
### 2.10 事件监听属性
  
### 2.11 XMLHttpRequest.withCredentials
### 2.12 XMLHttpRequest.upload

## XMLHttpRequest 的实例方法
XMLHttpRequest.open()
XMLHttpRequest.send()
XMLHttpRequest.setRequestHeader()
XMLHttpRequest.overrideMimeType()
XMLHttpRequest.getResponseHeader()
XMLHttpRequest.getAllResponseHeaders()
XMLHttpRequest.abort()