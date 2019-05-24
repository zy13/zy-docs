* [background常见的属性设置](https://juejin.im/entry/589ff0c75c497d0056358912)

1、background是个符合属性，其中可设置如下属性：
```
background-image:设置背景图片
background-position: 设置背景图像的位置, 相对定位的原点。此属性可以设置数值or百分比，也可以设置（left/right/center/bottom）, 当只有一个值的情况，background-position-x为所设置的值，background-position-y默认为50%
background-size: 设置背景图像的大小，此属性可以设置数值、百分比、cover或者
background-repeat: 指定背景图像的铺排方式
background-attachment: 指定背景图像是滚动还是固定
background-origin: 设置背景图像显示的原点
background-clip: 设置背景图像向外裁剪的区域
background-color: 指定背景颜色
```
>顺序并非固定，但是要注意的点：`background-position`与`background-size`同时设置时，前者必须要在后者前面，而且用/隔开
>`background-clip`和`background-origin`同时设置属性时，`background-origin`在`background-clip`前，如果两个属性值相同，可以设置为同一个属性值。

>按顺序给background赋值：
```css
/* background: image position(x y;只有一个值时，y坐标默认为center，即50%) */
background: url('') 0 0/图片尺寸 no-repeat;
```

* [box-shadow属性设置](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)

>常用的box-shadow属性值的设置
```css
/* x偏移量|y偏移量|阴影颜色 */
box-shadow: 10px 20px #eee;
/* x偏移量|y偏移量|阴影模糊半径|阴影颜色 */
box-shadow: 10px 20px 5px #000;
/* x偏移量|y偏移量|阴影模糊半径|阴影扩散半径|阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.2);
```

