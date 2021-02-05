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
      {text: '高级前端', link: '/seniorFrontEnd/'},
      // {text: 'categories', link: '/categories/'},
      // {text: 'components', link: '/components/'},
      // {text: 'more', link: '/more/'},
      // {text: 'album', link: '/album/'},
      // {text: '图书', link: '/book/'},
      // {text: 'gk', link: '/gk/'},
      // {text: 'fdy', link: '/fdy/'},
      {text: '前端', link: '/front/'},
      // {text: '常用-前端', link: '/often/'},
      // {text: '框架', link: '/framework/'},
      {text: '线上资源', link: '/resource/'},
      // {text: '常用-前端', link: '/often/'},
      // {text: '草稿', link: '/draf/'},
      // {text: 'math', link: '/math/'},
      // {text: 'zygh', link: '/zygh/'},
      // {text: 'zgdx', link: '/zgdx/'}
    ],
    sidebar: {
      '/seniorFrontEnd/': [
        // {
        //   title: 'web前端-第15期',
        //   collapsable: true,
        //   children: [
        //     ['web-15/01', '第一章 ECMAScript 6基础'],
        //     ['web-15/02-1', '第二章 1_面向对象基础'],
        //     ['web-15/02-2', '第二章 2_面向对象-1'],
        //     ['web-15/02-3', '第二章 3_面向对象-2'],
        //     ['web-15/02-4', '第二章 4_面向对象-3'],
        //     ['web-15/02-5', '第二章 5_面向对象-5'],
        //     ['web-15/04', '第四章 4_正则表达式'],
        //     ['web-15/05-1', '第五章 1_ES6高阶(扩展)'],
        //     ['web-15/05-2', '第五章 2_ES6高阶-异步专题'],
        //     ['web-15/05-3', '第五章 3_ES6高阶'],
        //     ['web-15/05-4', '第五章 4_Promise原理解析与实现'],
        //     ['web-15/07-1', '第七章 1_函数式编程'],
        //     ['web-15/08-1', '第八章 1_node基础'],
        //   ]
        // }
        {
          title: '第八章 node.js',
          collapsable: true,
          children: [
            ['8-nodejs/08-1','第1节 nodejs基础'],
            ['8-nodejs/08-2','第2节 koa框架'],
            // ['8-nodejs/08-3','第三节 mysql'],
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
      ],
      '/more/': [
        {
          collapsable: false
        }
      ],
      '/book/': [
        {
          title: '人物',
          collapsable: true,
          children: [
            ['persons/','推理小说家'],
            ['persons/czz','蔡志忠'],
            ['persons/lwy','林薇因'],
            ['persons/bx','冰心'],
            ['persons/lx','鲁迅'],
            ['persons/xzm','徐志摩'],
            ['persons/gmr','郭沫若'],
            ['persons/gqj','宫崎骏'],
            ['persons/dykw','东野奎吾'],
          ]
        },
        {
          title: '听书',
          collapsable: true,
          children: [
            ['listen/test', 'test']
          ]
        },
        {
          title: '文学',
          collapsable: true,
          children: [
            ['literature/writing', '写作']
          ]
        }
      ],
      '/fdy/': [
        {
          collapsable: false,
          children: [
            ['00', '00考前须知'],
            ['01', '01政策文件'],
            ['02', '02重要讲话'],
            ['03', '03最新真题'],
            ['04', '04专业知识'],
            ['05', '05案例分析'],
            ['06', '06时政及党团知识'],
            ['07', '07模拟试卷'],
            ['08', '08应用写作'],
            ['09', '09公共基础知识'],
            ['10', '10高等教育学心理学法律法规'],
            ['11', '11书籍推荐'],
            ['12', '12行测申论'],
            ['13', '13职业教育'],
            ['14', '14其他内容'],
            ['15', '15疫情应对'],
            ['16', '16中国共产党章程'],
            ['17', '17职业技能大赛']
          ]
        }
      ],
      '/gk/': [
        {
          collapsable: false,
          children: [
            ['01', '01 数量关系'],
            ['01_pratice', '01 数量关系_练习题'],
            ['02', '02 言语理解与表达'],
            ['02_pratice', '02 言语理解与表达_练习题'],
            ['03', '03 判断推理'],
            ['03_other', '03 知识储备'],
            ['03_pratice', '03 判断推理_练习题'],
            ['04', '04 资料分析'],
            ['04_pratice', '04 资料分析_练习题'],
            ['05', '05 常识判断'],
            ['05_pratice', '05 常识判断_练习题'],
            ['06', '06 结构化ms经典题型'],
            ['07', '07 行测'],
            ['08', '08 申论']
          ]
        }
      ],
      '/front/': [
        {
          collapsable: false,
          children: [
            ['css', 'css'],
            ['html', 'html'],
            ['javascript', 'javascript'],
            ['vue', 'vue'],
            ['react', 'react'],
            ['node', 'node.js'],
            ['webpack', 'webpack'],
            ['performance', 'performance'],
            ['http', 'http'],
            ['projects', 'project'],
            ['babel', 'babel'],
            ['advanced', 'advanced'],
            ['view-questions', 'view-questions']
          ]
        }
      ],
      '/often/': [
        {
          collapsable: false,
          children: [
            ['javascript', 'javascript'],
          ]
        }
      ],
      '/framework/': [
        {
          collapsable: false,
          children: [
            ['base', '基础'],
            ['vue-babel-webpack', 'vue-babel-webpack'],
            ['react-babel-webpack', 'react-babel-webpack'],
            ['wechat', 'wechat'],
          ]
        }
      ],
      '/resource/': [
        {
          collapsable: false,
          children: [
            ['frontEnd', '前端资源'],
            ['search','查找']
          ]
        }
      ],
      '/draf/': [
        {
          collapsable: false,
          children: [
            // ['songs', '一天一?首儿歌']
          ]
        }
      ],
      '/math/': [
        {
          collapsable: false,
          children: []
        }
      ],
      '/zygh/': [
        {
          collapsable: false,
          children: [
            ['gwy', 'gwy_sk'],
            ['zwb', 'zwb_sk'],
          ]
        }
      ],
      '/zgdx/': [
        {
          collapsable: false,
          children: [
            ['vue', 'vue'],
            ['javascript', 'javascript'],
            ['es6', 'es6'],
            ['html', 'html'],
            ['css', 'css'],
            ['jquery', 'jquery'],
            ['ajax', 'ajax'],
            ['http', 'http'],
            ['webpack', 'webpack'],
            ['node', 'node'],
            ['ts', 'ts'],
            ['web', 'web'],
            ['babel', 'babel'],
            ['nvm', 'nvm'],
          ]
        }
      ]
    }
  }
}