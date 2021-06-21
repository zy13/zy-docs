[ParentNode 接口，ChildNode 接口](https://www.wangdoc.com/javascript/dom/parentnode.html)

节点对象除了继承 `Node` 接口以外，还拥有其他接口。`ParentNode`接口表示当前节点是一个父节点，提供一些处理子节点的方法。`ChildNode`接口表示当前节点是一个子节点，提供一些相关方法。

## 1、ParentNode 接口

如果当前节点是父节点，就会混入了（`mixin`）`ParentNode`接口。由于只有元素节点（`element`）、文档节点（`document`）和文档片段节点（`documentFragment`）拥有子节点，因此只有这三类节点会拥有`ParentNode`接口。

## 2、ParentNode.children 属性
`children`属性返回一个`HTMLCollection`实例，成员是当前节点的所有元素子节点。该属性只读。
```js
for (var i = 0; i < el.children.length; i++) {
  // ...
}
```
注意，`children`属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值`HTMLCollection`实例的`length`属性为`0`。

另外，`HTMLCollection`是**动态集合**，会实时反映 `DOM` 的任何变化。

## 2、ParentNode.firstElementChild 属性

`firstElementChild`属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回`null`。
```js
// document节点的第一个元素子节点是<HTML>
document.firstElementChild.nodeName // HTML
```

## 3、ParentNode.lastElementChild 属性
`lastElementChild`属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回`null`。
```js
// document节点的最后一个元素子节点是<HTML>
// 因为document只包含这一个元素子节点
document.lastElementChild.nodeName // "HTML"
```

## 4、ParentNode.childElementCount 属性
`childElementCount`属性**返回一个整数，表示当前节点的所有元素子节点的数目**。如果不包含任何元素子节点，则返回`0`。
```js
document.body.childElementCount // 13
```

## 5、ParentNode.append()、 prepend() 方法
### append()
`append()`方法**为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面，该方法没有返回值**。该方法不仅可以添加元素子节点（参数为元素节点），还可以添加文本子节点（参数为字符串）。

该方法与`Node.prototype.appendChild()`方法有三点不同：
- `append()`允许字符串作为参数，`appendChild()`只允许子节点作为参数。
- `append()`没有返回值，而`appendChild()`返回添加的子节点。
- `append()`可以添加多个子节点和字符串（即允许多个参数），`appendChild()`只能添加一个节点（即只允许一个参数）。
```js
// 允许多个参数，可以一次性添加多个子节点和字符串
var parent = document.body;

// 添加元素子节点
var p = document.createElement('p');
parent.append(p);

// 添加文本子节点
parent.append('Hello');

// 添加多个元素子节点
var p1 = document.createElement('p');
var p2 = document.createElement('p');
parent.append(p1, p2);

// 添加元素子节点和文本子节点
var p = document.createElement('p');
parent.append('Hello', p);
```
### prepend()
`prepend()`方法**为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面**。它的用法与`append()`方法完全一致，也是没有返回值。

## 6、ChildNode 接口
如果一个节点有父节点，那么该节点就拥有了`ChildNode`接口。

## 7、ChildNode.remove() 方法
`remove()`方法用于从父节点移除当前节点。
```js
// 在 DOM 里面移除了el节点
el.remove()
```

## 9、ChildNode.before()、after() 方法
### before()
`before()`方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。注意，该方法不仅可以插入元素节点，还可以插入文本节点。
```js
var p = document.createElement('p');
var p1 = document.createElement('p');

// 插入元素节点
el.before(p);

// 插入文本节点
el.before('Hello');

// 插入多个元素节点
el.before(p, p1);

// 插入元素节点和文本节点
el.before(p, 'Hello');
```

### after()

`after()`方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与`before`方法完全相同。

## 10、ChildNode.replaceWith() 方法
`replaceWith()`方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。
```js
// el节点将被span节点替换
var span = document.createElement('span');
el.replaceWith(span);
```