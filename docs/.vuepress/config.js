module.exports = {
  title: "zy's note",
  description: "Welcome to zyuan's site",
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
        text: 'Home',
        link: '/'
      },
      {
        text: '分类',
        link: '/classify/'
      },
      {
        text: '常用组件',
        link: '/components/'
      }
    ],
    sidebar: {
      '/classify/': [
        {
          title: 'lately',
          collapsable: true,
          children: [
            ['lately/', 'lately']
          ]
        },
        {
          title: 'javascript',
          collapsable: true,
          children: [
            ['javascript/a', 'a'],
            ['javascript/b', 'b']
          ]
        }, 
        {
          title: 'html',
          collapsable: true,
          children: [
            ['html/a', 'a']
          ]
        },
        {
          title: 'css',
          collapsable: true,
          children: []
        },
        {
          title: 'plugins',
          collapsable: true,
          children: [
            ['plugins/axios', 'axios'],
            ['plugins/webuploader', 'webuploader'],
            ['plugins/uedit', 'uedit']
          ]
        },
        {
          title: 'regexp',
          collapsable: true,
          children: [
            ['regexp/a', 'a']
          ]
        },
        {
          title: 'node',
          collapsable: true,
          children: [
            ['node/demo', 'demo']
          ]
        },
        {
          title: 'webpack',
          collapsable: true,
          children: [
            ['webpack/demo', 'demo']
          ]
        },
        {
          title: 'tool',
          collapsable: true,
          children: [
            ['tool/demo', 'demo']
          ]
        },
        {
          title: 'vue',
          collapsable: true,
          children: [
            ['vue/demo', 'demo']
          ]
        },
        {
          title: 'react',
          collapsable: true,
          children: [
            ['react/demo', 'demo']
          ]
        }
      ],
      '/components/': [
        {
          title: '常用组件',
          collapsable: false,
          children: [
            ['loading', 'loading'],
            ['form', 'form']
          ]
        }
      ]
    }
  }
}