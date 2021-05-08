module.exports = {
  title: "zy's docs",
  description: "Welcome!",
  base: '/docs/',
  port: 8000,
  head: [
    ['limk', {
      rel: 'icon',
      href: `/logo.png`
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#ccc'
    }]
  ],
  themeConfig: {
    nav: [{
        text: '高级前端',
        link: '/kkb/'
      },
      {
        text: '前端资源',
        link: '/resource/'
      },
      // {
      //   text: '全栈进阶',
      //   link: '/full-stack/'
      // },
      // {
      //   text: '算法',
      //   link: '/algorithm/'
      // },
      {
        text: 'JavaScript深入简出',
        link: '/javascript/'
      },
      {
        text: 'JavaScript教程-网道',
        link: '/javascript-wd/'
      },
      {
        text: 'HTTP权威指南',
        link: '/http/'
      },
      // {text: 'categories', link: '/categories/'},
      // {text: 'components', link: '/components/'},
    ],
    sidebar: {
      '/kkb/': [{
          title: '第一章 ECMAScript6基础',
          collapsable: true,
          children: [
            ['1-ECMAScript6/1-es6-base.md', '第1节 ECMAScript6基础']
          ]
        },
        {
          title: '第二章 面向对象编程',
          collapsable: true,
          children: [
            ['2-object-oriented/1-object.md', '第1节 对象、构造函数、原型-ES5'],
            ['2-object-oriented/2-object.md', '第2节 类及其继承、模块化-ES6'],
            ['2-object-oriented/3-design-mode.md', '第3节 设计模式'],
            ['2-object-oriented/4-components.md', '第4节 组件'],
            ['2-object-oriented/5-jquery.md', '第5节 jquery插件'],
          ]
        },
        {
          title: '第四章 正则表达式',
          collapsable: true,
          children: [
            // ['4-reg-exp/reg-exp.md', '正则表达式']
          ]
        },
        {
          title: '第五章 ES6高阶函数',
          collapsable: true,
          children: [
            ['5-es6-higher/1-async.md', '第1节 异步专题'],
            ['5-es6-higher/2-data.md', '第2节 数据响应式原理'],
            ['5-es6-higher/3-promise.md', '第3节 Promise原理'],
          ]
        },
        {
          title: '第六章 Git',
          collapsable: true,
          // children: [
          //   ['6-git/1-base', '第1节 git基础']
          // ]
        },
        {
          title: '第七章 函数式编程',
          collapsable: true,
          children: [
            // ['7-function-coding/1-base', '第1节 git基础']
          ]
        },
        {
          title: '第八章 Node.js',
          collapsable: true,
          children: [
            ['8-nodejs/1-webServer', '第1节 搭建webServer'],
            ['8-nodejs/2-koa', '第2节 koa框架'],
            ['8-nodejs/3-mysql', '第3节 koa连接mysql'],
            ['8-nodejs/4-authorization', '第4节 文件上传与用户鉴权'],
          ]
        },
        {
          title: '第九章 前后端交互',
          collapsable: true,
          children: [
            ['9-ajax/1-ajax.md', '第1节 ajax之XMLHttpRequest和Fetch'],
            ['9-ajax/2-cors-jwt.md', '第2节 ajax跨域和jwt'],
            ['9-ajax/3-axios.md', '第3节 axios.js库'],
            ['9-ajax/4-websocket.md', '第4节 websocket实现即时聊天系统'],
          ]
        },
        {
          title: '第十章 客户端存储',
          collapsable: true,
          children: [
            ['10-client-store/client-store.md', '客户端存储']
          ]
        },
        {
          title: '第十一章 webpack',
          collapsable: true,
          children: [
            ['11-webpack/1-modules.md', '第1节 模块化'],
            ['11-webpack/2-webpack-base.md', '第2节 webpack核心配置'],
            ['11-webpack/3-webpack-plugins.md', '第3节 webpack之pugins配置'],
            ['11-webpack/problems.md', 'Webpack 问题集锦'],
          ]
        },
        {
          title: '第十二章 TypeScript',
          collapsable: true,
          children: [
            // ['12-typescript/ts.md', 'Typescript'],
          ]
        },
        {
          title: '第十三章 Vue',
          collapsable: true,
          children: [
            ['13-vue/1-vue2.x-1.md', '第1节 vue基础'],
            ['13-vue/2-components-lifecycle.md', '第2节 组件基础-生命周期'],
            ['13-vue/3-vueCli-SFC-CT.md', '第3节 vue-cli-单文件组件-组件测试'],
            ['13-vue/4-vue-router.md', '第4节 vue-router'],
            ['13-vue/5-vuex.md', '第5节 vuex'],
            ['13-vue/6-project-vue-vueRouter-vuex.md', '第6节 项目应用-vue-vuerouter-vuex'],
            ['13-vue/7-vue3.x.md', '第7节 vue3.x基础'],
            ['13-vue/problems.md', 'vue 问题集锦'],
          ]
        },
        {
          title: '第十四章 React',
          collapsable: true,
          children: [
            ['14-react/1-react-base.md', '第1节 react基础-1'],
            ['14-react/2-component-lifecycle.md', '第2节 组件通信和生命周'],
            ['14-react/3-react-base.md', '第3节 react基础-2'],
          ]
        },
      ],
      '/resource/': [{
        collapsable: false,
        children: [
          // ['1-projects','一、项目'],
          ['http', '☆-HTTP协议'],
          ['cache', '☆-HTTP缓存体系'],
          ['css','☆-CSS&HTML'],
          ['javascript','☆-JavaScript'],
          ['react','☆-react'],
          ['vue','☆-vue'],
          ['bs','☆-浏览器'],
          ['http-1','☆-http'],
          ['coding','☆-手撕代码'],
          // ['frontEnd', '1、前端资源'],
          // ['browser', '2、浏览器相关'],
          // ['javascript', '3、javascript相关'],
          // ['code', '4、手撕代码'],
          // ['http', '5、http相关'],
          // ['www','6、网络资源'],
          // ['tikTop.md','7、字节跳动'],
        ]
      }],
      '/full-stack': [],
      '/algorithm': [],
      '/javascript-wd/': [
        {
          title: '第一章 数据类型',
          collapsable: true,
          children: [
            ['1-ES5/1-datatype.md','第一节 JavaScript 的基本语法'],
            ['1-ES5/2-intro.md','第二节 数据类型概述'],
            ['1-ES5/3-null-undefined-boolean.md', '第三节 null, undefined 和 boolean'],
            ['1-ES5/4-number.md', '第四节 number 数值'],
            ['1-ES5/5-string.md', '第五节 string 字符串'],
            ['1-ES5/6-object.md', '第六节 object 对象'],
            ['1-ES5/7-function.md', '第七节 function 函数'],
            ['1-ES5/8-array.md', '第八节 array 数组'],
          ]
        },
        {
          title: '第二章 运算符',
          collapsable: true,
          children: [
            ['2-operator/1-algorism.md','第一节 算术运算符'],
            ['2-operator/2-comparison.md','第二节 比较运算符'],
            ['2-operator/3-boolean.md','第三节 布尔运算符'],
            ['2-operator/4-binary.md','第四节 二进制位运算符'],
            ['2-operator/5-other.md','第五节 其它运算符，运算顺序'],
          ]
        },
        {
          title: '第三章 语法专题',
          collapsable: true,
          children: [
            ['3-syntax/1-type-toggle.md','第一节 数据类型的转换 - ♥'],
            ['3-syntax/2-error.md','第二节 错误处理机制'],
            ['3-syntax/3-coding-style.md','第三节 编程风格'],
            ['3-syntax/4-console.md','第四节 console 对象与控制台'],
          ]
        },
        {
          title: '第四章 标准库',
          collapsable: true,
          children: [
            ['4-standard/1-object.md','第一节 Object对象'],
            ['4-standard/2-object.md','第二节 属性描述对象'],
            ['4-standard/3-array.md','第三节 Array对象'],
            ['4-standard/4-packing.md','第四节 包装对象'],
          ]
        },
        {
          title: '事件',
          collapsable: true,
          children: [
            ['events/1-EventTarget.md', '第1节 EventTarget 接口']
          ]
        },
        {
          title: '浏览器模型',
          collapsable: true,
          children: [
            ['BOM/1-intro.md', '第1节 浏览器模型概述 - ♥'],
            ['BOM/2-window.md', '第2节 window对象 - ♥'],
            ['BOM/3-ns.md', '第3节 Navigator 对象，Screen 对象'],
            ['BOM/4-cookie.md', '第4节 Cookie  - ♥'],
            ['BOM/5-xhr.md', '第5节 XMLHttpRequest 对象 - ♥'],
            ['BOM/6-corsl.md', '第6节 同源限制 - 跨域解决方案汇总 - ♥'],
            ['BOM/7-cors.md', '第7节 CORS 通信 - 根本解决方法 - ♥'],
            ['BOM/8-storage.md', '第8节 Storage 接口 - ♥'],
            ['BOM/9-history.md', '第9节 History 对象'],
            ['BOM/10-luu.md', '第10节 Location 对象，URL 对象，URLSearchParams 对象'],
            ['BOM/11-ab.md', '第11节 ArrayBuffer 对象，Blob 对象'],
            ['BOM/12-fff.md', '第12节 File 对象，FileList 对象，FileReader 对象 - ♥'],
            ['BOM/13-fd.md', '第13节 表单，FormData 对象 - ♥'],
            ['BOM/14-IndexedDB.md', '第14节 IndexedDB API'],
            ['BOM/15-webWorker.md', '第15节 Web Worker'],
            ['BOM/16-code.md', '第16节 手撕代码  - ♥'],
          ]
        }
      ],
      '/http/': [
        {
          title: '第一章 HTTP 概述',
          collapsable: true,
          children: [
            ['1-web-base/1-http-intro.md','第1节 HTTP - 因特网的多媒体信使'],
            // ['2-http-struct']
          ]
        }
      ],
      // '/categories/': [
      //   {
      //     title: 'html',
      //     collapsable: true,
      //     children: [
      //       ['html/input', 'input']
      //     ]
      //   }, 
      //   {
      //     title: 'javascript',
      //     collapsable: true,
      //     children: [
      //       ['javascript/DOM', 'dom'],
      //       ['javascript/apply-call', 'apply-call']
      //     ]
      //   }, 
      //   {
      //     title: 'css',
      //     collapsable: true,
      //     children: [
      //       ['css/css', 'css'],
      //       ['css/flex', 'flex'],
      //       ['css/grid', 'grid']
      //     ]
      //   },
      //   {
      //     title: 'plugins',
      //     collapsable: true,
      //     children: [
      //       ['plugins/axios', 'axios'],
      //       ['plugins/uedit', 'uedit'],
      //       ['plugins/webuploader', 'webuploader']
      //     ]
      //   },
      //   {
      //     title: 'node',
      //     collapsable: true,
      //     children: [
      //       ['node/node', 'node'],
      //       ['node/svg-captcha-npm', 'svg-captcha'],
      //       ['node/form-data-npm', 'form-data'],
      //       ['node/koa-multer-npm', 'koa-multer'],
      //       ['node/glob-npm', 'glob'],
      //       ['node/npm', 'npm'],
      //       ['node/more-module', 'more']
      //     ]
      //   },
      //   {
      //     title: 'webpack',
      //     collapsable: true,
      //     children: [
      //       ['webpack/webpack', 'webpack']
      //     ]
      //   },
      //   {
      //     title: 'gulp',
      //     collapsable: true,
      //     children: [
      //       ['gulp/gulp', 'gulp']
      //     ]
      //   },
      //   {
      //     title: 'vue',
      //     collapsable: true,
      //     children: [
      //       ['vue/vue-cli', 'vue-cli']
      //     ]
      //   },
      //   // {
      //   //   title: 'react',
      //   //   collapsable: true,
      //   //   children: [
      //   //     // ['react/demo', 'demo']
      //   //   ]
      //   // },
      //   {
      //     title: 'weixin',
      //     collapsable: true,
      //     children: [
      //       ['weixin/weixin', 'weixin'],
      //       ['weixin/framework', 'framework'],
      //       ['weixin/wxml', 'wxml'],
      //       ['weixin/wxss', 'wxss']
      //     ]
      //   },
      //   {
      //     title: 'mobile',
      //     collapsable: true,
      //     children: [
      //       ['mobile/fontSize', 'fontSize']
      //     ]
      //   },
      //   {
      //     title: 'tool',
      //     collapsable: true,
      //     children: [
      //       ['tool/vscode', 'vscode'],
      //       ['tool/gitKraken', 'gitKraken'],
      //       ['tool/Postman', 'postman'],
      //       ['tool/more', 'more']
      //     ]
      //   },
      //   {
      //     title: 'seo',
      //     collapsable: true,
      //     children: [
      //       ['seo/seo', 'seo']
      //     ]
      //   }
      // ],
      // '/components/': [
      //   {
      //     collapsable: false,
      //     children: [
      //       ['loading', 'loading'],
      //       ['form', 'form'],
      //       ['layout-flex', 'flex']
      //     ]
      //   }
      // ]
    }
  }
}