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
  }
};
</script>

<style lang="scss">
html,
body {
  color: white;
  height: 100%;
  background-color: rgb(21, 23, 39);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  .van-nav-bar {
    color: #fff;
    background-color: #1b2034;
    .van-icon {
      color: #fff;
    }
  }

  // .van-tabbar-item--active {
  //   color: black;
  // }
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
  .van-hairline--bottom::after {
    border: none;
  }
  .van-cell-group {
    background: #282e48;
    .van-cell {
      background: #282e48;
      color: #fff;
    }
  }
  .van-collapse-item {
    .van-cell {
      background: #282e48;
      color: #fff;
    }
    .van-collapse-item__content {
      background: #282e48;
      color: #fff;
    }
  }
  .van-field__control {
    color: #fff;
  }
  .van-list {
    .van-cell {
      background: #282e48;
      color: #fff;
      .van-cell__value--alone {
        color: #fff;
      }
    }
  }
  .van-button--large {
    height: 40px;
    line-height: 40px;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #454c6c;
    right: 16px;
  }
}
</style>
