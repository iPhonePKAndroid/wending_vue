<template>
  <div class="download">
    <van-nav-bar left-arrow title="App下载" @click-left="onClickLeft" />
    <div class="center">
      <!-- LOGO -->
      <div class="logo">
        <van-image width="100" height="100" :src="require('../assets/logo.png')" />
      </div>
      <!-- 下载按钮 -->
      <div class="download">
        <van-button
          :icon="require('../assets/ios_icon.png')"
          color="#ba924a"
          plain
          @click="safari"
        >苹果本地下载</van-button>
        <van-button :icon="require('../assets/andriod_icon.png')" color="#ba924a" plain>安卓本地下载</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    safari() {
      if (window.navigator.userAgent.indexOf("Safari") >= 0) {
        this.$toast("暂无苹果App");

        return;
        window.location.href =
          "itms-services://?action=download-manifest&url=https://imddm.com/ia.plist";
      } else {
        this.$toast("请使用Safari浏览器下载安装");
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.download {
  height: 100%;
  background-color: #282e48;

  .center {
    text-align: center;
    padding-top: 10rem;
  }

  .download {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    .van-button {
      margin-top: 10px;
      background-color: #1d2343;
      .van-button__text {
        color: #fff;
      }
    }
  }
}
</style>