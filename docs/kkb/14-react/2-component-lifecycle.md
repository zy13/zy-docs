## 1、state和setState

### setState(updater, [callback])

`setState`用于修改数据，更新组件：

- **updater** - 更新数据，数据类型可以是函数或者对象
```js
// updater - 函数
this.setState(() => {
  return {
    isShow: !this.state.isShow
  }
})

// updater - 对象
this.setState({
  isShow: !this.state.isShow
})
```
- **callback** - 更新成功后的回调 FUNCTION
```js
this.setState({
  isShow: !this.state.isShow
}, () =>{
  console.log('更新成功')
})
```

## 2、setState的浅合并

###  Object.assign()的浅合并

用`Object.assign()`合并对象时，对象中的对象只能覆盖不能合并，也就是源对象会对目标对象中的对象进行覆盖。
```js
let obj1 = {
  people: {
    name: 'zy',
    age: 29
  },
  height: '165cm'，
  weight: '50kg'
}
let obj2 = {
  people: {
    name: 'zy-1',
  },
  height: '165cm'
}
let obj = Object.assign(obj1, obj2) // ?

// obj = {
//   people: {
//     name: 'zy-1',
//   },
//   height: '165cm',
//   weight: '50kg'
// }
```

### setState的浅合并

使用 `setState` 修改状态时，只要返回我们需要修改的状态，`setState`会进行浅合并(浅拷贝)
```js
class Count extends Component {
  state = {
    people: {
      name: 'zy',
      age: 29
    },
    height: '165cm'
  }
  handleChange = () => {
    // 只修改age, setState就会进行浅合并
    this.setState({
      people: {
        age: 20
      }
    })
    console.log(this.state.people) // ?
  }
}

```

要保证state中的对象不被浅合并，可以：
```js
  state = {
    data: {
      count: 1,
      num: 5
    }
  }
  this.setState({
    data: {
      ...this.state.data,
      count: count + 1
    }
  })

```
- 调用 `setState` 之后，会触发生命周期，重新渲染组件

## 3、setSatte - 同步还是异步方法

### 批量更新

在同一个操作中，一次或者多次调用 setState ，正常情况下 React 会将这些 setState 中的更新进行合并，只执行一次更新。

- react通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能

```js
<button onClick={()=>{
  // 只触发一次render()
  this.setState({
    count: count + 2
  })
  console.log(this.state.count)
  this.setState({
    count: count + 2
  })
  console.log(this.state.count)
  this.setState({
    num: num + 5
  })
  console.log(this.state.num)
  this.setState({
    num: num + 5
  })
  console.log(this.state.num)
}}>count递增</button>
```

### 思考：setSatte 同步还是异步方法？

在触发了**批量更新机制**时，setState 是一个异步方法，否则 setState 是一个同步方法

如何让setState变成同步呢？
在批量setState调用外用一个异步函数封装起来。
```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    count: 1,
    num: 2
  }
  render() {
    const {count, num} = this.state
    console.log('render');
    return <div>
      <div>{count}--{num}</div>
      <button onClick={()=>{
        // setState异步 - 触发了批量更新机制
        this.setState({
          num: num + 5
        })
        console.log('222', this.state.num)
         // 每个异步函数都会触发render
        setTimeout(()=>{
          // setState同步
          this.setState({
            count: num + 5
          })
          console.log('333', this.state.count)
        })
      }}>点击</button>
      <button onClick={()=>{
        // 同一个操作中，批量的setState操作，只触发一次render()
        // 触发了批量更新机制，setState为异步
        this.setState({
          count: count + 2
        })
        console.log(this.state.count)
        this.setState({
          count: count + 2
        })
        console.log(this.state.count)
        this.setState({
          num: num + 5
        })
        console.log(this.state.num)
        this.setState({
          num: num + 5
        })
        console.log(this.state.num)
      }}>count递增</button>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```

## 4、父子组件间的通信

在 React.js 中，数据是从上自下流动（传递）的，也就是一个父组件可以把它的 state / props 通过 props 传递给它的子组件，但是子组件不能修改 props - React.js 是单向数据流，如果子组件需要修改父组件状态（数据），是通过回调函数方式来完成的。

### 父级向子级通信 - props

把数据添加子组件的属性中，然后子组件中从props属性中，获取父级传递过来的数据

### 子级向父级通信 - 回调函数的方式

