[Date对象](https://www.wangdoc.com/javascript/stdlib/date.html)
)

`Date`对象是 `JavaScript` 原生的时间库。它以国际标准时间（`UTC，Universal Time Coordinated`）`1970年1月1日00:00:00`作为时间的零点，可以表示的时间范围是前后各`1`亿天（单位为毫秒）

## 1、普通函数的用法
`Date`对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。
```js
// 返回当前时间的字符串
// 无论有没有参数，直接调用Date总是返回当前时间
Date() // "Tue May 11 2021 09:09:50 GMT+0800 (中国标准时间)"

// 即使带有参数，Date作为普通函数使用时，返回的还是当前时间
Date(2000, 1, 1) // "Tue May 11 2021 09:10:34 GMT+0800 (中国标准时间)"
```

## 2、构造函数的用法
`Date`还可以当作构造函数使用。对它使用`new`命令，会返回一个`Date`对象的实例。如果不加参数，实例代表的就是当前时间。
- `Date`对象可以接受多种格式的参数，返回一个该参数对应的时间实例。
- 参数可以是负整数，代表`1970`年元旦之前的时间。
- 只要是能被`Date.parse()`方法解析的字符串，都可以当作参数。
- 参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。
```js
// 使用new命令，返回Date对象的实例
// 不加参数，实例代表当前时间
var today = new Date();

// Date实例求值的时候，默认调用的是toString()方法
// 对Date实例求值，返回的是一个字符串，代表该实例对应的时间
// today是Date的实例，直接求值等同于调用toString方法
today // Tue May 11 2021 09:14:02 GMT+0800 (中国标准时间)
// 等同于
today.toString() // "Tue May 11 2021 09:14:02 GMT+0800 (中国标准时间)"

// 参数为时间零点开始计算的毫秒数
new Date(1378218728000) // 参数为时间零点开始计算的毫秒数

// 参数为日期字符串
new Date('January 6, 2013') // Sun Jan 06 2013 00:00:00 GMT+0800 (CST)

// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0) // Tue Jan 01 2013 00:00:00 GMT+0800 (CST)

// 多种日期字符串的写法，返回的都是同一个时间
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('February, 15, 2013')
new Date('February 15, 2013')
new Date('15 Feb 2013')
new Date('15, February, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)

// 至少需要两个参数，因为如果只使用“年”这一个参数，Date会将其解释为毫秒数。
// 2013被解释为毫秒数，而不是年份
new Date(2013) // Thu Jan 01 1970 08:00:02 GMT+0800 (中国标准时间)

// 不管有几个参数，返回的都是2013年1月1日零点
new Date(2013, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 1)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 1, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```

### 各个参数的取值范围
```js
年：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。
    如果是负数，表示公元前。
月：0 ~ 11。0表示一月，依次类推，11表示12月。
日：1 ~ 31。
小时：0 ~ 23。
分钟：0 ~ 59。
秒：0 ~ 59
毫秒：0 ~ 999。

// 这些参数如果超出了正常范围，会被自动折算
// 比如，如果月设为15，就折算为下一年的4月。
// 日期设为0，就代表上个月的最后一天
new Date(2013, 15)
// Tue Apr 01 2014 00:00:00 GMT+0800 (CST)
new Date(2013, 0, 0)
// Mon Dec 31 2012 00:00:00 GMT+0800 (CST)

// 参数还可以使用负数，表示扣去的时间
// 分别对月和日使用了负数，表示从基准日扣去相应的时间
new Date(2013, -1)
// Sat Dec 01 2012 00:00:00 GMT+0800 (CST)
new Date(2013, 0, -1)
// Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
```

## 3、日期的运算
类型自动转换时，`Date`实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。
- 两个日期实例对象进行**减法运算**时，返回的是它们**间隔的毫秒数**
- 进行**加法运算**时，返回的是**两个字符串连接而成的新字符串**
```js
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);
d2 - d1 // 2678400000
d2 + d1 // "Sat Apr 01 2000 00:00:00 GMT+0800 (中国标准时间)Wed Mar 01 2000 00:00:00 GMT+0800 (中国标准时间)"
```

