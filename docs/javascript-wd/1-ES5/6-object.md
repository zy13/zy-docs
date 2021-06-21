## 1、对象生成方法

对象（`object`）就是一组“键值对”（`key-value`）的集合，是一种无序的复合数据集合。是 `JavaScript` 语言的核心概念，也是最重要的数据类型。

```js
// 大括号就定义了一个对象，它被赋值给变量obj，变量obj就指向一个对象
// 该对象内部包含两个键值对（又称为两个“成员”），
// 键名与键值之间用冒号分隔，两个键值对之间用逗号分隔。
// 第一个键值对是foo: 'Hello'，其中foo是“键名”（成员的名称），字符串Hello是“键值”（成员的值）
// 第二个键值对是bar: 'World'，bar是键名，World是键值。
var obj = {
  foo: 'Hello',
  bar: 'World'
};
```

## 2、键名 - 对象的属性/方法
对象的所有键名都是字符串（`ES6` 又引入了 `Symbol` 值也可以作为键名），所以加不加引号都可以。
- 如果键名是数值，会被自动转为**字符串**。
- 键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号，否则会报错。
- 对象的每一个键名又称为“属性”（property），它的“键值”**可以是任何数据类型**。
- 如果一个属性的值为函数，通常把这个属性称为“**方法**”，它可以像函数那样调用。
- 如果属性的值还是一个对象，就形成了**链式引用**。
- 对象的属性之间用逗号分隔，最后一个属性后面可以加逗号（`trailing comma`），也可以不加。
- **属性可以动态创建**，不必在对象声明时就指定。
```js
var obj = {
  'foo': 'Hello',
  'bar': 'World'
};

// 键名是数值，会被自动转为字符串
// 对象obj的所有键名上的数值，被自动转成了字符串
var obj = {
  1: 'a',
  3.2: 'b',
  1e2: true,
  1e-2: true,
  .234: true,
  0xFF: true
};
// Object {
//   1: "a",
//   3.2: "b",
//   100: true,
//   0.01: true,
//   0.234: true,
//   255: true
// }

obj['100'] // true

// 键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），
// 且也不是数字，则必须加上引号，否则会报错。
var obj = {
  1p: 'Hello World'
}; // SyntaxError: Invalid or unexpected token

// 对象的三个键名，都不符合标识名的条件，所以必须加上引号。
var obj = {
  '1p': 'Hello World',
  'h w': 'Hello World',
  'p+q': 'Hello World'
};

// 对象obj的属性p，就指向一个函数
var obj = {
  p: function (x) {
    return 2 * x;
  }
};
obj.p(1) // 2

// 对象o1的属性foo指向对象o2，就可以链式引用o2的属性。
var o1 = {};
var o2 = { bar: 'hello' };
o1.foo = o2;
o1.foo.bar // "hello"

// m属性后面的那个逗号，有没有都可以。
var obj = {
  p: 123,
  m: function () { ... },
}

// 直接对obj对象的foo属性赋值，结果就在运行时创建了foo属性
var obj = {};
obj.foo = 123;
obj.foo // 123
```

## 3、对象的引用
- 如果不同的变量名指向同一个对象，那么它们都是这个**对象的引用**，也就是说**指向同一个内存地址。修改其中一个变量，会影响到其他所有变量**。
- 如果取消某一个变量对于原对象的引用，不会影响到另一个变量。
- 但是，这种引用只局限于对象，**如果两个变量指向同一个原始类型的值**。那么，**变量这时都是值的拷贝。**
```js
// o1和o2指向同一个对象，因此为其中任何一个变量添加属性，另一个变量都可以读写该属性。
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a // 1

o2.b = 2;
o1.b // 2

// o1和o2指向同一个对象，然后o1的值变为1，这时不会对o2产生影响，o2还是指向原来的那个对象。
var o1 = {};
var o2 = o1;

o1 = 1;
o2 // {}

// 当x的值发生变化后，y的值并不变，这就表示y和x并不是指向同一个内存地址。
var x = 1;
var y = x;

x = 2;
y // 1
```

