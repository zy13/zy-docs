### [组件](https://developers.weixin.qq.com/miniprogram/dev/component/index.html)

#### 视图容器

### [弹框组件](https://blog.csdn.net/hedong_77/article/details/54948537)

```html
<view class="container" class="zn-uploadimg">
  <button type="primary" bindtap="showok">消息提示框</button> 
  <button type="primary" bindtap="modalcnt">模态弹窗</button> 
  <button type="primary" bindtap="actioncnt">操作菜单</button> 
</view>

<view class="container" class="zn-uploadimg">
  <button type="primary" bindtap="modalinput">modal有输入框</button> 
</view>
<modal hidden="{{hiddenmodalput}}" title="请输入验证码" confirm-text="提交" cancel-text="重置" bindcancel="cancel" bindconfirm="confirm">
    <input type='text'placeholder="请输入内容" auto-focus/>
</modal>
```

### [button组件](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)

* 小程序自带的组件，包括button的属性、类型、样式、事件等

