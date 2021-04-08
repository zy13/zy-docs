<style>
  blockquote{
    font-size: 1rem;
    color: #666;
    background-color: rgba(255,229,100,0.3);
  }
</style>
## 1、key关键字

[key](https://zh-hans.reactjs.org/docs/lists-and-keys.html#keys) 帮助 `React` 识别哪些元素改变了，比如被添加或删除。

### key的取值原则

- **1. `key` 在列表中不能重名**
- **2. 更新前后要保持key值不变**
  - 建议 `key` 使用 数据的 `id`
  - 当元素没有确定 `id` 的时候，万不得已你可以使用元素索引 `index` 作为 `key`
  - 在 `map()` 方法中的元素需要设置 key 属性

### key的作用

- **识别元素的改变，比如添加或删除**
- **用 `key` 提取组件**
  - 元素的key只有放在就近的数组上下文才有意义
  - 如果你提取出一个 `ListItem` 组件，你应该把 `key` 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>` 元素上
- **`key` 只是在兄弟节点之间必须唯一**

### key的问题
在 `React` ，组件每次更新时，会生成一个虚拟`DOM`，和原有的虚拟`DOM`进行对比。 如果是批量生成的一组元素，那`React`就会根据 `key` 值去做对比： **一个列表中的每一项 `key` 是唯一的, 如果列表中发生顺序等操作变化，`key` 一定要用数据的`id`**


## 2、PureComponent

`React.PureComponent` 与 `React.Component` 很相似。两者的区别在于 `React.Component` 并未实现 `shouldComponentUpdate()`，而 `React.PureComponent` 中以浅层对比 `prop` 和 `state` 的方式来实现了该函数。

如果赋予 `React` 组件相同的 `props` 和 `state`，`render()` 函数会渲染相同的内容，那么在某些情况下使用 `React.PureComponent` 可提高性能。

>
>**注意**<br/>
>`React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 `props` 和 `state` 较为简单时，才使用 `React.PureComponent`，或者在深层数据结构发生变化时调用 `forceUpdate()` 来确保组件被正确地更新。你也可以考虑使用 `immutable` 对象加速嵌套数据的比较。
>
>此外，`React.PureComponent` 中的 `shouldComponentUpdate()` 将跳过所有子组件树的 `prop` 更新。因此，请确保所有子组件也都是“纯”的组件。
>

```js
/**
 *  在 React 中，默认情况下，父组件更新一定引起子组件更新
 *  PureComponent 作用和 Component 一致，在 Component 的基础了，内置了一个 写好浅对比的 SCU
 * 1. 一定注意，不要修改原有的 state ，而是根据原有 state 映射出 新 state ，尤其要注意引用类型
 * 2. 重新定义 SCU，会覆盖掉 PureComponent 内部定义好的 SCU
 * @class Todo
 * @extends {PureComponent}
 */
class Todo extends PureComponent{
  // shouldComponentUpdate(nextProps) { // SCU
  //   console.log('todo-scu', this.props.todo, nextProps.todo, this.props.todo === nextProps.todo);
  //   return this.props.todo !== nextProps.todo;
  // }
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      title2: props.todo.title
    }
  }
  render() {
    const {id, title, done} = this.props.todo
    const {isEdit, title2} = this.state
    console.log('Todo')
    return <li className={isEdit?'editing':''}>
      <div className={`todo ${done?'done':''}`}>
        <div className="display">
          <input className="check" type="checkbox" checked={done} onChange={({target})=>{
            this.props.changeDone(id, target.checked)
          }}/>
          <div className="todo-content" onDoubleClick={()=>{
            this.setState({
              isEdit: true
            })
          }}>{title}</div>
          <span className="todo-destroy" onClick={()=>{
            this.props.removeTodo(id)
          }}></span>
        </div>
        <div className="edit">
          <input className="todo-input" type="text" value={title2} onChange={({target})=>{
            this.setState({
              title2: target.value
            })
          }} onBlur={()=>{
            if(title2.trim()) {
              this.props.editTitle(id, title2)
            } else {
              this.setState({
                title2: title
              })
            }
            this.setState({
              isEdit: false
            })
          }}/>
        </div>
      </div>
    </li>
  }
}
```

## 3、ref属性

`React` 支持一个特殊的、可以附加到任何组件上的 [ref](https://zh-hans.reactjs.org/docs/glossary.html#refs) 属性。此属性由`React.createRef()`函数创建对象、回调函数、字符串。

注意：谨慎使用 `ref`。

- **React.createRef()**

[React.createRef()](https://zh-hans.reactjs.org/docs/react-api.html#reactcreateref) 创建一个能够通过 `ref` 属性附加到 `React` 元素的 `ref`。

### 对象
### 回调函数
回调函数会（根据元素的类型）接收底层 DOM 元素或 class 实例作为其参数。这能够让你直接访问 DOM 元素或组件实例。
### 一个字符串

## 4、children

## 5、dangerouslySetInnerHTML

## 6、todoList案例

github仓库地址：[]()

```js
import { Component } from "react";
import ReactDOM from 'react-dom'
import './css/index.css'

class Todo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      title2: props.todo.title
    }
  }
  render() {
    const {id, title, done} = this.props.todo
    const {isEdit, title2} = this.state
    console.log(this.props);
    return <li className={isEdit?'editing':''}>
      <div className={`todo ${done?'done':''}`}>
        <div className="display">
          <input className="check" type="checkbox" checked={done} onChange={({target})=>{
            this.props.changeDone(id, target.checked)
          }}/>
          <div className="todo-content" onDoubleClick={()=>{
            this.setState({
              isEdit: true
            })
          }}>{title}</div>
          <span className="todo-destroy" onClick={()=>{
            this.props.removeTodo(id)
          }}></span>
        </div>
        <div className="edit">
          <input className="todo-input" type="text" value={title2} onChange={({target})=>{
            this.setState({
              title2: target.value
            })
          }} onBlur={()=>{
            if(title2.trim()) {
              this.props.editTitle(id, title2)
            } else {
              this.setState({
                title2: title
              })
            }
            this.setState({
              isEdit: false
            })
          }}/>
        </div>
      </div>
    </li>
  }
}

class Todos extends Component{
  render() {
    const {todos} = this.props
    return <ul id="todo-list">
      {
        todos.map(todo => {
          return <Todo {...this.props} todo={todo}  key={todo.id}/>
        })
      }
    </ul>
  }
}
class AddTodo extends Component{
  render() {
    return <div id="create-todo">
      <input id="new-todo" placeholder="What needs to be done?" type="text" onKeyDown={(e)=>{
        const {target, keyCode} = e
        const val = target.value
        if(keyCode === 13) {
          // 回车
          if(val.trim()) {
            this.props.addTodo(val)
            target.value = ''
          } else {
            alert('请输入内容')
            this.focus()
          }          
        }
      }}/>
    </div>
  }
}

class Stats extends Component{
  render() {
    const {todos} = this.props
    const doneLen = todos.filter(item => item.done).length
    const unDoneLen = todos.length - doneLen
    console.log(doneLen, unDoneLen);
    return <div id="todo-stats">
      <span className="todo-count">
        <span className="number">{unDoneLen}</span>
        <span className="word">项待完成</span>
      </span>
      <span className="todo-clear">
        <a>Clear <span>{doneLen}</span> 已完成事项</a>
      </span>
    </div>
  }
}

class App extends Component{
  state = {
    todos: [
      {
        id: 1,
        title: '今晚上王者',
        done: false
      }
    ]
  }
  addTodo = (title) => {
    const {todos} = this.state
    this.setState({
      todos: [
        ...todos,
        {
          id: new Date(),
          done: false,
          title
        }
      ]
    })
  }
  removeTodo = (id) => {
    const {todos} = this.state
    this.setState({
      todos: todos.filter(item => item.id !== id)
    })
  }
  changeDone = (id, done) => {
    console.log(id, done);
    const {todos} = this.state
    this.setState({
      todos: todos.map(item => {
        if(item.id === id) {
          return {
            ...item,
            done
          }
        } else {
          return item
        }
      })
    })
  }
  editTile = (id, title) =>{
    const {todos} = this.state
    this.setState({
      todos: todos.map(item => {
        if(item.id === id) {
          return {
            ...item,
            title
          }
        } else {
          return item
        }
      })
    })
  }
  render() {
    const {todos} = this.state
    return <div id="todoapp">
      <div className="title">
        <h1>todo</h1>
      </div>
      <div className="content">
        <AddTodo addTodo={this.addTodo}/>
        <Todos todos={todos} removeTodo={this.removeTodo} changeDone={this.changeDone} editTitle={this.editTile}/>
        <Stats todos={todos}/>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
```