在父级中定义相关的数据操作方法(或其他回调), 把该方法传递给子级，在子级中调用该方法父级传递消息

### 案例：完善好友列表

```js
import { Component } from "react";
import ReactDOM from 'react-dom'
import datas from './data.js'

import './css/index.css'

class Menu extends Component{
  changeShowName = () => {
     const { name, showName, handleChange } = this.props
     handleChange(name===showName?"":name)
  }
  render() {
    const {data, name, showName} = this.props
    return <dl className={`friend-group ${name===showName?"expanded":''}`}>
      <dt onClick={this.changeShowName}>{data.title}</dt>
      {data.list.map((item,index) => {
        return <dd key={index}>{item.name}</dd>
      })}
    </dl>
  }
}

class App extends Component{
  state = {
    showName: ''
  }
  handleChange = (name) => {
    console.log(name);
    this.setState({
      showName: name
    })
  }
  render() {
    const {showName} = this.state
    return <div className="friend-list">
      {Object.keys(datas).map(key => {
        return <Menu data={datas[key]} showName={showName} handleChange={this.handleChange} name={key} key={key}/>
      })}
    </div>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)
```

## 5、跨组件通信 - context

React.createContext对象中，包含Provider，Consumer两个组件；
```js
// context.js
import {createContext}  from 'react'
const context = createContext()
const {Provider,Consumer} = context

export {
  Provider, Consumer
}

export default context
```

### 传递数据 - Provider组件
- 父组件给子代组件传递信息
- 含有一个value属性，挂载需要传递的数据
```js
<Provider value={{
  name: 'zy',
  num: 123
}}>
  <Container></Container>
</Provider>
```

### 接收数据

- contextType
```js
// 通过 contextType 接收数据
class Name extends Component{
  static contextType = context
  render() {
    const {name} = this.context
    return <>
      <p>{name}</p>
    </>
  }
}
```

- Consumer

```js
// 通过 Consumer 组件接收数据
class Age extends Component{
  render() {
    return <Consumer>
      {({age})=>{
        return <p>{age}</p>
      }}
    </Consumer>
  }
}
```

- 注意在使用不熟练时，最好不要在项目中使用 context，context一般给第三方库使用

```js
import {Component} from 'react'
import ReactDOM from 'react-dom'
import context, {Provider, Consumer} from './context'

// 通过 contextType 接收数据
class Name extends Component{
  static contextType = context
  render() {
    const {name} = this.context
    return <>
      <p>{name}</p>
    </>
  }
}

// 通过 Consumer 组件接收数据
class Age extends Component{
  render() {
    return <Consumer>
      {({age})=>{
        return <p>{age}</p>
      }}
    </Consumer>
  }
}

// 父组件通过 Provider 给后代组件传递数据
class Container extends Component{
  render() {
    return <>
      <Name></Name>
      <Age></Age>
    </>
  }
}

class App extends Component{
  render() {
    return <Provider value={
          {
            name: 'zy',
            age: 18
          }
        }>
      <Container/>
    </Provider>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)
```

## 6、受控组件与非受控组件

### 受控组件

受控组件类似于 vue 中，v-model:

- 在表单控件之外，获取表单的内部状态时，表单的状态会随着组件的状态之改变;
- 在使用受控组件时，必须添加 onChange 回调，在回调中监听 表单的状态改变，然后更新组件状态




### 非受控组件

在设置表单控件的初始值时，如果直接使用 value 或者 checked 的话，react 会认为我们想要实现的是 受控组件，就会提示我们添加 onchange 回调，否则 控件会变成只读的。

如果不需要同步value或者checked值，使用 **defaultValue** 或 **defaultChecked**
```js
class AddTodo extends Component{
  state = {
    val: ''
  }
  render() {
    const {val} = this.state
    return <div>
      {/* 非受控组件 表单： 有value属性 没有onChange事件 input变成只读 */}
      {/* <input type="text" value={val} /><button>添加todo</button> */}
      {/* defaultValue: 不需要同步value值*/}
      <input type="text" defaultValue={val} /><button>添加todo</button>
    </div>
  }
}

class Todos extends Component {
  state = {
    checked: false
  }
  render() {
    const {checked} = this.state
    return <ul>
      <li>
        {/* checked: 非受控组件 组件为只读 */}
        {/* <input type="checkbox" checked={checked}/> */}
        {/* 添加defaultChecked 不需要同步checked值*/}
        <input type="checkbox" defaultChecked={checked}/>
        zzz
        <button>删除</button>
      </li>
    </ul>
  }
}
```

