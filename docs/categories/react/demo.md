### [next](https://theme-next.iissnan.com/getting-started.html)

### [棋盘游戏学react](http://react.html.cn/tutorial/tutorial.html#before-we-start-the-tutorial)

### react的组件生命周期

* 钩子
```js
import React from 'react'
import ReactDOM from 'react-dom'

class Clock extends React.compoennt {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick,
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  tick() {
    this.setState({
      date: new Date()
    })
  }
  render() {
    return (
      <div>      
        <h1> Hello, world!</h1>
        <h2> It is {this.state.date.toLocalTimeString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('app')
)

```

* `Clock`组件的调用顺序
```
`constructor`：初始化初始化局部state状态
`componentDidMount`钩子：DOM元素挂载完成后执行
`componentWillUnmount`钩子：DOM元素卸载后执行
`render`: 渲染DOM元素，在`componentDidMount`执行之后

1、当`<Clock />`传递给`ReactDOM.render()`s时，React调用Clock组件的构造函数。
2、React然后调用Clock组件的render()方法，更新DOM满足clock组件的渲染输出。
3、当Clock插入到DOM中，React调用componentDi dMount生命周期钩子。
4、一旦Clock组件从DOM中移出，React将会调用componentWillUnmount生命周期钩子。
```

* 组件复用性设计

>[React.createClass 与React.Component的区别](https://www.cnblogs.com/jhonyoung/p/8890872.html)
```
创建组件方法：React.createClass、React.Componentm, React.Component能更好地调用ES6
1、语法区别
2、propTypes与getDefaultProps
3、state的区别: this.state与getInitState
4、“this”的区别
5、mixins: React.Component不支持mixins
```

* React生命周期
>生命周期分为三个阶段：mounting、updating、unmounting
```
阶段1 mounting
组件被实例化创建并插入到DOM中，此阶段被调用的方法包括：
constructor()
static getDerivedStateFromProps()
componentWillMount()
render()
componentDidMount

阶段2 updating
当组件被插入到DOM中，渲染完成后，props和state发生变化，也就是组件的状态发生变化，此时组件会重新渲染？此阶段调用的方法包括：
componentWillReceiveProps()
static getDerivedStateFromProps()
shouldComponentUpdate()
componentWillUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

阶段3 unmounting
组件被移出DOM, 这个阶段调用的方法包括：
componentWillUnmount()

ErrorHandle 错误处理
在构造函数、生命周期函数或渲染的时候出现错误时，将调用以下方法：
componentDidCatch()
```

* [生命周期函数详解](https://www.jianshu.com/p/31d8bff83cd8)

```
constructor()
作用：初始化state和props, 继承父组件React.component()的props属性，以及在实例化组件上绑定事件

static getDerivedFromProps()
作用：当组件实例化时，该方法将代替componentWillMount；当接收到新的props时，该方法将代替componentWillReceivedProps()和componentWillUpdate()。
注意：
该组件是static方法，this方法并非指代该组件，而是null。
如果是父组件发生改变导致该组件重新渲染，这个方法也会被调用；如果只想处理更新的话，最好加上处理条件if(nextProp !== preProp); 虽然this.setState()会导致组件重新渲染，但是不会导致该方法重新调用。

componentWillMount()/UNSAFE_componentWillMount()(v17版本，前者将不复存在)
作用：改方法在组件实例化过程中调用，在mounting()、render()之前调用，此方法中使用setState()，不会导致额外的渲染。

render()
作用：组件中必须的方法，创建虚拟DOM，有返回值。
注意：
建议render()方法不改变组件的状态，也不直接与浏览器交互，与浏览器的交互建议在componentDidMount()或者其他生命周期中完成。
shouldComponentUpdate()的返回值为fale时，render()方法将不会被调用

componentDidMount()
作用：在组件初始化完成后调用，如果是远端请求数据的话，建议调用此方法初始化网络请求。
注意：
此方法调用在render()之后，所以调用setState()会导致额外的渲染。
```

* React样式模块化

>配置webpack的样式处理loader
```
css-loader: 处理css文件中的url等
style-loader: 将css插入到页面的style标签
less-loader: 将less编译成css
sass-loader：将sass编译成css

注意：
style-loader和css-loader的使用序号是有顺序的，style-loader必须写在css-loader前，否则会报错。
添加完loader后，还需要在plugins实例化options

思考：
如何使用css以及postcss？
如何在webpack配置相应的loader文件？
根目录postcss.config.js如何配置？
需要使用到哪些相应的插件？（css-loader、style-loader、postcss-loader、autoprefixer、postcss-nested）
```
>[如何使用postcss](https://github.com/postcss/postcss#usage)?


* 导致react组件重新渲染的条件
```
1、组件的state状态发生改变
2、父组件的props属性发生变化

思考：
1、setState在任何情况下都会导致组件渲染吗？
2、如果state和父组件的props都没有发生变化，组件一定不会重新渲染吗？
3、如果1、2情况下会导致渲染，如何避免这种冗余的操作，从而优化性能？
```
>[shouldComponentUpdate](https://www.cnblogs.com/penghuwan/p/6707254.html), 组件重新渲染时render()函数调用前的函数，它接受两个参数，nextProps和nextState，分别表示下一个props和下一个state的值。并且，当函数返回值为false时，阻止组件重新渲染。

* [react框架的一些使用思考](https://www.cnblogs.com/penghuwan/p/6718850.html)