## 4、Date.now()
```js
// 返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数
// 相当于 Unix 时间戳乘以1000
Date.now() // 1620697105805
```

## 5、Date.parse()
`Date.parse`方法用来**解析日期字符串**，返回该时间距离时间零点（`1970年1月1日 00:00:00`）的毫秒数。
- 日期字符串应该符合 `RFC 2822` 和 `ISO 8061` 这两个标准，即`YYYY-MM-DDTHH:mm:ss.sssZ`格式，其中最后的`Z`表示时区。
- 如果解析失败，返回`NaN`
```js
// 其他格式也可以被解析，下面日期字符串都可以解析
Date.parse('Aug 9, 1995')
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
Date.parse('2011-10-10')
Date.parse('2011-10-10T14:48:00') 

Date.parse('xxx') // NaN
```

## 6、Date.UTC()
`Date.UTC`方法接受年、月、日等变量作为参数，返回该时间距离时间零点（`1970年1月1日 00:00:00 UTC`）的毫秒数。
```js
// 该方法的参数用法与Date构造函数完全一致
// 比如月从0开始计算，日期从1开始计算
// 区别在于Date.UTC方法的参数，会被解释为 UTC 时间（世界标准时间）
// Date构造函数的参数会被解释为当前时区的时间
// 格式
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])

// 用法
Date.UTC(2011, 0, 1, 2, 3, 4, 567) // 1293847384567
```

## 7、Date.prototype.valueOf()

`valueOf`方法返回实例对象距离时间零点（`1970年1月1日00:00:00 UTC`）对应的毫秒数，该方法等同于`getTime`方法。
```js
var d = new Date();
d.valueOf() // 1362790014817
d.getTime() // 1362790014817

// 预期为数值的场合，Date实例会自动调用该方法，所以可以用下面的方法计算时间的间隔。
var start = new Date();
// ...
var end = new Date();
var elapsed = end - start;
```

## 8、Date.prototype.toString()
```js
// toString方法返回一个完整的日期字符串。
// 因为toString是默认的调用方法，所以如果直接读取Date实例，就相当于调用这个方法。
var d = new Date(2013, 0, 1);
d.toString() // "Tue Jan 01 2013 00:00:00 GMT+0800 (中国标准时间)"
d // Tue Jan 01 2013 00:00:00 GMT+0800 (中国标准时间)
```

## 9、Date.prototype.toUTCString()
```js
// toUTCString方法返回对应的 UTC 时间，也就是比北京时间晚8个小时。
var d = new Date(2013, 0, 1);
d.toUTCString() // "Mon, 31 Dec 2012 16:00:00 GMT"
```

## 10、Date.prototype.toISOString()
```js
// toISOString方法返回对应时间的 ISO8601 写法。
// toISOString方法返回的总是 UTC 时区的时间。
var d = new Date(2013, 0, 1);
d.toISOString() // "2012-12-31T16:00:00.000Z"
```

## 11、Date.prototype.toJSON()
```js
// toJSON方法返回一个符合 JSON 格式的 ISO 日期字符串，
// 与toISOString方法的返回结果完全相同。
var d = new Date(2013, 0, 1);
d.toJSON() // "2012-12-31T16:00:00.000Z"
```

## 12、Date.prototype.toDateString()
```js
// toDateString方法返回日期字符串（不含小时、分和秒）。
var d = new Date(2013, 0, 1);
d.toDateString() // "Tue Jan 01 2013"
```

