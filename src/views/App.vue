<template>
  <div class="download">
    <van-nav-bar  left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="center">
      <!-- LOGO -->
      <div class="logo">
        <van-image width="100" height="100" :src="require('../assets/logo.png')" />
      </div>
      <!-- 下载按钮 -->
      <div class="download">
        <van-row>
          <van-col span="8" offset="4">
            <van-button type="default" @click="safari">苹果本地下载</van-button>
          </van-col>
          <van-col span="8">
            <a href="http://imddm.com/ia.apk">
              <van-button type="default">安卓本地下载</van-button>
            </a>
          </van-col>
        </van-row>
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
  padding-bottom: 100%;
  background-color: #211515;

  .center {
    text-align: center;
    padding-top: 10rem;
  }

  .download {
    .van-button {
      color: white;
      border-color: red;
      border-width: 2px;
      margin-top: 10px;
      border-style: solid;
      border-radius: 10px;
      background-color: #1d2343;
    }
  }
}
</style>