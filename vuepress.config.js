
module.exports = {
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }]
  ],

  lang: 'zh-CN',
  title: '兔子不咬人',
  description: '对内消除傲慢，对外消除偏见。',
  // 主题
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/home_bug.svg',
    navbar: [
      {
        text: 'Foo',
        link: '/foo/',
      },
      {
        text: '默认主题',
        children: [
           {
            text: 'Foo',
            link: '/foo/',
          },
        ],
      },
    ],
    repo: 'https://github.com/ssbunny',

    // tip: '提示',
    // warning: '注意',
    // danger: '警告',
    // notFound: [
    //   '这里什么都没有',
    //   '我们怎么到这来了？',
    //   '这是一个 404 页面',
    //   '看起来我们进入了错误的链接',
    // ],
    // backToHome: '返回首页',
    // openInNewWindow: '在新窗口打开',
    // toggleDarkMode: '切换夜间模式',
    // toggleSidebar: '切换侧边栏',
  }
}