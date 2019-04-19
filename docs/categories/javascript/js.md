### [JavaScript教程](https://wangdoc.com/javascript/)
### [JavaScript标准教程](http://javascript.ruanyifeng.com/)
### [中高端大厂面试秘籍](https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-66)

* js题集
>**降序排列整合**：<br>
>描述：输入一个非负整数n，输出它的降序排列之后的整数。例如输入123456，输出654321<br>
>解题思路：将数字转化为字符串，分割，排序，逆序之后重新连接为字符串，再转为数字。
```js
// 1、数字转化为字符串：String(number)
// 2、分割，字符串转化为数组： split('')
// 3、排序：sort()
// 4、逆序：reverse()
// 5、数组转化为字符串：join('')
// 6、字符串转化为数字：parseInt()
function decendReverse(num) {
  if(!isNaN(num) && num>=0) {
    return parseInt(String(num).split("").sort().reverse().join(""))
  }
}
```

>**三角形数**：<br>
>三角形数：1+2+3+...+n, 其中的每一项的数字都表示当前行的数量，从上到下由1到n正好形成一个三角形<br>
>描述：输入一个数字n，返回n的三角形数<br>
>解题思路：使用求和公式
```js
// 求和公式为: ((1+n)/2)*n
function triangularNumber(n){
  if (!isNaN(n) && n>0) return ((1+n)/2) * n
}
```
>**求数根**
>数根：一个数拆开之后重新求和，如何所得和为个位数，则停止，否则继续拆数子求和。
>描述：给定一个数n，求数n的根数
>解题思路：使用求数根公式，而非循环迭代计算
```js
function digitRoot(n){
  return (n-1)%9 + 1
}
```
>[如何证明一个数的数根就是它对9的余数加1](https://www.zhihu.com/question/30972581)<br>
>[一个n位的10进制数可以写成公式形式](https://www.zhihu.com/equation?tex=x+%3D+%5Csum_%7Bi%3D0%7D%5E%7Bn-1%7D%7Ba_i%7D%7B10%5Ei%7D)


**如何实现一个LazyMan**
>