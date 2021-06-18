## 1、浏览器是怎样解析CSS选择器的？

1. `CSS`选择器的解析是**从右向左**解析的。
2. 若**从左向右**的匹配，发现不符合规则，需要进行回溯，会损失很多性能。
3. 若**从右向左**匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。

两种匹配规则的性能差别很大，是因为
- **从右向左**的匹配在第一步就筛选掉了**大量的不符合条件的最右节点**（叶子节点），
- 而**从左向右**的匹配规则的性能都浪费在了失败的查找上面。 

而在 `CSS` 解析完毕后，需要将解析的结果与 `DOM Tree`的内容一起进行分析建立一棵 `Render Tree`，最终用来进行绘图。

在建立`Render Tree` 时（`WebKit` 中的`「Attachment」`过程），浏览器就要为每个 `DOM Tree` 中的元素根据 `CSS` 的解析结果（`Style Rules`）来确定生成怎样的 `Render Tree`。


## 2、css sprites含义及使用
`CSS Sprites`其实就是把网页中一些背景图片整合到一张图片文件中，再利用`CSS`的
- `“backgroundimage”`，
- `“background- repeat”`，
- `“background-position”`

的组合进行背景定位，`background-position`可以用数字能精确的定位出背景图片的位置。

`CSS Sprites`为一些大型的网站节约了带宽，提高了用户的加载速度和用户体验，不需要加载更
多的图片。

## 3、CSS中link和@import的区别
- (1) `link`属于`HTML`标签，而`@import`是`CSS`提供的
- (2) 页面被加载的时，`link`会同时被加载，而`@import`被引用的`CSS`会等到引用它的 `CSS`文件被加载完再加载
- (3) `import`只在`IE5`以上才能识别，而`link`是`HTML`标签，无兼容问题
- (4) `link`方式的样式的权重高于`@import`的权重

## 4、src与href的区别

- `src`用于替换当前元素，`href`用于在当前文档和引用资源之间确立联系。

- `src`是`source`的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求`src`资源时会将其指向的资源下载并应用到文档内，例如`js`脚本，`img`图片和`frame`等元素。`<script src =”js.js">`当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将`js`脚本放在底部而不是头部。
```html
<!-- 资源下载并嵌入到文档中当前标签所在位置 -->
<img src="./avatar.png" />
<script src="x.js"></script>
<iframe src="./a.html" iframeborder="0"></iframe>
```

- `href`是`Hypertext Reference`的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文
档（链接）之间的链接，如果我们在文档中添加，那么浏览器会识别该文档为`css`文件，就会并行下载资源，并且不会停止对当前文档的处理。
```html
<!-- 下载并解析 -->
<link href="../css/index.css" />
<!-- 不会进行下载 -->
<a href="资源的链接"></a>
```

## 基础
**disabled 和 readonly 的区别？**
```
disabled 指当 input 元素加载时禁用此元素。input 内容不会随着表单提交。
readonly 规定输入字段为只读。input 内容会随着表单提交。
无论设置 readonly 还是 disabled，通过 js 脚本都能更改 input 的 value。
```

