<template>
  <div class="about">
    <van-nav-bar title="平台公告" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-list v-model="loading" :finished="finished" finished-text="加载完成" @load="onLoad">
      <div v-if="noticeList.length > 0">
        <div class="notice-list">
          <div class="notice-card" v-for="item in noticeList" :key="item.id" @click="toDetail(item.id)" >
            <div class="time-title">
              <span></span>
              <span>{{item.created_at}}</span>
            </div>
            <div>
              <span class="title">{{item.name}}</span>
            </div>
            <div>
              <span class="detail" v-html="item.desc"></span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-notice">
          暂无公告
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeNames: ["1"],
        loading: false,
        finished: false,
        page: 0,
        noticeList: []
      };
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onLoad() {
        this.page++;
        this.$axios.get(`notice?&page=${this.page}`).then(response => {
          let ss = response.data;
          this.noticeList = this.noticeList.concat(ss);
          this.loading = false;
          if (this.page >= response.last_page || response.total == 0) {
            this.finished = true;
          }
        });
      },
      async toDetail(id) {
        this.$router.push({
          name: "noticeShow",
          params: { id }
        });
      }
    },
    mounted() {
    // this.getNoticeList();
  }
};
</script>

<style lang="scss">
.about {
  
  .no-notice {
    text-align: center;
    margin-top: 1rem;
  }

  font-size: 12px;
  .notice-list {
    margin: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 10px;
    background: #282e48;
    .notice-card {
      margin: 10px;
      border-bottom: 1px solid #ddd;
      height: 120px;
      overflow: hidden;
      .time-title {
        display: flex;
        align-items: center;
        line-height: 35px;
        color: #666;

        span:nth-child(1) {
          display: inline-block;
          height: 15px;
          width: 15px;
          background: #ba924a;
          border-radius: 4px;
          margin-right: 15px;
        }
      }

      div:last-child {
        color: #888;
        padding: 10px 0;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        line-height: 40px;
      }

      .detail {
        color: #666;
      }

    }
  }
}
</style>