## 4、表达式还是语句

**对象采用大括号表示**，这导致了一个问题：如果行首是一个大括号，它到底是表达式还是语句？可能有两种含义：第一种可能是，这是一个**表达式**，表示一个包含`foo`属性的对象；第二种可能是，这是一个**语句**，表示一个代码区块，里面有一个标签`foo`，指向表达式`123`

`JavaScript` 引擎的做法是，如果遇到这种情况，**无法确定是对象还是代码块，一律解释为代码块**。
- **如果要解释为对象，最好在大括号前加上圆括号**。因为圆括号的里面，只能是表达式，所以确保大括号只能解释为对象。
- 在`eval`语句（作用是对字符串求值）中，如果没有圆括号，`eval`将其理解为一个代码块；加上圆括号以后，就理解成一个对象。
```js
// JavaScript一律解释为代码块
{ foo: 123 }

// 只有解释为代码块，才能执行
{ console.log(123) } // 123

// 要解释为对象，最好在大括号前加上圆括号
({ foo: 123 }) // 正确
({ console.log(123) }) // 报错

// 如果没有圆括号，eval将其理解为一个代码块；加上圆括号以后，就理解成一个对象。
eval('{foo: 123}') // 123
eval('({foo: 123})') // {foo: 123}
```

## 5、属性的读取
读取对象的属性，有两种方法，一种是使用**点运算符**，还有一种是使用**方括号运算符**。
- 如果使用方括号运算符，键名必须放在**引号**里面，否则会被当作**变量**处理。
- 方括号运算符内部还可以使用**表达式**。
- **数字键**可以不加引号，因为会自动转成字符串。
- **数值键名不能使用点运算符**（因为会被当成小数点），只能使用方括号运算符。
```js
// 分别采用点运算符和方括号运算符，读取属性p。
var obj = {
  p: 'Hello World'
};
obj.p // "Hello World"
obj['p'] // "Hello World"

// 引用对象obj的foo属性时，如果使用点运算符，foo就是字符串
// 如果使用方括号运算符，但是不使用引号，那么foo就是一个变量，指向字符串bar
var foo = 'bar';
var obj = {
  foo: 1,
  bar: 2
};
obj.foo  // 1
obj[foo]  // 2

// 方括号运算符内部使用表达式
obj['hello' + ' world']
obj[3 + 3]

// 对象obj的数字键0.7，加不加引号都可以，因为会被自动转为字符串。
var obj = {
  0.7: 'Hello World'
};
obj['0.7'] // "Hello World"
obj[0.7] // "Hello World"

// 对数值键名123使用点运算符，结果报错。第二个表达式使用方括号运算符，结果就是正确的。
var obj = {
  123: 'hello world'
};
obj.123 // 报错
obj[123] // "hello world"
```

## 6、属性的赋值

- 点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值。
- `JavaScript` 允许**属性的“后绑定”**，也就是说，你可以在任意时刻新增属性，没必要在定义对象的时候，就定义好属性。
```js
// 分别使用点运算符和方括号运算符，对属性赋值
var obj = {};
obj.foo = 'Hello';
obj['bar'] = 'World';

// 可以在任意时刻新增属性，没必要在定义对象的时候，就定义好属性
var obj = { p: 1 };
// 等价于
var obj = {};
obj.p = 1;
```

## 7、属性的查看
查看一个对象本身的所有属性，可以使用`Object.keys`方法。
```js
var obj = {
  key1: 1,
  key2: 2
};
Object.keys(obj); // ['key1', 'key2']
```

