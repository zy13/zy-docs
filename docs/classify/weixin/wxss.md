### 微信小程序样式

[官网教程](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

### css与wxss整合

css大部分+wxss部分添加与修改

#### 尺寸单位

* 以iphone6为准，1px=2rpx

#### 样式导入

* 外部样式导入方式`@import '';`，与css一样
* 内联样式通过`style`, `class`

#### 选择器

* .class
* #id
* element
* ::after
* ::before

#### 全局样式与局部样式

* 全局样式：定义在aap.wxss的样式为全局样式，作用于每一个页面
* 局部样式：定义在page中的wxss为局部样式，只作用于当前页面，并会覆盖app.wxss中相同的选择器