## 13、Date.prototype.toTimeString()
```js
// toTimeString方法返回时间字符串（不含年月日）。
var d = new Date(2013, 0, 1);
d.toTimeString() // "00:00:00 GMT+0800 (中国标准时间)"

// 有两个可选的参数
dateObj.toLocaleString([locales[, options]])
```
## 14、Date.prototype.toLocaleString()
```js
// 完整的本地时间
var d = new Date(2013, 0, 1);
d.toLocaleString() // "2013/1/1 上午12:00:00"

// 有两个可选的参数
// locales是一个指定所用语言的字符串
// options是一个配置对象
dateObj.toLocaleString([locales[, options]])

// 分别采用en-US和zh-CN语言设定
var d = new Date(2013, 0, 1);
d.toLocaleString('en-US') // "1/1/2013, 12:00:00 AM"
d.toLocaleString('zh-CN') // "2013/1/1 上午12:00:00"

// options配置对象有以下属性。
`dateStyle`：可能的值为full、long、medium、short。
`timeStyle`：可能的值为full、long、medium、short。
`month`：可能的值为numeric、2-digit、long、short、narrow。
`year`：可能的值为numeric、2-digit。
`weekday`：可能的值为long、short、narrow。
`day、hour、minute、second`：可能的值为numeric、2-digit。
`timeZone`：可能的值为 IANA 的时区数据库。
`timeZooneName`：可能的值为long、short。
`hour12`：24小时周期还是12小时周期，可能的值为true、false
```

## 15、Date.prototype.toLocaleDateString()
```js
// 本地日期（不含小时、分和秒）
var d = new Date(2013, 0, 1);
d.toLocaleDateString() // "2013/1/1"

// 有两个可选的参数
dateObj.toLocaleDateString([locales[, options]])
d.toLocaleDateString('en-US') // "1/1/2013"
d.toLocaleDateString('zh-CN') // "2013/1/1"

// options配置对象
var d = new Date(2013, 0, 1);
d.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
// "Tuesday, January 1, 2013"

d.toLocaleDateString('en-US', {
  day: "2-digit",
  month: "long",
  year: "2-digit"
});
// "January 01, 13"
```

## 16、Date.prototype.toLocaleTimeString()
```js
// 本地时间（不含年月日）
var d = new Date(2013, 0, 1);
d.toLocaleTimeString() // "上午12:00:00"

// 有两个可选的参数
dateObj.toLocaleTimeString([locales[, options]])
d.toLocaleTimeString('en-US') // "12:00:00 AM"
d.toLocaleTimeString('zh-CN') // "上午12:00:00"

// options配置对象
var d = new Date(2013, 0, 1);
d.toLocaleTimeString('en-US', {
  timeZone: 'UTC',
  timeZoneName: 'short'
})
// "4:00:00 PM UTC"

d.toLocaleTimeString('en-US', {
  timeZone: 'Asia/Shanghai',
  timeZoneName: 'long'
})
// "12:00:00 AM China Standard Time"

d.toLocaleTimeString('en-US', {
  hour12: false
})
// "00:00:00"

d.toLocaleTimeString('en-US', {
  hour12: true
})
// "12:00:00 AM"
```

## 17、get类方法
```js
// Date对象提供了一系列get*方法，用来获取实例对象某个方面的值。
getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
getDate()：返回实例对象对应每个月的几号（从1开始）。
getDay()：返回星期几，星期日为0，星期一为1，以此类推。
getFullYear()：返回四位的年份。
getMonth()：返回月份（0表示1月，11表示12月）。
getHours()：返回小时（0-23）。
getMilliseconds()：返回毫秒（0-999）。
getMinutes()：返回分钟（0-59）。
getSeconds()：返回秒（0-59）。
getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。
// 所有这些get*方法返回的都是整数，不同方法返回值的范围不一样。
`分钟和秒`：0 ~ 59
`小时`：0 ~ 23
`星期`：0（星期天）~ 6（星期六）
`日期`：1 ~ 31
`月份`：0（一月）~ 11（十二月）

// 最后一行返回-480，即 UTC 时间减去当前时间，单位是分钟



var d = new Date('January 6, 2013');
d.getDate() // 6
d.getMonth() // 0
d.getFullYear() // 2013
d.getTimezoneOffset() // -480
```