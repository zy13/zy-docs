module.exports = {
  title: "zy's note",
  description: "Welcome to zyuan's site",
  port: 9001,
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
          title: '分类',
          collapsable: false,
          children: [
            '',
            'javascript/',
            'plugins/'
          ]
        }
      ],
      '/components/': [
        {
          title: '常用组件',
          collapsable: false,
          children: [
            '',
            ['loading', 'loading'],
            ['form', 'form']
          ]
        }
      ]
    }
  }
}