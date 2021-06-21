### Action

* 定义

>把数据从应用传到store的有效载荷。它是store数据的唯一来源，一般通过`store.dispatch()`将action传到store

* 添加一个新任务的action格式：

```js
// action类型
export const ADD_TODO = 'ADD_TODO'
// action创建函数类型
export function addTodo(text) => {
  return {
    type: ADD_TODO,
    text
  }
}
```
>注意：action对象必须要用一个`type`字段来表示要执行的动作；应用规模大的情况下，建议使用单独的模块或文件存放action: `import {ADD_TODO, REMOVE_TODO} from './actionTypes'`

* action创建函数

>action创建函数就是生成action的方法,
```js
export function addTodo(text) => {
  return {
    type: ADD_TODO,
    text
  }
}
```

>redux中action创建函数的结果传给`dispatch()`，即可发起一次dispatch过程
```js
dispatch(addTodo(text))
```

* dispatch()方法的调用
```
1、通过store.dispath()调用
2、使用react-redux提供的connect()帮助器调用
```
>延申：[异步action](http://cn.redux.js.org/docs/advanced/AsyncActions.html): 如何处理ajax响应，如何把action创建函数组合进异步控制流中

### Reducer

* 定义

>reducers指定了应用状态的变化如何相应actions并发送到store。reducer就是一个纯函数，接收旧的state和action，返回新的state

```js
import {combineReducers} from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

const {SHOW_ALL} = VisibilityFilters

function visibilityFilters(state=SHOW_ALL, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state=[], action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state 
  }
}

const reducers = combineReducers({
  visibilityFilters,
  todos
})

export default reducers
```
>注意：不要修改state, 使用Object.assign()新建了一个副本。Object.assign({}, state, newState)与{...state, ...newState}达到相同的目的；遇到未知的action时，一定要返回旧的state。Object.assign是ES6中的特性，很多浏览器并不支持，要使用polyfill、babel插件解析。

### Store
* 职责
>把action、state、reducers联系到一起的对象:
```
1、维持应用的state
2、提供getState()方法获取state
3、提供dispatch(action)方法更新state
4、通过subscribe(listener)注册监听器
5、通过subscribe(listener)返回的函数注销监听器
```

### 数据流
* dispatch(action)

### 组件类型

* 容器组件
>处理数据：数据获取、数据更新，数据来源：从向redux派发actions
```
将数据呈现给展示组件，是展示组件与react-redux获取数据的桥梁
```

* 展示组件
>展示框架、样式，以及展示从渲染容器组件获得的数据，数据来源：props
```
1、TodoList
2、Todo
3、Link
4、Footer
5、App
```

