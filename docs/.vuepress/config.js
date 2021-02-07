module.exports = {
  title: "zy's docs",
  description: "Welcome!",
  base: '/docs/',
  port: 8000,
  head: [
    ['limk', { rel: 'icon', href: `/logo.png`}],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#ccc' }]
  ],
  themeConfig: {
    nav: [
      {text: '高级前端', link: '/kkb/'},
      {text: '线上资源', link: '/resource/'},
      // {text: '高级前端', link: '/seniorFrontEnd/'},
      // {text: 'categories', link: '/categories/'},
      // {text: 'components', link: '/components/'},
      // {text: 'more', link: '/more/'},
      // {text: 'album', link: '/album/'},
      // {text: '图书', link: '/book/'},
      // {text: 'gk', link: '/gk/'},
      // {text: 'fdy', link: '/fdy/'},
      // {text: '前端', link: '/front/'},
      // {text: '常用-前端', link: '/often/'},
      // {text: '框架', link: '/framework/'},
      // {text: '常用-前端', link: '/often/'},
      // {text: '草稿', link: '/draf/'},
      // {text: 'math', link: '/math/'},
      // {text: 'zygh', link: '/zygh/'},
      // {text: 'zgdx', link: '/zgdx/'}
    ],
    sidebar: {
      '/kkb/': [
        {
          title: 'node.js',
          collapsable: true,
          children: [
            ['8-nodejs/1-nodejs基础', '第1节 node.js基础']
          ]
        }, 
      ],
      '/resource/': [
        {
          collapsable: false,
          children: [
            ['frontEnd', '前端资源']
          ]
        }
      ],
      '/categories/': [
        {
          title: 'html',
          collapsable: true,
          children: [
            ['html/input', 'input']
          ]
        }, 
        {
          title: 'javascript',
          collapsable: true,
          children: [
            ['javascript/DOM', 'dom'],
            ['javascript/apply-call', 'apply-call']
          ]
        }, 
        {
          title: 'css',
          collapsable: true,
          children: [
            ['css/css', 'css'],
            ['css/flex', 'flex'],
            ['css/grid', 'grid']
          ]
        },
        {
          title: 'plugins',
          collapsable: true,
          children: [
            ['plugins/axios', 'axios'],
            ['plugins/uedit', 'uedit'],
            ['plugins/webuploader', 'webuploader']
          ]
        },
        {
          title: 'node',
          collapsable: true,
          children: [
            ['node/node', 'node'],
            ['node/svg-captcha-npm', 'svg-captcha'],
            ['node/form-data-npm', 'form-data'],
            ['node/koa-multer-npm', 'koa-multer'],
            ['node/glob-npm', 'glob'],
            ['node/npm', 'npm'],
            ['node/more-module', 'more']
          ]
        },
        {
          title: 'webpack',
          collapsable: true,
          children: [
            ['webpack/webpack', 'webpack']
          ]
        },
        {
          title: 'gulp',
          collapsable: true,
          children: [
            ['gulp/gulp', 'gulp']
          ]
        },
        {
          title: 'vue',
          collapsable: true,
          children: [
            ['vue/vue-cli', 'vue-cli']
          ]
        },
        // {
        //   title: 'react',
        //   collapsable: true,
        //   children: [
        //     // ['react/demo', 'demo']
        //   ]
        // },
        {
          title: 'weixin',
          collapsable: true,
          children: [
            ['weixin/weixin', 'weixin'],
            ['weixin/framework', 'framework'],
            ['weixin/wxml', 'wxml'],
            ['weixin/wxss', 'wxss']
          ]
        },
        {
          title: 'mobile',
          collapsable: true,
          children: [
            ['mobile/fontSize', 'fontSize']
          ]
        },
        {
          title: 'tool',
          collapsable: true,
          children: [
            ['tool/vscode', 'vscode'],
            ['tool/gitKraken', 'gitKraken'],
            ['tool/Postman', 'postman'],
            ['tool/more', 'more']
          ]
        },
        {
          title: 'seo',
          collapsable: true,
          children: [
            ['seo/seo', 'seo']
          ]
        }
      ],
      '/components/': [
        {
          collapsable: false,
          children: [
            ['loading', 'loading'],
            ['form', 'form'],
            ['layout-flex', 'flex']
          ]
        }
      ]
    }
  }
}