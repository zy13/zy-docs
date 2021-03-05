## 1、HTTP协议

### 1-1、请求/响应模式

### 1-2、无状态模式

## 2、轮询

github代码：[https://github.com/zy13/koa-demo/tree/7-koa-polling](https://github.com/zy13/koa-demo/tree/7-koa-polling)

客户端定时向服务器发送Ajax请求，服务器接到请求后无论是否有响应的数据，都马上返回响应信息并关闭连接。

- 优点：实现简单
- 缺点：浪费带宽和服务器资源，新数据响应会有延迟。
- 应用：小应用小场景。

```js
  btn[1].onclick = async function() {
    clearInterval(timer)
    // 轮询：每隔1s就开始发送请求，不管上次请求是否完成
    timer = setInterval(() => {
      getUsers()
    }, 1000)
  }

  function getUsers() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('get',`/users?count=${count}`)
      xhr.onload = function() {
        let users = JSON.parse(this.responseText)        
        count = users.length
        ul.innerHTML = ''
        users.map(user => {
          const li = document.createElement('li')
          li.innerHTML = user.username
          ul.appendChild(li)
        })
        resolve()
      }
      xhr.send()
    })
  }
```

## 3、长轮询

与简单轮询相似，只是在服务端在没有新的返回数据情况下不会立即响应，而会挂起，直到有数据或即将超时。

- 优点：实现也不复杂，同时相对轮询，节约带宽。
- 缺点：所以还是存在占用服务端资源的问题，虽然及时性比轮询要高，但是会在没有数据的时候在服务端挂起，所以会一直占用服务端资源，处理能力变少。
- 应用：一些早期的对及时性有一些要求的应用：web IM 聊天。

### 客户端发送轮询请求
```js
  btn[1].onclick = async function() {
    await pollingRequest()
  }

  async function pollingRequest() {
    await getUsers()
    // 当上一次的请求完成以后，再调用
    setTimeout(() => {
      pollingRequest()
    }, 1000)
  }

  function getUsers() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('get',`/users?count=${count}`)
      xhr.onload = function() {
        let users = JSON.parse(this.responseText)        
        count = users.length
        ul.innerHTML = ''
        users.map(user => {
          const li = document.createElement('li')
          li.innerHTML = user.username
          ul.appendChild(li)
        })
        resolve()
      }
      xhr.send()
    })
  }  
```

### 服务端处理轮询请求：长轮询
```js
async function sleep(t = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t);
  })
}

router.get('/users', koaBody(), async ctx => {
  let { count } = ctx.request.query;
  count = count || 0

  // 比较当前count和后端数据当前的长度
  while(count == users.length) { // 数据没变
    // 定时查询
    await sleep()
  }

  return new Promise(resolve => {
    setTimeout(() => {
      ctx.body = users
      resolve()
    }, 2000);
  })
})
```

## 4、SSE服务器推送: 长轮询标准化



[SSE - Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

一个网页获取新的数据通常需要发送一个请求到服务器，也就是向服务器请求的页面。使用 server-sent 事件，服务器可以在任何时刻向我们的 Web 页面推送数据和信息。这些被推送进来的信息可以在这个页面上作为 [Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) + data 的形式来处理。

[使用服务器发送事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events)

- 长轮询的一套标准化，跟长轮询差不多

### 4-1、客户端

- EventSource类

使用EventSource类接口来完成请求

```js
let source = new EventSource('/users')
```

参考：https://developer.mozilla.org/en-US/docs/Web/API/EventSource


### 4-2、服务端

服务端需要做一些设置

- 头信息

```js
"Content-type": "text/event-stream"
```

- 返回数据格式

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

```js
ctx.body = `event: ping\ndata: {"time": "${new Date()}"}\n\n`
```

## 5、websocket

[gitbub代码](https://github.com/zy13/websocket-demo.git)

### 5-1、websocket介绍

- WebSocket 是 HTML5 开始提供的一种在单个连接上进行全双工通讯的协议。

- 使用协议：ws，其基于 HTTP 协议进行数据传输，但是会持久化链接和状态。

### 5-2、基于node.js的websocket库

- **[socket.io](https://www.npmjs.com/package/socket.io)**的使用：[https://socket.io/](https://socket.io/)

### 构建一个websocket服务器


<!-- ## 7、web即时聊天系统 -->

## 8、直播课件
[有道云笔记](https://note.youdao.com/web/#/file/WEBb99053024aed1853e614cae91295f0fc/markdown/WEB1da3600e089c1c9857ff2ed628934895/)

## 10、练习


- 1、聊天室功能实现 
  - 1、实时聊天
  - 2、显示每条记录的（服务器）时间，格式参考：'2020-09-24 22:51:02' 