## 8、属性的删除：delete 命令
`delete`命令用于删除对象的属性，删除成功后返回`true`。
- 删除一个不存在的属性，`delete`不报错，而且返回`true`。因此，不能根据delete命令的结果，认定某个属性是存在的。
- 只有一种情况，`delete`命令会返回`false`，那就是该属性存在，且不得删除。
- `delete`命令**只能删除对象本身的属性，无法删除继承的属性**。即使`delete`返回`true`，该属性依然可能读取到值。
```js
// delete命令删除对象obj的p属性
var obj = { p: 1 };
Object.keys(obj) // ["p"]

// 删除后，再读取p属性就会返回undefined，而且Object.keys方法的返回值也不再包括该属性。
delete obj.p // true
obj.p // undefined
Object.keys(obj) // []

// 对象obj并没有p属性，但是delete命令照样返回true
var obj = {};
delete obj.p // true

// 对象obj的p属性是不能删除的，所以delete命令返回false
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});
obj.p // 123
delete obj.p // false

// toString是对象obj继承的属性，虽然delete命令返回true，但该属性并没有被删除，依然存在
var obj = {};
delete obj.toString // true
obj.toString // function toString() { [native code] }
```

## 9、属性是否存在：in 运算符
`in`运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回`true`，否则返回`false`。
- `in`的左边是一个字符串，表示属性名，右边是一个对象。
- `in`运算符的一个问题是，**它不能识别哪些属性是对象自身的，哪些属性是继承的**。
- 可以使用对象的`hasOwnProperty`方法判断一下，是否为对象自身的属性。
```js
// 对象obj本身并没有toString属性，但是in运算符会返回true，因为这个属性是继承的
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true

// hasOwnProperty方法判断是否为对象自身的属性
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

## 10、属性的遍历：for...in 循环
`for...in`循环用来遍历一个对象的全部属性。
- 它遍历的是对象所有可遍历（`enumerable`）的属性，会跳过不可遍历的属性。
- 它**不仅遍历对象自身的属性，还遍历继承的属性**。
- 对象都继承了`toString`属性，但是`for...in`循环不会遍历到这个属性。
- 如果继承的属性是可遍历的，那么就会被`for...in`循环遍历到。
```js
var obj = {a: 1, b: 2, c: 3};
for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}

// 对象obj继承了toString属性，该属性不会被for...in循环遍历到，因为它默认是“不可遍历”的
var obj = {};
// toString 属性是存在的
obj.toString // toString() { [native code] }
for (var p in obj) {
  console.log(p);
} // 没有任何输出
```

一般情况下，都是只想遍历对象自身的属性，所以使用`for...in`的时候，应该结合使用`hasOwnProperty`方法，在循环内部判断一下，某个属性是否为对象自身的属性。
```js
var person = { name: '老张' };
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

## 11、with 语句 - 不建议使用
`with`语句的格式如下，它的作用是**操作同一个对象的多个属性**时，提供一些书写的方便。
- 如果`with`**区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量**。
```js
// 格式
with (对象) {
  语句;
}

// 例一
var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;

// 例二
with (document.links[0]){
  console.log(href);
  console.log(title);
  console.log(style);
}
// 等同于
console.log(document.links[0].href);
console.log(document.links[0].title);
console.log(document.links[0].style);

// 对象obj并没有p1属性，对p1赋值等于创造了一个全局变量p1
// 正确的写法应该是，先定义对象obj的属性p1，然后在with区块内操作它。
var obj = {};
with (obj) {
  p1 = 4;
  p2 = 5;
}
obj.p1 // undefined
p1 // 4
```
`with`区块**没有改变作用域，它的内部依然是当前作用域**。这造成了`with`语句的一个很大的弊病，就是**绑定对象不明确**。这非常**不利于代码的除错和模块化**，编译器也无法对这段代码进行优化，只能留到运行时判断，这就拖慢了运行速度。建议不要使用`with`语句，可以考虑用一个临时变量代替`with`。
```js
// 无法判断x到底是全局变量，还是对象obj的一个属性
with (obj) {
  console.log(x);
}

// 用一个临时变量代替`with`
with(obj1.obj2.obj3) {
  console.log(p1 + p2);
}
// 可以写成
var temp = obj1.obj2.obj3;
console.log(temp.p1 + temp.p2);
```