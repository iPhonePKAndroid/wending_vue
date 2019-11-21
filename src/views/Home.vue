<template>
  <div class="home">
    <van-swipe :autoplay="3000" class="swiper" indicator-color="white">
      <van-swipe-item v-for="(image, index) in banners" :key="index">
        <van-image :src="image.url"></van-image>
      </van-swipe-item>
    </van-swipe>
    <van-panel class="notice-card">
      <div slot="header">
        <span class="dot">公告</span>
      </div>
      <ul class="card-list">
        <li v-for="(item,index) in 3" :key="index">
          <span>充值资金已充值到账</span>
          <div>{{curTime}}</div>
        </li>
      </ul>
    </van-panel>
    <div class="sub-title">
      <span class="dot">关于IA</span>
    </div>
    <div class="ad-card" v-if="banners.length>0">
      <div v-for="(image, index) in banners" :key="index">
        <van-image :src="image.url"></van-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  methods: {
    async get_banners() {
      let banners = await this.$axios.get("/banners");
      this.banners = banners.data;
    }
  },
  mounted() {
    this.get_banners();
  },
  computed: {
    curTime() {
      var timeStamp = new Date();
      return timeStamp.toLocaleString();
    }
  }
};
</script>

<style lang="scss">
.home {
  padding-bottom: 5rem;
  font-size: 13px;
  .swiper {
    position: relative;
    height: 210px;
    .van-swipe-item {
      .van-image {
        padding: 25px 20px;
        img {
          border-radius: 7px;
          overflow: hidden;
        }
      }
    }
  }
  .notice-card {
    margin: 10px 20px;
    padding: 10px 16px;
    border-radius: 7px;
    overflow: hidden;
    .card-list {
      position: relative;
      li {
        padding: 10px 0;
        margin-left: 16px;
        list-style: disc;
        div {
          font-size: 10px;
        }
      }
    }
  }
  .sub-title {
    padding: 10px 20px;
  }
  .dot {
    font-size: 14px;
    position: relative;
    padding-left: 10px;
    color: #ba924a;
    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 14px;
      background-color: #ba924a;
      position: absolute;
      top: 4px;
      left: 0;
    }
  }
  .ad-card {
    .van-image {
      margin: 5px 20px;
      img {
        border-radius: 7px;
        overflow: hidden;
      }
    }
  }

  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }
}
</style>