github代码：[https://github.com/zy13/koa-demo/tree/4-koa-ajax](https://github.com/zy13/koa-demo/tree/4-koa-ajax)

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

- 首先必须提供一个能够运行JavaScript的环境,比如浏览器
  - 首先必须提供一个基础页面（比如index.html），把后端原来的模板直接发送给客户端浏览器
  - 浏览器解析页面时，遇到JavaScript代码就会执行，通过JavaScript中的XMLHttpRequest对象来发送请求

### 2-1、过程

- （1）创建一个xhr（XMLHttpRequest）对象
- （2）准备发送请求的配置参数
- （3）发送请求
- （4）接收请求返回的数据并加以处理

#### （1）创建一个xhr（XMLHttpRequest）对象

```js
const xhr = new XMLHttpRequest()
```

#### （2）准备发送请求的配置参数

```js
// - 第一个参数：请求方法
// - 第二个参数：请求的url
// - 第三个是否异步：默认为true, false为同步(不建议使用)
xhr.open('get', '/user')
```

- 请求在主线程中一定不要使用同步模式
- 使用异步请求方式，同时配合load来处理后续工作
- http状态码
  - [https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

扩展：[web workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)

#### （3）发送请求
```js
xhr.send()
// 或者
let data = {
  username: value
}
xhr.send(JSON.stringify(data))
```
发送请求携带数据的方式：
 - （1）通过url
    - xhr.open('get','/user/1')
 - 通过url中的queryString
    - xhr.open('get','/user?username=1')
 - 通过设置请求头
    - 设置头信息xhr.setRequestHeader('content-type','application/json')
 - 通过正文
    - 通过xhr.send(数据)，数据只能是字符串，可以是json格式的字符串（要将头信息设置json格式）

```js
const xhr = new XMLHttpRequest()
let data = {
  username: document.querySelector('input[name="username"]').value
}
xhr.open('post','/user')
xhr.setRequestHeader('content-type', 'application/json')
xhr.send(JSON.stringify(data))
xhr.onload = function() {
  alert(xhr.responseText)
}
```

#### （4）接收请求返回的数据并加以处理

```js
xhr.onload = function() {
  console.log(xhr.responseText)
}
```

- **XMLRequestXML封装的属性**
  - readyState，异步请求过程中的状态
  - onreadystatechange, 事件，监听状态
  - response，服务端返回的原始数据
  - responseText，将拿到的数据解析为纯文本格式的数据
  - status，返回的状态码
  - onload属性，请求发送成功后调用

## 3、无刷新文件上传-XMLHttpRequest

监听文件上传和上传文件进度处理
### 3-1、文件上传的过程
**客户端文件上传过程**
- （1）创建file类型的input框
- （2）通过点击按钮触发upload的文件选择框
- （3）监听change事件,获取文件数据
- （4）通过XMLHTTPRequest对象提交FormData数据
- （5）监听文件上传进度
- （6）通过xhr.ResponseText获取文件路径
- （7）显示文件

### （1）创建file类型的input框
```html
<button class="btn">文件上传<button>
<input type='file' id="upload" style="display:none">
```
- click事件
- change事件
- [FileList对象](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList)，通过this.files.item(0)获取单个文件数据

### (2) 通过点击按钮触发upload的文件选择框
```js
const upload = document.querySelector('#upload')
document.querySelector('.btn').onclick = function() {
  upload.click
}
```
### （3）监听change事件,获取文件数据
```js
upload.onchange = function() {
  console.log(this.files.item[0])
}
```

### (4) 通过XMLHTTPRequest对象提交FormData数据
- 文件数据通过formdata封装
```js
const fd = new FormData()
fd.append('attachment',this.files.item[0]) // attachment附件
```

- xhr提交FormData的文件数据
  - 设置请求头为'multipart/form-data'表单数据格式
  - send()方法提交form-data数据：此外，该方法还可以字符串，json格式的字符串
```js
const xhr = new XMLHttpRequest()
xhr.open('post','/upload')
xhr.setRequestHeader('content-type','multipart/form-data')
xhr.send(fd)
```

### （5）监听文件上传进度
通过xhr.upload.onprogress监听文件的上传进度
```js
xhr.upload.onprogress = function(e) {
  const v = ${e.loac}
}
```

### (7) 显示文件

### 3-2、服务端处理文件的过程
**服务端响应文件上传过程**
- (1) koaBody中间件对请求正文数据的处理
- (2) 将文件路径返回给客户端

#### (1) koaBody中间件对请求正文数据的处理
koaBody处理表单数据的前提：
- 客户端请求头content-type为multipart/form-data 
- 提交的文件数据为form-data对象

koaBody的配置：
```js
// 情况一：表单数据为对象时，通过ctx.request.body解析
koaBody({
  multipart: true, // 表单数据
})
// 情况二：表单数据为二进制数据时，通过ctx.requst.files解析
koaBody({
  multipart: true, // 表单数据
  formidable: {
    uploadDir: '/public/upload', // 文件存放路径
    keepExtensions: true // 保留文件后缀
  }
})
```

#### （2）将文件路径返回给客户端
```js
ctx.body = ctx.request.files.attachment.path
```

## 4、Fetch对象中的fetch()方法

Fetch API： [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

与XMLHttpRequest相比，Fetch存在以下问题：
- 兼容问题（ie11-）
- 没有进度相关事件

fetch()必须接受一个参数-资源的路径，无论成功与否，它都会返回一个Promise对象

### 4-1、fetch获取服务端数据

fetch()方法接受一个参数，String类型或者Request对象

- **fetch()方法接受一个String类型参数**
```js
  // 默认为get请求，返回一个Promise对象
	fetch('/getPhotos').then(res => {
    // res是个Promise对象
    // json()返回一个Promise对象
    res.json().then(data => {
      console.log(data)
    })
  })
```

- **fetch()方法接受一个Request对象**

Request对象只有一个参数，默认为get请求，get和body不能同时用
```js
async function fetch2 () {
  let req = new Request('/getPhotos') // get/head方法不能用body对象
  let res = await fetch(req)
  let data = await res.json() // 只能解析返回的json格式

  data.map(item => {
    let img = new Image()
    img.src = '/' + item.path
    contentList.appendChild(img)
  })
}
```

- **post方法提交JSON格式的数据**

注意：无需设置请求头，xhr需要设置请求头
```js
	async function postUserInfo() {
		let req = new Request('/userInfo', {
			method: 'post',
			body: JSON.stringify({
				name: 'zy',
				gender: 'girl'
			})
		})
		let res = await fetch(req)
		let data = await res.text() // 解析String类型的数据
		console.log(data)
	}
```

- **实现文件上传**

提交的form-data数据直接挂在Request对象的body属性
```js
	function uploadFile() {
		let btn = document.querySelector('.btn')
		let upload = document.querySelector('#upload')

		btn.onclick = function() {
			upload.click()
		}
		upload.onchange = async function() {
			let fd = new FormData()
			fd.append('attachment', this.files.item(0))

			let req = new Request('/upload', {
				method: 'post',
				body: fd
			})
			let res = await fetch(req)
			let path = await res.text()
			
			let img = new Image()
			img.src = path
			
			contentList.appendChild(img)
		}
	}
```

## 5、XMLHttpRequest练习

```
1、上传完图片成功后，关闭上传窗口
2、后端保存上传的图片到 static/upload 文件夹下以及数据库内（photos 表，字段如上次作业一致）
3、前端调用 /getPhotos 接口，获取后端保存的所有图片数据
4、后端需要从数据库内获取上传图片的数据返回给前端
5、前端基于图片数据显示图片
6、上传完图片后，可以直接在前端显示
7、以上所有数据请求必须使用ajax完成
```