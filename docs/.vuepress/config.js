module.exports = {
  title: "zy's docs",
  description: "Welcome!",
  base: '/docs/',
  port: 9000,
  head: [
    ['limk', { rel: 'icon', href: `/logo.png`}],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#ccc' }]
  ],
  themeConfig: {
    nav: [
      {
        text: 'classify',
        link: '/classify/'
      },
      {
        text: 'components',
        link: '/components/'
      },
      {
        text: 'more',
        link: '/more/'
      }
    ],
    sidebar: {
      '/classify/': [
        {
          title: 'javascript',
          collapsable: true,
          children: [
            // ['javascript/a', 'a'],
            // ['javascript/b', 'b']
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
            ['node/core-modules', 'core-modules'],
            ['node/svg-captcha-npm', 'svg-captcha'],
            ['node/form-data-npm', 'form-data'],
            ['node/koa-multer-npm', 'koa-multer'],
            ['node/glob-npm', 'glob']
          ]
        },
        {
          title: 'webpack',
          collapsable: true,
          children: [
            // ['webpack/demo', 'demo']
          ]
        },
        {
          title: 'vue',
          collapsable: true,
          children: [
            // ['vue/demo', 'demo']
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
            // ['tool/demo', 'demo']
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
      '/more/': [
        {
          collapsable: false
        }
      ]
    }
  }
}