### 案例： todoList

```js
import { Component, PureComponent } from "react";
import ReactDOM from  'react-dom'
import context, {Provider} from './context'

class AddTodo extends Component{
  static contextType = context
  state = {
    title: '',
    user: ''
  }
  render() {
    const {addTodo} = this.context
    const {title, user} = this.state
    console.log('add', this.context);
    return <div>
      <input type="text" value={title}  onChange={({target})=>{
        this.setState({
          title: target.value
        })
      }} />
      <input type="text" value={user}  onChange={({target})=>{
        this.setState({
          user: target.value
        })
      }} />
      <button onClick={()=>{
        addTodo(this.state)
        this.setState({
          title: '',
          user: ''
        })
      }}>添加todo</button>
    </div>
  }
}

class Todo extends Component {
  static contextType = context
  render() {
    const {removeTodo} = this.context
    const {todo} = this.props
    return <li>
      {todo.title} -- {todo.user}
      <button onClick={()=>{
        removeTodo(todo)
      }}>删除</button>
    </li>
  }
}

class Todos extends Component {
  static contextType = context
  render() {
    const {todos} = this.context
    console.log(this.context);
    console.log(todos);
    return <ul>
      {todos.map((todo,index) => {
        return <Todo key={index} todo={todo}/>
      })}
    </ul>
  }
}

class App extends Component {
  state = {
    todos: [],
  }
  addTodo = (todo) => {
    let {todos} = this.state
    this.setState({
      todos: [
        ...todos,
        todo
      ]
    })
  }
  removeTodo = (todo) => {
    const {todos} = this.state
    this.setState({
      todos: todos.filter(item => item !== todo)
    })
  }
  render() {
    const {todos} = this.state
    return <Provider value={{
      todos: todos,
      addTodo: this.addTodo,
      removeTodo: this.removeTodo
    }}>
      <AddTodo/>
      <Todos />
    </Provider>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```

## 6、组件的生命周期

**生命周期**指某个事物从开始到结束的各个阶段，在 `React.js` 中指的是组件从创建到销毁的过程，React.js 在这个过程中的不同阶段调用的函数，通过这些函数，我们可以更加精确的对组件进行控制。

- 挂载阶段/渲染阶段
- 更新阶段
- 卸载阶段

<enlarge :isZoom='true'><img src="./imgs/2-9.png"></enlarge>

**render** 函数其实就是组件生命周期**渲染阶段**执行的函数

- 生命周期演变

16.3 之前，16.3, 16.4 及之后

### 挂载阶段 - mount

组件创建-->把组件创建的虚拟DOM，生成真实DOM，添加到我们的DOM树中

- **constructor(props)** 
  - 组件初始化
  ```js
  constructor(props) {
    super(props)
    console.log('Count初始化');
  }
  ```

- **static getDerivedStateFromProps(props)**
  - 将 props 中内容关联到 state 中  
  - 注意 this 问题: 未定义
  ```js
  static getDerivedStateFromProps(props, state) {
    console.log(this); // undefied
    console.log(props, state);
    // 返回值就是要关联进 state 中的数据
    return props
  }
  ```
- **render** 
  - 用jsx构建当前组件的虚拟DOM
- **componentDidMount** 
  - 组件挂载完成
  - 处理副作用：比如异步请求, DOM获取  
```js
class Count extends Component {
  state = {
    count: 1
  }
  constructor(props) {
    super(props)
    console.log('Count初始化');
  }
  static getDerivedStateFromProps(props, state) {
    console.log(this); // undefied
    console.log(props, state);
    // 返回值就是要关联进 state 中的数据
    return props
  }
  render() {
    const { count } = this.state
    console.log('Coun--render', this.state);
    return <div>
      <div>{count}</div>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }}>递增</button>
    </div>
  }
  componentDidMount() {
    console.log('组件挂载完成，可以请求异步接口获取数据');
  }
}
```

```js
class App extends Component{
  state = {
    show: true
  }
  render() {
    const { show } = this.state
    return <div>
      {
        // 触发组件的挂载
        show?<Count show={show}/>:''
      }
      <button onClick={()=>{
        this.setState({
          show: !show
        })
      }}>显示/隐藏</button>
    </div>
  }
}
```

### 更新阶段 - update

