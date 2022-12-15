const { path } = require('@vuepress/utils')

module.exports = {
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }]
  ],

  lang: 'zh-CN',
  title: '兔子不咬人',
  description: '我的个人空间',
  // 主题
  theme: path.resolve(__dirname, './.vuepress/theme'),
  themeConfig: {
    logo: '/images/home_bug.svg',
    navbar: [
      { text: '技术笔记', link: '/notes' },
      {
        text: '实验室',
        children: [
           { text: 'CSS Flex 布局', link: '/lab/css_layout_flexbox' },
           { text: 'CSS Grid 布局', link: '/lab/css_layout_grid' },
           { text: 'Web 特效演示', link: '/lab/web-demo' },
        ],
      },
      {
        text: '常用链接',
        children: [
          { text: '代码执行过程可视化', link: 'https://pythontutor.com/visualize.html#mode=edit' },
          { text: 'latex 公式编辑器', link: 'https://latex.codecogs.com/' },
          { text: 'ascii 流程图', link: 'https://asciiflow.com/#/' },
          { text: 'ascii art 生成', link: 'http://patorjk.com/software/taag' },
        ],
      },
    ],
    repo: 'https://github.com/ssbunny',
    
    editLink: false,
    tip: '提示',
    warning: '注意',
    danger: '警告',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',
    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
  }
}