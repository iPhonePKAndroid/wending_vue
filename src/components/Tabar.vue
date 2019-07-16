<template>
  <div class="tabar">
    <van-tabbar :value="active" :fixed="true" :border="false" :safe-area-inset-bottom="true" :z-index="999">
      <van-tabbar-item @click="go('/wallet')" icon="ecard-pay">
        钱包
      </van-tabbar-item>
      <van-tabbar-item @click="go('/trade')" icon="cash-back-record">
        交易
      </van-tabbar-item>
      <van-tabbar-item @click="go('/find')" icon="friends-o">
        发现
      </van-tabbar-item>
      <van-tabbar-item @click="go('/my')" icon="user-circle-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    computed: {
      active() {
        let arr = ['wallet', 'trade', 'find', 'my']
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

<style lang="scss">
  .tabar {

    .van-tabbar {
      background-color: #fcfcfc;
    }

    .van-tabbar-item--active {
      color: black;
    }

    .van-tabbar-item__text {
      font-weight:bold;
    }

  }
</style>