### [babel](!https://babeljs.io/docs/en)


[babel详解-挺全](https://juejin.im/post/5a79adeef265da4e93116430)

```
babel是下一代JavaScript的语法编译器，它主要用于将ES2015+代码转化为浏览器可以识别的JavaScript，babel的主要工作：
* 转换语法
* 提供目标环境中缺少的polyfill特性（通过@babel/polyfill）
* 源码转换
* 等等
```

* Presets

```
- Presets是共享的.babel配置或者只是babel插件的一个数组
- 使用的时候需要安装对用的插件, 比如：
{
  "presets": ["es2015"]
}
需要安装babel-preset-es2015
```

* Statge-X(stage-0/1/2/3/4)

```
它是按照JavaScript的提案阶段区分的，一共有5个阶段，数字越小，阶段越往后靠，存在依赖关系，也就是说stage-0包括stage-1的，以此类推
Babel将运行的代码分为三个阶段：解析(1)、转换(2)，以及生成(3)。可以为babel添加一些插件让其去做任何事情（插件会影响Babel的第二阶段，即转换）
```

* .babelrc

```
* babel配置文件，主要是对预设(presets)和插件(plugins)进行配置
* 不同的转译器作用不同的配置项，主要分为：
1、语法转译器：对ES最新语法糖进行转译，并不负责转译js新增的api和全局对象。babel-preset-env
2、补丁转译器：babel-plugin-transform-runtime
3、jsx和flow转译器：babel-preset-react

由于配置的插件从维护到书写都极为麻烦，后来官方统一推荐使用env，代替那些单一的插件功能
* babel-plugin-transform-runtime、babel-plugin-syntax-dynamic-import可以代替单一的插件功能
{
  "plugins": [
    "syntax-dynamic-import",["transform-runtime"]
  ]
}
```


* @babel/plugin-transform-runtime

```
只对es6语法进行转换，如let/const等，而不对新的api进行转换，如include/Object.assign。如果需要转换api，需要通过使用babel-polyfill来规避兼容性问题
将babel辅助器函数搬到一个单独的模块babel-runtime中，这样能减少项目文件的大小
```

* @babel/plugin-syntax-dynamic-import

```
动态模块引入，如果配置了stage-2, 可以不用改插件，同样支持动态模块的引入
```

* env

```
需要支持的环境
```

* 基于react解析的babel解析器