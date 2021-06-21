<style>
blockquote{font-size:16px;}
</style>


### [网格布局](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

#### 什么是网格布局

>网格布局将页面分割成数个主要区域，或者用来定义组件元素间大小、位置、图层之间的关系。它和css表格一样，可以按行或者列对齐元素，而且网格子元素可以自己定位，具有重叠和层次。网格分为显示网格和隐士网格：<br/>
>显示网格：通过`grid-template-columns`(垂直轨道)、`grid-template-rows`(水平轨道)、`grid-template-areas`几个属性定义固定的网格线名称和网格轨道。<br/>
>层级：`z-index`控制层级
>控制顺序：`start、end`的序号

#### 基本概念
>网格：一个网格是由一组交叉的水平线与垂直线组成-它定义了网格的行和列。网格元素可以放在这些行和列中。<br/>
>网格轨道：一个网格轨道就是任意相交的两条线之间的空间，包括垂直(列)轨道和水平(行)轨道。<br/>
>网格容器：由元素`display:grid;`属性定义的元素。<br/>
>fr单位：分数单位轨道，用于创建灵活网格。1fr表示网格可用空间的一等分，轨道会随着可用空间而增长或者收缩。<br/>
>网格线：行网格线从上到下，列网格线从左到右。<br/>

#### 特点

* 通过给元素声明`display:grid/inline-grid;`来创建网格,元素下面的所有直系子元素将成为网格元素
* 通过`grid-template-columns`和`grid-template-rows`定义网格的轨道(行和列),单位可以用分数单位fr以及绝对单位px
* `grid-template-columns/row`值：值的个数定义了列/行的个数与宽度/高度
* fr将网格分为等分空间，`1fr 1fr`分为两等份，`2fr 1fr 1fr`分为四等份
* `repeat()`用于标记重复的网格轨道或者整个网格列表，例如`grid-template-columns:1fr 1fr 1fr;`可以写成`grid-template-columns:repeat(3,1fr);`, `grid-template-columns:200px 1fr 1fr;`可以写成`grid-template-columns:200px repeat(2,1fr);`,所以repeat只能重复相等的轨道。第一个参数为数字，为重复次数，第二/三/...个参数为轨道排列
* `minmax()`函数定义轨道的最小和最大尺寸，例如`minmax(100px,auto)`
* 跨轨道放置网格元素：`grid-column-start、grid-column-end、grid-row-start、grid-row-end`
* 

#### 属性

>显式网格属性：`grid-template-columns`、`grid-template-rows`、`grid-template-areas`<br/>
>隐式网格属性：`grid-auto-columns`、`grid-auto-rows`、`grid-auto-flow`<br/>
>间距属性：`grid-row-gap`、`grid-columns-gap`<br/>
>`grid`: 是一个CSS简写属性，可以用来设置grid开头的属性，例如显式网格属性、隐式网格属性和间距属性


#### [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)

![avatar](./imgs/grid-1.png)

>IE浏览器不支持css grid，所以grid网格布局适合手机端，不适合pc端


#### demo

* [css grid构建首页布局](https://zhuanlan.zhihu.com/p/33033110)
* [gridbyexample](https://gridbyexample.com/examples/)


#### 附录

>[显性网格与隐性网格](https://www.w3cplus.com/css3/difference-explicit-implicit-grids.html)