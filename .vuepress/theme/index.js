const { path } = require('@vuepress/utils')

module.exports = {
  name: 'vuepress-theme-ssbunny',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}