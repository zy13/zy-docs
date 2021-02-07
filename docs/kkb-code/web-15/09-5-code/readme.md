<!-- 模块方式组织 
使用的是打包后的代码 -->
axios学习笔记

- 基于Promise的HTTP客户端，用于发送请求的请求库，既可运行于浏览器端也可运行在node端

  - 浏览器：XMLHttpRequest
  - node端：http请求
  - 使用Promise对整个库进行封装

axios的几个核心点
axios是Axios类的实例：
- axios => instance => Axios(构造函数/类)

- Axios
  - defaults（默认配置）
  - interceptor（拦截器）
    - request: 一个函数数组
    - response: 一个函数数组
  - request：请求方法



  - axios用法


  axios.default.headers.common

  axios({

  })

  axios.create({

  })



