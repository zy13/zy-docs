[Array对象](https://www.wangdoc.com/javascript/stdlib/array.html)

## 1、构造函数
`Array`是 `JavaScript` 的原生对象，同时也是一个构造函数，可以用它生成新的数组。`Array()`作为构造函数，行为很不一致。因此，**不建议使用它生成新数组，直接使用数组字面量是更好的做法**。
```js
// Array()构造函数的参数2
// 表示生成一个两个成员的数组，每个位置都是空值。
var arr = new Array(2);
arr.length // 2
arr // [ empty x 2 ]

// 如果没有使用new关键字，运行结果也是一样的。
// 考虑到语义性，以及与其他构造函数用法保持一致，建议总是加上new。
var arr = Array(2);
// 等同于
var arr = new Array(2);

// Array()构造函数有一个很大的缺陷，不同的参数个数会导致不一致的行为。- 即数组的重载

// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']

// bad
var arr = new Array(1, 2);

// good
var arr = [1, 2];

// 参数是一个正整数，返回数组的成员都是空位
// 读取的时候返回undefined，但实际上该位置没有任何值
// 可以读取到length属性，但是取不到键名。
var a = new Array(3);
var b = [undefined, undefined, undefined];

a.length // 3
b.length // 3

a[0] // undefined
b[0] // undefined

0 in a // false
0 in b // true
```

## 2、静态方法 - Array.isArray()
`Array.isArray`方法返回一个**布尔值**，表示**参数是否为数组**。它可以弥补`typeof`运算符的不足。
```js
// typeof运算符只能显示数组的类型是Object，
// 而Array.isArray方法可以识别数组。
var arr = [1, 2, 3];
typeof arr // "object"
Array.isArray(arr) // true
```

## 3、实例方法 - valueOf()，toString()
`valueOf`方法是一个**所有对象都拥有的方法，表示对该对象求值**。不同对象的`valueOf`方法不尽一致，数组的`valueOf`方法**返回数组本身**。
```js
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
```
`toString`方法也是**对象的通用方法**，数组的`toString`方法**返回数组的字符串形式**。
```js
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```

## 4、实例方法 - push()，pop()
`push`方法用于**在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度**。注意，**该方法会改变原数组**。
```js
// 使用push方法，往数组中添加了四个成员
// 返回数组长度
// 原数组改变
var arr = [];

arr.push(1) // 1
arr.push('a') // 2
arr.push(true, {}) // 4
arr // [1, 'a', true, {}]
```
`pop`方法用于**删除数组的最后一个元素，并返回该元素**。注意，**该方法会改变原数组**。
```js
// 删除最后一个元素
// 返回删除的元素
// 原数组改变
var arr = ['a', 'b', 'c'];
arr.pop() // 'c'
arr // ['a', 'b']

// 对空数组使用pop方法，不会报错，而是返回undefined。
[].pop() // undefined
```
`push`和`pop`结合使用，就构成了“后进先出”的栈结构（`stack`）。
```js
// 3是最后进入数组的，但是最早离开数组。
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop(); // 3
arr // [1, 2]
```

## 5、实例方法 - shift()，unshift()
`shift()`方法用于**删除数组的第一个元素，并返回该元素**。注意，该方法会**改变原数组**。
- `push()`和`shift()`结合使用，就构成了“先进先出”的队列结构（`queue`）。
```js
// 删除第一个元素
// 返回删除的元素
// 原数组改变
var a = ['a', 'b', 'c'];
a.shift() // 'a'
a // ['b', 'c']

// shift()方法可以遍历并清空一个数组。
// 通过list.shift()方法每次取出一个元素，从而遍历数组
// 它的前提是数组元素不能是0或任何布尔值等于false的元素，
// 因此这样的遍历不是很可靠。
var list = [1, 2, 3, 4];
var item;
while(item = list.shift()) {
  console.log(item)
}
list // []
```
`unshift()`方法用于**在数组的第一个位置添加元素，并返回添加新元素后的数组长度**。注意，该方法会**改变原数组**。
- `unshift()`方法可以接受多个参数，这些参数都会添加到目标数组头部。
```js
// 在第一个位置添加元素
// 返回数组的长度
// 改变数组
var a = ['a', 'b', 'c'];
a.unshift('x'); // 4
a // ['x', 'a', 'b', 'c']

// 接受多个参数
// 按顺序添加到数组头部
var arr = [ 'c', 'd' ];
arr.unshift('a', 'b') // 4
arr // [ 'a', 'b', 'c', 'd' ]
```

## 6、实例方法 - join()
`join()`方法**以指定参数作为分隔符，将所有数组成员连接为一个字符串返回**，默认用逗号分隔。如果不提供参数，默认用逗号分隔。**原数组不变**。
- 如果数组成员是`undefined`或`null`或空位，会被转成**空字符串**。
- 通过`call`方法，这个方法也可以**用于字符串或类似数组的对象**。
```js
var a = [1, 2, 3, 4];
a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"

// 数组成员是undefined或null或空位，
// 会被转成空字符串
[undefined, null].join('#') // '#'
['a',, 'b'].join('-') // "a--b"

// 通过call方法，用于字符串或类似数组的对象。
Array.prototype.join.call('hello', '-') // "h-e-l-l-o"
Array.prototype.join.call(obj, '-') // "a-b"
```

## 7、实例方法 - concat()
`concat`方法用于**多个数组的合并**。它**将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变**。
- 除了数组作为参数，`concat`也接受其他类型的值作为参数，添加到目标数组尾部。
- 如果数组成员包括对象，concat方法返回当前数组的一个**浅拷贝**(指的是新数组拷贝的是**对象的引用**，对象和新旧数组会互相影响)。
```js
// 将新数组的成员['world']
// 添加到['hello']的后部
// 返回一个新数组
// 原数组不变
['hello'].concat(['world']) // ["hello", "world"]

['hello'].concat(['world'], ['!']) // ["hello", "world", "!"]

[].concat({a: 1}, {b: 2}) // [{ a: 1 }, { b: 2 }]

[2].concat({a: 1}) // [2, {a: 1}]

// 接受其他类型的值作为参数，添加到目标数组尾部
[1, 2, 3].concat(4, 5, 6) // [1, 2, 3, 4, 5, 6]

// 原数组包含一个对象，concat方法生成的新数组包含这个对象的引用。
// 对象属性改变，数组的元素随之改变，反之亦然
var obj = { a: 1 };
var oldArray = [obj];
var newArray = oldArray.concat();
obj.a = 2;
newArray[0].a // 2
```

## 8、实例方法 - reverse()
`reverse`方法用于**颠倒排列数组元素，返回改变后的数组**。注意，该方法将**改变原数组**。
```js
// 颠倒排列数组的元素
// 返回改变后的数组
// 原数组改变
var a = ['a', 'b', 'c'];
a.reverse() // ["c", "b", "a"]
a // ["c", "b", "a"]
```

## 9、实例方法 - slice()
`slice()`方法用于**提取目标数组的一部分，返回一个新数组，原数组不变**。
- `slice()`**没有参数**，实际上等于返回一个**原数组的拷贝**。拷贝前后两数组互不影响。
- 如果`slice()`方法的**参数是负数**，则表示**倒数计算的位置**。
- 如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则**返回空数组**。
- `slice()`方法的一个**重要应用**，是**将类似数组的对象转为真正的数组**。
```js
// 第一个参数为起始位置：从0开始，会包括在返回的新数组之中
// 第二个参数为终止位置：但该位置的元素本身不包括在内
// 如果省略第二个参数，则一直返回到原数组的最后一个成员
arr.slice(start, end);

var a = ['a', 'b', 'c'];
a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]

// -2表示倒数计算的第二个位置，
// -1表示倒数计算的第一个位置。
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]

// 返回空数组
var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []

// 下面代码的参数都不是数组，
// 但是通过call方法，在它们上面调用slice()方法，就可以把它们转为真正的数组。
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

## 10、实例方法 - splice()
`splice()`方法用于**删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素**。注意，该方法会**改变原数组**。
- 起始位置如果是负数，就表示从倒数位置开始删除。
- 如果只是单纯地插入元素，`splice`方法的第二个参数可以设为`0`。
- 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。
```js
// 第一个参数是删除的起始位置，从0开始
// 第二个参数是被删除的元素个数
// 如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。
arr.splice(start, count, addElement1, addElement2, ...);

// 从原数组4号位置，删除了两个数组成员。
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

// 除了删除成员，还插入了两个新成员。
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]

