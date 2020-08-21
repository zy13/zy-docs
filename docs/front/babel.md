[babel中文网](https://www.babeljs.cn/)

## Babel

babel是一个JavaScript编译器，主要将ECMAScript2015+版本的代码转换为浏览器可以识别的JavaScript代码。Babel主要任务：

* 语法转换
* 通过Polyfill方式在目标环境中添加缺失的特性（通过`@babel/polyfill`模块）
* 源码转换
* 更多！

**预设（preset）**

插件：`@babel/preset-env`允许使用最新版本的ES，无需转换目标环境需要的语法。
```bash
# 安装
npm i @babel/preset-env --save-dev

# 注意
# @babel/preset-env不支持staget-x插件

# .babelrc
{
  "preset" : [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}

```

## Babel转换ES2015+


## Babel转换JSX语法