从组件开始更新到修改完成真实的DOM节点：
- **static getDerivedStateFromProps(props, state)**
  ```js
  static getDerivedStateFromProps(props, state) {
    console.log(this); // undefied
    console.log(props, state);
    // 返回值就是要关联进 state 中的数据
    return props
  }
  ```
- **shouldComponentUpdate(nextProps,nextState)**
  - 判断是否更新
  - return true 组件更新 || false 不再继续执行更新流程
  ```js
  shouldComponentUpdate() {
    // 判断是否更新 true 组件更新 false 不再继续执行更新 
    console.log('shouldComponentUpdate-是否需要更新');
    return true
  }
  ```
- **render()**
- **getSnapshotBeforeUpdate(prevProps,prevState)**
  - 获取更新前的**DOM**快照
  - 该函数执行时**react**已经完成了新老**DOM**对比，即将更新真实
  - 我们可以获取更新前的DOM，用于和更新后的DOM进行对比。
  - 该方法必须配合 **componentDidUpdate** 一块使用，该方法的返回值，会变成 componentDidUpdate 的 pervDOM 参数
  ```js
  getSnapshotBeforeUpdate(prevProps,prevState){
    // 获取更新前的DOM快照, 
    // 必须有一个返回值，返回值会变成 componentDidUpdate 的 pervDOM 参数
    // 必须和 componentDidUpdate 一块使用
    console.log('getSnapshotBeforeUpdate-获取更新前的DOM快照');
    return document.querySelector("#count").innerHTML;
  }
  ```
- **componentDidUpdate(prevProps,prevState,pervDOM)**
 - 组件更新完成 处理副作用(请求)
 ```js
  componentDidUpdate(prevProps,prevState,pervDOM) {
    // 组件更新完成 处理副作用 异步请求 dom操作
    console.log('componentDidUpdate-组件更新完成 ');
    console.log(prevProps,prevState,pervDOM);
  }
 ```

### 组件在什么情况下会更新：
- 1. 调用**setState** 引起当前组件进行更新
- 2. 父组件更新，会引起子组件进行更新
- 3. 调用 **forceUpdate** 方法强制组件进行更新

```js
import { Component } from "react";
import ReactDOM from 'react-dom'

class Count extends Component {
  state = {
    count: 1
  }
  static getDerivedStateFromProps(props, state) {
    // 返回值就是要关联进 state 中的数据
    console.log('getDerivedStateFromProps',props);
    return props
  }
  shouldComponentUpdate() {
    // 判断是否更新 true 组件更新 false 不再继续执行更新 
    console.log('shouldComponentUpdate-是否需要更新');
    return true
  }
  render() {
    // 渲染虚拟DOM到真实DOM上
    const { count } = this.state
    console.log('Coun--render', this.state);
    return <div>
      <div id="count">{count}</div>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }}>递增</button>
    </div>
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    // 获取更新前的DOM快照, 
    // 必须有一个返回值，返回值会变成 componentDidUpdate 的 pervDOM 参数
    // 必须和 componentDidUpdate 一块使用
    console.log('getSnapshotBeforeUpdate-获取更新前的DOM快照');
    return document.querySelector("#count").innerHTML;
  }
  componentDidUpdate(prevProps,prevState,pervDOM) {
    // 组件更新完成 处理副作用 异步请求 dom操作
    console.log('componentDidUpdate-组件更新完成 ');
    console.log(prevProps,prevState,pervDOM);
  }
}

class App extends Component{
  state = {
    show: true
  }
  render() {
    const { show } = this.state
    return <div>
      {
        // 触发组件的挂载
        show?<Count show={show}/>:''
      }
      <button onClick={()=>{
        this.setState({
          show: !show
        })
      }}>显示/隐藏</button>
    </div>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)
```

### 卸载阶段 - unmount

从组件准备卸载，到将组件从真实DOM中删除

- **componentWillUnmount** 
  - 组件即将卸载

```js
class Count extends Component{
  state = {
    count: 1
  }
  render() {
    const { count } = this.state
    console.log('Coun--render', this.state);
    return <div>
      <div>{count}</div>
      <p id="size">{window.innerWidth}</p>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }}>递增</button>
    </div>
  }
  componentDidMount() {
    window.onresize = () => {
      let size = document.querySelector('#size')
      size.innerHTML = window.innerWidth
    }
  }
  componentWillUnmount() {
    window.onresize = null;
    console.log('componentWillUnmount- 即将卸载组件');
  }
}
```
