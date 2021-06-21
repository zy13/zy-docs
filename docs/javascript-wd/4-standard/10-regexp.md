[RegExp 对象](https://www.wangdoc.com/javascript/stdlib/regexp.html)

## 1、概述

正则表达式（`regular expression`）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本。
```js
// 新建正则表达式一 - 使用字面量
// 以斜杠表示开始和结束，便利和直观，实际应用中，基本上都采用字面量定义正则表达式
// 在引擎编译代码时，就会新建正则表达式，效率较高
var regex = /xyz/;

// 新建正则表达式二 - 使用RegExp构造函数
// 在运行时新建正则表达式
// 还可以接受第二个参数，表示修饰符
var regex = new RegExp('xyz');
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

// 上面两种写法是等价的，都新建了一个内容为xyz的正则表达式对象
```

## 2、实例属性
**与修饰符相关**，用于了解设置了什么修饰符：
- `RegExp.prototype.ignoreCase`：返回一个布尔值，表示是否设置了`i`修饰符。
- `RegExp.prototype.global`：返回一个布尔值，表示是否设置了`g`修饰符。
- `RegExp.prototype.multiline`：返回一个布尔值，表示是否设置了`m`修饰符。
- `RegExp.prototype.flags`：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。

**与修饰符无关**的属性：
- `RegExp.prototype.lastIndex`：返回一个整数，表示下一次开始搜索的位置。该属性可读写，设置了`g`修饰符的时候，只要手动设置了`lastIndex`的值，就会从指定位置开始匹配。
- `RegExp.prototype.source`：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。
```js
// 与修饰符相关
// 四个属性都是只读的
var r = /abc/igm;
r.ignoreCase // true
r.global // true
r.multiline // true
r.flags // 'gim'

// 与修饰符无关
r.lastIndex // 0  - 可读
r.source // "abc" - 只读
```

## 3、RegExp.prototype.test()
正则实例对象的`test`方法返回一个布尔值，表示当前模式是否能匹配参数字符串。
- 如果正则表达式带有`g`修饰符，则每一次`test`方法都从上一次结束的位置开始向后匹配。
- 带有`g`修饰符时，可以通过正则对象的`lastIndex`属性指定开始搜索的位置。
- 带有`g`修饰符时，正则表达式内部会记住上一次的`lastIndex`属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。
- `lastIndex`属性只对同一个正则表达式有效。
- 如果正则模式是一个空字符串，则匹配所有字符串。
```js
// 返回一个布尔值
// 当前模式是否能匹配参数字符串

// 验证参数字符串之中是否包含cat，结果返回true
/cat/.test('cats and dogs') // true

// 正则表达式使用了g修饰符，表示是全局搜索，会有多个结果
// 三次使用test方法，每一次开始搜索的位置都是上一次匹配的后一个位置
var r = /x/g;
var s = '_x_x';
r.lastIndex // 0
r.test(s) // true
r.lastIndex // 2
r.test(s) // true
r.lastIndex // 4
r.test(s) // false

// 指定从字符串的第五个位置开始搜索，这个位置为空，所以返回false
// lastIndex属性重置为0，所以第二次执行r.test(s)会返回true。
var r = /x/g;
var s = '_x_x';
r.lastIndex = 4;
r.test(s) // false
r.lastIndex // 0
r.test(s)

// 正则表达式r是从上一次的lastIndex位置开始匹配
// 导致第二次执行test方法时出现预期以外的结果
// 这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误。
var r = /bb/g;
r.test('bb') // true
r.test('-bb-') // false

// 代码会导致无限循环
// 因为while循环的每次匹配条件都是一个新的正则表达式
// 导致lastIndex属性总是等于0
var count = 0;
while (/a/g.test('babaa')) count++;

// 如果正则模式是一个空字符串，则匹配所有字符串。
new RegExp('').test('abc')
```

## 4、RegExp.prototype.exec()
正则实例对象的`exec()`方法，用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回`null`。`exec()`方法的返回数组还包含以下两个属性。
- `index`属性：模式匹配成功的开始位置（从`0`开始计数）。
- `input`属性：整个原字符串。
- 如果**正则表示式包含圆括号**（即含有“组匹配”），则返回的数组会包括多个成员。
- 如果正则表达式加上`g`修饰符，则可以使用多次`exec()`方法，下一次搜索的位置从上一次匹配成功结束的位置开始。
- 利用`g`修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。
```js
// 返回匹配结果，一个数组或者null

// 正则对象r1匹配成功，返回一个数组，成员是匹配结果；
// 正则对象r2匹配失败，返回null。
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;
r1.exec(s) // ["x", index: 1, input: "_x_x", groups: undefined]
r2.exec(s) // null

// 第一个成员是整个匹配的结果，
// 第二个成员是圆括号匹配的结果。
var s = '_x_x';
var r1 = /(x)/;
var r2 = /_(x)/
r1.exec(s) // ["x", "x", index: 1, input: "_x_x", groups: undefined]
r2.exec(s) // ["_x", "x", index: 0, input: "_x_x", groups: undefined]

// index属性等于1，是因为从原字符串的第二个位置开始匹配成功
var r = /a(b+)a/;
var str = '_abbba_aba_'
var arr = r.exec(str);
arr // ["abbba", "bbb", index: 1, input: "_abbba_aba_", groups: undefined]
arr.index // 1
arr.input // "_abbba_aba_"

// 正则表达式加上g修饰符, 连续用了四次exec()方法
// 前三次都是从上一次匹配结束的位置向后匹配
// 当第三次匹配结束以后，整个字符串已经到达尾部，匹配结果返回null，
// 正则实例对象的lastIndex属性也重置为0，意味着第四次匹配将从头开始。
var reg = /a/g;
var str = 'abc_abc_abc'

var r1 = reg.exec(str);
r1 // ["a", index: 0, input: "abc_abc_abc", groups: undefined]
r1.index // 0
reg.lastIndex // 1

var r2 = reg.exec(str);
r2 // ["a", index: 4, input: "abc_abc_abc", groups: undefined]
r2.index // 4
reg.lastIndex // 5

var r3 = reg.exec(str);
r3 // ["a", index: 8, input: "abc_abc_abc", groups: undefined]
r3.index // 8
reg.lastIndex // 9

var r4 = reg.exec(str);
r4 // null
reg.lastIndex // 0

// 利用g修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。
// 只要exec()方法不返回null，就会一直循环下去，每次输出匹配的位置和匹配的文本。
var reg = /a/g;
var str = 'abc_abc_abc'
while(true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log('#' + match.index + ':' + match[0]);
}
// #0:a
// #4:a
// #8:a
```

## 5、字符串实例方法 - 正则表达式

### （1）String.prototype.match()
字符串实例对象的`match`方法用于**确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串**。
```js
// 字符串的match方法与正则对象的exec方法非常类似：
// 匹配成功返回一个数组，匹配失败返回null。
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;
s.match(r1) // ["x", index: 1, input: "_x_x", groups: undefined]
s.match(r2) // null
r1.exec(s) // ["x", index: 1, input: "_x_x", groups: undefined]
r2.exec(s) // null

// 如果正则表达式带有g修饰符
// 则该方法与正则对象的exec方法行为不同
// exec会一次性返回所有匹配成功的结果
// 并且返回的数组没有index和input属性
var s = 'abba';
var r = /a/g;
s.match(r) // ["a", "a"]
r.exec(s) // ["a", index: 0, input: "abba", groups: undefined]

// 设置正则表达式的lastIndex属性，对match方法无效
// 匹配总是从字符串的第一个字符开始
// 设置正则对象的lastIndex属性是无效的
var r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r) // ['a', 'b']
r.lastIndex // 0
```
### （2）String.prototype.search()
字符串对象的`search`方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回`-1`。
```js
// 第一个匹配结果出现在字符串的1号位置
'_x_x'.search('x') // 1
'_x_x'.search(/x/) // 1
```

### （3）String.prototype.replace()
`replace`方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有`g`修饰符的正则表达式）。返回替换后的字符串。
```js
// 第一个参数为被替换的字符串
// 第二个参数为替换的内容
// 返回替换后的字符串
// 如果被替换的字符串找不到，返回原字符串
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace('c', 'b') // "aaa"

// 使用正则表达式作为参数
// 第一个是正则表达式
// 第二个是替换的内容
str.replace(search, replacement)

// 如果不加g修饰符，就替换第一个匹配成功的值
'aaa'.replace(/a/, 'b') // "baa"

// 如果加g修饰符，替换所有匹配成功的值。
'aaa'.replace(/a/g, 'b') // "bbb"

// replace方法消除字符串首尾两端的空格。
var str = '  #id div.class  ';
str.replace(/^\s+|\s+$/g, '') // "#id div.class"
// 相当于使用trim方法
str.trim() // "#id div.class"
```
`replace`方法的**第二个参数**可以使用美元符号`$`，用来**指代所替换的内容**。
- `$&`：匹配的子字符串。
-  $` ：匹配结果前面的文本。
- `$'`：匹配结果后面的文本。
- `$n`：匹配成功的第`n`组内容，`n`是从`1`开始的自然数。
- `$$`：指代美元符号`$`。
```js
// 第二个参数，使用$符号指代替换的内容
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1') // "world hello"
'abc'.replace('b', '[$`-$&-$\']') // "a[a-b-c]c" 
```
`replace`方法的**第二个参数**还可以是一个**函数**，**将每一个匹配内容替换为函数返回值**。
```js
// 第二个参数是函数
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;
a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// "The QUICK BROWN fox jumped over the LAZY dog."

