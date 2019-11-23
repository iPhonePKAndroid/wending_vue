<template>
  <div class="download">
    <van-nav-bar left-arrow title="App下载" @click-left="onClickLeft" />
    <div class="center">
      <!-- LOGO -->
      <div class="logo">
        <van-image width="100" height="100" :src="require('../assets/downPage.png')" />
      </div>
      <!-- 下载按钮 -->
      <div class="download">
        <van-button
          :icon="require('../assets/ios_icon.png')"
          color="#ba924a"
          plain
          @click="safari"
        >苹果本地下载</van-button>

        <van-button
          @click="downLoadApk"
          :icon="require('../assets/andriod_icon.png')"
          color="#ba924a"
          plain
        >安卓本地下载</van-button>

        <van-dialog v-model="show" title="请打开右上角按钮，用系统浏览器打开" show-cancel-button></van-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isApk: false,
      isIos: false,
      isWeChat: false,
      show: false
    };
  },
  methods: {
    safari() {
      if (this.isWeChat) {
        this.show = true;
        return;
      }
      if (window.navigator.userAgent.indexOf("iPhone") >= 0) {
        // this.$toast("暂无苹果App");
        // return;
        window.location.href =
          "itms-services://?action=download-manifest&url=https://imddm.com/ia.plist";
        return false;
      }
      this.$toast("请使用Safari浏览器下载安装");
    },
    downLoadApk() {
      if (this.isWeChat) {
        this.show = true;
        return;
      }
      window.location.href = "http://www.imddm.com/ia.apk";
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    wxToast() {
      this.show = true;
    }
  },
  mounted() {
    var agentInfo = navigator.userAgent;
    if (agentInfo.search(/MicroMessenger/) > -1) {
      this.isWeChat = true;
      console.log(WeixinJSBridge);
    } else if (agentInfo.search(/iPhone/) > -1) {
      this.isIos = true;
    } else {
      this.isApk = true;
    }
  }
};
</script>
<style lang="scss">
.download {
  height: 100%;
  background-color: #282e48;
  .van-dialog {
    background-color: #1d2343;
  }
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