// 从倒数第四个位置c开始删除两个成员。
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]

// 单纯地插入元素
var a = [1, 1, 1];
a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]

// 将原数组在指定位置拆分成两个数组
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

## 11、实例方法 - sort()
`sort`方法**对数组成员进行排序，默认是按照字典顺序排序**。排序后，**原数组将被改变**。
- 如果想让`sort`方法按照自定义方式排序，可以**传入一个函数作为参数**。
- 自定义的排序函数应该**返回数值**，否则不同的浏览器可能有不同的实现，不能保证结果都一致。
```js
// 按照字典顺序：数值会被先转成字符串，再按照字典顺序进行比较，
// 返回排序后的数组
// 原数组改变
['d', 'c', 'b', 'a'].sort() // ["a", "b", "c", "d"]

[4, 3, 2, 1].sort() // [1, 2, 3, 4]

[11, 101].sort() // [101, 11]

[10111, 1101, 111].sort() // [10111, 1101, 111]


// 按照自定义方式排序
// sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。
// 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面，为升序排序
// 其他情况下，都是第一个元素排在第二个元素前面，为降序排序。
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]

[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]


// 前一种排序算法返回的是布尔值，这是不推荐使用的
// 后一种是数值，才是更好的写法。
// bad
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a > b)

// good
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a - b)
```

