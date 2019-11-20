<template>
  <div class="profit-list">
    <van-nav-bar title="收益记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-cell>
        <van-row>
          <van-col span="10">时间</van-col>
          <van-col span="7">类型</van-col>
          <van-col span="7">金额</van-col>
        </van-row>
      </van-cell>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <van-row gutter="20">
            <van-col span="10">{{ item.created_at }}</van-col>
            <van-col span="7">{{ item.type_name }}</van-col>
            <van-col span="7">
              <span class="text-green">{{ item.amount*1 }}</span>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      type: "",
      page: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.$axios.get(`/profit?page=${this.page}&size=30`).then(response => {
        let ss = response.data;
        this.list = this.list.concat(ss);
        this.loading = false;

        if (this.page >= response.last_page || response.total == 0) {
          this.finished = true;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.profit-list {
  .text-red {
    color: red;
  }

  .text-green {
    color: green;
  }
  .van-cell {
    color: #fff;
    background: #282e48;
    .van-cell__value--alone {
      color: white;
    }
  }
  .van-row {
    font-size: 10px;

    .van-col {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
</style>