<template>
  <div class="home">
    <van-swipe class="swiper" indicator-color="white">
      <van-swipe-item v-for="(image, index) in banners" :key="index">
        <van-image height="156px" width="335px" :src="image.url"></van-image>
      </van-swipe-item>
    </van-swipe>
    <van-panel class="notice-card">
      <div slot="header" class="notice-title">
        <span class="dot">公告</span>
        <span @click="$router.push({name:'notice'})">
          全部公告
          <van-icon name="arrow"></van-icon>
        </span>
      </div>
      <ul class="card-list">
        <template v-if="noticeList.length>0">
          <li v-for="(item,index2) in noticeList" :key="index2" @click="toDetail(item.id)">
            <span>{{item.name}}</span>
            <div>{{item.created_at}}</div>
          </li>
        </template>
        <template v-else>
          <li>暂无公告</li>
        </template>
      </ul>

    </van-panel>
    <div class="sub-title">
      <span class="dot">关于IA</span>
    </div>
    <div class="three-card">
      <van-image width="335px" height="127px" fit="fill" :src="require(`../assets/home-banner0.png`)"></van-image>
      <van-image width="335px" height="127px" fit="fill" :src="require(`../assets/home-banner1.png`)"></van-image>
      <van-image width="335px" height="127px" fit="fill" :src="require(`../assets/home-banner2.png`)"></van-image>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      noticeList: [
      ]
    };
  },
  methods: {
    async get_banners() {
      let banners = await this.$axios.get("/banners");
      this.banners = banners.data;
    },
    async getNotice() {
      var res = await this.$axios.get("notice?size=5");
      if (res.data == 0) {
      }
      this.noticeList = res.data;
    },
    async toDetail(id) {
      this.$router.push({
        name: "noticeShow",
        params: { id }
      });
    }
  },
  mounted() {
    this.get_banners();
    this.getNotice();
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
      display: flex;
      align-items: center;
      justify-content: center;
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
    .notice-title {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding-bottom: 5px;
      span:last-child {
        display: flex;
        align-items: center;
        text-decoration: underline;
        color: #ba924a;
      }
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #454c6c;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .card-list {
      position: relative;
      max-height: 160px;
      overflow-y: scroll;
      li {
        padding: 10px 0;
        margin-left: 16px;
        list-style: disc;
        position: relative;
        div {
          font-size: 10px;
        }
        &::after {
          position: absolute;
          box-sizing: border-box;
          content: " ";
          pointer-events: none;
          right: 0;
          bottom: 0;
          left: 0;
          border-bottom: 1px solid #454c6c;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
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
  .three-card {
    padding: 0 20px;
    .van-image {
      padding: 5px 0;
      width: 100%;
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