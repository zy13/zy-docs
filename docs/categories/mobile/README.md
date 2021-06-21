## 移动端开发常用技巧

### [弹性布局](https://www.cnblogs.com/Renyi-Fan/p/8116310.html)
### [移动端web资源整合](http://www.cnblogs.com/PeunZhang/p/3407453.html)
### 响应式字体

### demo网站

* [淘宝自适应字体](https://www.jianshu.com/p/abcd21197d20)
* [每日优鲜](https://as-vip.missfresh.cn/ug/landing-page.html?fromSource=bdsempz)

## 常见问题

### 1、样式问题

* 1、字体样式-移动端如何定义字体font-family？
```
中文字体使用系统默认即可，英文用Helvetica
body{
  font-family: Hevetica;
}

注意：以下手机不支持微软雅黑
1、ios、android
2、Android系统默认字体是没有微软雅黑的，除非你自己替换
```

>[移动端使用字体思考](http://www.cnblogs.com/PeunZhang/p/3592096.html)

* 2、移动端字体单位如何选择？
```
1、只需要适配少部分手机设备，且分辨率对页面影响不大情况，建议使用px即可
2、需要适配各种设备，则使用rem
```

* 3、去掉某些默认样式
```css
<!-- webkit表单元素的默认外观怎么重置 -->
*{
  -webkit-appearance:none;
}

<!-- ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉 -->
<!-- 部分android系统中元素被点击时产生的边框怎么去掉 -->
a,button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0;)
-webkit-user-modify:read-write-plaintext-only; 
}

<!-- 设置输入框placeholder字体样式 -->
::-moz-placeholder { color: #A9A9A9; font-family: "PingFangTC-Light";}
::-webkit-input-placeholder { color:#A9A9A9; font-family: "PingFangTC-Light";}
::-ms-input-placeholder { color:#A9A9A9; font-family: "PingFangTC-Light";}
```

### 2、横屏问题

* 1、orientationchange的使用

```
1、orientationchange是window对象的属性，用来监听横竖屏变化
2、事件兼容性：ios可以支持，Android部分支持，chrome部分兼容
```

* 2、多媒体查询方式

```css
<!-- 判断横竖屏的媒体查询为 -->
@media all and (orientation : landscape) {
　h2{color:red;}/*横屏时字体红色*/
}
@media all and (orientation : portrait){
　h2{color:green;}/*竖屏时字体绿色*/
}
```

## 禁止某些操作

* 禁止微信浏览器调整页面字体大小
```
-webkit-text-size-adjust: 100% !important;
```

* 禁止用户选中页面文字
```
body{
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
<body onselectstart="return false;"></body>
```

* 在iphone关闭长按图片保存图片弹窗
```
img{
　-webkit-touch-callout: none;
}
```


## 字体大小自适应布局

>在不了解的情况，前端开发人员一直很疑惑，web移动的字体单位到底是用px好还是用rem好？</br>
>这个要视具体情况而定：</br>
>1、只需要适配少部分手机设备，且分辨率对页面影响不大情况，建议使用px即可, 字体大小不会随设备进行适配</br>
>2、需要适配各种设备，则使用rem，字体会随设备大小变化

* 移动设备的`viewport`
>进行移动端开发都需要添加`<meta name='viewport' content='width="deviceWidth", initial-scale=1.0>`,</br>
>其中与viewport相关的单位有四个，分别为vw、vh、vmin和vmax，其中：</br>
>**vw**：是Viewport's width的简写，`1vw = window.innerWidth * 1%`，那么100vw等于屏幕宽度</br>
>**vh**：和vw类似，是Viewport's height的简写，，`1vw = window.innerHeight * 1%`</br>
>**vmin**：vmin的值是当前vw和vh中较小的值</br>
>**vmax**：vmax的值是当前vw和vh中较大的值</br>
>我们经常用到的是**vw**单位，下面会讲到

* 关于`rem`
> rem的大小取决于根元素html的设置，1rem等于html中font-size的大小。</br>
>如果html没有设置font-size值,那么1rem就等于浏览器默认的字体大小，一般是16px，例如：
```css
html{
  font-size: 100px
}
p {
  font-size: 1rem; /*1rem=100px*/
}
```

* [关于calc()函数](https://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)
>calc()是css3的新属性，用于计算元素长度或者大小的函数，可以实现页面自适应布局以及字体自适应调整

* 根元素字体大小计算
>如今移动端设计稿一般使用两种分辨率：640px与750px（移动设备竖屏时的横屏分辨率）。
>字体大小的设置与设置稿有关。例如设计稿基于手机设备竖屏时的横向分辨率为640px,那么为了计算方便，100px的font-size作为参照，根元素html的font-size:deviceWidth/6.4

>上面有讲到，1vw是设备分辨率的1%，那么100vw就等于屏幕宽度，那么100vw/6.4可以让1rem的大小在640宽度的屏幕下等于100px，即1rem = 100px：
```css
html{
  font-size: calc(100vw/6.4); /*calc()获取计算结果*/
}
p{
  font-size: .3rem; /*640px下的30px*/
}
```
>同理，让1rem的大小在750宽度的屏幕下等于100px，即1rem = 100px;
```css
html{
  font-size: calc(100vw/7.5);
}
p{
  font-size: .3rem; /*750px下的30px*/
}
```
>注意：chrome下针对中文的最小字体是12px

* 开发技巧

我们在开发制定屏幕宽度的移动端时，例如750px的宽度，可以这样干：
>使用Chrome浏览器移动版开发工具，设置Responsive属性的屏幕宽度为750

![avatar](./imgs/demo-1.jpg)

>其中`真的很溜`字体设置为`font-size: .3rem`，实际等于750宽度下的30px.点击`computed`可以查看css计算后的属性：

![avatar](./imgs/demo-2.png)

>当缩小屏幕时，字体也会随着变小：

![avatar](./imgs/demo-3.png)

* 兼容性

calc()和vm会存在兼容性问题，可以通过动态设置根元素html的字体大小解决：
```js
<script type="text/javascript">
    //JS监听浏览器文字大小代码
    "use strict";
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = (clientWidth / 3.75) + 'px';
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
</script>
```