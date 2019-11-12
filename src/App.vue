<template>
  <div id="app">
    <router-view />

    <Tabar v-if="tabar" />
  </div>
</template>

<script>
import Tabar from "@/components/Tabar.vue";
export default {
  components: { Tabar },
  computed: {
    tabar() {
      return this.$route.meta.tabar === true;
    }
  },
  data() {
    return {};
  },
  async mounted() {
    this.$toast.setDefaultOptions({ duration: 7000 });
    // setInterval(() => {
    //   this.$notify({
    //     message: '联系QQ71314126',
    //     duration: 2000,
    //     background: '#07c160',
    //     onClick() {
    //       alert('联系微信iPhonePKAndroid')
    //     },
    //   });
    // }, 100000)
  }
};
</script>

<style lang="scss">
html,
body {
  color: white;
  height: 100%;
  background-color: #13141a;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  .van-nav-bar {
    color: #fff;
    background-color: #13141a;
    .van-icon {
      color: #fff;
    }
  }

  .van-tabbar-item--active {
    color: black;
  }
  .van-nav-bar__title {
    color: #fff !important;
  }

  .van-tabbar-item__text {
    font-weight: bold;
    // color: #fff;
  }
  .van-nav-bar__text {
    color: #fff !important;
  }
  .van-cell-group {
    background: #13141a;
    .van-cell {
      background: #13141a;
      color: #fff;
    }
  }
  .van-collapse-item {
    .van-cell {
      background: #13141a;
      color: #fff;
    }
    .van-collapse-item__content {
      background: #13141a;
      color: #fff;
    }
  }
}
</style>