## 12、实例方法 - map()
`map`方法**将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回**。
**不改变原数组**。
- `map`方法接受一个函数作为参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。
- `map`方法还可以接受第二个参数，用来绑定回调函数内部的`this`变量。
- 如果数组有空位，`map`方法的回调函数在这个位置不会执行，**会跳过数组的空位**。
```js
// 将数组的所有成员
// 依次传入参数函数
// 然后把每一次的执行结果
// 组成一个新数组返回
// 原数组没有变化
var numbers = [1, 2, 3];
numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]
numbers // [1, 2, 3]

// map方法的回调函数有三个参数
// elem为当前成员的值
// index为当前成员的位置
// arr为原数组（[1, 2, 3]）
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]

// 通过map方法的第二个参数
// 将回调函数内部的this对象，指向arr数组。
var arr = ['a', 'b', 'c'];
[1, 2].map(function (e) {
  return this[e];
}, arr)
// ['b', 'c']

// map方法不会跳过undefined和null，但是会跳过空位。
var f = function (n) { return 'a' };
[1, undefined, 2].map(f) // ["a", "a", "a"]
[1, null, 2].map(f) // ["a", "a", "a"]
[1, , 2].map(f) // ["a", , "a"]
```

## 13、实例方法 - forEach()
`forEach`方法与`map`方法很相似，也**是对数组的所有成员依次执行参数函数**。但是，`forEach`方法**不返回值**，只用来操作数据。这就是说，**如果数组遍历的目的是为了得到返回值，那么使用`map`方法，否则使用`forEach`方法**。
- `forEach`方法也可以接受第二个参数，绑定参数函数的`this`变量。
- `forEach`方法**无法中断执行**，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用`for`循环。
- `forEach`方法也会**跳过数组的空位**。
```js
// forEach的用法与map方法一致
// 参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。
// 没有返回值
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}
[2, 5, 9].forEach(log);

// 空数组out是forEach方法的第二个参数，
// 结果，回调函数内部的this关键字就指向out。
var out = [];
[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);
out // [1, 4, 9]

// 如果希望符合某种条件时，就中断遍历，要使用for循环。
// 执行到数组的第二个成员时，就会中断执行。forEach方法做不到这一点。
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  if (arr[i] === 2) break;
  console.log(arr[i]);
}

// forEach方法不会跳过undefined和null，但会跳过空位。
var log = function (n) {
  console.log(n + 1);
};

[1, undefined, 2].forEach(log)
// 2
// NaN
// 3

[1, null, 2].forEach(log)
// 2
// 1
// 3

[1, , 2].forEach(log)
// 2
// 3
```

## 14、实例方法 - filter()
`filter`方法用于**过滤数组成员，满足条件的成员组成一个新数组返回**。该方法不会改变原数组。
- 参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回。
- `filter`方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。
- `filter`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。
```js
// 将大于3的数组成员，作为一个新数组返回
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]

// filter方法返回数组arr里面所有布尔值为true的成员。
var arr = [0, 1, 'a', false];
arr.filter(Boolean)

// 返回偶数位置的成员组成的新数组。
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]

// 过滤器myFilter内部有this变量，它可以被filter方法的第二个参数obj绑定，
// 返回大于3的成员。
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};
var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]
```

## 15、实例方法 - some()，every()
这两个方法类似“断言”（`assert`），返回一个**布尔值**，表示**判断数组成员是否符合某种条件**。

- 接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。
- 对于空数组，`some`方法返回`false`，`every`方法返回`true`，回调函数都不会执行。
  ```js
  function isEven(x) { return x % 2 === 0 }
  [].some(isEven) // false
  [].every(isEven) // true
  ```
- `some`和`every`方法还可以接受第二个参数，用来绑定参数函数内部的`this`变量。

