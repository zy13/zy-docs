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
      {
        text: 'categories',
        link: '/categories/'
      },
      {
        text: 'components',
        link: '/components/'
      },
      {
        text: 'more',
        link: '/more/'
      },
      {
        text: 'album',
        link: '/album/'
      }
    ],
    sidebar: {
      '/categories/': [
        {
          title: 'javascript',
          collapsable: true,
          children: [
            ['javascript/DOM', 'dom']
          ]
        }, 
        {
          title: 'html',
          collapsable: true,
          children: [
            // ['html/a', 'a']
          ]
        },
        {
          title: 'css',
          collapsable: true,
          children: [
            ['css/css', 'css'],
            ['css/flex', 'flex']
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
          title: 'vue',
          collapsable: true,
          children: [
            ['vue/vue-cli', 'vue-cli']
          ]
        },
        {
          title: 'react',
          collapsable: true,
          children: [
            // ['react/demo', 'demo']
          ]
        },
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
          title: 'mongodb',
          collapsable: true,
          children: [
            // ['weixin/mongodb', 'mongodb']
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
      ],
      '/album/': [
        {
          collapsable: false,
          children: [
            ['person', 'person']
          ]
        }
      ],
      '/more/': [
        {
          collapsable: false
        }
      ]
    }
  }
}