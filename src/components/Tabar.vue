<template>
<<<<<<< HEAD
  <!-- <div style="margin-top: 8rem; margin-bottom: 5rem;"> -->
  <div>

    <!-- <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">我是有底线的</van-divider> -->

    <van-tabbar :value="active" :fixed="true" :border="false" :safe-area-inset-bottom="true" :z-index="999" style="backgroundColor: #fbfcfd">
      <van-tabbar-item @click="go('home')" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item @click="go('go')" icon="points">抢单</van-tabbar-item>
      <van-tabbar-item @click="go('my')" icon="user-circle-o">我的</van-tabbar-item>
=======
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
>>>>>>> 425629bc78a3a96b74b399d8f1a6a254d956c802
    </van-tabbar>
  </div>
</template>

<script>
<<<<<<< HEAD
export default {
  computed: {
    active() {
      let arr = ["home", "go", "my"];
      return arr.indexOf(this.$route.name);
    }
  },
  methods: {
    async go(url) {
      this.$router.push({
        name: url
      });
    }
  }
};
</script>
=======
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
>>>>>>> 425629bc78a3a96b74b399d8f1a6a254d956c802
