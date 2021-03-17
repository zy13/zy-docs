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
      {
        text: '全栈进阶',
        link: '/full-stack/'
      },
      {
        text: '算法',
        link: '/algorithm/'
      },
      {
        text: 'JavaScript深入简出',
        link: '/javascript/'
      },
      // {text: 'categories', link: '/categories/'},
      // {text: 'components', link: '/components/'},
    ],
    sidebar: {
      '/kkb/': [{
          title: '第一章 ECMAScript6基础',
          collapsable: true,
          children: [
            ['1-ECMAScript6/1-es6', 'ECMAScript6基础']
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
            ['4-reg-exp/reg-exp.md', '正则表达式']
          ]
        },
        {
          title: '第五章 es6高阶',
          collapsable: true,
          children: [
            ['5-es6-higher/1-async.md', '第1节 异步专题'],
            ['5-es6-higher/2-data-responsive.md', '第2节 数据响应式'],
            ['5-es6-higher/3-promise.md', '第3节 Promise原理'],
          ]
        },
        {
          title: '第六章 git',
          collapsable: true,
          children: [
            ['6-git/1-base', '第1节 git基础']
          ]
        },
        {
          title: '第八章 node.js',
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
          ]
        },
        {
          title: '第十二章 Typescript',
          collapsable: true,
          children: [
            ['12-typescript/ts.md', 'Typescript'],
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
          ]
        },
      ],
      '/resource/': [{
        collapsable: false,
        children: [
          ['frontEnd', '前端资源']
        ]
      }],
      '/full-stack': [],
      '/algorithm': [],
      '/javascript': []
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