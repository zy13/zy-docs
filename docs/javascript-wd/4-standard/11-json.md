[JSON 对象](https://www.wangdoc.com/javascript/stdlib/json.html)

## 1、JSON 格式
`JSON` 格式（`JavaScript Object Notation` 的缩写）是一种用于数据交换的文本格式，有两个显著的优点：书写简单，一目了然；符合 `JavaScript` 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。`JSON` 对值的类型和格式有严格的规定：
- 复合类型的值**只能是数组或对象**，不能是函数、正则表达式对象、日期对象。
- 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`, `Infinity`, `-Infinity`和`undefined`）。
- 字符串必须使用双引号表示，不能使用单引号。
- 对象的键名必须放在双引号里面。
- 数组或对象最后一个成员的后面，不能加逗号。
```js
// 合法的JSON格式
["one", "two", "three"]
{ "one": 1, "two": 2, "three": 3 }
{"names": ["张三", "李四"] }
[ { "name": "张三"}, {"name": "李四"} ]

// 不合法的JSON
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号
[32, 64, 128, 0xFFF] // 不能使用十六进制值
{ "name": "张三", "age": undefined } // 不能使用 undefined
{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象

// null、空数组和空对象都是合法的 JSON 值
```
### JSON 对象
`JSON`对象是 `JavaScript` 的原生对象，用来处理 `JSON` 格式数据。它有两个静态方法：`JSON.stringify()`和`JSON.parse()`。

每个 `JSON` 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或更多的值。

## 2、JSON.stringify()

`JSON.stringify()`方法用于将一个值转为 `JSON` 字符串。该字符串符合 JSON 格式，并且可以被`JSON.parse()`方法还原。
```js
// 输出JSON字符串
// 字符串用双引号表示
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false]) // "[1,"false",false]"
JSON.stringify({ name: "张三" }) // "{"name":"张三"}"

// 对于原始类型的字符串，转换结果会带双引号
// 字符串foo，被转成了"\"foo\""
// 将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。
JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true

// 如果不是内层的双引号，将来还原的时候，引擎就无法知道原始值是布尔值还是字符串。
JSON.stringify(false) // "false"
JSON.stringify('false') // ""false""

// 如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify()过滤。
// 对象obj的a属性是undefined，而b属性是一个函数，结果都被JSON.stringify过滤。
var obj = {
  a: undefined,
  b: function () {}
};
JSON.stringify(obj) // "{}"

// 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"

// 正则对象会被转成空对象
JSON.stringify(/foo/) // "{}"

// 忽略对象的不可遍历的属性
// bar是obj对象的不可遍历属性，JSON.stringify方法会忽略这个属性
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});
JSON.stringify(obj); // "{"foo":1}"
```
`JSON.stringify()`方法还可以**接受一个数组，作为第二个参数，指定参数对象的哪些属性需要转成字符串**。第二个参数**还可以是一个函数，用来更改JSON.stringify()的返回值**。
```js
// 第二个参数指定，只转prop1和prop2两个属性
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};
var selectedProperties = ['prop1', 'prop2'];
JSON.stringify(obj, selectedProperties) // "{"prop1":"value1","prop2":"value2"}"

// 这个类似白名单的数组，只对对象的属性有效，对数组无效。
// 第二个参数指定 JSON 格式只转0号属性，实际上对数组是无效的，只对对象有效。
JSON.stringify(['a', 'b'], ['0']) // "["a","b"]"
JSON.stringify({
  0: 'a',
  1: 'b'
}, ['0'])
// "{"0":"a"}"

// 递归处理所有的键
// 对象obj一共会被f函数处理三次，输出的最后那行是JSON.stringify()的默认输出
// 第一次键名为空，键值是整个对象obj
// 第二次键名为a，键值是{b: 1}
// 第三次键名为b，键值为1。
var obj = {a: {b: 1}};
function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}
JSON.stringify(obj, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'

// 递归处理中，每一次处理的对象，都是前一次返回的值。
// f函数修改了对象obj，接着JSON.stringify()方法就递归处理修改后的对象obj。
var obj = {a: 1};
function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}
JSON.stringify(obj, f)

// 如果处理函数返回undefined或没有返回值，则该属性会被忽略。
// a属性经过处理后，返回undefined，于是该属性被忽略了。
function f(key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
}
JSON.stringify({ a: "abc", b: 123 }, f) // "{"b":123}"
```
`JSON.stringify()`还可以接受第三个参数，用于增加返回的 `JSON` 字符串的可读性。默认返回的是单行字符串，**对于大型的 `JSON` 对象，可读性非常差**。第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过`10`个字符）。
```js
// 默认输出
JSON.stringify({ p1: 1, p2: 2 }) // "{"p1":1,"p2":2}"

// 分行输出
// 第三个属性\t在每个属性前面添加一个制表符，然后分行显示。
JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
// "{
// 	"p1": 1,
// 	"p2": 2
// }"
// 第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）。
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
// "{
//   "p1": 1,
//   "p2": 2
// }"
```

## 3、参数对象的 toJSON() 方法
如果参数对象有自定义的`toJSON()`方法，那么`JSON.stringify()`会使用这个方法的返回值作为参数，而忽略原对象的其他属性。
```js
var user = {
  firstName: '三',
  lastName: '张',
  get fullName(){
    return this.lastName + this.firstName;
  }
};
JSON.stringify(user) // "{"firstName":"三","lastName":"张","fullName":"张三"}"

// 为这个对象加上toJSON()方法
// JSON.stringify()发现参数对象有toJSON()方法
// 就直接使用这个方法的返回值作为参数，而忽略原对象的其他参数。
var user = {
  firstName: '三',
  lastName: '张',
  get fullName(){
    return this.lastName + this.firstName;
  },
  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};
JSON.stringify(user) // "{"name":"张三"}"

// Date对象就有一个自己的toJSON()方法。
var date = new Date('2015-01-01');
date.toJSON() // "2015-01-01T00:00:00.000Z"
JSON.stringify(date) // ""2015-01-01T00:00:00.000Z""
```
`toJSON()`方法的一个应用是，将正则对象自动转为字符串。因为`JSON.stringify()`默认不能转换正则对象，但是设置了`toJSON()`方法以后，就可以转换正则对象了。
```js
// 在正则对象的原型上面部署了toJSON()方法
// 将其指向toString()方法，因此转换成 JSON 格式时，
// 正则对象就先调用toJSON()方法转为字符串，然后再被JSON.stringify()方法处理。
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```

## 4、JSON.parse()
`JSON.parse()`方法用于将 `JSON` 字符串转换成对应的值。
```js
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三

// 如果传入的字符串不是有效的 JSON 格式，JSON.parse()方法将报错。
// 双引号字符串中是一个单引号字符串，因为单引号字符串不符合 JSON 格式，所以报错。
JSON.parse("'String'")
// SyntaxError: Unexpected token ' in JSON at position 0

// 处理解析错误，可以将JSON.parse()方法放在try...catch代码块中。
try {
  JSON.parse("'String'");
} catch(e) {
  console.log('parsing error');
}
```
`JSON.parse()`方法可以**接受一个处理函数，作为第二个参数**，用法与`JSON.stringify()`方法类似。
```js
// JSON.parse()的第二个参数是一个函数，如果键名是a，该函数会将键值加上10。
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```