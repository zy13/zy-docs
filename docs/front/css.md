<style>
  blockquote{
    font-size: 14px;
    color: #777;
  }
</style>

## 清除浮动的方法

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
/* 以下属性导致父元素.parent发生塌陷 */
.child{
  float: right;
}
```

### 解决方法
```html
<!-- 1️⃣添加新元素: 元素添加清除浮动属性 -->
<div class="parent">
  <div class="child"></div>
  <div style="clear: both"></div>
</div>
```

```css
/* 2️⃣使用伪元素 */
.parent::after{
  content: "";
  display: block;
  height: 0;
  clear: both;
}
```

```css
/* 3️⃣触发父元素的BFC */

.perent{
  overflow: hidden;
}

.perent{
  float: left;
  width: 100%;
}

.perent{
  display: inline-block;
  width: 100%;
}

.perent{
  position: absolute;
  width: 100%;
}
```

### BFC 块级格式上下文

BFC全称 Block Formatting Context 即`块级格式上下文`，简单的说，BFC是页面上的一个隔离的独立容器，不受外界干扰或干扰外界

* 如何触发元素的BFC
```bash
1️⃣ `float`不为 none
2️⃣ `overflow`的值不为 visible
3️⃣ `position` 为 absolute 或 fixed
4️⃣ `display`的值为 inline-block 或 table-cell 或 table-caption 或 grid
```

* BFC的渲染规则是什么？
```bash
1️⃣ BFC是页面上的一个隔离的独立容器，不受外界干扰或干扰外界
2️⃣ 计算BFC的高度时，浮动子元素也参与计算（即内部有浮动元素时也不会发生高度塌陷）
3️⃣ BFC的区域不会与float的元素区域重叠
4️⃣ BFC内部的元素会在垂直方向上放置
5️⃣ BFC内部两个相邻元素的margin会发生重叠
```

## 水平居中

* 行内元素
>给其父元素设置 `text-align: center;`,即可实现行内元素水平居中

* 块级元素
>给该元素设置宽度，属性设置为`margin: 0 auto;`，若不设置宽度，块级元素默认为100%，不需要居中。

* 使用flex
>子元素属性设置
```css
.child{
  display: flex; 
  justify-content: center;
}
```

* 使用CSS3新增的transform属性
>子元素属性
```css
.child{
  display: flex; 
  justify-content: center;
}
```

* 使用绝对定位
>子元素属性设置
```css
.child{
  position:absolute;
  width: 固定;
  left: 50%;
  margin-left:-0.5宽度;
}
/* 或者 */
.child{
  position:absolute;
  width:固定;
  left:0;
  right:0;
  margin:0 auto;
}
```

## 垂直居中

[垂直居中](https://juejin.im/post/6844903474879004680)

* 单行文本
>若元素是单行文本, 则可设置 line-height 等于父元素高度

* 行内块级元素
>若元素是行内块级元素, 基本思想是使用display: inline-block, vertical-align: middle和一个伪元素让内容块处于容器中央.
```css
.parent::after, .son{
    display:inline-block;
    vertical-align:middle;
}
.parent::after{
    content:'';
    height:100%;
}
```

## 垂直水平居中
[垂直水平居中](https://juejin.im/post/6864398060702760968#heading-25)

* 绝对定位
  - 宽高确定
  >负margin
  - 宽高不确定
  >transform
```css
.child{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
```

* flex
```css
.parent{
  display: flex;
  justify-content: center;
}
```

### 加载器

* css-loader

* style-loader

* sass-loader

* postcss-loader


## 插件plugins

* html-webpack-plugin

* clean-webpack-plugin

* webpack.HotModuleWebpackPlugin