// 替换的函数，可以接受多个参数
// 第一个参数是捕捉到的内容
// 第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）
var prices = {
  'p1': '$1.99',
  'p2': '$9.99',
  'p3': '$5.00'
};
var template = '<span id="p1"></span>'
  + '<span id="p2"></span>'
  + '<span id="p3"></span>';
// 匹配函数的作用是将价格插入模板中
template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function(match, $1, $2, $3, $4){
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
// "<span id="p1">$1.99</span><span id="p2">$9.99</span><span id="p3">$5.00</span>"
```

### （4）String.prototype.split()
`split`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。
```js
// 返回一个数组
// 第一个参数是分割的字符或者正则表达式
// 第二个参数是返回数组的最大成员数
str.split(separator, [limit])

// 非正则分隔
'a,  b,c, d'.split(',') // ["a", "  b", "c", " d"]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */) // ["a", "b", "c", "d"]

// 指定返回数组的最大成员数
'a,  b,c, d'.split(/, */, 2) // ["a", "b"]

// 分割规则是0次或多次的a，
// 第一个分隔符是aaa，第二个分割符是a，将字符串分成三个部分，包含开始处的空字符串
'aaa*a*'.split(/a*/) // ["", "*", "*"]

// 第一个分隔符是aaa，第二个分隔符是0个a（即空字符），第三个分隔符是a
// 将字符串分成四个部分。
'aaa**a*'.split(/a*/) // ["", "*", "*", "*"]

// 如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回。
// 正则表达式使用了括号，第一个组匹配是aaa，第二个组匹配是a，它们都作为数组成员返回。
'aaa*a*'.split(/(a*)/) // ["", "aaa", "*", "a", "*"]
```

## 6、字面量字符和元字符
### 字面量字符
大部分字符在正则表达式中，就是字面的含义，比如`/a/`匹配`a`，`/b/`匹配`b`。如果在正则表达式之中，某个字符只表示它字面的含义（就像前面的`a`和`b`），那么它们就叫做“**字面量字符**”（`literal characters`）
```js
// 正则表达式的dog，就是字面量字符
/dog/.test('old dog') // true
```
### 元字符
有一部分字符有特殊含义，不代表字面的意思，叫做“**元字符**”（`metacharacters`）：
- 点字符 `.`：匹配所有字符（除了回车`\r`、换行`\n`、行分隔符`\u2028`、段分隔符`\u2029`）
- 位置字符 `^`和`$`：前者表示字符串的开始位置，后者表示字符串的结束位置
- 选择符`|`：在正则表达式中表示“或关系”
- 其它：`\`、`*`、`+`、`?`、`()`、`[]`、`{}`
```js
// 点字符
// 代表一个字符
// 对于码点大于0xFFFF字符，点字符不能正确匹配，会认为这是两个字符

// c.t匹配c和t之间包含任意一个字符的情况，
// 只要这三个字符在同一行，比如cat、c2t、c-t等等，但是不匹配coot
/c.t/.test('cat') // true
/c.t/.test('coot') // false

// 位置字符
// test必须出现在开始位置
/^test/.test('test123') // true
// test必须出现在结束位置
/test$/.test('new test') // true
// 从开始位置到结束位置只有test
/^test$/.test('test') // true
/^test$/.test('test test') // false

// 选择符
// 正则表达式指定必须匹配11或22
// 多个选择符可以联合使用
/11|22/.test('911') // true
// 多个选择符可以联合使用
/fred|barney|betty/.test('barney') // true
// 选择符会包括它前后的多个字符
// 比如/ab|cd/指的是匹配ab或者cd
// a和b之间有一个空格或者一个制表符
/a( |\t)b/.test('a\tb') // true
```

## 7、转义符 \
正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。
```js
// 要匹配+，就要写成\+
// 第一个正则表达式之所以不匹配，因为加号是元字符，不代表自身
// 第二个正则表达式使用反斜杠对加号转义，就能匹配成功
/1+1/.test('1+1') // false
/1\+1/.test('1+1') // true

// 一共有`12`个字符需要反斜杠转义：
^ . [ $ ( ) | * + ? { \

// 如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。
// 下面RegExp作为构造函数，参数是一个字符串
// 但是，在字符串内部，反斜杠也是转义字符，所以它会先被反斜杠转义一次，
// 然后再被正则表达式转义一次，因此需要两个反斜杠转义
(new RegExp('1\+1')).test('1+1') // false
(new RegExp('1\\+1')).test('1+1') // true
```

## 8、特殊字符
正则表达式对一些不能打印的特殊字符，提供了表达方法：
```js
`\cX`   表示`Ctrl-[X]`，其中的`X`是`A-Z`之中任一个英文字母，用来匹配控制字符。
`[\b]`  匹配退格键(`U+0008`)，不要与`\b`混淆。
`\n`    匹配换行键。
`\r`    匹配回车键。
`\t`    匹配制表符 `tab`（`U+0009`）。
`\v`    匹配垂直制表符（`U+000B`）。
`\f`    匹配换页符（`U+000C`）。
`\0`    匹配`null`字符（`U+0000`）。
`\xhh`  匹配一个以两位十六进制数（`\x00-\xFF`）表示的字符。
`\uhhhh`匹配一个以四位十六进制数（`\u0000-\uFFFF`）表示的 `Unicode` 字符。
```

## 9、字符类
字符类（`class`）表示有一系列字符可供选择，只要匹配其中一个就可以了。
```js
// [abc]表示a、b、c之中任选一个匹配。
// 字符串hello world不包含a、b、c这三个字母中的任一个，所以返回false
// 符串apple包含字母a，所以返回true
/[abc]/.test('hello world') // false
/[abc]/.test('apple') // true
```

## 9、字符类 - 脱字符 ^
如果方括号内的第一个字符是`[^]`，则表示**除了字符类之中的字符，其他字符都可以匹配**。脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义
```js
// [^abc]表示除了a、b、c之外都可以匹配
// 字符串bbc news包含a、b、c以外的其他字符，所以返回true
// 字符串bbc不包含a、b、c以外的其他字符，所以返回false
/[^abc]/.test('bbc news') // true
/[^abc]/.test('bbc') // false

// [^] 表示匹配一切字符
// 相比之下，点号作为元字符（.）是不包括换行符的
// 字符串s含有一个换行符，点号不包括换行符，所以第一个正则表达式匹配失败
// 第二个正则表达式[^]包含一切字符，所以匹配成功
var s = 'Please yes\nmake my day!';
s.match(/yes.*day/) // null
s.match(/yes[^]*day/) 
// ["yes↵make my day", index: 7, input: "Please yes↵make my day!", groups: undefined]
```

## 10、字符类 - 连字符 -
某些情况下，对于连续序列的字符，连字符（`-`）用来提供简写形式，表示字符的连续范围。当连字号（dash）不出现在方括号之中，就不具备简写的作用，只代表字面的含义。
```js
// [abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母
// 只有当连字号用在方括号之中，才表示连续的字符序列。
/a-z/.test('b') // false
/[a-z]/.test('b') // true

// 合法的字符类简写形式
[0-9.,]
[0-9a-fA-F]
[a-zA-Z0-9-]
[1-31] // 字符类[1-31]，不代表1到31，只代表1到3。

// 连字符还可以用来指定 Unicode 字符的范围
// \u0128-\uFFFF表示匹配码点在0128到FFFF之间的所有字符。
var str = "\u0130\u0131\u0132";
/[\u0128-\uFFFF]/.test(str)

// 不要过分使用连字符，设定一个很大的范围，否则很可能选中意料之外的字符
// [A-z]表面上它是选中从大写的A到小写的z之间52个字母
// 但是由于在 ASCII 编码之中，大写字母与小写字母之间还有其他字符，结果就会出现意料之外的结果
// 由于反斜杠（'\'）的ASCII码在大写字母与小写字母之间，结果会被选中。
/[A-z]/.test('\\') // true
```

## 11、预定义模式
```js
// 预定义模式指的是某些常见模式的简写方式。
`\d` 匹配`0-9`之间的任一数字，相当于`[0-9]`。
`\D` 匹配所有`0-9`以外的字符，相当于`[^0-9]`。
`\w` 匹配任意的字母、数字和下划线，相当于`[A-Za-z0-9_]`。
`\W` 除所有字母、数字和下划线以外的字符，相当于`[^A-Za-z0-9_]`。
`\s` 匹配空格（包括换行符、制表符、空格符等），相等于`[ \t\r\n\v\f]`。
`\S` 匹配非空格的字符，相当于`[^ \t\r\n\v\f]`。
`\b` 匹配词的边界。
`\B` 匹配非词边界，即在词的内部。

// \s 空格
// \w 字母|数字|下划线
/\s\w*/.exec('hello world') // [" world", index: 5, input: "hello world", groups: undefined]

// \b 词的边界，所以world的词首必须独立，词尾是否独立未指定
/\bworld/.test('hello world') // true
/\bworld/.test('hello-world') // true
/\bworld/.test('helloworld') // false

// \B 非词的边界，world的词首不独立
/\Bworld/.test('hello-world') // false
/\Bworld/.test('helloworld') // true

// [\S\s] 一切字符
// [^] 一切字符
var html = "<b>Hello</b>\n<i>world!</i>";
/.*/.exec(html)[0] // "<b>Hello</b>"
/[\S\s]*/.exec(html)[0] // "<b>Hello</b>\n<i>world!</i>"
/[^]/.exec(html)[0] // "<b>Hello</b>\n<i>world!</i>"
```

## 12、重复类 {}
模式的精确匹配次数，使用大括号（`{}`）表示。
- `{n}`表示恰好重复`n`次
- `{n,}`表示至少重复`n`次
- `{n,m}`表示重复不少于`n`次，不多于`m`次
```js
// 第一个模式指定o连续出现2次
// 第二个模式指定o连续出现2次到5次之间
/lo{2}k/.test('look') // true
/lo{2,5}k/.test('looook') // true
```

## 13、量词符
量词符用来设定某个模式出现的次数：
- `?` 问号表示某个模式出现`0`次或`1`次，等同于`{0, 1}`。
- `*` 星号表示某个模式出现`0`次或多次，等同于`{0,}`。
- `+` 加号表示某个模式出现`1`次或多次，等同于`{1,}`。
```js
// t 出现0次或1次
/t?est/.test('test') // true
/t?est/.test('est') // true

// t 出现1次或多次
/t+est/.test('test') // true
/t+est/.test('ttest') // true
/t+est/.test('est') // false

// t 出现0次或多次
/t*est/.test('test') // true
/t*est/.test('ttest') // true
/t*est/.test('tttest') // true
/t*est/.test('est') // true
```

## 14、贪婪模式
三个量词符，默认情况下都是最大可能匹配，即匹配到下一个字符不满足匹配规则为止，这被称为**贪婪模式**。
除了贪婪模式，还有**非贪婪模式**，即最小可能匹配。只要一发现匹配，就返回结果，不要往下检查。如果想将贪婪模式改为非贪婪模式，可以**在量词符后面加一个问号**。
```js
// 贪婪模式
// 模式是/a+/，表示匹配1个a或多个a
// 因为默认是贪婪模式，会一直匹配到字符a不出现为止，所以匹配结果是3个a
var s = 'aaa';
s.match(/a+/) // ["aaa", index: 0, input: "aaa", groups: undefined]

// 非贪婪模式
// 模式结尾添加了一个问号/a+?/，改为非贪婪模式，一旦条件满足，就不再往下匹配
// +?表示只要发现一个a，就不再往下匹配了。
var s = 'aaa';
s.match(/a+?/) // ["a", index: 0, input: "aaa", groups: undefined] 
```

### 非贪婪模式
- `+?`：表示某个模式出现`1`次或多次，匹配时采用非贪婪模式。
- `*?`：表示某个模式出现`0`次或多次，匹配时采用非贪婪模式。
- `??`：表格某个模式出现`0`次或`1`次，匹配时采用非贪婪模式。
```js
'abb'.match(/ab*/) // ["abb"]
'abb'.match(/ab*?/) // ["a"]

'abb'.match(/ab?/) // ["ab"]
'abb'.match(/ab??/) // ["a"]
```
## 15、修饰符 - g
默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。`g`修饰符表示全局匹配（`global`），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。
```js
// 正则模式不含g修饰符
// 每次都是从字符串头部开始匹配
// 连续做了三次匹配，都返回true
var regex = /b/;
var str = 'abba';
regex.test(str); // true
regex.test(str); // true
regex.test(str); // true

// 正则模式含有g修饰符
// 每次都是从上一次匹配成功处，开始向后匹配
var regex = /b/g;
var str = 'abba';
regex.test(str); // true
regex.test(str); // true
regex.test(str); // false
```

## 16、修饰符 - i
默认情况下，正则对象区分字母的大小写，加上`i`修饰符以后表示**忽略大小写**（`ignoreCase`）。
```js
// 加了i修饰符以后，不考虑大小写，所以模式abc匹配字符串ABC。
/abc/.test('ABC') // false
/abc/i.test('ABC') // 
```

## 17、修饰符 - m
`m`修饰符表示多行模式（`multiline`），会修改`^`和`$`的行为。
- 默认情况下（即不加`m`修饰符时），`^`和`$`匹配字符串的开始处和结尾处，
- 加上`m`修饰符以后，`^`和`$`还会匹配行首和行尾，即`^`和`$`会识别换行符（`\n`）。
```js
// 字符串结尾处有一个换行符
// 如果不加m修饰符，匹配不成功，因为字符串的结尾不是world
// 加上以后，$可以匹配行尾
/world$/.test('hello world\n') // false
/world$/m.test('hello world\n') // true

// 匹配行首的b
// 如果不加m修饰符，就相当于b只能处在字符串的开始处。
// 加上m修饰符以后，换行符\n也会被认为是一行的开始。
/^b/m.test('a\nb')
```

## 18、组匹配 - ()
正则表达式的**括号**表示分组匹配，括号中的模式可以用来匹配分组的内容。
```js
// 第一个模式没有括号，结果+只表示重复字母d
// 第二个模式有括号，结果+就表示匹配fred这个词
/fred+/.test('fredd') // true
/(fred)+/.test('fredfred')

// 分组捕获 
// 正则表达式/(.)b(.)/一共使用两个括号
// 第一个括号捕获a，第二个括号捕获c
var m = 'abcabc'.match(/(.)b(.)/); 
// ["abc", "a", "c", index: 0, input: "abcabc", groups: undefined]

var matches = 'fredfred'.match(/(fred)+/)
matches // ["fredfred", "fred", index: 0, input: "fredfred", groups: undefined]

// 使用组匹配时，不宜同时使用g修饰符
// 否则match方法不会捕获分组的内容。
// 带g修饰符的正则表达式，结果match方法只捕获了匹配整个表达式的部分。
var m = 'abcabc'.match(/(.)b(.)/g);
m // ['abc', 'abc']

// 使用正则表达式的exec方法，配合循环，才能读到每一轮匹配的组捕获。
var str = 'abcabc';
var reg = /(.)b(.)/g;
while (true) {
  var result = reg.exec(str);
  if (!result) break;
  console.log(result);
}
// ["abc", "a", "c"]
// ["abc", "a", "c"]

// 正则表达式内部，还可以用\n引用括号匹配的内容，
// n是从1开始的自然数，表示对应顺序的括号。
// \1表示第一个括号匹配的内容（即a）
// \2表示第二个括号匹配的内容（即c）。
/(.)b(.)\1b\2/.test("abcabc") // true

/y(..)(.)\2\1/.test('yabccab') // true

// 括号还可以嵌套
// \1指向外层括号，\2指向内层括号。
/y((..)\2)\1/.test('yabababab') // true

// 组匹配非常有用，下面是一个匹配网页标签的例子。
// 圆括号匹配尖括号之中的标签，而\1就表示对应的闭合标签。
var tagName = /<([^>]+)>[^<]*<\/\1>/;
tagName.exec("<b>bold</b>")[1] // true

// 上面代码略加修改，就能捕获带有属性的标签。
// /ab*/表示如果a后面有多个b
var html = '<b class="hello">Hello</b><i>world</i>';
var tag = /<(\w)([^>]+)>(.*?)<\/\1>/g;
var match = tag.exec(html);
match[0] // "<b class="hello">Hello</b>"
match[1] // "b"
match[2] // " class="hello""
match[3] // "Hello"

match = tag.exec(html);
match[1] // "i"
match[2] // ""
match[3] // "world"
```

## 19、非捕获组 (?:x)
`(?:x)`称为非捕获组（`Non-capturing group`），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。
```js
// 一共使用了两个括号。
// 其中第一个括号是非捕获组，所以最后返回的结果中没有第一个括号，
// 只有第二个括号匹配的内容。
var m = 'abc'.match(/(?:.)b(.)/);
m // ["abc", "c", index: 0, input: "abc", groups: undefined]

// 前一个正则表达式是正常匹配，第一个括号返回网络协议；
// 后一个正则表达式是非捕获匹配，返回结果中不包括网络协议。
// 正常匹配
var url = /(http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;
url.exec('http://google.com/');
// ["http://google.com/", "http", "google.com", "/", index: 0, ...]

// 非捕获组匹配
var url = /(?:http|ftp):\/\/([^/\r\n]+)(\/[^\r\n]*)?/;
url.exec('http://google.com/');
// ["http://google.com/", "google.com", "/", index: 0, ...]
```

## 20、先行断言 x(?=y)
`x(?=y)`称为先行断言（`Positive look-ahead`），`x`只有在`y`前面才匹配，`y`不会被计入返回结果。“先行断言”中，括号里的部分是不会返回的。
```js
// 后面跟着百分号的数字
var m = '100%'.match(/\d+(?=%)/)
m // ["100", index: 0, input: "100%", groups: undefined]

// b在c前面所以被匹配，但是括号对应的c不会被返回。
var m = 'abc'.match(/b(?=c)/);
m // ["b", index: 1, input: "abc", groups: undefined]
```

## 21、先行否定断言 x(?!y)
`x(?!y)`称为先行否定断言（`Negative look-ahead`），`x`只有不在`y`前面才匹配，`y`不会被计入返回结果。“先行否定断言”中，括号里的部分是不会返回的。
```js
// 后面跟的不是百分号的数字
var m = '100dfgdfg%'.match(/\d+(?!%)/)
m // ["100", index: 0, input: "100dfgdfg%", groups: undefined]

// 只有不在小数点前面的数字才会被匹配，因此返回的结果就是14。
/\d+(?!\.)/.exec('3.14')
// ["14", index: 2, input: "3.14", groups: undefined]
```