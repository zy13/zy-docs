
[官网框架教程](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)


![avatar](./imgs/framework.png)

### app.js

* 主程序入口
* App()注册小程序

  - 接受object参数：
  ```js
  App({
    onLaunch: function(options) {
      // Do something initial when launch.
    },
    onShow: function(options) {
      // Do something when show.
    },
    onHide: function() {
      // Do something when hide.
    },
    onError: function(msg) {
      console.log(msg)
    },
    globalData: 'I am global data'
  })
  ```
  - onShow和onLaunch的参数
  
  ![avatar](./imgs/launch-show-params.png)
  
* `const app = new getApp()`小程序实例化

### app.json
  * `pages`页面路由配置
  * `windows`导航窗口样式设置
  * `tabBar`底部tab切换的设置，最少两个，最多五个
  * `networkTimeout`超时设置
  * `debug`是否启用调试
  * Page()注册页面

    - page生命周期：

    ```js
    Page({
      onload: function(){}, //获取当前页面所调用的query参数
      onShow: function(){}, 
      onReady: function(){}, //对页面设置在此周期后进行
      onHide: function(){},
      onUnload: function(){}
    })
    ```

    ![avatar](https://developers.weixin.qq.com/miniprogram/dev/image/mina-lifecycle.png?t=18080218)

    - Page实例相关的事件处理函数
    ```js
    onPullDownRefresh() //下拉刷新-需开启app.json的window或page中配置enablePullDownRefresh
    onReachBottom() //上拉触底需配置onReachBottomDistance
    onPageScroll() // 页面滚动，参数为Object，需要scrollTop(Number), 页面在垂直方向已滚动的距离
    onShareAppMessage() //用户转发，需要return Object， 用于自定义转发内容      
    ```

    - onShareAppMessge()自定义转发字段：
    ```js
    Page({
      onShareAppMessage: function () {
        return {
          title: '自定义转发标题',
          path: '/page/user?id=123'
        }
      }
    })
    ```

    - 事件处理函数
    ```js
    ```
### app.wxss

* 全局样式文件

### API

[参考链接](https://developers.weixin.qq.com/miniprogram/dev/api/index.html)

* 网络API
* 媒体API
* 文件API
* 数据API
* 位置API
* 设备API
* 界面API
* WXML节点信息API
* WXML节点布局相交状态
* 开放接口


### 页面路由

* 路由方式，微信API对象wx:

  字段名称|作用
  ------|------
  navigateTo|打开新页面
  redirectTo|重定向
  navigateBack|返回
  switchTab|tab切换
  reLaunch|重新启动

