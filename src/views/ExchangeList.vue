<template>
  <div class="trades-list">
    <van-nav-bar title="兑换记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <van-row type="flex" justify="space-between">
            <van-col>
              <p>时间</p>
              {{ item.created_at | timerFormat}}
            </van-col>
            <van-col>
              <p>支出(USDT)</p>
              {{ item.amount }}
            </van-col>
            <van-col>
              <p>价格</p>
              {{ item.rate }}
            </van-col>
            <van-col>
              <p>收入(IA)</p>
              {{ item.income }}
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
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.$axios.get(`/replace?&page=${this.page}&size=30`).then(response => {
        let ss = response.data;
        this.list = this.list.concat(ss);
        this.loading = false;

        if (this.page >= response.meta.last_page || response.meta.total == 0) {
          this.finished = true;
        }
      });
    }
  },
  filters: {
    timerFormat(a) {
      return a.substring(5, 16);
    }
  }
};
</script>
<style lang="scss">
.trades-list {
  .van-row {
    font-size: 10px;
  }
  .van-cell {
    color: #fff;
    background: #282e48;
    .van-cell__value--alone {
      color: white;
    }
  }
}
</style>