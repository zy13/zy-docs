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
      }
    ],
    sidebar: {
      '/classify/': [
        '',
        ['javascript/', 'javascript'],
        ['html/', 'html'],
        ['css/', 'css']
      ],
      '/guid/': [
        {
          title: '',
          collapsable: false,
          children: [
            ['a/', 'a']
          ]
        }
      ]
    }
  }
}