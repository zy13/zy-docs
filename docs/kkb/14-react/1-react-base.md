## 1、React是什么

- 一个用于构建用户界面的 JavaScript 库 。
  - 用户界面：WEB --- 网页 (用户可以看到并使用的视图界面)
- 中文手册：[https://react.docschina.org/](https://react.docschina.org/)
- github仓库地址：[react-学习笔记](https://github.com/zy13/react-demo/tree/1-react-%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0)

### 命令式编程 和 声明式编程

- 告诉计算机怎么做（How） - 过程
- 告诉计算机我们要什么（What） - 结果

## 2、使用 React - 基于浏览器模式

- **React.js** 提供核心功能代码，如：虚拟`dom`，组件
  ```js
  React.createElement(type,props,children);
  ```
  ```html
    <script src="./js/react.js"></script>
    <script>
      console.log(React);
      /**
       * type: 标签类型
       * props: 标签属性
       * children: 子元素-文本、标签、组件等
       * 构建虚拟DOM：如h1,header,不是真正的dom
      **/
      let h1 = React.createElement('h1', {className: 'title'}, 'hello react')
      let header = React.createElement('header', {id: 'header'}, h1)
      console.log(h1);
      console.log(header);
      const domH1 = document.createElement('h1')
      console.dir(domH1);
    </script>
  ```
- **ReactDOM** 提供了与浏览器交互的 `DOM` 功能，如：`dom` 渲染
  ```js
  ReactDOM.render(Vnode, container[, callback])
  ```
  - `Vnode`：要渲染的内容
  - `container`：要渲染的内容存放容器
  - `callback`：渲染后的回调函数
  ```js
  // <script src="./js/react.js"></script>
  // <script src="./js/react-dom.js"></script>
  let span = React.createElement('span', null, 'hello')
  let a = React.createElement('a', {href:'https://react.docschina.org/',target:"_blank"}, 'React')
  let h1 = React.createElement('h1', {className: 'title'}, span, '-', a)
  let header = React.createElement('header', {id: 'header'}, h1) 
  console.log(ReactDOM);
  /**
   * ReactDOM：渲染DOM - 将虚拟DOM编译挂载到真实的DOM中
    * render(Vnode, container(, callback))
    * - Vnode（必须）: 虚拟dom，由核心库React.createElement(type,props,container)生成
    * - containe（必须）r: 需要将Vnode挂载到真实DOM的位置
    * - callback: 虚拟dom渲染完成后的回调函数
    **/
  ReactDOM.render(
    header,
    document.querySelector('#box'),
    () => {
      console.log('要挂载的视图渲染完成');
    }
  )
  ```

- **Babel**，在浏览器中处理 `JSX`

[babel.js](https://cdn.bootcss.com/babel-standalone/6.26.0/babel.min.js)，`JavaScript`脚本解析器，用于将`ES6+`的下一代`JavaScript`解析成浏览器可以识别的`ES5`原生。

## 3、JSX - Javascript + XML

### JSX 是一个基于 JavaScript + XML 的一个扩展语法：
JSX 是一种语法糖，可以为 JavaScript 添加 xml 的语法扩展。
- 它可以作为值使用
- 它并不是字符串
- 它也不是HTML
- 它可以配合JavaScript 表达式一起使用
- 本质是虚拟DOM（用js对象来描述DOM）：html标签结合表达式
```html
<div id="box"></div>
<script src="./js/react.js"></script>
<script src="./js/react-dom.js"></script>
<script src="./js/babel.js"></script>
<!-- <script> -->
<!-- 加上type="text/babel" 用babel解析jsx  -->
<script type="text/babel">
  let name = 'React'
  let header = <header id="header">
        <h1 className="title" style={{color: "red"}}>
          <span>Hello</span>
          <a href="https://react.docschina.org/"  target="_blank">{name}</a>
        </h1>
      </header>
  console.log(header);
  ReactDOM.render(
    header,
    document.querySelector('#box')
  )
</script>
```

### JSX 使用注意事项
- 有且仅有一个顶层的包含元素 - `React.Fragment`
- `JSX`不是`html`，很多属性在编写时不一样:
  - className
  - style
- 列表渲染时，必须有 `key` 值
- 在 `jsx` 所有标签必须闭合
- 组件的首字母一定大写，标签一定要小写

## 3、延伸：XSS

- XSS是[跨站脚本攻击](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

在以下2种情况下，容易发生 XSS 攻击：
- 数据从一个不可靠的链接进入到一个 Web 应用程序
- 没有过滤掉恶意代码的动态内容被发送给 Web 用户

### React是如何防止XSS的？
为了有效的防止 `XSS` 注入攻击，`ReactDOM` 会在渲染的时候把内容（字符串）进行转义，所以字符串形式的标签是不会作为 `HTML` 标签进行处理的。

## 4、插值表达式

在 `JXS` 中可以使用大括号嵌入表达式：{表达式}

表达式：产生值的一组代码的集合

- 变量
- 算术运算
- 函数调用
- ...

**注意**：分清楚 表达式 与 语句 的区别，`if`、`for`、`while` 这些都是语句，`JSX` 不支持语句

### 各种类型内容在插值中的使用

- 注释: {/注释/} {/* 多行注释 */}

### 输出数据类型

- 字符串、数字：原样输出
- 布尔值、空、未定义: 会被忽略

## 5、使用 React - 基于脚手架 

- 脚手架 - 自动化的集成环境模式 - create-react-app

### 介绍

通过前面 `script` 的方式虽然也能完成 `React.js` 的开发，但是有一个现在前端很重要的特性 - 模块化，无法使用。

`Create React App（CRA）` 是一个使用 `Node.js` 编写的命令行的开箱即用工具: 
- 快速生成 `React.js` 项目；
- 内置了 `Babel`、`Webpack` 等工具，实现 `ES6+` 解析、模块化解析打包；
- 使用 `模块化` 以及 `ES6+` 等更新的一些特性；
- 内置 `ESLint` 语法检测工具、`Jest` 单元测试工具；
- 基于 `Node.js` 的 `WebServer` 更好的在本地预览应用等。

### 安装与使用

- 通过`npm`安装：`npm i -g create-react-app`
- 通过`yarn`安装: `yarn global add create-react-app`

安装完成以后，即可使用 `create-react-app` 命令: `create-react-app <项目名称>`

### 项目目录结构说明

运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录
```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js  项目的入口文件
    logo.svg
```

### 命令脚本

`create-react-app` 同时也提供了其它一些命令来帮助我们进行开发

**npm start**
- 启动一个内置的本地 `WebServer`，
- 根目录映射到 `'./public'` 目录，
- 默认端口：`3000`

**npm run test**
- 运行 Jest 测试

**npm run build**
- 打包应用（准备上线）

## 6、列表渲染

将原有数据转换成数组，利用 `jsx` 可以插入数组的特性，映射出来新数组

### 数组

自动展开数据，每个元素都当做DOM节点渲染
```js
// let list = [
//   <li>列表项-1</li>,
//   <li>列表项-2</li>,
//   <li>列表项-3</li>,
// ]

let list = data.map(item => {
  return <li>{item}</li>
})

ReactDOM.render(
  list,
  document.querySelector('#root')
)
```

### 对象

扩展：虚拟 DOM （virtualDOM） 和 diff
```js
let list = <ul>
    {data.map(item=><li>{item}</li>)}
</ul>;

ReactDOM.render(
  list,
  document.querySelector("#root")
);
```

## 7、条件渲染

- 三元运算符 `?:`
- 与运算符 `&&`
- 或运算符 `||`
```js
import React from 'react'
import ReactDOM from 'react-dom'

/** 
 * 条件渲染
 * 逻辑与运算符 &&
 * 逻辑或运算符 &&
 * 三元运算符 ?:
**/
function is(num) {
  if(num>10) {
    return '大于10'
  }else {
    return '小于等于10'
  }
}

let list = <ul>
  <li>{true||'或运算'}</li>
  <li>{false||'或运算'}</li>
  <li>{true &&'与运算'}</li>
  <li>{false &&'与运算'}</li>
  <li>{is(14)}</li>
</ul>

ReactDOM.render(
  list,
  document.querySelector('#root')
)
```

## 8、特殊属性
特殊属性就是在属性上使用表达式，`JSX` 中的表达式也可以使用在属性上。
- 注意：当在属性中使用 `{}` 的时候，不要使用引号包含

```js
import React from 'react'
import ReactDOM from 'react-dom'

/** 
 * 如果属性名称由多个单词组，从第二个单词开始首字母大写,
 *  style 接收的是一个对象
**/

let style = {
  width: '100px',
  height: '100px',
  background: 'red'
}

let view = <div
  className="box"
  style={style}
/>

ReactDOM.render(
  view,
  document.querySelector('#root')
)
```

## 9、React 组件

组件是对具有一定独立功能的**数据**与**方法**的封装，对外暴露接口，有利于代码功能的复用，且不用担心冲突问题。


### 类组件
- 组件类必须继承 **React.Component**
- 组件类必须有 **render** 方法

```js
import { Component } from 'react'
import ReactDOM from 'react-dom'

/*
  React组件，可以理解为一个状态机，当状态发生改变时，组件会更新状态产生不同的效果
  类组件：组件是一个类
  1、继承React.Component类
  2、必须有render()方法
*/

class Count extends Component {
  render() {
    return <div>
      <h1>1</h1>
    </div>
  }
}

ReactDOM.render(
  <Count />,
  document.querySelector('#root')
)
```

### 函数式组件

- 函数的名称就是组件的名称
- 函数的返回值就是组件要渲染的内容

## 10、props 和 state

### props

**props** 是父组件传递过来的参数
- 父组件调用子组件时，可以将数据添加到子组件的属性上，
- 在子组件中，可以通过`props`属性接受父组件传过来的属性

### state

**state**是组件自身的状态
- 在组件内，用来state属性来定义状态
- 在React想要更新状态，必须调用组件的setState方法

### props 与 state 的区别

- state 的主要作用是用于组件保存、控制、修改自己的可变状态，在组件内部进行初始化，也可以在组件内部进行修改，但是组件外部不能修改组件的 state
- props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件，它是外部传进来的配置参数，组件内部无法控制也无法修改 
- state 和 props 都可以决定组件的外观和显示状态。
- 通常，props 做为不变数据或者初始化数据传递给组件，可变状态使用 state

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

/*
  state: 
  1、在组件内，用来state属性来定义状态
  2、在React想要更新状态，必须调用组件的setState方法
  props
  1、父组件调用子组件时，可以将数据添加到子组件的属性上，
  2、在子组件中，可以通过props属性接受父组件传过来的属性
*/

class Count extends Component {
  state = {
    count: 1
  }
  render() {
    const { count } = this.state
    const { title } = this.props

    return <div>      
      <h1>{title}</h1>
      <p>当前件数：{count}</p>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }} >递增</button>
    </div>
  }
}

class App extends Component {
  render() {
    return <Count title='app'/>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```

## 11、类组件 - super

- 类组件中默认有一个空的constructor，其中调用`super()`
- 若写constructor，会复写默认的constructor，这时候要调用super()

### super()作用

- 如果constructor中，不写super()，用到的this的地方会报错
- 初始化this，可以将事件绑定到this上，从而可以在组件内通过this调用事件
- 初始化state状态，没有props属性
- 不可以在constructor中使用`this.props`
```js
  constructor(props) {
    super()
    console.log(this.props); // undefined
  }
```

### super(props)作用
- 在父类的构造函数中给props赋值一个对象t
- 初始化state状态
- 初始化props属性
- 可以在constructor中使用`this.props`
```js
  constructor(props) {
    super(props)
    console.log(this.props); // 对象
  }
```

## 11、React 事件

- 多个单词组成的事件名称，第二字母开始，首字母要大写
- 行间事件中：（把函数体写到xml代码中）
  - 箭头函数的`this`指向类组件
  - function定义的函数中的this为undefined
```js
class Count extends Component {
  state = {
    count: 1
  }
  render() {
    const {count} = this.state
    return <>
      <p>{count}</p>
      <button onClick={(e)=>{
        console.log(123, this, e.target); // this指向Count
      }}>点击</button>
      <button onClick={function(e){
        console.log(123, this, e.target); // this为undefined
      }}>点击1</button>
    </>
  }
}
```

- React 组件中的事件

- 箭头函数指向类组件本身
- function函数中的this，要在constructor中绑定执行Count
```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

/*
  事件
  1、react中的事件定义类似于js的行间事件
    - 行间事件：将JavaScript函数写到HTML元素中的执行事件
    - 箭头函数的this指向组件本身
    - function函数的this为undefined
  2、添加React事件，要注意从第二个单词开始的首字母要大写
  3、React 事件，是一个合成事件
    - 在 react的事件处理函数中，this指向默认为 undefined
    - 箭头函数没有this
  4、类组件中的constructor
    - constructor属性与构造函数中proptotype属性中的constructor是一样的，
    - 都是指向构造函数本身
    - constructor中的this指向类组件本身
*/

// 行间事件中this的指向问题
// class Count extends Component {
//   state = {
//     count: 1
//   }
//   render() {
//     const {count} = this.state
//     return <>
//       <p>{count}</p>
//       <button onClick={(e)=>{
//         console.log(123, this, e.target); // this指向Count
//       }}>点击</button>
//       <button onClick={function(e){
//         console.log(123, this, e.target); // this为undefined
//       }}>点击1</button>
//     </>
//   }
// }

// react事件
class Count extends Component {
  constructor(props) {
    super()
    this.state = {
      count: 1
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    console.log(333, this, e.target); // this为undefined,必须要在constructor中进行初始化
    this.setState({
      count: 2
    })
  }
  clickHandler = (e) => {
    console.log(222, this, e.target); // this指向Count
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    const { title } = this.props
    return <div>
      <h1>{title}</h1>
      <p>{this.state.count}</p>
      <button onClick={this.handleClick}>递增</button>
      <button onClick={this.clickHandler}>递增</button>
    </div>
  }
}

class App extends Component {
  render() {
    return <Count title="App"/>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```


```js
// react事件
class Count extends Component {
  state = {
    count: 1
  }
  clickHandler = (e) => {
    console.log(this);
    this.setState({
      count: this.state.count + 2
    })
  }
  render() {
    return <div>
      <h1>{this.props.title}</h1>
      <p>{this.state.count}</p>
      <button onClick={this.clickHandler}>递增</button>
    </div>
  }
}

class App extends Component {
  render() {
    return <Count title="App"/>
  }
}
```

## 13、VSCODE 插件

- **vscode-styled-jsx** JSX 语法高亮&autoImport

## 14、练习

完成好友列表项目 要求：
- 基于 create-react-app 搭建项目环境
- 基于给定视图完成好友列表项目
  - 把数据摘出来，由数据生成视图
  - 点击标题列表如果是展开状态则收缩，列表是收缩状态则展开
