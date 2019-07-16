<template>
  <div>
    <van-tabbar :value="active" :fixed="true" :border="false" :safe-area-inset-bottom="true" :z-index="999">
      <van-tabbar-item @click="go('/')" icon="home-o">
        行情
      </van-tabbar-item>
      <van-tabbar-item @click="go('/trade')" icon="search">
        币币
      </van-tabbar-item>
      <van-tabbar-item @click="go('/wallet')" icon="discount">
        钱包
      </van-tabbar-item>
      <van-tabbar-item @click="go('/otc')" icon="friends-o">
        合约
      </van-tabbar-item>
      <van-tabbar-item @click="go('/about')" icon="setting-o">
        关于
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    computed: {
      active() {
        let arr = ['home', 'trade', 'wallet', 'otc', 'about']
        return arr.indexOf(this.$route.name)
      },
    },
    methods: {
      /**
       * 路由跳转
       *
       * @copyright 问鼎公司     版权所有
       * @author Wending <postmaster@g000.cn>
       * @param     {[type]} name [description]
       * @return    {[type]}      [description]
       */
      async go(name) {
        this.$router.push({
          path: name
        })
      }
    },
  }
</script>