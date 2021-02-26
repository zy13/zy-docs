## 1、无刷新请求

当浏览器发送请求，接收到数据以后，整个页面会进行渲染。

如果在获取数据时：
- 获取无关数据
- 页面局部更新

那么：
- 不要让浏览器去发送请求

- `postman`工具
模拟浏览器发送http请求，便于客户端和服务端的调试

- 运行在浏览器中的JavaScript，提供能够对http进行编程的能力
  - **XMLHttpRequest对象**
  - **Fetch对象**

## 2、XMLHttpRequest对象-ajax

官网：[https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

这个对象能够发送http请求，并接收请求后的数据。这样数据直接到了JavaScript中，而不是浏览器中。得到数据以后就不会主动触发浏览器的后续渲染，而是通过JavaScript对这些数据进行操作，比如动态调用浏览器提供的DOM接口进行动态页面结构的操作

- 首先必须提供一个能够运行JavaScript的环境
  - 首先必须提供一个基础页面，把后端原来的模板直接发送给客户端浏览器
  - 浏览器解析页面时，遇到JavaScript代码就会执行，通过JavaScript中的XMLHttpRequest对象来发送请求

### 2-1、过程

- 创建一个xht（XMLHttpRequest）对象
- 准备发送请求的配置参数
- 发送请求
- 接收请求返回的数据并加以处理

#### 创建一个xht（XMLHttpRequest）对象

```js
const xhr = new XMLHttpRequest()
```

#### 准备发送请求的配置参数

- 请求在主线程中一定不要使用同步模式
- 使用异步请求方式，同时配合load来处理后续工作

```js
xhr.open('get', '/user', false)
```

- 第一个参数：请求方法
- 第二个参数：请求的url
- 第三个是否异步：默认为true, false为同步(不建议使用)

扩展：[web workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)

#### 发送请求

```js
xhr.send()
```
- 可选参数：发送的数据

#### 接收请求返回的数据并加以处理

```js
xhr.onload = function() {
  console.log(xhr.responseText)
}
```

- 对响应的数据进行封装
  - 属性: 将数据解析为不同的格式
    - readyState，异步请求过程中的状态
    - onreadystatechange, 事件，监听状态
    - response，服务端返回的原始数据
    - responseText，将拿到的数据解析为纯文本格式的数据
    - status，返回的状态码
    
  - 方法
    - load(): 请求成功后触发，也可以用onload属性