`some`方法是只要一个成员的返回值是`true`，则整个`some`方法的返回值就是`true`，否则返回`false`。
```js
// 数组中是否有大于3的元素
// 数组arr有一个成员大于等于3，some方法就返回true
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```
`every`方法是所有成员的返回值都是`true`，整个`every`方法才返回`true`，否则返回`false`。
```js
// 是否每个元素都大于等于3
// 数组arr并非所有成员大于等于3，所以返回false。
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
// false
```

## 16、实例方法 - reduce()，reduceRight()
`reduce`方法和`reduceRight`方法**依次处理数组的每个成员，最终累计为一个值**。
- `reduce`是从左到右处理，即从第一个成员到最后一个成员。
- `reduceRight`则是从右到左，即从最后一个成员到第一个成员。
- `reduce`方法和`reduceRight`方法的第一个参数都是一个函数。
```js
// 第一个参数都是一个函数，该函数接受以下四个参数。
// - 累积变量-必须，默认为数组的第一个成员
// - 当前变量-必须，默认为数组的第二个成员
// - 当前位置（从0开始）
// - 原数组
// 第二个参数，对累积变量指定初值，相当于设定了默认值，处理空数组时尤其有用
[1, 2, 3, 4, 5].reduce(function (a, b) {
  // 指定参数a的初值为10，所以数组从10开始累加，最终结果为25。
  // 注意，这时b是从数组的第一个成员开始遍历。
  return a + b;
}, 10);

// reduce方法求出数组所有成员的和
// 第一次执行，a是数组的第一个成员1，b是数组的第二个成员2
// 第二次执行，a为上一轮的返回值3，b为第三个成员3
// 第三次执行，a为上一轮的返回值6，b为第四个成员4
// 第四次执行，a为上一轮返回值10，b为第五个成员5
// 至此所有成员遍历完成，整个方法的返回值就是最后一轮的返回值15。
[1, 2, 3, 4, 5].reduce(function (a, b) {
  console.log(a, b);
  return a + b;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15

// 由于空数组取不到初始值，reduce方法会报错
// 加上第二个参数，就能保证总是会返回一个值。
function add(prev, cur) {
  return prev + cur;
}
[].reduce(add)
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1
```

```js
// reduce从左到右处理每个元素
// reduceRight方法从右到左处理每个元素

// reduce方法相当于3减去2再减去1
// reduceRight方法相当于1减去2再减去3。
function subtract(prev, cur) {
  return prev - cur;
}
[3, 2, 1].reduce(subtract) // 0
[3, 2, 1].reduceRight(subtract) // -4

// 找出字符长度最长的数组成员
// reduce的参数函数会将字符长度较长的那个数组成员，作为累积值
// 遍历所有成员之后，累积值就是字符长度最长的那个成员
function findLongest(entries) {
  return entries.reduce(function(longest,entry){
    return longest.length > entry.length ? longest : entry
  },'')
}
findLongest(['aaa', 'bb', 'c']) // 'aaa'
```

## 17、实例方法 - indexOf()，lastIndexOf()

这两个方法不能用来搜索`NaN`的位置，即它们无法确定数组成员是否包含`NaN`。
这两个方法内部，使用严格相等运算符（`===`）进行比较，而`NaN`是唯一一个不等于自身的值。

`indexOf`方法返回**给定元素在数组中第一次出现的位置，如果没有出现则返回-1**。
- `indexOf`方法还可以接受第二个参数，表示**搜索的开始位置。**
```js
// 第一个参数，给定元素
// 第二个参数，搜索开始位置
var a = ['a', 'b', 'c'];
a.indexOf('b') // 1
a.indexOf('y') // -1

// 从1号位置开始搜索字符a，结果为-1，表示没有搜索到。
a.indexOf('a', 1) // -1

// 不能用来搜索NaN的位置
[NaN].indexOf(NaN) // -1
```
`lastIndexOf`方法返回**给定元素在数组中最后一次出现的位置，如果没有出现则返回`-1`**。
```js
// 给定元素在数组中
// 最后一次出现的位置
var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3
a.lastIndexOf(7) // -1

// 不能用来搜索NaN的位置
[NaN].lastIndexOf(NaN) // -1
```

## 18、链式使用
数组的实例方法中，有不少返回的还是数组，所以可以链式操作。
```js
// 先产生一个所有 Email 地址组成的数组，然后再过滤出以t开头的 Email 地址，最后将它打印出来。
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(function (email) {
  console.log(email);
});
// "tom@example.com"
```

