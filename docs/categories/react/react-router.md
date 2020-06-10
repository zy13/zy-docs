<!-- * react-routerv5.0特性

1、在`<Route path=""/>`中使用了数组，简化了操作：
```js
import {Route, Switch} from 'react-router'
import component from './components/User'

<Route path={['/users/:id', '/profile/:id']} component={User}/>
// 等价于
<Switch>
  <Route path='/users/:id' component={User}/>
  <Route path='/profile/:id' component={User}/>
</Switch>
```

2、升级了context API，消除所有的<StrictMode>的警告
`strictRouter`

* react-router v4.x用法
>说明： react-routerv4.x及以上版本，需要同时安装`react-router-dom`，而在实际开发中，一般只需要引用`react-router-dom`，因为其封装了dom操作事件外，还封装了`react-router`的插件
用法如下：
```js
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './views/index.js'
import About from './views/about.js'
import My from './views/my.js'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('app')
)
``` -->