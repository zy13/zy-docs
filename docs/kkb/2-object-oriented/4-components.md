### 主题
- ​1）什么是组件
- 2）合并配置
- 3）事件委托
- ​4）通过继承扩展组件功能
- 5）`webComponent`自定义组件
## 1、组件是什么？
组件: 组件是具有一定功能的属性和方法的封装，比如样式的封装，DOM操作的封装，然后通过export导出模块，通过import模块引用，完成代码复用。

ElementUI库：[https://element.eleme.io/#/zh-CN/component/installation](https://element.eleme.io/#/zh-CN/component/installation)
## 2、弹窗功能

- 属性：宽、高、标题、内容；
- 方法：打开 、关闭、渲染、拖拽

- 配置

  ```js
  {
  	width: "30%",
  	height: "250px",
  	title: "测试标题",
  	content: "测试内容",
  	dragable: true, //是否可拖拽
  	maskable: true, //是否有遮罩
  	isCancel:false //是否有取消
  }
  ```

## 3、合并配置

- 解构赋值添加默认参数

- 通过Object.assagin来合并
  ```js
  this.opts = Object.assign({
    width: "30%",
    height: "250px",
    title: "测试标题",
    content: "测试内容",
    dragable: true, //是否可拖拽
    maskable: true, //是否有遮罩
    isCancel:false, //是否有取消
    cancel(){},
    sucess(){}
  },options)
  ```
## 4、渲染视图
- 创建dom解构；es6表达式做判断；
```js
${
  this.opts.isCancel?'<span class="k-default">取消</span>':''
}
```

- 初始化

- 打开方法

- 关闭方法

- 拖拽方法

## 5、事件委托

- 节点不存在绑定事件，委托给父级添加事件<br>
事件冒泡原理
```html
<div class="k-dialog">
  <div class="k-header">
      <span class="k-title">提示</span><span class="k-close">X</span>
  </div>
  <div class="k-body">
      <span>这是一段文本</span>
      <input class="input-inner" type="text" />
  </div>
  <div class="k-footer">
      <span class="k-cancel">取消</span>
      <span class="k-primary">确定</span>
  </div>
</div>
```
```js
addEvent() {
  let dailog = this._sd.querySelector(".k-dialog");
  // 事件委托
  dailog.onclick = e => {
    // console.log(e.target.className);
    switch (e.target.className) {
      case 'k-close':
        this.close();
        this.dispatchEvent(new CustomEvent("close"))
        break;
      case 'k-primary':
        this.close();
        let inputValue = this._sd.querySelector(".input-inner").value;
        this.dispatchEvent(new CustomEvent("submit", {
          detail: inputValue
        }))
        break;
      case 'k-cancel':
        this.close();
        this.dispatchEvent(new CustomEvent("close"))
        break;
      default:
        break;
    }
  }
}
```

## 6、继承扩展功能

- 遮罩层、取消按钮；

- 重写和功能相关的方法；

## 7、通过webComponent自定义组件

- 自定义独立元素**Autonomous custom elements** 

   ```js
    class MyComponents extends HTMLElement{
        constructor(){
            super();
        }
    }
    customElements.define('my-components', MyComponents);
    ```

- 继承HTML元素**Customized built-in elements**

  ```js
  class  UlComponents  extends HTMLUListElement{
       constructor(){
           super();
       }
   }
  
  customElements.define("ul-components",UlComponents,{
       extends: "ul"
   })
  ```
