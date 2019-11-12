<template>
  <!-- <div style="margin-top: 8rem; margin-bottom: 5rem;"> -->
  <div class="tabar">
    <!-- <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">我是有底线的</van-divider> -->

    <van-tabbar
      :value="active"
      :fixed="true"
      :border="false"
      :safe-area-inset-bottom="true"
      :z-index="999"
      style="backgroundColor: #fbfcfd"
    >
      <van-tabbar-item @click="go('home')" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item @click="go('upgrade')" icon="points">投单</van-tabbar-item>
      <van-tabbar-item @click="go('my')" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  computed: {
    active() {
      let arr = ["home", "upgrade", "my"];
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

<style lang="scss">
.tabar {
  // .van-nav-bar {
  //   color: #fff;
  //   background-color: #13141a;
  // }

  // .van-tabbar-item--active {
  //   color: black;
  // }

  // .van-tabbar-item__text {
  //   font-weight: bold;
  // }
}
</style>
