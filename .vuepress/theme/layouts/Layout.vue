<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>

<template>
  <ParentLayout>

  </ParentLayout>
</template>

<script>
export default {
  mounted () {
    const leaving = [
      '咋还走了呢？', 
      '你快回来呀！', 
      '田园将芜，胡不归？',
      '轻轻地你走了',
      '君问归期未有期，巴山夜雨涨秋池',
      '小样，我看你往哪里跑',
      '< (｀^′) >'
    ]
    document.addEventListener('visibilitychange', event => {
      if (document.visibilityState === 'hidden') {
        window._cuurentTitle = document.title
        let index = Math.floor((Math.random() * leaving.length))
        document.title = leaving[index]
      } else {
        document.title = window._cuurentTitle
      }
    })
  }
}
</script>

<style>
html.dark body {

}
</style>