## ♥-同构字符串

描述：[答案](https://leetcode-cn.com/problems/isomorphic-strings/solution/tong-gou-zi-fu-chuan-by-leetcode-solutio-s6fd/)
```
给定两个字符串 `s` 和 `t`，判断它们是否是同构的。

如果 `s` 中的字符可以按某种映射关系替换得到 `t` ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，
相同字符只能映射到同一个字符上，字符可以映射到自己本身。
```

题解：[练习](https://leetcode-cn.com/problems/isomorphic-strings/)
```
判断 ss 和 tt 每个位置上的字符是否都一一对应，
即 ss 的任意一个字符被 tt 中唯一的字符对应，
同时 tt 的任意一个字符被 ss 中唯一的字符对应。
这也被称为「双射」的关系。
```

```js
isIsomorphic("egg", 'add'); // true
isIsomorphic("paper", 'title'); // true
isIsomorphic("kick", 'side'); // false

function isIsomorphic(s, t) {
  let s2t = {}, t2s = {}
  for(let i=0;i<s.length;i++){
    let x=s[i], y=t[i]
    if(s2t[x] && s2t[x] !== y || t2s[y] && t2s[y] !== x) {
      // ss 的任意一个字符被 tt 中唯一的字符对应
      // 同时 tt 的任意一个字符被 ss 中唯一的字符对应
      return false
    }
    s2t[x] = y
    t2s[y] = x
  }
  return true
}
```

[力扣-同构字符串](https://leetcode-cn.com/problems/isomorphic-strings/)

## ♥-js数组去重

### (1) 使用ES6 Set对象去重
```js
// Set数据集
let arr = [1,2,3,4,3,2,3,4,6,7,6]; 
[...new Set(arr)]; //[1, 2, 3, 4, 6, 7] 
```

### (2) 利用新数组indexOf查找 
`indexOf()`方法可返回某个指定的元素在数组中首次出现的位置。如果没有就返回`-1`。
### (3) for循环结合Object.values()
新建一个对象`obj`，通过`for`循环给`obj`添加属性，属性`key`和`value`均为数组的元素，在通过`Object.values()`获取得到无重复的新数组。
```js
let arr = [1,2,3,3,4,2,4,5,6,8,4,3,5]
let obj = {}, newArr = []
for(let i=0;i<arr.length;i++){
  obj[arr[i]] = arr[i]
}
newArr = Object.values(obj)
```

## ♥-JS实现九九乘法表
```html
<style>
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
    margin-bottom: 10px;
  }
  span{
    display: inline-block;
    width: 80px;
    line-height: 28px;
    background-color: forestgreen;
    color:greenyellow;
    margin-right: 10px;
    text-align: center;
  }
</style>
<body>
  <ul></ul>
  <script>
    // 九九乘法表
    for(let i=1;i<=9;i++) {
      let li = document.createElement('li')
      for(let j=1;j<=i;j++) {
        let span = document.createElement('span')
        span.innerHTML = `${j} x ${i} = ${j*i}`
        li.appendChild(span)
      }
      document.querySelector('ul').appendChild(li)
    }
  </script>
</body>
```
