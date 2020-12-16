>Babel是一个广泛使用的ES6转码器

[Babel](https://babeljs.io/)
[Babel中文网](https://www.babeljs.cn/)
[babel的使用](http://caibaojian.com/es6/)

* 配置文件.babelrc
>Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。
>该文件用来设置转码规则和插件，基本格式如下。

```js
{
  "presets": [],
  "plugins": []
}
```

>presets字段设定转码规则

```js
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3

```